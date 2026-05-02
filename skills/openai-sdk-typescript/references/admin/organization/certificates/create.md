## Upload certificate

`client.admin.organization.certificates.create(CertificateCreateParamsbody, RequestOptionsoptions?): Certificate`

**post** `/organization/certificates`

Upload a certificate to the organization. This does **not** automatically activate the certificate.

Organizations can upload up to 50 certificates.

### Parameters

- `body: CertificateCreateParams`

  - `certificate: string`

    The certificate content in PEM format

  - `name?: string`

    An optional name for the certificate

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

  - `name: string | null`

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

const certificate = await client.admin.organization.certificates.create({
  certificate: 'certificate',
});

console.log(certificate.id);
```

#### Response

```json
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
```
