## Retrieve

`client.skills.retrieve(stringskillID, RequestOptionsoptions?): Skill`

**get** `/skills/{skill_id}`

Get a skill by its ID.

### Parameters

- `skillID: string`

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

const skill = await client.skills.retrieve('skill_123');

console.log(skill.id);
```
