# Model Permissions

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

## Modify project model permissions

`client.admin.organization.projects.modelPermissions.update(stringprojectID, ModelPermissionUpdateParamsbody, RequestOptionsoptions?): ProjectModelPermissions`

**post** `/organization/projects/{project_id}/model_permissions`

Updates model permissions for a project.

### Parameters

- `projectID: string`

- `body: ModelPermissionUpdateParams`

  - `mode: "allow_list" | "deny_list"`

    The model permissions mode to apply.

    - `"allow_list"`

    - `"deny_list"`

  - `model_ids: Array<string>`

    The model IDs included in this permissions policy.

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

const projectModelPermissions = await client.admin.organization.projects.modelPermissions.update(
  'project_id',
  { mode: 'allow_list', model_ids: ['string'] },
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

## Domain Types

### Project Model Permissions

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

### Project Model Permissions Deleted

- `ProjectModelPermissionsDeleted`

  Confirmation payload returned after deleting project model permissions.

  - `deleted: boolean`

    Whether the project model permissions were deleted.

  - `object: "project.model_permissions.deleted"`

    The object type, which is always `project.model_permissions.deleted`.

    - `"project.model_permissions.deleted"`
