Grounding is a technique that you can use to help produce model responses that
are more trustworthy, helpful, and factual. When you ground generative AI model
responses, you connect them to verifiable sources of information. To implement
grounding, you must retrieve relevant source data. The
recommended best practice is to use the retrieval-augmented generation (RAG)
technique. Retrieval is usually done using a search engine, which uses an index
that's embedded with the semantic meanings of the source text.

There are also services and component APIs that implement the RAG lifecycle,
such as the Agent Search Builder API, which allows for mix-and-match
building. With mix-and-match building, you can implement a RAG solution using
any of the following services or APIs:

- **Grounding generation API**: You can use it to implement grounding, or link to a retrieval provider for the complete RAG lifecycle.
- **Document layout parser** : This parser represents the best of Document AI and Gemini for document understanding. For more information about the layout parser, see [Use the layout parser](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/layout-parser-integration).
- **Gemini Enterprise Agent Platform Vector Search**: This search service is highly performant and uses a high-quality vector database.
- **Check grounding API**: This API compares RAG output with the retrieved facts and helps to ensure that all statements are grounded before returning the response to the user.

## Ground responses using RAG Engine on Gemini Enterprise Agent Platform

To ground responses using RAG Engine, you must create a
prompt. Do the following:

1. In the Google Cloud console, go to the **Create prompt** page using
   Vertex AI Studio.

   [Go to Create prompt](https://console.cloud.google.com/vertex-ai/studio/multimodal)
2. Select **Grounding: Your data**.

3. Select **RAG Engine** grounding source.

4. From the **Corpus** list, select your corpus name.

5. In the **Top-K Similarity** field, select **20**, which is the default.

6. Click **Save**.

## What's next

- To learn more about responsible AI and safety filters, see [responsible AI best practices and Gemini Enterprise Agent Platform's safety filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
- To learn more about how RAG is implemented by RAG Engine, see [RAG Engine](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-overview).
