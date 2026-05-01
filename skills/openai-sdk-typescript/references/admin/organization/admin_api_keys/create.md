## Create admin API key

`client.admin.organization.adminAPIKeys.create(AdminAPIKeyCreateParamsbody, RequestOptionsoptions?): AdminAPIKey`

**post** `/organization/admin_api_keys`

Create an organization admin API key

### Parameters

- `body: AdminAPIKeyCreateParams`

  - `name: string`

### Returns

- `AdminAPIKey`

  Represents an individual Admin API key in an org.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number | null`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name: string`

    The name of the API key

  - `object: string`

    The object type, which is always `organization.admin_api_key`

  - `owner: Owner`

    - `id?: string`

      The identifier, which can be referenced in API endpoints

    - `created_at?: number`

      The Unix timestamp (in seconds) of when the user was created

    - `name?: string`

      The name of the user

    - `object?: string`

      The object type, which is always organization.user

    - `role?: string`

      Always `owner`

    - `type?: string`

      Always `user`

  - `redacted_value: string`

    The redacted value of the API key

  - `value?: string`

    The value of the API key. Only shown on create.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const adminAPIKey = await client.admin.organization.adminAPIKeys.create({ name: 'New Admin Key' });

console.log(adminAPIKey.id);
```

#### Response

```json
{
  "id": "key_abc",
  "created_at": 1711471533,
  "last_used_at": 1711471534,
  "name": "Administration Key",
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
  "value": "sk-admin-1234abcd"
}
```
