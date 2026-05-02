## Activate certificates for project

`client.admin.organization.projects.certificates.activate(stringprojectID, CertificateActivateParamsbody, RequestOptionsoptions?): Page<CertificateActivateResponse>`

**post** `/organization/projects/{project_id}/certificates/activate`

Activate certificates at the project level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Parameters

- `projectID: string`

- `body: CertificateActivateParams`

  - `certificate_ids: Array<string>`

### Returns

- `CertificateActivateResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificateActivateResponse of client.admin.organization.projects.certificates.activate(
  'project_id',
  { certificate_ids: ['cert_abc'] },
)) {
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
      "object": "organization.project.certificate"
    }
  ],
  "object": "organization.project.certificate.activation"
}
```
