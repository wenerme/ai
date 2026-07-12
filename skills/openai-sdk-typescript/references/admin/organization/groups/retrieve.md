## Retrieve group

`client.admin.organization.groups.retrieve(stringgroupID, RequestOptionsoptions?): Group`

**get** `/organization/groups/{group_id}`

Retrieves a group.

### Parameters

- `groupID: string`

### Returns

- `Group`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

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

const group = await client.admin.organization.groups.retrieve('group_id');

console.log(group.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "group_type": "group",
  "is_scim_managed": true,
  "name": "name"
}
```
