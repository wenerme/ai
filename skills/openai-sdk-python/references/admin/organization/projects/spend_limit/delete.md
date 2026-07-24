## Delete project spend limit

`admin.organization.projects.spend_limit.delete(strproject_id)  -> ProjectSpendLimitDeleted`

**delete** `/organization/projects/{project_id}/spend_limit`

Delete a project's hard spend limit.

### Parameters

- `project_id: str`

### Returns

- `class ProjectSpendLimitDeleted: …`

  Confirmation payload returned after deleting a project hard spend limit.

  - `deleted: bool`

    Whether the hard spend limit was deleted.

  - `object: Literal["project.spend_limit.deleted"]`

    The object type, which is always `project.spend_limit.deleted`.

    - `"project.spend_limit.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_spend_limit_deleted = client.admin.organization.projects.spend_limit.delete(
    "proj_123",
)
print(project_spend_limit_deleted.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "project.spend_limit.deleted"
}
```
