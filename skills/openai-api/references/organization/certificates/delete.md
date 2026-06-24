## Delete certificate

**delete** `/organization/certificates/{certificate_id}`

Delete a certificate from the organization.

The certificate must be inactive for the organization and all projects.

### Path Parameters

- `certificate_id: string`

### Returns

- `id: string`

  The ID of the certificate that was deleted.

- `object: "certificate.deleted"`

  The object type, must be `certificate.deleted`.

  - `"certificate.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/certificates/$CERTIFICATE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "object": "certificate.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/certificates/cert_abc \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "object": "certificate.deleted",
  "id": "cert_abc"
}
```
