## What's New

GPT-5.4, GPT-5.4 Pro, and GPT-5.3 Codex introduce the
`phase` field on
assistant messages. This field is critical for multi-turn
agentic workflows — it tells the model whether an assistant
message is intermediate commentary or the final answer.

OpenRouter supports `phase` in the
[Responses API](/docs/api/api-reference/responses/create-responses).

<Note>
  `phase` is **not available** in the Chat Completions API.
  The Chat Completions format cannot represent multiple
  output items with distinct phases in a single response.
  Use the Responses API for full `phase` support.
</Note>

## The `phase` Field

`phase` appears on assistant output messages and has three
possible values:

| Value            | Meaning                        |
| ---------------- | ------------------------------ |
| `null`           | No phase specified (default)   |
| `"commentary"`   | Intermediate assistant message |
| `"final_answer"` | The final closeout message     |

<Note>
  `phase` is only valid on **assistant** messages.
  Do not add `phase` to user or system messages.
</Note>

## Why It Matters

For models like `gpt-5.3-codex`, `gpt-5.4`, and
`gpt-5.4-pro`, correctly
preserving `phase` on assistant messages is **required**
for optimal performance. If `phase` metadata is dropped
when reconstructing conversation history, significant
performance degradation can occur — including early
stopping on longer-running tasks.

## Usage

### Responses API

When using the Responses API, assistant output items
include `phase`. You must persist these items verbatim
and pass them back in subsequent requests.

```json
{
  "model": "openai/gpt-5.4",
  "input": [
    {
      "type": "message",
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "Refactor the auth module"
        }
      ]
    }
  ]
}
```

The response will include `phase` on assistant output
messages:

```json
{
  "output": [
    {
      "type": "message",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "I'll start by analyzing..."
        }
      ],
      "phase": "commentary"
    },
    {
      "type": "message",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "Here's the refactored code..."
        }
      ],
      "phase": "final_answer"
    }
  ]
}
```

For follow-up requests, include the assistant output
items with their `phase` intact:

```json
{
  "model": "openai/gpt-5.4",
  "input": [
    {
      "type": "message",
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "Refactor the auth module"
        }
      ]
    },
    {
      "type": "message",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "I'll start by analyzing..."
        }
      ],
      "phase": "commentary"
    },
    {
      "type": "message",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "Here's the refactored code..."
        }
      ],
      "phase": "final_answer"
    },
    {
      "type": "message",
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "Now add unit tests"
        }
      ]
    }
  ]
}
```

### Chat Completions API

The Chat Completions API does **not** support `phase` in
responses. A single chat completion response can only
contain one message per choice, so there is no way to
represent the separate commentary and final answer output
items that models like GPT-5.4 produce.

If you need `phase` support for multi-turn agentic
workflows, use the
[Responses API](/docs/api/api-reference/responses/create-responses)
instead.

## Implementation Pattern

When building an integration with the Responses API,
persist your output items verbatim, including `phase`
on assistant messages:

### Key Rules

1. **Preserve phase on assistant messages** — When you
   receive a response with `phase`, store it and send
   it back on subsequent requests.
2. **Do not add phase to user messages** — `phase` is
   only valid on assistant messages. The Responses API
   will reject requests with `phase` on user messages.
3. **Do not drop phase** — Omitting `phase` from
   assistant messages in multi-turn conversations will
   degrade model performance.
4. **Use the Responses API** — `phase` requires the
   Responses API. The Chat Completions API cannot
   represent multi-phase output.

## Supported Models

| Model                  | `phase` Support                 |
| ---------------------- | ------------------------------- |
| `openai/gpt-5.4`       | Supported                       |
| `openai/gpt-5.4-pro`   | Supported                       |
| `openai/gpt-5.3-codex` | Supported                       |
| Other OpenAI models    | Silently ignored (safe to pass) |
| Non-OpenAI models      | Not applicable                  |

<Note>
  Passing `phase` to OpenAI models that don't support it
  (like `gpt-4o`) is safe — OpenAI silently ignores the
  field. You do not need to filter `phase` based on the
  model.
</Note>

## Breaking Changes

None. The `phase` field is additive:

* Existing requests without `phase` continue to work
  on all models
* Models that don't support `phase` silently ignore it
* No changes are required unless you want to take
  advantage of improved multi-turn performance with
  GPT-5.3 Codex, GPT-5.4, and GPT-5.4 Pro

## Resources

* [Prompt Guidance for GPT-5.4](https://developers.openai.com/api/docs/guides/prompt-guidance/) — OpenAI's official guide covering prompt patterns and migration tips for GPT-5.4, including completeness checks, verification loops, tool persistence, and structured outputs.
* [OpenAI Responses API Reference](https://developers.openai.com/api/reference/resources/responses/methods/create)
* [Codex CLI Integration Guide](/docs/guides/guides/codex-cli)
* [OpenRouter API Documentation](/docs/api/reference/overview)
* [OpenRouter Codex Models](https://openrouter.ai/models?q=codex)
