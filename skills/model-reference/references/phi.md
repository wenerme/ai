# Phi (Microsoft)

- Creator: Microsoft Research
- HuggingFace: [microsoft](https://huggingface.co/microsoft)
- License: MIT

## Model Timeline

| Version | Date    | Sizes           | Context | Notes                                       |
| ------- | ------- | --------------- | ------- | ------------------------------------------- |
| Phi-4   | 2024-12 | 14B             | 128K    | Mini-reasoning, multimodal                  |
| Phi-3.5 | 2024-08 | 3.8B, 7B, 14B  | 128K    | MoE variant available                       |
| Phi-3   | 2024-04 | 3.8B, 7B, 14B   | 4K-128K | First multimodal Phi                        |

## Phi-4 Capabilities

| Modality | Languages                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| Text     | Arabic, Chinese, Czech, Danish, Dutch, English, Finnish, French, German, Hebrew, Hungarian, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Russian, Spanish, Swedish, Thai, Turkish, Ukrainian |
| Vision   | English only                                                                                                     |
| Audio    | English, Chinese, German, French, Italian, Japanese, Spanish, Portuguese                                         |

## Recommended Sampling Parameters

| Mode     | Temperature | TopP | Notes          |
| -------- | ----------- | ---- | -------------- |
| General  | 0.7         | 0.9  |                |
| Code     | 0.2         | 0.9  |                |
| Precise  | 0.0         | 1.0  | Deterministic  |

## Phi-4-reasoning

**IMPORTANT**: Must use specific sampling parameters for full capability:

| Parameter     | Value | Notes      |
| ------------- | ----- | ---------- |
| Temperature   | 0.8   | **Required** |
| TopP          | 0.95  |            |
| TopK          | 50    |            |
| do_sample     | True  |            |
| max_new_tokens | 32768 | Long CoT   |

## Benchmarks

### Phi-4 (14B)

| Benchmark | Phi-4 | GPT-4o-mini | GPT-4o |
| --------- | ----- | ----------- | ------ |
| MMLU      | 84.8  | 81.8        | 88.1   |
| GPQA      | 56.1  | 40.9        | 50.6   |
| MATH      | 80.4  | 73.0        | 74.6   |
| HumanEval | 82.6  | 86.2        | 90.6   |

### Phi-4-reasoning

| Benchmark    | reasoning | reasoning-plus |
| ------------ | --------- | -------------- |
| AIME 2024    | 75.3      | 81.3           |
| AIME 2025    | 62.9      | 78.0           |
| GPQA Diamond | 65.8      | 68.9           |
| LiveCodeBench | 53.8     | 53.1           |
| HumanEvalPlus | 92.9     | 92.3           |
| MMLU-Pro     | 74.3      | 76.0           |

## Key Models

- [microsoft/phi-4](https://huggingface.co/microsoft/phi-4) — 14B text
- [microsoft/Phi-4-multimodal-instruct](https://huggingface.co/microsoft/Phi-4-multimodal-instruct) — Multimodal (text+vision+audio)

## References

- https://huggingface.co/microsoft/phi-4
