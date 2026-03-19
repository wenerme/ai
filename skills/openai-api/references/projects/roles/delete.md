## Delete project role

**delete** `/projects/{project_id}/roles/{role_id}`

Deletes a custom role from a project.

### Path Parameters

- `project_id: string`

- `role_id: string`

### Returns

- `id: string`

  Identifier of the deleted role.

- `deleted: boolean`

  Whether the role was deleted.

- `object: "role.deleted"`

  Always `role.deleted`.

  - `"role.deleted"`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "role.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/projects/proj_abc123/roles/role_01J1F8PROJ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "role.deleted",
    "id": "role_01J1F8PROJ",
    "deleted": true
}
```
