## Delete

**delete** `/organization/groups/{group_id}`

Deletes a group from the organization.

### Path Parameters

- `group_id: string`

### Returns

- `id: string`

  Identifier of the deleted group.

- `deleted: boolean`

  Whether the group was deleted.

- `object: "group.deleted"`

  Always `group.deleted`.

  - `"group.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
