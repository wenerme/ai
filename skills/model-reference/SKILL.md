---
name: model-reference
description: "Use when looking up or comparing current AI model IDs, lifecycle, context/output limits, pricing, modalities, open-weight sizes/licenses, generation settings, deployment memory, or image/video model capabilities across Claude, GPT, Gemini, Qwen, DeepSeek, Llama, Kimi, MiniMax, Gemma, Mistral, GLM, Phi, InternVL, and major media-model families."
---

# Model Reference

Locally maintained, multi-source quick reference for AI model specifications, lifecycle, callable IDs, pricing, deployment constraints, and generation guidance.

This skill is not synchronized from a single provider. Each reference is a dated manual snapshot built from provider-primary documentation, official repositories/model cards, release announcements, and technical reports.

## Hard Rules

- MUST open the relevant file in `references/` before answering model IDs, lifecycle, context/output limits, pricing, sampling parameters, benchmark scores, licenses, or memory requirements.
- MUST state the reference's `Last verified` date when the answer depends on volatile data such as aliases, preview status, pricing, limits, or deprecation.
- MUST distinguish API aliases from pinned snapshots and app/product names from callable API model IDs.
- MUST distinguish native context from provider-extended context and synchronous output limits from batch/long-output modes.
- MUST qualify pricing by provider, unit, prompt tier, cache/batch state, and region when applicable.
- MUST label benchmarks as vendor-reported unless an independent primary evaluation source and setup are cited. Do not treat different benchmark settings as directly comparable.
- MUST distinguish total parameters from active parameters. NEVER estimate MoE weight residency from active parameters alone unless expert offload is an explicit assumption.
- MUST verify official provider docs before production decisions when a reference is older than 30 days or marks a model preview/deprecated.
- NEVER invent model IDs, release dates, context/output limits, prices, knowledge cutoffs, licenses, or generation settings.

## Fast Lookup

Run from the directory containing this `SKILL.md`:

```bash
rg -n "model ID|API ID|alias|snapshot|stable|preview|deprecated|retired|shutdown" references
rg -n "Context|context|Max output|output|Input.*1M|Output.*1M|pricing" references
rg -n "Parameters|active|MoE|VRAM|INT4|FP16|license" references
rg -n "Temperature|TopP|TopK|sampling|generation" references
```

## Model Families (Open Weights)

| Family   | Creator        | File                        | Focus                          |
| -------- | -------------- | --------------------------- | ------------------------------ |
| Qwen     | Alibaba        | `references/qwen.md`       | LLM, VLM, MoE, embedding      |
| DeepSeek | DeepSeek AI    | `references/deepseek.md`   | LLM, MoE, reasoning           |
| Llama    | Meta           | `references/llama.md`      | LLM, VLM, MoE                 |
| Kimi     | Moonshot AI    | `references/kimi.md`       | LLM, VLM, MoE, agentic        |
| MiniMax  | MiniMax AI     | `references/minimax.md`    | LLM, MoE, coding, agentic     |
| Gemma    | Google         | `references/gemma.md`      | LLM, VLM, edge                |
| Mistral  | Mistral AI     | `references/mistral.md`    | LLM, audio, coding, reasoning |
| GLM      | Zhipu / Z.ai   | `references/glm.md`        | LLM, VLM, MoE                 |
| Phi      | Microsoft      | `references/phi.md`        | LLM, VLM, audio, compact      |
| InternVL | OpenGVLab      | `references/internvl.md`   | VLM, vision                   |

## Proprietary Models

| Family | Creator   | File                       |
| ------ | --------- | -------------------------- |
| Claude | Anthropic | `references/claude.md`     |
| GPT    | OpenAI    | `references/gpt.md`        |
| Gemini | Google    | `references/gemini.md`     |

## Generation Models

| Category | File                          |
| -------- | ----------------------------- |
| Image    | `references/image-models.md`  |
| Video    | `references/video-models.md`  |

## Cross-Model Reference

| Topic      | File                          |
| ---------- | ----------------------------- |
| Overview   | `references/overview.md`      |

## Usage Workflow

1. Identify whether the request concerns an API model, downloadable weights, image generation, video generation, or deployment sizing.
2. Open the family reference and check `Last verified`, lifecycle, and exact source scope.
3. Match the consuming provider, project version, renderer/runtime, region, and requested modality before selecting an ID or configuration.
4. Present volatile facts with qualifiers and link the official source.
5. Redirect detailed API behavior to the provider-specific documentation skill after selecting the model.
