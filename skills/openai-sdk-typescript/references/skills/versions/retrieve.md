## Retrieve

`client.skills.versions.retrieve(stringversion, VersionRetrieveParamsparams, RequestOptionsoptions?): SkillVersion`

**get** `/skills/{skill_id}/versions/{version}`

Get a specific skill version.

### Parameters

- `version: string`

  The version number to retrieve.

- `params: VersionRetrieveParams`

  - `skill_id: string`

    The identifier of the skill.

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

const skillVersion = await client.skills.versions.retrieve('version', { skill_id: 'skill_123' });

console.log(skillVersion.id);
```
