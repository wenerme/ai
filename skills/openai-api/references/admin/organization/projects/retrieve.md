## Retrieve project

**get** `/organization/projects/{project_id}`

Retrieves a project.

### Path Parameters

- `project_id: string`

  The ID of the project.

### Returns

- `Project object { id, created_at, object, 5 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: integer`

    The Unix timestamp (in seconds) of when the project was created.

    `format: unixtime`

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional integer or null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

    `format: unixtime`

  - `external_key_id: optional string or null`

    The external key associated with the project.

  - `name: optional string or null`

    The name of the project. This appears in reporting.

  - `residency: optional ProjectResidency`

    The residency configuration for the project.

    - `"GLOBAL"`

    - `"US_STORAGE_PROCESSING"`

    - `"EU_STORAGE_PROCESSING"`

    - `"JP_STORAGE"`

    - `"JP_STORAGE_PROCESSING"`

    - `"KR_STORAGE"`

    - `"CA_STORAGE"`

    - `"SG_STORAGE"`

    - `"IN_STORAGE"`

    - `"IN_STORAGE_PROCESSING"`

    - `"AU_STORAGE"`

    - `"AU_STORAGE_PROCESSING"`

    - `"GB_STORAGE"`

    - `"AE_STORAGE"`

    - `"AE_STORAGE_PROCESSING"`

  - `status: optional string or null`

    `active` or `archived`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### 200 — Example

```json
{
  "id": "id",
  "created_at": 0,
  "object": "organization.project",
  "archived_at": 0,
  "external_key_id": "external_key_id",
  "name": "name",
  "residency": "GLOBAL",
  "status": "status"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response example

```json
{
    "id": "proj_abc",
    "object": "organization.project",
    "name": "Project example",
    "created_at": 1711471533,
    "archived_at": null,
    "status": "active"
}
```
