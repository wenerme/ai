---
name: tea-cli
description: "tea CLI documentation — Gitea's official command-line tool. Covers login/auth, issues, pull requests (checkout, merge, review), labels, milestones, releases, repositories, branches, organizations, time tracking, actions (secrets, variables, runs), webhooks, notifications, admin commands, and direct API calls. USE THIS SKILL WHEN the user asks about tea CLI, Gitea CLI, tea command, tea login, tea pr, tea issues, or interacting with Gitea from the terminal."
version: 0.1.0
---

# tea CLI Documentation

Official docs for [tea](https://gitea.com/gitea/tea) — Gitea's command-line productivity helper.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (23 docs)

### General

- `references/readme.md` — Overview, installation, and authentication setup
- `references/commands/overview.md` — Synopsis, description, and global options
- `references/example-workflows.md` — Example workflows (Gitea Actions)

### Authentication

- `references/commands/logins.md` — Manage logins (add, list, edit, delete, default)
- `references/commands/logout.md` — Log out from a Gitea instance
- `references/commands/whoami.md` — Show current login info

### Issues & Pull Requests

- `references/commands/issues.md` — Issues (create, list, edit, close, reopen, assign, labels)
- `references/commands/pulls.md` — Pull requests (create, list, checkout, merge, review, approve, reject)
- `references/commands/comment.md` — Add comments to issues/PRs

### Project Management

- `references/commands/labels.md` — Label management (create, update, delete)
- `references/commands/milestones.md` — Milestone management (create, list, issues, close, reopen)
- `references/commands/times.md` — Time tracking (add, list, delete, reset)

### Repository

- `references/commands/repos.md` — Repositories (list, search, create, fork, migrate, delete, topics)
- `references/commands/branches.md` — Branch listing and protection
- `references/commands/releases.md` — Release management (create, list, edit, delete, assets)
- `references/commands/clone.md` — Clone a repository
- `references/commands/open.md` — Open repo/issue/PR in browser

### Automation & Webhooks

- `references/commands/actions.md` — Actions (runs list, secrets, variables)
- `references/commands/webhooks.md` — Webhook management (create, list, update, delete)

### Organization & Admin

- `references/commands/organizations.md` — Organization management (create, list, members, teams)
- `references/commands/admin.md` — Admin commands (user management)
- `references/commands/notifications.md` — Notification management (list, read, unread, pin)

### API

- `references/commands/api.md` — Direct authenticated API requests
