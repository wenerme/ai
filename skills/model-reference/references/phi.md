# Phi (Microsoft)

> Last verified: 2026-07-16. This is a manual snapshot of Microsoft's official Phi-4 model cards and release material. Phi-4 is a family of parallel specialized checkpoints, not one 128K multimodal model.

- Creator: Microsoft
- Official models: <https://huggingface.co/microsoft>
- License: MIT for the listed Phi-4 weights; verify each model card

## Phi-4 Family

| Lifecycle | Official weight ID | Params | Context | Modality / role |
| --- | --- | ---: | ---: | --- |
| Weights-only | `microsoft/phi-4` | 14B | 16K | Text-only general model |
| Weights-only | `microsoft/Phi-4-mini-instruct` | 3.8B | 128K | Compact text instruction model |
| Weights-only | `microsoft/Phi-4-multimodal-instruct` | ~5.6B | 128K | Text + image + audio input |
| Weights-only | `microsoft/Phi-4-reasoning` | 14B | 32K | Deliberative reasoning |
| Weights-only | `microsoft/Phi-4-reasoning-plus` | 14B | 32K | Higher-compute reasoning variant |
| Weights-only | `microsoft/Phi-4-mini-flash-reasoning` | 3.8B | 64K | Compact mathematical reasoning |
| Weights-only | `microsoft/Phi-4-reasoning-vision-15B` | 15B | Check model card | Vision reasoning |

Do not transfer vision/audio capabilities from `Phi-4-multimodal-instruct` to the base `microsoft/phi-4` model.

## Generation Settings

Microsoft's reasoning model cards can require model-specific sampling. For the checkpoint that explicitly documents the following settings:

| Parameter | Value |
| --- | ---: |
| Temperature | 0.8 |
| Top-p | 0.95 |
| Top-k | 50 |
| Sampling | Enabled |
| Max new tokens | Up to 32,768 for the documented reasoning setup |

Apply these only to the referenced Phi-4 reasoning checkpoint. They are not defaults for base, mini, multimodal, or reasoning-vision models.

## Deployment Notes

- Use the exact model card's chat template and Transformers/runtime version.
- A 128K context limit does not mean practical memory use is small; KV cache and multimodal encoders add runtime memory.
- Phi-4 benchmarks are Microsoft vendor-reported and use model-specific prompting/sampling. The old combined comparison tables have been removed.

## Official Sources

- Phi-4 technical report: <https://www.microsoft.com/en-us/research/publication/phi-4-technical-report/>
- Phi-4 Mini Flash Reasoning: <https://azure.microsoft.com/en-us/blog/reasoning-reimagined-introducing-phi-4-mini-flash-reasoning/>
- Phi-4 Reasoning Vision repository: <https://github.com/microsoft/Phi-4-vision>
- Azure model catalog entry: <https://ai.azure.com/catalog/models/Phi-4>
- Official model cards: <https://huggingface.co/microsoft>
