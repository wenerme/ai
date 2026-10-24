## Update an automation

**post** `/agents/automations/{automation_id}`

Updates supplied fields; target and metadata replace the whole field.

### Path Parameters

- `automation_id: string`

### Body Parameters

- `expression: optional string`

  Only accepted for periodic automations.

- `metadata: optional map[string]`

  Replaces all metadata; omit to leave unchanged.

- `name: optional string`

- `run_at: optional number`

  A future Unix timestamp in seconds; accepted only before a one-time scheduled invocation exists.

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

        - `environment_template_id: optional string`

          A reusable hosted template applied before inline session configuration. Omitted fields inherit the template; network overrides cannot broaden its policy.

        - `files: optional array of HostedEnvironmentFileParam or null`

          Files available before the agent starts. Defaults to an empty list.

          - `FileID object { file_id, path, type }`

            A file previously uploaded through the OpenAI Files API.

            - `file_id: string`

              The ID of the uploaded file.

            - `path: string`

              The absolute destination path inside `/workspace`.

            - `type: "file_id"`

              The type of the object. Always `file_id`.

              - `"file_id"`

          - `Inline object { data, path, type }`

            A file supplied directly as standard-base64 data.

            - `data: string`

              The standard-base64-encoded file contents.

            - `path: string`

              The absolute destination path inside `/workspace`.

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

          - `blocked_domains: optional array of string or null`

            Domains blocked for both executor and browser when access is restricted. A nonempty list requires `access: restricted` and cannot be combined with nonempty `allowed_domains`. Wildcard domains are not supported.

        - `packages: optional object { npm, python, system }  or null`

          Packages to install in the environment. Defaults to empty package lists.

          - `npm: optional array of string or null`

            npm packages to install globally. Defaults to an empty list.

          - `python: optional array of string or null`

            Python packages to install. Defaults to an empty list.

          - `system: optional array of string or null`

            System packages to install. Defaults to an empty list.

        - `plugins: optional array of HostedPluginParam or null`

          Plugins provided as inline ZIP archives. Defaults to an empty list.

          - `description: string`

            The plugin description declared in `.codex-plugin/plugin.json`.

          - `name: string`

            The plugin name declared in `.codex-plugin/plugin.json`.

          - `source: InlineCapabilitySourceParam`

            Provides ZIP bytes encoded with standard base64.

            - `data: string`

              Standard-base64 encoded ZIP archive bytes.

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

          - `command: string`

            The shell command to execute.

          - `cwd: optional string or null`

            The absolute working directory. Defaults to `/workspace`.

        - `skills: optional array of HostedSkillParam or null`

          Skills referenced by ID or provided as inline ZIP archives. Defaults to an empty list.

          - `SkillReference object { skill_id, type, version }`

            References a skill uploaded through the Skills API.

            - `skill_id: string`

              The ID of the skill created through `/v1/skills`.

            - `type: "skill_reference"`

              The type of the object. Always `skill_reference`.

              - `"skill_reference"`

            - `version: optional string or null`

              The skill version, a positive integer or `latest`; omission selects the default.

          - `Inline object { description, name, source, type }`

            Supplies a skill ZIP directly in the session request.

            - `description: string`

              The skill description declared in `SKILL.md`.

            - `name: string`

              The skill name declared in `SKILL.md`.

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

        - `capability_directories: optional array of string or null`

          Directories that contain capabilities exposed to the agent. Defaults to an empty list.

    - `input: array of AgentSessionInputMessageParam`

      Initial user messages submitted with each new session.

      - `content: array of InputContentParam`

        The content of the message.

        - `InputText object { text, type }`

          Text input to the model.

          - `text: string`

            The text sent to the model.

          - `type: "input_text"`

            The type of the object. Always `input_text`.

            - `"input_text"`

        - `InputImage object { image_url, type }`

          Image input to the model.

          - `image_url: string`

            The URL of the image sent to the model.

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

    - `agent: optional object { instructions, model, multi_agent, 4 more }`

      Inline agent configuration. Provide exactly one of agent and agent_id.

      - `instructions: optional string or null`

        Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.

      - `model: optional string`

        The model to use for the agent. The requested model name is preserved.

      - `multi_agent: optional MultiAgentConfigParam or null`

        Configuration for creating and coordinating subagents.

        - `enabled: boolean`

          Whether subagent tools are enabled.

        - `max_concurrent_subagents: optional number`

          Maximum number of subagents that may run concurrently. Defaults to 6.

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

        - `Function object { description, name, parameters, 2 more }`

          A function defined by the application.

          - `description: string`

            A description of what the function does.

          - `name: string`

            The name of the function.

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

          - `transport: McpTransportParam`

            The transport used to connect to the MCP server.

            - `HTTP object { server_url, type, authorization, headers }`

              Connects to an MCP server over HTTP.

              - `server_url: string`

                The URL of the MCP server.

              - `type: "http"`

                The type of the object. Always `http`.

                - `"http"`

              - `authorization: optional string or null`

                The authorization value sent to the MCP server, if any.

              - `headers: optional map[string] or null`

                Additional HTTP headers sent to the MCP server.

            - `Stdio object { command, cwd, type, 3 more }`

              Starts an MCP server as a local process.

              - `command: string`

                The command used to start the MCP server.

              - `cwd: string`

                The working directory used to start the MCP server.

              - `type: "stdio"`

                The type of the object. Always `stdio`.

                - `"stdio"`

              - `args: optional array of string or null`

                Arguments passed to the MCP server command.

              - `env: optional map[string] or null`

                Environment variables set for the MCP server process.

              - `env_vars: optional array of string or null`

                Environment variable names to inherit from the selected execution environment.

          - `type: "mcp"`

            The type of the object. Always `mcp`.

            - `"mcp"`

          - `allowed_tools: optional array of string or null`

            The MCP tools the agent may call. All server tools are allowed when omitted.

          - `connection_origin: optional "service" or "environment" or null`

            Selects where outbound MCP HTTP connections originate. Omitted or `service` uses the Managed Agents service network; `environment` uses the session's selected environment.

            - `"service"`

              Uses the Managed Agents service network.

            - `"environment"`

              Uses the session's execution environment.

          - `credential_id: optional string or null`

            The attached vault credential used to authenticate this MCP server. Optional when exactly one attached credential matches the server URL.

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

          - `context_size: optional "low" or "medium" or "high" or null`

            The amount of search context made available to the model. Defaults to `medium`.

            - `"low"`

            - `"medium"`

            - `"high"`

          - `location: optional object { city, country, region, timezone }  or null`

            Approximate location used to localize search results.

            - `city: optional string or null`

              The city name.

            - `country: optional string or null`

              The two-letter ISO country code, such as `US`.

            - `region: optional string or null`

              The region or state name.

            - `timezone: optional string or null`

              The IANA timezone, such as `America/Los_Angeles`.

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

    - `metadata: optional map[string] or null`

      Metadata attached to each new session.

    - `vault_ids: optional array of string or null`

      The IDs of vaults made available to each new session.

  - `ExistingSession object { instructions, session_id, type }`

    Deliver instructions to an existing session.

    - `instructions: string`

      Instructions delivered as an automation notification.

    - `session_id: string`

      The session receiving each invocation.

    - `type: "existing_session"`

      The type of the object. Always `existing_session`.

      - `"existing_session"`

- `timezone: optional string`

  Only accepted for periodic automations.

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
