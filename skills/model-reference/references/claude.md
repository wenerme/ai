# Claude (Anthropic)

> Last verified: 2026-07-16. This is a manual snapshot of Anthropic's direct API. Recheck aliases, temporary pricing, and lifecycle before production use.

- Creator/API provider: Anthropic
- API: <https://api.anthropic.com/>
- Model docs: <https://docs.anthropic.com/en/docs/about-claude/models/overview.md>

## Current Models

| Lifecycle | Model / API ID | Context | Max output | Input / output per MTok | Knowledge cutoff |
| --- | --- | ---: | ---: | ---: | --- |
| GA | `claude-fable-5` | 1M | 128K | $10 / $50 | Reliable 2026-01; training 2026-01 |
| GA | `claude-opus-4-8` | 1M | 128K | $5 / $25 | Reliable 2026-01; training 2026-01 |
| GA | `claude-sonnet-5` | 1M | 128K | $2 / $10 through 2026-08-31; then $3 / $15 | Reliable 2026-01; training 2026-01 |
| GA | `claude-haiku-4-5-20251001`; alias `claude-haiku-4-5` | 200K | 64K | $1 / $5 | Reliable 2025-02; training 2025-07 |
| Limited availability | `claude-mythos-5` | Same published limits as Fable 5 | Same as Fable 5 | $10 / $50 | Same published cutoff as Fable 5 |

Use an exact snapshot ID when behavior must remain pinned. Moving aliases can be repointed during their supported lifecycle.

## Still Active, Older Generation

These remain callable according to the official lifecycle page but are not the default starting point for new work:

- `claude-opus-4-7`
- `claude-opus-4-6`
- `claude-opus-4-5-20251101`
- `claude-sonnet-4-6`
- `claude-sonnet-4-5-20250929`

Verify their exact snapshot/alias, limits, pricing, and retirement date before choosing them.

## Thinking And Capabilities

- Fable 5, Opus 4.8, and Sonnet 5 use adaptive thinking. Fable 5 always has adaptive thinking enabled.
- The newest models do not use the legacy manual extended-thinking token budget in the same way as older Claude models.
- Haiku 4.5 continues to support extended thinking.
- Current Claude models support text and image input, text output, tool use, prompt caching, and multilingual use.
- Model and feature compatibility can differ across the Anthropic API, Amazon Bedrock, and Google Vertex AI. This table describes Anthropic's direct API unless stated otherwise.

## Pricing Qualifiers

Standard token prices above exclude cache and batch adjustments:

| Operation | Relative price |
| --- | ---: |
| 5-minute cache write | 1.25x standard input |
| 1-hour cache write | 2x standard input |
| Cache hit/read | 0.1x standard input |
| Message Batches API | Typically 50% of standard input/output token prices |

Long-context and feature-specific charges can have additional qualifiers. Recheck the pricing page for the selected model and endpoint.

## Lifecycle

- `claude-mythos-preview` is invitation-only preview and is scheduled to retire on 2026-07-21; migrate to Mythos 5 where available.
- Claude Opus 4.1 is deprecated and scheduled to retire on 2026-08-05.
- Claude Opus 4, Sonnet 4, Sonnet 3.7, Claude 3/3.5 Haiku, Claude 3/3.5 Sonnet, Claude 3 Opus/Sonnet, and Claude 2.x are retired or otherwise not current choices on the direct API.

Do not present a timeline entry as an available model without checking the lifecycle page.

## Official Sources

- Models and exact limits: <https://docs.anthropic.com/en/docs/about-claude/models/overview.md>
- Pricing and cache/batch multipliers: <https://docs.anthropic.com/en/docs/about-claude/pricing>
- Deprecations and retirement dates: <https://docs.anthropic.com/en/docs/about-claude/model-deprecations>
