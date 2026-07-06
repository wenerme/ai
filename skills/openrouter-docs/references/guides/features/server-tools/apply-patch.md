> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Apply Patch

> Let models propose file changes via V4A diffs

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

  The apply patch server tool is only available through the [Responses API](/api/reference/responses). It is not supported via the Chat Completions API.
</Warning>

<Note>
  **Streaming behavior**

  Only OpenAI models stream apply patch results incrementally via `response.apply_patch_call_operation_diff.delta` events. All other models return the complete patch as a single tool output.
</Note>

The `openrouter:apply_patch` server tool enables models to propose file changes using [V4A diff](https://github.com/openai/codex/blob/main/codex-rs/core/src/patch/v4a.md) patches. This is the building block for coding agents — the model generates a patch describing file creates, updates, or deletes, OpenRouter validates the diff syntax, and your application applies it.

## How It Works

1. You include `{ "type": "openrouter:apply_patch" }` in your `tools` array when calling the Responses API.
2. Based on the conversation, the model decides a file needs to be created, updated, or deleted, and generates a V4A diff patch.
3. OpenRouter validates the patch syntax (correct line prefixes, valid markers, non-empty paths).
4. If validation passes, the tool call is returned to your application as an `apply_patch_call` output item — your application applies the patch to the filesystem and echoes the result back as `apply_patch_call_output` on the next turn.
5. If validation fails, the error is returned to the model so it can self-correct.

This is a **human-in-the-loop** tool: OpenRouter validates the diff but never applies it. Your application is responsible for executing the file operation.

## Quick Start

<Template
  data={{
API_KEY_REF,
MODEL: 'openai/codex-mini'
}}
>
  <CodeGroup>
    ```typescript title="TypeScript" lines theme={null}
    const response = await fetch('https://openrouter.ai/api/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer {{API_KEY_REF}}',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: '{{MODEL}}',
        input: 'Create a hello.py file that prints "Hello, world!"',
        tools: [
          { type: 'openrouter:apply_patch' }
        ]
      }),
    });

    const data = await response.json();
    // The response contains an apply_patch_call output item
    // with the operation (create_file, update_file, or delete_file)
    console.log(data.output);
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
        "input": "Create a hello.py file that prints 'Hello, world!'",
        "tools": [
          {"type": "openrouter:apply_patch"}
        ]
      }
    )

    data = response.json()
    # The response contains an apply_patch_call output item
    # with the operation (create_file, update_file, or delete_file)
    print(data["output"])
    ```

    ```bash title="cURL" lines theme={null}
    curl https://openrouter.ai/api/v1/responses \
      -H "Authorization: Bearer {{API_KEY_REF}}" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "{{MODEL}}",
        "input": "Create a hello.py file that prints \"Hello, world!\"",
        "tools": [
          {"type": "openrouter:apply_patch"}
        ]
      }'
    ```
  </CodeGroup>
</Template>

## Patch Operations

The tool supports three operation types, each carried as the `operation` field on the `apply_patch_call` output item:

### `create_file`

Creates a new file. Every content line in the diff must start with `+`:

```json lines theme={null}
{
  "type": "apply_patch_call",
  "call_id": "call_abc123",
  "status": "completed",
  "operation": {
    "type": "create_file",
    "path": "/src/hello.py",
    "diff": "+print(\"Hello, world!\")\n"
  }
}
```

### `update_file`

Updates an existing file using a V4A diff with context lines (` ` prefix), additions (`+`), and deletions (`-`):

```json lines theme={null}
{
  "type": "apply_patch_call",
  "call_id": "call_def456",
  "status": "completed",
  "operation": {
    "type": "update_file",
    "path": "/src/main.ts",
    "diff": "@@ function main() {\n-  console.log(\"old\");\n+  console.log(\"new\");\n }"
  }
}
```

### `delete_file`

Deletes a file. No diff is needed — only the file path:

```json lines theme={null}
{
  "type": "apply_patch_call",
  "call_id": "call_ghi789",
  "status": "completed",
  "operation": {
    "type": "delete_file",
    "path": "/src/deprecated.ts"
  }
}
```

## Echoing Results

After your application applies (or rejects) the patch, send the result back on the next turn as an `apply_patch_call_output` input item:

```json lines theme={null}
{
  "model": "openai/codex-mini",
  "input": [
    {
      "type": "apply_patch_call_output",
      "call_id": "call_abc123",
      "status": "completed",
      "output": "Applied patch to /src/hello.py"
    }
  ],
  "tools": [
    { "type": "openrouter:apply_patch" }
  ]
}
```

| Field     | Type                        | Description                                          |
| --------- | --------------------------- | ---------------------------------------------------- |
| `call_id` | string                      | Must match the `call_id` from the `apply_patch_call` |
| `status`  | `"completed"` or `"failed"` | Whether the patch was applied successfully           |
| `output`  | string (optional)           | Human-readable log of what happened                  |

## Configuration

The apply patch tool accepts an optional `engine` parameter:

```json lines theme={null}
{
  "type": "openrouter:apply_patch",
  "parameters": {
    "engine": "auto"
  }
}
```

| Parameter | Type   | Default | Description                                                                                                                                                                                                                                                                                                  |
| --------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `engine`  | string | `auto`  | `auto` — uses native passthrough when the endpoint supports incremental diff streaming, otherwise falls back to OpenRouter's HITL validator. `native` — forces native passthrough (falls back to HITL if unsupported). `openrouter` — always uses the HITL validator, even on endpoints with native support. |

### Engine behavior

* **Native passthrough** streams the diff incrementally via `response.apply_patch_call_operation_diff.delta` events, matching OpenAI's streaming format. Currently supported on OpenAI endpoints.
* **HITL (human-in-the-loop)** buffers the complete diff and delivers it as a single atomic `apply_patch_call` output item.

## Pricing

The apply patch tool has no additional cost beyond standard token usage.

## Next Steps

* [Server Tools Overview](/guides/features/server-tools) — Learn about server tools
* [Web Search](/guides/features/server-tools/web-search) — Search the web for real-time information
* [Datetime](/guides/features/server-tools/datetime) — Get the current date and time
* [Tool Calling](/guides/features/tool-calling) — Learn about user-defined tool calling
