## Connect

Connect to Live without query parameters. Send session.start with model and session configuration, then wait for session.started. Follow the [Live prompting guide](https://developers.openai.com/api/docs/guides/live-prompting) before writing instructions.

Open a WebSocket connection using the URL below. Supply path and query parameters and authentication during the opening handshake. Once connected, send client events and receive server events as JSON messages. Close the connection when finished.

**WebSocket** `wss://api.openai.com/v1/live/sessions`

### Authentication

Use Bearer Auth (header Authorization).

### Events

[Client events](/api/reference/resources/live#\(resource\)%20live%20%3E%20\(model\)%20client_event%20%3E%20\(schema\))

[Server events](/api/reference/resources/live#\(resource\)%20live%20%3E%20\(model\)%20server_event%20%3E%20\(schema\))
