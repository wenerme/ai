## Hang up call

`realtime.calls.hangup(strcall_id)`

**post** `/realtime/calls/{call_id}/hangup`

Hang up call

### Parameters

- `call_id: str`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.realtime.calls.hangup(
    "call_id",
)
```
