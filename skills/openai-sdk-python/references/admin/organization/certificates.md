# Certificates

## List organization certificates

`admin.organization.certificates.list(CertificateListParams**kwargs)  -> SyncConversationCursorPage[CertificateListResponse]`

**get** `/organization/certificates`

List uploaded certificates for this organization.

### Parameters

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

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.certificates.list()
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
      "object": "organization.certificate"
    }
  ],
  "first_id": "cert_abc",
  "has_more": true,
  "last_id": "cert_abc",
  "object": "list"
}
```

## Upload certificate

`admin.organization.certificates.create(CertificateCreateParams**kwargs)  -> Certificate`

**post** `/organization/certificates`

Upload a certificate to the organization. This does **not** automatically activate the certificate.

Organizations can upload up to 50 certificates.

### Parameters

- `certificate: str`

  The certificate content in PEM format

- `name: Optional[str]`

  An optional name for the certificate

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

  - `name: Optional[str]`

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
certificate = client.admin.organization.certificates.create(
    certificate="certificate",
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

## Get certificate

`admin.organization.certificates.retrieve(strcertificate_id, CertificateRetrieveParams**kwargs)  -> Certificate`

**get** `/organization/certificates/{certificate_id}`

Get a certificate that has been uploaded to the organization.

You can get a certificate regardless of whether it is active or not.

### Parameters

- `certificate_id: str`

- `include: Optional[List[Literal["content"]]]`

  A list of additional fields to include in the response. Currently the only supported value is `content` to fetch the PEM content of the certificate.

  - `"content"`

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

  - `name: Optional[str]`

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
certificate = client.admin.organization.certificates.retrieve(
    certificate_id="certificate_id",
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

## Modify certificate

`admin.organization.certificates.update(strcertificate_id, CertificateUpdateParams**kwargs)  -> Certificate`

**post** `/organization/certificates/{certificate_id}`

Modify a certificate. Note that only the name can be modified.

### Parameters

- `certificate_id: str`

- `name: Optional[str]`

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

  - `name: Optional[str]`

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

## Delete certificate

`admin.organization.certificates.delete(strcertificate_id)  -> CertificateDeleteResponse`

**delete** `/organization/certificates/{certificate_id}`

Delete a certificate from the organization.

The certificate must be inactive for the organization and all projects.

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

## Activate certificates for organization

`admin.organization.certificates.activate(CertificateActivateParams**kwargs)  -> SyncPage[CertificateActivateResponse]`

**post** `/organization/certificates/activate`

Activate certificates at the organization level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Parameters

- `certificate_ids: Sequence[str]`

### Returns

- `class CertificateActivateResponse: …`

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.certificates.activate(
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
      "object": "organization.certificate"
    }
  ],
  "object": "organization.certificate.activation"
}
```

## Deactivate certificates for organization

`admin.organization.certificates.deactivate(CertificateDeactivateParams**kwargs)  -> SyncPage[CertificateDeactivateResponse]`

**post** `/organization/certificates/deactivate`

Deactivate certificates at the organization level.

You can atomically and idempotently deactivate up to 10 certificates at a time.

### Parameters

- `certificate_ids: Sequence[str]`

### Returns

- `class CertificateDeactivateResponse: …`

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.certificates.deactivate(
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
      "object": "organization.certificate"
    }
  ],
  "object": "organization.certificate.deactivation"
}
```

## Domain Types

### Certificate

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

  - `name: Optional[str]`

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

### Certificate List Response

- `class CertificateListResponse: …`

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Certificate Delete Response

- `class CertificateDeleteResponse: …`

  - `id: str`

    The ID of the certificate that was deleted.

  - `object: Literal["certificate.deleted"]`

    The object type, must be `certificate.deleted`.

    - `"certificate.deleted"`

### Certificate Activate Response

- `class CertificateActivateResponse: …`

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`

### Certificate Deactivate Response

- `class CertificateDeactivateResponse: …`

  Represents an individual certificate configured at the organization level.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `active: bool`

    Whether the certificate is currently active at the organization level.

  - `certificate_details: CertificateDetails`

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: Optional[str]`

    The name of the certificate.

  - `object: Literal["organization.certificate"]`

    The object type, which is always `organization.certificate`.

    - `"organization.certificate"`
