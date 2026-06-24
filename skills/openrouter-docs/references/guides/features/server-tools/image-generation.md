> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Image Generation

Server tools are currently in beta. The API and behavior may change.

The `openrouter:image_generation` server tool enables any model to generate images from text prompts. When the model determines it needs to create an image, it calls the tool with a description. OpenRouter executes the image generation and returns the result to the model.

## How It Works

1. You include `{ "type": "openrouter:image_generation" }` in your `tools` array.
2. Based on the user's request, the model decides whether image generation is needed and crafts a prompt.
3. OpenRouter generates the image using the configured model (defaults to `openai/gpt-5-image`).
4. The generated image URL is returned to the model.
5. The model incorporates the image into its response. It may generate multiple images in a single request if needed.

## Quick Start

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
        content: 'Create an image of a futuristic city at sunset'
      }
    ],
    tools: [
      { type: 'openrouter:image_generation' }
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
  },
  json={
    "model": "{{MODEL}}",
    "messages": [
      {
        "role": "user",
        "content": "Create an image of a futuristic city at sunset"
      }
    ],
    "tools": [
      {"type": "openrouter:image_generation"}
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
  -d '{
    "model": "{{MODEL}}",
    "messages": [
      {
        "role": "user",
        "content": "Create an image of a futuristic city at sunset"
      }
    ],
    "tools": [
      {"type": "openrouter:image_generation"}
    ]
  }'
```

## Configuration

The image generation tool accepts optional `parameters` to customize the output:

```json
{
  "type": "openrouter:image_generation",
  "parameters": {
    "model": "openai/gpt-5-image",
    "quality": "high",
    "aspect_ratio": "16:9",
    "size": "1024x1024",
    "background": "transparent",
    "output_format": "png"
  }
}
```

| Parameter            | Type   | Default              | Description                                                                                                              |
| -------------------- | ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `model`              | string | `openai/gpt-5-image` | Which image generation model to use. See [available image models](https://openrouter.ai/models?output_modalities=image). |
| `quality`            | string | —                    | Image quality level (model-dependent, e.g. `"low"`, `"medium"`, `"high"`)                                                |
| `size`               | string | —                    | Image dimensions (e.g. `"1024x1024"`, `"512x512"`)                                                                       |
| `aspect_ratio`       | string | —                    | Aspect ratio (e.g. `"16:9"`, `"1:1"`, `"4:3"`)                                                                           |
| `background`         | string | —                    | Background style (e.g. `"transparent"`, `"opaque"`)                                                                      |
| `output_format`      | string | —                    | Output format (e.g. `"png"`, `"jpeg"`, `"webp"`)                                                                         |
| `output_compression` | number | —                    | Compression level (0-100) for lossy formats                                                                              |
| `moderation`         | string | —                    | Content moderation level (e.g. `"auto"`, `"low"`)                                                                        |

All parameters except `model` are passed directly to the underlying image generation API. Available options depend on the specific model being used.

## Response

When the model calls the image generation tool, it receives a response like:

```json
{
  "status": "ok",
  "imageUrl": "https://..."
}
```

If generation fails, the response includes an error:

```json
{
  "status": "error",
  "error": "Generation failed due to content policy"
}
```

## Works with the Responses API

The image generation server tool also works with the Responses API:

```typescript title="TypeScript"
const response = await fetch('https://openrouter.ai/api/v1/responses', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer {{API_KEY_REF}}',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: '{{MODEL}}',
    input: 'Generate an image of a mountain landscape',
    tools: [
      {
        type: 'openrouter:image_generation',
        parameters: { quality: 'high' }
      }
    ]
  }),
});

const data = await response.json();
console.log(data);
```

```python title="Python"
import requests

response = requests.post(
  "https://openrouter.ai/api/v1/responses",
  headers={
    "Authorization": f"Bearer {{API_KEY_REF}}",
    "Content-Type": "application/json",
  },
  json={
    "model": "{{MODEL}}",
    "input": "Generate an image of a mountain landscape",
    "tools": [
      {
        "type": "openrouter:image_generation",
        "parameters": {"quality": "high"}
      }
    ]
  }
)

data = response.json()
print(data)
```

## Pricing

Image generation pricing depends on the underlying model used:

* **openai/gpt-5-image** (default): See [model page](https://openrouter.ai/openai/gpt-5-image)
* **openai/gpt-5-image-mini**: See [model page](https://openrouter.ai/openai/gpt-5-image-mini)
* **openai/gpt-5.4-image-2**: See [model page](https://openrouter.ai/openai/gpt-5.4-image-2)
* Other models: See the [image models list](https://openrouter.ai/models?output_modalities=image) on OpenRouter

The cost is in addition to standard LLM token costs for processing the request and response.

## Next Steps

* [Server Tools Overview](/docs/guides/features/server-tools) — Learn about server tools
* [Web Search](/docs/guides/features/server-tools/web-search) — Search the web for real-time information
* [Datetime](/docs/guides/features/server-tools/datetime) — Get the current date and time
* [Tool Calling](/docs/guides/features/tool-calling) — Learn about user-defined tool calling