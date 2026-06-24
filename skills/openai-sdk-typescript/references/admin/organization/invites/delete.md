## Delete invite

`client.admin.organization.invites.delete(stringinviteID, RequestOptionsoptions?): InviteDeleteResponse`

**delete** `/organization/invites/{invite_id}`

Delete an invite. If the invite has already been accepted, it cannot be deleted.

### Parameters

- `inviteID: string`

### Returns

- `InviteDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.invite.deleted"`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const invite = await client.admin.organization.invites.delete('invite_id');

console.log(invite.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.invite.deleted"
}
```
