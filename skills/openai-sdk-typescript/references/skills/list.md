## List

`client.skills.list(SkillListParamsquery?, RequestOptionsoptions?): CursorPage<Skill>`

**get** `/skills`

List all skills for the current project.

### Parameters

- `query: SkillListParams`

  - `after?: string`

    Identifier for the last item from the previous pagination request

  - `limit?: number`

    Number of items to retrieve

  - `order?: "asc" | "desc"`

    Sort order of results by timestamp. Use `asc` for ascending order or `desc` for descending order.

    - `"asc"`

    - `"desc"`

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

// Automatically fetches more pages as needed.
for await (const skill of client.skills.list()) {
  console.log(skill.id);
}
```
