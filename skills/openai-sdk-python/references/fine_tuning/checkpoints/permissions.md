# Permissions

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

## List

`fine_tuning.checkpoints.permissions.list(strfine_tuned_model_checkpoint, PermissionListParams**kwargs)  -> SyncConversationCursorPage[PermissionListResponse]`

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

- `class PermissionListResponse: …`

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
page = client.fine_tuning.checkpoints.permissions.list(
    fine_tuned_model_checkpoint="ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
page = page.data[0]
print(page.id)
```

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
