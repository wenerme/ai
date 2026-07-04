The [VPC-SC security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) and
CMEK are supported by Agent Platform RAG Engine. Data residency and AXT security controls aren't
supported.

After a document is ingested, RAG Engine on Gemini Enterprise Agent Platform runs a set of
transformations to prepare the data for indexing. You can control your use cases
using the following parameters:

| Parameter | Description |
|---|---|
| `chunk_size` | When documents are ingested into an index, they're split into chunks. The `chunk_size` parameter (in tokens) specifies the size of the chunk. The default chunk size is 1,024 tokens. |
| `chunk_overlap` | By default, documents are split into chunks with a certain amount of overlap to improve relevance and retrieval quality. The default chunk overlap is 256 tokens. |

A smaller chunk size means the embeddings are more precise. A larger chunk size
means that the embeddings might be more general but might miss specific details.

For example, if you convert 1,000 words into an embedding array that was meant
for 200 words, you might lose details. The embedding capacity is fixed for each
chunk. A large chunk of text may not fit into a small-window model.

## What's next

- Use [Document AI layout parser with
  RAG Engine](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/layout-parser-integration).
