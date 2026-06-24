# InternVL (OpenGVLab)

- Creator: OpenGVLab (Shanghai AI Lab)
- GitHub: [OpenGVLab/InternVL](https://github.com/OpenGVLab/InternVL)
- HuggingFace: [OpenGVLab](https://huggingface.co/OpenGVLab)

## Model Timeline

| Version      | Date    | Sizes                         | Notes                              |
| ------------ | ------- | ----------------------------- | ---------------------------------- |
| InternVL 3.5 | 2025-08 | 1B-241B, Qwen3-based          | + GPT OSS FT variant              |
| Intern-S1    | 2025-07 | 235B (Qwen3 + 6B InternViT)   | Multimodal reasoning               |
| InternVL 2.5 | 2024-11 | 1B, 4B, 8B                    | Vision-language, multimodal        |

## Architecture

- InternViT (6B): Vision encoder
- LLM backbone: Qwen3 (for latest versions)
- MPO (Mixed Performance Optimization)
- Supports llama.cpp: [ggml-org/llama.cpp#9403](https://github.com/ggml-org/llama.cpp/pull/9403)

## References

- [InternVL 3.5 Collection](https://huggingface.co/collections/OpenGVLab/internvl35-68ac87bd52ebe953485927fb)
