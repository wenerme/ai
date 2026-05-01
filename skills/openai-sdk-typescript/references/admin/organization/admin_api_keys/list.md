## List all organization and project API keys.

`client.admin.organization.adminAPIKeys.list(AdminAPIKeyListParamsquery?, RequestOptionsoptions?): CursorPage<AdminAPIKey>`

**get** `/organization/admin_api_keys`

List organization API keys

### Parameters

- `query: AdminAPIKeyListParams`

  - `after?: string | null`

    Return keys with IDs that come after this ID in the pagination order.

  - `limit?: number`

    Maximum number of keys to return.

  - `order?: "asc" | "desc"`

    Order results by creation time, ascending or descending.

    - `"asc"`

    - `"desc"`

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

// Automatically fetches more pages as needed.
for await (const adminAPIKey of client.admin.organization.adminAPIKeys.list()) {
  console.log(adminAPIKey.id);
}
```

#### Response

```json
{
  "data": [
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
  ],
  "first_id": "key_abc",
  "has_more": false,
  "last_id": "key_xyz",
  "object": "list"
}
```
