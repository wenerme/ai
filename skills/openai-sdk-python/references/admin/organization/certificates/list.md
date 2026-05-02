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
