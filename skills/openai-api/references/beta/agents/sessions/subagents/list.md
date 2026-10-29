## List session subagents

**get** `/agents/sessions/{session_id}/subagents`

Lists subagents in a session, including nested and closed subagents. See [subagent workflows](/api/docs/guides/agents-api/multi-agent).

### Path Parameters

- `session_id: string`

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

- `data: array of Subagent`

  The resources returned in this page, in the requested sort order.

  `minItems: 0`, `maxItems: 2000`

  - `id: string`

    The ID of the subagent.

    `minLength: 0`

  - `closed_at: number or null`

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

      - `type: "output_text"`

        The content type. Always `output_text`.

        - `"output_text"`

    - `EncryptedContent object { encrypted_content, type }`

      Encrypted content exchanged between agents.

      - `encrypted_content: string`

        The encrypted content payload.

        `minLength: 0`

      - `type: "encrypted_content"`

        The content type. Always `encrypted_content`.

        - `"encrypted_content"`

  - `name: string or null`

    The runner-assigned nickname, or null when unavailable.

    `minLength: 0`

  - `object: "agent.session.subagent"`

    The object type. Always `agent.session.subagent`.

    - `"agent.session.subagent"`

  - `opened_at: number`

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
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID/subagents \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
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
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```
