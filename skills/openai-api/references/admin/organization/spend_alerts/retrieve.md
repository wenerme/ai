## Retrieve organization spend alert

**get** `/organization/spend_alerts/{alert_id}`

Retrieves an organization spend alert.

### Path Parameters

- `alert_id: string`

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

    - `subject_prefix: optional string`

      Optional subject prefix for alert emails.

  - `object: "organization.spend_alert"`

    The object type, which is always `organization.spend_alert`.

    - `"organization.spend_alert"`

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Example

```http
curl https://api.openai.com/v1/organization/spend_alerts/$ALERT_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

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
curl https://api.openai.com/v1/organization/spend_alerts/alert_abc123 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "id": "alert_abc123",
    "object": "organization.spend_alert",
    "threshold_amount": 150000,
    "currency": "USD",
    "interval": "month",
    "notification_channel": {
        "type": "email",
        "recipients": ["finance@example.com"],
        "subject_prefix": "OpenAI spend alert"
    }
}
```
