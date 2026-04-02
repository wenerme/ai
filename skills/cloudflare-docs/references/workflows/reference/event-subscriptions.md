---
title: Event subscriptions
description: Event subscriptions allow you to receive messages when events occur across your Cloudflare account. Cloudflare products (e.g., KV, Workers AI, Workers) can publish structured events to a queue, which you can then consume with Workers or HTTP pull consumers to build custom workflows, integrations, or logic.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workflows/reference/event-subscriptions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Event subscriptions

[Event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/) allow you to receive messages when events occur across your Cloudflare account. Cloudflare products (e.g., [KV](https://developers.cloudflare.com/kv/), [Workers AI](https://developers.cloudflare.com/workers-ai/), [Workers](https://developers.cloudflare.com/workers/)) can publish structured events to a [queue](https://developers.cloudflare.com/queues/), which you can then consume with Workers or [HTTP pull consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to build custom workflows, integrations, or logic.

For more information on [Event Subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/), refer to the [management guide](https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/).

## Available Workflows events

#### `instance.queued`

Triggered when an instance was created and is awaiting execution.

**Example:**

```

{

  "type": "cf.workflows.workflow.instance.queued",

  "source": {

    "type": "workflows.workflow",

    "workflowName": "my-workflow"

  },

  "payload": {

    "versionId": "v1",

    "instanceId": "inst-12345678-90ab-cdef-1234-567890abcdef"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `instance.started`

Triggered when an instance starts or resumes execution.

**Example:**

```

{

  "type": "cf.workflows.workflow.instance.started",

  "source": {

    "type": "workflows.workflow",

    "workflowName": "my-workflow"

  },

  "payload": {

    "versionId": "v1",

    "instanceId": "inst-12345678-90ab-cdef-1234-567890abcdef"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `instance.paused`

Triggered when an instance pauses execution.

**Example:**

```

{

  "type": "cf.workflows.workflow.instance.paused",

  "source": {

    "type": "workflows.workflow",

    "workflowName": "my-workflow"

  },

  "payload": {

    "versionId": "v1",

    "instanceId": "inst-12345678-90ab-cdef-1234-567890abcdef"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `instance.errored`

Triggered when an instance step throws an error.

**Example:**

```

{

  "type": "cf.workflows.workflow.instance.errored",

  "source": {

    "type": "workflows.workflow",

    "workflowName": "my-workflow"

  },

  "payload": {

    "versionId": "v1",

    "instanceId": "inst-12345678-90ab-cdef-1234-567890abcdef"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `instance.terminated`

Triggered when an instance is manually terminated.

**Example:**

```

{

  "type": "cf.workflows.workflow.instance.terminated",

  "source": {

    "type": "workflows.workflow",

    "workflowName": "my-workflow"

  },

  "payload": {

    "versionId": "v1",

    "instanceId": "inst-12345678-90ab-cdef-1234-567890abcdef"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `instance.completed`

Triggered when an instance finishes execution successfully.

**Example:**

```

{

  "type": "cf.workflows.workflow.instance.completed",

  "source": {

    "type": "workflows.workflow",

    "workflowName": "my-workflow"

  },

  "payload": {

    "versionId": "v1",

    "instanceId": "inst-12345678-90ab-cdef-1234-567890abcdef"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/reference/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/reference/event-subscriptions/","name":"Event subscriptions"}}]}
```
