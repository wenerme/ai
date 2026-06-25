> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Enhance Image Generation with Presets

**Goal:** Create a preset that wraps a text model around the `openrouter:image_generation` server tool. The text model rewrites vague user requests into detailed image prompts, then calls the tool. You get better images from a single API call.

**Outcome:** A reusable preset slug (`@preset/your-slug`) that any app can call like a model. The user sends "make a watermelon hippo," and the text model crafts a detailed visual description (materials, lighting, composition, style) before generating the image.

## Before you start

You need:

* An OpenRouter API key (for creating the preset and making requests)
* A decision on which text model orchestrates (rewrites prompts) and which image model generates

Use these references for exact schemas:

* [Presets feature](/docs/guides/features/presets)
* [Image generation server tool](/docs/guides/features/server-tools/image-generation)
* [Available image models](https://openrouter.ai/models?output_modalities=image)

Each request through this preset makes two model calls: one to the text model (for prompt refinement) and one to the image model (for generation). The text model call is cheap; the image generation cost depends on the image model you configure. Check pricing on the [image model's page](https://openrouter.ai/models?output_modalities=image) before routing production traffic.

## How the pattern works

A standard image generation call looks like this: your user says "make a watermelon hippo," and the image model gets exactly that. The result is decent but literal, because the image model has no creative direction.

The difference is visible. Here's the same concept, with and without prompt enhancement:

| Bare prompt: "make a watermelon hippo"                                                                                  | Preset-enhanced prompt                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Bare prompt result: generic watermelon-textured hippo on white background](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/e710fd0768c68c393e09654474dd011f771e754d45b1265e700cf4be75524e3a/content/assets/cookbook/bare-prompt-watermelon-hippo.png) | ![Enhanced prompt result: photorealistic watermelon hippo sculpture standing in a river at golden hour](https://files.buildwithfern.com/openrouter.docs.buildwithfern.com/docs/c053f19a62dd1b99614031907a10efbcb2a11135c2b7bf32f48c0a861c4d1d51/content/assets/cookbook/enhanced-prompt-watermelon-hippo.png) |

The bare prompt produces a literal interpretation. The preset's orchestrator expands it into a detailed scene with materials, lighting, and environment before the image model touches it.

The preset pattern inserts a text model as an orchestrator:

1. User sends "make a watermelon hippo" to `@preset/your-slug`
2. The text model (guided by your system prompt) rewrites it into something like: "A photorealistic hippopotamus sculpted entirely from watermelon rind and flesh, dark green outer rind with lighter stripes forming the body, exposed sections revealing vibrant pink-red watermelon flesh, black seeds dotting the surface like natural skin texture, standing in a shallow river at golden hour, warm sunlight catching water droplets on the glossy rind"
3. The text model calls `openrouter:image_generation` with the enhanced prompt
4. OpenRouter generates the image and returns the URL to the text model
5. The text model responds with the image and (optionally) explains what it created

The text model handles the creative interpretation. The image model handles the rendering. Each does what it's best at.

## Step 1: Create the preset via API

The fastest way to create the preset is to POST a request body to the preset creation endpoint. This captures the model, system prompt, tools, and parameters in one call:

```bash
curl https://openrouter.ai/api/v1/presets/image-enhancer/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-4.8",
    "messages": [
      {
        "role": "system",
        "content": "You are an expert visual prompt engineer. When the user asks you to create an image, analyze their request and expand it into a detailed image generation prompt. Cover: subject and action, composition and framing, lighting and atmosphere, color palette, artistic style or medium, and mood. Then call the image generation tool with your enhanced prompt. Keep explanations brief; prioritize the image."
      }
    ],
    "tools": [
      {
        "type": "openrouter:image_generation",
        "parameters": {
          "model": "google/gemini-3.1-flash-image"
        }
      }
    ],
    "tool_choice": "required",
    "temperature": 0.7
  }'
```

The response confirms your preset was created:

```json
{
  "data": {
    "id": "650e8400-e29b-41d4-a716-446655440001",
    "creator_user_id": "user_2dHFtVWx...",
    "name": "image-enhancer",
    "slug": "image-enhancer",
    "status": "active",
    "designated_version": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "preset_id": "650e8400-e29b-41d4-a716-446655440001",
      "version": 1,
      "system_prompt": "You are an expert visual prompt engineer...",
      "config": {
        "model": "anthropic/claude-opus-4.8",
        "tools": [
          {
            "type": "openrouter:image_generation",
            "parameters": { "model": "google/gemini-3.1-flash-image" }
          }
        ],
        "tool_choice": "required",
        "temperature": 0.7
      },
      "created_at": "2026-06-24T12:00:00Z"
    }
  }
}
```

The response shown above is abbreviated. The full response includes additional fields like `workspace_id`, `description`, and timestamps. See the [Presets API reference](/docs/sdks/typescript/api-reference/presets) for the complete schema.

You can also create or edit presets from the [Presets dashboard](https://openrouter.ai/settings/presets), which has a visual server tools editor.

## Step 2: Use the preset

Send requests to your preset slug as if it were a model:

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "@preset/image-enhancer",
    "messages": [
      {
        "role": "user",
        "content": "A cozy bookshop on a rainy evening"
      }
    ]
  }'
```

The text model receives your message, crafts a detailed prompt, calls the image generation tool, and returns the result. Your application code doesn't know or care about the orchestration happening inside.

## What comes back

The response looks like a normal chat completion. The text model's message contains the generated image URL (typically as a markdown image or inline URL) plus any commentary it added:

```json
{
  "id": "gen-...",
  "model": "anthropic/claude-opus-4.8",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Here's your cozy bookshop scene:\n\n![Generated image](https://images.openrouter.ai/...)\n\nI interpreted your request as a warm, inviting independent bookstore viewed through a rain-streaked window, with golden light spilling onto wet cobblestones."
      }
    }
  ]
}
```

The image URL in the response is temporary. Download or cache it if you need it long-term.

## Customization

### Choosing the orchestrator model

The orchestrator rewrites prompts and decides when/how to call the tool. Good picks:

| Priority         | Model                       | Why                                                    |
| ---------------- | --------------------------- | ------------------------------------------------------ |
| Speed + cost     | `openai/gpt-4.1-mini`       | Fast, cheap, good at instruction following             |
| Creative quality | `anthropic/claude-sonnet-4` | Strong at nuanced creative interpretation              |
| Maximum quality  | `anthropic/claude-opus-4.8` | Best creative reasoning in the Opus family, 1M context |

The orchestrator cost is typically small (a few hundred tokens of prompt rewriting). The image generation cost dominates.

### Choosing the image model

Configure the image model in the tool's `parameters.model` field. [`google/gemini-3.1-flash-image`](https://openrouter.ai/google/gemini-3.1-flash-image) (Nano Banana 2) is a strong default: fast, cheap (\$0.50/M input), and high quality. See [available image models](https://openrouter.ai/models?output_modalities=image) for all current options and pricing.

### Tuning the system prompt

The system prompt controls how aggressively the orchestrator rewrites. Some patterns:

* **Faithful expansion**: "Expand the user's request with visual detail while preserving their stated intent. Don't override their style choices."
* **Brand-consistent**: "All images should use our brand palette (navy #1a1a2e, gold #e6b800, cream #faf0e6). Apply a clean, modern illustration style."
* **Domain-specific**: "You are generating product photography prompts. Focus on lighting setup, background material, camera angle, and product placement."

### Image tool parameters

The tool's `parameters` object accepts `model` plus all `image_config` fields (quality, aspect\_ratio, size, background, output\_format, output\_compression, moderation). See the [image generation server tool reference](/docs/guides/features/server-tools/image-generation) for the full list and model-specific defaults.

### Using different image models for different scenarios

The image model is fixed per preset (the orchestrator can't switch it mid-request). Create separate presets for different quality tiers and let your application pick the right one.

## Updating the preset without redeploying

One of the key benefits: change the image model, tune the system prompt, or adjust parameters from the [Presets dashboard](https://openrouter.ai/settings/presets) or via the API. No code deploy needed. Your application keeps calling `@preset/image-enhancer` and picks up the new config immediately.

To create a new version via API, POST to the same endpoint again with your updated config. The latest version becomes active automatically.

## Next steps

* Explore [available image models](https://openrouter.ai/models?output_modalities=image) and compare pricing, quality, and speed
* Read about [presets](/docs/guides/features/presets) for version management, team sharing, and the preset field merge behavior
* Use the [OpenRouter TypeScript SDK](/docs/sdks/typescript) or [Python SDK](/docs/sdks/python) for typed preset interactions in your app
* Add [web search](/docs/guides/features/server-tools/web-search) to the preset's tools so the orchestrator can reference current visual trends or specific art styles
* Track image generation costs with the [Analytics guide](/docs/cookbook/administration/analytics-cost-control) to monitor per-preset spend
* Handle multi-turn conversations where the user refines images iteratively (pass previous messages to the preset to maintain context)