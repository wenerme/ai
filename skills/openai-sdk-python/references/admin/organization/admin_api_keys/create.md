## Create admin API key

`admin.organization.admin_api_keys.create(AdminAPIKeyCreateParams**kwargs)  -> AdminAPIKeyCreateResponse`

**post** `/organization/admin_api_keys`

Create admin API key

### Parameters

- `name: str`

- `expires_in_seconds: Optional[int]`

  The number of seconds until the API key expires. Omit this field for a key that does not expire.

### Returns

- `class AdminAPIKeyCreateResponse: …`

  Represents an individual Admin API key in an org.

  - `value: str`

    The value of the API key. Only shown on create.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
admin_api_key = client.admin.organization.admin_api_keys.create(
    name="New Admin Key",
)
print(admin_api_key)
```

#### Response

```json
{
  "id": "key_abc",
  "created_at": 1711471533,
  "expires_at": 1714063533,
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
  "name": "Administration Key",
  "value": "sk-admin-1234abcd"
}
```
