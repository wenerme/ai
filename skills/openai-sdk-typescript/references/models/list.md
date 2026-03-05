## List

`client.models.list(RequestOptionsoptions?): Page<Model>`

**get** `/models`

Lists the currently available models, and provides basic information about each one such as the owner and availability.

### Returns

- `Model`

  Describes an OpenAI model offering that can be used with the API.

  - `id: string`

    The model identifier, which can be referenced in the API endpoints.

  - `created: number`

    The Unix timestamp (in seconds) when the model was created.

  - `object: "model"`

    The object type, which is always "model".

    - `"model"`

  - `owned_by: string`

    The organization that owns the model.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const model of client.models.list()) {
  console.log(model.id);
}
```
