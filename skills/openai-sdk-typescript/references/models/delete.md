## Delete a fine-tuned model

`client.models.delete(stringmodel, RequestOptionsoptions?): ModelDeleted`

**delete** `/models/{model}`

Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.

### Parameters

- `model: string`

### Returns

- `ModelDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const modelDeleted = await client.models.delete('ft:gpt-4o-mini:acemeco:suffix:abc123');

console.log(modelDeleted.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "object"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const model = await openai.models.delete("ft:gpt-4o-mini:acemeco:suffix:abc123");
  
  console.log(model);
}
main();
```

#### Response

```json
{
  "id": "ft:gpt-4o-mini:acemeco:suffix:abc123",
  "object": "model",
  "deleted": true
}
```
