> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Search Models

> Let any model search the OpenRouter model catalog

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

  Server tools are currently in beta. The API and behavior may change. This tool is experimental — when it graduates, the tool type is likely to be renamed (dropping the `experimental__` prefix), which would be a breaking change for requests using the current name.
</Note>

The `openrouter:experimental__search_models` server tool lets a model search and filter the OpenRouter model catalog. The model can look up models by name, capabilities, modalities, and other attributes — useful for agents that pick models dynamically, for example with the [Subagent](/guides/features/server-tools/subagent) tool.

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
      },
      body: JSON.stringify({
        model: '{{MODEL}}',
        messages: [
          {
            role: 'user',
            content: 'Which models on OpenRouter can take image input and have at least 128k context?'
          }
        ],
        tools: [
          { type: 'openrouter:experimental__search_models' }
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
            "content": "Which models on OpenRouter can take image input and have at least 128k context?"
          }
        ],
        "tools": [
          {"type": "openrouter:experimental__search_models"}
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
            "content": "Which models on OpenRouter can take image input and have at least 128k context?"
          }
        ],
        "tools": [
          {"type": "openrouter:experimental__search_models"}
        ]
      }'
    ```
  </CodeGroup>
</Template>

## Configuration

The search models tool accepts an optional `max_results` parameter:

```json lines theme={null}
{
  "type": "openrouter:experimental__search_models",
  "parameters": {
    "max_results": 5
  }
}
```

| Parameter     | Type    | Default | Description                                                   |
| ------------- | ------- | ------- | ------------------------------------------------------------- |
| `max_results` | integer | `5`     | Maximum number of models to return per call. Between 1 and 20 |

### Call Arguments

The model generates the search arguments. All fields are optional — an empty call browses the full catalog:

| Field                | Type      | Description                                                                                                                               |
| -------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `query`              | string    | Free-text search matched against model names, slugs, and descriptions                                                                     |
| `input_modalities`   | string\[] | Filter by supported input modalities (`text`, `image`, `file`, `audio`, `video`). Returns models that support ALL specified modalities    |
| `output_modalities`  | string\[] | Filter by supported output modalities (e.g. `text`, `image`, `embeddings`, `audio`). Returns models that support ALL specified modalities |
| `min_context_length` | integer   | Minimum context length in tokens                                                                                                          |
| `series`             | string    | Filter by model series/family group (e.g. `Claude`, `GPT`, `Gemini`)                                                                      |

## Response

The tool returns matching models with their key attributes:

```json lines theme={null}
{
  "models": [
    {
      "id": "anthropic/claude-sonnet-4.5",
      "name": "Anthropic: Claude Sonnet 4.5",
      "description": "...",
      "context_length": 1000000,
      "input_modalities": ["text", "image", "file"],
      "output_modalities": ["text"],
      "series": "Claude"
    }
  ],
  "total_results": 12,
  "showing": 1
}
```

`total_results` is the number of models that matched the filters; `showing` is how many were returned after applying `max_results`.

## Pricing

There is currently no separate charge for the search models tool; you pay only for standard token usage.

## Next Steps

* [Server Tools Overview](/guides/features/server-tools) — Learn about server tools
* [Subagent](/guides/features/server-tools/subagent) — Delegate tasks to a worker model
* [Models](/guides/overview/models) — Learn about the OpenRouter model catalog
