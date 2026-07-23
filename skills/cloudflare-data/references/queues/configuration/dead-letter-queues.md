---
description: Route failed messages to a Dead Letter Queue after exceeding the retry limit.
title: Dead Letter Queues
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt
> Use this file to discover all available pages before exploring further.

# Dead Letter Queues

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/queues/configuration/dead-letter-queues/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A Dead Letter Queue (DLQ) is a common concept in a messaging system, and represents where messages are sent when a delivery failure occurs with a consumer after `max_retries` is reached. A Dead Letter Queue is like any other queue, and can be produced to and consumed from independently.

With Cloudflare Queues, a Dead Letter Queue is defined within your [consumer configuration](https://developers.cloudflare.com/queues/configuration/configure-queues/). Messages are delivered to the DLQ when they reach the configured retry limit for the consumer. Without a DLQ configured, messages that reach the retry limit are deleted permanently.

For example, the following consumer configuration would send messages to our DLQ named `"my-other-queue"` after retrying delivery (by default, 3 times):

```jsonc
{
	"queues": {
		"consumers": [
			{
				"queue": "my-queue",
				"dead_letter_queue": "my-other-queue"
			}
		]
	}
}
```

```toml
[[queues.consumers]]
queue = "my-queue"
dead_letter_queue = "my-other-queue"
```

You can also configure a DLQ when creating a consumer from the command-line using `wrangler`:

```sh
wrangler queues consumer add $QUEUE_NAME $SCRIPT_NAME --dead-letter-queue=$NAME_OF_OTHER_QUEUE
```

To process messages placed on your DLQ, you need to [configure a consumer](https://developers.cloudflare.com/queues/configuration/configure-queues/) for that queue as you would with any other queue.

Messages delivered to a DLQ without an active consumer will persist for four (4) days before being deleted from the queue.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/configuration/dead-letter-queues/#page","headline":"Dead Letter Queues · Cloudflare Queues docs","description":"Route failed messages to a Dead Letter Queue after exceeding the retry limit.","url":"https://developers.cloudflare.com/queues/configuration/dead-letter-queues/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
