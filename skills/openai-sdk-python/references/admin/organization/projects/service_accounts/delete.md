## Delete project service account

`admin.organization.projects.service_accounts.delete(strservice_account_id, ServiceAccountDeleteParams**kwargs)  -> ServiceAccountDeleteResponse`

**delete** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Deletes a service account from the project.

Returns confirmation of service account deletion, or an error if the project
is archived (archived projects have no service accounts).

### Parameters

- `project_id: str`

- `service_account_id: str`

### Returns

- `class ServiceAccountDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.service_account.deleted"]`

    - `"organization.project.service_account.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
service_account = client.admin.organization.projects.service_accounts.delete(
    service_account_id="service_account_id",
    project_id="project_id",
)
print(service_account.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.service_account.deleted"
}
```
