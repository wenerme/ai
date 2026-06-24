# Data Retention

## Retrieve organization data retention

`admin.organization.data_retention.retrieve()  -> OrganizationDataRetention`

**get** `/organization/data_retention`

Retrieves organization data retention controls.

### Returns

- `class OrganizationDataRetention: …`

  Represents the organization's data retention control setting.

  - `object: Literal["organization.data_retention"]`

    The object type, which is always `organization.data_retention`.

    - `"organization.data_retention"`

  - `type: Literal["zero_data_retention", "modified_abuse_monitoring", "enhanced_zero_data_retention", "enhanced_modified_abuse_monitoring"]`

    The configured organization data retention type.

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
organization_data_retention = client.admin.organization.data_retention.retrieve()
print(organization_data_retention.object)
```

#### Response

```json
{
  "object": "organization.data_retention",
  "type": "zero_data_retention"
}
```

## Update organization data retention

`admin.organization.data_retention.update(DataRetentionUpdateParams**kwargs)  -> OrganizationDataRetention`

**post** `/organization/data_retention`

Updates organization data retention controls.

### Parameters

- `retention_type: Literal["zero_data_retention", "modified_abuse_monitoring", "enhanced_zero_data_retention", "enhanced_modified_abuse_monitoring"]`

  The desired organization data retention type.

  - `"zero_data_retention"`

  - `"modified_abuse_monitoring"`

  - `"enhanced_zero_data_retention"`

  - `"enhanced_modified_abuse_monitoring"`

### Returns

- `class OrganizationDataRetention: …`

  Represents the organization's data retention control setting.

  - `object: Literal["organization.data_retention"]`

    The object type, which is always `organization.data_retention`.

    - `"organization.data_retention"`

  - `type: Literal["zero_data_retention", "modified_abuse_monitoring", "enhanced_zero_data_retention", "enhanced_modified_abuse_monitoring"]`

    The configured organization data retention type.

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
organization_data_retention = client.admin.organization.data_retention.update(
    retention_type="zero_data_retention",
)
print(organization_data_retention.object)
```

#### Response

```json
{
  "object": "organization.data_retention",
  "type": "zero_data_retention"
}
```

## Domain Types

### Organization Data Retention

- `class OrganizationDataRetention: …`

  Represents the organization's data retention control setting.

  - `object: Literal["organization.data_retention"]`

    The object type, which is always `organization.data_retention`.

    - `"organization.data_retention"`

  - `type: Literal["zero_data_retention", "modified_abuse_monitoring", "enhanced_zero_data_retention", "enhanced_modified_abuse_monitoring"]`

    The configured organization data retention type.

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`
