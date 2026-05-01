## Modify user

`client.admin.organization.users.update(stringuserID, UserUpdateParamsbody, RequestOptionsoptions?): OrganizationUser`

**post** `/organization/users/{user_id}`

Modifies a user's role in the organization.

### Parameters

- `userID: string`

- `body: UserUpdateParams`

  - `role: "owner" | "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

### Returns

- `OrganizationUser`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `email: string`

    The email address of the user

  - `name: string`

    The name of the user

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `role: "owner" | "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const organizationUser = await client.admin.organization.users.update('user_id', { role: 'owner' });

console.log(organizationUser.id);
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "email": "email",
  "name": "name",
  "object": "organization.user",
  "role": "owner"
}
```
