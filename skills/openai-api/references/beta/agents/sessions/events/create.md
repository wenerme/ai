## Create agent session input events

**post** `/agents/sessions/{session_id}/events`

Submits message, cancellation, or tool-result events to a managed agent session. See [session events](/api/docs/guides/agents-api/sessions/events).

### Header Parameters

- `"Idempotency-Key": optional string`

### Path Parameters

- `session_id: string`

### Body Parameters

- `events: array of AgentSessionInputParam`

  The input events to submit to the session.

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

      A function result represented as text or supported model-input content.

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
              "type": "agent.session.input.message"
            }
          ]
        }'
```
