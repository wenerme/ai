---
date: "2026-09-12T00:00:00+00:00"
aliases:
  - /en-us/audit-logging
---

# Audit Logging

Gitea can record security-relevant events as structured audit records: each
event has an `action`, `actor`, `scope`, `origin`, `message` and a JSON
`metadata` blob. Recording is **off by default** and does not change request
behavior when it is disabled.

This is separate from the application, router and access logs described in
[Logging Configuration](logging-config.md). Those logs are for operations and
debugging. The audit log is a durable trail of who changed what.

## Enable recording

Set `[audit].RECORD_OUTPUT` to `database` in `app.ini` and restart Gitea:

```ini
[audit]
RECORD_OUTPUT = database
RETENTION_DAYS = 30
```

Invalid values of `RECORD_OUTPUT` fall back to `disabled`. See the
[configuration cheat sheet](config-cheat-sheet.md#audit-audit) for every option.

With Docker, the same settings can be applied as
`GITEA__audit__RECORD_OUTPUT=database` and `GITEA__audit__RETENTION_DAYS=30`
before Gitea writes them into `app.ini`.

## View events

The Audit Log pages are always available and still list any events that were
stored earlier. When recording is disabled, the site administration page also
shows a warning.

| Audience | Location | Events shown |
| --- | --- | --- |
| Site administrators | Site administration → Monitoring → Audit Log (`/-/admin/monitor/audit_logs`) | Every event |
| Signed-in users | User settings → Audit Log (`/user/settings/audit_logs`) | Events scoped to that user |
| Organization owners | Organization settings → Audit Log (`/<org>/settings/audit_logs`) | Events scoped to that organization |
| Repository administrators | Repository settings → Audit Log (`/<owner>/<repo>/settings/audit_logs`) | Events scoped to that repository |

Each listing can be filtered by actor (username), action and origin, and sorted
by timestamp. The actor filter does not match the
[system actors](#actors-and-origins). Action filters accept an exact action or
a family prefix such as `user:impersonation` or `repository:webhook`.

Site administrators can download the current filtered result as JSONL
(newline-delimited JSON) from **Export JSONL**. The file name is
`gitea-audit-log-<timestamp>.jsonl`.

## Event shape

A recorded event contains:

- **Action**: a stable, colon-separated identifier such as `repository:archive`
  or `user:accesstoken:add`.
- **Actor**: the user who performed the action. Actions taken while impersonating
  a user record both the impersonator and the impersonated user.
- **Actor credential**: when the request authenticated with a named credential,
  the event stores its kind and id, never the secret. Typical values:
  `access-token:<id>`, `oauth2-grant:<id>`, `gitea-actions:<task id>`,
  `deploy-key:<key id>`.
- **Scope**: the affected unit — `user`, `organization`, `repository` or
  `system` (instance-wide).
- **Origin**: how the action was initiated — `ui`, `api`, `cli` or `system`.
- **Message**: a human-readable sentence rendered from a per-action template.
- **Metadata**: extra fields that fill the message template (token name, new
  visibility, and so on). Secrets and token values are not stored.
- **IP address**: the client address of the request, when one exists. Events
  triggered by a git push record the SSH client address for SSH pushes and
  `127.0.0.1` for HTTP pushes.
- **Timestamp**: when the event was recorded.

An exported JSONL line looks like:

```json
{"action":"repository:archive","actor":{"type":"user","id":1,"name":"alice"},"scope":{"type":"repository","id":42,"name":"org/repo"},"message":"Archived repository org/repo.","time":"2026-09-12T11:00:00Z","ip_address":"203.0.113.10","origin":"ui"}
```

The `system:startup` message is kept stable across Gitea versions so operators
can parse it: `System started [Gitea {version}]`.

## Actors and origins

Most web and API requests pick up the signed-in user automatically.

Other entry points record a system actor:

- `(gitea-cli)` for `gitea admin` commands and the `system:startup` and
  `system:shutdown` events
- `(gitea-auth-source)` for authentication-source syncs and for users an
  authentication source creates or updates at sign-in
- `gitea-actions` for Gitea Actions tasks
- `(deploy-key)` for pushes with a deploy key
- `(Cron)` for scheduled cron tasks
- `Unknown` when no actor can be resolved

Events of the `(gitea-cli)` actor use origin `cli`. Cron tasks, git hooks and
other background work use origin `system`.

## What is recorded

Events cover security-relevant changes, grouped by action family:

- **User**: create and delete, admin, restricted and active status, name,
  password and password reset requests, visibility, emails, authentication
  source, 2FA, WebAuthn, OpenID, external logins, access tokens, OAuth2
  applications and grants, SSH/GPG/principal keys, secrets, webhooks,
  impersonation, failed two-factor authentication
- **Organization**: create and delete, name, visibility, members, teams,
  OAuth2 applications, secrets, webhooks
- **Repository**: create, fork, archive, delete, rename, visibility, transfer,
  mirrors, signing verification, collaborators and teams, default branch,
  branch and tag protection, deploy keys, webhooks, secrets
- **Issues and pull requests**: create, delete, comments and merges
- **Projects and wiki pages**: create, update and delete
- **Actions**: enable, disable and dispatch a workflow
- **System**: startup and shutdown, instance-wide webhooks, authentication
  sources, instance-wide OAuth2 applications

Recording never fails the request that triggered it. A write error is logged
and the original operation continues.

## What is not recorded

- Read-only access such as browsing, clone, fetch or API GET requests
- Logins, successful or failed, other than failed two-factor authentication
  (use the [access log](logging-config.md) and
  [Fail2ban Setup](fail2ban-setup.md) for authentication traffic)
- Edits to issues and pull requests
- Token or secret values
- Which SSH key a real user pushed with (deploy keys are named; ordinary SSH
  user pushes are not)

## Retention

`RETENTION_DAYS` (default **30**) is the age after which recorded events are
eligible for deletion. Set it to `0` to keep events forever.

Cleanup is performed by the `cron.delete_old_audit_events` task (`SCHEDULE`
defaults to `@every 24h`, `OLDER_THAN` defaults to `[audit].RETENTION_DAYS`).
The task is registered only while `RECORD_OUTPUT` records events **and**
`RETENTION_DAYS` is greater than `0`. Turning recording off therefore also
stops pruning; existing rows stay until you delete them or turn recording back
on.
