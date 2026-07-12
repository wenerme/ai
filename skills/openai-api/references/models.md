# Models

## List models

**get** `/models`

Lists the currently available models, and provides basic information about each one such as the owner and availability.

### Returns

- `data: array of Model`

  - `id: string`

    The model identifier, which can be referenced in the API endpoints.

  - `created: number`

    The Unix timestamp (in seconds) when the model was created.

  - `object: "model"`

    The object type, which is always "model".

    - `"model"`

  - `owned_by: string`

    The organization that owns the model.

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/models \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created": 0,
      "object": "model",
      "owned_by": "owned_by"
    }
  ],
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "model-id-0",
      "object": "model",
      "created": 1686935002,
      "owned_by": "organization-owner"
    },
    {
      "id": "model-id-1",
      "object": "model",
      "created": 1686935002,
      "owned_by": "organization-owner",
    },
    {
      "id": "model-id-2",
      "object": "model",
      "created": 1686935002,
      "owned_by": "openai"
    },
  ]
}
```

## Retrieve model

**get** `/models/{model}`

Retrieves a model instance, providing basic information about the model such as the owner and permissioning.

### Path Parameters

- `model: string`

### Returns

- `Model object { id, created, object, owned_by }`

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

```http
curl https://api.openai.com/v1/models/$MODEL \
    -H "Authorization: Bearer $OPENAI_API_KEY"
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

```http
curl https://api.openai.com/v1/models/VAR_chat_model_id \
  -H "Authorization: Bearer $OPENAI_API_KEY"
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

## Delete a fine-tuned model

**delete** `/models/{model}`

Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.

### Path Parameters

- `model: string`

### Returns

- `ModelDeleted object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: string`

### Example

```http
curl https://api.openai.com/v1/models/$MODEL \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
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

```http
curl https://api.openai.com/v1/models/ft:gpt-4o-mini:acemeco:suffix:abc123 \
  -X DELETE \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "ft:gpt-4o-mini:acemeco:suffix:abc123",
  "object": "model",
  "deleted": true
}
```

## Domain Types

### Model

- `Model object { id, created, object, owned_by }`

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

- `ModelDeleted object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: string`
