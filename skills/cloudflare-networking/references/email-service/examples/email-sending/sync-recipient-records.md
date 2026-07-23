---
description: Remove recipients after hard bounces and spam complaints.
title: Sync recipient records
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Sync recipient records

Synchronize application recipient records with Email Sending lifecycle events.

Last updated Jul 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/email-service/examples/email-sending/sync-recipient-records/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use [Email Sending event subscriptions](https://developers.cloudflare.com/email-service/platform/event-subscriptions/) to update application records after delivery problems. This example uses [Cloudflare Queues](https://developers.cloudflare.com/queues/) and [Workers KV](https://developers.cloudflare.com/kv/) to remove recipients from transactional notifications.

Suppression lists

Email Sending automatically [suppresses](https://developers.cloudflare.com/email-service/concepts/suppressions/) hard bounces and spam complaints. This example also prevents your application from selecting those recipients.

Workers KV is eventually consistent. Deletions can take 60 seconds or longer to appear in other locations.

## Prepare the resources

Before you begin:

* Enable an [Email Sending domain](https://developers.cloudflare.com/email-service/configuration/domains/).
* Create a [Worker project](https://developers.cloudflare.com/workers/get-started/guide/).
* Create a [Workers KV namespace](https://developers.cloudflare.com/kv/get-started/#2-create-a-kv-namespace).

Store each eligible recipient address as a key in KV. The value can contain notification preferences or related metadata.

## Review the event flow

1. Email Sending publishes bounce and complaint events.
2. A queue delivers those events to a Worker.
3. The Worker removes ineligible recipient records from KV.

## Choose removal events

Remove records for every `message.complained` event. These events indicate that a recipient reported the message as spam.

Remove bounced records only when `payload.bounce.type` is `"hard"`. Temporary failures produce `message.deferred` events while retries remain. Exhausted temporary retries can produce `message.bounced` events with a `"soft"` bounce type.

For payload details, refer to [Available Email Sending events](https://developers.cloudflare.com/email-service/platform/event-subscriptions/#available-email-sending-events).

## Create the queue and subscription

Create a queue and subscribe it to your sending domain:

1. In the Cloudflare dashboard, go to the **Queues** page. Create a queue named `email-events`.
[Go to **Queues** ↗](https://dash.cloudflare.com/?to=/:account/workers/queues)
2. Select `email-events`, then select **Subscriptions** \> **Subscribe to events**.
3. Enter a subscription name and select **Email Sending** as the source.
4. Select your sending domain and the `message.bounced` and `message.complained` events.
5. Select **Subscribe**.

## Configure the Worker

Bind the KV namespace and register the Worker as the queue consumer:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "recipient-record-sync",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-07-22",
  "kv_namespaces": [
    {
      "binding": "RECIPIENTS",
      "id": "<RECIPIENTS_KV_NAMESPACE_ID>"
    }
  ],
  "queues": {
    "consumers": [
      {
        "queue": "email-events",
        "max_batch_size": 10,
        "max_retries": 3,
        "dead_letter_queue": "email-events-dlq"
      }
    ]
  }
}
```

```toml
name = "recipient-record-sync"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-07-22"

[[kv_namespaces]]
binding = "RECIPIENTS"
id = "<RECIPIENTS_KV_NAMESPACE_ID>"

[[queues.consumers]]
queue = "email-events"
max_batch_size = 10
max_retries = 3
dead_letter_queue = "email-events-dlq"
```

The configuration creates `email-events-dlq` during deployment. Queues moves events there after three retries.

## Add the queue consumer

The [queue() handler](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer) processes each event independently. It deletes applicable recipient records and retries failed KV operations.

```js
export default {
	async queue(batch, env) {
		for (const message of batch.messages) {
			try {
				const event = message.body;

				if (shouldRemove(event)) {
					await removeRecipient(env, event);
				}

				message.ack();
			} catch (error) {
				console.error("Failed to process Email Sending event", {
					eventId: message.body.payload.eventId,
					error,
				});
				message.retry();
			}
		}
	},
};

function shouldRemove(event) {
	if (event.type === "cf.email.sending.message.complained") {
		return true;
	}

	return (
		event.type === "cf.email.sending.message.bounced" &&
		event.payload.bounce?.type === "hard"
	);
}

async function removeRecipient(env, event) {
	await env.RECIPIENTS.delete(event.payload.recipient);
	console.log("Removed recipient record", {
		eventId: event.payload.eventId,
		reason: event.type,
	});
}
```

```ts
interface Env {
	RECIPIENTS: KVNamespace;
}

interface EmailSendingEvent {
	type:
		| "cf.email.sending.message.bounced"
		| "cf.email.sending.message.complained";
	payload: {
		eventId: string;
		recipient: string;
		bounce?: {
			type: "hard" | "soft";
		};
	};
}

export default {
	async queue(batch, env): Promise<void> {
		for (const message of batch.messages) {
			try {
				const event = message.body;

				if (shouldRemove(event)) {
					await removeRecipient(env, event);
				}

				message.ack();
			} catch (error) {
				console.error("Failed to process Email Sending event", {
					eventId: message.body.payload.eventId,
					error,
				});
				message.retry();
			}
		}
	},
} satisfies ExportedHandler<Env, EmailSendingEvent>;

function shouldRemove(event: EmailSendingEvent): boolean {
	if (event.type === "cf.email.sending.message.complained") {
		return true;
	}

	return (
		event.type === "cf.email.sending.message.bounced" &&
		event.payload.bounce?.type === "hard"
	);
}

async function removeRecipient(
	env: Env,
	event: EmailSendingEvent,
): Promise<void> {
	await env.RECIPIENTS.delete(event.payload.recipient);
	console.log("Removed recipient record", {
		eventId: event.payload.eventId,
		reason: event.type,
	});
}
```

Deleting a missing KV key succeeds. This makes repeated event delivery safe.

The handler acknowledges each successful message. Failed operations move to the [dead letter queue](https://developers.cloudflare.com/queues/configuration/dead-letter-queues/) after three retries.

## Deploy the Worker

Deploy the Worker and its queue consumer configuration:

npmyarnpnpm

```
npx wrangler deploy
```

```
yarn wrangler deploy
```

```
pnpm wrangler deploy
```

Monitor the dead letter queue for failed events. Reprocess them after fixing the underlying error.

## Explore related resources

* [Event subscriptions](https://developers.cloudflare.com/email-service/platform/event-subscriptions/) — review event schemas.
* [Suppression lists](https://developers.cloudflare.com/email-service/concepts/suppressions/) — understand automatic suppressions.
* [Queues retries](https://developers.cloudflare.com/queues/configuration/batching-retries/) — control message retries.
* [Workers KV consistency](https://developers.cloudflare.com/kv/concepts/how-kv-works/#consistency) — account for propagation delays.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/examples/email-sending/sync-recipient-records/#page","headline":"Sync recipient records · Cloudflare Email Service docs","description":"Remove recipients after hard bounces and spam complaints.","url":"https://developers.cloudflare.com/email-service/examples/email-sending/sync-recipient-records/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
