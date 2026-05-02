# Service Accounts

## List project service accounts

`client.admin.organization.projects.serviceAccounts.list(stringprojectID, ServiceAccountListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectServiceAccount>`

**get** `/organization/projects/{project_id}/service_accounts`

Returns a list of service accounts in the project.

### Parameters

- `projectID: string`

- `query: ServiceAccountListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `ProjectServiceAccount`

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

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectServiceAccount of client.admin.organization.projects.serviceAccounts.list(
  'project_id',
)) {
  console.log(projectServiceAccount.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "name": "name",
      "object": "organization.project.service_account",
      "role": "owner"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## Create project service account

`client.admin.organization.projects.serviceAccounts.create(stringprojectID, ServiceAccountCreateParamsbody, RequestOptionsoptions?): ServiceAccountCreateResponse`

**post** `/organization/projects/{project_id}/service_accounts`

Creates a new service account in the project. This also returns an unredacted API key for the service account.

### Parameters

- `projectID: string`

- `body: ServiceAccountCreateParams`

  - `name: string`

    The name of the service account being created.

### Returns

- `ServiceAccountCreateResponse`

  - `id: string`

  - `api_key: APIKey | null`

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

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const serviceAccount = await client.admin.organization.projects.serviceAccounts.create(
  'project_id',
  { name: 'name' },
);

console.log(serviceAccount.id);
```

#### Response

```json
{
  "id": "id",
  "api_key": {
    "id": "id",
    "created_at": 0,
    "name": "name",
    "object": "organization.project.service_account.api_key",
    "value": "value"
  },
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account",
  "role": "member"
}
```

## Retrieve project service account

`client.admin.organization.projects.serviceAccounts.retrieve(stringserviceAccountID, ServiceAccountRetrieveParamsparams, RequestOptionsoptions?): ProjectServiceAccount`

**get** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Retrieves a service account in the project.

### Parameters

- `serviceAccountID: string`

- `params: ServiceAccountRetrieveParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ProjectServiceAccount`

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

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectServiceAccount = await client.admin.organization.projects.serviceAccounts.retrieve(
  'service_account_id',
  { project_id: 'project_id' },
);

console.log(projectServiceAccount.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account",
  "role": "owner"
}
```

## Delete project service account

`client.admin.organization.projects.serviceAccounts.delete(stringserviceAccountID, ServiceAccountDeleteParamsparams, RequestOptionsoptions?): ServiceAccountDeleteResponse`

**delete** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Deletes a service account from the project.

Returns confirmation of service account deletion, or an error if the project
is archived (archived projects have no service accounts).

### Parameters

- `serviceAccountID: string`

- `params: ServiceAccountDeleteParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ServiceAccountDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.service_account.deleted"`

    - `"organization.project.service_account.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const serviceAccount = await client.admin.organization.projects.serviceAccounts.delete(
  'service_account_id',
  { project_id: 'project_id' },
);

console.log(serviceAccount.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.service_account.deleted"
}
```

## Domain Types

### Project Service Account

- `ProjectServiceAccount`

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

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Service Account Create Response

- `ServiceAccountCreateResponse`

  - `id: string`

  - `api_key: APIKey | null`

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

### Service Account Delete Response

- `ServiceAccountDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.service_account.deleted"`

    - `"organization.project.service_account.deleted"`
