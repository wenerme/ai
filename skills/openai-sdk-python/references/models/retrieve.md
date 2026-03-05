## Retrieve

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
