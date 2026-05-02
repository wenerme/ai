## List project API keys

**get** `/organization/projects/{project_id}/api_keys`

Returns a list of API keys in the project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of ProjectAPIKey`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number`

    The Unix timestamp (in seconds) of when the API key was last used.

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

      - `email: string`

        The email address of the user.

      - `name: string`

        The name of the user.

      - `role: string`

        The user's project role.

  - `redacted_value: string`

    The redacted value of the API key

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

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
      "redacted_value": "redacted_value"
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
curl https://api.openai.com/v1/organization/projects/proj_abc/api_keys?after=key_abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

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
