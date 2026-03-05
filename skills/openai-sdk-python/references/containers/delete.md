## Delete

`containers.delete(strcontainer_id)`

**delete** `/containers/{container_id}`

Delete Container

### Parameters

- `container_id: str`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.containers.delete(
    "container_id",
)
```
