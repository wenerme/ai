## Retrieve project data retention

`client.admin.organization.projects.dataRetention.retrieve(stringprojectID, RequestOptionsoptions?): ProjectDataRetention`

**get** `/organization/projects/{project_id}/data_retention`

Retrieves project data retention controls.

### Parameters

- `projectID: string`

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

const projectDataRetention = await client.admin.organization.projects.dataRetention.retrieve(
  'project_id',
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
