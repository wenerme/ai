# Spend Limit

## Delete project spend limit

**delete** `/organization/projects/{project_id}/spend_limit`

Delete a project's hard spend limit.

### Path Parameters

- `project_id: string`

  The ID of the project whose hard spend limit is being managed.

### Returns

- `ProjectSpendLimitDeleted object { deleted, object }`

  Confirmation payload returned after deleting a project hard spend limit.

  - `deleted: boolean`

    Whether the hard spend limit was deleted.

  - `object: "project.spend_limit.deleted" (default: "project.spend_limit.deleted")`

    The object type, which is always `project.spend_limit.deleted`.

    - `"project.spend_limit.deleted"`

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/spend_limit \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response example

```json
{
    "object": "project.spend_limit.deleted",
    "deleted": true
}
```

## Get project spend limit

**get** `/organization/projects/{project_id}/spend_limit`

Get a project's hard spend limit.

### Path Parameters

- `project_id: string`

  The ID of the project whose hard spend limit is being managed.

### Returns

- `ProjectSpendLimit object { currency, enforcement, interval, 3 more }`

  Represents a hard spend limit configured at the project level.

  - `currency: string or "USD"`

    The currency for the threshold amount. Currently, only `USD` is supported.

    - `string`

    - `"USD"`

      The currency for the threshold amount. Currently, only `USD` is supported.

      - `"USD"`

  - `enforcement: object { status }`

    The current enforcement state of the hard spend limit.

    - `status: string or "inactive" or "enforcing"`

      Whether the hard spend limit is currently enforcing.

      - `string`

      - `"inactive" or "enforcing"`

        Whether the hard spend limit is currently enforcing.

        - `"inactive"`

        - `"enforcing"`

  - `interval: string or "month"`

    The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

    - `string`

    - `"month"`

      The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

      - `"month"`

  - `notification_channel: object { recipients, type, subject_prefix }`

    Email notifications sent when the hard spend limit is reached.

    - `recipients: array of string`

    - `type: "email" (default: "email")`

      - `"email"`

    - `subject_prefix: optional string or null`

  - `object: "project.spend_limit" (default: "project.spend_limit")`

    The object type, which is always `project.spend_limit`.

    - `"project.spend_limit"`

  - `threshold_amount: integer`

    The hard spend limit amount, in cents.

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/spend_limit \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response example

```json
{
    "object": "project.spend_limit",
    "threshold_amount": 10000,
    "currency": "USD",
    "interval": "month",
    "enforcement": {
        "status": "enforcing"
    }
}
```

## Update project spend limit

**post** `/organization/projects/{project_id}/spend_limit`

Create or replace a project's hard spend limit.

### Path Parameters

- `project_id: string`

  The ID of the project whose hard spend limit is being managed.

### Body Parameters

Content type: `application/json`

- `currency: "USD"`

  The currency for the threshold amount. Currently, only `USD` is supported.

  - `"USD"`

- `interval: "month"`

  The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

  - `"month"`

- `threshold_amount: integer`

  The hard spend limit amount, in cents.

  `minimum: 1`

- `notification_channel: optional unknown or null`

  Configure email notifications when the spend limit is reached. Leave this out to keep the current settings, or send null to reset to owner-only notifications.

### Returns

- `ProjectSpendLimit object { currency, enforcement, interval, 3 more }`

  Represents a hard spend limit configured at the project level.

  - `currency: string or "USD"`

    The currency for the threshold amount. Currently, only `USD` is supported.

    - `string`

    - `"USD"`

      The currency for the threshold amount. Currently, only `USD` is supported.

      - `"USD"`

  - `enforcement: object { status }`

    The current enforcement state of the hard spend limit.

    - `status: string or "inactive" or "enforcing"`

      Whether the hard spend limit is currently enforcing.

      - `string`

      - `"inactive" or "enforcing"`

        Whether the hard spend limit is currently enforcing.

        - `"inactive"`

        - `"enforcing"`

  - `interval: string or "month"`

    The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

    - `string`

    - `"month"`

      The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

      - `"month"`

  - `notification_channel: object { recipients, type, subject_prefix }`

    Email notifications sent when the hard spend limit is reached.

    - `recipients: array of string`

    - `type: "email" (default: "email")`

      - `"email"`

    - `subject_prefix: optional string or null`

  - `object: "project.spend_limit" (default: "project.spend_limit")`

    The object type, which is always `project.spend_limit`.

    - `"project.spend_limit"`

  - `threshold_amount: integer`

    The hard spend limit amount, in cents.

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/spend_limit \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "threshold_amount": 10000,
      "currency": "USD",
      "interval": "month"
  }'
```

#### Response example

```json
{
    "object": "project.spend_limit",
    "threshold_amount": 10000,
    "currency": "USD",
    "interval": "month",
    "enforcement": {
        "status": "enforcing"
    }
}
```

## Domain Types

### Project Spend Limit

- `ProjectSpendLimit object { currency, enforcement, interval, 3 more }`

  Represents a hard spend limit configured at the project level.

  - `currency: string or "USD"`

    The currency for the threshold amount. Currently, only `USD` is supported.

    - `string`

    - `"USD"`

      The currency for the threshold amount. Currently, only `USD` is supported.

      - `"USD"`

  - `enforcement: object { status }`

    The current enforcement state of the hard spend limit.

    - `status: string or "inactive" or "enforcing"`

      Whether the hard spend limit is currently enforcing.

      - `string`

      - `"inactive" or "enforcing"`

        Whether the hard spend limit is currently enforcing.

        - `"inactive"`

        - `"enforcing"`

  - `interval: string or "month"`

    The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

    - `string`

    - `"month"`

      The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

      - `"month"`

  - `notification_channel: object { recipients, type, subject_prefix }`

    Email notifications sent when the hard spend limit is reached.

    - `recipients: array of string`

    - `type: "email" (default: "email")`

      - `"email"`

    - `subject_prefix: optional string or null`

  - `object: "project.spend_limit" (default: "project.spend_limit")`

    The object type, which is always `project.spend_limit`.

    - `"project.spend_limit"`

  - `threshold_amount: integer`

    The hard spend limit amount, in cents.

### Project Spend Limit Deleted

- `ProjectSpendLimitDeleted object { deleted, object }`

  Confirmation payload returned after deleting a project hard spend limit.

  - `deleted: boolean`

    Whether the hard spend limit was deleted.

  - `object: "project.spend_limit.deleted" (default: "project.spend_limit.deleted")`

    The object type, which is always `project.spend_limit.deleted`.

    - `"project.spend_limit.deleted"`
