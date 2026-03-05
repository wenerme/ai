# Compaction

## Overview

To support long-running interactions, you can use compaction to reduce context
size while preserving state needed for subsequent turns.

Compaction helps you balance quality, cost, and latency as conversations grow.

## Server-side compaction

You can enable server-side compaction in a Responses create request
(`POST /responses` or `client.responses.create`) by setting
`context_management` with `compact_threshold`.

- When the rendered token count crosses the configured threshold, the server
  runs server-side compaction.
- No separate `/responses/compact` call is required in this mode.
- The response stream includes the encrypted compaction item.
- ZDR note: server-side compaction is ZDR-friendly when you set `store=false`
  on your Responses create requests.

The returned compaction item carries forward key prior state and reasoning into
the next run using fewer tokens. It is opaque and not intended to be
human-interpretable.

For stateless input-array chaining, append output items as usual. If you are
using `previous_response_id`, pass only the new user message each turn. In both
cases, the compaction item carries context needed for the next window.

Latency tip: After appending output items to the previous input items, you can
drop items that came before the most recent compaction item to keep requests
smaller and reduce long-tail latency. The latest compaction item carries the
necessary context to continue the conversation. If you use
`previous_response_id` chaining, do not manually prune.

## User journey

1. Call `/responses` as usual, but include `context_management` with
   `compact_threshold` to enable server-side compaction.
2. As the response streams, if the context size crosses the threshold, the server
   triggers a compaction pass, emits a compaction output item in the same stream,
   and prunes context before continuing inference.
3. Continue your loop with one pattern: stateless input-array chaining (append
   output, including compaction items, to your next input array) or
   `previous_response_id` chaining (pass only the new user message each turn and
   carry that ID forward).

<a id="server-side-compaction-user-flow"></a>

## Example user flow

```python
conversation = [
    {
        "type": "message",
        "role": "user",
        "content": "Let's begin a long coding task.",
    }
]

while keep_going:
    response = client.responses.create(
        model="gpt-5.2-codex",
        input=conversation,
        store=False,
        context_management=[{"type": "compaction", "compact_threshold": 200000}],
    )

    conversation.extend(response.output)

    conversation.append(
        {
            "type": "message",
            "role": "user",
            "content": get_next_user_input(),
        }
    )
```

## Standalone compact endpoint

For explicit control, use the
[standalone compact endpoint](https://developers.openai.com/api/docs/api-reference/responses/compact) for
stateless compaction in long-running workflows.

This endpoint is fully stateless and ZDR-friendly.

You send a full context window (messages, tools, and other items), and the
endpoint returns a new compacted context window you can pass to your next
`/responses` call.

The returned compacted window includes an encrypted compaction item that carries
forward key prior state and reasoning using fewer tokens. It is opaque and not
intended to be human-interpretable.

Note: the compacted window generally contains more than just the compaction
item. It can also include retained items from the previous window.

Output handling: do not prune `/responses/compact` output. The returned window
is the canonical next context window, so pass it into your next `/responses`
call as-is.

### User journey for standalone compaction

1. Use `/responses` normally, sending input items that include user messages,
   assistant outputs, and tool interactions.
2. When your context window grows large, call `/responses/compact` to generate a
   new compacted context window. The window you send to `/responses/compact`
   must still fit within your model's context window.
3. For subsequent `/responses` calls, pass the returned compacted window
   (including the compaction item) as input instead of the full transcript.

<a id="standalone-compact-endpoint-user-flow"></a>

### Example user flow

```python
# Full window collected from prior turns
long_input_items_array = [...]

# 1) Compact the current window
compacted = client.responses.compact(
    model="gpt-5.2",
    input=long_input_items_array,
)

# 2) Start the next turn by appending a new user message
next_input = [
    *compacted.output,  # Use compact output as-is
    {
        "type": "message",
        "role": "user",
        "content": user_input_message(),
    },
]

next_response = client.responses.create(
    model="gpt-5.2",
    input=next_input,
    store=False,  # Keep the flow ZDR-friendly
)
```