## Retrieve project model permissions

`client.admin.organization.projects.modelPermissions.retrieve(stringprojectID, RequestOptionsoptions?): ProjectModelPermissions`

**get** `/organization/projects/{project_id}/model_permissions`

Returns model permissions for a project.

### Parameters

- `projectID: string`

### Returns

- `ProjectModelPermissions`

  Represents the model allowlist or denylist policy for a project.

  - `mode: "allow_list" | "deny_list"`

    Whether the project uses an allowlist or a denylist.

    - `"allow_list"`

    - `"deny_list"`

  - `model_ids: Array<string>`

    The model IDs included in the model permissions policy.

  - `object: "project.model_permissions"`

    The object type, which is always `project.model_permissions`.

    - `"project.model_permissions"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectModelPermissions = await client.admin.organization.projects.modelPermissions.retrieve(
  'project_id',
);

console.log(projectModelPermissions.model_ids);
```

#### Response

```json
{
  "mode": "allow_list",
  "model_ids": [
    "string"
  ],
  "object": "project.model_permissions"
}
```
