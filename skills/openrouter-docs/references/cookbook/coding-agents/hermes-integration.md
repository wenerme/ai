> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Hermes Agent

## What is Hermes Agent?

[Hermes Agent](https://github.com/NousResearch/hermes-agent) is an open-source, terminal-native autonomous coding and task agent built by [Nous Research](https://nousresearch.com). It features persistent memory, agent-created skills, and a messaging gateway that supports 21+ platforms including Telegram, Discord, Slack, WhatsApp, Signal, SMS, Matrix, and more.

Hermes runs on local, Docker, SSH, Daytona, Modal, Vercel Sandbox, or Singularity backends and works with multiple LLM providers — including OpenRouter for multi-model access through a single API key.

## Setup

### Recommended: Use the Interactive Model Selector

The easiest way to configure Hermes with OpenRouter:

```bash
hermes model
```

Select **OpenRouter** from the provider list, enter your API key, and choose your preferred model. This is the recommended approach for new users.

### Quick Start (Environment Variable)

If you already have your OpenRouter API key:

```bash
hermes config set OPENROUTER_API_KEY sk-or-...
```

Then start a chat:

```bash
hermes chat --provider openrouter --model anthropic/claude-sonnet-4
```

## Manual Configuration

**Advanced users only:** The following manual configuration is for users who need to edit config files directly. For most users, we recommend using `hermes model` above.

### Step 1: Get Your OpenRouter API Key

1. Sign up or log in at [OpenRouter](https://openrouter.ai)
2. Navigate to your [API Keys page](https://openrouter.ai/keys)
3. Create a new API key
4. Copy your key (starts with `sk-or-...`)

### Step 2: Set Your API Key

Add your OpenRouter API key to `~/.hermes/.env`:

```bash
OPENROUTER_API_KEY=sk-or-...
```

Hermes separates secrets from non-secret settings. API keys go in `~/.hermes/.env`, while model and provider configuration goes in `~/.hermes/config.yaml`.

### Step 3: Configure Your Model

Edit `~/.hermes/config.yaml`:

```yaml
model:
  provider: openrouter
  default: anthropic/claude-sonnet-4
```

Browse all available models at [openrouter.ai/models](https://openrouter.ai/models).

### Step 4: Start Hermes

```bash
hermes          # classic CLI
hermes --tui    # modern TUI
```

Your agent will now route all requests through OpenRouter to your chosen model.

## Model Format

When using OpenRouter as a provider, Hermes uses the standard OpenRouter model format `<author>/<slug>`:

* `anthropic/claude-sonnet-4`
* `google/gemini-3-flash-preview`
* `deepseek/deepseek-chat`
* `openrouter/auto` (auto-routes to an optimal/best-fit model for your prompt)

You can find the exact model ID for each model on the [OpenRouter models page](https://openrouter.ai/models).

## Provider Routing

OpenRouter routes your requests across multiple infrastructure providers for each model. You can control this routing behavior in `~/.hermes/config.yaml`:

```yaml
provider_routing:
  sort: "throughput"          # "price" (default), "throughput", or "latency"
  # only: ["anthropic"]      # Only use these providers
  # ignore: ["deepinfra"]    # Skip these providers
  # order: ["anthropic", "google"]  # Try providers in this order
  # data_collection: "deny"  # Exclude providers that may store/train on data
```

**Shortcuts:** Append `:nitro` to any model name for throughput sorting (e.g., `anthropic/claude-sonnet-4:nitro`), or `:floor` for price sorting.

For a full breakdown of routing options, see the [Provider Routing docs](/docs/guides/routing/provider-selection).

## Fallback Providers

Configure a chain of backup providers Hermes tries when the primary model fails:

```yaml
fallback_providers:
  - provider: openrouter
    model: anthropic/claude-sonnet-4
  - provider: openrouter
    model: google/gemini-2.5-flash
```

This provides an additional layer of reliability. When activated, the fallback swaps the model mid-session without losing your conversation.

## Auxiliary Models

Hermes uses "auxiliary models" for side tasks like context compression, vision analysis, session titles, and web summarization. By default these use your main model, but you can route them to cheaper models via OpenRouter:

```yaml
auxiliary:
  title:
    provider: openrouter
    model: google/gemini-2.5-flash
  vision:
    provider: openrouter
    model: google/gemini-2.5-flash
  compression:
    provider: openrouter
    model: google/gemini-2.5-flash
```

This keeps your main model focused on complex reasoning while cheaper models handle lightweight tasks.

## Pareto Code Router

OpenRouter's experimental coding-model router auto-routes requests to the cheapest model meeting a coding-quality threshold. Configure it in `~/.hermes/config.yaml`:

```yaml
model:
  provider: openrouter
  model: openrouter/pareto-code

openrouter:
  min_coding_score: 0.65   # 0.0–1.0; higher = stronger (more expensive) coders
```

This is useful for cost optimization on coding tasks — the router picks the cheapest model that meets your quality bar.

Hermes uses its own `openrouter:` config key to set `min_coding_score`. This maps to the `plugins` array in the [OpenRouter API](/docs/guides/routing/routers/pareto-router) — you don't need to construct the plugins payload yourself.

## Monitoring Usage

Track your Hermes usage in real-time:

1. Visit the [OpenRouter Activity Dashboard](https://openrouter.ai/activity)
2. See requests, costs, and token usage across all your Hermes sessions
3. Filter by model, time range, or other criteria

## Common Errors

### "No API key" or provider not found

Hermes can't find your OpenRouter API key.

**Fix:**

1. Verify the key is set: `cat ~/.hermes/.env | grep OPENROUTER`
2. Or re-run: `hermes config set OPENROUTER_API_KEY sk-or-...`
3. Or use the interactive setup: `hermes model`

### Authentication errors (401/403)

**Fix:**

1. Verify your API key is valid at [openrouter.ai/keys](https://openrouter.ai/keys)
2. Check that you have sufficient credits in your account
3. Ensure your key hasn't expired or been revoked

### Model not working

**Fix:**

1. Verify the model ID on the [OpenRouter models page](https://openrouter.ai/models)
2. Use the format `<author>/<slug>` (e.g., `anthropic/claude-sonnet-4`)
3. Ensure the model is available and not deprecated

### Context length errors

Hermes requires a model with at least **64K context tokens**. Models with smaller context windows will be rejected at startup, since the system prompt and tool schemas can fill smaller windows and leave no room for conversation. If you see context-related errors, switch to a model with a larger context window.

## Resources

* [Hermes Agent Documentation](https://hermes-agent.nousresearch.com/docs)
* [Hermes Agent GitHub](https://github.com/NousResearch/hermes-agent)
* [Hermes AI Providers Guide](https://hermes-agent.nousresearch.com/docs/integrations/providers)
* [Hermes Configuring Models](https://hermes-agent.nousresearch.com/docs/user-guide/configuring-models)
* [OpenRouter Models](https://openrouter.ai/models)
* [OpenRouter Activity Dashboard](https://openrouter.ai/activity)
* [OpenRouter API Documentation](https://openrouter.ai/docs/api)