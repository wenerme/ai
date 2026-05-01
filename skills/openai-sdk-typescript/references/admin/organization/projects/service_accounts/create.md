## Create project service account

`client.admin.organization.projects.serviceAccounts.create(stringprojectID, ServiceAccountCreateParamsbody, RequestOptionsoptions?): ServiceAccountCreateResponse`

**post** `/organization/projects/{project_id}/service_accounts`

Creates a new service account in the project. This also returns an unredacted API key for the service account.

### Parameters

- `projectID: string`

- `body: ServiceAccountCreateParams`

  - `name: string`

    The name of the service account being created.

### Returns

- `ServiceAccountCreateResponse`

  - `id: string`

  - `api_key: APIKey`

    - `id: string`

    - `created_at: number`

    - `name: string`

    - `object: "organization.project.service_account.api_key"`

      The object type, which is always `organization.project.service_account.api_key`

      - `"organization.project.service_account.api_key"`

    - `value: string`

  - `created_at: number`

  - `name: string`

  - `object: "organization.project.service_account"`

    - `"organization.project.service_account"`

  - `role: "member"`

    Service accounts can only have one role of type `member`

    - `"member"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const serviceAccount = await client.admin.organization.projects.serviceAccounts.create(
  'project_id',
  { name: 'name' },
);

console.log(serviceAccount.id);
```

#### Response

```json
{
  "id": "id",
  "api_key": {
    "id": "id",
    "created_at": 0,
    "name": "name",
    "object": "organization.project.service_account.api_key",
    "value": "value"
  },
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account",
  "role": "member"
}
```
