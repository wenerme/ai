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
