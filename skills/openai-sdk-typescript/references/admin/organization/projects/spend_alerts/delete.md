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
