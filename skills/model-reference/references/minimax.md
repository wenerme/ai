# MiniMax

> Last verified: 2026-07-16. This is a manual snapshot of MiniMax official API/model pages and weight repositories. Recheck current discounts, service tiers, and weight licenses before production use.

- Creator/API provider: MiniMax AI
- API docs: <https://platform.minimax.io/docs/guides/models-intro>
- Official weights: <https://huggingface.co/MiniMaxAI>

## Current API And Weight Families

| Lifecycle | API ID / weight ID | Total / active params | Context / output | Role |
| --- | --- | ---: | --- | --- |
| Current API + weights | `MiniMax-M3`; `MiniMaxAI/MiniMax-M3` | ~428B / 23B active | 1M context; max output not confirmed in this snapshot | Native multimodal, coding, agentic |
| Current API generation | `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` | Check official model card | Check current API page | Coding/agent family |
| Legacy API + weights | `MiniMax-M2.5`, `MiniMax-M2.5-highspeed`; `MiniMaxAI/MiniMax-M2.5` | 230B / 10B active | Model/API specific | Coding/agent family |
| Legacy API + weights | `MiniMax-M2.1`, `...-highspeed`; `MiniMaxAI/MiniMax-M2.1` | 230B / 10B active | Model/API specific | Coding/tool use |
| Legacy API + weights | `MiniMax-M2`; `MiniMaxAI/MiniMax-M2` | 230B / 10B active | 200K context / 128K max output | MoE coding/agent |

M3 is the latest mainline. M2.5 is not latest and should not title a “Latest” section.

## Generation Settings

The official M2-family repository recommends:

| Parameter | Value |
| --- | ---: |
| Temperature | 1.0 |
| Top-p | 0.95 |
| Top-k | 40 |

Do not apply M2 settings to M3 unless the M3 model card/API docs explicitly match them. Preserve model reasoning/thinking history according to the selected endpoint's documented continuation contract.

## Pricing And License

Current pay-as-you-go pricing displayed for M3 after MiniMax's stated permanent 50% discount:

| Input length / service tier | Input | Output | Cache read |
| --- | ---: | ---: | ---: |
| <=512K / Standard | $0.30/MTok | $1.20/MTok | $0.06/MTok |
| >512K / Standard | $0.60/MTok | $2.40/MTok | $0.12/MTok |
| <=512K / Priority | $0.45/MTok | $1.80/MTok | $0.09/MTok |
| >512K / Priority | $0.90/MTok | $3.60/MTok | $0.18/MTok |

Current M2.7 pay-as-you-go rows:

| API ID | Input | Output | Cache read | Cache write |
| --- | ---: | ---: | ---: | ---: |
| `MiniMax-M2.7` | $0.30/MTok | $1.20/MTok | $0.06/MTok | $0.375/MTok |
| `MiniMax-M2.7-highspeed` | $0.60/MTok | $2.40/MTok | $0.06/MTok | $0.375/MTok |

M2.5, M2.1, and M2 are listed as legacy on the current pricing page. Their historical standard rows remain $0.30 input, $1.20 output, $0.03 cache read, and $0.375 cache write per MTok; high-speed variants have separate rates.

- M2.5 uses MiniMax's custom `LICENSE-MODEL`, not Modified MIT.
- M3 license was not confirmed in the fetched primary text; read the selected official weight license before deployment.
- MiniMax benchmark and speed/cost comparisons are vendor-reported and are intentionally not copied into a cross-model ranking.

## Official Sources

- MiniMax M3: <https://www.minimax.io/models/text/m3>, <https://github.com/MiniMax-AI/MiniMax-M3/>
- Model catalog: <https://platform.minimax.io/docs/guides/models-intro>
- Anthropic-compatible text API IDs: <https://platform.minimax.io/docs/api-reference/text-anthropic-api>
- Pay-as-you-go pricing: <https://platform.minimax.io/docs/guides/pricing-paygo>
- M2 repository: <https://github.com/MiniMax-AI/MiniMax-M2>
- M2.5 license: <https://github.com/MiniMax-AI/MiniMax-M2.5/blob/main/LICENSE-MODEL>
