## Validate an external storage configuration

**post** `/organization/external_storage/{external_storage_id}/validate`

Validate one customer-managed external storage configuration.

### Path Parameters

- `external_storage_id: string`

### Returns

- `OrganizationExternalStorage object { id, created_at, geography, 4 more }`

  - `id: string`

  - `created_at: number`

  - `geography: string`

  - `object: "organization.external_storage"`

    - `"organization.external_storage"`

  - `project_id: string`

  - `provider: object { account_id, bucket, external_id, 3 more }  or object { account_name, container, region, 4 more }`

    - `Aws object { account_id, bucket, external_id, 3 more }`

      - `account_id: string`

      - `bucket: string`

      - `external_id: string`

      - `region: string`

      - `role_arn: string`

      - `type: "aws"`

        - `"aws"`

    - `Azure object { account_name, container, region, 4 more }`

      - `account_name: string`

      - `container: string`

      - `region: string`

      - `resource_group: string`

      - `subscription_id: string`

      - `tenant_id: string`

      - `type: "azure"`

        - `"azure"`

  - `status: "pending" or "validated" or "unhealthy"`

    - `"pending"`

    - `"validated"`

    - `"unhealthy"`

### Example

```http
curl https://api.openai.com/v1/organization/external_storage/$EXTERNAL_STORAGE_ID/validate \
    -X POST \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "geography": "geography",
  "object": "organization.external_storage",
  "project_id": "project_id",
  "provider": {
    "account_id": "account_id",
    "bucket": "bucket",
    "external_id": "external_id",
    "region": "region",
    "role_arn": "role_arn",
    "type": "aws"
  },
  "status": "pending"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/external_storage/extstorage_azure123/validate \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "organization.external_storage",
  "id": "extstorage_azure123",
  "project_id": "proj_azure123",
  "provider": {
    "type": "azure",
    "tenant_id": "11111111-1111-1111-1111-111111111111",
    "subscription_id": "22222222-2222-2222-2222-222222222222",
    "resource_group": "customer-rg",
    "account_name": "customerstorage",
    "container": "openai-data",
    "region": "eastus"
  },
  "geography": "US",
  "status": "validated",
  "created_at": 1711471533
}
```
