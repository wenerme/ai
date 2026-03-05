## Refer

`realtime.calls.refer(strcall_id, CallReferParams**kwargs)`

**post** `/realtime/calls/{call_id}/refer`

Transfer an active SIP call to a new destination using the SIP REFER verb.

### Parameters

- `call_id: str`

- `target_uri: str`

  URI that should appear in the SIP Refer-To header. Supports values like
  `tel:+14155550123` or `sip:agent@example.com`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.realtime.calls.refer(
    call_id="call_id",
    target_uri="tel:+14155550123",
)
```
