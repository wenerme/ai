# Prompt caching

Model prompts often contain repetitive content, like system prompts and common instructions. OpenAI routes API requests to servers that recently processed the same prompt, making it faster and less expensive to reuse an exact prompt prefix than to process it from scratch. Prompt Caching works automatically for eligible requests, with no code changes required. It is enabled for all recent [models](https://developers.openai.com/api/docs/models), `gpt-4o` and newer.

Cache writes have no additional fee on models before the GPT-5.6 family. For GPT-5.6 models and later model families, cache writes cost 1.25× the uncached input token rate. On these models, both implicit and explicit caching are more consistent and reliable. You can also use explicit cache breakpoints to control exactly which prompt prefixes OpenAI caches. OpenAI reports writes in `cache_write_tokens` and reads in `cached_tokens`, so you can measure the cost of writes against the savings from later cache hits.

This guide describes how Prompt Caching works in detail, so that you can optimize your prompts for lower latency and cost.

## Structuring prompts

Cache hits are only possible for exact prefix matches within a prompt. To realize caching benefits, place static content like instructions and examples at the beginning of your prompt, and put variable content, such as user-specific information, at the end. This also applies to images and tools, which must be identical between requests.

![Prompt Caching visualization](https://openaidevs.retool.com/api/file/8593d9bb-4edb-4eb6-bed9-62bfb98db5ee)

## How it works

By default, caching is enabled automatically for prompts that are 1024 tokens or longer. When you make an API request, the following steps occur:

1. **Cache Routing**:

- Requests are routed to a machine based on a hash of the initial prefix of the prompt. The hash typically uses the first 256 tokens, though the exact length varies depending on the model.
- If you provide the [`prompt_cache_key`](https://developers.openai.com/api/docs/api-reference/responses/create#responses-create-prompt_cache_key) parameter, it is combined with the prefix hash, allowing you to influence routing and improve cache hit rates. This is especially beneficial when many requests share long, common prefixes.

2. **Cache Lookup**: The system checks if the initial portion (prefix) of your prompt exists in the cache on the selected machine.
3. **Cache Hit**: If a matching prefix is found, the system uses the cached result. This decreases latency and bills those tokens at the cached-input rate.
4. **Cache Miss**: If no matching prefix is found, the system processes your full prompt. When automatic caching is enabled, it may cache an eligible prefix on that machine for future requests. On GPT-5.6 models and later model families, tokens written to cache are billed at the cache-write rate.

### Improve cache hit rates with a prompt cache key

Set `prompt_cache_key` on requests that share long, common prompt prefixes. Reuse the same key for those requests to help route them to the same cache and improve cache hit rates.

On GPT-5.6 models and later model families, you must set `prompt_cache_key` to use the more reliable matching for both implicit and explicit caching. At each breakpoint, the service matches the key with the exact prompt prefix. Without a key, requests may still receive automatic cache hits, but they do not use the improved matching.

Keep the total traffic across all prefixes for each key to approximately 15 requests per minute. If a key receives a higher rate, some requests may miss the cache. For higher-volume workloads, partition traffic across more keys and use a stable mapping so requests with the same key continue to share prefixes.

## Prompt cache breakpoints

For GPT-5.6 models and later model families, you can mark the end of a reusable prompt prefix with an explicit cache breakpoint. Breakpoints are available in both the Responses API and Chat Completions API.

Set the request-wide cache policy with `prompt_cache_options.mode`:

- `implicit` is the default. OpenAI places a cache breakpoint on the latest message and also uses any explicit breakpoints you provide.
- `explicit` disables the implicit breakpoint. Only explicit breakpoints are used for cache reads and writes. If the conversation contains no explicit breakpoints, the request does not use prompt caching or incur cache-write charges.

Add `prompt_cache_breakpoint: { "mode": "explicit" }` to a supported prompt content block. The breakpoint marks the exact end of the cached prefix, including that block and all prompt content rendered before it. Content after the breakpoint can change without invalidating the earlier cached prefix. All breakpoints use the request-wide `prompt_cache_options.ttl`, which currently defaults to `30m` and is the only supported value.

Each request can create up to four new cache writes. Breakpoints from earlier conversation turns are read-only: they can match the cache, but the request does not write them again. In `implicit` mode, the breakpoint on the latest message uses one write slot, so up to the latest three explicit breakpoints can be written. In `explicit` mode, up to the latest four explicit breakpoints can be written. For cache reads, OpenAI considers up to the latest 50 breakpoints in the conversation.

Responses API supports breakpoints on `input_text`, `input_image`, and `input_file` blocks. Chat Completions API supports them on `text`, `image_url`, `input_audio`, `file`, and `refusal` blocks.

When several breakpoints match cached content, the service reads from the longest matching prefix.

The following examples are abbreviated to show the request shape. In a real request, the rendered prefix before the marked breakpoint must contain at least 1,024 tokens to be cacheable.



<div data-content-switcher-pane data-value="responses">
    <div class="hidden">Responses API</div>

    This request uses the default `implicit` mode, which places a breakpoint on
    the latest message, and adds an explicit breakpoint after a stable file.

    ```json
{
  "model": "gpt-5.6",
  "prompt_cache_key": "tenant:acme:knowledge-base-v1",
  "input": [
    {
      "type": "message",
      "role": "user",
      "content": [
        {
          "type": "input_file",
          "file_id": "file_123",
          "prompt_cache_breakpoint": {
            "mode": "explicit"
          }
        },
        {
          "type": "input_text",
          "text": "Answer the current question."
        }
      ]
    }
  ]
}
```


  </div>
  <div data-content-switcher-pane data-value="chat-completions" hidden>
    <div class="hidden">Chat Completions API</div>

    This request disables automatic breakpoint placement. Only the marked
    system-message prefix is eligible for billable cache writes and discounted
    cache reads.

    ```json
{
  "model": "gpt-5.6",
  "prompt_cache_key": "tenant:acme:support-assistant-v1",
  "prompt_cache_options": {
    "mode": "explicit"
  },
  "messages": [
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "You are a support assistant.",
          "prompt_cache_breakpoint": {
            "mode": "explicit"
          }
        }
      ]
    },
    {
      "role": "user",
      "content": "What should I do next?"
    }
  ]
}
```


  </div>



Only `explicit` is valid for `prompt_cache_breakpoint.mode`. A marker on an unsupported or non-cacheable block returns a `400 invalid_request_error`. Older models also reject `prompt_cache_options` and `prompt_cache_breakpoint`; continue using their existing automatic prompt caching behavior.

## Prompt cache retention

Prompt caching has two controls with different semantics:

- For GPT-5.6 models and later model families, `prompt_cache_options.ttl` sets a minimum cache lifetime. It does not select a storage policy or maximum retention period.
- For earlier models, `prompt_cache_retention` selects a maximum-retention policy. This field is deprecated for GPT-5.6 models and later model families.

For GPT-5.6 models and later model families, use `prompt_cache_options.ttl` to set the minimum lifetime of all breakpoints written by the request. The only supported value is `30m`, which is also the default. A cached prefix remains eligible for reuse for at least 30 minutes, but OpenAI may retain it longer.

For models before the GPT-5.6 family, continue to set `prompt_cache_retention` on your `Responses.create` request or `chat.completions.create` request. For models that support both in-memory and extended retention, prompt cache pricing is the same for both policies.

### In-memory prompt cache retention

In-memory prompt cache retention is available for models that accept `prompt_cache_retention: "in_memory"`.

When using the in-memory policy, cached prefixes generally remain active for 5 to 10 minutes of inactivity, up to a maximum of one hour. In-memory cached prefixes are only held within volatile GPU memory.

### Extended prompt cache retention

Extended prompt cache retention is available for the following models:

- `gpt-5.5`
- `gpt-5.5-pro`
- `gpt-5.4`
- `gpt-5.2`
- `gpt-5.1-codex-max`
- `gpt-5.1`
- `gpt-5.1-codex`
- `gpt-5.1-codex-mini`
- `gpt-5.1-chat-latest`
- `gpt-5`
- `gpt-5-codex`
- `gpt-4.1`

Extended prompt cache retention keeps cached prefixes active for longer, up to a maximum of 24 hours. Extended Prompt Caching works by offloading the key/value tensors to GPU-local storage when memory is full, significantly increasing the storage capacity available for caching.

Key/value tensors are the intermediate representation from the model's attention layers produced during prefill. Only the key/value tensors may be persisted in local storage; the original customer content, such as prompt text, is only retained in memory.

### Configure retention for older models

For `gpt-5.5` and `gpt-5.5-pro`, only `24h` is supported through `prompt_cache_retention`.

For older models that support both `in_memory` and `24h`, the default depends on your organization's data retention policy:

- Organizations without ZDR enabled default to `24h`.
- Organizations with ZDR enabled default to `in_memory` when `prompt_cache_retention` is not specified.

The following legacy example sets the retention policy for a `gpt-5.5` request:

```json
{
  "model": "gpt-5.5",
  "input": "Your prompt goes here...",
  "prompt_cache_retention": "24h"
}
```


## Requirements

Caching is available for prompts containing 1024 tokens or more.

All requests, including those with fewer than 1024 tokens, display a `cached_tokens` field in the usage token details. Responses API returns this field in `usage.input_tokens_details` on the [Response object](https://developers.openai.com/api/docs/api-reference/responses/object); Chat Completions API returns it in `usage.prompt_tokens_details` on the [Chat object](https://developers.openai.com/api/docs/api-reference/chat/object). The field indicates how many input tokens were read from cache. For requests under 1024 tokens, `cached_tokens` is zero.

For GPT-5.6 models and later model families, `cache_write_tokens` reports the number of prompt tokens written to cache. Cache write billing uses this value at 1.25× the uncached input token rate.

The following Chat Completions usage example shows both fields. In this response, 1,920 tokens were read from cache and no tokens were written:

```json
"usage": {
  "prompt_tokens": 2006,
  "completion_tokens": 300,
  "total_tokens": 2306,
  "prompt_tokens_details": {
    "cached_tokens": 1920,
    "cache_write_tokens": 0
  },
  "completion_tokens_details": {
    "reasoning_tokens": 0,
    "accepted_prediction_tokens": 0,
    "rejected_prediction_tokens": 0
  }
}
```

### What can be cached

- **Messages:** The complete messages array, encompassing system, user, and assistant interactions.
- **Images:** Images included in user messages, either as links or as base64-encoded data, as well as multiple images can be sent. Ensure the detail parameter is set identically, as it impacts image tokenization.
- **Tool use:** Both the messages array and the list of available `tools` can be cached, contributing to the minimum 1024 token requirement.
- **Structured outputs:** The structured output schema serves as a prefix to the system message and can be cached.

## Best practices

- Structure prompts with **static or repeated content at the beginning** and dynamic, user-specific content at the end.
- Use the **[`prompt_cache_key`](https://developers.openai.com/api/docs/api-reference/responses/create#responses-create-prompt_cache_key) parameter** consistently across requests that share long, common prefixes to improve cache hit rates. On GPT-5.6 models and later model families, you must set this parameter to use the more reliable cache matching. Keep the total traffic for each key to approximately 15 requests per minute, and use more keys for higher-volume workloads.
- On GPT-5.6 models and later model families, place **explicit cache breakpoints** after stable prompt content that is likely to be reused. Set `prompt_cache_options.mode` to `explicit` when you want the service to use only the breakpoints you provide.
- **Monitor cache reads and writes** by logging `cached_tokens` and `cache_write_tokens`. Compare cache-write volume with subsequent cache reads to understand net cost and adjust breakpoint placement. You can also monitor cached token counts in the OpenAI Usage dashboard.
- **Maintain a steady stream of requests** with identical prompt prefixes to minimize cache evictions and maximize caching benefits.

## Frequently asked questions

1. **How is data privacy maintained for caches?**

   Prompt caches are not shared between organizations. Only members of the same organization can access caches of identical prompts. Cache data handling depends on the model and retention policy. See the [Your data](https://developers.openai.com/api/docs/guides/your-data) guide for the current application-state, Zero Data Retention, and data residency details.

2. **Does Prompt Caching affect output token generation or the final response of the API?**

   Prompt Caching does not change how the model generates output tokens. The model computes a new response from the cached prompt prefix, so otherwise identical nondeterministic requests are not guaranteed to return identical output.

3. **Is there a way to manually clear the cache?**

   Manual cache clearing is not currently available. For models before the GPT-5.6 family that use in-memory retention, typical cache evictions occur after 5-10 minutes of inactivity, though entries can remain for up to one hour during off-peak periods. For GPT-5.6 models and later model families, cached prefixes remain eligible for reuse for at least 30 minutes and may be retained longer.

4. **Will I be expected to pay extra for writing to Prompt Caching?**

   Cache writes have no additional fee on models before the GPT-5.6 family. On GPT-5.6 models and later model families, cache writes are billed at 1.25× the uncached input token rate and reported in `cache_write_tokens`. Cache reads continue to be reported in `cached_tokens`.

5. **Do cached prompts contribute to TPM rate limits?**

   Yes, as caching does not affect rate limits.