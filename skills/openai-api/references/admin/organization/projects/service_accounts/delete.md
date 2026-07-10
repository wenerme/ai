## Delete project service account

**delete** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Delete project service account

### Path Parameters

- `project_id: string`

- `service_account_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.service_account.deleted"`

  - `"organization.project.service_account.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.service_account.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/service_accounts/svc_acct_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.service_account.deleted",
    "id": "svc_acct_abc",
    "deleted": true
}
```
