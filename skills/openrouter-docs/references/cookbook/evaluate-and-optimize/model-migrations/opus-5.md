> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude Opus 5 Migration Guide

> Migrate to Claude Opus 5 — reasoning on by default, effort restrictions when disabling reasoning, and mid-conversation tool changes

## What's New

Claude Opus 5 ships as [`anthropic/claude-opus-5`](https://openrouter.ai/anthropic/claude-opus-5), with fast mode available as a `fast` service tier endpoint on the same model.

Three changes matter for migration:

1. **Reasoning is on by default** — a first for Opus-family models, following the default Sonnet 5 introduced
2. **Disabling reasoning is restricted by effort level** — allowed at `high` or lower; `xhigh` and `max` require reasoning to stay on
3. **Mid-conversation tool changes (beta)** — add and remove tools between turns without invalidating the prompt cache, via OpenRouter's [Messages API](/docs/api/api-reference/anthropic-messages/create-a-message) only

## Reasoning On by Default

On every Opus model before Opus 5, reasoning was off unless you explicitly turned it on. On Opus 5 — like [Sonnet 5](https://platform.claude.com/docs/en/about-claude/models/whats-new-sonnet-5#adaptive-thinking-on-by-default) before it — requests that don't configure reasoning run with adaptive thinking **enabled**.

If your integration assumes non-reasoning responses — latency budgets, output parsing that doesn't handle reasoning blocks, cost models — either handle reasoning output or disable it explicitly:

```json lines theme={null}
// Chat Completions API
{
  "model": "anthropic/claude-opus-5",
  "reasoning": { "enabled": false },
  "messages": [{ "role": "user", "content": "Hello" }]
}
```

```json lines theme={null}
// Messages API
{
  "model": "anthropic/claude-opus-5",
  "thinking": { "type": "disabled" },
  "messages": [{ "role": "user", "content": "Hello" }]
}
```

Like Sonnet 5, Opus 5 supports only adaptive thinking: token budgets (`reasoning.max_tokens` in Chat Completions, `thinking.budget_tokens` in Messages) are ignored.

## Effort Restrictions When Reasoning Is Disabled

Anthropic only allows disabling thinking at effort levels up to and including `high`. Combining disabled reasoning with `xhigh` or `max` effort returns a 400 from Anthropic:

| Effort level            | Reasoning disabled      |
| ----------------------- | ----------------------- |
| `low`, `medium`, `high` | Allowed                 |
| `xhigh`, `max`          | Rejected upstream (400) |

```json lines theme={null}
// Chat Completions API — OK: disabled reasoning at high effort
{
  "model": "anthropic/claude-opus-5",
  "reasoning": { "enabled": false, "effort": "high" }
}
```

```json lines theme={null}
// Chat Completions API — 400 from Anthropic: xhigh requires reasoning
{
  "model": "anthropic/claude-opus-5",
  "reasoning": { "enabled": false, "effort": "xhigh" }
}
```

The same restriction applies on the Messages API with `thinking: { "type": "disabled" }` and `output_config.effort`.

To migrate: keep reasoning enabled at `xhigh`/`max`, or lower effort to `high` or below.

## Mid-Conversation Tool Changes (Beta)

Opus 5 supports [changing the available tool set between turns](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages#mid-conversation-tool-changes) without invalidating the prompt cache, using system-role content blocks:

* `tool_addition` — surface a tool declared in `tools[]` with `defer_loading: true`
* `tool_removal` — remove a tool by name (the block must sit at the end of `messages` or immediately before an assistant message)

Blocks reference a tool by name from the request's `tools[]` — individual MCP tools and whole MCP toolsets can also be referenced — so the `tools[]` array itself never changes and the cached prefix stays intact.

<Note>
  Model support: [Claude Opus 5](https://openrouter.ai/anthropic/claude-opus-5), [Claude Opus 4.8](https://openrouter.ai/anthropic/claude-opus-4.8) (including their fast variants), and [Claude Fable 5](https://openrouter.ai/anthropic/claude-fable-5). **Not** supported on Claude Sonnet 5 or models older than Claude Opus 4.8 — note this differs from [mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages), which Sonnet 5 does support. As of launch, Amazon Bedrock supports tool changes on Claude Opus 5 only.
</Note>

```json lines theme={null}
// Messages API
{
  "model": "anthropic/claude-opus-5",
  "max_tokens": 1024,
  "tools": [
    {
      "name": "get_weather",
      "description": "Get weather",
      "input_schema": { "type": "object", "properties": { "city": { "type": "string" } } }
    },
    {
      "name": "get_forecast",
      "description": "Get 5-day forecast",
      "input_schema": { "type": "object", "properties": { "city": { "type": "string" } } },
      "defer_loading": true
    }
  ],
  "messages": [
    { "role": "user", "content": "What tools do you have for weather in Paris?" },
    {
      "role": "system",
      "content": [
        { "type": "tool_addition", "tool": { "type": "tool_reference", "name": "get_forecast" } }
      ]
    }
  ]
}
```

To change a tool's definition, remove the old tool with `tool_removal`, then send the updated definition in `tools[]` on the next request.

<Note>
  This feature is only supported on OpenRouter's [Messages API](/docs/api/api-reference/anthropic-messages/create-a-message) (`/api/v1/messages`) — the Chat Completions API has no representation for these blocks. You do **not** need to send the `anthropic-beta: mid-conversation-tool-changes-2026-07-01` header: OpenRouter detects requests that use tool changes and attaches the beta for you, and routes those requests only to providers that support it.
</Note>

## Fast Mode

Like Opus 4.6–4.8, Opus 5 supports fast mode with up to 2.5x faster output at premium pricing. Send `speed: "fast"` (or `service_tier: "fast"` / `"priority"`) with `anthropic/claude-opus-5` — the request routes to the model's `fast` service tier endpoint.

The dedicated [`anthropic/claude-opus-5-fast`](https://openrouter.ai/anthropic/claude-opus-5-fast) model is deprecated: it keeps working and is served by the same fast tier capacity, but new integrations should target `anthropic/claude-opus-5`. See [Fast Mode](/docs/cookbook/coding-agents/claude-code-integration#fast-mode) for details.

## Migration Checklist

1. Swap the slug to `anthropic/claude-opus-5`. Requests that don't configure reasoning now run with reasoning on — verify your response handling and latency/cost assumptions, or disable reasoning explicitly.
2. If you disable reasoning with `xhigh`/`max` effort, either re-enable reasoning or lower effort to `high` or below.
3. If you manage large tool sets on the Messages API, adopt `defer_loading` + `tool_addition`/`tool_removal` to keep the prompt cache warm across tool-set changes.

## Breaking Changes

| Behavior                                          | Opus 4.8           | Opus 5                          |
| ------------------------------------------------- | ------------------ | ------------------------------- |
| Reasoning default                                 | Off unless enabled | **On** unless disabled          |
| `reasoning.enabled: false` + `xhigh`/`max` effort | Allowed            | Rejected upstream (400)         |
| Thinking modes (when enabled)                     | Adaptive           | Adaptive only (budgets ignored) |

## Resources

* [Reasoning Tokens](/docs/guides/best-practices/reasoning-tokens)
* [OpenRouter Messages API](/docs/api/api-reference/anthropic-messages/create-a-message)
* [Fast Mode](/docs/cookbook/coding-agents/claude-code-integration#fast-mode)
* [Anthropic model migration guide](https://platform.claude.com/docs/en/about-claude/models/migration-guide)
