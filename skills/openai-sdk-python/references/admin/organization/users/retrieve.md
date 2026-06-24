## Retrieve user

`admin.organization.users.retrieve(struser_id)  -> OrganizationUser`

**get** `/organization/users/{user_id}`

Retrieves a user by their identifier.

### Parameters

- `user_id: str`

### Returns

- `class OrganizationUser: …`

  Represents an individual `user` within an organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: Literal["organization.user"]`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: Optional[int]`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: Optional[str]`

    The developer persona metadata for the user.

  - `email: Optional[str]`

    The email address of the user

  - `is_default: Optional[bool]`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: Optional[bool]`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: Optional[bool]`

    Whether the user is managed through SCIM.

  - `is_service_account: Optional[bool]`

    Whether the user is a service account.

  - `name: Optional[str]`

    The name of the user

  - `projects: Optional[Projects]`

    Projects associated with the user, if included.

    - `data: List[ProjectsData]`

      - `id: Optional[str]`

      - `name: Optional[str]`

      - `role: Optional[str]`

    - `object: Literal["list"]`

      - `"list"`

  - `role: Optional[str]`

    `owner` or `reader`

  - `technical_level: Optional[str]`

    The technical level metadata for the user.

  - `user: Optional[User]`

    Nested user details.

    - `id: str`

    - `object: Literal["user"]`

      - `"user"`

    - `banned: Optional[bool]`

    - `banned_at: Optional[int]`

    - `email: Optional[str]`

    - `enabled: Optional[bool]`

    - `name: Optional[str]`

    - `picture: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
organization_user = client.admin.organization.users.retrieve(
    "user_id",
)
print(organization_user.id)
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.user",
  "api_key_last_used_at": 0,
  "created": 0,
  "developer_persona": "developer_persona",
  "email": "email",
  "is_default": true,
  "is_scale_tier_authorized_purchaser": true,
  "is_scim_managed": true,
  "is_service_account": true,
  "name": "name",
  "projects": {
    "data": [
      {
        "id": "id",
        "name": "name",
        "role": "role"
      }
    ],
    "object": "list"
  },
  "role": "role",
  "technical_level": "technical_level",
  "user": {
    "id": "id",
    "object": "user",
    "banned": true,
    "banned_at": 0,
    "email": "email",
    "enabled": true,
    "name": "name",
    "picture": "picture"
  }
}
```
