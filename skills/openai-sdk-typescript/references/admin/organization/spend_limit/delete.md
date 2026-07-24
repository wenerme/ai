## Delete organization spend limit

`client.admin.organization.spendLimit.delete(RequestOptionsoptions?): OrganizationSpendLimitDeleted`

**delete** `/organization/spend_limit`

Delete the organization's hard spend limit.

### Returns

- `OrganizationSpendLimitDeleted`

  Confirmation payload returned after deleting an organization hard spend limit.

  - `deleted: boolean`

    Whether the hard spend limit was deleted.

  - `object: "organization.spend_limit.deleted"`

    The object type, which is always `organization.spend_limit.deleted`.

    - `"organization.spend_limit.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const organizationSpendLimitDeleted = await client.admin.organization.spendLimit.delete();

console.log(organizationSpendLimitDeleted.deleted);
```

#### Response

```json
{
  "deleted": true,
  "object": "organization.spend_limit.deleted"
}
```
