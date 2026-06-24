## Retrieve project service account

`admin.organization.projects.service_accounts.retrieve(strservice_account_id, ServiceAccountRetrieveParams**kwargs)  -> ProjectServiceAccount`

**get** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Retrieves a service account in the project.

### Parameters

- `project_id: str`

- `service_account_id: str`

### Returns

- `class ProjectServiceAccount: …`

  Represents an individual service account in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: str`

    The name of the service account

  - `object: Literal["organization.project.service_account"]`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: Literal["owner", "member"]`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_service_account = client.admin.organization.projects.service_accounts.retrieve(
    service_account_id="service_account_id",
    project_id="project_id",
)
print(project_service_account.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account",
  "role": "owner"
}
```
