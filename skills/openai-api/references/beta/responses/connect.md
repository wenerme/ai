## Connect

Connect to a persistent Responses API WebSocket. Send `response.create` events to create responses and `response.steer` events to queue user input containing text, images, or files for a continuation. Receive response stream events and steering acceptance, pending, or failure events over the socket.

Open a WebSocket connection using the URL below. Supply path and query parameters and authentication during the opening handshake. Once connected, send client events and receive server events as JSON messages. Close the connection when finished.

**WebSocket** `wss://api.openai.com/v1/responses`

### Authentication

Use Bearer Auth (header Authorization).

### Events

[Client events](/api/reference/resources/beta#\(resource\)%20beta.responses%20%3E%20\(model\)%20beta_responses_client_event%20%3E%20\(schema\))

[Server events](/api/reference/resources/beta#\(resource\)%20beta.responses%20%3E%20\(model\)%20beta_responses_server_event%20%3E%20\(schema\))
