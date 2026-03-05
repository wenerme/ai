## Delete

**delete** `/organization/roles/{role_id}`

Deletes a custom role from the organization.

### Path Parameters

- `role_id: string`

### Returns

- `id: string`

  Identifier of the deleted role.

- `deleted: boolean`

  Whether the role was deleted.

- `object: "role.deleted"`

  Always `role.deleted`.

  - `"role.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
