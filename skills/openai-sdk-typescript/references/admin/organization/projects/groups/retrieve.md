## Retrieve project group

`client.admin.organization.projects.groups.retrieve(stringgroupID, GroupRetrieveParamsparams, RequestOptionsoptions?): ProjectGroup`

**get** `/organization/projects/{project_id}/groups/{group_id}`

Retrieves a project's group.

### Parameters

- `groupID: string`

- `params: GroupRetrieveParams`

  - `project_id: string`

    Path param: The ID of the project to inspect.

  - `group_type?: "group" | "tenant_group"`

    Query param: The type of group to retrieve.

    - `"group"`

    - `"tenant_group"`

### Returns

- `ProjectGroup`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

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

const projectGroup = await client.admin.organization.projects.groups.retrieve('group_id', {
  project_id: 'project_id',
});

console.log(projectGroup.group_id);
```

#### Response

```json
{
  "created_at": 0,
  "group_id": "group_id",
  "group_name": "group_name",
  "group_type": "group",
  "object": "project.group",
  "project_id": "project_id"
}
```
