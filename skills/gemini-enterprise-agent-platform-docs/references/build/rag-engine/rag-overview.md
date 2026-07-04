The [VPC-SC security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) and
CMEK are supported by Agent Platform RAG Engine. Data residency and AXT security controls aren't
supported.

If you use a RAG Engine-managed Spanner
instance as a vector database in a location that is GA, then Google Cloud
bills you for that Spanner instance. For more information, see
[RAG Engine on Gemini Enterprise Agent Platform billing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-engine-billing).

You must be added to the allowlist to access
RAG Engine in `us-central1`,
`us-east1`, and `us-east4`. For users with existing
projects, there is no impact. For users with new projects, you can try other
regions.

This page describes what RAG Engine is and how it
works.

| **Description** | **Console** |
|---|---|
| To learn how to use the Vertex AI SDK to run RAG Engine on Gemini Enterprise Agent Platform tasks, see the [RAG quickstart for Python](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-quickstart). | [Try RAG Engine](https://console.cloud.google.com/agent-platform/rag) |

## Overview

RAG Engine, a component of Gemini Enterprise Agent Platform,
facilitates Retrieval-Augmented Generation (RAG).
RAG Engine is also a data framework for developing
context-augmented large language model (LLM) applications. Context augmentation
occurs when you apply an LLM to your data. This implements retrieval-augmented
generation (RAG).

A common problem with LLMs is that they don't understand private knowledge, that
is, your organization's data. With RAG Engine, you can
enrich the LLM context with additional private information, so that the model
can reduce hallucinations and answer questions more accurately.

By combining additional knowledge sources with the existing knowledge that LLMs
have, a better context is provided. The improved context along with the query
enhances the quality of the LLM's response.

The following image illustrates the key concepts for understanding
RAG Engine.

![Agent Platform RAG key
concepts](https://docs.cloud.google.com/static/vertex-ai/images/Vertex-RAG-Diagram.png)

These concepts are listed in the order of the retrieval-augmented generation
(RAG) process.

1. **Data ingestion**: Ingest data from different data sources. For example,
   local files, Cloud Storage, and Google Drive.

2. [**Data transformation**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/fine-tune-rag-transformations):
   Conversion of the data in preparation for indexing. For example, data is
   split into chunks.

3. [**Embedding**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings):
   Numerical representations of words or pieces of text. These numbers capture
   the semantic meaning and context of the text. Similar or related words or
   text tend to have similar embeddings, which means they are closer together in
   the high-dimensional vector space.

4. **Data indexing** : RAG Engine creates an index
   called a [corpus](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/manage-your-rag-corpus#corpus-management). The
   index structures the knowledge base so it's optimized for searching. For
   example, the index is like a detailed table of contents for a massive
   reference book.

5. **Retrieval**: When a user asks a question or provides a prompt, the retrieval
   component in RAG Engine searches through its knowledge
   base to find information that is relevant to the query.

6. **Generation** : The retrieved information becomes the context added to the
   original user query as a guide for the generative AI model to generate
   factually
   [grounded](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/overview) and
   relevant responses.

## Supported regions

RAG Engine is supported in the following regions:

| Region | Location | Description | Launch stage |
|---|---|---|---|
| `us-central1` | Iowa | `v1` and `v1beta1` versions are supported. | Allowlist, GA |
| `us-east4` | Virginia | `v1` and `v1beta1` versions are supported. | Allowlist, GA |
| `us-east1` | Moncks Corner, SC | `v1` and `v1beta1` versions are supported. | Allowlist, Preview |
| `europe-west3` | Frankfurt, Germany | `v1` and `v1beta1` versions are supported. | GA |
| `europe-west4` | Eemshaven, Netherlands | `v1` and `v1beta1` versions are supported. | GA |
| `asia-east1` | Taiwan | `v1` and `v1beta1` versions are supported. | Preview |
| `asia-northeast1` | Tokyo | `v1` and `v1beta1` versions are supported. | Preview |
| `asia-northeast3` | Seoul | `v1` and `v1beta1` versions are supported. | Preview |
| `asia-south1` | Mumbai | `v1` and `v1beta1` versions are supported. | Preview |
| `asia-southeast1` | Singapore | `v1` and `v1beta1` versions are supported. | Preview |
| `europe-central2` | Warsaw | `v1` and `v1beta1` versions are supported. | Preview |
| `europe-north1` | Finland | `v1` and `v1beta1` versions are supported. | Preview |
| `europe-southwest1` | Madrid | `v1` and `v1beta1` versions are supported. | Preview |
| `europe-west1` | Belgium | `v1` and `v1beta1` versions are supported. | Preview |
| `europe-west2` | London | `v1` and `v1beta1` versions are supported. | Preview |
| `europe-west6` | Zürich | `v1` and `v1beta1` versions are supported. | Preview |
| `europe-west8` | Milan | `v1` and `v1beta1` versions are supported. | Preview |
| `europe-west9` | Paris | `v1` and `v1beta1` versions are supported. | Preview |
| `us-east5` | Columbus, OH | `v1` and `v1beta1` versions are supported. | Preview |
| `us-south1` | Dallas, TX | `v1` and `v1beta1` versions are supported. | Preview |
| `us-west1` | Oregon | `v1` and `v1beta1` versions are supported. | Preview |
| `us-west4` | Las Vegas, NV | `v1` and `v1beta1` versions are supported. | Preview |

- `us-central1`, `us-east1`, and `us-east4` are changed to `Allowlist`. If you'd like to experiment with RAG Engine, try other regions.

## Delete RAG Engine

For more information about deleting a RAG Engine, see
the following:

- Version 1 (v1) API
  [parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations/updateRagEngineConfig)

- v1beta1 API
  [parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations/updateRagEngineConfig)

## What's next

- To learn how to use the Vertex AI SDK to run
  RAG Engine on Gemini Enterprise Agent Platform tasks, see [RAG quickstart for
  Python](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-quickstart).

- To learn about grounding, see [Grounding
  overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/overview).

- To learn more about the responses from RAG, see
  [`GenerateContentResponse`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/GenerateContentResponse).
