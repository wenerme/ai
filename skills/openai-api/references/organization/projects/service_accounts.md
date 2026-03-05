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
