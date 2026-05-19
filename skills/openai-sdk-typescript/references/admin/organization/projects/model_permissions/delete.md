## Delete project model permissions

`client.admin.organization.projects.modelPermissions.delete(stringprojectID, RequestOptionsoptions?): ProjectModelPermissionsDeleted`

**delete** `/organization/projects/{project_id}/model_permissions`

Deletes model permissions for a project.

### Parameters

- `projectID: string`

### Returns

- `ProjectModelPermissionsDeleted`

  Confirmation payload returned after deleting project model permissions.

  - `deleted: boolean`

    Whether the project model permissions were deleted.

  - `object: "project.model_permissions.deleted"`

    The object type, which is always `project.model_permissions.deleted`.

    - `"project.model_permissions.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectModelPermissionsDeleted =
  await client.admin.organization.projects.modelPermissions.delete('project_id');

console.log(projectModelPermissionsDeleted.deleted);
```

#### Response

```json
{
  "deleted": true,
  "object": "project.model_permissions.deleted"
}
```
