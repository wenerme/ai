## List project certificates

`client.admin.organization.projects.certificates.list(stringprojectID, CertificateListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<CertificateListResponse>`

**get** `/organization/projects/{project_id}/certificates`

List certificates for this project.

### Parameters

- `projectID: string`

- `query: CertificateListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `order?: "asc" | "desc"`

    Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `CertificateListResponse`

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
for await (const certificateListResponse of client.admin.organization.projects.certificates.list(
  'project_id',
)) {
  console.log(certificateListResponse.id);
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
  "first_id": "cert_abc",
  "has_more": true,
  "last_id": "cert_abc",
  "object": "list"
}
```
