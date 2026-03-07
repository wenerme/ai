# Model Reference Overview

## Memory Requirements

**General formula**: Parameters × Precision = Memory

| Precision | Bytes/Param | 7B    | 13B   | 70B    |
| --------- | ----------- | ----- | ----- | ------ |
| FP32      | 4           | 28GB  | 52GB  | 280GB  |
| FP16/BF16 | 2           | 14GB  | 26GB  | 140GB  |
| INT8      | 1           | 7GB   | 13GB  | 70GB   |
| INT4      | 0.5         | 3.5GB | 6.5GB | 35GB   |

**Quick rule**: 1B params ≈ 2GB (FP16) or 0.5GB (INT4)

### Practical VRAM Guide

| Model Size | FP16   | INT4  | Typical Hardware       |
| ---------- | ------ | ----- | ---------------------- |
| 1-3B       | 2-6GB  | 1-2GB | Any GPU, Mobile        |
| 7-8B       | 14-16GB | 4GB  | RTX 3060/4060 (8GB+)  |
| 13-14B     | 26-28GB | 7GB  | RTX 3090/4090 (16GB+) |
| 30-32B     | 60-64GB | 16GB | 2× RTX 3090 or A100   |
| 70B        | 140GB  | 35GB | A100 80GB or 4× 3090  |
| 235B MoE   | ~60GB* | ~20GB* | *Active params only  |

### GGUF Quantization

| Quant   | Quality    | Speed   | Notes                        |
| ------- | ---------- | ------- | ---------------------------- |
| Q4_0    | Lower      | Fastest | Basic 4-bit                  |
| Q4_1    | Better     | Slower  | +offset for accuracy         |
| Q4_K_M  | Good       | Good    | Recommended default          |
| Q5_K_M  | Very good  | Medium  | Best quality/size tradeoff   |
| Q6_K    | Near FP16  | Slower  | Near-lossless                |
| Q8_0    | Excellent  | Slow    | 8-bit, minimal loss          |

## Architecture Comparison

| Model         | Params              | Architecture | Attention    | Experts        | Vocab  |
| ------------- | ------------------- | ------------ | ------------ | -------------- | ------ |
| Kimi K2       | 1.04T (32B active)  | MoE          | MLA          | 384/8+1 shared | 160K   |
| DeepSeek R1   | 671B (37B active)   | MoE          | MLA          | 256+1 shared   | -      |
| GLM 4.7       | ~400B (32B active)  | MoE          | -            | -              | -      |
| Qwen3-235B    | 235B (22B active)   | MoE          | GQA          | 128/8          | 151K   |
| MiniMax M2    | 230B (10B active)   | MoE          | -            | -              | -      |
| GPT-OSS-120B  | 117B (5.1B active)  | MoE          | GQA+Sparse   | 128/4          | 201K   |
| Llama 4 Scout | 109B (17B active)   | MoE          | GQA          | 16/1           | -      |
| Seed-OSS-36B  | 36B                 | Dense        | GQA          | -              | 155K   |
| Qwen3-32B     | 32.8B               | Dense        | GQA          | -              | 151K   |
| Gemma 3 27B   | 27B                 | Dense        | Local/Global | -              | 262K   |

Common patterns:
- **SwiGLU**: Nearly universal activation function
- **GQA**: Grouped Query Attention (dominant, replacing MHA)
- **MLA**: Multi-head Latent Attention (DeepSeek innovation)
- **MoE**: Mixture of Experts for efficiency at scale
- **RoPE**: Rotary Position Embeddings (most models)
- **BPE**: Byte Pair Encoding tokenizer (most models)

## Model Suffixes

| Suffix   | Meaning                                     |
| -------- | ------------------------------------------- |
| `-pt`    | Pre-Training — base model, needs fine-tuning |
| `-ft`    | Fine-Tuned                                  |
| `-it`    | Instruction-Tuned — ready for tasks          |
| `-A*B`   | MoE active params (e.g., 30B-A3B = 3B active) |
| `-e*B`   | Effective params (Gemma 3n PLE)              |

## Benchmark Comparison (Cross-Model)

> Note: Different models use different evaluation settings (shots, methods). Direct comparison should be treated as approximate.

### Reasoning & Knowledge

| Model                    | Size          | MMLU  | MMLU-Pro | GPQA Diamond | AIME 2025 | MATH-500 |
| ------------------------ | ------------- | ----- | -------- | ------------ | --------- | -------- |
| GLM-4.7                  | ~400B MoE     | -     | -        | 85.7         | 95.7      | -        |
| Kimi K2 Thinking         | 1T MoE        | -     | -        | ~80+         | 96.1      | -        |
| DeepSeek-V3.2            | 685B MoE      | -     | 85.0     | 79.9         | 89.3      | -        |
| DeepSeek-R1              | 671B MoE      | 90.8  | 84.0     | 71.5         | -         | 97.3     |
| Kimi K2                  | 1T MoE        | 89.5  | 81.1     | 75.1         | 49.5      | 97.4     |
| MiniMax M2.5             | 230B MoE      | -     | -        | 85.2         | 86.3      | -        |
| MiniMax M2.1             | 230B MoE      | -     | 88.0     | 83.0         | 83.0      | -        |
| GLM-4.5                  | 355B MoE      | -     | -        | -            | 91.0†     | 98.2     |
| Llama 4 Maverick         | 400B MoE      | -     | 80.5     | 69.8         | -         | -        |
| Phi-4-reasoning          | 14B           | -     | 74.3     | 65.8         | 62.9      | -        |
| Magistral Small          | 24B           | -     | -        | 68.2         | 62.8      | -        |

† GLM-4.5 AIME is 2024 edition

### Coding & SWE

| Model                    | Size          | LiveCodeBench | SWE-bench Verified |
| ------------------------ | ------------- | ------------- | ------------------ |
| GLM-4.7                  | ~400B MoE     | 84.9          | 73.8               |
| MiniMax M2.5             | 230B MoE      | -             | 80.2               |
| MiniMax M2.1             | 230B MoE      | ~83           | 74.0               |
| DeepSeek-V3.2            | 685B MoE      | 74.1          | 67.8               |
| Kimi K2                  | 1T MoE        | 53.7          | 65.8               |
| DeepSeek-R1              | 671B MoE      | 65.9          | 49.2               |
| GLM-4.5                  | 355B MoE      | -             | 64.2               |
| GLM-Z1-32B              | 32B           | 57.5          | -                  |
| Magistral Small          | 24B           | 55.8          | -                  |
| Phi-4-reasoning          | 14B           | 53.8          | -                  |
| Llama 4 Maverick         | 400B MoE      | 43.4          | -                  |

### Sampling Parameters Quick Reference

| Model              | Temperature | TopP | TopK | Other                              |
| ------------------ | ----------- | ---- | ---- | ---------------------------------- |
| Qwen3.5 Thinking   | 1.0         | 0.95 | 20   | Presence penalty 1.5               |
| Qwen3.5 Instruct   | 0.7         | 0.8  | 20   |                                    |
| Qwen3 Thinking     | 0.6         | 0.95 | 20   |                                    |
| Qwen3 Instruct     | 0.7         | 0.8  | 20   |                                    |
| DeepSeek-R1        | 0.6         | 0.95 | -    | No system prompt; max=32768        |
| DeepSeek-V3        | 0.7         | -    | -    | V3-0324: T_model = T_api × 0.3    |
| Kimi K2            | 0.6         | -    | -    | real_temp = request_temp × 0.6     |
| MiniMax M2         | 1.0         | 0.95 | 40   | Keep `<think>` in history          |
| Gemma 3            | 1.0         | 0.95 | 64   |                                    |
| GLM-Z1-32B         | 0.6         | 0.95 | 40   | max=30000                          |
| GLM-4-9B           | 0.95        | -    | 1    |                                    |
| Phi-4-reasoning    | 0.8 (MUST)  | 0.95 | 50   | Required for full capability       |
| Magistral Small    | 0.7         | 0.95 | -    | max=40960                          |
| Mistral Small 3.1  | 0.15        | -    | -    |                                    |

## Leaderboards & Benchmarks

### LLM

- [Open LLM Leaderboard](https://huggingface.co/open-llm-leaderboard) — HuggingFace hosted
- [LMSYS Chatbot Arena](https://lmarena.ai/) — ELO-based human preference
- [Vellum LLM Leaderboard](https://www.vellum.ai/llm-leaderboard) — Curated comparison
- [LiveBench](https://livebench.ai/) — Contamination-free benchmark
- [BFCL](https://gorilla.cs.berkeley.edu/leaderboard.html) — Berkeley Function-Calling Leaderboard
- [Aider Code Leaderboard](https://aider.chat/docs/leaderboards/) — Coding benchmark
- [OpenRouter Rankings](https://openrouter.ai/rankings) — Usage-based
- [xLang Arena](https://arena.xlang.ai/leaderboard) — Agent benchmark

### Vision/Multimodal

- [VLMEvalKit](https://github.com/open-compass/VLMEvalKit) — VLM evaluation toolkit
- [UncheatableEval](https://huggingface.co/spaces/Jellyfish042/UncheatableEval) — Anti-contamination eval

### Image Generation

- [Text-to-Image Leaderboard](https://huggingface.co/spaces/ArtificialAnalysis/Text-to-Image-Leaderboard)

### Pricing

- [LLM Prices](https://www.llm-prices.com/)
- [OpenRouter Models](https://openrouter.ai/models)
- [Price Per Token](https://pricepertoken.com/)
- [LiteLLM Models](https://models.litellm.ai/)

### Model Indexes

- [Ollama Library](https://ollama.com/library)
- [HuggingFace Models](https://huggingface.co/models)
