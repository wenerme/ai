# Data Retention

## Retrieve project data retention

**get** `/organization/projects/{project_id}/data_retention`

Retrieves project data retention controls.

### Path Parameters

- `project_id: string`

### Returns

- `ProjectDataRetention object { object, type }`

  Represents a project's data retention control setting.

  - `object: "project.data_retention"`

    The object type, which is always `project.data_retention`.

    - `"project.data_retention"`

  - `type: "organization_default" or "none" or "zero_data_retention" or 3 more`

    The configured project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/data_retention \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "object": "project.data_retention",
  "type": "organization_default"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/data_retention \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "project.data_retention",
    "type": "organization_default"
}
```

## Update project data retention

**post** `/organization/projects/{project_id}/data_retention`

Updates project data retention controls.

### Path Parameters

- `project_id: string`

### Body Parameters

- `retention_type: "organization_default" or "none" or "zero_data_retention" or 3 more`

  The desired project data retention type.

  - `"organization_default"`

  - `"none"`

  - `"zero_data_retention"`

  - `"modified_abuse_monitoring"`

  - `"enhanced_zero_data_retention"`

  - `"enhanced_modified_abuse_monitoring"`

### Returns

- `ProjectDataRetention object { object, type }`

  Represents a project's data retention control setting.

  - `object: "project.data_retention"`

    The object type, which is always `project.data_retention`.

    - `"project.data_retention"`

  - `type: "organization_default" or "none" or "zero_data_retention" or 3 more`

    The configured project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/data_retention \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "retention_type": "organization_default"
        }'
```

#### Response

```json
{
  "object": "project.data_retention",
  "type": "organization_default"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/data_retention \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "retention_type": "modified_abuse_monitoring"
  }'
```

#### Response

```json
{
    "object": "project.data_retention",
    "type": "modified_abuse_monitoring"
}
```

## Domain Types

### Project Data Retention

- `ProjectDataRetention object { object, type }`

  Represents a project's data retention control setting.

  - `object: "project.data_retention"`

    The object type, which is always `project.data_retention`.

    - `"project.data_retention"`

  - `type: "organization_default" or "none" or "zero_data_retention" or 3 more`

    The configured project data retention type.

    - `"organization_default"`

    - `"none"`

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`
