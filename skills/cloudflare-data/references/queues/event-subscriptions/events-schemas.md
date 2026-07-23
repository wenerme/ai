---
description: Reference of available event sources and their schemas for Queues event subscriptions.
title: Events &amp; schemas
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt
> Use this file to discover all available pages before exploring further.

# Events & schemas

Last updated Jul 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/queues/event-subscriptions/events-schemas/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This page provides a comprehensive reference of available event sources and their corresponding events with schemas for [event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/). All events include common metadata fields and follow a consistent structure.

## Sources

### Access

#### `application.created`

Triggered when an application is created.

**Example:**

```json
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

#### `application.deleted`

Triggered when an application is deleted.

**Example:**

```json
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

### Artifacts

**Account-level events** — Subscribe to the `artifacts` source to receive events for any repository in your account.

#### `repo.created`

Triggered when a repository is created.

**Example:**

```json
{
  "type": "cf.artifacts.repo.created",
  "source": {
    "type": "artifacts",
    "namespace": "my-namespace",
    "repoName": "my-repo"
  },
  "payload": {
    "repoId": "0tvugavnogssnwzk",
    "defaultBranch": "main",
    "description": "My Artifacts repository",
    "readOnly": false,
    "createdAt": "2026-05-18T15:53:46.833Z",
    "updatedAt": "2026-05-18T15:53:46.833Z",
    "lastPushAt": null
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-05-18T15:53:48.187Z"
  }
}
```

#### `repo.deleted`

Triggered when a repository is deleted.

**Example:**

```json
{
  "type": "cf.artifacts.repo.deleted",
  "source": {
    "type": "artifacts",
    "namespace": "my-namespace",
    "repoName": "my-repo"
  },
  "payload": {
    "repoId": "0tvugavnogssnwzk",
    "defaultBranch": "main",
    "description": "My Artifacts repository",
    "readOnly": false,
    "createdAt": "2026-05-18T15:53:46.833Z",
    "updatedAt": "2026-05-18T15:53:46.833Z",
    "lastPushAt": null
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-05-18T15:53:59.914Z"
  }
}
```

#### `repo.forked`

Triggered when a repository is forked.

**Example:**

```json
{
  "type": "cf.artifacts.repo.forked",
  "source": {
    "type": "artifacts",
    "namespace": "source-namespace",
    "repoName": "source-repo"
  },
  "payload": {
    "namespace": "target-namespace",
    "repoName": "target-repo",
    "repoId": "5ankv1vhl4xnw7wq",
    "defaultBranch": "main",
    "description": "Fork of source-repo",
    "readOnly": false,
    "createdAt": "2026-05-18T15:53:52.384Z",
    "updatedAt": "2026-05-18T15:53:54.579Z",
    "lastPushAt": null
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-05-18T15:53:54.641Z"
  }
}
```

#### `repo.imported`

Triggered when a repository is imported from an external Git remote.

**Example:**

```json
{
  "type": "cf.artifacts.repo.imported",
  "source": {
    "type": "artifacts",
    "namespace": "my-namespace",
    "repoName": "my-repo"
  },
  "payload": {
    "repoId": "d7nd72k964cv9kub",
    "defaultBranch": "main",
    "description": null,
    "readOnly": false,
    "createdAt": "2026-05-18T15:53:54.864Z",
    "updatedAt": "2026-05-18T15:53:57.737Z",
    "lastPushAt": null,
    "sourceUrl": "https://github.com/example/repo.git",
    "branch": "main"
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-05-18T15:53:58.195Z"
  }
}
```

**Repository-level events** — Subscribe to the `artifacts.repo` source with a `namespace` and `repo_name` to receive events scoped to a single repository.

#### `pushed`

Triggered when commits are pushed to a repository.

**Example:**

```json
{
  "type": "cf.artifacts.repo.pushed",
  "source": {
    "type": "artifacts.repo",
    "namespace": "my-namespace",
    "repoName": "my-repo"
  },
  "payload": {
    "ref": "refs/heads/main",
    "before": "abc123def456abc123def456abc123def456abc1",
    "after": "def789ghi012def789ghi012def789ghi012def7",
    "commits": [
      {
        "id": "def789ghi012def789ghi012def789ghi012def7",
        "message": "Fix bug in authentication",
        "messageTruncated": false,
        "timestamp": "2025-05-01T02:48:57.000Z",
        "author": {
          "name": "Developer Name",
          "email": "developer@example.com"
        },
        "committer": {
          "name": "Developer Name",
          "email": "developer@example.com"
        },
        "parents": [
          "abc123def456abc123def456abc123def456abc1"
        ]
      }
    ],
    "totalCommitsCount": 1,
    "commitsTruncated": false
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

#### `cloned`

Triggered when a repository is cloned.

**Example:**

```json
{
  "type": "cf.artifacts.repo.cloned",
  "source": {
    "type": "artifacts.repo",
    "namespace": "my-namespace",
    "repoName": "my-repo"
  },
  "payload": {},
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "0ab4c7b45a39491ba5da2973f3d093a6",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-05-18T15:53:51.358Z"
  }
}
```

#### `fetched`

Triggered when updates are fetched from a repository.

**Example:**

```json
{
  "type": "cf.artifacts.repo.fetched",
  "source": {
    "type": "artifacts.repo",
    "namespace": "my-namespace",
    "repoName": "my-repo"
  },
  "payload": {},
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "0ab4c7b45a39491ba5da2973f3d093a6",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-05-18T15:53:51.358Z"
  }
}
```

#### `token.created`

Triggered when a repo-scoped token is created. Includes the token ID, scope, and expiration time.

**Example:**

```json
{
  "type": "cf.artifacts.repo.token.created",
  "source": {
    "type": "artifacts.repo",
    "namespace": "default",
    "repoName": "token-evt-repo"
  },
  "payload": {
    "tokenId": "7ngdf3ww3u84t33x",
    "scope": "read",
    "expiresAt": "2026-05-20T16:58:14.548Z"
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "0ab4c7b45a39491ba5da2973f3d093a6",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-05-20T16:58:14.548Z"
  }
}
```

#### `token.revoked`

Triggered when a repo-scoped token is revoked. Includes the token ID.

**Example:**

```json
{
  "type": "cf.artifacts.repo.token.revoked",
  "source": {
    "type": "artifacts.repo",
    "namespace": "default",
    "repoName": "token-evt-repo"
  },
  "payload": {
    "tokenId": "7ngdf3ww3u84t33x"
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "0ab4c7b45a39491ba5da2973f3d093a6",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-05-20T16:58:14.548Z"
  }
}
```

### Email Sending

Email Sending event subscriptions publish outbound transactional email lifecycle events for messages sent from an enabled sending domain. Each subscription is scoped to one sending domain: either the zone apex, such as `example.com`, or a verified sending subdomain, such as `send.example.com`.

Email Routing events, including inbound forwards, replies, Worker-emitted routing events, and deliveries to verified routing recipients, are not published as Email Sending events.

#### `message.delivered`

Triggered when the recipient mail server accepts the message.

**Example:**

```json
{
	"type": "cf.email.sending.message.delivered",
	"source": {
		"type": "email.sending",
		"zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
		"domain": "example.com"
	},
	"payload": {
		"eventId": "0190d0c4-7e9a-7b3c-9f12-1a2b3c4d5e6f",
		"messageId": "0101018f7d0c4d9a-msg-deadbeef",
		"sender": "noreply@example.com",
		"recipient": "user@example.net",
		"subject": "Welcome",
		"terminal": true,
		"delivery": {
			"status": "delivered",
			"provider": "gmail",
			"deliveryTimeMs": 1234,
			"smtpStatusCode": "250",
			"smtpEnhancedStatusCode": "2.0.0",
			"smtpResponse": "250 2.0.0 OK 1714820445 a1b2c3 - gsmtp"
		}
	},
	"metadata": {
		"accountId": "f9f79265f388666de8122cfb508d7776",
		"eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
		"eventSchemaVersion": 1,
		"eventTimestamp": "2026-06-01T02:48:57.132Z"
	}
}
```

#### `message.deferred`

Triggered when a temporary delivery failure occurs and delivery retries are still pending.

**Example:**

```json
{
	"type": "cf.email.sending.message.deferred",
	"source": {
		"type": "email.sending",
		"zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
		"domain": "send.example.com"
	},
	"payload": {
		"eventId": "0190d0c4-7e9b-7714-9004-11f0b6d9a341",
		"messageId": "0101018f7d0c4d9a-msg-deferred",
		"sender": "receipts@send.example.com",
		"recipient": "user@example.net",
		"subject": "Your receipt",
		"terminal": false,
		"delivery": {
			"status": "deferred",
			"provider": "external_smtp",
			"deliveryTimeMs": 2143,
			"smtpStatusCode": "451",
			"smtpEnhancedStatusCode": "4.2.0",
			"smtpResponse": "451 4.2.0 Temporary mailbox error"
		},
		"bounce": {
			"type": "soft",
			"classification": "temporary_failure",
			"reason": "451 4.2.0 Temporary mailbox error"
		}
	},
	"metadata": {
		"accountId": "f9f79265f388666de8122cfb508d7776",
		"eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
		"eventSchemaVersion": 1,
		"eventTimestamp": "2026-06-01T02:48:57.132Z"
	}
}
```

#### `message.bounced`

Triggered when a permanent bounce occurs, or when temporary delivery retries are exhausted.

**Example:**

```json
{
	"type": "cf.email.sending.message.bounced",
	"source": {
		"type": "email.sending",
		"zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
		"domain": "send.example.com"
	},
	"payload": {
		"eventId": "0190d0c4-7ea1-7af2-8b88-c1d2e3f4a5b6",
		"messageId": "0101018f7d0c4d9a-msg-bounced",
		"sender": "receipts@send.example.com",
		"recipient": "user@example.net",
		"subject": "Your receipt",
		"terminal": true,
		"delivery": {
			"status": "bounced",
			"provider": "external_smtp",
			"deliveryTimeMs": 2143,
			"smtpStatusCode": "550",
			"smtpEnhancedStatusCode": "5.1.1",
			"smtpResponse": "550 5.1.1 User unknown"
		},
		"bounce": {
			"type": "hard",
			"classification": "permanent_failure",
			"reason": "550 5.1.1 User unknown"
		}
	},
	"metadata": {
		"accountId": "f9f79265f388666de8122cfb508d7776",
		"eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
		"eventSchemaVersion": 1,
		"eventTimestamp": "2026-06-01T02:48:57.132Z"
	}
}
```

#### `message.failed`

Triggered when an internal or non-SMTP delivery error occurs.

**Example:**

```json
{
	"type": "cf.email.sending.message.failed",
	"source": {
		"type": "email.sending",
		"zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
		"domain": "example.com"
	},
	"payload": {
		"eventId": "0190d0c4-81c1-7bc6-9344-829cd9001a12",
		"messageId": "0101018f7d0c4d9a-msg-failed",
		"sender": "noreply@example.com",
		"recipient": "user@example.net",
		"subject": "Welcome",
		"terminal": true,
		"delivery": {
			"status": "failed"
		},
		"failure": {
			"reason": "delivery_failed"
		}
	},
	"metadata": {
		"accountId": "f9f79265f388666de8122cfb508d7776",
		"eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
		"eventSchemaVersion": 1,
		"eventTimestamp": "2026-06-01T02:48:57.132Z"
	}
}
```

#### `message.rejected`

Triggered when the message is rejected before delivery by policy, including suppression, validation rejection, or spam rejection.

**Example:**

```json
{
	"type": "cf.email.sending.message.rejected",
	"source": {
		"type": "email.sending",
		"zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
		"domain": "example.com"
	},
	"payload": {
		"eventId": "0190d0c4-830a-77e5-8fa0-8d10f4e8dc8b",
		"messageId": "0101018f7d0c4d9a-msg-rejected",
		"sender": "noreply@example.com",
		"recipient": "user@example.net",
		"subject": "Welcome",
		"terminal": true,
		"delivery": {
			"status": "rejected"
		},
		"rejection": {
			"reason": "suppressed",
			"party": "recipient",
			"detail": "Recipient is suppressed"
		}
	},
	"metadata": {
		"accountId": "f9f79265f388666de8122cfb508d7776",
		"eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
		"eventSchemaVersion": 1,
		"eventTimestamp": "2026-06-01T02:48:57.132Z"
	}
}
```

#### `message.complained`

Triggered when a delivered message is marked as spam by the recipient through a feedback loop.

**Example:**

```json
{
	"type": "cf.email.sending.message.complained",
	"source": {
		"type": "email.sending",
		"zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
		"domain": "send.example.com"
	},
	"payload": {
		"eventId": "0190d0c4-9f01-7c44-b2a1-aabbccddeeff",
		"messageId": "0101018f7d0c4d9a-msg-complained",
		"sender": "news@send.example.com",
		"recipient": "user@example.net",
		"terminal": true,
		"delivery": {
			"status": "complained"
		},
		"complaint": {
			"type": "abuse"
		}
	},
	"metadata": {
		"accountId": "f9f79265f388666de8122cfb508d7776",
		"eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
		"eventSchemaVersion": 1,
		"eventTimestamp": "2026-06-01T02:48:57.132Z"
	}
}
```

### R2

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

### Super Slurper

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

### Vectorize

#### `index.created`

Triggered when an index is created.

**Example:**

```json
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

#### `index.deleted`

Triggered when an index is deleted.

**Example:**

```json
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

### Workers AI

#### `batch.queued`

Triggered when a batch request is queued.

**Example:**

```json
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

#### `batch.succeeded`

Triggered when a batch request has completed.

**Example:**

```json
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

#### `batch.failed`

Triggered when a batch request has failed.

**Example:**

```json
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

### Workers Builds

#### `build.started`

Triggered when a build starts.

**Example:**

```json
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

#### `build.failed`

Triggered when a build fails.

**Example:**

```json
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

#### `build.canceled`

Triggered when a build is canceled.

**Example:**

```json
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

#### `build.succeeded`

Triggered when a build succeeds.

**Example:**

```json
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

### Workers KV

#### `namespace.created`

Triggered when a namespace is created.

**Example:**

```json
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

#### `namespace.deleted`

Triggered when a namespace is deleted.

**Example:**

```json
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

### Workflows

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/event-subscriptions/events-schemas/#page","headline":"Events & schemas · Cloudflare Queues docs","description":"Reference of available event sources and their schemas for Queues event subscriptions.","url":"https://developers.cloudflare.com/queues/event-subscriptions/events-schemas/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
