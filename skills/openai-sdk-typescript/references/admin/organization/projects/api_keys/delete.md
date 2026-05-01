## Delete project API key

`client.admin.organization.projects.apiKeys.delete(stringkeyID, APIKeyDeleteParamsparams, RequestOptionsoptions?): APIKeyDeleteResponse`

**delete** `/organization/projects/{project_id}/api_keys/{key_id}`

Deletes an API key from the project.

Returns confirmation of the key deletion, or an error if the key belonged to
a service account.

### Parameters

- `keyID: string`

- `params: APIKeyDeleteParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `APIKeyDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.api_key.deleted"`

    - `"organization.project.api_key.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const apiKey = await client.admin.organization.projects.apiKeys.delete('key_id', {
  project_id: 'project_id',
});

console.log(apiKey.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.api_key.deleted"
}
```
