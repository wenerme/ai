## List

`client.skills.versions.list(stringskillID, VersionListParamsquery?, RequestOptionsoptions?): CursorPage<SkillVersion>`

**get** `/skills/{skill_id}/versions`

List skill versions for a skill.

### Parameters

- `skillID: string`

- `query: VersionListParams`

  - `after?: string`

    The skill version ID to start after.

  - `limit?: number`

    Number of versions to retrieve.

  - `order?: "asc" | "desc"`

    Sort order of results by version number.

    - `"asc"`

    - `"desc"`

### Returns

- `SkillVersion`

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

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const skillVersion of client.skills.versions.list('skill_123')) {
  console.log(skillVersion.id);
}
```
