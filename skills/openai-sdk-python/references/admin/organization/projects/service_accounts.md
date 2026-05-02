# Service Accounts

## List project service accounts

`admin.organization.projects.service_accounts.list(strproject_id, ServiceAccountListParams**kwargs)  -> SyncConversationCursorPage[ProjectServiceAccount]`

**get** `/organization/projects/{project_id}/service_accounts`

Returns a list of service accounts in the project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class ProjectServiceAccount: …`

  Represents an individual service account in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: str`

    The name of the service account

  - `object: Literal["organization.project.service_account"]`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: Literal["owner", "member"]`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.service_accounts.list(
    project_id="project_id",
)
page = page.data[0]
print(page.id)
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

`admin.organization.projects.service_accounts.create(strproject_id, ServiceAccountCreateParams**kwargs)  -> ServiceAccountCreateResponse`

**post** `/organization/projects/{project_id}/service_accounts`

Creates a new service account in the project. This also returns an unredacted API key for the service account.

### Parameters

- `project_id: str`

- `name: str`

  The name of the service account being created.

### Returns

- `class ServiceAccountCreateResponse: …`

  - `id: str`

  - `api_key: Optional[APIKey]`

    - `id: str`

    - `created_at: int`

    - `name: str`

    - `object: Literal["organization.project.service_account.api_key"]`

      The object type, which is always `organization.project.service_account.api_key`

      - `"organization.project.service_account.api_key"`

    - `value: str`

  - `created_at: int`

  - `name: str`

  - `object: Literal["organization.project.service_account"]`

    - `"organization.project.service_account"`

  - `role: Literal["member"]`

    Service accounts can only have one role of type `member`

    - `"member"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
service_account = client.admin.organization.projects.service_accounts.create(
    project_id="project_id",
    name="name",
)
print(service_account.id)
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

`admin.organization.projects.service_accounts.retrieve(strservice_account_id, ServiceAccountRetrieveParams**kwargs)  -> ProjectServiceAccount`

**get** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Retrieves a service account in the project.

### Parameters

- `project_id: str`

- `service_account_id: str`

### Returns

- `class ProjectServiceAccount: …`

  Represents an individual service account in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: str`

    The name of the service account

  - `object: Literal["organization.project.service_account"]`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: Literal["owner", "member"]`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_service_account = client.admin.organization.projects.service_accounts.retrieve(
    service_account_id="service_account_id",
    project_id="project_id",
)
print(project_service_account.id)
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

`admin.organization.projects.service_accounts.delete(strservice_account_id, ServiceAccountDeleteParams**kwargs)  -> ServiceAccountDeleteResponse`

**delete** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Deletes a service account from the project.

Returns confirmation of service account deletion, or an error if the project
is archived (archived projects have no service accounts).

### Parameters

- `project_id: str`

- `service_account_id: str`

### Returns

- `class ServiceAccountDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.service_account.deleted"]`

    - `"organization.project.service_account.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
service_account = client.admin.organization.projects.service_accounts.delete(
    service_account_id="service_account_id",
    project_id="project_id",
)
print(service_account.id)
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

- `class ProjectServiceAccount: …`

  Represents an individual service account in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: str`

    The name of the service account

  - `object: Literal["organization.project.service_account"]`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: Literal["owner", "member"]`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Service Account Create Response

- `class ServiceAccountCreateResponse: …`

  - `id: str`

  - `api_key: Optional[APIKey]`

    - `id: str`

    - `created_at: int`

    - `name: str`

    - `object: Literal["organization.project.service_account.api_key"]`

      The object type, which is always `organization.project.service_account.api_key`

      - `"organization.project.service_account.api_key"`

    - `value: str`

  - `created_at: int`

  - `name: str`

  - `object: Literal["organization.project.service_account"]`

    - `"organization.project.service_account"`

  - `role: Literal["member"]`

    Service accounts can only have one role of type `member`

    - `"member"`

### Service Account Delete Response

- `class ServiceAccountDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.service_account.deleted"]`

    - `"organization.project.service_account.deleted"`
