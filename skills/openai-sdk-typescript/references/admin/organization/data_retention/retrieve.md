## Retrieve organization data retention

`client.admin.organization.dataRetention.retrieve(RequestOptionsoptions?): OrganizationDataRetention`

**get** `/organization/data_retention`

Retrieves organization data retention controls.

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

const organizationDataRetention = await client.admin.organization.dataRetention.retrieve();

console.log(organizationDataRetention.object);
```

#### Response

```json
{
  "object": "organization.data_retention",
  "type": "zero_data_retention"
}
```
