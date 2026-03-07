# MiniMax

- Creator: MiniMax AI (上海)
- GitHub: [MiniMax-AI](https://github.com/MiniMax-AI)
- HuggingFace: [MiniMaxAI](https://huggingface.co/MiniMaxAI)
- API: https://platform.minimax.io/

## Model Timeline

| Version          | Date    | Total / Active   | Context | Notes                                 |
| ---------------- | ------- | ---------------- | ------- | ------------------------------------- |
| MiniMax M2.5     | 2026-02 | 230B / 10B       | 128K    | Full-stack coding + Agent, fastest    |
| MiniMax M2.1     | 2026-02 | 230B / 10B       | 128K    | Multilingual coding, tool use         |
| MiniMax M2       | 2025-12 | 230B / 10B       | 128K    | MoE, Coding + Agent optimized         |
| MiniMax M1       | 2025    | 456B / 45.9B     | 1M      | Reasoning model (based on Text-01)    |
| MiniMax Text-01  | 2025-01 | 456B / 45.9B     | 1M/4M   | Lightning Attention, general purpose  |

## Architecture

| Spec             | M2 Series          | Text-01 / M1       |
| ---------------- | ------------------- | ------------------- |
| Total Parameters | 230B                | 456B                |
| Active Params    | **10B** per token   | 45.9B per token     |
| Architecture     | Sparse MoE          | MoE + Lightning Attention |
| Context Window   | 128K                | Train 1M / Infer 4M |
| Thinking Mode    | Interleaved `<think>` | -                 |
| License          | Modified MIT        | -                   |

Key design: M2 traded ultra-long context for **smallest active params** (10B) among frontier models, optimized for fast Agent loops.

## Recommended Sampling Parameters

| Parameter   | Value |
| ----------- | ----- |
| Temperature | 1.0   |
| TopP        | 0.95  |
| TopK        | 40    |

IMPORTANT: Must preserve `<think>` content in conversation history for full performance.

## Benchmarks

### M2.5 (Latest)

| Benchmark            | M2.5   | M2.1   | Claude Opus 4.5 | Gemini 3 Pro |
| -------------------- | ------ | ------ | --------------- | ------------ |
| SWE-bench Verified   | 80.2   | 74.0   | 80.9            | 78.0         |
| Multi-SWE-bench      | 51.3   | 49.4   | 50.0            | 42.7         |
| AIME 2025            | 86.3   | 83.0   | 91.0            | 96.0         |
| GPQA Diamond         | 85.2   | 83.0   | 87.0            | 91.0         |
| BrowseComp (ctx)     | 76.3   | 62.0   | 57.8            | 59.2         |

M2.5 efficiency: SWE-bench avg 22.8 min (vs M2.1 31.3 min, **37% faster**), cost ~1/10 of Claude Opus 4.5.

### M2.1 Coding

| Benchmark              | M2.1   | M2     | Improvement |
| ---------------------- | ------ | ------ | ----------- |
| SWE-bench Verified     | 74.0   | 69.4   | +4.6        |
| Multi-SWE-bench        | 49.4   | 36.2   | +13.2       |
| SWE-bench Multilingual | 72.5   | 56.5   | +16.0       |
| VIBE Average           | 88.6   | 67.5   | +21.1       |
| Toolathlon             | 43.5   | 16.7   | +163%       |

### M2.1 General

| Benchmark       | Score  |
| --------------- | ------ |
| MMLU-Pro        | 88.0   |
| GPQA Diamond    | 83.0   |
| AIME 2025       | 83.0   |
| LiveCodeBench   | ~83    |

### Arena

- Arena ELO: 1385-1399
- Top 5 open-weight coding models

## Pricing

| Variant        | Speed    | Input $/M | Output $/M |
| -------------- | -------- | --------- | ---------- |
| M2.5 Lightning | 100 TPS  | $0.30     | $2.40      |
| M2.5 Standard  | 50 TPS   | $0.60     | $1.20      |

## Key Features

- **Interleaved Thinking**: `<think>` tags inserted during generation (not prefix-only like DeepSeek R1)
- **CISPO**: RL algorithm designed for MoE stability
- **Forge Framework**: Agent-native RL with ~40x training speedup
- **Full-stack** (M2.5): Web, Android, iOS, Windows, Backend
- **200K+ real-world training environments** for coding RL

## References

- [MiniMax-M2.5](https://huggingface.co/MiniMaxAI/MiniMax-M2.5)
- [MiniMax-M2.1](https://huggingface.co/MiniMaxAI/MiniMax-M2.1)
- [MiniMax-M2](https://huggingface.co/MiniMaxAI/MiniMax-M2)
- Text-01 paper: https://arxiv.org/abs/2501.08313
- M1 paper: https://arxiv.org/abs/2506.13585
