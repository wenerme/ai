## Connect

The Realtime API enables you to build low-latency, multi-modal conversational experiences. It currently supports text and audio as both input and output, as well as function calling.

Some notable benefits of the API include:

- Native speech-to-speech: Skipping an intermediate text format means low latency and nuanced output.
- Natural, steerable voices: The models have natural inflection and can laugh, whisper, and adhere to tone direction.
- Simultaneous multimodal output: Text is useful for moderation; faster-than-realtime audio ensures stable playback.

The Realtime API is a stateful, event-based API that communicates over a WebSocket.
To start a Realtime conversation, set `model` in the connection URL. To join an existing call, set `call_id` instead. Transcription sessions use `intent=transcription`.

Open a WebSocket connection using the URL below. Supply path and query parameters and authentication during the opening handshake. Once connected, send client events and receive server events as JSON messages. Close the connection when finished.

**WebSocket** `wss://api.openai.com/v1/realtime`

### Authentication

Use Bearer Auth (header Authorization).

### Connection parameters

- `model` (query, string, optional)

- `call_id` (query, string, optional)

- `intent` (query, enum, optional): realtime, transcription

  Selects the session type. Set `transcription` and omit `model` for a transcription session. If omitted, the session type from a client secret applies when present; otherwise the intent is `realtime`.

### Events

[Client events](/api/reference/resources/realtime#\(resource\)%20realtime%20%3E%20\(model\)%20realtime_client_event%20%3E%20\(schema\))

[Server events](/api/reference/resources/realtime#\(resource\)%20realtime%20%3E%20\(model\)%20realtime_server_event%20%3E%20\(schema\))
