> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GPT-6 Astra Migration Guide

> Adopt mid-conversation reasoning effort changes with configuration_update for GPT-6 Astra

## What's New

OpenAI's GPT-6 Astra accepts a reasoning effort change partway through a conversation. Before Astra, effort was a request-level setting on OpenAI models. Raising it for one hard turn and lowering it on the next changed the request prefix and invalidated the prompt cache for the whole conversation.

| Model                    | Tier                     |
| ------------------------ | ------------------------ |
| `openai/gpt-6-astra`     | Flagship capability      |
| `openai/gpt-6-astra-pro` | Astra with pro reasoning |

There are no breaking changes. Existing requests keep working as-is. This guide covers the one additive piece worth adopting:

* [Mid-conversation effort with `configuration_update`](#mid-conversation-effort-with-configuration_update): change reasoning effort from a point in the conversation onward without invalidating the prompt cache

<Note>
  OpenAI supports `configuration_update` on `gpt-6-astra` in standard, single-agent mode only. In pro mode (`reasoning.mode: "pro"`, or the `openai/gpt-6-astra-pro` slug) OpenAI rejects the item with `The 'configuration_update' item type is not supported with pro or tournament models.` Keep mid-conversation effort changes on the standard model. On OpenRouter, a request that carries an update is routed only to endpoints that accept it, and a request for a model that does not support it is rejected with a 400 rather than sent with the update silently dropped.
</Note>

## Mid-Conversation Effort with `configuration_update`

Keep the request-level `reasoning.effort` as the baseline for the whole conversation, and insert an update directly before the user turn that needs a different effort. The update applies from that point onward and stays in effect until the next update. Everything before it is unchanged, so the cached prompt prefix keeps matching.

Use it to raise effort for one difficult turn, or to lower it for routine follow-ups, without touching the request-level field.

All three OpenRouter APIs expose the update in the shape native to that API. OpenRouter normalizes each into one internal representation and re-emits it as the Responses `configuration_update` input item that Astra expects.

### Responses API

This is OpenAI's own shape, forwarded as-is. Add a `configuration_update` item to `input` before the user message it applies to.

```json lines theme={null}
{
  "model": "openai/gpt-6-astra",
  "reasoning": { "effort": "medium" },
  "input": [
    { "role": "user", "content": "Summarize the incident report." },
    {
      "type": "message",
      "role": "assistant",
      "content": [{ "type": "output_text", "text": "The outage began at 09:14 UTC when ..." }]
    },
    { "type": "configuration_update", "reasoning": { "effort": "high" } },
    { "role": "user", "content": "Now find the root cause and propose a fix." }
  ]
}
```

OpenRouter's Responses API is stateless and rejects `previous_response_id`, so replay the full conversation history, including the update at its original position, on each request. Send another `configuration_update` only when you want a different effort.

### Chat Completions API

OpenAI's Chat Completions API has no per-message effort control, so this form is an OpenRouter extension. Place `configuration_update` on a content-less system message (`content: ""`) directly before the user message it applies to. OpenRouter translates it into the Responses `configuration_update` item before forwarding to Astra.

```json lines theme={null}
{
  "model": "openai/gpt-6-astra",
  "reasoning": { "effort": "medium" },
  "messages": [
    { "role": "user", "content": "Summarize the incident report." },
    { "role": "assistant", "content": "The outage began at 09:14 UTC when ..." },
    {
      "role": "system",
      "content": "",
      "configuration_update": { "reasoning": { "effort": "high" } }
    },
    { "role": "user", "content": "Now find the root cause and propose a fix." }
  ]
}
```

The field is accepted only on `system` messages. A `configuration_update` on a user, assistant, or tool message is rejected with a 400.

### Anthropic Messages API

The Messages API uses Anthropic's per-message `output_config.effort` on a content-less system message. OpenRouter translates it into the Responses `configuration_update` item when the request routes to Astra.

```json lines theme={null}
{
  "model": "openai/gpt-6-astra",
  "max_tokens": 4096,
  "output_config": { "effort": "medium" },
  "messages": [
    { "role": "user", "content": "Summarize the incident report." },
    { "role": "assistant", "content": "The outage began at 09:14 UTC when ..." },
    { "role": "system", "content": [], "output_config": { "effort": "high" } },
    { "role": "user", "content": "Now find the root cause and propose a fix." }
  ]
}
```

### Effort values

Effort values in an update are translated to Astra's vocabulary the same way request-level effort is, using the model's [supported reasoning efforts](/docs/guides/best-practices/reasoning-tokens#discovering-per-model-reasoning-options). An update whose effort has no supported equivalent is rejected with a 400. Astra does not accept `none`.

### Placement rules

OpenRouter checks these rules before forwarding, regardless of which API the update arrived through. Adjacent updates and automatic truncation are also rejected by OpenAI. The trailing-update rule is OpenRouter's own, since OpenAI accepts a request that ends with an update:

* Put the update directly before the user turn it should apply to. An update ahead of the first user turn is allowed.
* Do not place two updates next to each other. Adjacent updates are rejected.
* A request must not end with an update. OpenRouter rejects this with a 400 because the update has no following input item to apply to.
* Updates cannot be combined with `truncation: "auto"` in the Responses API. Automatic truncation could drop the update and silently revert the effort.
* Keep the update at the same position in later requests. Moving or removing it changes the prefix and loses the cache benefit.
* Mid-conversation effort updates are not accepted on the [Batch API](/docs/batch-quickstart) and are rejected per line.

### Prompt caching

Because the update is an item in the conversation history rather than a request-level field, the items before it are byte-identical across turns. Cache reads continue on the shared prefix and only the new tail is written. Compare `cached_tokens` in `usage.input_tokens_details` (Responses) or `usage.prompt_tokens_details` (Chat Completions) before and after adopting updates to confirm the prefix is being reused.

## Migration Checklist

1. Swap the model slug to `openai/gpt-6-astra`.
2. Keep your existing request-level `reasoning.effort` as the baseline. Do not change it per turn.
3. Where one turn needs more or less reasoning, insert a `configuration_update` (Responses), a content-less system message carrying `configuration_update` (Chat Completions), or a content-less system message carrying `output_config.effort` (Messages) directly before that user turn.
4. Keep every update at its original position when you replay history, and never place two updates back to back or end a request with one.
5. Remove `truncation: "auto"` from Responses requests that carry updates.
6. Watch `cached_tokens` in usage to confirm the prompt prefix is still reused.

## Breaking Changes

None. `configuration_update` is optional:

* Requests without an update behave the same as before
* The request-level `reasoning.effort` keeps its meaning as the conversation baseline
* Other models and other OpenAI Responses transports are unaffected. A request that carries an update is routed only to endpoints that accept it

## Resources

* [Using GPT-6 Astra](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra), OpenAI's model guidance with migration and prompting best practices for GPT-6 Astra
* [Change reasoning mid-conversation](https://developers.openai.com/api/docs/guides/reasoning?api-mode=responses#change-reasoning-mid-conversation) in OpenAI's reasoning guide
* [Changing Effort Mid-Conversation](/docs/guides/best-practices/reasoning-tokens#mid-conversation-effort) in the OpenRouter reasoning guide
* [Reasoning Tokens](/docs/guides/best-practices/reasoning-tokens)
* [Prompt Caching](/docs/guides/best-practices/prompt-caching)
* [OpenRouter Responses API](/docs/api/api-reference/responses/create-a-response)
