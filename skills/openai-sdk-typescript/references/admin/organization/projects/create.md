## Create project

`client.admin.organization.projects.create(ProjectCreateParamsbody, RequestOptionsoptions?): Project`

**post** `/organization/projects`

Create a new project in the organization. Projects can be created and archived, but cannot be deleted.

### Parameters

- `body: ProjectCreateParams`

  - `name: string`

    The friendly name of the project, this name appears in reports.

  - `external_key_id?: string | null`

    External key ID to associate with the project.

  - `geography?: string | null`

    Create the project with the specified data residency region. Your organization must have access to Data residency functionality in order to use. See [data residency controls](https://platform.openai.com/docs/guides/your-data#data-residency-controls) to review the functionality and limitations of setting this field.

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const project = await client.admin.organization.projects.create({ name: 'name' });

console.log(project.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "organization.project",
  "archived_at": 0,
  "external_key_id": "external_key_id",
  "name": "name",
  "status": "status"
}
```
