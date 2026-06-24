## Deactivate certificates for project

`admin.organization.projects.certificates.deactivate(strproject_id, CertificateDeactivateParams**kwargs)  -> SyncPage[CertificateDeactivateResponse]`

**post** `/organization/projects/{project_id}/certificates/deactivate`

Deactivate certificates at the project level. You can atomically and
idempotently deactivate up to 10 certificates at a time.

### Parameters

- `project_id: str`

- `certificate_ids: Sequence[str]`

### Returns

- `class CertificateDeactivateResponse: …`

  Represents an individual certificate configured at the project level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.project.certificate"]`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.certificates.deactivate(
    project_id="project_id",
    certificate_ids=["cert_abc"],
)
page = page.data[0]
print(page.id)
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
  "object": "organization.project.certificate.deactivation"
}
```
