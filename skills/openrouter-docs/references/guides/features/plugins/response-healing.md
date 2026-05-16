> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Response Healing

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

```text
{"name": "Alice", "age": 30
```

**Output:** Fixed

```json
{"name": "Alice", "age": 30}
```

### Markdown Code Blocks

**Input:** Wrapped in markdown

````text
```json
{"name": "Bob"}
```
````

**Output:** Extracted

```json
{"name": "Bob"}
```

### Mixed Text and JSON

**Input:** Text before JSON

```text
Here's the data you requested:
{"name": "Charlie", "age": 25}
```

**Output:** Extracted

```json
{"name": "Charlie", "age": 25}
```

### Trailing Commas

**Input:** Invalid trailing comma

```text
{"name": "David", "age": 35,}
```

**Output:** Fixed

```json
{"name": "David", "age": 35}
```

### Unquoted Keys

**Input:** JavaScript-style

```text
{name: "Eve", age: 40}
```

**Output:** Fixed

```json
{"name": "Eve", "age": 40}
```

## Complete Example

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

```python title="Python"
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

## Limitations

Response Healing only applies to non-streaming requests.

Some malformed JSON responses may still be unrepairable. In particular, if the response is truncated by `max_tokens`, the plugin will not be able to repair it.