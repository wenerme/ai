## List group users

`client.admin.organization.groups.users.list(stringgroupID, UserListParamsquery?, RequestOptionsoptions?): NextCursorPage<OrganizationGroupUser>`

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

- `OrganizationGroupUser`

  Represents an individual user returned when inspecting group membership.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string | null`

    The email address of the user.

  - `name: string`

    The name of the user.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const organizationGroupUser of client.admin.organization.groups.users.list('group_id')) {
  console.log(organizationGroupUser.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "email": "email",
      "name": "name"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```
