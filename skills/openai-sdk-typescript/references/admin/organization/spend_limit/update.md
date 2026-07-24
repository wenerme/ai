## Update organization spend limit

`client.admin.organization.spendLimit.update(SpendLimitUpdateParamsbody, RequestOptionsoptions?): OrganizationSpendLimit`

**post** `/organization/spend_limit`

Create or replace the organization's hard spend limit.

### Parameters

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

- `OrganizationSpendLimit`

  Represents a hard spend limit configured at the organization level.

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

  - `object: "organization.spend_limit"`

    The object type, which is always `organization.spend_limit`.

    - `"organization.spend_limit"`

  - `threshold_amount: number`

    The hard spend limit amount, in cents.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const organizationSpendLimit = await client.admin.organization.spendLimit.update({
  currency: 'USD',
  interval: 'month',
  threshold_amount: 1,
});

console.log(organizationSpendLimit.currency);
```

#### Response

```json
{
  "currency": "USD",
  "enforcement": {
    "status": "inactive"
  },
  "interval": "month",
  "object": "organization.spend_limit",
  "threshold_amount": 0
}
```
