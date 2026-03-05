## Delete

`responses.delete(strresponse_id)`

**delete** `/responses/{response_id}`

Deletes a model response with the given ID.

### Parameters

- `response_id: str`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.responses.delete(
    "resp_677efb5139a88190b512bc3fef8e535d",
)
```
