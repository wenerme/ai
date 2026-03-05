## Delete

**delete** `/organization/invites/{invite_id}`

Delete an invite. If the invite has already been accepted, it cannot be deleted.

### Path Parameters

- `invite_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.invite.deleted"`

  The object type, which is always `organization.invite.deleted`

  - `"organization.invite.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/invites/$INVITE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
