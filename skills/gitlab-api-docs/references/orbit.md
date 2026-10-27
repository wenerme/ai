# Orbit API

REST API to run queries, retrieve schemas, and check cluster health for Orbit.

- Tier: Premium, Ultimate
- Offering: GitLab.com
- Status: Beta

- [Introduced](https://gitlab.com/groups/gitlab-org/-/epics/19744) as an [experiment](../policy/development_stages_support.md) in GitLab 18.10 [with a feature flag](../administration/feature_flags/_index.md) named `knowledge_graph`. Disabled by default.
- [Changed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/237959) from experiment to beta in GitLab 19.1.
- [Enabled on GitLab.com](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/245620) in GitLab 19.3.
- [GQL mode introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/256465) in GitLab 19.4 with a feature flag named `orbit_gql_queries`. Disabled by default.
- Feature flag `knowledge_graph` [removed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/259054) in GitLab 19.5.
- GQL mode [enabled on GitLab.com](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/265010) in GitLab 19.6.

Use this API to run queries, retrieve schemas, and check cluster health for
[Orbit](https://gitlab.com/gitlab-org/orbit/knowledge-graph).

## Search for graph entities

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/256404) as an [experiment](../policy/development_stages_support.md) in GitLab 19.4.

Searches for readable entities in a project or group and returns Orbit entity tokens.
Results use GitLab search, and might be available before the graph indexes the entities.
The endpoint selects Zoekt, Advanced Search, or Basic search independently for each scope.
Every selected scope appears in `scopes` with a `status`, so you can tell an empty scope from one that was skipped, unavailable, or failed.

You need at least the Reporter role in a group under the target's top-level group, and Orbit must be turned on for that top-level group.
Without a Reporter membership in any Orbit-enabled top-level group, such as a project-only member, the endpoint returns `403 Forbidden`.
Otherwise, a target outside your Orbit-enabled top-level groups returns `404 Not Found`.
Where the instance license covers Orbit, administrators in Admin Mode and auditors only need Orbit turned on for the target's top-level group.
On GitLab.com, they still need the usual Orbit entitlement, like the other Orbit endpoints: a Reporter membership in an entitled top-level group.
A search that GitLab search treats as abusive, such as a stop word or a term that is too short or too long, returns `400 Bad Request`.
The endpoint counts toward the Orbit query rate limit. It also counts once toward the [search rate limit](../administration/instance_limits.md#search-rate-limit), plus once for each further scope it searches. Once you hit that limit, the remaining scopes return `rate_limited` without searching.

```plaintext
GET /api/v4/orbit/grep
```

Supported attributes:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `search` | string | Yes | Search terms. Must contain between 2 and 256 bytes after leading and trailing whitespace is removed. |
| `full_path` | string | Conditional | Full path of a project or group. Required if `namespace_id` and `project_id` are omitted. |
| `namespace_id` | integer | Conditional | ID of a group. Required if `full_path` and `project_id` are omitted. |
| `project_id` | integer | Conditional | ID of a project. Required if `full_path` and `namespace_id` are omitted. |
| `limit` | integer | No | Maximum total results. From 1 to 50. Default is 20. |
| `per_scope` | integer | No | Maximum results per scope. From 1 to 10 and no greater than `limit`. Default is 5. |
| `response_format` | string | No | Response format. One of `raw` or `llm`. Default is `raw`. |
| `scopes` | string array | No | Scopes to search, as a comma-separated list or repeated `scopes[]` parameters. Valid values: `work_items`, `merge_requests`, `blobs`, `commits`, `notes`, `milestones`, `users`, `projects`, `groups`, and `branches`, or a node type, singular, or alias such as `MergeRequest`, `mr`, `issue`, or `comment`. Defaults to all scopes except `branches`. |

Provide exactly one of `full_path`, `namespace_id`, or `project_id`.
Scopes are searched in a fixed order: work items, merge requests, blobs, commits, notes,
milestones, users, projects, groups, and branches. The total `limit` applies only to the selected scopes.
`branches` matches branch names in a project. It needs permission to read the code, and `read_branch` for a fine-grained
token. Otherwise, it returns `not_available_for_target`.

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes) and the following
response attributes for `response_format=raw`:

| Attribute | Type | Description |
|-----------|------|-------------|
| `request` | object | Effective request values: `search`, `limit`, and `per_scope`. |
| `result_count` | integer | Number of returned results. |
| `results` | object array | Results from all scopes, in scope order. |
| `results[].id` | integer or string | Entity ID. The commit SHA for commits, and `null` for files and branches. |
| `results[].matches` | object array | Matched lines for a file, when the search type returns them. Each entry has `start_line`, `end_line`, and `text`. Basic search keeps the first match for each file. |
| `results[].reference` | object | Structured entity reference. |
| `results[].scope` | string | Scope that returned the result. |
| `results[].state` | string | State of a work item (`opened` or `closed`), merge request (`opened`, `closed`, `locked`, or `merged`), or milestone (`active` or `closed`). |
| `results[].text` | string | One-line result text, truncated to 200 characters. |
| `results[].token` | string | Entity token in the form `Type[id]`, or `path@ref` for commits and branches. `null` for files. |
| `results[].type` | string | Orbit entity type. |
| `scopes` | object array | One entry for every selected scope. |
| `scopes[].backend` | string | Search type used for the scope: `basic`, `advanced`, or `zoekt`. Present when `status` is `ok`. |
| `scopes[].name` | string | Search scope name. |
| `scopes[].pagination` | object | Present when `status` is `ok`. `has_more` is `true` when the scope has more results than were returned. |
| `scopes[].reason` | object | Present when `status` is not `ok`. `code` is one of `not_available_for_search_type`, `not_available_for_target`, `search_type_error`, `invalid_search`, `search_failed`, `timeout`, `rate_limited`, or `limit_reached`. |
| `scopes[].result_count` | integer | Number of results from the scope. Present when `status` is `ok`. |
| `scopes[].status` | string | One of `ok`, `unavailable`, `skipped`, or `error`. `unavailable` means the search type or target doesn't support the scope, the search backend rejected the request (for example, a Zoekt project limit), or you don't have access to it. `skipped` means the total `limit` was reached first. `error` means the search failed or hit the search rate limit, and other scopes keep their results. |
| `target` | object | Search target. |
| `target.full_path` | string | Full path of the target. |
| `target.id` | integer | Target ID. |
| `target.token` | string | Entity token of the target. |
| `target.type` | string | `Project` or `Group`. |
| `truncated` | boolean | Whether the total limit was reached before all scopes were exhausted, or a scope has more results than `per_scope`. |
| `version` | string | Grep response contract version. |

Files use a `reference` with `project_id`, `project_path`, `path`, `branch`, and `commit_sha`.
`branch` is the default branch for Advanced Search and Zoekt results.
`commit_sha` is the indexed commit for Advanced Search results, and `null` otherwise.
Commits use a `reference` with `project_id`, `project_path`, and `sha`.
Merge requests use a `reference` with the global database `id`, the `iid`, and `project_path`.
Work items use a `reference` with the global database `id`, the `iid`, and `project_path`.
Group-level work items have `namespace_path` instead of `project_path`.
Notes use a `reference` with the global database `id` and a `noteable_reference` to what they belong to,
for example `example-group/example-project!42` for a merge request, `example-group/example-project#7` for a work item,
or `example-group/example-project@e79b2dc8c2cca1ed93c8c760dfa89b8e47ed1720` for a commit.
Notes on merge requests and work items also have the `noteable` token, for example `MergeRequest[42]`.
Notes on other noteables, such as snippets and designs, have only the `id`.
Other entities use a reference with the global database `id`.

Example request:

```shell
curl --request GET \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/orbit/grep?search=search%20term&project_id=1&scopes=merge_requests,blobs,notes&limit=2&per_scope=2"
```

Example response:

```json
{
  "version": "1.2.0",
  "request": {"search": "search term", "limit": 2, "per_scope": 2},
  "target": {"type": "Project", "id": 1, "token": "Project[1]", "full_path": "example-group/example-project"},
  "scopes": [
    {"name": "merge_requests", "status": "ok", "backend": "advanced", "result_count": 1, "pagination": {"has_more": false}},
    {"name": "blobs", "status": "ok", "backend": "advanced", "result_count": 1, "pagination": {"has_more": true}},
    {"name": "notes", "status": "skipped", "reason": {"code": "limit_reached"}}
  ],
  "results": [
    {
      "scope": "merge_requests",
      "type": "MergeRequest",
      "id": 42,
      "token": "MergeRequest[42]",
      "reference": {"id": 42, "iid": 7, "project_path": "example-group/example-project"},
      "text": "Add scoped search",
      "state": "opened"
    },
    {
      "scope": "blobs",
      "type": "File",
      "id": null,
      "token": null,
      "reference": {"project_id": 1, "project_path": "example-group/example-project", "path": "README.md", "branch": "main", "commit_sha": "e79b2dc8c2cca1ed93c8c760dfa89b8e47ed1720"},
      "text": "README.md",
      "matches": [{"start_line": 3, "end_line": 5, "text": "A search term in context"}]
    }
  ],
  "result_count": 2,
  "truncated": true
}
```

For `response_format=llm`, the endpoint returns compact `text/plain` output:

```plaintext
orbit_grep version=1.2.0 target=Project[1] search="search term" scopes="merge_requests,blobs,notes" results=2 truncated=true
- MergeRequest[42] type=MergeRequest iid="7" project_path="example-group/example-project" state="opened" text="Add scoped search"
- File project_id="1" project_path="example-group/example-project" path="README.md" branch="main" commit_sha="e79b2dc8c2cca1ed93c8c760dfa89b8e47ed1720" type=File text="README.md"
! skipped scope=notes reason=limit_reached
```

## Entity context

- Status: Experiment

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/262223) as an [experiment](../policy/development_stages_support.md) in GitLab 19.4.

> [!warning]
> This endpoint is an experiment. The request and response shape can change without notice.

Resolves one token to a summary of a merge request, work item, CI/CD job, CI/CD pipeline, branch, or commit.
Optionally, it attaches the graph neighborhood of the entity.

Every request that reaches token resolution counts once against the `orbit_query` rate limit.
This includes summary-only requests, `not_found` results, expansion errors, and `403` responses for users
without an Orbit-enabled group. Requests rejected with `400` do not count.

With a [fine-grained personal access token](../auth/tokens/fine_grained_access_tokens_rest.md), the
`read_orbit` permission is not enough. The token also needs `read_merge_request` or `read_work_item` on the
project or group of the entity, `read_job` on the project for a job and for job logs, `read_pipeline` for pipelines
and failed tests, `read_pipeline_job` for pipeline jobs, `read_branch` or `read_commit` for a branch or commit,
`read_commit_diff` and `read_commit_merge_request` for a commit's changed files and merge requests, and `download_code`
for the changed files of a merge request. Without them,
the entity is returned as `not_found`. The pipeline status is `null`, and linked items you cannot read are left out of the summary.
The token's project scope applies to the entity summary only. The graph expansion is filtered by your own access, the same as for named queries.

```plaintext
POST /api/v4/orbit/context
```

Supported attributes:

| Attribute         | Type         | Required | Description |
|-------------------|--------------|----------|-------------|
| `tokens`          | string array | Yes      | Exactly one token. See [token forms](#token-forms). |
| `expand`          | boolean      | No       | If `true`, attaches the graph neighborhood of the entity. Default is `false`. |
| `response_format` | string       | No       | One of `raw` or `llm`. Default is `raw`. |

A `tokens` array that does not hold exactly one string, or a value for `expand` that is not the JSON
boolean `true` or `false`, returns `400 Bad Request`.
The endpoint requires a JSON request body.

Other failures:

- `403 Forbidden`: Orbit is not licensed for you, or you have no Orbit-enabled group.
- `404 Not Found`: Orbit is not available for you.
- `429 Too Many Requests`: You exceeded the `orbit_query` rate limit.

### Token forms

- `Type[id]`, for example `MergeRequest[123]`. `id` is the global database ID.
- `gid://gitlab/<Type>/<id>`.
- A merge request, issue, work item, job, pipeline, or commit URL on this instance, including group work item URLs under `/groups/`.
- `path!iid` for a merge request, for example `gitlab-org/gitlab!42`.
- `path#iid` for a work item, for example `gitlab-org/gitlab#7`. The path can also be a group.
- `Epic[id]`, `gid://gitlab/Epic/<id>`, an epic URL such as `/groups/gitlab-org/-/epics/5`,
  or `group&iid`, for example `gitlab-org&5`. `id` is the epic ID.
- `path@ref` for a branch of the project at `path`, or for a commit SHA when no branch has that name, for example
  `gitlab-org/gitlab@main`.

The supported types are `MergeRequest`, `WorkItem`, `Job`, `Pipeline`, `Branch`, and `Commit`. `Issue` is an alias for `WorkItem`,
and the response reports `WorkItem`. An epic resolves to its work item in the same way:
the response reports `WorkItem`, the ID of the work item, and `work_item_type` `epic`,
and the expansion runs for the work item. Other types return `unsupported_type`.

### Response

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes) and the following
response attributes for `response_format=raw`:

| Attribute                           | Type         | Description |
|-------------------------------------|--------------|-------------|
| `version`                           | string       | Response contract version, `1.3.0`. |
| `entities`                          | object array | One entry for the one token. |
| `entities[].token`                  | string       | Token as sent. |
| `entities[].resolved_token`         | string       | Token in `Type[id]` form, or `path@ref` for a branch or commit. Only present when `found` is `true`. |
| `entities[].type`                   | string       | `MergeRequest`, `WorkItem`, `Job`, `Pipeline`, `Branch`, or `Commit`. `null` when `found` is `false`. |
| `entities[].id`                     | string       | Global database ID, in the same form as the node IDs in the graph result, or the branch name or commit SHA. For `iid` and `path@ref` forms, `null` when `found` is `false`. For `Type[id]` and GID tokens, the ID that was sent. |
| `entities[].found`                  | boolean      | Whether the entity exists and you can read it. |
| `entities[].summary`                | object       | Summary of a found entity. Contains `namespace_path` and `project_path`. `project_path` is `null` for group work items. Other fields can be added. |
| `entities[].error.code`             | string       | `invalid_token`, `unsupported_type`, or `not_found`. Present when `found` is `false`. |
| `entities[].expansion`              | object       | `null` when `expand` is `false` or the token was not found. Otherwise, `{"result": ...}` or `{"error": {"code": ...}}`, plus `query`. |
| `entities[].expansion.query`        | object       | The named query that ran or would have run: `name` and `parameters` (`node_ids` and `limit`). Absent for `expansion_unsupported_type`. |

Summaries include these fields:

- For a merge request: title, state, author, branches, head pipeline status, merge commit, reviewers,
  linked issues, description, changed files, failed jobs, and discussions.
- For a work item: title, state, labels, assignees, milestone, linked merge requests, description, and discussions.
- For a job: name, status, stage, failure reason, ref, commit, pipeline, merge request, failed tests, and log tail.
- For a pipeline: status, ref, commit, source, merge request, jobs, and failed jobs. Jobs come from the pipeline
  itself, not from its child pipelines.
- For a branch: head commit, its open or latest merge request, and its latest pipeline with failed jobs.
- For a commit: title, description, author, its latest pipeline, the merge requests that contain it, and changed files.

Failed tests come from the job's [unit test report](../ci/testing/unit_test_reports.md). The log tail is the last
60 lines of the job script output, or of the whole log when a job failed before its script started.
Changed line ranges use new-file line numbers, so a deletion is reported at the line after it, which can be
one past the end of the file. A changed file has no `lines` when it was deleted or its diff could not be read,
and empty `lines` when its diff has no text lines, such as for a binary or very large file.

Lists are limited and contain only records you can read. `summary.truncated` is an array with the names of
the lists that were cut, for example `["reviewers"]`. It is empty when no list was cut.
A failed job of a merge request whose failed tests were cut has `truncated: ["failed_tests"]`.
Entries in `linked_issues` and `linked_merge_requests` are ordered by ID and have `type`, `id`
(a string), `token`, `relation` (`CLOSES`), `iid`, `project_path`, and `title`.
Every failure after a lookup starts returns the same `not_found` error,
whether the record is missing or you cannot read it.

### Expansion

With `expand`, the request runs at most one graph query, using the `context_for_review`,
`context_for_issue`, or `context_for_job` named query. Other types return `expansion_unsupported_type`.
A request that runs one query is billed as one query.
A failure of the expansion never fails the summary.

`expansion.query` has the `name` and `parameters` of the query. It is present on a result and on every error
except `expansion_unsupported_type`, including when no query ran. After `outside_graph_scope`,
a rerun is billed and returns nothing.

`expansion.error.code` is one of:

- `expansion_unsupported_type`: The type has no expansion query.
- `outside_graph_scope`: The entity is outside the part of the graph you can query. This is a group where
  you are not at least a Reporter, or a group where Orbit is not turned on. No query runs and nothing is billed.
- `billing_namespace_required`: The error also has `message`, `deep_link` to your preferences,
  and `candidates`, the groups you can select. This matches the `422` response of `POST /api/v4/orbit/query/:name`.
- `quota_exhausted`, `timeout`, or `execution_error`.

If `pagination.truncated` in the graph result is `false`, a missing center node means the entity
has no readable neighbors. Otherwise, treat it as unknown.

Example request:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --header "Content-Type: application/json" \
  --data '{"tokens": ["gitlab-org/gitlab#609451"], "expand": true}' \
  --url "https://gitlab.example.com/api/v4/orbit/context"
```

Example response:

```json
{
  "version": "1.2.0",
  "entities": [
    {
      "token": "gitlab-org/gitlab#609451",
      "resolved_token": "WorkItem[196910643]",
      "type": "WorkItem",
      "id": "196910643",
      "found": true,
      "summary": {
        "namespace_path": "gitlab-org",
        "project_path": "gitlab-org/gitlab",
        "title": "Describe graph entities",
        "state": "opened",
        "iid": 609451,
        "work_item_type": "issue",
        "web_url": "https://gitlab.example.com/gitlab-org/gitlab/-/work_items/609451",
        "labels": ["knowledge graph"],
        "assignees": [{"id": 7, "username": "alex_smith", "name": "Alex Smith"}],
        "milestone": null,
        "linked_merge_requests": [
          {
            "type": "MergeRequest",
            "id": "412345",
            "token": "MergeRequest[412345]",
            "relation": "CLOSES",
            "iid": 1201,
            "project_path": "gitlab-org/gitlab",
            "title": "Add entity context"
          }
        ],
        "truncated": []
      },
      "expansion": {
        "query": {
          "name": "context_for_issue",
          "parameters": {"node_ids": [196910643], "limit": 100}
        },
        "result": {
          "format_version": "5.0.4",
          "query_type": "neighbors",
          "nodes": [
            {"type": "WorkItem", "id": "196910643", "title": "Describe graph entities"},
            {"type": "MergeRequest", "id": "412345", "iid": 1201}
          ],
          "edges": [
            {"from": "MergeRequest", "from_id": "412345", "to": "WorkItem", "to_id": "196910643", "type": "CLOSES"}
          ],
          "pagination": {"has_more": false, "truncated": false}
        }
      }
    }
  ]
}
```

With `response_format=llm`, the response is `text/plain`. It contains the summary text,
then the graph in TOON format under a `graph:` label, or a single `error <code>` line.
When a list in an entity is cut, the entity includes a `truncated=` line right after its scalar
fields that names the incomplete lists, for example `truncated=reviewers,changed_files`.
A failed job whose failed tests were cut has its own `truncated=failed_tests` line.

## Endpoint reference

For the full reference of Orbit endpoints, including paths, parameters, and
responses, see the [interactive API reference](https://api.gitlab.com/rest/#tag/orbit).
The following sections cover query DSL behavior and worked examples that the
generated reference doesn't show.

## Query mode

> [!flag]
> The availability of GQL query mode is controlled by a feature flag named `orbit_gql_queries`.
> For more information, see the history.

Queries use read-only GQL strings, and discovery returns GQL guidance, by default.
An administrator can disable `orbit_gql_queries` to switch back to JSON DSL objects.
GQL follows openCypher 9 syntax.
The flag targets individual users.
REST and MCP callers cannot override the mode through parameters or headers.
With the flag enabled (the default), `response_format: gql` returns query results as a plain-text table.

## Skills

- [Introduced](https://gitlab.com/gitlab-org/orbit/knowledge-graph/-/work_items/1063) in GitLab 19.5.

Skill endpoints require authentication with the `read_api` scope.
They don't check the Orbit license, so unavailable skills return `404 Not Found` instead of `403 Forbidden`.
The response is `404 Not Found` with the message `Skills are not available` when:

- The knowledge graph service is an older version without skill RPCs.
- The knowledge graph service isn't configured on the instance. On GitLab Self-Managed, this is
  controlled by `orbit.enabled` in `gitlab.yml`, or the legacy `knowledge_graph.enabled` setting.
- The current user doesn't have at least the Reporter role in a group whose top-level group has Orbit
  turned on. Administrators in Admin Mode and auditors are exempt from this role requirement.

In these cases, the Orbit CLI uses its embedded local skill.

### List deployed skills

Lists the Orbit skills deployed with the connected knowledge graph service.

```plaintext
GET /orbit/skills
```

This request takes no attributes.

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes) and the following response attributes:

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `server_version` | string | Version of the deployed knowledge graph service. |
| `skills` | array | Deployed skills. |
| `skills[].compatibility` | string | Environment requirements from the skill manifest. |
| `skills[].description` | string | Description from the skill manifest. |
| `skills[].name` | string | Skill name. |
| `skills[].version` | string | Skill version from the manifest. |

The response includes an `ETag` header derived from the sorted skill names and versions,
and a `Cache-Control` header set to `private, max-age=0, must-revalidate`.

Example request:

```shell
curl --request GET \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/orbit/skills"
```

Example response:

```json
{
  "skills": [
    {
      "name": "orbit",
      "version": "0.29.0",
      "description": "Use the glab orbit CLI for knowledge graph queries.",
      "compatibility": "Requires Orbit CLI"
    }
  ],
  "server_version": "0.31.0"
}
```

### Retrieve a deployed skill

Retrieves a complete deployed Orbit skill tree.

```plaintext
GET /orbit/skills/:name
```

Supported attributes:

| Attribute | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `name` | string | Yes | Skill name. |

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes) and the following response attributes:

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `compatibility` | string | Environment requirements from the skill manifest. |
| `files` | array | Files in the skill tree. |
| `files[].content` | string | UTF-8 file content. |
| `files[].path` | string | Normalized path relative to the skill root. |
| `files[].sha256` | string | SHA-256 hash of the file content. |
| `name` | string | Skill name. |
| `server_version` | string | Version of the deployed knowledge graph service. |
| `version` | string | Skill version. |

The response includes these headers:

| Header | Description |
| ------ | ----------- |
| `Cache-Control` | Set to `private, max-age=0, must-revalidate`. |
| `ETag` | Set to `"<version>"`. |

Send the current `ETag` value in the `If-None-Match` request header to revalidate a cached skill tree.
A matching value returns `304 Not Modified` with no response body.

Example request:

```shell
curl --request GET \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/orbit/skills/orbit"
```

Example response:

```json
{
  "name": "orbit",
  "version": "0.29.0",
  "compatibility": "Requires Orbit CLI",
  "server_version": "0.31.0",
  "files": [
    {
      "path": "SKILL.md",
      "sha256": "93f2655e8772217e4aa8c8fbe3ad0c1f36b2bdf4a63f9f6e2f6d89a3b01da9f8",
      "content": "# Orbit skill\n"
    }
  ]
}
```

If the skill doesn't exist, returns `404 Not Found` with the known skill names in the error message.

### Check deployed skill metadata

Checks the identity and cache headers of a deployed skill without retrieving its files.

```plaintext
HEAD /orbit/skills/:name
```

Supported attributes:

| Attribute | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `name` | string | Yes | Skill name. |

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes), the same `ETag` and `Cache-Control`
headers as `GET /orbit/skills/:name`, and no response body.

Example request:

```shell
curl --head \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/orbit/skills/orbit"
```

### Retrieve a deployed skill file

Retrieves one file from a deployed skill as raw UTF-8 text. Use this route to fetch
`SKILL.md` directly or follow relative links to files in the same skill tree.

```plaintext
GET /orbit/skills/:name/*path
```

Supported attributes:

| Attribute | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `name` | string | Yes | Deployed skill name. |
| `path` | string | Yes | File path relative to the skill root, for example `references/usage.md`. |

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes) with the file content,
not a JSON object. Markdown files (`.md`) have the content type `text/markdown; charset=utf-8`.
Other files have the content type `text/plain; charset=utf-8`; no skill file is served as HTML.
Only exact paths listed in the skill manifest are available. Unknown paths return `404 Not Found`.
Malformed paths can return `400 Bad Request`. API error responses are JSON, rather than raw file content;
requests blocked by path traversal middleware can return a plain-text error.

The response includes a strong `ETag` from the file's SHA-256 and a `Cache-Control` header
set to `private, max-age=0, must-revalidate`. Send the `ETag` in `If-None-Match` to receive
`304 Not Modified` when the file is unchanged. `HEAD` returns the same headers without a body.

Example request:

```shell
curl --request GET \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/orbit/skills/orbit/SKILL.md"
```

Example response:

```markdown
# Orbit skill
```

## Named queries

Prefer `POST /api/v4/orbit/query/:name` over `POST /api/v4/orbit/query` for
programmatic consumers. A named query's structure lives on the server, so it
cannot drift from the DSL grammar or ontology.
Named requests keep JSON envelopes and run templates in the active mode.

## Query templates

The named query templates listed at `GET /api/v4/orbit/query/templates`
include `raw_query` rendered for the authenticated user:

- Templates contain JSON objects in JSON mode and GQL strings in GQL mode.
- Identity values, like the ID of the authenticated user, are resolved
  server-side from the request credentials. The same request returns
  different `raw_query` values for different users. Do not cache or share
  templates across users or modes.
- Invoke parameterized queries by name with their arguments, as the catalog excludes them.

Prefer executing named queries directly over using templates. Use templates
only where displaying the query text is the goal, such as populating a
query editor or explorer with the text of a preset.

## Query examples

Queries are GQL strings by default. Pass a GQL string as the `query` value to
`POST /api/v4/orbit/query`:

```json
{"query": "MATCH (u:User {id: 1}) RETURN u LIMIT 1"}
```

The following examples use the JSON query DSL, which requires the `orbit_gql_queries`
flag to be disabled. For the complete query language, see
[Orbit query language](https://docs.gitlab.com/orbit/remote/queries/query-language/).

The examples use the default `raw` response format. In each response, the `result`
object lists the matched `nodes` and the `edges` between them. Node IDs are strings.
Aggregation queries also return `columns`, `group_columns`, and `rows`.

Retrieve a user by username:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --header "Content-Type: application/json" \
  --data '{
    "query": {
      "query_type": "traversal",
      "nodes": [
        {"id": "u", "entity": "User", "filters": {"username": "john_smith"}}
      ]
    }
  }' \
  --url "https://gitlab.example.com/api/v4/orbit/query"
```

Example response:

```json
{
  "result": {
    "format_version": "5.0.3",
    "query_type": "traversal",
    "nodes": [
      {"type": "User", "id": "1", "username": "john_smith", "name": "John Smith", "state": "active"}
    ],
    "edges": [],
    "pagination": {"has_more": false, "truncated": false}
  },
  "query_type": "traversal",
  "row_count": 1
}
```

Find merged merge requests in a project:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --header "Content-Type: application/json" \
  --data '{
    "query": {
      "query_type": "traversal",
      "nodes": [
        {"id": "p", "entity": "Project", "node_ids": [8]},
        {"id": "mr", "entity": "MergeRequest", "filters": {"state": "merged"}}
      ],
      "relationships": [{"type": "IN_PROJECT", "from": "mr", "to": "p"}]
    }
  }' \
  --url "https://gitlab.example.com/api/v4/orbit/query"
```

Example response:

```json
{
  "result": {
    "format_version": "5.0.3",
    "query_type": "traversal",
    "nodes": [
      {"type": "Project", "id": "8", "name": "Diaspora Client", "full_path": "diaspora/diaspora-client", "visibility_level": "public"},
      {"type": "MergeRequest", "id": "43", "iid": 1, "title": "Resolve connection timeout on large payloads", "state": "merged", "source_branch": "fix-timeout", "target_branch": "main"},
      {"type": "MergeRequest", "id": "44", "iid": 2, "title": "Replace deprecated API calls in federation module", "state": "merged", "source_branch": "update-federation-api", "target_branch": "main"}
    ],
    "edges": [
      {"from": "MergeRequest", "from_id": "43", "to": "Project", "to_id": "8", "type": "IN_PROJECT"},
      {"from": "MergeRequest", "from_id": "44", "to": "Project", "to_id": "8", "type": "IN_PROJECT"}
    ],
    "pagination": {"has_more": false, "truncated": false}
  },
  "query_type": "traversal",
  "row_count": 2
}
```

Count merge requests per project. Traversal and aggregation queries must bound
at least one node with `node_ids` or filters:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --header "Content-Type: application/json" \
  --data '{
    "query": {
      "query_type": "aggregation",
      "nodes": [
        {"id": "p", "entity": "Project", "node_ids": [5, 8]},
        {"id": "mr", "entity": "MergeRequest"}
      ],
      "relationships": [{"type": "IN_PROJECT", "from": "mr", "to": "p"}],
      "aggregations": [{"count": "mr", "as": "mr_count"}],
      "group_by": ["p"]
    }
  }' \
  --url "https://gitlab.example.com/api/v4/orbit/query"
```

Example response:

```json
{
  "result": {
    "format_version": "5.0.3",
    "query_type": "aggregation",
    "nodes": [],
    "edges": [],
    "columns": [{"name": "mr_count", "function": "count", "target": "mr"}],
    "group_columns": [{"name": "p", "kind": "node", "node": "p", "entity": "Project"}],
    "rows": [
      {"p": {"type": "Project", "id": "8", "properties": {"name": "Diaspora Client", "full_path": "diaspora/diaspora-client", "visibility_level": "public"}}, "mr_count": 8},
      {"p": {"type": "Project", "id": "5", "properties": {"name": "Puppet", "full_path": "brightbox/puppet", "visibility_level": "public"}}, "mr_count": 6}
    ],
    "pagination": {"has_more": false, "truncated": false}
  },
  "query_type": "aggregation",
  "row_count": 2
}
```

Find outgoing neighbors of a user. The `direction` attribute accepts `outgoing`,
`incoming`, or `both`, and defaults to `outgoing`:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --header "Content-Type: application/json" \
  --data '{
    "query": {
      "query_type": "neighbors",
      "nodes": [{"id": "u", "entity": "User", "node_ids": [1]}],
      "neighbors": {"direction": "outgoing"}
    }
  }' \
  --url "https://gitlab.example.com/api/v4/orbit/query"
```

Example response:

```json
{
  "result": {
    "format_version": "5.0.3",
    "query_type": "neighbors",
    "nodes": [
      {"type": "User", "id": "1", "username": "john_smith", "name": "John Smith", "state": "active"},
      {"type": "Group", "id": "29", "name": "diaspora", "full_path": "diaspora", "visibility_level": "public"},
      {"type": "MergeRequest", "id": "43", "iid": "1", "title": "Resolve connection timeout on large payloads", "state": "merged", "source_branch": "fix-timeout", "target_branch": "main"},
      {"type": "MergeRequest", "id": "44", "iid": "2", "title": "Replace deprecated API calls in federation module", "state": "merged", "source_branch": "update-federation-api", "target_branch": "main"}
    ],
    "edges": [
      {"from": "User", "from_id": "1", "to": "Group", "to_id": "29", "type": "MEMBER_OF"},
      {"from": "User", "from_id": "1", "to": "MergeRequest", "to_id": "43", "type": "AUTHORED"},
      {"from": "User", "from_id": "1", "to": "MergeRequest", "to_id": "44", "type": "AUTHORED"}
    ],
    "pagination": {"has_more": false, "truncated": false}
  },
  "query_type": "neighbors",
  "row_count": 3
}
```

Find the shortest path from a user to a project. Path finding queries require
`rel_types`, and follow each relationship type only in its defined direction,
from the `from` node toward the `to` node:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --header "Content-Type: application/json" \
  --data '{
    "query": {
      "query_type": "path_finding",
      "nodes": [
        {"id": "u", "entity": "User", "node_ids": [1]},
        {"id": "p", "entity": "Project", "node_ids": [8]}
      ],
      "path": {
        "type": "shortest",
        "from": "u",
        "to": "p",
        "max_depth": 3,
        "rel_types": ["MEMBER_OF", "CONTAINS"]
      }
    }
  }' \
  --url "https://gitlab.example.com/api/v4/orbit/query"
```

Example response:

```json
{
  "result": {
    "format_version": "5.0.3",
    "query_type": "path_finding",
    "nodes": [
      {"type": "User", "id": "1", "username": "john_smith", "name": "John Smith", "state": "active"},
      {"type": "Group", "id": "29", "name": "diaspora", "full_path": "diaspora", "visibility_level": "public"},
      {"type": "Project", "id": "8", "name": "Diaspora Client", "full_path": "diaspora/diaspora-client", "visibility_level": "public"}
    ],
    "edges": [
      {"from": "User", "from_id": "1", "to": "Group", "to_id": "29", "type": "MEMBER_OF", "path_id": 0, "step": 0},
      {"from": "Group", "from_id": "29", "to": "Project", "to_id": "8", "type": "CONTAINS", "path_id": 0, "step": 1}
    ],
    "pagination": {"has_more": false, "truncated": false}
  },
  "query_type": "path_finding",
  "row_count": 1
}
```

## Access and cluster health

`GET /api/v4/orbit/status` always returns [`200 OK`](rest/troubleshooting.md#status-codes),
regardless of access or service health. When the user has no access, `system`
is `null`:

```json
{
  "user": {
    "available": false
  },
  "system": null
}
```
