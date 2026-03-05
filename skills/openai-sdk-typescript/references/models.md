# Models

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

## Retrieve

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

## Delete

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

## Domain Types

### Model

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

### Model Deleted

- `ModelDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: string`
