# InternVL (OpenGVLab)

> Last verified: 2026-07-16. This is a manual snapshot of OpenGVLab's official InternVL3.5 release. Verify each weight card's backbone-specific license before deployment.

- Creator: OpenGVLab / Shanghai AI Laboratory
- Repository: <https://github.com/OpenGVLab/InternVL>
- Official weights: <https://huggingface.co/OpenGVLab>

## InternVL3.5 Current Series

Official IDs use an underscore in `InternVL3_5`:

| Lifecycle | Official weight ID | Approximate total / active params | Role |
| --- | --- | ---: | --- |
| Weights-only | `OpenGVLab/InternVL3_5-1B` | Model-card specific | Compact VLM |
| Weights-only | `OpenGVLab/InternVL3_5-2B` | Model-card specific | Compact VLM |
| Weights-only | `OpenGVLab/InternVL3_5-4B` | Model-card specific | Small VLM |
| Weights-only | `OpenGVLab/InternVL3_5-8B` | ~8.5B | General VLM |
| Weights-only | `OpenGVLab/InternVL3_5-14B` | ~15.1B | General VLM |
| Weights-only | `OpenGVLab/InternVL3_5-20B-A4B` | ~21.2B / 4B active | MoE VLM |
| Weights-only | `OpenGVLab/InternVL3_5-30B-A3B` | ~30.8B / 3B active | MoE VLM |
| Weights-only | `OpenGVLab/InternVL3_5-38B` | Model-card specific | Large dense VLM |
| Weights-only | `OpenGVLab/InternVL3_5-241B-A28B` | ~240.7B / 28B active | Frontier MoE VLM |

InternVL3.5 supports text plus image/video understanding, multi-image prompts, and dynamic-resolution tiling. Exact context, tile limits, video frame handling, and chat template belong to each model card and serving example.

## Architecture And Deployment

- InternViT is the vision encoder family used with different LLM backbones.
- Dense and MoE variants use different backbones and routing; do not infer one license or chat template for all variants.
- Official material reports training with up to 36 448x448 tiles and testing configurations up to 128 tiles, but practical limits depend on model/runtime memory.
- Total parameters determine full weight residency; active parameters describe routed MoE compute.

## Related, Separate Lines

- `internlm/Intern-S1` and `internlm/Intern-S1-mini` are scientific multimodal reasoning models, not ordinary InternVL3.5 size variants.
- GPT-OSS- or Qwen-backed fine-tunes can inherit additional upstream license/usage terms. Check the exact weight card.
- InternVL 2.5 is an older generation retained for compatibility.

## Benchmark Policy

InternVL release posts and reports contain OpenGVLab vendor-reported evaluations. Use the report for the exact model and setup; do not collapse scores across dense/MoE/backbone variants into one family ranking.

## Official Sources

- InternVL repository: <https://github.com/OpenGVLab/InternVL>
- InternVL3.5 collection: <https://huggingface.co/collections/OpenGVLab/internvl35-68ac87bd52ebe953485927fb>
- Release blog: <https://internvl.github.io/blog/2025-08-26-InternVL-3.5/>
- Technical report: <https://arxiv.org/abs/2508.18265>
