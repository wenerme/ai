---
title: Event subscriptions
description: Subscribe to Vectorize events such as index inserts and deletes using Queues.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/vectorize/platform/event-subscriptions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Event subscriptions

[Event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/) allow you to receive messages when events occur across your Cloudflare account. Cloudflare products (e.g., [KV](https://developers.cloudflare.com/kv/), [Workers AI](https://developers.cloudflare.com/workers-ai/), [Workers](https://developers.cloudflare.com/workers/)) can publish structured events to a [queue](https://developers.cloudflare.com/queues/), which you can then consume with Workers or [HTTP pull consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to build custom workflows, integrations, or logic.

For more information on [Event Subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/), refer to the [management guide](https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/).

## Available Vectorize events

#### `index.created`

Triggered when an index is created.

**Example:**

```

{

  "type": "cf.vectorize.index.created",

  "source": {

    "type": "vectorize"

  },

  "payload": {

    "name": "my-vector-index",

    "description": "Index for embeddings",

    "createdAt": "2025-05-01T02:48:57.132Z",

    "modifiedAt": "2025-05-01T02:48:57.132Z",

    "dimensions": 1536,

    "metric": "cosine"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

Explain Code

#### `index.deleted`

Triggered when an index is deleted.

**Example:**

```

{

  "type": "cf.vectorize.index.deleted",

  "source": {

    "type": "vectorize"

  },

  "payload": {

    "name": "my-vector-index"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/vectorize/","name":"Vectorize"}},{"@type":"ListItem","position":3,"item":{"@id":"/vectorize/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/vectorize/platform/event-subscriptions/","name":"Event subscriptions"}}]}
```
