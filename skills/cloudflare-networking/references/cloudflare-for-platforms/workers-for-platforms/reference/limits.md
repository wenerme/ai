---
description: Review Workers for Platforms limits for scripts, triggers, Durable Objects, cache, tags, and API rate limits.
title: Limits
image: https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/limits/og.png?v=e197158116ac3f21
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Oct 13, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/limits/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Script limits

Cloudflare provides an unlimited number of scripts for Workers for Platforms customers.

## `cf` object

The [`cf` object](https://developers.cloudflare.com/workers/runtime-apis/request/#the-cf-property-requestinitcfproperties) contains Cloudflare-specific properties of a request. This field is not accessible in [user Workers](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#user-workers) by default because some fields in this object are sensitive and can be used to manipulate Cloudflare features (for example, `cacheKey`, `resolveOverride`, `scrapeShield`.)

To access the `cf` object, you need to enable [trusted mode](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/worker-isolation/#trusted-mode) for your namespace. Only enable this if you control all Worker code in the namespace.

## Triggers

User Workers can only be invoked by your [dynamic dispatch Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/), through `fetch()` or [RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/) calls on the stub returned by `env.DISPATCHER.get()`. You cannot attach event triggers directly to a user Worker:

- **[Queue consumers](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer)**: A user Worker cannot be registered as the consumer of a queue. The [Create Queue Consumer API](https://developers.cloudflare.com/api/resources/queues/subresources/consumers/methods/create/) does not accept the name of a script in a dispatch namespace, and the `queue` binding in the [upload metadata](https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings) only attaches a queue producer.
- **[Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)**: You cannot configure Cron Triggers on a user Worker.

As a result, Cloudflare does not call a [`queue()`](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer) or [`scheduled()`](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/) handler exported by a user Worker. User Workers can still use a queue [producer binding](https://developers.cloudflare.com/queues/configuration/javascript-apis/#producer) to send messages.

### Handle triggers in your dynamic dispatch Worker

To run user Worker code in response to a queue message or a schedule, attach the trigger to your dynamic dispatch Worker (or another Worker that has a [dispatch namespace binding](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/)), then forward the event to the relevant user Worker.

For example, configure your dynamic dispatch Worker as the queue consumer:

```jsonc
{
  "dispatch_namespaces": [
    {
      "binding": "DISPATCHER",
      "namespace": "my-dispatch-namespace",
    },
  ],
  "queues": {
    "consumers": [
      {
        "queue": "user-jobs",
      },
    ],
  },
}
```

```toml
[[dispatch_namespaces]]
binding = "DISPATCHER"
namespace = "my-dispatch-namespace"

[[queues.consumers]]
queue = "user-jobs"
```

Include the target user Worker in each message, and forward the message from the `queue()` handler:

```js
export default {
	async queue(batch, env) {
		for (const message of batch.messages) {
			const { scriptName, payload } = message.body;
			try {
				const userWorker = env.DISPATCHER.get(scriptName);
				const response = await userWorker.fetch("https://user-worker/queue", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(payload),
				});
				if (response.ok) {
					message.ack();
				} else {
					message.retry();
				}
			} catch {
				message.retry();
			}
		}
	},
};
```

```ts
interface Env {
  DISPATCHER: DispatchNamespace;
}

interface UserJob {
  scriptName: string;
  payload: unknown;
}

export default {
  async queue(batch: MessageBatch<UserJob>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      const { scriptName, payload } = message.body;
      try {
        const userWorker = env.DISPATCHER.get(scriptName);
        const response = await userWorker.fetch("https://user-worker/queue", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          message.ack();
        } else {
          message.retry();
        }
      } catch {
        message.retry();
      }
    }
  },
};
```

The user Worker handles the forwarded message in its `fetch()` handler, or in an RPC method if it exports a [`WorkerEntrypoint`](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/#the-workerentrypoint-class). The same pattern applies to Cron Triggers: add the schedule to your dynamic dispatch Worker and call the relevant user Workers from its `scheduled()` handler.

## Durable Object namespace limits

Workers for Platforms do not have a limit for the number of Durable Object namespaces.

## Cache API

For isolation, `caches.default` is disabled for namespaced scripts. To learn more about the cache, refer to [How the cache Works](https://developers.cloudflare.com/workers/reference/how-the-cache-works/).

## ​Tags

You can set a maximum of eight tags per script. Avoid special characters like `,` and `&` when naming your tag.

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗︎](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

## Gradual Deployments

[Gradual Deployments](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/) is not supported yet for user Workers. Changes made to user Workers create a new version that deployed all-at-once to 100% of traffic.

## API Rate Limits

| Type | Limit |
| --- | --- |
| Client API per user/account token | 1200/5 minutes |
| Client API per IP | 200/second |
| GraphQL | Varies by query cost. Max 320/5 min |
| User API tokens per user | 50 |
| Account API tokens per account | 500 |

Note

The global rate limit for the Cloudflare API is 1,200 requests per five minute period per user, and applies cumulatively regardless of whether the request is made via the dashboard, API key, or API token.

If you exceed this limit, all API calls for the next five minutes will be blocked, receiving a `HTTP 429 - Too Many Requests` response.

Some specific API calls have their own limits and are documented separately, such as the following:

- [Cache Purge APIs](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits)
- [GraphQL APIs](https://developers.cloudflare.com/analytics/graphql-api/limits/)
- [Rulesets APIs](https://developers.cloudflare.com/ruleset-engine/rulesets-api/#limits)
- [Lists API](https://developers.cloudflare.com/waf/tools/lists/lists-api/#rate-limiting-for-lists-api-requests)
- [Gateway Lists API](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/#api-rate-limit)

Enterprise customers can also [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to raise the Client API per user, GraphQL, or API token limits to a higher value.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/limits/#page","headline":"Limits","description":"Review Workers for Platforms limits for scripts, triggers, Durable Objects, cache, tags, and API rate limits.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/limits/og.png?v=e197158116ac3f21","dateModified":"2026-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
