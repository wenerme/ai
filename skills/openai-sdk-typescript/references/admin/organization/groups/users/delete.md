## Remove group user

`client.admin.organization.groups.users.delete(stringuserID, UserDeleteParamsparams, RequestOptionsoptions?): UserDeleteResponse`

**delete** `/organization/groups/{group_id}/users/{user_id}`

Removes a user from a group.

### Parameters

- `userID: string`

- `params: UserDeleteParams`

  - `group_id: string`

    The ID of the group to update.

### Returns

- `UserDeleteResponse`

  Confirmation payload returned after removing a user from a group.

  - `deleted: boolean`

    Whether the group membership was removed.

  - `object: "group.user.deleted"`

    Always `group.user.deleted`.

    - `"group.user.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.groups.users.delete('user_id', {
  group_id: 'group_id',
});

console.log(user.deleted);
```

#### Response

```json
{
  "deleted": true,
  "object": "group.user.deleted"
}
```
