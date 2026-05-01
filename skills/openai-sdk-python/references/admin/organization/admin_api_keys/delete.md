## Delete admin API key

`admin.organization.admin_api_keys.delete(strkey_id)  -> AdminAPIKeyDeleteResponse`

**delete** `/organization/admin_api_keys/{key_id}`

Delete an organization admin API key

### Parameters

- `key_id: str`

  The ID of the API key to be deleted.

### Returns

- `class AdminAPIKeyDeleteResponse: …`

  - `id: Optional[str]`

  - `deleted: Optional[bool]`

  - `object: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
admin_api_key = client.admin.organization.admin_api_keys.delete(
    "key_id",
)
print(admin_api_key.id)
```

#### Response

```json
{
  "id": "key_abc",
  "deleted": true,
  "object": "organization.admin_api_key.deleted"
}
```
