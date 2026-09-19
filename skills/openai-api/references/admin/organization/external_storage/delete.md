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
