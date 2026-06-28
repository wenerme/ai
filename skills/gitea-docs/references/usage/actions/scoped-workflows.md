---
date: "2026-06-26T00:00:00+00:00"
---

# Scoped Workflows

Scoped workflows let you maintain Actions workflows in one central **source** repository and have them run automatically on many other repositories, without copying the workflow files into each one.

A workflow file committed under a source repository's scoped-workflow directory runs on every repository that the source applies to (a "consuming" repository). Each run executes **in the consuming repository's own context**: its runners, secrets, `GITEA_TOKEN`, and branch, while the workflow **content is read from the source repository**. This is useful for mandating shared CI across an organization or instance: linting, security scans, compliance or policy checks, and similar.

## Levels

A source repository can be registered at two levels:

- **Owner level**: registered by an organization or user. The source's workflows run on every repository owned by that organization or user.
- **Instance level**: registered by a site administrator. The source's workflows run on **every** repository on the instance.

The same repository may be registered at both levels; it is still evaluated once per matching event.

> **note**: Instance-level sources apply to **every** repository on the instance, and a required one cannot be opted out. Detection runs on every repository's events. Register them deliberately.

## Configuration

Scoped workflows live in a directory that is separate from regular workflows. It is controlled by `SCOPED_WORKFLOW_DIRS` in the `[actions]` section of `app.ini`:

```ini
[actions]
SCOPED_WORKFLOW_DIRS = .gitea/scoped_workflows
```

- The default is `.gitea/scoped_workflows`.
- It may list multiple directories (comma-separated).
- It **must not overlap** with `WORKFLOW_DIRS` (the regular workflow directories, by default `.gitea/workflows` and `.github/workflows`).
- Leaving it empty means no directory holds scoped workflows, so none are found or run. The settings page still appears and sources can still be registered, but no scoped workflow runs.

Keeping scoped workflows in their own directory means a source repository's *own* Actions are unaffected: only files under `SCOPED_WORKFLOW_DIRS` are treated as scoped workflows.

## Providing scoped workflows from a repository

1. In the would-be source repository, commit your workflow files under the scoped-workflow directory on its **default branch**, for example `.gitea/scoped_workflows/lint.yaml`:

   ```yaml
   name: Lint
   on: [push, pull_request]
   jobs:
     lint:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - run: echo "lint the consuming repository here"
   ```

2. Register the repository as a source:

   - **Organization**: *Organization Settings -> Actions -> Scoped Workflows*
   - **User**: *User Settings -> Actions -> Scoped Workflows*
   - **Instance (admin)**: *Site Administration -> Actions -> Scoped Workflows*

   Search for and add the repository. From then on, its scoped workflows apply to the consuming repositories at that level.

The source repository is within its own scope, so it runs these workflows on itself like any other consumer.

## How scoped workflows run

- The run belongs to the **consuming** repository and uses its runners, secrets, `GITEA_TOKEN`, and ref. It behaves like a normal run there, including rerun, logs, and commit statuses.
- The workflow **content is read from the source** repository, pinned to the source's default-branch commit at the time of the event.
- Detection uses the consuming repository's event, so the workflow's `on:` triggers (such as `push` and `pull_request`) must match that event.

## Opting out

A consuming repository can disable a scoped workflow it does not want, from its **Actions** page (the workflow appears under its source). A workflow that has been marked **required** (see below) can never be disabled or opted out by a consuming repository.

## Required workflows and the merge gate

On the Scoped Workflows settings page you can mark individual workflows as **required** and give each one or more **status-check patterns** (one glob per line). A required scoped workflow:

- Cannot be disabled by consuming repositories.
- Gates pull-request merges: a consuming pull request can only be merged once a commit status matching **every** pattern has **passed** (must-present-and-pass). A required check that never posts a status **blocks** the merge rather than being silently skipped, so disabling Actions on the consumer cannot bypass it.

The status-check context a scoped run posts has the form:

```
<source repo full name>: <workflow display name> / <job> (<event>)
```

The settings page previews these "Expected status checks" for each workflow and marks the ones your patterns match, so you can confirm a pattern is correct. A common pattern wildcards the job and event, for example `my-org/ci-repo: Lint / *`.

Enforcement scope:

- A required check is enforced on any target branch that has a **branch protection rule**, even one whose own status checks are disabled.
- A target branch with **no** protection rule is not gated.

> **warning**: Only a workflow that runs on an event that posts a commit status (`push`, `pull_request`, `pull_request_target`, `release`) can be required. A workflow that runs only on events like `workflow_dispatch`, `schedule` or `workflow_call` posts no status, so marking it required would block every consuming pull request forever. The settings page warns you in this case.

## Reusable workflows (`uses:`)

Scoped workflows can call reusable workflows:

- A **local** reference (`uses: ./...`) resolves against the **source** repository: the repository the calling workflow's content came from, not the consuming repository.
- A **cross-repository** reference (`uses: owner/repo/...@ref`) is resolved with the **consuming repository's** read permission. If it points to a private repository, make sure every consuming repository can read it; otherwise the workflow will fail there.

A reusable workflow can live under `SCOPED_WORKFLOW_DIRS` (or `WORKFLOW_DIRS`) of the source repository.

## Security considerations

A source repository's workflow content is executed in every repository it applies to, and its step scripts and their output are written to that repository's Actions logs, readable by anyone who can view the consuming repository's Actions.

- Registering a **private** repository as a source therefore discloses its workflow logic through those logs. Only register repositories whose workflow content may be shared with every consuming repository.

## Limitations

- `on: schedule` and `on: workflow_run` are currently not supported as scoped workflow triggers.
- Scoped workflow content is read from the source's default branch; other branches of the source are not used.
