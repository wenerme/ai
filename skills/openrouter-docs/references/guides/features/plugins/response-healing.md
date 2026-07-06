> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Response Healing

> Automatically fix malformed JSON responses

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

The Response Healing plugin automatically validates and repairs malformed JSON responses from AI models. When models return imperfect formatting – missing brackets, trailing commas, markdown wrappers, or mixed text – this plugin attempts to repair the response so you receive valid, parseable JSON.

## Overview

Response Healing provides:

* **Automatic JSON repair**: Fixes missing brackets, commas, quotes, and other syntax errors
* **Markdown extraction**: Extracts JSON from markdown code blocks

## How It Works

The plugin activates for non-streaming requests when you use `response_format` with either `type: "json_schema"` or `type: "json_object"`, and include the response-healing plugin in your `plugins` array. See the [Complete Example](#complete-example) below for a full implementation.

## What Gets Fixed

The Response Healing plugin handles common issues in LLM responses:

### JSON Syntax Errors

**Input:** Missing closing bracket

```text lines theme={null}
{"name": "Alice", "age": 30
```

**Output:** Fixed

```json lines theme={null}
{"name": "Alice", "age": 30}
```

### Markdown Code Blocks

**Input:** Wrapped in markdown

````text lines theme={null}
```json
{"name": "Bob"}
```
````

**Output:** Extracted

```json lines theme={null}
{"name": "Bob"}
```

### Mixed Text and JSON

**Input:** Text before JSON

```text lines theme={null}
Here's the data you requested:
{"name": "Charlie", "age": 25}
```

**Output:** Extracted

```json lines theme={null}
{"name": "Charlie", "age": 25}
```

### Trailing Commas

**Input:** Invalid trailing comma

```text lines theme={null}
{"name": "David", "age": 35,}
```

**Output:** Fixed

```json lines theme={null}
{"name": "David", "age": 35}
```

### Unquoted Keys

**Input:** JavaScript-style

```text lines theme={null}
{name: "Eve", age: 40}
```

**Output:** Fixed

```json lines theme={null}
{"name": "Eve", "age": 40}
```

## Complete Example

<Template
  data={{
API_KEY_REF,
MODEL: 'google/gemini-2.5-flash'
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
            content: 'Generate a product listing with name, price, and description'
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'Product',
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Product name'
                },
                price: {
                  type: 'number',
                  description: 'Price in USD'
                },
                description: {
                  type: 'string',
                  description: 'Product description'
                }
              },
              required: ['name', 'price']
            }
          }
        },
        plugins: [
          { id: 'response-healing' }
        ]
      }),
    });

    const data = await response.json();
    const product = JSON.parse(data.choices[0].message.content);
    // The plugin attempts to repair malformed JSON syntax
    console.log(product.name, product.price);
    ```

    ```python title="Python" expandable lines theme={null}
    import requests
    import json

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
            "content": "Generate a product listing with name, price, and description"
          }
        ],
        "response_format": {
          "type": "json_schema",
          "json_schema": {
            "name": "Product",
            "schema": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Product name"
                },
                "price": {
                  "type": "number",
                  "description": "Price in USD"
                },
                "description": {
                  "type": "string",
                  "description": "Product description"
                }
              },
              "required": ["name", "price"]
            }
          }
        },
        "plugins": [
          {"id": "response-healing"}
        ]
      }
    )

    data = response.json()
    product = json.loads(data["choices"][0]["message"]["content"])
    # The plugin attempts to repair malformed JSON syntax
    print(product["name"], product["price"])
    ```
  </CodeGroup>
</Template>

## Limitations

<Warning>
  **Non-Streaming Requests Only**

  Response Healing only applies to non-streaming requests.
</Warning>

<Warning>
  **Will not repair all JSON**

  Some malformed JSON responses may still be unrepairable. In particular, if the response is truncated by `max_tokens`, the plugin will not be able to repair it.
</Warning>
