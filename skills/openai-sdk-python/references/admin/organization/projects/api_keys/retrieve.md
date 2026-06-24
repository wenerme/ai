## Retrieve project API key

`admin.organization.projects.api_keys.retrieve(strapi_key_id, APIKeyRetrieveParams**kwargs)  -> ProjectAPIKey`

**get** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Retrieves an API key in the project.

### Parameters

- `project_id: str`

- `api_key_id: str`

### Returns

- `class ProjectAPIKey: …`

  Represents an individual API key in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: str`

    The name of the API key

  - `object: Literal["organization.project.api_key"]`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account: Optional[OwnerServiceAccount]`

      The service account that owns a project API key.

      - `id: str`

        The identifier, which can be referenced in API endpoints

      - `created_at: int`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: str`

        The name of the service account.

      - `role: str`

        The service account's project role.

    - `type: Optional[Literal["user", "service_account"]]`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: Optional[OwnerUser]`

      The user that owns a project API key.

      - `id: str`

        The identifier, which can be referenced in API endpoints

      - `created_at: int`

        The Unix timestamp (in seconds) of when the user was created.

      - `email: str`

        The email address of the user.

      - `name: str`

        The name of the user.

      - `role: str`

        The user's project role.

  - `redacted_value: str`

    The redacted value of the API key

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_api_key = client.admin.organization.projects.api_keys.retrieve(
    api_key_id="api_key_id",
    project_id="project_id",
)
print(project_api_key.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "last_used_at": 0,
  "name": "name",
  "object": "organization.project.api_key",
  "owner": {
    "service_account": {
      "id": "id",
      "created_at": 0,
      "name": "name",
      "role": "role"
    },
    "type": "user",
    "user": {
      "id": "id",
      "created_at": 0,
      "email": "email",
      "name": "name",
      "role": "role"
    }
  },
  "redacted_value": "redacted_value"
}
```
