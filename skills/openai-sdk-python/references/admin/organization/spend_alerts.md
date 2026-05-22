# Spend Alerts

## List organization spend alerts

`admin.organization.spend_alerts.list(SpendAlertListParams**kwargs)  -> SyncConversationCursorPage[OrganizationSpendAlert]`

**get** `/organization/spend_alerts`

Lists organization spend alerts.

### Parameters

- `after: Optional[str]`

  Cursor for pagination. Provide the ID of the last spend alert from the previous response to fetch the next page.

- `before: Optional[str]`

  Cursor for pagination. Provide the ID of the first spend alert from the previous response to fetch the previous page.

- `limit: Optional[int]`

  A limit on the number of spend alerts to return. Defaults to 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned spend alerts.

  - `"asc"`

  - `"desc"`

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
page = client.admin.organization.spend_alerts.list()
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
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
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

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

## Update organization spend alert

`admin.organization.spend_alerts.update(stralert_id, SpendAlertUpdateParams**kwargs)  -> OrganizationSpendAlert`

**post** `/organization/spend_alerts/{alert_id}`

Updates an organization spend alert.

### Parameters

- `alert_id: str`

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
organization_spend_alert = client.admin.organization.spend_alerts.update(
    alert_id="alert_id",
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

## Delete organization spend alert

`admin.organization.spend_alerts.delete(stralert_id)  -> OrganizationSpendAlertDeleted`

**delete** `/organization/spend_alerts/{alert_id}`

Deletes an organization spend alert.

### Parameters

- `alert_id: str`

### Returns

- `class OrganizationSpendAlertDeleted: …`

  Confirmation payload returned after deleting an organization spend alert.

  - `id: str`

    The deleted spend alert ID.

  - `deleted: bool`

    Whether the spend alert was deleted.

  - `object: Literal["organization.spend_alert.deleted"]`

    Always `organization.spend_alert.deleted`.

    - `"organization.spend_alert.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
organization_spend_alert_deleted = client.admin.organization.spend_alerts.delete(
    "alert_id",
)
print(organization_spend_alert_deleted.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.spend_alert.deleted"
}
```

## Domain Types

### Organization Spend Alert

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

### Organization Spend Alert Deleted

- `class OrganizationSpendAlertDeleted: …`

  Confirmation payload returned after deleting an organization spend alert.

  - `id: str`

    The deleted spend alert ID.

  - `deleted: bool`

    Whether the spend alert was deleted.

  - `object: Literal["organization.spend_alert.deleted"]`

    Always `organization.spend_alert.deleted`.

    - `"organization.spend_alert.deleted"`
