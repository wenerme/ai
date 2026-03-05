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
