## Delete

`client.skills.delete(stringskillID, RequestOptionsoptions?): DeletedSkill`

**delete** `/skills/{skill_id}`

Delete a skill by its ID.

### Parameters

- `skillID: string`

### Returns

- `DeletedSkill`

  - `id: string`

  - `deleted: boolean`

  - `object: "skill.deleted"`

    - `"skill.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const deletedSkill = await client.skills.delete('skill_123');

console.log(deletedSkill.id);
```
