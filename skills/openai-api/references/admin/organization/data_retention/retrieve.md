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
