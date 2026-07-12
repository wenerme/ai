# Models

## List models

`models.list()  -> SyncPage[Model]`

**get** `/models`

Lists the currently available models, and provides basic information about each one such as the owner and availability.

### Returns

- `class Model: …`

  Describes an OpenAI model offering that can be used with the API.

  - `id: str`

    The model identifier, which can be referenced in the API endpoints.

  - `created: int`

    The Unix timestamp (in seconds) when the model was created.

  - `object: Literal["model"]`

    The object type, which is always "model".

    - `"model"`

  - `owned_by: str`

    The organization that owns the model.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.models.list()
page = page.data[0]
print(page.id)
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

```python
from openai import OpenAI
client = OpenAI()

client.models.list()
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

`models.retrieve(strmodel)  -> Model`

**get** `/models/{model}`

Retrieves a model instance, providing basic information about the model such as the owner and permissioning.

### Parameters

- `model: str`

### Returns

- `class Model: …`

  Describes an OpenAI model offering that can be used with the API.

  - `id: str`

    The model identifier, which can be referenced in the API endpoints.

  - `created: int`

    The Unix timestamp (in seconds) when the model was created.

  - `object: Literal["model"]`

    The object type, which is always "model".

    - `"model"`

  - `owned_by: str`

    The organization that owns the model.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
model = client.models.retrieve(
    "gpt-4o-mini",
)
print(model.id)
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

```python
from openai import OpenAI
client = OpenAI()

client.models.retrieve("VAR_chat_model_id")
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

`models.delete(strmodel)  -> ModelDeleted`

**delete** `/models/{model}`

Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.

### Parameters

- `model: str`

### Returns

- `class ModelDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: str`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
model_deleted = client.models.delete(
    "ft:gpt-4o-mini:acemeco:suffix:abc123",
)
print(model_deleted.id)
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

```python
from openai import OpenAI
client = OpenAI()

client.models.delete("ft:gpt-4o-mini:acemeco:suffix:abc123")
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

- `class Model: …`

  Describes an OpenAI model offering that can be used with the API.

  - `id: str`

    The model identifier, which can be referenced in the API endpoints.

  - `created: int`

    The Unix timestamp (in seconds) when the model was created.

  - `object: Literal["model"]`

    The object type, which is always "model".

    - `"model"`

  - `owned_by: str`

    The organization that owns the model.

### Model Deleted

- `class ModelDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: str`
