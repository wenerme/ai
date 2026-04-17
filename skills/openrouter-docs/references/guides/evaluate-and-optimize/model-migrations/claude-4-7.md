For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/guides/evaluate-and-optimize/model-migrations/llms.txt. For full documentation content, see https://openrouter.ai/docs/guides/evaluate-and-optimize/model-migrations/llms-full.txt.

## What's New

See Anthropic's [Migrating to Claude Opus 4.7](https://platform.claude.com/docs/en/about-claude/models/migration-guide#migrating-to-claude-opus-4-7) for a full overview of changes.

Claude 4.7 Opus introduces three major changes:

1. **Sampling parameters removed** — `temperature`, `top_p`, and `top_k` are no longer supported and will be ignored
2. **Adaptive-only thinking** — `thinking.budget_tokens` is no longer supported; `reasoning.effort` and `reasoning.max_tokens` are ignored (adaptive thinking is used instead)
3. **New `'xhigh'` effort level** — A new effort level between `'high'` and `'max'` via `verbosity` / `output_config.effort`

## Sampling Parameters Removed

Claude 4.7 Opus no longer accepts `temperature`, `top_p`, or `top_k`. If you pass these parameters, they will be silently ignored — your request will still succeed, but the parameters will have no effect.

```json
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

Claude 4.7 Opus uses adaptive thinking exclusively. The model determines how much to think based on task complexity — you cannot set a fixed token budget.

This means:

* `reasoning.max_tokens` is ignored (adaptive used) — budget-based thinking is not available
* `reasoning.effort` is ignored (adaptive used) — the model decides its own reasoning depth
* The raw Anthropic `thinking.budget_tokens` parameter is not supported

To control overall response effort, use `verbosity` instead (see below).

```json
// Reasoning is always adaptive on 4.7 Opus
{
  "model": "anthropic/claude-4.7-opus",
  "reasoning": { "enabled": true },
  "messages": [{ "role": "user", "content": "Solve this problem step by step" }]
}
```

```json
// reasoning.max_tokens is ignored (adaptive used)
{
  "model": "anthropic/claude-4.7-opus",
  "reasoning": { "enabled": true, "max_tokens": 10000 },
  "messages": [{ "role": "user", "content": "Hello" }]
}
// ↑ Equivalent to just { "reasoning": { "enabled": true } }
```

```json
// reasoning.effort is ignored (adaptive used)
{
  "model": "anthropic/claude-4.7-opus",
  "reasoning": { "enabled": true, "effort": "low" },
  "messages": [{ "role": "user", "content": "Hello" }]
}
// ↑ Equivalent to just { "reasoning": { "enabled": true } }
```

## New `'xhigh'` Effort Level

A new `'xhigh'` effort level is available between `'high'` and `'max'` via the `verbosity` parameter. This maps to Anthropic's `output_config.effort`.

```json
{
  "model": "anthropic/claude-4.7-opus",
  "verbosity": "xhigh"
}
```

The full effort scale is now: `low` → `medium` → `high` → `xhigh` → `max`

<Note>
  `'xhigh'` is only supported on Claude 4.7 Opus. `'max'` is supported on Claude 4.6+. For older models, both automatically fall back to `'high'`.
</Note>

## Verbosity Is Now the Primary Control

Since sampling parameters and reasoning budgets are removed, `verbosity` (which maps to `output_config.effort`) is the main way to influence Claude 4.7 Opus behavior:

| Parameter                       | Claude 4.7 Opus Behavior                                  |
| ------------------------------- | --------------------------------------------------------- |
| `temperature`, `top_p`, `top_k` | Ignored                                                   |
| `reasoning.effort`              | Ignored (adaptive used)                                   |
| `reasoning.max_tokens`          | Ignored (adaptive used)                                   |
| `verbosity`                     | Controls overall response effort (`output_config.effort`) |

```json
// Use verbosity to control response detail and effort
{ "model": "anthropic/claude-4.7-opus", "verbosity": "xhigh" }
```

## Breaking Changes

| Feature                           | Opus 4.6                | Opus 4.7                |
| --------------------------------- | ----------------------- | ----------------------- |
| `temperature` / `top_p` / `top_k` | Supported               | Ignored                 |
| Default Thinking Mode             | Adaptive                | Adaptive                |
| `reasoning.max_tokens`            | Budget-based            | Ignored (adaptive used) |
| `reasoning.effort`                | Ignored (adaptive used) | Ignored (adaptive used) |
| `verbosity: 'xhigh'`              | Falls back to `high`    | Supported               |
| `verbosity: 'max'`                | Supported               | Supported               |