# Mistral

- Creator: Mistral AI
- HuggingFace: [mistralai](https://huggingface.co/mistralai)
- License: Apache-2.0 (most models)

## Model Timeline

| Version        | Date    | Sizes           | Context | Notes                                |
| -------------- | ------- | --------------- | ------- | ------------------------------------ |
| Voxtral 1.0    | 2025-07 | Mini 3B, Small 24B | 32K  | Audio, 30min transcription           |
| Magistral      | 2025-06 | Small 24B       | 39K     | Reasoning, Multilingual              |
| Ministral 3    | 2025-10 | 3B, 8B, 14B    |         | Text, 11 languages                   |
| Mistral Large 2 | 2024-07 | 123B           | 128K    | Flagship                             |
| Mixtral 8x22B  | 2024-04 | 141B (39B active) | 65K  | MoE                                  |
| Mistral Small  | 2024    | 22B             | 32K     |                                      |
| Mixtral 8x7B   | 2023-12 | 46.7B           | 33K     | MoE, first open MoE LLM             |
| Mistral 7B     | 2023-12 | 7B              | 33K     | First release                        |

## Recommended Sampling Parameters

| Mode     | Temperature | TopP | Notes            |
| -------- | ----------- | ---- | ---------------- |
| General  | 0.7         | 0.9  |                  |
| Creative | 0.9         | 0.95 |                  |
| Code     | 0.2         | 0.9  |                  |
| Precise  | 0.0         | 1.0  | Deterministic    |

## Benchmarks

### Magistral Small

| Benchmark     | Small  | Medium |
| ------------- | ------ | ------ |
| AIME 2024     | 70.7%  | 73.6%  |
| AIME 2025     | 62.8%  | 65.0%  |
| GPQA Diamond  | 68.2%  | 70.8%  |
| LiveCodeBench | 55.8%  | 59.4%  |

### Mistral Small 3.1 (24B)

| Benchmark    | Score  |
| ------------ | ------ |
| MMLU         | 80.6%  |
| MMLU-Pro     | 66.8%  |
| MATH         | 69.3%  |
| GPQA Diamond | 46.0%  |
| HumanEval    | 88.4%  |
| DocVQA       | 94.1%  |
| RULER 128K   | 81.2%  |

## Architecture

### Magistral (Reasoning)

- 24B dense model
- Specialized for reasoning tasks via RL training
- 39K context window
- Multilingual support

### Mixtral MoE

- Sparse MoE: 8 experts, 2 active per token
- Sliding window attention
- GQA (Grouped Query Attention)
- SwiGLU activation
- BPE tokenizer (32K vocab for Mistral 7B, 32K for Mixtral)

## References

- https://mistral.ai/
- Mistral 7B: https://arxiv.org/abs/2310.06825
- Mixtral: https://arxiv.org/abs/2401.04088
