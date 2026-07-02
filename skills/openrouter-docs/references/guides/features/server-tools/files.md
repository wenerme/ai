> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Files

Server tools are currently in beta. The API and behavior may change.

The `openrouter:files` server tool lets any model read, write, edit, and
list the files stored in your OpenRouter workspace through the
[Files API](/docs/features/files). The model decides when to call it; OpenRouter
executes the operation server-side against your workspace and returns the
result.

## Enabling the tool

The files tool operates on **OpenRouter-hosted** files, so it is only active
when the request opts into OpenRouter file handling via the
`x-openrouter-file-ids` header:

```text
x-openrouter-file-ids: openrouter
```

Without this header (or with `x-openrouter-file-ids: provider`, the current
default), the tool is inert: the model is told that files are unavailable. This
is the same header that controls whether `file_id` message references are
resolved by OpenRouter or passed through to the upstream provider.

## Quick Start

```typescript title="TypeScript"
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
        content: 'List my files, then create notes.txt with a summary.'
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

```python title="Python"
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
        "content": "List my files, then create notes.txt with a summary."
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

```bash title="cURL"
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer {{API_KEY_REF}}" \
  -H "Content-Type: application/json" \
  -H "x-openrouter-file-ids: openrouter" \
  -d '{
    "model": "{{MODEL}}",
    "messages": [
      {
        "role": "user",
        "content": "List my files, then create notes.txt with a summary."
      }
    ],
    "tools": [
      {"type": "openrouter:files"}
    ]
  }'
```

## Operations

The model selects an operation via the `operation` argument:

| Operation | Description                                                            |
| --------- | ---------------------------------------------------------------------- |
| `list`    | List the workspace's files (optionally filtered by filename substring) |
| `read`    | Read a file's text content by `file_id` or `filename`                  |
| `write`   | Create a new text file from a `filename` and `content`                 |
| `edit`    | Replace a string in a file, writing the result to a new file           |

### Edit creates a new file

Editing is **copy-on-write**: an `edit` reads the source file, applies the
string replacement, and writes the result as a **new file with a new
`file_id`**. The original file is left unchanged, so existing references keep
resolving. The response includes the new `file_id` and the `source_file_id` it
was derived from.

## Constraints

* **Text only.** The tool reads and writes UTF-8 text files. Binary files are
  rejected.
* **Size limit.** Individual reads and writes are capped at 20 MB.
* **Workspace-scoped.** All operations run against the workspace of the
  authenticated request. Anonymous (unauthenticated) callers have no workspace,
  so the tool is unavailable.
* **`documents/` namespace.** Files live under your workspace's default
  document namespace — the same files surfaced in the
  [Files dashboard](/docs/features/files).

## Pricing

The files tool has no additional cost beyond standard token usage. Stored files
count toward your workspace storage quota.

## Next Steps

* [Server Tools Overview](/docs/guides/features/server-tools) — Learn about server tools
* [Files API](/docs/features/files) — Upload and manage workspace files
* [Apply Patch](/docs/guides/features/server-tools/apply-patch) — Propose file edits via V4A diffs
* [Tool Calling](/docs/guides/features/tool-calling) — Learn about user-defined tool calling