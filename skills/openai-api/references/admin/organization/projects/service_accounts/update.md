## Update project service account

**post** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Updates a service account in the project.

### Path Parameters

- `project_id: string`

- `service_account_id: string`

### Body Parameters

- `name: optional string`

  The updated service account name.

- `role: optional "member" or "owner"`

  The updated service account role.

  - `"member"`

  - `"owner"`

### Returns

- `ProjectServiceAccount object { id, created_at, name, 2 more }`

  Represents an individual service account in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: string`

    The name of the service account

  - `object: "organization.project.service_account"`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: "owner" or "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account",
  "role": "owner"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/service_accounts/svc_acct_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Updated service account",
      "role": "member"
  }'
```

#### Response

```json
{
    "object": "organization.project.service_account",
    "id": "svc_acct_abc",
    "name": "Updated service account",
    "role": "member",
    "created_at": 1711471533
}
```
