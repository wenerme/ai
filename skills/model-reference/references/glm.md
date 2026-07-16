# GLM (Z.ai / 智谱)

> Last verified: 2026-07-16. This is a manual snapshot of Z.ai's direct API and official open weights. GLM text and GLM-V vision models are separate lines.

- Creator/API provider: Z.ai / Zhipu AI
- API docs: <https://docs.z.ai/guides/overview/overview>
- Official weights: <https://huggingface.co/zai-org>

## Current Text Models

| Lifecycle | API / weight identity | Params | Context / max output | Input / cached input / output per MTok | License |
| --- | --- | ---: | ---: | ---: | --- |
| Current API + weights; flagship | API `glm-5.2`; weight `zai-org/GLM-5.2` | 753B total; active count not published in fetched card | 1M / 128K | $1.40 / $0.26 / $4.40 | MIT |
| Previous API + weights generation | API `glm-5.1`; official weights | GLM-5-family model card specific | Check API page | $1.40 / $0.26 / $4.40 | Verify exact card |
| Previous API generation | API `glm-5` | GLM-5 report: 744B / 40B active | Check API page | $1 / $0.20 / $3.20 | Verify exact card |
| Available API + weights predecessor | API `glm-4.7`; weights `zai-org/GLM-4.7`, `...-FP8` | 355B / 32B active | 200K / 128K | $0.60 / $0.11 / $2.20 | Verify exact card |
| Lightweight/free API + weights | API `glm-4.7-flash`; weight `zai-org/GLM-4.7-Flash` | 30B / 3B active | 200K / 128K | Free on documented endpoint | Verify exact card |
| Fast hosted API service | API `glm-4.7-flashx`; no matching open weight listed | Not published | 200K / 128K | $0.07 / $0.01 / $0.40 | Proprietary API terms |

GLM-5.2 is the current flagship. GLM-4.7 remains available but must not be described as latest.

## GLM-5.2 Capabilities

- Text input/output, multiple thinking efforts, tool calling, streaming tool output, structured output, caching, and long-horizon coding/agent workflows.
- Official model card reports a 1M usable context and 128K provider output limit.
- MIT-licensed official weights are available at `zai-org/GLM-5.2`.
- Z.ai's benchmark tables are vendor-reported and include model/harness-specific context and token budgets; they are intentionally not reproduced as a universal ranking.

## Vision Models

GLM-V is a separate multimodal family. Examples include GLM-4.6V/4.6V-Flash and current GLM-5V API offerings. Verify their exact IDs, context, image/video constraints, and pricing on the vision model page. Do not imply that text-only `glm-5.2` or `glm-4.7` accepts vision input.

GLM-Image is an image generation/editing weight family; see `image-models.md`.

## Generation Settings

- Use the exact model/API page. GLM-Z1-32B or GLM-4-9B sampling values are not GLM-5.2 defaults.
- Z.ai's GLM-5.2 model card reports evaluation settings for specific benchmarks; those are not automatically recommended production defaults.

## Official Sources

- GLM-5.2 API guide: <https://docs.z.ai/guides/llm/glm-5.2>
- GLM-5.2 model card: <https://huggingface.co/zai-org/GLM-5.2>
- GLM-5.2 release: <https://z.ai/blog/glm-5.2>
- GLM pricing: <https://docs.z.ai/guides/overview/pricing>
- GLM-4.7 guide: <https://docs.z.ai/guides/llm/glm-4.7>
- Official weight organization: <https://huggingface.co/zai-org>
