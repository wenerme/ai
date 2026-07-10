> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Server Tools

> Tools operated by OpenRouter that models can call during request

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

Server tools are specialized tools operated by OpenRouter that any model can call during a request. When a model decides to use a server tool, OpenRouter executes it server-side and returns the result to the model — no client-side implementation needed.

## Server Tools vs Plugins vs User-Defined Tools

|                           | Server Tools             | Plugins          | User-Defined Tools       |
| ------------------------- | ------------------------ | ---------------- | ------------------------ |
| **Who decides to use it** | The model                | Always runs      | The model                |
| **Who executes it**       | OpenRouter               | OpenRouter       | Your application         |
| **Call frequency**        | 0 to N times per request | Once per request | 0 to N times per request |
| **Specified via**         | `tools` array            | `plugins` array  | `tools` array            |
| **Type prefix**           | `openrouter:*`           | N/A              | `function`               |

**Server tools** are tools the model can invoke zero or more times during a request. OpenRouter handles execution transparently.

**Plugins** inject or mutate a request or response to add functionality (e.g. response healing, PDF parsing). They always run once when enabled.

**User-defined tools** are standard function-calling tools where the model suggests a call and *your* application executes it.

## Available Server Tools

| Tool                                                                   | Type                                     | Description                                                     |
| ---------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------- |
| [**Web Search**](/guides/features/server-tools/web-search)             | `openrouter:web_search`                  | Search the web for current information                          |
| [**Datetime**](/guides/features/server-tools/datetime)                 | `openrouter:datetime`                    | Get the current date and time                                   |
| [**Image Generation**](/guides/features/server-tools/image-generation) | `openrouter:image_generation`            | Generate images from text prompts                               |
| [**Web Fetch**](/guides/features/server-tools/web-fetch)               | `openrouter:web_fetch`                   | Fetch and extract content from URLs                             |
| [**Apply Patch**](/guides/features/server-tools/apply-patch)           | `openrouter:apply_patch`                 | Propose file edits via V4A diff patches (Responses API only)    |
| [**Shell**](/guides/features/server-tools/shell)                       | `openrouter:shell`                       | Run commands in a hosted, sandboxed shell (Responses API only)  |
| [**Files**](/guides/features/server-tools/files)                       | `openrouter:files`                       | Read, write, edit, and list workspace files via the Files API   |
| [**Fusion**](/guides/features/server-tools/fusion)                     | `openrouter:fusion`                      | Run a panel of models and a judge for multi-model analysis      |
| [**Advisor**](/guides/features/server-tools/advisor)                   | `openrouter:advisor`                     | Consult a stronger model for guidance mid-generation            |
| [**Subagent**](/guides/features/server-tools/subagent)                 | `openrouter:subagent`                    | Delegate self-contained tasks to a smaller, faster worker model |
| [**Search Models**](/guides/features/server-tools/search-models)       | `openrouter:experimental__search_models` | Search and filter the OpenRouter model catalog                  |

## How Server Tools Work

1. You include one or more server tools in the `tools` array of your API request.
2. The model decides whether and when to call each server tool based on the user's prompt.
3. OpenRouter intercepts the tool call, executes it server-side, and returns the result to the model.
4. The model uses the result to formulate its response. It may call the tool again if needed.

Server tools work alongside your own user-defined tools — you can include both in the same request.

## Quick Start

Add server tools to the `tools` array using the `openrouter:` type prefix:

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
      },
      body: JSON.stringify({
        model: '{{MODEL}}',
        messages: [
          {
            role: 'user',
            content: 'What are the latest developments in AI?'
          }
        ],
        tools: [
          { type: 'openrouter:web_search' },
          { type: 'openrouter:datetime' }
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
      },
      json={
        "model": "{{MODEL}}",
        "messages": [
          {
            "role": "user",
            "content": "What are the latest developments in AI?"
          }
        ],
        "tools": [
          {"type": "openrouter:web_search"},
          {"type": "openrouter:datetime"}
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
      -d '{
        "model": "{{MODEL}}",
        "messages": [
          {
            "role": "user",
            "content": "What are the latest developments in AI?"
          }
        ],
        "tools": [
          {"type": "openrouter:web_search"},
          {"type": "openrouter:datetime"}
        ]
      }'
    ```
  </CodeGroup>
</Template>

## Combining with User-Defined Tools

Server tools and user-defined tools can be used in the same request:

```json expandable lines theme={null}
{
  "model": "openai/gpt-5.2",
  "messages": [...],
  "tools": [
    { "type": "openrouter:web_search", "parameters": { "max_results": 3 } },
    { "type": "openrouter:datetime" },
    {
      "type": "function",
      "function": {
        "name": "get_stock_price",
        "description": "Get the current stock price for a ticker symbol",
        "parameters": {
          "type": "object",
          "properties": {
            "ticker": { "type": "string" }
          },
          "required": ["ticker"]
        }
      }
    }
  ]
}
```

The model can call any combination of server tools and user-defined tools. OpenRouter executes the server tools automatically, while your application handles the user-defined tool calls as usual.

## Usage Tracking

Server tool usage is tracked in the response `usage` object:

```json lines theme={null}
{
  "usage": {
    "input_tokens": 105,
    "output_tokens": 250,
    "server_tool_use": {
      "web_search_requests": 2
    }
  }
}
```

## Next Steps

* [Web Search](/guides/features/server-tools/web-search) — Search the web for real-time information
* [Datetime](/guides/features/server-tools/datetime) — Get the current date and time
* [Image Generation](/guides/features/server-tools/image-generation) — Generate images from text prompts
* [Web Fetch](/guides/features/server-tools/web-fetch) — Fetch and extract content from URLs
* [Apply Patch](/guides/features/server-tools/apply-patch) — Propose file edits via V4A diffs
* [Shell](/guides/features/server-tools/shell) — Run commands in a hosted, sandboxed shell
* [Files](/guides/features/server-tools/files) — Read, write, edit, and list workspace files
* [Fusion](/guides/features/server-tools/fusion) — Run a panel of models and a judge for multi-model analysis
* [Advisor](/guides/features/server-tools/advisor) — Consult a stronger model for guidance mid-generation
* [Subagent](/guides/features/server-tools/subagent) — Delegate self-contained tasks to a smaller, faster worker model
* [Search Models](/guides/features/server-tools/search-models) — Search and filter the OpenRouter model catalog
* [Tool Calling](/guides/features/tool-calling) — Learn about user-defined tool calling
