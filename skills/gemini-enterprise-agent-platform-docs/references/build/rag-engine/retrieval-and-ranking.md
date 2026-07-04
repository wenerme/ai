The [VPC-SC security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) and
CMEK are supported by Agent Platform RAG Engine. Data residency and AXT security controls aren't
supported.

The page explains reranking and types of rankers. The page also demonstrates how
to use the Gemini Enterprise Agent Platform ranking API to rerank your retrieved responses.

## Available rerankers

| **Ranker options** | **Description** | **Latency** | **Accuracy** | **Pricing** |
|---|---|---|---|---|
| Agent Platform ranking API | The Agent Platform ranking API is a standalone semantic reranker designed for highly-precise relevance scoring and low latency. For more information about Agent Platform ranking API, see [Improve search and RAG quality with ranking API](https://docs.cloud.google.com/generative-ai-app-builder/docs/ranking). | Very low (less than 100 milliseconds) | State-of-the-art performance | Per RAG Engine request |
| LLM reranker | LLM reranker uses a separate call to Gemini to assess relevance of chunks to a query. | High (1 to 2 seconds) | Model dependent | LLM token pricing |

## Use the Agent Platform ranking API

To use the Agent Platform ranking API, you must enable the
Discovery Engine API. All supported models can be
found in the [Improve search and RAG quality with ranking
API](https://docs.cloud.google.com/generative-ai-app-builder/docs/ranking#models).

These code samples demonstrate how to enable reranking with the
Agent Platform ranking API in the tool configuration.

### Python

To learn how to install or update the Vertex AI SDK for Python,
see [Install the Vertex AI SDK for
Python](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/python-sdk/use-vertex-ai-python-sdk)).
For more information, see the [Python API reference
documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

Replace the following variables used in the sample code:

- **<var translate="no">PROJECT_ID</var>**: The ID of your Google Cloud project.
- **<var translate="no">LOCATION</var>**: The region to process the request.
- **<var translate="no">MODEL_NAME</var>** : LLM model for content generation. For example, `gemini-2.0-flash`.
- **<var translate="no">INPUT_PROMPT</var>**: The text sent to the LLM for content generation.
- **<var translate="no">RAG_CORPUS_RESOURCE</var>** : The name of the RAG corpus resource.
  Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **<var translate="no">SIMILARITY_TOP_K</var>**: Optional: The number of top contexts to retrieve.
- **<var translate="no">RANKER_MODEL_NAME</var>** : The name of the model used for reranking. For example, `semantic-ranker-default@latest`.

    from vertexai import rag
    from vertexai.generative_models import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.GenerativeModel.html, https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.Tool.html
    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    PROJECT_ID = "PROJECT_ID"
    CORPUS_NAME = "projects/{PROJECT_ID}/locations/LOCATION/ragCorpora/RAG_CORPUS_RESOURCE"

    # Initialize Agent Platform API once per session
    https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location="LOCATION")

    config = rag.RagRetrievalConfig(
        top_k=10,
        ranking=rag.Ranking(
            rank_service=rag.RankService(
                model_name=RANKER_MODEL_NAME
            )
        )
    )

    rag_retrieval_tool = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.Tool.html.from_retrieval(
        retrieval=rag.Retrieval(
            source=rag.VertexRagStore(
                rag_resources=[
                    rag.RagResource(
                        rag_corpus=CORPUS_NAME,
                    )
                ],
                rag_retrieval_config=config
            ),
        )
    )

    rag_model = GenerativeModel(
        model_name="MODEL_NAME", tools=[rag_retrieval_tool]
    )
    response = rag_model.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai.preview.generative_models.GenerativeModel.html#vertexai_preview_generative_models_GenerativeModel_generate_content("INPUT_PROMPT")
    print(response.text)
    # Example response:
    #   The sky appears blue due to a phenomenon called Rayleigh scattering.
    #   Sunlight, which contains all colors of the rainbow, is scattered
    #   by the tiny particles in the Earth's atmosphere....
    #   ...

### REST

To generate content using Gemini models, make a call to the
Agent Platform `GenerateContent` API. By specifying the
`RAG_CORPUS_RESOURCE` when you make the request, the model automatically
retrieves data from the RAG Engine.

Replace the following variables used in the sample code:

- **<var translate="no">PROJECT_ID</var>**: The ID of your Google Cloud project.
- **<var translate="no">LOCATION</var>**: The region to process the request.
- **<var translate="no">MODEL_NAME</var>** : LLM model for content generation. For example, `gemini-2.0-flash`.
- **<var translate="no">GENERATION_METHOD</var>** : LLM method for content generation. Options include `generateContent` and `streamGenerateContent`.
- **<var translate="no">INPUT_PROMPT</var>**: The text sent to the LLM for content generation.
- **<var translate="no">RAG_CORPUS_RESOURCE</var>** : The name of the RAG corpus resource.
  Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **<var translate="no">SIMILARITY_TOP_K</var>**: Optional: The number of top contexts to retrieve.
- **<var translate="no">RANKER_MODEL_NAME</var>** : The name of the model used for reranking. For example, `semantic-ranker-default@latest`.

    curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_NAME:GENERATION_METHOD" \
    -d '{
      "contents": {
        "role": "user",
        "parts": {
          "text": "INPUT_PROMPT"
        }
      },
      "tools": {
        "retrieval": {
          "disable_attribution": false,
          "vertex_rag_store": {
            "rag_resources": {
                "rag_corpus": "RAG_CORPUS_RESOURCE"
              },
            "rag_retrieval_config": {
              "top_k": SIMILARITY_TOP_K,
              "ranking": {
                "rank_service": {
                  "model_name": "RANKER_MODEL_NAME"
                }
              }
            }
          }
        }
      }
    }'

## Use the LLM reranker in RAG Engine

This section presents the prerequisites and code samples for using an LLM
reranker.

The LLM reranker supports only Gemini models, which are accessible when
the RAG Engine on Gemini Enterprise Agent Platform API is enabled. To view the list of supported
models, see [Gemini
models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/supported-rag-models#supported-gemini-models).

To retrieve relevant contexts using the RAG Engine API,
do the following:

### Python

To learn how to install or update the Vertex AI SDK for Python, see
[Install the Vertex AI SDK for
Python](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/python-sdk/use-vertex-ai-python-sdk)).
For more information, see the [Python API reference
documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

Replace the following variables used in the code sample:

- **<var translate="no">PROJECT_ID</var>**: The ID of your Google Cloud project.
- **<var translate="no">LOCATION</var>**: The region to process the request.
- **<var translate="no">RAG_CORPUS_RESOURCE</var>** : The name of the RAG corpus resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **<var translate="no">TEXT</var>**: The query text to get relevant contexts.
- **<var translate="no">MODEL_NAME</var>**: The name of the model used for reranking.

    from vertexai import rag
    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    PROJECT_ID = "PROJECT_ID"
    CORPUS_NAME = "projects/[PROJECT_ID]/locations/LOCATION/ragCorpora/RAG_CORPUS_RESOURCE"
    MODEL_NAME= "MODEL_NAME"

    # Initialize Agent Platform API once per session
    https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=PROJECT_ID, location="LOCATION")

    rag_retrieval_config = rag.RagRetrievalConfig(
        top_k=10,
        ranking=rag.Ranking(
            llm_ranker=rag.LlmRanker(
                model_name=MODEL_NAME
            )
        )
    )

    response = rag.retrieval_query(
        rag_resources=[
            rag.RagResource(
                rag_corpus=CORPUS_NAME,
            )
        ],
        text="TEXT",
        rag_retrieval_config=rag_retrieval_config,
    )
    print(response)
    # Example response:
    # contexts {
    #   contexts {
    #     source_uri: "gs://your-bucket-name/file.txt"
    #     text: "....
    #   ....

### REST

Replace the following variables used in the code sample:

- **<var translate="no">PROJECT_ID</var>**: The ID of your Google Cloud project.
- **<var translate="no">LOCATION</var>**: The region to process the request.
- **<var translate="no">RAG_CORPUS_RESOURCE</var>** : The name of the RAG corpus resource. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`.
- **<var translate="no">TEXT</var>**: The query text to get relevant contexts.
- **<var translate="no">MODEL_NAME</var>**: The name of the model used for reranking.

    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION:retrieveContexts" \
      -d '{
        "vertex_rag_store": {
          "rag_resources": {
              "rag_corpus": "RAG_CORPUS_RESOURCE"
            }
        },
        "query": {
          "text": "TEXT",
          "rag_retrieval_config": {
            "top_k": 10,
            "ranking": {
              "llm_ranker": {
                "model_name": "MODEL_NAME"
              }
            }
          }
        }
      }'

## What's next

- To learn more about the RAG Engine on Gemini Enterprise Agent Platform API, see
  the following:

  - [`GenerateContentResponse`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/GenerateContentResponse)

  - [`RagEngineConfig`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/RagEngineConfig)

  - [`RagChunk`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/RagChunk)

  - [`RagContexts`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/RagContexts)

  - [`RagFileTransformationConfig`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/RagFileTransformationConfig)

  - [`RagQuery`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/RagQuery)

- [Manage your RAG knowledge base (corpus)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/manage-your-rag-corpus)
