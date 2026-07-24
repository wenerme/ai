## Delete organization spend limit

`admin.organization.spend_limit.delete()  -> OrganizationSpendLimitDeleted`

**delete** `/organization/spend_limit`

Delete the organization's hard spend limit.

### Returns

- `class OrganizationSpendLimitDeleted: …`

  Confirmation payload returned after deleting an organization hard spend limit.

  - `deleted: bool`

    Whether the hard spend limit was deleted.

  - `object: Literal["organization.spend_limit.deleted"]`

    The object type, which is always `organization.spend_limit.deleted`.

    - `"organization.spend_limit.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
organization_spend_limit_deleted = client.admin.organization.spend_limit.delete()
print(organization_spend_limit_deleted.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "organization.spend_limit.deleted"
}
```
