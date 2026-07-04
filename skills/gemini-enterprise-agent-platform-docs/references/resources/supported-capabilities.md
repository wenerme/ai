The following table lists the Gemini model capabilities with ML
Processing support. ML Processing is not guaranteed for capabilities not
explicitly listed in the following table. These capabilities apply to
Gemini 2.5 Flash, Gemini 2.5 Pro, and their future versions.

For supported regional endpoints, see
[data residency](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/data-residency).

| Capability | Standard US and EU regions | Country-level regions (excluding US) | Multi-regions |
|---|---|---|---|
| Model-level capabilities, tools, and features ||||
| [Code execution](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/code-execution) |   |   |   |
| [Controllable parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/adjust-parameter-values) |   |   |   |
| [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) |   |   |   |
| [Structured output](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output) |   |   |   |
| [System instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instructions) |   |   |   |
| [Thinking budget](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking) |   |   |   |
| [Thought summaries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking) |   |   |   |
| Platform-level capabilities, tools, and features ||||
| [Batch prediction](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/batch-prediction-api) |   |   |   |
| [Chat completions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/overview) |   |   |   |
| [Security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) |   |   |   |
| [Context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) |   |   | Implicit caching only |
| [Standard PayGo (without usage tiers)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/standard-paygo) |   |   |   |
| [Standard PayGo with Usage Tiers](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/standard-paygo) |   |   |   |
| [Priority PayGo](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/standard-paygo) |   |   |   |
| [Flex PayGo](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/standard-paygo) |   |   |   |
| [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) |   |   |   |
| [Single Zone PT (SZPT)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/szpt) |   |   |
| [Grounding with Agent Platform Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-vertex-ai-search) |   |   |   |
| [Agent Platform RAG Engine](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-overview) | Restricted |   | Restricted |
| [Computer Use](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/computer-use) |   |   |   |

> [!NOTE]
> **Note:** Standard PayGo with Usage Tiers, Priority PayGo, and Flex PayGo support only the `global` endpoint.

For instructions on disabling unsupported capabilities in Gemini Enterprise Agent Platform,
see [organization policy constraints](https://docs.cloud.google.com/resource-manager/docs/organization-policy/overview).

## What's next

- To improve model performance by customizing models, see [Tune
  models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-models).
- To learn about regional data handling, see [Data
  residency](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/data-residency).
- To understand how to secure your generative AI applications, see [Security
  controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls).
- To discover and explore various models, see [Explore models in Model
  Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-garden/explore-models).
