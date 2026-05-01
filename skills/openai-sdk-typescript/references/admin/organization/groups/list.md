## List groups

`client.admin.organization.groups.list(GroupListParamsquery?, RequestOptionsoptions?): CursorPage<Group>`

**get** `/organization/groups`

Lists all groups in the organization.

### Parameters

- `query: GroupListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is a group ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with group_abc, your subsequent call can include `after=group_abc` in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of groups to be returned. Limit can range between 0 and 1000, and the default is 100.

  - `order?: "asc" | "desc"`

    Specifies the sort order of the returned groups.

    - `"asc"`

    - `"desc"`

### Returns

- `Group`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const group of client.admin.organization.groups.list()) {
  console.log(group.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "is_scim_managed": true,
      "name": "name"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```
