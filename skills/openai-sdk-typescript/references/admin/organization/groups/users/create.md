## Add group user

`client.admin.organization.groups.users.create(stringgroupID, UserCreateParamsbody, RequestOptionsoptions?): UserCreateResponse`

**post** `/organization/groups/{group_id}/users`

Adds a user to a group.

### Parameters

- `groupID: string`

- `body: UserCreateParams`

  - `user_id: string`

    Identifier of the user to add to the group.

### Returns

- `UserCreateResponse`

  Confirmation payload returned after adding a user to a group.

  - `group_id: string`

    Identifier of the group the user was added to.

  - `object: "group.user"`

    Always `group.user`.

    - `"group.user"`

  - `user_id: string`

    Identifier of the user that was added.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.groups.users.create('group_id', {
  user_id: 'user_id',
});

console.log(user.group_id);
```

#### Response

```json
{
  "group_id": "group_id",
  "object": "group.user",
  "user_id": "user_id"
}
```
