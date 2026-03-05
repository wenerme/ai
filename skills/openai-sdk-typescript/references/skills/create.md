## Create

`client.skills.create(SkillCreateParamsbody?, RequestOptionsoptions?): Skill`

**post** `/skills`

Create a new skill.

### Parameters

- `body: SkillCreateParams`

  - `files?: Array<Uploadable> | Uploadable`

    Skill files to upload (directory upload) or a single zip file.

    - `Array<Uploadable>`

    - `Uploadable`

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

const skill = await client.skills.create();

console.log(skill.id);
```
