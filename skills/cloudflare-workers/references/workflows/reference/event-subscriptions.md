---
description: Subscribe to Workflows lifecycle events, including instance completion and failure notifications.
title: Event subscriptions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt
> Use this file to discover all available pages before exploring further.

# Event subscriptions

Last updated Apr 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workflows/reference/event-subscriptions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/) allow you to receive messages when events occur across your Cloudflare account. Cloudflare products (e.g., [KV](https://developers.cloudflare.com/kv/), [Workers AI](https://developers.cloudflare.com/workers-ai/), [Workers](https://developers.cloudflare.com/workers/)) can publish structured events to a [queue](https://developers.cloudflare.com/queues/), which you can then consume with Workers or [HTTP pull consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to build custom workflows, integrations, or logic.

For more information on [Event Subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/), refer to the [management guide](https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/).

## Available Workflows events

#### `instance.queued`

Triggered when an instance was created and is awaiting execution.

**Example:**

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/reference/event-subscriptions/#page","headline":"Event subscriptions · Cloudflare Workflows docs","description":"Subscribe to Workflows lifecycle events, including instance completion and failure notifications.","url":"https://developers.cloudflare.com/workflows/reference/event-subscriptions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
