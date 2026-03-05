## Reject

`realtime.calls.reject(strcall_id, CallRejectParams**kwargs)`

**post** `/realtime/calls/{call_id}/reject`

Decline an incoming SIP call by returning a SIP status code to the caller.

### Parameters

- `call_id: str`

- `status_code: Optional[int]`

  SIP response code to send back to the caller. Defaults to `603` (Decline)
  when omitted.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.realtime.calls.reject(
    call_id="call_id",
)
```
