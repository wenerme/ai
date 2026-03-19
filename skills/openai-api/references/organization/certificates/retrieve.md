## Get certificate

**get** `/organization/certificates/{certificate_id}`

Get a certificate that has been uploaded to the organization.

You can get a certificate regardless of whether it is active or not.

### Path Parameters

- `certificate_id: string`

### Query Parameters

- `include: optional array of "content"`

  A list of additional fields to include in the response. Currently the only supported value is `content` to fetch the PEM content of the certificate.

  - `"content"`

### Returns

- `id: string`

  The identifier, which can be referenced in API endpoints

- `certificate_details: object { content, expires_at, valid_at }`

  - `content: optional string`

    The content of the certificate in PEM format.

  - `expires_at: optional number`

    The Unix timestamp (in seconds) of when the certificate expires.

  - `valid_at: optional number`

    The Unix timestamp (in seconds) of when the certificate becomes valid.

- `created_at: number`

  The Unix timestamp (in seconds) of when the certificate was uploaded.

- `name: string`

  The name of the certificate.

- `object: "certificate" or "organization.certificate" or "organization.project.certificate"`

  The object type.

  - If creating, updating, or getting a specific certificate, the object type is `certificate`.
  - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
  - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

  - `"certificate"`

  - `"organization.certificate"`

  - `"organization.project.certificate"`

- `active: optional boolean`

  Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```http
curl https://api.openai.com/v1/organization/certificates/$CERTIFICATE_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
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

### Example

```http
curl "https://api.openai.com/v1/organization/certificates/cert_abc?include[]=content" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "object": "certificate",
  "id": "cert_abc",
  "name": "My Example Certificate",
  "created_at": 1234567,
  "certificate_details": {
    "valid_at": 1234567,
    "expires_at": 12345678,
    "content": "-----BEGIN CERTIFICATE-----MIIDeT...-----END CERTIFICATE-----"
  }
}
```
