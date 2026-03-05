# Permissions

## Retrieve

**get** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.

### Path Parameters

- `fine_tuned_model_checkpoint: string`

### Query Parameters

- `after: optional string`

  Identifier for the last permission ID from the previous pagination request.

- `limit: optional number`

  Number of permissions to retrieve.

- `order: optional "ascending" or "descending"`

  The order in which to retrieve permissions.

  - `"ascending"`

  - `"descending"`

- `project_id: optional string`

  The ID of the project to get permissions for.

### Returns

- `data: array of object { id, created_at, object, project_id }`

  - `id: string`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: "checkpoint.permission"`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: string`

    The project identifier that the permission is for.

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/fine_tuning/checkpoints/$FINE_TUNED_MODEL_CHECKPOINT/permissions \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## List

**get** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.

### Path Parameters

- `fine_tuned_model_checkpoint: string`

### Query Parameters

- `after: optional string`

  Identifier for the last permission ID from the previous pagination request.

- `limit: optional number`

  Number of permissions to retrieve.

- `order: optional "ascending" or "descending"`

  The order in which to retrieve permissions.

  - `"ascending"`

  - `"descending"`

- `project_id: optional string`

  The ID of the project to get permissions for.

### Returns

- `data: array of object { id, created_at, object, project_id }`

  - `id: string`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: "checkpoint.permission"`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: string`

    The project identifier that the permission is for.

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/fine_tuning/checkpoints/$FINE_TUNED_MODEL_CHECKPOINT/permissions \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create

**post** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** Calling this endpoint requires an [admin API key](../admin-api-keys).

This enables organization owners to share fine-tuned models with other projects in their organization.

### Path Parameters

- `fine_tuned_model_checkpoint: string`

### Body Parameters

- `project_ids: array of string`

  The project identifiers to grant access to.

### Returns

- `data: array of object { id, created_at, object, project_id }`

  - `id: string`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: "checkpoint.permission"`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: string`

    The project identifier that the permission is for.

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/fine_tuning/checkpoints/$FINE_TUNED_MODEL_CHECKPOINT/permissions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "project_ids": [
            "string"
          ]
        }'
```

## Delete

**delete** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.

### Path Parameters

- `fine_tuned_model_checkpoint: string`

- `permission_id: string`

### Returns

- `id: string`

  The ID of the fine-tuned model checkpoint permission that was deleted.

- `deleted: boolean`

  Whether the fine-tuned model checkpoint permission was successfully deleted.

- `object: "checkpoint.permission"`

  The object type, which is always "checkpoint.permission".

  - `"checkpoint.permission"`

### Example

```http
curl https://api.openai.com/v1/fine_tuning/checkpoints/$FINE_TUNED_MODEL_CHECKPOINT/permissions/$PERMISSION_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
