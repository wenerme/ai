> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GPT-5.6 Migration Guide

> Adopt reasoning.mode, reasoning.context, and explicit prompt caching for the GPT-5.6 model family

## What's New

OpenAI's [GPT-5.6 family](https://openai.com/index/gpt-5-6/) ships in three tiers, each with a pro variant:

| Model                      | Tier                          |
| -------------------------- | ----------------------------- |
| `openai/gpt-5.6-sol`       | Flagship capability           |
| `openai/gpt-5.6-sol-pro`   | Sol with pro reasoning        |
| `openai/gpt-5.6-terra`     | Balanced performance and cost |
| `openai/gpt-5.6-terra-pro` | Terra with pro reasoning      |
| `openai/gpt-5.6-luna`      | Fastest, most affordable      |
| `openai/gpt-5.6-luna-pro`  | Luna with pro reasoning       |

There are no breaking changes. Existing requests keep working as-is — you can swap the model slug and stop there. The rest of this guide covers the additive pieces worth adopting:

* [`reasoning.mode`](#pro-mode-with-reasoningmode): route a request to a model's pro variant
* [`reasoning.context`](#persisted-reasoning-with-reasoningcontext): control which turns' reasoning the model uses
* [Explicit prompt caching](#explicit-prompt-caching): mark exactly which prompt prefixes get cached
* [Cache-write billing](#cache-write-billing): a new line item in usage accounting

These additions are supported by OpenAI GPT-5.6 and newer, and work on both the Chat Completions and Responses APIs.

<Note>
  You don't need to filter these fields per model. OpenRouter strips `reasoning.mode`, `prompt_cache_breakpoint`, and `prompt_cache_options` before forwarding requests to providers that don't support them, so requests that fall back to other models keep working.
</Note>

## Pro Mode with `reasoning.mode`

GPT-5.6 pro variants apply deeper multi-pass reasoning before returning a single final answer. Use them for hard, quality-first tasks where latency and token usage matter less.

There are two equivalent ways to request pro mode:

1. Send `reasoning.mode: "pro"` with the standard model — OpenRouter reroutes the request to the matching `*-pro` model listing.
2. Call the `*-pro` model listing directly.

```json lines theme={null}
{
  "model": "openai/gpt-5.6-sol",
  "input": "Prove that there are infinitely many primes.",
  "reasoning": {
    "mode": "pro"
  }
}
```

`mode` is independent of `effort`, so you can combine `mode: "pro"` with any supported effort level. Pro mode bills at the same per-token rates as standard mode but typically consumes more tokens.

See [Reasoning Mode](/docs/guides/best-practices/reasoning-tokens#reasoning-mode) for details.

## Persisted Reasoning with `reasoning.context`

When you echo reasoning items back in conversation history, `reasoning.context` controls which reasoning the model can use:

| Value            | Behavior                                                                        |
| ---------------- | ------------------------------------------------------------------------------- |
| omitted / `auto` | The model's default context mode                                                |
| `all_turns`      | The model can reference reasoning from all turns in the input                   |
| `current_turn`   | Only reasoning from the current turn is used; prior reasoning items are ignored |

Use `all_turns` for multi-turn work where goals stay stable and you want the model to build on its earlier chain of thought. Use `current_turn` for a fresh reasoning pass.

```json lines theme={null}
{
  "model": "openai/gpt-5.6-sol",
  "input": [
    { "role": "user", "content": "Solve this math problem step by step: ..." },
    {
      "type": "reasoning",
      "id": "rs_abc123",
      "encrypted_content": "...",
      "summary": [
        { "type": "summary_text", "text": "Analyzed the equation..." }
      ]
    },
    {
      "type": "message",
      "role": "assistant",
      "content": [{ "type": "output_text", "text": "The answer is 42." }]
    },
    { "role": "user", "content": "Now explain it differently." }
  ],
  "reasoning": {
    "effort": "high",
    "context": "all_turns"
  },
  "include": ["reasoning.encrypted_content"]
}
```

The default value of `context` may vary by model, so set it explicitly if your use case needs a specific behavior.

See [Reasoning Context Mode](/docs/guides/best-practices/reasoning-tokens#reasoning-context-mode) for details.

## Explicit Prompt Caching

Automatic prompt caching still works with no code changes. Explicit caching adds direct control over cache boundaries instead of relying on OpenAI's automatic breakpoint placement. Cached prefixes have a minimum 30-minute TTL.

The fields work in both the [Chat Completions](/docs/api/api-reference/chat/send-a-chat-completion-request) and [Responses](/docs/api/api-reference/responses/create-a-response) APIs.

Two controls:

* `prompt_cache_breakpoint`: placed on an individual text content block (`input_text` in Responses, `text` in Chat Completions) to mark the end of a reusable prefix. Everything through that block becomes the candidate cached prefix. Automatic caching stays enabled.
* `prompt_cache_options`: placed at the request root. Setting `mode` to `"explicit"` disables OpenAI-managed breakpoints so only blocks marked with `prompt_cache_breakpoint` participate in caching. Use `ttl` to request a cache duration (e.g. `"30m"`).

Responses API:

```json lines theme={null}
{
  "model": "openai/gpt-5.6-sol",
  "prompt_cache_key": "my-session-key",
  "prompt_cache_options": {
    "mode": "explicit",
    "ttl": "30m"
  },
  "input": [
    {
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "<REUSABLE_PREFIX>",
          "prompt_cache_breakpoint": {
            "mode": "explicit"
          }
        },
        {
          "type": "input_text",
          "text": "<TASK_SPECIFIC_SUFFIX>"
        }
      ]
    }
  ]
}
```

Chat Completions API:

```json lines theme={null}
{
  "model": "openai/gpt-5.6-sol",
  "prompt_cache_key": "my-session-key",
  "prompt_cache_options": {
    "mode": "explicit",
    "ttl": "30m"
  },
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "<REUSABLE_PREFIX>",
          "prompt_cache_breakpoint": {
            "mode": "explicit"
          }
        },
        {
          "type": "text",
          "text": "<TASK_SPECIFIC_SUFFIX>"
        }
      ]
    }
  ]
}
```

<Note>
  The block-level markers are interchangeable with the Anthropic-style `cache_control` blocks Chat Completions also accepts: `cache_control` becomes a `prompt_cache_breakpoint` on GPT-5.6+ models, and `prompt_cache_breakpoint` becomes a default 5-minute `cache_control` on Anthropic and Google. The request-level `prompt_cache_options` stays OpenAI-only.
</Note>

See [Prompt Caching](/docs/guides/best-practices/prompt-caching#openai) for details.

## Cache-Write Billing

For GPT-5.6 and later, OpenAI bills cache writes at 1.25x the model's uncached input rate — even with automatic caching, no opt-in required. Cache reads keep the discounted cache-read rate. Models before GPT-5.6 have no cache-write fee.

Cache activity is reported in `usage.input_tokens_details` (Responses) and `usage.prompt_tokens_details` (Chat Completions):

* `cache_write_tokens`: prompt tokens written to the cache
* `cached_tokens`: prompt tokens read from the cache

Track both to understand net caching cost. If your traffic rarely re-reads cached prefixes, explicit mode lets you avoid unnecessary cache writes.

## Migration Checklist

1. Pick your tier: `openai/gpt-5.6-sol` for frontier capability, `openai/gpt-5.6-terra` for balanced cost, `openai/gpt-5.6-luna` for high-volume workloads.
2. Keep your existing reasoning effort as the baseline, then compare one level lower — GPT-5.6 is more token-efficient than earlier generations, so lower settings often hold quality.
3. Enable `reasoning.mode: "pro"` only where evaluations show a quality gain worth the extra latency and tokens.
4. Set `reasoning.context` explicitly in multi-turn workflows that echo reasoning items back.
5. Watch `cache_write_tokens` and `cached_tokens` in usage. Switch to explicit caching if automatic cache writes are costing more than the reads save.

## Breaking Changes

None. All GPT-5.6 API additions are optional:

* Requests without `reasoning.mode`, `reasoning.context`, or `prompt_cache_options` behave the same as before
* Automatic prompt caching continues to work without configuration
* Standard-mode billing rates are unchanged; cache-write billing only applies when prompts are written to the cache

## Resources

* [Using GPT-5.6](https://developers.openai.com/api/docs/guides/latest-model) — OpenAI's official guide with migration and prompting best practices for GPT-5.6
* [GPT-5.6 announcement](https://openai.com/index/gpt-5-6/)
* [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
* [Reasoning Tokens](/docs/guides/best-practices/reasoning-tokens)
* [Prompt Caching](/docs/guides/best-practices/prompt-caching)
* [OpenRouter Responses API](/docs/api/api-reference/responses/create-a-response)
