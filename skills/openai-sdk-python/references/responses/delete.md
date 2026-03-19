## Delete a model response

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

### Example

```python
from openai import OpenAI
client = OpenAI()

response = client.responses.delete("resp_123")
print(response)
```

#### Response

```json
{
  "id": "resp_6786a1bec27481909a17d673315b29f6",
  "object": "response",
  "deleted": true
}
```
