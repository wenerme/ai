## Create

`fine_tuning.checkpoints.permissions.create(strfine_tuned_model_checkpoint, PermissionCreateParams**kwargs)  -> SyncPage[PermissionCreateResponse]`

**post** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** Calling this endpoint requires an [admin API key](../admin-api-keys).

This enables organization owners to share fine-tuned models with other projects in their organization.

### Parameters

- `fine_tuned_model_checkpoint: str`

- `project_ids: SequenceNotStr[str]`

  The project identifiers to grant access to.

### Returns

- `class PermissionCreateResponse: …`

  The `checkpoint.permission` object represents a permission for a fine-tuned model checkpoint.

  - `id: str`

    The permission identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the permission was created.

  - `object: Literal["checkpoint.permission"]`

    The object type, which is always "checkpoint.permission".

    - `"checkpoint.permission"`

  - `project_id: str`

    The project identifier that the permission is for.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.fine_tuning.checkpoints.permissions.create(
    fine_tuned_model_checkpoint="ft:gpt-4o-mini-2024-07-18:org:weather:B7R9VjQd",
    project_ids=["string"],
)
page = page.data[0]
print(page.id)
```
