## List group users

`client.admin.organization.groups.users.list(stringgroupID, UserListParamsquery?, RequestOptionsoptions?): CursorPage<OrganizationUser>`

**get** `/organization/groups/{group_id}/users`

Lists the users assigned to a group.

### Parameters

- `groupID: string`

- `query: UserListParams`

  - `after?: string`

    A cursor for use in pagination. Provide the ID of the last user from the previous list response to retrieve the next page.

  - `limit?: number`

    A limit on the number of users to be returned. Limit can range between 0 and 1000, and the default is 100.

  - `order?: "asc" | "desc"`

    Specifies the sort order of users in the list.

    - `"asc"`

    - `"desc"`

### Returns

- `OrganizationUser`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `email: string`

    The email address of the user

  - `name: string`

    The name of the user

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `role: "owner" | "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const organizationUser of client.admin.organization.groups.users.list('group_id')) {
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
      "email": "email",
      "name": "name",
      "object": "organization.user",
      "role": "owner"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```
