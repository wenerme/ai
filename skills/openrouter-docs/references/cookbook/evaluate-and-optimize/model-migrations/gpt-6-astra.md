> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GPT-6 Astra Migration Guide

> Adopt async tool calling and mid-conversation reasoning effort changes with configuration_update for GPT-6 Astra

## What's New

OpenAI's GPT-6 Astra can keep working after it calls a tool, and it accepts a reasoning effort change partway through a conversation. On earlier OpenAI models every tool call paused the turn until your application returned the result, and effort was a request-level setting. Raising it for one hard turn and lowering it on the next changed the request prefix and invalidated the prompt cache for the whole conversation.

| Model                    | Tier                     |
| ------------------------ | ------------------------ |
| `openai/gpt-6-astra`     | Flagship capability      |
| `openai/gpt-6-astra-pro` | Astra with pro reasoning |

There are no breaking changes. Existing requests keep working as-is. This guide covers the two additive pieces worth adopting and one behavior to handle:

* [Async tool calling](#async-tool-calling): let Astra continue its turn after calling a tool and return the result in a later Responses request
* [Mid-conversation effort with `configuration_update`](#mid-conversation-effort-with-configuration_update): change reasoning effort from a point in the conversation onward without invalidating the prompt cache
* [Safety policy blocks](#safety-policy-blocks): how OpenAI's biology and cybersecurity classifier blocks surface on OpenRouter

<Note>
  OpenAI supports `configuration_update` on `gpt-6-astra` in standard, single-agent mode only. In pro mode (`reasoning.mode: "pro"`, or the `openai/gpt-6-astra-pro` slug) OpenAI rejects the item with `The 'configuration_update' item type is not supported with pro or tournament models.` Keep mid-conversation effort changes on the standard model. On OpenRouter, a request that carries an update is routed only to endpoints that accept it, and a request for a model that does not support it is rejected with a 400 rather than sent with the update silently dropped.
</Note>

## Async Tool Calling

An ordinary function call pauses the model's turn until your application returns the tool output. Set `async: true` on a `function` or `custom` tool definition and Astra can issue the call, keep working on the rest of the request, and pick the result up when you deliver it in a later request. Your application still executes the tool. The flag only changes when the model waits.

OpenRouter supports async tools on the [Responses API](/docs/api/api-reference/responses/create-a-response). Chat Completions and Anthropic Messages requests run every tool call synchronously. A Chat Completions tool that carries `async` is accepted, but the flag is removed before the request is routed and the call behaves like any other tool call.

### Declare the tool

Add `async: true` to the tool definition. The example below asks for one slow lookup and one independent task in the same turn.

```json lines theme={null}
{
  "model": "openai/gpt-6-astra",
  "instructions": "Use the demo weather result when it arrives; never invent it.",
  "input": "Check the demo weather snapshot for Paris. Meanwhile, list three essentials for any city trip.",
  "tools": [
    {
      "type": "function",
      "name": "get_weather",
      "description": "Read a demo weather snapshot for a city in the background.",
      "async": true,
      "strict": true,
      "parameters": {
        "type": "object",
        "properties": { "city": { "type": "string" } },
        "required": ["city"],
        "additionalProperties": false
      }
    }
  ]
}
```

The `function_call` item in `output` carries `async: true`, and the same response already contains the answer to the independent part of the request. This is the `output` array from a live GPT-6 Astra response through OpenRouter, with ids shortened:

```json lines theme={null}
{
  "output": [
    {
      "id": "fc_02lb8co6wtya",
      "type": "function_call",
      "status": "completed",
      "call_id": "call_5T0GBcLA27GrUxhclLUXA6Mb",
      "name": "get_weather",
      "arguments": "{\"city\":\"Paris\"}",
      "async": true
    },
    {
      "id": "msg_03vyuj0ad8xf",
      "type": "message",
      "status": "completed",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "Three essentials for any city trip:\n1. Comfortable walking shoes.\n2. A small day bag for daily necessities.\n3. A charged phone and portable charger.\n\nThe demo weather lookup for Paris has started; the snapshot is still pending.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "phase": "final_answer"
    }
  ]
}
```

Start the tool job as soon as the call arrives. When streaming, that is the `response.output_item.done` event for the call, while you keep consuming the rest of the response. Check `async` on the returned call before deciding whether to wait. A call without it is an ordinary synchronous call, and the model will not continue until the output is delivered.

### Deliver the result without `previous_response_id`

OpenAI's async tool guide continues the conversation with `previous_response_id`, which makes OpenAI prepend the stored transcript. OpenRouter's Responses API is stateless and rejects `previous_response_id` with a 400, so you replay the transcript yourself. The requirement underneath is the same. The later request must contain the original `function_call` and a `function_call_output` with the same `call_id`. For a `custom` tool the pair is `custom_tool_call` and `custom_tool_call_output`.

Append the previous response's `output` items to `input` in the order they were returned, then append the output for the finished call.

```json lines theme={null}
{
  "model": "openai/gpt-6-astra",
  "instructions": "Use the demo weather result when it arrives; never invent it.",
  "tools": [
    {
      "type": "function",
      "name": "get_weather",
      "description": "Read a demo weather snapshot for a city in the background.",
      "async": true,
      "strict": true,
      "parameters": {
        "type": "object",
        "properties": { "city": { "type": "string" } },
        "required": ["city"],
        "additionalProperties": false
      }
    }
  ],
  "input": [
    { "role": "user", "content": "Check the demo weather snapshot for Paris. Meanwhile, list three essentials for any city trip." },
    {
      "type": "function_call",
      "call_id": "call_5T0GBcLA27GrUxhclLUXA6Mb",
      "name": "get_weather",
      "arguments": "{\"city\":\"Paris\"}",
      "async": true
    },
    {
      "type": "message",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "Three essentials for any city trip:\n1. Comfortable walking shoes.\n2. A small day bag for daily necessities.\n3. A charged phone and portable charger.\n\nThe demo weather lookup for Paris has started; the snapshot is still pending."
        }
      ],
      "phase": "final_answer"
    },
    {
      "type": "function_call_output",
      "call_id": "call_5T0GBcLA27GrUxhclLUXA6Mb",
      "output": "{\"city\":\"Paris\",\"temperature_c\":22,\"condition\":\"Clear\"}"
    }
  ]
}
```

Keep the `async: true` flag on the replayed `function_call` and keep the same `tools` and `instructions` in the continuation request. OpenRouter forwards the items in the order you send them, so Astra sees the call, the text it produced while the job ran, and then the result. The live continuation above completed with a single assistant message that used the delivered snapshot:

```text theme={null}
**Paris demo weather:** 22°C and clear.

Three essentials for any city trip:
1. Comfortable walking shoes.
2. A charged phone with maps and a portable charger.
3. A reusable water bottle.
```

A call whose output has not arrived yet stays pending. You can append further user turns and assistant output after a pending `function_call` and deliver its `function_call_output` in a later request, as long as the `call_id` matches. For the wait-tool pattern, where the model launches several async calls and asks for specific results only when it needs them, follow the [OpenAI guide](https://developers.openai.com/api/docs/guides/async-tool-calling#add-a-wait-tool). The tool definitions and item shapes are the same on OpenRouter, with the transcript replayed instead of `previous_response_id`.

### Routing

OpenAI and Azure OpenAI honor async tools for GPT-6 Astra. When a request declares an async tool and one of those endpoints is a routing candidate, OpenRouter narrows routing to them. When none is, the request keeps its normal candidate pool and the `async` flag is removed before the request is sent, so the call runs synchronously and the returned `function_call` carries no `async` field. Amazon Bedrock accepts the flag but runs the tool synchronously, so it is treated as a non-async transport.

OpenAI rejects `async: true` with a 400 on earlier models, so add the flag only on requests to GPT-6 Astra.

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

The field is accepted only on `system` and `developer` messages. A `configuration_update` on a user, assistant, or tool message is rejected with a 400.

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

OpenRouter checks these rules before forwarding, regardless of which API the update arrived through. Adjacent updates and automatic truncation are also rejected by OpenAI:

* Put the update directly before the user turn it should apply to. An update ahead of the first user turn is allowed, and so is one after the last user turn, which applies to the response generated by that request.
* Do not place two updates next to each other. Adjacent updates are rejected.
* Updates cannot be combined with `truncation: "auto"` in the Responses API. Automatic truncation could drop the update and silently revert the effort.
* Keep the update at the same position in later requests. Moving or removing it changes the prefix and loses the cache benefit.
* Mid-conversation effort updates are not accepted on the [Batch API](/docs/batch-quickstart) and are rejected per line.

### Prompt caching

Because the update is an item in the conversation history rather than a request-level field, the items before it are byte-identical across turns. Cache reads continue on the shared prefix and only the new tail is written. Compare `cached_tokens` in `usage.input_tokens_details` (Responses) or `usage.prompt_tokens_details` (Chat Completions) before and after adopting updates to confirm the prefix is being reused.

## Safety Policy Blocks

OpenAI can decline a GPT-6 Astra request on biological or cybersecurity risk grounds. Instead of model output, OpenAI returns an error with code `bio_policy` or `cyber_policy`, sometimes after the response has already started. This is different from a refusal the model writes itself, and OpenRouter surfaces the two differently.

A policy block is an HTTP 403 with `error_type: "refusal"` on every OpenRouter API. The provider's message is carried verbatim. When the block arrives after the stream has started, the status is the `code` inside the error body instead, because the HTTP line was already committed. On Chat Completions the provider code is `error.metadata.provider_code`:

```json lines theme={null}
{
  "error": {
    "code": 403,
    "message": "This content was flagged for possible biological risk. If this seems wrong, try rephrasing your request. ...",
    "metadata": {
      "error_type": "refusal",
      "provider_code": "bio_policy"
    }
  }
}
```

On the Responses API the same block is a `response.failed` event with `response.error.code` set to the provider code and `error_type: "refusal"` on the response. On Anthropic Messages the error envelope carries `error.error_type: "refusal"` next to the native `error.type`, and the provider code is not exposed. OpenRouter does not resend a declined prompt to another endpoint serving the same model, and the block does not count against the provider's health. Treat a 403 `refusal` as a prompt problem rather than a transient failure. Retrying the same input returns the same block.

A refusal that Astra produces as its own completed output is not an error. The Responses API returns `status: "completed"` with a `refusal` content part, and Chat Completions returns `message.refusal` with `finish_reason: "content_filter"`. See [Errors and Debugging](/docs/api/api-reference/errors-and-debugging#content-policy) for the full contract.

## Migration Checklist

1. Swap the model slug to `openai/gpt-6-astra`.
2. On the Responses API, add `async: true` to tools whose result the model does not need immediately. Start the job when the call item arrives, replay the transcript with the `function_call` and its `function_call_output` on the same `call_id`, and check `async` on the returned call before deciding whether to wait.
3. Keep your existing request-level `reasoning.effort` as the baseline. Do not change it per turn.
4. Where one turn needs more or less reasoning, insert a `configuration_update` (Responses), a content-less system message carrying `configuration_update` (Chat Completions), or a content-less system message carrying `output_config.effort` (Messages) directly before that user turn.
5. Keep every update at its original position when you replay history, and never place two updates back to back.
6. Remove `truncation: "auto"` from Responses requests that carry updates.
7. Watch `cached_tokens` in usage to confirm the prompt prefix is still reused.
8. Handle HTTP 403 `refusal` errors as policy blocks: surface the message and do not retry the same prompt. The provider code is `error.metadata.provider_code` on Chat Completions and `response.error.code` on Responses. Messages exposes only `error.error_type`.

## Breaking Changes

None. Async tools and `configuration_update` are both optional:

* Tools without `async` and requests without an update behave the same as before
* The request-level `reasoning.effort` keeps its meaning as the conversation baseline
* Other models and other OpenAI Responses transports are unaffected. A request that carries an update is routed only to endpoints that accept it, and a request that declares an async tool prefers endpoints that honor the flag

## Resources

* [Using GPT-6 Astra](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra), OpenAI's model guidance with migration and prompting best practices for GPT-6 Astra
* [Async tool calling](https://developers.openai.com/api/docs/guides/async-tool-calling), OpenAI's guide including the wait-tool pattern
* [Change reasoning mid-conversation](https://developers.openai.com/api/docs/guides/reasoning?api-mode=responses#change-reasoning-mid-conversation) in OpenAI's reasoning guide
* [Tool Calling on the Responses API](/docs/api/api-reference/responses/tool-calling) on OpenRouter
* [Errors and Debugging](/docs/api/api-reference/errors-and-debugging#content-policy), the OpenRouter error contract for policy blocks and refusals
* [Changing Effort Mid-Conversation](/docs/guides/best-practices/reasoning-tokens#mid-conversation-effort) in the OpenRouter reasoning guide
* [Reasoning Tokens](/docs/guides/best-practices/reasoning-tokens)
* [Prompt Caching](/docs/guides/best-practices/prompt-caching)
* [OpenRouter Responses API](/docs/api/api-reference/responses/create-a-response)
