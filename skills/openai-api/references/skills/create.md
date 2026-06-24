## Create a new skill.

**post** `/skills`

Create a new skill.

### Body Parameters

- `files: array of string or string`

  Skill files to upload (directory upload) or a single zip file.

  - `array of string`

    Skill files to upload (directory upload) or a single zip file.

  - `string`

    Skill zip file to upload.

### Returns

- `Skill object { id, created_at, default_version, 4 more }`

  - `id: string`

    Unique identifier for the skill.

  - `created_at: number`

    Unix timestamp (seconds) for when the skill was created.

  - `default_version: string`

    Default version for the skill.

  - `description: string`

    Description of the skill.

  - `latest_version: string`

    Latest version for the skill.

  - `name: string`

    Name of the skill.

  - `object: "skill"`

    The object type, which is `skill`.

    - `"skill"`

### Example

```http
curl https://api.openai.com/v1/skills \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F files='["Example data"]'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "default_version": "default_version",
  "description": "description",
  "latest_version": "latest_version",
  "name": "name",
  "object": "skill"
}
```
