# Preserved reasoning

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

When you continue a conversation with the Responses API, a model can reuse
reasoning items from an earlier response. To preserve that reasoning when you
manage conversation history, keep the history that produced it intact and append
new messages and tool results at the end. The selected model and
[`reasoning.context` setting](https://developers.openai.com/api/docs/guides/reasoning#preserve-reasoning-across-calls)
determine which available reasoning items the model can use.

## How history changes affect reasoning

For newer frontier models, the API checks the conversation history before each
reasoning item you send back. This history is the item's _prefix_. If you edit,
shorten, or insert a message in that prefix, the API drops the affected
reasoning. The request can continue with the conversation you provide, and the
model can generate new reasoning.

For example, an agent calls a ledger tool and uses the returned rows to
investigate a discrepancy. On the next request, your app replaces those rows
with a subtotal. The model can still reuse reasoning it used to choose the tool,
but the API drops reasoning that depended on the original rows, even if you send the
reasoning item back unchanged.

## Append new instructions

When you manage history yourself, keep the previous input and the response's
output items in their original order. Add new instructions at the point where
they take effect.

This example uses the Python SDK in stateless mode with a model that supports
`reasoning.context` set to `all_turns`. Stateless responses
include encrypted reasoning content by default. See
[Preserve reasoning without stored responses](https://developers.openai.com/api/docs/guides/reasoning#preserve-reasoning-without-stored-responses).

Append instructions to a conversation

```python
from openai import OpenAI

client = OpenAI()
model = "gpt-6.1-sol"
history = [{"role": "user", "content": "Compare invoice A ($80) and B ($95)."}]

first = client.responses.create(
    model=model,
    reasoning={"context": "all_turns"},
    input=history,
    store=False,
)

next_input = [
    *history,
    *(item.to_dict() for item in first.output),
    {
        "role": "developer",
        "content": "For the reconciliation report, use a Markdown table.",
    },
    {"role": "user", "content": "Add invoice C ($110) and show the total."},
]
report = client.responses.create(
    model=model,
    reasoning={"context": "all_turns"},
    input=next_input,
    store=False,
)
print(report.output_text)
```


If you use stored responses, you can continue from the prior response with
`previous_response_id` and send only the new input items. See
[Conversation state](https://developers.openai.com/api/docs/guides/conversation-state).

## Migrate away from prefix edits

Compare two consecutive requests in a workflow that reuses reasoning. Find the
first place your app changes an item it already sent, then choose the migration
that matches the edit.

| If your app edits…                       | Migrate to…                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Older turns during compaction            | Use OpenAI compaction and continue from the returned context. If you create a portable text summary, let the model reason from it. Replacing the prefix can invalidate reasoning you replay after the summary. If the history includes `configuration_update` items, use an explicit `compaction_trigger`, then append a fresh update before the next user message. Restate every setting you changed, including the format if applicable. Automatic compaction, automatic truncation, and standalone `/responses/compact` don't support histories containing these updates. |
| Developer instructions                   | Append a developer message when the instruction takes effect. If the response is already running, use mid-turn steering where supported.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| The tool list when switching modes       | Keep known tool definitions stable. Restrict the next request with `tool_choice` of type `allowed_tools`. To introduce new tools, append an `additional_tools` input item with role `developer` and the definitions in `tools`. Replay it in its original position.                                                                                                                                                                                                                                                                                                          |
| A tool result the model has already seen | Filter the result before sending `function_call_output` the first time. If the data changes, append a correction or return it from a new tool call.                                                                                                                                                                                                                                                                                                                                                                                                                          |

For more on managing long conversations, see
[Compaction](https://developers.openai.com/api/docs/guides/compaction).