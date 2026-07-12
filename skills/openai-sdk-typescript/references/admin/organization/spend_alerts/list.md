## List organization spend alerts

`client.admin.organization.spendAlerts.list(SpendAlertListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<OrganizationSpendAlert>`

**get** `/organization/spend_alerts`

Lists organization spend alerts.

### Parameters

- `query: SpendAlertListParams`

  - `after?: string`

    Cursor for pagination. Provide the ID of the last spend alert from the previous response to fetch the next page.

  - `before?: string`

    Cursor for pagination. Provide the ID of the first spend alert from the previous response to fetch the previous page.

  - `limit?: number`

    A limit on the number of spend alerts to return. Defaults to 20.

  - `order?: "asc" | "desc"`

    Sort order for the returned spend alerts.

    - `"asc"`

    - `"desc"`

### Returns

- `OrganizationSpendAlert`

  Represents a spend alert configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `currency: "USD"`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `object: "organization.spend_alert"`

    The object type, which is always `organization.spend_alert`.

    - `"organization.spend_alert"`

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const organizationSpendAlert of client.admin.organization.spendAlerts.list()) {
  console.log(organizationSpendAlert.id);
}
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
