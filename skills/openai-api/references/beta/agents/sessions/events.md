# Events

## Create agent session input events

**post** `/agents/sessions/{session_id}/events`

Submits message, cancellation, tool-result, or computer-use approval-response events to a managed agent session. Cancellation can recover a still-open turn whose backend execution has ended by marking it cancelled and abandoning unpublished outputs. Saved results, published files, and existing terminal outcomes are preserved. HTTP 202 confirms acceptance, not durable completion. See [session events](/api/docs/guides/agents-api/sessions/events).

### Header Parameters

- `"Idempotency-Key": optional string`

  `minLength: 1`, `maxLength: 256`

### Path Parameters

- `session_id: string`

  The ID of the session.

  `minLength: 0`, `maxLength: 1048576`

### Body Parameters

- `events: array of AgentSessionInputParam`

  The input events to submit to the session.

  `minItems: 0`, `maxItems: 16384`

  - `AgentSessionInputComputerUseApprovalRequestResult object { request_id, response, type }`

    Responds to a pending Computer Use approval request.

    - `request_id: string`

      The registered request ID from the required action.

      `minLength: 0`, `maxLength: 1048576`

    - `response: AgentBrowserAuthenticationSubmitParam or AgentBrowserAuthenticationCancelParam or AgentBrowserOriginAccessParam`

      The response for this request type.

      - `AgentBrowserAuthenticationSubmitParam object { action, fields, type, selected_option }`

        - `action: "submit" (default: "submit")`

          - `"submit"`

        - `fields: array of object { field_id, value }`

          Values for up to six active fields in the required action. The submitted field-value mapping and selected option must fit within 120 KiB of JSON.

          `minItems: 0`, `maxItems: 6`

          - `field_id: string`

            The field ID from the required action.

            `minLength: 0`, `maxLength: 1048576`

          - `value: string`

            The value to enter into the registered control.

            `minLength: 0`, `maxLength: 16384`

        - `type: "browser_authentication" (default: "browser_authentication")`

          - `"browser_authentication"`

        - `selected_option: optional string or null`

          The chosen method. Required when the required action contains options.

          `minLength: 0`, `maxLength: 1048576`

      - `AgentBrowserAuthenticationCancelParam object { action, type }`

        - `action: "cancel" (default: "cancel")`

          - `"cancel"`

        - `type: "browser_authentication" (default: "browser_authentication")`

          - `"browser_authentication"`

      - `AgentBrowserOriginAccessParam object { decision, type }`

        - `decision: "approve" or "deny" or "cancel"`

          Whether to allow, deny, or cancel the requested origin access.

          - `"approve"`

            Allow the browser to access this origin.

          - `"deny"`

            Deny access to this origin.

          - `"cancel"`

            Dismiss this request without approving access.

        - `type: "browser_origin_access" (default: "browser_origin_access")`

          - `"browser_origin_access"`

    - `type: "agent.session.input.computer_use_approval_request_result" (default: "agent.session.input.computer_use_approval_request_result")`

      The type of the object. Always `agent.session.input.computer_use_approval_request_result`.

      - `"agent.session.input.computer_use_approval_request_result"`

  - `AgentSessionInputMessage object { input, type }`

    Adds one or more user messages and starts a turn.

    - `input: array of AgentSessionInputMessageParam`

      The user messages to add to the session.

      `minItems: 0`, `maxItems: 16384`

      - `content: array of InputContentParam`

        The content of the message.

        `minItems: 0`, `maxItems: 16384`

        - `InputText object { text, type }`

          Text input to the model.

          - `text: string`

            The text sent to the model.

            `minLength: 0`, `maxLength: 1048576`

          - `type: "input_text" (default: "input_text")`

            The type of the object. Always `input_text`.

            - `"input_text"`

        - `InputImage object { image_url, type }`

          Image input to the model.

          - `image_url: string`

            The URL of the image sent to the model.

            `minLength: 0`, `maxLength: 1048576`

          - `type: "input_image" (default: "input_image")`

            The type of the object. Always `input_image`.

            - `"input_image"`

      - `role: "user" (default: "user")`

        The role of the message author. Always `user`.

        - `"user"`

      - `type: optional "message" (default: "message")`

        The type of the input item. Always `message`.

        - `"message"`

    - `type: "agent.session.input.message" (default: "agent.session.input.message")`

      The type of the object. Always `agent.session.input.message`.

      - `"agent.session.input.message"`

  - `AgentSessionInputCancel object { type }`

    Cancels the session's active turn.

    - `type: "agent.session.input.cancel" (default: "agent.session.input.cancel")`

      The type of the object. Always `agent.session.input.cancel`.

      - `"agent.session.input.cancel"`

  - `AgentSessionInputToolResult object { call_id, success, turn_id, 3 more }`

    Submits the result of a function call.

    - `call_id: string`

      The ID of the function call.

      `minLength: 0`, `maxLength: 1048576`

    - `success: boolean`

      Whether the function call succeeded.

    - `turn_id: string`

      The ID of the turn that requested the function call.

      `minLength: 0`, `maxLength: 1048576`

    - `type: "agent.session.input.tool_result" (default: "agent.session.input.tool_result")`

      The type of the object. Always `agent.session.input.tool_result`.

      - `"agent.session.input.tool_result"`

    - `error: optional string or null`

      The error message when the call failed.

      `minLength: 0`, `maxLength: 1048576`

    - `output: optional AgentFunctionCallOutputParam or null`

      The function result when the call succeeded.

      - `string`

        `minLength: 0`, `maxLength: 1048576`

      - `array of InputContentParam`

        `minItems: 0`, `maxItems: 16384`

        - `InputText object { text, type }`

          Text input to the model.

        - `InputImage object { image_url, type }`

          Image input to the model.

### Example

```http
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID/events \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "events": [
            {
              "request_id": "request_id",
              "response": {
                "action": "submit",
                "fields": [
                  {
                    "field_id": "field_id",
                    "value": "value"
                  }
                ],
                "type": "browser_authentication"
              },
              "type": "agent.session.input.computer_use_approval_request_result"
            }
          ]
        }'
```

## Stream agent session events

**get** `/agents/sessions/{session_id}/events`

Streams live events for an agent session. See [session events](/api/docs/guides/agents-api/sessions/events).

### Path Parameters

- `session_id: string`

  The ID of the session.

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `AgentSessionEvent = AgentSessionErrorEvent or AgentSessionEnvironmentReadyEvent or AgentSessionEnvironmentSuspendedEvent or 30 more`

  An event emitted by a Managed Agents session.

  - `AgentSessionErrorEvent object { error, event_id, session_id, type }`

    Emitted when a turn or session fails.

    - `error: SessionError`

      The error that occurred.

      - `code: string or null`

        The machine-readable error code, if any.

        `minLength: 0`

      - `message: string`

        A customer-safe explanation of the error.

        `minLength: 0`

      - `param: string or null`

        The request parameter associated with the error, if any.

        `minLength: 0`

      - `type: string`

        The error type.

        `minLength: 0`

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `type: "error" (default: "error")`

      The type of the object. Always `error`.

      - `"error"`

  - `AgentSessionEnvironmentReadyEvent object { environment, event_id, session_id, 2 more }`

    Emitted when a hosted session environment is ready to connect.

    - `environment: AgentSessionEnvironmentState`

      The current environment state.

      - `id: string`

        The public ID of the environment.

        `minLength: 0`

      - `error: object { code, message, type }  or null`

        The error reported while preparing the environment, if any.

        - `code: string`

          A machine-readable error code.

          `minLength: 0`

        - `message: string`

          A human-readable error message.

          `minLength: 0`

        - `type: string`

          The error type.

          `minLength: 0`

      - `status: "pending" or "ready" or "connected" or 4 more`

        The environment's connection status.

        - `"pending"`

          The environment is being prepared.

        - `"ready"`

          The environment is ready to connect.

        - `"connected"`

          The environment is connected.

        - `"disconnected"`

          The environment is disconnected.

        - `"suspended"`

          The environment is stopped and can be resumed from its private checkpoint.

        - `"expired"`

          The environment and its private checkpoint have expired.

        - `"failed"`

          The environment failed to connect.

      - `type: string`

        The environment type.

        `minLength: 0`

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.environment.ready" (default: "agent.session.environment.ready")`

      The type of the object. Always `agent.session.environment.ready`.

      - `"agent.session.environment.ready"`

  - `AgentSessionEnvironmentSuspendedEvent object { environment, event_id, session_id, 2 more }`

    Emitted after an idle hosted session environment is checkpointed and stopped.

    - `environment: AgentSessionEnvironmentState`

      The current environment state.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.environment.suspended" (default: "agent.session.environment.suspended")`

      The type of the object. Always `agent.session.environment.suspended`.

      - `"agent.session.environment.suspended"`

  - `AgentSessionEnvironmentExpiredEvent object { environment, event_id, session_id, 2 more }`

    Emitted after a suspended hosted session environment and its checkpoint expire.

    - `environment: AgentSessionEnvironmentState`

      The current environment state.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.environment.expired" (default: "agent.session.environment.expired")`

      The type of the object. Always `agent.session.environment.expired`.

      - `"agent.session.environment.expired"`

  - `AgentSessionEnvironmentResetEvent object { environment_id, event_id, reset_count, 3 more }`

    Emitted after a hosted sandbox is replaced. Conversation history survives; changes to the previous sandbox's files and processes do not.

    - `environment_id: string`

      The stable environment ID, retained across sandbox replacements.

      `minLength: 0`

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `reset_count: integer`

      Monotonically increasing reset number. Repeated notifications share this number.

      `format: int64`, `minimum: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The associated turn, when applicable.

      `minLength: 0`

    - `type: "agent.session.environment.reset" (default: "agent.session.environment.reset")`

      The type of the object. Always `agent.session.environment.reset`.

      - `"agent.session.environment.reset"`

  - `AgentOutputCommandExecutionOutputDeltaEvent object { delta, event_id, item_id, 4 more }`

    Emitted when command execution produces an output delta.

    - `delta: string`

      The output text that was appended.

      `minLength: 0`

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `item_id: string`

      The ID of the command execution item.

      `minLength: 0`

    - `output_index: integer`

      The index of the item in the turn output.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.output.command_execution_output.delta" (default: "agent.output.command_execution_output.delta")`

      The type of the object. Always `agent.output.command_execution_output.delta`.

      - `"agent.output.command_execution_output.delta"`

  - `AgentSessionCreatedEvent object { event_id, session, type }`

    Emitted when a session is created.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session: AgentSession`

      The session that was created.

      - `id: string`

        The ID of the session.

        `minLength: 0`

      - `agent: object { id, instructions, model, 8 more }`

        The agent running in the session.

        - `id: string`

          The ID of the agent.

          `minLength: 0`

        - `instructions: string or null`

          Custom instructions appended to the agent's default base instructions.

          `minLength: 0`

        - `model: string`

          The model used by the agent.

          `minLength: 0`

        - `multi_agent: MultiAgentConfig`

          Configuration for creating and coordinating subagents.

          - `enabled: boolean`

            Whether subagent tools are enabled. Defaults to false.

          - `max_concurrent_subagents: integer or null`

            Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.

            `format: int64`, `minimum: 1`, `maximum: 4294967295`

        - `name: string or null`

          The reusable agent's name when the session was created, or null if no name was saved. Later changes to the agent's name do not affect this value.

          `minLength: 0`

        - `reasoning: AgentReasoning`

          The agent's reasoning configuration.

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

          The effective service-tier policy for model requests. Defaults to `auto`.

          - `"auto"`

          - `"default"`

          - `"flex"`

          - `"priority"`

          - `"fast"`

          - `"ultrafast"`

        - `text: AgentText`

          Configuration for text generated by the agent.

          - `format: TextFormat`

            The effective output format. Defaults to ordinary text.

            - `Text object { type }`

              Generates ordinary text without a structured-output constraint.

              - `type: "text" (default: "text")`

                The type of the object. Always `text`.

                - `"text"`

            - `JSONSchema object { schema, type }`

              Constrains generated text to a JSON Schema.

              - `schema: map[unknown]`

                The JSON Schema that generated text must match.

              - `type: "json_schema" (default: "json_schema")`

                The type of the object. Always `json_schema`.

                - `"json_schema"`

          - `verbosity: "low" or "medium" or "high"`

            The amount of text produced by the agent. Defaults to `medium`.

            - `"low"`

            - `"medium"`

            - `"high"`

        - `tools: array of AgentTool`

          Tools available to the agent.

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

            - `type: "function" (default: "function")`

              The type of the object. Always `function`.

              - `"function"`

          - `ProgrammaticToolCalling object { enabled, type }`

            Enables calling tools from model-generated code.

            - `enabled: boolean`

              Whether tools can be called from model-generated code.

            - `type: "programmatic_tool_calling" (default: "programmatic_tool_calling")`

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

                - `type: "http" (default: "http")`

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

                - `type: "stdio" (default: "stdio")`

                  The type of the object. Always `stdio`.

                  - `"stdio"`

            - `type: "mcp" (default: "mcp")`

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

            - `type: "web_search" (default: "web_search")`

              The type of the object. Always `web_search`.

              - `"web_search"`

          - `ComputerUse object { include_screenshots, type }`

            Browser use in an OpenAI-hosted session.

            - `include_screenshots: boolean`

              Whether computer tool outputs include screenshots.

            - `type: "computer_use" (default: "computer_use")`

              The type of the object. Always `computer_use`.

              - `"computer_use"`

          - `Automations object { type }`

            Lets the agent manage its own scheduled wakeups.

            - `type: "automations" (default: "automations")`

              The type of the object. Always `automations`.

              - `"automations"`

        - `compaction: optional object { async }`

          The effective context compaction settings.

          - `async: boolean`

            Whether context is compacted in the background. Defaults to true.

        - `experimental: optional object { time_awareness }`

          The effective experimental settings for the agent.

          - `time_awareness: boolean`

            Whether the model receives periodic current-time reminders.

      - `created_at: integer`

        The Unix timestamp, in seconds, when the session was created.

        `format: int64`

      - `environment: Environment`

        The execution environment for the session.

        - `None object { type }`

          The session talks to CCA without selecting or provisioning an execution environment.

          - `type: "none" (default: "none")`

            The type of the object. Always `none`.

            - `"none"`

        - `OpenAIHosted object { id, capability_directories, desktop, 7 more }`

          An environment hosted by OpenAI.

          - `id: string`

            The public ID of the environment.

            `minLength: 0`

          - `capability_directories: array of string`

            Directories that contain capabilities exposed to the agent.

            `minItems: 0`, `maxItems: 2000`

          - `desktop: object { enabled }`

            The effective desktop configuration.

            - `enabled: boolean`

              Whether the environment provisions a desktop and browser proxy.

          - `files: array of HostedEnvironmentFile`

            Files available in the environment, excluding their contents.

            `minItems: 0`, `maxItems: 50`

            - `HostedEnvironmentFileID object { id, file_id, path, 2 more }`

              A file copied from the OpenAI Files API.

              - `id: string`

                The session-scoped ID of the file in the execution environment.

                `minLength: 0`

              - `file_id: string`

                The ID of the uploaded file.

                `minLength: 0`

              - `path: string`

                The file's absolute path inside the environment.

                `minLength: 0`

              - `size_bytes: integer`

                The decoded file size in bytes.

                `format: int64`, `minimum: 0`

              - `type: "file_id" (default: "file_id")`

                The type of the object. Always `file_id`.

                - `"file_id"`

            - `Inline object { id, path, size_bytes, type }`

              A file supplied inline when the session was created.

              - `id: string`

                The session-scoped ID of the file in the execution environment.

                `minLength: 0`

              - `path: string`

                The file's absolute path inside the environment.

                `minLength: 0`

              - `size_bytes: integer`

                The decoded file size in bytes.

                `format: int64`, `minimum: 0`

              - `type: "inline" (default: "inline")`

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

                Applies the configured domain restrictions.

            - `allowed_domains: array of string`

              Domains the environment may access when network access is restricted.

              `minItems: 0`, `maxItems: 2000`

          - `packages: object { npm, python, system }`

            Packages installed in the environment.

            - `npm: array of string`

              npm packages installed globally in the environment.

              `minItems: 0`, `maxItems: 16384`

            - `python: array of string`

              Python packages installed in the environment.

              `minItems: 0`, `maxItems: 16384`

            - `system: array of string`

              System packages installed in the environment.

              `minItems: 0`, `maxItems: 16384`

          - `plugins: array of HostedPlugin`

            Plugins installed in the environment, excluding their archive contents.

            `minItems: 0`, `maxItems: 2000`

            - `description: string`

              The installed plugin description.

              `minLength: 0`

            - `name: string`

              The installed plugin name.

              `minLength: 0`

            - `type: "inline" (default: "inline")`

              The type of the object. Always `inline`.

              - `"inline"`

          - `skills: array of HostedSkill`

            Skills installed in the environment, excluding their archive contents.

            `minItems: 0`, `maxItems: 2000`

            - `HostedSkillReference object { description, name, skill_id, 2 more }`

              A skill installed from the Skills API.

              - `description: string`

                The installed skill description.

                `minLength: 0`

              - `name: string`

                The installed skill name.

                `minLength: 0`

              - `skill_id: string`

                The referenced skill ID.

                `minLength: 0`

              - `type: "skill_reference" (default: "skill_reference")`

                The type of the object. Always `skill_reference`.

                - `"skill_reference"`

              - `version: string`

                The concrete skill version installed for this session.

                `minLength: 0`

            - `Inline object { description, name, type }`

              A skill installed from an inline ZIP archive.

              - `description: string`

                The installed skill description.

                `minLength: 0`

              - `name: string`

                The installed skill name.

                `minLength: 0`

              - `type: "inline" (default: "inline")`

                The type of the object. Always `inline`.

                - `"inline"`

          - `type: "openai_hosted" (default: "openai_hosted")`

            The type of the object. Always `openai_hosted`.

            - `"openai_hosted"`

          - `container_size: optional "small" or "medium" or "large" or null`

            The effective CPU and memory tier, or null when unknown or outside the public tiers.

            - `"small"`

            - `"medium"`

            - `"large"`

        - `SelfHosted object { id, capability_directories, remote_url, 2 more }`

          An environment hosted by the application.

          - `id: string`

            The public ID of the environment.

            `minLength: 0`

          - `capability_directories: array of string`

            Directories that contain capabilities exposed to the agent.

            `minItems: 0`, `maxItems: 2000`

          - `remote_url: string`

            Pass this URL unchanged to `codex exec-server --remote` when connecting this environment.

            `minLength: 0`

          - `type: "self_hosted" (default: "self_hosted")`

            The type of the object. Always `self_hosted`.

            - `"self_hosted"`

          - `workspace_directory: string`

            The absolute project directory inside the environment. Defaults to `/workspace`.

            `minLength: 0`

      - `error: string or null`

        The error that caused the session to fail, if any.

        `minLength: 0`

      - `last_active_at: integer`

        The Unix timestamp, in seconds, when the session was last active.

        `format: int64`

      - `metadata: map[string]`

        Custom string key-value pairs attached to the session.

      - `object: "agent.session" (default: "agent.session")`

        The object type. Always `agent.session`.

        - `"agent.session"`

      - `required_actions: array of ComputerUseApprovalRequest { request, request_id, turn_id, type }  or FunctionCall { arguments, call_id, name, 2 more }  or EnvironmentConnection { environment_id, type }`

        Actions that must be completed before the session can continue.

        `minItems: 0`, `maxItems: 2000`

        - `ComputerUseApprovalRequest object { request, request_id, turn_id, type }`

          Respond to a computer-use request.

          - `request: BrowserAuthentication { credential_origin, fields, options, 2 more }  or BrowserOriginAccess { origin, reason, type }`

            The information needed to render the request.

            - `BrowserAuthentication object { credential_origin, fields, options, 2 more }`

              A registered form awaiting the application's response.

              - `credential_origin: string or null`

                The registered form or frame origin where values will be entered.

                `minLength: 0`

              - `fields: array of object { id, label, required, type }`

                Controls to render. All submitted values are sensitive.

                `minItems: 0`, `maxItems: 2000`

                - `id: string`

                  The field ID to submit as field_id in a fields entry.

                  `minLength: 0`

                - `label: string`

                  The label to display beside the control.

                  `minLength: 0`

                - `required: boolean`

                  Whether this control requires a nonempty value.

                - `type: string`

                  The rendering type, such as email, password, or text.

                  `minLength: 0`

              - `options: array of object { id, field_ids, label }`

                Sign-in methods. Empty for a plain form.

                `minItems: 0`, `maxItems: 2000`

                - `id: string`

                  The option ID to submit as selected_option.

                  `minLength: 0`

                - `field_ids: array of string`

                  IDs from the registered fields that this method accepts.

                  `minItems: 0`, `maxItems: 2000`

                - `label: string`

                  The method label to display.

                  `minLength: 0`

              - `reason: string or null`

                Why the agent needs the user to sign in.

                `minLength: 0`

              - `type: "browser_authentication" (default: "browser_authentication")`

                The type of the object. Always `browser_authentication`.

                - `"browser_authentication"`

            - `BrowserOriginAccess object { origin, reason, type }`

              A browser origin awaiting the application's approval decision.

              - `origin: string`

                The origin the browser needs permission to access.

                `minLength: 0`

              - `reason: string or null`

                The browser's explanation for this request, or null when unavailable.

                `minLength: 0`

              - `type: "browser_origin_access" (default: "browser_origin_access")`

                The type of the object. Always `browser_origin_access`.

                - `"browser_origin_access"`

          - `request_id: string`

            The registered request ID to echo when responding.

            `minLength: 0`

          - `turn_id: string`

            The turn that requested approval.

            `minLength: 0`

          - `type: "computer_use_approval_request" (default: "computer_use_approval_request")`

            The type of the object. Always `computer_use_approval_request`.

            - `"computer_use_approval_request"`

        - `FunctionCall object { arguments, call_id, name, 2 more }`

          Run a function tool and submit its result.

          - `arguments: unknown`

            The arguments supplied by the model.

          - `call_id: string`

            The ID to include when submitting the function result.

            `minLength: 0`

          - `name: string`

            The function name.

            `minLength: 0`

          - `turn_id: string`

            The ID of the turn that requested the function call.

            `minLength: 0`

          - `type: "function_call" (default: "function_call")`

            The type of the object. Always `function_call`.

            - `"function_call"`

        - `EnvironmentConnection object { environment_id, type }`

          Reconnect a session environment.

          - `environment_id: string`

            The ID of the environment to reconnect.

            `minLength: 0`

          - `type: "environment_connection" (default: "environment_connection")`

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

        Best-effort token usage for the session, or null if unknown. Recorded usage may change.

        - `input_tokens: integer`

          The number of input tokens used by the agent.

          `format: int64`

        - `input_tokens_details: object { cached_tokens }`

          A breakdown of the agent's input token usage.

          - `cached_tokens: integer`

            The number of input tokens retrieved from the prompt cache.

            `format: int64`

        - `output_tokens: integer`

          The number of output tokens generated by the agent.

          `format: int64`

        - `output_tokens_details: object { reasoning_tokens }`

          A breakdown of the agent's output token usage.

          - `reasoning_tokens: integer`

            The number of output tokens used for reasoning.

            `format: int64`

        - `total_tokens: integer`

          The total number of input and output tokens used by the agent.

          `format: int64`

      - `vault_ids: array of string`

        The IDs of vaults made available to the session.

        `minItems: 0`, `maxItems: 2000`

      - `review: optional "none" or "auto_review"`

        Review applied to eligible actions in this session. Omitted when review is none and automatic review is not enabled. Omission means none.

        - `"none"`

        - `"auto_review"`

    - `type: "agent.session.created" (default: "agent.session.created")`

      The type of the object. Always `agent.session.created`.

      - `"agent.session.created"`

  - `AgentSessionTurnCreatedEvent object { event_id, session_id, turn, 2 more }`

    Emitted when a turn is created.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn: Turn`

      The turn at the time it was created.

      - `id: string`

        The ID of the turn.

        `minLength: 0`

      - `agent_id: string`

        The ID of the agent that ran the turn.

        `minLength: 0`

      - `completed_at: integer or null`

        The Unix timestamp, in seconds, when the turn reached a terminal state.

        `format: int64`

      - `created_at: integer`

        The Unix timestamp, in seconds, used to order the turn by creation time. Subagent turns use their start time, falling back to completion time or the subagent opening time when the preceding timestamps are unavailable.

        `format: int64`

      - `error: SessionTurnError or null`

        A customer-safe error. Non-null only for a failed turn.

        - `code: "context_length_exceeded" or "session_budget_exceeded" or "usage_limit_exceeded" or 20 more`

          A stable, machine-readable failure category.

          - `"context_length_exceeded"`

            The request exceeds the model's context window.

          - `"session_budget_exceeded"`

            The session has reached its usage budget.

          - `"usage_limit_exceeded"`

            The organization has reached a usage, plan, or billing limit.

          - `"project_spend_limit_exceeded"`

            The project has reached its enforced spend limit.

          - `"organization_spend_limit_exceeded"`

            The organization has reached its enforced spend limit.

          - `"organization_usage_limit_exceeded"`

            The organization has reached its OpenAI-assigned usage limit.

          - `"billing_not_active"`

            Billing is not active for the account.

          - `"credit_balance_exhausted"`

            The organization has no API credits remaining.

          - `"rate_limit_exceeded"`

            The request exceeds the available rate limit.

          - `"flex_unavailable"`

            Flex processing is temporarily unavailable.

          - `"server_overloaded"`

            The model service is temporarily overloaded.

          - `"cyber_policy"`

            The request was rejected by a safety policy.

          - `"misalignment_policy_violation"`

            The request was blocked by the safety systems.

          - `"connection_failed"`

            The request could not connect to the model service.

          - `"server_error"`

            The model service encountered an unexpected error.

          - `"authentication_error"`

            The API credentials are invalid or lack the required access.

          - `"invalid_request"`

            The request contains invalid input or configuration.

          - `"resource_not_found"`

            The requested model or resource is unavailable.

          - `"sandbox_error"`

            The request could not complete in its execution environment.

          - `"executor_version_incompatible"`

            The executor must be upgraded before it can run this turn.

          - `"active_turn_not_steerable"`

            The session cannot accept additional input while a request is running.

          - `"request_timeout"`

            The request timed out before the model service responded.

          - `"internal_error"`

            An unexpected internal error prevented the session request from completing.

        - `message: string`

          A customer-safe explanation of the failure.

          `minLength: 0`

      - `object: "agent.session.turn" (default: "agent.session.turn")`

        The object type. Always `agent.session.turn`.

        - `"agent.session.turn"`

      - `session_id: string`

        The ID of the session that owns the turn.

        `minLength: 0`

      - `started_at: integer or null`

        The Unix timestamp, in seconds, when the turn started.

        `format: int64`

      - `status: "queued" or "in_progress" or "waiting" or 3 more`

        The current status of the turn.

        - `"queued"`

          The turn is waiting to start.

        - `"in_progress"`

          The turn is in progress.

        - `"waiting"`

          The turn is waiting for external input.

        - `"completed"`

          The turn completed successfully.

        - `"failed"`

          The turn failed.

        - `"cancelled"`

          The turn was cancelled.

      - `subagent_id: string or null`

        The ID of the subagent that ran the turn, if applicable.

        `minLength: 0`

      - `usage: TokenUsage or null`

        Best-effort token usage for the turn, or null if unknown. Recorded usage may change.

    - `turn_id: string`

      The ID of the turn associated with the event.

      `minLength: 0`

    - `type: "agent.session.turn.created" (default: "agent.session.turn.created")`

      The type of the object. Always `agent.session.turn.created`.

      - `"agent.session.turn.created"`

  - `AgentSessionTurnInProgressEvent object { event_id, session_id, turn, 2 more }`

    Emitted when a turn starts running.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn: Turn`

      The turn at the time it started running.

    - `turn_id: string`

      The ID of the turn associated with the event.

      `minLength: 0`

    - `type: "agent.session.turn.in_progress" (default: "agent.session.turn.in_progress")`

      The type of the object. Always `agent.session.turn.in_progress`.

      - `"agent.session.turn.in_progress"`

  - `AgentSessionTurnCompletedEvent object { event_id, session_id, turn, 3 more }`

    Emitted when a turn completes.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn: Turn`

      The completed turn.

    - `turn_id: string`

      The ID of the turn associated with the event.

      `minLength: 0`

    - `type: "agent.session.turn.completed" (default: "agent.session.turn.completed")`

      The type of the object. Always `agent.session.turn.completed`.

      - `"agent.session.turn.completed"`

    - `usage: TokenUsage or null`

      Token usage by the root agent during the turn, when available.

  - `AgentSessionTurnFailedEvent object { event_id, session_id, turn, 3 more }`

    Emitted when a turn fails.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn: Turn`

      The failed turn.

    - `turn_id: string`

      The ID of the turn associated with the event.

      `minLength: 0`

    - `type: "agent.session.turn.failed" (default: "agent.session.turn.failed")`

      The type of the object. Always `agent.session.turn.failed`.

      - `"agent.session.turn.failed"`

    - `usage: TokenUsage or null`

      Token usage by the root agent during the turn, when available.

  - `AgentSessionTurnCancelledEvent object { event_id, session_id, turn, 3 more }`

    Emitted when a turn is cancelled.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn: Turn`

      The cancelled turn.

    - `turn_id: string`

      The ID of the turn associated with the event.

      `minLength: 0`

    - `type: "agent.session.turn.cancelled" (default: "agent.session.turn.cancelled")`

      The type of the object. Always `agent.session.turn.cancelled`.

      - `"agent.session.turn.cancelled"`

    - `usage: TokenUsage or null`

      Token usage by the root agent during the turn, when available.

  - `AgentSessionTurnItemAddedEvent object { event_id, item, output_index, 3 more }`

    Emitted when an item is added to a turn.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `item: AgentSessionItem`

      The item that was added.

      - `AgentSessionMessage object { id, content, phase, 4 more }`

        A user or assistant message recorded in a session.

        - `id: string or null`

          The ID of this item, or null for legacy user messages whose ID was not recorded.

          `minLength: 0`

        - `content: array of AgentSessionMessageContent`

          The content of the message. User messages contain input text or images; assistant messages contain output text.

          `minItems: 0`, `maxItems: 2000`

          - `InputText object { text, type }`

            Text supplied by the user.

            - `text: string`

              The text supplied by the user.

              `minLength: 0`

            - `type: "input_text" (default: "input_text")`

              The type of the object. Always `input_text`.

              - `"input_text"`

          - `InputImage object { image_url, type }`

            An image supplied by the user.

            - `image_url: string`

              The URL of the image supplied by the user, which may be a base64-encoded data URL.

              `minLength: 0`

            - `type: "input_image" (default: "input_image")`

              The type of the object. Always `input_image`.

              - `"input_image"`

          - `OutputText object { text, type }`

            Text produced by the assistant.

            - `text: string`

              The text produced by the assistant.

              `minLength: 0`

            - `type: "output_text" (default: "output_text")`

              The type of the object. Always `output_text`.

              - `"output_text"`

        - `phase: "commentary" or "final_answer" or null`

          The phase of an assistant message. Null for user messages.

          - `"commentary"`

            Commentary produced while the agent works.

          - `"final_answer"`

            The agent's final answer.

        - `role: "user" or "assistant"`

          The role of the message author.

          - `"user"`

          - `"assistant"`

        - `status: AgentOutputItemStatus`

          The status of the message. User messages are always `completed`.

          - `"in_progress"`

            The item is in progress.

          - `"completed"`

            The item is complete.

          - `"incomplete"`

            The item stopped before completing.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "message" (default: "message")`

          The item type. Always `message`.

          - `"message"`

      - `AgentReasoningItem object { id, status, summary, 2 more }`

        A reasoning item produced by the agent.

        - `id: string`

          The ID of the reasoning item.

          `minLength: 0`

        - `status: AgentOutputItemStatus or null`

          The status of the reasoning item.

        - `summary: array of SummaryText`

          The reasoning summaries produced by the agent.

          `minItems: 0`, `maxItems: 2000`

          - `text: string`

            The reasoning summary text.

            `minLength: 0`

          - `type: "summary_text" (default: "summary_text")`

            The content type. Always `summary_text`.

            - `"summary_text"`

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "reasoning" (default: "reasoning")`

          The item type. Always `reasoning`.

          - `"reasoning"`

      - `AgentFunctionCallItem object { id, arguments, call_id, 4 more }`

        A function call produced by the agent.

        - `id: string`

          The ID of the function call item.

          `minLength: 0`

        - `arguments: unknown`

          The arguments to pass to the function.

        - `call_id: string`

          The ID used to submit the function result.

          `minLength: 0`

        - `name: string`

          The name of the function to call.

          `minLength: 0`

        - `status: AgentFunctionCallStatus`

          The status of the function call.

          - `"in_progress"`

            The call is in progress.

          - `"completed"`

            The call completed successfully.

          - `"failed"`

            The call failed.

          - `"incomplete"`

            The call stopped before completing.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "function_call" (default: "function_call")`

          The item type. Always `function_call`.

          - `"function_call"`

      - `FunctionCallOutput object { id, call_id, error, 4 more }`

        The result supplied for a function call.

        - `id: string`

          The ID of the function call output item.

          `minLength: 0`

        - `call_id: string`

          The ID of the function call that produced this output.

          `minLength: 0`

        - `error: string or null`

          The error message, if the call failed.

          `minLength: 0`

        - `output: AgentFunctionCallOutput or null`

          The function result, if the call succeeded.

          - `string`

            `minLength: 0`

          - `array of InputContent`

            `minItems: 0`, `maxItems: 2000`

            - `InputText object { text, type }`

              Text input recorded in a session item.

              - `text: string`

                The text supplied to the agent.

                `minLength: 0`

              - `type: "input_text" (default: "input_text")`

                The type of the object. Always `input_text`.

                - `"input_text"`

            - `InputImage object { image_url, type }`

              Image input recorded in a session item.

              - `image_url: string`

                The URL of the image supplied to the agent, which may be a base64-encoded data URL.

                `minLength: 0`

              - `type: "input_image" (default: "input_image")`

                The type of the object. Always `input_image`.

                - `"input_image"`

        - `status: AgentFunctionCallStatus`

          The status of the function call.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "function_call_output" (default: "function_call_output")`

          The item type. Always `function_call_output`.

          - `"function_call_output"`

      - `AgentMessage object { id, content, recipient_agent_id, 3 more }`

        A message exchanged between agent threads.

        - `id: string`

          The ID of the message.

          `minLength: 0`

        - `content: array of AgentContent`

          The content exchanged between the agents.

          `minItems: 0`, `maxItems: 2000`

          - `OutputText object { text, type }`

            A text content part produced by the agent.

            - `text: string`

              The text produced by the agent.

              `minLength: 0`

            - `type: "output_text" (default: "output_text")`

              The content type. Always `output_text`.

              - `"output_text"`

          - `EncryptedContent object { encrypted_content, type }`

            Encrypted content exchanged between agents.

            - `encrypted_content: string`

              The encrypted content payload.

              `minLength: 0`

            - `type: "encrypted_content" (default: "encrypted_content")`

              The content type. Always `encrypted_content`.

              - `"encrypted_content"`

        - `recipient_agent_id: string`

          The ID or name of the receiving agent.

          `minLength: 0`

        - `sender_agent_id: string`

          The ID or name of the sending agent.

          `minLength: 0`

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "agent_message" (default: "agent_message")`

          The item type. Always `agent_message`.

          - `"agent_message"`

      - `AgentMcpCallItem object { id, arguments, error, 6 more }`

        A call to a tool on an MCP server.

        - `id: string`

          The ID of the MCP call item.

          `minLength: 0`

        - `arguments: unknown`

          The arguments passed to the MCP tool.

        - `error: unknown`

          The error returned by the MCP tool, if any.

        - `name: string`

          The name of the MCP tool.

          `minLength: 0`

        - `output: unknown`

          The output returned by the MCP tool, if any.

        - `server_label: string`

          The label of the MCP server.

          `minLength: 0`

        - `status: AgentFunctionCallStatus`

          The status of the MCP tool call.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "mcp_call" (default: "mcp_call")`

          The item type. Always `mcp_call`.

          - `"mcp_call"`

      - `ComputerUseCall object { id, output, status, 3 more }`

        One execution of the platform-provided computer-use capability.

        - `id: string`

          The ID of the activity item.

          `minLength: 0`

        - `output: object { image_url, type }  or null`

          The last screenshot emitted by the model. Null when screenshot inclusion is disabled or the call emitted no screenshot.

          - `image_url: string`

            The complete JPEG image as a base64 data URL.

            `minLength: 0`

          - `type: "computer_screenshot" (default: "computer_screenshot")`

            The content type. Always `computer_screenshot`.

            - `"computer_screenshot"`

        - `status: AgentFunctionCallStatus`

          The execution status of the activity.

        - `title: string or null`

          A model-generated description of the activity, when available.

          `minLength: 0`

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "computer_use_call" (default: "computer_use_call")`

          The item type. Always `computer_use_call`.

          - `"computer_use_call"`

      - `ComputerUseApprovalRequest object { id, request, request_id, 2 more }`

        A credential-free history record of the emitted login request.

        - `id: string`

          The stable history item ID.

          `minLength: 0`

        - `request: object { credential_origin, fields, options, 2 more }`

          A registered form awaiting the application's response.

          - `credential_origin: string or null`

            The registered form or frame origin where values will be entered.

            `minLength: 0`

          - `fields: array of object { id, label, required, type }`

            Controls to render. All submitted values are sensitive.

            `minItems: 0`, `maxItems: 2000`

            - `id: string`

              The field ID to submit as field_id in a fields entry.

              `minLength: 0`

            - `label: string`

              The label to display beside the control.

              `minLength: 0`

            - `required: boolean`

              Whether this control requires a nonempty value.

            - `type: string`

              The rendering type, such as email, password, or text.

              `minLength: 0`

          - `options: array of object { id, field_ids, label }`

            Sign-in methods. Empty for a plain form.

            `minItems: 0`, `maxItems: 2000`

            - `id: string`

              The option ID to submit as selected_option.

              `minLength: 0`

            - `field_ids: array of string`

              IDs from the registered fields that this method accepts.

              `minItems: 0`, `maxItems: 2000`

            - `label: string`

              The method label to display.

              `minLength: 0`

          - `reason: string or null`

            Why the agent needs the user to sign in.

            `minLength: 0`

          - `type: "browser_authentication" (default: "browser_authentication")`

            The type of the object. Always `browser_authentication`.

            - `"browser_authentication"`

        - `request_id: string`

          `minLength: 0`

        - `turn_id: string`

          `minLength: 0`

        - `type: "computer_use_approval_request" (default: "computer_use_approval_request")`

          The item type. Always computer_use_approval_request.

          - `"computer_use_approval_request"`

      - `ComputerUseApprovalRequestResult object { id, request_id, response, 2 more }`

        A credential-free record of an admitted response, not proof of completion.

        - `id: string`

          The stable history item ID.

          `minLength: 0`

        - `request_id: string`

          The registered request answered by this item.

          `minLength: 0`

        - `response: Submit { action, selected_option, type }  or Cancel { action, type }`

          The admitted response, without submitted credential values.

          - `Submit object { action, selected_option, type }`

            - `action: "submit" (default: "submit")`

              - `"submit"`

            - `selected_option: string or null`

              The chosen sign-in method, or null when no options were offered.

              `minLength: 0`

            - `type: "browser_authentication" (default: "browser_authentication")`

              - `"browser_authentication"`

          - `Cancel object { action, type }`

            - `action: "cancel" (default: "cancel")`

              - `"cancel"`

            - `type: "browser_authentication" (default: "browser_authentication")`

              - `"browser_authentication"`

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "computer_use_approval_request_result" (default: "computer_use_approval_request_result")`

          - `"computer_use_approval_request_result"`

      - `AgentWebSearchCallItem object { id, action, status, 2 more }`

        A web search call produced by the agent.

        - `id: string`

          The ID of the web search call.

          `minLength: 0`

        - `action: WebSearchAction or null`

          The action performed by the web search tool.

          - `Search object { queries, query, type }`

            A search query or group of search queries.

            - `queries: array of string or null`

              The search queries, when multiple queries were used.

              `minItems: 0`, `maxItems: 2000`

            - `query: string or null`

              The search query, when a single query was used.

              `minLength: 0`

            - `type: "search" (default: "search")`

              The type of the object. Always `search`.

              - `"search"`

          - `OpenPage object { type, url }`

            Opens a web page.

            - `type: "open_page" (default: "open_page")`

              The type of the object. Always `open_page`.

              - `"open_page"`

            - `url: string or null`

              The URL of the page that was opened.

              `minLength: 0`

          - `FindInPage object { pattern, type, url }`

            Finds text within a web page.

            - `pattern: string or null`

              The text pattern that was searched for.

              `minLength: 0`

            - `type: "find_in_page" (default: "find_in_page")`

              The type of the object. Always `find_in_page`.

              - `"find_in_page"`

            - `url: string or null`

              The URL of the page that was searched.

              `minLength: 0`

          - `Other object { type }`

            Another web search action.

            - `type: "other" (default: "other")`

              The type of the object. Always `other`.

              - `"other"`

        - `status: AgentOutputItemStatus`

          The status of the web search call.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "web_search_call" (default: "web_search_call")`

          The item type. Always `web_search_call`.

          - `"web_search_call"`

      - `AgentCommandExecutionItem object { id, command, cwd, 6 more }`

        A command execution produced by the agent.

        - `id: string`

          The ID of the command execution item.

          `minLength: 0`

        - `command: string`

          The command that was executed.

          `minLength: 0`

        - `cwd: string or null`

          The working directory used to execute the command.

          `minLength: 0`

        - `duration_ms: integer or null`

          The command duration in milliseconds.

          `format: int64`

        - `exit_code: integer or null`

          The process exit code, if the command completed.

          `format: int64`

        - `output: string or null`

          The command output, if available.

          `minLength: 0`

        - `status: AgentFunctionCallStatus`

          The status of the command execution.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "command_execution" (default: "command_execution")`

          The item type. Always `command_execution`.

          - `"command_execution"`

      - `AgentCreateSubagentCallItem object { id, agent_id, content, 5 more }`

        A request to spawn a subagent.

        - `id: string`

          The ID of the tool call item.

          `minLength: 0`

        - `agent_id: string`

          The ID of the agent that requested the subagent.

          `minLength: 0`

        - `content: array of AgentContent`

          The task given to the spawned agent.

          `minItems: 0`, `maxItems: 2000`

          - `OutputText object { text, type }`

            A text content part produced by the agent.

          - `EncryptedContent object { encrypted_content, type }`

            Encrypted content exchanged between agents.

        - `model: string or null`

          The model requested for the spawned agent.

          `minLength: 0`

        - `reasoning_effort: string or null`

          The reasoning effort requested for the spawned agent.

          `minLength: 0`

        - `status: AgentFunctionCallStatus`

          The status of the tool call.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "create_subagent_call" (default: "create_subagent_call")`

          The item type. Always `create_subagent_call`.

          - `"create_subagent_call"`

            The current public item type.

      - `AgentSendSubagentInputCallItem object { id, content, recipient_agent_id, 4 more }`

        A request to send input to another agent.

        - `id: string`

          The ID of the tool call item.

          `minLength: 0`

        - `content: array of AgentContent`

          The input sent to the receiving agent.

          `minItems: 0`, `maxItems: 2000`

          - `OutputText object { text, type }`

            A text content part produced by the agent.

          - `EncryptedContent object { encrypted_content, type }`

            Encrypted content exchanged between agents.

        - `recipient_agent_id: string`

          The ID of the agent receiving the input.

          `minLength: 0`

        - `sender_agent_id: string`

          The ID of the agent sending the input.

          `minLength: 0`

        - `status: AgentFunctionCallStatus`

          The status of the tool call.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "send_subagent_input_call" (default: "send_subagent_input_call")`

          The item type. Always `send_subagent_input_call`.

          - `"send_subagent_input_call"`

            The current public item type.

      - `AgentResumeSubagentCallItem object { id, recipient_agent_id, sender_agent_id, 3 more }`

        A request to resume a subagent.

        - `id: string`

          The ID of the tool call item.

          `minLength: 0`

        - `recipient_agent_id: string`

          The ID of the agent to resume.

          `minLength: 0`

        - `sender_agent_id: string`

          The ID of the agent requesting the resume.

          `minLength: 0`

        - `status: AgentFunctionCallStatus`

          The status of the tool call.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "resume_subagent_call" (default: "resume_subagent_call")`

          The item type. Always `resume_subagent_call`.

          - `"resume_subagent_call"`

            The current public item type.

      - `AgentWaitForSubagentsCallItem object { id, recipient_agent_ids, sender_agent_id, 3 more }`

        A request to wait for one or more subagents.

        - `id: string`

          The ID of the tool call item.

          `minLength: 0`

        - `recipient_agent_ids: array of string`

          The IDs of the agents to wait for.

          `minItems: 0`, `maxItems: 2000`

        - `sender_agent_id: string`

          The ID of the agent waiting for results.

          `minLength: 0`

        - `status: AgentFunctionCallStatus`

          The status of the tool call.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "wait_for_subagents_call" (default: "wait_for_subagents_call")`

          The item type. Always `wait_for_subagents_call`.

          - `"wait_for_subagents_call"`

            The current public item type.

      - `AgentInterruptSubagentCallItem object { id, recipient_agent_id, sender_agent_id, 3 more }`

        A request to interrupt a subagent's current turn. The subagent remains available.

        - `id: string`

          The ID of the tool call item.

          `minLength: 0`

        - `recipient_agent_id: string`

          The ID of the agent to interrupt.

          `minLength: 0`

        - `sender_agent_id: string`

          The ID of the agent requesting the interrupt.

          `minLength: 0`

        - `status: AgentFunctionCallStatus`

          The status of the tool call.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "interrupt_subagent_call" (default: "interrupt_subagent_call")`

          The item type. Always `interrupt_subagent_call`.

          - `"interrupt_subagent_call"`

            The current public item type.

      - `AgentCloseSubagentCallItem object { id, recipient_agent_id, sender_agent_id, 3 more }`

        A request to close a subagent.

        - `id: string`

          The ID of the tool call item.

          `minLength: 0`

        - `recipient_agent_id: string`

          The ID of the agent to close.

          `minLength: 0`

        - `sender_agent_id: string`

          The ID of the agent requesting the close.

          `minLength: 0`

        - `status: AgentFunctionCallStatus`

          The status of the tool call.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "close_subagent_call" (default: "close_subagent_call")`

          The item type. Always `close_subagent_call`.

          - `"close_subagent_call"`

            The current public item type.

    - `output_index: integer or null`

      The index of the item in the turn output, when the item is agent output.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.turn.item.added" (default: "agent.session.turn.item.added")`

      The type of the object. Always `agent.session.turn.item.added`.

      - `"agent.session.turn.item.added"`

  - `AgentSessionIdleEvent object { event_id, session, type }`

    Emitted when a session becomes idle.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session: AgentSession`

      The session that became idle.

    - `type: "agent.session.idle" (default: "agent.session.idle")`

      The type of the object. Always `agent.session.idle`.

      - `"agent.session.idle"`

  - `AgentSessionInProgressEvent object { event_id, session, type }`

    Emitted when a session starts processing a turn.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session: AgentSession`

      The session that started processing.

    - `type: "agent.session.in_progress" (default: "agent.session.in_progress")`

      The type of the object. Always `agent.session.in_progress`.

      - `"agent.session.in_progress"`

  - `AgentSessionRequiresActionEvent object { event_id, session, type }`

    Emitted when a session is waiting for one or more required actions.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session: AgentSession`

      The session and its current required actions.

    - `type: "agent.session.requires_action" (default: "agent.session.requires_action")`

      The type of the object. Always `agent.session.requires_action`.

      - `"agent.session.requires_action"`

  - `AgentSessionFailedEvent object { event_id, session, type }`

    Emitted when a session fails.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session: AgentSession`

      The failed session.

    - `type: "agent.session.failed" (default: "agent.session.failed")`

      The type of the object. Always `agent.session.failed`.

      - `"agent.session.failed"`

  - `AgentSessionEnvironmentPendingEvent object { environment, event_id, session_id, 2 more }`

    Emitted while a session environment is being prepared.

    - `environment: AgentSessionEnvironmentState`

      The current environment state.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.environment.pending" (default: "agent.session.environment.pending")`

      The type of the object. Always `agent.session.environment.pending`.

      - `"agent.session.environment.pending"`

  - `AgentSessionEnvironmentConnectedEvent object { environment, event_id, session_id, 2 more }`

    Emitted when a session environment connects.

    - `environment: AgentSessionEnvironmentState`

      The current environment state.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.environment.connected" (default: "agent.session.environment.connected")`

      The type of the object. Always `agent.session.environment.connected`.

      - `"agent.session.environment.connected"`

  - `AgentSessionEnvironmentDisconnectedEvent object { environment, event_id, session_id, 2 more }`

    Emitted when a session environment disconnects.

    - `environment: AgentSessionEnvironmentState`

      The current environment state.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.environment.disconnected" (default: "agent.session.environment.disconnected")`

      The type of the object. Always `agent.session.environment.disconnected`.

      - `"agent.session.environment.disconnected"`

  - `AgentSessionEnvironmentFailedEvent object { environment, event_id, session_id, 2 more }`

    Emitted when a session environment fails.

    - `environment: AgentSessionEnvironmentState`

      The current environment state.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.environment.failed" (default: "agent.session.environment.failed")`

      The type of the object. Always `agent.session.environment.failed`.

      - `"agent.session.environment.failed"`

  - `AgentSessionSubagentCreatedEvent object { event_id, subagent, type }`

    Emitted when a subagent is created.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `subagent: Subagent`

      The subagent that was created.

      - `id: string`

        The ID of the subagent.

        `minLength: 0`

      - `closed_at: integer or null`

        The Unix timestamp, in seconds, when the subagent was closed. Null while active, including after resume.

        `format: int64`

      - `instructions: array of AgentContent or null`

        Initial task content, or null when unavailable. Text may contain placeholders for images or audio when only a preview is available.

        `minItems: 0`, `maxItems: 2000`

        - `OutputText object { text, type }`

          A text content part produced by the agent.

        - `EncryptedContent object { encrypted_content, type }`

          Encrypted content exchanged between agents.

      - `name: string or null`

        The runner-assigned nickname, or null when unavailable.

        `minLength: 0`

      - `object: "agent.session.subagent" (default: "agent.session.subagent")`

        The object type. Always `agent.session.subagent`.

        - `"agent.session.subagent"`

      - `opened_at: integer`

        The Unix timestamp, in seconds, when the subagent was first opened. Resuming does not change it.

        `format: int64`

      - `parent_agent_id: string`

        The ID of the agent that created this subagent.

        `minLength: 0`

      - `session_id: string`

        The ID of the session that owns the subagent.

        `minLength: 0`

      - `status: "active" or "closed"`

        The current status of the subagent.

        - `"active"`

          The subagent remains available, including while idle between turns.

        - `"closed"`

          The subagent is closed.

    - `type: "agent.session.subagent.created" (default: "agent.session.subagent.created")`

      The type of the object. Always `agent.session.subagent.created`.

      - `"agent.session.subagent.created"`

  - `AgentSessionSubagentActiveEvent object { event_id, subagent, type }`

    Emitted when a closed subagent successfully resumes.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `subagent: Subagent`

      The subagent that resumed.

    - `type: "agent.session.subagent.active" (default: "agent.session.subagent.active")`

      The type of the object. Always `agent.session.subagent.active`.

      - `"agent.session.subagent.active"`

  - `AgentSessionSubagentClosedEvent object { event_id, subagent, type }`

    Emitted when a subagent is closed.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `subagent: Subagent`

      The subagent that was closed.

    - `type: "agent.session.subagent.closed" (default: "agent.session.subagent.closed")`

      The type of the object. Always `agent.session.subagent.closed`.

      - `"agent.session.subagent.closed"`

  - `AgentSessionTurnItemDoneEvent object { event_id, item, output_index, 3 more }`

    Emitted when an output item is complete.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `item: AgentOutputItem`

      The completed output item.

      - `AgentSessionAssistantMessage object { id, content, phase, 4 more }`

        An assistant message produced by the agent.

        - `id: string`

          The ID of the message.

          `minLength: 0`

        - `content: array of OutputText`

          The content of the message.

          `minItems: 0`, `maxItems: 2000`

          - `text: string`

            The text produced by the agent.

            `minLength: 0`

          - `type: "output_text" (default: "output_text")`

            The content type. Always `output_text`.

        - `phase: "commentary" or "final_answer" or null`

          The phase of the assistant message.

          - `"commentary"`

            Commentary produced while the agent works.

          - `"final_answer"`

            The agent's final answer.

        - `role: "assistant" (default: "assistant")`

          The role of the message author. Always `assistant`.

          - `"assistant"`

        - `status: AgentOutputItemStatus`

          The status of the message.

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "message" (default: "message")`

          The item type. Always `message`.

          - `"message"`

      - `AgentReasoningItem object { id, status, summary, 2 more }`

        A reasoning item produced by the agent.

      - `AgentFunctionCallItem object { id, arguments, call_id, 4 more }`

        A function call produced by the agent.

      - `AgentMcpCallItem object { id, arguments, error, 6 more }`

        A call to a tool on an MCP server.

      - `ComputerUseCall object { id, output, status, 3 more }`

        One execution of the platform-provided computer-use capability.

        - `id: string`

          The ID of the activity item.

          `minLength: 0`

        - `output: object { image_url, type }  or null`

          The last screenshot emitted by the model. Null when screenshot inclusion is disabled or the call emitted no screenshot.

          - `image_url: string`

            The complete JPEG image as a base64 data URL.

            `minLength: 0`

          - `type: "computer_screenshot" (default: "computer_screenshot")`

            The content type. Always `computer_screenshot`.

            - `"computer_screenshot"`

        - `status: AgentFunctionCallStatus`

          The execution status of the activity.

        - `title: string or null`

          A model-generated description of the activity, when available.

          `minLength: 0`

        - `turn_id: string`

          The ID of the turn that contains this item.

          `minLength: 0`

        - `type: "computer_use_call" (default: "computer_use_call")`

          The item type. Always `computer_use_call`.

          - `"computer_use_call"`

      - `ComputerUseApprovalRequest object { id, request, request_id, 2 more }`

        A credential-free history record of the emitted login request.

        - `id: string`

          The stable history item ID.

          `minLength: 0`

        - `request: object { credential_origin, fields, options, 2 more }`

          A registered form awaiting the application's response.

          - `credential_origin: string or null`

            The registered form or frame origin where values will be entered.

            `minLength: 0`

          - `fields: array of object { id, label, required, type }`

            Controls to render. All submitted values are sensitive.

            `minItems: 0`, `maxItems: 2000`

            - `id: string`

              The field ID to submit as field_id in a fields entry.

              `minLength: 0`

            - `label: string`

              The label to display beside the control.

              `minLength: 0`

            - `required: boolean`

              Whether this control requires a nonempty value.

            - `type: string`

              The rendering type, such as email, password, or text.

              `minLength: 0`

          - `options: array of object { id, field_ids, label }`

            Sign-in methods. Empty for a plain form.

            `minItems: 0`, `maxItems: 2000`

            - `id: string`

              The option ID to submit as selected_option.

              `minLength: 0`

            - `field_ids: array of string`

              IDs from the registered fields that this method accepts.

              `minItems: 0`, `maxItems: 2000`

            - `label: string`

              The method label to display.

              `minLength: 0`

          - `reason: string or null`

            Why the agent needs the user to sign in.

            `minLength: 0`

          - `type: "browser_authentication" (default: "browser_authentication")`

            The type of the object. Always `browser_authentication`.

            - `"browser_authentication"`

        - `request_id: string`

          `minLength: 0`

        - `turn_id: string`

          `minLength: 0`

        - `type: "computer_use_approval_request" (default: "computer_use_approval_request")`

          The item type. Always computer_use_approval_request.

          - `"computer_use_approval_request"`

      - `AgentWebSearchCallItem object { id, action, status, 2 more }`

        A web search call produced by the agent.

      - `AgentCommandExecutionItem object { id, command, cwd, 6 more }`

        A command execution produced by the agent.

      - `AgentCreateSubagentCallItem object { id, agent_id, content, 5 more }`

        A request to spawn a subagent.

      - `AgentSendSubagentInputCallItem object { id, content, recipient_agent_id, 4 more }`

        A request to send input to another agent.

      - `AgentResumeSubagentCallItem object { id, recipient_agent_id, sender_agent_id, 3 more }`

        A request to resume a subagent.

      - `AgentWaitForSubagentsCallItem object { id, recipient_agent_ids, sender_agent_id, 3 more }`

        A request to wait for one or more subagents.

      - `AgentInterruptSubagentCallItem object { id, recipient_agent_id, sender_agent_id, 3 more }`

        A request to interrupt a subagent's current turn. The subagent remains available.

      - `AgentCloseSubagentCallItem object { id, recipient_agent_id, sender_agent_id, 3 more }`

        A request to close a subagent.

    - `output_index: integer`

      The index of the output item in the turn output.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.turn.item.done" (default: "agent.session.turn.item.done")`

      The type of the object. Always `agent.session.turn.item.done`.

      - `"agent.session.turn.item.done"`

  - `AgentSessionTurnContentPartAddedEvent object { content_index, event_id, item_id, 5 more }`

    Emitted when an output text content part is added.

    - `content_index: integer`

      The index of the content part in the message.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `item_id: string`

      The ID of the message item.

      `minLength: 0`

    - `output_index: integer`

      The index of the item in the turn output.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `part: OutputText`

      The initial content part.

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.turn.content_part.added" (default: "agent.session.turn.content_part.added")`

      The type of the object. Always `agent.session.turn.content_part.added`.

      - `"agent.session.turn.content_part.added"`

  - `AgentSessionTurnContentPartDoneEvent object { content_index, event_id, item_id, 5 more }`

    Emitted when an output content part is complete.

    - `content_index: integer`

      The index of the content part in the message.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `item_id: string`

      The ID of the message item.

      `minLength: 0`

    - `output_index: integer`

      The index of the item in the turn output.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `part: OutputText`

      The completed content part.

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.turn.content_part.done" (default: "agent.session.turn.content_part.done")`

      The type of the object. Always `agent.session.turn.content_part.done`.

      - `"agent.session.turn.content_part.done"`

  - `AgentSessionTurnOutputTextDeltaEvent object { content_index, delta, event_id, 5 more }`

    Emitted when text is appended to an output text content part.

    - `content_index: integer`

      The index of the content part in the message.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `delta: string`

      The text that was appended.

      `minLength: 0`

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `item_id: string`

      The ID of the message item.

      `minLength: 0`

    - `output_index: integer`

      The index of the item in the turn output.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.turn.output_text.delta" (default: "agent.session.turn.output_text.delta")`

      The type of the object. Always `agent.session.turn.output_text.delta`.

      - `"agent.session.turn.output_text.delta"`

  - `AgentSessionTurnOutputTextDoneEvent object { content_index, event_id, item_id, 5 more }`

    Emitted when an output text content part is complete.

    - `content_index: integer`

      The index of the content part in the message.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `item_id: string`

      The ID of the message item.

      `minLength: 0`

    - `output_index: integer`

      The index of the item in the turn output.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `text: string`

      The complete output text.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.turn.output_text.done" (default: "agent.session.turn.output_text.done")`

      The type of the object. Always `agent.session.turn.output_text.done`.

      - `"agent.session.turn.output_text.done"`

  - `AgentSessionTurnReasoningSummaryPartAddedEvent object { event_id, item_id, output_index, 5 more }`

    Emitted when a reasoning summary content part is added.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `item_id: string`

      The ID of the reasoning item.

      `minLength: 0`

    - `output_index: integer`

      The index of the item in the turn output.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `part: SummaryText`

      The initial summary part.

      - `text: string`

        The reasoning summary text.

        `minLength: 0`

      - `type: "summary_text" (default: "summary_text")`

        The content type. Always `summary_text`.

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `summary_index: integer`

      The index of the summary content part.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.turn.reasoning_summary_part.added" (default: "agent.session.turn.reasoning_summary_part.added")`

      The type of the object. Always `agent.session.turn.reasoning_summary_part.added`.

      - `"agent.session.turn.reasoning_summary_part.added"`

  - `AgentSessionTurnReasoningSummaryPartDoneEvent object { event_id, item_id, output_index, 6 more }`

    Emitted when a reasoning summary part is complete.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `item_id: string`

      The ID of the reasoning item.

      `minLength: 0`

    - `output_index: integer`

      The index of the item in the turn output.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `part: SummaryText`

      The completed summary part.

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `status: "incomplete" or null`

      Present as `incomplete` when summary generation was interrupted.

      - `"incomplete"`

    - `summary_index: integer`

      The index of the summary part.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.turn.reasoning_summary_part.done" (default: "agent.session.turn.reasoning_summary_part.done")`

      The type of the object. Always `agent.session.turn.reasoning_summary_part.done`.

      - `"agent.session.turn.reasoning_summary_part.done"`

  - `AgentSessionTurnReasoningSummaryTextDeltaEvent object { delta, event_id, item_id, 5 more }`

    Emitted when text is appended to a reasoning summary.

    - `delta: string`

      The summary text that was appended.

      `minLength: 0`

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `item_id: string`

      The ID of the reasoning item.

      `minLength: 0`

    - `output_index: integer`

      The index of the item in the turn output.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `summary_index: integer`

      The index of the summary content part.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.turn.reasoning_summary_text.delta" (default: "agent.session.turn.reasoning_summary_text.delta")`

      The type of the object. Always `agent.session.turn.reasoning_summary_text.delta`.

      - `"agent.session.turn.reasoning_summary_text.delta"`

  - `AgentSessionTurnReasoningSummaryTextDoneEvent object { event_id, item_id, output_index, 5 more }`

    Emitted when a reasoning summary content part is complete.

    - `event_id: string`

      The unique ID of the event.

      `minLength: 0`

    - `item_id: string`

      The ID of the reasoning item.

      `minLength: 0`

    - `output_index: integer`

      The index of the item in the turn output.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `session_id: string`

      The ID of the session associated with the event.

      `minLength: 0`

    - `summary_index: integer`

      The index of the summary content part.

      `format: int64`, `minimum: 0`, `maximum: 4294967295`

    - `text: string`

      The complete reasoning summary text.

      `minLength: 0`

    - `turn_id: string or null`

      The ID of the turn associated with the event, when applicable.

      `minLength: 0`

    - `type: "agent.session.turn.reasoning_summary_text.done" (default: "agent.session.turn.reasoning_summary_text.done")`

      The type of the object. Always `agent.session.turn.reasoning_summary_text.done`.

      - `"agent.session.turn.reasoning_summary_text.done"`

### Example

```http
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID/events \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
