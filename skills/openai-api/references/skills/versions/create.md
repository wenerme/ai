## Create Skill Version

**post** `/skills/{skill_id}/versions`

Create a new immutable skill version.

### Path Parameters

- `skill_id: string`

  The identifier of the skill to version.

### Body Parameters

Content type: `application/json`

- `files: array of string or string`

  Skill files to upload (directory upload) or a single zip file.

  - `array of string`

    Skill files to upload (directory upload) or a single zip file.

    `maxItems: 500`

  - `string`

    Skill zip file to upload.

- `default: optional boolean`

  Whether to set this version as the default.

### Returns

- `SkillVersion object { id, created_at, description, 4 more }`

  - `id: string`

    Unique identifier for the skill version.

  - `created_at: integer`

    Unix timestamp (seconds) for when the version was created.

    `format: unixtime`

  - `description: string`

    Description of the skill version.

  - `name: string`

    Name of the skill version.

  - `object: "skill.version" (default: "skill.version")`

    The object type, which is `skill.version`.

    - `"skill.version"`

  - `skill_id: string`

    Identifier of the skill for this version.

  - `version: string`

    Version number for this skill.

### Example

```http
curl https://api.openai.com/v1/skills/$SKILL_ID/versions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "files": [
            "string"
          ]
        }'
```

#### 200 — Example

```json
{
  "id": "id",
  "created_at": 0,
  "description": "description",
  "name": "name",
  "object": "skill.version",
  "skill_id": "skill_id",
  "version": "version"
}
```
