## List projects

`client.admin.organization.projects.list(ProjectListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<Project>`

**get** `/organization/projects`

Returns a list of projects.

### Parameters

- `query: ProjectListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `include_archived?: boolean`

    If `true` returns all projects including those that have been `archived`. Archived projects are not included by default.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const project of client.admin.organization.projects.list()) {
  console.log(project.id);
}
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
