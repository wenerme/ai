Gemini Enterprise Agent Platform implements Google Cloud security controls to help secure your
models and training data.

> [!NOTE]
> **Note:** Security controls are not supported for preview models.

The following table lists the security controls available for Generative AI features:

|   | [Data residency (at rest)](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/data-residency) | [Customer-managed encryption keys (CMEK)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/cmek) | [VPC Service Controls (VPC-SC)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-service-controls) | [Access Transparency (AXT)](https://docs.cloud.google.com/assured-workloads/access-transparency/docs/overview) |
| **Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)** |||||
|---|---|---|---|---|
| Online prediction | Yes | Yes | Yes | Yes |
| Batch | Yes | No | Yes | No |
| Context caching | Yes | Yes | Yes | Yes |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch | Yes | No | Yes | No |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch | Yes | No | Yes | No |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch | Yes | Yes | Yes | No |
| Tuning | Yes | Yes | Yes | No |
| Context caching | Yes | Yes | Yes | Yes |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch | Yes | No | Yes | No |
| Context caching | Yes | Yes | Yes | Yes |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch | Yes | No | Yes | No |
| Tuning | Yes | Yes | Yes | No |
| Context caching | Yes | Yes | Yes | Yes |
| RAG Engine | No | Yes | Yes | No |
| Grounding with Google Search and Grounding with Google Maps | No | No | No | No |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch | Yes | No | Yes | No |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch | Yes | No | Yes | No |
| Tuning | Yes | Yes | Yes | No |
| Context caching | Yes | Yes | Yes | Yes |
| RAG Engine | No | Yes | Yes | No |
| Grounding with Google Search and Grounding with Google Maps | No | No | No | No |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch | Yes | No | Yes | No |
| Tuning | Yes | Yes | Yes | No |
| Context caching | Yes | Yes | Yes | Yes |
| RAG Engine | No | Yes | Yes | No |
| Grounding with Google Search and Grounding with Google Maps | No | No | No | No |
| Online prediction | Yes | No | Yes | Yes |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch | Yes | No | Yes | No |
| Tuning | Yes | Yes | Yes | No |
| Context caching | Yes | Yes | Yes | Yes |
| RAG Engine | No | Yes | Yes | No |
| Grounding with Google Search and Grounding with Google Maps | No | No | No | No |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch | Yes | No | Yes | No |
| Tuning | Yes | Yes | Yes | No |
| RAG Engine | No | Yes | Yes | No |
| Context caching | Yes | Yes | Yes | Yes |
| Grounding with Google Search and Grounding with Google Maps | No | No | No | No |
| Online prediction | No | No | Yes | No |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch prediction | Yes | Yes | Yes | Yes |
| Tuning | Yes | Yes | Yes | Yes |
| Online prediction | Yes | Yes | Yes | Yes |
| Batch prediction | Yes | Yes | Yes | Yes |
| Tuning | Yes | Yes | Yes | Yes |
| RAG Engine | No | Yes | Yes | No |
| Online prediction | Yes | No | No | Yes |
| Online prediction | Yes | Yes | Yes | Yes |

Prompt logging for Partner and Open Models (MaaS) is turned off by default and adheres to the
[Agent Platform Zero Data Retention](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/zero-data-retention)
policy.
