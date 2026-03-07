# DeepSeek

- Creator: DeepSeek AI
- GitHub: [deepseek-ai](https://github.com/deepseek-ai)
- HuggingFace: [deepseek-ai](https://huggingface.co/deepseek-ai)

## Model Timeline

| Version          | Date    | Sizes                      | Context | Notes                                |
| ---------------- | ------- | -------------------------- | ------- | ------------------------------------ |
| DeepSeek V3.2    | 2025-12 | 685B                       | 128K    | DSA (Sparse Attention), Hybrid reasoning |
| DeepSeek R1 0528 | 2025-05 |                            | 128K    | Reasoning update                     |
| DeepSeek R1      | 2025-01 | 1.5B-671B, distill 7B-70B | 128K    | Reasoning, RL, GRPO                  |
| DeepSeek V3      | 2024-12 | 671B (37B active)          | 128K    | MoE, MLA, MTP, FP8                  |
| DeepSeek VL2     | 2024    |                            |         | Vision-Language                      |
| DeepSeek V2      | 2024    |                            |         | Introduced MLA                       |

## Recommended Sampling Parameters

| Mode        | Temperature | TopP | TopK | Notes                    |
| ----------- | ----------- | ---- | ---- | ------------------------ |
| General     | 0.6         | 0.95 |      | Default for most tasks   |
| Reasoning   | 0.6         | 0.95 |      | R1 series                |
| Creative    | 1.0         | 0.95 |      |                          |
| Code        | 0.0         | 1.0  |      | Deterministic            |

- R1 series: Use `<think>` tags for chain-of-thought reasoning
- max_tokens recommendation: 8192+ for reasoning tasks (thinking can be long)

## Architecture

### DeepSeek V3 / R1

| Spec             | Value                          |
| ---------------- | ------------------------------ |
| Total Parameters | 671B (37B active per token)    |
| Architecture     | MoE + MLA                      |
| Attention        | Multi-head Latent Attention    |
| Activation       | SwiGLU                         |
| Layers           | 61                             |
| Experts          | 256 routed + 1 shared          |
| Data Type        | FP8 / bf16                     |
| Context          | 128K                           |

Key innovations:
- **MLA** (Multi-head Latent Attention): Compresses KV cache for efficient long-context
- **MTP** (Multi-Token Prediction): Predicts multiple future tokens
- **GRPO** (Group Relative Policy Optimization): RL training for R1 reasoning
- **FP8 mixed precision**: Training and inference efficiency

### R1 Distilled Models

Available as dense models distilled from R1:
- DeepSeek-R1-Distill-Qwen-1.5B/7B/14B/32B (based on Qwen2.5)
- DeepSeek-R1-Distill-Llama-8B/70B (based on Llama 3)

## Memory Requirements

| Model       | FP16   | INT8  | INT4  |
| ----------- | ------ | ----- | ----- |
| R1 671B     | ~1.3TB | ~670GB | ~335GB |
| R1-Distill 70B | ~140GB | ~70GB | ~35GB |
| R1-Distill 32B | ~64GB  | ~32GB | ~16GB |
| R1-Distill 7B  | ~14GB  | ~7GB  | ~3.5GB |

## Sub-Projects

| Project    | Description                                     |
| ---------- | ----------------------------------------------- |
| Janus      | Unified multimodal understanding + generation   |
| Janus-Pro  | 7B, based on DeepSeek-LLM-7b-base             |
| DeepSeek VL2 | MoE Vision-Language                          |

## Benchmarks

### DeepSeek-R1 (671B)

| Benchmark         | R1     | o1-1217 |
| ----------------- | ------ | ------- |
| MMLU              | 90.8   | 91.8    |
| MMLU-Pro          | 84.0   | -       |
| GPQA Diamond      | 71.5   | 75.7    |
| AIME 2024         | 79.8   | 79.2    |
| MATH-500          | 97.3   | 96.4    |
| LiveCodeBench     | 65.9   | 63.4    |
| SWE-bench Verified | 49.2  | 48.9    |
| Codeforces Rating | 2029   | 2061    |

### DeepSeek-V3

| Benchmark         | V3    | V3-0324 |
| ----------------- | ----- | ------- |
| MMLU              | 88.5  | -       |
| MMLU-Pro          | 75.9  | 81.2    |
| GPQA Diamond      | 59.1  | 68.4    |
| AIME 2024         | 39.2  | 59.4    |
| MATH-500          | 90.2  | -       |
| LiveCodeBench     | 40.5  | 49.2    |
| SWE-bench         | 42.0  | -       |

### DeepSeek-V3.2 (685B)

| Benchmark          | V3.2 Standard | V3.2-Speciale |
| ------------------ | ------------- | ------------- |
| AIME 2025          | 89.3%         | 92.4%         |
| MMLU-Pro           | 85.0%         | 88.2%         |
| GPQA Diamond       | 79.9%         | 87.1%         |
| SWE-bench Verified | 67.8%         | 71.2%         |
| LiveCodeBench      | 74.1%         | 79.5%         |
| HLE                | 19.8%         | 26.1%         |
| Arena ELO          | 1421          | 1448          |

V3.2 key improvements over V3:
- **DSA** (DeepSeek Sparse Attention): Near-linear O(kL) attention, ~50% inference cost reduction
- **Hybrid reasoning**: Integrated step-by-step thinking in conversation/tool-use (no separate model switch)
- **V3.2-Speciale**: High-compute variant using more thinking tokens for hardest problems

### V3-0324 Temperature Mapping

API temperature maps to model temperature:
- 0 ≤ T_api ≤ 1: T_model = T_api × 0.3
- 1 < T_api ≤ 2: T_model = T_api − 0.7
- Recommended T_model = 0.3 for web/app

## References

- [deepseek-ai/DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1)
- [deepseek-ai/DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-V3)
- DeepSeek R1 paper: https://arxiv.org/abs/2501.12948
- DeepSeek V3 paper: https://arxiv.org/abs/2412.19437
