## Retrieve

`fine_tuning.checkpoints.permissions.retrieve(strfine_tuned_model_checkpoint, PermissionRetrieveParams**kwargs)  -> PermissionRetrieveResponse`

**get** `/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions`

**NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.

### Parameters

- `fine_tuned_model_checkpoint: str`

- `after: Optional[str]`

  Identifier for the last permission ID from the previous pagination request.

- `limit: Optional[int]`

  Number of permissions to retrieve.

- `order: Optional[Literal["ascending", "descending"]]`

  The order in which to retrieve permissions.

  - `"ascending"`

  - `"descending"`

- `project_id: Optional[str]`

  The ID of the project to get permissions for.

### Returns

- `class PermissionRetrieveResponse: …`

  - `data: List[Data]`

    - `id: str`

      The permission identifier, which can be referenced in the API endpoints.

    - `created_at: int`

      The Unix timestamp (in seconds) for when the permission was created.

    - `object: Literal["checkpoint.permission"]`

      The object type, which is always "checkpoint.permission".

      - `"checkpoint.permission"`

    - `project_id: str`

      The project identifier that the permission is for.

  - `has_more: bool`

  - `object: Literal["list"]`

    - `"list"`

  - `first_id: Optional[str]`

  - `last_id: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
permission = client.fine_tuning.checkpoints.permissions.retrieve(
    fine_tuned_model_checkpoint="ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
print(permission.first_id)
```
