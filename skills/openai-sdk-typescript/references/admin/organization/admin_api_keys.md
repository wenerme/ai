# Admin API Keys

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
  ],
  "has_more": false,
  "object": "list",
  "first_id": "key_abc",
  "last_id": "key_xyz"
}
```

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

## Delete admin API key

`client.admin.organization.adminAPIKeys.delete(stringkeyID, RequestOptionsoptions?): AdminAPIKeyDeleteResponse`

**delete** `/organization/admin_api_keys/{key_id}`

Delete an organization admin API key

### Parameters

- `keyID: string`

  The ID of the API key to be deleted.

### Returns

- `AdminAPIKeyDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.admin_api_key.deleted"`

    - `"organization.admin_api_key.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const adminAPIKey = await client.admin.organization.adminAPIKeys.delete('key_id');

console.log(adminAPIKey.id);
```

#### Response

```json
{
  "id": "key_abc",
  "deleted": true,
  "object": "organization.admin_api_key.deleted"
}
```

## Domain Types

### Admin API Key

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

### Admin API Key Create Response

- `AdminAPIKeyCreateResponse extends AdminAPIKey`

  Represents an individual Admin API key in an org.

  - `value: string`

    The value of the API key. Only shown on create.

### Admin API Key Delete Response

- `AdminAPIKeyDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.admin_api_key.deleted"`

    - `"organization.admin_api_key.deleted"`
