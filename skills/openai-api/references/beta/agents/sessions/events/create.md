## Create agent session input events

**post** `/agents/sessions/{session_id}/events`

Submits message, cancellation, tool-result, or computer-use approval-response events to a managed agent session. Cancellation can recover a still-open turn whose backend execution has ended by marking it cancelled and abandoning unpublished outputs. Saved results, published files, and existing terminal outcomes are preserved. HTTP 202 confirms acceptance, not durable completion. See [session events](/api/docs/guides/agents-api/sessions/events).

### Header Parameters

- `"Idempotency-Key": optional string`

### Path Parameters

- `session_id: string`

### Body Parameters

- `events: array of AgentSessionInputParam`

  The input events to submit to the session.

  - `AgentSessionInputComputerUseApprovalRequestResult object { request_id, response, type }`

    Responds to a pending Computer Use approval request.

    - `request_id: string`

      The registered request ID from the required action.

    - `response: AgentBrowserAuthenticationSubmitParam or AgentBrowserAuthenticationCancelParam or AgentBrowserOriginAccessParam`

      The response for this request type.

      - `AgentBrowserAuthenticationSubmitParam object { action, fields, type, selected_option }`

        - `action: "submit"`

          - `"submit"`

        - `fields: array of object { field_id, value }`

          Values for up to six active fields in the required action. The submitted field-value mapping and selected option must fit within 120 KiB of JSON.

          - `field_id: string`

            The field ID from the required action.

          - `value: string`

            The value to enter into the registered control.

        - `type: "browser_authentication"`

          - `"browser_authentication"`

        - `selected_option: optional string or null`

          The chosen method. Required when the required action contains options.

      - `AgentBrowserAuthenticationCancelParam object { action, type }`

        - `action: "cancel"`

          - `"cancel"`

        - `type: "browser_authentication"`

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

        - `type: "browser_origin_access"`

          - `"browser_origin_access"`

    - `type: "agent.session.input.computer_use_approval_request_result"`

      The type of the object. Always `agent.session.input.computer_use_approval_request_result`.

      - `"agent.session.input.computer_use_approval_request_result"`

  - `AgentSessionInputMessage object { input, type }`

    Adds one or more user messages and starts a turn.

    - `input: array of AgentSessionInputMessageParam`

      The user messages to add to the session.

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

    - `type: "agent.session.input.message"`

      The type of the object. Always `agent.session.input.message`.

      - `"agent.session.input.message"`

  - `AgentSessionInputCancel object { type }`

    Cancels the session's active turn.

    - `type: "agent.session.input.cancel"`

      The type of the object. Always `agent.session.input.cancel`.

      - `"agent.session.input.cancel"`

  - `AgentSessionInputToolResult object { call_id, success, turn_id, 3 more }`

    Submits the result of a function call.

    - `call_id: string`

      The ID of the function call.

    - `success: boolean`

      Whether the function call succeeded.

    - `turn_id: string`

      The ID of the turn that requested the function call.

    - `type: "agent.session.input.tool_result"`

      The type of the object. Always `agent.session.input.tool_result`.

      - `"agent.session.input.tool_result"`

    - `error: optional string or null`

      The error message when the call failed.

    - `output: optional AgentFunctionCallOutputParam or null`

      The function result when the call succeeded.

      - `string`

      - `array of InputContentParam`

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
