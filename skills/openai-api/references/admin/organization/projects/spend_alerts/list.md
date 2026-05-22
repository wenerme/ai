## List project spend alerts

**get** `/organization/projects/{project_id}/spend_alerts`

Lists project spend alerts.

### Path Parameters

- `project_id: string`

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

- `data: array of ProjectSpendAlert`

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

  - `object: "project.spend_alert"`

    The object type, which is always `project.spend_alert`.

    - `"project.spend_alert"`

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
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/spend_alerts \
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
      "object": "project.spend_alert",
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
curl https://api.openai.com/v1/organization/projects/proj_abc/spend_alerts?limit=20&order=asc \
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
            "object": "project.spend_alert",
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
