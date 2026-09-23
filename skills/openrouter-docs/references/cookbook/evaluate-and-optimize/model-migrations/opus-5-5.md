> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude Opus 5.5 Migration Guide

> Migrate from Claude Opus 5 to Claude Opus 5.5. Adaptive-only thinking with effort as the main control, forced tool use retired, mid-thinking display updates, preserved thinking, and 20% lower pricing

## What's New

Claude Opus 5.5 ships as [`anthropic/claude-opus-5.5`](https://openrouter.ai/anthropic/claude-opus-5.5). Most Opus 5 prompts work unchanged. The API changes are the same set that arrived with [Fable 5.1](/docs/cookbook/evaluate-and-optimize/model-migrations/fable-5-1), plus one that is new for the Opus line.

1. **Thinking is always adaptive.** Turning thinking off or setting a thinking budget is rejected, and `effort` is the control for depth, latency, and cost
2. **Forced tool use is rejected.** `tool_choice: {"type": "any"}` or a named tool returns a 400
3. **Mid-thinking display updates (beta).** Request short progress notes during long tool-using turns
4. **Preserved thinking.** Thinking blocks are bound to the transcript prefix that produced them. Not enforced on requests through OpenRouter (see below)
5. **Cache-friendly mid-conversation controls (beta).** Ephemeral system messages via `clear_at` and per-turn effort changes, carried over from Fable 5.1
6. **Computer use requires the new toolset.** Relevant only if you call Anthropic directly, see below

Pricing drops to $4/M input and $20/M output (20% below Opus 5), and prompt cache reads to \$0.20/M (60% below Opus 5). Context stays at 1M tokens.

The Messages API-only controls (`clear_at`, per-message `output_config`, `thinking.display`, `thinking.block_binding`) are available on OpenRouter's [Messages API](/docs/api/api-reference/anthropic-messages/create-a-message) (`/api/v1/messages`). You do **not** need to send Anthropic beta headers. OpenRouter detects requests that use each feature, attaches the corresponding beta, and routes those requests only to providers that support it.

## Thinking Is Always Adaptive

On Opus 5, reasoning was on by default but could be disabled, or given a fixed budget with `thinking.budget_tokens` / `reasoning.max_tokens`. On Opus 5.5 both options are gone upstream. Anthropic returns a 400 `invalid_request_error` for `thinking: {"type": "disabled"}` and for `thinking: {"type": "enabled", "budget_tokens": ...}`. Omitting `thinking` or setting `{"type": "adaptive"}` are the only valid forms, and `output_config.effort` (`low`, `medium`, `high`, `xhigh`, `max`) decides how much the model thinks.

How this surfaces through OpenRouter

* **Disabling reasoning fails at OpenRouter, not upstream.** The model is registered as mandatory-reasoning, so `reasoning: {"enabled": false}`, `reasoning: {"effort": "none"}`, and Messages API `thinking: {"type": "disabled"}` return a 400 (`Reasoning is mandatory for this endpoint and cannot be disabled.`) before the request is routed. The exception is a `~latest` router alias, where OpenRouter coerces a disable request to the lowest supported effort instead. The `/models` entry reports `reasoning.mandatory: true` so client UIs can hide the disable control (see [Reasoning Tokens](/docs/guides/best-practices/reasoning-tokens#discovering-per-model-reasoning-options)).
* **Budgets are not forwarded.** `reasoning.max_tokens` and `thinking.budget_tokens` are accepted by OpenRouter but the request goes upstream as adaptive thinking with no budget, the same as [Sonnet 5](/docs/cookbook/evaluate-and-optimize/model-migrations/sonnet-5#adaptive-only-thinking). Remove them and set an effort instead.
* **Effort maps straight through.** Chat Completions `reasoning.effort` and Messages API `output_config.effort` both become Anthropic's `output_config.effort`. Requests that set no effort are sent without one and run at Anthropic's API default, which Anthropic's Opus 5.5 guide gives as `medium` (Opus 5's default was `high`), so a request that never set effort gets a different setting than it did on Opus 5.

```json lines theme={null}
// Chat Completions API — pick an effort instead of a budget
{
  "model": "anthropic/claude-opus-5.5",
  "reasoning": { "effort": "medium" },
  "messages": [{ "role": "user", "content": "Find the bug in this diff and propose a fix." }]
}
```

```json lines theme={null}
// Messages API — adaptive is the only thinking type; effort lives in output_config
{
  "model": "anthropic/claude-opus-5.5",
  "max_tokens": 64000,
  "thinking": { "type": "adaptive" },
  "output_config": { "effort": "medium" },
  "messages": [{ "role": "user", "content": "Find the bug in this diff and propose a fix." }]
}
```

Two practical consequences of adaptive-only thinking

* **Leave room in `max_tokens`.** Thinking and the reply share the budget. Anthropic reports that 64k worked well for long agentic coding turns in its testing. A `max_tokens` sized for a non-thinking Opus 5 request can now end with `stop_reason: "max_tokens"` and no visible answer.
* **Read responses by block type.** A response can begin with a thinking block, so do not assume the first content block is text. Through OpenRouter, thinking blocks carry summarized text by default (OpenRouter sends `display: "summarized"` unless you set otherwise). Set `thinking.display` to `"omitted"`, or `reasoning.exclude: true` on Chat Completions, if you do not want it.

Anthropic's guidance is to re-tune effort rather than carry over your Opus 5 setting. In their testing Opus 5.5 at `medium` exceeded Opus 5 at `high` on coding and knowledge-work evaluations, and at a given effort Opus 5.5 thinks more per turn than Opus 5 did, especially at `xhigh` and `max`. Start at `medium`, lower it if you need faster first tokens, and raise it only where quality demands it. Prompt additions such as "Answer directly without deliberating." also reduce thinking, at some cost to quality on hard tasks, so measure on your workload.

## Forced Tool Use Is Rejected

On models with thinking always enabled, forcing a tool call makes the model skip its thinking and squeeze its working-out into the tool arguments. Starting with Fable 5.1, and now on Opus 5.5, requests with `tool_choice` set to `{"type": "any"}` or a named tool return a 400. `{"type": "auto"}` (the default) and `{"type": "none"}` are unaffected. Opus 5 still accepts all four forms.

OpenRouter's catalog records this per endpoint, so a forced `tool_choice` on `anthropic/claude-opus-5.5` fails at routing with no compatible endpoint rather than reaching the provider. The Chat Completions forms `tool_choice: "required"` and `{"type": "function", "function": {"name": ...}}` are covered the same way.

To migrate

* **Steering toward a tool**: use `tool_choice: {"type": "auto"}` and state the expectation in the prompt (e.g. "Use the get\_weather tool to answer"). Because `auto` does not guarantee a call, check that one was made and retry if not.
* **Extracting structured data**: if you were forcing a tool call to get JSON back, use [structured outputs](/docs/guides/features/structured-outputs) instead, which constrain the response format without skipping thinking.

```json lines theme={null}
// Messages API — steer with auto + prompt instead of forcing
{
  "model": "anthropic/claude-opus-5.5",
  "max_tokens": 16000,
  "tools": [{ "name": "get_weather", "description": "...", "input_schema": {} }],
  "tool_choice": { "type": "auto" },
  "messages": [
    { "role": "user", "content": "Use the get_weather tool to check Tokyo, then summarize." }
  ]
}
```

## Mid-Thinking Display Updates (Beta)

Between tool calls, Opus 5.5 writes short progress notes on what it just found and what it is doing next. On Opus 5 these came back as ordinary text. On Opus 5.5, as on Fable 5.1, notes longer than a sentence or two are returned as thinking blocks, so under `display: "omitted"` they are hidden along with the reasoning and a long turn can look silent.

`thinking.display` controls what thinking blocks contain. `"summarized"` (OpenRouter's default) returns a summarized reasoning trace and `"omitted"` returns empty thinking blocks. `"updates"` is meant for long tool-using turns: it returns a short summary of each progress note in its thinking block and leaves the reasoning blocks empty, so you can render any thinking block that has text.

```json lines theme={null}
// Messages API
{
  "model": "anthropic/claude-opus-5.5",
  "max_tokens": 64000,
  "thinking": { "type": "adaptive", "display": "updates" },
  "tools": ["..."],
  "messages": [{ "role": "user", "content": "Review the PRs open against our billing service." }]
}
```

How much text `"updates"` emits depends on the shape of the turn. Outside multi-tool agent loops it can return an empty thinking block where `"summarized"` would stream a full trace. If your UI needs thinking text on every request, stay on `"summarized"`. If part of a long turn needs to reach the user verbatim (a code snippet, for example), give the model a simple tool for sending a message and tell it to reserve the tool for that content, declaring it from the first request of the session (see [Preserved Thinking](#preserved-thinking)).

As of September 2026 OpenRouter routes `display: "updates"` requests for Opus 5.5 to Anthropic, Claude Platform on AWS, Google Vertex, Azure, and Amazon Bedrock endpoints.

## Preserved Thinking

Preserved thinking ties each thinking block to the conversation that produced it, meaning the system prompt, the tool list, and every message before it. Upstream, replaying a thinking block after editing any part of that prefix (injected or removed messages, in-place summarization, a changed system prompt, a changed tool list) returns a 400 `invalid_request_error` on enforced accounts (Anthropic API accounts created on or after August 31, 2026), or drops the affected blocks if you opt in to `drop_block`.

**Requests through OpenRouter are not subject to this enforcement**, as with Fable 5.1. History edits that would 400 against the Anthropic API directly succeed through OpenRouter. Anthropic still recommends making harnesses prefix-stable now, because a stable prefix also improves prompt-cache hit rates. If your harness replays history exactly as received and only appends, nothing changes for you. Three kinds of edit break the prefix, and each has an append-only alternative:

* **Per-turn reminders or mid-session system prompt changes**: append a mid-conversation system message instead of editing the system prompt, and for a one-turn reminder mark it ephemeral with `clear_at: "next_user_message"`. Anthropic states this applies to Opus 5.5 as it does to Fable 5.1, see [Ephemeral Mid-Conversation System Messages](/docs/cookbook/evaluate-and-optimize/model-migrations/fable-5-1#ephemeral-mid-conversation-system-messages-beta).
* **Adding or removing tools**: declare the full set at session start and send a [mid-conversation tool-change block](/docs/cookbook/evaluate-and-optimize/model-migrations/opus-5#mid-conversation-tool-changes-beta) instead of changing `tools`.
* **Compaction that summarizes older turns while replaying newer ones with their thinking blocks**: replace the whole history with one summary message and replay no earlier thinking blocks, or set `drop_block` below so mismatched blocks are dropped instead of erroring.

```json lines theme={null}
// Messages API — drop mismatched thinking blocks instead of erroring
{
  "model": "anthropic/claude-opus-5.5",
  "max_tokens": 64000,
  "thinking": {
    "type": "adaptive",
    "block_binding": { "prefix_mismatch_behavior": "drop_block" }
  },
  "messages": ["...full history with thinking blocks replayed verbatim..."]
}
```

With `drop_block`, each removal is reported in the response's `input_transformations`, which makes it a good audit tool. Run a session with it set, log `input_transformations`, and fix any `prefix_binding_mismatch` your harness produces. (`model_binding_mismatch` entries after a model switch are expected.)

## Per-Turn Effort Changes (Beta)

Changing effort between requests on a conversation invalidates the prompt cache. Opus 5.5 supports the per-turn form introduced with Fable 5.1: a system-role message with `output_config.effort` that applies to the next assistant turn only, without a cache bust. Details and request shape are in the [Fable 5.1 guide](/docs/cookbook/evaluate-and-optimize/model-migrations/fable-5-1#per-turn-effort-changes-beta).

```json lines theme={null}
// Messages API — raise effort for one turn
{
  "model": "anthropic/claude-opus-5.5",
  "max_tokens": 64000,
  "messages": [
    { "role": "user", "content": "Summarize the failing test output." },
    { "role": "assistant", "content": "Three tests fail in the billing module..." },
    { "role": "system", "content": [], "output_config": { "effort": "xhigh" } },
    { "role": "user", "content": "Now find the root cause and fix it." }
  ]
}
```

Provider caveat, measured September 2026. Anthropic, Claude Platform on AWS, Google Vertex, and Azure accept per-message `output_config.effort` on Opus-family models. Amazon Bedrock's InvokeModel API rejects it with a 400 (`Extra inputs are not permitted`), so OpenRouter does not route requests that use it to raw Bedrock endpoints. If you pin `provider.only` to Bedrock, use whole-conversation effort instead.

## Computer Use

On Opus 5, a computer-use application declares the computer tool with a type such as `computer_20251124`. Opus 5.5 accepts computer use only through Anthropic's newer computer toolset, declared as a single `tools` entry of the form `{"type": "computer_toolset_20260801"}` with no `name` field, and requests that declare one of the older computer tool types return a 400. The change is larger than the tool entry. Some request fields are removed, zoom is on by default, and the model can return several actions in one turn as separate tool calls.

This applies only if you call Anthropic's API directly. As of September 2026, OpenRouter's Messages API accepts client-defined tools plus Anthropic's bash, text editor, and web search tool types, among others, and does not accept either computer tool form, so computer-use requests through OpenRouter are rejected at validation on Opus 5 and Opus 5.5 alike. Follow [Anthropic's computer use documentation](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) for the direct-API migration.

## Migration Checklist

1. Swap the slug to `anthropic/claude-opus-5.5`.
2. Remove any `reasoning: {"enabled": false}`, `reasoning.effort: "none"`, `thinking: {"type": "disabled"}`, or thinking budget. Set an effort instead, starting at `medium`, and re-tune rather than carrying over your Opus 5 effort.
3. Raise `max_tokens` so thinking and the reply both fit, and parse responses by block type.
4. Replace forced tool use (`tool_choice: {"type": "any"}`, a named tool, or Chat Completions `"required"`) with `{"type": "auto"}` plus prompt instructions, or structured outputs for JSON extraction. Add a check-and-retry when a tool call is required.
5. If your product shows progress during long agentic turns, try `thinking: {"type": "adaptive", "display": "updates"}`, and keep `"summarized"` where you need thinking text on every request.
6. Keep passing thinking blocks back unchanged. Move per-turn reminders to `clear_at` system messages, tool-set changes to mid-conversation tool-change blocks, and audit transcript edits with `prefix_mismatch_behavior: "drop_block"` plus `input_transformations` logging.
7. If you pin to Amazon Bedrock, do not use per-message `output_config.effort`.
8. Re-baseline cost: $4/M input, $20/M output, \$0.20/M cache reads, 1M context. Anthropic reports fewer tokens per completed task at equal effort, so per-task cost may fall by more than the 20% list-price change.

## Breaking Changes

| Behavior                                                                         | Opus 5                              | Opus 5.5                                                                |
| -------------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------- |
| `thinking: {"type": "disabled"}` / `reasoning.enabled: false` / `effort: "none"` | Allowed (at effort `high` or lower) | Rejected (400 from OpenRouter, reasoning is mandatory)                  |
| `thinking.budget_tokens` / `reasoning.max_tokens`                                | Sets a thinking budget              | Not forwarded (adaptive used), rejected upstream if sent directly       |
| Default effort when none is set                                                  | `high`                              | `medium`                                                                |
| `tool_choice: {"type": "any"}` or named tool                                     | Allowed                             | Rejected (no compatible endpoint via OpenRouter, 400 upstream)          |
| Progress notes between tool calls                                                | Returned as text                    | Returned as thinking blocks, readable via `display: "updates"`          |
| Replaying thinking blocks after a history edit                                   | Allowed                             | Can be rejected (400) on enforced accounts, not enforced via OpenRouter |
| Computer use tool type (direct Anthropic API)                                    | `computer_20251124`                 | `computer_toolset_20260801` only                                        |
| Pricing (input / output / cache read, per M)                                     | $5 / $25 / \$0.50                   | $4 / $20 / \$0.20                                                       |

## Resources

* [Claude Fable 5.1 Migration Guide](/docs/cookbook/evaluate-and-optimize/model-migrations/fable-5-1), `clear_at` ephemeral system messages and per-turn effort in full
* [Claude Opus 5 Migration Guide](/docs/cookbook/evaluate-and-optimize/model-migrations/opus-5), mid-conversation tool changes
* [Reasoning Tokens](/docs/guides/best-practices/reasoning-tokens)
* [Structured Outputs](/docs/guides/features/structured-outputs)
* [OpenRouter Messages API](/docs/api/api-reference/anthropic-messages/create-a-message)
* [Anthropic model migration guide](https://platform.claude.com/docs/en/about-claude/models/migration-guide)
* [Anthropic preserved thinking](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking)
