> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Subagent

> Delegate tasks to a smaller, faster model as a server tool

export const API_KEY_REF = '<OPENROUTER_API_KEY>';

<Note>
  **Beta**

  Server tools are currently in beta. The API and behavior may change.
</Note>

The `openrouter:subagent` server tool lets a model delegate self-contained tasks to a smaller, cheaper, faster **worker model** mid-generation. When your model has a piece of work that doesn't need its full capability — summarizing a document, extracting structured data, drafting boilerplate, reformatting text — it invokes the tool with a `task_name` and a `task_description`. The worker model executes the task and returns its result as the tool's `outcome`, and your model continues, integrating the result.

The worker can be **any OpenRouter model**, and it can optionally run as a **sub-agent with its own tools** (for example `openrouter:web_search`). Each task is independent: the worker sees only the task description (not the parent conversation) and keeps no memory between tasks.

## Quick start

<Template
  data={{
API_KEY_REF,
MODEL: '~anthropic/claude-opus-latest',
}}
>
  <CodeGroup>
    ```typescript title="TypeScript" expandable lines theme={null}
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
            content: 'Audit this release: summarize the changelog, list breaking changes, and draft the announcement.',
          },
        ],
        tools: [
          {
            type: 'openrouter:subagent',
            parameters: { model: '~anthropic/claude-haiku-latest' },
          },
        ],
      }),
    });

    const data = await response.json();
    console.log(data.choices[0].message.content);
    ```

    ```python title="Python" expandable lines theme={null}
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
            "content": "Audit this release: summarize the changelog, list breaking changes, and draft the announcement.",
          },
        ],
        "tools": [
          {
            "type": "openrouter:subagent",
            "parameters": {"model": "~anthropic/claude-haiku-latest"},
          },
        ],
      },
    )
    print(response.json()["choices"][0]["message"]["content"])
    ```
  </CodeGroup>
</Template>

## Choosing the worker model

The worker model is resolved with the following precedence:

1. `parameters.model` on the tool definition, if set.
2. The model from the outer API request, as a fallback.

Unlike the [advisor tool](/docs/guides/features/server-tools/advisor), the delegating model does not choose its worker per call — the worker is fixed by the tool definition. The subagent tool itself can never be the worker model.

## When does the model invoke it?

The tool's description steers the model to delegate focused sub-tasks that don't need its full capability — and to skip delegation for work that is faster to do directly than to describe. Because the worker has no access to the parent conversation, the model is instructed to include all relevant context and the expected output format in the `task_description`.

## Parameters

Pass an optional `parameters` object on the tool entry:

```json lines theme={null}
{
  "tools": [
    {
      "type": "openrouter:subagent",
      "parameters": {
        "model": "~anthropic/claude-haiku-latest",
        "instructions": "You are a fast, focused worker. Complete the task exactly as described.",
        "tools": [{ "type": "openrouter:web_search" }]
      }
    }
  ]
}
```

| Field                   | Default             | Description                                                                                                                                                                                                                                 |
| ----------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`                 | Outer request model | The worker model that executes delegated tasks (any OpenRouter model). Typically smaller, cheaper, and faster than the delegating model.                                                                                                    |
| `tools`                 | None                | Tools made available to the worker. Only OpenRouter server tools (such as `openrouter:web_search`) are supported; function tools are rejected with a `400` because the worker has no way to execute them. The subagent may not list itself. |
| `instructions`          | None                | System instructions for the worker.                                                                                                                                                                                                         |
| `max_tool_calls`        | Provider default    | Max tool-calling steps the worker may take. Only relevant when the worker has tools. Range 1–25. Accepted and validated but not yet enforced on the worker call.                                                                            |
| `max_completion_tokens` | Provider default    | Max output tokens (including reasoning) for the worker call.                                                                                                                                                                                |
| `reasoning`             | Provider default    | Reasoning config for the worker call — an object with optional `effort` and `max_tokens`. `effort` is forwarded to the worker; `max_tokens` is accepted and validated but not yet forwarded.                                                |
| `temperature`           | Provider default    | Sampling temperature (`0`–`2`) forwarded to the worker call.                                                                                                                                                                                |

### Tool-call arguments

When invoking the tool, the model passes:

| Argument           | Description                                                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `task_name`        | A short identifier for the delegated task (e.g. `summarize-changelog`).                                                                                     |
| `task_description` | Everything the worker needs to complete the task: full context, inputs, constraints, and the expected output format. The worker sees only this description. |

## What the tool returns

On success the tool result contains the outcome text, the task name, and the model that produced it:

```json lines theme={null}
{
  "status": "ok",
  "model": "anthropic/claude-haiku-4.5",
  "task_name": "summarize-changelog",
  "outcome": "Release 2.4 highlights: 1) New streaming API..."
}
```

On failure the result has `status: "error"` with a message; the calling model continues without the outcome:

```json lines theme={null}
{
  "status": "error",
  "task_name": "summarize-changelog",
  "error": "Subagent call failed: ..."
}
```

## Worker tools

When you pass `tools`, the worker runs as an agentic sub-agent over them before producing its outcome — for example, giving the worker `openrouter:web_search` lets it ground its result in fresh sources. The worker's tool use happens inside the tool call; only its final text is returned to your model.

Nested tools must be OpenRouter server tools (for example `openrouter:web_search` or `openrouter:web_fetch`). Function tools (`{ "type": "function" }`) are rejected with a `400`: the worker call has no client-side executor, so a function tool call could never be fulfilled.

## Recursion protection

The subagent tool cannot invoke itself. Two guards enforce this:

* A self-reference check rejects a subagent entry inside the subagent's own `tools` array (and rejects the subagent tool name as the worker `model`).
* Each inner subagent call carries an `x-openrouter-subagent-depth` header; the subagent tool is stripped from any sub-call, so a worker can never re-enter the subagent.

Task executions are also capped per request to bound cost and latency.

## Related

* [Advisor server tool](/docs/guides/features/server-tools/advisor) — consult a stronger model for guidance
* [Fusion server tool](/docs/guides/features/server-tools/fusion) — multi-model deliberation
* [Web Search server tool](/docs/guides/features/server-tools/web-search)
