# Organizations API

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed
- Status: Experiment

Use this API to interact with GitLab organizations. For more information, see [organization](../user/organization/_index.md).

## Create an organization

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/470613) in GitLab 17.5 with a [flag](../administration/feature_flags/_index.md) named `allow_organization_creation`. Disabled by default. This feature is an [experiment](../policy/development_stages_support.md).
- [Changed](https://gitlab.com/gitlab-org/gitlab/-/issues/549062) in GitLab 18.4. Feature flag `allow_organization_creation` consolidated and renamed to `organization_switching`.
- Feature flag [changed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/249678) to `org_stage_experimental` in GitLab 19.4. Disabled by default. Feature flag `organization_switching` removed.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

Creates an organization.

This endpoint is an [experiment](../policy/development_stages_support.md) and might be changed or removed without notice.

```plaintext
POST /organizations
```

Parameters:

| Attribute     | Type   | Required | Description                           |
|---------------|--------|----------|---------------------------------------|
| `name`        | string | yes      | The name of the organization          |
| `path`        | string | yes      | The path of the organization          |
| `description` | string | no       | The description of the organization   |
| `avatar`      | file   | no       | The avatar image for the organization |

Example request:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --form "name=New Organization" \
  --form "path=new-org" \
  --form "description=A new organization" \
  --form "avatar=@/path/to/avatar.png" \
  --url "https://gitlab.example.com/api/v4/organizations"
```

Example response:

```json
{
  "id": 42,
  "uuid": "0192f8c2-1a2b-7cde-89ab-0123456789ab",
  "name": "New Organization",
  "path": "new-org",
  "description": "A new organization",
  "created_at": "2024-09-18T02:35:15.371Z",
  "updated_at": "2024-09-18T02:35:15.371Z",
  "web_url": "https://gitlab.example.com/o/new-org/-/overview",
  "avatar_url": "https://gitlab.example.com/uploads/-/system/organizations/organization_detail/avatar/42/avatar.png"
}
```

## Restore an organization

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/599346) as an [experiment](../policy/development_stages_support.md) in GitLab 19.6.

Restores a soft-deleted organization.

Prerequisites:

- You must be an administrator.

```plaintext
POST /organizations/:id/restore
```

Supported attributes:

| Attribute | Type    | Required | Description                 |
|-----------|---------|----------|-----------------------------|
| `id`      | integer | Yes      | The ID of the organization. |

If successful, returns [`201 Created`](rest/troubleshooting.md#status-codes) and the following
response attributes:

| Attribute     | Type     | Description |
|---------------|----------|-------------|
| `avatar_url`  | string   | URL of the organization avatar. |
| `created_at`  | datetime | Timestamp when the organization was created. |
| `description` | string   | Description of the organization. |
| `id`          | integer  | ID of the organization. |
| `name`        | string   | Name of the organization. |
| `path`        | string   | Path of the organization. |
| `updated_at`  | datetime | Timestamp when the organization was last updated. |
| `uuid`        | string   | UUID of the organization. |
| `visibility`  | string   | Visibility level of the organization. |
| `web_url`     | string   | URL of the organization. |

If the organization is not soft-deleted, returns `400 Bad Request`.

Example request:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/organizations/42/restore"
```

Example response:

```json
{
  "id": 42,
  "uuid": "0192f8c2-1a2b-7cde-89ab-0123456789ab",
  "name": "New Organization",
  "path": "new-org",
  "description": "A new organization",
  "visibility": "private",
  "created_at": "2024-09-18T02:35:15.371Z",
  "updated_at": "2024-09-20T10:12:45.118Z",
  "web_url": "https://gitlab.example.com/o/new-org/-/overview",
  "avatar_url": null
}
```

## Transfer users to an organization

- Introduced in GitLab 19.6.

Transfers ownership of users to an organization, including their personal namespaces and projects.
This is a change of ownership, not organization membership.
The transfer runs in the background.

Prerequisites:

- You must be an administrator.
- All users must belong to the same organization.
- No user can be an internal user, such as the ghost user or a bot like `support_bot` or `admin_bot`. Service accounts and project access token bots can be transferred.

```plaintext
POST /organizations/:id/transfer_users
```

Parameters:

| Attribute  | Type              | Required | Description |
|------------|-------------------|----------|-------------|
| `id`       | integer           | yes      | The ID of the organization to transfer the users to. |
| `user_ids` | array of integers | yes      | The IDs of the users to transfer. Maximum 50. |

If successful, returns [`202 Accepted`](rest/troubleshooting.md#status-codes) and the IDs of the users being transferred.

Example request:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --data "user_ids[]=5" \
  --data "user_ids[]=6" \
  --url "https://gitlab.example.com/api/v4/organizations/42/transfer_users"
```

Example response:

```json
{
  "organization_id": 42,
  "user_ids": [5, 6]
}
```

## List organization users

- Introduced as an [experiment](../policy/development_stages_support.md) in GitLab 19.6.

Lists the users of an organization.

Prerequisites:

- Instance or organization administrator access.

```plaintext
GET /organizations/:id/users
```

Supported attributes:

| Attribute | Type    | Required | Description |
|-----------|---------|----------|-------------|
| `id`      | integer | Yes      | The ID of the organization. |
| `cursor`  | string  | No       | Cursor for the next page of results. |
| `order_by` | string | No       | Field to sort by. Only `id` is supported. Default is `id`. |
| `per_page` | integer | No      | Number of items per page, from 1 to 100. Default is 20. |
| `sort`    | string  | No       | Sort order, either `asc` or `desc`. Default is `asc`. |

This endpoint supports only [keyset pagination](rest/_index.md#keyset-based-pagination).
Keyset pagination is used by default, and the `page` parameter is not supported.

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes) and the following
response attributes:

| Attribute      | Type    | Description |
|----------------|---------|-------------|
| `access_level` | string  | Access level of the user in the organization, either `default` or `owner`. Users with the `owner` access level are organization administrators. |
| `bot`          | boolean | If `true`, the user is a bot. |
| `id`           | integer | ID of the user. |
| `username`     | string  | Username of the user. |

Example request:

```shell
curl --request GET \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/organizations/42/users"
```

Example response:

```json
[
  {
    "id": 1001,
    "username": "jsmith",
    "bot": false,
    "access_level": "default"
  }
]
```

## Add a user to an organization

- Introduced as an [experiment](../policy/development_stages_support.md) in GitLab 19.6.

Adds a user to an organization.

Prerequisites:

- Instance or organization administrator access.

```plaintext
POST /organizations/:id/users
```

Supported attributes:

| Attribute      | Type    | Required | Description |
|----------------|---------|----------|-------------|
| `id`           | integer | Yes      | The ID of the organization. |
| `username`     | string  | Yes      | The username of the user to add. |
| `access_level` | string  | No       | The access level of the user, either `default` or `owner`. Users with the `owner` access level are organization administrators. Default is `default`. |

If successful, returns [`201 Created`](rest/troubleshooting.md#status-codes) and the
attributes listed in [List organization users](#list-organization-users).

If the user does not exist or is already a member, returns `400 Bad Request`.
To change the access level of an existing member, use [Update an organization user](#update-an-organization-user).

Example request:

```shell
curl --request POST \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --data "username=jsmith" \
  --data "access_level=owner" \
  --url "https://gitlab.example.com/api/v4/organizations/42/users"
```

Example response:

```json
{
  "id": 1001,
  "username": "jsmith",
  "bot": false,
  "access_level": "owner"
}
```

## Update an organization user

- Introduced as an [experiment](../policy/development_stages_support.md) in GitLab 19.6.

Changes the access level of a user in an organization. For example, you can make a member an organization administrator.

Prerequisites:

- Instance or organization administrator access.

```plaintext
PUT /organizations/:id/users/:user_id
```

Supported attributes:

| Attribute      | Type    | Required | Description |
|----------------|---------|----------|-------------|
| `id`           | integer | Yes      | The ID of the organization. |
| `user_id`      | integer | Yes      | The ID of the user to update. |
| `access_level` | string  | Yes      | The access level of the user, either `default` or `owner`. Users with the `owner` access level are organization administrators. |

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes) and the
attributes listed in [List organization users](#list-organization-users).

Returns `400 Bad Request` if the change would leave the organization without an active organization administrator.

Returns `404 Not Found` if the user is not a member of the organization.

Example request:

```shell
curl --request PUT \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --data "access_level=owner" \
  --url "https://gitlab.example.com/api/v4/organizations/42/users/1001"
```

Example response:

```json
{
  "id": 1001,
  "username": "jsmith",
  "bot": false,
  "access_level": "owner"
}
```

## Remove a user from an organization

- Introduced as an [experiment](../policy/development_stages_support.md) in GitLab 19.6.

Removes a user from an organization. Removal from an organization
also removes the user as a member from any groups or projects
managed by the organization.

Prerequisites:

- Instance or organization administrator access, unless you are removing yourself.

```plaintext
DELETE /organizations/:id/users/:user_id
```

Supported attributes:

| Attribute | Type    | Required | Description |
|-----------|---------|----------|-------------|
| `id`      | integer | Yes      | The ID of the organization. |
| `user_id` | integer | Yes      | The ID of the user to remove. |

If successful, returns [`204 No Content`](rest/troubleshooting.md#status-codes).

Returns `400 Bad Request` if:

- The user is the last active organization administrator.
- The organization is the user's home organization, which is the organization that the user belongs to by default.
- The user would no longer belong to any organization.

Returns `403 Forbidden` if you do not have permission to remove the user.

Example request:

```shell
curl --request DELETE \
  --header "PRIVATE-TOKEN: <your_access_token>" \
  --url "https://gitlab.example.com/api/v4/organizations/42/users/5"
```
