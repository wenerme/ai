## Connect

Fork a stored Live session over WebSocket. Send session.start with an overrides object (which may be empty), then wait for session.started. The model is inherited.

Open a WebSocket connection using the URL below. Supply path and query parameters and authentication during the opening handshake. Once connected, send client events and receive server events as JSON messages. Close the connection when finished.

**WebSocket** `wss://api.openai.com/v1/live/sessions/{session_id}/fork`

### Authentication

Use Bearer Auth (header Authorization).

### Connection parameters

- `session_id` (path, string, required)

  The ID of the stored Live session to fork.

### Events

[Client events](/api/reference/resources/live#\(resource\)%20live.forks%20%3E%20\(model\)%20fork_client_event%20%3E%20\(schema\))

[Server events](/api/reference/resources/live#\(resource\)%20live.forks%20%3E%20\(model\)%20fork_server_event%20%3E%20\(schema\))
