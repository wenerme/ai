# Versions

## Create

**post** `/skills/{skill_id}/versions`

Create a new immutable skill version.

### Path Parameters

- `skill_id: string`

### Body Parameters

- `files: array of string or string`

  Skill files to upload (directory upload) or a single zip file.

  - `UnionMember0 = array of string`

    Skill files to upload (directory upload) or a single zip file.

  - `UnionMember1 = string`

    Skill zip file to upload.

- `default: optional boolean`

  Whether to set this version as the default.

### Returns

- `SkillVersion = object { id, created_at, description, 4 more }`

  - `id: string`

    Unique identifier for the skill version.

  - `created_at: number`

    Unix timestamp (seconds) for when the version was created.

  - `description: string`

    Description of the skill version.

  - `name: string`

    Name of the skill version.

  - `object: "skill.version"`

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
    -F files=[null]
```

## List

**get** `/skills/{skill_id}/versions`

List skill versions for a skill.

### Path Parameters

- `skill_id: string`

### Query Parameters

- `after: optional string`

  The skill version ID to start after.

- `limit: optional number`

  Number of versions to retrieve.

- `order: optional "asc" or "desc"`

  Sort order of results by version number.

  - `"asc"`

  - `"desc"`

### Returns

- `SkillVersionList = object { data, first_id, has_more, 2 more }`

  - `data: array of SkillVersion`

    A list of items

    - `id: string`

      Unique identifier for the skill version.

    - `created_at: number`

      Unix timestamp (seconds) for when the version was created.

    - `description: string`

      Description of the skill version.

    - `name: string`

      Name of the skill version.

    - `object: "skill.version"`

      The object type, which is `skill.version`.

      - `"skill.version"`

    - `skill_id: string`

      Identifier of the skill for this version.

    - `version: string`

      Version number for this skill.

  - `first_id: string`

    The ID of the first item in the list.

  - `has_more: boolean`

    Whether there are more items available.

  - `last_id: string`

    The ID of the last item in the list.

  - `object: "list"`

    The type of object returned, must be `list`.

    - `"list"`

### Example

```http
curl https://api.openai.com/v1/skills/$SKILL_ID/versions \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Retrieve

**get** `/skills/{skill_id}/versions/{version}`

Get a specific skill version.

### Path Parameters

- `skill_id: string`

- `version: string`

  The version number to retrieve.

### Returns

- `SkillVersion = object { id, created_at, description, 4 more }`

  - `id: string`

    Unique identifier for the skill version.

  - `created_at: number`

    Unix timestamp (seconds) for when the version was created.

  - `description: string`

    Description of the skill version.

  - `name: string`

    Name of the skill version.

  - `object: "skill.version"`

    The object type, which is `skill.version`.

    - `"skill.version"`

  - `skill_id: string`

    Identifier of the skill for this version.

  - `version: string`

    Version number for this skill.

### Example

```http
curl https://api.openai.com/v1/skills/$SKILL_ID/versions/$VERSION \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Delete

**delete** `/skills/{skill_id}/versions/{version}`

Delete a skill version.

### Path Parameters

- `skill_id: string`

- `version: string`

  The skill version number.

### Returns

- `DeletedSkillVersion = object { id, deleted, object, version }`

  - `id: string`

  - `deleted: boolean`

  - `object: "skill.version.deleted"`

    - `"skill.version.deleted"`

  - `version: string`

    The deleted skill version.

### Example

```http
curl https://api.openai.com/v1/skills/$SKILL_ID/versions/$VERSION \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Domain Types

### Deleted Skill Version

- `DeletedSkillVersion = object { id, deleted, object, version }`

  - `id: string`

  - `deleted: boolean`

  - `object: "skill.version.deleted"`

    - `"skill.version.deleted"`

  - `version: string`

    The deleted skill version.

### Skill Version

- `SkillVersion = object { id, created_at, description, 4 more }`

  - `id: string`

    Unique identifier for the skill version.

  - `created_at: number`

    Unix timestamp (seconds) for when the version was created.

  - `description: string`

    Description of the skill version.

  - `name: string`

    Name of the skill version.

  - `object: "skill.version"`

    The object type, which is `skill.version`.

    - `"skill.version"`

  - `skill_id: string`

    Identifier of the skill for this version.

  - `version: string`

    Version number for this skill.

### Skill Version List

- `SkillVersionList = object { data, first_id, has_more, 2 more }`

  - `data: array of SkillVersion`

    A list of items

    - `id: string`

      Unique identifier for the skill version.

    - `created_at: number`

      Unix timestamp (seconds) for when the version was created.

    - `description: string`

      Description of the skill version.

    - `name: string`

      Name of the skill version.

    - `object: "skill.version"`

      The object type, which is `skill.version`.

      - `"skill.version"`

    - `skill_id: string`

      Identifier of the skill for this version.

    - `version: string`

      Version number for this skill.

  - `first_id: string`

    The ID of the first item in the list.

  - `has_more: boolean`

    Whether there are more items available.

  - `last_id: string`

    The ID of the last item in the list.

  - `object: "list"`

    The type of object returned, must be `list`.

    - `"list"`

# Content

## Retrieve

**get** `/skills/{skill_id}/versions/{version}/content`

Download a skill version zip bundle.

### Path Parameters

- `skill_id: string`

- `version: string`

  The skill version number.

### Example

```http
curl https://api.openai.com/v1/skills/$SKILL_ID/versions/$VERSION/content \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
