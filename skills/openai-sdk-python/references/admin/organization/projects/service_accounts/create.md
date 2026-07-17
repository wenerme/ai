## Create project service account

`admin.organization.projects.service_accounts.create(strproject_id, ServiceAccountCreateParams**kwargs)  -> ServiceAccountCreateResponse`

**post** `/organization/projects/{project_id}/service_accounts`

Creates a new service account in the project. By default, this also returns an unredacted API key for the service account.

### Parameters

- `project_id: str`

- `name: str`

  The name of the service account being created.

- `create_service_account_only: Optional[bool]`

  Create the service account without default roles or an API key.

### Returns

- `class ServiceAccountCreateResponse: …`

  - `id: str`

  - `api_key: Optional[APIKey]`

    - `id: str`

    - `created_at: int`

    - `name: str`

    - `object: Literal["organization.project.service_account.api_key"]`

      The object type, which is always `organization.project.service_account.api_key`

      - `"organization.project.service_account.api_key"`

    - `value: str`

  - `created_at: int`

  - `name: str`

  - `object: Literal["organization.project.service_account"]`

    - `"organization.project.service_account"`

  - `role: Literal["member", "none"]`

    Service accounts created with default project membership have role `member`. Accounts created with `create_service_account_only` have role `none`.

    - `"member"`

    - `"none"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
service_account = client.admin.organization.projects.service_accounts.create(
    project_id="project_id",
    name="name",
)
print(service_account.id)
```

#### Response

```json
{
  "id": "id",
  "api_key": {
    "id": "id",
    "created_at": 0,
    "name": "name",
    "object": "organization.project.service_account.api_key",
    "value": "value"
  },
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account",
  "role": "member"
}
```
