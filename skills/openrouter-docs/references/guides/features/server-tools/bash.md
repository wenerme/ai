> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Bash

> Give any model a sandboxed shell to run commands server-side

export const API_KEY_REF = '<OPENROUTER_API_KEY>';

<Note>
  **Beta**

  Server tools are currently in beta. The API and behavior may change.
</Note>

The `openrouter:bash` server tool gives a model the ability to run shell
commands. It mirrors Anthropic's native bash tool and is available on the
**Anthropic Messages API only** (`/api/v1/messages`). When the model needs to
run a command, it calls the tool; with server-side execution enabled,
OpenRouter runs the command inside an isolated, sandboxed Linux container and
returns the combined output and exit code.

<Note>
  **Messages API only**

  `openrouter:bash` is only available on the Anthropic Messages API. Requesting
  it on the Chat Completions or Responses API returns a `400` error. On those
  APIs, use a client-side function tool instead.
</Note>

## How It Works

1. You include `{ "type": "openrouter:bash" }` in your `tools` array on a
   Messages API request.
2. Based on the user's prompt, the model decides whether it needs to run a
   command and emits the call with one or more shell commands.
3. With `engine: "openrouter"`, OpenRouter executes the commands sequentially
   in a sandboxed container.
4. The combined `stdout`, `stderr`, and `exitCode` are returned to the model.
5. The model incorporates the result into its response. It may run multiple
   command batches in a single request if needed.

Server-side execution is opt-in: set `engine: "openrouter"` on the tool (see
[Execution engine](#execution-engine)). With the default `engine` (`auto`), the
tool call is returned to your application to run client-side instead.

## Quick Start

Send the tool on a Messages API request. Set `engine: "openrouter"` to run
commands server-side in the OpenRouter sandbox.

<Template
  data={{
API_KEY_REF,
MODEL: 'anthropic/claude-sonnet-4.5'
}}
>
  <CodeGroup>
    ```typescript title="TypeScript" expandable lines theme={null}
    const response = await fetch('https://openrouter.ai/api/v1/messages', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer {{API_KEY_REF}}',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: '{{MODEL}}',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: 'List the files in the current directory and show me the OS version.'
          }
        ],
        tools: [
          { type: 'openrouter:bash', parameters: { engine: 'openrouter' } }
        ]
      }),
    });

    const data = await response.json();
    console.log(data);
    ```

    ```python title="Python" expandable lines theme={null}
    import requests

    response = requests.post(
      "https://openrouter.ai/api/v1/messages",
      headers={
        "Authorization": f"Bearer {{API_KEY_REF}}",
        "Content-Type": "application/json",
      },
      json={
        "model": "{{MODEL}}",
        "max_tokens": 1024,
        "messages": [
          {
            "role": "user",
            "content": "List the files in the current directory and show me the OS version."
          }
        ],
        "tools": [
          {"type": "openrouter:bash", "parameters": {"engine": "openrouter"}}
        ]
      }
    )

    data = response.json()
    print(data)
    ```

    ```bash title="cURL" lines theme={null}
    curl https://openrouter.ai/api/v1/messages \
      -H "Authorization: Bearer {{API_KEY_REF}}" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "{{MODEL}}",
        "max_tokens": 1024,
        "messages": [
          {
            "role": "user",
            "content": "List the files in the current directory."
          }
        ],
        "tools": [
          {"type": "openrouter:bash", "parameters": {"engine": "openrouter"}}
        ]
      }'
    ```
  </CodeGroup>
</Template>

## Configuration

The bash tool accepts optional `parameters` to choose its execution
environment:

```json lines theme={null}
{
  "type": "openrouter:bash",
  "parameters": {
    "environment": { "type": "container_auto" }
  }
}
```

| Parameter     | Type   | Default          | Description                                                                                                                                                                                                            |
| ------------- | ------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `environment` | object | `container_auto` | Execution environment. Use `{ "type": "container_auto" }` for an OpenRouter-managed container, or `{ "type": "container_reference", "container_id": "..." }` to reuse an existing container                            |
| `engine`      | string | `auto`           | Where commands run: `openrouter` runs them server-side in the OpenRouter sandbox; `auto`/`native` (the default) return the tool call to your application to run client-side. See [Execution engine](#execution-engine) |

### Call Arguments

The model generates the call arguments. They mirror Anthropic's native bash
tool action:

| Field               | Type      | Description                                                                            |
| ------------------- | --------- | -------------------------------------------------------------------------------------- |
| `command`           | string    | A single shell command to run                                                          |
| `commands`          | string\[] | Shell commands to run sequentially                                                     |
| `restart`           | boolean   | Reset the shell session (see [Restart](#restart))                                      |
| `timeout_ms`        | integer   | Maximum execution time for the batch                                                   |
| `max_output_length` | integer   | Maximum characters returned per stream (`stdout` and `stderr` are each capped to this) |

## Anthropic Messages API native bash tool

On the Messages API you can also use Anthropic's native bash tool shape
(`{ "type": "bash_20250124", "name": "bash" }`) instead of `openrouter:bash`.

```json lines theme={null}
{
  "tools": [
    { "type": "bash_20250124", "name": "bash" }
  ]
}
```

The native `bash_20250124` tool runs **client-side** by default: OpenRouter
returns the `tool_use` to your application to execute locally, exactly as a
direct call to the provider would. To run commands server-side in OpenRouter's
sandbox instead, send the OpenRouter tool shape with `engine: "openrouter"`:

```json lines theme={null}
{
  "tools": [
    {
      "type": "openrouter:bash",
      "parameters": { "engine": "openrouter" }
    }
  ]
}
```

### Restart

Anthropic's bash tool supports a `restart` action that resets the shell
session. When the model emits `{ "restart": true }`, OpenRouter provisions a
fresh sandbox container, so commands run after a restart start from a clean
state. The reset applies for the remainder of the current agentic turn. To keep
a container alive across separate API requests in a conversation, send a stable
`session_id` on each request — the sandbox is keyed by it.

## Execution engine

The `engine` parameter controls where commands run:

* `openrouter` — run commands server-side in the OpenRouter sandbox.
* `auto` (default) / `native` — native passthrough: the tool call is returned to
  your application to run client-side, and OpenRouter does not execute the
  commands. The native `bash_20250124` tool always uses this behavior, since it
  has no `engine` field.

This lets you opt into OpenRouter's sandboxed execution with `openrouter`, while
the default leaves command execution to your own application.

## Response Format

When the model calls the bash tool, it receives a response like:

```json lines theme={null}
{
  "command": "ls -la",
  "stdout": "total 0\ndrwxr-xr-x 2 root root 40 Jun  1 12:00 .\n",
  "stderr": "",
  "exitCode": 0
}
```

A non-zero `exitCode` indicates the command itself failed; the error output is
returned on `stderr` so the model can read and react to it.

## Security

Running shell commands is powerful and is sandboxed by design:

* Commands execute in an isolated container — not on OpenRouter
  infrastructure or your machine. With `container_auto` the container is
  ephemeral; with `container_reference` it persists across requests.
* Containers are scoped per account, so they are never shared across tenants.
* Network access is intended to be disabled by default at the container level.
* Execution time is bounded by `timeout_ms` (clamped to a server-side maximum).
* `stdout` and `stderr` are each truncated to `max_output_length` (a per-stream
  cap, itself clamped to a server-side maximum).

## Next Steps

* [Server Tools Overview](/guides/features/server-tools) — Learn about
  server tools
* [Web Fetch](/guides/features/server-tools/web-fetch) — Fetch content
  from URLs
* [Tool Calling](/guides/features/tool-calling) — Learn about user-defined
  tool calling
