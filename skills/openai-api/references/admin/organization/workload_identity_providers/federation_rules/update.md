## Update Platform workload identity federation rule

**post** `/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}`

Update supplied matcher, permission, metadata, or enabled fields.

### Path Parameters

- `workload_identity_provider_id: string`

  `minLength: 1`

- `workload_identity_federation_rule_id: string`

  `minLength: 1`

### Body Parameters

Content type: `application/json`

- `attribute_matchers: optional map[string or boolean or number or number]`

  - `string`

  - `boolean`

  - `number or number`

    - `number`

    - `number`

- `description: optional string or null`

- `enabled: optional boolean`

- `name: optional string or null`

- `permissions: optional DefaultPermissionsParam { type }  or RestrictedPermissionsParam { scopes, type }`

  - `DefaultPermissionsParam object { type }`

    - `type: "service_account_default" (default: "service_account_default")`

      - `"service_account_default"`

  - `RestrictedPermissionsParam object { scopes, type }`

    - `scopes: array of string`

      `minItems: 1`

    - `type: "restricted" (default: "restricted")`

      - `"restricted"`

### Returns

- `FederationRule object { id, attribute_matchers, created_at, 9 more }`

  - `id: string`

  - `attribute_matchers: map[string or boolean or number or number]`

    - `string`

    - `boolean`

    - `number or number`

      - `number`

      - `number`

  - `created_at: integer`

  - `description: string or null`

  - `enabled: boolean`

  - `name: string or null`

  - `object: "organization.workload_identity_federation_rule" (default: "organization.workload_identity_federation_rule")`

    - `"organization.workload_identity_federation_rule"`

  - `permissions: DefaultPermissions { type }  or RestrictedPermissions { scopes, type }`

    - `DefaultPermissions object { type }`

      - `type: "service_account_default" (default: "service_account_default")`

        - `"service_account_default"`

    - `RestrictedPermissions object { scopes, type }`

      - `scopes: array of string`

      - `type: "restricted" (default: "restricted")`

        - `"restricted"`

  - `project_id: string`

  - `service_account_id: string`

  - `updated_at: integer`

  - `workload_identity_provider_id: string`

### Example

```http
curl https://api.openai.com/v1/organization/workload_identity_providers/$WORKLOAD_IDENTITY_PROVIDER_ID/federation_rules/$WORKLOAD_IDENTITY_FEDERATION_RULE_ID \
    -X POST \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### 200 — Example

```json
{
  "id": "id",
  "attribute_matchers": {
    "foo": "string"
  },
  "created_at": 0,
  "description": "description",
  "enabled": true,
  "name": "name",
  "object": "organization.workload_identity_federation_rule",
  "permissions": {
    "type": "service_account_default"
  },
  "project_id": "project_id",
  "service_account_id": "service_account_id",
  "updated_at": 0,
  "workload_identity_provider_id": "workload_identity_provider_id"
}
```

### Example

```http
curl -X POST "https://api.openai.com/v1/organization/workload_identity_providers/wip_example/federation_rules/wifr_example" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "enabled": false
}'
```

#### Response example

```json
{
  "object": "organization.workload_identity_federation_rule",
  "id": "wifr_example",
  "workload_identity_provider_id": "wip_example",
  "project_id": "proj_example",
  "service_account_id": "svc_acct_example",
  "name": null,
  "description": null,
  "attribute_matchers": {
    "sub": "ci:release"
  },
  "permissions": {
    "type": "service_account_default"
  },
  "enabled": false,
  "created_at": 1793664000,
  "updated_at": 1793664000
}
```
