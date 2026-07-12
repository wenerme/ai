## Retrieve group user

`client.admin.organization.groups.users.retrieve(stringuserID, UserRetrieveParamsparams, RequestOptionsoptions?): UserRetrieveResponse`

**get** `/organization/groups/{group_id}/users/{user_id}`

Retrieves a user in a group.

### Parameters

- `userID: string`

- `params: UserRetrieveParams`

  - `group_id: string`

    The ID of the group to inspect.

### Returns

- `UserRetrieveResponse`

  Details about a user returned from an organization group membership lookup.

  - `id: string`

    Identifier for the user.

  - `email: string | null`

    Email address of the user, or `null` for users without an email.

  - `is_service_account: boolean | null`

    Whether the user is a service account.

  - `name: string`

    Display name of the user.

  - `picture: string | null`

    URL of the user's profile picture, if available.

  - `user_type: "user" | "tenant_user"`

    The type of user.

    - `"user"`

    - `"tenant_user"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.groups.users.retrieve('user_id', {
  group_id: 'group_id',
});

console.log(user.id);
```

#### Response

```json
{
  "id": "id",
  "email": "email",
  "is_service_account": true,
  "name": "name",
  "picture": "picture",
  "user_type": "user"
}
```
