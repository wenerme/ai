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
