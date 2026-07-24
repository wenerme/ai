## Delete project spend limit

`client.admin.organization.projects.spendLimit.delete(stringprojectID, RequestOptionsoptions?): ProjectSpendLimitDeleted`

**delete** `/organization/projects/{project_id}/spend_limit`

Delete a project's hard spend limit.

### Parameters

- `projectID: string`

### Returns

- `ProjectSpendLimitDeleted`

  Confirmation payload returned after deleting a project hard spend limit.

  - `deleted: boolean`

    Whether the hard spend limit was deleted.

  - `object: "project.spend_limit.deleted"`

    The object type, which is always `project.spend_limit.deleted`.

    - `"project.spend_limit.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectSpendLimitDeleted = await client.admin.organization.projects.spendLimit.delete(
  'proj_123',
);

console.log(projectSpendLimitDeleted.deleted);
```

#### Response

```json
{
  "deleted": true,
  "object": "project.spend_limit.deleted"
}
```
