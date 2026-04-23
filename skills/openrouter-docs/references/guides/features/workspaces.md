> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/guides/features/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/guides/features/llms-full.txt.

# Workspaces

Workspaces let you organize your OpenRouter projects into separate environments, each with its own API keys, routing defaults, guardrails, and observability. Use them to isolate teams, projects, or deployment stages (e.g. staging vs. production) under a single account.

## Getting Started

Your existing OpenRouter setup is already in a **Default workspace**. All of your API keys, guardrails, BYOK provider keys, routing policies, presets, plugins, and observability integrations are there. If you don't need multiple workspaces, keep working as usual; nothing changes.

For organizations, all members are automatically added to the Default workspace.

### Creating a New Workspace

1. Go to your [home dashboard](https://openrouter.ai/workspaces)
2. Click the workspace picker and select **[Create Workspace](https://openrouter.ai/workspaces/new)**
3. Name your workspace and add a description

<Note>
  Only organization admins can create and delete workspaces.
</Note>

<Tip>
  You can also create and manage workspaces programmatically using the [management API](https://openrouter.ai/docs/api/api-reference/workspaces/list-workspaces).
</Tip>

## What's Scoped to Each Workspace

Each workspace has independent settings for:

* **[API Keys](https://openrouter.ai/workspaces/default/keys)** — Every API key lives in a workspace. Members can create their own keys in any workspace they belong to. For organizations, admins can create system keys owned by the workspace rather than an individual user.
* **[Guardrails](https://openrouter.ai/workspaces/default/guardrails)** — Each workspace has its own guardrail to govern API key and member activity. Workspace guardrails inherit account-level policies and can add more restrictive rules within those constraints.
* **[BYOK](https://openrouter.ai/workspaces/default/byok)** — Bring your own provider keys per workspace, or share the same provider key across multiple workspaces.
* **[Routing](https://openrouter.ai/workspaces/default/routing)** — Configure provider routing per workspace to optimize for cost, latency, throughput, or tool-calling quality.
* **[Presets](https://openrouter.ai/workspaces/default/presets)** — Organize shortcuts for system prompts, model and provider configurations, and request parameters.
* **[Plugins](https://openrouter.ai/workspaces/default/plugins)** — Configure default plugin behavior for API requests in each workspace.
* **[Observability](https://openrouter.ai/workspaces/default/observability)** — Connect different observability integrations per workspace, or send traces from all workspaces to the same platform.
* **[Members](https://openrouter.ai/workspaces/default/members)** — Control which team members have access to each workspace.

## Account Level Settings

Some settings apply globally across all workspaces:

* **[Activity](https://openrouter.ai/activity) & [Logs](https://openrouter.ai/logs)** — View all account activity and logs, with the option to filter by workspace.
* **[Credits & Billing](https://openrouter.ai/settings/credits)** — Unified billing across all workspaces.
* **[Organization](https://openrouter.ai/settings/organization-members)** — Manage organization members, roles, and workspace assignments.
* **[Management Keys](https://openrouter.ai/settings/management-keys)** — API keys for administrative actions across all workspaces.
* **[Privacy](https://openrouter.ai/settings/privacy)** — Account-level data policies and provider/model restrictions that apply to all workspaces.
* **[Preferences](https://openrouter.ai/settings/preferences)** — Account preferences that apply to all workspaces.

## Organization Permissions

* **Org admins** have admin permissions across all workspaces. Only org admins can create or delete workspaces and add or remove member access.
* **Org members** have member permissions in each workspace they've been added to. Members can belong to multiple workspaces, and their API keys in each workspace are governed by that workspace's settings.
* All org members automatically have member access to the **Default workspace**. Chatroom and Fusion usage is governed by the Default workspace's settings.

## Frequently Asked Questions

<AccordionGroup>
  <Accordion title="What can my workspace members see about a workspace?">
    Within a workspace, members can create and manage their own API keys, and view other members and their roles. Members can belong to multiple workspaces. All org members automatically have access to the Default workspace. At the account level, members can view Activity and Logs.
  </Accordion>

  <Accordion title="What can my organization admins see? What can they edit?">
    Org admins have admin permissions across all workspaces: they can view and manage everything in every workspace, including API keys, guardrails, BYOK, routing, presets, plugins, observability, members, and settings. Only org admins can create or delete workspaces and control members' access to each workspace. At the account level, org admins manage billing and credits, organization membership and roles, management API keys, and account-level data policies and allowed providers/models.
  </Accordion>

  <Accordion title="Can management keys be used across workspaces?">
    Yes. Management keys operate at the account level and can be used to perform administrative actions across all workspaces via the [management API](https://openrouter.ai/docs/api/api-reference/workspaces/list-workspaces).
  </Accordion>

  <Accordion title="Can workspaces have different data policies?">
    Workspaces inherit account-level data policies and allowed providers/models. Within those constraints, each workspace can set more granular guardrails to further restrict API key and member activity. The account-level policy is the ceiling; individual workspaces can only be more restrictive.
  </Accordion>

  <Accordion title="What happens when I remove someone from a workspace?">
    When a member is removed from a workspace, they lose access to it. Before removing them, you must first delete any API keys they created in that workspace. Their access to other workspaces is unaffected. Note: all org members retain access to the Default workspace as long as they remain in the org.
  </Accordion>

  <Accordion title="Is my chatroom/fusion usage in a workspace?">
    Yes. All chatroom and fusion usage is in the Default workspace.
  </Accordion>
</AccordionGroup>