## Delete an automation

**delete** `/agents/automations/{automation_id}`

Deletes the automation and prevents future invocations without deleting its target session.

### Path Parameters

- `automation_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `AutomationDeleted object { id, deleted, object }`

  - `id: string`

    The deleted automation ID.

    `minLength: 0`

  - `deleted: boolean`

    Always true.

  - `object: "agent.automation.deleted" (default: "agent.automation.deleted")`

    Always `agent.automation.deleted`.

    - `"agent.automation.deleted"`

### Example

```http
curl https://api.openai.com/v1/agents/automations/$AUTOMATION_ID \
    -X DELETE \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 200 — Example

```json
{
  "id": "id",
  "deleted": true,
  "object": "agent.automation.deleted"
}
```
