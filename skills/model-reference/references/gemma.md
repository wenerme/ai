# Gemma (Google DeepMind)

- Creator: Google DeepMind
- GitHub: [google-deepmind/gemma](https://github.com/google-deepmind/gemma)
- HuggingFace: [google](https://huggingface.co/google)
- License: Apache-2.0 (Gemma 3+), Gemma license (earlier)

## Model Timeline

| Version  | Date    | Sizes              | Context | Notes                                 |
| -------- | ------- | ------------------ | ------- | ------------------------------------- |
| Gemma 3n | 2025-05 | 5B-e2B, 8B-e4B    |         | Edge, PLE (Per-Layer Embeddings)      |
| Gemma 3  | 2025-03 | 1B, 4B, 12B, 27B  | 128K    | Vision (4B+), 14T tokens, Apache-2.0 |
| Gemma 2  | 2024-06 | 9B, 27.2B          | 8K      |                                       |
| Gemma    | 2024-02 | 2B, 7B             | 8K      |                                       |

## Recommended Sampling Parameters

### Gemma 3

| Parameter   | Value |
| ----------- | ----- |
| Temperature | 1.0   |
| TopK        | 64    |
| TopP        | 0.95  |
| MinP        | 0.0   |

## Architecture

### Gemma 3

- 1B: text only; 4B, 12B, 27B: Vision + text
- 14T training tokens
- 128K context (further trained from 32K; 1B stays 32K)
- Sliding window attention: 5 sliding + 1 global, 1024 window
- QK normalization (replaced attn softcapping)
- RL: BOND, WARM, WARP
- Vocab: 262K

### Gemma 3n (Edge)

- PLE (Per-Layer Embeddings): Reduces active parameters
- 5B-e2B: 5B total, ~2B effective active
- 8B-e4B: 8B total, ~4B effective active
- Designed for on-device deployment

## Benchmarks (Gemma 3 27B Pre-trained)

| Benchmark       | Score |
| --------------- | ----- |
| MMLU (5-shot)   | 78.6  |
| MMLU-Pro        | 52.2  |
| MATH (4-shot)   | 50.0  |
| GSM8K (8-shot)  | 82.6  |
| HumanEval       | 48.8  |
| MBPP (3-shot)   | 65.6  |
| HellaSwag       | 85.6  |
| BIG-Bench Hard  | 77.7  |
| MMMU (VLM)      | 56.1  |
| DocVQA          | 85.6  |

## Known Issues

- Gemma 3: Does NOT support object detection coordinates (no grounding/bounding box)
- Ollama: Tools support tracking at [ollama/ollama#9680](https://github.com/ollama/ollama/issues/9680)

## References

- https://ai.google.dev/gemma/docs/core
- Gemma 3 Report: https://storage.googleapis.com/deepmind-media/gemma/Gemma3Report.pdf
- HF Collection: [Gemma 3](https://huggingface.co/collections/google/gemma-3-release-67c6c6f89c4f76621268bb6d)
- https://docs.unsloth.ai/basics/gemma-3-how-to-run-and-fine-tune
