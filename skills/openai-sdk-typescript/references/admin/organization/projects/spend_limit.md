# Spend Limit

## Retrieve project spend limit

`client.admin.organization.projects.spendLimit.retrieve(stringprojectID, RequestOptionsoptions?): ProjectSpendLimit`

**get** `/organization/projects/{project_id}/spend_limit`

Get a project's hard spend limit.

### Parameters

- `projectID: string`

### Returns

- `ProjectSpendLimit`

  Represents a hard spend limit configured at the project level.

  - `currency: (string & {}) | "USD"`

    The currency for the threshold amount. Currently, only `USD` is supported.

    - `(string & {})`

    - `"USD"`

      - `"USD"`

  - `enforcement: Enforcement`

    The current enforcement state of the hard spend limit.

    - `status: (string & {}) | "inactive" | "enforcing"`

      Whether the hard spend limit is currently enforcing.

      - `(string & {})`

      - `"inactive" | "enforcing"`

        - `"inactive"`

        - `"enforcing"`

  - `interval: (string & {}) | "month"`

    The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

    - `(string & {})`

    - `"month"`

      - `"month"`

  - `object: "project.spend_limit"`

    The object type, which is always `project.spend_limit`.

    - `"project.spend_limit"`

  - `threshold_amount: number`

    The hard spend limit amount, in cents.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectSpendLimit = await client.admin.organization.projects.spendLimit.retrieve('proj_123');

console.log(projectSpendLimit.currency);
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

`client.admin.organization.projects.spendLimit.update(stringprojectID, SpendLimitUpdateParamsbody, RequestOptionsoptions?): ProjectSpendLimit`

**post** `/organization/projects/{project_id}/spend_limit`

Create or replace a project's hard spend limit.

### Parameters

- `projectID: string`

- `body: SpendLimitUpdateParams`

  - `currency: "USD"`

    The currency for the threshold amount. Currently, only `USD` is supported.

    - `"USD"`

  - `interval: "month"`

    The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

    - `"month"`

  - `threshold_amount: number`

    The hard spend limit amount, in cents.

### Returns

- `ProjectSpendLimit`

  Represents a hard spend limit configured at the project level.

  - `currency: (string & {}) | "USD"`

    The currency for the threshold amount. Currently, only `USD` is supported.

    - `(string & {})`

    - `"USD"`

      - `"USD"`

  - `enforcement: Enforcement`

    The current enforcement state of the hard spend limit.

    - `status: (string & {}) | "inactive" | "enforcing"`

      Whether the hard spend limit is currently enforcing.

      - `(string & {})`

      - `"inactive" | "enforcing"`

        - `"inactive"`

        - `"enforcing"`

  - `interval: (string & {}) | "month"`

    The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

    - `(string & {})`

    - `"month"`

      - `"month"`

  - `object: "project.spend_limit"`

    The object type, which is always `project.spend_limit`.

    - `"project.spend_limit"`

  - `threshold_amount: number`

    The hard spend limit amount, in cents.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectSpendLimit = await client.admin.organization.projects.spendLimit.update('proj_123', {
  currency: 'USD',
  interval: 'month',
  threshold_amount: 1,
});

console.log(projectSpendLimit.currency);
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

`client.admin.organization.projects.spendLimit.delete(stringprojectID, RequestOptionsoptions?): ProjectSpendLimitDeleted`

**delete** `/organization/projects/{project_id}/spend_limit`

Delete a project's hard spend limit.

### Parameters

- `projectID: string`

### Returns

- `ProjectSpendLimitDeleted`

  Confirmation payload returned after deleting a project hard spend limit.

  - `deleted: boolean`

    Whether the hard spend limit was deleted.

  - `object: "project.spend_limit.deleted"`

    The object type, which is always `project.spend_limit.deleted`.

    - `"project.spend_limit.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectSpendLimitDeleted = await client.admin.organization.projects.spendLimit.delete(
  'proj_123',
);

console.log(projectSpendLimitDeleted.deleted);
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

- `ProjectSpendLimit`

  Represents a hard spend limit configured at the project level.

  - `currency: (string & {}) | "USD"`

    The currency for the threshold amount. Currently, only `USD` is supported.

    - `(string & {})`

    - `"USD"`

      - `"USD"`

  - `enforcement: Enforcement`

    The current enforcement state of the hard spend limit.

    - `status: (string & {}) | "inactive" | "enforcing"`

      Whether the hard spend limit is currently enforcing.

      - `(string & {})`

      - `"inactive" | "enforcing"`

        - `"inactive"`

        - `"enforcing"`

  - `interval: (string & {}) | "month"`

    The time interval for evaluating spend against the threshold. Currently, only `month` is supported.

    - `(string & {})`

    - `"month"`

      - `"month"`

  - `object: "project.spend_limit"`

    The object type, which is always `project.spend_limit`.

    - `"project.spend_limit"`

  - `threshold_amount: number`

    The hard spend limit amount, in cents.

### Project Spend Limit Deleted

- `ProjectSpendLimitDeleted`

  Confirmation payload returned after deleting a project hard spend limit.

  - `deleted: boolean`

    Whether the hard spend limit was deleted.

  - `object: "project.spend_limit.deleted"`

    The object type, which is always `project.spend_limit.deleted`.

    - `"project.spend_limit.deleted"`
