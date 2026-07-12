## Create project spend alert

`admin.organization.projects.spend_alerts.create(strproject_id, SpendAlertCreateParams**kwargs)  -> ProjectSpendAlert`

**post** `/organization/projects/{project_id}/spend_alerts`

Creates a project spend alert.

### Parameters

- `project_id: str`

- `currency: Literal["USD"]`

  The currency for the threshold amount.

  - `"USD"`

- `interval: Literal["month"]`

  The time interval for evaluating spend against the threshold.

  - `"month"`

- `notification_channel: NotificationChannel`

  Email notification settings for a spend alert.

  - `recipients: Sequence[str]`

    Email addresses that receive the spend alert notification.

  - `type: Literal["email"]`

    The notification channel type. Currently only `email` is supported.

    - `"email"`

  - `subject_prefix: Optional[str]`

    Optional subject prefix for alert emails.

- `threshold_amount: int`

  The alert threshold amount, in cents.

### Returns

- `class ProjectSpendAlert: …`

  Represents a spend alert configured at the project level.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `currency: Literal["USD"]`

    The currency for the threshold amount.

    - `"USD"`

  - `interval: Literal["month"]`

    The time interval for evaluating spend against the threshold.

    - `"month"`

  - `notification_channel: NotificationChannel`

    Email notification settings for a spend alert.

    - `recipients: List[str]`

      Email addresses that receive the spend alert notification.

    - `type: Literal["email"]`

      The notification channel type. Currently only `email` is supported.

      - `"email"`

    - `subject_prefix: Optional[str]`

      Optional subject prefix for alert emails.

  - `object: Literal["project.spend_alert"]`

    The object type, which is always `project.spend_alert`.

    - `"project.spend_alert"`

  - `threshold_amount: int`

    The alert threshold amount, in cents.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_spend_alert = client.admin.organization.projects.spend_alerts.create(
    project_id="project_id",
    currency="USD",
    interval="month",
    notification_channel={
        "recipients": ["string"],
        "type": "email",
    },
    threshold_amount=0,
)
print(project_spend_alert.id)
```

#### Response

```json
{
  "id": "id",
  "currency": "USD",
  "interval": "month",
  "notification_channel": {
    "recipients": [
      "string"
    ],
    "type": "email",
    "subject_prefix": "subject_prefix"
  },
  "object": "project.spend_alert",
  "threshold_amount": 0
}
```
