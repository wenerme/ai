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
