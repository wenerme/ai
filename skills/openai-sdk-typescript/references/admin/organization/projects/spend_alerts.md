# Spend Alerts

## List project spend alerts

`client.admin.organization.projects.spendAlerts.list(stringprojectID, SpendAlertListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectSpendAlert>`

**get** `/organization/projects/{project_id}/spend_alerts`

Lists project spend alerts.

### Parameters

- `projectID: string`

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

// Automatically fetches more pages as needed.
for await (const projectSpendAlert of client.admin.organization.projects.spendAlerts.list(
  'project_id',
)) {
  console.log(projectSpendAlert.id);
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

## Create project spend alert

`client.admin.organization.projects.spendAlerts.create(stringprojectID, SpendAlertCreateParamsbody, RequestOptionsoptions?): ProjectSpendAlert`

**post** `/organization/projects/{project_id}/spend_alerts`

Creates a project spend alert.

### Parameters

- `projectID: string`

- `body: SpendAlertCreateParams`

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

  - `threshold_amount: number`

    The alert threshold amount, in cents.

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

const projectSpendAlert = await client.admin.organization.projects.spendAlerts.create(
  'project_id',
  {
    currency: 'USD',
    interval: 'month',
    notification_channel: { recipients: ['string'], type: 'email' },
    threshold_amount: 0,
  },
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

## Update project spend alert

`client.admin.organization.projects.spendAlerts.update(stringalertID, SpendAlertUpdateParamsparams, RequestOptionsoptions?): ProjectSpendAlert`

**post** `/organization/projects/{project_id}/spend_alerts/{alert_id}`

Updates a project spend alert.

### Parameters

- `alertID: string`

- `params: SpendAlertUpdateParams`

  - `project_id: string`

    Path param: The ID of the project to update.

  - `currency: "USD"`

    Body param: The currency for the threshold amount.

    - `"USD"`

  - `interval: "month"`

    Body param: The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Body param: Email notification settings for a spend alert.

    - `recipients: Array<string>`

      Email addresses that receive the spend alert notification.

    - `type: "email"`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix?: string | null`

      Optional subject prefix for alert emails.

  - `threshold_amount: number`

    Body param: The alert threshold amount, in cents.

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

const projectSpendAlert = await client.admin.organization.projects.spendAlerts.update('alert_id', {
  project_id: 'project_id',
  currency: 'USD',
  interval: 'month',
  notification_channel: { recipients: ['string'], type: 'email' },
  threshold_amount: 0,
});

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

## Delete project spend alert

`client.admin.organization.projects.spendAlerts.delete(stringalertID, SpendAlertDeleteParamsparams, RequestOptionsoptions?): ProjectSpendAlertDeleted`

**delete** `/organization/projects/{project_id}/spend_alerts/{alert_id}`

Deletes a project spend alert.

### Parameters

- `alertID: string`

- `params: SpendAlertDeleteParams`

  - `project_id: string`

    The ID of the project to update.

### Returns

- `ProjectSpendAlertDeleted`

  Confirmation payload returned after deleting a project spend alert.

  - `id: string`

    The deleted spend alert ID.

  - `deleted: boolean`

    Whether the spend alert was deleted.

  - `object: "project.spend_alert.deleted"`

    Always `project.spend_alert.deleted`.

    - `"project.spend_alert.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectSpendAlertDeleted = await client.admin.organization.projects.spendAlerts.delete(
  'alert_id',
  { project_id: 'project_id' },
);

console.log(projectSpendAlertDeleted.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "project.spend_alert.deleted"
}
```

## Domain Types

### Project Spend Alert

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

### Project Spend Alert Deleted

- `ProjectSpendAlertDeleted`

  Confirmation payload returned after deleting a project spend alert.

  - `id: string`

    The deleted spend alert ID.

  - `deleted: boolean`

    Whether the spend alert was deleted.

  - `object: "project.spend_alert.deleted"`

    Always `project.spend_alert.deleted`.

    - `"project.spend_alert.deleted"`
