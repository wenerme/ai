## Delete certificate

`client.admin.organization.certificates.delete(stringcertificateID, RequestOptionsoptions?): CertificateDeleteResponse`

**delete** `/organization/certificates/{certificate_id}`

Delete a certificate from the organization.

The certificate must be inactive for the organization and all projects.

### Parameters

- `certificateID: string`

### Returns

- `CertificateDeleteResponse`

  - `id: string`

    The ID of the certificate that was deleted.

  - `object: "certificate.deleted"`

    The object type, must be `certificate.deleted`.

    - `"certificate.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const certificate = await client.admin.organization.certificates.delete('certificate_id');

console.log(certificate.id);
```

#### Response

```json
{
  "id": "id",
  "object": "certificate.deleted"
}
```
