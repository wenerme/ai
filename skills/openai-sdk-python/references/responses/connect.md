## Connect

`responses.connect()`

**** ``

Connect to a persistent Responses API WebSocket. Send `response.create` events and receive response stream events over the socket.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.responses.connect()
```
