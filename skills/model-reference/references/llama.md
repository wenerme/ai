# Llama (Meta)

- Creator: Meta
- GitHub: [meta-llama](https://github.com/meta-llama)
- HuggingFace: [meta-llama](https://huggingface.co/meta-llama)
- License: Llama Community License (free for <700M MAU)

## Model Timeline

| Version  | Date    | Sizes                           | Context | Notes                              |
| -------- | ------- | ------------------------------- | ------- | ---------------------------------- |
| Llama 4  | 2025-04 | Scout 109B-A17B, Maverick 400B-A17B | 1M, 10M | MoE, Vision, multilingual         |
| Llama 3.3 | 2024-12 | 70B                            | 128K    | Dense, improved from 3.1          |
| Llama 3.2 | 2024-09 | 1B, 3B, 11B, 90B              | 128K    | Added vision (11B, 90B)           |
| Llama 3.1 | 2024-07 | 8B, 70.6B, 405B               | 128K    |                                    |
| Llama 3  | 2024-04 | 8B, 70.6B                      | 8K-128K |                                    |
| Llama 2  | 2023-07 | 6.7B, 13B, 69B                 | 4K      |                                    |
| LLaMA    | 2023-02 | 6.7B, 13B, 32.5B, 65.2B        | 2K      | Original release                   |

## Recommended Sampling Parameters

| Mode        | Temperature | TopP | Notes                     |
| ----------- | ----------- | ---- | ------------------------- |
| General     | 0.6         | 0.9  |                           |
| Creative    | 0.8-1.0     | 0.95 |                           |
| Code        | 0.2         | 0.9  |                           |
| Factual     | 0.0-0.1     | 0.9  |                           |

- Llama 4: Supports tool calling natively
- Repetition penalty: 1.0-1.1 recommended

## Architecture

### Llama 4 (MoE)

| Spec          | Scout 109B-A17B | Maverick 400B-A17B |
| ------------- | --------------- | ------------------|
| Total Params  | 109B            | 400B              |
| Active Params | 17B             | 17B               |
| Context       | 1M              | 10M               |
| Architecture  | MoE             | MoE               |
| Vision        | Yes             | Yes               |
| Experts       | 16 total / 1 active | 128 total / 1 active |
| Training Data | 40T+ tokens     | 40T+ tokens       |

### Llama 3 Architecture

- GQA (Grouped Query Attention)
- RoPE (Rotary Position Embeddings)
- SwiGLU activation
- 128K vocabulary size
- BPE tokenizer (tiktoken-based)

## Memory Requirements

| Model     | FP16   | INT8  | INT4  |
| --------- | ------ | ----- | ----- |
| 405B      | ~810GB | ~405GB | ~200GB |
| 70B       | ~140GB | ~70GB | ~35GB |
| 8B        | ~16GB  | ~8GB  | ~4GB  |

## Benchmarks

### Llama 4 Instruct

| Benchmark         | Scout  | Maverick |
| ----------------- | ------ | -------- |
| MMLU-Pro          | 74.3   | 80.5     |
| GPQA Diamond      | 57.2   | 69.8     |
| LiveCodeBench     | 32.8   | 43.4     |
| MMMU              | 69.4   | 73.4     |
| DocVQA            | 94.4   | 94.4     |
| MGSM              | 90.6   | 92.3     |

### Llama 3.3 70B Instruct

| Benchmark    | 3.3 70B | 3.1 70B |
| ------------ | ------- | ------- |
| MMLU         | 86.0    | 86.0    |
| MMLU-Pro     | 68.9    | 66.4    |
| GPQA Diamond | 50.5    | 48.0    |
| HumanEval    | 88.4    | 80.5    |
| MATH         | 77.0    | 68.0    |
| IFEval       | 92.1    | 87.5    |

## Ecosystem

- Extended context: [llama3-gradient](https://ollama.com/library/llama3-gradient) 8K→1M
  - 256K requires ~64GB RAM
  - 1M+ requires 100GB+ RAM
- Llama Guard: Safety classifier
- Code Llama: Code-specialized

## References

- https://llama.meta.com/
- Llama 3 paper: https://arxiv.org/abs/2407.21783
