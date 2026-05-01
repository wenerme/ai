## Delete admin API key

`client.admin.organization.adminAPIKeys.delete(stringkeyID, RequestOptionsoptions?): AdminAPIKeyDeleteResponse`

**delete** `/organization/admin_api_keys/{key_id}`

Delete an organization admin API key

### Parameters

- `keyID: string`

  The ID of the API key to be deleted.

### Returns

- `AdminAPIKeyDeleteResponse`

  - `id?: string`

  - `deleted?: boolean`

  - `object?: string`

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
