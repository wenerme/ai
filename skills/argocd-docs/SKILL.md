---
name: argocd-docs
description: Use when installing, configuring, operating, securing, upgrading, troubleshooting, extending, or developing Argo CD and its Application, ApplicationSet, RBAC, SSO, repository, notification, or CLI features.
---

# Argo CD Documentation

Official current documentation for Argo CD, the declarative GitOps continuous delivery tool for Kubernetes.

CRITICAL: grep `references/` for keywords before answering. Treat Kubernetes manifests, CLI output, credentials, and version-sensitive upgrade paths as examples until verified for the target Argo CD release.

## Reference Map

- `references/index.md`, `understand_the_basics.md`, `core_concepts.md`, `getting_started.md` - architecture, concepts, and first installation.
- `references/operator-manual/` - installation, HA, TLS, RBAC, SSO, security, clusters, repositories, metrics, notifications, ApplicationSet controller, server configuration, and upgrades.
- `references/user-guide/` - Applications, sources, Helm/Kustomize/Jsonnet, sync and diff behavior, projects, plugins, resource hooks, automation, and `commands/argocd.md` CLI reference.
- `references/developer-guide/` - local development, architecture, APIs, testing, releases, documentation site, and UI/proxy extensions.
- `references/faq.md`, `security_considerations.md`, `SUPPORT.md`, `roadmap.md` - support, security, and roadmap context.

## Focused Lookups

- Search `references/operator-manual/upgrading/` before recommending an upgrade path.
- Search `references/operator-manual/applicationset/` for generators, templates, progressive syncs, and namespace behavior.
- Search `references/operator-manual/user-management/` and `references/operator-manual/rbac.md` for authentication and authorization.
- Search `references/operator-manual/notifications/` for notification providers, templates, triggers, and troubleshooting.
- Search `references/user-guide/commands/argocd.md` for CLI syntax; use the separate `argocd-cli-guide` skill for live operational command execution patterns.

## Source Scope

References mirror the official `argoproj/argo-cd` MkDocs source used by `argo-cd.readthedocs.io`. They exclude `docs/proposals/`, which is design history rather than supported product behavior. Source `{!path!}` inclusions are expanded into the corresponding Markdown or fenced YAML/Lua content.
