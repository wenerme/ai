## Modify project model permissions

**post** `/organization/projects/{project_id}/model_permissions`

Updates model permissions for a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `mode: "allow_list" or "deny_list"`

  The model permissions mode to apply.

  - `"allow_list"`

  - `"deny_list"`

- `model_ids: array of string`

  The model IDs included in this permissions policy.

### Returns

- `ProjectModelPermissions object { mode, model_ids, object }`

  Represents the model allowlist or denylist policy for a project.

  - `mode: "allow_list" or "deny_list"`

    Whether the project uses an allowlist or a denylist.

    - `"allow_list"`

    - `"deny_list"`

  - `model_ids: array of string`

    The model IDs included in the model permissions policy.

  - `object: "project.model_permissions"`

    The object type, which is always `project.model_permissions`.

    - `"project.model_permissions"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/model_permissions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "mode": "allow_list",
          "model_ids": [
            "string"
          ]
        }'
```

#### Response

```json
{
  "mode": "allow_list",
  "model_ids": [
    "string"
  ],
  "object": "project.model_permissions"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/model_permissions \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "mode": "deny_list",
      "model_ids": [
          "o3"
      ]
  }'
```

#### Response

```json
{
    "object": "project.model_permissions",
    "mode": "deny_list",
    "model_ids": [
        "o3"
    ]
}
```
