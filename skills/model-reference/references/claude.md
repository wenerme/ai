# Claude (Anthropic)

- Creator: Anthropic
- Docs: https://docs.anthropic.com/
- API: https://api.anthropic.com/

## Model Timeline

| Version           | Date    | Context | Output   | Input $/1M | Output $/1M | Notes                          |
| ----------------- | ------- | ------- | -------- | ---------- | ----------- | ------------------------------ |
| Claude Opus 4.6   | 2025-10 | 200K    | 32K      | $15        | $75         | 1M context available           |
| Claude Sonnet 4.6 | 2025-10 | 200K    | 16K      | $3         | $15         |                                |
| Claude Haiku 4.5  | 2025-10 | 200K    | 8K       | $0.80      | $4          |                                |
| Claude 4 Opus     | 2025-05 | 200K    | 32K      | $15        | $75         |                                |
| Claude 4 Sonnet   | 2025-05 | 200K    | 16K      | $3         | $15         |                                |
| Claude 3.7 Sonnet | 2025-02 | 200K    | 16K/128K | $3         | $15         | Extended thinking               |
| Claude 3.5 Haiku  | 2024-06 | 200K    | 8K       | $0.80      | $4          |                                |
| Claude 3.5 Sonnet | 2024-06 | 200K    | 8K       | $3         | $15         |                                |
| Claude 3 Opus     | 2024-03 | 200K    | 4K       | $15        | $75         |                                |
| Claude 3 Sonnet   | 2024-03 | 200K    | 4K       | $3         | $15         |                                |
| Claude 3 Haiku    | 2024-03 | 200K    | 4K       | $0.25      | $1.25       |                                |
| Claude 2.1        | 2023-11 | 200K    |          |            |             |                                |
| Claude 2          | 2023-07 | 100K    |          |            |             |                                |

## Model IDs

| Model            | API ID                         |
| ---------------- | ------------------------------ |
| Claude Opus 4.6  | `claude-opus-4-6`              |
| Claude Sonnet 4.6 | `claude-sonnet-4-6`           |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001`    |

## Recommended Usage

| Task             | Model                | Notes                        |
| ---------------- | -------------------- | ---------------------------- |
| Complex reasoning | Opus 4.6            | Best quality, slowest        |
| General coding   | Sonnet 4.6           | Best balance                 |
| Fast tasks       | Haiku 4.5            | Cheapest, fastest            |
| Extended thinking | Sonnet 4.6 / Opus   | Use `thinking` parameter     |

## Key Features

- **Extended thinking**: Available on Sonnet 3.7+ and Opus 4+. Up to 128K thinking tokens.
- **Tool use**: Native function calling support
- **Vision**: All Claude 3+ models support image input
- **Prompt caching**: 90% discount on cached input tokens
- **Batches API**: 50% discount for async processing

## References

- https://docs.anthropic.com/en/docs/about-claude/models
- https://www.anthropic.com/pricing
