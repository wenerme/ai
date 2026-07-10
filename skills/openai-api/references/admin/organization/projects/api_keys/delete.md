## Delete project API key

**delete** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Delete project API key

### Path Parameters

- `project_id: string`

- `api_key_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.api_key.deleted"`

  - `"organization.project.api_key.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys/$API_KEY_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.api_key.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.api_key.deleted",
    "id": "key_abc",
    "deleted": true
}
```
