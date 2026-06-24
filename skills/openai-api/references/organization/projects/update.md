## Modify project

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Path Parameters

- `project_id: string`

### Body Parameters

- `name: string`

  The updated name of the project, this name appears in reports.

### Returns

- `Project object { id, created_at, name, 3 more }`

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
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "name"
        }'
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Project DEF"
  }'
```
