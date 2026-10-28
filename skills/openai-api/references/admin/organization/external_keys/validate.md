## Validate an external key config for the user's organization

**post** `/organization/external_keys/{external_key_id}/validate`

Validate an external key config for the user's organization

### Path Parameters

- `external_key_id: string`

### Returns

- `status: string`

### Example

```http
curl https://api.openai.com/v1/organization/external_keys/$EXTERNAL_KEY_ID/validate \
    -X POST \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "status": "status"
}
```
