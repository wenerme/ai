# Spend Limit

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

## Update project spend limit

`admin.organization.projects.spend_limit.update(strproject_id, SpendLimitUpdateParams**kwargs)  -> ProjectSpendLimit`

**post** `/organization/projects/{project_id}/spend_limit`

Create or replace a project's hard spend limit.

### Parameters

- `project_id: str`

- `currency: Literal["USD"]`

  The currency for the threshold amount. Currently, only `USD` is supported.

  - `"USD"`

- `interval: Literal["month"]`

  The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

  - `"month"`

- `threshold_amount: int`

  The hard spend limit amount, in cents.

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
project_spend_limit = client.admin.organization.projects.spend_limit.update(
    project_id="proj_123",
    currency="USD",
    interval="month",
    threshold_amount=1,
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

## Domain Types

### Project Spend Limit

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

### Project Spend Limit Deleted

- `class ProjectSpendLimitDeleted: …`

  Confirmation payload returned after deleting a project hard spend limit.

  - `deleted: bool`

    Whether the hard spend limit was deleted.

  - `object: Literal["project.spend_limit.deleted"]`

    The object type, which is always `project.spend_limit.deleted`.

    - `"project.spend_limit.deleted"`
