# Content

## Download a skill version zip bundle.

`client.skills.versions.content.retrieve(stringversion, ContentRetrieveParamsparams, RequestOptionsoptions?): Response`

**get** `/skills/{skill_id}/versions/{version}/content`

Download a skill version zip bundle.

### Parameters

- `version: string`

  The skill version number.

- `params: ContentRetrieveParams`

  - `skill_id: string`

    The identifier of the skill.

### Returns

- `unnamed_schema_11 = Response`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const content = await client.skills.versions.content.retrieve('version', { skill_id: 'skill_123' });

console.log(content);

const data = await content.blob();
console.log(data);
```
