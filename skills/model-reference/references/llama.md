# Llama (Meta)

> Last verified: 2026-07-16. This is a manual snapshot of Meta's official Llama model cards. Verify the exact checkpoint license and acceptable-use terms before deployment.

- Creator: Meta
- Official repositories: <https://github.com/meta-llama>
- Official Hugging Face organization: <https://huggingface.co/meta-llama>

## Current Llama 4 Weights

| Lifecycle | Official weight ID | Total / active params | Experts | Context | Modality | License |
| --- | --- | ---: | ---: | ---: | --- | --- |
| Weights-only; current generation | `meta-llama/Llama-4-Scout-17B-16E`, `...-Instruct` | 109B / 17B | 16 total / 1 active | 256K pretrained; up to 10M on Instruct | Text + image input, text output | Llama 4 Community License Agreement |
| Weights-only; current generation | `meta-llama/Llama-4-Maverick-17B-128E`, `...-Instruct` | 400B / 17B | 128 total / 1 active | 256K pretrained; up to 1M on Instruct | Text + image input, text output | Llama 4 Community License Agreement |

The frequently repeated context ordering matters: **Scout is the 10M Instruct model; Maverick is the 1M Instruct model.**

Llama 4 Behemoth was announced as a training/preview model but no generally released official weight ID was confirmed in this audit, so it is not listed as downloadable.

## Previous Generations

| Family | Important official variants | Context / role |
| --- | --- | --- |
| Llama 3.3 | 70B Instruct | 128K dense text model |
| Llama 3.2 | 1B/3B text; 11B/90B vision | 128K on supported checkpoints |
| Llama 3.1 | 8B/70B/405B | 128K text models |
| Llama 3 | 8B/70B | Historical 3.x foundation |

Use older generations for compatibility or evaluated deployment constraints, not because they are current mainline.

## Deployment Notes

- Llama 4 MoE weight storage/residency follows total parameters, not 17B active parameters, unless expert offload is explicitly configured.
- The Llama Community License is a custom license with attribution, acceptable-use, and large-service conditions. Do not summarize it as Apache/MIT or as simply “free below a user count.”
- Multimodal support, tool calling, chat template, and context extension belong to exact Instruct checkpoints; do not transfer them to base checkpoints without confirmation.
- Generation settings are model-card/checkpoint specific. The previous generic temperature presets were unsourced and have been removed.

## Benchmark Policy

Llama model cards include Meta-reported evaluations. Treat them as vendor-reported and compare only within the documented release/setup. Do not mix Scout/Maverick scores with Llama 3 scores or third-party serving quantizations as a universal ranking.

## Official Sources

- Llama 4 model card: <https://github.com/meta-llama/llama-models/blob/main/models/llama4/MODEL_CARD.md>
- Llama 4 release: <https://ai.meta.com/blog/llama-4-multimodal-intelligence/>
- Official model repositories: <https://github.com/meta-llama/llama-models>
- Official weight organization: <https://huggingface.co/meta-llama>
