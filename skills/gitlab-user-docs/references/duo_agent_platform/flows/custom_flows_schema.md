# Custom flow YAML schema

- Tier: [Free](../../../subscriptions/gitlab_credits.md#for-the-free-tier), Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- Changed to [generally available](https://gitlab.com/gitlab-org/gitlab/-/work_items/602415) in GitLab 19.2.

Custom flows use the
[flow registry v1 specification](https://gitlab.com/gitlab-org/modelops/applied-ml/code-suggestions/ai-assist/-/blob/main/docs/flow_registry/v1.md)
syntax. The v1 specification defines the full YAML structure,
including fields like `version`, `environment`, `components`,
`prompts`, `routers`, and `flow`.

GitLab validates custom flow definitions against the AI Catalog
[`flow_v2.json`](https://gitlab.com/gitlab-org/gitlab/-/blob/master/app/validators/json_schemas/ai_catalog/flow_v2.json)
schema. You cannot use fields from the flow registry v1 specification
that are not defined in `flow_v2.json`. If you use these fields, GitLab rejects
them as disallowed additional properties. For a list of fields that are not supported, see
[`AgentComponent` fields](#agentcomponent-fields).

Some fields in the v1 specification are restricted in custom flows.
For more information, see [restricted fields](#restricted-fields).

The YAML configuration also has a maximum size. For more information, see
[configuration size limits](../ai_catalog.md#configuration-size-limits).

## Goal values by trigger type

When you design a custom flow, the goal value depends on which
event type starts the flow. A flow can have multiple event
types configured, and each event type passes a different value
as `context:goal`. Your flow must handle the goal format for
each event type you configure.

For more information, see
[event types](../automations/_index.md#event-types).

Components access the goal through the `inputs` field:

```yaml
components:
  - name: "my_agent"
    type: AgentComponent
    prompt_id: "my_prompt"
    inputs:
      - from: "context:project_id"
        as: "project_id"
      - "context:goal"
```

### Mention events

When a user mentions the flow service account in a comment,
the full comment text and the resource context are passed as
the goal.

The goal uses this format:

```plaintext
Input: <comment_text>
Context: {<resource_type> IID: <iid>}
```

For example, if a user writes
`@ai-my-flow Can you work on this?` on issue `#2`, the goal is:

```plaintext
Input: @ai-my-flow Can you work on this?
Context: {Issue IID: 2}
```

### Assign and Assign reviewer events

- Typed resource reference [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/628996) in GitLab 19.6 [with a flag](../../../administration/feature_flags/_index.md) named `ai_flow_trigger_typed_resource_goal`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

When the flow service account is added as an assignee or reviewer to an issue or merge request, the resource type and URL are passed as the goal:

```plaintext
Context:
<resource_type>: <resource_web_url>
```

The resource type is `Issue` or `MergeRequest`.

For example, if the flow service account is added as a reviewer to merge request `!10`, the goal is:

```plaintext
Context:
MergeRequest: https://gitlab.example.com/my-group/my-project/-/merge_requests/10
```

Use the URL to identify the resource. Don't use the resource type, because the same issue can appear as `Issue` or `WorkItem`, depending on the event.

> [!warning]
> When the feature flag is enabled, `context:goal` contains the resource type and URL instead of the IID.
> To keep your custom flows working, update any that read `context:goal` as an IID.

### Merge request and work item events

- Typed resource reference [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/628996) in GitLab 19.6 [with a flag](../../../administration/feature_flags/_index.md) named `ai_flow_trigger_typed_resource_goal`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

When a merge request or work item event triggers the flow, the resource type, URL, and action are passed as the goal:

```plaintext
Context:
<resource_type>: <resource_web_url>
Action: <action>
```

The resource type is `MergeRequest` or `WorkItem`.

The action depends on the event and the **Run when** selection:

| Event         | Run when       | Action           |
|---------------|----------------|------------------|
| Merge request | Approved       | `approved`       |
| Merge request | Created        | `created`        |
| Merge request | Merged         | `merged`         |
| Work item     | Created        | `created`        |
| Work item     | Status changed | `status_changed` |

The **Marked ready** and **Merge conflict** actions don't include an action in the goal.

For example, if merge request `!10` is approved, the goal is:

```plaintext
Context:
MergeRequest: https://gitlab.example.com/my-group/my-project/-/merge_requests/10
Action: approved
```

Use the URL to identify the resource. Don't use the resource type, because the same issue can appear as `Issue` or `WorkItem`, depending on the event.

> [!warning]
> When the feature flag is enabled, `context:goal` contains the resource type and URL instead of the IID.
> To keep your custom flows working, update any that read `context:goal` as an IID.

### Pipeline events

When a pipeline event triggers the flow, the full
[pipeline event webhook payload](../../project/integrations/webhook_events.md#pipeline-events)
is passed as the goal.

## Optional top-level properties

### `coding_environment`

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/606480) in GitLab 19.3.

The optional `coding_environment` property declares what kind of coding
environment the flow needs when a workload starts.

| Value | Description |
|-------|-------------|
| `full` | Default when not provided. A repository clone, setup scripts, Git hooks, and the dependency cache. Use this for flows that read or write repository files. |
| `none` | No repository clone. Setup scripts and the dependency cache are skipped. The flow still runs in the project's configured `image`, so that image must include `curl` or `duo` itself. The Duo session Git hook is still installed, so a flow that clones the repository itself keeps its commits attributed to Duo. Use this for API-only flows that interact only with GitLab APIs and need no local repository. Agent tools that read or write repository files have nothing to act on. The `none` value does not block repository access. A flow that has the `run_command` tool can still clone the repository itself. The property controls only what GitLab prepares before the flow starts. |

Use the `full` value when the flow needs a checkout, so
that the clone happens once, up front, instead of during the run.

If you add a value other than `full` or `none` the schema validation fails
and the flow does not run.

If you don't add the `coding_environment` property, the flow receives the full
environment and still has repository access.

Example:

```yaml
version: v1
environment: ambient
coding_environment: none
components:
  - name: "api_agent"
    type: AgentComponent
    prompt_id: "my_api_prompt"
    inputs:
      - "context:goal"
routers:
  - from: "api_agent"
    to: end
flow:
  entry_point: "api_agent"
```

### `include`

- Status: Beta

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/628153) in GitLab 19.5 [with a feature flag](../../../administration/feature_flags/_index.md) named `ai_catalog_flow_agent_references`. Disabled by default.
- [Changed](https://gitlab.com/gitlab-org/gitlab/-/work_items/632225) to [beta](../../../policy/development_stages_support.md#beta) in GitLab 19.6.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.
> This feature is available for testing, but not ready for production use.

The optional `include` property lists the AI Catalog agents the flow uses as subagents.
Each entry names one agent by its item ID and an exact version.
A component claims an entry by repeating it in its `subagents` list.
The component becomes a supervisor over the agent and can delegate tasks to it.

On GitLab Self-Managed with a self-hosted AI Gateway, `include` needs AI Gateway 19.6 or later:

- With AI Gateway 19.5, you can save the flow, but the flow runs without its subagents and shows no error.
- With AI Gateway 19.4 and earlier, the save fails with the message
  `include.0.item_type: Input should be 'agent_template' or 'flow'`.

The supervisor uses the name and the description of each subagent to decide which subagent gets a task.
The session also shows the name as the agent that received the task.
For how to write the description, see [use the agent in a custom flow](../agents/custom.md#in-a-custom-flow).

| Field | Value |
|-------|-------|
| `source` | `ai-catalog` |
| `item_type` | `agent` |
| `item_id` | The item ID of the agent, as a string. |
| `version` | An exact released version of the agent, as a string. For example, `"1.2.0"`. |

Example:

```yaml
version: v1
environment: ambient
include:
  - source: ai-catalog
    item_type: agent
    item_id: "123"
    version: "1.2.0"
components:
  - name: "coordinator"
    type: AgentComponent
    prompt_id: "coordinator"
    subagents:
      - source: ai-catalog
        item_type: agent
        item_id: "123"
        version: "1.2.0"
routers:
  - from: "coordinator"
    to: end
flow:
  entry_point: "coordinator"
```

To find the item ID and the versions of an agent, open the agent in the AI Catalog or
under **AI** > **Agents** in the managing project.
The item ID is the number at the end of the page URL.

These rules apply:

- Each entry needs an exact version. `latest` and ranges such as `1.2.*` are not accepted.
- A flow can reference at most 20 agents, and each agent only once.
- The `subagents` entry must match the `include` entry field for field.
- Only one component in a flow can claim `include` entries.
- The agent does not have to be enabled in the project of the flow.
  The person who enables the flow reviews its agents at that time.
- The agent must be at least as visible as the flow.
  A private agent can be referenced only by a flow in the same managing project.
  A restricted agent can be referenced only by a flow in the same top-level group.
  For more information, see [item visibility](../ai_catalog.md#item-visibility).

When you save the flow, GitLab checks every entry.
The save fails when the agent does not exist, the agent is hidden, you cannot view the agent,
the version does not exist, or the visibility rules are not met.
When the agent does not exist, is hidden, or you cannot view it, the error shows the item ID and version.
In the other cases, the error shows the name of the agent.

When the feature flag is disabled, you cannot create a flow that has `include`,
change the definition of such a flow, or increase its visibility.
To save these changes, remove the `include` property and the `subagents` list from the component.

#### When the flow runs

An agent can change after you save the flow, so GitLab checks every entry again when the flow runs.

- The [GitLab Duo experiment and beta features](../turn_on_off.md#turn-on-beta-and-experimental-features)
  setting must be turned on for the top-level group of the flow's project on GitLab.com, or for the
  instance on GitLab Self-Managed.
  When this setting is turned off, the flow runs without its AI Catalog agents.
  The component that claims the entries runs as an agent with no subagents.
- The feature flag must be enabled.
  When the flag is disabled, the flow also runs without its AI Catalog agents.
- The session stops when an agent cannot be used.
  An agent cannot be used when the agent or the version no longer exists, the agent is hidden,
  you cannot view the agent, or
  [custom agents are turned off](../agents/custom.md#turn-custom-agents-on-or-off) for the
  top-level group of the flow's project.
  The session shows this message:
  `This flow stopped because it uses an AI Catalog agent that cannot be used. Check that the agent is published and that you have access to it.`
- The session stops when the name of an agent matches the name of a component in the flow.
  Give each agent a name that no component in the flow uses.
- A subagent uses only the built-in tools in its definition.
  Model Context Protocol (MCP) tools that you select for the agent
  in the AI Catalog are not available to the agent when it is a subagent.

## Restricted fields

Some fields and features in the v1 specification are restricted
to ensure custom flows work consistently in GitLab.

### `environment`

The `environment` field supports only the `ambient` value in
custom flows.

The `chat` and `chat-partial` values are not supported.

### `model` in prompts

The `model` field inside a `prompts` entry is not supported.

The model is determined by the model provider configured in your
group or instance settings.

### `AgentComponent` fields

The following `AgentComponent` fields from the v1 specification
are not supported:

- `response_schema_id`
- `response_schema_version`
- `max_cycles`
- `max_wrap_up_retries`
- `identical_tool_call_limit`
- `compaction`
- `enable_web_search`

If you include any of these fields, when you save the flow it fails with a
validation error that states that the property is additional and not allowed.
For example:

```plaintext
Latest version definition object property at `/components/0/max_cycles` is a disallowed additional property
Versions is invalid
```

### `OneOffComponent` fields

The `ui_role_as` field is not supported.

### `stop` in prompt parameters

The `stop` field is not supported inside a `params` entry.

### Top-level fields

The `name`, `description`, and `product_group` fields from the
v1 specification are not supported.
Custom flows reject these fields.
