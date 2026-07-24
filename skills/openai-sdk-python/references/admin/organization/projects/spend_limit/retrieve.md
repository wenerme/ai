## Retrieve project spend limit

`admin.organization.projects.spend_limit.retrieve(strproject_id)  -> ProjectSpendLimit`

**get** `/organization/projects/{project_id}/spend_limit`

Get a project's hard spend limit.

### Parameters

- `project_id: str`

### Returns

- `class ProjectSpendLimit: …`

  Represents a hard spend limit configured at the project level.

  - `currency: Union[str, Literal["USD"]]`

    The currency for the threshold amount. Currently, only `USD` is supported.

    - `str`

    - `Literal["USD"]`

      The currency for the threshold amount. Currently, only `USD` is supported.

      - `"USD"`

  - `enforcement: Enforcement`

    The current enforcement state of the hard spend limit.

    - `status: Union[str, Literal["inactive", "enforcing"]]`

      Whether the hard spend limit is currently enforcing.

      - `str`

      - `Literal["inactive", "enforcing"]`

        Whether the hard spend limit is currently enforcing.

        - `"inactive"`

        - `"enforcing"`

  - `interval: Union[str, Literal["month"]]`

    The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

    - `str`

    - `Literal["month"]`

      The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

      - `"month"`

  - `object: Literal["project.spend_limit"]`

    The object type, which is always `project.spend_limit`.

    - `"project.spend_limit"`

  - `threshold_amount: int`

    The hard spend limit amount, in cents.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_spend_limit = client.admin.organization.projects.spend_limit.retrieve(
    "proj_123",
)
print(project_spend_limit.currency)
```

#### Response

```json
{
  "currency": "USD",
  "enforcement": {
    "status": "inactive"
  },
  "interval": "month",
  "object": "project.spend_limit",
  "threshold_amount": 0
}
```
