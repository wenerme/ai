# Agent tool governance

Configure tool-level approval policies for AI agents to gate sensitive actions with human approval at execution time.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/groups/gitlab-org/-/work_items/20466) in GitLab 19.1 as a [beta](../../policy/development_stages_support.md#beta) [with a feature flag](../../administration/feature_flags/_index.md) named `gitlab_duo_governance_settings`. Enabled by default.
- Added for background flows, such as the Developer Flow, in GitLab 19.3 [with a feature flag](../../administration/feature_flags/_index.md) named `duo_workflow_background_tool_governance`. Disabled by default.
- Feature flag `gitlab_duo_governance_settings` removed in GitLab 19.4.
- Default for local file reads [changed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/256385) from **Always Ask** to **Always Allow** in GitLab 19.5.
- Per-tab permissions [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/264808) in GitLab 19.6.

> [!warning]
> This feature is in [beta](../../policy/development_stages_support.md).
> It is subject to change without notice.
> For more information, see [GitLab Testing Agreement](https://handbook.gitlab.com/handbook/legal/testing-agreement/).

Agent tool governance includes two related but separate features:

- Tool governance sets a mode for each tool.
  Tool governance applies to GitLab Duo Agent Platform tools and tools served by the GitLab MCP server.
- [Blocking MCP servers](#block-model-context-protocol-mcp-servers) blocks all tools
  from an external MCP server. You configure MCP server blocking in the **MCP Registry** tab,
  and the feature has different availability from tool governance.

Tool governance sits at the execution boundary. After an agent has been
admitted to a project, and before a tool is invoked, the governance layer
consults the configured rules for the user's role and the tool's action
category, then enforces the resulting mode.

> [!flag]
> Enforcement for background flows is controlled by a feature flag.
> For more information, see the history.

Tools are classified into three action categories:

- **Read**: Tools that only retrieve or display information.
- **Write**: Tools that create or modify resources.
- **Delete**: Tools that delete or irreversibly remove resources.

Agent tool governance (human-in-the-loop guardrail) lets administrators define how each agent tool is
enforced at the moment of execution. Instead of allowing agents to invoke
any tool without review, you can configure each tool to one of three modes:

- **Always Allow**: The tool executes silently without prompting the user.
- **Always Ask**: The user is shown an inline approval card and must approve
  or reject the action before it proceeds.
- **Always Deny**: The tool is blocked entirely and is invisible to the agent.
  The agent never sees the tool and the user is never prompted.

This feature applies to Agentic Chat and IDE extensions. For flows, governance
enforcement depends on where the flow runs:

- For flows that run in an IDE extension, GitLab enforces governance rules.
- For background flows, such as the Developer Flow, GitLab enforces governance rules
  if the `duo_workflow_background_tool_governance` feature flag is enabled.

## Access types

Each tool has a separate mode for each access type. The access type depends on
who the agent acts as and where it runs:

Cloud access
: Runs on GitLab as the user.
  For example, GitLab Duo Agentic Chat in the GitLab UI.

Local access
: Runs on the user's machine as the user.
  For example, the IDE extensions and the GitLab Duo CLI.

Background access
: Runs on GitLab as a service account, without waiting for anyone.
  For example, flows started by an automation or a mention, and code review.

> [!note]
> Local access modes apply only to calls to the GitLab MCP server. They don't apply
> to the built-in tools of the IDE extensions or the GitLab Duo CLI, such as local file tools.

## Default governance matrix

| Classification | Mode |
|------|------|
| Read (GitLab resources) | Always Allow |
| Read (local files) | Always Allow |
| Read (agent session) | Always Allow |
| Write | Always Ask |
| Delete | Always Ask |

### Always allow common write tools

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/273263) in GitLab 19.7 [with a feature flag](../../administration/feature_flags/_index.md) named `duo_tool_governance_relaxed_defaults`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.
>
> The feature flag is checked for your top-level group and applies to all its subgroups and projects.
> When the feature flag is turned off, the tools in this section default to **Always Ask**,
> like all other write tools in the [default governance matrix](#default-governance-matrix).
>
> If `duo_workflow_background_fail_closed` is turned on, background write and delete tools
> with no rule default to **Always Deny**, whether or not this feature flag is turned on.

The following write tools default to **Always Allow** instead of **Always Ask**
for cloud and local [access types](#access-types):

| Area | Tools |
|------|-------|
| Issues, epics, and work items | `create_issue`, `update_issue`, `create_epic`, `update_epic`, `create_work_item`, `update_work_item` |
| Comments and discussions | `create_issue_note`, `create_work_item_note`, `create_merge_request_note`, `create_merge_request_diff_note`, `reply_to_discussion` |
| Merge requests | `create_merge_request`, `update_merge_request`, `create_branch`, `add_merge_request_reviewers`, `post_suggested_reviewers`, `submit_mr_review` |
| Vulnerabilities | `link_vulnerability_to_issue`, `link_vulnerability_to_merge_request` |

All other write and delete tools keep **Always Ask**, including:

- `create_commit`
- `set_discussion_resolved`
- `create_vulnerability_issue`
- `dismiss_vulnerability`, `confirm_vulnerability`, and other tools that change the state of a vulnerability

These defaults do not change [background access](#access-types).
A background tool with no rule already defaults to **Always Allow**.

A mode you set for a tool always applies, and a project rule can still be stricter than the group rule.

These defaults do not apply to the equivalent GitLab MCP server tools, such as `save_merge_request`.
In GitLab Duo Agent Platform sessions, those tools still prompt for approval.

### GitLab MCP server tools

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/606073) in GitLab 19.4 with a [feature flag](../../administration/feature_flags/_index.md) named `duo_mcp_tool_governance`. Disabled by default.
- [Enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated](https://gitlab.com/gitlab-org/gitlab/-/work_items/607499) in GitLab 19.4.
- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/274037) in GitLab 19.7. Feature flag `duo_mcp_tool_governance` removed.

Tools exposed by the GitLab MCP server appear on the **Tool management** tab
with a source of `mcp`, alongside the GitLab Duo Agent Platform tools. You set
a mode for them the same way, as described in
[Configure tool governance for a group](#configure-tool-governance-for-a-group).

> [!note]
> Tool governance applies when GitLab Duo agents call GitLab MCP server tools.
> It also applies to third-party MCP clients that connect directly to the
> GitLab MCP server, such as Claude Desktop, Claude Code, or Cursor.
> For these clients, the server enforces [Always Deny](#always-deny-enforcement),
> and the client decides how to handle [Always Ask](#always-ask).
> To limit the tools these clients receive, see
> [select tool groups (toolsets)](../model_context_protocol/mcp_server.md#select-tool-groups-toolsets).

Each tool is sorted into an action category based on the annotations it
declares. There's no maintained list to update, so a newly added MCP tool is
governed automatically:

| Tool declares | Category |
|---|---|
| `destructiveHint: true` | Delete |
| `readOnlyHint: true` | Read |
| `readOnlyHint: false` | Write |
| Neither annotation | Delete |

A tool that declares both `destructiveHint: true` and `readOnlyHint: true` is
sorted as Delete. The categories are resolved in the order shown, so the most
restrictive declaration wins. The tools on the tab also vary by GitLab edition,
license, and enabled features, because those determine which tools the MCP
server exposes.

Many capabilities exist as a GitLab Duo Agent Platform tool and an MCP server
tool. One mode governs both, even when the two tools have different names. For
example, setting a mode for `create_merge_request` also applies to the MCP
server tool `save_merge_request`. Set the mode on the GitLab Duo Agent Platform
tool. You don't need to find and set the MCP server tool separately.

If you don't set a mode, behavior is unchanged. Read-only MCP tools remain
pre-approved. Write and delete MCP tools still prompt for approval.

#### Always Deny enforcement

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/258209) in GitLab 19.6 with a [feature flag](../../administration/feature_flags/_index.md) named `duo_mcp_server_governance_rule_enforcement`. Disabled by default.
- [Enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated](https://gitlab.com/gitlab-org/gitlab/-/work_items/632906) in GitLab 19.6.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

**Always Deny** is enforced by the GitLab MCP server, not by the client
that connects to it. A third-party client such as Claude Code or Cursor might
call a denied tool. The server refuses the call before the tool runs, and
answers with a tool execution error (`isError: true`) that names the denied tool.
The error also names the group or project that denied the call if you can read it.

The access type the server checks depends on who calls the tool:

- For third-party clients, the GitLab Duo CLI, and external agents started by an
  automation, the server uses the mode set for [local access](#access-types), the same
  mode that applies to the IDE extensions.
- For GitLab Duo Agentic Chat and other flows, the server uses the access type that
  the session uses for its own tools. For example, a call from Agentic Chat in the
  GitLab UI uses the mode set for cloud access.

If the session's workflow was deleted, or you no longer have access to it, the server
refuses calls to tools in governed groups and projects, and leaves those tools out
of the tool list.

The check happens on the server, so client configuration can't bypass the mode,
and calling a denied tool directly still fails.
When [audit events for the GitLab MCP server](ai-audit-events.md#audit-events-for-the-gitlab-mcp-server)
are turned on, GitLab records denied calls as AI audit events.

Rules are enforced against the group or project the call names in its
arguments, so the tool must identify one. A tool that does not act on a project or
group, such as `get_mcp_server_version`, cannot be governed this way and always
runs. If the call names a project or group that does not exist or that you
cannot access, its rules are not checked, and the tool returns its own error.

Tools that act on multiple projects or groups are checked against the rules of each one,
and a deny in any of them blocks the call.
For example, `save_merge_request` checks both the project in `project_id` and
the one in `target_project_id`, so a deny rule on either project blocks the
call. The most restrictive rule wins, so naming several containers cannot be
used to route around a deny rule. You must treat deny rules as one layer alongside
standard GitLab permissions, not as an absolute block.

A call that names a group is also checked against the rules of the projects in that group.
A deny rule on one of those projects blocks the call, even if you cannot access that project.

Denied tools are also not included in the tool list the server advertises, so a
client does not offer them. A client can name the group or project you work in with the
`X-Gitlab-Namespace-Id` header. The list then uses the rules of that group or project.
For more information, see
[apply tool rules from a group or project](../model_context_protocol/mcp_server.md#apply-tool-rules-from-a-group-or-project).

Without the header, the list uses the rules of your default GitLab Duo namespace.
If you don't have a default namespace, the list is unfiltered. Only rules set
on that namespace apply. A rule set on one of its projects does not hide a tool from the list.

Enforcement is unaffected either way: a denied tool is refused when it is called, even if it
was listed.

#### Always Ask

> [!note]
> When a client uses a GitLab MCP server tool, **Always Ask** rules come from the group or project
> in the `X-Gitlab-Namespace-Id` header, or otherwise from your default GitLab Duo namespace.
> They do not come from the group or project the tool acts on.
> To enforce a rule for the group or project, use **Always Deny**.

**Always Ask** is not enforced by the GitLab MCP server. Tools set to **Always Ask**
are listed with an annotation that asks the client to confirm with you first.
The client's implementation determines if the rule is applied.
Only tools you set to **Always Ask** get the annotation. Tools left on **Default**
are not annotated, even when the UI shows "Default (uses Always Ask)".

This applies only to clients connecting to the GitLab MCP server. In GitLab Duo
Agent Platform, Always Ask pauses the agent and asks you to approve. For more
information, see [Approval prompt (Always Ask)](#approval-prompt-always-ask).

| Client | Always Deny | Always Ask |
|---|---|---|
| Claude Code 2.1.199 and later | Enforced | Prompts for confirmation |
| Claude Code earlier than 2.1.199 | Enforced | Runs without prompting |
| Cursor, Windsurf, other MCP clients | Enforced | Runs without prompting |

Always Deny is enforced for every client because the server refuses the call.
Use Always Deny rather than Always Ask when you need stronger enforcement
across all clients.

### GitLab Duo CLI tools

- [Introduced](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/work_items/3106) in GitLab 19.6 [with a flag](../../administration/feature_flags/_index.md) named `duo_cli_first_party_tools`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.
> This feature is available for testing, but not ready for production use.

The GitLab Duo CLI serves some tools to the agent from its own local MCP server.
These tools appear on the **Tool management** tab with a source of `mcp` and a
category of **Duo CLI**. You set a mode for them the same way as for other tools.

| Tool | ID | Description | Default mode |
|------|----|-------------|--------------|
| Duo CLI Code Review | `mcp__duo__review` | Review the local code changes in the GitLab Duo CLI. | Always Allow |

With GitLab Duo CLI 9.33.0 and later:

- The mode you set for [local access](#access-types) applies to these tools, even when
  tool governance for local access is not turned on for your group.
- Tools set to **Always Allow** run without an approval prompt.
- The tools are available even when the
  [**Allow external MCP tools**](../gitlab_duo/model_context_protocol/mcp_clients.md#allow-external-mcp-tools)
  setting is turned off.

Earlier versions of the GitLab Duo CLI treat these tools like any other external MCP tool.

### Approval prompt (Always Ask)

When a GitLab Duo Agent Platform agent calls a tool configured as
`Always Ask`, execution pauses and an inline approval card is displayed.
The card shows:

- The name of the tool being invoked.
- A description of the action the tool will perform.
- **Approve** and **Reject** buttons.

If you approve, the tool executes and the agent continues. If you reject,
the tool is not executed. The agent receives a rejection signal and may
attempt an alternative approach or stop.

### Denial message (Always Deny)

When an agent attempts to invoke a tool that is configured as **Always Deny**
for your role, the tool is not surfaced to the agent. If the agent's plan
requires a denied tool, it receives an error indicating the tool is
unavailable due to governance policy.

## Rule resolution and cascading

Rules are resolved in the following order, from most specific to least specific:

1. Project-level rule (if configured).
1. Group-level rule (if configured).
1. Default matrix value.

Project-level rules override group-level rules for the same tool, but can
only be equal to or stricter than the group-level rule. Group-level rules
override the defaults. If no rule is configured at any level, the tool
uses the default governance matrix value.

The fail-closed principle applies. If the governance service encounters
a persistent error when resolving rules, the agent receives no tools rather
than silently allowing execution.

## Auto mode in the GitLab Duo CLI

- Tool governance for local access [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/249463) in GitLab 19.3 [with a feature flag](../../administration/feature_flags/_index.md) named `duo_workflow_local_tool_governance`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

If tool governance for local access is turned on for your top-level group, your rules still
apply in [auto mode](../gitlab_duo_cli/use.md#auto-mode):

- Tools set to **Always ask** still prompt for approval.
- Tools set to **Always deny** do not run.

If tool governance for local access is not turned on for your top-level group, auto mode runs
tools without approval.
In GitLab Duo CLI 9.33.0 and later, the modes you set for
[GitLab Duo CLI tools](#gitlab-duo-cli-tools) still apply.

## Configure tool governance for a group

Group-level rules apply to all projects in the group unless overridden
at the project level.

Prerequisites:

- You have the Owner role for the top-level group, which grants the `read_ai_tool_rule` permission.
  Without it, the **Tool management** tab shows a message instead of the rules.

To configure tool governance rules for a group:

1. In the top bar, select **Search or go to** and find your top-level group.
1. In the left sidebar, select **AI** > **Governance**.
1. For each tool, select a mode from the **Mode** dropdown list: **Always Allow**, **Always Ask**, or **Always Deny**.
1. Select **Save changes**.

Changes apply to all subgroups and projects that do not have a project-level override.

## Configure tool governance for a project

Project-level rules override the group-level rules for the same tool
within that project.

Prerequisites:

- You have the Maintainer or Owner role for the project.

To configure tool governance rules for a project:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Governance**.
1. For each tool, select a mode from the dropdown: **Always Allow**, **Always Ask**, or **Always Deny**.
1. Select **Save changes**.

## Block Model Context Protocol (MCP) servers

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/601159) in GitLab 19.3 as a [beta](../../policy/development_stages_support.md) with a [feature flag](../../administration/feature_flags/_index.md) named `mcp_server_block_enforcement`. Disabled by default.
- Enforcement of MCP server blocks [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/251329) for GitLab Self-Managed and GitLab Dedicated in GitLab 19.4, applied when the session's tool configuration is built. Enabled by default.
- Enforcement of MCP server blocks enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated in GitLab 19.4.

> [!warning]
> This feature is in [beta](../../policy/development_stages_support.md).
> It is subject to change without notice.
> For more information, see [GitLab Testing Agreement](https://handbook.gitlab.com/handbook/legal/testing-agreement/).

In addition to [per-tool governance](#default-governance-matrix), group Owners can block all tools from a specific
external MCP server. When an MCP server is blocked, no tools from that server can be
invoked, regardless of individual tool governance settings or user approvals.

> [!flag]
> Enforcement of MCP server blocks is controlled by a feature flag.
> For more information, see the history.
>
> The **MCP Registry** tab, used to block MCP servers, is part of
> [MCP servers in the AI Catalog](../gitlab_duo/model_context_protocol/ai_catalog_mcp_servers.md).
> That feature is an experiment and its availability is controlled with the `ai_catalog_mcp_servers`
> feature flag. The flag is disabled by default. If MCP servers in the AI Catalog is not available to
> you, the **MCP Registry** tab is not available and you can't block servers.
>
> The `ai_catalog_mcp_servers` feature flag is separate from the `mcp_server_block_enforcement`
> feature flag, which controls whether blocks take effect.

If enforcement is not enabled on your instance, the MCP Registry still shows the server as blocked.
The block itself does not take effect, so the server's tools remain available to GitLab Duo Agentic Chat.

The block is applied when the tools for a chat session are assembled, which happens
on every user message, tool approval, and new session. In practice a block takes
effect at the user's next action: a tool call that is awaiting approval when the
block lands does not run, and from the next message onward the blocked server's
tools are not offered to the agent at all. A tool call that is already running
completes.

Because the tools are silently removed rather than denied, the agent does not
receive a policy message. Agents describe the missing tools in their own words,
and after a server is allowed again, an agent in an existing conversation may
still claim the server is blocked based on the earlier conversation. Start a new
conversation, or ask the agent to retry the tool.

Blocking applies to GitLab Duo Agentic Chat in the UI. IDE and CLI clients configure
MCP servers through local configuration files, which this setting does not control.

This differs from the **Always Deny** tool governance mode:

- **Always Deny** applies to individual tools and is configured per project or group.
- Blocking an MCP server applies to all tools from that server and is configured in
  the MCP Registry. It overrides any user approval or tool governance setting.

### Block an MCP server

You can block an MCP server at the group or project level:

- **Group level**: blocks the server for all projects in the group and their subgroups.
  If a server is blocked at the group level, project-level settings cannot unblock it.
- **Project level**: blocks the server for that project only.

#### Block an MCP server for a group

Prerequisites:

- You have the Owner role for the top-level group.
- You can use [MCP servers in the AI Catalog](../gitlab_duo/model_context_protocol/ai_catalog_mcp_servers.md).
  This experiment requires that GitLab Duo experiment and beta features are turned on.

To block an MCP server for a group:

1. In the top bar, select **Search or go to** and find your top-level group.
1. In the left sidebar, select **AI** > **Governance**.
1. Select the **MCP Registry** tab.
1. Find the MCP server you want to block and select **Block**.

The block applies from each user's next message or new chat session. Tools from the
blocked server are removed for all users in the group and its subgroups and projects.

#### Block an MCP server for a project

Prerequisites:

- You have the Owner role for the project.
- You can use [MCP servers in the AI Catalog](../gitlab_duo/model_context_protocol/ai_catalog_mcp_servers.md).
  This experiment requires that GitLab Duo experiment and beta features are turned on.

To block an MCP server for a project:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Governance**.
1. Select the **MCP Registry** tab.
1. Find the MCP server you want to block and select **Block**.

The block applies from each user's next message or new chat session. Tools from the
blocked server are removed for all users in the project. If the same server is also
blocked on an ancestor group, allowing it in the project has no effect until the
group block is removed. The MCP Registry shows these servers as blocked by an
ancestor.

## Known issues

- [Background access](#access-types) supports only **Always Allow** and **Always Deny**.
  **Always Ask** does not apply, because no user is present to respond to an approval prompt
  in a background flow. A tool with no configured background access rule defaults to **Always Allow**.
- The `search` tool served by the GitLab MCP server aggregates what the GitLab Duo Agent Platform
  exposes as separate, narrower search tools, and replaces those tools in the toolset.
  Rules configured on the narrower tools have no effect while `search` is available, including
  **Always Allow**, which the **Tool management** tab still shows as allowed.
  Setting `search` to **Always Deny** removes the aggregated tool and returns the narrower ones,
  which are allowed by default, so search remains available.
  To remove the search tools that `search` replaces, also set `gitlab_issue_search`,
  `gitlab_blob_search`, and `gitlab_merge_request_search` to **Always Deny**. Other search tools,
  such as `gitlab_commit_search` and `gitlab_documentation_search`, have their own rules and stay
  allowed by default. Denying `gitlab_merge_request_search` also denies the `list_merge_requests` tool,
  because governance treats the two names as one tool.
- In GitLab 19.4, setting `search` to **Always Deny** removed `search` without restoring the narrower
  tools, which left the agent with no issue search and no code search.
  This issue is resolved in GitLab 19.5, where denying `search` restores `gitlab_issue_search`,
  `gitlab_blob_search`, and `gitlab_merge_request_search`.

## Related topics

- [AI Governance](_index.md)
- [AI Governance Dashboard](governance-dashboard.md)
- [Control GitLab Duo Agent Platform availability](../duo_agent_platform/turn_on_off.md)
- [GitLab Duo Agent Platform](../duo_agent_platform/_index.md)
- [Audit events](../../administration/compliance/audit_event_reports.md)
