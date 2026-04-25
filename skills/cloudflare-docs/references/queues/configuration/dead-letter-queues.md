---
title: Dead Letter Queues
description: Route failed messages to a Dead Letter Queue after exceeding the retry limit.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Dead Letter Queues

A Dead Letter Queue (DLQ) is a common concept in a messaging system, and represents where messages are sent when a delivery failure occurs with a consumer after `max_retries` is reached. A Dead Letter Queue is like any other queue, and can be produced to and consumed from independently.

With Cloudflare Queues, a Dead Letter Queue is defined within your [consumer configuration](https://developers.cloudflare.com/queues/configuration/configure-queues/). Messages are delivered to the DLQ when they reach the configured retry limit for the consumer. Without a DLQ configured, messages that reach the retry limit are deleted permanently.

For example, the following consumer configuration would send messages to our DLQ named `"my-other-queue"` after retrying delivery (by default, 3 times):

* [  wrangler.jsonc ](#tab-panel-8132)
* [  wrangler.toml ](#tab-panel-8133)

JSONC

```

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

Explain Code

TOML

```

[[queues.consumers]]

queue = "my-queue"

dead_letter_queue = "my-other-queue"


```

You can also configure a DLQ when creating a consumer from the command-line using `wrangler`:

Terminal window

```

wrangler queues consumer add $QUEUE_NAME $SCRIPT_NAME --dead-letter-queue=$NAME_OF_OTHER_QUEUE


```

To process messages placed on your DLQ, you need to [configure a consumer](https://developers.cloudflare.com/queues/configuration/configure-queues/) for that queue as you would with any other queue.

Messages delivered to a DLQ without an active consumer will persist for four (4) days before being deleted from the queue.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/configuration/dead-letter-queues/","name":"Dead Letter Queues"}}]}
```
