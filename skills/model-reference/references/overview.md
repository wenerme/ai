# Model Reference Overview

> Last verified: 2026-07-16. This is a manual multi-source snapshot. Recheck provider documentation before production decisions involving aliases, preview models, pricing, quotas, or lifecycle.

## How To Compare Models

Do not reduce model selection to one universal leaderboard. Compare candidates within the same operational constraints:

| Dimension | Questions to answer |
| --- | --- |
| Availability | Is the model stable, preview, deprecated, retired, API-only, or downloadable weights? |
| Identity | Is the name a callable API ID, a moving alias, a pinned snapshot, an app product name, or a weight repository ID? |
| Modality | Which text, image, audio, video, document, embedding, and generation modes are supported? |
| Limits | What are the native input context, maximum output, media limits, and provider-specific long-context tiers? |
| Tooling | Does the selected endpoint support tools, structured output, reasoning controls, grounding, code execution, or computer use? |
| Cost | Which provider, region, prompt tier, cache/batch mode, and unit does the price describe? |
| Deployment | Must all weights reside in accelerator memory? What quantization, KV cache, activation, and runtime overhead applies? |
| Evaluation | Are scores measured with the same prompt, tool access, sampling, pass count, benchmark version, and date? |

## Source Confidence

| Label | Meaning |
| --- | --- |
| Official specification | Provider API/model docs, official model card, repository, release, or technical report |
| Vendor-reported benchmark | Score reported by the model vendor; useful within its stated setup, not automatically cross-vendor comparable |
| Empirical recommendation | Generation/deployment guidance measured by a third party or local operator; must state its environment |
| Unverified | Conflicting or unavailable primary evidence; do not present as production fact |

## Weight Memory

Weight-only memory is approximately:

```text
weight_bytes = total_parameters * bits_per_weight / 8
```

| Storage precision | Nominal bytes/parameter | 7B | 14B | 32B | 70B |
| --- | ---: | ---: | ---: | ---: | ---: |
| FP32 | 4 | 28 GB | 56 GB | 128 GB | 280 GB |
| FP16/BF16 | 2 | 14 GB | 28 GB | 64 GB | 140 GB |
| INT8 | 1 | 7 GB | 14 GB | 32 GB | 70 GB |
| 4-bit nominal | 0.5 | 3.5 GB | 7 GB | 16 GB | 35 GB |

These are decimal, weight-only estimates. Real deployments also require:

- quantization scales, zero points, metadata, and alignment;
- KV cache, which grows with sequence length, layers, batch size, and KV-head layout;
- activations, temporary workspaces, graph/runtime allocations, and media encoders;
- duplicated or sharded buffers across devices;
- host memory and transfer headroom when using CPU/GPU offload.

### MoE Caveat

For Mixture-of-Experts models:

- **total parameters** normally determine stored/downloaded weight size and full weight residency;
- **active parameters per token** primarily describe routed compute, not complete model memory;
- memory can approach active-weight size only with an explicit expert-offload or expert-streaming design, which adds bandwidth and latency constraints.

Never size a 200B+ MoE deployment from a 10B-30B active-parameter number alone.

## Quantization Terms

The same nominal bit width can produce different quality, size, and kernel support. Record the exact format and quantizer rather than saying only “4-bit.”

| Example format | Typical intent | Important qualifier |
| --- | --- | --- |
| GGUF `Q4_K_M` | Balanced llama.cpp-family local inference | File size includes per-block metadata and may differ by architecture |
| GGUF `Q5_K_M` / `Q6_K` | Higher quality at larger size | Throughput depends on backend and hardware |
| `Q8_0` | Near-source quality with large memory use | Not equivalent to generic INT8 activation quantization |
| GPTQ / AWQ | GPU-oriented weight-only quantization | Kernel, group size, calibration, and activation assumptions matter |
| FP8 / MXFP4 | Native or packaged low-precision weights on selected models/hardware | Do not infer compatibility from bit count alone |

See the serving runtime's own documentation for supported quantization and memory calculators.

## Identity And Lifecycle Terms

| Term | Meaning |
| --- | --- |
| Stable model ID | Provider-supported production model identifier |
| Snapshot ID | Pinned model revision; behavior is expected to remain fixed for its lifecycle |
| Alias | Moving identifier that may be repointed to a newer snapshot |
| Preview / experimental | API or behavior can change and may have reduced guarantees |
| Deprecated | Still callable for a transition period but has a published migration path or retirement plan |
| Retired / shut down | No longer callable from the referenced provider endpoint |
| Weights-only | Downloadable model without a canonical hosted API ID |

## Common Weight-Model Suffixes

| Suffix or pattern | Common meaning | Caveat |
| --- | --- | --- |
| `Base` / `-pt` | Pretrained base model | Usually not instruction-following without a chat template or fine-tune |
| `Instruct` / `Chat` / `-it` | Instruction-tuned model | Exact template and system/tool support remain model-specific |
| `Thinking` / `Reasoning` | Deliberative variant or mode | Thinking representation and required sampling/history rules differ |
| `Coder` | Code-focused training or post-training | Does not by itself guarantee tool use or repository-scale context |
| `VL` / `Vision` / `Omni` | One or more non-text modalities | Check exact input/output modality matrix |
| `30B-A3B` | Approximate total and active MoE parameters | Naming conventions are vendor-specific; verify the model card |
| Quantization suffix | Packaged precision/quantizer | Not a new base model and not always vendor-produced |

## Task Routing

Use family references to build a shortlist, then validate against the consuming endpoint or runtime:

| Need | Start with |
| --- | --- |
| Hosted frontier text/reasoning/tool models | `claude.md`, `gpt.md`, `gemini.md`, plus the relevant provider docs skill |
| Self-hosted general/coding/reasoning LLM | `qwen.md`, `deepseek.md`, `llama.md`, `kimi.md`, `minimax.md`, `mistral.md`, `glm.md` |
| Compact/on-device model | `gemma.md`, `phi.md`, and small variants in other family files |
| Vision-language understanding | `qwen.md`, `llama.md`, `gemma.md`, `glm.md`, `phi.md`, `internvl.md`, `kimi.md` |
| Image generation/editing | `image-models.md` |
| Video generation/editing | `video-models.md` |

## Freshness Index

| Reference | Last verified | Channel/lifecycle coverage |
| --- | --- | --- |
| [overview.md](overview.md) | 2026-07-16 | Comparison, identity, memory, lifecycle, and routing policy |
| [claude.md](claude.md) | 2026-07-16 | Anthropic production, limited-availability, deprecated, and retired API models |
| [gpt.md](gpt.md) | 2026-07-16 | OpenAI production/deprecated API models and GPT-OSS weights |
| [gemini.md](gemini.md) | 2026-07-16 | Gemini stable, preview, superseded, and shut-down API models |
| [qwen.md](qwen.md) | 2026-07-16 | Qwen current/predecessor open weights |
| [deepseek.md](deepseek.md) | 2026-07-16 | DeepSeek current/historical open weights |
| [llama.md](llama.md) | 2026-07-16 | Llama current/predecessor open weights |
| [kimi.md](kimi.md) | 2026-07-16 | Moonshot current/available APIs and open weights |
| [minimax.md](minimax.md) | 2026-07-16 | MiniMax current/legacy APIs and open weights |
| [gemma.md](gemma.md) | 2026-07-16 | Gemma 4 current and Gemma 3 predecessor open weights |
| [mistral.md](mistral.md) | 2026-07-16 | Mistral current/open and legacy APIs/weights |
| [glm.md](glm.md) | 2026-07-16 | Z.ai current/previous APIs and open weights |
| [phi.md](phi.md) | 2026-07-16 | Microsoft Phi-4 open weights |
| [internvl.md](internvl.md) | 2026-07-16 | OpenGVLab InternVL3.5 open weights |
| [image-models.md](image-models.md) | 2026-07-16 | Hosted current/deprecated APIs and current open weights |
| [video-models.md](video-models.md) | 2026-07-16 | Hosted current/deprecated APIs and current/historical open weights |

Each family file carries its own `Last verified` date and exact source links. A missing or old date is a signal to recheck, not permission to infer.
