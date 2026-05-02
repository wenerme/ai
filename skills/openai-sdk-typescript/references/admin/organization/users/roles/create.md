## Assign organization role to user

`client.admin.organization.users.roles.create(stringuserID, RoleCreateParamsbody, RequestOptionsoptions?): RoleCreateResponse`

**post** `/organization/users/{user_id}/roles`

Assigns an organization role to a user within the organization.

### Parameters

- `userID: string`

- `body: RoleCreateParams`

  - `role_id: string`

    Identifier of the role to assign.

### Returns

- `RoleCreateResponse`

  Role assignment linking a user to a role.

  - `object: "user.role"`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: string`

      Identifier for the role.

    - `description: string | null`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: Array<string>`

      Permissions granted by the role.

    - `predefined_role: boolean`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: string`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: string`

      The identifier, which can be referenced in API endpoints

    - `added_at: number`

      The Unix timestamp (in seconds) of when the user was added.

    - `object: "organization.user"`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `api_key_last_used_at?: number | null`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created?: number`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona?: string | null`

      The developer persona metadata for the user.

    - `email?: string | null`

      The email address of the user

    - `is_default?: boolean`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser?: boolean | null`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed?: boolean`

      Whether the user is managed through SCIM.

    - `is_service_account?: boolean`

      Whether the user is a service account.

    - `name?: string | null`

      The name of the user

    - `projects?: Projects | null`

      Projects associated with the user, if included.

      - `data: Array<Data>`

        - `id?: string | null`

        - `name?: string | null`

        - `role?: string | null`

      - `object: "list"`

        - `"list"`

    - `role?: string | null`

      `owner` or `reader`

    - `technical_level?: string | null`

      The technical level metadata for the user.

    - `user?: User`

      Nested user details.

      - `id: string`

      - `object: "user"`

        - `"user"`

      - `banned?: boolean | null`

      - `banned_at?: number | null`

      - `email?: string | null`

      - `enabled?: boolean | null`

      - `name?: string | null`

      - `picture?: string | null`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.users.roles.create('user_id', { role_id: 'role_id' });

console.log(role.object);
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
