## Delete certificate

`admin.organization.certificates.delete(strcertificate_id)  -> CertificateDeleteResponse`

**delete** `/organization/certificates/{certificate_id}`

Delete certificate

### Parameters

- `certificate_id: str`

### Returns

- `class CertificateDeleteResponse: …`

  - `id: str`

    The ID of the certificate that was deleted.

  - `object: Literal["certificate.deleted"]`

    The object type, must be `certificate.deleted`.

    - `"certificate.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
certificate = client.admin.organization.certificates.delete(
    "certificate_id",
)
print(certificate.id)
```

#### Response

```json
{
  "id": "id",
  "object": "certificate.deleted"
}
```
