> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude Fable 5.1 Migration Guide

> Migrate to Claude Fable 5.1 — ephemeral system messages, per-turn effort, forced tool use rejected, mid-thinking display updates, and prefix-locked thinking

## What's New

Claude Fable 5.1 ships as [`anthropic/claude-fable-5.1`](https://openrouter.ai/anthropic/claude-fable-5.1). Existing Fable 5 prompts should work out of the box, but five API changes matter for migration:

1. **Forced tool use is rejected** — `tool_choice: {"type": "any"}` or a named tool returns a 400
2. **Ephemeral mid-conversation system messages (beta)** — one-turn reminders via `clear_at` that never invalidate the prompt cache
3. **Per-turn effort changes (beta)** — raise or lower effort mid-conversation without a cache bust
4. **Mid-thinking display updates (beta)** — request real-time progress summaries during long tool-using turns
5. **Prefix-locked thinking** — thinking blocks are bound to the transcript prefix that produced them; largely not enforced on requests through OpenRouter (see below)

The new request controls are available on OpenRouter's [Messages API](/docs/api/api-reference/anthropic-messages/create-a-message) (`/api/v1/messages`) only. You do **not** need to send the Anthropic beta headers for any of them: OpenRouter detects requests that use each feature, attaches the corresponding beta for you, and routes those requests only to providers that support it.

## Ephemeral Mid-Conversation System Messages (Beta)

Previously, a one-turn reminder ("the user can't see that tool output") meant injecting a message into history and deleting it on the next request — an edit that invalidates the prompt cache (and, on accounts with [prefix-lock enforcement](#prefix-locked-thinking), every thinking block after it). Now a mid-conversation system message can be marked ephemeral with `clear_at`: it carries system-prompt authority for the next turn, then automatically stops rendering to the model. The message stays in your transcript — keep sending it back verbatim — so the prefix is unchanged, the cache stays warm, and after it clears it costs no tokens.

```json lines theme={null}
// Messages API
{
  "model": "anthropic/claude-fable-5.1",
  "max_tokens": 4096,
  "messages": [
    { "role": "user", "content": "Run the analysis script." },
    { "role": "assistant", "content": "Running it now: ..." },
    {
      "role": "system",
      "clear_at": "next_user_message",
      "content": "Results have landed in your inbox; check it before running more code."
    },
    { "role": "user", "content": "What did we get?" }
  ]
}
```

## Per-Turn Effort Changes (Beta)

Effort previously applied to the whole conversation as a top-level parameter. Now a system message with an `output_config` can change effort per turn — up for a hard step, back down for routine ones — without invalidating the prompt cache:

```json lines theme={null}
// Messages API
{
  "model": "anthropic/claude-fable-5.1",
  "max_tokens": 4096,
  "output_config": { "effort": "high" },
  "messages": [
    { "role": "user", "content": "Plan the migration." },
    { "role": "assistant", "content": "Here's the plan: ..." },
    { "role": "system", "content": [], "output_config": { "effort": "low" } },
    { "role": "user", "content": "Now rename the config file." }
  ]
}
```

## Forced Tool Use Is Rejected

On models with thinking always enabled, forcing a tool call makes the model skip its thinking entirely and squeeze its working-out into the tool arguments. Starting with Fable 5.1, requests with `tool_choice` set to `{"type": "any"}` or a named tool return a 400. `{"type": "auto"}` (the default) and `{"type": "none"}` are unaffected.

To migrate:

* **Steering toward a tool**: use `tool_choice: {"type": "auto"}` and state the expectation in the prompt (e.g. "Use the get\_weather tool to answer"). Fable 5.1 follows explicit tool instructions reliably, and thinking first improves argument quality.
* **Extracting structured data**: if you were forcing a tool call to get JSON back, use [structured outputs](/docs/guides/features/structured-outputs) instead, which constrain the response format without skipping thinking.

```json lines theme={null}
// Messages API — steer with auto + prompt instead of forcing
{
  "model": "anthropic/claude-fable-5.1",
  "max_tokens": 4096,
  "tools": [{ "name": "get_weather", "description": "...", "input_schema": {} }],
  "tool_choice": { "type": "auto" },
  "messages": [
    { "role": "user", "content": "Use the get_weather tool to check Tokyo, then summarize." }
  ]
}
```

## Mid-Thinking Display Updates (Beta)

The `thinking.display` field controls how thinking is surfaced. `"summarized"` (the default) streams a summarized thinking trace; `"omitted"` returns none. New in Fable 5.1, `"updates"` is designed for long tool-using turns: instead of the summarized trace, it's meant to surface short progress notes in the thinking blocks between tool calls — what the model just found, what it's doing next.

```json lines theme={null}
// Messages API
{
  "model": "anthropic/claude-fable-5.1",
  "max_tokens": 4096,
  "thinking": { "type": "adaptive", "display": "updates" },
  "tools": ["..."],
  "messages": [{ "role": "user", "content": "Review the PRs open against our billing service." }]
}
```

How much text `"updates"` actually emits depends on the shape of the turn: in our testing, requests outside multi-tool agent loops returned an empty thinking block where `"summarized"` streamed a full trace. If your UI needs thinking text on every request, stay on `"summarized"`.

Relatedly, Fable 5.1 writes fewer progress notes between tool calls than Fable 5, and may batch fewer independent tool calls per turn in long agent loops. If your interface renders progress or depends on parallel tool calls, prompt for them explicitly — a `clear_at` ephemeral system message is a cache-friendly place for that instruction. See [Anthropic's Fable 5.1 migration guide](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide) for the full behavior-change list.

## Prefix-Locked Thinking

Upstream, Fable 5.1 can bind each thinking block to the transcript prefix that produced it: replaying a thinking block after editing earlier history (injected/removed messages, in-place summarization, a changed system prompt) returns a 400 `invalid_request_error` on enforced accounts.

**Requests through OpenRouter are not subject to this enforcement**: history edits that would 400 against the Anthropic API directly succeed through OpenRouter. If you want to audit or drop mismatched thinking blocks anyway, set the opt-in mismatch handling below.

```json lines theme={null}
// Messages API — drop mismatched thinking blocks instead of erroring
{
  "model": "anthropic/claude-fable-5.1",
  "max_tokens": 4096,
  "thinking": {
    "type": "adaptive",
    "block_binding": { "prefix_mismatch_behavior": "drop_block" }
  },
  "messages": ["...full history with thinking blocks replayed verbatim..."]
}
```

With `drop_block`, mismatched blocks are discarded upstream and each removal is reported in the response's `input_transformations`, which makes it a good audit tool: run a session with it set, log `input_transformations`, and fix any `prefix_binding_mismatch` your harness produces. (`model_binding_mismatch` entries after a model switch are expected.) Simple compaction — one summary message plus the new user turn, nothing else replayed — never mismatches; keep-tail and async compaction can, on the retained turns.

## Migration Checklist

1. Swap the slug to `anthropic/claude-fable-5.1`.
2. Replace forced tool use (`tool_choice: {"type": "any"}` or a named tool) with `{"type": "auto"}` plus prompt instructions, or structured outputs for JSON extraction.
3. Replace per-turn reminder injection with `clear_at` ephemeral system messages, and whole-conversation effort switching with per-message `output_config`.
4. If your product shows progress during long agentic turns, try `thinking: { "type": "adaptive", "display": "updates" }` — and keep `"summarized"` where you need thinking text on every request.
5. Keep passing thinking blocks back unchanged. To audit transcript edits, use `prefix_mismatch_behavior: "drop_block"` with `input_transformations` logging.
6. Re-baseline cost: input/output pricing matches Fable 5, and prompt cache reads cost a quarter of the Fable 5 rate.

## Breaking Changes

| Behavior                                       | Fable 5                 | Fable 5.1                                                                                    |
| ---------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| `tool_choice: {"type": "any"}` or named tool   | Allowed                 | Rejected upstream (400)                                                                      |
| Effort changes                                 | Whole-conversation only | Per-turn via system `output_config`                                                          |
| Replaying thinking blocks after a history edit | Allowed                 | Can be rejected (400) on enforced accounts; not enforced via OpenRouter's Anthropic endpoint |

## Resources

* [Claude Opus 5 Migration Guide](/docs/cookbook/evaluate-and-optimize/model-migrations/opus-5) — mid-conversation tool changes, which Fable 5.1 also supports
* [Reasoning Tokens](/docs/guides/best-practices/reasoning-tokens)
* [Structured Outputs](/docs/guides/features/structured-outputs)
* [OpenRouter Messages API](/docs/api/api-reference/anthropic-messages/create-a-message)
* [Anthropic Claude Fable 5.1 migration guide](https://platform.claude.com/docs/en/models/fable-5-1/migration-guide)
