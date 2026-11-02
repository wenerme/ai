# Sidekiq queues administration API

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed, GitLab Dedicated

## Delete jobs from a Sidekiq queue

Deletes jobs from a Sidekiq queue that match the given metadata.

The response has three fields:

1. `deleted_jobs` - the number of jobs deleted by the request.
1. `queue_size` - the remaining size of the queue after processing the
   request.
1. `completed` - whether or not the request was able to process the
   entire queue in time. If not, retrying with the same parameters may
   delete further jobs (including those added after the first request
   was issued).

This API endpoint is only available to administrators.

```plaintext
DELETE /admin/sidekiq/queues/:queue_name
```

| Attribute           | Type   | Required | Description |
|---------------------|--------|----------|-------------|
| `queue_name`        | string | yes      | The name of the queue to delete jobs from |
| `user`              | string | no       | The username of the user who scheduled the jobs |
| `project`           | string | no       | The full path of the project where the jobs were scheduled from |
| `root_namespace`    | string | no       | The root namespace of the project |
| `subscription_plan` | string | no       | The subscription plan of the root namespace (GitLab.com only) |
| `caller_id`         | string | no       | The endpoint or background job that scheduled the job (for example: `ProjectsController#create`, `/api/:version/projects/:id`, `PostReceive`) |
| `feature_category`  | string | no       | The feature category of the background job (for example: `team_planning` or `code_review`) |
| `client_type`       | string | no       | The kind of client whose request scheduled the jobs (for example: `browser`, `ide`, or `mobile`) |
| `client_name`       | string | no       | The client whose request scheduled the jobs (for example: `vscode` or `gitlab-mobile-ios`) |
| `client_version`    | string | no       | The release of the client whose request scheduled the jobs (for example: `6.21.0` or `1.2.0`) |
| `worker_class`      | string | no       | The class of the background job worker (for example: `PostReceive` or `MergeWorker`) |

At least one attribute, other than `queue_name`, is required.

Example request:

```shell
curl --request DELETE \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/admin/sidekiq/queues/:queue_name"
```

Example response:

```json
{
  "completed": true,
  "deleted_jobs": 7,
  "queue_size": 14
}
```

## Manage Sidekiq worker concurrency limits

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/260641) in GitLab 19.6.

These administrator-only endpoints inspect, set, and clear temporary concurrency overrides for registered Sidekiq workers.

A positive override takes precedence over adaptive throttling and the class default.
Pausing takes precedence over an override.
Disabled concurrency middleware ignores overrides.

When an override expires or is cleared, the stored adaptive limit resumes if it remains valid.
Otherwise, the worker's runtime default applies.
Lowering a limit does not terminate running jobs.

### Retrieve a worker concurrency limit

```plaintext
GET /admin/sidekiq/concurrency_limits/:worker_class
```

Returns the worker's concurrency-limit status.

| Attribute | Type | Required | Description |
|:----------|:-----|:---------|:------------|
| `worker_class` | string | Yes | Registered worker class name. |

Example request:

```shell
curl --request GET \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/admin/sidekiq/concurrency_limits/Namespace::ExampleWorker"
```

Replace `Namespace::ExampleWorker` with a registered worker name. Namespaced names keep the `::` separator in the path.

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes) and the following response attributes:

| Attribute | Type | Description |
|:----------|:-----|:------------|
| `adaptive_limit` | integer or null | Stored adaptive limit, or `null` when absent. |
| `class_limit` | integer or null | Explicit class limit. `null` when the worker has no explicit limit. |
| `default_limit_requires_shard_context` | boolean | Whether the default is derived from shard size and cannot be reported outside a Sidekiq process. `false` when `sidekiq_concurrency_limit_default_calculation` is disabled, because the default is then `0`. |
| `deferred_jobs` | integer | Approximate deferred job count. |
| `disabled_for_worker` | boolean | Whether the worker-specific bypass flag disables enforcement in the client and server middleware. |
| `effective_limit` | integer or null | Effective limit. Zero means unlimited. Negative values mean paused. `null` means unknown without shard context. |
| `middleware_enabled` | boolean | Whether concurrency middleware is enabled. |
| `override_limit` | integer or null | Temporary override, or `null` when absent. |
| `override_ttl` | integer or null | Remaining override lifetime in seconds, or `null` when absent. |
| `running_jobs` | integer | Approximate running job count. |
| `worker_class` | string | Registered worker class name. |

Example response:

```json
{
  "worker_class": "Namespace::ExampleWorker",
  "class_limit": 10,
  "effective_limit": 20,
  "adaptive_limit": 6,
  "override_limit": 20,
  "override_ttl": 1800,
  "default_limit_requires_shard_context": false,
  "middleware_enabled": true,
  "disabled_for_worker": false,
  "running_jobs": 4,
  "deferred_jobs": 100
}
```

### Update a worker concurrency override

```plaintext
PUT /admin/sidekiq/concurrency_limits/:worker_class
```

Sets or replaces a temporary concurrency override.
The worker must not be paused.
Workers without a limit can receive a temporary cap.
Replacing an override restarts its time to live (TTL).

| Attribute | Type | Required | Description |
|:----------|:-----|:---------|:------------|
| `worker_class` | string | Yes | Registered worker class name. |
| `limit` | integer | Yes | Positive concurrency limit. Zero and negative values are rejected. |
| `ttl` | integer | No | Lifetime in seconds, from `1` to `86400`. Defaults to `1800`. |

Example request:

```shell
curl --request PUT \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --header "Content-Type: application/json" \
  --data '{"limit":20,"ttl":1800}' \
  --url "https://gitlab.example.com/api/v4/admin/sidekiq/concurrency_limits/ExampleWorker"
```

Returns `200 OK` with the [concurrency-limit status fields and example response](#retrieve-a-worker-concurrency-limit).

Returns `400 Bad Request` when:

- `limit` is zero or negative, or `ttl` is outside `1` to `86400`.
- The worker is paused.
- The `sidekiq_concurrency_limit_middleware` feature flag is disabled.
- The worker's `disable_sidekiq_concurrency_limit_middleware_<WorkerClass>` bypass flag is enabled.
- The worker is `ConcurrencyLimit::ResumeWorker`, which resumes deferred jobs and cannot be limited.

### Delete a worker concurrency override

```plaintext
DELETE /admin/sidekiq/concurrency_limits/:worker_class
```

Clears the temporary override and returns the updated concurrency-limit status.

| Attribute | Type | Required | Description |
|:----------|:-----|:---------|:------------|
| `worker_class` | string | Yes | Registered worker class name. |

Example request:

```shell
curl --request DELETE \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/admin/sidekiq/concurrency_limits/ExampleWorker"
```

Returns `200 OK` with the [concurrency-limit status fields](#retrieve-a-worker-concurrency-limit).

Example response:

```json
{
  "worker_class": "ExampleWorker",
  "class_limit": 10,
  "effective_limit": 6,
  "adaptive_limit": 6,
  "override_limit": null,
  "override_ttl": null,
  "default_limit_requires_shard_context": false,
  "middleware_enabled": true,
  "disabled_for_worker": false,
  "running_jobs": 4,
  "deferred_jobs": 100
}
```

All concurrency-limit endpoints return `404 Not Found` for unregistered workers, `401 Unauthorized` for unauthenticated requests, and `403 Forbidden` for non-administrators.
