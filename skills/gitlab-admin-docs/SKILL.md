---
name: gitlab-admin-docs
description: "Use when administering GitLab Self-Managed or Dedicated: installation, configuration, Admin area settings, users, auth, Geo, Gitaly, PostgreSQL, Redis, Sidekiq, object storage, backups, monitoring, logs, upgrades, instance limits, feature flags, security, and troubleshooting."
---

# GitLab Admin Docs

Official GitLab administration documentation synced from [`gitlab-org/gitlab/doc/administration`](https://gitlab.com/gitlab-org/gitlab/-/tree/master/doc/administration).

Use this skill for GitLab Self-Managed and Dedicated administration. For end-user project/group workflows use `gitlab-user-docs`; for CI YAML and pipeline behavior use `gitlab-ci-docs`; for REST/GraphQL endpoints use `gitlab-api-docs`; for `glab` CLI commands use `glab-docs` / `glab-cli`.

## Scope

References are Markdown files under `references/`:

- `references/_index.md`, `get_started.md`, `configure.md`, `admin_area.md`, `settings/` — administration overview and instance settings.
- `references/auth/`, `administer_users.md`, `external_users.md`, `internal_users.md`, `moderate_users.md`, `guest_users.md` — users and authentication/authorization.
- `references/geo/`, `reference_architectures/`, `gitaly/`, `postgresql/`, `redis/`, `sidekiq/`, `consul.md` — architecture, scaling, storage, database, and background processing.
- `references/backup_restore/`, `operations/`, `monitoring/`, `logs/`, `troubleshooting/`, `raketasks/` — operations, backup/restore, observability, Rake tasks, troubleshooting.
- `references/packages/`, `object_storage.md`, `uploads.md`, `pages/`, `terraform_state.md` — storage and feature administration.
- `references/gitlab_duo_self_hosted/`, `gitlab_duo/`, `dedicated/`, `cicd/`, `compliance/`, `feature_flags/` — specialized admin areas.

## Hard Rules

- MUST search `references/` before answering GitLab administration, configuration, scaling, backup, upgrade, or troubleshooting questions.
- MUST distinguish GitLab Self-Managed, GitLab Dedicated, and GitLab.com. GitLab.com users often cannot use admin settings described here.
- MUST check installation type implications: Linux package, Helm chart, Docker, source, Geo, HA, or Dedicated.
- MUST check version, tier, and offering notes when changing settings or recommending upgrades.
- NEVER invent `gitlab.rb`, Rails console, Rake task, feature flag, database, Redis, Gitaly, Sidekiq, Geo, or object storage settings without checking references.

## Fast Lookup

```bash
rg -n "gitlab.rb|reconfigure|gitlab-ctl|Linux package|Helm chart|Docker|source install|configuration" skills/gitlab-admin-docs/references
rg -n "backup|restore|Praefect|Gitaly|Geo|PostgreSQL|Patroni|Redis|Sidekiq|object storage|uploads" skills/gitlab-admin-docs/references
rg -n "Admin area|application setting|instance limit|rate limit|feature flag|license|seat|user cap" skills/gitlab-admin-docs/references/settings skills/gitlab-admin-docs/references
rg -n "LDAP|SAML|SCIM|OAuth|OmniAuth|Kerberos|2FA|external user|internal user" skills/gitlab-admin-docs/references/auth skills/gitlab-admin-docs/references
rg -n "monitoring|Prometheus|logs|audit|troubleshooting|Rake task|Rails console" skills/gitlab-admin-docs/references/monitoring skills/gitlab-admin-docs/references/logs skills/gitlab-admin-docs/references/troubleshooting skills/gitlab-admin-docs/references/raketasks
rg -n "Tier:|Offering:|Status:|Introduced|Deprecated|Removed|GitLab Self-Managed|GitLab Dedicated" skills/gitlab-admin-docs/references
```

## Workflow

1. Classify the task: configuration, users/auth, storage, database, Geo/HA, backup/restore, monitoring/logs, upgrades, Dedicated, or troubleshooting.
2. Search the narrow subtree first, then broader `references/` for version/offering constraints.
3. State prerequisites, install type, affected services, commands/settings, and rollback or verification steps when docs provide them.
4. If the task is API automation or CI behavior, switch to `gitlab-api-docs` or `gitlab-ci-docs` instead of crossing boundaries.
