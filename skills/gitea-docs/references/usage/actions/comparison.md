---
date: "2023-04-27T15:00:00+08:00"
---

# Compared to GitHub Actions

Gitea Actions is designed to be compatible with GitHub Actions, with the differences below.

## Additional features

### Absolute action URLs

`uses:` accepts an absolute URL to any git host, e.g. `uses: https://gitea.com/actions/checkout@v4`.

### Action prefixes

`uses:` accepts these prefixes:

- `self:` references your own Gitea instance, e.g. `uses: self:owner/repo@v1` or `uses: self:owner/repo/.gitea/workflows/build.yml@v1`
- `builtin:` runs an action built into Gitea Runner, which needs no download and no Node in the job image, e.g. `uses: builtin:checkout`

`builtin:checkout` accepts the `repository`, `ref`, `token`, `path` and `fetch-depth` inputs of `actions/checkout` with the same defaults, and fails on any other input.

### Workflow-relative actions

`$/` references the repository and commit of the workflow, or of the enclosing composite action, e.g. `uses: $/.gitea/actions/build`.
Unlike `./`, it needs no checkout first.

### Actions written in Go

See [Creating Go Actions](https://blog.gitea.com/creating-go-actions/).

### Support the non-standard syntax @yearly, @monthly, @weekly, @daily, @hourly on schedule

`schedule` also accepts `@yearly`, `@monthly`, `@weekly`, `@daily` and `@hourly`, which [GitHub does not](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule).

## Unsupported workflows syntax

### `jobs.<job_id>.environment`

[`jobs.<job_id>.environment`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idenvironment) is ignored.

### Complex `runs-on`

[`runs-on`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on) supports:

- Static strings: `runs-on: self-hosted`
- Arrays of labels: `runs-on: [linux, self-hosted]`
- String expressions: `runs-on: ${{ github.event_name == 'push' && 'ubuntu-latest' || 'self-hosted' }}`
- Arrays containing expressions: `runs-on: [linux, "${{ github.event_name == 'push' && 'ubuntu-latest' || 'self-hosted' }}"]`

## Missing features

### Package repository authorization

`GITEA_TOKEN` cannot publish to the package registry of its repository, e.g. to push OCI images.
Use a personal access token instead, see [this issue](https://github.com/go-gitea/gitea/issues/23642#issuecomment-2119876692).

### Problem Matchers

[Problem matchers](https://github.com/actions/toolkit/blob/main/docs/problem-matchers.md) are ignored.

### Create an error annotation

[Error annotations](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#example-creating-an-annotation-for-an-error) are ignored.

### Expressions

[Expressions](https://docs.github.com/en/actions/learn-github-actions/expressions) support the standard GitHub functions and contexts.

## Missing UI features

### Pre and Post steps

Pre and post steps have no section of their own in the job log.

### Services steps

Service steps have no section of their own in the job log.

## Different behavior

### Job token permissions (`permissions`)

`permissions` and `jobs.<job_id>.permissions` control the `GITEA_TOKEN` permissions, clamped by the repository and owner settings and further restricted for fork pull requests and cross-repository access.
GitHub-only scopes like `statuses`, `checks`, `deployments`, `id-token`, `security-events` and `pages` are not supported, while Gitea adds `code`, `releases`, `wiki` and `projects`.
See [Actions job token permissions](token-permissions.md).

### Downloading actions

Actions without a host, like `uses: actions/checkout@v4`, are downloaded from `https://github.com`, or from your own instance when `[actions].DEFAULT_ACTIONS_URL` is `self`.
See the [Configuration Cheat Sheet](../../administration/config-cheat-sheet.md#actions-actions).
For other sources, see [Absolute action URLs](#absolute-action-urls), [Action prefixes](#action-prefixes) and [Workflow-relative actions](#workflow-relative-actions).

### Context availability

[Context availability](https://docs.github.com/en/actions/learn-github-actions/contexts#context-availability) is not checked, so contexts like `env` work in more places.
