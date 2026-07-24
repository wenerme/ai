## Delete organization spend limit

**delete** `/organization/spend_limit`

Delete the organization's hard spend limit.

### Returns

- `OrganizationSpendLimitDeleted object { deleted, object }`

  Confirmation payload returned after deleting an organization hard spend limit.

  - `deleted: boolean`

    Whether the hard spend limit was deleted.

  - `object: "organization.spend_limit.deleted"`

    The object type, which is always `organization.spend_limit.deleted`.

    - `"organization.spend_limit.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/spend_limit \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "organization.spend_limit.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/spend_limit \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.spend_limit.deleted",
    "deleted": true
}
```
