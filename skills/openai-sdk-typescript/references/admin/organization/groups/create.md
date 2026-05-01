## Create group

`client.admin.organization.groups.create(GroupCreateParamsbody, RequestOptionsoptions?): Group`

**post** `/organization/groups`

Creates a new group in the organization.

### Parameters

- `body: GroupCreateParams`

  - `name: string`

    Human readable name for the group.

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

const group = await client.admin.organization.groups.create({ name: 'x' });

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
