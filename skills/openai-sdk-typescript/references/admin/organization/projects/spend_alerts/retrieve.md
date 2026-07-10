## Retrieve project spend alert

`client.admin.organization.projects.spendAlerts.retrieve(stringalertID, SpendAlertRetrieveParamsparams, RequestOptionsoptions?): ProjectSpendAlert`

**get** `/organization/projects/{project_id}/spend_alerts/{alert_id}`

Retrieve project spend alert

### Parameters

- `alertID: string`

- `params: SpendAlertRetrieveParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ProjectSpendAlert`

  Represents a spend alert configured at the project level.

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

  - `object: "project.spend_alert"`

    The object type, which is always `project.spend_alert`.

    - `"project.spend_alert"`

  - `threshold_amount: number`

    The alert threshold amount, in cents.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectSpendAlert = await client.admin.organization.projects.spendAlerts.retrieve(
  'alert_id',
  { project_id: 'project_id' },
);

console.log(projectSpendAlert.id);
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
  "object": "project.spend_alert",
  "threshold_amount": 0
}
```
