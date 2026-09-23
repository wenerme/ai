## Update a vault credential

**post** `/vaults/{vault_id}/credentials/{credential_id}`

Updates credential metadata or rotates its write-only secret. See [vaults](/api/docs/guides/agents-api/tools/vaults).

### Path Parameters

- `vault_id: string`

- `credential_id: string`

### Body Parameters

- `auth: optional CredentialAuthRotateParam`

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

      Optional write-only refresh-token and client-secret updates.

      - `refresh_token: optional string or null`

        The replacement refresh token. Omit or pass `null` to keep the stored token. This secret is never returned in resources.

      - `scope: optional string or null`

        Replacement space-separated OAuth scopes for refresh requests. Omit to keep the scopes, or pass `null` to stop sending a scope parameter.

      - `token_endpoint_auth: optional McpOauthTokenEndpointAuthRotateParam or null`

        Client-secret updates for the existing token endpoint authentication method.

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

  - `EnvironmentVariable object { secret_value, type }`

    Replace the secret for an OpenAI-hosted environment credential. The environment variable name and networking configuration remain unchanged.

    - `secret_value: string`

      The write-only replacement secret. Never returned in credential resources or supplied directly to sandbox code. Must be nonempty and must not contain carriage returns, newlines, or NUL bytes.

    - `type: "environment_variable"`

      The type of the object. Always `environment_variable`.

      - `"environment_variable"`

- `metadata: optional map[string]`

  Replaces all metadata. Omit to preserve it, or pass {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.

### Returns

- `Credential object { id, auth, created_at, 5 more }`

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

  - `metadata: map[string]`

    Application-defined key-value pairs associated with this credential.

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
    -X POST \
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
  "metadata": {
    "foo": "string"
  },
  "name": "name",
  "object": "vault.credential",
  "updated_at": 0,
  "vault_id": "vault_id"
}
```
