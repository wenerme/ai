# Credentials

## Create a vault credential

**post** `/vaults/{vault_id}/credentials`

Creates a vault credential. Secret values are write-only and are never returned. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Path Parameters

- `vault_id: string`

### Body Parameters

- `auth: CredentialAuthCreateParam`

  The authentication method and secret values to store for the MCP server.

  - `McpOauth object { access_token, mcp_server_url, type, 2 more }`

    An OAuth credential for an HTTPS MCP destination.

    - `access_token: string`

      A write-only OAuth access token; never returned by credential resources.

    - `mcp_server_url: string`

      The HTTPS MCP server URL authorized by this credential.

    - `type: "mcp_oauth"`

      The type of the object. Always `mcp_oauth`.

      - `"mcp_oauth"`

    - `expires_at: optional string or null`

      When the OAuth access token expires, as an RFC 3339 timestamp, if known.

    - `refresh: optional object { client_id, refresh_token, token_endpoint, 3 more }  or null`

      Configuration for refreshing the access token of an MCP OAuth credential.

      - `client_id: string`

        The OAuth client ID used when requesting a new access token.

      - `refresh_token: string`

        The refresh token to store. This secret is never returned in credential resources.

      - `token_endpoint: string`

        The HTTPS OAuth token endpoint used to exchange the refresh token for a new access token.

      - `token_endpoint_auth: McpOauthTokenEndpointAuthCreateParam`

        How the OAuth client authenticates to the token endpoint.

        - `None object { type }`

          Sends the client ID without a client secret.

          - `type: "none"`

            The type of the object. Always `none`.

            - `"none"`

        - `ClientSecretBasic object { client_secret, type }`

          Sends the client ID and secret using HTTP Basic authentication.

          - `client_secret: string`

            The OAuth client secret to store. Never returned in credential resources.

          - `type: "client_secret_basic"`

            The type of the object. Always `client_secret_basic`.

            - `"client_secret_basic"`

        - `ClientSecretPost object { client_secret, type }`

          Sends the client ID and secret in the token request body.

          - `client_secret: string`

            The OAuth client secret to store. Never returned in credential resources.

          - `type: "client_secret_post"`

            The type of the object. Always `client_secret_post`.

            - `"client_secret_post"`

      - `resource: optional string or null`

        The resource URI to send to the OAuth token endpoint during refresh, if required.

      - `scope: optional string or null`

        Space-separated OAuth scopes to request during refresh, if required.

  - `StaticBearer object { token, mcp_server_url, type }`

    A bearer token for an MCP server, without automatic OAuth refresh.

    - `token: string`

      The bearer token to store. This secret is never returned in credential resources.

    - `mcp_server_url: string`

      The HTTPS MCP server URL authorized by this credential.

    - `type: "static_bearer"`

      The type of the object. Always `static_bearer`.

      - `"static_bearer"`

- `name: string`

  The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.

### Returns

- `Credential object { id, auth, created_at, 4 more }`

  Metadata for a stored MCP server credential. Secret values are never returned.

  - `id: string`

    The ID of the credential.

  - `auth: CredentialAuth`

    The authentication method and non-secret configuration for the MCP server.

    - `McpOauth object { expires_at, mcp_server_url, refresh, type }`

      Public metadata for an OAuth credential; tokens and client secrets are never returned.

      - `expires_at: string or null`

        When the OAuth access token expires, as an RFC 3339 timestamp, if known.

      - `mcp_server_url: string`

        The HTTPS MCP server URL authorized by this credential.

      - `refresh: object { client_id, resource, scope, 2 more }  or null`

        Configuration used to refresh an MCP OAuth access token, excluding secret values.

        - `client_id: string`

          The OAuth client ID used when requesting a new access token.

        - `resource: string or null`

          The resource URI sent to the OAuth token endpoint during refresh, if configured.

        - `scope: string or null`

          Space-separated OAuth scopes requested during refresh, if configured.

        - `token_endpoint: string`

          The HTTPS OAuth token endpoint used for refresh.

        - `token_endpoint_auth: McpOauthTokenEndpointAuth`

          How the OAuth client authenticates to the token endpoint, excluding its client secret.

          - `None object { type }`

            Sends the client ID without a client secret.

            - `type: "none"`

              The type of the object. Always `none`.

              - `"none"`

          - `ClientSecretBasic object { type }`

            Sends the client ID and secret using HTTP Basic authentication.

            - `type: "client_secret_basic"`

              The type of the object. Always `client_secret_basic`.

              - `"client_secret_basic"`

          - `ClientSecretPost object { type }`

            Sends the client ID and secret in the token request body.

            - `type: "client_secret_post"`

              The type of the object. Always `client_secret_post`.

              - `"client_secret_post"`

      - `type: "mcp_oauth"`

        The type of the object. Always `mcp_oauth`.

        - `"mcp_oauth"`

    - `StaticBearer object { mcp_server_url, type }`

      Metadata for a bearer-token credential, without automatic OAuth refresh.

      - `mcp_server_url: string`

        The HTTPS MCP server URL authorized by this credential.

      - `type: "static_bearer"`

        The type of the object. Always `static_bearer`.

        - `"static_bearer"`

  - `created_at: number`

    The Unix timestamp, in seconds, when the credential was created.

  - `name: string`

    The human-readable name of the credential.

  - `object: "vault.credential"`

    The object type. Always `vault.credential`.

    - `"vault.credential"`

  - `updated_at: number`

    The Unix timestamp, in seconds, when the credential was last updated.

  - `vault_id: string`

    The ID of the vault containing this credential.

### Example

```http
curl https://api.openai.com/v1/vaults/$VAULT_ID/credentials \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "auth": {
            "access_token": "access_token",
            "mcp_server_url": "mcp_server_url",
            "type": "mcp_oauth"
          },
          "name": "x"
        }'
```

#### Response

```json
{
  "id": "id",
  "auth": {
    "expires_at": "expires_at",
    "mcp_server_url": "mcp_server_url",
    "refresh": {
      "client_id": "client_id",
      "resource": "resource",
      "scope": "scope",
      "token_endpoint": "token_endpoint",
      "token_endpoint_auth": {
        "type": "none"
      }
    },
    "type": "mcp_oauth"
  },
  "created_at": 0,
  "name": "name",
  "object": "vault.credential",
  "updated_at": 0,
  "vault_id": "vault_id"
}
```

## Delete a vault credential

**delete** `/vaults/{vault_id}/credentials/{credential_id}`

Deletes a vault credential. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Path Parameters

- `vault_id: string`

- `credential_id: string`

### Returns

- `CredentialDeleted object { id, deleted, object }`

  Confirmation that a vault credential was deleted.

  - `id: string`

    The ID of the deleted credential.

  - `deleted: boolean`

    Whether the resource was deleted. Always `true`.

  - `object: "vault.credential.deleted"`

    The object type. Always `vault.credential.deleted`.

    - `"vault.credential.deleted"`

### Example

```http
curl https://api.openai.com/v1/vaults/$VAULT_ID/credentials/$CREDENTIAL_ID \
    -X DELETE \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "vault.credential.deleted"
}
```

## List vault credentials

**get** `/vaults/{vault_id}/credentials`

Lists a vault's credentials using ID-based pagination without returning secret values. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Path Parameters

- `vault_id: string`

### Query Parameters

- `after: optional string`

  Return resources after this resource ID in the selected order.

- `limit: optional number or null`

  The maximum number of resources to return. Defaults to 20. Values are clamped between 1 and 100.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `desc`.

  - `"asc"`

    Returns resources in ascending order.

  - `"desc"`

    Returns resources in descending order.

- `status: optional VaultStatusFilter`

  Filter by one status or a list, such as `status=active` or `status[]=active&status[]=archived`. Both statuses are included by default.

  - `VaultStatus = "active" or "archived"`

    Whether a vault or credential is active or archived.

    - `"active"`

    - `"archived"`

  - `array of VaultStatus`

    - `"active"`

    - `"archived"`

### Returns

- `data: array of Credential`

  The resources returned in this page, in the requested sort order.

  - `id: string`

    The ID of the credential.

  - `auth: CredentialAuth`

    The authentication method and non-secret configuration for the MCP server.

    - `McpOauth object { expires_at, mcp_server_url, refresh, type }`

      Public metadata for an OAuth credential; tokens and client secrets are never returned.

      - `expires_at: string or null`

        When the OAuth access token expires, as an RFC 3339 timestamp, if known.

      - `mcp_server_url: string`

        The HTTPS MCP server URL authorized by this credential.

      - `refresh: object { client_id, resource, scope, 2 more }  or null`

        Configuration used to refresh an MCP OAuth access token, excluding secret values.

        - `client_id: string`

          The OAuth client ID used when requesting a new access token.

        - `resource: string or null`

          The resource URI sent to the OAuth token endpoint during refresh, if configured.

        - `scope: string or null`

          Space-separated OAuth scopes requested during refresh, if configured.

        - `token_endpoint: string`

          The HTTPS OAuth token endpoint used for refresh.

        - `token_endpoint_auth: McpOauthTokenEndpointAuth`

          How the OAuth client authenticates to the token endpoint, excluding its client secret.

          - `None object { type }`

            Sends the client ID without a client secret.

            - `type: "none"`

              The type of the object. Always `none`.

              - `"none"`

          - `ClientSecretBasic object { type }`

            Sends the client ID and secret using HTTP Basic authentication.

            - `type: "client_secret_basic"`

              The type of the object. Always `client_secret_basic`.

              - `"client_secret_basic"`

          - `ClientSecretPost object { type }`

            Sends the client ID and secret in the token request body.

            - `type: "client_secret_post"`

              The type of the object. Always `client_secret_post`.

              - `"client_secret_post"`

      - `type: "mcp_oauth"`

        The type of the object. Always `mcp_oauth`.

        - `"mcp_oauth"`

    - `StaticBearer object { mcp_server_url, type }`

      Metadata for a bearer-token credential, without automatic OAuth refresh.

      - `mcp_server_url: string`

        The HTTPS MCP server URL authorized by this credential.

      - `type: "static_bearer"`

        The type of the object. Always `static_bearer`.

        - `"static_bearer"`

  - `created_at: number`

    The Unix timestamp, in seconds, when the credential was created.

  - `name: string`

    The human-readable name of the credential.

  - `object: "vault.credential"`

    The object type. Always `vault.credential`.

    - `"vault.credential"`

  - `updated_at: number`

    The Unix timestamp, in seconds, when the credential was last updated.

  - `vault_id: string`

    The ID of the vault containing this credential.

- `first_id: string or null`

  The ID of the first resource in `data`, or `null` if the page is empty.

- `has_more: boolean`

  Whether there are more resources to retrieve after this page.

- `last_id: string or null`

  The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.

- `object: "list"`

  The object type, which is always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/vaults/$VAULT_ID/credentials \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "auth": {
        "expires_at": "expires_at",
        "mcp_server_url": "mcp_server_url",
        "refresh": {
          "client_id": "client_id",
          "resource": "resource",
          "scope": "scope",
          "token_endpoint": "token_endpoint",
          "token_endpoint_auth": {
            "type": "none"
          }
        },
        "type": "mcp_oauth"
      },
      "created_at": 0,
      "name": "name",
      "object": "vault.credential",
      "updated_at": 0,
      "vault_id": "vault_id"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

## Retrieve a vault credential

**get** `/vaults/{vault_id}/credentials/{credential_id}`

Retrieves vault credential metadata without returning secret values. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Path Parameters

- `vault_id: string`

- `credential_id: string`

### Returns

- `Credential object { id, auth, created_at, 4 more }`

  Metadata for a stored MCP server credential. Secret values are never returned.

  - `id: string`

    The ID of the credential.

  - `auth: CredentialAuth`

    The authentication method and non-secret configuration for the MCP server.

    - `McpOauth object { expires_at, mcp_server_url, refresh, type }`

      Public metadata for an OAuth credential; tokens and client secrets are never returned.

      - `expires_at: string or null`

        When the OAuth access token expires, as an RFC 3339 timestamp, if known.

      - `mcp_server_url: string`

        The HTTPS MCP server URL authorized by this credential.

      - `refresh: object { client_id, resource, scope, 2 more }  or null`

        Configuration used to refresh an MCP OAuth access token, excluding secret values.

        - `client_id: string`

          The OAuth client ID used when requesting a new access token.

        - `resource: string or null`

          The resource URI sent to the OAuth token endpoint during refresh, if configured.

        - `scope: string or null`

          Space-separated OAuth scopes requested during refresh, if configured.

        - `token_endpoint: string`

          The HTTPS OAuth token endpoint used for refresh.

        - `token_endpoint_auth: McpOauthTokenEndpointAuth`

          How the OAuth client authenticates to the token endpoint, excluding its client secret.

          - `None object { type }`

            Sends the client ID without a client secret.

            - `type: "none"`

              The type of the object. Always `none`.

              - `"none"`

          - `ClientSecretBasic object { type }`

            Sends the client ID and secret using HTTP Basic authentication.

            - `type: "client_secret_basic"`

              The type of the object. Always `client_secret_basic`.

              - `"client_secret_basic"`

          - `ClientSecretPost object { type }`

            Sends the client ID and secret in the token request body.

            - `type: "client_secret_post"`

              The type of the object. Always `client_secret_post`.

              - `"client_secret_post"`

      - `type: "mcp_oauth"`

        The type of the object. Always `mcp_oauth`.

        - `"mcp_oauth"`

    - `StaticBearer object { mcp_server_url, type }`

      Metadata for a bearer-token credential, without automatic OAuth refresh.

      - `mcp_server_url: string`

        The HTTPS MCP server URL authorized by this credential.

      - `type: "static_bearer"`

        The type of the object. Always `static_bearer`.

        - `"static_bearer"`

  - `created_at: number`

    The Unix timestamp, in seconds, when the credential was created.

  - `name: string`

    The human-readable name of the credential.

  - `object: "vault.credential"`

    The object type. Always `vault.credential`.

    - `"vault.credential"`

  - `updated_at: number`

    The Unix timestamp, in seconds, when the credential was last updated.

  - `vault_id: string`

    The ID of the vault containing this credential.

### Example

```http
curl https://api.openai.com/v1/vaults/$VAULT_ID/credentials/$CREDENTIAL_ID \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "auth": {
    "expires_at": "expires_at",
    "mcp_server_url": "mcp_server_url",
    "refresh": {
      "client_id": "client_id",
      "resource": "resource",
      "scope": "scope",
      "token_endpoint": "token_endpoint",
      "token_endpoint_auth": {
        "type": "none"
      }
    },
    "type": "mcp_oauth"
  },
  "created_at": 0,
  "name": "name",
  "object": "vault.credential",
  "updated_at": 0,
  "vault_id": "vault_id"
}
```

## Rotate a vault credential

**post** `/vaults/{vault_id}/credentials/{credential_id}`

Rotates a vault credential's write-only secret and returns only credential metadata. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Path Parameters

- `vault_id: string`

- `credential_id: string`

### Body Parameters

- `auth: CredentialAuthRotateParam`

  Replacement values for the credential's existing authentication method.

  - `McpOauth object { type, access_token, expires_at, refresh }`

    Rotate an OAuth credential for an HTTPS MCP destination.

    - `type: "mcp_oauth"`

      The type of the object. Always `mcp_oauth`.

      - `"mcp_oauth"`

    - `access_token: optional string or null`

      A write-only replacement OAuth access token.

    - `expires_at: optional string or null`

      The replacement expiry as an RFC 3339 timestamp, or `null` to clear it. Omitting this field preserves the expiry unless a new access token is supplied, in which case the expiry is cleared.

    - `refresh: optional object { refresh_token, scope, token_endpoint_auth }  or null`

      Updates to an MCP credential's existing OAuth refresh configuration.

      - `refresh_token: optional string or null`

        The replacement refresh token. Omit or pass `null` to keep the stored token. This secret is never returned in resources.

      - `scope: optional string or null`

        Replacement space-separated OAuth scopes for refresh requests. Omit to keep the scopes, or pass `null` to stop sending a scope parameter.

      - `token_endpoint_auth: optional McpOauthTokenEndpointAuthRotateParam or null`

        Client-secret updates that preserve the credential's OAuth authentication method.

        - `ClientSecretBasic object { type, client_secret }`

          Updates credentials sent using HTTP Basic authentication.

          - `type: "client_secret_basic"`

            The type of the object. Always `client_secret_basic`.

            - `"client_secret_basic"`

          - `client_secret: optional string or null`

            The replacement OAuth client secret. Omit or pass `null` to keep the stored secret. This secret is never returned in resources.

        - `ClientSecretPost object { type, client_secret }`

          Updates credentials sent in the token request body.

          - `type: "client_secret_post"`

            The type of the object. Always `client_secret_post`.

            - `"client_secret_post"`

          - `client_secret: optional string or null`

            The replacement OAuth client secret. Omit or pass `null` to keep the stored secret. This secret is never returned in resources.

  - `StaticBearer object { token, type }`

    Replace the bearer token for the credential's MCP server.

    - `token: string`

      The replacement bearer token. This secret is never returned in credential resources.

    - `type: "static_bearer"`

      The type of the object. Always `static_bearer`.

      - `"static_bearer"`

### Returns

- `Credential object { id, auth, created_at, 4 more }`

  Metadata for a stored MCP server credential. Secret values are never returned.

  - `id: string`

    The ID of the credential.

  - `auth: CredentialAuth`

    The authentication method and non-secret configuration for the MCP server.

    - `McpOauth object { expires_at, mcp_server_url, refresh, type }`

      Public metadata for an OAuth credential; tokens and client secrets are never returned.

      - `expires_at: string or null`

        When the OAuth access token expires, as an RFC 3339 timestamp, if known.

      - `mcp_server_url: string`

        The HTTPS MCP server URL authorized by this credential.

      - `refresh: object { client_id, resource, scope, 2 more }  or null`

        Configuration used to refresh an MCP OAuth access token, excluding secret values.

        - `client_id: string`

          The OAuth client ID used when requesting a new access token.

        - `resource: string or null`

          The resource URI sent to the OAuth token endpoint during refresh, if configured.

        - `scope: string or null`

          Space-separated OAuth scopes requested during refresh, if configured.

        - `token_endpoint: string`

          The HTTPS OAuth token endpoint used for refresh.

        - `token_endpoint_auth: McpOauthTokenEndpointAuth`

          How the OAuth client authenticates to the token endpoint, excluding its client secret.

          - `None object { type }`

            Sends the client ID without a client secret.

            - `type: "none"`

              The type of the object. Always `none`.

              - `"none"`

          - `ClientSecretBasic object { type }`

            Sends the client ID and secret using HTTP Basic authentication.

            - `type: "client_secret_basic"`

              The type of the object. Always `client_secret_basic`.

              - `"client_secret_basic"`

          - `ClientSecretPost object { type }`

            Sends the client ID and secret in the token request body.

            - `type: "client_secret_post"`

              The type of the object. Always `client_secret_post`.

              - `"client_secret_post"`

      - `type: "mcp_oauth"`

        The type of the object. Always `mcp_oauth`.

        - `"mcp_oauth"`

    - `StaticBearer object { mcp_server_url, type }`

      Metadata for a bearer-token credential, without automatic OAuth refresh.

      - `mcp_server_url: string`

        The HTTPS MCP server URL authorized by this credential.

      - `type: "static_bearer"`

        The type of the object. Always `static_bearer`.

        - `"static_bearer"`

  - `created_at: number`

    The Unix timestamp, in seconds, when the credential was created.

  - `name: string`

    The human-readable name of the credential.

  - `object: "vault.credential"`

    The object type. Always `vault.credential`.

    - `"vault.credential"`

  - `updated_at: number`

    The Unix timestamp, in seconds, when the credential was last updated.

  - `vault_id: string`

    The ID of the vault containing this credential.

### Example

```http
curl https://api.openai.com/v1/vaults/$VAULT_ID/credentials/$CREDENTIAL_ID \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "auth": {
            "type": "mcp_oauth"
          }
        }'
```

#### Response

```json
{
  "id": "id",
  "auth": {
    "expires_at": "expires_at",
    "mcp_server_url": "mcp_server_url",
    "refresh": {
      "client_id": "client_id",
      "resource": "resource",
      "scope": "scope",
      "token_endpoint": "token_endpoint",
      "token_endpoint_auth": {
        "type": "none"
      }
    },
    "type": "mcp_oauth"
  },
  "created_at": 0,
  "name": "name",
  "object": "vault.credential",
  "updated_at": 0,
  "vault_id": "vault_id"
}
```

## Domain Types

### Credential

- `Credential object { id, auth, created_at, 4 more }`

  Metadata for a stored MCP server credential. Secret values are never returned.

  - `id: string`

    The ID of the credential.

  - `auth: CredentialAuth`

    The authentication method and non-secret configuration for the MCP server.

    - `McpOauth object { expires_at, mcp_server_url, refresh, type }`

      Public metadata for an OAuth credential; tokens and client secrets are never returned.

      - `expires_at: string or null`

        When the OAuth access token expires, as an RFC 3339 timestamp, if known.

      - `mcp_server_url: string`

        The HTTPS MCP server URL authorized by this credential.

      - `refresh: object { client_id, resource, scope, 2 more }  or null`

        Configuration used to refresh an MCP OAuth access token, excluding secret values.

        - `client_id: string`

          The OAuth client ID used when requesting a new access token.

        - `resource: string or null`

          The resource URI sent to the OAuth token endpoint during refresh, if configured.

        - `scope: string or null`

          Space-separated OAuth scopes requested during refresh, if configured.

        - `token_endpoint: string`

          The HTTPS OAuth token endpoint used for refresh.

        - `token_endpoint_auth: McpOauthTokenEndpointAuth`

          How the OAuth client authenticates to the token endpoint, excluding its client secret.

          - `None object { type }`

            Sends the client ID without a client secret.

            - `type: "none"`

              The type of the object. Always `none`.

              - `"none"`

          - `ClientSecretBasic object { type }`

            Sends the client ID and secret using HTTP Basic authentication.

            - `type: "client_secret_basic"`

              The type of the object. Always `client_secret_basic`.

              - `"client_secret_basic"`

          - `ClientSecretPost object { type }`

            Sends the client ID and secret in the token request body.

            - `type: "client_secret_post"`

              The type of the object. Always `client_secret_post`.

              - `"client_secret_post"`

      - `type: "mcp_oauth"`

        The type of the object. Always `mcp_oauth`.

        - `"mcp_oauth"`

    - `StaticBearer object { mcp_server_url, type }`

      Metadata for a bearer-token credential, without automatic OAuth refresh.

      - `mcp_server_url: string`

        The HTTPS MCP server URL authorized by this credential.

      - `type: "static_bearer"`

        The type of the object. Always `static_bearer`.

        - `"static_bearer"`

  - `created_at: number`

    The Unix timestamp, in seconds, when the credential was created.

  - `name: string`

    The human-readable name of the credential.

  - `object: "vault.credential"`

    The object type. Always `vault.credential`.

    - `"vault.credential"`

  - `updated_at: number`

    The Unix timestamp, in seconds, when the credential was last updated.

  - `vault_id: string`

    The ID of the vault containing this credential.

### Credential Auth

- `CredentialAuth = object { expires_at, mcp_server_url, refresh, type }  or object { mcp_server_url, type }`

  The MCP server and authentication configuration of a vault credential, excluding secrets.

  - `McpOauth object { expires_at, mcp_server_url, refresh, type }`

    Public metadata for an OAuth credential; tokens and client secrets are never returned.

    - `expires_at: string or null`

      When the OAuth access token expires, as an RFC 3339 timestamp, if known.

    - `mcp_server_url: string`

      The HTTPS MCP server URL authorized by this credential.

    - `refresh: object { client_id, resource, scope, 2 more }  or null`

      Configuration used to refresh an MCP OAuth access token, excluding secret values.

      - `client_id: string`

        The OAuth client ID used when requesting a new access token.

      - `resource: string or null`

        The resource URI sent to the OAuth token endpoint during refresh, if configured.

      - `scope: string or null`

        Space-separated OAuth scopes requested during refresh, if configured.

      - `token_endpoint: string`

        The HTTPS OAuth token endpoint used for refresh.

      - `token_endpoint_auth: McpOauthTokenEndpointAuth`

        How the OAuth client authenticates to the token endpoint, excluding its client secret.

        - `None object { type }`

          Sends the client ID without a client secret.

          - `type: "none"`

            The type of the object. Always `none`.

            - `"none"`

        - `ClientSecretBasic object { type }`

          Sends the client ID and secret using HTTP Basic authentication.

          - `type: "client_secret_basic"`

            The type of the object. Always `client_secret_basic`.

            - `"client_secret_basic"`

        - `ClientSecretPost object { type }`

          Sends the client ID and secret in the token request body.

          - `type: "client_secret_post"`

            The type of the object. Always `client_secret_post`.

            - `"client_secret_post"`

    - `type: "mcp_oauth"`

      The type of the object. Always `mcp_oauth`.

      - `"mcp_oauth"`

  - `StaticBearer object { mcp_server_url, type }`

    Metadata for a bearer-token credential, without automatic OAuth refresh.

    - `mcp_server_url: string`

      The HTTPS MCP server URL authorized by this credential.

    - `type: "static_bearer"`

      The type of the object. Always `static_bearer`.

      - `"static_bearer"`

### Credential Auth Create Param

- `CredentialAuthCreateParam = object { access_token, mcp_server_url, type, 2 more }  or object { token, mcp_server_url, type }`

  Authentication credentials for an MCP server used by agent tools.

  - `McpOauth object { access_token, mcp_server_url, type, 2 more }`

    An OAuth credential for an HTTPS MCP destination.

    - `access_token: string`

      A write-only OAuth access token; never returned by credential resources.

    - `mcp_server_url: string`

      The HTTPS MCP server URL authorized by this credential.

    - `type: "mcp_oauth"`

      The type of the object. Always `mcp_oauth`.

      - `"mcp_oauth"`

    - `expires_at: optional string or null`

      When the OAuth access token expires, as an RFC 3339 timestamp, if known.

    - `refresh: optional object { client_id, refresh_token, token_endpoint, 3 more }  or null`

      Configuration for refreshing the access token of an MCP OAuth credential.

      - `client_id: string`

        The OAuth client ID used when requesting a new access token.

      - `refresh_token: string`

        The refresh token to store. This secret is never returned in credential resources.

      - `token_endpoint: string`

        The HTTPS OAuth token endpoint used to exchange the refresh token for a new access token.

      - `token_endpoint_auth: McpOauthTokenEndpointAuthCreateParam`

        How the OAuth client authenticates to the token endpoint.

        - `None object { type }`

          Sends the client ID without a client secret.

          - `type: "none"`

            The type of the object. Always `none`.

            - `"none"`

        - `ClientSecretBasic object { client_secret, type }`

          Sends the client ID and secret using HTTP Basic authentication.

          - `client_secret: string`

            The OAuth client secret to store. Never returned in credential resources.

          - `type: "client_secret_basic"`

            The type of the object. Always `client_secret_basic`.

            - `"client_secret_basic"`

        - `ClientSecretPost object { client_secret, type }`

          Sends the client ID and secret in the token request body.

          - `client_secret: string`

            The OAuth client secret to store. Never returned in credential resources.

          - `type: "client_secret_post"`

            The type of the object. Always `client_secret_post`.

            - `"client_secret_post"`

      - `resource: optional string or null`

        The resource URI to send to the OAuth token endpoint during refresh, if required.

      - `scope: optional string or null`

        Space-separated OAuth scopes to request during refresh, if required.

  - `StaticBearer object { token, mcp_server_url, type }`

    A bearer token for an MCP server, without automatic OAuth refresh.

    - `token: string`

      The bearer token to store. This secret is never returned in credential resources.

    - `mcp_server_url: string`

      The HTTPS MCP server URL authorized by this credential.

    - `type: "static_bearer"`

      The type of the object. Always `static_bearer`.

      - `"static_bearer"`

### Credential Auth Rotate Param

- `CredentialAuthRotateParam = object { type, access_token, expires_at, refresh }  or object { token, type }`

  Updates to a vault credential without changing its authentication method or MCP server.

  - `McpOauth object { type, access_token, expires_at, refresh }`

    Rotate an OAuth credential for an HTTPS MCP destination.

    - `type: "mcp_oauth"`

      The type of the object. Always `mcp_oauth`.

      - `"mcp_oauth"`

    - `access_token: optional string or null`

      A write-only replacement OAuth access token.

    - `expires_at: optional string or null`

      The replacement expiry as an RFC 3339 timestamp, or `null` to clear it. Omitting this field preserves the expiry unless a new access token is supplied, in which case the expiry is cleared.

    - `refresh: optional object { refresh_token, scope, token_endpoint_auth }  or null`

      Updates to an MCP credential's existing OAuth refresh configuration.

      - `refresh_token: optional string or null`

        The replacement refresh token. Omit or pass `null` to keep the stored token. This secret is never returned in resources.

      - `scope: optional string or null`

        Replacement space-separated OAuth scopes for refresh requests. Omit to keep the scopes, or pass `null` to stop sending a scope parameter.

      - `token_endpoint_auth: optional McpOauthTokenEndpointAuthRotateParam or null`

        Client-secret updates that preserve the credential's OAuth authentication method.

        - `ClientSecretBasic object { type, client_secret }`

          Updates credentials sent using HTTP Basic authentication.

          - `type: "client_secret_basic"`

            The type of the object. Always `client_secret_basic`.

            - `"client_secret_basic"`

          - `client_secret: optional string or null`

            The replacement OAuth client secret. Omit or pass `null` to keep the stored secret. This secret is never returned in resources.

        - `ClientSecretPost object { type, client_secret }`

          Updates credentials sent in the token request body.

          - `type: "client_secret_post"`

            The type of the object. Always `client_secret_post`.

            - `"client_secret_post"`

          - `client_secret: optional string or null`

            The replacement OAuth client secret. Omit or pass `null` to keep the stored secret. This secret is never returned in resources.

  - `StaticBearer object { token, type }`

    Replace the bearer token for the credential's MCP server.

    - `token: string`

      The replacement bearer token. This secret is never returned in credential resources.

    - `type: "static_bearer"`

      The type of the object. Always `static_bearer`.

      - `"static_bearer"`

### Credential Deleted

- `CredentialDeleted object { id, deleted, object }`

  Confirmation that a vault credential was deleted.

  - `id: string`

    The ID of the deleted credential.

  - `deleted: boolean`

    Whether the resource was deleted. Always `true`.

  - `object: "vault.credential.deleted"`

    The object type. Always `vault.credential.deleted`.

    - `"vault.credential.deleted"`

### Mcp OAuth Token Endpoint Auth

- `McpOauthTokenEndpointAuth = object { type }  or object { type }  or object { type }`

  The client authentication method used for OAuth token refresh.

  - `None object { type }`

    Sends the client ID without a client secret.

    - `type: "none"`

      The type of the object. Always `none`.

      - `"none"`

  - `ClientSecretBasic object { type }`

    Sends the client ID and secret using HTTP Basic authentication.

    - `type: "client_secret_basic"`

      The type of the object. Always `client_secret_basic`.

      - `"client_secret_basic"`

  - `ClientSecretPost object { type }`

    Sends the client ID and secret in the token request body.

    - `type: "client_secret_post"`

      The type of the object. Always `client_secret_post`.

      - `"client_secret_post"`

### Mcp OAuth Token Endpoint Auth Create Param

- `McpOauthTokenEndpointAuthCreateParam = object { type }  or object { client_secret, type }  or object { client_secret, type }`

  Client authentication credentials for OAuth token refresh.

  - `None object { type }`

    Sends the client ID without a client secret.

    - `type: "none"`

      The type of the object. Always `none`.

      - `"none"`

  - `ClientSecretBasic object { client_secret, type }`

    Sends the client ID and secret using HTTP Basic authentication.

    - `client_secret: string`

      The OAuth client secret to store. Never returned in credential resources.

    - `type: "client_secret_basic"`

      The type of the object. Always `client_secret_basic`.

      - `"client_secret_basic"`

  - `ClientSecretPost object { client_secret, type }`

    Sends the client ID and secret in the token request body.

    - `client_secret: string`

      The OAuth client secret to store. Never returned in credential resources.

    - `type: "client_secret_post"`

      The type of the object. Always `client_secret_post`.

      - `"client_secret_post"`

### Mcp OAuth Token Endpoint Auth Rotate Param

- `McpOauthTokenEndpointAuthRotateParam = object { type, client_secret }  or object { type, client_secret }`

  Client-secret updates that preserve the credential's OAuth authentication method.

  - `ClientSecretBasic object { type, client_secret }`

    Updates credentials sent using HTTP Basic authentication.

    - `type: "client_secret_basic"`

      The type of the object. Always `client_secret_basic`.

      - `"client_secret_basic"`

    - `client_secret: optional string or null`

      The replacement OAuth client secret. Omit or pass `null` to keep the stored secret. This secret is never returned in resources.

  - `ClientSecretPost object { type, client_secret }`

    Updates credentials sent in the token request body.

    - `type: "client_secret_post"`

      The type of the object. Always `client_secret_post`.

      - `"client_secret_post"`

    - `client_secret: optional string or null`

      The replacement OAuth client secret. Omit or pass `null` to keep the stored secret. This secret is never returned in resources.
