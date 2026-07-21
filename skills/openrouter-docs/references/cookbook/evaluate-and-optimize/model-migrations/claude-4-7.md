> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude 4.7 Migration Guide

> Migrate to Claude 4.7 Opus — sampling parameters removed, adaptive-only thinking, and new xhigh effort level

<Note>
  **Update · June 22, 2026**

  As of June 22, 2026, OpenRouter maps `reasoning.effort` to Anthropic's `output_config.effort` on Claude 4.6 and newer models — previously it was ignored. `verbosity` is unchanged: it still sets `output_config.effort`, and wins if both are passed.
</Note>

## What's New

See Anthropic's [Migrating to Claude Opus 4.7](https://platform.claude.com/docs/en/about-claude/models/migration-guide#migrating-to-claude-opus-4-7) for a full overview of changes.

Claude 4.7 Opus introduces three major changes:

1. **Sampling parameters removed** — `temperature`, `top_p`, and `top_k` are no longer supported and will be ignored
2. **Adaptive-only thinking** — when reasoning is enabled the only supported mode is adaptive; `thinking.budget_tokens` is no longer supported and `reasoning.max_tokens` is ignored
3. **New `'xhigh'` effort level** — a new effort level between `'high'` and `'max'` via `verbosity` / `output_config.effort`

## Sampling Parameters Removed

Claude 4.7 Opus no longer accepts `temperature`, `top_p`, or `top_k`. If you pass these parameters, they will be silently ignored — your request will still succeed, but the parameters will have no effect.

```json lines theme={null}
// These parameters are ignored on Claude 4.7 Opus
{
  "model": "anthropic/claude-4.7-opus",
  "temperature": 0.5,
  "top_p": 0.9,
  "top_k": 50,
  "messages": [{ "role": "user", "content": "Hello" }]
}
```

## Adaptive-Only Thinking

Claude 4.7 Opus supports only adaptive thinking. On 4.6, reasoning could be controlled via a token budget (`reasoning.max_tokens` / `thinking.budget_tokens`) or left adaptive; on 4.7, budget-based thinking is removed and adaptive is the only remaining mode when reasoning is on.

Reasoning itself remains opt-in on all Anthropic models via [`reasoning.enabled=true`](/docs/guides/best-practices/reasoning-tokens) — 4.7 does not change that.

Concretely on 4.7:

* `reasoning.max_tokens` is accepted but ignored
* `reasoning.effort` maps to Anthropic's `output_config.effort` (see [Parameter Summary](#parameter-summary)) rather than a thinking budget
* `thinking.budget_tokens` is no longer supported upstream

To influence overall response effort (not reasoning-specific), use [`verbosity`](#new-xhigh-effort-level). It maps to Anthropic's `output_config.effort` and applies whether or not reasoning is enabled.

```json lines theme={null}
// Opt in to adaptive thinking — the only thinking mode on 4.7 Opus
{
  "model": "anthropic/claude-4.7-opus",
  "reasoning": { "enabled": true },
  "messages": [{ "role": "user", "content": "Solve this problem step by step" }]
}
```

```json lines theme={null}
// reasoning.max_tokens is ignored (adaptive used)
{
  "model": "anthropic/claude-4.7-opus",
  "reasoning": { "enabled": true, "max_tokens": 10000 },
  "messages": [{ "role": "user", "content": "Hello" }]
}
// ↑ Equivalent to just { "reasoning": { "enabled": true } }
```

```json lines theme={null}
// reasoning.effort maps to output_config.effort (thinking stays adaptive)
{
  "model": "anthropic/claude-4.7-opus",
  "reasoning": { "enabled": true, "effort": "low" },
  "messages": [{ "role": "user", "content": "Hello" }]
}
// ↑ Equivalent to { "reasoning": { "enabled": true }, "verbosity": "low" }
```

## New `'xhigh'` Effort Level

A new `'xhigh'` effort level is available between `'high'` and `'max'` via the `verbosity` parameter. This maps to Anthropic's `output_config.effort`.

```json lines theme={null}
{
  "model": "anthropic/claude-4.7-opus",
  "verbosity": "xhigh"
}
```

The full effort scale is now: `low` → `medium` → `high` → `xhigh` → `max`.

<Note>
  `'xhigh'` is only supported on Claude 4.7 Opus. `'max'` is supported on Claude 4.6+. For older models, both automatically fall back to `'high'`.
</Note>

## Parameter Summary

With sampling parameters and reasoning budgets removed on 4.7, `output_config.effort` is the remaining lever for influencing overall response effort. You can set it via `verbosity`, or via `reasoning.effort` when reasoning is enabled (`verbosity` wins if both are passed; `'minimal'` maps to `'low'`, and `'none'` disables reasoning entirely so no `output_config.effort` is sent).

| Parameter                       | Claude 4.7 Opus Behavior                                |
| ------------------------------- | ------------------------------------------------------- |
| `temperature`, `top_p`, `top_k` | Ignored                                                 |
| `reasoning.max_tokens`          | Ignored (adaptive used)                                 |
| `reasoning.effort`              | Sets `output_config.effort` (when reasoning is enabled) |
| `verbosity`                     | Sets `output_config.effort`                             |

```json lines theme={null}
{ "model": "anthropic/claude-4.7-opus", "verbosity": "xhigh" }
```

## Breaking Changes

| Feature                                        | Opus 4.6                    | Opus 4.7                    |
| ---------------------------------------------- | --------------------------- | --------------------------- |
| `temperature` / `top_p` / `top_k`              | Supported                   | Ignored                     |
| Thinking modes (when `reasoning.enabled=true`) | Adaptive or budget-based    | Adaptive only               |
| `reasoning.max_tokens`                         | Sets a thinking budget      | Ignored (adaptive used)     |
| `reasoning.effort`                             | Sets `output_config.effort` | Sets `output_config.effort` |
| `'xhigh'` effort level                         | Falls back to `'high'`      | Supported                   |
| `'max'` effort level                           | Supported                   | Supported                   |
