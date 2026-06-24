# Qwen (通义千问)

- Creator: Alibaba / [QwenLM](https://github.com/QwenLM)
- HuggingFace: [Qwen](https://huggingface.co/Qwen)
- License: Apache-2.0 (most models)

## Model Timeline

| Version          | Date    | Sizes                                                  | Context | Notes                                   |
| ---------------- | ------- | ------------------------------------------------------ | ------- | --------------------------------------- |
| Qwen3.5          | 2026-02 | 397B-A17B, 122B-A10B, 35B-A3B, 27B                    | 262K    | MoE, Early Fusion multimodal, 201 lang |
| Qwen3 2507       | 2025-07 | Coder 480B-A35B, Coder-Flash 30B-A3B, 235B-A22B       | 256K    | Yarn 1M                                |
| Qwen3-VL         | 2025-10 | 2B-32B Instruct/Thinking, 235B-A22B                   |         | Vision, absolute coords                |
| Qwen3-Embedding  | 2025-06 | 0.6B, 4B, 8B                                          | 32K     | MRL(1024,2560,4096), 100+ lang         |
| Qwen3             | 2025-04 | 0.6B,1.7B,4B,8B,14B,30B,32B,235B, 30B-A3B,235B-A22B  | 40K     | Dense+MoE, Reasoning, 100+ lang        |
| Qwen2.5-Omni     | 2025-03 | 3B, 7B                                                | 32K     | text,audio,image,video,speech           |
| Qwen2.5-VL       | 2025-01 | 3B, 7B, 32B, 72B                                      | 125K    | Vision, 2D-RoPE                         |
| Qwen2.5          | 2025-01 | 0.5B-72B                                              | 32K-1M  |                                         |
| Qwen2            | 2024-06 | 0.5B-72B, 57B-A14B MoE                                | 32-128K | 7T tokens training                     |
| Qwen1.5          | 2024    |                                                        |         |                                         |
| Qwen             | 2023-08 | 7B                                                     |         | First release                           |

## Recommended Sampling Parameters

### Qwen3.5

| Mode                  | Temperature | TopP | TopK | MinP | Presence Penalty | Repetition Penalty |
| --------------------- | ----------- | ---- | ---- | ---- | ---------------- | ------------------ |
| Thinking mode general | 1.0         | 0.95 | 20   | 0.0  | 1.5              | 1.0                |
| Thinking mode coding  | 0.6         | 0.95 | 20   | 0.0  | 0.0              | 1.0                |
| Instruct general      | 0.7         | 0.8  | 20   | 0.0  | 1.5              | 1.0                |
| Instruct reasoning    | 1.0         | 0.95 | 20   | 0.0  | 1.5              | 1.0                |

### Qwen3

| Mode     | Temperature | TopP | TopK | MinP |
| -------- | ----------- | ---- | ---- | ---- |
| Thinking | 0.6         | 0.95 | 20   | 0.0  |
| Instruct | 0.7         | 0.8  | 20   | 0.0  |

### Qwen2.5-VL

| Mode    | Temperature | TopP | TopK |
| ------- | ----------- | ---- | ---- |
| General | 0.6         | 1.0  | 50   |
| OCR     | 0.0-0.001   | 0.9-1.0 | 0-5 |

## Architecture Details

### Qwen3.5

- MoE + Gated Delta Networks (gated linear attention)
- 60 layers, 512 experts (route ~10 active)
- Self-Speculative Decoding
- Native 262K context (commercial: 1M+)
- Early Fusion multimodal (text+image+video from scratch)
- 201 languages and dialects

### Qwen3 30B-A3B (Popular Edge Model)

| Spec             | Value               |
| ---------------- | ------------------- |
| Total Parameters | 30.5B (3.3B active) |
| Hidden Size      | 4096                |
| Attention        | GQA (32Q/4KV)       |
| Activation       | SwiGLU              |
| Head Size        | 128                 |
| Layers           | 48                  |
| Experts          | 128 total / 8 active |
| Vocab Size       | 151,669             |
| Data Type        | bf16                |

### Qwen2.5-VL Architecture

| Config                 | 3B   | 7B   | 72B  |
| ---------------------- | ---- | ---- | ---- |
| **ViT** Hidden Size    | 1280 | 1280 | 1280 |
| ViT Layers             | 32   | 32   | 32   |
| ViT Heads              | 16   | 16   | 16   |
| Patch Size             | 14   | 14   | 14   |
| Window Size            | 112  | 112  | 112  |
| **LLM** Hidden Size    | 2048 | 3584 | 8192 |
| LLM Layers             | 36   | 28   | 80   |
| KV Heads               | 2    | 4    | 8    |
| Vocab Size             | 151646 | 151646 | 151646 |

Vision token calculation:
- 28x28 pixels = 1 token
- Min: 4 tokens (56x56 px)
- Max: 16384 tokens (3584x3584 px)
- MAX_RATIO: 200 (width/height ratio limit)

## Sub-Projects

| Project          | Description                           |
| ---------------- | ------------------------------------- |
| QwQ              | Question answering / reasoning        |
| QvQ              | Visual reasoning                      |
| QwenLong-L1      | Long context reasoning, DocQA         |
| Qwen-Image       | 20B, T2I, Editing, Apache-2.0        |
| Qwen-Image-Edit  | Image editing                         |

## Known Issues

- Qwen2.5-VL: Output repetition at high DPI (300DPI). Use 72DPI for better results.
  - Workaround: `convert a.jpg -resize 25% -resize 'x28<' a.output.jpg`
- Qwen3-VL: Switched back to absolute coordinates (from relative in Qwen2.5-VL)

## References

- [QwenLM/Qwen3](https://github.com/QwenLM/Qwen3) — Qwen3 Technical Report: https://arxiv.org/abs/2505.09388
- [QwenLM/Qwen2.5-VL](https://github.com/QwenLM/Qwen2.5-VL) — https://arxiv.org/abs/2502.13923
- [QwenLM/Qwen2.5](https://github.com/QwenLM/Qwen2.5) — https://arxiv.org/abs/2412.15115
- HF Collections: [Qwen3.5](https://huggingface.co/collections/Qwen/qwen35), [Qwen3](https://huggingface.co/collections/Qwen/qwen3), [Qwen2.5-VL](https://huggingface.co/collections/Qwen/qwen25-vl-6795ffac22b334a837c0f9a5)
