## List Platform workload identity providers

**get** `/organization/workload_identity_providers`

List OIDC providers in the authenticated Admin API key's organization.

### Query Parameters

- `after: optional string`

  `minLength: 1`

- `limit: optional integer`

  `minimum: 1`, `maximum: 100`

- `order: optional "asc" or "desc"`

  - `"asc" or "desc"`

    - `"asc"`

    - `"desc"`

### Returns

- `data: array of WorkloadIdentityProvider`

  - `id: string`

  - `attribute_transformations: array of object { attribute, expression }`

    - `attribute: string`

    - `expression: string`

  - `audience: string`

  - `created_at: integer`

  - `description: string or null`

  - `enabled: boolean`

  - `issuer: string`

  - `name: string`

  - `object: "organization.workload_identity_provider" (default: "organization.workload_identity_provider")`

    - `"organization.workload_identity_provider"`

  - `type: "oidc" (default: "oidc")`

    - `"oidc"`

  - `updated_at: integer`

  - `verification: DiscoveryVerification { discovery_url, type }  or UploadedJwksVerification { jwks, type }`

    - `DiscoveryVerification object { discovery_url, type }`

      - `discovery_url: string or null`

      - `type: "discovery" (default: "discovery")`

        - `"discovery"`

    - `UploadedJwksVerification object { jwks, type }`

      - `jwks: map[unknown]`

      - `type: "uploaded_jwks" (default: "uploaded_jwks")`

        - `"uploaded_jwks"`

- `first_id: string or null`

- `has_more: boolean`

- `last_id: string or null`

- `object: "list" (default: "list")`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/workload_identity_providers \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### 200 — Example

```json
{
  "data": [
    {
      "id": "id",
      "attribute_transformations": [
        {
          "attribute": "attribute",
          "expression": "expression"
        }
      ],
      "audience": "audience",
      "created_at": 0,
      "description": "description",
      "enabled": true,
      "issuer": "issuer",
      "name": "name",
      "object": "organization.workload_identity_provider",
      "type": "oidc",
      "updated_at": 0,
      "verification": {
        "discovery_url": "discovery_url",
        "type": "discovery"
      }
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

### Example

```http
curl -X GET "https://api.openai.com/v1/organization/workload_identity_providers?limit=20&order=asc" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response example

```json
{
  "object": "list",
  "data": [
    {
      "object": "organization.workload_identity_provider",
      "id": "wip_example",
      "type": "oidc",
      "name": "CI provider",
      "issuer": "https://issuer.example.com",
      "audience": "openai",
      "verification": {
        "type": "discovery",
        "discovery_url": null
      },
      "description": null,
      "attribute_transformations": [],
      "enabled": true,
      "created_at": 1793664000,
      "updated_at": 1793664000
    }
  ],
  "first_id": "wip_example",
  "last_id": "wip_example",
  "has_more": false
}
```
