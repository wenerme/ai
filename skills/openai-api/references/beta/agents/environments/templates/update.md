## Update an agent environment template

**post** `/agents/environments/templates/{environment_template_id}`

Updates reusable environment configuration without returning confidential values. See [reusing a hosted setup](/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).

### Path Parameters

- `environment_template_id: string`

  The ID of the reusable environment template.

  `minLength: 0`, `maxLength: 1048576`

### Body Parameters

- `capability_directories: optional array of string or null`

  Directories that expose capabilities to the agent.

  `minItems: 0`, `maxItems: 16384`

- `desktop: optional object { enabled }  or null`

  Replacement desktop configuration, or null to disable the desktop.

  - `enabled: boolean`

    Whether to provision the desktop and its browser proxy.

- `env: optional map[string] or null`

  Replacement confidential environment values.

- `files: optional array of HostedEnvironmentFileParam or null`

  Replacement file configuration materialized for each new session.

  `minItems: 0`, `maxItems: 50`

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

- `name: optional string or null`

  A replacement human-readable display name, or `null` to clear the name.

  `minLength: 1`, `maxLength: 256`

- `network: optional object { access, allowed_domains, blocked_domains }  or null`

  Network access available after setup completes. Omit to preserve the current policy, or pass `null` to reset to the default policy.

  - `access: "enabled" or "disabled" or "restricted"`

    The environment's network access mode.

    - `"enabled"`

      Allows unrestricted network access.

    - `"disabled"`

      Disables network access.

    - `"restricted"`

      Applies the configured domain restrictions.

  - `allowed_domains: optional array of string or null`

    Domains the environment may access when network access is restricted.

    `minItems: 0`, `maxItems: 16384`

  - `blocked_domains: optional array of string or null`

    Domains blocked for both executor and browser when access is restricted. A nonempty list requires `access: restricted` and cannot be combined with nonempty `allowed_domains`. Wildcard domains are not supported.

    `minItems: 0`, `maxItems: 100`

- `packages: optional object { npm, python, system }  or null`

  Packages installed before the runtime network policy applies.

  - `npm: optional array of string or null`

    npm packages to install globally. Defaults to an empty list.

    `minItems: 0`, `maxItems: 16384`

  - `python: optional array of string or null`

    Python packages to install. Defaults to an empty list.

    `minItems: 0`, `maxItems: 16384`

  - `system: optional array of string or null`

    System packages to install. Defaults to an empty list.

    `minItems: 0`, `maxItems: 16384`

- `plugins: optional array of HostedPluginParam or null`

  Replacement plugin configuration installed for each new session.

  `minItems: 0`, `maxItems: 32`

  - `description: string`

    The plugin description declared in `.codex-plugin/plugin.json`.

    `minLength: 0`, `maxLength: 1048576`

  - `name: string`

    The plugin name declared in `.codex-plugin/plugin.json`.

    `minLength: 1`, `maxLength: 64`

  - `source: InlineCapabilitySourceParam`

    Provides ZIP bytes encoded with standard base64.

    - `data: string`

      Standard-base64 encoded ZIP archive bytes.

      `minLength: 1`, `maxLength: 70254592`

    - `media_type: "application/zip" (default: "application/zip")`

      The archive media type, always `application/zip`.

      - `"application/zip"`

        A ZIP archive.

    - `type: "base64" (default: "base64")`

      The type of the object. Always `base64`.

      - `"base64"`

  - `type: "inline" (default: "inline")`

    The type of the object. Always `inline`.

    - `"inline"`

- `setup_commands: optional array of SetupCommandParam or null`

  Replacement confidential setup commands, never included in returned resources.

  `minItems: 0`, `maxItems: 16`

  - `command: string`

    The shell command to execute.

    `minLength: 0`, `maxLength: 65536`

  - `cwd: optional string or null`

    The absolute working directory. Defaults to `/workspace`.

    `minLength: 0`, `maxLength: 4096`

- `skills: optional array of HostedSkillParam or null`

  Replacement skill configuration installed for each new session.

  `minItems: 0`, `maxItems: 200`

  - `SkillReference object { skill_id, type, version }`

    References a skill uploaded through the Skills API.

    - `skill_id: string`

      The ID of the skill created through `/v1/skills`.

      `minLength: 1`, `maxLength: 64`

    - `type: "skill_reference" (default: "skill_reference")`

      The type of the object. Always `skill_reference`.

      - `"skill_reference"`

    - `version: optional string or null`

      The skill version, a positive integer or `latest`; omission selects the default.

      `minLength: 0`, `maxLength: 1048576`

  - `Inline object { description, name, source, type }`

    Supplies a skill ZIP directly in the session request.

    - `description: string`

      The skill description declared in `SKILL.md`.

      `minLength: 0`, `maxLength: 1048576`

    - `name: string`

      The skill name declared in `SKILL.md`.

      `minLength: 1`, `maxLength: 64`

    - `source: InlineCapabilitySourceParam`

      Provides ZIP bytes encoded with standard base64.

    - `type: "inline" (default: "inline")`

      The type of the object. Always `inline`.

      - `"inline"`

### Returns

- `EnvironmentTemplate object { id, capability_directories, created_at, 9 more }`

  Reusable configuration that provisions a fresh OpenAI-hosted environment for each session.

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

### Example

```http
curl https://api.openai.com/v1/agents/environments/templates/$ENVIRONMENT_TEMPLATE_ID \
    -X POST \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 200 — Example

```json
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
```
