## Create an external storage configuration

**post** `/organization/external_storage`

Register one customer-managed external storage configuration.

### Body Parameters

- `project_id: string`

- `provider: object { bucket, role_arn, type }  or object { account_name, container, resource_group, 3 more }  or object { bucket, type, workload_identity_pool_id, 2 more }`

  - `Aws object { bucket, role_arn, type }`

    - `bucket: string`

    - `role_arn: string`

    - `type: "aws"`

      - `"aws"`

  - `Azure object { account_name, container, resource_group, 3 more }`

    - `account_name: string`

    - `container: string`

    - `resource_group: string`

    - `subscription_id: string`

    - `tenant_id: string`

    - `type: "azure"`

      - `"azure"`

  - `Gcp object { bucket, type, workload_identity_pool_id, 2 more }`

    - `bucket: string`

    - `type: "gcp"`

      - `"gcp"`

    - `workload_identity_pool_id: string`

    - `workload_identity_project_number: string`

    - `workload_identity_provider_id: string`

### Returns

- `ExternalStorageConfiguration object { id, created_at, geography, 4 more }`

  - `id: string`

  - `created_at: number`

  - `geography: string`

  - `object: "organization.external_storage"`

    - `"organization.external_storage"`

  - `project_id: string`

  - `provider: AwsExternalStorageProvider or AzureExternalStorageProvider or GcpExternalStorageProvider`

    - `AwsExternalStorageProvider object { account_id, bucket, external_id, 3 more }`

      - `account_id: string`

      - `bucket: string`

      - `external_id: string`

      - `region: string`

      - `role_arn: string`

      - `type: "aws"`

        - `"aws"`

    - `AzureExternalStorageProvider object { account_name, container, region, 4 more }`

      - `account_name: string`

      - `container: string`

      - `region: string`

      - `resource_group: string`

      - `subscription_id: string`

      - `tenant_id: string`

      - `type: "azure"`

        - `"azure"`

    - `GcpExternalStorageProvider object { audience, bucket, region, 4 more }`

      - `audience: string`

      - `bucket: string`

      - `region: string`

      - `type: "gcp"`

        - `"gcp"`

      - `workload_identity_pool_id: string`

      - `workload_identity_project_number: string`

      - `workload_identity_provider_id: string`

  - `status: "pending" or "validated" or "unhealthy"`

    - `"pending"`

    - `"validated"`

    - `"unhealthy"`

### Example

```http
curl https://api.openai.com/v1/organization/external_storage \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "project_id": "proj_123",
          "provider": {
            "bucket": "bucket",
            "role_arn": "role_arn",
            "type": "aws"
          }
        }'
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

### AWS S3

```http
curl -X POST https://api.openai.com/v1/organization/external_storage \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "proj_abc123",
    "provider": {
      "type": "aws",
      "bucket": "customer-logs",
      "role_arn": "arn:aws:iam::123456789012:role/OpenAIExternalStorageRole"
    }
  }'
```

#### Response

```json
{
  "object": "organization.external_storage",
  "id": "extstorage_abc123",
  "project_id": "proj_abc123",
  "provider": {
    "type": "aws",
    "account_id": "123456789012",
    "region": "us-east-1",
    "bucket": "customer-logs",
    "role_arn": "arn:aws:iam::123456789012:role/OpenAIExternalStorageRole",
    "external_id": "proj_abc123"
  },
  "geography": "US",
  "status": "pending",
  "created_at": 1711471533
}
```

### Azure Blob Storage

```http
curl -X POST https://api.openai.com/v1/organization/external_storage \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "proj_azure123",
    "provider": {
      "type": "azure",
      "tenant_id": "11111111-1111-1111-1111-111111111111",
      "subscription_id": "22222222-2222-2222-2222-222222222222",
      "resource_group": "customer-rg",
      "account_name": "customerstorage",
      "container": "openai-data"
    }
  }'
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
  "status": "pending",
  "created_at": 1711471533
}
```

### Google Cloud Storage

```http
curl -X POST https://api.openai.com/v1/organization/external_storage \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "proj_gcp123",
    "provider": {
      "type": "gcp",
      "bucket": "customer-gcp-retention",
      "workload_identity_project_number": "123456789012",
      "workload_identity_pool_id": "customer-pool",
      "workload_identity_provider_id": "customer-provider"
    }
  }'
```

#### Response

```json
{
  "object": "organization.external_storage",
  "id": "extstorage_gcp123",
  "project_id": "proj_gcp123",
  "provider": {
    "type": "gcp",
    "bucket": "customer-gcp-retention",
    "workload_identity_project_number": "123456789012",
    "workload_identity_pool_id": "customer-pool",
    "workload_identity_provider_id": "customer-provider",
    "region": "us-central1",
    "audience": "proj_gcp123"
  },
  "geography": "US",
  "status": "pending",
  "created_at": 1711471400
}
```
