# Kimi (Moonshot AI)

- Creator: Moonshot AI (月之暗面)
- GitHub: [MoonshotAI](https://github.com/MoonshotAI)
- HuggingFace: [moonshotai](https://huggingface.co/moonshotai)

## Model Timeline

| Version       | Date    | Sizes           | Context | Notes                            |
| ------------- | ------- | --------------- | ------- | -------------------------------- |
| Kimi K2.5     | 2026-01 |                 | 256K    | Multimodal, Reasoning            |
| Kimi K2 Thinking | 2025-11 | 1T-A32B     | 128K    | Long CoT reasoning               |
| Kimi K2       | 2025-07 | 1.04T (32B active) | 128K | MoE, Agentic, MCP optimized     |

## Architecture

| Spec             | Kimi K2                       |
| ---------------- | ----------------------------- |
| Total Parameters | 1.04 Trillion                 |
| Active Parameters | 32B per token                |
| Architecture     | Sparse MoE + MLA              |
| Layers           | 61 (1 Dense + 60 MoE)        |
| Attention        | MLA (Multi-head Latent Attention) |
| Hidden Size      | 7,168                         |
| Attention Heads  | 64                            |
| Experts          | 384 total, 8+1 shared active  |
| Activation       | SwiGLU                        |
| Vocab Size       | 160K                          |
| Training Data    | 15.5T tokens                  |
| Optimizer        | MuonClip (Muon at 1T scale)   |
| Weight Format    | Block-FP8                     |
| Context Window   | 128K (K2), 256K (K2.5)        |
| License          | Modified MIT                  |

## Benchmarks

### Kimi K2 (Standard)

| Benchmark         | Score  | Notes                     |
| ----------------- | ------ | ------------------------- |
| MMLU              | 89.5%  |                           |
| MMLU-Pro          | 81.1%  |                           |
| MATH-500          | 97.4%  |                           |
| GPQA Diamond      | 75.1%  |                           |
| SWE-bench Verified | 65.8% | 1-attempt                 |
| LiveCodeBench v6  | 53.7%  | Surpassed GPT-4 (44.7%)  |
| AIME 2024         | 69.6%  |                           |
| Tau2 (Tool-use)   | 70.6%  |                           |
| AceBench          | 76.5%  | Agentic coding            |

### Kimi K2 Thinking / K2.5

| Benchmark          | Score  | Notes                    |
| ------------------ | ------ | ------------------------ |
| AIME 2025          | 96.1%  | Surpassing GPT-4o level  |
| GPQA Diamond       | ~80%+  | Reasoning-enhanced       |
| HLE-Full (tools)   | 50.2%  | Humanity's Last Exam     |
| HLE-Full (no tools) | 30.1% |                         |

## Recommended Sampling Parameters

| Parameter   | Value | Notes                            |
| ----------- | ----- | -------------------------------- |
| Temperature | 0.6   | real_temp = request_temp × 0.6   |
| max_tokens  | 8000  | Eval default; adjust per task    |

## Key Features

- **Agentic focus**: Optimized for MCP, autonomous problem-solving
- **Tool use**: Web browsing, Python execution, file management
- **MuonClip optimizer**: First to scale Muon to 1T params with zero training instability
- **Cost**: ~$0.60/M input tokens (~5x cheaper than GPT-4)

## HuggingFace Models

| Variant        | Description              |
| -------------- | ------------------------ |
| Kimi-K2-Base   | Base model, fine-tunable |
| Kimi-K2-Instruct | Chat + tool calling   |

## References

- [MoonshotAI/Kimi-K2](https://github.com/MoonshotAI/Kimi-K2)
- [moonshotai/Kimi-K2-Instruct](https://huggingface.co/moonshotai/Kimi-K2-Instruct)
- Paper: https://arxiv.org/abs/2507.20534
- API: https://platform.moonshot.ai
