# API Keys

## Delete project API key

**delete** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Deletes an API key from the project, including keys owned by service accounts.

Requires permission to write project API keys. Deleting a service-account key
does not delete the service account or its other keys.

Returns confirmation of the key deletion.

### Path Parameters

- `project_id: string`

  The ID of the project.

- `api_key_id: string`

  The ID of the API key.

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.api_key.deleted"`

  - `"organization.project.api_key.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys/$API_KEY_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### 200 — Example

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.api_key.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response example

```json
{
    "object": "organization.project.api_key.deleted",
    "id": "key_abc",
    "deleted": true
}
```

## List project API keys

**get** `/organization/projects/{project_id}/api_keys`

Returns a list of API keys in the project.

### Path Parameters

- `project_id: string`

  The ID of the project.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional integer (default: 20)`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `owner_project_access: optional "active" or "inactive" or "any"`

  Filter API keys by whether the owner currently has effective access to the project. Use `active` for owners with access, `inactive` for owners without access, or `any` for all enabled project API keys. If omitted, the endpoint applies its existing membership-based visibility rules, which may exclude some enabled keys.

  - `"active"`

  - `"inactive"`

  - `"any"`

### Returns

- `data: array of ProjectAPIKey`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: integer`

    The Unix timestamp (in seconds) of when the API key was created

    `format: unixtime`

  - `last_used_at: integer or null`

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

      - `created_at: integer`

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

      - `created_at: integer`

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

  - `expires_at: optional integer or null`

    The Unix timestamp (in seconds) when the API key expires, or null if it does not expire.

    `format: unixtime`

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string or null`

- `last_id: optional string or null`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### 200 — Example

```json
{
  "data": [
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
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/api_keys?after=key_abc&limit=20&owner_project_access=any \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response example

```json
{
    "object": "list",
    "data": [
        {
            "object": "organization.project.api_key",
            "redacted_value": "sk-abc...def",
            "name": "My API Key",
            "created_at": 1711471533,
            "last_used_at": 1711471534,
            "id": "key_abc",
            "owner_project_access": "active",
            "owner": {
                "type": "user",
                "user": {
                    "id": "user_abc",
                    "name": "First Last",
                    "email": "user@example.com",
                    "role": "owner",
                    "created_at": 1711471533
                }
            }
        }
    ],
    "first_id": "key_abc",
    "last_id": "key_xyz",
    "has_more": false
}
```

## Retrieve project API key

**get** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Retrieves an API key in the project.

### Path Parameters

- `project_id: string`

  The ID of the project.

- `api_key_id: string`

  The ID of the API key.

### Returns

- `ProjectAPIKey object { id, created_at, last_used_at, 6 more }`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: integer`

    The Unix timestamp (in seconds) of when the API key was created

    `format: unixtime`

  - `last_used_at: integer or null`

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

      - `created_at: integer`

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

      - `created_at: integer`

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

  - `expires_at: optional integer or null`

    The Unix timestamp (in seconds) when the API key expires, or null if it does not expire.

    `format: unixtime`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys/$API_KEY_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### 200 — Example

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
curl https://api.openai.com/v1/organization/projects/proj_abc/api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response example

```json
{
    "object": "organization.project.api_key",
    "redacted_value": "sk-abc...def",
    "name": "My API Key",
    "created_at": 1711471533,
    "last_used_at": 1711471534,
    "id": "key_abc",
    "owner_project_access": "active",
    "owner": {
        "type": "user",
        "user": {
            "id": "user_abc",
            "name": "First Last",
            "email": "user@example.com",
            "role": "owner",
            "created_at": 1711471533
        }
    }
}
```

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

  The ID of the project.

- `api_key_id: string`

  The ID of the API key.

### Body Parameters

Content type: `application/json`

- `expires_in_seconds: optional integer`

  Number of seconds from this request until the API key expires. Must comply with the organization and project expiry policies. Expired keys cannot be updated. Retrying resets the expiry relative to the new request. Omit to keep the current expiration.

  `minimum: 1`, `maximum: 31536000`

- `scopes: optional array of string`

  Replace the API key scope restrictions. Omit to leave scopes unchanged. An empty array removes key restrictions (All permissions), subject to the owner's effective permissions. Use ["api.all.read"] for read-only access. Scopes do not change the owner's roles or grant administrative permissions.

### Returns

- `ProjectAPIKey object { id, created_at, last_used_at, 6 more }`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: integer`

    The Unix timestamp (in seconds) of when the API key was created

    `format: unixtime`

  - `last_used_at: integer or null`

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

      - `created_at: integer`

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

      - `created_at: integer`

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

  - `expires_at: optional integer or null`

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

#### 200 — Example

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

#### Response example

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

## Domain Types

### API Key Delete Response

- `APIKeyDeleteResponse object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.api_key.deleted"`

    - `"organization.project.api_key.deleted"`

### Project API Key

- `ProjectAPIKey object { id, created_at, last_used_at, 6 more }`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: integer`

    The Unix timestamp (in seconds) of when the API key was created

    `format: unixtime`

  - `last_used_at: integer or null`

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

      - `created_at: integer`

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

      - `created_at: integer`

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

  - `expires_at: optional integer or null`

    The Unix timestamp (in seconds) when the API key expires, or null if it does not expire.

    `format: unixtime`
