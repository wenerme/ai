# Users

## List group users

`client.admin.organization.groups.users.list(stringgroupID, UserListParamsquery?, RequestOptionsoptions?): NextCursorPage<OrganizationGroupUser>`

**get** `/organization/groups/{group_id}/users`

Lists the users assigned to a group.

### Parameters

- `groupID: string`

- `query: UserListParams`

  - `after?: string`

    A cursor for use in pagination. Provide the ID of the last user from the previous list response to retrieve the next page.

  - `limit?: number`

    A limit on the number of users to be returned. Limit can range between 0 and 1000, and the default is 100.

  - `order?: "asc" | "desc"`

    Specifies the sort order of users in the list.

    - `"asc"`

    - `"desc"`

### Returns

- `OrganizationGroupUser`

  Represents an individual user returned when inspecting group membership.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string | null`

    The email address of the user.

  - `name: string`

    The name of the user.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const organizationGroupUser of client.admin.organization.groups.users.list('group_id')) {
  console.log(organizationGroupUser.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "email": "email",
      "name": "name"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

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

## Domain Types

### Organization Group User

- `OrganizationGroupUser`

  Represents an individual user returned when inspecting group membership.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string | null`

    The email address of the user.

  - `name: string`

    The name of the user.

### User Create Response

- `UserCreateResponse`

  Confirmation payload returned after adding a user to a group.

  - `group_id: string`

    Identifier of the group the user was added to.

  - `object: "group.user"`

    Always `group.user`.

    - `"group.user"`

  - `user_id: string`

    Identifier of the user that was added.

### User Retrieve Response

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

### User Delete Response

- `UserDeleteResponse`

  Confirmation payload returned after removing a user from a group.

  - `deleted: boolean`

    Whether the group membership was removed.

  - `object: "group.user.deleted"`

    Always `group.user.deleted`.

    - `"group.user.deleted"`
