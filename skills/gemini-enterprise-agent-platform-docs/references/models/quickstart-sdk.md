This guide shows you how to accelerate your development workflow with the Google Gen AI SDK, enhanced by the Google Developer Knowledge MCP server. By connecting your AI-powered development tools to the [Developer Knowledge MCP server](https://developers.google.com/knowledge/mcp), you can rapidly prototype and write code with in-context assistance from Google's official and up-to-date developer documentation. This connection lets you interact with your tools to get accurate code examples, explanations, and troubleshooting advice for the Gemini API.

## Before you begin

Before you begin, you need to complete the following steps:

- Complete at least one of the following quickstarts to ensure that you have set up a Google Cloud project and enabled the Agent Platform API:
  - [Google Cloud console quickstart for Agent Studio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/quickstart)
  - [API quickstart for Models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start)
- Have an AI-powered development tool installed and configured to connect to the Developer Knowledge MCP server. Examples include [Antigravity](https://antigravity.google/), [Gemini CLI](https://geminicli.com/), or [Gemini Code Assist in your IDE](https://docs.cloud.google.com/gemini/docs/codeassist/overview). This connection allows your tool to search and retrieve information from Google's official developer documentation.
- [Install the Google Gen AI SDK](https://ai.google.dev/gemini-api/docs/libraries#install) for your preferred language.

## Connect to the Developer Knowledge MCP server

To let your AI assistant retrieve real-time information from Google's
developer documentation, configure the connection to the
[Developer Knowledge MCP server](https://developers.google.com/knowledge/mcp).
The specific steps vary depending on the tool (for example,
Gemini CLI, VS Code with Gemini Code Assist, or
Cursor) but generally involve updating a configuration file for your tool to
include the server URL (`https://developerknowledge.googleapis.com/mcp`) and
the necessary authentication method.

You can authenticate using
[Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials)
(ADC) or an API key from your Google Cloud project. ADC is the
recommended authentication method for Google Cloud services. See
[Choose an authentication method](https://developers.google.com/knowledge/mcp#choose-auth-method)
in the Developer Knowledge MCP server documentation for instructions on how to
configure ADC.

Alternately, if you prefer authenticating using an API key but don't have an
API key, then see
[Create an API key](https://developers.google.com/knowledge/mcp#create-api-key).
Then, run the following command to configure Gemini CLI,
replacing `YOUR_API_KEY` with your API key:

    gemini mcp add -t http -H "X-Goog-Api-Key: YOUR_API_KEY" google-developer-knowledge https://developerknowledge.googleapis.com/mcp --scope user

See
[Connect to the Developer Knowledge MCP server](https://developers.google.com/knowledge/mcp)
for complete instructions for other tools and authentication methods.

## Example prompts

Once your tool is connected to the Developer Knowledge MCP server, you can ask
it for help as you write code with the Google Gen AI SDK. Here are
some example prompts you can use with your configured AI tool:

- "Using the Google Gen AI SDK in Python, how do I generate text with
  Gemini and handle potential API errors?"

- "Show me the Google Gen AI SDK code for Node.js to call the
  Gemini API for summarizing a long document. What are the
  best practices for chunking input, according to the official documentation?"

- "I'm encountering an authentication error with the Java Gen AI SDK when
  running on Cloud Run. What are the common causes and how can I
  troubleshoot?"

- "Draft a Python function using the `google-genai` library to stream
  responses from Gemini for a chat application."

- "What are the current rate limits I should be aware of when using the
  Gemini API using the Go Gen AI SDK? Find the specifics in the
  Google Cloud documentation."

Your AI tool uses the Developer Knowledge MCP server to provide answers and code
snippets based on the official documentation.

## What's next

- Explore advanced features of the Google Gen AI SDK.
- Dive deeper into the Gemini API documentation.
- [Review Agent Platform pricing](https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing).
- Learn more about other tools available using the Developer Knowledge MCP server.
