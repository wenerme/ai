## List all organization and project API keys.

`admin.organization.admin_api_keys.list(AdminAPIKeyListParams**kwargs)  -> SyncCursorPage[AdminAPIKey]`

**get** `/organization/admin_api_keys`

List organization API keys

### Parameters

- `after: Optional[str]`

  Return keys with IDs that come after this ID in the pagination order.

- `limit: Optional[int]`

  Maximum number of keys to return.

- `order: Optional[Literal["asc", "desc"]]`

  Order results by creation time, ascending or descending.

  - `"asc"`

  - `"desc"`

### Returns

- `class AdminAPIKey: …`

  Represents an individual Admin API key in an org.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: Literal["organization.admin_api_key"]`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

  - `owner: Owner`

    - `id: Optional[str]`

      The identifier, which can be referenced in API endpoints

    - `created_at: Optional[int]`

      The Unix timestamp (in seconds) of when the user was created

    - `name: Optional[str]`

      The name of the user

    - `object: Optional[str]`

      The object type, which is always organization.user

    - `role: Optional[str]`

      Always `owner`

    - `type: Optional[str]`

      Always `user`

  - `redacted_value: str`

    The redacted value of the API key

  - `last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name: Optional[str]`

    The name of the API key

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.admin_api_keys.list()
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "key_abc",
      "created_at": 1711471533,
      "object": "organization.admin_api_key",
      "owner": {
        "id": "sa_456",
        "created_at": 1711471533,
        "name": "My Service Account",
        "object": "organization.user",
        "role": "owner",
        "type": "user"
      },
      "redacted_value": "sk-admin...def",
      "last_used_at": 1711471534,
      "name": "Administration Key"
    }
  ],
  "has_more": false,
  "object": "list",
  "first_id": "key_abc",
  "last_id": "key_xyz"
}
```
