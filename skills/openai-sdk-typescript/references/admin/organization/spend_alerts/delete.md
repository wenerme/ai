## Delete organization spend alert

`client.admin.organization.spendAlerts.delete(stringalertID, RequestOptionsoptions?): OrganizationSpendAlertDeleted`

**delete** `/organization/spend_alerts/{alert_id}`

Deletes an organization spend alert.

### Parameters

- `alertID: string`

### Returns

- `OrganizationSpendAlertDeleted`

  Confirmation payload returned after deleting an organization spend alert.

  - `id: string`

    The deleted spend alert ID.

  - `deleted: boolean`

    Whether the spend alert was deleted.

  - `object: "organization.spend_alert.deleted"`

    Always `organization.spend_alert.deleted`.

    - `"organization.spend_alert.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const organizationSpendAlertDeleted = await client.admin.organization.spendAlerts.delete(
  'alert_id',
);

console.log(organizationSpendAlertDeleted.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.spend_alert.deleted"
}
```
