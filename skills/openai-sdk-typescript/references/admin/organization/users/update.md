## Modify user

`client.admin.organization.users.update(stringuserID, UserUpdateParamsbody, RequestOptionsoptions?): OrganizationUser`

**post** `/organization/users/{user_id}`

Modifies a user's role in the organization.

### Parameters

- `userID: string`

- `body: UserUpdateParams`

  - `developer_persona?: string | null`

    Developer persona metadata.

  - `role?: string | null`

    `owner` or `reader`

  - `role_id?: string | null`

    Role ID to assign to the user.

  - `technical_level?: string | null`

    Technical level metadata.

### Returns

- `OrganizationUser`

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

const organizationUser = await client.admin.organization.users.update('user_id');

console.log(organizationUser.id);
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
