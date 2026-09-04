# Alerts

## Retrieve a safety alert

**get** `/safety/alerts/{id}`

Get a safety alert belonging to the authenticated API project.

### Path Parameters

- `id: string`

  Project safety alert ID

### Returns

- `SafetyAlert object { id, created_at, error_type, 6 more }`

  - `id: string`

  - `created_at: number`

  - `error_type: "potentially_unintended_data_transfer" or "potentially_unintended_data_access" or "potentially_unintended_destructive_activity" or "other"`

    - `"potentially_unintended_data_transfer"`

    - `"potentially_unintended_data_access"`

    - `"potentially_unintended_destructive_activity"`

    - `"other"`

  - `model: string`

  - `object: "safety.alert"`

    - `"safety.alert"`

  - `reason: string or null`

    A customer-safe description derived from error_type, or null for zero data retention requests.

  - `request_id: string`

  - `request_paused: boolean`

    Whether block registration succeeded for this request. This does not confirm that response execution stopped.

  - `response_id: string`

### Example

```http
curl https://api.openai.com/v1/safety/alerts/$ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "error_type": "potentially_unintended_data_transfer",
  "model": "model",
  "object": "safety.alert",
  "reason": "reason",
  "request_id": "request_id",
  "request_paused": true,
  "response_id": "response_id"
}
```

### Example

```http
curl https://api.openai.com/v1/safety/alerts/alert_0123456789abcdef0123456789abcdef \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "alert_0123456789abcdef0123456789abcdef",
  "object": "safety.alert",
  "created_at": 1787659200,
  "request_id": "req_123",
  "response_id": "resp_123",
  "model": "gpt-6-astra",
  "request_paused": true,
  "error_type": "potentially_unintended_data_access",
  "reason": "Potentially unintended data access."
}
```

## Domain Types

### Safety Alert

- `SafetyAlert object { id, created_at, error_type, 6 more }`

  - `id: string`

  - `created_at: number`

  - `error_type: "potentially_unintended_data_transfer" or "potentially_unintended_data_access" or "potentially_unintended_destructive_activity" or "other"`

    - `"potentially_unintended_data_transfer"`

    - `"potentially_unintended_data_access"`

    - `"potentially_unintended_destructive_activity"`

    - `"other"`

  - `model: string`

  - `object: "safety.alert"`

    - `"safety.alert"`

  - `reason: string or null`

    A customer-safe description derived from error_type, or null for zero data retention requests.

  - `request_id: string`

  - `request_paused: boolean`

    Whether block registration succeeded for this request. This does not confirm that response execution stopped.

  - `response_id: string`
