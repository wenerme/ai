## Retrieve admin API key

`client.admin.organization.adminAPIKeys.retrieve(stringkeyID, RequestOptionsoptions?): AdminAPIKey`

**get** `/organization/admin_api_keys/{key_id}`

Retrieve a single organization API key

### Parameters

- `keyID: string`

  The ID of the API key.

### Returns

- `AdminAPIKey`

  Represents an individual Admin API key in an org.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: "organization.admin_api_key"`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

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

  - `last_used_at?: number | null`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name?: string | null`

    The name of the API key

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const adminAPIKey = await client.admin.organization.adminAPIKeys.retrieve('key_id');

console.log(adminAPIKey.id);
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
  "name": "Administration Key"
}
```
