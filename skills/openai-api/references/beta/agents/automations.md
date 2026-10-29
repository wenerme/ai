# Automations

## Create an automation

**post** `/agents/automations`

Saves an active automation without invoking it immediately.

### Body Parameters

- `create_automation_params: AutomationScheduleParam`

  Creates an automation without invoking it immediately.

  - `Periodic object { expression, name, target, 3 more }`

    - `expression: string`

      A standard five-field cron expression defining scheduled occurrences.

      `minLength: 1`, `maxLength: 256`

    - `name: string`

      A human-readable name for the automation.

      `minLength: 1`, `maxLength: 256`

    - `target: AutomationTargetParam`

      The session an automation invocation targets.

      - `NewSession object { environment, input, type, 4 more }`

        Create a session for each invocation.

        - `environment: EnvironmentParam`

          The execution environment for each new session.

          - `None object { type }`

            Runs the agent without an execution environment.

            - `type: "none"`

              The type of the object. Always `none`.

              - `"none"`

          - `OpenAIHosted object { type, capability_directories, container_size, 10 more }`

            An existing OpenAI-hosted environment or new inline/template-based hosted configuration.

            - `type: "openai_hosted"`

              The type of the object. Always `openai_hosted`.

              - `"openai_hosted"`

            - `capability_directories: optional array of string or null`

              Directories that contain capabilities exposed to the agent. Defaults to an empty list.

              `minItems: 0`, `maxItems: 16384`

            - `container_size: optional "small" or "medium" or "large"`

              The hosted container size. Omission selects the medium tier.

              - `"small"`

              - `"medium"`

              - `"large"`

            - `desktop: optional object { enabled }  or null`

              Desktop provisioning. Omission or null inherits the template setting, or defaults to disabled.

              - `enabled: boolean`

                Whether to provision the desktop and its browser proxy.

            - `env: optional map[string] or null`

              Environment variables made available to the agent.

            - `environment_id: optional string`

              An existing prewarmed environment. Cannot be combined with a template or inline configuration.

              `minLength: 9`, `maxLength: 256`

            - `environment_template_id: optional string`

              A reusable hosted template applied before inline session configuration. Omitted fields inherit the template; network overrides cannot broaden its policy.

              `minLength: 0`, `maxLength: 64`

            - `files: optional array of HostedEnvironmentFileParam or null`

              Files available before the agent starts. Defaults to an empty list.

              `minItems: 0`, `maxItems: 50`

              - `FileID object { file_id, path, type }`

                A file previously uploaded through the OpenAI Files API.

                - `file_id: string`

                  The ID of the uploaded file.

                  `minLength: 1`, `maxLength: 256`

                - `path: string`

                  The absolute destination path inside `/workspace`.

                  `minLength: 1`, `maxLength: 4096`

                - `type: "file_id"`

                  The type of the object. Always `file_id`.

                  - `"file_id"`

              - `Inline object { data, path, type }`

                A file supplied directly as standard-base64 data.

                - `data: string`

                  The standard-base64-encoded file contents.

                  `minLength: 0`, `maxLength: 6990508`

                - `path: string`

                  The absolute destination path inside `/workspace`.

                  `minLength: 1`, `maxLength: 4096`

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

            - `network: optional object { access, allowed_domains, blocked_domains }  or null`

              Network access policy for the environment. If omitted, the API version determines whether network access is enabled or disabled.

              - `access: "enabled" or "disabled" or "restricted"`

                The environment's network access mode.

                - `"enabled"`

                  Allows unrestricted network access.

                - `"disabled"`

                  Disables network access.

                - `"restricted"`

                  Applies the configured domain restrictions.

              - `allowed_domains: optional array of string or null`

                Domains the environment may access when network access is restricted.

                `minItems: 0`, `maxItems: 16384`

              - `blocked_domains: optional array of string or null`

                Domains blocked for both executor and browser when access is restricted. A nonempty list requires `access: restricted` and cannot be combined with nonempty `allowed_domains`. Wildcard domains are not supported.

                `minItems: 0`, `maxItems: 100`

            - `packages: optional object { npm, python, system }  or null`

              Packages to install in the environment. Defaults to empty package lists.

              - `npm: optional array of string or null`

                npm packages to install globally. Defaults to an empty list.

                `minItems: 0`, `maxItems: 16384`

              - `python: optional array of string or null`

                Python packages to install. Defaults to an empty list.

                `minItems: 0`, `maxItems: 16384`

              - `system: optional array of string or null`

                System packages to install. Defaults to an empty list.

                `minItems: 0`, `maxItems: 16384`

            - `plugins: optional array of HostedPluginParam or null`

              Plugins provided as inline ZIP archives. Defaults to an empty list.

              `minItems: 0`, `maxItems: 32`

              - `description: string`

                The plugin description declared in `.codex-plugin/plugin.json`.

                `minLength: 0`, `maxLength: 1048576`

              - `name: string`

                The plugin name declared in `.codex-plugin/plugin.json`.

                `minLength: 1`, `maxLength: 64`

              - `source: InlineCapabilitySourceParam`

                Provides ZIP bytes encoded with standard base64.

                - `data: string`

                  Standard-base64 encoded ZIP archive bytes.

                  `minLength: 1`, `maxLength: 70254592`

                - `media_type: "application/zip"`

                  The archive media type, always `application/zip`.

                  - `"application/zip"`

                    A ZIP archive.

                - `type: "base64"`

                  The type of the object. Always `base64`.

                  - `"base64"`

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

            - `setup_commands: optional array of SetupCommandParam or null`

              Ordered, confidential setup commands. Command bodies are never returned.

              `minItems: 0`, `maxItems: 16`

              - `command: string`

                The shell command to execute.

                `minLength: 0`, `maxLength: 65536`

              - `cwd: optional string or null`

                The absolute working directory. Defaults to `/workspace`.

                `minLength: 0`, `maxLength: 4096`

            - `skills: optional array of HostedSkillParam or null`

              Skills referenced by ID or provided as inline ZIP archives. Defaults to an empty list.

              `minItems: 0`, `maxItems: 200`

              - `SkillReference object { skill_id, type, version }`

                References a skill uploaded through the Skills API.

                - `skill_id: string`

                  The ID of the skill created through `/v1/skills`.

                  `minLength: 1`, `maxLength: 64`

                - `type: "skill_reference"`

                  The type of the object. Always `skill_reference`.

                  - `"skill_reference"`

                - `version: optional string or null`

                  The skill version, a positive integer or `latest`; omission selects the default.

                  `minLength: 0`, `maxLength: 1048576`

              - `Inline object { description, name, source, type }`

                Supplies a skill ZIP directly in the session request.

                - `description: string`

                  The skill description declared in `SKILL.md`.

                  `minLength: 0`, `maxLength: 1048576`

                - `name: string`

                  The skill name declared in `SKILL.md`.

                  `minLength: 1`, `maxLength: 64`

                - `source: InlineCapabilitySourceParam`

                  Provides ZIP bytes encoded with standard base64.

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

          - `SelfHosted object { type, workspace_directory, capability_directories }`

            An application-hosted environment configured inline.

            - `type: "self_hosted"`

              The type of the object. Always `self_hosted`.

              - `"self_hosted"`

            - `workspace_directory: string`

              Absolute project directory inside the self-hosted environment.

              `minLength: 0`, `maxLength: 1048576`

            - `capability_directories: optional array of string or null`

              Directories that contain capabilities exposed to the agent. Defaults to an empty list.

              `minItems: 0`, `maxItems: 16384`

        - `input: array of AgentSessionInputMessageParam`

          Initial user messages submitted with each new session.

          `minItems: 0`, `maxItems: 16384`

          - `content: array of InputContentParam`

            The content of the message.

            `minItems: 0`, `maxItems: 16384`

            - `InputText object { text, type }`

              Text input to the model.

              - `text: string`

                The text sent to the model.

                `minLength: 0`, `maxLength: 1048576`

              - `type: "input_text"`

                The type of the object. Always `input_text`.

                - `"input_text"`

            - `InputImage object { image_url, type }`

              Image input to the model.

              - `image_url: string`

                The URL of the image sent to the model.

                `minLength: 0`, `maxLength: 1048576`

              - `type: "input_image"`

                The type of the object. Always `input_image`.

                - `"input_image"`

          - `role: "user"`

            The role of the message author. Always `user`.

            - `"user"`

          - `type: optional "message"`

            The type of the input item. Always `message`.

            - `"message"`

        - `type: "new_session"`

          The type of the object. Always `new_session`.

          - `"new_session"`

        - `agent: optional object { compaction, instructions, model, 5 more }`

          Inline agent configuration. Provide exactly one of agent and agent_id.

          - `compaction: optional object { async }  or null`

            Context compaction settings. Omit to keep the current settings. A supplied object replaces the settings; null or an empty object enables background compaction.

            - `async: optional boolean or null`

              Whether to compact context in the background. Omission or null defaults to true. Set to false to use blocking compaction. Background compaction may increase token usage.

          - `instructions: optional string or null`

            Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.

            `minLength: 0`, `maxLength: 1048576`

          - `model: optional string`

            The model to use for the agent. The requested model name is preserved.

            `minLength: 0`, `maxLength: 1048576`

          - `multi_agent: optional MultiAgentConfigParam or null`

            Configuration for creating and coordinating subagents.

            - `enabled: boolean`

              Whether subagent tools are enabled.

            - `max_concurrent_subagents: optional number`

              Maximum number of subagents that may run concurrently. Defaults to 6.

              `format: int64`, `minimum: 1`, `maximum: 4294967295`

          - `reasoning: optional AgentReasoningParam or null`

            Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.

            - `effort: optional "none" or "minimal" or "low" or 4 more or null`

              The amount of reasoning effort the model should use. Omission lets the model select it.

              - `"none"`

              - `"minimal"`

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"xhigh"`

              - `"max"`

            - `summary: optional "concise" or "detailed" or "auto" or null`

              Controls whether the response includes a reasoning summary.

              - `"concise"`

                Returns a concise reasoning summary when supported.

              - `"detailed"`

                Returns a detailed reasoning summary when supported.

              - `"auto"`

                Automatically selects the most detailed summary supported by the model.

          - `service_tier: optional "auto" or "default" or "flex" or 3 more or null`

            The service tier used for model requests.

            - `"auto"`

              Selects the service tier automatically.

            - `"default"`

              Uses the default service tier.

            - `"flex"`

              Uses the flex service tier.

            - `"priority"`

              Uses the priority service tier.

            - `"fast"`

              Uses the fast service tier.

            - `"ultrafast"`

              Uses the ultrafast service tier.

          - `text: optional AgentTextParam or null`

            Configuration for text generated by the agent.

            - `format: optional TextFormatParam or null`

              The output format. Omission uses ordinary text (`{"type": "text"}`).

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

            - `verbosity: optional "low" or "medium" or "high" or null`

              The amount of text the model should produce. Defaults to `medium`, matching Responses.

              - `"low"`

                Produces less text.

              - `"medium"`

                Uses the default amount of text.

              - `"high"`

                Produces more text.

          - `tools: optional array of AgentToolParam or null`

            Tools available to the agent. Omit to inherit, or pass null to clear them. The resolved tool list must fit within 3 MiB (3,145,728 bytes) of compact UTF-8 JSON.

            `minItems: 0`, `maxItems: 16384`

            - `Function object { description, name, parameters, 2 more }`

              A function defined by the application.

              - `description: string`

                A description of what the function does.

                `minLength: 0`, `maxLength: 1048576`

              - `name: string`

                The name of the function.

                `minLength: 0`, `maxLength: 1048576`

              - `parameters: map[unknown]`

                A JSON Schema object describing the function's arguments.

              - `type: "function"`

                The type of the object. Always `function`.

                - `"function"`

              - `defer_loading: optional boolean`

                Whether this function is deferred and discovered through tool search. Defaults to `false`.

            - `ToolSearch object { type }`

              Discovers deferred function tools and loads them into the model context.

              - `type: "tool_search"`

                The type of the object. Always `tool_search`.

                - `"tool_search"`

            - `ProgrammaticToolCalling object { type, enabled }`

              Enables calling tools from model-generated code.

              - `type: "programmatic_tool_calling"`

                The type of the object. Always `programmatic_tool_calling`.

                - `"programmatic_tool_calling"`

              - `enabled: optional boolean`

                Whether tools can be called from model-generated code. Defaults to `true`.

            - `Mcp object { server_label, transport, type, 5 more }`

              Tools provided by a remote MCP server.

              - `server_label: string`

                A label used to identify the MCP server in tool calls.

                `minLength: 0`, `maxLength: 1048576`

              - `transport: McpTransportParam`

                The transport used to connect to the MCP server.

                - `HTTP object { server_url, type, authorization, headers }`

                  Connects to an MCP server over HTTP.

                  - `server_url: string`

                    The URL of the MCP server.

                    `minLength: 0`, `maxLength: 1048576`

                  - `type: "http"`

                    The type of the object. Always `http`.

                    - `"http"`

                  - `authorization: optional string or null`

                    The authorization value sent to the MCP server, if any.

                    `minLength: 0`, `maxLength: 1048576`

                  - `headers: optional map[string] or null`

                    Additional HTTP headers sent to the MCP server.

                - `Stdio object { command, cwd, type, 3 more }`

                  Starts an MCP server as a local process.

                  - `command: string`

                    The command used to start the MCP server.

                    `minLength: 0`, `maxLength: 1048576`

                  - `cwd: string`

                    The working directory used to start the MCP server.

                    `minLength: 0`, `maxLength: 1048576`

                  - `type: "stdio"`

                    The type of the object. Always `stdio`.

                    - `"stdio"`

                  - `args: optional array of string or null`

                    Arguments passed to the MCP server command.

                    `minItems: 0`, `maxItems: 16384`

                  - `env: optional map[string] or null`

                    Environment variables set for the MCP server process.

                  - `env_vars: optional array of string or null`

                    Environment variable names to inherit from the selected execution environment.

                    `minItems: 0`, `maxItems: 16384`

              - `type: "mcp"`

                The type of the object. Always `mcp`.

                - `"mcp"`

              - `allowed_tools: optional array of string or null`

                The MCP tools the agent may call. All server tools are allowed when omitted.

                `minItems: 0`, `maxItems: 16384`

              - `connection_origin: optional "service" or "environment" or null`

                Selects where outbound MCP HTTP connections originate. Omitted or `service` uses the Managed Agents service network; `environment` uses the session's selected environment.

                - `"service"`

                  Uses the Managed Agents service network.

                - `"environment"`

                  Uses the session's execution environment.

              - `credential_id: optional string or null`

                The attached vault credential used to authenticate this MCP server. Optional when exactly one attached credential matches the server URL.

                `minLength: 0`, `maxLength: 1048576`

              - `request_metadata: optional map[unknown] or null`

                Metadata included with requests to this MCP server.

              - `required: optional boolean`

                Whether this MCP server must initialize before the first turn. Defaults to `false`.

            - `WebSearch object { type, allowed_domains, context_size, 2 more }`

              Web search.

              - `type: "web_search"`

                The type of the object. Always `web_search`.

                - `"web_search"`

              - `allowed_domains: optional array of string or null`

                Domains the search may include.

                `minItems: 0`, `maxItems: 16384`

              - `context_size: optional "low" or "medium" or "high" or null`

                The amount of search context made available to the model. Defaults to `medium`.

                - `"low"`

                - `"medium"`

                - `"high"`

              - `location: optional object { city, country, region, timezone }  or null`

                Approximate location used to localize search results.

                - `city: optional string or null`

                  The city name.

                  `minLength: 0`, `maxLength: 1048576`

                - `country: optional string or null`

                  The two-letter ISO country code, such as `US`.

                  `minLength: 0`, `maxLength: 1048576`

                - `region: optional string or null`

                  The region or state name.

                  `minLength: 0`, `maxLength: 1048576`

                - `timezone: optional string or null`

                  The IANA timezone, such as `America/Los_Angeles`.

                  `minLength: 0`, `maxLength: 1048576`

              - `mode: optional "disabled" or "cached" or "live" or null`

                The source used for web search results. Defaults to `live`.

                - `"disabled"`

                  Disables web search.

                - `"cached"`

                  Uses cached search results.

                - `"live"`

                  Searches the live web.

            - `ComputerUse object { type, include_screenshots }`

              Browser use in an OpenAI-hosted session.

              - `type: "computer_use"`

                The type of the object. Always `computer_use`.

                - `"computer_use"`

              - `include_screenshots: optional boolean`

                Whether computer tool outputs include screenshots. Defaults to `false`.

            - `Automations object { type }`

              Lets the agent manage its own scheduled wakeups.

              - `type: "automations"`

                The type of the object. Always `automations`.

                - `"automations"`

        - `agent_id: optional string`

          A saved agent ID. Provide exactly one of agent and agent_id.

          `minLength: 0`, `maxLength: 64`

        - `metadata: optional map[string] or null`

          Metadata attached to each new session.

        - `vault_ids: optional array of string or null`

          The IDs of vaults made available to each new session.

          `minItems: 0`, `maxItems: 16384`

      - `ExistingSession object { instructions, session_id, type }`

        Deliver instructions to an existing session.

        - `instructions: string`

          Instructions delivered as an automation notification.

          `minLength: 0`, `maxLength: 1048576`

        - `session_id: string`

          The session receiving each invocation.

          `minLength: 0`, `maxLength: 1048576`

        - `type: "existing_session"`

          The type of the object. Always `existing_session`.

          - `"existing_session"`

    - `timezone: string`

      The IANA timezone used to interpret the cron expression.

      `minLength: 1`, `maxLength: 128`

    - `type: "periodic"`

      The type of the object. Always `periodic`.

      - `"periodic"`

    - `metadata: optional map[string]`

  - `Once object { name, run_at, target, 2 more }`

    - `name: string`

      A human-readable name for the automation.

      `minLength: 1`, `maxLength: 256`

    - `run_at: number`

      A future Unix timestamp in seconds.

      `format: int64`

    - `target: AutomationTargetParam`

      The session an automation invocation targets.

    - `type: "once"`

      The type of the object. Always `once`.

      - `"once"`

    - `metadata: optional map[string]`

### Returns

- `Automation = PeriodicAutomation or OneTimeAutomation`

  A saved automation and its schedule.

  - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

      - `Developer object { type }`

        - `type: "developer"`

          The type of the object. Always `developer`.

          - `"developer"`

      - `Agent object { session_id, tool_call_id, type }`

        - `session_id: string`

          The creator session, which is also the automation's target.

          `minLength: 0`

        - `tool_call_id: string`

          The tool call that created the automation.

          `minLength: 0`

        - `type: "agent"`

          The type of the object. Always `agent`.

          - `"agent"`

    - `expression: string`

      The cron expression determining scheduled occurrences.

      `minLength: 0`

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

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

            `minLength: 0`

          - `model: string`

            The requested model name.

            `minLength: 0`

          - `multi_agent: MultiAgentConfig`

            The configuration for creating and coordinating subagents.

            - `enabled: boolean`

              Whether subagent tools are enabled. Defaults to false.

            - `max_concurrent_subagents: number or null`

              Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

              `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

            `minItems: 0`, `maxItems: 2000`

            - `Function object { defer_loading, description, name, 2 more }`

              A function defined by the application.

              - `defer_loading: boolean`

                Whether the function is deferred and discovered through tool search.

              - `description: string`

                A description of what the function does.

                `minLength: 0`

              - `name: string`

                The name of the function.

                `minLength: 0`

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

                `minItems: 0`, `maxItems: 2000`

              - `connection_origin: "service" or "environment"`

                Where outbound MCP HTTP connections originate.

                - `"service"`

                - `"environment"`

              - `credential_id: string or null`

                The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                `minLength: 0`

              - `request_metadata: map[unknown]`

                Metadata included with requests to this MCP server.

              - `required: boolean`

                Whether this MCP server must initialize before the first turn.

              - `server_label: string`

                A label used to identify the MCP server in tool calls.

                `minLength: 0`

              - `transport: McpTransport`

                The transport used to connect to the MCP server.

                - `HTTP object { server_url, type }`

                  Connects to an MCP server over HTTP.

                  - `server_url: string`

                    The URL of the MCP server.

                    `minLength: 0`

                  - `type: "http"`

                    The type of the object. Always `http`.

                    - `"http"`

                - `Stdio object { args, command, cwd, 2 more }`

                  Starts an MCP server as a local process.

                  - `args: array of string`

                    Arguments passed to the MCP server command.

                    `minItems: 0`, `maxItems: 2000`

                  - `command: string`

                    The command used to start the MCP server.

                    `minLength: 0`

                  - `cwd: string`

                    The working directory used to start the MCP server.

                    `minLength: 0`

                  - `env_vars: array of string`

                    Environment variable names inherited from the execution environment.

                    `minItems: 0`, `maxItems: 2000`

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

                `minItems: 0`, `maxItems: 2000`

              - `context_size: "low" or "medium" or "high"`

                The amount of search context made available to the model. Defaults to `medium`.

                - `"low"`

                - `"medium"`

                - `"high"`

              - `location: object { city, country, region, timezone }  or null`

                Approximate location used to localize search results, if provided.

                - `city: string or null`

                  The city name.

                  `minLength: 0`

                - `country: string or null`

                  The two-letter ISO country code, such as `US`.

                  `minLength: 0`

                - `region: string or null`

                  The region or state name.

                  `minLength: 0`

                - `timezone: string or null`

                  The IANA timezone, such as `America/Los_Angeles`.

                  `minLength: 0`

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

          - `compaction: optional object { async }`

            The effective context compaction settings.

            - `async: boolean`

              Whether context is compacted in the background. Defaults to true.

        - `agent_id: string or null`

          The saved agent reference, or null when an inline agent is configured.

          `minLength: 0`

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

              `minItems: 0`, `maxItems: 2000`

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

              `minLength: 0`

            - `environment_template_id: string or null`

              A template reference, or null when no template is selected.

              `minLength: 0`

            - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

              File overrides, excluding contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `FileID object { file_id, path, type }`

                A project-scoped Files API reference resolved separately for each session.

                - `file_id: string`

                  The ID of the uploaded file.

                  `minLength: 0`

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `type: "file_id"`

                  The type of the object. Always `file_id`.

                  - `"file_id"`

              - `Inline object { path, size_bytes, type }`

                Metadata for confidential inline file contents.

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `size_bytes: number`

                  The decoded size of the inline file in bytes.

                  `format: int64`, `minimum: 0`

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

                `minItems: 0`, `maxItems: 2000`

            - `packages: object { npm, python, system }  or null`

              Package overrides, or null to inherit the template or creation default.

              - `npm: array of string`

                npm packages installed globally in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `python: array of string`

                Python packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `system: array of string`

                System packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

            - `plugins: array of HostedPlugin or null`

              Plugin overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `description: string`

                The installed plugin description.

                `minLength: 0`

              - `name: string`

                The installed plugin name.

                `minLength: 0`

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

            - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

              Skill overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `SkillReference object { skill_id, type, version }`

                A skill resolved afresh from the Skills API whenever a session starts.

                - `skill_id: string`

                  The referenced skill ID.

                  `minLength: 0`

                - `type: "skill_reference"`

                  The type of the object. Always `skill_reference`.

                  - `"skill_reference"`

                - `version: string or null`

                  The requested version selector, including `latest`.

                  `minLength: 0`

              - `Inline object { description, name, type }`

                Safe metadata for an inline skill archive.

                - `description: string`

                  The skill description declared in `SKILL.md`.

                  `minLength: 0`

                - `name: string`

                  The skill name declared in `SKILL.md`.

                  `minLength: 0`

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

            - `type: "openai_hosted"`

              The type of the object. Always `openai_hosted`.

              - `"openai_hosted"`

          - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

            - `capability_directories: array of string`

              Directories that expose capabilities to the agent.

              `minItems: 0`, `maxItems: 2000`

            - `environment_id: string or null`

              An existing registration, or null to create a session-owned environment.

              `minLength: 0`

            - `type: "self_hosted"`

              The type of the object. Always `self_hosted`.

              - `"self_hosted"`

            - `workspace_directory: string`

              The absolute project directory in the environment.

              `minLength: 0`

        - `input: array of object { content, role, type }`

          Initial input delivered to each new session.

          `minItems: 0`, `maxItems: 2000`

          - `content: array of InputContent`

            The content of the message.

            `minItems: 0`, `maxItems: 2000`

            - `InputText object { text, type }`

              Text input recorded in a session item.

              - `text: string`

                The text supplied to the agent.

                `minLength: 0`

              - `type: "input_text"`

                The type of the object. Always `input_text`.

                - `"input_text"`

            - `InputImage object { image_url, type }`

              Image input recorded in a session item.

              - `image_url: string`

                The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                `minLength: 0`

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

          `minItems: 0`, `maxItems: 2000`

      - `ExistingSession object { instructions, session_id, type }`

        - `instructions: string`

          Saved instructions delivered as an automation notification.

          `minLength: 0`

        - `session_id: string`

          The session receiving each invocation.

          `minLength: 0`

        - `type: "existing_session"`

          The type of the object. Always `existing_session`.

          - `"existing_session"`

    - `timezone: string`

      The timezone used to interpret the expression.

      `minLength: 0`

    - `type: "periodic"`

      The type of the object. Always `periodic`.

      - `"periodic"`

  - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

    - `object: "agent.automation"`

      Always `agent.automation`.

      - `"agent.automation"`

    - `run_at: number`

      The Unix timestamp, in seconds, of the scheduled occurrence.

      `format: int64`

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
curl https://api.openai.com/v1/agents/automations \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "expression": "x",
          "name": "x",
          "target": {
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
                "role": "user"
              }
            ],
            "type": "new_session"
          },
          "timezone": "x",
          "type": "periodic"
        }'
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
      ],
      "compaction": {
        "async": true
      }
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

## Delete an automation

**delete** `/agents/automations/{automation_id}`

Deletes the automation and prevents future invocations without deleting its target session.

### Path Parameters

- `automation_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `AutomationDeleted object { id, deleted, object }`

  - `id: string`

    The deleted automation ID.

    `minLength: 0`

  - `deleted: boolean`

    Always true.

  - `object: "agent.automation.deleted"`

    Always `agent.automation.deleted`.

    - `"agent.automation.deleted"`

### Example

```http
curl https://api.openai.com/v1/agents/automations/$AUTOMATION_ID \
    -X DELETE \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "agent.automation.deleted"
}
```

## List automations

**get** `/agents/automations`

Lists project-owned automations, optionally filtered by target session.

### Query Parameters

- `after: optional string`

  Return resources after this resource ID in the selected order.

  `minLength: 0`, `maxLength: 1048576`

- `limit: optional number`

  The maximum number of resources to return, between 1 and 100. Defaults to 20.

  `format: int64`, `minimum: 1`, `maximum: 100`

- `order: optional "asc" or "desc"`

  The order in which resources are returned. Defaults to `desc`.

  - `"asc"`

    Returns resources in ascending order.

  - `"desc"`

    Returns resources in descending order.

- `session_id: optional string`

  Matches existing-session targets, including agent-created automations.

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `data: array of Automation`

  The resources returned in this page, in the requested sort order.

  `minItems: 0`, `maxItems: 2000`

  - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

      - `Developer object { type }`

        - `type: "developer"`

          The type of the object. Always `developer`.

          - `"developer"`

      - `Agent object { session_id, tool_call_id, type }`

        - `session_id: string`

          The creator session, which is also the automation's target.

          `minLength: 0`

        - `tool_call_id: string`

          The tool call that created the automation.

          `minLength: 0`

        - `type: "agent"`

          The type of the object. Always `agent`.

          - `"agent"`

    - `expression: string`

      The cron expression determining scheduled occurrences.

      `minLength: 0`

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

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

            `minLength: 0`

          - `model: string`

            The requested model name.

            `minLength: 0`

          - `multi_agent: MultiAgentConfig`

            The configuration for creating and coordinating subagents.

            - `enabled: boolean`

              Whether subagent tools are enabled. Defaults to false.

            - `max_concurrent_subagents: number or null`

              Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

              `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

            `minItems: 0`, `maxItems: 2000`

            - `Function object { defer_loading, description, name, 2 more }`

              A function defined by the application.

              - `defer_loading: boolean`

                Whether the function is deferred and discovered through tool search.

              - `description: string`

                A description of what the function does.

                `minLength: 0`

              - `name: string`

                The name of the function.

                `minLength: 0`

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

                `minItems: 0`, `maxItems: 2000`

              - `connection_origin: "service" or "environment"`

                Where outbound MCP HTTP connections originate.

                - `"service"`

                - `"environment"`

              - `credential_id: string or null`

                The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                `minLength: 0`

              - `request_metadata: map[unknown]`

                Metadata included with requests to this MCP server.

              - `required: boolean`

                Whether this MCP server must initialize before the first turn.

              - `server_label: string`

                A label used to identify the MCP server in tool calls.

                `minLength: 0`

              - `transport: McpTransport`

                The transport used to connect to the MCP server.

                - `HTTP object { server_url, type }`

                  Connects to an MCP server over HTTP.

                  - `server_url: string`

                    The URL of the MCP server.

                    `minLength: 0`

                  - `type: "http"`

                    The type of the object. Always `http`.

                    - `"http"`

                - `Stdio object { args, command, cwd, 2 more }`

                  Starts an MCP server as a local process.

                  - `args: array of string`

                    Arguments passed to the MCP server command.

                    `minItems: 0`, `maxItems: 2000`

                  - `command: string`

                    The command used to start the MCP server.

                    `minLength: 0`

                  - `cwd: string`

                    The working directory used to start the MCP server.

                    `minLength: 0`

                  - `env_vars: array of string`

                    Environment variable names inherited from the execution environment.

                    `minItems: 0`, `maxItems: 2000`

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

                `minItems: 0`, `maxItems: 2000`

              - `context_size: "low" or "medium" or "high"`

                The amount of search context made available to the model. Defaults to `medium`.

                - `"low"`

                - `"medium"`

                - `"high"`

              - `location: object { city, country, region, timezone }  or null`

                Approximate location used to localize search results, if provided.

                - `city: string or null`

                  The city name.

                  `minLength: 0`

                - `country: string or null`

                  The two-letter ISO country code, such as `US`.

                  `minLength: 0`

                - `region: string or null`

                  The region or state name.

                  `minLength: 0`

                - `timezone: string or null`

                  The IANA timezone, such as `America/Los_Angeles`.

                  `minLength: 0`

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

          - `compaction: optional object { async }`

            The effective context compaction settings.

            - `async: boolean`

              Whether context is compacted in the background. Defaults to true.

        - `agent_id: string or null`

          The saved agent reference, or null when an inline agent is configured.

          `minLength: 0`

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

              `minItems: 0`, `maxItems: 2000`

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

              `minLength: 0`

            - `environment_template_id: string or null`

              A template reference, or null when no template is selected.

              `minLength: 0`

            - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

              File overrides, excluding contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `FileID object { file_id, path, type }`

                A project-scoped Files API reference resolved separately for each session.

                - `file_id: string`

                  The ID of the uploaded file.

                  `minLength: 0`

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `type: "file_id"`

                  The type of the object. Always `file_id`.

                  - `"file_id"`

              - `Inline object { path, size_bytes, type }`

                Metadata for confidential inline file contents.

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `size_bytes: number`

                  The decoded size of the inline file in bytes.

                  `format: int64`, `minimum: 0`

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

                `minItems: 0`, `maxItems: 2000`

            - `packages: object { npm, python, system }  or null`

              Package overrides, or null to inherit the template or creation default.

              - `npm: array of string`

                npm packages installed globally in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `python: array of string`

                Python packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `system: array of string`

                System packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

            - `plugins: array of HostedPlugin or null`

              Plugin overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `description: string`

                The installed plugin description.

                `minLength: 0`

              - `name: string`

                The installed plugin name.

                `minLength: 0`

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

            - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

              Skill overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `SkillReference object { skill_id, type, version }`

                A skill resolved afresh from the Skills API whenever a session starts.

                - `skill_id: string`

                  The referenced skill ID.

                  `minLength: 0`

                - `type: "skill_reference"`

                  The type of the object. Always `skill_reference`.

                  - `"skill_reference"`

                - `version: string or null`

                  The requested version selector, including `latest`.

                  `minLength: 0`

              - `Inline object { description, name, type }`

                Safe metadata for an inline skill archive.

                - `description: string`

                  The skill description declared in `SKILL.md`.

                  `minLength: 0`

                - `name: string`

                  The skill name declared in `SKILL.md`.

                  `minLength: 0`

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

            - `type: "openai_hosted"`

              The type of the object. Always `openai_hosted`.

              - `"openai_hosted"`

          - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

            - `capability_directories: array of string`

              Directories that expose capabilities to the agent.

              `minItems: 0`, `maxItems: 2000`

            - `environment_id: string or null`

              An existing registration, or null to create a session-owned environment.

              `minLength: 0`

            - `type: "self_hosted"`

              The type of the object. Always `self_hosted`.

              - `"self_hosted"`

            - `workspace_directory: string`

              The absolute project directory in the environment.

              `minLength: 0`

        - `input: array of object { content, role, type }`

          Initial input delivered to each new session.

          `minItems: 0`, `maxItems: 2000`

          - `content: array of InputContent`

            The content of the message.

            `minItems: 0`, `maxItems: 2000`

            - `InputText object { text, type }`

              Text input recorded in a session item.

              - `text: string`

                The text supplied to the agent.

                `minLength: 0`

              - `type: "input_text"`

                The type of the object. Always `input_text`.

                - `"input_text"`

            - `InputImage object { image_url, type }`

              Image input recorded in a session item.

              - `image_url: string`

                The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                `minLength: 0`

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

          `minItems: 0`, `maxItems: 2000`

      - `ExistingSession object { instructions, session_id, type }`

        - `instructions: string`

          Saved instructions delivered as an automation notification.

          `minLength: 0`

        - `session_id: string`

          The session receiving each invocation.

          `minLength: 0`

        - `type: "existing_session"`

          The type of the object. Always `existing_session`.

          - `"existing_session"`

    - `timezone: string`

      The timezone used to interpret the expression.

      `minLength: 0`

    - `type: "periodic"`

      The type of the object. Always `periodic`.

      - `"periodic"`

  - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

    - `object: "agent.automation"`

      Always `agent.automation`.

      - `"agent.automation"`

    - `run_at: number`

      The Unix timestamp, in seconds, of the scheduled occurrence.

      `format: int64`

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

- `first_id: string or null`

  The ID of the first resource in `data`, or `null` if the page is empty.

  `minLength: 0`

- `has_more: boolean`

  Whether there are more resources to retrieve after this page.

- `last_id: string or null`

  The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.

  `minLength: 0`

- `object: "list"`

  The object type, which is always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/agents/automations \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
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
          ],
          "compaction": {
            "async": true
          }
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
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

## Pause an automation

**post** `/agents/automations/{automation_id}/pause`

Pauses future scheduled delivery without stopping an active session.

### Path Parameters

- `automation_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `Automation = PeriodicAutomation or OneTimeAutomation`

  A saved automation and its schedule.

  - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

      - `Developer object { type }`

        - `type: "developer"`

          The type of the object. Always `developer`.

          - `"developer"`

      - `Agent object { session_id, tool_call_id, type }`

        - `session_id: string`

          The creator session, which is also the automation's target.

          `minLength: 0`

        - `tool_call_id: string`

          The tool call that created the automation.

          `minLength: 0`

        - `type: "agent"`

          The type of the object. Always `agent`.

          - `"agent"`

    - `expression: string`

      The cron expression determining scheduled occurrences.

      `minLength: 0`

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

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

            `minLength: 0`

          - `model: string`

            The requested model name.

            `minLength: 0`

          - `multi_agent: MultiAgentConfig`

            The configuration for creating and coordinating subagents.

            - `enabled: boolean`

              Whether subagent tools are enabled. Defaults to false.

            - `max_concurrent_subagents: number or null`

              Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

              `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

            `minItems: 0`, `maxItems: 2000`

            - `Function object { defer_loading, description, name, 2 more }`

              A function defined by the application.

              - `defer_loading: boolean`

                Whether the function is deferred and discovered through tool search.

              - `description: string`

                A description of what the function does.

                `minLength: 0`

              - `name: string`

                The name of the function.

                `minLength: 0`

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

                `minItems: 0`, `maxItems: 2000`

              - `connection_origin: "service" or "environment"`

                Where outbound MCP HTTP connections originate.

                - `"service"`

                - `"environment"`

              - `credential_id: string or null`

                The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                `minLength: 0`

              - `request_metadata: map[unknown]`

                Metadata included with requests to this MCP server.

              - `required: boolean`

                Whether this MCP server must initialize before the first turn.

              - `server_label: string`

                A label used to identify the MCP server in tool calls.

                `minLength: 0`

              - `transport: McpTransport`

                The transport used to connect to the MCP server.

                - `HTTP object { server_url, type }`

                  Connects to an MCP server over HTTP.

                  - `server_url: string`

                    The URL of the MCP server.

                    `minLength: 0`

                  - `type: "http"`

                    The type of the object. Always `http`.

                    - `"http"`

                - `Stdio object { args, command, cwd, 2 more }`

                  Starts an MCP server as a local process.

                  - `args: array of string`

                    Arguments passed to the MCP server command.

                    `minItems: 0`, `maxItems: 2000`

                  - `command: string`

                    The command used to start the MCP server.

                    `minLength: 0`

                  - `cwd: string`

                    The working directory used to start the MCP server.

                    `minLength: 0`

                  - `env_vars: array of string`

                    Environment variable names inherited from the execution environment.

                    `minItems: 0`, `maxItems: 2000`

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

                `minItems: 0`, `maxItems: 2000`

              - `context_size: "low" or "medium" or "high"`

                The amount of search context made available to the model. Defaults to `medium`.

                - `"low"`

                - `"medium"`

                - `"high"`

              - `location: object { city, country, region, timezone }  or null`

                Approximate location used to localize search results, if provided.

                - `city: string or null`

                  The city name.

                  `minLength: 0`

                - `country: string or null`

                  The two-letter ISO country code, such as `US`.

                  `minLength: 0`

                - `region: string or null`

                  The region or state name.

                  `minLength: 0`

                - `timezone: string or null`

                  The IANA timezone, such as `America/Los_Angeles`.

                  `minLength: 0`

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

          - `compaction: optional object { async }`

            The effective context compaction settings.

            - `async: boolean`

              Whether context is compacted in the background. Defaults to true.

        - `agent_id: string or null`

          The saved agent reference, or null when an inline agent is configured.

          `minLength: 0`

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

              `minItems: 0`, `maxItems: 2000`

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

              `minLength: 0`

            - `environment_template_id: string or null`

              A template reference, or null when no template is selected.

              `minLength: 0`

            - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

              File overrides, excluding contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `FileID object { file_id, path, type }`

                A project-scoped Files API reference resolved separately for each session.

                - `file_id: string`

                  The ID of the uploaded file.

                  `minLength: 0`

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `type: "file_id"`

                  The type of the object. Always `file_id`.

                  - `"file_id"`

              - `Inline object { path, size_bytes, type }`

                Metadata for confidential inline file contents.

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `size_bytes: number`

                  The decoded size of the inline file in bytes.

                  `format: int64`, `minimum: 0`

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

                `minItems: 0`, `maxItems: 2000`

            - `packages: object { npm, python, system }  or null`

              Package overrides, or null to inherit the template or creation default.

              - `npm: array of string`

                npm packages installed globally in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `python: array of string`

                Python packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `system: array of string`

                System packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

            - `plugins: array of HostedPlugin or null`

              Plugin overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `description: string`

                The installed plugin description.

                `minLength: 0`

              - `name: string`

                The installed plugin name.

                `minLength: 0`

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

            - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

              Skill overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `SkillReference object { skill_id, type, version }`

                A skill resolved afresh from the Skills API whenever a session starts.

                - `skill_id: string`

                  The referenced skill ID.

                  `minLength: 0`

                - `type: "skill_reference"`

                  The type of the object. Always `skill_reference`.

                  - `"skill_reference"`

                - `version: string or null`

                  The requested version selector, including `latest`.

                  `minLength: 0`

              - `Inline object { description, name, type }`

                Safe metadata for an inline skill archive.

                - `description: string`

                  The skill description declared in `SKILL.md`.

                  `minLength: 0`

                - `name: string`

                  The skill name declared in `SKILL.md`.

                  `minLength: 0`

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

            - `type: "openai_hosted"`

              The type of the object. Always `openai_hosted`.

              - `"openai_hosted"`

          - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

            - `capability_directories: array of string`

              Directories that expose capabilities to the agent.

              `minItems: 0`, `maxItems: 2000`

            - `environment_id: string or null`

              An existing registration, or null to create a session-owned environment.

              `minLength: 0`

            - `type: "self_hosted"`

              The type of the object. Always `self_hosted`.

              - `"self_hosted"`

            - `workspace_directory: string`

              The absolute project directory in the environment.

              `minLength: 0`

        - `input: array of object { content, role, type }`

          Initial input delivered to each new session.

          `minItems: 0`, `maxItems: 2000`

          - `content: array of InputContent`

            The content of the message.

            `minItems: 0`, `maxItems: 2000`

            - `InputText object { text, type }`

              Text input recorded in a session item.

              - `text: string`

                The text supplied to the agent.

                `minLength: 0`

              - `type: "input_text"`

                The type of the object. Always `input_text`.

                - `"input_text"`

            - `InputImage object { image_url, type }`

              Image input recorded in a session item.

              - `image_url: string`

                The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                `minLength: 0`

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

          `minItems: 0`, `maxItems: 2000`

      - `ExistingSession object { instructions, session_id, type }`

        - `instructions: string`

          Saved instructions delivered as an automation notification.

          `minLength: 0`

        - `session_id: string`

          The session receiving each invocation.

          `minLength: 0`

        - `type: "existing_session"`

          The type of the object. Always `existing_session`.

          - `"existing_session"`

    - `timezone: string`

      The timezone used to interpret the expression.

      `minLength: 0`

    - `type: "periodic"`

      The type of the object. Always `periodic`.

      - `"periodic"`

  - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

    - `object: "agent.automation"`

      Always `agent.automation`.

      - `"agent.automation"`

    - `run_at: number`

      The Unix timestamp, in seconds, of the scheduled occurrence.

      `format: int64`

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
      ],
      "compaction": {
        "async": true
      }
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

## Resume an automation

**post** `/agents/automations/{automation_id}/resume`

Resumes scheduled delivery; one-time automations without a pending invocation require a future run_at.

### Path Parameters

- `automation_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `Automation = PeriodicAutomation or OneTimeAutomation`

  A saved automation and its schedule.

  - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

      - `Developer object { type }`

        - `type: "developer"`

          The type of the object. Always `developer`.

          - `"developer"`

      - `Agent object { session_id, tool_call_id, type }`

        - `session_id: string`

          The creator session, which is also the automation's target.

          `minLength: 0`

        - `tool_call_id: string`

          The tool call that created the automation.

          `minLength: 0`

        - `type: "agent"`

          The type of the object. Always `agent`.

          - `"agent"`

    - `expression: string`

      The cron expression determining scheduled occurrences.

      `minLength: 0`

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

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

            `minLength: 0`

          - `model: string`

            The requested model name.

            `minLength: 0`

          - `multi_agent: MultiAgentConfig`

            The configuration for creating and coordinating subagents.

            - `enabled: boolean`

              Whether subagent tools are enabled. Defaults to false.

            - `max_concurrent_subagents: number or null`

              Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

              `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

            `minItems: 0`, `maxItems: 2000`

            - `Function object { defer_loading, description, name, 2 more }`

              A function defined by the application.

              - `defer_loading: boolean`

                Whether the function is deferred and discovered through tool search.

              - `description: string`

                A description of what the function does.

                `minLength: 0`

              - `name: string`

                The name of the function.

                `minLength: 0`

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

                `minItems: 0`, `maxItems: 2000`

              - `connection_origin: "service" or "environment"`

                Where outbound MCP HTTP connections originate.

                - `"service"`

                - `"environment"`

              - `credential_id: string or null`

                The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                `minLength: 0`

              - `request_metadata: map[unknown]`

                Metadata included with requests to this MCP server.

              - `required: boolean`

                Whether this MCP server must initialize before the first turn.

              - `server_label: string`

                A label used to identify the MCP server in tool calls.

                `minLength: 0`

              - `transport: McpTransport`

                The transport used to connect to the MCP server.

                - `HTTP object { server_url, type }`

                  Connects to an MCP server over HTTP.

                  - `server_url: string`

                    The URL of the MCP server.

                    `minLength: 0`

                  - `type: "http"`

                    The type of the object. Always `http`.

                    - `"http"`

                - `Stdio object { args, command, cwd, 2 more }`

                  Starts an MCP server as a local process.

                  - `args: array of string`

                    Arguments passed to the MCP server command.

                    `minItems: 0`, `maxItems: 2000`

                  - `command: string`

                    The command used to start the MCP server.

                    `minLength: 0`

                  - `cwd: string`

                    The working directory used to start the MCP server.

                    `minLength: 0`

                  - `env_vars: array of string`

                    Environment variable names inherited from the execution environment.

                    `minItems: 0`, `maxItems: 2000`

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

                `minItems: 0`, `maxItems: 2000`

              - `context_size: "low" or "medium" or "high"`

                The amount of search context made available to the model. Defaults to `medium`.

                - `"low"`

                - `"medium"`

                - `"high"`

              - `location: object { city, country, region, timezone }  or null`

                Approximate location used to localize search results, if provided.

                - `city: string or null`

                  The city name.

                  `minLength: 0`

                - `country: string or null`

                  The two-letter ISO country code, such as `US`.

                  `minLength: 0`

                - `region: string or null`

                  The region or state name.

                  `minLength: 0`

                - `timezone: string or null`

                  The IANA timezone, such as `America/Los_Angeles`.

                  `minLength: 0`

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

          - `compaction: optional object { async }`

            The effective context compaction settings.

            - `async: boolean`

              Whether context is compacted in the background. Defaults to true.

        - `agent_id: string or null`

          The saved agent reference, or null when an inline agent is configured.

          `minLength: 0`

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

              `minItems: 0`, `maxItems: 2000`

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

              `minLength: 0`

            - `environment_template_id: string or null`

              A template reference, or null when no template is selected.

              `minLength: 0`

            - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

              File overrides, excluding contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `FileID object { file_id, path, type }`

                A project-scoped Files API reference resolved separately for each session.

                - `file_id: string`

                  The ID of the uploaded file.

                  `minLength: 0`

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `type: "file_id"`

                  The type of the object. Always `file_id`.

                  - `"file_id"`

              - `Inline object { path, size_bytes, type }`

                Metadata for confidential inline file contents.

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `size_bytes: number`

                  The decoded size of the inline file in bytes.

                  `format: int64`, `minimum: 0`

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

                `minItems: 0`, `maxItems: 2000`

            - `packages: object { npm, python, system }  or null`

              Package overrides, or null to inherit the template or creation default.

              - `npm: array of string`

                npm packages installed globally in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `python: array of string`

                Python packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `system: array of string`

                System packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

            - `plugins: array of HostedPlugin or null`

              Plugin overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `description: string`

                The installed plugin description.

                `minLength: 0`

              - `name: string`

                The installed plugin name.

                `minLength: 0`

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

            - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

              Skill overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `SkillReference object { skill_id, type, version }`

                A skill resolved afresh from the Skills API whenever a session starts.

                - `skill_id: string`

                  The referenced skill ID.

                  `minLength: 0`

                - `type: "skill_reference"`

                  The type of the object. Always `skill_reference`.

                  - `"skill_reference"`

                - `version: string or null`

                  The requested version selector, including `latest`.

                  `minLength: 0`

              - `Inline object { description, name, type }`

                Safe metadata for an inline skill archive.

                - `description: string`

                  The skill description declared in `SKILL.md`.

                  `minLength: 0`

                - `name: string`

                  The skill name declared in `SKILL.md`.

                  `minLength: 0`

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

            - `type: "openai_hosted"`

              The type of the object. Always `openai_hosted`.

              - `"openai_hosted"`

          - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

            - `capability_directories: array of string`

              Directories that expose capabilities to the agent.

              `minItems: 0`, `maxItems: 2000`

            - `environment_id: string or null`

              An existing registration, or null to create a session-owned environment.

              `minLength: 0`

            - `type: "self_hosted"`

              The type of the object. Always `self_hosted`.

              - `"self_hosted"`

            - `workspace_directory: string`

              The absolute project directory in the environment.

              `minLength: 0`

        - `input: array of object { content, role, type }`

          Initial input delivered to each new session.

          `minItems: 0`, `maxItems: 2000`

          - `content: array of InputContent`

            The content of the message.

            `minItems: 0`, `maxItems: 2000`

            - `InputText object { text, type }`

              Text input recorded in a session item.

              - `text: string`

                The text supplied to the agent.

                `minLength: 0`

              - `type: "input_text"`

                The type of the object. Always `input_text`.

                - `"input_text"`

            - `InputImage object { image_url, type }`

              Image input recorded in a session item.

              - `image_url: string`

                The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                `minLength: 0`

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

          `minItems: 0`, `maxItems: 2000`

      - `ExistingSession object { instructions, session_id, type }`

        - `instructions: string`

          Saved instructions delivered as an automation notification.

          `minLength: 0`

        - `session_id: string`

          The session receiving each invocation.

          `minLength: 0`

        - `type: "existing_session"`

          The type of the object. Always `existing_session`.

          - `"existing_session"`

    - `timezone: string`

      The timezone used to interpret the expression.

      `minLength: 0`

    - `type: "periodic"`

      The type of the object. Always `periodic`.

      - `"periodic"`

  - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

    - `object: "agent.automation"`

      Always `agent.automation`.

      - `"agent.automation"`

    - `run_at: number`

      The Unix timestamp, in seconds, of the scheduled occurrence.

      `format: int64`

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
curl https://api.openai.com/v1/agents/automations/$AUTOMATION_ID/resume \
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
      ],
      "compaction": {
        "async": true
      }
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

## Get an automation

**get** `/agents/automations/{automation_id}`

Retrieves a project-owned automation.

### Path Parameters

- `automation_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `Automation = PeriodicAutomation or OneTimeAutomation`

  A saved automation and its schedule.

  - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

      - `Developer object { type }`

        - `type: "developer"`

          The type of the object. Always `developer`.

          - `"developer"`

      - `Agent object { session_id, tool_call_id, type }`

        - `session_id: string`

          The creator session, which is also the automation's target.

          `minLength: 0`

        - `tool_call_id: string`

          The tool call that created the automation.

          `minLength: 0`

        - `type: "agent"`

          The type of the object. Always `agent`.

          - `"agent"`

    - `expression: string`

      The cron expression determining scheduled occurrences.

      `minLength: 0`

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

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

            `minLength: 0`

          - `model: string`

            The requested model name.

            `minLength: 0`

          - `multi_agent: MultiAgentConfig`

            The configuration for creating and coordinating subagents.

            - `enabled: boolean`

              Whether subagent tools are enabled. Defaults to false.

            - `max_concurrent_subagents: number or null`

              Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

              `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

            `minItems: 0`, `maxItems: 2000`

            - `Function object { defer_loading, description, name, 2 more }`

              A function defined by the application.

              - `defer_loading: boolean`

                Whether the function is deferred and discovered through tool search.

              - `description: string`

                A description of what the function does.

                `minLength: 0`

              - `name: string`

                The name of the function.

                `minLength: 0`

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

                `minItems: 0`, `maxItems: 2000`

              - `connection_origin: "service" or "environment"`

                Where outbound MCP HTTP connections originate.

                - `"service"`

                - `"environment"`

              - `credential_id: string or null`

                The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                `minLength: 0`

              - `request_metadata: map[unknown]`

                Metadata included with requests to this MCP server.

              - `required: boolean`

                Whether this MCP server must initialize before the first turn.

              - `server_label: string`

                A label used to identify the MCP server in tool calls.

                `minLength: 0`

              - `transport: McpTransport`

                The transport used to connect to the MCP server.

                - `HTTP object { server_url, type }`

                  Connects to an MCP server over HTTP.

                  - `server_url: string`

                    The URL of the MCP server.

                    `minLength: 0`

                  - `type: "http"`

                    The type of the object. Always `http`.

                    - `"http"`

                - `Stdio object { args, command, cwd, 2 more }`

                  Starts an MCP server as a local process.

                  - `args: array of string`

                    Arguments passed to the MCP server command.

                    `minItems: 0`, `maxItems: 2000`

                  - `command: string`

                    The command used to start the MCP server.

                    `minLength: 0`

                  - `cwd: string`

                    The working directory used to start the MCP server.

                    `minLength: 0`

                  - `env_vars: array of string`

                    Environment variable names inherited from the execution environment.

                    `minItems: 0`, `maxItems: 2000`

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

                `minItems: 0`, `maxItems: 2000`

              - `context_size: "low" or "medium" or "high"`

                The amount of search context made available to the model. Defaults to `medium`.

                - `"low"`

                - `"medium"`

                - `"high"`

              - `location: object { city, country, region, timezone }  or null`

                Approximate location used to localize search results, if provided.

                - `city: string or null`

                  The city name.

                  `minLength: 0`

                - `country: string or null`

                  The two-letter ISO country code, such as `US`.

                  `minLength: 0`

                - `region: string or null`

                  The region or state name.

                  `minLength: 0`

                - `timezone: string or null`

                  The IANA timezone, such as `America/Los_Angeles`.

                  `minLength: 0`

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

          - `compaction: optional object { async }`

            The effective context compaction settings.

            - `async: boolean`

              Whether context is compacted in the background. Defaults to true.

        - `agent_id: string or null`

          The saved agent reference, or null when an inline agent is configured.

          `minLength: 0`

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

              `minItems: 0`, `maxItems: 2000`

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

              `minLength: 0`

            - `environment_template_id: string or null`

              A template reference, or null when no template is selected.

              `minLength: 0`

            - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

              File overrides, excluding contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `FileID object { file_id, path, type }`

                A project-scoped Files API reference resolved separately for each session.

                - `file_id: string`

                  The ID of the uploaded file.

                  `minLength: 0`

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `type: "file_id"`

                  The type of the object. Always `file_id`.

                  - `"file_id"`

              - `Inline object { path, size_bytes, type }`

                Metadata for confidential inline file contents.

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `size_bytes: number`

                  The decoded size of the inline file in bytes.

                  `format: int64`, `minimum: 0`

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

                `minItems: 0`, `maxItems: 2000`

            - `packages: object { npm, python, system }  or null`

              Package overrides, or null to inherit the template or creation default.

              - `npm: array of string`

                npm packages installed globally in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `python: array of string`

                Python packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `system: array of string`

                System packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

            - `plugins: array of HostedPlugin or null`

              Plugin overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `description: string`

                The installed plugin description.

                `minLength: 0`

              - `name: string`

                The installed plugin name.

                `minLength: 0`

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

            - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

              Skill overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `SkillReference object { skill_id, type, version }`

                A skill resolved afresh from the Skills API whenever a session starts.

                - `skill_id: string`

                  The referenced skill ID.

                  `minLength: 0`

                - `type: "skill_reference"`

                  The type of the object. Always `skill_reference`.

                  - `"skill_reference"`

                - `version: string or null`

                  The requested version selector, including `latest`.

                  `minLength: 0`

              - `Inline object { description, name, type }`

                Safe metadata for an inline skill archive.

                - `description: string`

                  The skill description declared in `SKILL.md`.

                  `minLength: 0`

                - `name: string`

                  The skill name declared in `SKILL.md`.

                  `minLength: 0`

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

            - `type: "openai_hosted"`

              The type of the object. Always `openai_hosted`.

              - `"openai_hosted"`

          - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

            - `capability_directories: array of string`

              Directories that expose capabilities to the agent.

              `minItems: 0`, `maxItems: 2000`

            - `environment_id: string or null`

              An existing registration, or null to create a session-owned environment.

              `minLength: 0`

            - `type: "self_hosted"`

              The type of the object. Always `self_hosted`.

              - `"self_hosted"`

            - `workspace_directory: string`

              The absolute project directory in the environment.

              `minLength: 0`

        - `input: array of object { content, role, type }`

          Initial input delivered to each new session.

          `minItems: 0`, `maxItems: 2000`

          - `content: array of InputContent`

            The content of the message.

            `minItems: 0`, `maxItems: 2000`

            - `InputText object { text, type }`

              Text input recorded in a session item.

              - `text: string`

                The text supplied to the agent.

                `minLength: 0`

              - `type: "input_text"`

                The type of the object. Always `input_text`.

                - `"input_text"`

            - `InputImage object { image_url, type }`

              Image input recorded in a session item.

              - `image_url: string`

                The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                `minLength: 0`

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

          `minItems: 0`, `maxItems: 2000`

      - `ExistingSession object { instructions, session_id, type }`

        - `instructions: string`

          Saved instructions delivered as an automation notification.

          `minLength: 0`

        - `session_id: string`

          The session receiving each invocation.

          `minLength: 0`

        - `type: "existing_session"`

          The type of the object. Always `existing_session`.

          - `"existing_session"`

    - `timezone: string`

      The timezone used to interpret the expression.

      `minLength: 0`

    - `type: "periodic"`

      The type of the object. Always `periodic`.

      - `"periodic"`

  - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

    - `object: "agent.automation"`

      Always `agent.automation`.

      - `"agent.automation"`

    - `run_at: number`

      The Unix timestamp, in seconds, of the scheduled occurrence.

      `format: int64`

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
curl https://api.openai.com/v1/agents/automations/$AUTOMATION_ID \
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
      ],
      "compaction": {
        "async": true
      }
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

## Update an automation

**post** `/agents/automations/{automation_id}`

Updates supplied fields; target and metadata replace the whole field.

### Path Parameters

- `automation_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Body Parameters

- `expression: optional string`

  Only accepted for periodic automations.

  `minLength: 1`, `maxLength: 256`

- `metadata: optional map[string]`

  Replaces all metadata; omit to leave unchanged.

- `name: optional string`

  `minLength: 1`, `maxLength: 256`

- `run_at: optional number`

  A future Unix timestamp in seconds; accepted only before a one-time scheduled invocation exists.

  `format: int64`

- `target: optional AutomationTargetParam`

  Replaces the complete target, retaining its type and any creator session.

  - `NewSession object { environment, input, type, 4 more }`

    Create a session for each invocation.

    - `environment: EnvironmentParam`

      The execution environment for each new session.

      - `None object { type }`

        Runs the agent without an execution environment.

        - `type: "none"`

          The type of the object. Always `none`.

          - `"none"`

      - `OpenAIHosted object { type, capability_directories, container_size, 10 more }`

        An existing OpenAI-hosted environment or new inline/template-based hosted configuration.

        - `type: "openai_hosted"`

          The type of the object. Always `openai_hosted`.

          - `"openai_hosted"`

        - `capability_directories: optional array of string or null`

          Directories that contain capabilities exposed to the agent. Defaults to an empty list.

          `minItems: 0`, `maxItems: 16384`

        - `container_size: optional "small" or "medium" or "large"`

          The hosted container size. Omission selects the medium tier.

          - `"small"`

          - `"medium"`

          - `"large"`

        - `desktop: optional object { enabled }  or null`

          Desktop provisioning. Omission or null inherits the template setting, or defaults to disabled.

          - `enabled: boolean`

            Whether to provision the desktop and its browser proxy.

        - `env: optional map[string] or null`

          Environment variables made available to the agent.

        - `environment_id: optional string`

          An existing prewarmed environment. Cannot be combined with a template or inline configuration.

          `minLength: 9`, `maxLength: 256`

        - `environment_template_id: optional string`

          A reusable hosted template applied before inline session configuration. Omitted fields inherit the template; network overrides cannot broaden its policy.

          `minLength: 0`, `maxLength: 64`

        - `files: optional array of HostedEnvironmentFileParam or null`

          Files available before the agent starts. Defaults to an empty list.

          `minItems: 0`, `maxItems: 50`

          - `FileID object { file_id, path, type }`

            A file previously uploaded through the OpenAI Files API.

            - `file_id: string`

              The ID of the uploaded file.

              `minLength: 1`, `maxLength: 256`

            - `path: string`

              The absolute destination path inside `/workspace`.

              `minLength: 1`, `maxLength: 4096`

            - `type: "file_id"`

              The type of the object. Always `file_id`.

              - `"file_id"`

          - `Inline object { data, path, type }`

            A file supplied directly as standard-base64 data.

            - `data: string`

              The standard-base64-encoded file contents.

              `minLength: 0`, `maxLength: 6990508`

            - `path: string`

              The absolute destination path inside `/workspace`.

              `minLength: 1`, `maxLength: 4096`

            - `type: "inline"`

              The type of the object. Always `inline`.

              - `"inline"`

        - `network: optional object { access, allowed_domains, blocked_domains }  or null`

          Network access policy for the environment. If omitted, the API version determines whether network access is enabled or disabled.

          - `access: "enabled" or "disabled" or "restricted"`

            The environment's network access mode.

            - `"enabled"`

              Allows unrestricted network access.

            - `"disabled"`

              Disables network access.

            - `"restricted"`

              Applies the configured domain restrictions.

          - `allowed_domains: optional array of string or null`

            Domains the environment may access when network access is restricted.

            `minItems: 0`, `maxItems: 16384`

          - `blocked_domains: optional array of string or null`

            Domains blocked for both executor and browser when access is restricted. A nonempty list requires `access: restricted` and cannot be combined with nonempty `allowed_domains`. Wildcard domains are not supported.

            `minItems: 0`, `maxItems: 100`

        - `packages: optional object { npm, python, system }  or null`

          Packages to install in the environment. Defaults to empty package lists.

          - `npm: optional array of string or null`

            npm packages to install globally. Defaults to an empty list.

            `minItems: 0`, `maxItems: 16384`

          - `python: optional array of string or null`

            Python packages to install. Defaults to an empty list.

            `minItems: 0`, `maxItems: 16384`

          - `system: optional array of string or null`

            System packages to install. Defaults to an empty list.

            `minItems: 0`, `maxItems: 16384`

        - `plugins: optional array of HostedPluginParam or null`

          Plugins provided as inline ZIP archives. Defaults to an empty list.

          `minItems: 0`, `maxItems: 32`

          - `description: string`

            The plugin description declared in `.codex-plugin/plugin.json`.

            `minLength: 0`, `maxLength: 1048576`

          - `name: string`

            The plugin name declared in `.codex-plugin/plugin.json`.

            `minLength: 1`, `maxLength: 64`

          - `source: InlineCapabilitySourceParam`

            Provides ZIP bytes encoded with standard base64.

            - `data: string`

              Standard-base64 encoded ZIP archive bytes.

              `minLength: 1`, `maxLength: 70254592`

            - `media_type: "application/zip"`

              The archive media type, always `application/zip`.

              - `"application/zip"`

                A ZIP archive.

            - `type: "base64"`

              The type of the object. Always `base64`.

              - `"base64"`

          - `type: "inline"`

            The type of the object. Always `inline`.

            - `"inline"`

        - `setup_commands: optional array of SetupCommandParam or null`

          Ordered, confidential setup commands. Command bodies are never returned.

          `minItems: 0`, `maxItems: 16`

          - `command: string`

            The shell command to execute.

            `minLength: 0`, `maxLength: 65536`

          - `cwd: optional string or null`

            The absolute working directory. Defaults to `/workspace`.

            `minLength: 0`, `maxLength: 4096`

        - `skills: optional array of HostedSkillParam or null`

          Skills referenced by ID or provided as inline ZIP archives. Defaults to an empty list.

          `minItems: 0`, `maxItems: 200`

          - `SkillReference object { skill_id, type, version }`

            References a skill uploaded through the Skills API.

            - `skill_id: string`

              The ID of the skill created through `/v1/skills`.

              `minLength: 1`, `maxLength: 64`

            - `type: "skill_reference"`

              The type of the object. Always `skill_reference`.

              - `"skill_reference"`

            - `version: optional string or null`

              The skill version, a positive integer or `latest`; omission selects the default.

              `minLength: 0`, `maxLength: 1048576`

          - `Inline object { description, name, source, type }`

            Supplies a skill ZIP directly in the session request.

            - `description: string`

              The skill description declared in `SKILL.md`.

              `minLength: 0`, `maxLength: 1048576`

            - `name: string`

              The skill name declared in `SKILL.md`.

              `minLength: 1`, `maxLength: 64`

            - `source: InlineCapabilitySourceParam`

              Provides ZIP bytes encoded with standard base64.

            - `type: "inline"`

              The type of the object. Always `inline`.

              - `"inline"`

      - `SelfHosted object { type, workspace_directory, capability_directories }`

        An application-hosted environment configured inline.

        - `type: "self_hosted"`

          The type of the object. Always `self_hosted`.

          - `"self_hosted"`

        - `workspace_directory: string`

          Absolute project directory inside the self-hosted environment.

          `minLength: 0`, `maxLength: 1048576`

        - `capability_directories: optional array of string or null`

          Directories that contain capabilities exposed to the agent. Defaults to an empty list.

          `minItems: 0`, `maxItems: 16384`

    - `input: array of AgentSessionInputMessageParam`

      Initial user messages submitted with each new session.

      `minItems: 0`, `maxItems: 16384`

      - `content: array of InputContentParam`

        The content of the message.

        `minItems: 0`, `maxItems: 16384`

        - `InputText object { text, type }`

          Text input to the model.

          - `text: string`

            The text sent to the model.

            `minLength: 0`, `maxLength: 1048576`

          - `type: "input_text"`

            The type of the object. Always `input_text`.

            - `"input_text"`

        - `InputImage object { image_url, type }`

          Image input to the model.

          - `image_url: string`

            The URL of the image sent to the model.

            `minLength: 0`, `maxLength: 1048576`

          - `type: "input_image"`

            The type of the object. Always `input_image`.

            - `"input_image"`

      - `role: "user"`

        The role of the message author. Always `user`.

        - `"user"`

      - `type: optional "message"`

        The type of the input item. Always `message`.

        - `"message"`

    - `type: "new_session"`

      The type of the object. Always `new_session`.

      - `"new_session"`

    - `agent: optional object { compaction, instructions, model, 5 more }`

      Inline agent configuration. Provide exactly one of agent and agent_id.

      - `compaction: optional object { async }  or null`

        Context compaction settings. Omit to keep the current settings. A supplied object replaces the settings; null or an empty object enables background compaction.

        - `async: optional boolean or null`

          Whether to compact context in the background. Omission or null defaults to true. Set to false to use blocking compaction. Background compaction may increase token usage.

      - `instructions: optional string or null`

        Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.

        `minLength: 0`, `maxLength: 1048576`

      - `model: optional string`

        The model to use for the agent. The requested model name is preserved.

        `minLength: 0`, `maxLength: 1048576`

      - `multi_agent: optional MultiAgentConfigParam or null`

        Configuration for creating and coordinating subagents.

        - `enabled: boolean`

          Whether subagent tools are enabled.

        - `max_concurrent_subagents: optional number`

          Maximum number of subagents that may run concurrently. Defaults to 6.

          `format: int64`, `minimum: 1`, `maximum: 4294967295`

      - `reasoning: optional AgentReasoningParam or null`

        Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.

        - `effort: optional "none" or "minimal" or "low" or 4 more or null`

          The amount of reasoning effort the model should use. Omission lets the model select it.

          - `"none"`

          - `"minimal"`

          - `"low"`

          - `"medium"`

          - `"high"`

          - `"xhigh"`

          - `"max"`

        - `summary: optional "concise" or "detailed" or "auto" or null`

          Controls whether the response includes a reasoning summary.

          - `"concise"`

            Returns a concise reasoning summary when supported.

          - `"detailed"`

            Returns a detailed reasoning summary when supported.

          - `"auto"`

            Automatically selects the most detailed summary supported by the model.

      - `service_tier: optional "auto" or "default" or "flex" or 3 more or null`

        The service tier used for model requests.

        - `"auto"`

          Selects the service tier automatically.

        - `"default"`

          Uses the default service tier.

        - `"flex"`

          Uses the flex service tier.

        - `"priority"`

          Uses the priority service tier.

        - `"fast"`

          Uses the fast service tier.

        - `"ultrafast"`

          Uses the ultrafast service tier.

      - `text: optional AgentTextParam or null`

        Configuration for text generated by the agent.

        - `format: optional TextFormatParam or null`

          The output format. Omission uses ordinary text (`{"type": "text"}`).

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

        - `verbosity: optional "low" or "medium" or "high" or null`

          The amount of text the model should produce. Defaults to `medium`, matching Responses.

          - `"low"`

            Produces less text.

          - `"medium"`

            Uses the default amount of text.

          - `"high"`

            Produces more text.

      - `tools: optional array of AgentToolParam or null`

        Tools available to the agent. Omit to inherit, or pass null to clear them. The resolved tool list must fit within 3 MiB (3,145,728 bytes) of compact UTF-8 JSON.

        `minItems: 0`, `maxItems: 16384`

        - `Function object { description, name, parameters, 2 more }`

          A function defined by the application.

          - `description: string`

            A description of what the function does.

            `minLength: 0`, `maxLength: 1048576`

          - `name: string`

            The name of the function.

            `minLength: 0`, `maxLength: 1048576`

          - `parameters: map[unknown]`

            A JSON Schema object describing the function's arguments.

          - `type: "function"`

            The type of the object. Always `function`.

            - `"function"`

          - `defer_loading: optional boolean`

            Whether this function is deferred and discovered through tool search. Defaults to `false`.

        - `ToolSearch object { type }`

          Discovers deferred function tools and loads them into the model context.

          - `type: "tool_search"`

            The type of the object. Always `tool_search`.

            - `"tool_search"`

        - `ProgrammaticToolCalling object { type, enabled }`

          Enables calling tools from model-generated code.

          - `type: "programmatic_tool_calling"`

            The type of the object. Always `programmatic_tool_calling`.

            - `"programmatic_tool_calling"`

          - `enabled: optional boolean`

            Whether tools can be called from model-generated code. Defaults to `true`.

        - `Mcp object { server_label, transport, type, 5 more }`

          Tools provided by a remote MCP server.

          - `server_label: string`

            A label used to identify the MCP server in tool calls.

            `minLength: 0`, `maxLength: 1048576`

          - `transport: McpTransportParam`

            The transport used to connect to the MCP server.

            - `HTTP object { server_url, type, authorization, headers }`

              Connects to an MCP server over HTTP.

              - `server_url: string`

                The URL of the MCP server.

                `minLength: 0`, `maxLength: 1048576`

              - `type: "http"`

                The type of the object. Always `http`.

                - `"http"`

              - `authorization: optional string or null`

                The authorization value sent to the MCP server, if any.

                `minLength: 0`, `maxLength: 1048576`

              - `headers: optional map[string] or null`

                Additional HTTP headers sent to the MCP server.

            - `Stdio object { command, cwd, type, 3 more }`

              Starts an MCP server as a local process.

              - `command: string`

                The command used to start the MCP server.

                `minLength: 0`, `maxLength: 1048576`

              - `cwd: string`

                The working directory used to start the MCP server.

                `minLength: 0`, `maxLength: 1048576`

              - `type: "stdio"`

                The type of the object. Always `stdio`.

                - `"stdio"`

              - `args: optional array of string or null`

                Arguments passed to the MCP server command.

                `minItems: 0`, `maxItems: 16384`

              - `env: optional map[string] or null`

                Environment variables set for the MCP server process.

              - `env_vars: optional array of string or null`

                Environment variable names to inherit from the selected execution environment.

                `minItems: 0`, `maxItems: 16384`

          - `type: "mcp"`

            The type of the object. Always `mcp`.

            - `"mcp"`

          - `allowed_tools: optional array of string or null`

            The MCP tools the agent may call. All server tools are allowed when omitted.

            `minItems: 0`, `maxItems: 16384`

          - `connection_origin: optional "service" or "environment" or null`

            Selects where outbound MCP HTTP connections originate. Omitted or `service` uses the Managed Agents service network; `environment` uses the session's selected environment.

            - `"service"`

              Uses the Managed Agents service network.

            - `"environment"`

              Uses the session's execution environment.

          - `credential_id: optional string or null`

            The attached vault credential used to authenticate this MCP server. Optional when exactly one attached credential matches the server URL.

            `minLength: 0`, `maxLength: 1048576`

          - `request_metadata: optional map[unknown] or null`

            Metadata included with requests to this MCP server.

          - `required: optional boolean`

            Whether this MCP server must initialize before the first turn. Defaults to `false`.

        - `WebSearch object { type, allowed_domains, context_size, 2 more }`

          Web search.

          - `type: "web_search"`

            The type of the object. Always `web_search`.

            - `"web_search"`

          - `allowed_domains: optional array of string or null`

            Domains the search may include.

            `minItems: 0`, `maxItems: 16384`

          - `context_size: optional "low" or "medium" or "high" or null`

            The amount of search context made available to the model. Defaults to `medium`.

            - `"low"`

            - `"medium"`

            - `"high"`

          - `location: optional object { city, country, region, timezone }  or null`

            Approximate location used to localize search results.

            - `city: optional string or null`

              The city name.

              `minLength: 0`, `maxLength: 1048576`

            - `country: optional string or null`

              The two-letter ISO country code, such as `US`.

              `minLength: 0`, `maxLength: 1048576`

            - `region: optional string or null`

              The region or state name.

              `minLength: 0`, `maxLength: 1048576`

            - `timezone: optional string or null`

              The IANA timezone, such as `America/Los_Angeles`.

              `minLength: 0`, `maxLength: 1048576`

          - `mode: optional "disabled" or "cached" or "live" or null`

            The source used for web search results. Defaults to `live`.

            - `"disabled"`

              Disables web search.

            - `"cached"`

              Uses cached search results.

            - `"live"`

              Searches the live web.

        - `ComputerUse object { type, include_screenshots }`

          Browser use in an OpenAI-hosted session.

          - `type: "computer_use"`

            The type of the object. Always `computer_use`.

            - `"computer_use"`

          - `include_screenshots: optional boolean`

            Whether computer tool outputs include screenshots. Defaults to `false`.

        - `Automations object { type }`

          Lets the agent manage its own scheduled wakeups.

          - `type: "automations"`

            The type of the object. Always `automations`.

            - `"automations"`

    - `agent_id: optional string`

      A saved agent ID. Provide exactly one of agent and agent_id.

      `minLength: 0`, `maxLength: 64`

    - `metadata: optional map[string] or null`

      Metadata attached to each new session.

    - `vault_ids: optional array of string or null`

      The IDs of vaults made available to each new session.

      `minItems: 0`, `maxItems: 16384`

  - `ExistingSession object { instructions, session_id, type }`

    Deliver instructions to an existing session.

    - `instructions: string`

      Instructions delivered as an automation notification.

      `minLength: 0`, `maxLength: 1048576`

    - `session_id: string`

      The session receiving each invocation.

      `minLength: 0`, `maxLength: 1048576`

    - `type: "existing_session"`

      The type of the object. Always `existing_session`.

      - `"existing_session"`

- `timezone: optional string`

  Only accepted for periodic automations.

  `minLength: 1`, `maxLength: 128`

### Returns

- `Automation = PeriodicAutomation or OneTimeAutomation`

  A saved automation and its schedule.

  - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

      - `Developer object { type }`

        - `type: "developer"`

          The type of the object. Always `developer`.

          - `"developer"`

      - `Agent object { session_id, tool_call_id, type }`

        - `session_id: string`

          The creator session, which is also the automation's target.

          `minLength: 0`

        - `tool_call_id: string`

          The tool call that created the automation.

          `minLength: 0`

        - `type: "agent"`

          The type of the object. Always `agent`.

          - `"agent"`

    - `expression: string`

      The cron expression determining scheduled occurrences.

      `minLength: 0`

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

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

            `minLength: 0`

          - `model: string`

            The requested model name.

            `minLength: 0`

          - `multi_agent: MultiAgentConfig`

            The configuration for creating and coordinating subagents.

            - `enabled: boolean`

              Whether subagent tools are enabled. Defaults to false.

            - `max_concurrent_subagents: number or null`

              Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

              `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

            `minItems: 0`, `maxItems: 2000`

            - `Function object { defer_loading, description, name, 2 more }`

              A function defined by the application.

              - `defer_loading: boolean`

                Whether the function is deferred and discovered through tool search.

              - `description: string`

                A description of what the function does.

                `minLength: 0`

              - `name: string`

                The name of the function.

                `minLength: 0`

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

                `minItems: 0`, `maxItems: 2000`

              - `connection_origin: "service" or "environment"`

                Where outbound MCP HTTP connections originate.

                - `"service"`

                - `"environment"`

              - `credential_id: string or null`

                The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                `minLength: 0`

              - `request_metadata: map[unknown]`

                Metadata included with requests to this MCP server.

              - `required: boolean`

                Whether this MCP server must initialize before the first turn.

              - `server_label: string`

                A label used to identify the MCP server in tool calls.

                `minLength: 0`

              - `transport: McpTransport`

                The transport used to connect to the MCP server.

                - `HTTP object { server_url, type }`

                  Connects to an MCP server over HTTP.

                  - `server_url: string`

                    The URL of the MCP server.

                    `minLength: 0`

                  - `type: "http"`

                    The type of the object. Always `http`.

                    - `"http"`

                - `Stdio object { args, command, cwd, 2 more }`

                  Starts an MCP server as a local process.

                  - `args: array of string`

                    Arguments passed to the MCP server command.

                    `minItems: 0`, `maxItems: 2000`

                  - `command: string`

                    The command used to start the MCP server.

                    `minLength: 0`

                  - `cwd: string`

                    The working directory used to start the MCP server.

                    `minLength: 0`

                  - `env_vars: array of string`

                    Environment variable names inherited from the execution environment.

                    `minItems: 0`, `maxItems: 2000`

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

                `minItems: 0`, `maxItems: 2000`

              - `context_size: "low" or "medium" or "high"`

                The amount of search context made available to the model. Defaults to `medium`.

                - `"low"`

                - `"medium"`

                - `"high"`

              - `location: object { city, country, region, timezone }  or null`

                Approximate location used to localize search results, if provided.

                - `city: string or null`

                  The city name.

                  `minLength: 0`

                - `country: string or null`

                  The two-letter ISO country code, such as `US`.

                  `minLength: 0`

                - `region: string or null`

                  The region or state name.

                  `minLength: 0`

                - `timezone: string or null`

                  The IANA timezone, such as `America/Los_Angeles`.

                  `minLength: 0`

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

          - `compaction: optional object { async }`

            The effective context compaction settings.

            - `async: boolean`

              Whether context is compacted in the background. Defaults to true.

        - `agent_id: string or null`

          The saved agent reference, or null when an inline agent is configured.

          `minLength: 0`

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

              `minItems: 0`, `maxItems: 2000`

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

              `minLength: 0`

            - `environment_template_id: string or null`

              A template reference, or null when no template is selected.

              `minLength: 0`

            - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

              File overrides, excluding contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `FileID object { file_id, path, type }`

                A project-scoped Files API reference resolved separately for each session.

                - `file_id: string`

                  The ID of the uploaded file.

                  `minLength: 0`

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `type: "file_id"`

                  The type of the object. Always `file_id`.

                  - `"file_id"`

              - `Inline object { path, size_bytes, type }`

                Metadata for confidential inline file contents.

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `size_bytes: number`

                  The decoded size of the inline file in bytes.

                  `format: int64`, `minimum: 0`

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

                `minItems: 0`, `maxItems: 2000`

            - `packages: object { npm, python, system }  or null`

              Package overrides, or null to inherit the template or creation default.

              - `npm: array of string`

                npm packages installed globally in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `python: array of string`

                Python packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `system: array of string`

                System packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

            - `plugins: array of HostedPlugin or null`

              Plugin overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `description: string`

                The installed plugin description.

                `minLength: 0`

              - `name: string`

                The installed plugin name.

                `minLength: 0`

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

            - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

              Skill overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `SkillReference object { skill_id, type, version }`

                A skill resolved afresh from the Skills API whenever a session starts.

                - `skill_id: string`

                  The referenced skill ID.

                  `minLength: 0`

                - `type: "skill_reference"`

                  The type of the object. Always `skill_reference`.

                  - `"skill_reference"`

                - `version: string or null`

                  The requested version selector, including `latest`.

                  `minLength: 0`

              - `Inline object { description, name, type }`

                Safe metadata for an inline skill archive.

                - `description: string`

                  The skill description declared in `SKILL.md`.

                  `minLength: 0`

                - `name: string`

                  The skill name declared in `SKILL.md`.

                  `minLength: 0`

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

            - `type: "openai_hosted"`

              The type of the object. Always `openai_hosted`.

              - `"openai_hosted"`

          - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

            - `capability_directories: array of string`

              Directories that expose capabilities to the agent.

              `minItems: 0`, `maxItems: 2000`

            - `environment_id: string or null`

              An existing registration, or null to create a session-owned environment.

              `minLength: 0`

            - `type: "self_hosted"`

              The type of the object. Always `self_hosted`.

              - `"self_hosted"`

            - `workspace_directory: string`

              The absolute project directory in the environment.

              `minLength: 0`

        - `input: array of object { content, role, type }`

          Initial input delivered to each new session.

          `minItems: 0`, `maxItems: 2000`

          - `content: array of InputContent`

            The content of the message.

            `minItems: 0`, `maxItems: 2000`

            - `InputText object { text, type }`

              Text input recorded in a session item.

              - `text: string`

                The text supplied to the agent.

                `minLength: 0`

              - `type: "input_text"`

                The type of the object. Always `input_text`.

                - `"input_text"`

            - `InputImage object { image_url, type }`

              Image input recorded in a session item.

              - `image_url: string`

                The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                `minLength: 0`

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

          `minItems: 0`, `maxItems: 2000`

      - `ExistingSession object { instructions, session_id, type }`

        - `instructions: string`

          Saved instructions delivered as an automation notification.

          `minLength: 0`

        - `session_id: string`

          The session receiving each invocation.

          `minLength: 0`

        - `type: "existing_session"`

          The type of the object. Always `existing_session`.

          - `"existing_session"`

    - `timezone: string`

      The timezone used to interpret the expression.

      `minLength: 0`

    - `type: "periodic"`

      The type of the object. Always `periodic`.

      - `"periodic"`

  - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

    - `object: "agent.automation"`

      Always `agent.automation`.

      - `"agent.automation"`

    - `run_at: number`

      The Unix timestamp, in seconds, of the scheduled occurrence.

      `format: int64`

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
curl https://api.openai.com/v1/agents/automations/$AUTOMATION_ID \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{}'
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
      ],
      "compaction": {
        "async": true
      }
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

## Domain Types

### Automation

- `Automation = PeriodicAutomation or OneTimeAutomation`

  A saved automation and its schedule.

  - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

      - `Developer object { type }`

        - `type: "developer"`

          The type of the object. Always `developer`.

          - `"developer"`

      - `Agent object { session_id, tool_call_id, type }`

        - `session_id: string`

          The creator session, which is also the automation's target.

          `minLength: 0`

        - `tool_call_id: string`

          The tool call that created the automation.

          `minLength: 0`

        - `type: "agent"`

          The type of the object. Always `agent`.

          - `"agent"`

    - `expression: string`

      The cron expression determining scheduled occurrences.

      `minLength: 0`

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

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

            `minLength: 0`

          - `model: string`

            The requested model name.

            `minLength: 0`

          - `multi_agent: MultiAgentConfig`

            The configuration for creating and coordinating subagents.

            - `enabled: boolean`

              Whether subagent tools are enabled. Defaults to false.

            - `max_concurrent_subagents: number or null`

              Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

              `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

            `minItems: 0`, `maxItems: 2000`

            - `Function object { defer_loading, description, name, 2 more }`

              A function defined by the application.

              - `defer_loading: boolean`

                Whether the function is deferred and discovered through tool search.

              - `description: string`

                A description of what the function does.

                `minLength: 0`

              - `name: string`

                The name of the function.

                `minLength: 0`

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

                `minItems: 0`, `maxItems: 2000`

              - `connection_origin: "service" or "environment"`

                Where outbound MCP HTTP connections originate.

                - `"service"`

                - `"environment"`

              - `credential_id: string or null`

                The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                `minLength: 0`

              - `request_metadata: map[unknown]`

                Metadata included with requests to this MCP server.

              - `required: boolean`

                Whether this MCP server must initialize before the first turn.

              - `server_label: string`

                A label used to identify the MCP server in tool calls.

                `minLength: 0`

              - `transport: McpTransport`

                The transport used to connect to the MCP server.

                - `HTTP object { server_url, type }`

                  Connects to an MCP server over HTTP.

                  - `server_url: string`

                    The URL of the MCP server.

                    `minLength: 0`

                  - `type: "http"`

                    The type of the object. Always `http`.

                    - `"http"`

                - `Stdio object { args, command, cwd, 2 more }`

                  Starts an MCP server as a local process.

                  - `args: array of string`

                    Arguments passed to the MCP server command.

                    `minItems: 0`, `maxItems: 2000`

                  - `command: string`

                    The command used to start the MCP server.

                    `minLength: 0`

                  - `cwd: string`

                    The working directory used to start the MCP server.

                    `minLength: 0`

                  - `env_vars: array of string`

                    Environment variable names inherited from the execution environment.

                    `minItems: 0`, `maxItems: 2000`

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

                `minItems: 0`, `maxItems: 2000`

              - `context_size: "low" or "medium" or "high"`

                The amount of search context made available to the model. Defaults to `medium`.

                - `"low"`

                - `"medium"`

                - `"high"`

              - `location: object { city, country, region, timezone }  or null`

                Approximate location used to localize search results, if provided.

                - `city: string or null`

                  The city name.

                  `minLength: 0`

                - `country: string or null`

                  The two-letter ISO country code, such as `US`.

                  `minLength: 0`

                - `region: string or null`

                  The region or state name.

                  `minLength: 0`

                - `timezone: string or null`

                  The IANA timezone, such as `America/Los_Angeles`.

                  `minLength: 0`

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

          - `compaction: optional object { async }`

            The effective context compaction settings.

            - `async: boolean`

              Whether context is compacted in the background. Defaults to true.

        - `agent_id: string or null`

          The saved agent reference, or null when an inline agent is configured.

          `minLength: 0`

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

              `minItems: 0`, `maxItems: 2000`

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

              `minLength: 0`

            - `environment_template_id: string or null`

              A template reference, or null when no template is selected.

              `minLength: 0`

            - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

              File overrides, excluding contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `FileID object { file_id, path, type }`

                A project-scoped Files API reference resolved separately for each session.

                - `file_id: string`

                  The ID of the uploaded file.

                  `minLength: 0`

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `type: "file_id"`

                  The type of the object. Always `file_id`.

                  - `"file_id"`

              - `Inline object { path, size_bytes, type }`

                Metadata for confidential inline file contents.

                - `path: string`

                  The file's absolute path inside the environment.

                  `minLength: 0`

                - `size_bytes: number`

                  The decoded size of the inline file in bytes.

                  `format: int64`, `minimum: 0`

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

                `minItems: 0`, `maxItems: 2000`

            - `packages: object { npm, python, system }  or null`

              Package overrides, or null to inherit the template or creation default.

              - `npm: array of string`

                npm packages installed globally in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `python: array of string`

                Python packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

              - `system: array of string`

                System packages installed in the environment.

                `minItems: 0`, `maxItems: 16384`

            - `plugins: array of HostedPlugin or null`

              Plugin overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `description: string`

                The installed plugin description.

                `minLength: 0`

              - `name: string`

                The installed plugin name.

                `minLength: 0`

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

            - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

              Skill overrides, excluding archive contents, or null to inherit.

              `minItems: 0`, `maxItems: 2000`

              - `SkillReference object { skill_id, type, version }`

                A skill resolved afresh from the Skills API whenever a session starts.

                - `skill_id: string`

                  The referenced skill ID.

                  `minLength: 0`

                - `type: "skill_reference"`

                  The type of the object. Always `skill_reference`.

                  - `"skill_reference"`

                - `version: string or null`

                  The requested version selector, including `latest`.

                  `minLength: 0`

              - `Inline object { description, name, type }`

                Safe metadata for an inline skill archive.

                - `description: string`

                  The skill description declared in `SKILL.md`.

                  `minLength: 0`

                - `name: string`

                  The skill name declared in `SKILL.md`.

                  `minLength: 0`

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

            - `type: "openai_hosted"`

              The type of the object. Always `openai_hosted`.

              - `"openai_hosted"`

          - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

            - `capability_directories: array of string`

              Directories that expose capabilities to the agent.

              `minItems: 0`, `maxItems: 2000`

            - `environment_id: string or null`

              An existing registration, or null to create a session-owned environment.

              `minLength: 0`

            - `type: "self_hosted"`

              The type of the object. Always `self_hosted`.

              - `"self_hosted"`

            - `workspace_directory: string`

              The absolute project directory in the environment.

              `minLength: 0`

        - `input: array of object { content, role, type }`

          Initial input delivered to each new session.

          `minItems: 0`, `maxItems: 2000`

          - `content: array of InputContent`

            The content of the message.

            `minItems: 0`, `maxItems: 2000`

            - `InputText object { text, type }`

              Text input recorded in a session item.

              - `text: string`

                The text supplied to the agent.

                `minLength: 0`

              - `type: "input_text"`

                The type of the object. Always `input_text`.

                - `"input_text"`

            - `InputImage object { image_url, type }`

              Image input recorded in a session item.

              - `image_url: string`

                The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                `minLength: 0`

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

          `minItems: 0`, `maxItems: 2000`

      - `ExistingSession object { instructions, session_id, type }`

        - `instructions: string`

          Saved instructions delivered as an automation notification.

          `minLength: 0`

        - `session_id: string`

          The session receiving each invocation.

          `minLength: 0`

        - `type: "existing_session"`

          The type of the object. Always `existing_session`.

          - `"existing_session"`

    - `timezone: string`

      The timezone used to interpret the expression.

      `minLength: 0`

    - `type: "periodic"`

      The type of the object. Always `periodic`.

      - `"periodic"`

  - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

    Fields shared by periodic and one-time automations.

    - `id: string`

      The automation ID.

      `minLength: 0`

    - `created_at: number`

      The creation time as a Unix timestamp in seconds.

      `format: int64`

    - `created_by: AutomationCreatedBy`

      Service-recorded provenance; callers cannot supply this field.

    - `metadata: map[string]`

      Custom string key-value pairs attached to the automation.

    - `name: string`

      The automation's display name.

      `minLength: 0`

    - `object: "agent.automation"`

      Always `agent.automation`.

      - `"agent.automation"`

    - `run_at: number`

      The Unix timestamp, in seconds, of the scheduled occurrence.

      `format: int64`

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

### Automation Agent Config

- `AutomationAgentConfig object { instructions, model, multi_agent, 5 more }`

  Inline agent configuration without a generated session-local identity.

  - `instructions: string or null`

    Custom instructions, or null when absent.

    `minLength: 0`

  - `model: string`

    The requested model name.

    `minLength: 0`

  - `multi_agent: MultiAgentConfig`

    The configuration for creating and coordinating subagents.

    - `enabled: boolean`

      Whether subagent tools are enabled. Defaults to false.

    - `max_concurrent_subagents: number or null`

      Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

      `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

    `minItems: 0`, `maxItems: 2000`

    - `Function object { defer_loading, description, name, 2 more }`

      A function defined by the application.

      - `defer_loading: boolean`

        Whether the function is deferred and discovered through tool search.

      - `description: string`

        A description of what the function does.

        `minLength: 0`

      - `name: string`

        The name of the function.

        `minLength: 0`

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

        `minItems: 0`, `maxItems: 2000`

      - `connection_origin: "service" or "environment"`

        Where outbound MCP HTTP connections originate.

        - `"service"`

        - `"environment"`

      - `credential_id: string or null`

        The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

        `minLength: 0`

      - `request_metadata: map[unknown]`

        Metadata included with requests to this MCP server.

      - `required: boolean`

        Whether this MCP server must initialize before the first turn.

      - `server_label: string`

        A label used to identify the MCP server in tool calls.

        `minLength: 0`

      - `transport: McpTransport`

        The transport used to connect to the MCP server.

        - `HTTP object { server_url, type }`

          Connects to an MCP server over HTTP.

          - `server_url: string`

            The URL of the MCP server.

            `minLength: 0`

          - `type: "http"`

            The type of the object. Always `http`.

            - `"http"`

        - `Stdio object { args, command, cwd, 2 more }`

          Starts an MCP server as a local process.

          - `args: array of string`

            Arguments passed to the MCP server command.

            `minItems: 0`, `maxItems: 2000`

          - `command: string`

            The command used to start the MCP server.

            `minLength: 0`

          - `cwd: string`

            The working directory used to start the MCP server.

            `minLength: 0`

          - `env_vars: array of string`

            Environment variable names inherited from the execution environment.

            `minItems: 0`, `maxItems: 2000`

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

        `minItems: 0`, `maxItems: 2000`

      - `context_size: "low" or "medium" or "high"`

        The amount of search context made available to the model. Defaults to `medium`.

        - `"low"`

        - `"medium"`

        - `"high"`

      - `location: object { city, country, region, timezone }  or null`

        Approximate location used to localize search results, if provided.

        - `city: string or null`

          The city name.

          `minLength: 0`

        - `country: string or null`

          The two-letter ISO country code, such as `US`.

          `minLength: 0`

        - `region: string or null`

          The region or state name.

          `minLength: 0`

        - `timezone: string or null`

          The IANA timezone, such as `America/Los_Angeles`.

          `minLength: 0`

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

  - `compaction: optional object { async }`

    The effective context compaction settings.

    - `async: boolean`

      Whether context is compacted in the background. Defaults to true.

### Automation Created By

- `AutomationCreatedBy = Developer { type }  or Agent { session_id, tool_call_id, type }`

  How the automation was created, independently of how an invocation started.

  - `Developer object { type }`

    - `type: "developer"`

      The type of the object. Always `developer`.

      - `"developer"`

  - `Agent object { session_id, tool_call_id, type }`

    - `session_id: string`

      The creator session, which is also the automation's target.

      `minLength: 0`

    - `tool_call_id: string`

      The tool call that created the automation.

      `minLength: 0`

    - `type: "agent"`

      The type of the object. Always `agent`.

      - `"agent"`

### Automation Deleted

- `AutomationDeleted object { id, deleted, object }`

  - `id: string`

    The deleted automation ID.

    `minLength: 0`

  - `deleted: boolean`

    Always true.

  - `object: "agent.automation.deleted"`

    Always `agent.automation.deleted`.

    - `"agent.automation.deleted"`

### Automation Environment

- `AutomationEnvironment = None { type }  or OpenAIHosted { capability_directories, container_size, desktop, 8 more }  or SelfHosted { capability_directories, environment_id, type, workspace_directory }`

  Environment selection saved before an invocation creates its session.

  - `None object { type }`

    - `type: "none"`

      The type of the object. Always `none`.

      - `"none"`

  - `OpenAIHosted object { capability_directories, container_size, desktop, 8 more }`

    Hosted environment selection with confidential setup commands and variables omitted.

    - `capability_directories: array of string or null`

      Directory overrides, or null to inherit the template or creation default.

      `minItems: 0`, `maxItems: 2000`

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

      `minLength: 0`

    - `environment_template_id: string or null`

      A template reference, or null when no template is selected.

      `minLength: 0`

    - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

      File overrides, excluding contents, or null to inherit.

      `minItems: 0`, `maxItems: 2000`

      - `FileID object { file_id, path, type }`

        A project-scoped Files API reference resolved separately for each session.

        - `file_id: string`

          The ID of the uploaded file.

          `minLength: 0`

        - `path: string`

          The file's absolute path inside the environment.

          `minLength: 0`

        - `type: "file_id"`

          The type of the object. Always `file_id`.

          - `"file_id"`

      - `Inline object { path, size_bytes, type }`

        Metadata for confidential inline file contents.

        - `path: string`

          The file's absolute path inside the environment.

          `minLength: 0`

        - `size_bytes: number`

          The decoded size of the inline file in bytes.

          `format: int64`, `minimum: 0`

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

        `minItems: 0`, `maxItems: 2000`

    - `packages: object { npm, python, system }  or null`

      Package overrides, or null to inherit the template or creation default.

      - `npm: array of string`

        npm packages installed globally in the environment.

        `minItems: 0`, `maxItems: 16384`

      - `python: array of string`

        Python packages installed in the environment.

        `minItems: 0`, `maxItems: 16384`

      - `system: array of string`

        System packages installed in the environment.

        `minItems: 0`, `maxItems: 16384`

    - `plugins: array of HostedPlugin or null`

      Plugin overrides, excluding archive contents, or null to inherit.

      `minItems: 0`, `maxItems: 2000`

      - `description: string`

        The installed plugin description.

        `minLength: 0`

      - `name: string`

        The installed plugin name.

        `minLength: 0`

      - `type: "inline"`

        The type of the object. Always `inline`.

        - `"inline"`

    - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

      Skill overrides, excluding archive contents, or null to inherit.

      `minItems: 0`, `maxItems: 2000`

      - `SkillReference object { skill_id, type, version }`

        A skill resolved afresh from the Skills API whenever a session starts.

        - `skill_id: string`

          The referenced skill ID.

          `minLength: 0`

        - `type: "skill_reference"`

          The type of the object. Always `skill_reference`.

          - `"skill_reference"`

        - `version: string or null`

          The requested version selector, including `latest`.

          `minLength: 0`

      - `Inline object { description, name, type }`

        Safe metadata for an inline skill archive.

        - `description: string`

          The skill description declared in `SKILL.md`.

          `minLength: 0`

        - `name: string`

          The skill name declared in `SKILL.md`.

          `minLength: 0`

        - `type: "inline"`

          The type of the object. Always `inline`.

          - `"inline"`

    - `type: "openai_hosted"`

      The type of the object. Always `openai_hosted`.

      - `"openai_hosted"`

  - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

    - `capability_directories: array of string`

      Directories that expose capabilities to the agent.

      `minItems: 0`, `maxItems: 2000`

    - `environment_id: string or null`

      An existing registration, or null to create a session-owned environment.

      `minLength: 0`

    - `type: "self_hosted"`

      The type of the object. Always `self_hosted`.

      - `"self_hosted"`

    - `workspace_directory: string`

      The absolute project directory in the environment.

      `minLength: 0`

### Automation Schedule Param

- `AutomationScheduleParam = Periodic { expression, name, target, 3 more }  or Once { name, run_at, target, 2 more }`

  Creates an automation without invoking it immediately.

  - `Periodic object { expression, name, target, 3 more }`

    - `expression: string`

      A standard five-field cron expression defining scheduled occurrences.

      `minLength: 1`, `maxLength: 256`

    - `name: string`

      A human-readable name for the automation.

      `minLength: 1`, `maxLength: 256`

    - `target: AutomationTargetParam`

      The session an automation invocation targets.

      - `NewSession object { environment, input, type, 4 more }`

        Create a session for each invocation.

        - `environment: EnvironmentParam`

          The execution environment for each new session.

          - `None object { type }`

            Runs the agent without an execution environment.

            - `type: "none"`

              The type of the object. Always `none`.

              - `"none"`

          - `OpenAIHosted object { type, capability_directories, container_size, 10 more }`

            An existing OpenAI-hosted environment or new inline/template-based hosted configuration.

            - `type: "openai_hosted"`

              The type of the object. Always `openai_hosted`.

              - `"openai_hosted"`

            - `capability_directories: optional array of string or null`

              Directories that contain capabilities exposed to the agent. Defaults to an empty list.

              `minItems: 0`, `maxItems: 16384`

            - `container_size: optional "small" or "medium" or "large"`

              The hosted container size. Omission selects the medium tier.

              - `"small"`

              - `"medium"`

              - `"large"`

            - `desktop: optional object { enabled }  or null`

              Desktop provisioning. Omission or null inherits the template setting, or defaults to disabled.

              - `enabled: boolean`

                Whether to provision the desktop and its browser proxy.

            - `env: optional map[string] or null`

              Environment variables made available to the agent.

            - `environment_id: optional string`

              An existing prewarmed environment. Cannot be combined with a template or inline configuration.

              `minLength: 9`, `maxLength: 256`

            - `environment_template_id: optional string`

              A reusable hosted template applied before inline session configuration. Omitted fields inherit the template; network overrides cannot broaden its policy.

              `minLength: 0`, `maxLength: 64`

            - `files: optional array of HostedEnvironmentFileParam or null`

              Files available before the agent starts. Defaults to an empty list.

              `minItems: 0`, `maxItems: 50`

              - `FileID object { file_id, path, type }`

                A file previously uploaded through the OpenAI Files API.

                - `file_id: string`

                  The ID of the uploaded file.

                  `minLength: 1`, `maxLength: 256`

                - `path: string`

                  The absolute destination path inside `/workspace`.

                  `minLength: 1`, `maxLength: 4096`

                - `type: "file_id"`

                  The type of the object. Always `file_id`.

                  - `"file_id"`

              - `Inline object { data, path, type }`

                A file supplied directly as standard-base64 data.

                - `data: string`

                  The standard-base64-encoded file contents.

                  `minLength: 0`, `maxLength: 6990508`

                - `path: string`

                  The absolute destination path inside `/workspace`.

                  `minLength: 1`, `maxLength: 4096`

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

            - `network: optional object { access, allowed_domains, blocked_domains }  or null`

              Network access policy for the environment. If omitted, the API version determines whether network access is enabled or disabled.

              - `access: "enabled" or "disabled" or "restricted"`

                The environment's network access mode.

                - `"enabled"`

                  Allows unrestricted network access.

                - `"disabled"`

                  Disables network access.

                - `"restricted"`

                  Applies the configured domain restrictions.

              - `allowed_domains: optional array of string or null`

                Domains the environment may access when network access is restricted.

                `minItems: 0`, `maxItems: 16384`

              - `blocked_domains: optional array of string or null`

                Domains blocked for both executor and browser when access is restricted. A nonempty list requires `access: restricted` and cannot be combined with nonempty `allowed_domains`. Wildcard domains are not supported.

                `minItems: 0`, `maxItems: 100`

            - `packages: optional object { npm, python, system }  or null`

              Packages to install in the environment. Defaults to empty package lists.

              - `npm: optional array of string or null`

                npm packages to install globally. Defaults to an empty list.

                `minItems: 0`, `maxItems: 16384`

              - `python: optional array of string or null`

                Python packages to install. Defaults to an empty list.

                `minItems: 0`, `maxItems: 16384`

              - `system: optional array of string or null`

                System packages to install. Defaults to an empty list.

                `minItems: 0`, `maxItems: 16384`

            - `plugins: optional array of HostedPluginParam or null`

              Plugins provided as inline ZIP archives. Defaults to an empty list.

              `minItems: 0`, `maxItems: 32`

              - `description: string`

                The plugin description declared in `.codex-plugin/plugin.json`.

                `minLength: 0`, `maxLength: 1048576`

              - `name: string`

                The plugin name declared in `.codex-plugin/plugin.json`.

                `minLength: 1`, `maxLength: 64`

              - `source: InlineCapabilitySourceParam`

                Provides ZIP bytes encoded with standard base64.

                - `data: string`

                  Standard-base64 encoded ZIP archive bytes.

                  `minLength: 1`, `maxLength: 70254592`

                - `media_type: "application/zip"`

                  The archive media type, always `application/zip`.

                  - `"application/zip"`

                    A ZIP archive.

                - `type: "base64"`

                  The type of the object. Always `base64`.

                  - `"base64"`

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

            - `setup_commands: optional array of SetupCommandParam or null`

              Ordered, confidential setup commands. Command bodies are never returned.

              `minItems: 0`, `maxItems: 16`

              - `command: string`

                The shell command to execute.

                `minLength: 0`, `maxLength: 65536`

              - `cwd: optional string or null`

                The absolute working directory. Defaults to `/workspace`.

                `minLength: 0`, `maxLength: 4096`

            - `skills: optional array of HostedSkillParam or null`

              Skills referenced by ID or provided as inline ZIP archives. Defaults to an empty list.

              `minItems: 0`, `maxItems: 200`

              - `SkillReference object { skill_id, type, version }`

                References a skill uploaded through the Skills API.

                - `skill_id: string`

                  The ID of the skill created through `/v1/skills`.

                  `minLength: 1`, `maxLength: 64`

                - `type: "skill_reference"`

                  The type of the object. Always `skill_reference`.

                  - `"skill_reference"`

                - `version: optional string or null`

                  The skill version, a positive integer or `latest`; omission selects the default.

                  `minLength: 0`, `maxLength: 1048576`

              - `Inline object { description, name, source, type }`

                Supplies a skill ZIP directly in the session request.

                - `description: string`

                  The skill description declared in `SKILL.md`.

                  `minLength: 0`, `maxLength: 1048576`

                - `name: string`

                  The skill name declared in `SKILL.md`.

                  `minLength: 1`, `maxLength: 64`

                - `source: InlineCapabilitySourceParam`

                  Provides ZIP bytes encoded with standard base64.

                - `type: "inline"`

                  The type of the object. Always `inline`.

                  - `"inline"`

          - `SelfHosted object { type, workspace_directory, capability_directories }`

            An application-hosted environment configured inline.

            - `type: "self_hosted"`

              The type of the object. Always `self_hosted`.

              - `"self_hosted"`

            - `workspace_directory: string`

              Absolute project directory inside the self-hosted environment.

              `minLength: 0`, `maxLength: 1048576`

            - `capability_directories: optional array of string or null`

              Directories that contain capabilities exposed to the agent. Defaults to an empty list.

              `minItems: 0`, `maxItems: 16384`

        - `input: array of AgentSessionInputMessageParam`

          Initial user messages submitted with each new session.

          `minItems: 0`, `maxItems: 16384`

          - `content: array of InputContentParam`

            The content of the message.

            `minItems: 0`, `maxItems: 16384`

            - `InputText object { text, type }`

              Text input to the model.

              - `text: string`

                The text sent to the model.

                `minLength: 0`, `maxLength: 1048576`

              - `type: "input_text"`

                The type of the object. Always `input_text`.

                - `"input_text"`

            - `InputImage object { image_url, type }`

              Image input to the model.

              - `image_url: string`

                The URL of the image sent to the model.

                `minLength: 0`, `maxLength: 1048576`

              - `type: "input_image"`

                The type of the object. Always `input_image`.

                - `"input_image"`

          - `role: "user"`

            The role of the message author. Always `user`.

            - `"user"`

          - `type: optional "message"`

            The type of the input item. Always `message`.

            - `"message"`

        - `type: "new_session"`

          The type of the object. Always `new_session`.

          - `"new_session"`

        - `agent: optional object { compaction, instructions, model, 5 more }`

          Inline agent configuration. Provide exactly one of agent and agent_id.

          - `compaction: optional object { async }  or null`

            Context compaction settings. Omit to keep the current settings. A supplied object replaces the settings; null or an empty object enables background compaction.

            - `async: optional boolean or null`

              Whether to compact context in the background. Omission or null defaults to true. Set to false to use blocking compaction. Background compaction may increase token usage.

          - `instructions: optional string or null`

            Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.

            `minLength: 0`, `maxLength: 1048576`

          - `model: optional string`

            The model to use for the agent. The requested model name is preserved.

            `minLength: 0`, `maxLength: 1048576`

          - `multi_agent: optional MultiAgentConfigParam or null`

            Configuration for creating and coordinating subagents.

            - `enabled: boolean`

              Whether subagent tools are enabled.

            - `max_concurrent_subagents: optional number`

              Maximum number of subagents that may run concurrently. Defaults to 6.

              `format: int64`, `minimum: 1`, `maximum: 4294967295`

          - `reasoning: optional AgentReasoningParam or null`

            Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.

            - `effort: optional "none" or "minimal" or "low" or 4 more or null`

              The amount of reasoning effort the model should use. Omission lets the model select it.

              - `"none"`

              - `"minimal"`

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"xhigh"`

              - `"max"`

            - `summary: optional "concise" or "detailed" or "auto" or null`

              Controls whether the response includes a reasoning summary.

              - `"concise"`

                Returns a concise reasoning summary when supported.

              - `"detailed"`

                Returns a detailed reasoning summary when supported.

              - `"auto"`

                Automatically selects the most detailed summary supported by the model.

          - `service_tier: optional "auto" or "default" or "flex" or 3 more or null`

            The service tier used for model requests.

            - `"auto"`

              Selects the service tier automatically.

            - `"default"`

              Uses the default service tier.

            - `"flex"`

              Uses the flex service tier.

            - `"priority"`

              Uses the priority service tier.

            - `"fast"`

              Uses the fast service tier.

            - `"ultrafast"`

              Uses the ultrafast service tier.

          - `text: optional AgentTextParam or null`

            Configuration for text generated by the agent.

            - `format: optional TextFormatParam or null`

              The output format. Omission uses ordinary text (`{"type": "text"}`).

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

            - `verbosity: optional "low" or "medium" or "high" or null`

              The amount of text the model should produce. Defaults to `medium`, matching Responses.

              - `"low"`

                Produces less text.

              - `"medium"`

                Uses the default amount of text.

              - `"high"`

                Produces more text.

          - `tools: optional array of AgentToolParam or null`

            Tools available to the agent. Omit to inherit, or pass null to clear them. The resolved tool list must fit within 3 MiB (3,145,728 bytes) of compact UTF-8 JSON.

            `minItems: 0`, `maxItems: 16384`

            - `Function object { description, name, parameters, 2 more }`

              A function defined by the application.

              - `description: string`

                A description of what the function does.

                `minLength: 0`, `maxLength: 1048576`

              - `name: string`

                The name of the function.

                `minLength: 0`, `maxLength: 1048576`

              - `parameters: map[unknown]`

                A JSON Schema object describing the function's arguments.

              - `type: "function"`

                The type of the object. Always `function`.

                - `"function"`

              - `defer_loading: optional boolean`

                Whether this function is deferred and discovered through tool search. Defaults to `false`.

            - `ToolSearch object { type }`

              Discovers deferred function tools and loads them into the model context.

              - `type: "tool_search"`

                The type of the object. Always `tool_search`.

                - `"tool_search"`

            - `ProgrammaticToolCalling object { type, enabled }`

              Enables calling tools from model-generated code.

              - `type: "programmatic_tool_calling"`

                The type of the object. Always `programmatic_tool_calling`.

                - `"programmatic_tool_calling"`

              - `enabled: optional boolean`

                Whether tools can be called from model-generated code. Defaults to `true`.

            - `Mcp object { server_label, transport, type, 5 more }`

              Tools provided by a remote MCP server.

              - `server_label: string`

                A label used to identify the MCP server in tool calls.

                `minLength: 0`, `maxLength: 1048576`

              - `transport: McpTransportParam`

                The transport used to connect to the MCP server.

                - `HTTP object { server_url, type, authorization, headers }`

                  Connects to an MCP server over HTTP.

                  - `server_url: string`

                    The URL of the MCP server.

                    `minLength: 0`, `maxLength: 1048576`

                  - `type: "http"`

                    The type of the object. Always `http`.

                    - `"http"`

                  - `authorization: optional string or null`

                    The authorization value sent to the MCP server, if any.

                    `minLength: 0`, `maxLength: 1048576`

                  - `headers: optional map[string] or null`

                    Additional HTTP headers sent to the MCP server.

                - `Stdio object { command, cwd, type, 3 more }`

                  Starts an MCP server as a local process.

                  - `command: string`

                    The command used to start the MCP server.

                    `minLength: 0`, `maxLength: 1048576`

                  - `cwd: string`

                    The working directory used to start the MCP server.

                    `minLength: 0`, `maxLength: 1048576`

                  - `type: "stdio"`

                    The type of the object. Always `stdio`.

                    - `"stdio"`

                  - `args: optional array of string or null`

                    Arguments passed to the MCP server command.

                    `minItems: 0`, `maxItems: 16384`

                  - `env: optional map[string] or null`

                    Environment variables set for the MCP server process.

                  - `env_vars: optional array of string or null`

                    Environment variable names to inherit from the selected execution environment.

                    `minItems: 0`, `maxItems: 16384`

              - `type: "mcp"`

                The type of the object. Always `mcp`.

                - `"mcp"`

              - `allowed_tools: optional array of string or null`

                The MCP tools the agent may call. All server tools are allowed when omitted.

                `minItems: 0`, `maxItems: 16384`

              - `connection_origin: optional "service" or "environment" or null`

                Selects where outbound MCP HTTP connections originate. Omitted or `service` uses the Managed Agents service network; `environment` uses the session's selected environment.

                - `"service"`

                  Uses the Managed Agents service network.

                - `"environment"`

                  Uses the session's execution environment.

              - `credential_id: optional string or null`

                The attached vault credential used to authenticate this MCP server. Optional when exactly one attached credential matches the server URL.

                `minLength: 0`, `maxLength: 1048576`

              - `request_metadata: optional map[unknown] or null`

                Metadata included with requests to this MCP server.

              - `required: optional boolean`

                Whether this MCP server must initialize before the first turn. Defaults to `false`.

            - `WebSearch object { type, allowed_domains, context_size, 2 more }`

              Web search.

              - `type: "web_search"`

                The type of the object. Always `web_search`.

                - `"web_search"`

              - `allowed_domains: optional array of string or null`

                Domains the search may include.

                `minItems: 0`, `maxItems: 16384`

              - `context_size: optional "low" or "medium" or "high" or null`

                The amount of search context made available to the model. Defaults to `medium`.

                - `"low"`

                - `"medium"`

                - `"high"`

              - `location: optional object { city, country, region, timezone }  or null`

                Approximate location used to localize search results.

                - `city: optional string or null`

                  The city name.

                  `minLength: 0`, `maxLength: 1048576`

                - `country: optional string or null`

                  The two-letter ISO country code, such as `US`.

                  `minLength: 0`, `maxLength: 1048576`

                - `region: optional string or null`

                  The region or state name.

                  `minLength: 0`, `maxLength: 1048576`

                - `timezone: optional string or null`

                  The IANA timezone, such as `America/Los_Angeles`.

                  `minLength: 0`, `maxLength: 1048576`

              - `mode: optional "disabled" or "cached" or "live" or null`

                The source used for web search results. Defaults to `live`.

                - `"disabled"`

                  Disables web search.

                - `"cached"`

                  Uses cached search results.

                - `"live"`

                  Searches the live web.

            - `ComputerUse object { type, include_screenshots }`

              Browser use in an OpenAI-hosted session.

              - `type: "computer_use"`

                The type of the object. Always `computer_use`.

                - `"computer_use"`

              - `include_screenshots: optional boolean`

                Whether computer tool outputs include screenshots. Defaults to `false`.

            - `Automations object { type }`

              Lets the agent manage its own scheduled wakeups.

              - `type: "automations"`

                The type of the object. Always `automations`.

                - `"automations"`

        - `agent_id: optional string`

          A saved agent ID. Provide exactly one of agent and agent_id.

          `minLength: 0`, `maxLength: 64`

        - `metadata: optional map[string] or null`

          Metadata attached to each new session.

        - `vault_ids: optional array of string or null`

          The IDs of vaults made available to each new session.

          `minItems: 0`, `maxItems: 16384`

      - `ExistingSession object { instructions, session_id, type }`

        Deliver instructions to an existing session.

        - `instructions: string`

          Instructions delivered as an automation notification.

          `minLength: 0`, `maxLength: 1048576`

        - `session_id: string`

          The session receiving each invocation.

          `minLength: 0`, `maxLength: 1048576`

        - `type: "existing_session"`

          The type of the object. Always `existing_session`.

          - `"existing_session"`

    - `timezone: string`

      The IANA timezone used to interpret the cron expression.

      `minLength: 1`, `maxLength: 128`

    - `type: "periodic"`

      The type of the object. Always `periodic`.

      - `"periodic"`

    - `metadata: optional map[string]`

  - `Once object { name, run_at, target, 2 more }`

    - `name: string`

      A human-readable name for the automation.

      `minLength: 1`, `maxLength: 256`

    - `run_at: number`

      A future Unix timestamp in seconds.

      `format: int64`

    - `target: AutomationTargetParam`

      The session an automation invocation targets.

    - `type: "once"`

      The type of the object. Always `once`.

      - `"once"`

    - `metadata: optional map[string]`

### Automation Target

- `AutomationTarget = NewSession { agent, agent_id, environment, 4 more }  or ExistingSession { instructions, session_id, type }`

  Saved target configuration, excluding confidential request-only values.

  - `NewSession object { agent, agent_id, environment, 4 more }`

    - `agent: AutomationAgentConfig or null`

      The inline agent configuration, or null when agent_id is configured.

      - `instructions: string or null`

        Custom instructions, or null when absent.

        `minLength: 0`

      - `model: string`

        The requested model name.

        `minLength: 0`

      - `multi_agent: MultiAgentConfig`

        The configuration for creating and coordinating subagents.

        - `enabled: boolean`

          Whether subagent tools are enabled. Defaults to false.

        - `max_concurrent_subagents: number or null`

          Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

          `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

        `minItems: 0`, `maxItems: 2000`

        - `Function object { defer_loading, description, name, 2 more }`

          A function defined by the application.

          - `defer_loading: boolean`

            Whether the function is deferred and discovered through tool search.

          - `description: string`

            A description of what the function does.

            `minLength: 0`

          - `name: string`

            The name of the function.

            `minLength: 0`

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

            `minItems: 0`, `maxItems: 2000`

          - `connection_origin: "service" or "environment"`

            Where outbound MCP HTTP connections originate.

            - `"service"`

            - `"environment"`

          - `credential_id: string or null`

            The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

            `minLength: 0`

          - `request_metadata: map[unknown]`

            Metadata included with requests to this MCP server.

          - `required: boolean`

            Whether this MCP server must initialize before the first turn.

          - `server_label: string`

            A label used to identify the MCP server in tool calls.

            `minLength: 0`

          - `transport: McpTransport`

            The transport used to connect to the MCP server.

            - `HTTP object { server_url, type }`

              Connects to an MCP server over HTTP.

              - `server_url: string`

                The URL of the MCP server.

                `minLength: 0`

              - `type: "http"`

                The type of the object. Always `http`.

                - `"http"`

            - `Stdio object { args, command, cwd, 2 more }`

              Starts an MCP server as a local process.

              - `args: array of string`

                Arguments passed to the MCP server command.

                `minItems: 0`, `maxItems: 2000`

              - `command: string`

                The command used to start the MCP server.

                `minLength: 0`

              - `cwd: string`

                The working directory used to start the MCP server.

                `minLength: 0`

              - `env_vars: array of string`

                Environment variable names inherited from the execution environment.

                `minItems: 0`, `maxItems: 2000`

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

            `minItems: 0`, `maxItems: 2000`

          - `context_size: "low" or "medium" or "high"`

            The amount of search context made available to the model. Defaults to `medium`.

            - `"low"`

            - `"medium"`

            - `"high"`

          - `location: object { city, country, region, timezone }  or null`

            Approximate location used to localize search results, if provided.

            - `city: string or null`

              The city name.

              `minLength: 0`

            - `country: string or null`

              The two-letter ISO country code, such as `US`.

              `minLength: 0`

            - `region: string or null`

              The region or state name.

              `minLength: 0`

            - `timezone: string or null`

              The IANA timezone, such as `America/Los_Angeles`.

              `minLength: 0`

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

      - `compaction: optional object { async }`

        The effective context compaction settings.

        - `async: boolean`

          Whether context is compacted in the background. Defaults to true.

    - `agent_id: string or null`

      The saved agent reference, or null when an inline agent is configured.

      `minLength: 0`

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

          `minItems: 0`, `maxItems: 2000`

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

          `minLength: 0`

        - `environment_template_id: string or null`

          A template reference, or null when no template is selected.

          `minLength: 0`

        - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

          File overrides, excluding contents, or null to inherit.

          `minItems: 0`, `maxItems: 2000`

          - `FileID object { file_id, path, type }`

            A project-scoped Files API reference resolved separately for each session.

            - `file_id: string`

              The ID of the uploaded file.

              `minLength: 0`

            - `path: string`

              The file's absolute path inside the environment.

              `minLength: 0`

            - `type: "file_id"`

              The type of the object. Always `file_id`.

              - `"file_id"`

          - `Inline object { path, size_bytes, type }`

            Metadata for confidential inline file contents.

            - `path: string`

              The file's absolute path inside the environment.

              `minLength: 0`

            - `size_bytes: number`

              The decoded size of the inline file in bytes.

              `format: int64`, `minimum: 0`

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

            `minItems: 0`, `maxItems: 2000`

        - `packages: object { npm, python, system }  or null`

          Package overrides, or null to inherit the template or creation default.

          - `npm: array of string`

            npm packages installed globally in the environment.

            `minItems: 0`, `maxItems: 16384`

          - `python: array of string`

            Python packages installed in the environment.

            `minItems: 0`, `maxItems: 16384`

          - `system: array of string`

            System packages installed in the environment.

            `minItems: 0`, `maxItems: 16384`

        - `plugins: array of HostedPlugin or null`

          Plugin overrides, excluding archive contents, or null to inherit.

          `minItems: 0`, `maxItems: 2000`

          - `description: string`

            The installed plugin description.

            `minLength: 0`

          - `name: string`

            The installed plugin name.

            `minLength: 0`

          - `type: "inline"`

            The type of the object. Always `inline`.

            - `"inline"`

        - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

          Skill overrides, excluding archive contents, or null to inherit.

          `minItems: 0`, `maxItems: 2000`

          - `SkillReference object { skill_id, type, version }`

            A skill resolved afresh from the Skills API whenever a session starts.

            - `skill_id: string`

              The referenced skill ID.

              `minLength: 0`

            - `type: "skill_reference"`

              The type of the object. Always `skill_reference`.

              - `"skill_reference"`

            - `version: string or null`

              The requested version selector, including `latest`.

              `minLength: 0`

          - `Inline object { description, name, type }`

            Safe metadata for an inline skill archive.

            - `description: string`

              The skill description declared in `SKILL.md`.

              `minLength: 0`

            - `name: string`

              The skill name declared in `SKILL.md`.

              `minLength: 0`

            - `type: "inline"`

              The type of the object. Always `inline`.

              - `"inline"`

        - `type: "openai_hosted"`

          The type of the object. Always `openai_hosted`.

          - `"openai_hosted"`

      - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

        - `capability_directories: array of string`

          Directories that expose capabilities to the agent.

          `minItems: 0`, `maxItems: 2000`

        - `environment_id: string or null`

          An existing registration, or null to create a session-owned environment.

          `minLength: 0`

        - `type: "self_hosted"`

          The type of the object. Always `self_hosted`.

          - `"self_hosted"`

        - `workspace_directory: string`

          The absolute project directory in the environment.

          `minLength: 0`

    - `input: array of object { content, role, type }`

      Initial input delivered to each new session.

      `minItems: 0`, `maxItems: 2000`

      - `content: array of InputContent`

        The content of the message.

        `minItems: 0`, `maxItems: 2000`

        - `InputText object { text, type }`

          Text input recorded in a session item.

          - `text: string`

            The text supplied to the agent.

            `minLength: 0`

          - `type: "input_text"`

            The type of the object. Always `input_text`.

            - `"input_text"`

        - `InputImage object { image_url, type }`

          Image input recorded in a session item.

          - `image_url: string`

            The URL of the image supplied to the agent, which may be a base64-encoded data URL.

            `minLength: 0`

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

      `minItems: 0`, `maxItems: 2000`

  - `ExistingSession object { instructions, session_id, type }`

    - `instructions: string`

      Saved instructions delivered as an automation notification.

      `minLength: 0`

    - `session_id: string`

      The session receiving each invocation.

      `minLength: 0`

    - `type: "existing_session"`

      The type of the object. Always `existing_session`.

      - `"existing_session"`

### Automation Target Param

- `AutomationTargetParam = NewSession { environment, input, type, 4 more }  or ExistingSession { instructions, session_id, type }`

  The session an automation invocation targets.

  - `NewSession object { environment, input, type, 4 more }`

    Create a session for each invocation.

    - `environment: EnvironmentParam`

      The execution environment for each new session.

      - `None object { type }`

        Runs the agent without an execution environment.

        - `type: "none"`

          The type of the object. Always `none`.

          - `"none"`

      - `OpenAIHosted object { type, capability_directories, container_size, 10 more }`

        An existing OpenAI-hosted environment or new inline/template-based hosted configuration.

        - `type: "openai_hosted"`

          The type of the object. Always `openai_hosted`.

          - `"openai_hosted"`

        - `capability_directories: optional array of string or null`

          Directories that contain capabilities exposed to the agent. Defaults to an empty list.

          `minItems: 0`, `maxItems: 16384`

        - `container_size: optional "small" or "medium" or "large"`

          The hosted container size. Omission selects the medium tier.

          - `"small"`

          - `"medium"`

          - `"large"`

        - `desktop: optional object { enabled }  or null`

          Desktop provisioning. Omission or null inherits the template setting, or defaults to disabled.

          - `enabled: boolean`

            Whether to provision the desktop and its browser proxy.

        - `env: optional map[string] or null`

          Environment variables made available to the agent.

        - `environment_id: optional string`

          An existing prewarmed environment. Cannot be combined with a template or inline configuration.

          `minLength: 9`, `maxLength: 256`

        - `environment_template_id: optional string`

          A reusable hosted template applied before inline session configuration. Omitted fields inherit the template; network overrides cannot broaden its policy.

          `minLength: 0`, `maxLength: 64`

        - `files: optional array of HostedEnvironmentFileParam or null`

          Files available before the agent starts. Defaults to an empty list.

          `minItems: 0`, `maxItems: 50`

          - `FileID object { file_id, path, type }`

            A file previously uploaded through the OpenAI Files API.

            - `file_id: string`

              The ID of the uploaded file.

              `minLength: 1`, `maxLength: 256`

            - `path: string`

              The absolute destination path inside `/workspace`.

              `minLength: 1`, `maxLength: 4096`

            - `type: "file_id"`

              The type of the object. Always `file_id`.

              - `"file_id"`

          - `Inline object { data, path, type }`

            A file supplied directly as standard-base64 data.

            - `data: string`

              The standard-base64-encoded file contents.

              `minLength: 0`, `maxLength: 6990508`

            - `path: string`

              The absolute destination path inside `/workspace`.

              `minLength: 1`, `maxLength: 4096`

            - `type: "inline"`

              The type of the object. Always `inline`.

              - `"inline"`

        - `network: optional object { access, allowed_domains, blocked_domains }  or null`

          Network access policy for the environment. If omitted, the API version determines whether network access is enabled or disabled.

          - `access: "enabled" or "disabled" or "restricted"`

            The environment's network access mode.

            - `"enabled"`

              Allows unrestricted network access.

            - `"disabled"`

              Disables network access.

            - `"restricted"`

              Applies the configured domain restrictions.

          - `allowed_domains: optional array of string or null`

            Domains the environment may access when network access is restricted.

            `minItems: 0`, `maxItems: 16384`

          - `blocked_domains: optional array of string or null`

            Domains blocked for both executor and browser when access is restricted. A nonempty list requires `access: restricted` and cannot be combined with nonempty `allowed_domains`. Wildcard domains are not supported.

            `minItems: 0`, `maxItems: 100`

        - `packages: optional object { npm, python, system }  or null`

          Packages to install in the environment. Defaults to empty package lists.

          - `npm: optional array of string or null`

            npm packages to install globally. Defaults to an empty list.

            `minItems: 0`, `maxItems: 16384`

          - `python: optional array of string or null`

            Python packages to install. Defaults to an empty list.

            `minItems: 0`, `maxItems: 16384`

          - `system: optional array of string or null`

            System packages to install. Defaults to an empty list.

            `minItems: 0`, `maxItems: 16384`

        - `plugins: optional array of HostedPluginParam or null`

          Plugins provided as inline ZIP archives. Defaults to an empty list.

          `minItems: 0`, `maxItems: 32`

          - `description: string`

            The plugin description declared in `.codex-plugin/plugin.json`.

            `minLength: 0`, `maxLength: 1048576`

          - `name: string`

            The plugin name declared in `.codex-plugin/plugin.json`.

            `minLength: 1`, `maxLength: 64`

          - `source: InlineCapabilitySourceParam`

            Provides ZIP bytes encoded with standard base64.

            - `data: string`

              Standard-base64 encoded ZIP archive bytes.

              `minLength: 1`, `maxLength: 70254592`

            - `media_type: "application/zip"`

              The archive media type, always `application/zip`.

              - `"application/zip"`

                A ZIP archive.

            - `type: "base64"`

              The type of the object. Always `base64`.

              - `"base64"`

          - `type: "inline"`

            The type of the object. Always `inline`.

            - `"inline"`

        - `setup_commands: optional array of SetupCommandParam or null`

          Ordered, confidential setup commands. Command bodies are never returned.

          `minItems: 0`, `maxItems: 16`

          - `command: string`

            The shell command to execute.

            `minLength: 0`, `maxLength: 65536`

          - `cwd: optional string or null`

            The absolute working directory. Defaults to `/workspace`.

            `minLength: 0`, `maxLength: 4096`

        - `skills: optional array of HostedSkillParam or null`

          Skills referenced by ID or provided as inline ZIP archives. Defaults to an empty list.

          `minItems: 0`, `maxItems: 200`

          - `SkillReference object { skill_id, type, version }`

            References a skill uploaded through the Skills API.

            - `skill_id: string`

              The ID of the skill created through `/v1/skills`.

              `minLength: 1`, `maxLength: 64`

            - `type: "skill_reference"`

              The type of the object. Always `skill_reference`.

              - `"skill_reference"`

            - `version: optional string or null`

              The skill version, a positive integer or `latest`; omission selects the default.

              `minLength: 0`, `maxLength: 1048576`

          - `Inline object { description, name, source, type }`

            Supplies a skill ZIP directly in the session request.

            - `description: string`

              The skill description declared in `SKILL.md`.

              `minLength: 0`, `maxLength: 1048576`

            - `name: string`

              The skill name declared in `SKILL.md`.

              `minLength: 1`, `maxLength: 64`

            - `source: InlineCapabilitySourceParam`

              Provides ZIP bytes encoded with standard base64.

            - `type: "inline"`

              The type of the object. Always `inline`.

              - `"inline"`

      - `SelfHosted object { type, workspace_directory, capability_directories }`

        An application-hosted environment configured inline.

        - `type: "self_hosted"`

          The type of the object. Always `self_hosted`.

          - `"self_hosted"`

        - `workspace_directory: string`

          Absolute project directory inside the self-hosted environment.

          `minLength: 0`, `maxLength: 1048576`

        - `capability_directories: optional array of string or null`

          Directories that contain capabilities exposed to the agent. Defaults to an empty list.

          `minItems: 0`, `maxItems: 16384`

    - `input: array of AgentSessionInputMessageParam`

      Initial user messages submitted with each new session.

      `minItems: 0`, `maxItems: 16384`

      - `content: array of InputContentParam`

        The content of the message.

        `minItems: 0`, `maxItems: 16384`

        - `InputText object { text, type }`

          Text input to the model.

          - `text: string`

            The text sent to the model.

            `minLength: 0`, `maxLength: 1048576`

          - `type: "input_text"`

            The type of the object. Always `input_text`.

            - `"input_text"`

        - `InputImage object { image_url, type }`

          Image input to the model.

          - `image_url: string`

            The URL of the image sent to the model.

            `minLength: 0`, `maxLength: 1048576`

          - `type: "input_image"`

            The type of the object. Always `input_image`.

            - `"input_image"`

      - `role: "user"`

        The role of the message author. Always `user`.

        - `"user"`

      - `type: optional "message"`

        The type of the input item. Always `message`.

        - `"message"`

    - `type: "new_session"`

      The type of the object. Always `new_session`.

      - `"new_session"`

    - `agent: optional object { compaction, instructions, model, 5 more }`

      Inline agent configuration. Provide exactly one of agent and agent_id.

      - `compaction: optional object { async }  or null`

        Context compaction settings. Omit to keep the current settings. A supplied object replaces the settings; null or an empty object enables background compaction.

        - `async: optional boolean or null`

          Whether to compact context in the background. Omission or null defaults to true. Set to false to use blocking compaction. Background compaction may increase token usage.

      - `instructions: optional string or null`

        Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.

        `minLength: 0`, `maxLength: 1048576`

      - `model: optional string`

        The model to use for the agent. The requested model name is preserved.

        `minLength: 0`, `maxLength: 1048576`

      - `multi_agent: optional MultiAgentConfigParam or null`

        Configuration for creating and coordinating subagents.

        - `enabled: boolean`

          Whether subagent tools are enabled.

        - `max_concurrent_subagents: optional number`

          Maximum number of subagents that may run concurrently. Defaults to 6.

          `format: int64`, `minimum: 1`, `maximum: 4294967295`

      - `reasoning: optional AgentReasoningParam or null`

        Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.

        - `effort: optional "none" or "minimal" or "low" or 4 more or null`

          The amount of reasoning effort the model should use. Omission lets the model select it.

          - `"none"`

          - `"minimal"`

          - `"low"`

          - `"medium"`

          - `"high"`

          - `"xhigh"`

          - `"max"`

        - `summary: optional "concise" or "detailed" or "auto" or null`

          Controls whether the response includes a reasoning summary.

          - `"concise"`

            Returns a concise reasoning summary when supported.

          - `"detailed"`

            Returns a detailed reasoning summary when supported.

          - `"auto"`

            Automatically selects the most detailed summary supported by the model.

      - `service_tier: optional "auto" or "default" or "flex" or 3 more or null`

        The service tier used for model requests.

        - `"auto"`

          Selects the service tier automatically.

        - `"default"`

          Uses the default service tier.

        - `"flex"`

          Uses the flex service tier.

        - `"priority"`

          Uses the priority service tier.

        - `"fast"`

          Uses the fast service tier.

        - `"ultrafast"`

          Uses the ultrafast service tier.

      - `text: optional AgentTextParam or null`

        Configuration for text generated by the agent.

        - `format: optional TextFormatParam or null`

          The output format. Omission uses ordinary text (`{"type": "text"}`).

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

        - `verbosity: optional "low" or "medium" or "high" or null`

          The amount of text the model should produce. Defaults to `medium`, matching Responses.

          - `"low"`

            Produces less text.

          - `"medium"`

            Uses the default amount of text.

          - `"high"`

            Produces more text.

      - `tools: optional array of AgentToolParam or null`

        Tools available to the agent. Omit to inherit, or pass null to clear them. The resolved tool list must fit within 3 MiB (3,145,728 bytes) of compact UTF-8 JSON.

        `minItems: 0`, `maxItems: 16384`

        - `Function object { description, name, parameters, 2 more }`

          A function defined by the application.

          - `description: string`

            A description of what the function does.

            `minLength: 0`, `maxLength: 1048576`

          - `name: string`

            The name of the function.

            `minLength: 0`, `maxLength: 1048576`

          - `parameters: map[unknown]`

            A JSON Schema object describing the function's arguments.

          - `type: "function"`

            The type of the object. Always `function`.

            - `"function"`

          - `defer_loading: optional boolean`

            Whether this function is deferred and discovered through tool search. Defaults to `false`.

        - `ToolSearch object { type }`

          Discovers deferred function tools and loads them into the model context.

          - `type: "tool_search"`

            The type of the object. Always `tool_search`.

            - `"tool_search"`

        - `ProgrammaticToolCalling object { type, enabled }`

          Enables calling tools from model-generated code.

          - `type: "programmatic_tool_calling"`

            The type of the object. Always `programmatic_tool_calling`.

            - `"programmatic_tool_calling"`

          - `enabled: optional boolean`

            Whether tools can be called from model-generated code. Defaults to `true`.

        - `Mcp object { server_label, transport, type, 5 more }`

          Tools provided by a remote MCP server.

          - `server_label: string`

            A label used to identify the MCP server in tool calls.

            `minLength: 0`, `maxLength: 1048576`

          - `transport: McpTransportParam`

            The transport used to connect to the MCP server.

            - `HTTP object { server_url, type, authorization, headers }`

              Connects to an MCP server over HTTP.

              - `server_url: string`

                The URL of the MCP server.

                `minLength: 0`, `maxLength: 1048576`

              - `type: "http"`

                The type of the object. Always `http`.

                - `"http"`

              - `authorization: optional string or null`

                The authorization value sent to the MCP server, if any.

                `minLength: 0`, `maxLength: 1048576`

              - `headers: optional map[string] or null`

                Additional HTTP headers sent to the MCP server.

            - `Stdio object { command, cwd, type, 3 more }`

              Starts an MCP server as a local process.

              - `command: string`

                The command used to start the MCP server.

                `minLength: 0`, `maxLength: 1048576`

              - `cwd: string`

                The working directory used to start the MCP server.

                `minLength: 0`, `maxLength: 1048576`

              - `type: "stdio"`

                The type of the object. Always `stdio`.

                - `"stdio"`

              - `args: optional array of string or null`

                Arguments passed to the MCP server command.

                `minItems: 0`, `maxItems: 16384`

              - `env: optional map[string] or null`

                Environment variables set for the MCP server process.

              - `env_vars: optional array of string or null`

                Environment variable names to inherit from the selected execution environment.

                `minItems: 0`, `maxItems: 16384`

          - `type: "mcp"`

            The type of the object. Always `mcp`.

            - `"mcp"`

          - `allowed_tools: optional array of string or null`

            The MCP tools the agent may call. All server tools are allowed when omitted.

            `minItems: 0`, `maxItems: 16384`

          - `connection_origin: optional "service" or "environment" or null`

            Selects where outbound MCP HTTP connections originate. Omitted or `service` uses the Managed Agents service network; `environment` uses the session's selected environment.

            - `"service"`

              Uses the Managed Agents service network.

            - `"environment"`

              Uses the session's execution environment.

          - `credential_id: optional string or null`

            The attached vault credential used to authenticate this MCP server. Optional when exactly one attached credential matches the server URL.

            `minLength: 0`, `maxLength: 1048576`

          - `request_metadata: optional map[unknown] or null`

            Metadata included with requests to this MCP server.

          - `required: optional boolean`

            Whether this MCP server must initialize before the first turn. Defaults to `false`.

        - `WebSearch object { type, allowed_domains, context_size, 2 more }`

          Web search.

          - `type: "web_search"`

            The type of the object. Always `web_search`.

            - `"web_search"`

          - `allowed_domains: optional array of string or null`

            Domains the search may include.

            `minItems: 0`, `maxItems: 16384`

          - `context_size: optional "low" or "medium" or "high" or null`

            The amount of search context made available to the model. Defaults to `medium`.

            - `"low"`

            - `"medium"`

            - `"high"`

          - `location: optional object { city, country, region, timezone }  or null`

            Approximate location used to localize search results.

            - `city: optional string or null`

              The city name.

              `minLength: 0`, `maxLength: 1048576`

            - `country: optional string or null`

              The two-letter ISO country code, such as `US`.

              `minLength: 0`, `maxLength: 1048576`

            - `region: optional string or null`

              The region or state name.

              `minLength: 0`, `maxLength: 1048576`

            - `timezone: optional string or null`

              The IANA timezone, such as `America/Los_Angeles`.

              `minLength: 0`, `maxLength: 1048576`

          - `mode: optional "disabled" or "cached" or "live" or null`

            The source used for web search results. Defaults to `live`.

            - `"disabled"`

              Disables web search.

            - `"cached"`

              Uses cached search results.

            - `"live"`

              Searches the live web.

        - `ComputerUse object { type, include_screenshots }`

          Browser use in an OpenAI-hosted session.

          - `type: "computer_use"`

            The type of the object. Always `computer_use`.

            - `"computer_use"`

          - `include_screenshots: optional boolean`

            Whether computer tool outputs include screenshots. Defaults to `false`.

        - `Automations object { type }`

          Lets the agent manage its own scheduled wakeups.

          - `type: "automations"`

            The type of the object. Always `automations`.

            - `"automations"`

    - `agent_id: optional string`

      A saved agent ID. Provide exactly one of agent and agent_id.

      `minLength: 0`, `maxLength: 64`

    - `metadata: optional map[string] or null`

      Metadata attached to each new session.

    - `vault_ids: optional array of string or null`

      The IDs of vaults made available to each new session.

      `minItems: 0`, `maxItems: 16384`

  - `ExistingSession object { instructions, session_id, type }`

    Deliver instructions to an existing session.

    - `instructions: string`

      Instructions delivered as an automation notification.

      `minLength: 0`, `maxLength: 1048576`

    - `session_id: string`

      The session receiving each invocation.

      `minLength: 0`, `maxLength: 1048576`

    - `type: "existing_session"`

      The type of the object. Always `existing_session`.

      - `"existing_session"`

### One Time Automation

- `OneTimeAutomation object { id, created_at, created_by, 7 more }`

  Fields shared by periodic and one-time automations.

  - `id: string`

    The automation ID.

    `minLength: 0`

  - `created_at: number`

    The creation time as a Unix timestamp in seconds.

    `format: int64`

  - `created_by: AutomationCreatedBy`

    Service-recorded provenance; callers cannot supply this field.

    - `Developer object { type }`

      - `type: "developer"`

        The type of the object. Always `developer`.

        - `"developer"`

    - `Agent object { session_id, tool_call_id, type }`

      - `session_id: string`

        The creator session, which is also the automation's target.

        `minLength: 0`

      - `tool_call_id: string`

        The tool call that created the automation.

        `minLength: 0`

      - `type: "agent"`

        The type of the object. Always `agent`.

        - `"agent"`

  - `metadata: map[string]`

    Custom string key-value pairs attached to the automation.

  - `name: string`

    The automation's display name.

    `minLength: 0`

  - `object: "agent.automation"`

    Always `agent.automation`.

    - `"agent.automation"`

  - `run_at: number`

    The Unix timestamp, in seconds, of the scheduled occurrence.

    `format: int64`

  - `status: "active" or "paused" or "completed"`

    Completion means the schedule has finished, not the agent's work.

    - `"active"`

    - `"paused"`

    - `"completed"`

  - `target: AutomationTarget`

    The session configuration or existing session receiving invocations.

    - `NewSession object { agent, agent_id, environment, 4 more }`

      - `agent: AutomationAgentConfig or null`

        The inline agent configuration, or null when agent_id is configured.

        - `instructions: string or null`

          Custom instructions, or null when absent.

          `minLength: 0`

        - `model: string`

          The requested model name.

          `minLength: 0`

        - `multi_agent: MultiAgentConfig`

          The configuration for creating and coordinating subagents.

          - `enabled: boolean`

            Whether subagent tools are enabled. Defaults to false.

          - `max_concurrent_subagents: number or null`

            Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

            `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

          `minItems: 0`, `maxItems: 2000`

          - `Function object { defer_loading, description, name, 2 more }`

            A function defined by the application.

            - `defer_loading: boolean`

              Whether the function is deferred and discovered through tool search.

            - `description: string`

              A description of what the function does.

              `minLength: 0`

            - `name: string`

              The name of the function.

              `minLength: 0`

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

              `minItems: 0`, `maxItems: 2000`

            - `connection_origin: "service" or "environment"`

              Where outbound MCP HTTP connections originate.

              - `"service"`

              - `"environment"`

            - `credential_id: string or null`

              The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

              `minLength: 0`

            - `request_metadata: map[unknown]`

              Metadata included with requests to this MCP server.

            - `required: boolean`

              Whether this MCP server must initialize before the first turn.

            - `server_label: string`

              A label used to identify the MCP server in tool calls.

              `minLength: 0`

            - `transport: McpTransport`

              The transport used to connect to the MCP server.

              - `HTTP object { server_url, type }`

                Connects to an MCP server over HTTP.

                - `server_url: string`

                  The URL of the MCP server.

                  `minLength: 0`

                - `type: "http"`

                  The type of the object. Always `http`.

                  - `"http"`

              - `Stdio object { args, command, cwd, 2 more }`

                Starts an MCP server as a local process.

                - `args: array of string`

                  Arguments passed to the MCP server command.

                  `minItems: 0`, `maxItems: 2000`

                - `command: string`

                  The command used to start the MCP server.

                  `minLength: 0`

                - `cwd: string`

                  The working directory used to start the MCP server.

                  `minLength: 0`

                - `env_vars: array of string`

                  Environment variable names inherited from the execution environment.

                  `minItems: 0`, `maxItems: 2000`

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

              `minItems: 0`, `maxItems: 2000`

            - `context_size: "low" or "medium" or "high"`

              The amount of search context made available to the model. Defaults to `medium`.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `location: object { city, country, region, timezone }  or null`

              Approximate location used to localize search results, if provided.

              - `city: string or null`

                The city name.

                `minLength: 0`

              - `country: string or null`

                The two-letter ISO country code, such as `US`.

                `minLength: 0`

              - `region: string or null`

                The region or state name.

                `minLength: 0`

              - `timezone: string or null`

                The IANA timezone, such as `America/Los_Angeles`.

                `minLength: 0`

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

        - `compaction: optional object { async }`

          The effective context compaction settings.

          - `async: boolean`

            Whether context is compacted in the background. Defaults to true.

      - `agent_id: string or null`

        The saved agent reference, or null when an inline agent is configured.

        `minLength: 0`

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

            `minItems: 0`, `maxItems: 2000`

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

            `minLength: 0`

          - `environment_template_id: string or null`

            A template reference, or null when no template is selected.

            `minLength: 0`

          - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

            File overrides, excluding contents, or null to inherit.

            `minItems: 0`, `maxItems: 2000`

            - `FileID object { file_id, path, type }`

              A project-scoped Files API reference resolved separately for each session.

              - `file_id: string`

                The ID of the uploaded file.

                `minLength: 0`

              - `path: string`

                The file's absolute path inside the environment.

                `minLength: 0`

              - `type: "file_id"`

                The type of the object. Always `file_id`.

                - `"file_id"`

            - `Inline object { path, size_bytes, type }`

              Metadata for confidential inline file contents.

              - `path: string`

                The file's absolute path inside the environment.

                `minLength: 0`

              - `size_bytes: number`

                The decoded size of the inline file in bytes.

                `format: int64`, `minimum: 0`

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

              `minItems: 0`, `maxItems: 2000`

          - `packages: object { npm, python, system }  or null`

            Package overrides, or null to inherit the template or creation default.

            - `npm: array of string`

              npm packages installed globally in the environment.

              `minItems: 0`, `maxItems: 16384`

            - `python: array of string`

              Python packages installed in the environment.

              `minItems: 0`, `maxItems: 16384`

            - `system: array of string`

              System packages installed in the environment.

              `minItems: 0`, `maxItems: 16384`

          - `plugins: array of HostedPlugin or null`

            Plugin overrides, excluding archive contents, or null to inherit.

            `minItems: 0`, `maxItems: 2000`

            - `description: string`

              The installed plugin description.

              `minLength: 0`

            - `name: string`

              The installed plugin name.

              `minLength: 0`

            - `type: "inline"`

              The type of the object. Always `inline`.

              - `"inline"`

          - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

            Skill overrides, excluding archive contents, or null to inherit.

            `minItems: 0`, `maxItems: 2000`

            - `SkillReference object { skill_id, type, version }`

              A skill resolved afresh from the Skills API whenever a session starts.

              - `skill_id: string`

                The referenced skill ID.

                `minLength: 0`

              - `type: "skill_reference"`

                The type of the object. Always `skill_reference`.

                - `"skill_reference"`

              - `version: string or null`

                The requested version selector, including `latest`.

                `minLength: 0`

            - `Inline object { description, name, type }`

              Safe metadata for an inline skill archive.

              - `description: string`

                The skill description declared in `SKILL.md`.

                `minLength: 0`

              - `name: string`

                The skill name declared in `SKILL.md`.

                `minLength: 0`

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

          - `type: "openai_hosted"`

            The type of the object. Always `openai_hosted`.

            - `"openai_hosted"`

        - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

          - `capability_directories: array of string`

            Directories that expose capabilities to the agent.

            `minItems: 0`, `maxItems: 2000`

          - `environment_id: string or null`

            An existing registration, or null to create a session-owned environment.

            `minLength: 0`

          - `type: "self_hosted"`

            The type of the object. Always `self_hosted`.

            - `"self_hosted"`

          - `workspace_directory: string`

            The absolute project directory in the environment.

            `minLength: 0`

      - `input: array of object { content, role, type }`

        Initial input delivered to each new session.

        `minItems: 0`, `maxItems: 2000`

        - `content: array of InputContent`

          The content of the message.

          `minItems: 0`, `maxItems: 2000`

          - `InputText object { text, type }`

            Text input recorded in a session item.

            - `text: string`

              The text supplied to the agent.

              `minLength: 0`

            - `type: "input_text"`

              The type of the object. Always `input_text`.

              - `"input_text"`

          - `InputImage object { image_url, type }`

            Image input recorded in a session item.

            - `image_url: string`

              The URL of the image supplied to the agent, which may be a base64-encoded data URL.

              `minLength: 0`

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

        `minItems: 0`, `maxItems: 2000`

    - `ExistingSession object { instructions, session_id, type }`

      - `instructions: string`

        Saved instructions delivered as an automation notification.

        `minLength: 0`

      - `session_id: string`

        The session receiving each invocation.

        `minLength: 0`

      - `type: "existing_session"`

        The type of the object. Always `existing_session`.

        - `"existing_session"`

  - `type: "once"`

    The type of the object. Always `once`.

    - `"once"`

### Periodic Automation

- `PeriodicAutomation object { id, created_at, created_by, 8 more }`

  Fields shared by periodic and one-time automations.

  - `id: string`

    The automation ID.

    `minLength: 0`

  - `created_at: number`

    The creation time as a Unix timestamp in seconds.

    `format: int64`

  - `created_by: AutomationCreatedBy`

    Service-recorded provenance; callers cannot supply this field.

    - `Developer object { type }`

      - `type: "developer"`

        The type of the object. Always `developer`.

        - `"developer"`

    - `Agent object { session_id, tool_call_id, type }`

      - `session_id: string`

        The creator session, which is also the automation's target.

        `minLength: 0`

      - `tool_call_id: string`

        The tool call that created the automation.

        `minLength: 0`

      - `type: "agent"`

        The type of the object. Always `agent`.

        - `"agent"`

  - `expression: string`

    The cron expression determining scheduled occurrences.

    `minLength: 0`

  - `metadata: map[string]`

    Custom string key-value pairs attached to the automation.

  - `name: string`

    The automation's display name.

    `minLength: 0`

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

          `minLength: 0`

        - `model: string`

          The requested model name.

          `minLength: 0`

        - `multi_agent: MultiAgentConfig`

          The configuration for creating and coordinating subagents.

          - `enabled: boolean`

            Whether subagent tools are enabled. Defaults to false.

          - `max_concurrent_subagents: number or null`

            Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

            `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

          `minItems: 0`, `maxItems: 2000`

          - `Function object { defer_loading, description, name, 2 more }`

            A function defined by the application.

            - `defer_loading: boolean`

              Whether the function is deferred and discovered through tool search.

            - `description: string`

              A description of what the function does.

              `minLength: 0`

            - `name: string`

              The name of the function.

              `minLength: 0`

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

              `minItems: 0`, `maxItems: 2000`

            - `connection_origin: "service" or "environment"`

              Where outbound MCP HTTP connections originate.

              - `"service"`

              - `"environment"`

            - `credential_id: string or null`

              The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

              `minLength: 0`

            - `request_metadata: map[unknown]`

              Metadata included with requests to this MCP server.

            - `required: boolean`

              Whether this MCP server must initialize before the first turn.

            - `server_label: string`

              A label used to identify the MCP server in tool calls.

              `minLength: 0`

            - `transport: McpTransport`

              The transport used to connect to the MCP server.

              - `HTTP object { server_url, type }`

                Connects to an MCP server over HTTP.

                - `server_url: string`

                  The URL of the MCP server.

                  `minLength: 0`

                - `type: "http"`

                  The type of the object. Always `http`.

                  - `"http"`

              - `Stdio object { args, command, cwd, 2 more }`

                Starts an MCP server as a local process.

                - `args: array of string`

                  Arguments passed to the MCP server command.

                  `minItems: 0`, `maxItems: 2000`

                - `command: string`

                  The command used to start the MCP server.

                  `minLength: 0`

                - `cwd: string`

                  The working directory used to start the MCP server.

                  `minLength: 0`

                - `env_vars: array of string`

                  Environment variable names inherited from the execution environment.

                  `minItems: 0`, `maxItems: 2000`

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

              `minItems: 0`, `maxItems: 2000`

            - `context_size: "low" or "medium" or "high"`

              The amount of search context made available to the model. Defaults to `medium`.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `location: object { city, country, region, timezone }  or null`

              Approximate location used to localize search results, if provided.

              - `city: string or null`

                The city name.

                `minLength: 0`

              - `country: string or null`

                The two-letter ISO country code, such as `US`.

                `minLength: 0`

              - `region: string or null`

                The region or state name.

                `minLength: 0`

              - `timezone: string or null`

                The IANA timezone, such as `America/Los_Angeles`.

                `minLength: 0`

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

        - `compaction: optional object { async }`

          The effective context compaction settings.

          - `async: boolean`

            Whether context is compacted in the background. Defaults to true.

      - `agent_id: string or null`

        The saved agent reference, or null when an inline agent is configured.

        `minLength: 0`

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

            `minItems: 0`, `maxItems: 2000`

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

            `minLength: 0`

          - `environment_template_id: string or null`

            A template reference, or null when no template is selected.

            `minLength: 0`

          - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

            File overrides, excluding contents, or null to inherit.

            `minItems: 0`, `maxItems: 2000`

            - `FileID object { file_id, path, type }`

              A project-scoped Files API reference resolved separately for each session.

              - `file_id: string`

                The ID of the uploaded file.

                `minLength: 0`

              - `path: string`

                The file's absolute path inside the environment.

                `minLength: 0`

              - `type: "file_id"`

                The type of the object. Always `file_id`.

                - `"file_id"`

            - `Inline object { path, size_bytes, type }`

              Metadata for confidential inline file contents.

              - `path: string`

                The file's absolute path inside the environment.

                `minLength: 0`

              - `size_bytes: number`

                The decoded size of the inline file in bytes.

                `format: int64`, `minimum: 0`

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

              `minItems: 0`, `maxItems: 2000`

          - `packages: object { npm, python, system }  or null`

            Package overrides, or null to inherit the template or creation default.

            - `npm: array of string`

              npm packages installed globally in the environment.

              `minItems: 0`, `maxItems: 16384`

            - `python: array of string`

              Python packages installed in the environment.

              `minItems: 0`, `maxItems: 16384`

            - `system: array of string`

              System packages installed in the environment.

              `minItems: 0`, `maxItems: 16384`

          - `plugins: array of HostedPlugin or null`

            Plugin overrides, excluding archive contents, or null to inherit.

            `minItems: 0`, `maxItems: 2000`

            - `description: string`

              The installed plugin description.

              `minLength: 0`

            - `name: string`

              The installed plugin name.

              `minLength: 0`

            - `type: "inline"`

              The type of the object. Always `inline`.

              - `"inline"`

          - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

            Skill overrides, excluding archive contents, or null to inherit.

            `minItems: 0`, `maxItems: 2000`

            - `SkillReference object { skill_id, type, version }`

              A skill resolved afresh from the Skills API whenever a session starts.

              - `skill_id: string`

                The referenced skill ID.

                `minLength: 0`

              - `type: "skill_reference"`

                The type of the object. Always `skill_reference`.

                - `"skill_reference"`

              - `version: string or null`

                The requested version selector, including `latest`.

                `minLength: 0`

            - `Inline object { description, name, type }`

              Safe metadata for an inline skill archive.

              - `description: string`

                The skill description declared in `SKILL.md`.

                `minLength: 0`

              - `name: string`

                The skill name declared in `SKILL.md`.

                `minLength: 0`

              - `type: "inline"`

                The type of the object. Always `inline`.

                - `"inline"`

          - `type: "openai_hosted"`

            The type of the object. Always `openai_hosted`.

            - `"openai_hosted"`

        - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

          - `capability_directories: array of string`

            Directories that expose capabilities to the agent.

            `minItems: 0`, `maxItems: 2000`

          - `environment_id: string or null`

            An existing registration, or null to create a session-owned environment.

            `minLength: 0`

          - `type: "self_hosted"`

            The type of the object. Always `self_hosted`.

            - `"self_hosted"`

          - `workspace_directory: string`

            The absolute project directory in the environment.

            `minLength: 0`

      - `input: array of object { content, role, type }`

        Initial input delivered to each new session.

        `minItems: 0`, `maxItems: 2000`

        - `content: array of InputContent`

          The content of the message.

          `minItems: 0`, `maxItems: 2000`

          - `InputText object { text, type }`

            Text input recorded in a session item.

            - `text: string`

              The text supplied to the agent.

              `minLength: 0`

            - `type: "input_text"`

              The type of the object. Always `input_text`.

              - `"input_text"`

          - `InputImage object { image_url, type }`

            Image input recorded in a session item.

            - `image_url: string`

              The URL of the image supplied to the agent, which may be a base64-encoded data URL.

              `minLength: 0`

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

        `minItems: 0`, `maxItems: 2000`

    - `ExistingSession object { instructions, session_id, type }`

      - `instructions: string`

        Saved instructions delivered as an automation notification.

        `minLength: 0`

      - `session_id: string`

        The session receiving each invocation.

        `minLength: 0`

      - `type: "existing_session"`

        The type of the object. Always `existing_session`.

        - `"existing_session"`

  - `timezone: string`

    The timezone used to interpret the expression.

    `minLength: 0`

  - `type: "periodic"`

    The type of the object. Always `periodic`.

    - `"periodic"`

# Invocations

## Invoke an automation

**post** `/agents/automations/{automation_id}/invocations`

Queues a manual delivery without changing the saved schedule.

### Path Parameters

- `automation_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `AutomationInvocation object { id, automation_id, created_at, 7 more }`

  One attempted delivery by an automation.

  - `id: string`

    The invocation ID.

    `minLength: 0`

  - `automation_id: string`

    The automation that owns the invocation.

    `minLength: 0`

  - `created_at: number`

    The creation time as a Unix timestamp in seconds.

    `format: int64`

  - `error: object { code, message }  or null`

    The permanent delivery failure, or null when no failure occurred.

    - `code: string`

      A machine-readable error code.

      `minLength: 0`

    - `message: string`

      A public explanation of the delivery failure.

      `minLength: 0`

  - `object: "agent.automation.invocation"`

    Always `agent.automation.invocation`.

    - `"agent.automation.invocation"`

  - `scheduled_at: number or null`

    The intended occurrence as a Unix timestamp in seconds, or null for manual runs.

    `format: int64`

  - `session_id: string or null`

    The target or newly created session ID, or null before one is available.

    `minLength: 0`

  - `skip_reason: "pending_delivery" or null`

    Why an occurrence was skipped, or null when it was not skipped.

    - `"pending_delivery"`

  - `source: AutomationInvocationSource`

    Whether the invocation was manual or scheduled.

    - `Manual object { type }`

      - `type: "manual"`

        The type of the object. Always `manual`.

        - `"manual"`

    - `Automation object { automation, type }`

      - `automation: Automation`

        The automation snapshot for this occurrence, excluding confidential values.

        - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

          Fields shared by periodic and one-time automations.

          - `id: string`

            The automation ID.

            `minLength: 0`

          - `created_at: number`

            The creation time as a Unix timestamp in seconds.

            `format: int64`

          - `created_by: AutomationCreatedBy`

            Service-recorded provenance; callers cannot supply this field.

            - `Developer object { type }`

              - `type: "developer"`

                The type of the object. Always `developer`.

                - `"developer"`

            - `Agent object { session_id, tool_call_id, type }`

              - `session_id: string`

                The creator session, which is also the automation's target.

                `minLength: 0`

              - `tool_call_id: string`

                The tool call that created the automation.

                `minLength: 0`

              - `type: "agent"`

                The type of the object. Always `agent`.

                - `"agent"`

          - `expression: string`

            The cron expression determining scheduled occurrences.

            `minLength: 0`

          - `metadata: map[string]`

            Custom string key-value pairs attached to the automation.

          - `name: string`

            The automation's display name.

            `minLength: 0`

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

                  `minLength: 0`

                - `model: string`

                  The requested model name.

                  `minLength: 0`

                - `multi_agent: MultiAgentConfig`

                  The configuration for creating and coordinating subagents.

                  - `enabled: boolean`

                    Whether subagent tools are enabled. Defaults to false.

                  - `max_concurrent_subagents: number or null`

                    Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

                    `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

                  `minItems: 0`, `maxItems: 2000`

                  - `Function object { defer_loading, description, name, 2 more }`

                    A function defined by the application.

                    - `defer_loading: boolean`

                      Whether the function is deferred and discovered through tool search.

                    - `description: string`

                      A description of what the function does.

                      `minLength: 0`

                    - `name: string`

                      The name of the function.

                      `minLength: 0`

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

                      `minItems: 0`, `maxItems: 2000`

                    - `connection_origin: "service" or "environment"`

                      Where outbound MCP HTTP connections originate.

                      - `"service"`

                      - `"environment"`

                    - `credential_id: string or null`

                      The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                      `minLength: 0`

                    - `request_metadata: map[unknown]`

                      Metadata included with requests to this MCP server.

                    - `required: boolean`

                      Whether this MCP server must initialize before the first turn.

                    - `server_label: string`

                      A label used to identify the MCP server in tool calls.

                      `minLength: 0`

                    - `transport: McpTransport`

                      The transport used to connect to the MCP server.

                      - `HTTP object { server_url, type }`

                        Connects to an MCP server over HTTP.

                        - `server_url: string`

                          The URL of the MCP server.

                          `minLength: 0`

                        - `type: "http"`

                          The type of the object. Always `http`.

                          - `"http"`

                      - `Stdio object { args, command, cwd, 2 more }`

                        Starts an MCP server as a local process.

                        - `args: array of string`

                          Arguments passed to the MCP server command.

                          `minItems: 0`, `maxItems: 2000`

                        - `command: string`

                          The command used to start the MCP server.

                          `minLength: 0`

                        - `cwd: string`

                          The working directory used to start the MCP server.

                          `minLength: 0`

                        - `env_vars: array of string`

                          Environment variable names inherited from the execution environment.

                          `minItems: 0`, `maxItems: 2000`

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

                      `minItems: 0`, `maxItems: 2000`

                    - `context_size: "low" or "medium" or "high"`

                      The amount of search context made available to the model. Defaults to `medium`.

                      - `"low"`

                      - `"medium"`

                      - `"high"`

                    - `location: object { city, country, region, timezone }  or null`

                      Approximate location used to localize search results, if provided.

                      - `city: string or null`

                        The city name.

                        `minLength: 0`

                      - `country: string or null`

                        The two-letter ISO country code, such as `US`.

                        `minLength: 0`

                      - `region: string or null`

                        The region or state name.

                        `minLength: 0`

                      - `timezone: string or null`

                        The IANA timezone, such as `America/Los_Angeles`.

                        `minLength: 0`

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

                - `compaction: optional object { async }`

                  The effective context compaction settings.

                  - `async: boolean`

                    Whether context is compacted in the background. Defaults to true.

              - `agent_id: string or null`

                The saved agent reference, or null when an inline agent is configured.

                `minLength: 0`

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

                    `minItems: 0`, `maxItems: 2000`

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

                    `minLength: 0`

                  - `environment_template_id: string or null`

                    A template reference, or null when no template is selected.

                    `minLength: 0`

                  - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

                    File overrides, excluding contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `FileID object { file_id, path, type }`

                      A project-scoped Files API reference resolved separately for each session.

                      - `file_id: string`

                        The ID of the uploaded file.

                        `minLength: 0`

                      - `path: string`

                        The file's absolute path inside the environment.

                        `minLength: 0`

                      - `type: "file_id"`

                        The type of the object. Always `file_id`.

                        - `"file_id"`

                    - `Inline object { path, size_bytes, type }`

                      Metadata for confidential inline file contents.

                      - `path: string`

                        The file's absolute path inside the environment.

                        `minLength: 0`

                      - `size_bytes: number`

                        The decoded size of the inline file in bytes.

                        `format: int64`, `minimum: 0`

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

                      `minItems: 0`, `maxItems: 2000`

                  - `packages: object { npm, python, system }  or null`

                    Package overrides, or null to inherit the template or creation default.

                    - `npm: array of string`

                      npm packages installed globally in the environment.

                      `minItems: 0`, `maxItems: 16384`

                    - `python: array of string`

                      Python packages installed in the environment.

                      `minItems: 0`, `maxItems: 16384`

                    - `system: array of string`

                      System packages installed in the environment.

                      `minItems: 0`, `maxItems: 16384`

                  - `plugins: array of HostedPlugin or null`

                    Plugin overrides, excluding archive contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `description: string`

                      The installed plugin description.

                      `minLength: 0`

                    - `name: string`

                      The installed plugin name.

                      `minLength: 0`

                    - `type: "inline"`

                      The type of the object. Always `inline`.

                      - `"inline"`

                  - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

                    Skill overrides, excluding archive contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `SkillReference object { skill_id, type, version }`

                      A skill resolved afresh from the Skills API whenever a session starts.

                      - `skill_id: string`

                        The referenced skill ID.

                        `minLength: 0`

                      - `type: "skill_reference"`

                        The type of the object. Always `skill_reference`.

                        - `"skill_reference"`

                      - `version: string or null`

                        The requested version selector, including `latest`.

                        `minLength: 0`

                    - `Inline object { description, name, type }`

                      Safe metadata for an inline skill archive.

                      - `description: string`

                        The skill description declared in `SKILL.md`.

                        `minLength: 0`

                      - `name: string`

                        The skill name declared in `SKILL.md`.

                        `minLength: 0`

                      - `type: "inline"`

                        The type of the object. Always `inline`.

                        - `"inline"`

                  - `type: "openai_hosted"`

                    The type of the object. Always `openai_hosted`.

                    - `"openai_hosted"`

                - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

                  - `capability_directories: array of string`

                    Directories that expose capabilities to the agent.

                    `minItems: 0`, `maxItems: 2000`

                  - `environment_id: string or null`

                    An existing registration, or null to create a session-owned environment.

                    `minLength: 0`

                  - `type: "self_hosted"`

                    The type of the object. Always `self_hosted`.

                    - `"self_hosted"`

                  - `workspace_directory: string`

                    The absolute project directory in the environment.

                    `minLength: 0`

              - `input: array of object { content, role, type }`

                Initial input delivered to each new session.

                `minItems: 0`, `maxItems: 2000`

                - `content: array of InputContent`

                  The content of the message.

                  `minItems: 0`, `maxItems: 2000`

                  - `InputText object { text, type }`

                    Text input recorded in a session item.

                    - `text: string`

                      The text supplied to the agent.

                      `minLength: 0`

                    - `type: "input_text"`

                      The type of the object. Always `input_text`.

                      - `"input_text"`

                  - `InputImage object { image_url, type }`

                    Image input recorded in a session item.

                    - `image_url: string`

                      The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                      `minLength: 0`

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

                `minItems: 0`, `maxItems: 2000`

            - `ExistingSession object { instructions, session_id, type }`

              - `instructions: string`

                Saved instructions delivered as an automation notification.

                `minLength: 0`

              - `session_id: string`

                The session receiving each invocation.

                `minLength: 0`

              - `type: "existing_session"`

                The type of the object. Always `existing_session`.

                - `"existing_session"`

          - `timezone: string`

            The timezone used to interpret the expression.

            `minLength: 0`

          - `type: "periodic"`

            The type of the object. Always `periodic`.

            - `"periodic"`

        - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

          Fields shared by periodic and one-time automations.

          - `id: string`

            The automation ID.

            `minLength: 0`

          - `created_at: number`

            The creation time as a Unix timestamp in seconds.

            `format: int64`

          - `created_by: AutomationCreatedBy`

            Service-recorded provenance; callers cannot supply this field.

          - `metadata: map[string]`

            Custom string key-value pairs attached to the automation.

          - `name: string`

            The automation's display name.

            `minLength: 0`

          - `object: "agent.automation"`

            Always `agent.automation`.

            - `"agent.automation"`

          - `run_at: number`

            The Unix timestamp, in seconds, of the scheduled occurrence.

            `format: int64`

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

      - `type: "automation"`

        The type of the object. Always `automation`.

        - `"automation"`

  - `status: "queued" or "completed" or "failed" or "skipped"`

    Delivery status; completed does not mean the agent's work has finished.

    - `"queued"`

    - `"completed"`

    - `"failed"`

    - `"skipped"`

### Example

```http
curl https://api.openai.com/v1/agents/automations/$AUTOMATION_ID/invocations \
    -X POST \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "automation_id": "automation_id",
  "created_at": 0,
  "error": {
    "code": "code",
    "message": "message"
  },
  "object": "agent.automation.invocation",
  "scheduled_at": 0,
  "session_id": "session_id",
  "skip_reason": "pending_delivery",
  "source": {
    "type": "manual"
  },
  "status": "queued"
}
```

## List automation invocations

**get** `/agents/automations/{automation_id}/invocations`

Lists delivery records for a project-owned automation.

### Path Parameters

- `automation_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Query Parameters

- `after: optional string`

  Return resources after this resource ID in the selected order.

  `minLength: 0`, `maxLength: 1048576`

- `limit: optional number`

  The maximum number of resources to return, between 1 and 100. Defaults to 20.

  `format: int64`, `minimum: 1`, `maximum: 100`

- `order: optional "asc" or "desc"`

  The order in which resources are returned. Defaults to `desc`.

  - `"asc"`

    Returns resources in ascending order.

  - `"desc"`

    Returns resources in descending order.

### Returns

- `data: array of AutomationInvocation`

  The resources returned in this page, in the requested sort order.

  `minItems: 0`, `maxItems: 2000`

  - `id: string`

    The invocation ID.

    `minLength: 0`

  - `automation_id: string`

    The automation that owns the invocation.

    `minLength: 0`

  - `created_at: number`

    The creation time as a Unix timestamp in seconds.

    `format: int64`

  - `error: object { code, message }  or null`

    The permanent delivery failure, or null when no failure occurred.

    - `code: string`

      A machine-readable error code.

      `minLength: 0`

    - `message: string`

      A public explanation of the delivery failure.

      `minLength: 0`

  - `object: "agent.automation.invocation"`

    Always `agent.automation.invocation`.

    - `"agent.automation.invocation"`

  - `scheduled_at: number or null`

    The intended occurrence as a Unix timestamp in seconds, or null for manual runs.

    `format: int64`

  - `session_id: string or null`

    The target or newly created session ID, or null before one is available.

    `minLength: 0`

  - `skip_reason: "pending_delivery" or null`

    Why an occurrence was skipped, or null when it was not skipped.

    - `"pending_delivery"`

  - `source: AutomationInvocationSource`

    Whether the invocation was manual or scheduled.

    - `Manual object { type }`

      - `type: "manual"`

        The type of the object. Always `manual`.

        - `"manual"`

    - `Automation object { automation, type }`

      - `automation: Automation`

        The automation snapshot for this occurrence, excluding confidential values.

        - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

          Fields shared by periodic and one-time automations.

          - `id: string`

            The automation ID.

            `minLength: 0`

          - `created_at: number`

            The creation time as a Unix timestamp in seconds.

            `format: int64`

          - `created_by: AutomationCreatedBy`

            Service-recorded provenance; callers cannot supply this field.

            - `Developer object { type }`

              - `type: "developer"`

                The type of the object. Always `developer`.

                - `"developer"`

            - `Agent object { session_id, tool_call_id, type }`

              - `session_id: string`

                The creator session, which is also the automation's target.

                `minLength: 0`

              - `tool_call_id: string`

                The tool call that created the automation.

                `minLength: 0`

              - `type: "agent"`

                The type of the object. Always `agent`.

                - `"agent"`

          - `expression: string`

            The cron expression determining scheduled occurrences.

            `minLength: 0`

          - `metadata: map[string]`

            Custom string key-value pairs attached to the automation.

          - `name: string`

            The automation's display name.

            `minLength: 0`

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

                  `minLength: 0`

                - `model: string`

                  The requested model name.

                  `minLength: 0`

                - `multi_agent: MultiAgentConfig`

                  The configuration for creating and coordinating subagents.

                  - `enabled: boolean`

                    Whether subagent tools are enabled. Defaults to false.

                  - `max_concurrent_subagents: number or null`

                    Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

                    `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

                  `minItems: 0`, `maxItems: 2000`

                  - `Function object { defer_loading, description, name, 2 more }`

                    A function defined by the application.

                    - `defer_loading: boolean`

                      Whether the function is deferred and discovered through tool search.

                    - `description: string`

                      A description of what the function does.

                      `minLength: 0`

                    - `name: string`

                      The name of the function.

                      `minLength: 0`

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

                      `minItems: 0`, `maxItems: 2000`

                    - `connection_origin: "service" or "environment"`

                      Where outbound MCP HTTP connections originate.

                      - `"service"`

                      - `"environment"`

                    - `credential_id: string or null`

                      The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                      `minLength: 0`

                    - `request_metadata: map[unknown]`

                      Metadata included with requests to this MCP server.

                    - `required: boolean`

                      Whether this MCP server must initialize before the first turn.

                    - `server_label: string`

                      A label used to identify the MCP server in tool calls.

                      `minLength: 0`

                    - `transport: McpTransport`

                      The transport used to connect to the MCP server.

                      - `HTTP object { server_url, type }`

                        Connects to an MCP server over HTTP.

                        - `server_url: string`

                          The URL of the MCP server.

                          `minLength: 0`

                        - `type: "http"`

                          The type of the object. Always `http`.

                          - `"http"`

                      - `Stdio object { args, command, cwd, 2 more }`

                        Starts an MCP server as a local process.

                        - `args: array of string`

                          Arguments passed to the MCP server command.

                          `minItems: 0`, `maxItems: 2000`

                        - `command: string`

                          The command used to start the MCP server.

                          `minLength: 0`

                        - `cwd: string`

                          The working directory used to start the MCP server.

                          `minLength: 0`

                        - `env_vars: array of string`

                          Environment variable names inherited from the execution environment.

                          `minItems: 0`, `maxItems: 2000`

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

                      `minItems: 0`, `maxItems: 2000`

                    - `context_size: "low" or "medium" or "high"`

                      The amount of search context made available to the model. Defaults to `medium`.

                      - `"low"`

                      - `"medium"`

                      - `"high"`

                    - `location: object { city, country, region, timezone }  or null`

                      Approximate location used to localize search results, if provided.

                      - `city: string or null`

                        The city name.

                        `minLength: 0`

                      - `country: string or null`

                        The two-letter ISO country code, such as `US`.

                        `minLength: 0`

                      - `region: string or null`

                        The region or state name.

                        `minLength: 0`

                      - `timezone: string or null`

                        The IANA timezone, such as `America/Los_Angeles`.

                        `minLength: 0`

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

                - `compaction: optional object { async }`

                  The effective context compaction settings.

                  - `async: boolean`

                    Whether context is compacted in the background. Defaults to true.

              - `agent_id: string or null`

                The saved agent reference, or null when an inline agent is configured.

                `minLength: 0`

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

                    `minItems: 0`, `maxItems: 2000`

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

                    `minLength: 0`

                  - `environment_template_id: string or null`

                    A template reference, or null when no template is selected.

                    `minLength: 0`

                  - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

                    File overrides, excluding contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `FileID object { file_id, path, type }`

                      A project-scoped Files API reference resolved separately for each session.

                      - `file_id: string`

                        The ID of the uploaded file.

                        `minLength: 0`

                      - `path: string`

                        The file's absolute path inside the environment.

                        `minLength: 0`

                      - `type: "file_id"`

                        The type of the object. Always `file_id`.

                        - `"file_id"`

                    - `Inline object { path, size_bytes, type }`

                      Metadata for confidential inline file contents.

                      - `path: string`

                        The file's absolute path inside the environment.

                        `minLength: 0`

                      - `size_bytes: number`

                        The decoded size of the inline file in bytes.

                        `format: int64`, `minimum: 0`

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

                      `minItems: 0`, `maxItems: 2000`

                  - `packages: object { npm, python, system }  or null`

                    Package overrides, or null to inherit the template or creation default.

                    - `npm: array of string`

                      npm packages installed globally in the environment.

                      `minItems: 0`, `maxItems: 16384`

                    - `python: array of string`

                      Python packages installed in the environment.

                      `minItems: 0`, `maxItems: 16384`

                    - `system: array of string`

                      System packages installed in the environment.

                      `minItems: 0`, `maxItems: 16384`

                  - `plugins: array of HostedPlugin or null`

                    Plugin overrides, excluding archive contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `description: string`

                      The installed plugin description.

                      `minLength: 0`

                    - `name: string`

                      The installed plugin name.

                      `minLength: 0`

                    - `type: "inline"`

                      The type of the object. Always `inline`.

                      - `"inline"`

                  - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

                    Skill overrides, excluding archive contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `SkillReference object { skill_id, type, version }`

                      A skill resolved afresh from the Skills API whenever a session starts.

                      - `skill_id: string`

                        The referenced skill ID.

                        `minLength: 0`

                      - `type: "skill_reference"`

                        The type of the object. Always `skill_reference`.

                        - `"skill_reference"`

                      - `version: string or null`

                        The requested version selector, including `latest`.

                        `minLength: 0`

                    - `Inline object { description, name, type }`

                      Safe metadata for an inline skill archive.

                      - `description: string`

                        The skill description declared in `SKILL.md`.

                        `minLength: 0`

                      - `name: string`

                        The skill name declared in `SKILL.md`.

                        `minLength: 0`

                      - `type: "inline"`

                        The type of the object. Always `inline`.

                        - `"inline"`

                  - `type: "openai_hosted"`

                    The type of the object. Always `openai_hosted`.

                    - `"openai_hosted"`

                - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

                  - `capability_directories: array of string`

                    Directories that expose capabilities to the agent.

                    `minItems: 0`, `maxItems: 2000`

                  - `environment_id: string or null`

                    An existing registration, or null to create a session-owned environment.

                    `minLength: 0`

                  - `type: "self_hosted"`

                    The type of the object. Always `self_hosted`.

                    - `"self_hosted"`

                  - `workspace_directory: string`

                    The absolute project directory in the environment.

                    `minLength: 0`

              - `input: array of object { content, role, type }`

                Initial input delivered to each new session.

                `minItems: 0`, `maxItems: 2000`

                - `content: array of InputContent`

                  The content of the message.

                  `minItems: 0`, `maxItems: 2000`

                  - `InputText object { text, type }`

                    Text input recorded in a session item.

                    - `text: string`

                      The text supplied to the agent.

                      `minLength: 0`

                    - `type: "input_text"`

                      The type of the object. Always `input_text`.

                      - `"input_text"`

                  - `InputImage object { image_url, type }`

                    Image input recorded in a session item.

                    - `image_url: string`

                      The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                      `minLength: 0`

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

                `minItems: 0`, `maxItems: 2000`

            - `ExistingSession object { instructions, session_id, type }`

              - `instructions: string`

                Saved instructions delivered as an automation notification.

                `minLength: 0`

              - `session_id: string`

                The session receiving each invocation.

                `minLength: 0`

              - `type: "existing_session"`

                The type of the object. Always `existing_session`.

                - `"existing_session"`

          - `timezone: string`

            The timezone used to interpret the expression.

            `minLength: 0`

          - `type: "periodic"`

            The type of the object. Always `periodic`.

            - `"periodic"`

        - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

          Fields shared by periodic and one-time automations.

          - `id: string`

            The automation ID.

            `minLength: 0`

          - `created_at: number`

            The creation time as a Unix timestamp in seconds.

            `format: int64`

          - `created_by: AutomationCreatedBy`

            Service-recorded provenance; callers cannot supply this field.

          - `metadata: map[string]`

            Custom string key-value pairs attached to the automation.

          - `name: string`

            The automation's display name.

            `minLength: 0`

          - `object: "agent.automation"`

            Always `agent.automation`.

            - `"agent.automation"`

          - `run_at: number`

            The Unix timestamp, in seconds, of the scheduled occurrence.

            `format: int64`

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

      - `type: "automation"`

        The type of the object. Always `automation`.

        - `"automation"`

  - `status: "queued" or "completed" or "failed" or "skipped"`

    Delivery status; completed does not mean the agent's work has finished.

    - `"queued"`

    - `"completed"`

    - `"failed"`

    - `"skipped"`

- `first_id: string or null`

  The ID of the first resource in `data`, or `null` if the page is empty.

  `minLength: 0`

- `has_more: boolean`

  Whether there are more resources to retrieve after this page.

- `last_id: string or null`

  The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.

  `minLength: 0`

- `object: "list"`

  The object type, which is always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/agents/automations/$AUTOMATION_ID/invocations \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "automation_id": "automation_id",
      "created_at": 0,
      "error": {
        "code": "code",
        "message": "message"
      },
      "object": "agent.automation.invocation",
      "scheduled_at": 0,
      "session_id": "session_id",
      "skip_reason": "pending_delivery",
      "source": {
        "type": "manual"
      },
      "status": "queued"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

## Get an automation invocation

**get** `/agents/automations/{automation_id}/invocations/{invocation_id}`

Retrieves a delivery record for a project-owned automation.

### Path Parameters

- `automation_id: string`

  `minLength: 0`, `maxLength: 1048576`

- `invocation_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `AutomationInvocation object { id, automation_id, created_at, 7 more }`

  One attempted delivery by an automation.

  - `id: string`

    The invocation ID.

    `minLength: 0`

  - `automation_id: string`

    The automation that owns the invocation.

    `minLength: 0`

  - `created_at: number`

    The creation time as a Unix timestamp in seconds.

    `format: int64`

  - `error: object { code, message }  or null`

    The permanent delivery failure, or null when no failure occurred.

    - `code: string`

      A machine-readable error code.

      `minLength: 0`

    - `message: string`

      A public explanation of the delivery failure.

      `minLength: 0`

  - `object: "agent.automation.invocation"`

    Always `agent.automation.invocation`.

    - `"agent.automation.invocation"`

  - `scheduled_at: number or null`

    The intended occurrence as a Unix timestamp in seconds, or null for manual runs.

    `format: int64`

  - `session_id: string or null`

    The target or newly created session ID, or null before one is available.

    `minLength: 0`

  - `skip_reason: "pending_delivery" or null`

    Why an occurrence was skipped, or null when it was not skipped.

    - `"pending_delivery"`

  - `source: AutomationInvocationSource`

    Whether the invocation was manual or scheduled.

    - `Manual object { type }`

      - `type: "manual"`

        The type of the object. Always `manual`.

        - `"manual"`

    - `Automation object { automation, type }`

      - `automation: Automation`

        The automation snapshot for this occurrence, excluding confidential values.

        - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

          Fields shared by periodic and one-time automations.

          - `id: string`

            The automation ID.

            `minLength: 0`

          - `created_at: number`

            The creation time as a Unix timestamp in seconds.

            `format: int64`

          - `created_by: AutomationCreatedBy`

            Service-recorded provenance; callers cannot supply this field.

            - `Developer object { type }`

              - `type: "developer"`

                The type of the object. Always `developer`.

                - `"developer"`

            - `Agent object { session_id, tool_call_id, type }`

              - `session_id: string`

                The creator session, which is also the automation's target.

                `minLength: 0`

              - `tool_call_id: string`

                The tool call that created the automation.

                `minLength: 0`

              - `type: "agent"`

                The type of the object. Always `agent`.

                - `"agent"`

          - `expression: string`

            The cron expression determining scheduled occurrences.

            `minLength: 0`

          - `metadata: map[string]`

            Custom string key-value pairs attached to the automation.

          - `name: string`

            The automation's display name.

            `minLength: 0`

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

                  `minLength: 0`

                - `model: string`

                  The requested model name.

                  `minLength: 0`

                - `multi_agent: MultiAgentConfig`

                  The configuration for creating and coordinating subagents.

                  - `enabled: boolean`

                    Whether subagent tools are enabled. Defaults to false.

                  - `max_concurrent_subagents: number or null`

                    Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

                    `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

                  `minItems: 0`, `maxItems: 2000`

                  - `Function object { defer_loading, description, name, 2 more }`

                    A function defined by the application.

                    - `defer_loading: boolean`

                      Whether the function is deferred and discovered through tool search.

                    - `description: string`

                      A description of what the function does.

                      `minLength: 0`

                    - `name: string`

                      The name of the function.

                      `minLength: 0`

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

                      `minItems: 0`, `maxItems: 2000`

                    - `connection_origin: "service" or "environment"`

                      Where outbound MCP HTTP connections originate.

                      - `"service"`

                      - `"environment"`

                    - `credential_id: string or null`

                      The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                      `minLength: 0`

                    - `request_metadata: map[unknown]`

                      Metadata included with requests to this MCP server.

                    - `required: boolean`

                      Whether this MCP server must initialize before the first turn.

                    - `server_label: string`

                      A label used to identify the MCP server in tool calls.

                      `minLength: 0`

                    - `transport: McpTransport`

                      The transport used to connect to the MCP server.

                      - `HTTP object { server_url, type }`

                        Connects to an MCP server over HTTP.

                        - `server_url: string`

                          The URL of the MCP server.

                          `minLength: 0`

                        - `type: "http"`

                          The type of the object. Always `http`.

                          - `"http"`

                      - `Stdio object { args, command, cwd, 2 more }`

                        Starts an MCP server as a local process.

                        - `args: array of string`

                          Arguments passed to the MCP server command.

                          `minItems: 0`, `maxItems: 2000`

                        - `command: string`

                          The command used to start the MCP server.

                          `minLength: 0`

                        - `cwd: string`

                          The working directory used to start the MCP server.

                          `minLength: 0`

                        - `env_vars: array of string`

                          Environment variable names inherited from the execution environment.

                          `minItems: 0`, `maxItems: 2000`

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

                      `minItems: 0`, `maxItems: 2000`

                    - `context_size: "low" or "medium" or "high"`

                      The amount of search context made available to the model. Defaults to `medium`.

                      - `"low"`

                      - `"medium"`

                      - `"high"`

                    - `location: object { city, country, region, timezone }  or null`

                      Approximate location used to localize search results, if provided.

                      - `city: string or null`

                        The city name.

                        `minLength: 0`

                      - `country: string or null`

                        The two-letter ISO country code, such as `US`.

                        `minLength: 0`

                      - `region: string or null`

                        The region or state name.

                        `minLength: 0`

                      - `timezone: string or null`

                        The IANA timezone, such as `America/Los_Angeles`.

                        `minLength: 0`

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

                - `compaction: optional object { async }`

                  The effective context compaction settings.

                  - `async: boolean`

                    Whether context is compacted in the background. Defaults to true.

              - `agent_id: string or null`

                The saved agent reference, or null when an inline agent is configured.

                `minLength: 0`

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

                    `minItems: 0`, `maxItems: 2000`

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

                    `minLength: 0`

                  - `environment_template_id: string or null`

                    A template reference, or null when no template is selected.

                    `minLength: 0`

                  - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

                    File overrides, excluding contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `FileID object { file_id, path, type }`

                      A project-scoped Files API reference resolved separately for each session.

                      - `file_id: string`

                        The ID of the uploaded file.

                        `minLength: 0`

                      - `path: string`

                        The file's absolute path inside the environment.

                        `minLength: 0`

                      - `type: "file_id"`

                        The type of the object. Always `file_id`.

                        - `"file_id"`

                    - `Inline object { path, size_bytes, type }`

                      Metadata for confidential inline file contents.

                      - `path: string`

                        The file's absolute path inside the environment.

                        `minLength: 0`

                      - `size_bytes: number`

                        The decoded size of the inline file in bytes.

                        `format: int64`, `minimum: 0`

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

                      `minItems: 0`, `maxItems: 2000`

                  - `packages: object { npm, python, system }  or null`

                    Package overrides, or null to inherit the template or creation default.

                    - `npm: array of string`

                      npm packages installed globally in the environment.

                      `minItems: 0`, `maxItems: 16384`

                    - `python: array of string`

                      Python packages installed in the environment.

                      `minItems: 0`, `maxItems: 16384`

                    - `system: array of string`

                      System packages installed in the environment.

                      `minItems: 0`, `maxItems: 16384`

                  - `plugins: array of HostedPlugin or null`

                    Plugin overrides, excluding archive contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `description: string`

                      The installed plugin description.

                      `minLength: 0`

                    - `name: string`

                      The installed plugin name.

                      `minLength: 0`

                    - `type: "inline"`

                      The type of the object. Always `inline`.

                      - `"inline"`

                  - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

                    Skill overrides, excluding archive contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `SkillReference object { skill_id, type, version }`

                      A skill resolved afresh from the Skills API whenever a session starts.

                      - `skill_id: string`

                        The referenced skill ID.

                        `minLength: 0`

                      - `type: "skill_reference"`

                        The type of the object. Always `skill_reference`.

                        - `"skill_reference"`

                      - `version: string or null`

                        The requested version selector, including `latest`.

                        `minLength: 0`

                    - `Inline object { description, name, type }`

                      Safe metadata for an inline skill archive.

                      - `description: string`

                        The skill description declared in `SKILL.md`.

                        `minLength: 0`

                      - `name: string`

                        The skill name declared in `SKILL.md`.

                        `minLength: 0`

                      - `type: "inline"`

                        The type of the object. Always `inline`.

                        - `"inline"`

                  - `type: "openai_hosted"`

                    The type of the object. Always `openai_hosted`.

                    - `"openai_hosted"`

                - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

                  - `capability_directories: array of string`

                    Directories that expose capabilities to the agent.

                    `minItems: 0`, `maxItems: 2000`

                  - `environment_id: string or null`

                    An existing registration, or null to create a session-owned environment.

                    `minLength: 0`

                  - `type: "self_hosted"`

                    The type of the object. Always `self_hosted`.

                    - `"self_hosted"`

                  - `workspace_directory: string`

                    The absolute project directory in the environment.

                    `minLength: 0`

              - `input: array of object { content, role, type }`

                Initial input delivered to each new session.

                `minItems: 0`, `maxItems: 2000`

                - `content: array of InputContent`

                  The content of the message.

                  `minItems: 0`, `maxItems: 2000`

                  - `InputText object { text, type }`

                    Text input recorded in a session item.

                    - `text: string`

                      The text supplied to the agent.

                      `minLength: 0`

                    - `type: "input_text"`

                      The type of the object. Always `input_text`.

                      - `"input_text"`

                  - `InputImage object { image_url, type }`

                    Image input recorded in a session item.

                    - `image_url: string`

                      The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                      `minLength: 0`

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

                `minItems: 0`, `maxItems: 2000`

            - `ExistingSession object { instructions, session_id, type }`

              - `instructions: string`

                Saved instructions delivered as an automation notification.

                `minLength: 0`

              - `session_id: string`

                The session receiving each invocation.

                `minLength: 0`

              - `type: "existing_session"`

                The type of the object. Always `existing_session`.

                - `"existing_session"`

          - `timezone: string`

            The timezone used to interpret the expression.

            `minLength: 0`

          - `type: "periodic"`

            The type of the object. Always `periodic`.

            - `"periodic"`

        - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

          Fields shared by periodic and one-time automations.

          - `id: string`

            The automation ID.

            `minLength: 0`

          - `created_at: number`

            The creation time as a Unix timestamp in seconds.

            `format: int64`

          - `created_by: AutomationCreatedBy`

            Service-recorded provenance; callers cannot supply this field.

          - `metadata: map[string]`

            Custom string key-value pairs attached to the automation.

          - `name: string`

            The automation's display name.

            `minLength: 0`

          - `object: "agent.automation"`

            Always `agent.automation`.

            - `"agent.automation"`

          - `run_at: number`

            The Unix timestamp, in seconds, of the scheduled occurrence.

            `format: int64`

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

      - `type: "automation"`

        The type of the object. Always `automation`.

        - `"automation"`

  - `status: "queued" or "completed" or "failed" or "skipped"`

    Delivery status; completed does not mean the agent's work has finished.

    - `"queued"`

    - `"completed"`

    - `"failed"`

    - `"skipped"`

### Example

```http
curl https://api.openai.com/v1/agents/automations/$AUTOMATION_ID/invocations/$INVOCATION_ID \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "automation_id": "automation_id",
  "created_at": 0,
  "error": {
    "code": "code",
    "message": "message"
  },
  "object": "agent.automation.invocation",
  "scheduled_at": 0,
  "session_id": "session_id",
  "skip_reason": "pending_delivery",
  "source": {
    "type": "manual"
  },
  "status": "queued"
}
```

## Domain Types

### Automation Invocation

- `AutomationInvocation object { id, automation_id, created_at, 7 more }`

  One attempted delivery by an automation.

  - `id: string`

    The invocation ID.

    `minLength: 0`

  - `automation_id: string`

    The automation that owns the invocation.

    `minLength: 0`

  - `created_at: number`

    The creation time as a Unix timestamp in seconds.

    `format: int64`

  - `error: object { code, message }  or null`

    The permanent delivery failure, or null when no failure occurred.

    - `code: string`

      A machine-readable error code.

      `minLength: 0`

    - `message: string`

      A public explanation of the delivery failure.

      `minLength: 0`

  - `object: "agent.automation.invocation"`

    Always `agent.automation.invocation`.

    - `"agent.automation.invocation"`

  - `scheduled_at: number or null`

    The intended occurrence as a Unix timestamp in seconds, or null for manual runs.

    `format: int64`

  - `session_id: string or null`

    The target or newly created session ID, or null before one is available.

    `minLength: 0`

  - `skip_reason: "pending_delivery" or null`

    Why an occurrence was skipped, or null when it was not skipped.

    - `"pending_delivery"`

  - `source: AutomationInvocationSource`

    Whether the invocation was manual or scheduled.

    - `Manual object { type }`

      - `type: "manual"`

        The type of the object. Always `manual`.

        - `"manual"`

    - `Automation object { automation, type }`

      - `automation: Automation`

        The automation snapshot for this occurrence, excluding confidential values.

        - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

          Fields shared by periodic and one-time automations.

          - `id: string`

            The automation ID.

            `minLength: 0`

          - `created_at: number`

            The creation time as a Unix timestamp in seconds.

            `format: int64`

          - `created_by: AutomationCreatedBy`

            Service-recorded provenance; callers cannot supply this field.

            - `Developer object { type }`

              - `type: "developer"`

                The type of the object. Always `developer`.

                - `"developer"`

            - `Agent object { session_id, tool_call_id, type }`

              - `session_id: string`

                The creator session, which is also the automation's target.

                `minLength: 0`

              - `tool_call_id: string`

                The tool call that created the automation.

                `minLength: 0`

              - `type: "agent"`

                The type of the object. Always `agent`.

                - `"agent"`

          - `expression: string`

            The cron expression determining scheduled occurrences.

            `minLength: 0`

          - `metadata: map[string]`

            Custom string key-value pairs attached to the automation.

          - `name: string`

            The automation's display name.

            `minLength: 0`

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

                  `minLength: 0`

                - `model: string`

                  The requested model name.

                  `minLength: 0`

                - `multi_agent: MultiAgentConfig`

                  The configuration for creating and coordinating subagents.

                  - `enabled: boolean`

                    Whether subagent tools are enabled. Defaults to false.

                  - `max_concurrent_subagents: number or null`

                    Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

                    `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

                  `minItems: 0`, `maxItems: 2000`

                  - `Function object { defer_loading, description, name, 2 more }`

                    A function defined by the application.

                    - `defer_loading: boolean`

                      Whether the function is deferred and discovered through tool search.

                    - `description: string`

                      A description of what the function does.

                      `minLength: 0`

                    - `name: string`

                      The name of the function.

                      `minLength: 0`

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

                      `minItems: 0`, `maxItems: 2000`

                    - `connection_origin: "service" or "environment"`

                      Where outbound MCP HTTP connections originate.

                      - `"service"`

                      - `"environment"`

                    - `credential_id: string or null`

                      The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                      `minLength: 0`

                    - `request_metadata: map[unknown]`

                      Metadata included with requests to this MCP server.

                    - `required: boolean`

                      Whether this MCP server must initialize before the first turn.

                    - `server_label: string`

                      A label used to identify the MCP server in tool calls.

                      `minLength: 0`

                    - `transport: McpTransport`

                      The transport used to connect to the MCP server.

                      - `HTTP object { server_url, type }`

                        Connects to an MCP server over HTTP.

                        - `server_url: string`

                          The URL of the MCP server.

                          `minLength: 0`

                        - `type: "http"`

                          The type of the object. Always `http`.

                          - `"http"`

                      - `Stdio object { args, command, cwd, 2 more }`

                        Starts an MCP server as a local process.

                        - `args: array of string`

                          Arguments passed to the MCP server command.

                          `minItems: 0`, `maxItems: 2000`

                        - `command: string`

                          The command used to start the MCP server.

                          `minLength: 0`

                        - `cwd: string`

                          The working directory used to start the MCP server.

                          `minLength: 0`

                        - `env_vars: array of string`

                          Environment variable names inherited from the execution environment.

                          `minItems: 0`, `maxItems: 2000`

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

                      `minItems: 0`, `maxItems: 2000`

                    - `context_size: "low" or "medium" or "high"`

                      The amount of search context made available to the model. Defaults to `medium`.

                      - `"low"`

                      - `"medium"`

                      - `"high"`

                    - `location: object { city, country, region, timezone }  or null`

                      Approximate location used to localize search results, if provided.

                      - `city: string or null`

                        The city name.

                        `minLength: 0`

                      - `country: string or null`

                        The two-letter ISO country code, such as `US`.

                        `minLength: 0`

                      - `region: string or null`

                        The region or state name.

                        `minLength: 0`

                      - `timezone: string or null`

                        The IANA timezone, such as `America/Los_Angeles`.

                        `minLength: 0`

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

                - `compaction: optional object { async }`

                  The effective context compaction settings.

                  - `async: boolean`

                    Whether context is compacted in the background. Defaults to true.

              - `agent_id: string or null`

                The saved agent reference, or null when an inline agent is configured.

                `minLength: 0`

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

                    `minItems: 0`, `maxItems: 2000`

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

                    `minLength: 0`

                  - `environment_template_id: string or null`

                    A template reference, or null when no template is selected.

                    `minLength: 0`

                  - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

                    File overrides, excluding contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `FileID object { file_id, path, type }`

                      A project-scoped Files API reference resolved separately for each session.

                      - `file_id: string`

                        The ID of the uploaded file.

                        `minLength: 0`

                      - `path: string`

                        The file's absolute path inside the environment.

                        `minLength: 0`

                      - `type: "file_id"`

                        The type of the object. Always `file_id`.

                        - `"file_id"`

                    - `Inline object { path, size_bytes, type }`

                      Metadata for confidential inline file contents.

                      - `path: string`

                        The file's absolute path inside the environment.

                        `minLength: 0`

                      - `size_bytes: number`

                        The decoded size of the inline file in bytes.

                        `format: int64`, `minimum: 0`

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

                      `minItems: 0`, `maxItems: 2000`

                  - `packages: object { npm, python, system }  or null`

                    Package overrides, or null to inherit the template or creation default.

                    - `npm: array of string`

                      npm packages installed globally in the environment.

                      `minItems: 0`, `maxItems: 16384`

                    - `python: array of string`

                      Python packages installed in the environment.

                      `minItems: 0`, `maxItems: 16384`

                    - `system: array of string`

                      System packages installed in the environment.

                      `minItems: 0`, `maxItems: 16384`

                  - `plugins: array of HostedPlugin or null`

                    Plugin overrides, excluding archive contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `description: string`

                      The installed plugin description.

                      `minLength: 0`

                    - `name: string`

                      The installed plugin name.

                      `minLength: 0`

                    - `type: "inline"`

                      The type of the object. Always `inline`.

                      - `"inline"`

                  - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

                    Skill overrides, excluding archive contents, or null to inherit.

                    `minItems: 0`, `maxItems: 2000`

                    - `SkillReference object { skill_id, type, version }`

                      A skill resolved afresh from the Skills API whenever a session starts.

                      - `skill_id: string`

                        The referenced skill ID.

                        `minLength: 0`

                      - `type: "skill_reference"`

                        The type of the object. Always `skill_reference`.

                        - `"skill_reference"`

                      - `version: string or null`

                        The requested version selector, including `latest`.

                        `minLength: 0`

                    - `Inline object { description, name, type }`

                      Safe metadata for an inline skill archive.

                      - `description: string`

                        The skill description declared in `SKILL.md`.

                        `minLength: 0`

                      - `name: string`

                        The skill name declared in `SKILL.md`.

                        `minLength: 0`

                      - `type: "inline"`

                        The type of the object. Always `inline`.

                        - `"inline"`

                  - `type: "openai_hosted"`

                    The type of the object. Always `openai_hosted`.

                    - `"openai_hosted"`

                - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

                  - `capability_directories: array of string`

                    Directories that expose capabilities to the agent.

                    `minItems: 0`, `maxItems: 2000`

                  - `environment_id: string or null`

                    An existing registration, or null to create a session-owned environment.

                    `minLength: 0`

                  - `type: "self_hosted"`

                    The type of the object. Always `self_hosted`.

                    - `"self_hosted"`

                  - `workspace_directory: string`

                    The absolute project directory in the environment.

                    `minLength: 0`

              - `input: array of object { content, role, type }`

                Initial input delivered to each new session.

                `minItems: 0`, `maxItems: 2000`

                - `content: array of InputContent`

                  The content of the message.

                  `minItems: 0`, `maxItems: 2000`

                  - `InputText object { text, type }`

                    Text input recorded in a session item.

                    - `text: string`

                      The text supplied to the agent.

                      `minLength: 0`

                    - `type: "input_text"`

                      The type of the object. Always `input_text`.

                      - `"input_text"`

                  - `InputImage object { image_url, type }`

                    Image input recorded in a session item.

                    - `image_url: string`

                      The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                      `minLength: 0`

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

                `minItems: 0`, `maxItems: 2000`

            - `ExistingSession object { instructions, session_id, type }`

              - `instructions: string`

                Saved instructions delivered as an automation notification.

                `minLength: 0`

              - `session_id: string`

                The session receiving each invocation.

                `minLength: 0`

              - `type: "existing_session"`

                The type of the object. Always `existing_session`.

                - `"existing_session"`

          - `timezone: string`

            The timezone used to interpret the expression.

            `minLength: 0`

          - `type: "periodic"`

            The type of the object. Always `periodic`.

            - `"periodic"`

        - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

          Fields shared by periodic and one-time automations.

          - `id: string`

            The automation ID.

            `minLength: 0`

          - `created_at: number`

            The creation time as a Unix timestamp in seconds.

            `format: int64`

          - `created_by: AutomationCreatedBy`

            Service-recorded provenance; callers cannot supply this field.

          - `metadata: map[string]`

            Custom string key-value pairs attached to the automation.

          - `name: string`

            The automation's display name.

            `minLength: 0`

          - `object: "agent.automation"`

            Always `agent.automation`.

            - `"agent.automation"`

          - `run_at: number`

            The Unix timestamp, in seconds, of the scheduled occurrence.

            `format: int64`

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

      - `type: "automation"`

        The type of the object. Always `automation`.

        - `"automation"`

  - `status: "queued" or "completed" or "failed" or "skipped"`

    Delivery status; completed does not mean the agent's work has finished.

    - `"queued"`

    - `"completed"`

    - `"failed"`

    - `"skipped"`

### Automation Invocation Source

- `AutomationInvocationSource = Manual { type }  or Automation { automation, type }`

  - `Manual object { type }`

    - `type: "manual"`

      The type of the object. Always `manual`.

      - `"manual"`

  - `Automation object { automation, type }`

    - `automation: Automation`

      The automation snapshot for this occurrence, excluding confidential values.

      - `PeriodicAutomation object { id, created_at, created_by, 8 more }`

        Fields shared by periodic and one-time automations.

        - `id: string`

          The automation ID.

          `minLength: 0`

        - `created_at: number`

          The creation time as a Unix timestamp in seconds.

          `format: int64`

        - `created_by: AutomationCreatedBy`

          Service-recorded provenance; callers cannot supply this field.

          - `Developer object { type }`

            - `type: "developer"`

              The type of the object. Always `developer`.

              - `"developer"`

          - `Agent object { session_id, tool_call_id, type }`

            - `session_id: string`

              The creator session, which is also the automation's target.

              `minLength: 0`

            - `tool_call_id: string`

              The tool call that created the automation.

              `minLength: 0`

            - `type: "agent"`

              The type of the object. Always `agent`.

              - `"agent"`

        - `expression: string`

          The cron expression determining scheduled occurrences.

          `minLength: 0`

        - `metadata: map[string]`

          Custom string key-value pairs attached to the automation.

        - `name: string`

          The automation's display name.

          `minLength: 0`

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

                `minLength: 0`

              - `model: string`

                The requested model name.

                `minLength: 0`

              - `multi_agent: MultiAgentConfig`

                The configuration for creating and coordinating subagents.

                - `enabled: boolean`

                  Whether subagent tools are enabled. Defaults to false.

                - `max_concurrent_subagents: number or null`

                  Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

                  `format: int64`, `minimum: 1`, `maximum: 4294967295`

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

                `minItems: 0`, `maxItems: 2000`

                - `Function object { defer_loading, description, name, 2 more }`

                  A function defined by the application.

                  - `defer_loading: boolean`

                    Whether the function is deferred and discovered through tool search.

                  - `description: string`

                    A description of what the function does.

                    `minLength: 0`

                  - `name: string`

                    The name of the function.

                    `minLength: 0`

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

                    `minItems: 0`, `maxItems: 2000`

                  - `connection_origin: "service" or "environment"`

                    Where outbound MCP HTTP connections originate.

                    - `"service"`

                    - `"environment"`

                  - `credential_id: string or null`

                    The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.

                    `minLength: 0`

                  - `request_metadata: map[unknown]`

                    Metadata included with requests to this MCP server.

                  - `required: boolean`

                    Whether this MCP server must initialize before the first turn.

                  - `server_label: string`

                    A label used to identify the MCP server in tool calls.

                    `minLength: 0`

                  - `transport: McpTransport`

                    The transport used to connect to the MCP server.

                    - `HTTP object { server_url, type }`

                      Connects to an MCP server over HTTP.

                      - `server_url: string`

                        The URL of the MCP server.

                        `minLength: 0`

                      - `type: "http"`

                        The type of the object. Always `http`.

                        - `"http"`

                    - `Stdio object { args, command, cwd, 2 more }`

                      Starts an MCP server as a local process.

                      - `args: array of string`

                        Arguments passed to the MCP server command.

                        `minItems: 0`, `maxItems: 2000`

                      - `command: string`

                        The command used to start the MCP server.

                        `minLength: 0`

                      - `cwd: string`

                        The working directory used to start the MCP server.

                        `minLength: 0`

                      - `env_vars: array of string`

                        Environment variable names inherited from the execution environment.

                        `minItems: 0`, `maxItems: 2000`

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

                    `minItems: 0`, `maxItems: 2000`

                  - `context_size: "low" or "medium" or "high"`

                    The amount of search context made available to the model. Defaults to `medium`.

                    - `"low"`

                    - `"medium"`

                    - `"high"`

                  - `location: object { city, country, region, timezone }  or null`

                    Approximate location used to localize search results, if provided.

                    - `city: string or null`

                      The city name.

                      `minLength: 0`

                    - `country: string or null`

                      The two-letter ISO country code, such as `US`.

                      `minLength: 0`

                    - `region: string or null`

                      The region or state name.

                      `minLength: 0`

                    - `timezone: string or null`

                      The IANA timezone, such as `America/Los_Angeles`.

                      `minLength: 0`

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

              - `compaction: optional object { async }`

                The effective context compaction settings.

                - `async: boolean`

                  Whether context is compacted in the background. Defaults to true.

            - `agent_id: string or null`

              The saved agent reference, or null when an inline agent is configured.

              `minLength: 0`

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

                  `minItems: 0`, `maxItems: 2000`

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

                  `minLength: 0`

                - `environment_template_id: string or null`

                  A template reference, or null when no template is selected.

                  `minLength: 0`

                - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }  or null`

                  File overrides, excluding contents, or null to inherit.

                  `minItems: 0`, `maxItems: 2000`

                  - `FileID object { file_id, path, type }`

                    A project-scoped Files API reference resolved separately for each session.

                    - `file_id: string`

                      The ID of the uploaded file.

                      `minLength: 0`

                    - `path: string`

                      The file's absolute path inside the environment.

                      `minLength: 0`

                    - `type: "file_id"`

                      The type of the object. Always `file_id`.

                      - `"file_id"`

                  - `Inline object { path, size_bytes, type }`

                    Metadata for confidential inline file contents.

                    - `path: string`

                      The file's absolute path inside the environment.

                      `minLength: 0`

                    - `size_bytes: number`

                      The decoded size of the inline file in bytes.

                      `format: int64`, `minimum: 0`

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

                    `minItems: 0`, `maxItems: 2000`

                - `packages: object { npm, python, system }  or null`

                  Package overrides, or null to inherit the template or creation default.

                  - `npm: array of string`

                    npm packages installed globally in the environment.

                    `minItems: 0`, `maxItems: 16384`

                  - `python: array of string`

                    Python packages installed in the environment.

                    `minItems: 0`, `maxItems: 16384`

                  - `system: array of string`

                    System packages installed in the environment.

                    `minItems: 0`, `maxItems: 16384`

                - `plugins: array of HostedPlugin or null`

                  Plugin overrides, excluding archive contents, or null to inherit.

                  `minItems: 0`, `maxItems: 2000`

                  - `description: string`

                    The installed plugin description.

                    `minLength: 0`

                  - `name: string`

                    The installed plugin name.

                    `minLength: 0`

                  - `type: "inline"`

                    The type of the object. Always `inline`.

                    - `"inline"`

                - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }  or null`

                  Skill overrides, excluding archive contents, or null to inherit.

                  `minItems: 0`, `maxItems: 2000`

                  - `SkillReference object { skill_id, type, version }`

                    A skill resolved afresh from the Skills API whenever a session starts.

                    - `skill_id: string`

                      The referenced skill ID.

                      `minLength: 0`

                    - `type: "skill_reference"`

                      The type of the object. Always `skill_reference`.

                      - `"skill_reference"`

                    - `version: string or null`

                      The requested version selector, including `latest`.

                      `minLength: 0`

                  - `Inline object { description, name, type }`

                    Safe metadata for an inline skill archive.

                    - `description: string`

                      The skill description declared in `SKILL.md`.

                      `minLength: 0`

                    - `name: string`

                      The skill name declared in `SKILL.md`.

                      `minLength: 0`

                    - `type: "inline"`

                      The type of the object. Always `inline`.

                      - `"inline"`

                - `type: "openai_hosted"`

                  The type of the object. Always `openai_hosted`.

                  - `"openai_hosted"`

              - `SelfHosted object { capability_directories, environment_id, type, workspace_directory }`

                - `capability_directories: array of string`

                  Directories that expose capabilities to the agent.

                  `minItems: 0`, `maxItems: 2000`

                - `environment_id: string or null`

                  An existing registration, or null to create a session-owned environment.

                  `minLength: 0`

                - `type: "self_hosted"`

                  The type of the object. Always `self_hosted`.

                  - `"self_hosted"`

                - `workspace_directory: string`

                  The absolute project directory in the environment.

                  `minLength: 0`

            - `input: array of object { content, role, type }`

              Initial input delivered to each new session.

              `minItems: 0`, `maxItems: 2000`

              - `content: array of InputContent`

                The content of the message.

                `minItems: 0`, `maxItems: 2000`

                - `InputText object { text, type }`

                  Text input recorded in a session item.

                  - `text: string`

                    The text supplied to the agent.

                    `minLength: 0`

                  - `type: "input_text"`

                    The type of the object. Always `input_text`.

                    - `"input_text"`

                - `InputImage object { image_url, type }`

                  Image input recorded in a session item.

                  - `image_url: string`

                    The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                    `minLength: 0`

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

              `minItems: 0`, `maxItems: 2000`

          - `ExistingSession object { instructions, session_id, type }`

            - `instructions: string`

              Saved instructions delivered as an automation notification.

              `minLength: 0`

            - `session_id: string`

              The session receiving each invocation.

              `minLength: 0`

            - `type: "existing_session"`

              The type of the object. Always `existing_session`.

              - `"existing_session"`

        - `timezone: string`

          The timezone used to interpret the expression.

          `minLength: 0`

        - `type: "periodic"`

          The type of the object. Always `periodic`.

          - `"periodic"`

      - `OneTimeAutomation object { id, created_at, created_by, 7 more }`

        Fields shared by periodic and one-time automations.

        - `id: string`

          The automation ID.

          `minLength: 0`

        - `created_at: number`

          The creation time as a Unix timestamp in seconds.

          `format: int64`

        - `created_by: AutomationCreatedBy`

          Service-recorded provenance; callers cannot supply this field.

        - `metadata: map[string]`

          Custom string key-value pairs attached to the automation.

        - `name: string`

          The automation's display name.

          `minLength: 0`

        - `object: "agent.automation"`

          Always `agent.automation`.

          - `"agent.automation"`

        - `run_at: number`

          The Unix timestamp, in seconds, of the scheduled occurrence.

          `format: int64`

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

    - `type: "automation"`

      The type of the object. Always `automation`.

      - `"automation"`
