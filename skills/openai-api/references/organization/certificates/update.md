## Update

**post** `/organization/certificates/{certificate_id}`

Modify a certificate. Note that only the name can be modified.

### Path Parameters

- `certificate_id: string`

### Body Parameters

- `name: string`

  The updated name for the certificate

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
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "name"
        }'
```
