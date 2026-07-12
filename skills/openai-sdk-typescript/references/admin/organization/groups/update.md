## Update group

`client.admin.organization.groups.update(stringgroupID, GroupUpdateParamsbody, RequestOptionsoptions?): GroupUpdateResponse`

**post** `/organization/groups/{group_id}`

Updates a group's information.

### Parameters

- `groupID: string`

- `body: GroupUpdateParams`

  - `name: string`

    New display name for the group.

### Returns

- `GroupUpdateResponse`

  Response returned after updating a group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Updated display name for the group.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.groups.update('group_id', { name: 'x' });

console.log(group.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "is_scim_managed": true,
  "name": "name"
}
```
