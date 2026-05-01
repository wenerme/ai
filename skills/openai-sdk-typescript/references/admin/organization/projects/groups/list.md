## List project groups

`client.admin.organization.projects.groups.list(stringprojectID, GroupListParamsquery?, RequestOptionsoptions?): CursorPage<ProjectGroup>`

**get** `/organization/projects/{project_id}/groups`

Lists the groups that have access to a project.

### Parameters

- `projectID: string`

- `query: GroupListParams`

  - `after?: string`

    Cursor for pagination. Provide the ID of the last group from the previous response to fetch the next page.

  - `limit?: number`

    A limit on the number of project groups to return. Defaults to 20.

  - `order?: "asc" | "desc"`

    Sort order for the returned groups.

    - `"asc"`

    - `"desc"`

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

// Automatically fetches more pages as needed.
for await (const projectGroup of client.admin.organization.projects.groups.list('project_id')) {
  console.log(projectGroup.group_id);
}
```

#### Response

```json
{
  "data": [
    {
      "created_at": 0,
      "group_id": "group_id",
      "group_name": "group_name",
      "object": "project.group",
      "project_id": "project_id"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```
