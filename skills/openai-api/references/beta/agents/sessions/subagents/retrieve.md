## Retrieve a session subagent

**get** `/agents/sessions/{session_id}/subagents/{subagent_id}`

Retrieves a subagent belonging to this session. See [subagent workflows](/api/docs/guides/agents-api/multi-agent).

### Path Parameters

- `session_id: string`

  `minLength: 0`, `maxLength: 1048576`

- `subagent_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `Subagent object { id, closed_at, instructions, 6 more }`

  A subagent created within a session.

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

### Example

```http
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID/subagents/$SUBAGENT_ID \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 200 — Example

```json
{
  "id": "id",
  "closed_at": 0,
  "instructions": [
    {
      "text": "text",
      "type": "output_text"
    }
  ],
  "name": "name",
  "object": "agent.session.subagent",
  "opened_at": 0,
  "parent_agent_id": "parent_agent_id",
  "session_id": "session_id",
  "status": "active"
}
```
