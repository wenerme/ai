# Spend Alerts

## List project spend alerts

`admin.organization.projects.spend_alerts.list(strproject_id, SpendAlertListParams**kwargs)  -> SyncConversationCursorPage[ProjectSpendAlert]`

**get** `/organization/projects/{project_id}/spend_alerts`

Lists project spend alerts.

### Parameters

- `project_id: str`

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
page = client.admin.organization.projects.spend_alerts.list(
    project_id="project_id",
)
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
      "object": "project.spend_alert",
      "threshold_amount": 0
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

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

## Update project spend alert

`admin.organization.projects.spend_alerts.update(stralert_id, SpendAlertUpdateParams**kwargs)  -> ProjectSpendAlert`

**post** `/organization/projects/{project_id}/spend_alerts/{alert_id}`

Updates a project spend alert.

### Parameters

- `project_id: str`

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
project_spend_alert = client.admin.organization.projects.spend_alerts.update(
    alert_id="alert_id",
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

## Delete project spend alert

`admin.organization.projects.spend_alerts.delete(stralert_id, SpendAlertDeleteParams**kwargs)  -> ProjectSpendAlertDeleted`

**delete** `/organization/projects/{project_id}/spend_alerts/{alert_id}`

Deletes a project spend alert.

### Parameters

- `project_id: str`

- `alert_id: str`

### Returns

- `class ProjectSpendAlertDeleted: …`

  Confirmation payload returned after deleting a project spend alert.

  - `id: str`

    The deleted spend alert ID.

  - `deleted: bool`

    Whether the spend alert was deleted.

  - `object: Literal["project.spend_alert.deleted"]`

    Always `project.spend_alert.deleted`.

    - `"project.spend_alert.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_spend_alert_deleted = client.admin.organization.projects.spend_alerts.delete(
    alert_id="alert_id",
    project_id="project_id",
)
print(project_spend_alert_deleted.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "project.spend_alert.deleted"
}
```

## Domain Types

### Project Spend Alert

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

### Project Spend Alert Deleted

- `class ProjectSpendAlertDeleted: …`

  Confirmation payload returned after deleting a project spend alert.

  - `id: str`

    The deleted spend alert ID.

  - `deleted: bool`

    Whether the spend alert was deleted.

  - `object: Literal["project.spend_alert.deleted"]`

    Always `project.spend_alert.deleted`.

    - `"project.spend_alert.deleted"`
