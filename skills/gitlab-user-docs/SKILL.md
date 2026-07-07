---
name: gitlab-user-docs
description: "Use when working with GitLab user-facing product docs: projects, groups, repositories, issues, merge requests, wikis, snippets, packages, releases, environments, application security, compliance, GitLab Duo, imports, search, permissions, profile, SSH, storage, and end-user workflows."
---

# GitLab User Docs

Official GitLab product user documentation synced from [`gitlab-org/gitlab/doc/user`](https://gitlab.com/gitlab-org/gitlab/-/tree/master/doc/user).

Use this skill for user-facing GitLab workflows in projects and groups. For `.gitlab-ci.yml` and pipeline behavior use `gitlab-ci-docs`; for REST/GraphQL endpoints use `gitlab-api-docs`; for self-managed instance administration use `gitlab-admin-docs`; for `glab` CLI commands use `glab-docs` / `glab-cli`.

## Scope

References are Markdown files under `references/`:

- `references/_index.md` — Use GitLab overview.
- `references/project/` — projects, repositories, merge requests, issues, branches, protected branches/tags, integrations, webhooks, import/export, deploy keys, pages, environments, releases, wikis, snippets.
- `references/group/` — groups, subgroups, members, permissions, access tokens, SAML/SCIM and enterprise users.
- `references/application_security/` — scanners, vulnerabilities, security dashboard, dependency scanning, secret detection, policies, SBOM, compliance/security workflows.
- `references/packages/` — package/container registries, dependency proxy, PyPI/npm/Maven/Conan/Go/NuGet/Terraform packages.
- `references/gitlab_duo/`, `references/duo_agent_platform/`, `references/gitlab_duo_chat/`, `references/gitlab_duo_cli/` — GitLab Duo user features.
- `references/import/`, `references/infrastructure/`, `references/compliance/`, `references/analytics/`, `references/glql/`, `references/work_items/`, `references/profile/` — focused feature areas.

## Hard Rules

- MUST search `references/` before answering specific GitLab user workflow questions.
- MUST distinguish GitLab.com, GitLab Self-Managed, and GitLab Dedicated when docs mention offering differences.
- MUST check tier/status/history notes when behavior depends on Free/Premium/Ultimate, experiment/beta/GA, or version availability.
- NEVER answer CI YAML syntax, runner behavior, API field details, or self-managed administration from this skill alone; use the dedicated GitLab skill.
- NEVER invent UI labels, permissions, role names, feature status, or security policy behavior without checking references.

## Fast Lookup

```bash
rg -n "merge request|approval|reviewer|code owner|protected branch|protected tag" skills/gitlab-user-docs/references/project skills/gitlab-user-docs/references/group
rg -n "issue|work item|epic|milestone|iteration|board|label|GLQL" skills/gitlab-user-docs/references
rg -n "container registry|package registry|dependency proxy|npm|PyPI|Maven|NuGet|Terraform" skills/gitlab-user-docs/references/packages skills/gitlab-user-docs/references/project
rg -n "SAST|DAST|dependency scanning|secret detection|vulnerability|security policy|SBOM|compliance" skills/gitlab-user-docs/references/application_security skills/gitlab-user-docs/references/compliance
rg -n "GitLab Duo|Duo Chat|code suggestions|agent platform|Duo CLI|Amazon Q" skills/gitlab-user-docs/references
rg -n "Tier:|Offering:|Status:|Introduced|Deprecated|Removed" skills/gitlab-user-docs/references
```

## Workflow

1. Classify the question by feature area: project/group, planning, source code, package/release/deploy, security/compliance, import/export, Duo, or profile/access.
2. Search the narrow subtree first, then all `references/` for tier/offering/version notes.
3. Quote exact GitLab UI labels, role names, setting names, and status/tier constraints from the docs.
4. If a page links into CI, API, or administration docs, switch to the corresponding skill instead of guessing across boundaries.
