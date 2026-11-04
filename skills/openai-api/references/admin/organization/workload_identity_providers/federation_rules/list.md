## List Platform workload identity federation rules

**get** `/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules`

List the provider's federation rules to project service accounts.

### Path Parameters

- `workload_identity_provider_id: string`

  `minLength: 1`

### Query Parameters

- `after: optional string`

  `minLength: 1`

- `limit: optional integer`

  `minimum: 1`, `maximum: 100`

- `order: optional "asc" or "desc"`

  - `"asc" or "desc"`

    - `"asc"`

    - `"desc"`

- `service_account_id: optional string`

  `minLength: 1`

### Returns

- `data: array of FederationRule`

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

- `first_id: string or null`

- `has_more: boolean`

- `last_id: string or null`

- `object: "list" (default: "list")`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/workload_identity_providers/$WORKLOAD_IDENTITY_PROVIDER_ID/federation_rules \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### 200 — Example

```json
{
  "data": [
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
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

### Example

```http
curl -X GET "https://api.openai.com/v1/organization/workload_identity_providers/wip_example/federation_rules?limit=20&order=asc" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response example

```json
{
  "object": "list",
  "data": [
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
      "enabled": true,
      "created_at": 1793664000,
      "updated_at": 1793664000
    }
  ],
  "first_id": "wifr_example",
  "last_id": "wifr_example",
  "has_more": false
}
```
