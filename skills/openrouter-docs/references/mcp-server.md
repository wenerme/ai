> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# MCP

![OpenRouter MCP Server](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/d7a46451b2c7eff24e021eac02893a1430e3273d76fccc1453c97d48f58961a7/content/assets/mcp-server-header.png)

The **OpenRouter MCP server** plugs OpenRouter into the AI tools you already use. Once connected, your assistant can pull live OpenRouter data (models, prices, your credits, rankings, and docs) and send quick test messages, all without leaving your editor.

It's a remote server hosted by OpenRouter (nothing is installed locally). You connect by adding one URL to your MCP client and approving an OAuth login in your browser.

Use this MCP while you build. It lets your coding assistant pull live OpenRouter info (which models exist, what they cost, your credit balance) and send quick test messages, without leaving your editor. To actually run models in your app, keep calling the OpenRouter API directly.

## Connect your agent

```bash
claude mcp add --transport http openrouter https://mcp.openrouter.ai/mcp
claude mcp login openrouter
```

You can also authenticate from inside a session: run `/mcp`, select **openrouter**, and click **Authenticate**.

```bash
codex mcp add openrouter --url https://mcp.openrouter.ai/mcp
codex mcp login openrouter   # opens the browser OAuth flow
```

Add this to `~/.config/opencode/opencode.json`. OpenCode runs the OAuth flow automatically on first use, with no separate login step:

```json
{
  "mcp": {
    "openrouter": {
      "type": "remote",
      "url": "https://mcp.openrouter.ai/mcp",
      "enabled": true
    }
  }
}
```

The Cursor CLI (`cursor-agent`) reads the same config as the IDE. Add this to `~/.cursor/mcp.json`, then verify with `cursor-agent mcp list`. Authenticate from the Cursor MCP settings, or it prompts on first tool use:

```json
{
  "mcpServers": {
    "openrouter": { "url": "https://mcp.openrouter.ai/mcp" }
  }
}
```

Go to **Settings > Connectors > OpenRouter MCP** and log in to run the OAuth flow.

Not all clients pop up the auth automatically; some need a one-time login step after you add the server. When you trigger it, an OpenRouter consent page opens in your browser where you approve a **dedicated key just for this connection**, separate from your other keys. The key expires after 7 days and starts with a `$10` spend cap (editable on the approval screen). You can disconnect anytime.

## What you can do

The MCP exposes these tools. All are read-only lookups against live OpenRouter data except `chat-send`, which makes a billable inference call.

| Tool              | What it does                                                                                                                                                                                                                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chat-send`       | Send a message to any model and get its reply, to test a prompt or compare models                                                                                                                                                                                                               |
| `models-list`     | Search OpenRouter's live model catalog: free-text search, sort (including by Artificial Analysis intelligence index and Design Arena ELO), and filter by use case, price range, minimum context, model family, author, provider, input/output modality, supported parameters, and ZDR or region |
| `model-get`       | Full details for one model by `author/slug` (supports `:variant` suffixes and aliases)                                                                                                                                                                                                          |
| `model-endpoints` | Which providers serve a model, and their price, latency, throughput, and data policy                                                                                                                                                                                                            |
| `providers-list`  | List available providers for routing preferences                                                                                                                                                                                                                                                |
| `rankings-daily`  | Which models are most used and trending by token volume                                                                                                                                                                                                                                         |
| `app-rankings`    | Which apps drive the most OpenRouter traffic, filterable by category                                                                                                                                                                                                                            |
| `credits-get`     | Your remaining account credit                                                                                                                                                                                                                                                                   |
| `generation-get`  | Cost, token counts, and serving provider for a specific generation id                                                                                                                                                                                                                           |
| `benchmarks`      | Third-party quality scores from Artificial Analysis (intelligence, coding, agentic indexes) and Design Arena (head-to-head elo, win rate)                                                                                                                                                       |
| `docs-search`     | Search the full OpenRouter docs to answer "how do I..." questions                                                                                                                                                                                                                               |
| `ping`            | Health check to verify the connection                                                                                                                                                                                                                                                           |

## Pick the right model for a task

You describe a task and the assistant recommends a model for it, and the recommendation is backed by live data, not the model's stale training knowledge. `chat-send` is grounded so the assistant won't name a model from memory; for any "which model should I use" question it defers to the live `benchmarks`, `rankings-daily`, and `models-list` tools. The right pick might be the cheapest, the smartest, the fastest, a specific modality, or a particular provider.

By task and trade-off:

* "What's the best model for coding right now?"
* "Smartest model for hard reasoning, money no object?"
* "Best value model for summarizing long documents?"

By modality (OpenRouter supports far more than text):

* "What embedding models are available, and which is best?"
* "Do you support reranking models? Recommend one."
* "Best text-to-speech model? What about speech-to-text?"

By benchmark and provider:

* "Which model tops the Artificial Analysis intelligence index?"
* "What's the best model for landing page design?"
* "Recommend a model and tell me which provider to route to."

## More things you can do

* "How much credit do I have left on OpenRouter?"
* "Which apps send the most traffic to OpenRouter?"
* "How do I pin a model to a specific provider, e.g. Bedrock?"
* "Send a test message to GPT-5.5 and tell me what it cost."
* "Compare the answers for the same prompt across Opus 4.8, DeepSeek v4 Pro, Gemini 3.5 Flash, and GLM-5.2."

`chat-send` understands model slug suffixes: add `:online` for web search, `:nitro` for speed, `:floor` for the lowest price, or `:free` for a free endpoint where one exists. Every reply includes the call's generation id, which you can pass to `generation-get` to see exactly what it cost and which provider served it. Pin a provider only when you need zero variance, for example when running evals or reproducing a result.

## How it works

1. **Discovery & auth.** An unauthenticated request returns a `401` that points your client to OpenRouter's OAuth authorization server. The client registers, you approve the consent page, and a token is issued via PKCE.
2. **Dedicated key.** The issued token is a standard OpenRouter API key labeled `OpenRouter MCP: <app name>`, minted with a 7-day expiry and a `$10` default spend limit so you can find and revoke it from your [dashboard](https://openrouter.ai/settings/keys).
3. **Live data, no local state.** Tools proxy the public OpenRouter API with your key. Nothing is installed locally, and no source code is sent anywhere unless you call `chat-send`.

## Troubleshooting

* **Tool calls fail with an auth error.** Re-run the authenticate step for your client. The key may have expired (7-day lifetime) or been disconnected.
* **The login didn't pop automatically.** That's expected for some clients. Trigger it with the per-client step above.