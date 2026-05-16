> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Latest Model Resolution

`~author/family-latest` slugs always resolve to the newest concrete model in a given family, so you can ship code against a stable alias and pick up new releases without redeploying.

## Overview

When a model author ships a new version (for example Anthropic releasing `claude-opus-4.7`), OpenRouter automatically starts routing `~anthropic/claude-opus-latest` to it. Older code calling the alias keeps working — it just runs on the newest version.

This is ideal for:

* **Product teams** who want to always use the best-in-class model from a specific author without monitoring release notes.
* **Internal tools and prototypes** where you care about "latest Claude Opus" more than a specific version pinned for reproducibility.
* **Rolling migrations** where you want to defer version pinning until after a release has stabilised.

## Usage

Send a chat completion request with a `~author/family-latest` slug as the model:

```typescript title="TypeScript SDK"
import { OpenRouter } from '@openrouter/sdk';

const openRouter = new OpenRouter({
  apiKey: '<OPENROUTER_API_KEY>',
});

const completion = await openRouter.chat.send({
  model: '~anthropic/claude-opus-latest',
  messages: [
    {
      role: 'user',
      content: 'Summarize this in one sentence: ...',
    },
  ],
});

console.log(completion.choices[0].message.content);
// The `model` field reflects the concrete version that served the request.
console.log('Resolved to:', completion.model);
```

```typescript title="TypeScript (fetch)"
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <OPENROUTER_API_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: '~anthropic/claude-opus-latest',
    messages: [
      {
        role: 'user',
        content: 'Summarize this in one sentence: ...',
      },
    ],
  }),
});

const data = await response.json();
console.log('Resolved to:', data.model);
```

```python title="Python"
import requests
import json

response = requests.post(
  url="https://openrouter.ai/api/v1/chat/completions",
  headers={
    "Authorization": "Bearer <OPENROUTER_API_KEY>",
    "Content-Type": "application/json",
  },
  data=json.dumps({
    "model": "~anthropic/claude-opus-latest",
    "messages": [
      {
        "role": "user",
        "content": "Summarize this in one sentence: ..."
      }
    ]
  })
)

data = response.json()
print('Resolved to:', data['model'])
```

```bash title="cURL"
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "~anthropic/claude-opus-latest",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Response

The response's `model` field reflects the concrete model that actually served the request, not the alias you sent. This makes it trivial to log or alert on version rollovers:

```json
{
  "id": "gen-...",
  "model": "anthropic/claude-opus-4.7",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "..."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 85,
    "total_tokens": 97
  }
}
```

## How It Works

Each `~author/family-latest` slug is mapped to a model family on OpenRouter. When a request comes in:

1. **Slug recognition**: OpenRouter sees the `~` prefix and identifies which family the alias points to (for example `~anthropic/claude-opus-latest` → the Claude Opus family).
2. **Target selection**: The newest visible model in that family is selected. When a new version ships, it takes over automatically, with no client changes required.
3. **Request forwarding**: Your request is forwarded to the resolved model and routed across providers exactly as if you'd called that concrete slug directly.
4. **Transparent reporting**: The response's `model` field reports the concrete model that served the request (for example `anthropic/claude-opus-4.7`), so you can always tell which version answered any given call.

If a family has no eligible model available, the request returns an error rather than silently falling back to something unrelated.

## Pricing and Capabilities

`~author/family-latest` rows on the [models page](https://openrouter.ai/models) and in `/api/v1/models` responses report the pricing, context length, modalities, and supported parameters of the target they currently resolve to — not a frozen snapshot. This way:

* Clients that list models for their users see accurate per-token prices.
* Capability-gated flows (for example "only offer this model for vision requests") see up-to-date modalities.
* Cost dashboards reflect the real rate charged, because requests are billed at the concrete model's price.

When a new model is promoted to "latest", these fields update automatically.

## Use Cases

* **Always-on assistants**: Point user-facing agents at `~anthropic/claude-sonnet-latest` and get new releases for free.
* **Evaluation harnesses**: Benchmark "the latest" model per author without editing configs.
* **Enterprise pilots**: Share a slug with a partner and upgrade them in place when a newer model ships.

## Limitations

* **Versions can change at any time**: When a newer model is rolled in as the latest target, subsequent requests resolve to it. If your application requires a fixed version for reproducibility (for example in regression tests), use the concrete model slug instead.
* **Only `latest`**: The router always resolves to the newest eligible model. There is no built-in way to pin to "second newest" or to roll back through the alias — to downgrade, switch to a concrete slug.
* **Aliases and hidden models are excluded**: The router never resolves to another alias slug or to models that have been hidden.

## Pinning to a Specific Version

When you need reproducibility, bypass latest resolution by calling the concrete model slug directly:

```json
{
  "model": "anthropic/claude-opus-4.7"
}
```

You can see the exact slug your last request resolved to in the response's `model` field (see above) or in the activity log for the request.

## Related

* [Auto Router](/docs/guides/routing/routers/auto-router) - Cross-model intelligent selection (paid models)
* [Free Models Router](/docs/guides/routing/routers/free-router) - Route to available free models
* [Model Variants](/docs/guides/routing/model-variants) - `:free`, `:nitro`, `:thinking`, and other suffixes
* [API Reference: Chat Completions](/docs/api-reference/chat/create-chat-completion)