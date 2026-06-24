## Retrieve project API key

`client.admin.organization.projects.apiKeys.retrieve(stringapiKeyID, APIKeyRetrieveParamsparams, RequestOptionsoptions?): ProjectAPIKey`

**get** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Retrieves an API key in the project.

### Parameters

- `apiKeyID: string`

- `params: APIKeyRetrieveParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ProjectAPIKey`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number | null`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account?: ServiceAccount`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type?: "user" | "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user?: User`

      The user that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the user was created.

      - `email: string`

        The email address of the user.

      - `name: string`

        The name of the user.

      - `role: string`

        The user's project role.

  - `redacted_value: string`

    The redacted value of the API key

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectAPIKey = await client.admin.organization.projects.apiKeys.retrieve('api_key_id', {
  project_id: 'project_id',
});

console.log(projectAPIKey.id);
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
      "role": "role"
    },
    "type": "user",
    "user": {
      "id": "id",
      "created_at": 0,
      "email": "email",
      "name": "name",
      "role": "role"
    }
  },
  "redacted_value": "redacted_value"
}
```
