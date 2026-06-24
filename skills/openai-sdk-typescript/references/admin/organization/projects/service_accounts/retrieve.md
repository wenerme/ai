## Retrieve project service account

`client.admin.organization.projects.serviceAccounts.retrieve(stringserviceAccountID, ServiceAccountRetrieveParamsparams, RequestOptionsoptions?): ProjectServiceAccount`

**get** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Retrieves a service account in the project.

### Parameters

- `serviceAccountID: string`

- `params: ServiceAccountRetrieveParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ProjectServiceAccount`

  Represents an individual service account in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: string`

    The name of the service account

  - `object: "organization.project.service_account"`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectServiceAccount = await client.admin.organization.projects.serviceAccounts.retrieve(
  'service_account_id',
  { project_id: 'project_id' },
);

console.log(projectServiceAccount.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account",
  "role": "owner"
}
```
