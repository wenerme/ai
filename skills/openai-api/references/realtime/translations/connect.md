## Connect

Open a WebSocket connection using the URL below. Supply path and query parameters and authentication during the opening handshake. Once connected, send client events and receive server events as JSON messages. Close the connection when finished.

**WebSocket** `wss://api.openai.com/v1/realtime/translations`

### Authentication

Use Bearer Auth (header Authorization).

### Events

[Client events](/api/reference/resources/realtime#\(resource\)%20realtime%20%3E%20\(model\)%20realtime_translation_client_event%20%3E%20\(schema\))

[Server events](/api/reference/resources/realtime#\(resource\)%20realtime%20%3E%20\(model\)%20realtime_translation_server_event%20%3E%20\(schema\))
