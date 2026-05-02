## Modify project

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Path Parameters

- `project_id: string`

### Body Parameters

- `external_key_id: optional string`

  External key ID to associate with the project.

- `geography: optional string`

  Geography for the project.

- `name: optional string`

  The updated name of the project, this name appears in reports.

### Returns

- `Project object { id, created_at, object, 4 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Project DEF"
  }'
```
