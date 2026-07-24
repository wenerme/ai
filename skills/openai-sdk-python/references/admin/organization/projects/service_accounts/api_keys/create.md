## Create project service account API key

`admin.organization.projects.service_accounts.api_keys.create(strservice_account_id, APIKeyCreateParams**kwargs)  -> APIKeyCreateResponse`

**post** `/organization/projects/{project_id}/service_accounts/{service_account_id}/api_keys`

Creates an API key for a service account in the project.

### Parameters

- `project_id: str`

  The ID of the project.

- `service_account_id: str`

  The ID of the service account.

- `name: Optional[str]`

  API key name.

- `scopes: Optional[Sequence[str]]`

  API key scopes.

### Returns

- `class APIKeyCreateResponse: …`

  - `id: str`

    The identifier of the API key.

  - `created_at: int`

    The Unix timestamp (in seconds) when the API key was created.

  - `name: str`

    The name of the API key.

  - `object: Literal["organization.project.service_account.api_key"]`

    The object type, which is always `organization.project.service_account.api_key`

    - `"organization.project.service_account.api_key"`

  - `value: str`

    The unredacted API key value.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
api_key = client.admin.organization.projects.service_accounts.api_keys.create(
    service_account_id="service_account_id",
    project_id="project_id",
)
print(api_key.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account.api_key",
  "value": "value"
}
```
