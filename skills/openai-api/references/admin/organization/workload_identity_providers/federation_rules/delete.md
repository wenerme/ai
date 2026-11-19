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
