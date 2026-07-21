> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude 5 Sonnet Migration Guide

> Migrate to Claude 5 Sonnet — sampling parameters removed, adaptive-only thinking, and the new xhigh effort level

## What's New

See Anthropic's [model migration guide](https://platform.claude.com/docs/en/about-claude/models/migration-guide) for a full overview of changes.

Claude 5 Sonnet introduces three major changes versus Sonnet 4.6:

1. **Sampling parameters removed** — `temperature`, `top_p`, and `top_k` are no longer supported and will be ignored
2. **Adaptive-only thinking** — when reasoning is enabled the only supported mode is adaptive; `thinking.budget_tokens` is no longer supported and `reasoning.max_tokens` is ignored
3. **New `'xhigh'` effort level** — a new effort level between `'high'` and `'max'` via `verbosity` / `output_config.effort`

It also adds real-time [cyber safeguards](#cyber-safeguards).

## Sampling Parameters Removed

Claude 5 Sonnet no longer accepts `temperature`, `top_p`, or `top_k`. If you pass these parameters, they will be silently ignored — your request will still succeed, but the parameters will have no effect.

```json lines theme={null}
// These parameters are ignored on Claude 5 Sonnet
{
  "model": "anthropic/claude-sonnet-5",
  "temperature": 0.5,
  "top_p": 0.9,
  "top_k": 50,
  "messages": [{ "role": "user", "content": "Hello" }]
}
```

## Adaptive-Only Thinking

Claude 5 Sonnet supports only adaptive thinking. On Sonnet 4.6, reasoning could be controlled via a token budget (`reasoning.max_tokens` / `thinking.budget_tokens`) or left adaptive; on Sonnet 5, budget-based thinking is removed and adaptive is the only remaining mode when reasoning is on. The new API default is adaptive thinking on at effort `high`.

Reasoning itself remains opt-in on all Anthropic models via [`reasoning.enabled=true`](/docs/guides/best-practices/reasoning-tokens) — Sonnet 5 does not change that.

Concretely on Sonnet 5:

* `reasoning.max_tokens` is accepted but ignored
* `reasoning.effort` maps to Anthropic's `output_config.effort` (see [Parameter Summary](#parameter-summary)) rather than a thinking budget
* `thinking.budget_tokens` is no longer supported upstream

To influence overall response effort (not reasoning-specific), use [`verbosity`](#new-xhigh-effort-level). It maps to Anthropic's `output_config.effort` and applies whether or not reasoning is enabled.

```json lines theme={null}
// Opt in to adaptive thinking — the only thinking mode on Sonnet 5
{
  "model": "anthropic/claude-sonnet-5",
  "reasoning": { "enabled": true },
  "messages": [{ "role": "user", "content": "Solve this problem step by step" }]
}
```

```json lines theme={null}
// reasoning.max_tokens is ignored (adaptive used)
{
  "model": "anthropic/claude-sonnet-5",
  "reasoning": { "enabled": true, "max_tokens": 10000 },
  "messages": [{ "role": "user", "content": "Hello" }]
}
// ↑ Equivalent to just { "reasoning": { "enabled": true } }
```

```json lines theme={null}
// reasoning.effort maps to output_config.effort (thinking stays adaptive)
{
  "model": "anthropic/claude-sonnet-5",
  "reasoning": { "enabled": true, "effort": "low" },
  "messages": [{ "role": "user", "content": "Hello" }]
}
// ↑ Equivalent to { "reasoning": { "enabled": true }, "verbosity": "low" }
```

## New `'xhigh'` Effort Level

A new `'xhigh'` effort level is available between `'high'` and `'max'` via the `verbosity` parameter. This maps to Anthropic's `output_config.effort`.

```json lines theme={null}
{
  "model": "anthropic/claude-sonnet-5",
  "verbosity": "xhigh"
}
```

The full effort scale is now: `low` → `medium` → `high` → `xhigh` → `max`.

<Note>
  Sonnet 4.6 supported `low`, `medium`, `high`, and `max`. Sonnet 5 adds `'xhigh'` between `'high'` and `'max'`. For models that don't support a given level, it automatically falls back to the next supported level (`'xhigh'` → `'high'`).
</Note>

## Cyber Safeguards

Like Opus 4.7 and 4.8, Claude 5 Sonnet ships with real-time cyber classifiers that block some high-risk dual-use activities. Affected requests are refused upstream by Anthropic; OpenRouter surfaces the refusal as-is. See Anthropic's [Real-time cyber safeguards on Claude](https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude) for details.

## Parameter Summary

With sampling parameters and reasoning budgets removed on Sonnet 5, `output_config.effort` is the remaining lever for influencing overall response effort. You can set it via `verbosity`, or via `reasoning.effort` when reasoning is enabled (`verbosity` wins if both are passed; `'minimal'` maps to `'low'`, and `'none'` disables reasoning entirely so no `output_config.effort` is sent).

| Parameter                       | Claude 5 Sonnet Behavior                                |
| ------------------------------- | ------------------------------------------------------- |
| `temperature`, `top_p`, `top_k` | Ignored                                                 |
| `reasoning.max_tokens`          | Ignored (adaptive used)                                 |
| `reasoning.effort`              | Sets `output_config.effort` (when reasoning is enabled) |
| `verbosity`                     | Sets `output_config.effort`                             |

```json lines theme={null}
{ "model": "anthropic/claude-sonnet-5", "verbosity": "xhigh" }
```

## Breaking Changes

| Feature                                        | Sonnet 4.6                  | Sonnet 5                    |
| ---------------------------------------------- | --------------------------- | --------------------------- |
| `temperature` / `top_p` / `top_k`              | Supported                   | Ignored                     |
| Thinking modes (when `reasoning.enabled=true`) | Adaptive or budget-based    | Adaptive only               |
| `reasoning.max_tokens`                         | Sets a thinking budget      | Ignored (adaptive used)     |
| `reasoning.effort`                             | Sets `output_config.effort` | Sets `output_config.effort` |
| `'xhigh'` effort level                         | Falls back to `'high'`      | Supported                   |
| `'max'` effort level                           | Supported                   | Supported                   |
