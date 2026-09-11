## List agent session items

**get** `/agents/sessions/{session_id}/items`

Lists items produced by the session's root agent, including its interactions with subagents. Each subagent has its own item history. See [inspecting agent output](/api/docs/guides/agents-api/observability).

### Path Parameters

- `session_id: string`

### Query Parameters

- `after: optional string`

  Return resources after this resource ID in the selected order.

- `limit: optional number`

  The maximum number of resources to return, between 1 and 100. Defaults to 20.

- `order: optional "asc" or "desc"`

  The order in which resources are returned. Defaults to `desc`.

  - `"asc"`

    Returns resources in ascending order.

  - `"desc"`

    Returns resources in descending order.

### Returns

- `data: array of AgentSessionItem`

  The resources returned in this page, in the requested sort order.

  - `AgentSessionMessage object { id, content, phase, 4 more }`

    A user or assistant message recorded in a session.

    - `id: string or null`

      The ID of this item, or null for legacy user messages whose ID was not recorded.

    - `content: array of AgentSessionMessageContent`

      The content of the message. User messages contain input text or images; assistant messages contain output text.

      - `InputText object { text, type }`

        Text supplied by the user.

        - `text: string`

          The text supplied by the user.

        - `type: "input_text"`

          The type of the object. Always `input_text`.

          - `"input_text"`

      - `InputImage object { image_url, type }`

        An image supplied by the user.

        - `image_url: string`

          The URL of the image supplied by the user, which may be a base64-encoded data URL.

        - `type: "input_image"`

          The type of the object. Always `input_image`.

          - `"input_image"`

      - `OutputText object { text, type }`

        Text produced by the assistant.

        - `text: string`

          The text produced by the assistant.

        - `type: "output_text"`

          The type of the object. Always `output_text`.

          - `"output_text"`

    - `phase: "commentary" or "final_answer" or null`

      The phase of an assistant message.

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

    - `type: "message"`

      The item type. Always `message`.

      - `"message"`

  - `AgentReasoningItem object { id, status, summary, 2 more }`

    A reasoning item produced by the agent.

    - `id: string`

      The ID of the reasoning item.

    - `status: AgentOutputItemStatus or null`

      The status of an agent output item.

    - `summary: array of SummaryText`

      The reasoning summaries produced by the agent.

      - `text: string`

        The reasoning summary text.

      - `type: "summary_text"`

        The content type. Always `summary_text`.

        - `"summary_text"`

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "reasoning"`

      The item type. Always `reasoning`.

      - `"reasoning"`

  - `AgentFunctionCallItem object { id, arguments, call_id, 4 more }`

    A function call produced by the agent.

    - `id: string`

      The ID of the function call item.

    - `arguments: unknown`

      The arguments to pass to the function.

    - `call_id: string`

      The ID used to submit the function result.

    - `name: string`

      The name of the function to call.

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

    - `type: "function_call"`

      The item type. Always `function_call`.

      - `"function_call"`

  - `FunctionCallOutput object { id, call_id, error, 4 more }`

    The result supplied for a function call.

    - `id: string`

      The ID of the function call output item.

    - `call_id: string`

      The ID of the function call that produced this output.

    - `error: string or null`

      The error message, if the call failed.

    - `output: AgentFunctionCallOutput or null`

      The text or model-input content supplied as a function result.

      - `string`

      - `array of InputContent`

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

    - `status: AgentFunctionCallStatus`

      The status of the function call.

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "function_call_output"`

      The item type. Always `function_call_output`.

      - `"function_call_output"`

  - `AgentMessage object { id, content, recipient_agent_id, 3 more }`

    A message exchanged between agent threads.

    - `id: string`

      The ID of the message.

    - `content: array of AgentContent`

      The content exchanged between the agents.

      - `OutputText object { text, type }`

        A text content part produced by the agent.

        - `text: string`

          The text produced by the agent.

        - `type: "output_text"`

          The content type. Always `output_text`.

          - `"output_text"`

      - `EncryptedContent object { encrypted_content, type }`

        Encrypted content exchanged between agents.

        - `encrypted_content: string`

          The encrypted content payload.

        - `type: "encrypted_content"`

          The content type. Always `encrypted_content`.

          - `"encrypted_content"`

    - `recipient_agent_id: string`

      The ID or name of the receiving agent.

    - `sender_agent_id: string`

      The ID or name of the sending agent.

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "agent_message"`

      The item type. Always `agent_message`.

      - `"agent_message"`

  - `AgentMcpCallItem object { id, arguments, error, 6 more }`

    A call to a tool on an MCP server.

    - `id: string`

      The ID of the MCP call item.

    - `arguments: unknown`

      The arguments passed to the MCP tool.

    - `error: unknown`

      The error returned by the MCP tool, if any.

    - `name: string`

      The name of the MCP tool.

    - `output: unknown`

      The output returned by the MCP tool, if any.

    - `server_label: string`

      The label of the MCP server.

    - `status: AgentFunctionCallStatus`

      The status of the MCP tool call.

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "mcp_call"`

      The item type. Always `mcp_call`.

      - `"mcp_call"`

  - `AgentWebSearchCallItem object { id, action, status, 2 more }`

    A web search call produced by the agent.

    - `id: string`

      The ID of the web search call.

    - `action: WebSearchAction or null`

      An action performed by the web search tool.

      - `Search object { queries, query, type }`

        A search query or group of search queries.

        - `queries: array of string or null`

          The search queries, when multiple queries were used.

        - `query: string or null`

          The search query, when a single query was used.

        - `type: "search"`

          The type of the object. Always `search`.

          - `"search"`

      - `OpenPage object { type, url }`

        Opens a web page.

        - `type: "open_page"`

          The type of the object. Always `open_page`.

          - `"open_page"`

        - `url: string or null`

          The URL of the page that was opened.

      - `FindInPage object { pattern, type, url }`

        Finds text within a web page.

        - `pattern: string or null`

          The text pattern that was searched for.

        - `type: "find_in_page"`

          The type of the object. Always `find_in_page`.

          - `"find_in_page"`

        - `url: string or null`

          The URL of the page that was searched.

      - `Other object { type }`

        Another web search action.

        - `type: "other"`

          The type of the object. Always `other`.

          - `"other"`

    - `status: AgentOutputItemStatus`

      The status of the web search call.

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "web_search_call"`

      The item type. Always `web_search_call`.

      - `"web_search_call"`

  - `AgentCommandExecutionItem object { id, command, cwd, 6 more }`

    A command execution produced by the agent.

    - `id: string`

      The ID of the command execution item.

    - `command: string`

      The command that was executed.

    - `cwd: string or null`

      The working directory used to execute the command.

    - `duration_ms: number or null`

      The command duration in milliseconds.

    - `exit_code: number or null`

      The process exit code, if the command completed.

    - `output: string or null`

      The command output, if available.

    - `status: AgentFunctionCallStatus`

      The status of the command execution.

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "command_execution"`

      The item type. Always `command_execution`.

      - `"command_execution"`

  - `AgentCreateSubagentCallItem object { id, agent_id, content, 5 more }`

    A request to spawn a subagent.

    - `id: string`

      The ID of the tool call item.

    - `agent_id: string`

      The ID of the agent that requested the subagent.

    - `content: array of AgentContent`

      The task given to the spawned agent.

      - `OutputText object { text, type }`

        A text content part produced by the agent.

      - `EncryptedContent object { encrypted_content, type }`

        Encrypted content exchanged between agents.

    - `model: string or null`

      The model requested for the spawned agent.

    - `reasoning_effort: string or null`

      The reasoning effort requested for the spawned agent.

    - `status: AgentFunctionCallStatus`

      The status of the tool call.

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "create_subagent_call"`

      The item type. Always `create_subagent_call`.

      - `"create_subagent_call"`

        The current public item type.

  - `AgentSendSubagentInputCallItem object { id, content, recipient_agent_id, 4 more }`

    A request to send input to another agent.

    - `id: string`

      The ID of the tool call item.

    - `content: array of AgentContent`

      The input sent to the receiving agent.

      - `OutputText object { text, type }`

        A text content part produced by the agent.

      - `EncryptedContent object { encrypted_content, type }`

        Encrypted content exchanged between agents.

    - `recipient_agent_id: string`

      The ID of the agent receiving the input.

    - `sender_agent_id: string`

      The ID of the agent sending the input.

    - `status: AgentFunctionCallStatus`

      The status of the tool call.

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "send_subagent_input_call"`

      The item type. Always `send_subagent_input_call`.

      - `"send_subagent_input_call"`

        The current public item type.

  - `AgentResumeSubagentCallItem object { id, recipient_agent_id, sender_agent_id, 3 more }`

    A request to resume a subagent.

    - `id: string`

      The ID of the tool call item.

    - `recipient_agent_id: string`

      The ID of the agent to resume.

    - `sender_agent_id: string`

      The ID of the agent requesting the resume.

    - `status: AgentFunctionCallStatus`

      The status of the tool call.

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "resume_subagent_call"`

      The item type. Always `resume_subagent_call`.

      - `"resume_subagent_call"`

        The current public item type.

  - `AgentWaitForSubagentsCallItem object { id, recipient_agent_ids, sender_agent_id, 3 more }`

    A request to wait for one or more subagents.

    - `id: string`

      The ID of the tool call item.

    - `recipient_agent_ids: array of string`

      The IDs of the agents to wait for.

    - `sender_agent_id: string`

      The ID of the agent waiting for results.

    - `status: AgentFunctionCallStatus`

      The status of the tool call.

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "wait_for_subagents_call"`

      The item type. Always `wait_for_subagents_call`.

      - `"wait_for_subagents_call"`

        The current public item type.

  - `AgentInterruptSubagentCallItem object { id, recipient_agent_id, sender_agent_id, 3 more }`

    A request to interrupt a subagent's current turn. The subagent remains available.

    - `id: string`

      The ID of the tool call item.

    - `recipient_agent_id: string`

      The ID of the agent to interrupt.

    - `sender_agent_id: string`

      The ID of the agent requesting the interrupt.

    - `status: AgentFunctionCallStatus`

      The status of the tool call.

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "interrupt_subagent_call"`

      The item type. Always `interrupt_subagent_call`.

      - `"interrupt_subagent_call"`

        The current public item type.

  - `AgentCloseSubagentCallItem object { id, recipient_agent_id, sender_agent_id, 3 more }`

    A request to close a subagent.

    - `id: string`

      The ID of the tool call item.

    - `recipient_agent_id: string`

      The ID of the agent to close.

    - `sender_agent_id: string`

      The ID of the agent requesting the close.

    - `status: AgentFunctionCallStatus`

      The status of the tool call.

    - `turn_id: string`

      The ID of the turn that contains this item.

    - `type: "close_subagent_call"`

      The item type. Always `close_subagent_call`.

      - `"close_subagent_call"`

        The current public item type.

- `first_id: string or null`

  The ID of the first resource in `data`, or `null` if the page is empty.

- `has_more: boolean`

  Whether there are more resources to retrieve after this page.

- `last_id: string or null`

  The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.

- `object: "list"`

  The object type, which is always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID/items \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "content": [
        {
          "text": "text",
          "type": "input_text"
        }
      ],
      "phase": "commentary",
      "role": "user",
      "status": "in_progress",
      "turn_id": "turn_id",
      "type": "message"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```
