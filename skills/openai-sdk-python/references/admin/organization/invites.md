# Invites

## List invites

`admin.organization.invites.list(InviteListParams**kwargs)  -> SyncConversationCursorPage[Invite]`

**get** `/organization/invites`

Returns a list of invites in the organization.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class Invite: …`

  Represents an individual `invite` to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `email: str`

    The email address of the individual to whom the invite was sent

  - `expires_at: int`

    The Unix timestamp (in seconds) of when the invite expires.

  - `invited_at: int`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `object: Literal["organization.invite"]`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `role: Literal["owner", "reader"]`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: Literal["accepted", "expired", "pending"]`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `projects: Optional[List[Project]]`

    The projects that were granted membership upon acceptance of the invite.

    - `id: Optional[str]`

      Project's public ID

    - `role: Optional[Literal["member", "owner"]]`

      Project membership role

      - `"member"`

      - `"owner"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.invites.list()
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "email": "email",
      "expires_at": 0,
      "invited_at": 0,
      "object": "organization.invite",
      "role": "owner",
      "status": "accepted",
      "accepted_at": 0,
      "projects": [
        {
          "id": "id",
          "role": "member"
        }
      ]
    }
  ],
  "object": "list",
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id"
}
```

## Create invite

`admin.organization.invites.create(InviteCreateParams**kwargs)  -> Invite`

**post** `/organization/invites`

Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.

### Parameters

- `email: str`

  Send an email to this address

- `role: Literal["reader", "owner"]`

  `owner` or `reader`

  - `"reader"`

  - `"owner"`

- `projects: Optional[Iterable[Project]]`

  An array of projects to which membership is granted at the same time the org invite is accepted. If omitted, the user will be invited to the default project for compatibility with legacy behavior.

  - `id: str`

    Project's public ID

  - `role: Literal["member", "owner"]`

    Project membership role

    - `"member"`

    - `"owner"`

### Returns

- `class Invite: …`

  Represents an individual `invite` to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `email: str`

    The email address of the individual to whom the invite was sent

  - `expires_at: int`

    The Unix timestamp (in seconds) of when the invite expires.

  - `invited_at: int`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `object: Literal["organization.invite"]`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `role: Literal["owner", "reader"]`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: Literal["accepted", "expired", "pending"]`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `projects: Optional[List[Project]]`

    The projects that were granted membership upon acceptance of the invite.

    - `id: Optional[str]`

      Project's public ID

    - `role: Optional[Literal["member", "owner"]]`

      Project membership role

      - `"member"`

      - `"owner"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
invite = client.admin.organization.invites.create(
    email="email",
    role="reader",
)
print(invite.id)
```

#### Response

```json
{
  "id": "id",
  "email": "email",
  "expires_at": 0,
  "invited_at": 0,
  "object": "organization.invite",
  "role": "owner",
  "status": "accepted",
  "accepted_at": 0,
  "projects": [
    {
      "id": "id",
      "role": "member"
    }
  ]
}
```

## Retrieve invite

`admin.organization.invites.retrieve(strinvite_id)  -> Invite`

**get** `/organization/invites/{invite_id}`

Retrieves an invite.

### Parameters

- `invite_id: str`

### Returns

- `class Invite: …`

  Represents an individual `invite` to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `email: str`

    The email address of the individual to whom the invite was sent

  - `expires_at: int`

    The Unix timestamp (in seconds) of when the invite expires.

  - `invited_at: int`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `object: Literal["organization.invite"]`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `role: Literal["owner", "reader"]`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: Literal["accepted", "expired", "pending"]`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `projects: Optional[List[Project]]`

    The projects that were granted membership upon acceptance of the invite.

    - `id: Optional[str]`

      Project's public ID

    - `role: Optional[Literal["member", "owner"]]`

      Project membership role

      - `"member"`

      - `"owner"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
invite = client.admin.organization.invites.retrieve(
    "invite_id",
)
print(invite.id)
```

#### Response

```json
{
  "id": "id",
  "email": "email",
  "expires_at": 0,
  "invited_at": 0,
  "object": "organization.invite",
  "role": "owner",
  "status": "accepted",
  "accepted_at": 0,
  "projects": [
    {
      "id": "id",
      "role": "member"
    }
  ]
}
```

## Delete invite

`admin.organization.invites.delete(strinvite_id)  -> InviteDeleteResponse`

**delete** `/organization/invites/{invite_id}`

Delete an invite. If the invite has already been accepted, it cannot be deleted.

### Parameters

- `invite_id: str`

### Returns

- `class InviteDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.invite.deleted"]`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
invite = client.admin.organization.invites.delete(
    "invite_id",
)
print(invite.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.invite.deleted"
}
```

## Domain Types

### Invite

- `class Invite: …`

  Represents an individual `invite` to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `email: str`

    The email address of the individual to whom the invite was sent

  - `expires_at: int`

    The Unix timestamp (in seconds) of when the invite expires.

  - `invited_at: int`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `object: Literal["organization.invite"]`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `role: Literal["owner", "reader"]`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: Literal["accepted", "expired", "pending"]`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `projects: Optional[List[Project]]`

    The projects that were granted membership upon acceptance of the invite.

    - `id: Optional[str]`

      Project's public ID

    - `role: Optional[Literal["member", "owner"]]`

      Project membership role

      - `"member"`

      - `"owner"`

### Invite Delete Response

- `class InviteDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.invite.deleted"]`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`
