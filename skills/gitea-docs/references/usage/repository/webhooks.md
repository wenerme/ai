---
date: "2016-12-01T16:00:00+02:00"
aliases:
  - /en-us/webhooks
  - /webhooks
---

# Webhooks

Gitea can send outbound webhooks for repository activity. Repository webhooks are
configured at `/:username/:reponame/settings/hooks` by a repository admin.
Equivalent webhook pages also exist for organizations, users, and system
administration.

Webhook configuration is available at four scopes:

- `Repository webhooks`: Trigger only for activity in one repository.
- `Organization webhooks`: Trigger for activity in repositories owned by that
  organization.
- `User webhooks`: Trigger for activity in repositories owned by that user.
- `System webhooks`: Trigger for all eligible activity on the instance.

Gitea also supports admin-defined `default webhooks`. These are not an extra
delivery scope. Instead, they are copied into newly created repositories and
then behave like ordinary repository webhooks.

Gitea supports these outgoing webhook integrations:

- Gitea
- Gogs
- Slack
- Discord
- Dingtalk
- Telegram
- Microsoft Teams
- Feishu
- Matrix
- Wechatwork
- Packagist

The `Gitea` and `Gogs` webhook types send generic webhook payloads. The chat and
service integrations listed above transform the same internal event into a
service-specific request body.

## Configuration

This section covers the webhook settings you choose when creating or editing a
webhook.

### Configuring a webhook

When creating a webhook, the main options are:

- `Target URL`: The endpoint that receives the delivery.
- `HTTP Method`: Usually `POST` for generic webhooks.
- `POST Content Type`: `application/json` or
  `application/x-www-form-urlencoded` for generic webhooks.
- `Secret`: Used to sign the raw request body with HMAC.
- `Authorization Header`: Optional custom `Authorization` header to send with
  each request.
- `Branch Filter`: Optional glob filter for branch and tag related events.
- `Trigger On`: `Push Events`, `All Events`, or a custom event selection.
- `Active`: Whether the webhook is enabled.

> **note**: Older examples may still show a `secret` field inside the JSON payload. Current
Gitea versions do not send the webhook secret in the payload body. Always verify
the request by checking the signature headers instead.

### Branch filters

The branch filter uses glob syntax compatible with
[`github.com/gobwas/glob`](https://pkg.go.dev/github.com/gobwas/glob#Compile).

- Empty, `*`, or `**` matches everything.
- A plain branch name such as `main` matches that branch.
- Full refs such as `refs/tags/v*` are also supported.
- Brace expressions such as `{main,release/*}` are supported.
- The filter only applies to events that carry a git ref, such as `create`,
  `delete`, and `push`.
- Events without a ref, such as issues or releases, ignore the branch filter.

Examples:

- `main`
- `{main,feature/*}`
- `{refs/heads/feature/*,refs/tags/release/*}`

### Authorization header

Gitea can be configured to send a custom
[Authorization header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)
with each webhook delivery. This is independent from the webhook secret:

- Use the secret to verify integrity with HMAC.
- Use the `Authorization` header when the receiving endpoint requires
  application-level authentication.

## Delivery

This section describes how Gitea sends webhook deliveries and how receivers can
identify and verify them.

### Delivery behavior

- Webhooks are delivered asynchronously over HTTP.
- Generic `Gitea` and `Gogs` webhooks support `POST` and `GET`; `POST` is the
  normal choice.
- For `POST` requests, the payload can be sent either as JSON
  (`application/json`) or as a form field named `payload`
  (`application/x-www-form-urlencoded`).
- Provider-specific integrations may use the HTTP method and body format
  required by that provider.

### Delivery headers

Every delivery includes a unique delivery ID and event headers. For
GitHub-compatible integrations, Gitea also sends the corresponding GitHub and
Gogs header names.

| Header | Description |
| --- | --- |
| `X-Gitea-Delivery` | Unique delivery UUID for this attempt. |
| `X-Gitea-Event` | Normalized event name, such as `push`, `issues`, or `pull_request`. |
| `X-Gitea-Event-Type` | More specific event type, such as `issue_assign` or `pull_request_review_comment`. |
| `X-Gitea-Signature` | Hex-encoded HMAC-SHA256 of the raw request body, without a prefix. |
| `X-Gitea-Hook-Installation-Target-Type` | Where the webhook is defined: typically `repository`, `organization`, `user`, or `system`. Default webhooks are copied into repositories before delivery, so they are typically delivered as `repository`. |
| `X-Gogs-Delivery`, `X-Gogs-Event`, `X-Gogs-Event-Type`, `X-Gogs-Signature` | Compatibility headers with the same values as the Gitea variants. |
| `X-GitHub-Delivery`, `X-GitHub-Event`, `X-GitHub-Event-Type` | GitHub-style compatibility headers. |
| `X-GitHub-Hook-Installation-Target-Type` | GitHub-style compatibility header for the webhook scope. |
| `X-Hub-Signature` | GitHub-compatible HMAC-SHA1 header in the form `sha1=<digest>`. |
| `X-Hub-Signature-256` | GitHub-compatible HMAC-SHA256 header in the form `sha256=<digest>`. |

If no secret is configured, the signature headers are still present, but their
digest values are empty.

#### `Event` versus `Event-Type`

Some Gitea webhook subscriptions are grouped together under one normalized event
name. For example, an issue assignment delivery uses the issue event group:

```http
X-Gitea-Event: issues
X-Gitea-Event-Type: issue_assign
X-GitHub-Event: issues
X-GitHub-Event-Type: issue_assign
```

Use `X-Gitea-Event-Type` when you need the exact trigger that fired the webhook.

#### Validating deliveries

Gitea signs the raw request body with your webhook secret. To validate a
delivery:

1. Read the request body exactly as it was received.
2. Compute the HMAC-SHA256 digest with your webhook secret.
3. Compare the result with `X-Gitea-Signature` or with the GitHub-compatible
   `X-Hub-Signature-256` header.
4. Use a constant-time comparison when possible.

Important details:

- `X-Gitea-Signature` contains only the lowercase hexadecimal SHA-256 digest.
- `X-Hub-Signature-256` contains the same digest with a `sha256=` prefix.
- `X-Hub-Signature` is also sent for compatibility and uses SHA-1.
- The body must be verified before JSON parsing or any other modification.

##### PHP example

The following example verifies a generic `Gitea` webhook sent as
`application/json`.

```php
<?php

$secret = '123';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Only POST is allowed');
}

$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_GITEA_SIGNATURE'] ?? '';

if ($payload === false || $signature === '') {
    http_response_code(400);
    exit('Missing payload or signature');
}

$expected = hash_hmac('sha256', $payload, $secret);

if (!hash_equals($expected, $signature)) {
    http_response_code(401);
    exit('Invalid signature');
}

$event = $_SERVER['HTTP_X_GITEA_EVENT'] ?? '';
$eventType = $_SERVER['HTTP_X_GITEA_EVENT_TYPE'] ?? '';
$data = json_decode($payload, true);

if (!is_array($data)) {
    http_response_code(400);
    exit('Invalid JSON payload');
}

http_response_code(204);
```

## Events

This section follows the same event-by-event style used by GitHub's webhook
documentation: each event describes when it occurs and what the top-level
payload contains.

The event groups match the webhook settings UI: `Repository Events`,
`Issue Events`, `Pull Request Events`, and `Workflow Events`.

### Repository Events

- `create`, `delete`, `fork`, `push`, `wiki`, `repository`, `release`, `package`, `status`

#### `create`

This event occurs when a branch or tag is created.

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `sha` | `string` | **Required.** The object ID of the created reference. |
| `ref` | `string` | **Required.** The created branch or tag name. |
| `ref_type` | `string` | **Required.** The reference type, such as `branch` or `tag`. |
| `repository` | `object` | **Required.** The repository where the reference was created. |
| `sender` | `object` | **Required.** The user who created the reference. |

#### `delete`

This event occurs when a branch or tag is deleted.

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `ref` | `string` | **Required.** The deleted branch or tag name. |
| `ref_type` | `string` | **Required.** The reference type, such as `branch` or `tag`. |
| `pusher_type` | `string` | **Required.** The actor type that deleted the ref. Current Gitea payloads use `user`. |
| `repository` | `object` | **Required.** The repository where the reference was deleted. |
| `sender` | `object` | **Required.** The user who deleted the reference. |

#### `fork`

This event occurs when a repository is forked.

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `forkee` | `object` | **Required.** The newly created fork repository. |
| `repository` | `object` | **Required.** The original repository that was forked. |
| `sender` | `object` | **Required.** The user who created the fork. |

#### `push`

This event occurs when commits are pushed to a branch or tag.

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `ref` | `string` | **Required.** The full pushed ref, such as `refs/heads/main`. |
| `before` | `string` | **Required.** The commit SHA before the push. |
| `after` | `string` | **Required.** The commit SHA after the push. |
| `compare_url` | `string` | **Required.** URL to compare `before` and `after`. |
| `commits` | `array` | **Required.** Commits included in the push. |
| `total_commits` | `integer` | **Required.** Number of commits in the push. |
| `head_commit` | `object` | The most recent commit in the push. |
| `repository` | `object` | **Required.** The repository that received the push. |
| `pusher` | `object` | **Required.** The user who performed the push. |
| `sender` | `object` | **Required.** The user who triggered the webhook. |

#### `wiki`

This event occurs when a wiki page is created, edited, or deleted.

**Action type:** `created`, `edited`, `deleted`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The wiki page action. |
| `repository` | `object` | **Required.** The repository that owns the wiki. |
| `sender` | `object` | **Required.** The user who changed the wiki page. |
| `page` | `string` | **Required.** The wiki page name. |
| `comment` | `string` | The wiki commit message or comment. |

#### `repository`

This event occurs when a repository is created or deleted.

**Action type:** `created`, `deleted`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The repository action. |
| `repository` | `object` | **Required.** The repository that was created or deleted. |
| `organization` | `object` | Present when the repository belongs to an organization. |
| `sender` | `object` | **Required.** The user who performed the action. |

#### `release`

This event occurs when a release is published, updated, or deleted.

**Action type:** `published`, `updated`, `deleted`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The release action. |
| `release` | `object` | **Required.** The release that was acted on. |
| `repository` | `object` | **Required.** The repository containing the release. |
| `sender` | `object` | **Required.** The user who performed the action. |

#### `package`

This event occurs when a package is created or deleted.

**Action type:** `created`, `deleted`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The package action. |
| `repository` | `object` | The repository associated with the package, when applicable. |
| `package` | `object` | **Required.** The package that was acted on. |
| `organization` | `object` | Present when the package owner is an organization. |
| `sender` | `object` | **Required.** The user who performed the action. |

#### `status`

This event occurs when a commit status is created or updated through the API.

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `commit` | `object` | The commit associated with the status. |
| `context` | `string` | **Required.** The status context, such as `ci/build`. |
| `created_at` | `string` | **Required.** The time the status was created. |
| `description` | `string` | Status description text. |
| `id` | `integer` | **Required.** The status identifier. |
| `repository` | `object` | **Required.** The repository containing the commit. |
| `sender` | `object` | **Required.** The user who created the status. |
| `sha` | `string` | **Required.** The commit SHA. |
| `state` | `string` | **Required.** The state, such as `pending`, `success`, `error`, or `failure`. |
| `target_url` | `string` | Target URL associated with the status. |
| `updated_at` | `string` | The time the status was last updated. |

Unlike most other payloads, this event does not use an `action` field. The
state transition is represented by `state`.

### Issue Events

- `issues`, `issue_assign`, `issue_label`, `issue_milestone`, `issue_comment`

#### `issues`

This event occurs when an issue is opened, closed, reopened, edited, or deleted.

**Action type:** `opened`, `closed`, `reopened`, `edited`, `deleted`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The issue action. |
| `number` | `integer` | **Required.** The issue number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `issue` | `object` | **Required.** The issue that was acted on. |
| `repository` | `object` | **Required.** The repository containing the issue. |
| `sender` | `object` | **Required.** The user who performed the action. |
| `commit_id` | `string` | The commit SHA associated with the issue action, if applicable. |

#### `issue_assign`

This event occurs when an issue is assigned or unassigned.

**Action type:** `assigned`, `unassigned`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The assignment action. |
| `number` | `integer` | **Required.** The issue number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `issue` | `object` | **Required.** The issue that was acted on. |
| `repository` | `object` | **Required.** The repository containing the issue. |
| `sender` | `object` | **Required.** The user who performed the action. |
| `commit_id` | `string` | The commit SHA associated with the issue action, if applicable. |

#### `issue_label`

This event occurs when issue labels are updated or cleared.

**Action type:** `label_updated`, `label_cleared`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The label update action. |
| `number` | `integer` | **Required.** The issue number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `issue` | `object` | **Required.** The issue that was acted on. |
| `repository` | `object` | **Required.** The repository containing the issue. |
| `sender` | `object` | **Required.** The user who performed the action. |
| `commit_id` | `string` | The commit SHA associated with the issue action, if applicable. |

#### `issue_milestone`

This event occurs when an issue is milestoned or demilestoned.

**Action type:** `milestoned`, `demilestoned`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The milestone action. |
| `number` | `integer` | **Required.** The issue number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `issue` | `object` | **Required.** The issue that was acted on. |
| `repository` | `object` | **Required.** The repository containing the issue. |
| `sender` | `object` | **Required.** The user who performed the action. |
| `commit_id` | `string` | The commit SHA associated with the issue action, if applicable. |

#### `issue_comment`

This event occurs when a comment on an issue is created, edited, or deleted.

**Action type:** `created`, `edited`, `deleted`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The comment action. |
| `issue` | `object` | **Required.** The issue that the comment belongs to. |
| `pull_request` | `object` | Present only when the comment is on a pull request timeline. |
| `comment` | `object` | **Required.** The comment that was created, edited, or deleted. |
| `changes` | `object` | Optional. Previous comment body when the action is `edited`. |
| `repository` | `object` | **Required.** The repository containing the issue. |
| `sender` | `object` | **Required.** The user who performed the action. |
| `is_pull` | `boolean` | **Required.** Whether the comment is on a pull request timeline. |

### Pull Request Events

- `pull_request`, `pull_request_assign`, `pull_request_label`, `pull_request_milestone`, `pull_request_comment`, `pull_request_review`, `pull_request_review_approved`, `pull_request_review_rejected`, `pull_request_review_comment`, `pull_request_sync`, `pull_request_review_request`

#### `pull_request`

This event occurs when a pull request is opened, closed, reopened, edited, or deleted.

**Action type:** `opened`, `closed`, `reopened`, `edited`, `deleted`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The pull request action. |
| `number` | `integer` | **Required.** The pull request number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `pull_request` | `object` | **Required.** The pull request that was acted on. |
| `requested_reviewer` | `object` | Present for review request events. |
| `repository` | `object` | **Required.** The repository containing the pull request. |
| `sender` | `object` | **Required.** The user who performed the action. |
| `commit_id` | `string` | The commit SHA associated with the pull request action, if applicable. |
| `review` | `object` | Present for pull request review events. |

#### `pull_request_assign`

This event occurs when a pull request is assigned or unassigned.

**Action type:** `assigned`, `unassigned`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The assignment action. |
| `number` | `integer` | **Required.** The pull request number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `pull_request` | `object` | **Required.** The pull request that was acted on. |
| `requested_reviewer` | `object` | Present for review request events. |
| `repository` | `object` | **Required.** The repository containing the pull request. |
| `sender` | `object` | **Required.** The user who performed the action. |
| `commit_id` | `string` | The commit SHA associated with the pull request action, if applicable. |
| `review` | `object` | Present for pull request review events. |

#### `pull_request_label`

This event occurs when pull request labels are updated or cleared.

**Action type:** `label_updated`, `label_cleared`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The label update action. |
| `number` | `integer` | **Required.** The pull request number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `pull_request` | `object` | **Required.** The pull request that was acted on. |
| `requested_reviewer` | `object` | Present for review request events. |
| `repository` | `object` | **Required.** The repository containing the pull request. |
| `sender` | `object` | **Required.** The user who performed the action. |
| `commit_id` | `string` | The commit SHA associated with the pull request action, if applicable. |
| `review` | `object` | Present for pull request review events. |

#### `pull_request_milestone`

This event occurs when a pull request is milestoned or demilestoned.

**Action type:** `milestoned`, `demilestoned`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The milestone action. |
| `number` | `integer` | **Required.** The pull request number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `pull_request` | `object` | **Required.** The pull request that was acted on. |
| `requested_reviewer` | `object` | Present for review request events. |
| `repository` | `object` | **Required.** The repository containing the pull request. |
| `sender` | `object` | **Required.** The user who performed the action. |
| `commit_id` | `string` | The commit SHA associated with the pull request action, if applicable. |
| `review` | `object` | Present for pull request review events. |

#### `pull_request_comment`

This event occurs when a timeline comment on a pull request is created, edited, or deleted.

**Action type:** `created`, `edited`, `deleted`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The comment action. |
| `issue` | `object` | **Required.** The related issue record for the pull request. |
| `pull_request` | `object` | **Required.** The pull request the timeline comment belongs to. |
| `comment` | `object` | **Required.** The comment that was created, edited, or deleted. |
| `changes` | `object` | Optional. Previous comment body when the action is `edited`. |
| `repository` | `object` | **Required.** The repository containing the pull request. |
| `sender` | `object` | **Required.** The user who performed the action. |
| `is_pull` | `boolean` | **Required.** Always `true` for this event. |

#### `pull_request_review`

This is a subscription-only umbrella event in the webhook settings UI.

It does not have its own delivery payload. When selected, Gitea delivers the
more specific events `pull_request_review_approved`,
`pull_request_review_rejected`, and `pull_request_review_comment`.

#### `pull_request_review_approved`

This event occurs when a pull request review is submitted with approval.

**Action type:** `reviewed`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** Always `reviewed`. |
| `number` | `integer` | **Required.** The pull request number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `pull_request` | `object` | **Required.** The pull request that was reviewed. |
| `requested_reviewer` | `object` | Present for review request events. |
| `repository` | `object` | **Required.** The repository containing the pull request. |
| `sender` | `object` | **Required.** The user who submitted the review. |
| `commit_id` | `string` | The commit SHA associated with the review event, if applicable. |
| `review` | `object` | **Required.** The review payload. For this event, `review.type` is `approved`. |

#### `pull_request_review_rejected`

This event occurs when a pull request review is submitted with a rejection or a
request for changes.

**Action type:** `reviewed`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** Always `reviewed`. |
| `number` | `integer` | **Required.** The pull request number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `pull_request` | `object` | **Required.** The pull request that was reviewed. |
| `requested_reviewer` | `object` | Present for review request events. |
| `repository` | `object` | **Required.** The repository containing the pull request. |
| `sender` | `object` | **Required.** The user who submitted the review. |
| `commit_id` | `string` | The commit SHA associated with the review event, if applicable. |
| `review` | `object` | **Required.** The review payload. For this event, `review.type` is `rejected`. |

#### `pull_request_review_comment`

This event occurs when a pull request review is submitted as a comment.

**Action type:** `reviewed`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** Always `reviewed`. |
| `number` | `integer` | **Required.** The pull request number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `pull_request` | `object` | **Required.** The pull request that was reviewed. |
| `requested_reviewer` | `object` | Present for review request events. |
| `repository` | `object` | **Required.** The repository containing the pull request. |
| `sender` | `object` | **Required.** The user who submitted the review. |
| `commit_id` | `string` | The commit SHA associated with the review event, if applicable. |
| `review` | `object` | **Required.** The review payload. For this event, `review.type` is `comment`. |

#### `pull_request_sync`

This event occurs when a pull request is synchronized after new commits are pushed.

**Action type:** `synchronized`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** Always `synchronized`. |
| `number` | `integer` | **Required.** The pull request number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `pull_request` | `object` | **Required.** The pull request that was synchronized. |
| `requested_reviewer` | `object` | Present for review request events. |
| `repository` | `object` | **Required.** The repository containing the pull request. |
| `sender` | `object` | **Required.** The user who performed the synchronization. |
| `commit_id` | `string` | The commit SHA associated with the synchronization event, if applicable. |
| `review` | `object` | Present for pull request review events. |

#### `pull_request_review_request`

This event occurs when a reviewer is requested or a review request is removed.

**Action type:** `review_requested`, `review_request_removed`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The review request action. |
| `number` | `integer` | **Required.** The pull request number. |
| `changes` | `object` | Optional. Previous values for edited fields or label deltas. |
| `pull_request` | `object` | **Required.** The pull request that was acted on. |
| `requested_reviewer` | `object` | The reviewer that was requested or removed. |
| `repository` | `object` | **Required.** The repository containing the pull request. |
| `sender` | `object` | **Required.** The user who performed the action. |
| `commit_id` | `string` | The commit SHA associated with the pull request action, if applicable. |
| `review` | `object` | Present for pull request review events. |

### Workflow Events

- `workflow_run`, `workflow_job`

#### `workflow_run`

This event occurs when a Gitea Actions workflow run changes status.

**Action type:** `queued`, `waiting`, `in_progress`, `completed`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The workflow run status transition. |
| `workflow` | `object` | **Required.** The workflow definition. |
| `workflow_run` | `object` | **Required.** The workflow run that was acted on. |
| `pull_request` | `object` | Present when the workflow run is associated with a pull request. |
| `organization` | `object` | Present when the repository owner is an organization. |
| `repository` | `object` | **Required.** The repository containing the workflow. |
| `sender` | `object` | **Required.** The user who triggered the workflow run update. |

#### `workflow_job`

This event occurs when a Gitea Actions workflow job changes status.

**Action type:** `queued`, `waiting`, `in_progress`, `completed`

##### Payload parameters

| Name | Type | Description |
| --- | --- | --- |
| `action` | `string` | **Required.** The workflow job status transition. |
| `workflow_job` | `object` | **Required.** The workflow job that was acted on. |
| `pull_request` | `object` | Present when the workflow job is associated with a pull request. |
| `organization` | `object` | Present when the repository owner is an organization. |
| `repository` | `object` | **Required.** The repository containing the workflow job. |
| `sender` | `object` | **Required.** The user who triggered the workflow job update. |

## Testing, recent deliveries, and replay

Each webhook page includes:

- `Test Delivery`, which sends a synthetic `push` event for the repository.
- `Recent Deliveries`, which shows request and response details.
- `Redelivery`, which replays an earlier webhook delivery.

If the repository has no commits yet, the test delivery uses a generated fake
commit so the webhook can still be exercised.

## Administration notes

Administrators can further control webhook delivery with instance settings such
as host allow lists, delivery timeouts, and cleanup policies. See the
[Webhook section of the configuration cheat sheet](../../administration/config-cheat-sheet.md#webhook-webhook).
