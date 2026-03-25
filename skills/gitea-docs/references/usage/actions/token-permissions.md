---
date: "2026-03-19T00:00:00+01:00"
---

# Actions job token permissions (`GITEA_TOKEN`)

Every Actions job receives a built-in token (`GITEA_TOKEN`) which can be used to access Gitea (Git over HTTP(S), API requests, etc.).
This page documents how Gitea decides what the token is allowed to do.

In workflows, it is available as `${{ secrets.GITEA_TOKEN }}`. These settings and `permissions:` only affect `GITEA_TOKEN` (not other secrets like personal access tokens). For API calls, see [API authentication](../../development/api-usage.md#authentication).

## Where permissions come from

Gitea determines the job token permissions in this order:

1. Job-level `permissions:` (`jobs.<job_id>.permissions`)
2. Workflow-level `permissions:` (top-level)
3. Default permissions from settings (owner or repository)

The result is then **clamped** by the configured maximum token permissions (see below).

## Supported workflow syntax

Gitea supports the GitHub Actions-compatible `permissions:` keyword.

### Scalar values

```yaml
permissions: read-all   # or: write-all
```

### Scoped mapping

```yaml
permissions:
  contents: read
  issues: write
  pull-requests: none
```

Valid access mode values for each scope are `read`, `write`, and `none`.

### Supported scopes

- `contents` (applies to `code` and `releases`)
- `code`
- `releases`
- `issues`
- `pull-requests`
- `actions`
- `wiki`
- `projects`
- `packages` (if supported by the target feature)

If you specify both `contents` and a more granular scope (like `code` or `releases`), the granular scope wins for that unit.

### Compatibility notes

Gitea supports a subset of GitHub Actions permission scopes.
GitHub-only scopes such as `statuses`, `checks`, `deployments`, `id-token`, `security-events`, and `pages` are not currently supported by Gitea Actions.

Gitea also exposes repository-unit scopes that do not exist as separate scopes in GitHub Actions:

- `code`
- `releases`
- `wiki`
- `projects`

## Default permission mode

If neither the workflow nor the job defines `permissions:`, Gitea uses the configured default mode:

- **Permissive**: read and write permissions for most units in the job's repository (backwards-compatible default).
- **Restricted**: read-only permissions for `code`, `releases`, and `packages` in the job's repository, and no access to other units by default.

## Maximum token permissions (clamping)

You can configure a maximum permission per repository unit.
The job's effective permissions are computed as:

`effective = min(requested, maximum)`

This means workflows can reduce permissions for a job, but cannot exceed your configured maximum.
If you don't configure a maximum, the maximum defaults to `write` for all scopes.

## Where to configure

You can configure defaults and maximums at:

- **User / Organization**: `Settings` → `Actions` → `General`
- **Repository**: `Settings` → `Actions` → `General`
  - For repositories in an organization, the repository can follow the owner-level configuration, or opt out with **Override owner-level configuration**.

Note: Repository-level token permission settings are only shown once **Repository Actions** are enabled.

## Fork pull requests

For security reasons, workflows triggered by pull requests from forks are always restricted to read-only permissions for repository contents, regardless of workflow `permissions:` or settings.

## Cross-repository access

By default, `GITEA_TOKEN` only has access to:

- The job's repository (according to the computed permissions)
- Public repositories (read-only)

Access to other private repositories is denied by default.
A user or organization can allow read-only access to selected private repositories via **Settings → Actions → General → Cross-Repository Access**.

Private repositories can also allow selected collaborative owners via **Settings → Actions → General**.
This allows the private repositories of those owners to read the current private repository for Actions use, such as private actions and reusable workflows.

Fork pull request workflows never gain cross-repository access to private repositories, even if those repositories are listed.
