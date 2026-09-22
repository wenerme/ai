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

- `data: array of ExternalStorageConfiguration`

  - `id: string`

  - `created_at: number`

  - `geography: string`

  - `object: "organization.external_storage"`

    - `"organization.external_storage"`

  - `project_id: string`

  - `provider: AwsExternalStorageProvider or AzureExternalStorageProvider`

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
