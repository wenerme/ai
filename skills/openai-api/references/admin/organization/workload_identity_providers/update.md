## Update Platform workload identity provider

**post** `/organization/workload_identity_providers/{workload_identity_provider_id}`

Update supplied provider fields, preserving omitted fields.

### Path Parameters

- `workload_identity_provider_id: string`

  `minLength: 1`

### Body Parameters

Content type: `application/json`

- `attribute_transformations: optional array of object { attribute, expression }`

  `maxItems: 20`

  - `attribute: string`

    `minLength: 1`, `maxLength: 256`

  - `expression: string`

    `minLength: 1`, `maxLength: 4096`

- `audience: optional string`

  `minLength: 1`

- `description: optional string or null`

- `enabled: optional boolean`

- `issuer: optional string`

  `minLength: 1`

- `name: optional string`

  `minLength: 1`

- `verification: optional DiscoveryVerificationParam { discovery_url, type }  or UploadedJwksVerificationParam { jwks, type }`

  - `DiscoveryVerificationParam object { discovery_url, type }`

    - `discovery_url: string or null`

    - `type: "discovery" (default: "discovery")`

      - `"discovery"`

  - `UploadedJwksVerificationParam object { jwks, type }`

    - `jwks: map[unknown]`

    - `type: "uploaded_jwks" (default: "uploaded_jwks")`

      - `"uploaded_jwks"`

### Returns

- `WorkloadIdentityProvider object { id, attribute_transformations, audience, 9 more }`

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

### Example

```http
curl https://api.openai.com/v1/organization/workload_identity_providers/$WORKLOAD_IDENTITY_PROVIDER_ID \
    -X POST \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### 200 — Example

```json
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
```

### Example

```http
curl -X POST "https://api.openai.com/v1/organization/workload_identity_providers/wip_example" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "enabled": false
}'
```

#### Response example

```json
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
  "enabled": false,
  "created_at": 1793664000,
  "updated_at": 1793664000
}
```
