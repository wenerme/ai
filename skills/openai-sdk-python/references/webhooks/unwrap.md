## Unwrap

`webhooks.unwrap()`

**** ``

Validates that the given payload was sent by OpenAI and parses the payload.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.webhooks.unwrap()
```
