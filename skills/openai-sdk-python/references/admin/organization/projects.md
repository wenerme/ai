# Projects

## List projects

`admin.organization.projects.list(ProjectListParams**kwargs)  -> SyncConversationCursorPage[Project]`

**get** `/organization/projects`

Returns a list of projects.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `include_archived: Optional[bool]`

  If `true` returns all projects including those that have been `archived`. Archived projects are not included by default.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: str`

    The name of the project. This appears in reporting.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: Literal["active", "archived"]`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.list()
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
      "object": "organization.project",
      "status": "active",
      "archived_at": 0
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

## Create project

`admin.organization.projects.create(ProjectCreateParams**kwargs)  -> Project`

**post** `/organization/projects`

Create a new project in the organization. Projects can be created and archived, but cannot be deleted.

### Parameters

- `name: str`

  The friendly name of the project, this name appears in reports.

- `geography: Optional[Literal["US", "EU", "JP", 5 more]]`

  Create the project with the specified data residency region. Your organization must have access to Data residency functionality in order to use. See [data residency controls](https://platform.openai.com/docs/guides/your-data#data-residency-controls) to review the functionality and limitations of setting this field.

  - `"US"`

  - `"EU"`

  - `"JP"`

  - `"IN"`

  - `"KR"`

  - `"CA"`

  - `"AU"`

  - `"SG"`

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: str`

    The name of the project. This appears in reporting.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: Literal["active", "archived"]`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project = client.admin.organization.projects.create(
    name="name",
)
print(project.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project",
  "status": "active",
  "archived_at": 0
}
```

## Retrieve project

`admin.organization.projects.retrieve(strproject_id)  -> Project`

**get** `/organization/projects/{project_id}`

Retrieves a project.

### Parameters

- `project_id: str`

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: str`

    The name of the project. This appears in reporting.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: Literal["active", "archived"]`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project = client.admin.organization.projects.retrieve(
    "project_id",
)
print(project.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project",
  "status": "active",
  "archived_at": 0
}
```

## Modify project

`admin.organization.projects.update(strproject_id, ProjectUpdateParams**kwargs)  -> Project`

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Parameters

- `project_id: str`

- `name: str`

  The updated name of the project, this name appears in reports.

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: str`

    The name of the project. This appears in reporting.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: Literal["active", "archived"]`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project = client.admin.organization.projects.update(
    project_id="project_id",
    name="name",
)
print(project.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project",
  "status": "active",
  "archived_at": 0
}
```

## Archive project

`admin.organization.projects.archive(strproject_id)  -> Project`

**post** `/organization/projects/{project_id}/archive`

Archives a project in the organization. Archived projects cannot be used or updated.

### Parameters

- `project_id: str`

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: str`

    The name of the project. This appears in reporting.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: Literal["active", "archived"]`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project = client.admin.organization.projects.archive(
    "project_id",
)
print(project.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project",
  "status": "active",
  "archived_at": 0
}
```

## Domain Types

### Project

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: str`

    The name of the project. This appears in reporting.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: Literal["active", "archived"]`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

# Users

## List project users

`admin.organization.projects.users.list(strproject_id, UserListParams**kwargs)  -> SyncConversationCursorPage[ProjectUser]`

**get** `/organization/projects/{project_id}/users`

Returns a list of users in the project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class ProjectUser: …`

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

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.users.list(
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
      "added_at": 0,
      "email": "email",
      "name": "name",
      "object": "organization.project.user",
      "role": "owner"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "object"
}
```

## Create project user

`admin.organization.projects.users.create(strproject_id, UserCreateParams**kwargs)  -> ProjectUser`

**post** `/organization/projects/{project_id}/users`

Adds a user to the project. Users must already be members of the organization to be added to a project.

### Parameters

- `project_id: str`

- `role: Literal["owner", "member"]`

  `owner` or `member`

  - `"owner"`

  - `"member"`

- `user_id: str`

  The ID of the user.

### Returns

- `class ProjectUser: …`

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

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_user = client.admin.organization.projects.users.create(
    project_id="project_id",
    role="owner",
    user_id="user_id",
)
print(project_user.id)
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "email": "email",
  "name": "name",
  "object": "organization.project.user",
  "role": "owner"
}
```

## Retrieve project user

`admin.organization.projects.users.retrieve(struser_id, UserRetrieveParams**kwargs)  -> ProjectUser`

**get** `/organization/projects/{project_id}/users/{user_id}`

Retrieves a user in the project.

### Parameters

- `project_id: str`

- `user_id: str`

### Returns

- `class ProjectUser: …`

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

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_user = client.admin.organization.projects.users.retrieve(
    user_id="user_id",
    project_id="project_id",
)
print(project_user.id)
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "email": "email",
  "name": "name",
  "object": "organization.project.user",
  "role": "owner"
}
```

## Modify project user

`admin.organization.projects.users.update(struser_id, UserUpdateParams**kwargs)  -> ProjectUser`

**post** `/organization/projects/{project_id}/users/{user_id}`

Modifies a user's role in the project.

### Parameters

- `project_id: str`

- `user_id: str`

- `role: Literal["owner", "member"]`

  `owner` or `member`

  - `"owner"`

  - `"member"`

### Returns

- `class ProjectUser: …`

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

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_user = client.admin.organization.projects.users.update(
    user_id="user_id",
    project_id="project_id",
    role="owner",
)
print(project_user.id)
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "email": "email",
  "name": "name",
  "object": "organization.project.user",
  "role": "owner"
}
```

## Delete project user

`admin.organization.projects.users.delete(struser_id, UserDeleteParams**kwargs)  -> UserDeleteResponse`

**delete** `/organization/projects/{project_id}/users/{user_id}`

Deletes a user from the project.

Returns confirmation of project user deletion, or an error if the project is
archived (archived projects have no users).

### Parameters

- `project_id: str`

- `user_id: str`

### Returns

- `class UserDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.user.deleted"]`

    - `"organization.project.user.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
user = client.admin.organization.projects.users.delete(
    user_id="user_id",
    project_id="project_id",
)
print(user.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.user.deleted"
}
```

## Domain Types

### Project User

- `class ProjectUser: …`

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

### User Delete Response

- `class UserDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.user.deleted"]`

    - `"organization.project.user.deleted"`

# Roles

## List project user role assignments

`admin.organization.projects.users.roles.list(struser_id, RoleListParams**kwargs)  -> SyncCursorPage[RoleListResponse]`

**get** `/projects/{project_id}/users/{user_id}/roles`

Lists the project roles assigned to a user within a project.

### Parameters

- `project_id: str`

- `user_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

- `limit: Optional[int]`

  A limit on the number of project role assignments to return.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned project roles.

  - `"asc"`

  - `"desc"`

### Returns

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.users.roles.list(
    user_id="user_id",
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
      "created_by": "created_by",
      "created_by_user_obj": {
        "foo": "bar"
      },
      "description": "description",
      "metadata": {
        "foo": "bar"
      },
      "name": "name",
      "permissions": [
        "string"
      ],
      "predefined_role": true,
      "resource_type": "resource_type",
      "updated_at": 0
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

## Assign project role to user

`admin.organization.projects.users.roles.create(struser_id, RoleCreateParams**kwargs)  -> RoleCreateResponse`

**post** `/projects/{project_id}/users/{user_id}/roles`

Assigns a project role to a user within a project.

### Parameters

- `project_id: str`

- `user_id: str`

- `role_id: str`

  Identifier of the role to assign.

### Returns

- `class RoleCreateResponse: …`

  Role assignment linking a user to a role.

  - `object: Literal["user.role"]`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: str`

      The identifier, which can be referenced in API endpoints

    - `added_at: int`

      The Unix timestamp (in seconds) of when the user was added.

    - `email: str`

      The email address of the user

    - `name: str`

      The name of the user

    - `object: Literal["organization.user"]`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `role: Literal["owner", "reader"]`

      `owner` or `reader`

      - `"owner"`

      - `"reader"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.users.roles.create(
    user_id="user_id",
    project_id="project_id",
    role_id="role_id",
)
print(role.object)
```

#### Response

```json
{
  "object": "user.role",
  "role": {
    "id": "id",
    "description": "description",
    "name": "name",
    "object": "role",
    "permissions": [
      "string"
    ],
    "predefined_role": true,
    "resource_type": "resource_type"
  },
  "user": {
    "id": "id",
    "added_at": 0,
    "email": "email",
    "name": "name",
    "object": "organization.user",
    "role": "owner"
  }
}
```

## Unassign project role from user

`admin.organization.projects.users.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/projects/{project_id}/users/{user_id}/roles/{role_id}`

Unassigns a project role from a user within a project.

### Parameters

- `project_id: str`

- `user_id: str`

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.users.roles.delete(
    role_id="role_id",
    project_id="project_id",
    user_id="user_id",
)
print(role.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

## Domain Types

### Role List Response

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Role Create Response

- `class RoleCreateResponse: …`

  Role assignment linking a user to a role.

  - `object: Literal["user.role"]`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: str`

      The identifier, which can be referenced in API endpoints

    - `added_at: int`

      The Unix timestamp (in seconds) of when the user was added.

    - `email: str`

      The email address of the user

    - `name: str`

      The name of the user

    - `object: Literal["organization.user"]`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `role: Literal["owner", "reader"]`

      `owner` or `reader`

      - `"owner"`

      - `"reader"`

### Role Delete Response

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

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
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
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

  - `api_key: APIKey`

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

  - `api_key: APIKey`

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

# Rate Limits

## List project rate limits

`admin.organization.projects.rate_limits.list_rate_limits(strproject_id, RateLimitListRateLimitsParams**kwargs)  -> SyncConversationCursorPage[ProjectRateLimit]`

**get** `/organization/projects/{project_id}/rate_limits`

Returns the rate limits per model for a project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, beginning with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. The default is 100.

### Returns

- `class ProjectRateLimit: …`

  Represents a project rate limit config.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: int`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: int`

    The maximum tokens per minute.

  - `model: str`

    The model this rate limit applies to.

  - `object: Literal["project.rate_limit"]`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: Optional[int]`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: Optional[int]`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: Optional[int]`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: Optional[int]`

    The maximum requests per day. Only present for relevant models.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.rate_limits.list_rate_limits(
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
      "max_requests_per_1_minute": 0,
      "max_tokens_per_1_minute": 0,
      "model": "model",
      "object": "project.rate_limit",
      "batch_1_day_max_input_tokens": 0,
      "max_audio_megabytes_per_1_minute": 0,
      "max_images_per_1_minute": 0,
      "max_requests_per_1_day": 0
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

## Modify project rate limit

`admin.organization.projects.rate_limits.update_rate_limit(strrate_limit_id, RateLimitUpdateRateLimitParams**kwargs)  -> ProjectRateLimit`

**post** `/organization/projects/{project_id}/rate_limits/{rate_limit_id}`

Updates a project rate limit.

### Parameters

- `project_id: str`

- `rate_limit_id: str`

- `batch_1_day_max_input_tokens: Optional[int]`

  The maximum batch input tokens per day. Only relevant for certain models.

- `max_audio_megabytes_per_1_minute: Optional[int]`

  The maximum audio megabytes per minute. Only relevant for certain models.

- `max_images_per_1_minute: Optional[int]`

  The maximum images per minute. Only relevant for certain models.

- `max_requests_per_1_day: Optional[int]`

  The maximum requests per day. Only relevant for certain models.

- `max_requests_per_1_minute: Optional[int]`

  The maximum requests per minute.

- `max_tokens_per_1_minute: Optional[int]`

  The maximum tokens per minute.

### Returns

- `class ProjectRateLimit: …`

  Represents a project rate limit config.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: int`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: int`

    The maximum tokens per minute.

  - `model: str`

    The model this rate limit applies to.

  - `object: Literal["project.rate_limit"]`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: Optional[int]`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: Optional[int]`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: Optional[int]`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: Optional[int]`

    The maximum requests per day. Only present for relevant models.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_rate_limit = client.admin.organization.projects.rate_limits.update_rate_limit(
    rate_limit_id="rate_limit_id",
    project_id="project_id",
)
print(project_rate_limit.id)
```

#### Response

```json
{
  "id": "id",
  "max_requests_per_1_minute": 0,
  "max_tokens_per_1_minute": 0,
  "model": "model",
  "object": "project.rate_limit",
  "batch_1_day_max_input_tokens": 0,
  "max_audio_megabytes_per_1_minute": 0,
  "max_images_per_1_minute": 0,
  "max_requests_per_1_day": 0
}
```

## Domain Types

### Project Rate Limit

- `class ProjectRateLimit: …`

  Represents a project rate limit config.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: int`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: int`

    The maximum tokens per minute.

  - `model: str`

    The model this rate limit applies to.

  - `object: Literal["project.rate_limit"]`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: Optional[int]`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: Optional[int]`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: Optional[int]`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: Optional[int]`

    The maximum requests per day. Only present for relevant models.

# Groups

## List project groups

`admin.organization.projects.groups.list(strproject_id, GroupListParams**kwargs)  -> SyncCursorPage[ProjectGroup]`

**get** `/organization/projects/{project_id}/groups`

Lists the groups that have access to a project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the ID of the last group from the previous response to fetch the next page.

- `limit: Optional[int]`

  A limit on the number of project groups to return. Defaults to 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `class ProjectGroup: …`

  Details about a group's membership in a project.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: str`

    Identifier of the group that has access to the project.

  - `group_name: str`

    Display name of the group.

  - `object: Literal["project.group"]`

    Always `project.group`.

    - `"project.group"`

  - `project_id: str`

    Identifier of the project.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.groups.list(
    project_id="project_id",
)
page = page.data[0]
print(page.group_id)
```

#### Response

```json
{
  "data": [
    {
      "created_at": 0,
      "group_id": "group_id",
      "group_name": "group_name",
      "object": "project.group",
      "project_id": "project_id"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

## Add project group

`admin.organization.projects.groups.create(strproject_id, GroupCreateParams**kwargs)  -> ProjectGroup`

**post** `/organization/projects/{project_id}/groups`

Grants a group access to a project.

### Parameters

- `project_id: str`

- `group_id: str`

  Identifier of the group to add to the project.

- `role: str`

  Identifier of the project role to grant to the group.

### Returns

- `class ProjectGroup: …`

  Details about a group's membership in a project.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: str`

    Identifier of the group that has access to the project.

  - `group_name: str`

    Display name of the group.

  - `object: Literal["project.group"]`

    Always `project.group`.

    - `"project.group"`

  - `project_id: str`

    Identifier of the project.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_group = client.admin.organization.projects.groups.create(
    project_id="project_id",
    group_id="group_id",
    role="role",
)
print(project_group.group_id)
```

#### Response

```json
{
  "created_at": 0,
  "group_id": "group_id",
  "group_name": "group_name",
  "object": "project.group",
  "project_id": "project_id"
}
```

## Remove project group

`admin.organization.projects.groups.delete(strgroup_id, GroupDeleteParams**kwargs)  -> GroupDeleteResponse`

**delete** `/organization/projects/{project_id}/groups/{group_id}`

Revokes a group's access to a project.

### Parameters

- `project_id: str`

- `group_id: str`

### Returns

- `class GroupDeleteResponse: …`

  Confirmation payload returned after removing a group from a project.

  - `deleted: bool`

    Whether the group membership in the project was removed.

  - `object: Literal["project.group.deleted"]`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
group = client.admin.organization.projects.groups.delete(
    group_id="group_id",
    project_id="project_id",
)
print(group.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "project.group.deleted"
}
```

## Domain Types

### Project Group

- `class ProjectGroup: …`

  Details about a group's membership in a project.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: str`

    Identifier of the group that has access to the project.

  - `group_name: str`

    Display name of the group.

  - `object: Literal["project.group"]`

    Always `project.group`.

    - `"project.group"`

  - `project_id: str`

    Identifier of the project.

### Group Delete Response

- `class GroupDeleteResponse: …`

  Confirmation payload returned after removing a group from a project.

  - `deleted: bool`

    Whether the group membership in the project was removed.

  - `object: Literal["project.group.deleted"]`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

# Roles

## List project group role assignments

`admin.organization.projects.groups.roles.list(strgroup_id, RoleListParams**kwargs)  -> SyncCursorPage[RoleListResponse]`

**get** `/projects/{project_id}/groups/{group_id}/roles`

Lists the project roles assigned to a group within a project.

### Parameters

- `project_id: str`

- `group_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

- `limit: Optional[int]`

  A limit on the number of project role assignments to return.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned project roles.

  - `"asc"`

  - `"desc"`

### Returns

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.groups.roles.list(
    group_id="group_id",
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
      "created_by": "created_by",
      "created_by_user_obj": {
        "foo": "bar"
      },
      "description": "description",
      "metadata": {
        "foo": "bar"
      },
      "name": "name",
      "permissions": [
        "string"
      ],
      "predefined_role": true,
      "resource_type": "resource_type",
      "updated_at": 0
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

## Assign project role to group

`admin.organization.projects.groups.roles.create(strgroup_id, RoleCreateParams**kwargs)  -> RoleCreateResponse`

**post** `/projects/{project_id}/groups/{group_id}/roles`

Assigns a project role to a group within a project.

### Parameters

- `project_id: str`

- `group_id: str`

- `role_id: str`

  Identifier of the role to assign.

### Returns

- `class RoleCreateResponse: …`

  Role assignment linking a group to a role.

  - `group: Group`

    Summary information about a group returned in role assignment responses.

    - `id: str`

      Identifier for the group.

    - `created_at: int`

      Unix timestamp (in seconds) when the group was created.

    - `name: str`

      Display name of the group.

    - `object: Literal["group"]`

      Always `group`.

      - `"group"`

    - `scim_managed: bool`

      Whether the group is managed through SCIM.

  - `object: Literal["group.role"]`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.groups.roles.create(
    group_id="group_id",
    project_id="project_id",
    role_id="role_id",
)
print(role.group)
```

#### Response

```json
{
  "group": {
    "id": "id",
    "created_at": 0,
    "name": "name",
    "object": "group",
    "scim_managed": true
  },
  "object": "group.role",
  "role": {
    "id": "id",
    "description": "description",
    "name": "name",
    "object": "role",
    "permissions": [
      "string"
    ],
    "predefined_role": true,
    "resource_type": "resource_type"
  }
}
```

## Unassign project role from group

`admin.organization.projects.groups.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Unassigns a project role from a group within a project.

### Parameters

- `project_id: str`

- `group_id: str`

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.groups.roles.delete(
    role_id="role_id",
    project_id="project_id",
    group_id="group_id",
)
print(role.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

## Domain Types

### Role List Response

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Role Create Response

- `class RoleCreateResponse: …`

  Role assignment linking a group to a role.

  - `group: Group`

    Summary information about a group returned in role assignment responses.

    - `id: str`

      Identifier for the group.

    - `created_at: int`

      Unix timestamp (in seconds) when the group was created.

    - `name: str`

      Display name of the group.

    - `object: Literal["group"]`

      Always `group`.

      - `"group"`

    - `scim_managed: bool`

      Whether the group is managed through SCIM.

  - `object: Literal["group.role"]`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Delete Response

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Roles

## List project roles

`admin.organization.projects.roles.list(strproject_id, RoleListParams**kwargs)  -> SyncCursorPage[Role]`

**get** `/projects/{project_id}/roles`

Lists the roles configured for a project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

- `limit: Optional[int]`

  A limit on the number of roles to return. Defaults to 1000.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned roles.

  - `"asc"`

  - `"desc"`

### Returns

- `class Role: …`

  Details about a role that can be assigned through the public Roles API.

  - `id: str`

    Identifier for the role.

  - `description: Optional[str]`

    Optional description of the role.

  - `name: str`

    Unique name for the role.

  - `object: Literal["role"]`

    Always `role`.

    - `"role"`

  - `permissions: List[str]`

    Permissions granted by the role.

  - `predefined_role: bool`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: str`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.roles.list(
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
      "description": "description",
      "name": "name",
      "object": "role",
      "permissions": [
        "string"
      ],
      "predefined_role": true,
      "resource_type": "resource_type"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

## Create project role

`admin.organization.projects.roles.create(strproject_id, RoleCreateParams**kwargs)  -> Role`

**post** `/projects/{project_id}/roles`

Creates a custom role for a project.

### Parameters

- `project_id: str`

- `permissions: Sequence[str]`

  Permissions to grant to the role.

- `role_name: str`

  Unique name for the role.

- `description: Optional[str]`

  Optional description of the role.

### Returns

- `class Role: …`

  Details about a role that can be assigned through the public Roles API.

  - `id: str`

    Identifier for the role.

  - `description: Optional[str]`

    Optional description of the role.

  - `name: str`

    Unique name for the role.

  - `object: Literal["role"]`

    Always `role`.

    - `"role"`

  - `permissions: List[str]`

    Permissions granted by the role.

  - `predefined_role: bool`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: str`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.roles.create(
    project_id="project_id",
    permissions=["string"],
    role_name="role_name",
)
print(role.id)
```

#### Response

```json
{
  "id": "id",
  "description": "description",
  "name": "name",
  "object": "role",
  "permissions": [
    "string"
  ],
  "predefined_role": true,
  "resource_type": "resource_type"
}
```

## Update project role

`admin.organization.projects.roles.update(strrole_id, RoleUpdateParams**kwargs)  -> Role`

**post** `/projects/{project_id}/roles/{role_id}`

Updates an existing project role.

### Parameters

- `project_id: str`

- `role_id: str`

- `description: Optional[str]`

  New description for the role.

- `permissions: Optional[Sequence[str]]`

  Updated set of permissions for the role.

- `role_name: Optional[str]`

  New name for the role.

### Returns

- `class Role: …`

  Details about a role that can be assigned through the public Roles API.

  - `id: str`

    Identifier for the role.

  - `description: Optional[str]`

    Optional description of the role.

  - `name: str`

    Unique name for the role.

  - `object: Literal["role"]`

    Always `role`.

    - `"role"`

  - `permissions: List[str]`

    Permissions granted by the role.

  - `predefined_role: bool`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: str`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.roles.update(
    role_id="role_id",
    project_id="project_id",
)
print(role.id)
```

#### Response

```json
{
  "id": "id",
  "description": "description",
  "name": "name",
  "object": "role",
  "permissions": [
    "string"
  ],
  "predefined_role": true,
  "resource_type": "resource_type"
}
```

## Delete project role

`admin.organization.projects.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/projects/{project_id}/roles/{role_id}`

Deletes a custom role from a project.

### Parameters

- `project_id: str`

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after deleting a role.

  - `id: str`

    Identifier of the deleted role.

  - `deleted: bool`

    Whether the role was deleted.

  - `object: Literal["role.deleted"]`

    Always `role.deleted`.

    - `"role.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.roles.delete(
    role_id="role_id",
    project_id="project_id",
)
print(role.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "role.deleted"
}
```

## Domain Types

### Role Delete Response

- `class RoleDeleteResponse: …`

  Confirmation payload returned after deleting a role.

  - `id: str`

    Identifier of the deleted role.

  - `deleted: bool`

    Whether the role was deleted.

  - `object: Literal["role.deleted"]`

    Always `role.deleted`.

    - `"role.deleted"`

# Certificates

## List project certificates

`admin.organization.projects.certificates.list(strproject_id, CertificateListParams**kwargs)  -> SyncConversationCursorPage[Certificate]`

**get** `/organization/projects/{project_id}/certificates`

List certificates for this project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class Certificate: …`

  Represents an individual `certificate` uploaded to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content: Optional[str]`

      The content of the certificate in PEM format.

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: str`

    The name of the certificate.

  - `object: Literal["certificate", "organization.certificate", "organization.project.certificate"]`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: Optional[bool]`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.certificates.list(
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
      "certificate_details": {
        "content": "content",
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "certificate",
      "active": true
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "cert_abc",
  "last_id": "cert_abc"
}
```

## Activate certificates for project

`admin.organization.projects.certificates.activate(strproject_id, CertificateActivateParams**kwargs)  -> SyncPage[Certificate]`

**post** `/organization/projects/{project_id}/certificates/activate`

Activate certificates at the project level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Parameters

- `project_id: str`

- `certificate_ids: Sequence[str]`

### Returns

- `class Certificate: …`

  Represents an individual `certificate` uploaded to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content: Optional[str]`

      The content of the certificate in PEM format.

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: str`

    The name of the certificate.

  - `object: Literal["certificate", "organization.certificate", "organization.project.certificate"]`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: Optional[bool]`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.certificates.activate(
    project_id="project_id",
    certificate_ids=["cert_abc"],
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
      "certificate_details": {
        "content": "content",
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "certificate",
      "active": true
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "cert_abc",
  "last_id": "cert_abc"
}
```

## Deactivate certificates for project

`admin.organization.projects.certificates.deactivate(strproject_id, CertificateDeactivateParams**kwargs)  -> SyncPage[Certificate]`

**post** `/organization/projects/{project_id}/certificates/deactivate`

Deactivate certificates at the project level. You can atomically and
idempotently deactivate up to 10 certificates at a time.

### Parameters

- `project_id: str`

- `certificate_ids: Sequence[str]`

### Returns

- `class Certificate: …`

  Represents an individual `certificate` uploaded to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content: Optional[str]`

      The content of the certificate in PEM format.

    - `expires_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: Optional[int]`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: int`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: str`

    The name of the certificate.

  - `object: Literal["certificate", "organization.certificate", "organization.project.certificate"]`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active: Optional[bool]`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.certificates.deactivate(
    project_id="project_id",
    certificate_ids=["cert_abc"],
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
      "certificate_details": {
        "content": "content",
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "certificate",
      "active": true
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "cert_abc",
  "last_id": "cert_abc"
}
```
