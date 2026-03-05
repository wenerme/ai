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
