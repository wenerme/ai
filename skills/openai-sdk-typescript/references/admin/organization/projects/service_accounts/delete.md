## Delete project service account

`client.admin.organization.projects.serviceAccounts.delete(stringserviceAccountID, ServiceAccountDeleteParamsparams, RequestOptionsoptions?): ServiceAccountDeleteResponse`

**delete** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Delete project service account

### Parameters

- `serviceAccountID: string`

- `params: ServiceAccountDeleteParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ServiceAccountDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.service_account.deleted"`

    - `"organization.project.service_account.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const serviceAccount = await client.admin.organization.projects.serviceAccounts.delete(
  'service_account_id',
  { project_id: 'project_id' },
);

console.log(serviceAccount.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.service_account.deleted"
}
```
