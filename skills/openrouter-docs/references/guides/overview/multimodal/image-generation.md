> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Image Generation

OpenRouter provides a dedicated Image API for generating images from text prompts (and optional reference images). The API covers model discovery, per-endpoint capabilities, and generation. You can browse available models and pricing on the [models page filtered by image output](https://openrouter.ai/models?output_modalities=image).

## Model Discovery

### Via the Image Models API

The dedicated image models endpoint lists every available image model with its capabilities:

```bash
curl "https://openrouter.ai/api/v1/images/models"
```

Each entry in the `data` array includes:

```json
{
  "data": [
    {
      "id": "bytedance-seed/seedream-4.5",
      "name": "Seedream 4.5",
      "description": "A text-to-image model.",
      "created": 1692901234,
      "architecture": {
        "input_modalities": ["text", "image"],
        "output_modalities": ["image"]
      },
      "supported_parameters": {
        "resolution": { "type": "enum", "values": ["1K", "2K", "4K"] },
        "seed": { "type": "boolean" }
      },
      "supports_streaming": false,
      "endpoints": "/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints"
    }
  ]
}
```

| Field                  | Description                                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | Model slug to use in generation requests                                                                                                      |
| `architecture`         | Input and output modalities the model accepts                                                                                                 |
| `supported_parameters` | Union of capabilities across all endpoints. Each key is a request field name; the value is a [capability descriptor](#capability-descriptors) |
| `supports_streaming`   | Whether any endpoint supports native SSE streaming (`stream: true`)                                                                           |
| `endpoints`            | URL to the full per-endpoint records for this model                                                                                           |

### Per-Endpoint Records

Each model may be served by multiple providers. To see the definitive capabilities, pricing, and passthrough options per endpoint:

```bash
curl "https://openrouter.ai/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints"
```

```json
{
  "id": "bytedance-seed/seedream-4.5",
  "endpoints": [
    {
      "provider_name": "Bytedance",
      "provider_slug": "bytedance",
      "provider_tag": "bytedance",
      "supported_parameters": {
        "resolution": { "type": "enum", "values": ["1K", "2K", "4K"] },
        "seed": { "type": "boolean" }
      },
      "allowed_passthrough_parameters": [],
      "supports_streaming": false,
      "pricing": [
        { "billable": "output_image", "unit": "image", "cost_usd": 0.05 }
      ]
    }
  ]
}
```

| Field                            | Description                                                                                                                                                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `provider_slug`                  | Use in `provider.options[slug]` to pass provider-specific parameters                                                                                                                                                                                               |
| `provider_tag`                   | Use to pin requests to a specific provider. `null` when provider-level routing is unavailable                                                                                                                                                                      |
| `supported_parameters`           | The definitive set of parameters *this* endpoint accepts (a subset of the model-level union)                                                                                                                                                                       |
| `allowed_passthrough_parameters` | Provider-specific keys accepted under `provider.options[provider_slug]`                                                                                                                                                                                            |
| `supports_streaming`             | Whether *this* endpoint supports native SSE streaming                                                                                                                                                                                                              |
| `pricing`                        | Billable pricing lines for this endpoint. Each entry has `billable` (e.g. `output_image`, `input_image`, `input_reference`), `unit` (`image`, `megapixel`, or `token`), `cost_usd`, and an optional `variant` tier (e.g. `2k`, `4k` for resolution-tiered pricing) |

### Capability Descriptors

The `supported_parameters` map uses typed descriptors to describe what each request field accepts:

| Type      | Shape                                          | Meaning                                      |
| --------- | ---------------------------------------------- | -------------------------------------------- |
| `enum`    | `{ type: "enum", values: ["1K", "2K", "4K"] }` | Discrete allowlist of accepted string values |
| `range`   | `{ type: "range", min: 0, max: 100 }`          | Any integer in `[min, max]` is valid         |
| `boolean` | `{ type: "boolean" }`                          | Supported (present) or unsupported (absent)  |

An absent key means the parameter is unsupported by that endpoint.

### Via the Models API

You can also discover image models through the general [Models API](/docs/api-reference/models/get-models):

```bash
curl "https://openrouter.ai/api/v1/models?output_modalities=image"
```

### On the Models Page

Visit the [Models page](/models) and filter by output modalities to find models with image generation capabilities.

## API Usage

Send a `POST` request to `/api/v1/images` with the model and prompt:

```python title="Python (requests)"
import requests
import json

url = "https://openrouter.ai/api/v1/images"
headers = {
    "Authorization": f"Bearer {API_KEY_REF}",
    "Content-Type": "application/json"
}

payload = {
    "model": "{{MODEL}}",
    "prompt": "a red panda astronaut floating in space, studio lighting"
}

response = requests.post(url, headers=headers, json=payload)
result = response.json()

for image in result["data"]:
    # image["b64_json"] contains the base64-encoded image
    print(f"Generated image ({len(image['b64_json'])} chars)")
```

```typescript title="TypeScript (fetch)"
const response = await fetch('https://openrouter.ai/api/v1/images', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_KEY_REF}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: '{{MODEL}}',
    prompt: 'a red panda astronaut floating in space, studio lighting',
  }),
});

const result = await response.json();

for (const image of result.data) {
  // image.b64_json contains the base64-encoded image
  console.log(`Generated image (${image.b64_json.length} chars)`);
}
```

```bash title="cURL"
curl -X POST "https://openrouter.ai/api/v1/images" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "{{MODEL}}",
    "prompt": "a red panda astronaut floating in space, studio lighting"
  }'
```

### Response Format

Images are returned as base64-encoded bytes. The `usage` field reports token counts and cost when available.

For raster PNG outputs (most models), `media_type` is omitted:

```json
{
  "created": 1748372400,
  "data": [
    {
      "b64_json": "<base64-encoded-image>"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 4175,
    "total_tokens": 4175,
    "cost": 0.04
  }
}
```

For vector outputs (e.g., SVG from Recraft vector models), the `media_type` field is included:

```json
{
  "created": 1748372400,
  "data": [
    {
      "b64_json": "<base64-encoded-image>",
      "media_type": "image/svg+xml"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 4175,
    "total_tokens": 4175,
    "cost": 0.04
  }
}
```

## Image Configuration Options

### Resolution and Aspect Ratio

Control output dimensions with `resolution`, `aspect_ratio`, or the convenience `size` shorthand:

```json
{
  "model": "bytedance-seed/seedream-4.5",
  "prompt": "a landscape photo",
  "resolution": "2K",
  "aspect_ratio": "16:9"
}
```

* `resolution` — normalized tier (`512`, `1K`, `2K`, `4K`). Concrete pixel dimensions are derived per-provider.
* `aspect_ratio` — normalized ratio. Pass `auto` to let the provider choose. Common values include `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `3:2`, `2:3`, `4:5`, `5:4`, and extended ratios like `1:2`, `2:1`, `1:4`, `4:1`, `1:8`, `8:1`, `9:21`, `21:9`. Providers clamp to their supported subset — check the model's `supported_parameters` for accepted values.
* `size` — convenience shorthand. Pass a tier (`"2K"`) or explicit pixels (`"2048x2048"`) and it gets normalized for the provider. Interchangeable with `resolution` + `aspect_ratio`; conflicting values are rejected.

Check the model's `supported_parameters` to see which values each endpoint accepts.

### Quality and Output Format

```json
{
  "model": "openai/gpt-image-1",
  "prompt": "a product photo",
  "quality": "high",
  "output_format": "png",
  "background": "transparent"
}
```

* `quality` — `auto`, `low`, `medium`, or `high`. Providers without a quality knob ignore this.
* `output_format` — `png`, `jpeg`, or `webp`.
* `background` — `auto`, `transparent`, or `opaque`. `transparent` requires an alpha-capable format (png or webp).
* `output_compression` — 0–100 for webp/jpeg. Ignored for png.

### Multiple Images

Request up to 10 images per call with `n`:

```json
{
  "model": "openai/gpt-image-1",
  "prompt": "a cute cat",
  "n": 4
}
```

Not all providers support `n > 1`. Check the model's `supported_parameters` for availability.

### Image-to-Image (Reference Images)

Pass reference images to guide generation via `input_references`:

```json
{
  "model": "openai/gpt-image-1",
  "prompt": "make this scene look like a watercolor painting",
  "input_references": [
    {
      "type": "image_url",
      "image_url": {
        "url": "https://example.com/photo.jpg"
      }
    }
  ]
}
```

Reference images can be HTTP(S) URLs or base64 data URLs. The number of references accepted varies by provider.

### Provider-Specific Options

Pass provider-specific parameters through `provider.options`, keyed by the provider slug from the endpoints API:

```json
{
  "model": "black-forest-labs/flux.2-pro",
  "prompt": "a dramatic portrait",
  "provider": {
    "options": {
      "black-forest-labs": {
        "steps": 40,
        "guidance": 3
      }
    }
  }
}
```

The `allowed_passthrough_parameters` field in each endpoint record lists which keys are accepted.

## Streaming Image Generation

Models that support native SSE streaming (`supports_streaming: true` in the discovery API) can return partial images as they're generated:

```json
{
  "model": "openai/gpt-image-1",
  "prompt": "a detailed landscape",
  "stream": true
}
```

The response is an SSE stream with three event types:

**Partial image** — emitted as each partial render becomes available:

```
data: {"type":"image_generation.partial_image","partial_image_index":0,"b64_json":"<base64>"}
```

**Completed** — emitted when the final image is ready. For raster PNG outputs, `media_type` is omitted:

```
data: {"type":"image_generation.completed","b64_json":"<base64>","created":1748372400,"usage":{"prompt_tokens":16,"completion_tokens":272,"total_tokens":288,"cost":0.011}}
```

For vector outputs (e.g., SVG from Recraft vector models), `media_type` is included:

```
data: {"type":"image_generation.completed","b64_json":"<base64>","media_type":"image/svg+xml","created":1748372400,"usage":{"prompt_tokens":16,"completion_tokens":272,"total_tokens":288,"cost":0.011}}
```

The `usage` object in the completed event includes `cost` (USD), matching the buffered response shape.

**Error** — emitted if generation fails mid-stream:

```
data: {"type":"error","error":{"message":"Generation failed","code":"server_error"}}
```

The stream terminates with `data: [DONE]`.

```python title="Python (requests)"
import requests

url = "https://openrouter.ai/api/v1/images"
headers = {
    "Authorization": f"Bearer {API_KEY_REF}",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers, json={
    "model": "openai/gpt-image-1",
    "prompt": "a detailed landscape painting",
    "stream": True
}, stream=True)

for line in response.iter_lines():
    if line:
        decoded = line.decode("utf-8")
        if decoded.startswith("data: ") and decoded != "data: [DONE]":
            import json
            event = json.loads(decoded[6:])
            print(f"Event: {event['type']}")
```

```typescript title="TypeScript (fetch)"
const response = await fetch('https://openrouter.ai/api/v1/images', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_KEY_REF}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'openai/gpt-image-1',
    prompt: 'a detailed landscape painting',
    stream: true,
  }),
});

const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  for (const line of chunk.split('\n')) {
    if (line.startsWith('data: ') && line !== 'data: [DONE]') {
      const event = JSON.parse(line.slice(6));
      console.log(`Event: ${event.type}`);
    }
  }
}
```

```bash title="cURL"
curl -N -X POST "https://openrouter.ai/api/v1/images" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-image-1",
    "prompt": "a detailed landscape painting",
    "stream": true
  }'
```

## Request Parameters

| Parameter            | Type    | Required | Description                                                            |
| -------------------- | ------- | -------- | ---------------------------------------------------------------------- |
| `model`              | string  | Yes      | Model slug (e.g. `bytedance-seed/seedream-4.5`)                        |
| `prompt`             | string  | Yes      | Text description of the desired image                                  |
| `n`                  | integer | No       | Number of images to generate (1–10)                                    |
| `resolution`         | string  | No       | Resolution tier (`512`, `1K`, `2K`, `4K`)                              |
| `aspect_ratio`       | string  | No       | Aspect ratio (`1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `1:4`, `4:1`, etc.) |
| `size`               | string  | No       | Convenience shorthand — a tier or explicit pixels (`"2048x2048"`)      |
| `quality`            | string  | No       | `auto`, `low`, `medium`, or `high`                                     |
| `output_format`      | string  | No       | `png`, `jpeg`, or `webp`                                               |
| `background`         | string  | No       | `auto`, `transparent`, or `opaque`                                     |
| `output_compression` | integer | No       | Compression level (0–100) for webp/jpeg                                |
| `seed`               | integer | No       | Seed for deterministic generation (where supported)                    |
| `stream`             | boolean | No       | Stream partial images via SSE                                          |
| `input_references`   | array   | No       | Reference images for image-to-image generation                         |
| `provider.options`   | object  | No       | Provider-specific parameters keyed by provider slug                    |

Use the [Image Models API](#via-the-image-models-api) to check which parameters each model and endpoint supports.