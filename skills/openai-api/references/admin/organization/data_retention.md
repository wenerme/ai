# Data Retention

## Retrieve organization data retention

**get** `/organization/data_retention`

Retrieves organization data retention controls.

### Returns

- `OrganizationDataRetention object { object, type }`

  Represents the organization's data retention control setting.

  - `object: "organization.data_retention"`

    The object type, which is always `organization.data_retention`.

    - `"organization.data_retention"`

  - `type: "zero_data_retention" or "modified_abuse_monitoring" or "enhanced_zero_data_retention" or "enhanced_modified_abuse_monitoring"`

    The configured organization data retention type.

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Example

```http
curl https://api.openai.com/v1/organization/data_retention \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "object": "organization.data_retention",
  "type": "zero_data_retention"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/data_retention \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.data_retention",
    "type": "modified_abuse_monitoring"
}
```

## Update organization data retention

**post** `/organization/data_retention`

Updates organization data retention controls.

### Body Parameters

- `retention_type: "zero_data_retention" or "modified_abuse_monitoring" or "enhanced_zero_data_retention" or "enhanced_modified_abuse_monitoring"`

  The desired organization data retention type.

  - `"zero_data_retention"`

  - `"modified_abuse_monitoring"`

  - `"enhanced_zero_data_retention"`

  - `"enhanced_modified_abuse_monitoring"`

### Returns

- `OrganizationDataRetention object { object, type }`

  Represents the organization's data retention control setting.

  - `object: "organization.data_retention"`

    The object type, which is always `organization.data_retention`.

    - `"organization.data_retention"`

  - `type: "zero_data_retention" or "modified_abuse_monitoring" or "enhanced_zero_data_retention" or "enhanced_modified_abuse_monitoring"`

    The configured organization data retention type.

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Example

```http
curl https://api.openai.com/v1/organization/data_retention \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "retention_type": "zero_data_retention"
        }'
```

#### Response

```json
{
  "object": "organization.data_retention",
  "type": "zero_data_retention"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/data_retention \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "retention_type": "modified_abuse_monitoring"
  }'
```

#### Response

```json
{
    "object": "organization.data_retention",
    "type": "modified_abuse_monitoring"
}
```

## Domain Types

### Organization Data Retention

- `OrganizationDataRetention object { object, type }`

  Represents the organization's data retention control setting.

  - `object: "organization.data_retention"`

    The object type, which is always `organization.data_retention`.

    - `"organization.data_retention"`

  - `type: "zero_data_retention" or "modified_abuse_monitoring" or "enhanced_zero_data_retention" or "enhanced_modified_abuse_monitoring"`

    The configured organization data retention type.

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`
