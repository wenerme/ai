---
date: "2025-11-20T00:00:00-07:00"
slug: "protected-branches"
sidebar_position: 44
aliases:
  - /en-us/protected-branches
  - /en-us/protected-branch
  - /protected-branches
---

# Protected branches

Protected branches prevent unwanted changes by enforcing push and merge policies on selected branches. The rules are enforced for every Git protocol (HTTP(S), SSH), the web editor, the API, and background jobs such as auto-merge. Only repository owners and administrators can manage the rules, and the Branches page is read-only while a repository is archived.

## Creating or editing a rule

1. Open the repository and select **Settings → Branches** (repository admin permission required).
2. Select **Add new rule** or **Edit** next to an existing rule.
3. Fill in the **Protected branch name pattern** and optional file patterns, then configure the push, merge, and review options described below.
4. Select **Save rule**.

The rule immediately applies to all matching branches, even if the branches are created in the future.

## Rule matching and priorities

- The **Protected branch name pattern** accepts [glob](https://github.com/gobwas/glob) expressions and matches the entire branch name. Patterns are case-sensitive. Using a simple name such as `main` without glob special characters always matches that specific branch (case-insensitive).
- If multiple rules match the same branch, only the first rule is used. Reorder the list on the **Branches** page by dragging the grab handle. The first entry (priority 1) has the highest priority, so place patterns such as `main` or `release/*` before generic fallbacks such as `*`.

Example patterns:

| Pattern        | Matches                         |
| -------------- | ------------------------------- |
| `main`         | The `main` branch only          |
| `release/*`    | `release/v1.0`, `release/april` |
| `hotfix/**`    | Nested branches such as `hotfix/security/CVE` |
| `*`            | Every branch (use as a fallback) |

### File-level pattern controls

- **Protected file patterns** block changes to sensitive files (for example `.drone.yml` or `/docs/**/*.txt`). Patterns are case-insensitive and separated by semicolons. Commits and merge attempts that touch one of the files are rejected.
- **Unprotected file patterns** do the opposite: if pushes are blocked, users with write access can still push commits that modify only the listed files. This is useful for letting contributors update documentation while still requiring pull requests for code.

Both fields use the same `glob` syntax and match paths relative to the repository root.

## Controlling direct pushes

The **Push** section controls direct pushes (including the web editor and API).

- **Disable push** makes the branch read-only. Any attempt to push directly fails, and changes must be merged through pull requests.
- **Enable push** allows anyone with [write access](./permissions.md) to push (force pushes are still blocked unless explicitly allowed).
- **Allowlist restricted push** requires being on the allowlist. Choose users and, for organization-owned repositories, teams. Deploy keys that already have write access can also be allowlisted.

When a push is blocked, the server-side hook rejects the update with an explanation.

### Force pushes

Force pushes have their own set of options:

- **Disable force push** completely forbids rewriting history on the branch.
- **Enable force push** allows anyone who can push to also force push.
- **Allowlist restricted force push** limits force pushes to a separate allowlist (users, teams, and optionally deploy keys) **and** requires the person to already have regular push access.

## Pull request merges and approvals

- **Merge allowlist**: keep the default to let anyone with write access merge pull requests, or enable the allowlist to restrict merges to selected users/teams.
- **Required approvals**: specify how many approvals are needed before a merge is allowed. Reviews from users with write access count, unless the **Restrict approvals to allowlisted users or teams** option is enabled.
- **Dismiss stale approvals** removes existing approvals whenever new commits that change the pull request content are pushed.
- **Ignore stale approvals** keeps approvals but does not count reviews that were made on older commits. This option is disabled while dismissal of stale approvals is enabled.
- **Block merge on rejected reviews** prevents merging while any official reviewer has requested changes.
- **Block merge on official review requests** blocks merges while there are outstanding review requests (for example when CODEOWNERS requires a review).
- **Block merge if the pull request is outdated** makes sure the head branch is up to date with the base branch before it can be merged.
- **Administrators must follow branch protection rules** removes the ability for repository administrators to bypass the rules with the "Force merge" button.

Protected file patterns apply to pull requests as well. When a pull request changes one of the protected files, the pull request banner shows the affected paths and merging stays disabled.

## Status checks

Enable status checks to require one or more CI jobs to succeed before merging:

1. Check **Enable status check**.
2. Enter one pattern per line in **Status check patterns**. Each pattern is a `glob` expression that matches the context name reported by Actions, Drone, Woodpecker, or another Check API client (for example `actions/test-*`).
3. Pick contexts from the table of jobs that have reported results in the last week to verify their names.

When the option is active, Gitea requires at least one context that matches each pattern to report success on the pull request head commit. An empty list is not allowed; use `*` to require the latest commit to be successful regardless of the context name.

## Signed commits and other safeguards

- **Require signed commits** rejects pushes that contain unsigned or unverifiable commits. The check runs inside the server hook before the push is accepted.
- **Protected file patterns** (see above) prevent both pushes and merges that modify sensitive files.
- **Unprotected file patterns** allow limited pushes while keeping the branch protected.
