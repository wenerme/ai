# Image Generation Models

> Last verified: 2026-07-16. This is a manual snapshot. Hosted model IDs, per-image prices, deprecations, and downloadable-weight licenses change independently.

## Hosted APIs

### OpenAI GPT Image

| Lifecycle | Exact API ID | Capability | Pricing note |
| --- | --- | --- | --- |
| Current recommended | `gpt-image-2`; snapshot `gpt-image-2-2026-04-21` | Text/image input, image generation and editing; arbitrary dimensions within documented pixel/ratio constraints | Use OpenAI's current image cost calculator; this audit did not preserve an incomplete static table |
| Deprecated; shutdown 2026-12-01 | `gpt-image-1.5`; snapshot `gpt-image-1.5-2025-12-16` | Generation/editing | Per-image price varies by size/quality |
| Deprecated; shutdown 2026-10-23 | `gpt-image-1` | Generation/editing | Per-image price varies by size/quality |
| Deprecated; shutdown 2026-12-01 | `gpt-image-1-mini` | Lower-cost generation/editing | Per-image price varies by size/quality |
| Shut down 2026-05-12 | `dall-e-2`, `dall-e-3` | Historical image generation | Not callable |

Official sources: <https://developers.openai.com/api/docs/guides/image-generation>, <https://developers.openai.com/api/docs/models/gpt-image-2>, <https://developers.openai.com/api/docs/deprecations>.

### Google Gemini Image And Imagen

| Lifecycle | Exact API ID | Context / output | Standard pricing |
| --- | --- | ---: | --- |
| Stable | `gemini-3.1-flash-image` | 131,072 / 32,768 | Text/image input $0.50/MTok; text/thinking output $3/MTok; image output $60/MTok, roughly $0.045-$0.151/image by resolution |
| Stable | `gemini-3.1-flash-lite-image` | 65,536 / 4,096 | Check current pricing page; exact row was not assigned in this audit |
| Stable | `gemini-3-pro-image` | 65,536 / 32,768 | Input $2/MTok; text/thinking output $12/MTok; image output $120/MTok |
| Deprecated; shutdown 2026-08-17 | `imagen-4.0-generate-001`, `imagen-4.0-ultra-generate-001`, `imagen-4.0-fast-generate-001` | Imagen API | Migrate to current Gemini image models |

Official sources: <https://ai.google.dev/gemini-api/docs/image-generation>, <https://ai.google.dev/gemini-api/docs/models/imagen>, <https://ai.google.dev/gemini-api/docs/pricing>, <https://ai.google.dev/gemini-api/docs/deprecations>.

### Black Forest Labs API

- FLUX.2 is the current generation/editing family.
- API endpoint `/v1/flux-2-pro` supports generation and editing, multiple reference images, and outputs up to the provider-documented megapixel limit.
- Pricing and endpoint capabilities vary by FLUX.2 Pro/Flex/Max/Klein service. Check the live API docs rather than transferring open-weight license/specs to hosted endpoints.

Official source: <https://docs.bfl.ai/flux_2/flux2_overview>.

## Current Open Weights

| Family / date | Exact official weight ID | Params / capability | Weight license | Lifecycle |
| --- | --- | --- | --- | --- |
| Qwen-Image | `Qwen/Qwen-Image-2512` | 20B-family MMDiT text-to-image | Apache-2.0 | Current downloadable Qwen image generation weight |
| Qwen-Image Edit | `Qwen/Qwen-Image-Edit-2511` | Multi-image editing | Apache-2.0 | Current downloadable edit weight |
| GLM-Image | `zai-org/GLM-Image` | 9B autoregressive generator + 7B DiT decoder; generation/editing | MIT weights; repository code Apache-2.0 | Current |
| Z-Image Turbo | `Tongyi-MAI/Z-Image-Turbo` | 6B distilled text-to-image, 8 NFE | Apache-2.0 | Current |
| Z-Image Base | `Tongyi-MAI/Z-Image` | 6B base text-to-image, model-card 50-step setup | Apache-2.0 | Current |
| Stable Diffusion 3.5 Large | `stabilityai/stable-diffusion-3.5-large`, `...-large-turbo` | 8.1B text-to-image; Turbo is distilled | Stability AI Community License | Current supported Stability core model |
| Stable Diffusion 3.5 Medium | `stabilityai/stable-diffusion-3.5-medium` | 2.5B text-to-image | Stability AI Community License | Current supported Stability core model |
| FLUX.2 dev | `black-forest-labs/FLUX.2-dev` | 32B generation and single/multi-reference editing | FLUX Non-Commercial License | Current high-capability open-weight branch |
| FLUX.2 klein 4B | `FLUX.2-klein-4B`, `FLUX.2-klein-base-4B` | 4B distilled/base generation and editing | Apache-2.0 | Current consumer/realtime branch |
| FLUX.2 klein 9B | `FLUX.2-klein-9B`, `...-9b-kv`, `...-base-9B` | 9B distilled/base generation and editing | FLUX Non-Commercial License | Current consumer branch |

Qwen-Image 2.0 has been announced as a later product, but no corresponding official downloadable weight ID was confirmed in this audit; do not invent one.

`Z-Image-Edit` and `Z-Image-Omni-Base` remained “to be released” in the official model zoo and are not listed as available weights.

## Deployment Notes

- Parameter count, checkpoint file size, and minimum VRAM are different fields. Do not use one `Size` value for all three.
- VRAM depends on text encoders, VAE, precision, quantization, resolution, batch, attention implementation, and CPU offload.
- Stability AI Community License, FLUX Non-Commercial License, Gemma-like custom terms, and Apache/MIT have materially different commercial conditions.
- `FLUX.1 Dev FP8` and similar community quantizations are packaging variants, not new official base models unless the vendor publishes that exact card.
- Empirical quality claims such as anatomy/skin/finger defects were removed because they lacked controlled primary evidence.

## Official Open-Weight Sources

- Qwen-Image: <https://github.com/QwenLM/Qwen-Image>, <https://huggingface.co/Qwen/Qwen-Image-2512>
- GLM-Image: <https://github.com/zai-org/GLM-Image>, <https://huggingface.co/zai-org/GLM-Image>
- Z-Image: <https://github.com/Tongyi-MAI/Z-Image>
- Stable Diffusion 3.5: <https://stability.ai/news-updates/introducing-stable-diffusion-3-5>, <https://stability.ai/core-models>
- FLUX.2: <https://github.com/black-forest-labs/flux2>, <https://huggingface.co/black-forest-labs/FLUX.2-dev>
