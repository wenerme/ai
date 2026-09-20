# Cases

## Get safety case

**get** `/safety/cases/{id}`

Get a safety case by ID.

### Path Parameters

- `id: string`

  Safety case ID

### Returns

- `SafetyCase object { id, created_at, entity_identifier, 3 more }`

  - `id: string`

  - `created_at: number`

  - `entity_identifier: string`

  - `notice: object { type }`

    - `type: "warning" or "deactivation"`

      - `"warning"`

      - `"deactivation"`

  - `object: "safety.case"`

    - `"safety.case"`

  - `reason: string or null`

### Example

```http
curl https://api.openai.com/v1/safety/cases/$ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "entity_identifier": "entity_identifier",
  "notice": {
    "type": "warning"
  },
  "object": "safety.case",
  "reason": "reason"
}
```

### Example

```http
curl https://api.openai.com/v1/safety/cases/C-abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "C-abc123",
  "object": "safety.case",
  "created_at": 1787659200,
  "entity_identifier": "safety-id-123",
  "reason": "cyber_abuse",
  "notice": {"type": "warning"}
}
```

## Domain Types

### Safety Case

- `SafetyCase object { id, created_at, entity_identifier, 3 more }`

  - `id: string`

  - `created_at: number`

  - `entity_identifier: string`

  - `notice: object { type }`

    - `type: "warning" or "deactivation"`

      - `"warning"`

      - `"deactivation"`

  - `object: "safety.case"`

    - `"safety.case"`

  - `reason: string or null`
