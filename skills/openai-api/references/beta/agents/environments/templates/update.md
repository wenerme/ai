## Update an agent environment template

**post** `/agents/environments/templates/{environment_template_id}`

Updates reusable environment configuration without returning confidential values. See [reusing a hosted setup](/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).

### Path Parameters

- `environment_template_id: string`

### Body Parameters

- `capability_directories: optional array of string or null`

  Directories that expose capabilities to the agent.

- `env: optional map[string] or null`

  Replacement confidential environment values.

- `files: optional array of HostedEnvironmentFileParam or null`

  Replacement file configuration materialized for each new session.

  - `FileID object { file_id, path, type }`

    A file previously uploaded through the OpenAI Files API.

    - `file_id: string`

      The ID of the uploaded file.

    - `path: string`

      The absolute destination path inside `/workspace`.

    - `type: "file_id"`

      The type of the object. Always `file_id`.

      - `"file_id"`

  - `Inline object { data, path, type }`

    A file supplied directly as standard-base64 data.

    - `data: string`

      The standard-base64-encoded file contents.

    - `path: string`

      The absolute destination path inside `/workspace`.

    - `type: "inline"`

      The type of the object. Always `inline`.

      - `"inline"`

- `name: optional string or null`

  A replacement human-readable display name, or `null` to clear the name.

- `network: optional object { access, allowed_domains }  or null`

  Network access for an OpenAI-hosted environment.

  - `access: "enabled" or "disabled" or "restricted"`

    The environment's network access mode.

    - `"enabled"`

      Allows unrestricted network access, matching an omitted network policy.

    - `"disabled"`

      Disables network access.

    - `"restricted"`

      Allows access only to configured domains.

  - `allowed_domains: optional array of string or null`

    Domains the environment may access when network access is restricted.

- `packages: optional object { npm, python, system }  or null`

  Packages to install in an OpenAI-hosted environment.

  - `npm: optional array of string or null`

    npm packages to install globally. Defaults to an empty list.

  - `python: optional array of string or null`

    Python packages to install. Defaults to an empty list.

  - `system: optional array of string or null`

    System packages to install. Defaults to an empty list.

- `plugins: optional array of HostedPluginParam or null`

  Replacement plugin configuration installed for each new session.

  - `description: string`

    The plugin description declared in `.codex-plugin/plugin.json`.

  - `name: string`

    The plugin name declared in `.codex-plugin/plugin.json`.

  - `source: InlineCapabilitySourceParam`

    Provides ZIP bytes encoded with standard base64.

    - `data: string`

      Standard-base64 encoded ZIP archive bytes.

    - `media_type: "application/zip"`

      The archive media type, always `application/zip`.

      - `"application/zip"`

        A ZIP archive.

    - `type: "base64"`

      The type of the object. Always `base64`.

      - `"base64"`

  - `type: "inline"`

    The type of the object. Always `inline`.

    - `"inline"`

- `setup_commands: optional array of SetupCommandParam or null`

  Replacement confidential setup commands, never included in returned resources.

  - `command: string`

    The shell command to execute.

  - `cwd: optional string or null`

    The absolute working directory. Defaults to `/workspace`.

- `skills: optional array of HostedSkillParam or null`

  Replacement skill configuration installed for each new session.

  - `SkillReference object { skill_id, type, version }`

    References a skill uploaded through the Skills API.

    - `skill_id: string`

      The ID of the skill created through `/v1/skills`.

    - `type: "skill_reference"`

      The type of the object. Always `skill_reference`.

      - `"skill_reference"`

    - `version: optional string or null`

      The skill version, a positive integer or `latest`; omission selects the default.

  - `Inline object { description, name, source, type }`

    Supplies a skill ZIP directly in the session request.

    - `description: string`

      The skill description declared in `SKILL.md`.

    - `name: string`

      The skill name declared in `SKILL.md`.

    - `source: InlineCapabilitySourceParam`

      Provides ZIP bytes encoded with standard base64.

    - `type: "inline"`

      The type of the object. Always `inline`.

      - `"inline"`

### Returns

- `EnvironmentTemplate object { id, capability_directories, created_at, 8 more }`

  Reusable configuration that provisions a fresh OpenAI-hosted environment for each session.

  - `id: string`

    The ID of the reusable environment template.

  - `capability_directories: array of string`

    Directories that expose capabilities to the agent.

  - `created_at: number`

    The Unix timestamp, in seconds, when the template was created.

  - `files: array of object { file_id, path, type }  or object { path, size_bytes, type }`

    Safe file metadata, excluding contents and session-scoped file IDs.

    - `FileID object { file_id, path, type }`

      A project-scoped Files API reference resolved separately for each session.

      - `file_id: string`

        The ID of the uploaded file.

      - `path: string`

        The file's absolute path inside the environment.

      - `type: "file_id"`

        The type of the object. Always `file_id`.

        - `"file_id"`

    - `Inline object { path, size_bytes, type }`

      Metadata for confidential inline file contents.

      - `path: string`

        The file's absolute path inside the environment.

      - `size_bytes: number`

        The decoded size of the inline file in bytes.

      - `type: "inline"`

        The type of the object. Always `inline`.

        - `"inline"`

  - `name: string or null`

    An optional human-readable display name for the template.

  - `network: object { access, allowed_domains }`

    Runtime network access for each OpenAI-hosted environment.

    - `access: "enabled" or "disabled" or "restricted"`

      The environment's network access mode.

      - `"enabled"`

        Allows unrestricted network access.

      - `"disabled"`

        Disables network access.

      - `"restricted"`

        Allows access only to configured domains.

    - `allowed_domains: array of string`

      Domains the environment may access when network access is restricted.

  - `object: "agent.environment.template"`

    The object type. Always `agent.environment.template`.

    - `"agent.environment.template"`

  - `packages: object { npm, python, system }`

    Packages installed in each fresh OpenAI-hosted environment.

    - `npm: array of string`

      npm packages installed globally in the environment.

    - `python: array of string`

      Python packages installed in the environment.

    - `system: array of string`

      System packages installed in the environment.

  - `plugins: array of HostedPlugin`

    Safe plugin metadata, excluding inline archive contents.

    - `description: string`

      The installed plugin description.

    - `name: string`

      The installed plugin name.

    - `type: "inline"`

      The type of the object. Always `inline`.

      - `"inline"`

  - `skills: array of object { skill_id, type, version }  or object { description, name, type }`

    Safe skill metadata, preserving unresolved version selectors.

    - `SkillReference object { skill_id, type, version }`

      A skill resolved afresh from the Skills API whenever a session starts.

      - `skill_id: string`

        The referenced skill ID.

      - `type: "skill_reference"`

        The type of the object. Always `skill_reference`.

        - `"skill_reference"`

      - `version: string or null`

        The requested version selector, including `latest`.

    - `Inline object { description, name, type }`

      Safe metadata for an inline skill archive.

      - `description: string`

        The skill description declared in `SKILL.md`.

      - `name: string`

        The skill name declared in `SKILL.md`.

      - `type: "inline"`

        The type of the object. Always `inline`.

        - `"inline"`

  - `updated_at: number`

    The Unix timestamp, in seconds, when the template was last updated.

### Example

```http
curl https://api.openai.com/v1/agents/environments/templates/$ENVIRONMENT_TEMPLATE_ID \
    -X POST \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "capability_directories": [
    "string"
  ],
  "created_at": 0,
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
```
