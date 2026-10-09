## Create an agent environment

**post** `/agents/environments`

Creates an OpenAI-hosted environment before creating a session. Requires access to the prewarming beta.

### Header Parameters

- `"Idempotency-Key": optional string`

### Body Parameters

- `environment: object { type, capability_directories, desktop, 8 more }`

  The required hosting type and its configuration.

  - `type: "openai_hosted"`

    The type of the object. Always `openai_hosted`.

    - `"openai_hosted"`

  - `capability_directories: optional array of string or null`

    Directories that contain capabilities exposed to the agent. Defaults to an empty list.

  - `desktop: optional object { enabled }  or null`

    Desktop provisioning. Omission or null inherits the template setting, or defaults to disabled.

    - `enabled: boolean`

      Whether to provision the desktop and its browser proxy.

  - `env: optional map[string] or null`

    Environment variables made available to the agent.

  - `environment_template_id: optional string`

    A reusable hosted template applied before inline configuration. Omitted fields inherit the template; network overrides cannot broaden its policy.

  - `files: optional array of HostedEnvironmentFileParam or null`

    Files available before the agent starts. Defaults to an empty list.

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

  - `network: optional object { access, allowed_domains, blocked_domains }  or null`

    Network access policy for the environment. If omitted, the API version determines whether network access is enabled or disabled.

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

    - `blocked_domains: optional array of string or null`

      Domains blocked for both executor and browser when access is restricted. A nonempty list requires `access: restricted` and cannot be combined with nonempty `allowed_domains`. Wildcard domains are not supported.

  - `packages: optional object { npm, python, system }  or null`

    Packages to install in the environment. Defaults to empty package lists.

    - `npm: optional array of string or null`

      npm packages to install globally. Defaults to an empty list.

    - `python: optional array of string or null`

      Python packages to install. Defaults to an empty list.

    - `system: optional array of string or null`

      System packages to install. Defaults to an empty list.

  - `plugins: optional array of HostedPluginParam or null`

    Plugins provided as inline ZIP archives. Defaults to an empty list.

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

    Ordered, confidential setup commands. Command bodies are never returned.

    - `command: string`

      The shell command to execute.

    - `cwd: optional string or null`

      The absolute working directory. Defaults to `/workspace`.

  - `skills: optional array of HostedSkillParam or null`

    Skills referenced by ID or provided as inline ZIP archives. Defaults to an empty list.

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

- `vault_ids: optional array of string or null`

  The IDs of up to 10 vaults made available to an OpenAI-hosted environment.

### Returns

- `EnvironmentInfo object { id, files, object, 4 more }`

  Safe metadata for a first-class execution environment.

  - `id: string`

    The ID of the environment.

  - `files: array of HostedEnvironmentFile`

    Files installed in the environment, without their contents.

    - `HostedEnvironmentFileID object { id, file_id, path, 2 more }`

      A file copied from the OpenAI Files API.

      - `id: string`

        The session-scoped ID of the file in the execution environment.

      - `file_id: string`

        The ID of the uploaded file.

      - `path: string`

        The file's absolute path inside the environment.

      - `size_bytes: number`

        The decoded file size in bytes.

      - `type: "file_id"`

        The type of the object. Always `file_id`.

        - `"file_id"`

    - `Inline object { id, path, size_bytes, type }`

      A file supplied inline when the session was created.

      - `id: string`

        The session-scoped ID of the file in the execution environment.

      - `path: string`

        The file's absolute path inside the environment.

      - `size_bytes: number`

        The decoded file size in bytes.

      - `type: "inline"`

        The type of the object. Always `inline`.

        - `"inline"`

  - `object: "agent.environment"`

    The object type. Always `agent.environment`.

    - `"agent.environment"`

  - `plugins: array of HostedPlugin`

    Plugins installed in the environment, without their archive contents.

    - `description: string`

      The installed plugin description.

    - `name: string`

      The installed plugin name.

    - `type: "inline"`

      The type of the object. Always `inline`.

      - `"inline"`

  - `skills: array of HostedSkill`

    Skills installed in the environment, without their archive contents.

    - `HostedSkillReference object { description, name, skill_id, 2 more }`

      A skill installed from the Skills API.

      - `description: string`

        The installed skill description.

      - `name: string`

        The installed skill name.

      - `skill_id: string`

        The referenced skill ID.

      - `type: "skill_reference"`

        The type of the object. Always `skill_reference`.

        - `"skill_reference"`

      - `version: string`

        The concrete skill version installed for this session.

    - `Inline object { description, name, type }`

      A skill installed from an inline ZIP archive.

      - `description: string`

        The installed skill description.

      - `name: string`

        The installed skill name.

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

### Example

```http
curl https://api.openai.com/v1/agents/environments \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "environment": {
            "type": "openai_hosted"
          }
        }'
```

#### Response

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
