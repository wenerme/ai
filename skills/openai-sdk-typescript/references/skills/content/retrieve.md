## Retrieve

`client.skills.content.retrieve(stringskillID, RequestOptionsoptions?): Response`

**get** `/skills/{skill_id}/content`

Download a skill zip bundle by its ID.

### Parameters

- `skillID: string`

### Returns

- `unnamed_schema_3 = Response`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const content = await client.skills.content.retrieve('skill_123');

console.log(content);

const data = await content.blob();
console.log(data);
```
