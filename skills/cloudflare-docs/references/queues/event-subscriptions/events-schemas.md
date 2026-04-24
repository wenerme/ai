---
title: Events &#38; schemas
description: Reference of available event sources and their schemas for Queues event subscriptions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/queues/event-subscriptions/events-schemas.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Events & schemas

This page provides a comprehensive reference of available event sources and their corresponding events with schemas for [event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/). All events include common metadata fields and follow a consistent structure.

## Sources

### Access

#### `application.created`

Triggered when an application is created.

**Example:**

```

{

  "type": "cf.access.application.created",

  "source": {

    "type": "access"

  },

  "payload": {

    "id": "app-12345678-90ab-cdef-1234-567890abcdef",

    "name": "My Application"

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

#### `application.deleted`

Triggered when an application is deleted.

**Example:**

```

{

  "type": "cf.access.application.deleted",

  "source": {

    "type": "access"

  },

  "payload": {

    "id": "app-12345678-90ab-cdef-1234-567890abcdef",

    "name": "My Application"

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

### R2

#### `bucket.created`

Triggered when a bucket is created.

**Example:**

```

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

Explain Code

#### `bucket.deleted`

Triggered when a bucket is deleted.

**Example:**

```

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

Explain Code

### Super Slurper

#### `job.started`

Triggered when a migration job starts.

**Example:**

```

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

Explain Code

#### `job.paused`

Triggered when a migration job pauses.

**Example:**

```

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

Explain Code

#### `job.resumed`

Triggered when a migration job resumes.

**Example:**

```

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

Explain Code

#### `job.completed`

Triggered when a migration job finishes.

**Example:**

```

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

Explain Code

#### `job.aborted`

Triggered when a migration job is manually aborted.

**Example:**

```

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

Explain Code

#### `job.object.migrated`

Triggered when an object is migrated.

**Example:**

```

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

Explain Code

### Vectorize

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

### Workers AI

#### `batch.queued`

Triggered when a batch request is queued.

**Example:**

```

{

  "type": "cf.workersAi.model.batch.queued",

  "source": {

    "type": "workersAi.model",

    "modelName": "@cf/baai/bge-base-en-v1.5"

  },

  "payload": {

    "requestId": "req-12345678-90ab-cdef-1234-567890abcdef"

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

#### `batch.succeeded`

Triggered when a batch request has completed.

**Example:**

```

{

  "type": "cf.workersAi.model.batch.succeeded",

  "source": {

    "type": "workersAi.model",

    "modelName": "@cf/baai/bge-base-en-v1.5"

  },

  "payload": {

    "requestId": "req-12345678-90ab-cdef-1234-567890abcdef"

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

#### `batch.failed`

Triggered when a batch request has failed.

**Example:**

```

{

  "type": "cf.workersAi.model.batch.failed",

  "source": {

    "type": "workersAi.model",

    "modelName": "@cf/baai/bge-base-en-v1.5"

  },

  "payload": {

    "requestId": "req-12345678-90ab-cdef-1234-567890abcdef",

    "message": "Model execution failed",

    "internalCode": 5001,

    "httpCode": 500

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

### Workers Builds

#### `build.started`

Triggered when a build starts.

**Example:**

```

{

  "type": "cf.workersBuilds.worker.build.started",

  "source": {

    "type": "workersBuilds.worker",

    "workerName": "my-worker"

  },

  "payload": {

    "buildUuid": "build-12345678-90ab-cdef-1234-567890abcdef",

    "status": "running",

    "buildOutcome": null,

    "createdAt": "2025-05-01T02:48:57.132Z",

    "initializingAt": "2025-05-01T02:48:58.132Z",

    "runningAt": "2025-05-01T02:48:59.132Z",

    "stoppedAt": null,

    "buildTriggerMetadata": {

      "buildTriggerSource": "push_event",

      "branch": "main",

      "commitHash": "abc123def456",

      "commitMessage": "Fix bug in authentication",

      "author": "developer@example.com",

      "buildCommand": "npm run build",

      "deployCommand": "wrangler deploy",

      "rootDirectory": "/",

      "repoName": "my-worker-repo",

      "providerAccountName": "github-user",

      "providerType": "github"

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

Explain Code

#### `build.failed`

Triggered when a build fails.

**Example:**

```

{

  "type": "cf.workersBuilds.worker.build.failed",

  "source": {

    "type": "workersBuilds.worker",

    "workerName": "my-worker"

  },

  "payload": {

    "buildUuid": "build-12345678-90ab-cdef-1234-567890abcdef",

    "status": "failed",

    "buildOutcome": "failure",

    "createdAt": "2025-05-01T02:48:57.132Z",

    "initializingAt": "2025-05-01T02:48:58.132Z",

    "runningAt": "2025-05-01T02:48:59.132Z",

    "stoppedAt": "2025-05-01T02:50:00.132Z",

    "buildTriggerMetadata": {

      "buildTriggerSource": "push_event",

      "branch": "main",

      "commitHash": "abc123def456",

      "commitMessage": "Fix bug in authentication",

      "author": "developer@example.com",

      "buildCommand": "npm run build",

      "deployCommand": "wrangler deploy",

      "rootDirectory": "/",

      "repoName": "my-worker-repo",

      "providerAccountName": "github-user",

      "providerType": "github"

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

Explain Code

#### `build.canceled`

Triggered when a build is canceled.

**Example:**

```

{

  "type": "cf.workersBuilds.worker.build.canceled",

  "source": {

    "type": "workersBuilds.worker",

    "workerName": "my-worker"

  },

  "payload": {

    "buildUuid": "build-12345678-90ab-cdef-1234-567890abcdef",

    "status": "canceled",

    "buildOutcome": "canceled",

    "createdAt": "2025-05-01T02:48:57.132Z",

    "initializingAt": "2025-05-01T02:48:58.132Z",

    "runningAt": "2025-05-01T02:48:59.132Z",

    "stoppedAt": "2025-05-01T02:49:30.132Z",

    "buildTriggerMetadata": {

      "buildTriggerSource": "push_event",

      "branch": "main",

      "commitHash": "abc123def456",

      "commitMessage": "Fix bug in authentication",

      "author": "developer@example.com",

      "buildCommand": "npm run build",

      "deployCommand": "wrangler deploy",

      "rootDirectory": "/",

      "repoName": "my-worker-repo",

      "providerAccountName": "github-user",

      "providerType": "github"

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

Explain Code

#### `build.succeeded`

Triggered when a build succeeds.

**Example:**

```

{

  "type": "cf.workersBuilds.worker.build.succeeded",

  "source": {

    "type": "workersBuilds.worker",

    "workerName": "my-worker"

  },

  "payload": {

    "buildUuid": "build-12345678-90ab-cdef-1234-567890abcdef",

    "status": "success",

    "buildOutcome": "success",

    "createdAt": "2025-05-01T02:48:57.132Z",

    "initializingAt": "2025-05-01T02:48:58.132Z",

    "runningAt": "2025-05-01T02:48:59.132Z",

    "stoppedAt": "2025-05-01T02:50:15.132Z",

    "buildTriggerMetadata": {

      "buildTriggerSource": "push_event",

      "branch": "main",

      "commitHash": "abc123def456",

      "commitMessage": "Fix bug in authentication",

      "author": "developer@example.com",

      "buildCommand": "npm run build",

      "deployCommand": "wrangler deploy",

      "rootDirectory": "/",

      "repoName": "my-worker-repo",

      "providerAccountName": "github-user",

      "providerType": "github"

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

Explain Code

### Workers KV

#### `namespace.created`

Triggered when a namespace is created.

**Example:**

```

{

  "type": "cf.kv.namespace.created",

  "source": {

    "type": "kv"

  },

  "payload": {

    "id": "ns-12345678-90ab-cdef-1234-567890abcdef",

    "name": "my-kv-namespace"

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

#### `namespace.deleted`

Triggered when a namespace is deleted.

**Example:**

```

{

  "type": "cf.kv.namespace.deleted",

  "source": {

    "type": "kv"

  },

  "payload": {

    "id": "ns-12345678-90ab-cdef-1234-567890abcdef",

    "name": "my-kv-namespace"

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

### Workflows

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

## Common schema fields

All events include these common fields:

| Field                        | Type   | Description                                                    |
| ---------------------------- | ------ | -------------------------------------------------------------- |
| type                         | string | The event type identifier                                      |
| source                       | object | Contains source-specific information like IDs and names        |
| metadata.accountId           | string | Your Cloudflare account ID                                     |
| metadata.eventSubscriptionId | string | The subscription that triggered this event                     |
| metadata.eventSchemaVersion  | number | The version of the event schema                                |
| metadata.eventTimestamp      | string | The ISO 8601 timestamp when the event occurred                 |
| payload                      | object | The event-specific data containing details about what happened |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/event-subscriptions/","name":"Event subscriptions"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/event-subscriptions/events-schemas/","name":"Events & schemas"}}]}
```
