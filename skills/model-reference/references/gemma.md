# Gemma (Google DeepMind)

> Last verified: 2026-07-16. This is a manual snapshot of official Gemma docs and model cards. Gemma 4 uses Apache-2.0; earlier generations use their checkpoint-specific terms.

- Creator: Google DeepMind
- Official docs: <https://ai.google.dev/gemma>
- Official weights: <https://huggingface.co/google>

## Gemma 4 Current Generation

Gemma 4 was released on 2026-03-31; 12B Unified followed on 2026-06-03.

| Lifecycle / official weight pattern | Total / effective params | Context | Input modality | License |
| --- | ---: | ---: | --- | --- |
| Weights-only; `google/gemma-4-E2B`, `...-it` | 5.1B total / 2.3B effective | 128K | Text, image, audio; video as frames | Apache-2.0 |
| Weights-only; `google/gemma-4-E4B`, `...-it` | 8B total / 4.5B effective | 128K | Text, image, audio; video as frames | Apache-2.0 |
| Weights-only; `google/gemma-4-12B`, `...-it` | 11.95B dense | 256K | Text, image, audio; video as frames | Apache-2.0 |
| Weights-only; `google/gemma-4-26B-A4B`, `...-it` | 25.2B / 3.8B active | 256K | Text, image; video as frames | Apache-2.0 |
| Weights-only; `google/gemma-4-31B`, `...-it` | 30.7B dense | 256K | Text, image; video as frames | Apache-2.0 |

All listed checkpoints output text. E2B/E4B use Per-Layer Embeddings; 26B A4B is an MoE with 128 routed experts plus one shared expert. Total parameters, not effective/active parameters, determine full weight residency.

Gemma 4 adds configurable thinking, native system-role and function-calling support, and hybrid local/global attention. Use the exact checkpoint's chat template and runtime requirements.

## Official Gemma 4 Generation Guidance

The Gemma 4 model card recommends the same sampling values across Gemma 4 use cases:

| Parameter | Value |
| --- | ---: |
| Temperature | 1.0 |
| Top-p | 0.95 |
| Top-k | 64 |

When thinking is enabled, keep only the final response in multi-turn history; do not append previous thought content. E2B/E4B and larger variants differ in disabled-thinking behavior, so preserve the official chat template rather than constructing control tokens manually.

## Previous Generations

### Gemma 3 And Gemma 3n

| Lifecycle / official weight pattern | Size | Context | Modality | License |
| --- | ---: | ---: | --- | --- |
| Weights-only predecessor; `google/gemma-3-270m`, `...-it` | 270M | Check model card | Text | Gemma Terms of Use |
| Weights-only predecessor; `google/gemma-3-1b-{pt,it}` | 1B | 32K | Text | Gemma Terms of Use |
| Weights-only predecessor; `google/gemma-3-{4b,12b,27b}-{pt,it}` | 4B, 12B, 27B | 128K | Text + image input, text output | Gemma Terms of Use |
| Weights-only predecessor; `google/gemma-3n-E2B`, `...-it` | ~5B / 2B effective | 32K | Text, image, audio, video input; text output | Gemma Terms of Use |
| Weights-only predecessor; `google/gemma-3n-E4B`, `...-it` | ~8B / 4B effective | 32K | Text, image, audio, video input; text output | Gemma Terms of Use |

Gemma 2 (2B/9B/27B) and Gemma 1 (2B/7B) are historical text generations. PaliGemma, MedGemma, TranslateGemma, FunctionGemma, and other specialized lines have separate model cards and should not be treated as ordinary Gemma 4 variants.

## Benchmark Policy

Google publishes model-card evaluations for Gemma 4 and earlier families. Treat them as Google vendor-reported and compare only within the documented setup; the old combined benchmark tables were removed.

## Official Sources

- Release timeline: <https://ai.google.dev/gemma/docs/releases>
- Gemma 4 model card and architecture: <https://ai.google.dev/gemma/docs/core/model_card_4>
- Gemma 4 license: <https://ai.google.dev/gemma/docs/gemma_4_license>
- Gemma 4 official collection: <https://huggingface.co/collections/google/gemma-4>
- Gemma 3 introduction: <https://developers.googleblog.com/en/introducing-gemma3/>
- Gemma official PyTorch repository: <https://github.com/google/gemma_pytorch/>
