# Federation Rules

## Create Platform workload identity federation rule

**post** `/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules`

Bind verified token attributes to an existing project service account.

### Path Parameters

- `workload_identity_provider_id: string`

  `minLength: 1`

### Body Parameters

Content type: `application/json`

- `attribute_matchers: map[string or boolean or number or number]`

  - `string`

  - `boolean`

  - `number or number`

    - `number`

    - `number`

- `project_id: string`

  `minLength: 1`

- `service_account_id: string`

  `minLength: 1`

- `description: optional string`

- `enabled: optional boolean`

- `name: optional string`

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
curl https://api.openai.com/v1/organization/workload_identity_providers/$WORKLOAD_IDENTITY_PROVIDER_ID/federation_rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "attribute_matchers": {
            "foo": "string"
          },
          "project_id": "x",
          "service_account_id": "x"
        }'
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
curl -X POST "https://api.openai.com/v1/organization/workload_identity_providers/wip_example/federation_rules" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "project_id": "proj_example",
  "service_account_id": "svc_acct_example",
  "attribute_matchers": {
    "sub": "ci:release"
  }
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
  "enabled": true,
  "created_at": 1793664000,
  "updated_at": 1793664000
}
```

## Delete Platform workload identity federation rule

**delete** `/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}`

Delete a federation rule to a project service account.

### Path Parameters

- `workload_identity_provider_id: string`

  `minLength: 1`

- `workload_identity_federation_rule_id: string`

  `minLength: 1`

### Returns

- `FederationRuleDeleted object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.workload_identity_federation_rule.deleted" (default: "organization.workload_identity_federation_rule.deleted")`

    - `"organization.workload_identity_federation_rule.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/workload_identity_providers/$WORKLOAD_IDENTITY_PROVIDER_ID/federation_rules/$WORKLOAD_IDENTITY_FEDERATION_RULE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### 200 — Example

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.workload_identity_federation_rule.deleted"
}
```

### Example

```http
curl -X DELETE "https://api.openai.com/v1/organization/workload_identity_providers/wip_example/federation_rules/wifr_example" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response example

```json
{
  "object": "organization.workload_identity_federation_rule.deleted",
  "id": "wifr_example",
  "deleted": true
}
```

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

## Retrieve Platform workload identity federation rule

**get** `/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}`

Retrieve a federation rule owned by the authenticated organization and provider.

### Path Parameters

- `workload_identity_provider_id: string`

  `minLength: 1`

- `workload_identity_federation_rule_id: string`

  `minLength: 1`

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
curl -X GET "https://api.openai.com/v1/organization/workload_identity_providers/wip_example/federation_rules/wifr_example" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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
  "enabled": true,
  "created_at": 1793664000,
  "updated_at": 1793664000
}
```

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

## Domain Types

### Federation Rule

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

### Federation Rule Deleted

- `FederationRuleDeleted object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.workload_identity_federation_rule.deleted" (default: "organization.workload_identity_federation_rule.deleted")`

    - `"organization.workload_identity_federation_rule.deleted"`
