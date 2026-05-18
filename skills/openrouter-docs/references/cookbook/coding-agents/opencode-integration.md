> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# OpenCode

## What is OpenCode?

[OpenCode](https://opencode.ai) is an open-source AI coding agent available as a terminal interface and desktop app (beta). It features LSP integration, multi-session support, sharable session links, and compatibility with 75+ LLM providers — including OpenRouter for unified multi-model access through a single API key.

## Quick Start

### Step 1: Install OpenCode

```bash
curl -fsSL https://opencode.ai/install | bash
```

```bash
npm install -g opencode-ai
```

```bash
brew install anomalyco/tap/opencode
```

For additional installation methods (Bun, pnpm, Yarn, Arch Linux, Windows), see the [OpenCode installation docs](https://opencode.ai/docs).

### Step 2: Get Your OpenRouter API Key

1. Sign up or log in at [OpenRouter](https://openrouter.ai)
2. Navigate to your [API Keys page](https://openrouter.ai/keys)
3. Create a new API key
4. Copy your key (starts with `sk-or-...`)

### Step 3: Connect OpenCode to OpenRouter

OpenCode supports OpenRouter as a built-in provider. Use the interactive `/connect` command:

1. Start OpenCode in your project directory:

   ```bash
   cd /path/to/your/project
   opencode
   ```

2. Run the `/connect` command and select **OpenRouter**:

   ```text
   /connect
   ```

3. Paste your OpenRouter API key when prompted.

4. Run `/models` to select a model:

   ```text
   /models
   ```

Your requests will now be routed through OpenRouter.

### Alternative: Config File

You can also configure OpenRouter directly in your `opencode.json` config file:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "openrouter": {
      "models": {
        "~anthropic/claude-sonnet-latest": {},
        "~google/gemini-flash-latest": {}
      }
    }
  }
}
```

Set your API key via the `/connect` command or by adding it to `~/.local/share/opencode/auth.json`:

```json
{
  "openrouter": {
    "type": "api",
    "key": "sk-or-your-key-here"
  }
}
```

## Provider Routing

When using OpenRouter, you can control which upstream providers handle your requests by adding `options.provider` to individual models in your config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "openrouter": {
      "models": {
        "~anthropic/claude-sonnet-latest": {
          "options": {
            "provider": {
              "order": ["anthropic"],
              "allow_fallbacks": true
            }
          }
        }
      }
    }
  }
}
```

For a full breakdown of routing options, see the [Provider Routing docs](/docs/guides/routing/provider-selection).

## Why Use OpenRouter with OpenCode?

### Access to Hundreds of Models

Switch between any model available on OpenRouter — Anthropic, OpenAI, Google, xAI, Meta, DeepSeek, and many more — without managing separate API keys for each provider.

### Provider Failover

If one provider is unavailable or rate-limited, OpenRouter automatically routes to another, keeping your coding sessions uninterrupted.

### Organizational Controls

For teams, OpenRouter provides centralized budget management. Set spending limits, allocate credits, and monitor usage across developers using OpenCode from your [OpenRouter Activity Dashboard](https://openrouter.ai/activity).

### Model Flexibility

Switch models by updating your config or using the `/models` command — no need to reconfigure API keys or endpoints.

## Troubleshooting

* **Auth Errors:** Ensure your API key is set correctly via `/connect`. Check at [openrouter.ai/keys](https://openrouter.ai/keys).
* **Model Not Found:** Verify the model ID on [openrouter.ai/models](https://openrouter.ai/models). Use the exact format (e.g., `~anthropic/claude-sonnet-latest`).
* **Privacy:** OpenRouter does not log your source code prompts unless you opt in to prompt logging. See our [Privacy Policy](/privacy) for details.

## Resources

* [OpenCode Website](https://opencode.ai)
* [OpenCode on GitHub](https://github.com/anomalyco/opencode)
* [OpenCode Provider Docs](https://opencode.ai/docs/providers)
* [OpenRouter Models](https://openrouter.ai/models)