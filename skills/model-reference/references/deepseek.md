# DeepSeek

> Last verified: 2026-07-16. This is a manual snapshot of official DeepSeek repositories and reports. Hosted API aliases, pricing, and context can differ from downloadable weights.

- Creator: DeepSeek AI
- GitHub: <https://github.com/deepseek-ai>
- Hugging Face: <https://huggingface.co/deepseek-ai>

## Current Families

| Lifecycle | Official weight ID | Role | Context | Notes |
| --- | --- | --- | ---: | --- |
| Weights-only; current general/agent line | `deepseek-ai/DeepSeek-V3.2` | General, coding, tool use, hybrid reasoning | 128K | DeepSeek Sparse Attention; successor to V3/V3-0324 |
| Weights-only; specialized high-compute | `deepseek-ai/DeepSeek-V3.2-Speciale` | Hard reasoning | 128K | Not the default general deployment variant |
| Weights-only; current R1 update | `deepseek-ai/DeepSeek-R1-0528` | Long chain-of-thought reasoning | 128K | Latest public R1 update |
| Weights-only; distilled R1 update | `deepseek-ai/DeepSeek-R1-0528-Qwen3-8B` | Smaller reasoning model | Model-card specific | Distilled checkpoint, not the full R1 architecture |
| Weights-only; historical foundation | `deepseek-ai/DeepSeek-R1`, `DeepSeek-R1-Zero`, `DeepSeek-V3` | R1 reasoning and V3 general foundation | 128K | Retain for reproducibility, not “latest” labeling |

## R1 Family Architecture

The full DeepSeek-R1 model is based on the V3 MoE architecture:

| Field | Value |
| --- | ---: |
| Total parameters | 671B |
| Active parameters per token | 37B |
| Attention | Multi-head Latent Attention (MLA) |
| Experts | 256 routed + 1 shared |
| Context | 128K |

R1 distilled releases use Qwen or Llama dense backbones and do not inherit the full model's 671B/37B architecture.

## Distilled Checkpoints

The initial R1 release includes official distill weights based on:

- Qwen: 1.5B, 7B, 14B, and 32B;
- Llama: 8B and 70B.

Use the exact `deepseek-ai/DeepSeek-R1-Distill-*` model card for license, context, template, and generation settings.

## Generation Settings

Do not use one sampling table across V3.2, V3.2-Speciale, R1, and distilled R1:

- R1 recommendations belong only to the R1 model card/README.
- V3 API temperature mapping documented for earlier hosted revisions does not automatically apply to V3.2 open weights.
- “temperature=0 for code” is not an official family-wide DeepSeek rule and is intentionally omitted.
- Preserve reasoning content according to the selected API/runtime's continuation contract rather than assuming raw `<think>` text is always required or exposed.

## Benchmark Policy

DeepSeek publishes extensive benchmark tables for R1, V3, and V3.2. They use different releases, harnesses, pass counts, tool access, and generation budgets. Treat them as **DeepSeek vendor-reported** and consult the corresponding report; do not combine them into one cross-version ranking table.

## Official Sources

- DeepSeek-V3 repository: <https://github.com/deepseek-ai/DeepSeek-V3>
- DeepSeek-R1 repository: <https://github.com/deepseek-ai/DeepSeek-R1>
- V3.2 technical report: <https://arxiv.org/abs/2512.02556>
- R1 technical report: <https://arxiv.org/abs/2501.12948>
