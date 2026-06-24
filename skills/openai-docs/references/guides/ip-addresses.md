# IP egress ranges

Some OpenAI products make outbound requests to services you control. If your network requires an IP allowlist, use the published ranges for the product making the request.

IP allowlisting identifies traffic from an OpenAI-operated network, not a specific user or workspace, and does not replace request authentication or authorization when your integration requires them. For ChatGPT apps, use [mutual TLS](https://developers.openai.com/apps-sdk/build/auth#mutual-tls-mtls) to authenticate ChatGPT as the MCP client. When your app requires user authentication, use OAuth 2.1 to authenticate and authorize the user.

## Outbound IP addresses

| Product              | Used for                                                                    | Published ranges                                                      |
| -------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ChatGPT integrations | Apps built with the Apps SDK, connectors, GPT Actions, and Agentic Commerce | [chatgpt-connectors.json](https://openai.com/chatgpt-connectors.json) |
| Codex cloud          | Connections from Codex cloud to services such as GitHub                     | [chatgpt-agents.json](https://openai.com/chatgpt-agents.json)         |

Each JSON file includes a `creationTime` and a `prefixes` array. The ranges can change as OpenAI infrastructure changes. Fetch the relevant file regularly and update your allowlist automatically.