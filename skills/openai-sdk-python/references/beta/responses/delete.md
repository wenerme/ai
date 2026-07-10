## Delete a model response

`beta.responses.delete(strresponse_id, ResponseDeleteParams**kwargs)`

**delete** `/responses/{response_id}?beta=true`

Delete a model response

### Parameters

- `response_id: str`

- `betas: Optional[List[Literal["responses_multi_agent=v1"]]]`

  - `"responses_multi_agent=v1"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.beta.responses.delete(
    response_id="resp_677efb5139a88190b512bc3fef8e535d",
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
