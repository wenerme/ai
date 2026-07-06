> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude 4.6 Migration Guide

> Migrate to Claude 4.6 with adaptive thinking and max effort level

<Note>
  **Update · June 22, 2026**

  As of June 22, 2026, OpenRouter maps `reasoning.effort` to Anthropic's `output_config.effort` on Claude 4.6 and newer models — previously it was ignored. `verbosity` is unchanged: it still sets `output_config.effort`, and wins if both are passed.
</Note>

## What's New

See Anthropic's [What's new in Claude 4.6](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-6) for a full overview of new features.

Claude 4.6 Opus and 4.6 Sonnet introduce two major changes to reasoning:

1. **Adaptive Thinking** — Claude decides how much to think based on task complexity, replacing budget-based extended thinking
2. **Max Effort Level** — A new `'max'` effort level above `'high'` (Opus 4.6 and Sonnet 4.6 only)

## Adaptive Thinking

For Claude 4.6 Opus and 4.6 Sonnet, OpenRouter now uses adaptive thinking (`thinking.type: 'adaptive'`) by default instead of budget-based thinking (`thinking.type: 'enabled'` with `budget_tokens`).

### How it works

* When you enable reasoning without specifying `reasoning.max_tokens`, Claude 4.6 Opus and 4.6 Sonnet use adaptive thinking
* Claude automatically determines the appropriate amount of reasoning based on task complexity
* You don't need to estimate or tune token budgets

### When budget-based thinking is still used

* If you explicitly set `reasoning.max_tokens`, budget-based thinking is used
* If you pass the raw Anthropic `thinking` parameter directly

```json lines theme={null}
// Adaptive thinking (recommended for 4.6)
{
  "model": "anthropic/claude-4.6-opus",  // or "anthropic/claude-4.6-sonnet"
  "reasoning": { "enabled": true }
}
```

```json lines theme={null}
// Budget-based thinking (still supported)
{
  "model": "anthropic/claude-4.6-opus",  // or "anthropic/claude-4.6-sonnet"
  "reasoning": { "enabled": true, "max_tokens": 10000 }
}
```

## Max Effort Level

A new `'max'` effort level is available for Claude 4.6 Opus and 4.6 Sonnet via the `verbosity` parameter. See Anthropic's [effort documentation](https://platform.claude.com/docs/en/build-with-claude/effort) for details on how effort controls response thoroughness and token usage.

```json lines theme={null}
{
  "model": "anthropic/claude-4.6-opus",  // or "anthropic/claude-4.6-sonnet"
  "verbosity": "max"
}
```

<Note>
  `'max'` is only supported on Claude 4.6 Opus and 4.6 Sonnet. For other models, it automatically falls back to `'high'`.
</Note>

## Verbosity vs Reasoning Effort

On Claude 4.6, both parameters set the same upstream value: Anthropic's `output_config.effort`.

| Parameter          | When it applies           | Effect on 4.6               |
| ------------------ | ------------------------- | --------------------------- |
| `verbosity`        | Always                    | Sets `output_config.effort` |
| `reasoning.effort` | When reasoning is enabled | Sets `output_config.effort` |

Details:

* If both are passed, `verbosity` wins.
* `reasoning.effort: 'minimal'` maps to `'low'` (Anthropic's lowest level); `'none'` disables reasoning entirely, so no `output_config.effort` is sent.
* Thinking itself stays adaptive either way. On 4.6, `reasoning.effort` no longer influences a thinking token budget.

```json lines theme={null}
// verbosity works - controls response detail
{ "model": "anthropic/claude-4.6-opus", "verbosity": "max" }  // also works with anthropic/claude-4.6-sonnet
```

```json lines theme={null}
// reasoning.effort maps to output_config.effort (thinking stays adaptive)
{ "model": "anthropic/claude-4.6-opus", "reasoning": { "enabled": true, "effort": "low" } }  // also applies to anthropic/claude-4.6-sonnet
```

## Breaking Changes

None. Existing requests continue to work:

* Budget-based thinking still works when `reasoning.max_tokens` is set
* `reasoning.effort` values still convert to `thinking.budget_tokens` for older models. For Opus 4.6 and Sonnet 4.6, `reasoning.effort` instead maps to Anthropic's `output_config.effort` (same as `verbosity`; `verbosity` wins if both are passed).
* Older models (4.5 Opus, 3.7 Sonnet, etc.) behave exactly as before

| Feature                | Opus 4.5                             | Opus 4.6 / Sonnet 4.6          |
| ---------------------- | ------------------------------------ | ------------------------------ |
| Default thinking mode  | Budget-based                         | Adaptive                       |
| `reasoning.max_tokens` | Sets a thinking budget               | Sets a thinking budget         |
| `reasoning.effort`     | Converts to `thinking.budget_tokens` | Maps to `output_config.effort` |
| `'max'` effort level   | Falls back to `'high'`               | Supported                      |
