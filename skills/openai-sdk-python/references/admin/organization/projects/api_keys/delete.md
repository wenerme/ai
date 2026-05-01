## Delete project API key

`admin.organization.projects.api_keys.delete(strkey_id, APIKeyDeleteParams**kwargs)  -> APIKeyDeleteResponse`

**delete** `/organization/projects/{project_id}/api_keys/{key_id}`

Deletes an API key from the project.

Returns confirmation of the key deletion, or an error if the key belonged to
a service account.

### Parameters

- `project_id: str`

- `key_id: str`

### Returns

- `class APIKeyDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.api_key.deleted"]`

    - `"organization.project.api_key.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
api_key = client.admin.organization.projects.api_keys.delete(
    key_id="key_id",
    project_id="project_id",
)
print(api_key.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.api_key.deleted"
}
```
