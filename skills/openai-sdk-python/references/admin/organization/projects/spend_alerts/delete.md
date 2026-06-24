## Delete project spend alert

`admin.organization.projects.spend_alerts.delete(stralert_id, SpendAlertDeleteParams**kwargs)  -> ProjectSpendAlertDeleted`

**delete** `/organization/projects/{project_id}/spend_alerts/{alert_id}`

Deletes a project spend alert.

### Parameters

- `project_id: str`

- `alert_id: str`

### Returns

- `class ProjectSpendAlertDeleted: …`

  Confirmation payload returned after deleting a project spend alert.

  - `id: str`

    The deleted spend alert ID.

  - `deleted: bool`

    Whether the spend alert was deleted.

  - `object: Literal["project.spend_alert.deleted"]`

    Always `project.spend_alert.deleted`.

    - `"project.spend_alert.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_spend_alert_deleted = client.admin.organization.projects.spend_alerts.delete(
    alert_id="alert_id",
    project_id="project_id",
)
print(project_spend_alert_deleted.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "project.spend_alert.deleted"
}
```
