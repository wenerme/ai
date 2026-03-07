# GLM (Zhipu / 智谱)

- Creator: Zhipu AI / THUDM (Tsinghua)
- GitHub: [THUDM](https://github.com/THUDM), [zai-org](https://github.com/zai-org)
- HuggingFace: [THUDM](https://huggingface.co/THUDM), [zai-org](https://huggingface.co/zai-org)

## Model Timeline

| Version    | Date    | Sizes                        | Context | Notes                          |
| ---------- | ------- | ---------------------------- | ------- | ------------------------------ |
| GLM 4.7    | 2025-12 | ~400B (32B active)           | 200K    | MoE, MIT, 128K output capacity |
| GLM 4.7-Flash | 2025-12 | 31B                       |         | Consumer HW (RTX3090/M4 Max)  |
| GLM 4.6V   | 2025-12 | 9B, 108B                     |         | Vision, Reasoning              |
| GLM 4.5    | 2025-07 | 355B (32B active), Air 106B (12B active) | 200K | MoE, Thinking Mode, MIT |
| GLM 4.5V   | 2025-08 | based on Air-106-12A          |         | Hybrid Reasoning               |
| GLM 4.1V   | 2025-07 | 9B                           | 64K     | Vision, Reasoning              |
| GLM-4      | 2024    | 9B                           |         |                                |

## Special Tokens

```
<think> ... </think>       # Reasoning chain
<answer> ... </answer>     # Final answer
<|begin_of_box|> ... <|end_of_box|>  # Core answer box (may cause format errors)
```

## GLM 4.1V Thinking

- Based on GLM-4-9B-0414
- 9B, 64K context, Vision + Reasoning
- Uses glmv_reward for RL training
- Known issue: `<|begin_of_box|>` tags may cause format errors
  - https://github.com/zai-org/GLM-4.1V-Thinking/issues/79

## Recommended Sampling Parameters

### GLM-Z1-32B (Reasoning)

| Parameter     | Value | Notes                    |
| ------------- | ----- | ------------------------ |
| Temperature   | 0.6   | Balance creativity/stability |
| TopP          | 0.95  |                          |
| TopK          | 40    |                          |
| max_new_tokens | 30000 | Room for thinking chain  |

### GLM-4-9B-Chat

| Parameter  | Value |
| ---------- | ----- |
| Temperature | 0.95 |
| TopK       | 1     |
| max_length | 2500  |

## Benchmarks

### GLM-Z1-32B (Reasoning)

| Benchmark    | GLM-Z1-32B | DeepSeek-R1 (671B) | o1     |
| ------------ | ---------- | ------------------- | ------ |
| AIME 2024    | 80.0-85.0  | 79.8                | 74.3   |
| MATH-500     | 97.6       | 97.3                | 96.4   |
| GPQA Diamond | 71.2-74.7  | 71.5                | 75.7   |
| LiveCodeBench | 57.5      | 65.9                | -      |

### GLM-4.7

| Benchmark          | GLM-4.7 | Notes                        |
| ------------------ | ------- | ---------------------------- |
| AIME 2025          | 95.7%   | Beat GPT-5.1 (94.0%)        |
| SWE-bench Verified | 73.8%   | #1 open-source               |
| LiveCodeBench V6   | 84.9%   | Beat Claude 4.5 Sonnet       |
| GPQA Diamond       | 85.7%   |                              |
| HLE (with tools)   | 42.8%   | +38% over GLM-4.6           |
| τ²-Bench (Agentic) | 87.4%   | Parity with Claude 4.5 Sonnet |
| Terminal Bench 2.0  | 41.0%  | +16.5% over GLM-4.6          |

GLM-4.7-Flash (31B): SWE-bench 59.2%, AIME 2025 91.6%

### GLM-4.5

| Benchmark          | GLM-4.5 | Notes                        |
| ------------------ | ------- | ---------------------------- |
| AIME 2024          | 91.0%   | Higher than Claude 4 Opus    |
| MATH-500           | 98.2%   | Equal to Claude 4 Opus       |
| SWE-bench Verified | 64.2%   |                              |
| Tool-calling       | 90.6%   | Beat Claude 4 Sonnet (89.5%) |
| BrowseComp         | 26.4%   | Beat Claude 4 Opus (18.8%)  |

GLM-4.5-Air (106B/12B active): AIME 2024 89.4%

### GLM-4-9B-Chat

| Benchmark | GLM-4-9B | Llama-3-8B |
| --------- | -------- | ---------- |
| MMLU      | 72.4     | 68.4       |
| MATH      | 50.6     | 30.0       |
| HumanEval | 71.8     | 62.2       |
| C-Eval    | 75.6     | 51.3       |

## References

- [zai-org/GLM-4.1V-Thinking](https://github.com/zai-org/GLM-4.1V-Thinking)
- [zai-org/GLM-4.5V](https://huggingface.co/zai-org/GLM-4.5V)
