## Update project API key

**post** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Updates the scopes and/or expiration of an existing API key in the project, including a
service-account-owned key. Requires permission to write project API keys.

Provide at least one of `scopes` or `expires_in_seconds`. Omitted fields stay
unchanged; neither field accepts `null`. Both changes are saved together.

`scopes` replaces the key's scope restrictions using the same scope identifiers
as the dashboard. An empty array means All permissions, subject to the owner's
effective access; it does not mean no access. Use `["api.all.read"]` for read-only
access or specific scopes such as `["api.files.read"]` for restricted access.
This does not change user or service-account roles or grant admin permissions.
Scope changes follow the same authentication-cache propagation as dashboard edits.

Provide `expires_in_seconds` to set the expiration relative to this request.
The value must satisfy the organization's and project's expiry policies.
Expired keys cannot be updated. Retrying resets the expiration relative to
the new request. The response contains only the redacted key, not its secret.

### Path Parameters

- `project_id: string`

- `api_key_id: string`

### Body Parameters

- `expires_in_seconds: optional number`

  Number of seconds from this request until the API key expires. Must comply with the organization and project expiry policies. Expired keys cannot be updated. Retrying resets the expiry relative to the new request. Omit to keep the current expiration.

  `minimum: 1`, `maximum: 31536000`

- `scopes: optional array of string`

  Replace the API key scope restrictions. Omit to leave scopes unchanged. An empty array removes key restrictions (All permissions), subject to the owner's effective permissions. Use ["api.all.read"] for read-only access. Scopes do not change the owner's roles or grant administrative permissions.

### Returns

- `ProjectAPIKey object { id, created_at, last_used_at, 6 more }`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

    `format: unixtime`

  - `last_used_at: number or null`

    The Unix timestamp (in seconds) of when the API key was last used.

    `format: unixtime`

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: object { service_account, type, user }`

    - `service_account: optional object { id, created_at, name, role }`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

        `format: unixtime`

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type: optional "user" or "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: optional object { id, created_at, email, 2 more }`

      The user that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the user was created.

        `format: unixtime`

      - `email: string`

        The email address of the user.

      - `name: string`

        The name of the user.

      - `role: string`

        The user's project role.

  - `owner_project_access: "active" or "inactive"`

    Whether the API key's owner currently has effective access to the project.

    - `"active"`

    - `"inactive"`

  - `redacted_value: string`

    The redacted value of the API key

  - `expires_at: optional number or null`

    The Unix timestamp (in seconds) when the API key expires, or null if it does not expire.

    `format: unixtime`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys/$API_KEY_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "scopes": [
            "api.all.read"
          ]
        }'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "last_used_at": 0,
  "name": "name",
  "object": "organization.project.api_key",
  "owner": {
    "service_account": {
      "id": "id",
      "created_at": 0,
      "name": "name",
      "role": "role"
    },
    "type": "user",
    "user": {
      "id": "id",
      "created_at": 0,
      "email": "email",
      "name": "name",
      "role": "role"
    }
  },
  "owner_project_access": "active",
  "redacted_value": "redacted_value",
  "expires_at": 0
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"scopes": ["api.all.read"], "expires_in_seconds": 86400}'
```

#### Response

```json
{
    "object": "organization.project.api_key",
    "redacted_value": "sk-abc...def",
    "name": "My API Key",
    "created_at": 1711471533,
    "expires_at": 1711557933,
    "last_used_at": null,
    "id": "key_abc",
    "owner_project_access": "active",
    "owner": {
        "type": "service_account",
        "service_account": {
            "id": "svc_acct_abc",
            "name": "My Service Account",
            "role": "member",
            "created_at": 1711471533
        }
    }
}
```
