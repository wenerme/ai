## Delete

`fine_tuning.checkpoints.permissions.delete(strpermission_id, PermissionDeleteParams**kwargs)  -> PermissionDeleteResponse`

**delete** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.

### Parameters

- `fine_tuned_model_checkpoint: str`

- `permission_id: str`

### Returns

- `class PermissionDeleteResponse: …`

  - `id: str`

    The ID of the fine-tuned model checkpoint permission that was deleted.

  - `deleted: bool`

    Whether the fine-tuned model checkpoint permission was successfully deleted.

  - `object: Literal["checkpoint.permission"]`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
permission = client.fine_tuning.checkpoints.permissions.delete(
    permission_id="cp_zc4Q7MP6XxulcVzj4MZdwsAB",
    fine_tuned_model_checkpoint="ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd",
)
print(permission.id)
```
