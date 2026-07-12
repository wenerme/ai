## Update project service account

`client.admin.organization.projects.serviceAccounts.update(stringserviceAccountID, ServiceAccountUpdateParamsparams, RequestOptionsoptions?): ProjectServiceAccount`

**post** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Updates a service account in the project.

### Parameters

- `serviceAccountID: string`

- `params: ServiceAccountUpdateParams`

  - `project_id: string`

    Path param: The ID of the project.

  - `name?: string`

    Body param: The updated service account name.

  - `role?: "member" | "owner"`

    Body param: The updated service account role.

    - `"member"`

    - `"owner"`

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

const projectServiceAccount = await client.admin.organization.projects.serviceAccounts.update(
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
