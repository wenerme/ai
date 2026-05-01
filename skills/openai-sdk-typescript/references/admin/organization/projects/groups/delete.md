## Remove project group

`client.admin.organization.projects.groups.delete(stringgroupID, GroupDeleteParamsparams, RequestOptionsoptions?): GroupDeleteResponse`

**delete** `/organization/projects/{project_id}/groups/{group_id}`

Revokes a group's access to a project.

### Parameters

- `groupID: string`

- `params: GroupDeleteParams`

  - `project_id: string`

    The ID of the project to update.

### Returns

- `GroupDeleteResponse`

  Confirmation payload returned after removing a group from a project.

  - `deleted: boolean`

    Whether the group membership in the project was removed.

  - `object: "project.group.deleted"`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.projects.groups.delete('group_id', {
  project_id: 'project_id',
});

console.log(group.deleted);
```

#### Response

```json
{
  "deleted": true,
  "object": "project.group.deleted"
}
```
