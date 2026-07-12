## Delete group

`client.admin.organization.groups.delete(stringgroupID, RequestOptionsoptions?): GroupDeleteResponse`

**delete** `/organization/groups/{group_id}`

Deletes a group from the organization.

### Parameters

- `groupID: string`

### Returns

- `GroupDeleteResponse`

  Confirmation payload returned after deleting a group.

  - `id: string`

    Identifier of the deleted group.

  - `deleted: boolean`

    Whether the group was deleted.

  - `object: "group.deleted"`

    Always `group.deleted`.

    - `"group.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.groups.delete('group_id');

console.log(group.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "group.deleted"
}
```
