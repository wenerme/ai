> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Advisor

Server tools are currently in beta. The API and behavior may change.

The `openrouter:advisor` server tool lets a model consult a higher-intelligence **advisor model** mid-generation. When your model hits a decision point — before committing to an approach, when it's stuck, or before declaring a task done — it invokes the tool with a `prompt`. The advisor model thinks, returns its guidance as the tool result, and your model continues, informed by the advice.

Unlike a fixed model pairing, the advisor can be **any OpenRouter model**, and it can optionally run as a **sub-agent with its own tools** (for example `openrouter:web_search`). The tool returns the advisor model's response directly as the tool result — your model writes the final answer.

## Quick start

```typescript title="TypeScript"
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer {{API_KEY_REF}}',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: '{{MODEL}}',
    messages: [
      {
        role: 'user',
        content: 'Build a concurrent worker pool in Go with graceful shutdown.',
      },
    ],
    tools: [
      {
        type: 'openrouter:advisor',
        parameters: { model: '~anthropic/claude-opus-latest' },
      },
    ],
  }),
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

```python title="Python"
import requests

response = requests.post(
  "https://openrouter.ai/api/v1/chat/completions",
  headers={
    "Authorization": f"Bearer {{API_KEY_REF}}",
    "Content-Type": "application/json",
  },
  json={
    "model": "{{MODEL}}",
    "messages": [
      {
        "role": "user",
        "content": "Build a concurrent worker pool in Go with graceful shutdown.",
      },
    ],
    "tools": [
      {
        "type": "openrouter:advisor",
        "parameters": {"model": "~anthropic/claude-opus-latest"},
      },
    ],
  },
)
print(response.json()["choices"][0]["message"]["content"])
```

## Choosing the advisor model

The advisor model is resolved with the following precedence:

1. `parameters.model` on the tool definition, if set.
2. The `model` argument the executor passes in the tool **call**, if the
   definition does not fix one.
3. The model from the outer API request, as a fallback.

This lets you either pin the advisor model up front (`parameters.model`) or let the executing model pick it per call. The advisor tool itself can never be the advisor model.

## When does the model invoke it?

The tool's description steers the model to consult the advisor before substantive work, when it's stuck, or before declaring a task done — not for trivial steps a single model can resolve directly. To **force** a consultation on every request, set `tool_choice: "required"`.

## Parameters

Pass an optional `parameters` object on the tool entry:

```json
{
  "tools": [
    {
      "type": "openrouter:advisor",
      "parameters": {
        "model": "~anthropic/claude-opus-latest",
        "instructions": "You are a senior staff engineer. Be decisive.",
        "tools": [{ "type": "openrouter:web_search" }],
        "forward_transcript": false
      }
    }
  ]
}
```

| Field                   | Default             | Description                                                                                                                                                                                        |
| ----------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`                 | Outer request model | The advisor model to consult (any OpenRouter model). See [Choosing the advisor model](#choosing-the-advisor-model).                                                                                |
| `advisors`              | None                | A roster of **named advisor profiles** (see [Named advisors](#named-advisors)). When set, the model selects one by `name` and the chosen profile's config overrides the request-wide fields below. |
| `tools`                 | None                | Tools made available to the advisor sub-agent (function tools and OpenRouter server tools such as `openrouter:web_search`). The advisor may not list itself.                                       |
| `instructions`          | None                | System instructions for the advisor sub-agent.                                                                                                                                                     |
| `forward_transcript`    | `false`             | When `true`, the full parent conversation is forwarded to the advisor (and the tool-call `prompt`, if given, is appended as a final user turn). When `false`, the advisor sees only the `prompt`.  |
| `max_tool_calls`        | Provider default    | Max tool-calling steps the advisor sub-agent may take. Only relevant when the advisor has tools. Range 1–25.                                                                                       |
| `max_completion_tokens` | Provider default    | Max output tokens (including reasoning) for the advisor call.                                                                                                                                      |
| `reasoning`             | Provider default    | Reasoning config forwarded to the advisor call — an object with optional `effort` and `max_tokens`.                                                                                                |
| `temperature`           | Provider default    | Sampling temperature (`0`–`2`) forwarded to the advisor call.                                                                                                                                      |

### Tool-call arguments

When invoking the tool, the model passes:

| Argument | Description                                                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prompt` | What the model wants advice on. Required unless `forward_transcript` is `true`.                                                                   |
| `name`   | Which configured advisor profile to consult, by `name`. Only used when an `advisors` roster is configured. See [Named advisors](#named-advisors). |
| `model`  | The advisor model to use. Only honored when neither the selected profile nor the tool definition fixes a `model`.                                 |

## Named advisors

Instead of a single advisor, you can configure a **roster of named profiles** in `parameters.advisors`. Each profile has a required `name` plus its own optional `model`, `instructions`, and the other advisor fields. The executor model still sees one `advisor` tool and selects a profile by passing its `name`:

```json
{
  "tools": [
    {
      "type": "openrouter:advisor",
      "parameters": {
        "advisors": [
          {
            "name": "reviewer",
            "model": "~anthropic/claude-opus-latest",
            "instructions": "You are a critical code reviewer. Find the flaws."
          },
          {
            "name": "architect",
            "model": "~openai/gpt-latest",
            "instructions": "You are a systems architect. Think about scale."
          }
        ]
      }
    }
  ]
}
```

The model then consults a specific profile:

```json
{ "name": "reviewer", "prompt": "Review this concurrency approach." }
```

A selected profile's config takes precedence over the request-wide `parameters` for that call. Profile **names must be unique** within the roster — a duplicate name fails the request with a `400`. When a roster is configured, the model must pass a `name` that matches one of the profiles; an unknown or missing `name` returns an error result listing the valid names.

The single-advisor form (no `advisors` roster) continues to work unchanged — pass `model`/`instructions` directly in `parameters` and the model calls the tool with just a `prompt`.

## What the tool returns

On success the tool result contains the advice text and the model that produced it:

```json
{
  "status": "ok",
  "model": "anthropic/claude-opus-4.8",
  "advice": "Use a channel-based coordination pattern. Close the input channel first, then wait on a WaitGroup to drain in-flight work before shutdown..."
}
```

On failure the result has `status: "error"` with a message; the calling model continues without the advice:

```json
{
  "status": "error",
  "error": "Advisor call failed: ..."
}
```

## Sub-agent tools

When you pass `tools`, the advisor runs as an agentic sub-agent over them before producing its advice — for example, giving the advisor `openrouter:web_search` lets it ground its guidance in fresh sources. The advisor's tool use happens inside the tool call; only its final text is returned to your model.

## Recursion protection

The advisor tool cannot invoke itself. Two guards enforce this:

* A self-reference check rejects an advisor entry inside the advisor's own `tools` array (and rejects the advisor tool name as the advisor `model`).
* Each inner advisor call carries an `x-openrouter-advisor-depth` header; the advisor tool is stripped from any sub-call, so an advisor sub-agent can never re-enter the advisor.

Consultations are also capped per request to bound cost and latency.

## Related

* [Fusion server tool](/docs/guides/features/server-tools/fusion) — multi-model deliberation
* [Web Search server tool](/docs/guides/features/server-tools/web-search)
* [Web Fetch server tool](/docs/guides/features/server-tools/web-fetch)