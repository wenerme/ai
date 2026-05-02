## Create admin API key

`client.admin.organization.adminAPIKeys.create(AdminAPIKeyCreateParamsbody, RequestOptionsoptions?): AdminAPIKeyCreateResponse`

**post** `/organization/admin_api_keys`

Create an organization admin API key

### Parameters

- `body: AdminAPIKeyCreateParams`

  - `name: string`

### Returns

- `AdminAPIKeyCreateResponse extends AdminAPIKey`

  Represents an individual Admin API key in an org.

  - `value: string`

    The value of the API key. Only shown on create.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const adminAPIKey = await client.admin.organization.adminAPIKeys.create({ name: 'New Admin Key' });

console.log(adminAPIKey);
```

#### Response

```json
{
  "id": "key_abc",
  "created_at": 1711471533,
  "object": "organization.admin_api_key",
  "owner": {
    "id": "sa_456",
    "created_at": 1711471533,
    "name": "My Service Account",
    "object": "organization.user",
    "role": "owner",
    "type": "user"
  },
  "redacted_value": "sk-admin...def",
  "last_used_at": 1711471534,
  "name": "Administration Key",
  "value": "sk-admin-1234abcd"
}
```
