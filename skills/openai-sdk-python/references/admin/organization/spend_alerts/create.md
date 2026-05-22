## Create organization spend alert

`admin.organization.spend_alerts.create(SpendAlertCreateParams**kwargs)  -> OrganizationSpendAlert`

**post** `/organization/spend_alerts`

Creates an organization spend alert.

### Parameters

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

- `class OrganizationSpendAlert: …`

  Represents a spend alert configured at the organization level.

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

  - `object: Literal["organization.spend_alert"]`

    The object type, which is always `organization.spend_alert`.

    - `"organization.spend_alert"`

  - `threshold_amount: int`

    The alert threshold amount, in cents.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
organization_spend_alert = client.admin.organization.spend_alerts.create(
    currency="USD",
    interval="month",
    notification_channel={
        "recipients": ["string"],
        "type": "email",
    },
    threshold_amount=0,
)
print(organization_spend_alert.id)
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
  "object": "organization.spend_alert",
  "threshold_amount": 0
}
```
