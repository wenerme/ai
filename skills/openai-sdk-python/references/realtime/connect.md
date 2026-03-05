## Connect

`realtime.connect(RealtimeConnectParams**kwargs)`

**** ``

The Realtime API enables you to build low-latency, multi-modal conversational experiences. It currently supports text and audio as both input and output, as well as function calling.

Some notable benefits of the API include:

- Native speech-to-speech: Skipping an intermediate text format means low latency and nuanced output.
- Natural, steerable voices: The models have natural inflection and can laugh, whisper, and adhere to tone direction.
- Simultaneous multimodal output: Text is useful for moderation; faster-than-realtime audio ensures stable playback.

The Realtime API is a stateful, event-based API that communicates over a WebSocket.

### Parameters

- `call_id: Optional[str]`

- `model: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.realtime.connect()
```
