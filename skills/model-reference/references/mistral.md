# Mistral

> Last verified: 2026-07-16. This is a manual snapshot of Mistral's official model catalog, pricing, releases, and model cards. License and modalities are model-specific.

- Creator/API provider: Mistral AI
- API model catalog: <https://docs.mistral.ai/models/overview>
- Official weights: <https://huggingface.co/mistralai>

## Current General Models

| Lifecycle | API ID / alias | Official weight ID | Total / active params | Context | Modality | Input / output per MTok | License |
| --- | --- | --- | ---: | ---: | --- | ---: | --- |
| Current/open API + weights | `mistral-medium-3-5`; alias `mistral-medium-latest` | `mistralai/Mistral-Medium-3.5-128B` | 128B dense | 256K | Text + image input, text output | $1.50 / $7.50 | Modified MIT |
| Current/open API + weights | snapshot `mistral-small-2603`; alias `mistral-small-latest` | `mistralai/Mistral-Small-4-119B-2603` | 119B total; ~6-6.5B active/token | 256K | Text + image input, text output | $0.15 / $0.60 | Apache-2.0 |
| Current/open API + weights | snapshot `mistral-large-2512`; alias `mistral-large-latest` | `mistralai/Mistral-Large-3-675B-Instruct-2512` | 675B / 41B active | 256K | Text + image input, text output | $0.50 / $1.50 | Apache-2.0 |

Official cards did not publish one independent max-output value for every row in this audit. Do not copy 256K context into a max-output field.

## Specialized Current Lines

- Ministral 3: small/edge-oriented text model family; verify exact current IDs and license per size.
- Voxtral: audio understanding/transcription family; model IDs and audio duration limits are endpoint-specific.
- OCR 4: OCR/document model family, not a general chat substitute.
- Devstral/Leanstral and Labs IDs can have explicit short lifecycle dates; check the model catalog before use.
- Magistral remains a reasoning-oriented historical/current-specialized line but is not the current general flagship table above.

## Alias And Lifecycle Rules

- `*-latest` aliases roll forward. Use dated snapshots for reproducibility.
- Medium 3.5 is the v26.04 current/open model and became a current Le Chat/Vibe default in May 2026.
- Small 4 was released 2026-03-16.
- Large 3 was released 2025-12-02.
- Older Mistral Large 2, Small 3.x, Mixtral, and Mistral 7B are compatibility/open-weight choices, not current default API selections.

## Generation And License

- The old generic `General/Creative/Code/Precise` sampling table was not an official family contract and has been removed.
- Use the exact model card and Mistral sampling docs for temperature/top-p behavior.
- Mistral licenses vary across Apache-2.0, Modified MIT, Mistral Research License, and commercial API terms. Never label the whole vendor catalog “mostly Apache-2.0.”
- Benchmark tables in releases/model cards are Mistral vendor-reported and should be read with their exact harness.

## Official Sources

- Model catalog: <https://docs.mistral.ai/models/overview>
- Model selection: <https://docs.mistral.ai/models/model-selection-guide>
- Pricing: <https://docs.mistral.ai/deployment/laplateforme/pricing>, <https://mistral.ai/pricing/api/>
- Sampling: <https://docs.mistral.ai/models/best-practices/sampling>
- Medium 3.5 card: <https://docs.mistral.ai/models/model-cards/mistral-medium-3-5-26-04>
- Small 4 release/card: <https://mistral.ai/news/mistral-small-4/>, <https://huggingface.co/mistralai/Mistral-Small-4-119B-2603>
- Large 3 release/card: <https://mistral.ai/news/mistral-3/>, <https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512>
