## Delete Platform workload identity provider

**delete** `/organization/workload_identity_providers/{workload_identity_provider_id}`

Delete a provider after deleting all its federation rules.

### Path Parameters

- `workload_identity_provider_id: string`

  `minLength: 1`

### Returns

- `WorkloadIdentityProviderDeleted object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.workload_identity_provider.deleted" (default: "organization.workload_identity_provider.deleted")`

    - `"organization.workload_identity_provider.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/workload_identity_providers/$WORKLOAD_IDENTITY_PROVIDER_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### 200 — Example

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.workload_identity_provider.deleted"
}
```

### Example

```http
curl -X DELETE "https://api.openai.com/v1/organization/workload_identity_providers/wip_example" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response example

```json
{
  "object": "organization.workload_identity_provider.deleted",
  "id": "wip_example",
  "deleted": true
}
```
