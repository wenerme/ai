# Data Retention

## Retrieve project data retention

`admin.organization.projects.data_retention.retrieve(strproject_id)  -> ProjectDataRetention`

**get** `/organization/projects/{project_id}/data_retention`

Retrieves project data retention controls.

### Parameters

- `project_id: str`

### Returns

- `class ProjectDataRetention: …`

  Represents a project's data retention control setting.

  - `object: Literal["project.data_retention"]`

    The object type, which is always `project.data_retention`.

    - `"project.data_retention"`

  - `type: Literal["organization_default", "none", "zero_data_retention", 3 more]`

    The configured project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_data_retention = client.admin.organization.projects.data_retention.retrieve(
    "project_id",
)
print(project_data_retention.object)
```

#### Response

```json
{
  "object": "project.data_retention",
  "type": "organization_default"
}
```

## Update project data retention

`admin.organization.projects.data_retention.update(strproject_id, DataRetentionUpdateParams**kwargs)  -> ProjectDataRetention`

**post** `/organization/projects/{project_id}/data_retention`

Updates project data retention controls.

### Parameters

- `project_id: str`

- `retention_type: Literal["organization_default", "none", "zero_data_retention", 3 more]`

  The desired project data retention type.

  - `"organization_default"`

  - `"none"`

  - `"zero_data_retention"`

  - `"modified_abuse_monitoring"`

  - `"enhanced_zero_data_retention"`

  - `"enhanced_modified_abuse_monitoring"`

### Returns

- `class ProjectDataRetention: …`

  Represents a project's data retention control setting.

  - `object: Literal["project.data_retention"]`

    The object type, which is always `project.data_retention`.

    - `"project.data_retention"`

  - `type: Literal["organization_default", "none", "zero_data_retention", 3 more]`

    The configured project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_data_retention = client.admin.organization.projects.data_retention.update(
    project_id="project_id",
    retention_type="organization_default",
)
print(project_data_retention.object)
```

#### Response

```json
{
  "object": "project.data_retention",
  "type": "organization_default"
}
```

## Domain Types

### Project Data Retention

- `class ProjectDataRetention: …`

  Represents a project's data retention control setting.

  - `object: Literal["project.data_retention"]`

    The object type, which is always `project.data_retention`.

    - `"project.data_retention"`

  - `type: Literal["organization_default", "none", "zero_data_retention", 3 more]`

    The configured project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`
