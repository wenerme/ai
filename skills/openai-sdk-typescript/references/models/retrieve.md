## Retrieve model

`client.models.retrieve(stringmodel, RequestOptionsoptions?): Model`

**get** `/models/{model}`

Retrieves a model instance, providing basic information about the model such as the owner and permissioning.

### Parameters

- `model: string`

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

const model = await client.models.retrieve('gpt-4o-mini');

console.log(model.id);
```

#### Response

```json
{
  "id": "id",
  "created": 0,
  "object": "model",
  "owned_by": "owned_by"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const model = await openai.models.retrieve("VAR_chat_model_id");

  console.log(model);
}

main();
```

#### Response

```json
{
  "id": "VAR_chat_model_id",
  "object": "model",
  "created": 1686935002,
  "owned_by": "openai"
}
```
