## Delete an agent

**delete** `/agents/{agent_id}`

Deletes a reusable agent. See [agent configuration](/api/docs/guides/agents-api/configuration).

### Path Parameters

- `agent_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `AgentDeleted object { id, deleted, object }`

  A deleted reusable agent.

  - `id: string`

    The ID of the deleted agent.

    `minLength: 0`

  - `deleted: boolean`

    Whether the agent was deleted. Always `true`.

  - `object: "agent.deleted" (default: "agent.deleted")`

    The object type. Always `agent.deleted`.

    - `"agent.deleted"`

### Example

```http
curl https://api.openai.com/v1/agents/$AGENT_ID \
    -X DELETE \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 200 — Example

```json
{
  "id": "id",
  "deleted": true,
  "object": "agent.deleted"
}
```
