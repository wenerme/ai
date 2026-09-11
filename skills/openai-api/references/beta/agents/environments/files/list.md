## List agent environment files

**get** `/agents/environments/{environment_id}/files`

Lists live files on a connected execution environment with optional directory filtering and opaque cursor pagination. See [environment files](/api/docs/guides/agents-api/environments/files).

### Path Parameters

- `environment_id: string`

### Query Parameters

- `limit: optional number or null`

  The maximum number of files to return, between 1 and 100.

- `order: optional "asc" or "desc"`

  Sort by case-sensitive path components. Defaults to descending.

  - `"asc"`

    Returns resources in ascending order.

  - `"desc"`

    Returns resources in descending order.

- `page: optional string`

  The opaque token from the previous page. Keep the same path, order, and limit.

- `path: optional string or null`

  Restrict the listing to this absolute workspace directory.

### Returns

- `data: array of EnvironmentFile`

  Files available on the current page.

  - `environment_id: string`

    The ID of the environment containing this file.

  - `object: "agent.environment.file"`

    The object type. Always `agent.environment.file`.

    - `"agent.environment.file"`

  - `path: string`

    The absolute file path inside the environment's workspace.

  - `size_bytes: number`

    The file size in bytes.

- `has_more: boolean`

  Whether more files follow this page.

- `next: string or null`

  The opaque cursor to use when requesting the next page, if any.

- `object: "page"`

  The object type. Always `page`.

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/agents/environments/$ENVIRONMENT_ID/files \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "environment_id": "environment_id",
      "object": "agent.environment.file",
      "path": "path",
      "size_bytes": 0
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "page"
}
```
