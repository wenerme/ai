> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Shell

> Give any model a sandboxed hosted shell on the Responses API

export const Template = ({children, data}) => {
  const replace = s => s.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in data) ? data[k] : `{{${k}}}`);
  const leafText = node => typeof node === 'string' ? node : node?.$$typeof && typeof node.props?.children === 'string' ? node.props.children : null;
  const collapseTokens = nodes => {
    const out = [];
    let i = 0;
    while (i < nodes.length) {
      const ta = leafText(nodes[i]);
      const tb = leafText(nodes[i + 1]);
      const tc = leafText(nodes[i + 2]);
      if (ta != null && tb != null && tc != null) {
        const m = (ta + tb + tc).match(/^([\s\S]*)\{\{(\w+)\}\}([\s\S]*)$/);
        if (m && (m[2] in data)) {
          out.push(m[1] + data[m[2]] + m[3]);
          i += 3;
          continue;
        }
      }
      out.push(nodes[i]);
      i++;
    }
    return out;
  };
  const process = node => {
    if (typeof node === 'string') return replace(node);
    if (Array.isArray(node)) return collapseTokens(node.map(process));
    if (node && typeof node === 'object') {
      if (node.$$typeof) return {
        ...node,
        props: process(node.props)
      };
      return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, process(v)]));
    }
    return node;
  };
  return <>{process(children)}</>;
};

export const API_KEY_REF = '<OPENROUTER_API_KEY>';

<Badge color="blue">Beta</Badge>

<Note>
  **Beta**

  Server tools are currently in beta. The API and behavior may change.
</Note>

<Warning>
  **Responses API only**

  The shell server tool is only available through the [Responses API](/api/reference/responses). Requesting it on the Chat Completions or Messages API returns a `400` error. On the Messages API, use [Bash](/guides/features/server-tools/bash) instead.
</Warning>

The `openrouter:shell` server tool gives a model a hosted shell — a sandbox-backed clone of OpenAI's hosted `shell` tool that works with any model. When the model needs to run commands, it emits a shell call; OpenRouter executes the commands server-side in an isolated Linux container and returns each command's `stdout`, `stderr`, and exit or timeout outcome.

Unlike the [Bash](/guides/features/server-tools/bash) tool, the shell tool has no client-side execution mode: commands always run in a hosted environment, either OpenAI's native shell or OpenRouter's sandbox.

## How It Works

1. You include `{ "type": "openrouter:shell" }` in your `tools` array on a Responses API request. You can also send OpenAI's native `shell` tool shape — on non-OpenAI models it is routed to the OpenRouter sandbox automatically.
2. Based on the prompt, the model decides to run one or more shell commands and emits a shell call.
3. OpenRouter executes the commands in order, each in its own invocation, inside a sandboxed container.
4. Each command's `stdout`, `stderr`, and outcome (exit code or timeout) are returned to the model.
5. The model incorporates the results and may run further command batches in the same request.

## Quick Start

<Template
  data={{
API_KEY_REF,
MODEL: 'anthropic/claude-sonnet-4.5'
}}
>
  <CodeGroup>
    ```typescript title="TypeScript" expandable lines theme={null}
    const response = await fetch('https://openrouter.ai/api/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer {{API_KEY_REF}}',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: '{{MODEL}}',
        input: 'List the files in the current directory and show me the OS version.',
        tools: [
          { type: 'openrouter:shell', parameters: { engine: 'openrouter' } }
        ]
      }),
    });

    const data = await response.json();
    console.log(data);
    ```

    ```python title="Python" expandable lines theme={null}
    import requests

    response = requests.post(
      "https://openrouter.ai/api/v1/responses",
      headers={
        "Authorization": f"Bearer {{API_KEY_REF}}",
        "Content-Type": "application/json",
      },
      json={
        "model": "{{MODEL}}",
        "input": "List the files in the current directory and show me the OS version.",
        "tools": [
          {"type": "openrouter:shell", "parameters": {"engine": "openrouter"}}
        ]
      }
    )

    data = response.json()
    print(data)
    ```

    ```bash title="cURL" lines theme={null}
    curl https://openrouter.ai/api/v1/responses \
      -H "Authorization: Bearer {{API_KEY_REF}}" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "{{MODEL}}",
        "input": "List the files in the current directory and show me the OS version.",
        "tools": [
          {"type": "openrouter:shell", "parameters": {"engine": "openrouter"}}
        ]
      }'
    ```
  </CodeGroup>
</Template>

## Configuration

The shell tool accepts optional `parameters` to choose its execution engine and environment:

```json lines theme={null}
{
  "type": "openrouter:shell",
  "parameters": {
    "engine": "openrouter",
    "environment": { "type": "container_auto" }
  }
}
```

| Parameter             | Type    | Default          | Description                                                                                                                                                                                                                                   |
| --------------------- | ------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `engine`              | string  | `auto`           | Which shell engine to use: `openrouter` runs commands server-side in the OpenRouter sandbox; `auto` keeps the provider's native hosted shell when available (OpenAI) and routes to the OpenRouter sandbox on other providers                  |
| `environment`         | object  | `container_auto` | Execution environment. Use `{ "type": "container_auto" }` for an OpenRouter-managed ephemeral container, or `{ "type": "container_reference", "container_id": "..." }` to reuse an existing container. `local` environments are not supported |
| `sleep_after_seconds` | integer | `900`            | How long the container stays warm after its last command before sleeping. Idle-based: each command renews the timer. Capped at 2592000 (30 days)                                                                                              |

Defaults and caps reflect current server-enforced limits and may change while the tool is in beta.

### Call Arguments

The model generates the call arguments, mirroring OpenAI's hosted shell `shell_call.action`:

| Field               | Type      | Description                                                                                               |
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `commands`          | string\[] | Shell commands to run, each in its own invocation, in order                                               |
| `timeout_ms`        | integer   | Maximum execution time in milliseconds applied to each command                                            |
| `max_output_length` | integer   | Maximum characters returned per stream — `stdout` and `stderr` are each capped to this value, per command |

## OpenAI native shell tool

On the Responses API you can also send OpenAI's native tool shape (`{ "type": "shell" }`, or the legacy Codex `local_shell`) instead of `openrouter:shell`. On OpenAI models this uses OpenAI's own hosted shell; on any other model, OpenRouter routes the call to its sandbox transparently. The response emits the native `shell_call` output item either way.

## Response Format

The tool returns one entry per command, matching OpenAI's `shell_call_output.output[]`:

```json lines theme={null}
{
  "output": [
    {
      "stdout": "total 0\ndrwxr-xr-x 2 root root 40 Jun  1 12:00 .\n",
      "stderr": "",
      "outcome": { "type": "exit", "exit_code": 0 }
    }
  ]
}
```

Each command's `outcome` is either `{ "type": "exit", "exit_code": <int> }` or `{ "type": "timeout" }`. A non-zero exit code indicates the command failed; the error output is returned on `stderr` so the model can read and react to it.

## Security

Shell execution is sandboxed by design:

* Commands execute in an isolated container — not on OpenRouter infrastructure or your machine. With `container_auto` the container is ephemeral; with `container_reference` it persists across requests.
* Containers are scoped per account and workspace, so they are never shared across tenants.
* Execution time is bounded by `timeout_ms` (clamped to a server-side maximum).
* `stdout` and `stderr` are each truncated to `max_output_length` (a per-stream cap, itself clamped to a server-side maximum).

## Next Steps

* [Server Tools Overview](/guides/features/server-tools) — Learn about server tools
* [Bash](/guides/features/server-tools/bash) — Sandboxed shell for the Anthropic Messages API
* [Tool Calling](/guides/features/tool-calling) — Learn about user-defined tool calling
