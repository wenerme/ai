> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Presets

[Presets](/settings/presets) allow you to separate your LLM configuration from your code. Create and manage presets through the OpenRouter web application to control provider routing, model selection, system prompts, and other parameters, then reference them in OpenRouter API requests.

## What are Presets?

Presets are named configurations that encapsulate all the settings needed for a specific use case. For example, you might create:

* An "email-copywriter" preset for generating marketing copy
* An "inbound-classifier" preset for categorizing customer inquiries
* A "code-reviewer" preset for analyzing pull requests

Each preset can manage:

* Provider routing preferences (sort by price, latency, etc.)
* Model selection (specific model or array of models with fallbacks)
* System prompts
* Generation parameters (temperature, top\_p, etc.)
* Provider inclusion/exclusion rules

## Quick Start

1. [Create a preset](/settings/presets). For example, select a model and restrict provider routing to just a few providers.
   ![Creating a new preset](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/97a7df1a610c25007f695f0390f51f942c4666b001b0d069b067b52a0b1aee2a/content/assets/preset-example.png "A new preset")

2. Make an API request to the preset:

```json
{
  "model": "@preset/ravenel-bridge",
  "messages": [
    {
      "role": "user",
      "content": "What's your opinion of the Golden Gate Bridge? Isn't it beautiful?"
    }
  ]
}
```

## Benefits

### Separation of Concerns

Presets help you maintain a clean separation between your application code and LLM configuration. This makes your code more semantic and easier to maintain.

### Rapid Iteration

Update your LLM configuration without deploying code changes:

* Switch to new model versions
* Adjust system prompts
* Modify parameters
* Change provider preferences

## Using Presets

There are three ways to use presets in your API requests.

1. **Direct Model Reference**

You can reference the preset as if it was a model by sending requests to `@preset/preset-slug`

```json
{
  "model": "@preset/email-copywriter",
  "messages": [
    {
      "role": "user",
      "content": "Write a marketing email about our new feature"
    }
  ]
}
```

2. **Preset Field**

```json
{
  "model": "openai/gpt-4",
  "preset": "email-copywriter",
  "messages": [
    {
      "role": "user",
      "content": "Write a marketing email about our new feature"
    }
  ]
}
```

3. **Combined Model and Preset**

```json
{
  "model": "openai/gpt-4@preset/email-copywriter",
  "messages": [
    {
      "role": "user",
      "content": "Write a marketing email about our new feature"
    }
  ]
}
```

## Creating Presets from API Requests

In addition to the dashboard, you can create (or update) a preset
directly from any inference request body you already use. This is
useful when you want to capture a known-good request as a reusable
configuration without re-typing it in the UI.

Each inference skin has its own endpoint. Send the same JSON body
you would send to the matching inference route — OpenRouter
persists only the fields that overlap with the preset config
(e.g. `model`, `temperature`, `provider`, `top_p`, `system`).
Transient fields like `messages`, `input`, `prompt`, and `stream`
are silently ignored.

The endpoints are:

* `POST /api/v1/presets/{slug}/chat/completions` — Chat Completions skin
* `POST /api/v1/presets/{slug}/messages` — Anthropic Messages skin
* `POST /api/v1/presets/{slug}/responses` — Responses skin

The `{slug}` path parameter is a URL-safe identifier for the
preset. If a preset with that slug already exists in your
workspace, a new version is created and designated as the active
version. If it does not exist, a new preset is created.

### From a Chat Completions request

Reuse the exact body you would `POST /api/v1/chat/completions`:

```bash
curl https://openrouter.ai/api/v1/presets/email-copywriter/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o",
    "temperature": 0.7,
    "provider": { "sort": "price" },
    "messages": [
      { "role": "system", "content": "You are a helpful assistant." },
      { "role": "user", "content": "Write a marketing email." }
    ]
  }'
```

The `messages` array is ignored for preset storage; only the
configuration fields (`model`, `temperature`, `provider`) and the
extracted system prompt are persisted.

### From an Anthropic Messages request

```bash
curl https://openrouter.ai/api/v1/presets/code-reviewer/messages \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-4.6-sonnet",
    "max_tokens": 1024,
    "system": "You are a senior code reviewer.",
    "messages": [
      { "role": "user", "content": "Review this PR." }
    ]
  }'
```

The top-level `system` field becomes the preset's system prompt.

### From a Responses request

```bash
curl https://openrouter.ai/api/v1/presets/inbound-classifier/responses \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o",
    "instructions": "Classify the inbound message.",
    "input": "Hello, I need a refund."
  }'
```

The `instructions` field becomes the preset's system prompt.

### Response shape

All three endpoints return the resulting preset with its
designated version:

```json
{
  "data": {
    "id": "650e8400-e29b-41d4-a716-446655440001",
    "name": "email-copywriter",
    "slug": "email-copywriter",
    "status": "active",
    "designated_version_id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-04-20T10:00:00Z",
    "updated_at": "2026-04-20T10:00:00Z",
    "designated_version": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "version": 1,
      "system_prompt": "You are a helpful assistant.",
      "config": {
        "model": "openai/gpt-4o",
        "temperature": 0.7,
        "provider": { "sort": "price" }
      },
      "created_at": "2026-04-20T10:00:00Z",
      "updated_at": "2026-04-20T10:00:00Z"
    }
  }
}
```

Once created, the preset can be used in subsequent inference
requests via any of the three referencing styles shown in
[Using Presets](#using-presets).

### Suggested workflow

1. Build and test a request against `/chat/completions` (or
   `/messages` / `/responses`) until it produces the output you
   want.
2. `POST` the same body to the matching
   `/api/v1/presets/{slug}/...` endpoint to capture the config.
3. In production code, swap the inference call to reference
   `@preset/{slug}` instead of repeating the configuration.

This lets you iterate on prompts and parameters in code, then
promote the working configuration to a preset without manual
transcription.

## Other Notes

1. If you're using an organization account, all members can access organization presets. This is a great way to share best practices across teams.
2. Version history is kept in order to understand changes that were made, and to be able to roll back. However when addressing a preset through the API, the latest version is always used.
3. If you provide parameters in the request, they will be shallow-merged with the options configured in the preset.