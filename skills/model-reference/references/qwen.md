# Qwen (通义千问)

> Last verified: 2026-07-16. This is a manual snapshot of official Qwen repositories and model cards. Verify the exact checkpoint's chat template and generation config before deployment.

- Creator: Alibaba / Qwen Team
- GitHub: <https://github.com/QwenLM>
- Hugging Face: <https://huggingface.co/Qwen>

## Current Open-Weight Families

| Lifecycle | Family / official weight IDs | Size | Context / modality | License |
| --- | --- | ---: | --- | --- |
| Weights-only; current mainline | `Qwen/Qwen3.6-35B-A3B`, `Qwen/Qwen3.6-27B` | 35B-A3B MoE; 27B dense | Official deployment examples use 262,144; text + vision | Apache-2.0 |
| Weights-only; available predecessor | `Qwen/Qwen3.5-397B-A17B`, `122B-A10B`, `35B-A3B`, `27B`, `9B`, `4B`, `2B`, `0.8B` | Dense and MoE | Early-fusion text + vision; 201 languages/dialects reported | Apache-2.0 |
| Weights-only; Qwen3 branch | `Qwen/Qwen3-Next-80B-A3B-Instruct`, `Qwen/Qwen3-Next-80B-A3B-Thinking` | 80B-A3B | Hybrid attention, ultra-sparse MoE | Apache-2.0 |

Qwen3.6 is the official latest mainline in the Qwen3.6 repository. Qwen3.5 remains useful for sizes not yet represented in the Qwen3.6 release set, but should not be labeled latest.

## Other Active Qwen Lines

| Family | Official identity / purpose |
| --- | --- |
| Qwen3 | Dense and MoE general/reasoning checkpoints such as `Qwen3-30B-A3B` and `Qwen3-235B-A22B` |
| Qwen3-Coder | Code-focused checkpoints; verify the current collection for exact IDs and context extensions |
| Qwen3-VL | Vision-language Instruct/Thinking checkpoints |
| Qwen3-Embedding / Reranker | 0.6B, 4B, and 8B retrieval models with model-specific embedding dimensions |
| Qwen2.5-Omni | Text/image/audio/video input with speech output on selected checkpoints |
| Qwen-Image | Image generation/editing; see `image-models.md` |

## Generation Settings

Generation settings are checkpoint- and mode-specific. Do not apply one Qwen3/Qwen3.5 “Thinking” temperature table to Qwen3.6, VL, Coder, or embedding models.

Use the selected model card's `generation_config.json`, chat template, and deployment example. In particular:

- preserve the model's required thinking/non-thinking template;
- do not mix Instruct and Thinking defaults;
- verify native versus provider-extended context;
- verify multimodal token budgeting separately from text context.

## Deployment Notes

- `35B-A3B` means total and routed active parameters; weight residency is based on total weights unless expert offload is used.
- Qwen3.6 and Qwen3.5 model cards list supported Transformers/vLLM/SGLang versions. Older runtimes can fail on new architecture/config fields.
- Commercial hosted Qwen APIs can expose different IDs, context extensions, pricing, and content policies from the open weights. Do not treat a Hugging Face ID as an Alibaba Cloud API model ID.

## Official Sources

- Qwen3.6 repository: <https://github.com/QwenLM/Qwen3.6>
- Qwen3.6 collection: <https://huggingface.co/collections/Qwen/qwen36>
- Qwen3.5 collection: <https://huggingface.co/collections/Qwen/qwen35>
- Qwen3 repository: <https://github.com/QwenLM/Qwen3>
- Qwen organization and collections: <https://huggingface.co/Qwen>
