# GPT / OpenAI

- Creator: OpenAI
- Docs: https://platform.openai.com/docs
- HuggingFace (OSS): [openai](https://huggingface.co/openai)

## Proprietary Models

### GPT-5 Family

| Version          | Date    | Context | Output | Notes                                     |
| ---------------- | ------- | ------- | ------ | ----------------------------------------- |
| GPT-5.4          | 2026-03 | 1.05M   | 128K   | Flagship, Computer Use, Tool Search       |
| GPT-5.3 Codex    | 2026-02 | -       | -      | Coding specialized                        |
| GPT-5.3 Instant  | 2026-03 | -       | -      | Fast variant                              |
| GPT-5.2          | 2025-12 | 400K    | -      | Thinking tiers (Instant/Thinking/Pro)     |
| GPT-5.0          | 2025-08 | -       | -      | First unified o-series + GPT architecture |

#### GPT-5.4 Specs

- **Context**: 1,050,000 tokens
- **Max output**: 128,000 tokens
- **Reasoning tiers**: none, low, medium, high, xhigh
- **Native capabilities**: Computer Use, Tool Search, original-resolution images
- **Token efficiency**: 18-47% more efficient than GPT-5.2
- **Pricing**: $2.50/M input, $15.00/M output

#### GPT-5.4 Benchmarks

| Benchmark            | Score  | Notes                          |
| -------------------- | ------ | ------------------------------ |
| AIME 2025            | 100%   | First perfect score            |
| GPQA Diamond         | 89.4%  | PhD-level science              |
| SWE-bench Verified   | 74.9%  |                                |
| OSWorld-Verified     | 75.0%  | Exceeds human baseline (72.4%) |
| ARC-AGI-2            | 52.9%  | 3.1x over GPT-4 era           |
| HealthBench          | 96.6%  | Medical accuracy               |

### Earlier Models

| Version          | Date    | Context | Notes                         |
| ---------------- | ------- | ------- | ----------------------------- |
| Horizon Alpha    | 2025-07 | 256K    | Frontier reasoning            |
| o3, o3-mini      | 2025-01 | 200K    | Reasoning                     |
| GPT-4.1          | 2025-04 | 1M      | Also mini, nano variants      |
| ChatGPT 4.5      | 2025-02 | 128K    |                               |
| o1               | 2024-12 | 200K    | Reasoning                     |
| GPT-4o           | 2024-05 | 128K    | Text, audio, image            |
| GPT-4o mini      | 2024-07 | 128K    | Cost-efficient                |
| GPT-4 Turbo      | 2023-11 | 128K    | Vision support                |
| GPT-4            | 2023-03 | 8K/32K  | Image input                   |
| GPT-3.5 Turbo    | 2023-03 | 4K/16K  |                               |

## Open Source Models (GPT OSS)

| Model        | Date    | Params              | Context | Notes                    |
| ------------ | ------- | ------------------- | ------- | ------------------------ |
| gpt-oss-120b | 2025-08 | 117B (5.1B active)  | 128K    | MoE, Reasoning, Tools   |
| gpt-oss-20b  | 2025-08 | 21B (3.6B active)   | 128K    | MoE, Reasoning, Tools   |

### GPT OSS Architecture

| Spec             | gpt-oss-120b      | gpt-oss-20b        |
| ---------------- | ------------------ | ------------------- |
| Hidden Size      | 2880               | 2880                |
| Attention        | GQA + Sparse       | GQA + Sparse        |
| Heads (Q/Group)  | 64 / 8             | 64 / 8              |
| Activation       | SwiGLU             | SwiGLU              |
| Head Size        | 64                 | 64                  |
| Layers           | 36                 | 24                  |
| Experts          | 128 / 4 active     | 32 / 4 active       |
| Vocab Size       | 201,088            | 201,088             |
| Data Type        | MXFP4 / bf16       | MXFP4 / bf16        |
| Tokenizer        | o200k_harmony (BPE) | o200k_harmony (BPE) |

## Pricing

| Model        | Input $/1M | Output $/1M | Notes            |
| ------------ | ---------- | ----------- | ---------------- |
| GPT-5.4      | $2.50      | $15.00      | Current flagship |
| GPT-4.1      | $2.00      | $8.00       |                  |
| GPT-4.1 mini | $0.40      | $1.60       |                  |
| GPT-4.1 nano | $0.10      | $0.40       |                  |
| GPT-4o       | $2.50      | $10.00      |                  |
| GPT-4o mini  | $0.15      | $0.60       |                  |
| o3           | $2.00      | $8.00       | Reasoning tokens |
| o3-mini      | $1.10      | $4.40       |                  |

## Key Features

- **Responses API**: Newer stateful API (replaces Chat Completions for new apps)
- **Reasoning tiers** (GPT-5+): none/low/medium/high/xhigh compute effort levels
- **Computer Use** (GPT-5.4): Native desktop environment control
- **Tool Search** (GPT-5.4): Dynamic API definition retrieval
- **Tool use**: Function calling, code interpreter, file search
- **Structured outputs**: JSON schema enforcement
- **Vision**: GPT-4o+, image input; GPT-5.4 original-resolution support
- **Audio**: GPT-4o+ native audio input/output
- **Long-horizon agents** (GPT-5.4): Multi-hour workflow context maintenance

## References

- [openai/gpt-oss-120b](https://huggingface.co/openai/gpt-oss-120b)
- [openai/gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b)
- https://platform.openai.com/docs/models
