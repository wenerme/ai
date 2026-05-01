## Retrieve admin API key

`admin.organization.admin_api_keys.retrieve(strkey_id)  -> AdminAPIKey`

**get** `/organization/admin_api_keys/{key_id}`

Retrieve a single organization API key

### Parameters

- `key_id: str`

  The ID of the API key.

### Returns

- `class AdminAPIKey: …`

  Represents an individual Admin API key in an org.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name: str`

    The name of the API key

  - `object: str`

    The object type, which is always `organization.admin_api_key`

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

  - `value: Optional[str]`

    The value of the API key. Only shown on create.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
admin_api_key = client.admin.organization.admin_api_keys.retrieve(
    "key_id",
)
print(admin_api_key.id)
```

#### Response

```json
{
  "id": "key_abc",
  "created_at": 1711471533,
  "last_used_at": 1711471534,
  "name": "Administration Key",
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
  "value": "sk-admin-1234abcd"
}
```
