# API Keys

## List project API keys

`admin.organization.projects.api_keys.list(strproject_id, APIKeyListParams**kwargs)  -> SyncConversationCursorPage[ProjectAPIKey]`

**get** `/organization/projects/{project_id}/api_keys`

Returns a list of API keys in the project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class ProjectAPIKey: …`

  Represents an individual API key in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: int`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: str`

    The name of the API key

  - `object: Literal["organization.project.api_key"]`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account: Optional[ProjectServiceAccount]`

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

    - `type: Optional[Literal["user", "service_account"]]`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: Optional[ProjectUser]`

      Represents an individual user in a project.

      - `id: str`

        The identifier, which can be referenced in API endpoints

      - `added_at: int`

        The Unix timestamp (in seconds) of when the project was added.

      - `email: str`

        The email address of the user

      - `name: str`

        The name of the user

      - `object: Literal["organization.project.user"]`

        The object type, which is always `organization.project.user`

        - `"organization.project.user"`

      - `role: Literal["owner", "member"]`

        `owner` or `member`

        - `"owner"`

        - `"member"`

  - `redacted_value: str`

    The redacted value of the API key

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.api_keys.list(
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
      "last_used_at": 0,
      "name": "name",
      "object": "organization.project.api_key",
      "owner": {
        "service_account": {
          "id": "id",
          "created_at": 0,
          "name": "name",
          "object": "organization.project.service_account",
          "role": "owner"
        },
        "type": "user",
        "user": {
          "id": "id",
          "added_at": 0,
          "email": "email",
          "name": "name",
          "object": "organization.project.user",
          "role": "owner"
        }
      },
      "redacted_value": "redacted_value"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

## Retrieve project API key

`admin.organization.projects.api_keys.retrieve(strkey_id, APIKeyRetrieveParams**kwargs)  -> ProjectAPIKey`

**get** `/organization/projects/{project_id}/api_keys/{key_id}`

Retrieves an API key in the project.

### Parameters

- `project_id: str`

- `key_id: str`

### Returns

- `class ProjectAPIKey: …`

  Represents an individual API key in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: int`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: str`

    The name of the API key

  - `object: Literal["organization.project.api_key"]`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account: Optional[ProjectServiceAccount]`

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

    - `type: Optional[Literal["user", "service_account"]]`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: Optional[ProjectUser]`

      Represents an individual user in a project.

      - `id: str`

        The identifier, which can be referenced in API endpoints

      - `added_at: int`

        The Unix timestamp (in seconds) of when the project was added.

      - `email: str`

        The email address of the user

      - `name: str`

        The name of the user

      - `object: Literal["organization.project.user"]`

        The object type, which is always `organization.project.user`

        - `"organization.project.user"`

      - `role: Literal["owner", "member"]`

        `owner` or `member`

        - `"owner"`

        - `"member"`

  - `redacted_value: str`

    The redacted value of the API key

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_api_key = client.admin.organization.projects.api_keys.retrieve(
    key_id="key_id",
    project_id="project_id",
)
print(project_api_key.id)
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
      "object": "organization.project.service_account",
      "role": "owner"
    },
    "type": "user",
    "user": {
      "id": "id",
      "added_at": 0,
      "email": "email",
      "name": "name",
      "object": "organization.project.user",
      "role": "owner"
    }
  },
  "redacted_value": "redacted_value"
}
```

## Delete project API key

`admin.organization.projects.api_keys.delete(strkey_id, APIKeyDeleteParams**kwargs)  -> APIKeyDeleteResponse`

**delete** `/organization/projects/{project_id}/api_keys/{key_id}`

Deletes an API key from the project.

Returns confirmation of the key deletion, or an error if the key belonged to
a service account.

### Parameters

- `project_id: str`

- `key_id: str`

### Returns

- `class APIKeyDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.api_key.deleted"]`

    - `"organization.project.api_key.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
api_key = client.admin.organization.projects.api_keys.delete(
    key_id="key_id",
    project_id="project_id",
)
print(api_key.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.api_key.deleted"
}
```

## Domain Types

### Project API Key

- `class ProjectAPIKey: …`

  Represents an individual API key in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: int`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: str`

    The name of the API key

  - `object: Literal["organization.project.api_key"]`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account: Optional[ProjectServiceAccount]`

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

    - `type: Optional[Literal["user", "service_account"]]`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: Optional[ProjectUser]`

      Represents an individual user in a project.

      - `id: str`

        The identifier, which can be referenced in API endpoints

      - `added_at: int`

        The Unix timestamp (in seconds) of when the project was added.

      - `email: str`

        The email address of the user

      - `name: str`

        The name of the user

      - `object: Literal["organization.project.user"]`

        The object type, which is always `organization.project.user`

        - `"organization.project.user"`

      - `role: Literal["owner", "member"]`

        `owner` or `member`

        - `"owner"`

        - `"member"`

  - `redacted_value: str`

    The redacted value of the API key

### API Key Delete Response

- `class APIKeyDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.api_key.deleted"]`

    - `"organization.project.api_key.deleted"`
