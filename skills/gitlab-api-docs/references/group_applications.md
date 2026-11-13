# Group Applications API

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/416504) in GitLab 19.6.

Use this API to manage [group-owned OAuth applications](../integration/oauth_provider.md#create-a-group-owned-application) that:

- [Use GitLab as an authentication provider](../integration/oauth_provider.md).
- [Allow access to GitLab resources on a user's behalf](oauth2.md).

> [!note]
> To manage instance-wide applications, use the [Applications API](applications.md).
> To manage user-owned applications, use the [User Applications API](user_applications.md).

Prerequisites:

- You must have the Owner role for the group.

## Create a group application

Creates an OAuth application owned by the specified group.

```plaintext
POST /groups/:id/applications
```

Supported attributes:

| Attribute      | Type              | Required | Description                      |
|:---------------|:------------------|:---------|:---------------------------------|
| `id`           | integer or string | yes      | ID or [URL-encoded path](rest/_index.md#namespaced-paths) of the group. |
| `name`         | string            | yes      | Name of the application.         |
| `redirect_uri` | string            | yes      | Redirect URI of the application. |
| `scopes`       | string            | yes      | Scopes available to the application. Separate multiple scopes with a space. |
| `confidential` | boolean           | no       | If `true`, the application can securely store client credentials, such as the client secret. Non-confidential applications (such as native mobile apps and Single Page Apps) might expose client credentials. If unspecified, defaults to `true`. |

If successful, returns [`201 Created`](rest/troubleshooting.md#status-codes) and the following response attributes:

| Attribute          | Type             | Description |
|:-------------------|:-----------------|:------------|
| `application_id`   | string           | OAuth client ID of the application. Differs from `id`. |
| `application_name` | string           | Name of the application. |
| `callback_url`     | string           | Redirect URI of the application. |
| `confidential`     | boolean          | If `true`, the application can securely store client credentials. |
| `id`               | integer          | ID of the application. |
| `scopes`           | array of strings | Scopes available to the application. |
| `secret`           | string           | Client secret of the application. Returned only when you create the application. |

Example request:

```shell
curl --request POST \
    --header "PRIVATE-TOKEN: <your_access_token>" \
    --data "name=MyApplication&redirect_uri=http://redirect.uri&scopes=api read_user email" \
    --url "https://gitlab.example.com/api/v4/groups/1/applications"
```

Example response:

```json
{
    "id": 1,
    "application_id": "5832fc6e14300a0d962240a8144466eef4ee93ef0d218477e55f11cf12fc3737",
    "application_name": "MyApplication",
    "secret": "ee1dd64b6adc89cf7e2c23099301ccc2c61b441064e9324d963c46902a85ec34",
    "callback_url": "http://redirect.uri",
    "confidential": true,
    "scopes": ["api", "read_user", "email"]
}
```

> [!note]
> The `secret` value is returned only when you create the application.

## List all group applications

Lists all OAuth applications owned by a specified group.

```plaintext
GET /groups/:id/applications
```

Supported attributes:

| Attribute | Type              | Required | Description |
|:----------|:------------------|:---------|:------------|
| `id`      | integer or string | yes      | ID or [URL-encoded path](rest/_index.md#namespaced-paths) of the group. |

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes) and a list of applications, each with the following response attributes:

| Attribute          | Type             | Description |
|:-------------------|:-----------------|:------------|
| `application_id`   | string           | OAuth client ID of the application. Differs from `id`. |
| `application_name` | string           | Name of the application. |
| `callback_url`     | string           | Redirect URI of the application. |
| `confidential`     | boolean          | If `true`, the application can securely store client credentials. |
| `id`               | integer          | ID of the application. |
| `scopes`           | array of strings | Scopes available to the application. |

Example request:

```shell
curl --request GET \
    --header "PRIVATE-TOKEN: <your_access_token>" \
    --url "https://gitlab.example.com/api/v4/groups/1/applications"
```

Example response:

```json
[
    {
        "id": 1,
        "application_id": "5832fc6e14300a0d962240a8144466eef4ee93ef0d218477e55f11cf12fc3737",
        "application_name": "MyApplication",
        "callback_url": "http://redirect.uri",
        "confidential": true,
        "scopes": ["api", "read_user"]
    }
]
```

## Retrieve a specific group application

Retrieves details of a specified OAuth application owned by a group.

```plaintext
GET /groups/:id/applications/:application_id
```

Supported attributes:

| Attribute        | Type              | Required | Description |
|:-----------------|:------------------|:---------|:------------|
| `id`             | integer or string | yes      | ID or [URL-encoded path](rest/_index.md#namespaced-paths) of the group. |
| `application_id` | integer           | yes      | ID of the application. Differs from the `application_id` field in the response, which is the OAuth client ID. |

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes) and the following response attributes:

| Attribute          | Type             | Description |
|:-------------------|:-----------------|:------------|
| `application_id`   | string           | OAuth client ID of the application. Differs from `id`. |
| `application_name` | string           | Name of the application. |
| `callback_url`     | string           | Redirect URI of the application. |
| `confidential`     | boolean          | If `true`, the application can securely store client credentials. |
| `id`               | integer          | ID of the application. |
| `scopes`           | array of strings | Scopes available to the application. |

Example request:

```shell
curl --request GET \
    --header "PRIVATE-TOKEN: <your_access_token>" \
    --url "https://gitlab.example.com/api/v4/groups/1/applications/1"
```

Example response:

```json
{
    "id": 1,
    "application_id": "5832fc6e14300a0d962240a8144466eef4ee93ef0d218477e55f11cf12fc3737",
    "application_name": "MyApplication",
    "callback_url": "http://redirect.uri",
    "confidential": true,
    "scopes": ["api", "read_user"]
}
```

## Update a group application

Updates a specified OAuth application owned by a group.

You cannot update the `redirect_uri` and `confidential` attributes of an
existing application. To change them, delete the application and create it
again.

```plaintext
PUT /groups/:id/applications/:application_id
```

Supported attributes:

| Attribute        | Type              | Required | Description |
|:-----------------|:------------------|:---------|:------------|
| `id`             | integer or string | yes      | ID or [URL-encoded path](rest/_index.md#namespaced-paths) of the group. |
| `application_id` | integer           | yes      | ID of the application. Differs from the `application_id` field in the response, which is the OAuth client ID. |
| `name`           | string            | no       | Name of the application. |
| `scopes`         | string            | no       | Scopes available to the application. Separate multiple scopes with a space. |

If successful, returns [`200 OK`](rest/troubleshooting.md#status-codes) and the following response attributes:

| Attribute          | Type             | Description |
|:-------------------|:-----------------|:------------|
| `application_id`   | string           | OAuth client ID of the application. Differs from `id`. |
| `application_name` | string           | Name of the application. |
| `callback_url`     | string           | Redirect URI of the application. |
| `confidential`     | boolean          | If `true`, the application can securely store client credentials. |
| `id`               | integer          | ID of the application. |
| `scopes`           | array of strings | Scopes available to the application. |

Example request:

```shell
curl --request PUT \
    --header "PRIVATE-TOKEN: <your_access_token>" \
    --data "name=UpdatedApplication" \
    --url "https://gitlab.example.com/api/v4/groups/1/applications/1"
```

Example response:

```json
{
    "id": 1,
    "application_id": "5832fc6e14300a0d962240a8144466eef4ee93ef0d218477e55f11cf12fc3737",
    "application_name": "UpdatedApplication",
    "callback_url": "http://redirect.uri",
    "confidential": true,
    "scopes": ["api", "read_user"]
}
```

## Delete a group application

Deletes a specified OAuth application owned by a group.

```plaintext
DELETE /groups/:id/applications/:application_id
```

Supported attributes:

| Attribute        | Type              | Required | Description |
|:-----------------|:------------------|:---------|:------------|
| `id`             | integer or string | yes      | ID or [URL-encoded path](rest/_index.md#namespaced-paths) of the group. |
| `application_id` | integer           | yes      | ID of the application. Differs from the `application_id` field in the response, which is the OAuth client ID. |

If successful, returns [`204 No Content`](rest/troubleshooting.md#status-codes).

Example request:

```shell
curl --request DELETE \
    --header "PRIVATE-TOKEN: <your_access_token>" \
    --url "https://gitlab.example.com/api/v4/groups/1/applications/1"
```
