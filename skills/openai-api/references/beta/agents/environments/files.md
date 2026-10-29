# Files

## Write an agent environment file

**post** `/agents/environments/{environment_id}/files`

Copies inline bytes or a Files API file into a connected execution environment, replacing an existing regular file at the same path. Upload between turns and wait for success before starting the next turn. See [environment files](/api/docs/guides/agents-api/environments/files).

### Path Parameters

- `environment_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Body Parameters

- `hosted_environment_file_param: HostedEnvironmentFileParam`

  A file materialized in an OpenAI-hosted execution environment.

  - `FileID object { file_id, path, type }`

    A file previously uploaded through the OpenAI Files API.

    - `file_id: string`

      The ID of the uploaded file.

      `minLength: 1`, `maxLength: 256`

    - `path: string`

      The absolute destination path inside `/workspace`.

      `minLength: 1`, `maxLength: 4096`

    - `type: "file_id"`

      The type of the object. Always `file_id`.

      - `"file_id"`

  - `Inline object { data, path, type }`

    A file supplied directly as standard-base64 data.

    - `data: string`

      The standard-base64-encoded file contents.

      `minLength: 0`, `maxLength: 6990508`

    - `path: string`

      The absolute destination path inside `/workspace`.

      `minLength: 1`, `maxLength: 4096`

    - `type: "inline"`

      The type of the object. Always `inline`.

      - `"inline"`

### Returns

- `EnvironmentFile object { environment_id, object, path, size_bytes }`

  A live file in an execution environment.

  - `environment_id: string`

    The ID of the environment containing this file.

    `minLength: 0`

  - `object: "agent.environment.file"`

    The object type. Always `agent.environment.file`.

    - `"agent.environment.file"`

  - `path: string`

    The absolute file path inside the environment's workspace.

    `minLength: 0`

  - `size_bytes: number`

    The file size in bytes.

    `format: int64`, `minimum: 0`

### Example

```http
curl https://api.openai.com/v1/agents/environments/$ENVIRONMENT_ID/files \
    -X POST \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "environment_id": "environment_id",
  "object": "agent.environment.file",
  "path": "path",
  "size_bytes": 0
}
```

## List agent environment files

**get** `/agents/environments/{environment_id}/files`

Lists live files on a connected execution environment with optional directory filtering and opaque cursor pagination. See [environment files](/api/docs/guides/agents-api/environments/files).

### Path Parameters

- `environment_id: string`

  `minLength: 0`, `maxLength: 1048576`

### Query Parameters

- `limit: optional number or null`

  The maximum number of files to return, between 1 and 100.

  `format: int64`, `minimum: 1`, `maximum: 100`

- `order: optional "asc" or "desc"`

  Sort by case-sensitive path components. Defaults to descending.

  - `"asc"`

    Returns resources in ascending order.

  - `"desc"`

    Returns resources in descending order.

- `page: optional string`

  The opaque token from the previous page. Keep the same path, order, and limit.

  `minLength: 0`, `maxLength: 1048576`

- `path: optional string or null`

  Restrict the listing to this absolute workspace directory.

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `data: array of EnvironmentFile`

  Files available on the current page.

  `minItems: 0`, `maxItems: 2000`

  - `environment_id: string`

    The ID of the environment containing this file.

    `minLength: 0`

  - `object: "agent.environment.file"`

    The object type. Always `agent.environment.file`.

    - `"agent.environment.file"`

  - `path: string`

    The absolute file path inside the environment's workspace.

    `minLength: 0`

  - `size_bytes: number`

    The file size in bytes.

    `format: int64`, `minimum: 0`

- `has_more: boolean`

  Whether more files follow this page.

- `next: string or null`

  The opaque cursor to use when requesting the next page, if any.

  `minLength: 0`

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

## Domain Types

### Environment File

- `EnvironmentFile object { environment_id, object, path, size_bytes }`

  A live file in an execution environment.

  - `environment_id: string`

    The ID of the environment containing this file.

    `minLength: 0`

  - `object: "agent.environment.file"`

    The object type. Always `agent.environment.file`.

    - `"agent.environment.file"`

  - `path: string`

    The absolute file path inside the environment's workspace.

    `minLength: 0`

  - `size_bytes: number`

    The file size in bytes.

    `format: int64`, `minimum: 0`
