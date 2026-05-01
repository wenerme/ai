## Modify project

`client.admin.organization.projects.update(stringprojectID, ProjectUpdateParamsbody, RequestOptionsoptions?): Project`

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Parameters

- `projectID: string`

- `body: ProjectUpdateParams`

  - `name: string`

    The updated name of the project, this name appears in reports.

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: string`

    The name of the project. This appears in reporting.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: "active" | "archived"`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const project = await client.admin.organization.projects.update('project_id', { name: 'name' });

console.log(project.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project",
  "status": "active",
  "archived_at": 0
}
```
