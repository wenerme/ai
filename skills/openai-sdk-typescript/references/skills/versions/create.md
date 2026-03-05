## Create

`client.skills.versions.create(stringskillID, VersionCreateParamsbody?, RequestOptionsoptions?): SkillVersion`

**post** `/skills/{skill_id}/versions`

Create a new immutable skill version.

### Parameters

- `skillID: string`

- `body: VersionCreateParams`

  - `_default?: boolean`

    Whether to set this version as the default.

  - `files?: Array<Uploadable> | Uploadable`

    Skill files to upload (directory upload) or a single zip file.

    - `Array<Uploadable>`

    - `Uploadable`

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

const skillVersion = await client.skills.versions.create('skill_123');

console.log(skillVersion.id);
```
