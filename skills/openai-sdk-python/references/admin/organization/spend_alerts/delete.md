## Delete organization spend alert

`admin.organization.spend_alerts.delete(stralert_id)  -> OrganizationSpendAlertDeleted`

**delete** `/organization/spend_alerts/{alert_id}`

Deletes an organization spend alert.

### Parameters

- `alert_id: str`

### Returns

- `class OrganizationSpendAlertDeleted: …`

  Confirmation payload returned after deleting an organization spend alert.

  - `id: str`

    The deleted spend alert ID.

  - `deleted: bool`

    Whether the spend alert was deleted.

  - `object: Literal["organization.spend_alert.deleted"]`

    Always `organization.spend_alert.deleted`.

    - `"organization.spend_alert.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
organization_spend_alert_deleted = client.admin.organization.spend_alerts.delete(
    "alert_id",
)
print(organization_spend_alert_deleted.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.spend_alert.deleted"
}
```
