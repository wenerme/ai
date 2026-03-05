## Create

**post** `/organization/projects/{project_id}/service_accounts`

Creates a new service account in the project. This also returns an unredacted API key for the service account.

### Path Parameters

- `project_id: string`

### Body Parameters

- `name: string`

  The name of the service account being created.

### Returns

- `id: string`

- `api_key: object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: number`

  - `name: string`

  - `object: "organization.project.service_account.api_key"`

    The object type, which is always `organization.project.service_account.api_key`

    - `"organization.project.service_account.api_key"`

  - `value: string`

- `created_at: number`

- `name: string`

- `object: "organization.project.service_account"`

  - `"organization.project.service_account"`

- `role: "member"`

  Service accounts can only have one role of type `member`

  - `"member"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "name"
        }'
```
