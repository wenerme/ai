## List

**get** `/organization/projects/{project_id}/service_accounts`

Returns a list of service accounts in the project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of ProjectServiceAccount`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: string`

    The name of the service account

  - `object: "organization.project.service_account"`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: "owner" or "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
