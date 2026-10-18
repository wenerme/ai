## Connect

Attach to an existing Live session. Do not send session.start again.

Open a WebSocket connection using the URL below. Supply path and query parameters and authentication during the opening handshake. Once connected, send client events and receive server events as JSON messages. Close the connection when finished.

**WebSocket** `wss://api.openai.com/v1/live/sessions/{session_id}/attach`

### Authentication

Use Bearer Auth (header Authorization).

### Connection parameters

- `session_id` (path, string, required)

  The ID of the existing Live session to attach to.

- `graceful_close` (query, boolean, optional)

  Opt in to the graceful WebSocket closing handshake when the session ends. The server may also enable this behavior by default.

### Events

[Client events](/api/reference/resources/live#\(resource\)%20live.sideband%20%3E%20\(model\)%20sideband_client_event%20%3E%20\(schema\))

[Server events](/api/reference/resources/live#\(resource\)%20live.sideband%20%3E%20\(model\)%20sideband_server_event%20%3E%20\(schema\))
