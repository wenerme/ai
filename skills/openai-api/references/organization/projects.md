# Projects

## List

**get** `/organization/projects`

Returns a list of projects.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `include_archived: optional boolean`

  If `true` returns all projects including those that have been `archived`. Archived projects are not included by default.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of Project`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: string`

    The name of the project. This appears in reporting.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: "active" or "archived"`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/projects \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create

**post** `/organization/projects`

Create a new project in the organization. Projects can be created and archived, but cannot be deleted.

### Body Parameters

- `name: string`

  The friendly name of the project, this name appears in reports.

- `geography: optional "US" or "EU" or "JP" or 5 more`

  Create the project with the specified data residency region. Your organization must have access to Data residency functionality in order to use. See [data residency controls](/docs/guides/your-data#data-residency-controls) to review the functionality and limitations of setting this field.

  - `"US"`

  - `"EU"`

  - `"JP"`

  - `"IN"`

  - `"KR"`

  - `"CA"`

  - `"AU"`

  - `"SG"`

### Returns

- `Project = object { id, created_at, name, 3 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: string`

    The name of the project. This appears in reporting.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: "active" or "archived"`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```http
curl https://api.openai.com/v1/organization/projects \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "name"
        }'
```

## Retrieve

**get** `/organization/projects/{project_id}`

Retrieves a project.

### Path Parameters

- `project_id: string`

### Returns

- `Project = object { id, created_at, name, 3 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: string`

    The name of the project. This appears in reporting.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: "active" or "archived"`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Update

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Path Parameters

- `project_id: string`

### Body Parameters

- `name: string`

  The updated name of the project, this name appears in reports.

### Returns

- `Project = object { id, created_at, name, 3 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: string`

    The name of the project. This appears in reporting.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: "active" or "archived"`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "name"
        }'
```

## Archive

**post** `/organization/projects/{project_id}/archive`

Archives a project in the organization. Archived projects cannot be used or updated.

### Path Parameters

- `project_id: string`

### Returns

- `Project = object { id, created_at, name, 3 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: string`

    The name of the project. This appears in reporting.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: "active" or "archived"`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/archive \
    -X POST \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Domain Types

### Project

- `Project = object { id, created_at, name, 3 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: string`

    The name of the project. This appears in reporting.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: "active" or "archived"`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

# Users

## List

**get** `/organization/projects/{project_id}/users`

Returns a list of users in the project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of ProjectUser`

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

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create

**post** `/organization/projects/{project_id}/users`

Adds a user to the project. Users must already be members of the organization to be added to a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `role: "owner" or "member"`

  `owner` or `member`

  - `"owner"`

  - `"member"`

- `user_id: string`

  The ID of the user.

### Returns

- `ProjectUser = object { id, added_at, email, 3 more }`

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

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "role": "owner",
          "user_id": "user_id"
        }'
```

## Retrieve

**get** `/organization/projects/{project_id}/users/{user_id}`

Retrieves a user in the project.

### Path Parameters

- `project_id: string`

- `user_id: string`

### Returns

- `ProjectUser = object { id, added_at, email, 3 more }`

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

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Update

**post** `/organization/projects/{project_id}/users/{user_id}`

Modifies a user's role in the project.

### Path Parameters

- `project_id: string`

- `user_id: string`

### Body Parameters

- `role: "owner" or "member"`

  `owner` or `member`

  - `"owner"`

  - `"member"`

### Returns

- `ProjectUser = object { id, added_at, email, 3 more }`

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

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "role": "owner"
        }'
```

## Delete

**delete** `/organization/projects/{project_id}/users/{user_id}`

Deletes a user from the project.

Returns confirmation of project user deletion, or an error if the project is
archived (archived projects have no users).

### Path Parameters

- `project_id: string`

- `user_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.user.deleted"`

  - `"organization.project.user.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Domain Types

### Project User

- `ProjectUser = object { id, added_at, email, 3 more }`

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

# Service Accounts

## List

**get** `/organization/projects/{project_id}/service_accounts`

Returns a list of service accounts in the project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of ProjectServiceAccount`

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

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create

**post** `/organization/projects/{project_id}/service_accounts`

Creates a new service account in the project. This also returns an unredacted API key for the service account.

### Path Parameters

- `project_id: string`

### Body Parameters

- `name: string`

  The name of the service account being created.

### Returns

- `id: string`

- `api_key: object { id, created_at, name, 2 more }`

  - `id: string`

  - `created_at: number`

  - `name: string`

  - `object: "organization.project.service_account.api_key"`

    The object type, which is always `organization.project.service_account.api_key`

    - `"organization.project.service_account.api_key"`

  - `value: string`

- `created_at: number`

- `name: string`

- `object: "organization.project.service_account"`

  - `"organization.project.service_account"`

- `role: "member"`

  Service accounts can only have one role of type `member`

  - `"member"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "name"
        }'
```

## Retrieve

**get** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Retrieves a service account in the project.

### Path Parameters

- `project_id: string`

- `service_account_id: string`

### Returns

- `ProjectServiceAccount = object { id, created_at, name, 2 more }`

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

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Delete

**delete** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Deletes a service account from the project.

Returns confirmation of service account deletion, or an error if the project
is archived (archived projects have no service accounts).

### Path Parameters

- `project_id: string`

- `service_account_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.service_account.deleted"`

  - `"organization.project.service_account.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Domain Types

### Project Service Account

- `ProjectServiceAccount = object { id, created_at, name, 2 more }`

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

# Rate Limits

## List Rate Limits

**get** `/organization/projects/{project_id}/rate_limits`

Returns the rate limits per model for a project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: optional string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, beginning with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. The default is 100.

### Returns

- `data: array of object { id, max_requests_per_1_minute, max_tokens_per_1_minute, 6 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: number`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: number`

    The maximum tokens per minute.

  - `model: string`

    The model this rate limit applies to.

  - `object: "project.rate_limit"`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: optional number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: optional number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: optional number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: optional number`

    The maximum requests per day. Only present for relevant models.

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/rate_limits \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Update Rate Limit

**post** `/organization/projects/{project_id}/rate_limits/{rate_limit_id}`

Updates a project rate limit.

### Path Parameters

- `project_id: string`

- `rate_limit_id: string`

### Body Parameters

- `batch_1_day_max_input_tokens: optional number`

  The maximum batch input tokens per day. Only relevant for certain models.

- `max_audio_megabytes_per_1_minute: optional number`

  The maximum audio megabytes per minute. Only relevant for certain models.

- `max_images_per_1_minute: optional number`

  The maximum images per minute. Only relevant for certain models.

- `max_requests_per_1_day: optional number`

  The maximum requests per day. Only relevant for certain models.

- `max_requests_per_1_minute: optional number`

  The maximum requests per minute.

- `max_tokens_per_1_minute: optional number`

  The maximum tokens per minute.

### Returns

- `id: string`

  The identifier, which can be referenced in API endpoints.

- `max_requests_per_1_minute: number`

  The maximum requests per minute.

- `max_tokens_per_1_minute: number`

  The maximum tokens per minute.

- `model: string`

  The model this rate limit applies to.

- `object: "project.rate_limit"`

  The object type, which is always `project.rate_limit`

  - `"project.rate_limit"`

- `batch_1_day_max_input_tokens: optional number`

  The maximum batch input tokens per day. Only present for relevant models.

- `max_audio_megabytes_per_1_minute: optional number`

  The maximum audio megabytes per minute. Only present for relevant models.

- `max_images_per_1_minute: optional number`

  The maximum images per minute. Only present for relevant models.

- `max_requests_per_1_day: optional number`

  The maximum requests per day. Only present for relevant models.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/rate_limits/$RATE_LIMIT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{}'
```

# Groups

## List

**get** `/organization/projects/{project_id}/groups`

Lists the groups that have access to a project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the ID of the last group from the previous response to fetch the next page.

- `limit: optional number`

  A limit on the number of project groups to return. Defaults to 20.

- `order: optional "asc" or "desc"`

  Sort order for the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { created_at, group_id, group_name, 2 more }`

  Project group memberships returned in the current page.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

- `has_more: boolean`

  Whether additional project group memberships are available.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no more results.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/groups \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create

**post** `/organization/projects/{project_id}/groups`

Grants a group access to a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `group_id: string`

  Identifier of the group to add to the project.

- `role: string`

  Identifier of the project role to grant to the group.

### Returns

- `created_at: number`

  Unix timestamp (in seconds) when the group was granted project access.

- `group_id: string`

  Identifier of the group that has access to the project.

- `group_name: string`

  Display name of the group.

- `object: "project.group"`

  Always `project.group`.

  - `"project.group"`

- `project_id: string`

  Identifier of the project.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "group_id": "group_id",
          "role": "role"
        }'
```

## Delete

**delete** `/organization/projects/{project_id}/groups/{group_id}`

Revokes a group's access to a project.

### Path Parameters

- `project_id: string`

- `group_id: string`

### Returns

- `deleted: boolean`

  Whether the group membership in the project was removed.

- `object: "project.group.deleted"`

  Always `project.group.deleted`.

  - `"project.group.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/groups/$GROUP_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

# Certificates

## List

**get** `/organization/projects/{project_id}/certificates`

List certificates for this project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, certificate_details, created_at, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: object { content, expires_at, valid_at }`

    - `content: optional string`

      The content of the certificate in PEM format.

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" or "organization.certificate" or "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: optional boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/certificates \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Activate

**post** `/organization/projects/{project_id}/certificates/activate`

Activate certificates at the project level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Path Parameters

- `project_id: string`

### Body Parameters

- `certificate_ids: array of string`

### Returns

- `data: array of object { id, certificate_details, created_at, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: object { content, expires_at, valid_at }`

    - `content: optional string`

      The content of the certificate in PEM format.

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" or "organization.certificate" or "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: optional boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/certificates/activate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "certificate_ids": [
            "cert_abc"
          ]
        }'
```

## Deactivate

**post** `/organization/projects/{project_id}/certificates/deactivate`

Deactivate certificates at the project level. You can atomically and
idempotently deactivate up to 10 certificates at a time.

### Path Parameters

- `project_id: string`

### Body Parameters

- `certificate_ids: array of string`

### Returns

- `data: array of object { id, certificate_details, created_at, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: object { content, expires_at, valid_at }`

    - `content: optional string`

      The content of the certificate in PEM format.

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" or "organization.certificate" or "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: optional boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/certificates/deactivate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "certificate_ids": [
            "cert_abc"
          ]
        }'
```
