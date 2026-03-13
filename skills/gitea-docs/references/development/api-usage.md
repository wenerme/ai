---
date: "2018-06-24:00:00+02:00"
slug: "api-usage"
sidebar_position: 40
aliases:
  - /en-us/api-usage
---

# API Usage

## Enabling/configuring API access

By default, `ENABLE_SWAGGER` is true, and `MAX_RESPONSE_ITEMS` is set to 50. See [Config Cheat Sheet](../administration/config-cheat-sheet.md) for more information.

## Authentication

Gitea supports these methods of API authentication:

- HTTP basic authentication
- `token=...` parameter in URL query string
- `access_token=...` parameter in URL query string
- `Authorization: token ...` header in HTTP headers
- HTTP signatures using an SSH public key or SSH certificate

All of these methods accept the same API key token type. You can
better understand this by looking at the code -- as of this writing,
Gitea parses queries and headers to find the token in
[modules/auth/auth.go](https://github.com/go-gitea/gitea/blob/6efdcaed86565c91a3dc77631372a9cc45a58e89/modules/auth/auth.go#L47).

Gitea can also authenticate API requests using an SSH key or SSH certificate via
HTTP signatures. The SSH public key (or certificate) must be registered to the
user account in Gitea, and the client signs requests with the corresponding
private key. The client signs requests using the SSH private key following the
[draft-cavage-http-signatures](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures)
specification (not RFC 9421). The signature is sent in the `Signature` header,
and SSH certificates additionally include an `x-ssh-certificate` header. The
official [go-sdk](https://gitea.com/gitea/go-sdk) implements this flow if you
need a reference implementation.

## Generating and listing API tokens

API tokens can be created either in the user interface or via the API. Tokens have by default limited permissions and it is important to create tokens with the correct permissions for your task.
### User Interface
Tokens can be created via the `Manage Access Tokens` dialog, accessed via `User Settings` / `Applications` or via the link `gitea-domain.example/user/settings/applications`. The interface allows you to create tokens and manage their permissions via the `Select permissions` sub-menu.

Once created, the token is displayed in a toast message above the `Manage Access Tokens` dialog. Please note, that you can view this toast only once and it is not possible to redisplay the token for security reasons.

### Token API

A new token can be generated with a `POST` request to
`/users/:name/tokens`.

Note that `/users/:name/tokens` is a special endpoint and requires you
to authenticate using `BasicAuth` and a password, as follows:

```sh
$ curl -H "Content-Type: application/json" \
-d '{"name":"test_token","scopes":["read:activitypub","read:issue", "write:misc", "read:notification", "read:organization", "read:package", "read:repository", "read:user"]}' \
-u 'username:password' "https://gitea.your.host/api/v1/users/{username}/tokens"
{"id":1,"name":"test_token","sha1":"9fcb1158165773dd010fca5f0cf7174316c3e37d","token_last_eight":"16c3e37d"}
```

The ``sha1`` (the token) is only returned once and is not stored in
plain-text.  It will not be displayed when listing tokens with a `GET`
request; e.g.

```sh
$ curl --url https://yourusername:password@gitea.your.host/api/v1/users/<username>/tokens
[{"name":"test","sha1":"","token_last_eight:"........":},{"name":"dev","sha1":"","token_last_eight":"........"}]
```

By default, this creates a token with very limited permissions. To complete your tasks, your token may require extra permissions. These permissions are created via the json variable `scopes`, which takes an array of permissions as strings. Eg.: `"scopes":["all"]`. Possible permissions, as reflected in the user interface are:

- `activitypub`
- `admin`
- `issue`
- `misc`
- `notification`
- `organization`
- `package`
- `repository`
- `user`

Each permission may be set to `read` or `write`. `write` implies both Read & Write. To set permissions you write the permissions string as `<read or write>:<permission name>`, eg.: `write:package` or `read:notification`. A properly formatted API call may look like:

```sh
$ curl -H "Content-Type: application/json" -d '{"name":"test", "scopes":["write:package", "read:notification"]}' -u username:password https://gitea.your.host/api/v1/users/<username>/tokens
```
Special permissions `all` may be specified as `"scopes":["all"]`, which sets all permissions to both Read & Write.

To use the API with basic authentication with two factor authentication
enabled, you'll need to send an additional header that contains the one
time password (6 digitrotating token).
An example of the header is `X-Gitea-OTP: 123456` where `123456`
is where you'd place the code from your authenticator.
Here is how the request would look like in curl:

```sh
$ curl -H "X-Gitea-OTP: 123456" --url https://yourusername:yourpassword@gitea.your.host/api/v1/users/yourusername/tokens
```

You can also create an API key token via your Gitea installation's web
interface: `Settings | Applications | Generate New Token`.

## OAuth2 Provider

Access tokens obtained from Gitea's [OAuth2 provider](development/oauth2-provider.md) are accepted by these methods:

- `Authorization bearer ...` header in HTTP headers
- `token=...` parameter in URL query string
- `access_token=...` parameter in URL query string

### More on the `Authorization:` header

For historical reasons, Gitea needs the word `token` included before
the API key token in an authorization header, like this:

```sh
Authorization: token 65eaa9c8ef52460d22a93307fe0aee76289dc675
```

In a `curl` command, for instance, this would look like:

```sh
curl "http://localhost:4000/api/v1/repos/test1/test1/issues" \
    -H "accept: application/json" \
    -H "Authorization: token 65eaa9c8ef52460d22a93307fe0aee76289dc675" \
    -H "Content-Type: application/json" -d "{ \"body\": \"testing\", \"title\": \"test 20\"}" -i
```

As mentioned above, the token used is the same one you would use in
the `token=` string in a GET request.

## Pagination

The API supports pagination. The `page` and `limit` parameters are used to specify the page number and the number of items per page. As well, the `Link` header is returned with the next, previous, and last page links if there are more than one pages. The `x-total-count` is also returned to indicate the total number of items.

```sh
curl -v "http://localhost/api/v1/repos/search?limit=1"
...
< link: <http://localhost/api/v1/repos/search?limit=1&page=2>; rel="next",<http://localhost/api/v1/repos/search?limit=1&page=5252>; rel="last"
...
< x-total-count: 5252
```

## API Guide

API Reference guide is auto-generated by swagger and available on:
`https://gitea.your.host/api/swagger`
or on the
[Gitea instance](https://gitea.com/api/swagger)

The OpenAPI document is at:
`https://gitea.your.host/swagger.v1.json`

## Sudo

The API allows admin users to sudo API requests as another user. Simply add either a `sudo=` parameter or `Sudo:` request header with the username of the user to sudo.

## SDKs

- [Official go-sdk](https://gitea.com/gitea/go-sdk)
- [more](https://gitea.com/gitea/awesome-gitea#user-content-sdk)
