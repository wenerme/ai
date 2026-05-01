## Add project group

`client.admin.organization.projects.groups.create(stringprojectID, GroupCreateParamsbody, RequestOptionsoptions?): ProjectGroup`

**post** `/organization/projects/{project_id}/groups`

Grants a group access to a project.

### Parameters

- `projectID: string`

- `body: GroupCreateParams`

  - `group_id: string`

    Identifier of the group to add to the project.

  - `role: string`

    Identifier of the project role to grant to the group.

### Returns

- `ProjectGroup`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectGroup = await client.admin.organization.projects.groups.create('project_id', {
  group_id: 'group_id',
  role: 'role',
});

console.log(projectGroup.group_id);
```

#### Response

```json
{
  "created_at": 0,
  "group_id": "group_id",
  "group_name": "group_name",
  "object": "project.group",
  "project_id": "project_id"
}
```
