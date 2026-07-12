## Deactivate certificates for project

**post** `/organization/projects/{project_id}/certificates/deactivate`

Deactivate certificates at the project level. You can atomically and
idempotently deactivate up to 10 certificates at a time.

### Path Parameters

- `project_id: string`

### Body Parameters

- `certificate_ids: array of string`

### Returns

- `data: array of object { id, active, certificate_details, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

- `object: "organization.project.certificate.deactivation"`

  The project certificate deactivation result type.

  - `"organization.project.certificate.deactivation"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/certificates/deactivate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "certificate_ids": [
            "cert_abc"
          ]
        }'
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/certificates/deactivate \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json" \
-d '{
  "certificate_ids": ["cert_abc", "cert_def"]
}'
```

#### Response

```json
{
  "object": "organization.project.certificate.deactivation",
  "data": [
    {
      "object": "organization.project.certificate",
      "id": "cert_abc",
      "name": "My Example Certificate",
      "active": false,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
    {
      "object": "organization.project.certificate",
      "id": "cert_def",
      "name": "My Example Certificate 2",
      "active": false,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
  ],
}
```
