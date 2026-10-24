## Pause an automation

**post** `/agents/automations/{automation_id}/pause`

Pauses future scheduled delivery without stopping an active session.

### Path Parameters

- `automation_id: string`

### Returns

- `Automation = PeriodicAutomation or OneTimeAutomation`

  A saved automation and its schedule.

  - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

      - `Developer object { type }`

        - `type: "developer"`

          The type of the object. Always `developer`.

          - `"developer"`

      - `Agent object { session_id, tool_call_id, type }`

        - `session_id: string`

          The creator session, which is also the automation's target.

        - `tool_call_id: string`

          The tool call that created the automation.

        - `type: "agent"`

          The type of the object. Always `agent`.

          - `"agent"`

    - `expression: string`

      The cron expression determining scheduled occurrences.

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

    - `object: "agent.automation"`

      Always `agent.automation`.

      - `"agent.automation"`

    - `status: "active" or "paused"`

      Whether scheduled delivery is active or paused.

      - `"active"`

      - `"paused"`

    - `target: AutomationTarget`

      The session configuration or existing session receiving invocations.

      - `NewSession object { agent, agent_id, environment, 4 more }`

        - `agent: AutomationAgentConfig or null`

          The inline agent configuration, or null when agent_id is configured.

          - `instructions: string or null`

            Custom instructions, or null when absent.

          - `model: string`

            The requested model name.

          - `multi_agent: MultiAgentConfig`

            The configuration for creating and coordinating subagents.

            - `enabled: boolean`

              Whether subagent tools are enabled. Defaults to false.

            - `max_concurrent_subagents: number or null`

              Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

          - `reasoning: AgentReasoning`

            The configured reasoning policy.

            - `effort: "none" or "minimal" or "low" or 4 more or null`

              The requested reasoning effort, or `null` when the model selects its own default.

              - `"none"`

              - `"minimal"`

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"xhigh"`

              - `"max"`

            - `summary: "concise" or "detailed" or "auto" or null`

              The requested reasoning summary format, or `null` when summaries are disabled.

              - `"concise"`

                Returns a concise reasoning summary when supported.

              - `"detailed"`

                Returns a detailed reasoning summary when supported.

              - `"auto"`

                Automatically selects the most detailed summary supported by the model.

          - `service_tier: "auto" or "default" or "flex" or 3 more`

            The configured service-tier policy.

            - `"auto"`

            - `"default"`

            - `"flex"`

            - `"priority"`

            - `"fast"`

            - `"ultrafast"`

          - `text: AgentText`

            The configured output format and verbosity.

            - `format: TextFormat`

              The effective output format. Defaults to ordinary text.

              - `Text object { type }`

                Generates ordinary text without a structured-output constraint.

                - `type: "text"`

                  The type of the object. Always `text`.

                  - `"text"`

              - `JSONSchema object { schema, type }`

                Constrains generated text to a JSON Schema.

                - `schema: map[unknown]`

                  The JSON Schema that generated text must match.

                - `type: "json_schema"`

                  The type of the object. Always `json_schema`.

                  - `"json_schema"`

            - `verbosity: "low" or "medium" or "high"`

              The amount of text produced by the agent. Defaults to `medium`.

              - `"low"`

              - `"medium"`

              - `"high"`

          - `tools: array of AgentTool`

            Configured tools, excluding confidential credentials.

            - `Function object { defer_loading, description, name, 2 more }`

              A function defined by the application.

              - `defer_loading: boolean`

                Whether the function is deferred and discovered through tool search.

              - `description: string`

                A description of what the function does.

              - `name: string`

                The name of the function.

              - `parameters: map[unknown]`

                A JSON Schema object describing the function's arguments.

              - `type: "function"`

                The type of the object. Always `function`.

                - `"function"`

            - `ProgrammaticToolCalling object { enabled, type }`

              Enables calling tools from model-generated code.

              - `enabled: boolean`

                Whether tools can be called from model-generated code.

              - `type: "programmatic_tool_calling"`

                The type of the object. Always `programmatic_tool_calling`.

                - `"programmatic_tool_calling"`

            - `Mcp object { allowed_tools, connection_origin, credential_id, 5 more }`

              Tools provided by a remote MCP server.

              - `allowed_tools: array of string or null`

                The MCP tools the agent may call.

              - `connection_origin: "service" or "environment"`

                Where outbound MCP HTTP connections originate.

                - `"service"`

                - `"environment"`

              - `credential_id: string or null`

                The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

              - `request_metadata: map[unknown]`

                Metadata included with requests to this MCP server.

              - `required: boolean`

                Whether this MCP server must initialize before the first turn.

              - `server_label: string`

                A label used to identify the MCP server in tool calls.

              - `transport: McpTransport`

                The transport used to connect to the MCP server.

                - `HTTP object { server_url, type }`

                  Connects to an MCP server over HTTP.

                  - `server_url: string`

                    The URL of the MCP server.

                  - `type: "http"`

                    The type of the object. Always `http`.

                    - `"http"`

                - `Stdio object { args, command, cwd, 2 more }`

                  Starts an MCP server as a local process.

                  - `args: array of string`

                    Arguments passed to the MCP server command.

                  - `command: string`

                    The command used to start the MCP server.

                  - `cwd: string`

                    The working directory used to start the MCP server.

                  - `env_vars: array of string`

                    Environment variable names inherited from the execution environment.

                  - `type: "stdio"`

                    The type of the object. Always `stdio`.

                    - `"stdio"`

              - `type: "mcp"`

                The type of the object. Always `mcp`.

                - `"mcp"`

            - `WebSearch object { allowed_domains, context_size, location, 2 more }`

              Web search.

              - `allowed_domains: array of string or null`

                Allowed search domains, or `null` when the search is unrestricted.

              - `context_size: "low" or "medium" or "high"`

                The amount of search context made available to the model. Defaults to `medium`.

                - `"low"`

                - `"medium"`

                - `"high"`

              - `location: object { city, country, region, timezone }  or null`

                Approximate location used to localize search results, if provided.

                - `city: string or null`

                  The city name.

                - `country: string or null`

                  The two-letter ISO country code, such as `US`.

                - `region: string or null`

                  The region or state name.

                - `timezone: string or null`

                  The IANA timezone, such as `America/Los_Angeles`.

              - `mode: "disabled" or "cached" or "live"`

                The source used for web search results.

                - `"disabled"`

                - `"cached"`

                - `"live"`

              - `type: "web_search"`

                The type of the object. Always `web_search`.

                - `"web_search"`

            - `ComputerUse object { include_screenshots, type }`

              Browser use in an OpenAI-hosted session.

              - `include_screenshots: boolean`

                Whether computer tool outputs include screenshots.

              - `type: "computer_use"`

                The type of the object. Always `computer_use`.

                - `"computer_use"`

            - `Automations object { type }`

              Lets the agent manage its own scheduled wakeups.

              - `type: "automations"`

                The type of the object. Always `automations`.

                - `"automations"`

        - `agent_id: string or null`

          The saved agent reference, or null when an inline agent is configured.

        - `environment: AutomationEnvironment`

          Configuration or references used to select the execution environment.

          - `None object { type }`

            - `type: "none"`

              The type of the object. Always `none`.

              - `"none"`

          - `OpenAIHosted object { capability_directories, container_size, desktop, 8 more }`

            Hosted environment selection with confidential setup commands and variables omitted.

            - `capability_directories: array of string or null`

              Directory overrides, or null to inherit the template or creation default.

            - `container_size: "small" or "medium" or "large" or null`

              The configured container size, or null to use the creation default.

              - `"small"`

              - `"medium"`

              - `"large"`

            - `desktop: object { enabled }  or null`

              Desktop overrides, or null to inherit the template or creation default.

              - `enabled: boolean`

                Whether the environment provisions a desktop and browser proxy.

            - `environment_id: string or null`

              An existing environment reference, or null when provisioning a new environment.

            - `environment_template_id: string or null`

              A template reference, or null when no template is selected.

            - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

              File overrides, excluding contents, or null to inherit.

              - `FileID object { file_id, path, type }`

                A project-scoped Files API reference resolved separately for each session.

                - `file_id: string`

                  The ID of the uploaded file.

                - `path: string`

                  The file's absolute path inside the environment.

                - `type: "file_id"`

                  The type of the object. Always `file_id`.

                  - `"file_id"`

              - `Inline object { path, size_bytes, type }`

                Metadata for confidential inline file contents.

                - `path: string`

                  The file's absolute path inside the environment.

                - `size_bytes: number`

                  The decoded size of the inline file in bytes.

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

            - `network: object { access, allowed_domains }  or null`

              Network overrides, or null to inherit the template or creation default.

              - `access: "enabled" or "disabled" or "restricted"`

                The environment's network access mode.

                - `"enabled"`

                  Allows unrestricted network access.

                - `"disabled"`

                  Disables network access.

                - `"restricted"`

                  Applies the configured domain restrictions.

              - `allowed_domains: array of string`

                Domains the environment may access when network access is restricted.

            - `packages: object { npm, python, system }  or null`

              Package overrides, or null to inherit the template or creation default.

              - `npm: array of string`

                npm packages installed globally in the environment.

              - `python: array of string`

                Python packages installed in the environment.

              - `system: array of string`

                System packages installed in the environment.

            - `plugins: array of HostedPlugin or null`

              Plugin overrides, excluding archive contents, or null to inherit.

              - `description: string`

                The installed plugin description.

              - `name: string`

                The installed plugin name.

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

            - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

              Skill overrides, excluding archive contents, or null to inherit.

              - `SkillReference object { skill_id, type, version }`

                A skill resolved afresh from the Skills API whenever a session starts.

                - `skill_id: string`

                  The referenced skill ID.

                - `type: "skill_reference"`

                  The type of the object. Always `skill_reference`.

                  - `"skill_reference"`

                - `version: string or null`

                  The requested version selector, including `latest`.

              - `Inline object { description, name, type }`

                Safe metadata for an inline skill archive.

                - `description: string`

                  The skill description declared in `SKILL.md`.

                - `name: string`

                  The skill name declared in `SKILL.md`.

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

            - `type: "openai_hosted"`

              The type of the object. Always `openai_hosted`.

              - `"openai_hosted"`

          - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

            - `capability_directories: array of string`

              Directories that expose capabilities to the agent.

            - `environment_id: string or null`

              An existing registration, or null to create a session-owned environment.

            - `type: "self_hosted"`

              The type of the object. Always `self_hosted`.

              - `"self_hosted"`

            - `workspace_directory: string`

              The absolute project directory in the environment.

        - `input: array of object { content, role, type }`

          Initial input delivered to each new session.

          - `content: array of InputContent`

            The content of the message.

            - `InputText object { text, type }`

              Text input recorded in a session item.

              - `text: string`

                The text supplied to the agent.

              - `type: "input_text"`

                The type of the object. Always `input_text`.

                - `"input_text"`

            - `InputImage object { image_url, type }`

              Image input recorded in a session item.

              - `image_url: string`

                The URL of the image supplied to the agent, which may be a base64-encoded data URL.

              - `type: "input_image"`

                The type of the object. Always `input_image`.

                - `"input_image"`

          - `role: "user"`

            The role of the message author. Always `user`.

            - `"user"`

          - `type: "message"`

            The type of the input item. Always `message`.

            - `"message"`

        - `metadata: map[string]`

          Metadata attached to each new session.

        - `type: "new_session"`

          The type of the object. Always `new_session`.

          - `"new_session"`

        - `vault_ids: array of string`

          Vaults made available to each new session.

      - `ExistingSession object { instructions, session_id, type }`

        - `instructions: string`

          Saved instructions delivered as an automation notification.

        - `session_id: string`

          The session receiving each invocation.

        - `type: "existing_session"`

          The type of the object. Always `existing_session`.

          - `"existing_session"`

    - `timezone: string`

      The timezone used to interpret the expression.

    - `type: "periodic"`

      The type of the object. Always `periodic`.

      - `"periodic"`

  - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

    - `object: "agent.automation"`

      Always `agent.automation`.

      - `"agent.automation"`

    - `run_at: number`

      The Unix timestamp, in seconds, of the scheduled occurrence.

    - `status: "active" or "paused" or "completed"`

      Completion means the schedule has finished, not the agent's work.

      - `"active"`

      - `"paused"`

      - `"completed"`

    - `target: AutomationTarget`

      The session configuration or existing session receiving invocations.

    - `type: "once"`

      The type of the object. Always `once`.

      - `"once"`

### Example

```http
curl https://api.openai.com/v1/agents/automations/$AUTOMATION_ID/pause \
    -X POST \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "created_by": {
    "type": "developer"
  },
  "expression": "expression",
  "metadata": {
    "foo": "string"
  },
  "name": "name",
  "object": "agent.automation",
  "status": "active",
  "target": {
    "agent": {
      "instructions": "instructions",
      "model": "model",
      "multi_agent": {
        "enabled": true,
        "max_concurrent_subagents": 1
      },
      "reasoning": {
        "effort": "none",
        "summary": "concise"
      },
      "service_tier": "auto",
      "text": {
        "format": {
          "type": "text"
        },
        "verbosity": "low"
      },
      "tools": [
        {
          "defer_loading": true,
          "description": "description",
          "name": "name",
          "parameters": {
            "foo": "bar"
          },
          "type": "function"
        }
      ]
    },
    "agent_id": "agent_id",
    "environment": {
      "type": "none"
    },
    "input": [
      {
        "content": [
          {
            "text": "text",
            "type": "input_text"
          }
        ],
        "role": "user",
        "type": "message"
      }
    ],
    "metadata": {
      "foo": "string"
    },
    "type": "new_session",
    "vault_ids": [
      "string"
    ]
  },
  "timezone": "timezone",
  "type": "periodic"
}
```
