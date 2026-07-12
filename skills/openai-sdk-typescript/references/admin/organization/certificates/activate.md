## Activate certificates for organization

`client.admin.organization.certificates.activate(CertificateActivateParamsbody, RequestOptionsoptions?): Page<CertificateActivateResponse>`

**post** `/organization/certificates/activate`

Activate certificates at the organization level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Parameters

- `body: CertificateActivateParams`

  - `certificate_ids: Array<string>`

### Returns

- `CertificateActivateResponse`

  Represents an individual certificate configured at the organization level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.certificate"`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificateActivateResponse of client.admin.organization.certificates.activate({
  certificate_ids: ['cert_abc'],
})) {
  console.log(certificateActivateResponse.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "active": true,
      "certificate_details": {
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "organization.certificate"
    }
  ],
  "object": "organization.certificate.activation"
}
```
