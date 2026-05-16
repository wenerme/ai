> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Cursor

## What is Cursor?

[Cursor](https://cursor.com) is an AI-powered code editor built on VS Code. It features an agent mode for autonomous coding, tab completions, inline edits, a CLI, and cloud agents — all backed by frontier models from OpenAI, Anthropic, Google, and more.

By routing Cursor through OpenRouter, you get access to hundreds of models through a single API key, automatic provider failover, and centralized usage tracking.

## Quick Start

Cursor supports OpenRouter through its **Override OpenAI Base URL** feature. This routes requests from Cursor's OpenAI provider slot through OpenRouter instead of directly to OpenAI.

### Step 1: Get Your OpenRouter API Key

1. Sign up or log in at [OpenRouter](https://openrouter.ai)
2. Navigate to your [API Keys page](https://openrouter.ai/keys)
3. Create a new API key
4. Copy your key (starts with `sk-or-...`)

### Step 2: Configure Cursor

1. Open **Cursor Settings** (gear icon or `Cmd/Ctrl + ,`)
2. Navigate to **Models**, then expand the **API Keys** section
3. Toggle on **OpenAI API Key**, then:
   * Paste your OpenRouter API key into the **OpenAI API Key** field
   * Toggle on **Override OpenAI Base URL** and set it to:

     ```text
     https://openrouter.ai/api/v1
     ```

### Step 3: Add Models

After connecting, add the models you want to use. In the **Models** section, click **+ Add model** and enter an OpenRouter model ID:

* `~anthropic/claude-sonnet-latest`
* `~google/gemini-flash-latest`
* `~openai/gpt-mini-latest`
* `~anthropic/claude-haiku-latest`

You can find the exact model ID for each model on the [OpenRouter models page](https://openrouter.ai/models).

### Step 4: Select a Model

Open the model picker in the chat or agent panel and select one of the models you added. Your requests will now route through OpenRouter.

## Why Use OpenRouter with Cursor?

### Access to Hundreds of Models

Cursor's built-in BYOK only supports a handful of providers (OpenAI, Anthropic, Google, Azure, AWS Bedrock). With OpenRouter, you can access models from DeepSeek, Meta, xAI, Mistral, Cohere, and many more — all through the single OpenAI provider slot.

### Provider Failover

If one provider is unavailable or rate-limited, OpenRouter automatically routes to another, keeping your coding sessions uninterrupted.

### Organizational Controls

For teams, OpenRouter provides centralized budget management. Set spending limits, allocate credits, and monitor usage across developers using Cursor from your [OpenRouter Activity Dashboard](https://openrouter.ai/activity).

### Usage Visibility

Track which models your team uses, monitor costs in real-time, and understand usage patterns — all from a single dashboard, regardless of the underlying provider.

## Provider Routing

You can control which upstream providers handle your requests by appending routing suffixes to model names or by configuring provider preferences in the [OpenRouter Playground](https://openrouter.ai/playground):

* Append `:nitro` for throughput-optimized routing (e.g., `~anthropic/claude-sonnet-latest:nitro`)
* Append `:floor` for cost-optimized routing

For more routing options, see the [Provider Routing docs](/docs/guides/routing/provider-selection).

## Limitations

* **Tab completions** are not affected by BYOK settings — they always use Cursor's built-in models.
* **Auto and Composer 2 modes** may not be routed through your API key — check [Cursor's docs](https://cursor.com/help/models-and-usage/api-keys) for current behavior.
* Only models accessible via OpenRouter's OpenAI-compatible endpoint will work. Most chat and reasoning models are supported.

## Troubleshooting

* **"Invalid API key":** Make sure you're using your OpenRouter API key (starts with `sk-or-...`), not an OpenAI key.
* **Model not found:** Ensure the model ID exactly matches the format on [openrouter.ai/models](https://openrouter.ai/models) (e.g., `~anthropic/claude-sonnet-latest`, not `claude-sonnet-latest`).
* **Base URL:** Make sure the override URL is `https://openrouter.ai/api/v1` (with `/v1` at the end).

## Resources

* [Cursor Documentation](https://cursor.com/docs)
* [Cursor BYOK Help](https://cursor.com/help/models-and-usage/api-keys)
* [OpenRouter Models](https://openrouter.ai/models)
* [Provider Routing](/docs/guides/routing/provider-selection)