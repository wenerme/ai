## Deactivate certificates for organization

`client.admin.organization.certificates.deactivate(CertificateDeactivateParamsbody, RequestOptionsoptions?): Page<Certificate>`

**post** `/organization/certificates/deactivate`

Deactivate certificates at the organization level.

You can atomically and idempotently deactivate up to 10 certificates at a time.

### Parameters

- `body: CertificateDeactivateParams`

  - `certificate_ids: Array<string>`

### Returns

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificate of client.admin.organization.certificates.deactivate({
  certificate_ids: ['cert_abc'],
})) {
  console.log(certificate.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "certificate_details": {
        "content": "content",
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "certificate",
      "active": true
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "cert_abc",
  "last_id": "cert_abc"
}
```
