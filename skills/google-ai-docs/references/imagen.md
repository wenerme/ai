> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Generate images using Imagen

{% callout type="warning" %}
  Imagen models are shut down. Use Nano Banana for image generation.

{% /callout %}

Imagen is Google's legacy image generation model. It is now shut down and no longer available in the Gemini API.

## Migrate to Nano Banana  {% id="migrate-to-nano-banana" %}

Migrate to Nano Banana for image generation:

- **Model name**: Use `gemini-2.5-flash-image` (or Nano Banana 2 models such as `gemini-3.1-flash-image`) instead of Imagen model names.
- **Method**: Use `client.models.generate_content` instead of
  `client.models.generate_images`.
- **Response handling**: Nano Banana returns content parts containing image data instead of a specific image response object.

See the [Image generation guide](/docs/image-generation) for details and examples.

