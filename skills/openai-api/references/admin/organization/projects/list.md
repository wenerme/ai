## List projects

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

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "object": "organization.project",
      "archived_at": 0,
      "external_key_id": "external_key_id",
      "name": "name",
      "status": "status"
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
curl https://api.openai.com/v1/organization/projects?after=proj_abc&limit=20&include_archived=false \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "proj_abc",
            "object": "organization.project",
            "name": "Project example",
            "created_at": 1711471533,
            "archived_at": null,
            "status": "active"
        }
    ],
    "first_id": "proj-abc",
    "last_id": "proj-xyz",
    "has_more": false
}
```
