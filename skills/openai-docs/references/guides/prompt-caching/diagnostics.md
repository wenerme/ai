# Prompt cache diagnostics

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Prompt cache diagnostics help explain why a request reused fewer tokens than expected. Compare a request with an earlier response to identify changes to the model, tools, settings, or input that prevented reuse.

Diagnostics are available in the Responses API for GPT-5.6 and later supported models. Use them to investigate individual requests, and use the [Prompt Caching Dashboard](https://platform.openai.com/usage?usage_section=prompt-caching) to monitor cache performance across your application.

## Compare with an earlier response

Set `comparison_response_id` in `prompt_cache_options` to the ID of a recent, completed response from the same organization. Choose a response whose prompt prefix you expected the current request to reuse, such as the preceding conversation turn.

The two response IDs serve different purposes:

- `previous_response_id` carries earlier conversation context into the request. It does not request diagnostics.
- `comparison_response_id` in `prompt_cache_options` selects a response as the diagnostic baseline. It does not load that response's conversation content or restrict which matching cache the request can use. The request can still reuse matching cached content from other requests.

The IDs can refer to the same response or different responses. If you manage history yourself, send it in `input` and set only the comparison ID.

Diagnostic records are retained for a short period. If the record has expired, the comparison returns `comparison_response_not_found`, even if the response itself is still available through the API.

The following example continues a conversation using `previous_response_id` and requests a cache comparison against the same response. It uses a different `prompt_cache_key` for each request to demonstrate how changing the key can prevent reuse.

Use your own policy document in `support-policy.txt`. The reusable prefix must meet the model's [minimum cacheable length](https://developers.openai.com/api/docs/guides/prompt-caching#summary-of-model-differences), which is 1,024 tokens for GPT-5.6 and later.

Compare prompt cache reuse between responses

```python
from pathlib import Path

from openai import OpenAI

client = OpenAI()
policy = Path("support-policy.txt").read_text()

first = client.responses.create(
    model="gpt-5.6",
    instructions=policy,
    input="Summarize the refund policy.",
    prompt_cache_key="support-policy:request-1",
)

second = client.responses.create(
    model="gpt-5.6",
    instructions=policy,
    previous_response_id=first.id,
    input="Does the policy also apply to sale items?",
    prompt_cache_key="support-policy:request-2",
    prompt_cache_options={
        "comparison_response_id": first.id,
    },
)

diagnostics = second.prompt_cache_diagnostics
if diagnostics is not None and diagnostics.type == "cache_miss":
    print(diagnostics.reason)
    print(diagnostics.comparison_reusable_tokens)
    print(diagnostics.cache_missed_tokens)
```


If the key change causes a miss, the result may look like this. Token counts vary with the input.

```json
{
  "prompt_cache_diagnostics": {
    "type": "cache_miss",
    "reason": "prompt_cache_key_changed",
    "comparison_reusable_tokens": 1280,
    "cache_missed_tokens": 1280
  }
}
```

To preserve reuse, use the same key for both requests, such as `support-policy:session-42`. See [Tune prompt cache keys](https://developers.openai.com/api/docs/guides/prompt-caching#prompt-cache-key-best-practices).

See [Conversation state](https://developers.openai.com/api/docs/guides/conversation-state#passing-context-from-the-previous-response) for continuation examples. Top-level `instructions` do not carry over through `previous_response_id`, so the example supplies the same instructions on both requests.

### Multi-turn conversations

To compare consecutive turns, save each completed response's `id` and pass it as `comparison_response_id` in `prompt_cache_options` on the next request. Omit the comparison ID on the first turn.

When testing a fix, keep the comparison ID set to the baseline response.

### Streaming

When `stream=True`, read `prompt_cache_diagnostics` from `event.response` in the [`response.completed` event](https://developers.openai.com/api/reference/resources/responses/streaming-events#response.completed).

## Understand the result

Read `prompt_cache_diagnostics.type` to determine the comparison outcome.

| Type                            | Meaning                                                                                                                                                        | What to do                                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `cache_hit`                     | No cache miss was detected for the comparison.                                                                                                                 | Check `usage.input_tokens_details.cached_tokens` to measure actual reuse.                         |
| `cache_miss`                    | A difference prevented reuse of the expected prefix. The result includes `reason` and `cache_missed_tokens`. It may also include `comparison_reusable_tokens`. | Find the reason and suggested fix in [Fix a cache miss](#fix-a-cache-miss).                       |
| `comparison_response_not_found` | No usable diagnostic record is available for the comparison response. It may be missing or expired.                                                            | Select another recent, completed response from the same organization.                             |
| `unavailable`                   | The comparison could not produce a conclusive result, or the model does not support diagnostics.                                                               | Confirm model support and try another recent comparison. You can still use the response normally. |

A request with 2,500 input tokens can report `cache_hit` if it reuses the comparison response's 2,000-token prefix. The remaining 500 tokens are new and still need processing.

For a cache miss, `comparison_reusable_tokens`, when present, is the comparison response's `cached_tokens + cache_write_tokens`. `cache_missed_tokens` estimates how many of the comparison response's reusable tokens were not reused. Use the current response's usage fields for actual cache usage and billing.

Diagnostics report the first classified reason, not every difference between requests. After addressing that reason, repeat the comparison to check for other causes.

## Fix a cache miss

Some changes, such as switching models or compacting a conversation, are intentional. You may choose to keep them even if they reduce cache reuse.

| Reason                     | What changed                                                                                                                                        | How to improve reuse                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model_changed`            | A different model processed the request, for example because routing, an A/B test, or a fallback selected another model.                            | Check model selection for unintended switches. Use the same model for requests intended to share a cached prefix. See [cache-affecting settings](https://developers.openai.com/api/docs/guides/prompt-caching#cache-affecting-settings).                                                                                                                                                                                                                |
| `prompt_cache_key_changed` | The key changed between requests, for example because it includes a unique request ID or timestamp.                                                 | Choose a stable key for related requests and reuse it while the prefix remains useful. See [Tune prompt cache keys](https://developers.openai.com/api/docs/guides/prompt-caching#prompt-cache-key-best-practices).                                                                                                                                                                                                                                      |
| `service_tier_changed`     | The service tier used to process the request changed.                                                                                               | Keep the service tier consistent for requests expected to share a prefix. Check the returned `service_tier`, which can differ from the requested value. See [`service_tier`](https://developers.openai.com/api/reference/resources/responses/methods/create#%28resource%29%20responses%20%3E%20%28method%29%20create%20%3E%20%28params%29%200.non_streaming%20%3E%20%28param%29%20service_tier%20%3E%20%28schema%29) for supported values and behavior. |
| `tools_changed`            | Tools were added, removed, or reordered, or their descriptions, schemas, or configuration changed.                                                  | Keep tool definitions and ordering stable. Use `tool_choice: "none"` to disable tools or `allowed_tools` to restrict which tools can run without changing the supplied tool list. See [Manage tools with append-only updates](https://developers.openai.com/api/docs/guides/prompt-caching#tools).                                                                                                                                                      |
| `text_format_changed`      | The output format or its schema changed.                                                                                                            | Keep `text.format` and the schema consistent when the required output structure is unchanged. See [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs).                                                                                                                                                                                                                                                               |
| `reasoning_effort_changed` | The reasoning effort changed.                                                                                                                       | Keep `reasoning.effort` consistent across requests intended to share a prefix. See [cache-affecting settings](https://developers.openai.com/api/docs/guides/prompt-caching#cache-affecting-settings).                                                                                                                                                                                                                                                   |
| `verbosity_changed`        | The response verbosity changed.                                                                                                                     | Keep `text.verbosity` consistent across requests intended to share a prefix. See [cache-affecting settings](https://developers.openai.com/api/docs/guides/prompt-caching#cache-affecting-settings).                                                                                                                                                                                                                                                     |
| `context_compacted`        | Compaction replaced earlier conversation content.                                                                                                   | Preserve stable instructions and let later turns build on the compacted context. Compare total input cost: fewer input tokens can still save money despite lower cache reuse. See [Compaction](https://developers.openai.com/api/docs/guides/compaction).                                                                                                                                                                                               |
| `input_changed`            | Earlier input changed, for example because instructions contain a timestamp or request ID, or previous messages were edited, reordered, or removed. | Move changing content after the reusable prefix and its cache breakpoint. Preserve earlier messages and tool results, and append new turns. See [Preserve conversation history](https://developers.openai.com/api/docs/guides/prompt-caching#preserve-conversation-history).                                                                                                                                                                            |

## Confirm the improvement

After making a change:

1. Send another representative request and compare it with the intended baseline.
2. Check the diagnostic result for any remaining difference.
3. Compare `cached_tokens`, `cache_write_tokens`, and total cost across several requests.

See [Monitor cache performance](https://developers.openai.com/api/docs/guides/prompt-caching#monitor-cache-performance) for usage metrics and cost calculations.

## Pricing and rate limits

Prompt cache diagnostics have no additional cost and do not count separately toward rate limits. Any extra baseline or retry requests to the Responses API are billed normally and count toward rate limits.

## Zero Data Retention

Prompt cache diagnostics are compatible with Zero Data Retention. OpenAI does not store raw prompts or model outputs for this feature. Diagnostic records contain configuration metadata, token-count estimates, and hashes used to compare cache-sensitive content. These records are scoped to the organization, expire after a short period, and are used only to explain prompt-cache hits or misses.

Setting `comparison_response_id` does not retrieve or persist the earlier response's content. See [Your data](https://developers.openai.com/api/docs/guides/your-data) for OpenAI's data controls.

## Limitations

Diagnostics are available in the Responses API for GPT-5.6 and later supported models.

Diagnostics are best effort and may not classify every cache miss. An `unavailable` result does not indicate whether a cache hit or miss occurred.

Diagnostics never block or fail your request. They do not change how the model generates output. If the comparison is not ready, the response returns `unavailable`.