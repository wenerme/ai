# API Keys

## Create project service account API key

`client.admin.organization.projects.serviceAccounts.apiKeys.create(stringserviceAccountID, APIKeyCreateParamsparams, RequestOptionsoptions?): APIKeyCreateResponse`

**post** `/organization/projects/{project_id}/service_accounts/{service_account_id}/api_keys`

Creates an API key for a service account in the project.

### Parameters

- `serviceAccountID: string`

- `params: APIKeyCreateParams`

  - `project_id: string`

    Path param: The ID of the project.

  - `name?: string`

    Body param: API key name.

  - `scopes?: Array<string>`

    Body param: API key scopes.

### Returns

- `APIKeyCreateResponse`

  - `id: string`

  - `created_at: number`

  - `name: string`

  - `object: "organization.project.service_account.api_key"`

    The object type, which is always `organization.project.service_account.api_key`

    - `"organization.project.service_account.api_key"`

  - `value: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const apiKey = await client.admin.organization.projects.serviceAccounts.apiKeys.create(
  'service_account_id',
  { project_id: 'project_id' },
);

console.log(apiKey.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account.api_key",
  "value": "value"
}
```

## Domain Types

### API Key Create Response

- `APIKeyCreateResponse`

  - `id: string`

  - `created_at: number`

  - `name: string`

  - `object: "organization.project.service_account.api_key"`

    The object type, which is always `organization.project.service_account.api_key`

    - `"organization.project.service_account.api_key"`

  - `value: string`
