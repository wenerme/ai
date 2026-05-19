## Delete project model permissions

**delete** `/organization/projects/{project_id}/model_permissions`

Deletes model permissions for a project.

### Path Parameters

- `project_id: string`

### Returns

- `ProjectModelPermissionsDeleted object { deleted, object }`

  Confirmation payload returned after deleting project model permissions.

  - `deleted: boolean`

    Whether the project model permissions were deleted.

  - `object: "project.model_permissions.deleted"`

    The object type, which is always `project.model_permissions.deleted`.

    - `"project.model_permissions.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/model_permissions \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "project.model_permissions.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/model_permissions \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "project.model_permissions.deleted",
    "deleted": true
}
```
