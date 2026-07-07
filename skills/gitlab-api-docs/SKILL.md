---
name: gitlab-api-docs
description: "Use when working with GitLab API docs: REST API endpoints, GraphQL API, authentication, pagination, rate limits, groups, projects, issues, merge requests, pipelines, jobs, packages, releases, users, access tokens, webhooks, admin APIs, and OpenAPI schemas."
---

# GitLab API Docs

Official GitLab API documentation synced from [`gitlab-org/gitlab/doc/api`](https://gitlab.com/gitlab-org/gitlab/-/tree/master/doc/api).

Use this skill for GitLab REST and GraphQL API behavior. For CI YAML semantics use `gitlab-ci-docs`; for end-user UI workflows use `gitlab-user-docs`; for self-managed instance administration use `gitlab-admin-docs`; for `glab` CLI commands use `glab-docs` / `glab-cli`.

## Scope

References are Markdown and OpenAPI files under `references/`:

- `references/_index.md`, `api_resources.md`, `rest/`, `graphql/` — API overview, REST conventions, GraphQL docs.
- `references/openapi/openapi_v3.yaml` — current OpenAPI 3 schema.
- `references/openapi/openapi_v2.yaml` — deprecated OpenAPI 2 schema, retained for compatibility references.
- Root REST endpoint pages such as `projects.md`, `groups.md`, `issues.md`, `merge_requests.md`, `pipelines.md`, `jobs.md`, `branches.md`, `commits.md`, `repository_files.md`, `users.md`, `members.md`, `access_requests.md`, `deploy_tokens.md`, `group_access_tokens.md`, `personal_access_tokens.md`.
- `references/graphql/` — GraphQL queries, mutations, authorization, limits, IDs, global IDs, pagination.
- `references/packages/`, `releases/`, `admin/`, `templates/` — package registries, releases, admin endpoints, templates.

## Hard Rules

- MUST search `references/` before answering GitLab API endpoint, parameter, authentication, pagination, or response-shape questions.
- MUST distinguish REST and GraphQL APIs, including ID formats and pagination differences.
- MUST check endpoint-specific docs and OpenAPI schema before naming request fields, response fields, status codes, or required scopes.
- MUST distinguish GitLab.com, Self-Managed, Dedicated, tier, and admin-only endpoint constraints when docs mention them.
- NEVER invent endpoint paths, HTTP methods, query parameters, request body fields, token scopes, or GraphQL fields without checking references.

## Fast Lookup

```bash
rg -n "Authentication|PRIVATE-TOKEN|OAuth|personal access token|job token|impersonation|scope" skills/gitlab-api-docs/references
rg -n "pagination|keyset|offset|Link header|page_token|rate limit|idempotency" skills/gitlab-api-docs/references/rest skills/gitlab-api-docs/references
rg -n "GET /|POST /|PUT /|PATCH /|DELETE /|curl --request" skills/gitlab-api-docs/references/projects.md skills/gitlab-api-docs/references/groups.md skills/gitlab-api-docs/references/merge_requests.md skills/gitlab-api-docs/references/issues.md
rg -n "pipeline|job|runner|artifact|trigger|variable" skills/gitlab-api-docs/references/pipelines.md skills/gitlab-api-docs/references/jobs.md skills/gitlab-api-docs/references
rg -n "GraphQL|global ID|gid://|query|mutation|pageInfo|cursor|complexity" skills/gitlab-api-docs/references/graphql
rg -n "Tier:|Offering:|Status:|Introduced|Deprecated|Removed|administrator|admin" skills/gitlab-api-docs/references
rg -n "projects/|groups/|merge_requests|pipelines|jobs|users" skills/gitlab-api-docs/references/openapi/openapi_v3.yaml
```

## Workflow

1. Identify REST vs GraphQL and the resource family.
2. Search endpoint docs first; use OpenAPI schema for exact fields when needed.
3. Report auth/scopes, request method/path, required parameters, pagination, and tier/admin constraints explicitly.
4. If the user is trying to perform the operation via `glab`, switch to `glab-docs` / `glab-cli` for command syntax.
