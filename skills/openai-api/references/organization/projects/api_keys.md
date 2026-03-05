# API Keys

## List

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

- `data: array of ProjectAPIEy`

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

    - `service_account: optional ProjectServiceAccount`

      Represents an individual service account in a project.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created

      - `name: string`

        The name of the service account

      - `object: "organization.project.service_account"`

        The object type, which is always `organization.project.service_account`

        - `"organization.project.service_account"`

      - `role: "owner" or "member"`

        `owner` or `member`

        - `"owner"`

        - `"member"`

    - `type: optional "user" or "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: optional ProjectUser`

      Represents an individual user in a project.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `added_at: number`

        The Unix timestamp (in seconds) of when the project was added.

      - `email: string`

        The email address of the user

      - `name: string`

        The name of the user

      - `object: "organization.project.user"`

        The object type, which is always `organization.project.user`

        - `"organization.project.user"`

      - `role: "owner" or "member"`

        `owner` or `member`

        - `"owner"`

        - `"member"`

  - `redacted_value: string`

    The redacted value of the API key

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Retrieve

**get** `/organization/projects/{project_id}/api_keys/{key_id}`

Retrieves an API key in the project.

### Path Parameters

- `project_id: string`

- `key_id: string`

### Returns

- `ProjectAPIEy = object { id, created_at, last_used_at, 4 more }`

  Represents an individual API key in a project.

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

    - `service_account: optional ProjectServiceAccount`

      Represents an individual service account in a project.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created

      - `name: string`

        The name of the service account

      - `object: "organization.project.service_account"`

        The object type, which is always `organization.project.service_account`

        - `"organization.project.service_account"`

      - `role: "owner" or "member"`

        `owner` or `member`

        - `"owner"`

        - `"member"`

    - `type: optional "user" or "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: optional ProjectUser`

      Represents an individual user in a project.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `added_at: number`

        The Unix timestamp (in seconds) of when the project was added.

      - `email: string`

        The email address of the user

      - `name: string`

        The name of the user

      - `object: "organization.project.user"`

        The object type, which is always `organization.project.user`

        - `"organization.project.user"`

      - `role: "owner" or "member"`

        `owner` or `member`

        - `"owner"`

        - `"member"`

  - `redacted_value: string`

    The redacted value of the API key

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys/$KEY_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Delete

**delete** `/organization/projects/{project_id}/api_keys/{key_id}`

Deletes an API key from the project.

Returns confirmation of the key deletion, or an error if the key belonged to
a service account.

### Path Parameters

- `project_id: string`

- `key_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.api_key.deleted"`

  - `"organization.project.api_key.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys/$KEY_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Domain Types

### Project API Ey

- `ProjectAPIEy = object { id, created_at, last_used_at, 4 more }`

  Represents an individual API key in a project.

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

    - `service_account: optional ProjectServiceAccount`

      Represents an individual service account in a project.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created

      - `name: string`

        The name of the service account

      - `object: "organization.project.service_account"`

        The object type, which is always `organization.project.service_account`

        - `"organization.project.service_account"`

      - `role: "owner" or "member"`

        `owner` or `member`

        - `"owner"`

        - `"member"`

    - `type: optional "user" or "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: optional ProjectUser`

      Represents an individual user in a project.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `added_at: number`

        The Unix timestamp (in seconds) of when the project was added.

      - `email: string`

        The email address of the user

      - `name: string`

        The name of the user

      - `object: "organization.project.user"`

        The object type, which is always `organization.project.user`

        - `"organization.project.user"`

      - `role: "owner" or "member"`

        `owner` or `member`

        - `"owner"`

        - `"member"`

  - `redacted_value: string`

    The redacted value of the API key
