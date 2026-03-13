---
name: gitea-docs
description: "Gitea documentation — self-hosted Git service (lightweight GitHub/GitLab alternative) written in Go. Covers installation (Docker, binary, source, Kubernetes, cloud providers), administration (config cheat sheet, environment variables, reverse proxy, HTTPS, email, logging, authentication, backup/restore, Git LFS, GPG signing, fail2ban), usage (Actions CI/CD, packages registry for npm/PyPI/Docker/Maven/Go/Helm/Cargo/etc, webhooks, pull requests, AGit flow, protected branches/tags, repository mirroring, code owners, markdown), and development (API, OAuth2 provider, migrations, contributing guidelines). USE THIS SKILL WHEN the user asks about Gitea setup, configuration, Actions, package registry, API, or administration."
version: 0.1.0
---

# Gitea Documentation

Official docs for [Gitea](https://gitea.com) — a painless self-hosted all-in-one DevOps platform (Git hosting, CI/CD, packages, code review).

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (98 docs)

### Installation (13 docs)
- `references/installation/with-docker.md` — Docker installation
- `references/installation/with-docker-rootless.md` — Rootless Docker
- `references/installation/on-kubernetes.md` — Kubernetes deployment
- `references/installation/from-binary.md` — Binary installation
- `references/installation/from-source.md` — Build from source
- `references/installation/from-package.md` — Package managers
- `references/installation/on-cloud-provider.md` — Cloud providers
- `references/installation/database-preparation.md` — Database setup
- `references/installation/comparison.md` — Comparison with other platforms
- `references/installation/upgrade-from-gitea.md` — Upgrade guide

### Administration (19 docs)
- `references/administration/config-cheat-sheet.md` — Configuration reference
- `references/administration/environment-variables.md` — Environment variables
- `references/administration/command-line.md` — CLI commands
- `references/administration/reverse-proxies.md` — Reverse proxy setup (Nginx, Apache, Caddy)
- `references/administration/https-support.md` — HTTPS/TLS setup
- `references/administration/email-setup.md` — Email/SMTP configuration
- `references/administration/logging-config.md` — Logging configuration
- `references/administration/authentication.md` — Authentication (LDAP, OAuth2, PAM)
- `references/administration/backup-and-restore.md` — Backup and restore
- `references/administration/git-lfs-support.md` — Git LFS
- `references/administration/signing.md` — GPG signing
- `references/administration/customizing-gitea.md` — Customization (templates, CSS)
- `references/administration/fail2ban-setup.md` — Fail2ban integration

### Usage — Actions CI/CD (8 docs)
- `references/usage/actions/overview.md` — Actions overview
- `references/usage/actions/quickstart.md` — Actions quickstart
- `references/usage/actions/design.md` — Actions architecture
- `references/usage/actions/comparison.md` — Comparison with GitHub Actions
- `references/usage/actions/secrets.md` — Secrets management
- `references/usage/actions/variables.md` — Variables
- `references/usage/actions/badge.md` — Status badges
- `references/usage/actions/faq.md` — FAQ

### Usage — Package Registry (22 docs)
- `references/usage/packages/overview.md` — Package registry overview
- `references/usage/packages/npm.md` — npm
- `references/usage/packages/pypi.md` — PyPI
- `references/usage/packages/container.md` — Container/OCI images
- `references/usage/packages/maven.md` — Maven
- `references/usage/packages/go.md` — Go modules
- `references/usage/packages/cargo.md` — Cargo (Rust)
- `references/usage/packages/helm.md` — Helm charts
- `references/usage/packages/nuget.md` — NuGet
- `references/usage/packages/debian.md` — Debian/APT
- `references/usage/packages/rpm.md` — RPM
- `references/usage/packages/alpine.md` — Alpine APK
- And more (Composer, Conan, Conda, CRAN, Chef, Pub, Swift, Vagrant, RubyGems, Generic, Arch)

### Usage — Repository (11 docs)
- `references/usage/repository/webhooks.md` — Webhooks
- `references/usage/repository/repo-mirror.md` — Repository mirroring
- `references/usage/repository/migration.md` — Migration from other platforms
- `references/usage/repository/push.md` — Push options
- `references/usage/repository/code-owners.md` — CODEOWNERS
- `references/usage/repository/markdown.md` — Markdown features
- `references/usage/repository/clone-filter.md` — Partial clone

### Usage — Issues & PRs (6 docs)
- `references/usage/issues-prs/pull-request.md` — Pull requests
- `references/usage/issues-prs/agit.md` — AGit flow
- `references/usage/issues-prs/labels.md` — Labels
- `references/usage/issues-prs/issue-pull-request-templates.md` — Templates

### Usage — Access Control (4 docs)
- `references/usage/access-control/permissions.md` — Permissions
- `references/usage/access-control/protected-branches.md` — Protected branches
- `references/usage/access-control/protected-tags.md` — Protected tags

### Development (5 docs)
- `references/development/api-usage.md` — API usage
- `references/development/oauth2-provider.md` — OAuth2 provider
- `references/development/hacking-on-gitea.md` — Development setup
- `references/development/migrations.md` — Database migrations
