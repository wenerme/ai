For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/guides/evaluate-and-optimize/llms.txt. For full documentation content, see https://openrouter.ai/docs/guides/evaluate-and-optimize/llms-full.txt.

Retrieval-Augmented Generation (RAG) grounds LLM responses in your own data by retrieving relevant documents before generating an answer. This prevents hallucinations and keeps responses up to date without fine-tuning.

OpenRouter provides all three building blocks for a RAG pipeline through a single API:

1. **Embeddings** — convert documents and queries into vectors for semantic search
2. **Rerank** — re-score retrieved candidates for higher precision
3. **Chat Completions** — generate a final answer using the retrieved context

## How RAG Works

A typical RAG pipeline follows these steps:

1. **Index** — chunk your documents and generate embeddings for each chunk
2. **Retrieve** — embed the user's query and find the most similar document chunks
3. **Rerank** (optional) — re-score the top candidates with a cross-encoder rerank model for better precision
4. **Generate** — pass the top documents as context to an LLM to produce a grounded answer

```
User Query
    │
    ▼
┌──────────┐     ┌──────────────┐     ┌──────────┐     ┌──────────────┐
│ Embed    │────▶│ Vector Search│────▶│ Rerank   │────▶│ LLM Generate │
│ Query    │     │ (Top N docs) │     │ (Top K)  │     │ with Context │
└──────────┘     └──────────────┘     └──────────┘     └──────────────┘
```

## Step 1: Index Your Documents

Split your documents into chunks and generate embeddings for each chunk. Store the embeddings in a vector database (or in-memory for prototyping).

<Template
  data={{
  API_KEY_REF,
  MODEL: 'openai/text-embedding-3-small'
}}
>
  <CodeGroup>
    ```python title="Python"
    import requests
    import json

    OPENROUTER_API_KEY = "{{API_KEY_REF}}"

    # Your documents, split into chunks
    chunks = [
        "OpenRouter is a unified API gateway for LLMs. It aggregates models from multiple providers.",
        "RAG stands for Retrieval-Augmented Generation. It grounds LLM answers in external data.",
        "Embeddings convert text into numerical vectors that capture semantic meaning.",
        "Reranking uses a cross-encoder to re-score documents for a given query, improving precision.",
        "Vector databases like Pinecone, Weaviate, and Qdrant store embeddings for fast similarity search.",
        "Prompt caching can reduce costs by reusing previous computations for repeated prefixes.",
        "OpenRouter supports provider routing to control which providers serve your requests.",
    ]

    # Generate embeddings for all chunks in one batch request
    response = requests.post(
        "https://openrouter.ai/api/v1/embeddings",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "{{MODEL}}",
            "input": chunks,
        },
    )

    data = response.json()
    # Each item in data["data"] contains an "embedding" vector
    # Store these alongside your chunks in a vector database
    document_embeddings = [
        {"text": chunks[item["index"]], "embedding": item["embedding"]}
        for item in data["data"]
    ]

    print(f"Indexed {len(document_embeddings)} chunks with {len(document_embeddings[0]['embedding'])}-dim embeddings")
    ```

    ```typescript title="TypeScript (fetch)"
    const OPENROUTER_API_KEY = '{{API_KEY_REF}}';

    // Your documents, split into chunks
    const chunks = [
      'OpenRouter is a unified API gateway for LLMs. It aggregates models from multiple providers.',
      'RAG stands for Retrieval-Augmented Generation. It grounds LLM answers in external data.',
      'Embeddings convert text into numerical vectors that capture semantic meaning.',
      'Reranking uses a cross-encoder to re-score documents for a given query, improving precision.',
      'Vector databases like Pinecone, Weaviate, and Qdrant store embeddings for fast similarity search.',
      'Prompt caching can reduce costs by reusing previous computations for repeated prefixes.',
      'OpenRouter supports provider routing to control which providers serve your requests.',
    ];

    // Generate embeddings for all chunks in one batch request
    const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: '{{MODEL}}',
        input: chunks,
      }),
    });

    const data = await response.json();
    // Each item in data.data contains an "embedding" vector
    // Store these alongside your chunks in a vector database
    const documentEmbeddings = data.data.map((item: { index: number; embedding: number[] }) => ({
      text: chunks[item.index],
      embedding: item.embedding,
    }));

    console.log(`Indexed ${documentEmbeddings.length} chunks with ${documentEmbeddings[0].embedding.length}-dim embeddings`);
    ```

    ```shell title="Shell"
    curl https://openrouter.ai/api/v1/embeddings \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $OPENROUTER_API_KEY" \
      -d '{
        "model": "{{MODEL}}",
        "input": [
          "OpenRouter is a unified API gateway for LLMs.",
          "RAG stands for Retrieval-Augmented Generation.",
          "Embeddings convert text into numerical vectors."
        ]
      }'
    ```
  </CodeGroup>
</Template>

<Tip>
  In production, use a vector database (Pinecone, Weaviate, Qdrant, pgvector, etc.) to store and query embeddings efficiently. The in-memory approach shown here is for illustration only.
</Tip>

## Step 2: Retrieve Relevant Documents

When a user asks a question, embed the query and find the most similar document chunks using cosine similarity.

<Template
  data={{
  API_KEY_REF,
  MODEL: 'openai/text-embedding-3-small'
}}
>
  <CodeGroup>
    ```python title="Python"
    import numpy as np

    def cosine_similarity(a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

    def retrieve(query, document_embeddings, top_n=5):
        # Embed the query
        response = requests.post(
            "https://openrouter.ai/api/v1/embeddings",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "{{MODEL}}",
                "input": query,
            },
        )

        query_embedding = np.array(response.json()["data"][0]["embedding"])

        # Score each document by cosine similarity
        scored = []
        for doc in document_embeddings:
            score = cosine_similarity(query_embedding, np.array(doc["embedding"]))
            scored.append({"text": doc["text"], "score": float(score)})

        # Return the top N most similar chunks
        scored.sort(key=lambda x: x["score"], reverse=True)
        return scored[:top_n]

    query = "What is RAG and how does it work?"
    results = retrieve(query, document_embeddings, top_n=5)

    print("Retrieved documents:")
    for i, r in enumerate(results):
        print(f"  {i+1}. (score: {r['score']:.4f}) {r['text']}")
    ```

    ```typescript title="TypeScript (fetch)"
    function cosineSimilarity(a: number[], b: number[]): number {
      const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
      const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
      const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
      return dot / (magA * magB);
    }

    async function retrieve(
      query: string,
      documentEmbeddings: { text: string; embedding: number[] }[],
      topN = 5,
    ) {
      // Embed the query
      const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: '{{MODEL}}',
          input: query,
        }),
      });

      const data = await response.json();
      const queryEmbedding: number[] = data.data[0].embedding;

      // Score each document by cosine similarity
      const scored = documentEmbeddings.map((doc) => ({
        text: doc.text,
        score: cosineSimilarity(queryEmbedding, doc.embedding),
      }));

      // Return the top N most similar chunks
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, topN);
    }

    const query = 'What is RAG and how does it work?';
    const results = await retrieve(query, documentEmbeddings, 5);

    console.log('Retrieved documents:');
    results.forEach((r, i) => {
      console.log(`  ${i + 1}. (score: ${r.score.toFixed(4)}) ${r.text}`);
    });
    ```
  </CodeGroup>
</Template>

## Step 3: Rerank for Better Precision

Embedding-based retrieval is fast but approximate. A rerank model uses a cross-encoder to compare each document directly against the query, producing more accurate relevance scores. This is especially valuable when you retrieve many candidates (e.g., 20) and want to narrow down to the best few (e.g., 3).

<Template
  data={{
  API_KEY_REF,
  RERANK_MODEL: 'cohere/rerank-v3.5'
}}
>
  <CodeGroup>
    ```python title="Python"
    def rerank(query, documents, top_n=3):
        response = requests.post(
            "https://openrouter.ai/api/v1/rerank",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "{{RERANK_MODEL}}",
                "query": query,
                "documents": documents,
                "top_n": top_n,
            },
        )

        data = response.json()
        return data["results"]

    # Use the texts from the retrieval step
    retrieved_texts = [r["text"] for r in results]

    reranked = rerank(query, retrieved_texts, top_n=3)

    print("Reranked documents:")
    for r in reranked:
        print(f"  Score: {r['relevance_score']:.4f} | {r['document']['text']}")
    ```

    ```typescript title="TypeScript (fetch)"
    async function rerank(query: string, documents: string[], topN = 3) {
      const response = await fetch('https://openrouter.ai/api/v1/rerank', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: '{{RERANK_MODEL}}',
          query,
          documents,
          top_n: topN,
        }),
      });

      const data = await response.json();
      return data.results;
    }

    // Use the texts from the retrieval step
    const retrievedTexts = results.map((r) => r.text);

    const reranked = await rerank(query, retrievedTexts, 3);

    console.log('Reranked documents:');
    for (const r of reranked) {
      console.log(`  Score: ${r.relevance_score.toFixed(4)} | ${r.document.text}`);
    }
    ```

    ```shell title="Shell"
    curl https://openrouter.ai/api/v1/rerank \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $OPENROUTER_API_KEY" \
      -d '{
        "model": "{{RERANK_MODEL}}",
        "query": "What is RAG and how does it work?",
        "documents": [
          "RAG stands for Retrieval-Augmented Generation. It grounds LLM answers in external data.",
          "Embeddings convert text into numerical vectors that capture semantic meaning.",
          "Reranking uses a cross-encoder to re-score documents for a given query, improving precision.",
          "OpenRouter is a unified API gateway for LLMs. It aggregates models from multiple providers.",
          "Vector databases like Pinecone, Weaviate, and Qdrant store embeddings for fast similarity search."
        ],
        "top_n": 3
      }'
    ```
  </CodeGroup>
</Template>

## Step 4: Generate an Answer with Context

Pass the top-ranked documents as context to a chat model. The LLM generates a grounded answer based on the retrieved information.

<Template
  data={{
  API_KEY_REF,
  CHAT_MODEL: 'openai/gpt-4.1-mini'
}}
>
  <CodeGroup>
    ```python title="Python"
    def generate_answer(query, context_docs):
        # Build a context string from the reranked documents
        context = "\n\n".join(
            f"[{i+1}] {doc['document']['text']}"
            for i, doc in enumerate(context_docs)
        )

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "{{CHAT_MODEL}}",
                "messages": [
                    {
                        "role": "system",
                        "content": "Answer the user's question based on the provided context. "
                                   "Cite the relevant source numbers in brackets. "
                                   "If the context doesn't contain enough information, say so.",
                    },
                    {
                        "role": "user",
                        "content": f"Context:\n{context}\n\nQuestion: {query}",
                    },
                ],
            },
        )

        return response.json()["choices"][0]["message"]["content"]

    answer = generate_answer(query, reranked)
    print(f"Question: {query}")
    print(f"Answer: {answer}")
    ```

    ```typescript title="TypeScript (fetch)"
    async function generateAnswer(
      query: string,
      contextDocs: { document: { text: string } }[],
    ) {
      // Build a context string from the reranked documents
      const context = contextDocs
        .map((doc, i) => `[${i + 1}] ${doc.document.text}`)
        .join('\n\n');

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: '{{CHAT_MODEL}}',
          messages: [
            {
              role: 'system',
              content:
                "Answer the user's question based on the provided context. " +
                'Cite the relevant source numbers in brackets. ' +
                "If the context doesn't contain enough information, say so.",
            },
            {
              role: 'user',
              content: `Context:\n${context}\n\nQuestion: ${query}`,
            },
          ],
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    }

    const answer = await generateAnswer(query, reranked);
    console.log(`Question: ${query}`);
    console.log(`Answer: ${answer}`);
    ```
  </CodeGroup>
</Template>

## Complete Example

Here is a full end-to-end RAG pipeline combining all four steps:

<Template
  data={{
  API_KEY_REF,
  EMBEDDING_MODEL: 'openai/text-embedding-3-small',
  RERANK_MODEL: 'cohere/rerank-v3.5',
  CHAT_MODEL: 'openai/gpt-4.1-mini'
}}
>
  <CodeGroup>
    ```python title="Python"
    import requests
    import numpy as np

    OPENROUTER_API_KEY = "{{API_KEY_REF}}"
    EMBEDDING_MODEL = "{{EMBEDDING_MODEL}}"
    RERANK_MODEL = "{{RERANK_MODEL}}"
    CHAT_MODEL = "{{CHAT_MODEL}}"
    BASE_URL = "https://openrouter.ai/api/v1"

    def get_headers():
        return {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        }

    def embed(texts):
        """Generate embeddings for a list of texts."""
        response = requests.post(
            f"{BASE_URL}/embeddings",
            headers=get_headers(),
            json={"model": EMBEDDING_MODEL, "input": texts},
        )
        return [item["embedding"] for item in response.json()["data"]]

    def cosine_similarity(a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

    def retrieve(query_embedding, doc_embeddings, top_n=10):
        """Find the top N most similar documents by cosine similarity."""
        scored = [
            (i, cosine_similarity(query_embedding, emb))
            for i, emb in enumerate(doc_embeddings)
        ]
        scored.sort(key=lambda x: x[1], reverse=True)
        return scored[:top_n]

    def rerank(query, documents, top_n=3):
        """Rerank documents using a cross-encoder model."""
        response = requests.post(
            f"{BASE_URL}/rerank",
            headers=get_headers(),
            json={
                "model": RERANK_MODEL,
                "query": query,
                "documents": documents,
                "top_n": top_n,
            },
        )
        return response.json()["results"]

    def generate(query, context_docs):
        """Generate an answer grounded in the provided context."""
        context = "\n\n".join(
            f"[{i+1}] {doc}"
            for i, doc in enumerate(context_docs)
        )
        response = requests.post(
            f"{BASE_URL}/chat/completions",
            headers=get_headers(),
            json={
                "model": CHAT_MODEL,
                "messages": [
                    {
                        "role": "system",
                        "content": (
                            "Answer the user's question using only the provided context. "
                            "Cite sources with [n]. If the context is insufficient, say so."
                        ),
                    },
                    {
                        "role": "user",
                        "content": f"Context:\n{context}\n\nQuestion: {query}",
                    },
                ],
            },
        )
        return response.json()["choices"][0]["message"]["content"]

    # --- Pipeline ---

    # 1. Index: chunk your knowledge base and embed
    chunks = [
        "OpenRouter is a unified API gateway for LLMs. It aggregates models from multiple providers into a single OpenAI-compatible interface.",
        "RAG stands for Retrieval-Augmented Generation. It retrieves relevant documents and uses them as context for LLM generation.",
        "Embeddings convert text into high-dimensional vectors where semantically similar texts are closer together.",
        "Reranking uses a cross-encoder to compare each document directly against the query, producing more accurate relevance scores than embedding similarity alone.",
        "Vector databases like Pinecone, Weaviate, and Qdrant are optimized for storing and querying embedding vectors at scale.",
        "Prompt caching reduces costs by reusing computations for repeated prompt prefixes across requests.",
        "OpenRouter supports provider routing to control which upstream providers serve your requests based on cost, latency, or privacy preferences.",
    ]
    doc_embeddings = embed(chunks)

    # 2. Retrieve: embed the query and find similar chunks
    query = "How does RAG improve LLM responses?"
    query_embedding = embed([query])[0]
    top_matches = retrieve(query_embedding, doc_embeddings, top_n=5)
    retrieved_texts = [chunks[i] for i, _ in top_matches]

    # 3. Rerank: re-score with a cross-encoder for better precision
    reranked = rerank(query, retrieved_texts, top_n=3)
    context_texts = [r["document"]["text"] for r in reranked]

    # 4. Generate: produce a grounded answer
    answer = generate(query, context_texts)
    print(f"Q: {query}\nA: {answer}")
    ```

    ```typescript title="TypeScript (fetch)"
    const OPENROUTER_API_KEY = '{{API_KEY_REF}}';
    const EMBEDDING_MODEL = '{{EMBEDDING_MODEL}}';
    const RERANK_MODEL = '{{RERANK_MODEL}}';
    const CHAT_MODEL = '{{CHAT_MODEL}}';
    const BASE_URL = 'https://openrouter.ai/api/v1';

    function getHeaders() {
      return {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      };
    }

    async function embed(texts: string[]): Promise<number[][]> {
      const response = await fetch(`${BASE_URL}/embeddings`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ model: EMBEDDING_MODEL, input: texts }),
      });
      const data = await response.json();
      return data.data.map((item: { embedding: number[] }) => item.embedding);
    }

    function cosineSimilarity(a: number[], b: number[]): number {
      const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
      const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
      const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
      return dot / (magA * magB);
    }

    function retrieve(
      queryEmbedding: number[],
      docEmbeddings: number[][],
      topN = 10,
    ): { index: number; score: number }[] {
      const scored = docEmbeddings.map((emb, i) => ({
        index: i,
        score: cosineSimilarity(queryEmbedding, emb),
      }));
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, topN);
    }

    async function rerank(query: string, documents: string[], topN = 3) {
      const response = await fetch(`${BASE_URL}/rerank`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          model: RERANK_MODEL,
          query,
          documents,
          top_n: topN,
        }),
      });
      const data = await response.json();
      return data.results as { index: number; relevance_score: number; document: { text: string } }[];
    }

    async function generate(query: string, contextDocs: string[]): Promise<string> {
      const context = contextDocs
        .map((doc, i) => `[${i + 1}] ${doc}`)
        .join('\n\n');
      const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          model: CHAT_MODEL,
          messages: [
            {
              role: 'system',
              content:
                "Answer the user's question using only the provided context. " +
                'Cite sources with [n]. If the context is insufficient, say so.',
            },
            {
              role: 'user',
              content: `Context:\n${context}\n\nQuestion: ${query}`,
            },
          ],
        }),
      });
      const data = await response.json();
      return data.choices[0].message.content;
    }

    // --- Pipeline ---

    // 1. Index: chunk your knowledge base and embed
    const chunks = [
      'OpenRouter is a unified API gateway for LLMs. It aggregates models from multiple providers into a single OpenAI-compatible interface.',
      'RAG stands for Retrieval-Augmented Generation. It retrieves relevant documents and uses them as context for LLM generation.',
      'Embeddings convert text into high-dimensional vectors where semantically similar texts are closer together.',
      'Reranking uses a cross-encoder to compare each document directly against the query, producing more accurate relevance scores than embedding similarity alone.',
      'Vector databases like Pinecone, Weaviate, and Qdrant are optimized for storing and querying embedding vectors at scale.',
      'Prompt caching reduces costs by reusing computations for repeated prompt prefixes across requests.',
      'OpenRouter supports provider routing to control which upstream providers serve your requests based on cost, latency, or privacy preferences.',
    ];
    const docEmbeddings = await embed(chunks);

    // 2. Retrieve: embed the query and find similar chunks
    const query = 'How does RAG improve LLM responses?';
    const queryEmbedding = (await embed([query]))[0];
    const topMatches = retrieve(queryEmbedding, docEmbeddings, 5);
    const retrievedTexts = topMatches.map((m) => chunks[m.index]);

    // 3. Rerank: re-score with a cross-encoder for better precision
    const reranked = await rerank(query, retrievedTexts, 3);
    const contextTexts = reranked.map((r) => r.document.text);

    // 4. Generate: produce a grounded answer
    const answer = await generate(query, contextTexts);
    console.log(`Q: ${query}\nA: ${answer}`);
    ```
  </CodeGroup>
</Template>

## When to Use Rerank

Reranking adds an extra API call, so it's worth understanding when it helps most:

**Use rerank when:**

* Your knowledge base is large (hundreds or thousands of chunks) and embedding retrieval alone returns noisy results
* Precision matters more than latency (e.g., customer-facing Q\&A, legal or medical documents)
* You retrieve many candidates (e.g., top 20) and need to narrow to the best 3-5

**Skip rerank when:**

* Your knowledge base is small and embedding retrieval already returns highly relevant results
* You need the lowest possible latency (rerank adds one additional API call)
* You're building a prototype and want to keep the pipeline simple

## Chunking Strategies

How you split documents significantly affects retrieval quality:

* **By paragraph or section** — preserves semantic coherence and works well for structured documents
* **Fixed-size with overlap** — split into chunks of \~200-500 tokens with \~50-token overlap to avoid losing context at boundaries
* **By semantic boundary** — use headings, section breaks, or sentence boundaries to create natural chunks

<Tip>
  Smaller chunks (200-300 tokens) tend to produce more precise retrieval but may lose surrounding context. Larger chunks (500-1000 tokens) preserve more context but may dilute relevance signals. Experiment with your specific data to find the right balance.
</Tip>

## Best Practices

**Use the same embedding model for indexing and querying.** Mixing models produces incompatible vector spaces and will give poor retrieval results.

**Batch your embedding requests.** Send multiple texts in a single API call to reduce latency and costs. The embeddings API accepts arrays of inputs.

**Cache embeddings.** Embeddings for the same text are deterministic. Store them in a database to avoid recomputing.

**Retrieve more than you need, then rerank.** A common pattern is to retrieve 10-20 candidates via embeddings, then rerank to the top 3-5. This combines the speed of embedding search with the precision of cross-encoder reranking.

**Include metadata in your prompt.** When generating, include source metadata (document title, section, URL) alongside the text so the LLM can produce proper citations.

**Set a relevance threshold.** After reranking, filter out documents below a minimum relevance score to avoid injecting irrelevant context that could confuse the LLM.

## Available Models

Browse available models for each step:

* **Embedding models**: [openrouter.ai/models?output\_modalities=embeddings](https://openrouter.ai/models?fmt=cards\&output_modalities=embeddings)
* **Rerank models**: [openrouter.ai/models?output\_modalities=rerank](https://openrouter.ai/models?fmt=cards\&output_modalities=rerank)
* **Chat models**: [openrouter.ai/models](https://openrouter.ai/models)

## Related Resources

* [Embeddings API](/docs/api/reference/embeddings) — full API reference for generating embeddings
* [Provider Routing](/docs/guides/routing/provider-selection) — control which providers serve your requests
* [Prompt Caching](/docs/guides/best-practices/prompt-caching) — reduce costs for repeated prompt prefixes
* [Structured Outputs](/docs/guides/features/structured-outputs) — enforce JSON schema on LLM responses for structured RAG output