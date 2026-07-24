## Retrieve organization spend limit

**get** `/organization/spend_limit`

Get the organization's hard spend limit.

### Returns

- `OrganizationSpendLimit object { currency, enforcement, interval, 2 more }`

  Represents a hard spend limit configured at the organization level.

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

  - `object: "organization.spend_limit"`

    The object type, which is always `organization.spend_limit`.

    - `"organization.spend_limit"`

  - `threshold_amount: number`

    The hard spend limit amount, in cents.

### Example

```http
curl https://api.openai.com/v1/organization/spend_limit \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/spend_limit \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.spend_limit",
    "threshold_amount": 10000,
    "currency": "USD",
    "interval": "month",
    "enforcement": {
        "status": "enforcing"
    }
}
```
