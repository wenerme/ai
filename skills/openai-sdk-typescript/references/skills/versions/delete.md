## Delete

`client.skills.versions.delete(stringversion, VersionDeleteParamsparams, RequestOptionsoptions?): DeletedSkillVersion`

**delete** `/skills/{skill_id}/versions/{version}`

Delete a skill version.

### Parameters

- `version: string`

  The skill version number.

- `params: VersionDeleteParams`

  - `skill_id: string`

    The identifier of the skill.

### Returns

- `DeletedSkillVersion`

  - `id: string`

  - `deleted: boolean`

  - `object: "skill.version.deleted"`

    - `"skill.version.deleted"`

  - `version: string`

    The deleted skill version.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const deletedSkillVersion = await client.skills.versions.delete('version', {
  skill_id: 'skill_123',
});

console.log(deletedSkillVersion.id);
```
