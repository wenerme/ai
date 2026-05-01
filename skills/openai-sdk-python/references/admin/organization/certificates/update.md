## Modify certificate

`admin.organization.certificates.update(strcertificate_id, CertificateUpdateParams**kwargs)  -> Certificate`

**post** `/organization/certificates/{certificate_id}`

Modify a certificate. Note that only the name can be modified.

### Parameters

- `certificate_id: str`

- `name: str`

  The updated name for the certificate

### Returns

- `class Certificate: …`

  Represents an individual `certificate` uploaded to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content: Optional[str]`

      The content of the certificate in PEM format.

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: str`

    The name of the certificate.

  - `object: Literal["certificate", "organization.certificate", "organization.project.certificate"]`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: Optional[bool]`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
certificate = client.admin.organization.certificates.update(
    certificate_id="certificate_id",
    name="name",
)
print(certificate.id)
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
