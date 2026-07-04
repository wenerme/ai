The Gemini Live API enables low-latency voice and text interactions by
processing continuous streams of audio or text called *sessions* to deliver
immediate, human-like spoken responses. Session lifecycle management, from the
initial handshake to graceful termination, is controlled by the developer.

This page shows you how to start a conversation session with
Gemini models using the Gemini Live API. You can start a session
using Vertex AI Studio, the Google Gen AI SDK, or WebSockets.

This page also shows you how to do the following:

- Extend a session beyond the default time limit
- Resume a previous session
- Update system instructions during a session
- Configure the context window of a session
- Enable transcription for a session

## Session lifetime

Without context window compression, audio-only sessions are limited to 15 minutes, and
audio-video sessions are limited to 2 minutes due to token limits. Exceeding these limits will
terminate the session, but you can use context window compression to extend
sessions to an unlimited amount of time.

The lifetime of a connection is limited to around 10 minutes due to WebSocket
connection constraints. When the connection terminates, the session terminates
as well. In this case, you can configure a single session to stay active over
multiple connections using session resumption. You'll also receive a `GoAway`
message before the connection ends, allowing you to take further actions.

## Maximum concurrent sessions

You can have up to 1,000 concurrent sessions per project on a pay-as-you-go
([PayGo](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas#overview)) plan. This limit does
not apply to customers using [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput).

## Start a session

The following tabs show how to start a live conversation session using
Vertex AI Studio, the Google Gen AI SDK, or WebSockets:

### Console

1. Open [**Vertex AI Studio \> Stream realtime**](https://console.cloud.google.com/agent-platform/studio/multimodal-live).
2. Click **Start session** to initiate the conversation.

To end the session, click **Stop session**.

### Python

Before you begin, you must authenticate to Gemini Enterprise Agent Platform using an API key or application default credentials (ADC):

```bash
gcloud auth application-default login

```

For more information on setting up authentication, see our [quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/quickstart?usertype=adc).

```python
import asyncio
from google import genai

# Replace the PROJECT_ID and LOCATION with your Project ID and location.
client = genai.Client(vertexai=True, project="PROJECT_ID", location="LOCATION")

# Configuration
MODEL = "gemini-live-2.5-flash-native-audio"
config = {
   "response_modalities": ["audio"],
}

async def main():
   # Establish WebSocket session
   async with client.aio.live.connect(model=MODEL, config=config) as session:
       print("Session established. Sending audio...")

if __name__ == "__main__":
    asyncio.run(main())

```

### Python

When using WebSockets, the connection is established with a standard
WebSocket handshake. The endpoint is regional and uses OAuth 2.0 bearer
tokens for authentication. In this scenario, the authentication token is
typically passed in the WebSocket headers (such as `Authorization: Bearer [TOKEN]`).

```python
import asyncio
import websockets

# Replace the PROJECT_ID and LOCATION with your Project ID and location.
PROJECT_ID = "PROJECT_ID"
LOCATION = "LOCATION"

# Authentication
token_list = !gcloud auth application-default print-access-token
ACCESS_TOKEN = token_list[0]

# Configuration
MODEL_ID = "gemini-live-2.5-flash-native-audio"
MODEL = f"projects/{PROJECT_ID}/locations/{LOCATION}/publishers/google/models/{MODEL_ID}"
config = {
   "response_modalities": ["audio"],
}

# Construct the WSS URL
HOST = f"{LOCATION}-aiplatform.googleapis.com"
URI = f"wss://{HOST}/ws/google.cloud.aiplatform.v1.LlmBidiService/BidiGenerateContent"

async def main():
   headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}

   async with websockets.connect(URI, additional_headers=headers) as ws:
       print("Session established.")

       # Send Setup (Handshake)
       await ws.send(json.dumps({
           "setup": {
               "model": MODEL,
               "generation_config": config
           }
       }))
    # Send audio/video ...

if __name__ == "__main__":
    asyncio.run(main())

```

> [!NOTE]
> **Note:** While some parameters including system instructions can be adjusted mid-session, the model and other parameters are typically immutable once the setup message is processed.

## Extend a session

> [!NOTE]
> **Note:** Session extension is only available when using the Google Gen AI SDK, not Vertex AI Studio.

The default maximum length of a conversation session is 10 minutes. A `goAway`
notification
([`BidiGenerateContentServerMessage.goAway`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/multimodal-live#server-messages))
is sent to the client 60 seconds before the session ends.

To extend a session past the 10-minute connection limit, you must reconnect
using session resumption. When you receive a `goAway` notification, or when the
connection is terminated for other reasons, you can start a new connection
using a session handle obtained during the session. This resumes your session
with its context intact on the new connection. There's no limit to the number
of times you can do this. For an example of resuming a session, see
[Resume a previous session](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session#session-resumption).

The following example shows how to detect an impending session termination by
listening for a `goAway` notification:

### Python

```python
async for response in session.receive():
    if response.go_away is not None:
        # The connection will soon be terminated
        print(response.go_away.time_left)

```

## Resume a previous session

> [!IMPORTANT]
> **Important:** If you need to ensure zero data retention in your application, don't enable session resumption.

The Gemini Live API supports session resumption to prevent the user from
losing conversation context during a brief disconnect (for example, switching
from Wifi to 5G). You can resume a previous session within 24 hours. Session
resumption is achieved by storing cached data, including text, video, audio
prompts, and model outputs. Project-level privacy is enforced for this cached
data.

By default, session resumption is disabled. To enable session resumption, set
the `sessionResumption` field of the
[`BidiGenerateContentSetup`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/multimodal-live#bidigeneratecontentsetup)
message. If enabled, the server periodically sends `SessionResumptionUpdate`
messages containing a `session_id` and a resumption token. If the WebSocket
disconnects, the client can reconnect and include these credentials in the new
setup message. The server then restores the previous context, allowing the
conversation to continue seamlessly.

The resumption window is finite (typically around 10 minutes). If the client
does not reconnect within this timeframe, the session state is discarded to free
up server resources.

The following example connects to the service, obtains a session resumption
handle, simulates a disconnect, and then reconnects using the handle to resume
the session:

### Python

```python
import asyncio
from google import genai
from google.genai import types
import websockets

# Replace the PROJECT_ID and LOCATION with your Project ID and location.
client = genai.Client(vertexai=True, project="PROJECT_ID", location="LOCATION")

# Configuration
MODEL = "gemini-live-2.5-flash-native-audio"

async def resumable_session_example():
    """Demonstrates session resumption by connecting, disconnecting, and reconnecting."""
    session_handle = None

    print("Starting a new session...")
    try:
        async with client.aio.live.connect(
            model=MODEL,
            config=types.LiveConnectConfig(
                response_modalities=["audio"],
                session_resumption=types.SessionResumptionConfig(handle=None),
            ),
        ) as session:
            await session.send_content(
                content=types.Content(role="user", parts=[types.Part(text="Hello!")])
            )
            async for message in session.receive():
                if message.session_resumption_update:
                    update = message.session_resumption_update
                    if update.resumable and update.new_handle:
                        session_handle = update.new_handle
                        print(f"Received session handle: {session_handle}")
                        # For demonstration, we break to simulate a disconnect
                        # after receiving a handle.
                        break
                if message.server_content and message.server_content.turn_complete:
                    break
    except websockets.exceptions.WebSocketException as e:
        print(f"Initial connection failed: {e}")
        return

    if not session_handle:
        print("Did not receive a session handle. Cannot demonstrate resumption.")
        return

    print(f"\nSimulating disconnect and reconnecting with handle {session_handle}...")

    try:
        async with client.aio.live.connect(
            model=MODEL,
            config=types.LiveConnectConfig(
                response_modalities=["audio"],
                session_resumption=types.SessionResumptionConfig(handle=session_handle),
            ),
        ) as session:
            print("Successfully resumed session.")
            await session.send_content(
                content=types.Content(role="user", parts=[types.Part(text="I am back!")])
            )
            async for message in session.receive():
                if message.session_resumption_update:
                    update = message.session_resumption_update
                    if update.resumable and update.new_handle:
                        session_handle = update.new_handle
                        print(f"Received updated session handle: {session_handle}")
                if message.server_content:
                    print(f"Received server content: {message.server_content}")
                    if message.server_content.turn_complete:
                        break
            print("Resumed session finished.")
    except websockets.exceptions.WebSocketException as e:
        print(f"Failed to resume session: {e}")

if __name__ == "__main__":
    asyncio.run(resumable_session_example())

```

### Enable seamless session resumption with transparent mode

When you enable session resumption, you can also enable *transparent mode* to
help make the resumption process more seamless for the user. When transparent
mode is enabled, the index of the client message that corresponds with the
context snapshot is explicitly returned. This helps identify which client
message you need to send again, when you resume the session from the resumption
handle.

To enable transparent mode:

### Python

```python
config = {
   "response_modalities": ["audio"],
   "session_resumption_config": {
    "transparent": True,
   }
}

```

## Update system instructions during a session

The Gemini Live API lets you update the system instructions during an active
session. Use this to adapt the model's responses, such as changing the response
language or modifying the tone.

To update the system instructions mid-session, you can send text content with
the `system` role. The updated system instruction will remain in effect for the
remaining session.

### Python

```python
session.send_client_content(
      content=types.Content(
          role="system", parts=[types.Part(text="new system instruction")]
      ),
      turn_complete=False
  )

```

## Configure the context window of the session

The Gemini Live API context window is used to store real-time streamed data
(25 tokens per second (TPS) for audio and 258 TPS for video) and other content,
including text inputs and model outputs. All Gemini Live API models have a
context window limit of 128k tokens.

In long-running sessions, as the conversation progresses, the history of audio
and text tokens accumulates. If this history exceeds the model's limit, the
model may hallucinate, slow down, or the session may be forcibly terminated. To
enable longer sessions, you can enable *context window compression* by setting
the `contextWindowCompression` field as part of the session configuration.

Context window compression uses a a server-side sliding window to truncate the
oldest turns when enabled. When the accumulated tokens exceed a defined maximum
length (set using the **Max content size** slider in Vertex AI Studio,
or trigger_tokens in the API), the server automatically prunes the oldest turns
or summarizes them to maintain context within the limit. In the
`ContextWindowCompressionConfig`, you can configure a sliding-window mechanism
and the number of tokens defined in the `target_tokens` parameter that triggers
compression.

This allows for theoretically infinite session durations from the user's
perspective, as the "memory" is constantly managed. Without compression,
audio-only sessions might be limited to approximately 15 minutes before hitting
hard limits.

The minimum and maximum lengths for the context length and target size are:

| Setting (API flag) | Minimum value | Maximum value |
|---|---|---|
| Maximum context length (`trigger_tokens`) | 5,000 | 128,000 |
| Target context size (`target_tokens`) | 0 | 128,000 |

To set the context window:

### Console

1. Open [**Vertex AI Studio \> Stream realtime**](https://console.cloud.google.com/vertex-ai/studio/multimodal-live).
2. Click to open the **Advanced** menu.
3. In the **Session Context** section, use the **Max context size** slider to set the context size to a value between 5,000 and 128,000.
4. (Optional) In the same section, use the **Target context size** slider to set the target size to a value between 0 and 128,000.

### Python

Set the `context_window_compression.trigger_tokens` and
`context_window_compression.sliding_window.target_tokens`
fields in the setup message:

```python
config = {
   "response_modalities": ["audio"],
   # Configures compression
   "context_window_compression" : {
    "trigger_tokens": 10000,
    "sliding_window": {"target_tokens" : 512}
   }
}

```

## Enable audio transcription for the session

You can enable transcriptions for both the input and output audio.

To receive transcriptions, you must update your session configuration. You need
to add the `input_audio_transcription` and `output_audio_transcription` objects
and ensure `text` is included in `response_modalities`.

To improve transcription quality for multilingual automatic speech recognition
(ASR), you can provide language hints using the `language_codes` field within
`input_audio_transcription` or `output_audio_transcription`. Providing hints is
recommended to improve transcription quality, as it reduces the risk of incorrect
language detection, especially for short prompts. The `language_codes` field
accepts a list of [BCP-47 language codes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-language-voice#languages-supported)
(for example, "en-US", "es-US").

    config = {
        "response_modalities": ["audio", "text"],
        "input_audio_transcription": {
            "language_codes": ["en-US"]
        },
        "output_audio_transcription": {},
    }

### Processing the response

The following code sample demonstrates how to connect using the configured
session and extract the text parts (transcriptions) alongside the audio data.

    # Receive Output Loop
    async for message in session.receive():
        server_content = message.server_content
        if server_content:
            # Handle Model Turns (Audio + Text)
            model_turn = server_content.model_turn
            if model_turn and model_turn.parts:
                for part in model_turn.parts:
                    # Handle Text (Transcriptions)
                    if part.text:
                        print(f"Transcription: {part.text}")
                    # Handle Audio
                    if part.inline_data:
                        audio_data = part.inline_data.data
                        # Process audio bytes...
                        pass

            # Check for turn completion
            if server_content.turn_complete:
                print("Turn complete.")

## What's next

- [Send audio and video streams](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/send-audio-video-streams)
- [Best practices with the Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/best-practices)
- [Design multimodal prompts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/design-multimodal-prompts)
- [Introduction to function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling)
