# Kimi (Moonshot AI)

> Last verified: 2026-07-16. This is a manual snapshot of Moonshot's API docs and official weight releases. Recheck hosted prices and fixed generation parameters before production use.

- Creator/API provider: Moonshot AI
- API: <https://platform.moonshot.ai/>
- Official weights: <https://huggingface.co/moonshotai>

## Current Models

| Lifecycle | API/weight identity | Role | Context | Input pricing per MTok: cache hit / miss | Output per MTok |
| --- | --- | --- | ---: | ---: | ---: |
| Current API + weights; coding/agent | API `kimi-k2.7-code`; high-speed `kimi-k2.7-code-highspeed`; weight `moonshotai/Kimi-K2.7-Code` | Coding, agents, tools, multimodal | 256K / 262,144 | $0.19 / $0.95 | $4 |
| Current API + weights; general | API `kimi-k2.6`; weight `moonshotai/Kimi-K2.6` | Writing, analysis, conversation, general tasks | Check exact endpoint/model card | $0.16 / $0.95 | $4 |
| Available API + weights; predecessor | API/weight `kimi-k2.5` / `moonshotai/Kimi-K2.5` | General multimodal reasoning | 256K | $0.10 / $0.60 | $3 |

Kimi K2.7 Code is the latest coding/agent line; K2.6 is the current general model. K2.5 remains available but is no longer latest.

## K2.7 Code Specifications

| Field | Official value |
| --- | ---: |
| Total parameters | ~1T |
| Active parameters per token | 32B |
| Vision encoder | MoonViT, ~400M |
| Input | Text, image, video |
| Output | Text with thinking/tool use |
| API default `max_tokens` | 32,768; this is not documented as the absolute model output limit |

Full weight residency follows total parameters, not 32B active parameters.

## Required Generation Settings

K2.7 Code's official API accepts a constrained generation configuration:

| Parameter | Required value |
| --- | ---: |
| `temperature` | 1.0 |
| `top_p` | 0.95 |
| `n` | 1 |
| presence/frequency penalties | 0 |

Other values can be rejected. For K2.5, the official model card recommends `temperature=1.0` in thinking mode and `0.6` in instant mode, with `top_p=0.95`.

The old family-wide `real_temp = request_temp * 0.6` rule was removed; it is not a current Moonshot API contract.

## License And Benchmarks

- Moonshot releases K2.x weights, but license terms can differ by checkpoint. Do not label the whole family “Modified MIT” without reading the selected model card/license.
- Moonshot benchmark tables are vendor-reported. Competitor rows can include Moonshot re-runs and are not a universal cross-vendor ranking.

## Official Sources

- Platform and docs: <https://platform.moonshot.ai/>, <https://platform.moonshot.ai/docs/guide>, <https://platform.moonshot.ai/docs/api/chat>
- K2.7 Code release: <https://www.kimi.com/resources/kimi-k2-7-code>
- K2.7 Code model card: <https://huggingface.co/moonshotai/Kimi-K2.7-Code>
- K2.5 repository: <https://github.com/MoonshotAI/Kimi-K2.5>
