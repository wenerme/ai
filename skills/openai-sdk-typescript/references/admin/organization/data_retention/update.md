## Update organization data retention

`client.admin.organization.dataRetention.update(DataRetentionUpdateParamsbody, RequestOptionsoptions?): OrganizationDataRetention`

**post** `/organization/data_retention`

Updates organization data retention controls.

### Parameters

- `body: DataRetentionUpdateParams`

  - `retention_type: "zero_data_retention" | "modified_abuse_monitoring" | "enhanced_zero_data_retention" | "enhanced_modified_abuse_monitoring"`

    The desired organization data retention type.

    - `"zero_data_retention"`

    - `"modified_abuse_monitoring"`

    - `"enhanced_zero_data_retention"`

    - `"enhanced_modified_abuse_monitoring"`

### Returns

- `OrganizationDataRetention`

  Represents the organization's data retention control setting.

  - `object: "organization.data_retention"`

    The object type, which is always `organization.data_retention`.

    - `"organization.data_retention"`

  - `type: "zero_data_retention" | "modified_abuse_monitoring" | "enhanced_zero_data_retention" | "enhanced_modified_abuse_monitoring"`

    The configured organization data retention type.

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

const organizationDataRetention = await client.admin.organization.dataRetention.update({
  retention_type: 'zero_data_retention',
});

console.log(organizationDataRetention.object);
```

#### Response

```json
{
  "object": "organization.data_retention",
  "type": "zero_data_retention"
}
```
