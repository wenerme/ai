The [VPC-SC security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) and
CMEK are supported by Agent Platform RAG Engine. Data residency and AXT security controls aren't
supported.

This page introduces you to `RagManagedDb`, its underlying technology, and how
`RagManagedDb` is used in RAG Engine on Gemini Enterprise Agent Platform. In addition, this page
describes the different tiers that are available to tune performance, which
might impact your costs, and provides instructions for deleting your
RAG Engine data, which stops billing.

> [!IMPORTANT]
> **Important:** `RagManagedDb` is used by default and uses Spanner. Customers will be charged for the use of a Google-managed Spanner instance that's provisioned in a Google-tenant project using standard Spanner SKUs.

## Overview

RAG Engine on Gemini Enterprise Agent Platform uses `RagManagedDb`, which is an enterprise-ready,
fully-managed Google Spanner instance that's used for resource storage
by RAG Engine and is optionally available to be used as
the [vector database of
choice](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/use-ragmanageddb-with-rag) for your RAG corpora.

Through Spanner, RAG Engine offers a
consistent, highly available, and highly scalable database to support your
application. To learn more about Google Spanner, see
[Spanner](https://docs.cloud.google.com/spanner).

RAG Engine stores your RAG corpus and RAG file resource
metadata in `RagManagedDb`, regardless of your choice of vector database. Vector
databases are only used for storage and retrieval of embeddings. In addition to
resource storage, `RagManagedDb` can also be used to store and manage vector
representations of your documents. The vector database is then used to retrieve
relevant documents based on the document's semantic similarity to a given query.

## Manage tiers

RAG Engine on Gemini Enterprise Agent Platform lets you scale your `RagManagedDb` instance based
on your usage and performance requirements using a choice of two tiers, and
optionally, lets you delete your RAG Engine data using
a third tier.

The tier is a project-level setting that's available in the `RagEngineConfig`
resource that impacts RAG corpora using `RagManagedDb`. The following tiers
are available in `RagEngineConfig`:

- **Scaled tier**: This tier offers production-scale performance along with
  autoscaling functionality. It's suitable for customers with large amounts of
  data or performance-sensitive workloads. Internally, this tier sets the
  Spanner instance to autoscaling configuration with a minimum
  of 1 node (1,000 processing units) and a maximum of 10 nodes (10,000
  processing units).

- **Basic tier (default)**: This tier offers a cost-effective and low-compute
  tier, which might be suitable for some of the following cases:

  - Experimenting with `RagManagedDb`.
  - Small data size.
  - Latency-insensitive workload.
  - Use RAG Engine with only other vector databases.

  To offer the Basic tier, `RagManagedDb` sets the underlying
  Spanner instance to a fixed configuration of 100 processing
  units, which is equivalent to 0.1 nodes.
- **Unprovisioned tier** : This tier deletes the `RagManagedDb` and its
  underlying Spanner instance. The Unprovisioned tier disables
  the RAG Engine service and deletes your data held
  within this service regardless of the vector database used for your
  `RagCorpora`. This stops the billing of the service. For more information on
  billing, see \[RAG Engine on Gemini Enterprise Agent Platform
  billing\]rag-engine-billing).

  After the data is deleted, the data can't be recovered. To start usingRAG Engine again, you must update the tier by
  calling the `UpdateRagEngineConfig` API.

> [!NOTE]
> **Note:** The Enterprise tier from the `v1beta1` version was renamed to the Scaled tier.

## Get the project configuration

The following code samples demonstrate how to use the `GetRagEngineConfig` API
for each type of tier:

- [Version 1
  (v1)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations/getRagEngineConfig) API
  code samples.

- [v1beta1](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations/getRagEngineConfig) API
  code samples.

## Update the project configuration

The following code samples demonstrate how to use the `UpdateRagEngineConfig`
API for each type of tier:

- [Version 1
  (v1)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations/updateRagEngineConfig)
  API code samples.

- [v1beta1](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations/updateRagEngineConfig)
  API code samples.

## What's next

- To learn how to use the RAG API v1, the default, see [RAG API
  v1](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.ragCorpora).

- To learn how to use the RAG API v1beta1, see [RAG API
  v1beta1](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.ragCorpora).

- To learn more about `RagManagedDb` and how to manage your tier configuration
  as well as the RAG corpus-level retrieval strategy, see [Use RagManagedDb with
  RAG Engine on Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/use-ragmanageddb-with-rag).
