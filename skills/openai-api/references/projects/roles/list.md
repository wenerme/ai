## List

**get** `/projects/{project_id}/roles`

Lists the roles configured for a project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

- `limit: optional number`

  A limit on the number of roles to return. Defaults to 1000.

- `order: optional "asc" or "desc"`

  Sort order for the returned roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, description, name, 4 more }`

  Roles returned in the current page.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

- `has_more: boolean`

  Whether more roles are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no additional roles.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
