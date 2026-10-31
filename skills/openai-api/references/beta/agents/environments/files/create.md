## Write an agent environment file

**post** `/agents/environments/{environment_id}/files`

Copies inline bytes or a Files API file into a connected execution environment, replacing an existing regular file at the same path. Upload between turns and wait for success before starting the next turn. See [environment files](/api/docs/guides/agents-api/environments/files).

### Path Parameters

- `environment_id: string`

  The ID of the environment.

  `minLength: 0`, `maxLength: 1048576`

### Body Parameters

Content type: `application/json`

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

    - `type: "file_id" (default: "file_id")`

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

    - `type: "inline" (default: "inline")`

      The type of the object. Always `inline`.

      - `"inline"`

### Returns

- `EnvironmentFile object { environment_id, object, path, size_bytes }`

  A live file in an execution environment.

  - `environment_id: string`

    The ID of the environment containing this file.

    `minLength: 0`

  - `object: "agent.environment.file" (default: "agent.environment.file")`

    The object type. Always `agent.environment.file`.

    - `"agent.environment.file"`

  - `path: string`

    The absolute file path inside the environment's workspace.

    `minLength: 0`

  - `size_bytes: integer`

    The file size in bytes.

    `format: int64`, `minimum: 0`

### Example

```http
curl https://api.openai.com/v1/agents/environments/$ENVIRONMENT_ID/files \
    -X POST \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 201 — Example

```json
{
  "environment_id": "environment_id",
  "object": "agent.environment.file",
  "path": "path",
  "size_bytes": 0
}
```
