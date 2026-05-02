## Assign project role to user

`admin.organization.projects.users.roles.create(struser_id, RoleCreateParams**kwargs)  -> RoleCreateResponse`

**post** `/projects/{project_id}/users/{user_id}/roles`

Assigns a project role to a user within a project.

### Parameters

- `project_id: str`

- `user_id: str`

- `role_id: str`

  Identifier of the role to assign.

### Returns

- `class RoleCreateResponse: …`

  Role assignment linking a user to a role.

  - `object: Literal["user.role"]`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

  - `user: OrganizationUser`

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
role = client.admin.organization.projects.users.roles.create(
    user_id="user_id",
    project_id="project_id",
    role_id="role_id",
)
print(role.object)
```

#### Response

```json
{
  "object": "user.role",
  "role": {
    "id": "id",
    "description": "description",
    "name": "name",
    "object": "role",
    "permissions": [
      "string"
    ],
    "predefined_role": true,
    "resource_type": "resource_type"
  },
  "user": {
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
}
```
