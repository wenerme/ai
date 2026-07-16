---
name: linear-docs
description: Use when working with Linear product workflows, issues, projects, cycles, initiatives, views, integrations, workspace administration, AI agents, MCP, GraphQL API, OAuth, webhooks, or the Linear TypeScript SDK
---

# Linear Documentation

Official Linear product and developer documentation synchronized from [Linear's `llms.txt`](https://linear.app/llms.txt).

## Start Here

1. Open [the generated documentation index](references/index.md) to select the exact topic.
2. Read the matching product page under `references/docs/` or developer page under `references/developers/`.
3. For GraphQL fields and types, search `references/developers/schema.graphql` instead of loading the full schema.

Completion means the answer is grounded in the relevant synchronized page and API/schema claims use the exact documented names.

## Search

```bash
# Product features and administration
rg -n "<keyword>" references/docs

# API, OAuth, webhooks, agents, and SDK
rg -n "<keyword>" references/developers --glob '*.md'

# Exact GraphQL types, fields, inputs, enums, and directives
rg -n "^(type|input|enum|interface|scalar|directive).*<Name>|^[[:space:]]+<field>" references/developers/schema.graphql
```

The schema is large. Read only a small line window around each `rg` result.

## Topic Routing

| Need | Reference |
| --- | --- |
| Product concepts and first setup | [Start Guide](references/docs/start-guide.md), [Concepts](references/docs/conceptual-model.md) |
| Issues, properties, templates, triage | [Create issues](references/docs/creating-issues.md), [Edit issues](references/docs/editing-issues.md), [Triage](references/docs/triage.md) |
| Projects, initiatives, milestones, dependencies | [Project overview](references/docs/project-overview.md), [Milestones](references/docs/project-milestones.md), [Dependencies](references/docs/project-dependencies.md) |
| Cycles, views, filters, dashboards | [Cycles](references/docs/update-cycles.md), [Custom views](references/docs/custom-views.md), [Filters](references/docs/filters.md), [Dashboards](references/docs/dashboards.md) |
| Teams, members, security, SAML, SCIM | [Teams](references/docs/default-team-pages.md), [Roles](references/docs/members-roles.md), [Security](references/docs/security.md), [SCIM](references/docs/scim.md) |
| GitHub, GitLab, Slack and other integrations | [Integration Directory](references/docs/integration-directory.md), [GitLab](references/docs/gitlab.md), [Slack](references/docs/slack.md) |
| Linear Agent, coding sessions, MCP | [Linear Agent](references/docs/linear-agent.md), [Coding sessions](references/docs/coding-sessions.md), [MCP server](references/docs/mcp.md) |
| GraphQL pagination, filtering, rate limits | [Pagination](references/developers/pagination.md), [Filtering](references/developers/filtering.md), [Rate limiting](references/developers/rate-limiting.md) |
| OAuth and application authorization | [OAuth 2.0](references/developers/oauth-2-0-authentication.md), [Actor authorization](references/developers/oauth-actor-authorization.md), [App manifests](references/developers/oauth-app-manifests.md) |
| Webhooks and attachments | [Webhooks](references/developers/webhooks.md), [Attachments](references/developers/attachments.md), [File storage auth](references/developers/file-storage-authentication.md) |
| Agent Interaction Guidelines | [AIG](references/developers/aig.md), [Agent interaction](references/developers/agent-interaction.md), [Best practices](references/developers/agent-best-practices.md) |
| TypeScript SDK | [Fetching and modifying data](references/developers/sdk-fetching-and-modifying-data.md), [Errors](references/developers/sdk-errors.md), [Advanced usage](references/developers/advanced-usage.md) |
| Exact GraphQL contract | `references/developers/schema.graphql` |

## Boundaries

- Product documentation describes behavior and workspace configuration; developer documentation describes integration contracts. Read both when a workflow crosses that boundary.
- Verify GraphQL names against the synchronized SDL. Examples in prose can omit optional fields or use a simplified query.
- Distinguish personal API keys, OAuth access tokens, webhook signatures, and file-storage signatures; they have different authentication and verification rules.
- Use the source page's current plan, role, and permission qualifiers. Do not generalize an Enterprise/admin-only capability to every workspace.
- The upstream GitHub integration page is currently incomplete and is intentionally not mirrored. Use the Integration Directory and official live source until Linear restores its content.
