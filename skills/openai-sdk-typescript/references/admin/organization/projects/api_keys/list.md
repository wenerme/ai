## List project API keys

`client.admin.organization.projects.apiKeys.list(stringprojectID, APIKeyListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectAPIKey>`

**get** `/organization/projects/{project_id}/api_keys`

Returns a list of API keys in the project.

### Parameters

- `projectID: string`

- `query: APIKeyListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `ProjectAPIKey`

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

  - `owner: Owner`

    - `service_account?: ProjectServiceAccount`

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

    - `type?: "user" | "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user?: ProjectUser`

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

      - `role: "owner" | "member"`

        `owner` or `member`

        - `"owner"`

        - `"member"`

  - `redacted_value: string`

    The redacted value of the API key

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectAPIKey of client.admin.organization.projects.apiKeys.list('project_id')) {
  console.log(projectAPIKey.id);
}
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
