# Spend Alerts

## List organization spend alerts

**get** `/organization/spend_alerts`

Lists organization spend alerts.

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the ID of the last spend alert from the previous response to fetch the next page.

- `before: optional string`

  Cursor for pagination. Provide the ID of the first spend alert from the previous response to fetch the previous page.

- `limit: optional number`

  A limit on the number of spend alerts to return. Defaults to 20.

- `order: optional "asc" or "desc"`

  Sort order for the returned spend alerts.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of OrganizationSpendAlert`

  Spend alerts returned in the current page.

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

- `first_id: string`

  The ID of the first spend alert in this page.

- `has_more: boolean`

  Whether more spend alerts are available when paginating.

- `last_id: string`

  The ID of the last spend alert in this page.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/spend_alerts \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
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
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/spend_alerts?limit=20&order=asc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
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
    ],
    "first_id": "alert_abc123",
    "last_id": "alert_abc123",
    "has_more": false
}
```

## Create organization spend alert

**post** `/organization/spend_alerts`

Creates an organization spend alert.

### Body Parameters

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

- `threshold_amount: number`

  The alert threshold amount, in cents.

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

#### Response

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

## Update organization spend alert

**post** `/organization/spend_alerts/{alert_id}`

Updates an organization spend alert.

### Path Parameters

- `alert_id: string`

### Body Parameters

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

- `threshold_amount: number`

  The alert threshold amount, in cents.

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
curl -X POST https://api.openai.com/v1/organization/spend_alerts/alert_abc123 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "threshold_amount": 150000,
      "currency": "USD",
      "interval": "month",
      "notification_channel": {
          "type": "email",
          "recipients": ["finance@example.com"],
          "subject_prefix": "OpenAI spend alert"
      }
  }'
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

## Delete organization spend alert

**delete** `/organization/spend_alerts/{alert_id}`

Deletes an organization spend alert.

### Path Parameters

- `alert_id: string`

### Returns

- `OrganizationSpendAlertDeleted object { id, deleted, object }`

  Confirmation payload returned after deleting an organization spend alert.

  - `id: string`

    The deleted spend alert ID.

  - `deleted: boolean`

    Whether the spend alert was deleted.

  - `object: "organization.spend_alert.deleted"`

    Always `organization.spend_alert.deleted`.

    - `"organization.spend_alert.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/spend_alerts/$ALERT_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.spend_alert.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/spend_alerts/alert_abc123 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "id": "alert_abc123",
    "object": "organization.spend_alert.deleted",
    "deleted": true
}
```

## Domain Types

### Organization Spend Alert

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

### Organization Spend Alert Deleted

- `OrganizationSpendAlertDeleted object { id, deleted, object }`

  Confirmation payload returned after deleting an organization spend alert.

  - `id: string`

    The deleted spend alert ID.

  - `deleted: boolean`

    Whether the spend alert was deleted.

  - `object: "organization.spend_alert.deleted"`

    Always `organization.spend_alert.deleted`.

    - `"organization.spend_alert.deleted"`
