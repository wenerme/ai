---
name: glab-docs
description: "glab CLI documentation — GitLab's official command-line tool. Covers merge requests, issues, CI/CD pipelines, repositories, runners, releases, clusters, stacks, variables, schedules, labels, milestones, auth, config, snippets, deploy keys, SSH/GPG keys, Duo AI, MCP, and OpenTofu. USE THIS SKILL WHEN the user asks about glab commands, glab CLI reference, glab mr, glab ci, glab issue, glab repo, glab runner, or GitLab CLI docs."
version: 0.1.0
---

# glab CLI Documentation

Official command reference for [glab](https://gitlab.com/gitlab-org/cli) — GitLab's CLI tool.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (244 docs)

### General

- `references/README.md` — Project overview
- `references/installation_options.md` — Installation options
- `references/source/_index.md` — Top-level glab command reference

### Auth & Config (11 docs)

- `references/source/auth/_index.md` — Auth overview (login, logout, status, docker)
- `references/source/config/_index.md` — Config management (get, set)
- `references/source/alias/_index.md` — Command aliases (set, list, delete)
- `references/source/token/_index.md` — Token management (create, list, revoke, rotate)
- `references/source/completion/_index.md` — Shell completions

### Merge Requests (23 docs)

- `references/source/mr/_index.md` — MR overview
- `references/source/mr/create.md` — Create MR
- `references/source/mr/list.md` — List MRs
- `references/source/mr/merge.md` — Merge MR
- `references/source/mr/checkout.md` — Checkout MR locally
- `references/source/mr/approve.md` — Approve MR
- `references/source/mr/review.md` — Review MR
- `references/source/mr/diff.md` — View MR diff
- `references/source/mr/note.md` — Add MR notes/comments
- And 14 more (close, reopen, update, delete, subscribe, todo, rebase, etc.)

### Issues (14 docs)

- `references/source/issue/_index.md` — Issue overview
- `references/source/issue/create.md` — Create issue
- `references/source/issue/list.md` — List issues
- `references/source/issue/view.md` — View issue
- `references/source/issue/note.md` — Add comments
- And 9 more (close, reopen, update, delete, subscribe, board, etc.)

### CI/CD (17 docs)

- `references/source/ci/_index.md` — CI overview
- `references/source/ci/run.md` — Run pipeline
- `references/source/ci/status.md` — Pipeline status
- `references/source/ci/lint.md` — Lint .gitlab-ci.yml
- `references/source/ci/trace.md` — View job logs
- `references/source/ci/list.md` — List pipelines
- `references/source/ci/retry.md` — Retry pipeline
- `references/source/ci/view.md` — Interactive pipeline view
- `references/source/ci/trigger.md` — Trigger pipeline
- `references/source/job/_index.md` — Job management
- And 7 more (get, delete, cancel, config compile, run-trig, etc.)

### Repository (18 docs)

- `references/source/repo/_index.md` — Repo overview
- `references/source/repo/clone.md` — Clone repository
- `references/source/repo/create.md` — Create repository
- `references/source/repo/fork.md` — Fork repository
- `references/source/repo/view.md` — View repo info
- `references/source/repo/archive.md` — Download repo archive
- `references/source/repo/mirror/_index.md` — Mirror management
- `references/source/repo/transfer.md` — Transfer repository
- And 10 more (delete, list, search, contributors, etc.)

### Runners (23 docs)

- `references/source/runner/_index.md` — Runner management (list, run, register, etc.)
- `references/source/runner-controller/_index.md` — Runner controller (fleet scaling, configure, etc.)

### Releases (7 docs)

- `references/source/release/_index.md` — Release management
- `references/source/release/create.md` — Create release
- `references/source/release/list.md` — List releases
- And 4 more (view, delete, download, upload)

### Clusters & Infrastructure (22 docs)

- `references/source/cluster/_index.md` — Cluster management
- `references/source/cluster/agent/_index.md` — Cluster agent (bootstrap, list, get-token)
- `references/source/opentofu/_index.md` — OpenTofu state management
- `references/source/stack/_index.md` — Stacks (create, list, status, deploy, etc.)

### Project Management (20 docs)

- `references/source/label/_index.md` — Labels (create, list, subscribe)
- `references/source/milestone/_index.md` — Milestones (create, list, close)
- `references/source/schedule/_index.md` — Pipeline schedules (create, list, run, delete)
- `references/source/variable/_index.md` — CI/CD variables (set, list, get, update, export, delete)
- `references/source/incident/_index.md` — Incidents (create, list, view, close)
- `references/source/iteration/_index.md` — Iterations (list)
- `references/source/work-items/_index.md` — Work items (list)

### Keys & Security (18 docs)

- `references/source/ssh-key/_index.md` — SSH keys (add, list, get, delete)
- `references/source/gpg-key/_index.md` — GPG keys (add, list, get, delete)
- `references/source/deploy-key/_index.md` — Deploy keys (create, list, get, delete)
- `references/source/securefile/_index.md` — Secure files (upload, list, download, remove)
- `references/source/attestation/_index.md` — Attestation verification

### Other (10 docs)

- `references/source/snippet/_index.md` — Snippets (create, view)
- `references/source/user/_index.md` — User info (events)
- `references/source/duo/_index.md` — Duo AI (ask, chat)
- `references/source/mcp/_index.md` — MCP server
- `references/source/api/_index.md` — Direct API calls
- `references/source/changelog/_index.md` — Changelog generation
- `references/source/check-update/_index.md` — Check for updates
- `references/source/version/_index.md` — Version info

### Development (5 docs)

- `references/development_process.md` — Development process
- `references/maintainer.md` — Maintainer guide
- `references/release_process.md` — Release process
- `references/security_releases.md` — Security releases
- `references/testing_against_staging.md` — Testing against staging
