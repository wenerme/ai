## Delete an agent session

**delete** `/agents/sessions/{session_id}`

Removes a managed agent session from the public API and returns a deletion confirmation. Physical cleanup may continue asynchronously. See [managing sessions](/api/docs/guides/agents-api/sessions/manage).

### Path Parameters

- `session_id: string`

### Returns

- `AgentSessionDeleted object { id, deleted, object }`

  A Managed Agents session removed from the public API. Physical cleanup may continue asynchronously.

  - `id: string`

    The ID of the deleted session.

  - `deleted: boolean`

    Whether the session has been removed from the public API. Always `true`. Physical cleanup may still be in progress.

  - `object: "agent.session.deleted"`

    The object type. Always `agent.session.deleted`.

    - `"agent.session.deleted"`

### Example

```http
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID \
    -X DELETE \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "agent.session.deleted"
}
```
