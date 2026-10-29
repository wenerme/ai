## List agent environments

**get** `/agents/environments`

Lists OpenAI-hosted environments owned by the authenticated principal. Requires access to the prewarming beta.

### Query Parameters

- `after: optional string`

  Return resources after this resource ID in the selected order.

  `minLength: 0`, `maxLength: 1048576`

- `limit: optional number`

  The maximum number of resources to return, between 1 and 100. Defaults to 20.

  `format: int64`, `minimum: 1`, `maximum: 100`

- `order: optional "asc" or "desc"`

  The order in which resources are returned. Defaults to `desc`.

  - `"asc"`

    Returns resources in ascending order.

  - `"desc"`

    Returns resources in descending order.

- `type: optional "openai_hosted"`

  The hosting type to list. Defaults to `openai_hosted`.

  - `"openai_hosted"`

### Returns

- `data: array of EnvironmentInfo`

  The resources returned in this page, in the requested sort order.

  `minItems: 0`, `maxItems: 2000`

  - `id: string`

    The ID of the environment.

    `minLength: 0`

  - `files: array of HostedEnvironmentFile`

    Files installed in the environment, without their contents.

    `minItems: 0`, `maxItems: 2000`

    - `HostedEnvironmentFileID object { id, file_id, path, 2 more }`

      A file copied from the OpenAI Files API.

      - `id: string`

        The session-scoped ID of the file in the execution environment.

        `minLength: 0`

      - `file_id: string`

        The ID of the uploaded file.

        `minLength: 0`

      - `path: string`

        The file's absolute path inside the environment.

        `minLength: 0`

      - `size_bytes: number`

        The decoded file size in bytes.

        `format: int64`, `minimum: 0`

      - `type: "file_id"`

        The type of the object. Always `file_id`.

        - `"file_id"`

    - `Inline object { id, path, size_bytes, type }`

      A file supplied inline when the session was created.

      - `id: string`

        The session-scoped ID of the file in the execution environment.

        `minLength: 0`

      - `path: string`

        The file's absolute path inside the environment.

        `minLength: 0`

      - `size_bytes: number`

        The decoded file size in bytes.

        `format: int64`, `minimum: 0`

      - `type: "inline"`

        The type of the object. Always `inline`.

        - `"inline"`

  - `object: "agent.environment"`

    The object type. Always `agent.environment`.

    - `"agent.environment"`

  - `plugins: array of HostedPlugin`

    Plugins installed in the environment, without their archive contents.

    `minItems: 0`, `maxItems: 2000`

    - `description: string`

      The installed plugin description.

      `minLength: 0`

    - `name: string`

      The installed plugin name.

      `minLength: 0`

    - `type: "inline"`

      The type of the object. Always `inline`.

      - `"inline"`

  - `skills: array of HostedSkill`

    Skills installed in the environment, without their archive contents.

    `minItems: 0`, `maxItems: 2000`

    - `HostedSkillReference object { description, name, skill_id, 2 more }`

      A skill installed from the Skills API.

      - `description: string`

        The installed skill description.

        `minLength: 0`

      - `name: string`

        The installed skill name.

        `minLength: 0`

      - `skill_id: string`

        The referenced skill ID.

        `minLength: 0`

      - `type: "skill_reference"`

        The type of the object. Always `skill_reference`.

        - `"skill_reference"`

      - `version: string`

        The concrete skill version installed for this session.

        `minLength: 0`

    - `Inline object { description, name, type }`

      A skill installed from an inline ZIP archive.

      - `description: string`

        The installed skill description.

        `minLength: 0`

      - `name: string`

        The installed skill name.

        `minLength: 0`

      - `type: "inline"`

        The type of the object. Always `inline`.

        - `"inline"`

  - `status: "pending" or "ready" or "connected" or 4 more`

    The current environment connection status.

    - `"pending"`

    - `"ready"`

      Provisioning succeeded and the environment is available for attachment or use.

    - `"connected"`

    - `"disconnected"`

    - `"suspended"`

      The sandbox is stopped and can be resumed from its private checkpoint.

    - `"expired"`

    - `"failed"`

  - `type: "openai_hosted" or "self_hosted"`

    Whether the environment is hosted by OpenAI or by the application.

    - `"openai_hosted"`

    - `"self_hosted"`

- `first_id: string or null`

  The ID of the first resource in `data`, or `null` if the page is empty.

  `minLength: 0`

- `has_more: boolean`

  Whether there are more resources to retrieve after this page.

- `last_id: string or null`

  The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.

  `minLength: 0`

- `object: "list"`

  The object type, which is always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/agents/environments \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "files": [
        {
          "id": "id",
          "file_id": "file_id",
          "path": "path",
          "size_bytes": 0,
          "type": "file_id"
        }
      ],
      "object": "agent.environment",
      "plugins": [
        {
          "description": "description",
          "name": "name",
          "type": "inline"
        }
      ],
      "skills": [
        {
          "description": "description",
          "name": "name",
          "skill_id": "skill_id",
          "type": "skill_reference",
          "version": "version"
        }
      ],
      "status": "pending",
      "type": "openai_hosted"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```
