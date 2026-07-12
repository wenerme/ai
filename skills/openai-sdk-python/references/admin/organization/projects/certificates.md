# Certificates

## List project certificates

`admin.organization.projects.certificates.list(strproject_id, CertificateListParams**kwargs)  -> SyncConversationCursorPage[CertificateListResponse]`

**get** `/organization/projects/{project_id}/certificates`

List certificates for this project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class CertificateListResponse: …`

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
page = client.admin.organization.projects.certificates.list(
    project_id="project_id",
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
  "first_id": "cert_abc",
  "has_more": true,
  "last_id": "cert_abc",
  "object": "list"
}
```

## Activate certificates for project

`admin.organization.projects.certificates.activate(strproject_id, CertificateActivateParams**kwargs)  -> SyncPage[CertificateActivateResponse]`

**post** `/organization/projects/{project_id}/certificates/activate`

Activate certificates at the project level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Parameters

- `project_id: str`

- `certificate_ids: Sequence[str]`

### Returns

- `class CertificateActivateResponse: …`

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
page = client.admin.organization.projects.certificates.activate(
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
  "object": "organization.project.certificate.activation"
}
```

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

## Domain Types

### Certificate List Response

- `class CertificateListResponse: …`

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

### Certificate Activate Response

- `class CertificateActivateResponse: …`

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

### Certificate Deactivate Response

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
