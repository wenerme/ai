## Retrieve model

**get** `/models/{model}`

Retrieves a model instance, providing basic information about the model such as the owner and permissioning.

### Path Parameters

- `model: string`

  The ID of the model to use for this request

### Returns

- `Model object { id, created, object, 2 more }`

  Describes an OpenAI model offering that can be used with the API.

  - `id: string`

    The model identifier, which can be referenced in the API endpoints.

  - `created: integer`

    The Unix timestamp (in seconds) when the model was created.

    `format: unixtime`

  - `object: "model"`

    The object type, which is always "model".

    - `"model"`

  - `owned_by: string`

    The organization that owns the model.

  - `shutdown_date: optional string or null`

    The date when the model will shut down, or null if not announced.

    `format: date`

### Example

```http
curl https://api.openai.com/v1/models/gpt-6.2-astra \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response example

```json
{
  "id": "gpt-6.2-astra",
  "object": "model",
  "created": 1686935002,
  "owned_by": "openai",
  "shutdown_date": "2026-10-23"
}
```
