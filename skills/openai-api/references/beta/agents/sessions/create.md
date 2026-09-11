## Create an agent session

**post** `/agents/sessions`

Creates a managed agent session, optionally submits initial input, and returns the session or streams its events when stream is true. See [running sessions](/api/docs/guides/agents-api/sessions).

### Body Parameters

- `environment: EnvironmentParam`

  An inline execution environment or a reference to an environment template.

  - `None object { type }`

    Runs the agent without an execution environment.

    - `type: "none"`

      The type of the object. Always `none`.

      - `"none"`

  - `OpenAIHosted object { type, capability_directories, env, 7 more }`

    An OpenAI-hosted environment, optionally based on a reusable template.

    - `type: "openai_hosted"`

      The type of the object. Always `openai_hosted`.

      - `"openai_hosted"`

    - `capability_directories: optional array of string or null`

      Directories that contain capabilities exposed to the agent. Defaults to an empty list.

    - `env: optional map[string] or null`

      Environment variables made available to the agent.

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

    - `network: optional object { access, allowed_domains }  or null`

      Network access for an OpenAI-hosted environment.

      - `access: "enabled" or "disabled" or "restricted"`

        The environment's network access mode.

        - `"enabled"`

          Allows unrestricted network access, matching an omitted network policy.

        - `"disabled"`

          Disables network access.

        - `"restricted"`

          Allows access only to configured domains.

      - `allowed_domains: optional array of string or null`

        Domains the environment may access when network access is restricted.

    - `packages: optional object { npm, python, system }  or null`

      Packages to install in an OpenAI-hosted environment.

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

- `agent: optional object { instructions, model, multi_agent, 4 more }`

  Agent configuration. With `agent_id`, supplied fields override the saved agent for this session. Without `agent_id`, `model` is required.

  - `instructions: optional string or null`

    Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.

  - `model: optional string`

    The model to use for the agent. The requested model name is preserved.

  - `multi_agent: optional MultiAgentConfigParam or null`

    Explicit configuration for creating and coordinating subagents.

    - `enabled: boolean`

      Whether subagent tools are enabled.

    - `max_concurrent_subagents: optional number`

      Maximum number of subagents that may run concurrently. Defaults to 6.

  - `reasoning: optional AgentReasoningParam or null`

    Reasoning configuration for the agent.

    - `effort: optional "none" or "minimal" or "low" or 4 more or null`

      The amount of reasoning effort the model should use.

      - `"none"`

      - `"minimal"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"xhigh"`

      - `"max"`

    - `summary: optional "concise" or "detailed" or "auto" or null`

      The reasoning summary format requested from the model.

      - `"concise"`

        Returns a concise reasoning summary when supported.

      - `"detailed"`

        Returns a detailed reasoning summary when supported.

      - `"auto"`

        Automatically selects the most detailed summary supported by the model.

  - `service_tier: optional "auto" or "default" or "flex" or 2 more or null`

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

  - `text: optional AgentTextParam or null`

    Configuration for text generated by the agent.

    - `format: optional TextFormatParam or null`

      The output format for generated text.

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

      The amount of text the model should produce.

      - `"low"`

        Produces less text.

      - `"medium"`

        Uses the default amount of text.

      - `"high"`

        Produces more text.

  - `tools: optional array of AgentToolParam or null`

    Tools available to the agent. Omit to inherit, or pass null to clear them.

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

        Where outbound MCP HTTP connections originate.

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

        The amount of web search context made available to the model.

        - `"low"`

        - `"medium"`

        - `"high"`

      - `location: optional object { city, country, region, timezone }  or null`

        Approximate user location used to localize web search results.

        - `city: optional string or null`

          The city name.

        - `country: optional string or null`

          The two-letter ISO country code, such as `US`.

        - `region: optional string or null`

          The region or state name.

        - `timezone: optional string or null`

          The IANA timezone, such as `America/Los_Angeles`.

      - `mode: optional "disabled" or "cached" or "live" or null`

        The source used for web search results.

        - `"disabled"`

          Disables web search.

        - `"cached"`

          Uses cached search results.

        - `"live"`

          Searches the live web.

- `agent_id: optional string`

  The ID of a saved reusable agent. Omit `agent` to use its configuration unchanged.

- `input: optional string or array of AgentSessionInputMessageParam or null`

  Initial input submitted when creating a session.

  - `string`

  - `array of AgentSessionInputMessageParam`

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

- `metadata: optional map[string] or null`

  Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters. Omission or null defaults to an empty map.

- `stream: optional boolean`

  Whether to stream session events as server-sent events. Defaults to `false`.

- `vault_ids: optional array of string or null`

  The IDs of vaults made available to the session.

### Returns

- `AgentSession object { id, agent, created_at, 9 more }`

  A Managed Agents session.

  - `id: string`

    The ID of the session.

  - `agent: object { id, instructions, model, 6 more }`

    The agent running in the session.

    - `id: string`

      The ID of the agent.

    - `instructions: string or null`

      Custom instructions appended to the agent's default base instructions.

    - `model: string`

      The model used by the agent.

    - `multi_agent: MultiAgentConfig`

      Configuration for creating and coordinating subagents.

      - `enabled: boolean`

        Whether subagent tools are enabled. Defaults to false.

      - `max_concurrent_subagents: number or null`

        Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

    - `name: string or null`

      The reusable agent's name when the session was created, or null if no name was saved. Later changes to the agent's name do not affect this value.

    - `reasoning: AgentReasoning`

      The agent's reasoning configuration.

      - `effort: "none" or "minimal" or "low" or 4 more or null`

        The amount of reasoning effort used by an agent.

        - `"none"`

        - `"minimal"`

        - `"low"`

        - `"medium"`

        - `"high"`

        - `"xhigh"`

        - `"max"`

      - `summary: "concise" or "detailed" or "auto" or null`

        The reasoning summary format requested from an agent.

        - `"concise"`

          Returns a concise reasoning summary when supported.

        - `"detailed"`

          Returns a detailed reasoning summary when supported.

        - `"auto"`

          Automatically selects the most detailed summary supported by the model.

    - `service_tier: "auto" or "default" or "flex" or 2 more`

      The effective service-tier policy for model requests. Defaults to `auto`.

      - `"auto"`

      - `"default"`

      - `"flex"`

      - `"priority"`

      - `"fast"`

    - `text: AgentText`

      Configuration for text generated by the agent.

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

      Tools available to the agent.

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

          Approximate user location used to localize web search results.

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

  - `created_at: number`

    The Unix timestamp, in seconds, when the session was created.

  - `environment: Environment`

    The execution environment for the session.

    - `None object { type }`

      The session talks to CCA without selecting or provisioning an execution environment.

      - `type: "none"`

        The type of the object. Always `none`.

        - `"none"`

    - `OpenAIHosted object { id, capability_directories, files, 5 more }`

      An environment hosted by OpenAI.

      - `id: string`

        The public ID of the environment.

      - `capability_directories: array of string`

        Directories that contain capabilities exposed to the agent.

      - `files: array of HostedEnvironmentFile`

        Files available in the environment, excluding their contents.

        - `HostedEnvironmentFileID object { id, file_id, path, 2 more }`

          A file copied from the OpenAI Files API.

          - `id: string`

            The session-scoped ID of the file in the execution environment.

          - `file_id: string`

            The ID of the uploaded file.

          - `path: string`

            The file's absolute path inside the environment.

          - `size_bytes: number`

            The decoded file size in bytes.

          - `type: "file_id"`

            The type of the object. Always `file_id`.

            - `"file_id"`

        - `Inline object { id, path, size_bytes, type }`

          A file supplied inline when the session was created.

          - `id: string`

            The session-scoped ID of the file in the execution environment.

          - `path: string`

            The file's absolute path inside the environment.

          - `size_bytes: number`

            The decoded file size in bytes.

          - `type: "inline"`

            The type of the object. Always `inline`.

            - `"inline"`

      - `network: object { access, allowed_domains }`

        The effective network access policy for the environment.

        - `access: "enabled" or "disabled" or "restricted"`

          The environment's network access mode.

          - `"enabled"`

            Allows unrestricted network access.

          - `"disabled"`

            Disables network access.

          - `"restricted"`

            Allows access only to configured domains.

        - `allowed_domains: array of string`

          Domains the environment may access when network access is restricted.

      - `packages: object { npm, python, system }`

        Packages installed in the environment.

        - `npm: array of string`

          npm packages installed globally in the environment.

        - `python: array of string`

          Python packages installed in the environment.

        - `system: array of string`

          System packages installed in the environment.

      - `plugins: array of HostedPlugin`

        Plugins installed in the environment, excluding their archive contents.

        - `description: string`

          The installed plugin description.

        - `name: string`

          The installed plugin name.

        - `type: "inline"`

          The type of the object. Always `inline`.

          - `"inline"`

      - `skills: array of HostedSkill`

        Skills installed in the environment, excluding their archive contents.

        - `HostedSkillReference object { description, name, skill_id, 2 more }`

          A skill installed from the Skills API.

          - `description: string`

            The installed skill description.

          - `name: string`

            The installed skill name.

          - `skill_id: string`

            The referenced skill ID.

          - `type: "skill_reference"`

            The type of the object. Always `skill_reference`.

            - `"skill_reference"`

          - `version: string`

            The concrete skill version installed for this session.

        - `Inline object { description, name, type }`

          A skill installed from an inline ZIP archive.

          - `description: string`

            The installed skill description.

          - `name: string`

            The installed skill name.

          - `type: "inline"`

            The type of the object. Always `inline`.

            - `"inline"`

      - `type: "openai_hosted"`

        The type of the object. Always `openai_hosted`.

        - `"openai_hosted"`

    - `SelfHosted object { id, capability_directories, remote_url, 2 more }`

      An environment hosted by the application.

      - `id: string`

        The public ID of the environment.

      - `capability_directories: array of string`

        Directories that contain capabilities exposed to the agent.

      - `remote_url: string`

        Pass this URL unchanged to `codex exec-server --remote` when connecting this environment.

      - `type: "self_hosted"`

        The type of the object. Always `self_hosted`.

        - `"self_hosted"`

      - `workspace_directory: string`

        The absolute project directory inside the environment. Defaults to `/workspace`.

  - `error: string or null`

    The error that caused the session to fail, if any.

  - `last_active_at: number`

    The Unix timestamp, in seconds, when the session was last active.

  - `metadata: map[string]`

    Custom string key-value pairs attached to the session.

  - `object: "agent.session"`

    The object type. Always `agent.session`.

    - `"agent.session"`

  - `required_actions: array of object { arguments, call_id, name, 2 more }  or object { environment_id, type }`

    Actions that must be completed before the session can continue.

    - `FunctionCall object { arguments, call_id, name, 2 more }`

      Run a function tool and submit its result.

      - `arguments: unknown`

        The arguments supplied by the model.

      - `call_id: string`

        The ID to include when submitting the function result.

      - `name: string`

        The function name.

      - `turn_id: string`

        The ID of the turn that requested the function call.

      - `type: "function_call"`

        The type of the object. Always `function_call`.

        - `"function_call"`

    - `EnvironmentConnection object { environment_id, type }`

      Reconnect a session environment.

      - `environment_id: string`

        The ID of the environment to reconnect.

      - `type: "environment_connection"`

        The type of the object. Always `environment_connection`.

        - `"environment_connection"`

  - `status: "idle" or "in_progress" or "requires_action" or "failed"`

    The current status of the session.

    - `"idle"`

      The session has no turn in progress and is ready for input. A hosted environment may still be provisioning.

    - `"in_progress"`

      The session is processing a turn.

    - `"requires_action"`

      The session is waiting for one or more required actions.

    - `"failed"`

      The session failed.

  - `usage: TokenUsage or null`

    Recorded token usage for a session or turn. Usage is best effort and may change.

    - `input_tokens: number`

      The number of input tokens used by the agent.

    - `input_tokens_details: object { cached_tokens }`

      A breakdown of the agent's input token usage.

      - `cached_tokens: number`

        The number of input tokens retrieved from the prompt cache.

    - `output_tokens: number`

      The number of output tokens generated by the agent.

    - `output_tokens_details: object { reasoning_tokens }`

      A breakdown of the agent's output token usage.

      - `reasoning_tokens: number`

        The number of output tokens used for reasoning.

    - `total_tokens: number`

      The total number of input and output tokens used by the agent.

  - `vault_ids: array of string`

    The IDs of vaults made available to the session.

### Example

```http
curl https://api.openai.com/v1/agents/sessions \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "environment": {
            "type": "none"
          }
        }'
```

#### Response

```json
{
  "id": "id",
  "agent": {
    "id": "id",
    "instructions": "instructions",
    "model": "model",
    "multi_agent": {
      "enabled": true,
      "max_concurrent_subagents": 1
    },
    "name": "name",
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
  "created_at": 0,
  "environment": {
    "type": "none"
  },
  "error": "error",
  "last_active_at": 0,
  "metadata": {
    "foo": "string"
  },
  "object": "agent.session",
  "required_actions": [
    {
      "arguments": {},
      "call_id": "call_id",
      "name": "name",
      "turn_id": "turn_id",
      "type": "function_call"
    }
  ],
  "status": "idle",
  "usage": {
    "input_tokens": 0,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens": 0,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 0
  },
  "vault_ids": [
    "string"
  ]
}
```
