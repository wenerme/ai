---
name: gitlab-ci-docs
description: "Use when working with GitLab CI/CD docs: .gitlab-ci.yml syntax, jobs, stages, rules, workflow, include, inputs, components, variables, secrets, runners, executors, pipelines, artifacts, cache, environments, deployments, Docker, services, test reports, and pipeline troubleshooting."
---

# GitLab CI/CD Docs

Official GitLab CI/CD documentation synced from [`gitlab-org/gitlab/doc/ci`](https://gitlab.com/gitlab-org/gitlab/-/tree/master/doc/ci).

Use this skill for GitLab CI/CD pipeline configuration and behavior. For project/group user workflows use `gitlab-user-docs`; for REST/GraphQL API endpoints use `gitlab-api-docs`; for self-managed instance administration use `gitlab-admin-docs`; for `glab` CLI commands use `glab-docs` / `glab-cli`.

## Scope

References are Markdown files under `references/`:

- `references/_index.md` — GitLab CI/CD overview and getting started.
- `references/yaml/` — `.gitlab-ci.yml` keyword reference, `rules`, `workflow`, `include`, `needs`, `parallel`, matrix, inputs, expressions.
- `references/pipelines/`, `references/jobs/` — pipeline types, DAGs, scheduled/triggered pipelines, job control, job logs, job artifacts.
- `references/runners/` — GitLab Runner usage from GitLab docs, runner creation/registration, hosted runners, runner scopes.
- `references/variables/`, `references/secrets/` — CI/CD variables, masked/protected variables, external secrets, ID tokens.
- `references/components/`, `references/inputs/`, `references/templates/` — reusable CI/CD components, pipeline inputs, templates.
- `references/docker/`, `references/services/`, `references/cloud_deployment/`, `references/environments/` — containerized jobs, service containers, deployments and environments.
- `references/testing/`, `references/caching/`, `references/pipeline_security/`, `references/debugging.md` — test reports, cache, security and troubleshooting.

## Hard Rules

- MUST search `references/` before answering specific GitLab CI/CD behavior or YAML syntax questions.
- MUST check exact keyword docs before giving `.gitlab-ci.yml` syntax, defaults, merge behavior, or version constraints.
- MUST distinguish project/group/instance variables, protected/masked/hidden variables, and file variables when docs require it.
- MUST distinguish GitLab Runner configuration from GitLab CI YAML. If the answer depends on runner internals not covered here, say so.
- NEVER invent predefined variables, YAML keywords, `rules` behavior, or pipeline source names without checking references.

## Fast Lookup

```bash
rg -n "^#|rules:|workflow:|include:|needs:|parallel:|matrix|inputs|extends|default:|spec:" skills/gitlab-ci-docs/references/yaml skills/gitlab-ci-docs/references/inputs
rg -n "predefined variable|CI_PIPELINE_SOURCE|CI_COMMIT|masked|protected|hidden|file variable|dotenv" skills/gitlab-ci-docs/references/variables skills/gitlab-ci-docs/references
rg -n "runner|executor|register|tag|hosted runner|instance runner|group runner|project runner" skills/gitlab-ci-docs/references/runners skills/gitlab-ci-docs/references
rg -n "artifact|cache|dependency|needs|DAG|child pipeline|multi-project|schedule|trigger" skills/gitlab-ci-docs/references
rg -n "Docker|service|image:|services:|Kubernetes|environment|deployment|review app" skills/gitlab-ci-docs/references/docker skills/gitlab-ci-docs/references/services skills/gitlab-ci-docs/references/environments
rg -n "Tier:|Offering:|Status:|Introduced|Deprecated|Removed" skills/gitlab-ci-docs/references
```

## Workflow

1. Identify whether the question is YAML syntax, pipeline behavior, runner usage, variables/secrets, artifacts/cache, deployments, testing, or troubleshooting.
2. Search the narrow subtree first, then broader CI docs for history/tier/offering constraints.
3. Quote exact keyword names, variable names, and examples from the docs.
4. If the question requires REST/GraphQL operations or self-managed admin settings, switch to `gitlab-api-docs` or `gitlab-admin-docs`.
