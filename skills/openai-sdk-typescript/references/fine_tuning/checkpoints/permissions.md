# Permissions

## Retrieve

`client.fineTuning.checkpoints.permissions.retrieve(stringfineTunedModelCheckpoint, PermissionRetrieveParamsquery?, RequestOptionsoptions?): PermissionRetrieveResponse`

**get** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.

### Parameters

- `fineTunedModelCheckpoint: string`

- `query: PermissionRetrieveParams`

  - `after?: string`

    Identifier for the last permission ID from the previous pagination request.

  - `limit?: number`

    Number of permissions to retrieve.

  - `order?: "ascending" | "descending"`

    The order in which to retrieve permissions.

    - `"ascending"`

    - `"descending"`

  - `project_id?: string`

    The ID of the project to get permissions for.

### Returns

- `PermissionRetrieveResponse`

  - `data: Array<Data>`

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

  - `first_id?: string | null`

  - `last_id?: string | null`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const permission = await client.fineTuning.checkpoints.permissions.retrieve(
  'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
);

console.log(permission.first_id);
```

## List

`client.fineTuning.checkpoints.permissions.list(stringfineTunedModelCheckpoint, PermissionListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<PermissionListResponse>`

**get** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.

### Parameters

- `fineTunedModelCheckpoint: string`

- `query: PermissionListParams`

  - `after?: string`

    Identifier for the last permission ID from the previous pagination request.

  - `limit?: number`

    Number of permissions to retrieve.

  - `order?: "ascending" | "descending"`

    The order in which to retrieve permissions.

    - `"ascending"`

    - `"descending"`

  - `project_id?: string`

    The ID of the project to get permissions for.

### Returns

- `PermissionListResponse`

  The `checkpoint.permission` object represents a permission for a fine-tuned model checkpoint.

  - `id: string`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: "checkpoint.permission"`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: string`

    The project identifier that the permission is for.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const permissionListResponse of client.fineTuning.checkpoints.permissions.list(
  'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
)) {
  console.log(permissionListResponse.id);
}
```

## Create

`client.fineTuning.checkpoints.permissions.create(stringfineTunedModelCheckpoint, PermissionCreateParamsbody, RequestOptionsoptions?): Page<PermissionCreateResponse>`

**post** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** Calling this endpoint requires an [admin API key](../admin-api-keys).

This enables organization owners to share fine-tuned models with other projects in their organization.

### Parameters

- `fineTunedModelCheckpoint: string`

- `body: PermissionCreateParams`

  - `project_ids: Array<string>`

    The project identifiers to grant access to.

### Returns

- `PermissionCreateResponse`

  The `checkpoint.permission` object represents a permission for a fine-tuned model checkpoint.

  - `id: string`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: "checkpoint.permission"`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: string`

    The project identifier that the permission is for.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const permissionCreateResponse of client.fineTuning.checkpoints.permissions.create(
  'ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd',
  { project_ids: ['string'] },
)) {
  console.log(permissionCreateResponse.id);
}
```

## Delete

`client.fineTuning.checkpoints.permissions.delete(stringpermissionID, PermissionDeleteParamsparams, RequestOptionsoptions?): PermissionDeleteResponse`

**delete** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.

### Parameters

- `permissionID: string`

- `params: PermissionDeleteParams`

  - `fine_tuned_model_checkpoint: string`

    The ID of the fine-tuned model checkpoint to delete a permission for.

### Returns

- `PermissionDeleteResponse`

  - `id: string`

    The ID of the fine-tuned model checkpoint permission that was deleted.

  - `deleted: boolean`

    Whether the fine-tuned model checkpoint permission was successfully deleted.

  - `object: "checkpoint.permission"`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const permission = await client.fineTuning.checkpoints.permissions.delete(
  'cp_zc4Q7MP6XxulcVzj4MZdwsAB',
  { fine_tuned_model_checkpoint: 'ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd' },
);

console.log(permission.id);
```
