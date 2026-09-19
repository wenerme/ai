# External Storage

## Create an external storage configuration

**post** `/organization/external_storage`

Register one customer-managed external storage configuration.

### Body Parameters

- `project_id: string`

- `provider: object { bucket, role_arn, type }  or object { account_name, container, resource_group, 3 more }`

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

## Delete an external storage configuration

**delete** `/organization/external_storage/{external_storage_id}`

Soft-delete one customer-managed external storage configuration.

### Path Parameters

- `external_storage_id: string`

### Returns

- `OrganizationExternalStorageDeleted object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.external_storage.deleted"`

    - `"organization.external_storage.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/external_storage/$EXTERNAL_STORAGE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.external_storage.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/external_storage/extstorage_abc123 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "organization.external_storage.deleted",
  "id": "extstorage_abc123",
  "deleted": true
}
```

## List external storage configurations

**get** `/organization/external_storage`

List the organization's customer-managed external storage configurations.

### Query Parameters

- `after: optional string or null`

  Return external storage configurations after this ID.

- `limit: optional number`

- `order: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `project_id: optional string or null`

### Returns

- `ListExternalStorageResponse object { data, first_id, has_more, 2 more }`

  - `data: array of OrganizationExternalStorage`

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

  - `first_id: string or null`

  - `has_more: boolean`

  - `last_id: string or null`

  - `object: "list"`

    - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/external_storage \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
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
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

### Example

```http
curl "https://api.openai.com/v1/organization/external_storage?limit=20&order=desc" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "list",
  "data": [
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
      "status": "validated",
      "created_at": 1711471533
    },
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
      "created_at": 1711471500
    }
  ],
  "first_id": "extstorage_abc123",
  "last_id": "extstorage_azure123",
  "has_more": false
}
```

## Get an external storage configuration

**get** `/organization/external_storage/{external_storage_id}`

Get one customer-managed external storage configuration.

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
curl https://api.openai.com/v1/organization/external_storage/$EXTERNAL_STORAGE_ID \
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
curl https://api.openai.com/v1/organization/external_storage/extstorage_azure123 \
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

## Domain Types

### Create External Storage Request

- `CreateExternalStorageRequest object { project_id, provider }`

  - `project_id: string`

  - `provider: object { bucket, role_arn, type }  or object { account_name, container, resource_group, 3 more }`

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

### List External Storage Response

- `ListExternalStorageResponse object { data, first_id, has_more, 2 more }`

  - `data: array of OrganizationExternalStorage`

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

  - `first_id: string or null`

  - `has_more: boolean`

  - `last_id: string or null`

  - `object: "list"`

    - `"list"`

### Organization External Storage

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

### Organization External Storage Deleted

- `OrganizationExternalStorageDeleted object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.external_storage.deleted"`

    - `"organization.external_storage.deleted"`
