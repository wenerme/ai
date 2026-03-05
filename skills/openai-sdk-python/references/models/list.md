## List

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
