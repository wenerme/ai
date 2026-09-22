## Create a vault credential

**post** `/vaults/{vault_id}/credentials`

Creates a vault credential. Secret values are write-only and are never returned. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Path Parameters

- `vault_id: string`

### Body Parameters

- `auth: CredentialAuthCreateParam`

  The authentication method and write-only secret values to store.

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

      Optional refresh configuration for an HTTPS OAuth token endpoint.

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

  - `EnvironmentVariable object { networking, secret_name, secret_value, type }`

    An HTTP credential for OpenAI-hosted environments only. The sandbox receives an environment variable containing a placeholder, not the secret. Use the placeholder unchanged in outgoing requests. The egress proxy replaces the placeholder with the secret for allowed HTTPS destinations on ports 443 and 8443. Sandbox code cannot read the real secret or use it for local computation, such as signing a request.

    - `networking: CredentialNetworkingParam`

      The destinations where the proxy can substitute this secret. The environment network policy must also allow them.

      - `Unrestricted object { type }`

        Allows substitution for destinations permitted by the environment network policy. Requires `environment.network.access` to be `restricted`, with explicit `allowed_domains`.

        - `type: "unrestricted"`

          The type of the object. Always `unrestricted`.

          - `"unrestricted"`

      - `Limited object { allowed_hosts, type }`

        Allows substitution only for the listed hosts. The environment network policy must also allow these hosts.

        - `allowed_hosts: array of string`

          The 1 to 16 distinct allowed hostnames or IPv4 addresses, normalized to lowercase. Entries contain no scheme, path, port, or wildcard. IPv6 addresses are not supported.

        - `type: "limited"`

          The type of the object. Always `limited`.

          - `"limited"`

    - `secret_name: string`

      The environment variable name that receives the placeholder, such as `SERVICE_API_KEY`. Use ASCII letters, digits, and underscores, starting with a letter or underscore. Names starting with `CODEX_` and managed proxy or certificate variable names are reserved.

    - `secret_value: string`

      The write-only secret to store. Never returned in credential resources or supplied directly to sandbox code. Must be nonempty and must not contain carriage returns, newlines, or NUL bytes.

    - `type: "environment_variable"`

      The type of the object. Always `environment_variable`.

      - `"environment_variable"`

- `name: string`

  The name is trimmed before storage. It must contain 1 to 256 UTF-8 bytes after trimming.

### Returns

- `Credential object { id, auth, created_at, 4 more }`

  Metadata for a stored credential. Secret values are never returned.

  - `id: string`

    The ID of the credential.

  - `auth: CredentialAuth`

    The authentication method and non-secret configuration of the credential.

    - `McpOauth object { expires_at, mcp_server_url, refresh, type }`

      Public metadata for an OAuth credential; tokens and client secrets are never returned.

      - `expires_at: string or null`

        When the OAuth access token expires, as an RFC 3339 timestamp, if known.

      - `mcp_server_url: string`

        The HTTPS MCP server URL authorized by this credential.

      - `refresh: object { client_id, resource, scope, 2 more }  or null`

        Public refresh metadata without refresh tokens or OAuth client secrets.

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

    - `EnvironmentVariable object { networking, secret_name, type }`

      Metadata for an HTTP credential used only in OpenAI-hosted environments. Sandbox code receives a placeholder. The proxy substitutes the secret for allowed HTTPS destinations on ports 443 and 8443. The real secret is not available to sandbox code for local computation and is never returned in this resource.

      - `networking: CredentialNetworking`

        The destinations where the proxy can substitute the secret, subject to the environment network policy.

        - `Unrestricted object { type }`

          Allows substitution for destinations permitted by the environment network policy. Requires `environment.network.access` to be `restricted`, with explicit `allowed_domains`.

          - `type: "unrestricted"`

            The type of the object. Always `unrestricted`.

            - `"unrestricted"`

        - `Limited object { allowed_hosts, type }`

          Allows substitution only for the listed hosts. The environment network policy must also allow these hosts.

          - `allowed_hosts: array of string`

            The 1 to 16 distinct allowed hostnames or IPv4 addresses, normalized to lowercase. Entries contain no scheme, path, port, or wildcard. IPv6 addresses are not supported.

          - `type: "limited"`

            The type of the object. Always `limited`.

            - `"limited"`

      - `secret_name: string`

        The environment variable name that receives the placeholder in the sandbox.

      - `type: "environment_variable"`

        The type of the object. Always `environment_variable`.

        - `"environment_variable"`

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
