# GPT / OpenAI

> Last verified: 2026-07-16. This is a manual snapshot of OpenAI's public API and official open-weight releases. Recheck aliases, snapshots, pricing, and deprecations before production use.

- Creator/API provider: OpenAI
- API model catalog: <https://developers.openai.com/api/docs/models>
- Official open weights: <https://github.com/openai/gpt-oss>

## GPT-5.6 API Family

| Lifecycle | API ID / alias | Positioning | Context | Max output | <=272K input: input / cached input / output per MTok | Knowledge cutoff |
| --- | --- | --- | ---: | ---: | ---: | --- |
| Production | `gpt-5.6-sol`; alias `gpt-5.6` routes to Sol | Flagship capability | 1,050,000 | 128,000 | $5 / $0.50 / $30 | 2026-02-16 |
| Production | `gpt-5.6-terra` | Balanced quality and cost | 1,050,000 | 128,000 | $2.50 / $0.25 / $15 | 2026-02-16 |
| Production | `gpt-5.6-luna` | Economical, high-volume workloads | 1,050,000 | 128,000 | $1 / $0.10 / $6 | 2026-02-16 |

GPT-5.6 supports reasoning effort `none`, `low`, `medium`, `high`, `xhigh`, and `max`. Pro mode is selected with `reasoning.mode: "pro"`; it is not a separate model slug.

Key GPT-5.6 capabilities include image input, original image detail, function/tool calling, computer use, tool search, persisted reasoning, explicit prompt caching, programmatic tool calling, and Responses API multi-agent beta. Use the Responses API for new reasoning/tool workflows unless a compatibility requirement dictates Chat Completions.

Reasoning tokens are billed as output tokens. Cache writes are 1.25x uncached input; cache reads use the cached-input price. Batch is generally about 50% of standard token pricing and Priority is generally higher-priced; verify the current pricing table.

For prompts with more than 272K input tokens, OpenAI prices the **full request** at 2x input and 1.5x output. Apply that tier before comparing long-context costs across Sol, Terra, and Luna.

## Previous GPT-5 Generations

| Model | Official identity | Lifecycle note |
| --- | --- | --- |
| GPT-5.5 | `gpt-5.5`; snapshot `gpt-5.5-2026-04-23` | Released 2026-04-23; superseded as default recommendation by GPT-5.6 |
| GPT-5.5 Pro | `gpt-5.5-pro` | Responses-only high-compute model; superseded for new selection by GPT-5.6 pro mode |
| GPT-5.4 | See current model catalog for snapshots | Older production generation; do not label current flagship |
| GPT-5.3 Codex | `gpt-5.3-codex` | Specialized coding model still listed; Codex defaults are moving to GPT-5.6 |

ChatGPT product labels such as “Instant” are not automatically public API model IDs. Only use IDs listed in the API catalog.

## Reasoning And Legacy Lifecycle

- `o3` and `o3-pro` can remain available but GPT-5.x is the starting point for new reasoning applications.
- `o4-mini`, `o3-mini`, and `o1-2024-12-17` are deprecated and scheduled to shut down on 2026-10-23.
- Legacy deep-research and search-preview model IDs have separate 2026 lifecycle dates; check the deprecations page before use.
- `gpt-5-codex` and `codex-mini-latest` are deprecated.
- `Horizon Alpha` is not a current official production API model and is intentionally excluded.

## Open-Weight GPT-OSS

GPT-OSS model names are weight repository IDs, not OpenAI hosted API IDs.

| Official weight ID | Total / active params | Context | License | Notes |
| --- | ---: | ---: | --- | --- |
| `openai/gpt-oss-120b` | 117B / 5.1B active | 128K | Apache-2.0 | MoE reasoning/tool-use model; Harmony format |
| `openai/gpt-oss-20b` | 21B / 3.6B active | 128K | Apache-2.0 | Smaller MoE reasoning/tool-use model; Harmony format |

OpenAI does not assign hosted token API pricing to these weights. Runtime cost depends on the selected inference provider or self-hosted deployment.

## Official Sources

- Current model catalog: <https://developers.openai.com/api/docs/models>
- GPT-5.6 guide: <https://developers.openai.com/api/docs/guides/latest-model>
- GPT-5.6 Sol: <https://developers.openai.com/api/docs/models/gpt-5.6-sol>
- GPT-5.6 Terra: <https://developers.openai.com/api/docs/models/gpt-5.6-terra>
- GPT-5.6 Luna: <https://developers.openai.com/api/docs/models/gpt-5.6-luna>
- Pricing: <https://developers.openai.com/api/docs/pricing>
- Deprecations: <https://developers.openai.com/api/docs/deprecations>
- Codex model guidance: <https://developers.openai.com/codex/models>
- GPT-OSS repository and model cards: <https://github.com/openai/gpt-oss>, <https://huggingface.co/openai/gpt-oss-120b>, <https://huggingface.co/openai/gpt-oss-20b>
