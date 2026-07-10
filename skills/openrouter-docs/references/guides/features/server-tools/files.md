> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Files

> Let any model read, write, edit, and list workspace files

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

The `openrouter:files` server tool lets a model read, write, edit, and list text files in your workspace via the OpenRouter Files API. When the model needs file access — reading an uploaded document, saving output, or applying a targeted edit — it calls the tool and OpenRouter executes the operation server-side.

<Warning>
  **Requires the file-ids header**

  The files tool requires the `x-openrouter-file-ids: openrouter` request header and an authenticated workspace. Without the header, tool calls return an error to the model.
</Warning>

## Quick Start

<Template
  data={{
API_KEY_REF,
MODEL: 'openai/gpt-5.2'
}}
>
  <CodeGroup>
    ```typescript title="TypeScript" expandable lines theme={null}
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer {{API_KEY_REF}}',
        'Content-Type': 'application/json',
        'x-openrouter-file-ids': 'openrouter',
      },
      body: JSON.stringify({
        model: '{{MODEL}}',
        messages: [
          {
            role: 'user',
            content: 'List the files in my workspace and summarize notes.txt.'
          }
        ],
        tools: [
          { type: 'openrouter:files' }
        ]
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
        "x-openrouter-file-ids": "openrouter",
      },
      json={
        "model": "{{MODEL}}",
        "messages": [
          {
            "role": "user",
            "content": "List the files in my workspace and summarize notes.txt."
          }
        ],
        "tools": [
          {"type": "openrouter:files"}
        ]
      }
    )

    data = response.json()
    print(data["choices"][0]["message"]["content"])
    ```

    ```bash title="cURL" lines theme={null}
    curl https://openrouter.ai/api/v1/chat/completions \
      -H "Authorization: Bearer {{API_KEY_REF}}" \
      -H "Content-Type: application/json" \
      -H "x-openrouter-file-ids: openrouter" \
      -d '{
        "model": "{{MODEL}}",
        "messages": [
          {
            "role": "user",
            "content": "List the files in my workspace and summarize notes.txt."
          }
        ],
        "tools": [
          {"type": "openrouter:files"}
        ]
      }'
    ```
  </CodeGroup>
</Template>

## Configuration

The files tool has no configuration options — which workspace and files it can access is determined by your API key and the `x-openrouter-file-ids` header, so enabling the tool takes only its type:

```json lines theme={null}
{
  "type": "openrouter:files"
}
```

## Operations

The model generates the call arguments. Each call performs one operation:

| Operation | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `list`    | List workspace files, optionally filtered by `filename_filter` |
| `read`    | Read a file by `file_id` or `filename`                         |
| `write`   | Create a new file from `filename` and `content`                |
| `edit`    | Replace `old_string` with `new_string` in a file               |

### Call Arguments

| Field             | Type   | Description                                                                                           |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `operation`       | string | The file operation to perform: `list`, `read`, `write`, or `edit`                                     |
| `file_id`         | string | Target file id (read/edit). Preferred over `filename` when known                                      |
| `filename`        | string | Target filename (read/edit lookup), or the filename for a new file (write). May include a folder path |
| `filename_filter` | string | list: only return files whose filename contains this substring                                        |
| `content`         | string | write: the full UTF-8 text content of the new file                                                    |
| `old_string`      | string | edit: the exact text to replace (must match a single location)                                        |
| `new_string`      | string | edit: the replacement text                                                                            |
| `new_filename`    | string | edit: optional filename for the edited copy; defaults to the source filename                          |

<Note>
  **Edits are copy-on-write**

  Editing a file creates a new copy with a new `file_id`; the original file is left unchanged.
</Note>

## Response

The tool returns `{ "result": ... }` on success with the operation's output (file listing, file content, or the new file's metadata), or `{ "error": "..." }` when the operation fails — for example, when a required field is missing or the target file isn't found. The model reads the error and can retry with corrected arguments.

## Pricing

There is currently no separate charge for the files tool; you pay only for standard token usage.

## Next Steps

* [Server Tools Overview](/guides/features/server-tools) — Learn about server tools
* [Apply Patch](/guides/features/server-tools/apply-patch) — Let models propose file edits as V4A diffs
* [Tool Calling](/guides/features/tool-calling) — Learn about user-defined tool calling
