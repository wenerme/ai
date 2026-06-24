## Update project data retention

`client.admin.organization.projects.dataRetention.update(stringprojectID, DataRetentionUpdateParamsbody, RequestOptionsoptions?): ProjectDataRetention`

**post** `/organization/projects/{project_id}/data_retention`

Updates project data retention controls.

### Parameters

- `projectID: string`

- `body: DataRetentionUpdateParams`

  - `retention_type: "organization_default" | "none" | "zero_data_retention" | 3 more`

    The desired project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Returns

- `ProjectDataRetention`

  Represents a project's data retention control setting.

  - `object: "project.data_retention"`

    The object type, which is always `project.data_retention`.

    - `"project.data_retention"`

  - `type: "organization_default" | "none" | "zero_data_retention" | 3 more`

    The configured project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectDataRetention = await client.admin.organization.projects.dataRetention.update(
  'project_id',
  { retention_type: 'organization_default' },
);

console.log(projectDataRetention.object);
```

#### Response

```json
{
  "object": "project.data_retention",
  "type": "organization_default"
}
```
