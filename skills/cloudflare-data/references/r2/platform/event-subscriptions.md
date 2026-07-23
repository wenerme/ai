---
description: Subscribe to R2 bucket events and Super Slurper events using Cloudflare Queues.
title: Event subscriptions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# Event subscriptions

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2/platform/event-subscriptions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/) allow you to receive messages when events occur across your Cloudflare account. Cloudflare products (e.g., [KV](https://developers.cloudflare.com/kv/), [Workers AI](https://developers.cloudflare.com/workers-ai/), [Workers](https://developers.cloudflare.com/workers/)) can publish structured events to a [queue](https://developers.cloudflare.com/queues/), which you can then consume with Workers or [HTTP pull consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to build custom workflows, integrations, or logic.

For more information on [Event Subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/), refer to the [management guide](https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/).

## Available R2 events

#### `bucket.created`

Triggered when a bucket is created.

**Example:**

```json
{
  "type": "cf.r2.bucket.created",
  "source": {
    "type": "r2"
  },
  "payload": {
    "name": "my-bucket",
    "jurisdiction": "default",
    "location": "WNAM",
    "storageClass": "Standard"
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

#### `bucket.deleted`

Triggered when a bucket is deleted.

**Example:**

```json
{
  "type": "cf.r2.bucket.deleted",
  "source": {
    "type": "r2"
  },
  "payload": {
    "name": "my-bucket",
    "jurisdiction": "default"
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

## Available Super Slurper events

#### `job.started`

Triggered when a migration job starts.

**Example:**

```json
{
  "type": "cf.superSlurper.job.started",
  "source": {
    "type": "superSlurper"
  },
  "payload": {
    "id": "job-12345678-90ab-cdef-1234-567890abcdef",
    "createdAt": "2025-05-01T02:48:57.132Z",
    "overwrite": true,
    "pathPrefix": "migrations/",
    "source": {
      "provider": "s3",
      "bucket": "source-bucket",
      "region": "us-east-1",
      "endpoint": "s3.amazonaws.com"
    },
    "destination": {
      "provider": "r2",
      "bucket": "destination-bucket",
      "jurisdiction": "default"
    }
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

#### `job.paused`

Triggered when a migration job pauses.

**Example:**

```json
{
  "type": "cf.superSlurper.job.paused",
  "source": {
    "type": "superSlurper"
  },
  "payload": {
    "id": "job-12345678-90ab-cdef-1234-567890abcdef"
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

#### `job.resumed`

Triggered when a migration job resumes.

**Example:**

```json
{
  "type": "cf.superSlurper.job.resumed",
  "source": {
    "type": "superSlurper"
  },
  "payload": {
    "id": "job-12345678-90ab-cdef-1234-567890abcdef"
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

#### `job.completed`

Triggered when a migration job finishes.

**Example:**

```json
{
  "type": "cf.superSlurper.job.completed",
  "source": {
    "type": "superSlurper"
  },
  "payload": {
    "id": "job-12345678-90ab-cdef-1234-567890abcdef",
    "totalObjectsCount": 1000,
    "skippedObjectsCount": 10,
    "migratedObjectsCount": 980,
    "failedObjectsCount": 10
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

#### `job.aborted`

Triggered when a migration job is manually aborted.

**Example:**

```json
{
  "type": "cf.superSlurper.job.aborted",
  "source": {
    "type": "superSlurper"
  },
  "payload": {
    "id": "job-12345678-90ab-cdef-1234-567890abcdef",
    "totalObjectsCount": 1000,
    "skippedObjectsCount": 100,
    "migratedObjectsCount": 500,
    "failedObjectsCount": 50
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

#### `job.object.migrated`

Triggered when an object is migrated.

**Example:**

```json
{
  "type": "cf.superSlurper.job.object.migrated",
  "source": {
    "type": "superSlurper.job",
    "jobId": "job-12345678-90ab-cdef-1234-567890abcdef"
  },
  "payload": {
    "key": "migrations/file.txt"
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

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/platform/event-subscriptions/#page","headline":"Event subscriptions · Cloudflare R2 docs","description":"Subscribe to R2 bucket events and Super Slurper events using Cloudflare Queues.","url":"https://developers.cloudflare.com/r2/platform/event-subscriptions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
