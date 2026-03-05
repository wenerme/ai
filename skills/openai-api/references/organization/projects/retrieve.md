## Retrieve

**get** `/organization/projects/{project_id}`

Retrieves a project.

### Path Parameters

- `project_id: string`

### Returns

- `Project = object { id, created_at, name, 3 more }`

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

  - `status: "active" or "archived"`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
