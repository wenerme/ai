## Retrieve an agent environment

**get** `/agents/environments/{environment_id}`

Retrieves an execution environment's connection status and safe installed metadata. See [environment lifecycle](/api/docs/guides/agents-api/environments/lifecycle).

### Path Parameters

- `environment_id: string`

  The ID of the environment.

  `minLength: 0`, `maxLength: 1048576`

### Returns

- `EnvironmentInfo object { id, files, object, 4 more }`

  Safe metadata for a first-class execution environment.

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

      - `size_bytes: integer`

        The decoded file size in bytes.

        `format: int64`, `minimum: 0`

      - `type: "file_id" (default: "file_id")`

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

      - `size_bytes: integer`

        The decoded file size in bytes.

        `format: int64`, `minimum: 0`

      - `type: "inline" (default: "inline")`

        The type of the object. Always `inline`.

        - `"inline"`

  - `object: "agent.environment" (default: "agent.environment")`

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

    - `type: "inline" (default: "inline")`

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

      - `type: "skill_reference" (default: "skill_reference")`

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

      - `type: "inline" (default: "inline")`

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

### Example

```http
curl https://api.openai.com/v1/agents/environments/$ENVIRONMENT_ID \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 200 — Example

```json
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
```
