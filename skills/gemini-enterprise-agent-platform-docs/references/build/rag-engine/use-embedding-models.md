The [VPC-SC security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) and
CMEK are supported by Agent Platform RAG Engine. Data residency and AXT security controls aren't
supported.

This page describes the choices of embedding models and shows you how to use
your embedding model to create a RAG corpus. The association between your
embedding model and the RAG corpus remains fixed for the lifetime of your RAG
corpus.

## Introduction to embeddings

Embeddings are numerical representations of inputs. You can use embeddings in
your applications to recognize complex meanings and semantic relationships and
to process and produce language.

Embeddings work by converting text, image, and video into arrays of floating
point numbers called *vectors*. The closer two vectors are in their embedding
space, the greater the similarity of their inputs.

Embedding models are an important component of semantic retrieval systems. The
performance of a retrieval system depends on how well the embedding model
maps relationships in your data.

## Embedding model choices

RAG Engine implements retrieval-augmented generation
(RAG), and it offers you the choice of the following embedding models to use
within a RAG corpus:

| Embedding model type | Description |
|---|---|
| Gemini Enterprise Agent Platform text embedding models | Models trained by the publisher, such as Google. The models are trained on a large dataset of text, and provide a strong baseline for many tasks. |
| Fine-tuned Agent Platform text embedding models | Agent Platform text embedding models are fine tuned to have specialized knowledge or highly-tailored performance. |
| OSS embedding models | Third-party open-source embedding models in English-only and multilingual variants. |

## Supported embedding models

Embedding models are used to create a corpus and used for search and retrieval
during response generation. This section lists the supported embedding models.

| Model version | Description |
|---|---|
| `text-embedding-005` | Default embedding model. Recommended for use with a RAG corpus. |
| `text-embedding-004` |   |
| `text-multilingual-embedding-002` | Recommended for use with a RAG corpus. |

### Open source embedding models

The following open embedding models are also supported. You can find them in
[Model Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/use-open-models#open-models).

- `e5-base-v2`
- `e5-large-v2`
- `e5-small-v2`
- `multilingual-e5-large`
- `multilingual-e5-small`

## Use Agent Platform text embedding models

The Agent Platform text embedding API supports several embedding
models, which produce a *dense embedding vector* with 768 dimensions. *Dense
embeddings* store the meaning of text unlike *sparse vectors*, which tend to
directly map words to numbers. The benefit of using dense vector embeddings in
generative AI is that instead of searching for a direct word or syntax matches,
you can better search for passages that align to the meaning of the query, even
if the passages don't use the same language.

For a list of supported models, see [Embeddings
models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions#embeddings-models).

### Gecko models

Gecko models are available in English-only and multilingual versions. Unlike
fine-tuned Gecko models, publisher Gecko models aren't required to be deployed,
which makes them the preferred set of models to use with
RAG Engine.

To identify the default embedding model used or you need a list of Gecko models
that are recommended for use with a RAG corpus, see [Supported embedding
models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/use-embedding-models#supported-embedding-models).

### When Gecko models are discontinued

The publisher Gecko models might be discontinued. If that happens, the publisher
Gecko models can't be used with RAG Engine, even for a
RAG corpus that was created prior to the discontinuation. When your Gecko model
is discontinued, you must migrate the RAG corpus, which means that you create a
new RAG corpus and re-import the data. An alternative is to use a fine-tuned
Gecko model or a self-deployed OSS embedding model, which is supported after the
model is discontinued.

### Create a RAG corpus with a publisher Gecko model

These code samples demonstrate how to create a RAG corpus with a publisher Gecko
model.

### curl

      ENDPOINT=us-central1-aiplatform.googleapis.com
      PROJECT_ID=YOUR_PROJECT_ID

      // Set this to your choice of publisher Gecko model. Note that the full resource name of the publisher model is required.
      // Example: projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/text-embedding-004
      ENDPOINT_NAME=YOUR_ENDPOINT_NAME

      // Set a display name for your corpus.
      // For example, "my test corpus"
      CORPUS_DISPLAY_NAME=YOUR_CORPUS_DISPLAY_NAME

      // CreateRagCorpus
      // Input: ENDPOINT, PROJECT_ID, ENDPOINT_NAME, CORPUS_DISPLAY_NAME
      curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://${ENDPOINT}/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora \
      -d '{
            "display_name" : '\""${CORPUS_DISPLAY_NAME}"\"',
            "rag_embedding_model_config" : {
                  "vertex_prediction_endpoint": {
                        "endpoint": '\""${ENDPOINT_NAME}"\"'
                  }
            }
      }'

### Agent Platform SDK for Python

      import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
      from vertexai import rag

      # Set Project
      PROJECT_ID = "YOUR_PROJECT_ID"
      https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=${PROJECT_ID}, location="us-central1")

      # Configure a Google first-party embedding model
      embedding_model_config = rag.RagEmbeddingModelConfig(
            publisher_model="publishers/google/models/text-embedding-004"
      )

      # Name your corpus
      DISPLAY_NAME = "YOUR_CORPUS_DISPLAY_NAME"

      rag_corpus = rag.create_corpus(
            display_name=DISPLAY_NAME, rag_embedding_model_config=embedding_model_config
      )

## Use fine-tuned Agent Platform text embedding models

Although the foundation publisher models are trained on a large dataset of text
and provide a strong baseline for many tasks, there might be scenarios where you
might require the models to have a specialized knowledge or highly-tailored
performance. In such cases, model tuning lets you fine tune the model's
representations using your relevant data. An additional benefit of this approach
is that when the model is fine tuned, the resulting image is owned by you and is
unaffected by the Gecko model deprecation. All fine-tuned Gecko embedding models
produce embeddings with 768-dimensional vectors. To learn more about these
models, see [Get text
embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings).

For more information about tuning embedding models, see
[Tune text embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tune-embeddings).

These code samples demonstrate how to create a RAG corpus with your deployed,
fine-tuned Gecko model.

### curl

      ENDPOINT=us-central1-aiplatform.googleapis.com
      PROJECT_ID=YOUR_PROJECT_ID

      // Your Agent Platform endpoint resource with the deployed fine-tuned Gecko model
      // Example: projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${ENDPOINT_ID}
      ENDPOINT_NAME=YOUR_ENDPOINT_NAME

      // Set a display name for your corpus.
      // For example, "my test corpus"
      CORPUS_DISPLAY_NAME=YOUR_CORPUS_DISPLAY_NAME

      // CreateRagCorpus
      // Input: ENDPOINT, PROJECT_ID, ENDPOINT_NAME, CORPUS_DISPLAY_NAME
      curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://${ENDPOINT}/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora \
      -d '{
            "display_name" : '\""${CORPUS_DISPLAY_NAME}"\"',
            "rag_embedding_model_config" : {
                    "vertex_prediction_endpoint": {
                          "endpoint": '\""${ENDPOINT_NAME}"\"'
                    }
            }
        }'

### Agent Platform SDK for Python

      import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
      from vertexai import rag

      # Set Project
      PROJECT_ID = "YOUR_PROJECT_ID"
      https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.init(project=${PROJECT_ID}, location="us-central1")

      # Your Vertex Endpoint resource with the deployed fine-tuned Gecko model
      ENDPOINT_ID = "YOUR_MODEL_ENDPOINT_ID"
      MODEL_ENDPOINT = "projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}"

      embedding_model_config = rag.RagEmbeddingModelConfig(
          endpoint=${MODEL_ENDPOINT},
      )

      # Name your corpus
      DISPLAY_NAME = "YOUR_CORPUS_DISPLAY_NAME"

      rag_corpus = rag.create_corpus(
          display_name=${DISPLAY_NAME}, rag_embedding_model_config=embedding_model_config
      )

## Use OSS embedding models

RAG Engine supports third-party open-source embedding
models in English-only and multilingual variants. This table lists the supported
E5 models.

| Model version | Base model | Parameters | embedding dimension | English only |
|---|---|---|---|---|
| `e5-base-v2` | `MiniLM` | 109M | 768 | ✔ |
| `e5-large-v2` | `MiniLM` | 335M | 1,024 | ✔ |
| `e5-small-v2` | `MiniLM` | 33M | 384 | ✔ |
| `multilingual-e5-large` | `xlm-roberta-large` | 560M | 1,024 | ✗ |
| `multilingual-e5-small` | `microsoft/Multilingual-MiniLM-L12-H384` | 118M | 384 | ✗ |

In order to use E5 models with RAG Engine, the E5 model
must be deployed from Model Garden. To deploy your E5 model, see [E5
Text
Embedding](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/e5)
in the Google Cloud console.

These code samples demonstrate how to create RAG corpus with your deployed E5
model.

### curl

      ENDPOINT=us-central1-aiplatform.googleapis.com
      PROJECT_ID=YOUR_PROJECT_ID

      // Your Vertex Endpoint resource with the deployed E5 model
      // Example: projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${ENDPOINT_ID}
      ENDPOINT_NAME=YOUR_ENDPOINT_NAME

      // Set a display name for your corpus.
      // For example, "my test corpus"
      CORPUS_DISPLAY_NAME=YOUR_CORPUS_DISPLAY_NAME

      // CreateRagCorpus
      // Input: ENDPOINT, PROJECT_ID, ENDPOINT_NAME, CORPUS_DISPLAY_NAME
      curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://${ENDPOINT}/v1beta1/projects/${PROJECT_ID}/locations/us-central1/ragCorpora \
      -d '{
            "display_name" : '\""${CORPUS_DISPLAY_NAME</var>}"\"',
            "rag_embedding_model_config" : {
                    "vertex_prediction_endpoint": {
                          "endpoint": '\""${ENDPOINT_NAME}"\"'
                    }
            }
        }'

### Agent Platform SDK for Python

      import vertexai
      from vertexai import rag

      # Set Project
      PROJECT_ID = "YOUR_PROJECT_ID"
      vertexai.init(project=PROJECT_ID, location="us-central1")

      # Your Vertex Endpoint resource with the deployed E5 model
      ENDPOINT_ID = "YOUR_MODEL_ENDPOINT_ID"
      MODEL_ENDPOINT = "projects/{PROJECT_ID}/locations/us-central1/endpoints/{ENDPOINT_ID}"

      embedding_model_config = rag.RagEmbeddingModelConfig(
          endpoint=MODEL_ENDPOINT,
      )

      # Name your corpus
      DISPLAY_NAME = "YOUR_CORPUS_DISPLAY_NAME"

      rag_corpus = rag.create_corpus(
          display_name=DISPLAY_NAME, rag_embedding_model_config=embedding_model_config
      )

## What's next

- [Document types for
  RAG Engine](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/supported-documents)
