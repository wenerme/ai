## Create project service account API key

**post** `/organization/projects/{project_id}/service_accounts/{service_account_id}/api_keys`

Creates an API key for a service account in the project.

### Path Parameters

- `project_id: string`

  The ID of the project.

- `service_account_id: string`

  The ID of the service account.

### Body Parameters

- `name: optional string`

  API key name.

- `scopes: optional array of string`

  API key scopes.

### Returns

- `id: string`

  The identifier of the API key.

- `created_at: number`

  The Unix timestamp (in seconds) when the API key was created.

- `name: string`

  The name of the API key.

- `object: "organization.project.service_account.api_key"`

  The object type, which is always `organization.project.service_account.api_key`

  - `"organization.project.service_account.api_key"`

- `value: string`

  The unredacted API key value.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID/api_keys \
    -X POST \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account.api_key",
  "value": "value"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/service_accounts/svc_acct_abc/api_keys \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Production App",
      "scopes": ["api.responses.write"]
  }'
```

#### Response

```json
{
    "object": "organization.project.service_account.api_key",
    "value": "sk-abcdefghijklmnop123",
    "name": "Production App",
    "created_at": 1711471533,
    "id": "key_abc"
}
```
