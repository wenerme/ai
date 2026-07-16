# Gemini (Google)

> Last verified: 2026-07-16. This is a manual snapshot of the Gemini Developer API. Preview aliases, pricing, grounding charges, and shutdown dates are volatile.

- Creator: Google / Google DeepMind
- API/model catalog: <https://ai.google.dev/gemini-api/docs/models>
- Pricing: <https://ai.google.dev/gemini-api/docs/pricing>

## Current General Models

| Lifecycle | Exact API ID | Context | Max output | Knowledge cutoff | Standard input / output per MTok |
| --- | --- | ---: | ---: | --- | ---: |
| Stable | `gemini-3.5-flash` | 1,048,576 | 65,536 | 2025-01 | $1.50 / $9 |
| Preview | `gemini-3.1-pro-preview` | 1,048,576 | 65,536 | 2025-01 | <=200K prompt: $2 / $12; >200K: $4 / $18 |
| Preview | `gemini-3.1-pro-preview-customtools` | 1,048,576 | 65,536 | 2025-01 | Same token tiers as 3.1 Pro Preview |
| Stable | `gemini-3.1-flash-lite` | 1,048,576 | 65,536 | 2025-01 | Text/image/video input $0.25; audio input $0.50; output $1.50 |
| Preview, superseded | `gemini-3-flash-preview` | 1,048,576 | 65,536 | 2025-01 | Text/image/video input $0.50; audio input $1; output $3 |

Google identifies `gemini-3.5-flash` as the replacement for `gemini-3-flash-preview`. Production systems should prefer exact stable IDs. Preview IDs can change and may receive shorter deprecation notice.

Current general models support a model-specific subset of text/image/video/audio/PDF input, thinking, function calling, structured output, code execution, grounding, URL context, file search, caching, and computer use. Check the individual model page rather than assuming every Gemini 3 feature applies to every ID.

## Gemini 2.5 Stable Compatibility

| Exact API ID | Context | Max output | Standard input / output per MTok |
| --- | ---: | ---: | ---: |
| `gemini-2.5-pro` | ~1,048,576 | 65,536 | <=200K prompt: $1.25 / $10; >200K: $2.50 / $15 |
| `gemini-2.5-flash` | ~1,048,576 | 65,536 | Text/image/video input $0.30; audio input $1; output $2.50 |
| `gemini-2.5-flash-lite` | ~1,048,576 | 65,536 | Text/image/video input $0.10; audio input $0.50; output $0.40 |

Keep 2.5 for compatibility or evaluated workloads; it is no longer the complete current-family view.

## Specialized Gemini 3 Models

| Lifecycle | Exact API ID | Context / max output | Purpose |
| --- | --- | ---: | --- |
| Preview | `gemini-3.1-flash-live-preview` | 131,072 / 65,536 | Live text/audio interaction, synchronous tools, thinking, Search grounding |
| Preview | `gemini-3.1-flash-tts-preview` | 8,192 / 16,384 | Text-to-audio TTS |
| Stable | `gemini-3.1-flash-image` | 131,072 / 32,768 | Image generation/editing with text/image/PDF input |
| Stable | `gemini-3.1-flash-lite-image` | 65,536 / 4,096 | Lower-cost image generation/editing |
| Stable | `gemini-3-pro-image` | 65,536 / 32,768 | Higher-capability image generation/editing |
| Preview | `gemini-omni-flash-preview` | 1,048,576 / unpublished token output limit | Interactions API conversational video generation/editing |

Detailed image/video pricing and lifecycle are also summarized in `image-models.md` and `video-models.md`.

## Pricing Qualifiers

- Output prices include thinking tokens where thinking applies.
- Batch and Flex are generally 50% of standard token prices for supported models.
- Priority pricing is higher than Standard.
- Search and Maps grounding are billed by grounded query after the free allowance; check the pricing page.
- Cached-content storage and media token rates vary by model.

## Lifecycle

| Old ID | Status | Replacement |
| --- | --- | --- |
| `gemini-3-pro-preview` | Shut down 2026-03-09 | `gemini-3.1-pro-preview` |
| `gemini-3.1-flash-lite-preview` | Shut down 2026-05-25 | `gemini-3.1-flash-lite` |
| `gemini-3.1-flash-image-preview` | Shut down 2026-06-25 | `gemini-3.1-flash-image` |
| `gemini-3-pro-image-preview` | Shut down 2026-06-25 | `gemini-3-pro-image` |
| Gemini 2.0 Flash / Flash-Lite | Shut down | Use a current 2.5/3.x model |

Google recommends stable, exact IDs for production. `latest` aliases are hot-swapped and are not pinned snapshots.

## Official Sources

- Model catalog and version semantics: <https://ai.google.dev/gemini-api/docs/models>
- Pricing: <https://ai.google.dev/gemini-api/docs/pricing>
- Deprecations: <https://ai.google.dev/gemini-api/docs/deprecations>
- Gemini 3.5 Flash: <https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash>
- Gemini 3.1 Pro Preview: <https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview>
- Gemini 3.1 Flash-Lite: <https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-lite>
