## List users

`client.admin.organization.users.list(UserListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<OrganizationUser>`

**get** `/organization/users`

Lists all of the users in the organization.

### Parameters

- `query: UserListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `emails?: Array<string>`

    Filter by the email address of users.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

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

// Automatically fetches more pages as needed.
for await (const organizationUser of client.admin.organization.users.list()) {
  console.log(organizationUser.id);
}
```

#### Response

```json
{
  "data": [
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
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```
