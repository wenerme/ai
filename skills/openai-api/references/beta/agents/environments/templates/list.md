## List agent environment templates

**get** `/agents/environments/templates`

Lists reusable environment templates without returning confidential values. See [reusing a hosted setup](/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).

### Query Parameters

- `after: optional string`

  Return resources after this resource ID in the selected order.

  `minLength: 0`, `maxLength: 1048576`

- `limit: optional integer (default: 20)`

  The maximum number of resources to return, between 1 and 100. Defaults to 20.

  `format: int64`, `minimum: 1`, `maximum: 100`

- `order: optional "asc" or "desc" (default: "desc")`

  The order in which resources are returned. Defaults to `desc`.

  - `"asc"`

    Returns resources in ascending order.

  - `"desc"`

    Returns resources in descending order.

### Returns

- `data: array of EnvironmentTemplate`

  The resources returned in this page, in the requested sort order.

  `minItems: 0`, `maxItems: 2000`

  - `id: string`

    The ID of the reusable environment template.

    `minLength: 0`

  - `capability_directories: array of string`

    Directories that expose capabilities to the agent.

    `minItems: 0`, `maxItems: 2000`

  - `created_at: integer`

    The Unix timestamp, in seconds, when the template was created.

    `format: int64`

  - `desktop: object { enabled }`

    Desktop configuration for each OpenAI-hosted environment.

    - `enabled: boolean`

      Whether the environment provisions a desktop and browser proxy.

  - `files: array of FileID { file_id, path, type }  or Inline { path, size_bytes, type }`

    Safe file metadata, excluding contents and session-scoped file IDs.

    `minItems: 0`, `maxItems: 50`

    - `FileID object { file_id, path, type }`

      A project-scoped Files API reference resolved separately for each session.

      - `file_id: string`

        The ID of the uploaded file.

        `minLength: 0`

      - `path: string`

        The file's absolute path inside the environment.

        `minLength: 0`

      - `type: "file_id" (default: "file_id")`

        The type of the object. Always `file_id`.

        - `"file_id"`

    - `Inline object { path, size_bytes, type }`

      Metadata for confidential inline file contents.

      - `path: string`

        The file's absolute path inside the environment.

        `minLength: 0`

      - `size_bytes: integer`

        The decoded size of the inline file in bytes.

        `format: int64`, `minimum: 0`

      - `type: "inline" (default: "inline")`

        The type of the object. Always `inline`.

        - `"inline"`

  - `name: string or null`

    An optional human-readable display name for the template.

    `minLength: 0`

  - `network: object { access, allowed_domains }`

    Runtime network access for each OpenAI-hosted environment.

    - `access: "enabled" or "disabled" or "restricted"`

      The environment's network access mode.

      - `"enabled"`

        Allows unrestricted network access.

      - `"disabled"`

        Disables network access.

      - `"restricted"`

        Applies the configured domain restrictions.

    - `allowed_domains: array of string`

      Domains the environment may access when network access is restricted.

      `minItems: 0`, `maxItems: 2000`

  - `object: "agent.environment.template" (default: "agent.environment.template")`

    The object type. Always `agent.environment.template`.

    - `"agent.environment.template"`

  - `packages: object { npm, python, system }`

    Packages installed in each fresh OpenAI-hosted environment.

    - `npm: array of string`

      npm packages installed globally in the environment.

      `minItems: 0`, `maxItems: 16384`

    - `python: array of string`

      Python packages installed in the environment.

      `minItems: 0`, `maxItems: 16384`

    - `system: array of string`

      System packages installed in the environment.

      `minItems: 0`, `maxItems: 16384`

  - `plugins: array of HostedPlugin`

    Safe plugin metadata, excluding inline archive contents.

    `minItems: 0`, `maxItems: 32`

    - `description: string`

      The installed plugin description.

      `minLength: 0`

    - `name: string`

      The installed plugin name.

      `minLength: 0`

    - `type: "inline" (default: "inline")`

      The type of the object. Always `inline`.

      - `"inline"`

  - `skills: array of SkillReference { skill_id, type, version }  or Inline { description, name, type }`

    Safe skill metadata, preserving unresolved version selectors.

    `minItems: 0`, `maxItems: 200`

    - `SkillReference object { skill_id, type, version }`

      A skill resolved afresh from the Skills API whenever a session starts.

      - `skill_id: string`

        The referenced skill ID.

        `minLength: 0`

      - `type: "skill_reference" (default: "skill_reference")`

        The type of the object. Always `skill_reference`.

        - `"skill_reference"`

      - `version: string or null`

        The requested version selector, including `latest`.

        `minLength: 0`

    - `Inline object { description, name, type }`

      Safe metadata for an inline skill archive.

      - `description: string`

        The skill description declared in `SKILL.md`.

        `minLength: 0`

      - `name: string`

        The skill name declared in `SKILL.md`.

        `minLength: 0`

      - `type: "inline" (default: "inline")`

        The type of the object. Always `inline`.

        - `"inline"`

  - `updated_at: integer`

    The Unix timestamp, in seconds, when the template was last updated.

    `format: int64`

- `first_id: string or null`

  The ID of the first resource in `data`, or `null` if the page is empty.

  `minLength: 0`

- `has_more: boolean`

  Whether there are more resources to retrieve after this page.

- `last_id: string or null`

  The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.

  `minLength: 0`

- `object: "list" (default: "list")`

  The object type, which is always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/agents/environments/templates \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 200 — Example

```json
{
  "data": [
    {
      "id": "id",
      "capability_directories": [
        "string"
      ],
      "created_at": 0,
      "desktop": {
        "enabled": true
      },
      "files": [
        {
          "file_id": "file_id",
          "path": "path",
          "type": "file_id"
        }
      ],
      "name": "name",
      "network": {
        "access": "enabled",
        "allowed_domains": [
          "string"
        ]
      },
      "object": "agent.environment.template",
      "packages": {
        "npm": [
          "string"
        ],
        "python": [
          "string"
        ],
        "system": [
          "string"
        ]
      },
      "plugins": [
        {
          "description": "description",
          "name": "name",
          "type": "inline"
        }
      ],
      "skills": [
        {
          "skill_id": "skill_id",
          "type": "skill_reference",
          "version": "version"
        }
      ],
      "updated_at": 0
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```
