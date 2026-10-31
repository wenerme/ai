## Create organization spend alert

**post** `/organization/spend_alerts`

Creates an organization spend alert.

### Body Parameters

Content type: `application/json`

- `currency: "USD"`

  The currency for the threshold amount.

  - `"USD"`

- `interval: "month"`

  The time interval for evaluating spend against the threshold.

  - `"month"`

- `notification_channel: object { recipients, type, subject_prefix }`

  Email notification settings for a spend alert.

  - `recipients: array of string`

    Email addresses that receive the spend alert notification.

  - `type: "email"`

    The notification channel type. Currently only `email` is supported.

    - `"email"`

  - `subject_prefix: optional string or null`

    Optional subject prefix for alert emails.

- `threshold_amount: integer`

  The alert threshold amount, in cents.

  `minimum: 0`

### Returns

- `OrganizationSpendAlert object { id, currency, interval, 3 more }`

  Represents a spend alert configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: object { recipients, type, subject_prefix }`

    Email notification settings for a spend alert.

    - `recipients: array of string`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix: optional string or null`

      Optional subject prefix for alert emails.

  - `object: "organization.spend_alert"`

    The object type, which is always `organization.spend_alert`.

    - `"organization.spend_alert"`

  - `threshold_amount: integer`

    The alert threshold amount, in cents.

### Example

```http
curl https://api.openai.com/v1/organization/spend_alerts \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "currency": "USD",
          "interval": "month",
          "notification_channel": {
            "recipients": [
              "string"
            ],
            "type": "email"
          },
          "threshold_amount": 0
        }'
```

#### 200 — Example

```json
{
  "id": "id",
  "currency": "USD",
  "interval": "month",
  "notification_channel": {
    "recipients": [
      "string"
    ],
    "type": "email",
    "subject_prefix": "subject_prefix"
  },
  "object": "organization.spend_alert",
  "threshold_amount": 0
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/spend_alerts \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "threshold_amount": 100000,
      "currency": "USD",
      "interval": "month",
      "notification_channel": {
          "type": "email",
          "recipients": ["finance@example.com"],
          "subject_prefix": "OpenAI spend alert"
      }
  }'
```

#### Response example

```json
{
    "id": "alert_abc123",
    "object": "organization.spend_alert",
    "threshold_amount": 100000,
    "currency": "USD",
    "interval": "month",
    "notification_channel": {
        "type": "email",
        "recipients": ["finance@example.com"],
        "subject_prefix": "OpenAI spend alert"
    }
}
```
