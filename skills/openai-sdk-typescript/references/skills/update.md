## Update

`client.skills.update(stringskillID, SkillUpdateParamsbody, RequestOptionsoptions?): Skill`

**post** `/skills/{skill_id}`

Update the default version pointer for a skill.

### Parameters

- `skillID: string`

- `body: SkillUpdateParams`

  - `default_version: string`

    The skill version number to set as default.

### Returns

- `Skill`

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

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const skill = await client.skills.update('skill_123', { default_version: 'default_version' });

console.log(skill.id);
```
