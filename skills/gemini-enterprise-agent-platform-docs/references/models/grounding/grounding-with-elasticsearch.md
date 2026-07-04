This page explains how you can use your Elasticsearch instance to ground responses on your
data.

## Grounding Gemini with Elasticsearch

[Grounding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/overview) involves using public and private
datasets to provide context and facts to ground Large Language Model (LLM)
responses. By grounding with Elasticsearch, you can take advantage of your
existing Elasticsearch indexes to help enhance the quality and reliability of
Gemini's output, reducing hallucinations and helping to ensure
responses are relevant to your data. This lets you build powerful RAG
applications such as:

- Generative search summaries
- Question-and-answer chatbots with enterprise data
- Agents grounded in your data

You can ground an answer on up to 10 data sources at one time. You can combine
grounding with Elasticsearch with [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search)
to connect the model with world knowledge, a wide possible range of topics, or
up-to-date information on the internet.

## Supported models

The following [models support grounding with Elasticsearch](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/overview) with text input only:

#### Click to expand supported models

- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview
- [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview
- [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview
- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)
- [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api)

## Set up a search template in Elasticsearch

This section explains how you can use your Elasticsearch instance to ground on
your data stored in the instance.

### Best practices

For the best grounding responses, use these principles when creating a search
template:

- Include only relevant and useful data. For example, in a product catalog,
  specifying an image URL might not help the LLM answer prompts about product
  properties unless the prompt specifically asks for a URL. Similarly, avoid
  outputting embedding vectors.

- Grounding removes Elasticsearch results with low relevance to your prompts.
  You should provide a higher number of Elasticsearch results to capture all
  relevant context.

- Results data can be in one field or spread across multiple fields.

### Sample templates

You can use your search templates. However, we recommend that you use the
generic kNN search template with Elasticsearch grounding. For additional search
templates, see the
[GitHub repository](https://github.com/elastic/elasticsearch-labs/tree/main/supporting-blog-content/Cloud-Vertex-AI/search-templates).

This semantic search with Gemini Enterprise Agent Platform is a generic kNN search.

        PUT _scripts/google-template-knn-multioutput
        {
          "script": {
            "lang": "mustache",
            "source": {
              "_source": {
                "excludes": [ "title_embedding", "description_embedding", "images"]
              },
                "size": "num_hits",
                  "knn" : [
                  {
                    "field": "description_embedding",
                    "k": 5,
                    "num_candidates": 10,
                    "query_vector_builder": {
                      "text_embedding": {
                        "model_id": "googlevertexai_embeddings_004",
                        "model_text": "query"
                      }
                    },
                    "boost": 0.4
                  },
                  {
                    "field": "title_embedding",
                    "k": 5,
                    "num_candidates": 10,
                    "query_vector_builder": {
                      "text_embedding": {
                        "model_id": "googlevertexai_embeddings_004",
                        "model_text": "query"
                    }
                  },
                  "boost": 0.6
                  }
                  ]
            }
          }
        }

## Generate grounded responses with Elasticsearch

This section explains how you use the Agent Platform API to ground your LLM
responses.

### Prerequisites

Before you can ground LLM responses with Elasticsearch, you must complete the
following:

1. **Activate the Agent Platform API**: Ensure that both the
   Agent Platform API is enabled for your Google Cloud project.

2. **Install and sign in to the Google Cloud CLI CLI** : Install and initialize
   the gcloud CLI [command-line tool](https://docs.cloud.google.com/sdk/docs/install).

3. **Elasticsearch setup**: Use an existing Elasticsearch cluster and index that
   you want to use for grounding. Obtain the following information from your
   Elasticsearch setup:

   - **Endpoint**: The URL of your Elasticsearch cluster.
   - **Index Name** : The name of the index you want to search such as *my-data-index*.
   - **API Key** : An API key that allows access to your Elasticsearch cluster. The API key must start with the prefix *ApiKey*.
4. **Create an Elasticsearch search template** : Use an Elasticsearch data source
   that uses a reference [template](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-elasticsearch#sample-templates) that returns result data
   for grounding.

### Generate grounded responses

### Console

To ground with Elasticsearch in the Google Cloud console, do the following:

1. Go to Vertex AI Studio to the **Create prompt** page.

   [Go to Create prompt](https://console.cloud.google.com/agent-platform/studio/multimodal)
2. In the **Settings** panel, to ground your data, click the **Grounding: Your
   data** toggle.

3. In the **Customize Grounding** pane, select **Elasticsearch**.

4. Enter the endpoint in the **Elasticsearch endpoint** field.

5. Enter `ApiKey YOUR_API_KEY` in the **Elasticsearch API Key** field.

6. Enter the index in the **Elasticsearch index** field.

7. Enter the search template in the **Elasticsearch search template** field.

8. Adjust the number of hits by sliding the **Number of hits** slider.

9. Click **Save**.

10. Enter your prompt.

11. Click **Submit**.

### Understand your response

If your model prompt successfully grounds to Elasticsearch data stores using the
Vertex AI Studio or the API, then the model's responses include
metadata with citations and source content. If low-source relevance or
incomplete information occurs within the model's response, then metadata might
not be provided, and the prompt response won't be grounded.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google import genai
    from google.genai.types import (
        GenerateContentConfig,
        Elasticsearch,
        Retrieval,
        Tool,
        HttpOptions,
    )

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    # Replace with your Elasticsearch details
    ELASTIC_SEARCH_ENDPOINT = "YOUR_ELASTICSEARCH_ENDPOINT"
    ELASTIC_SEARCH_API_KEY = "YOUR_ELASTICSEARCH_API_KEY"
    INDEX_NAME = "YOUR_INDEX_NAME"
    SEARCH_TEMPLATE_NAME = "YOUR_SEARCH_TEMPLATE_NAME"
    NUM_HITS = 5

    tool = Tool(
        retrieval=Retrieval(
            external_api=Elasticsearch(
                api_spec="ELASTIC_SEARCH",
                endpoint=ELASTIC_SEARCH_ENDPOINT,
                api_auth={
                    "apiKeyConfig": {
                        "apiKeyString": f"ApiKey {ELASTIC_SEARCH_API_KEY}"
                    }
                },
                elastic_search_params={
                    "index": INDEX_NAME,
                    "searchTemplate": SEARCH_TEMPLATE_NAME,
                    "numHits": NUM_HITS,
                },
            )
        )
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",  # Or another supported model
        contents="What are the main features of product X?", # Your query
        config=GenerateContentConfig(
            tools=[tool],
        ),
    )

    print(response.text)

### REST

To send a text prompt and ground it with Elasticsearch, send a POST request to
the Agent Platform API. At a minimum, you must provide the request
body. Make sure to do the following replacements:

- <var class="edit" scope="PROMPT" translate="no">PROMPT</var>: The text prompt to ground.
- <var class="edit" scope="ELASTIC_SEARCH_ENDPOINT" translate="no">ELASTIC_SEARCH_ENDPOINT</var>: The absolute endpoint path for the Elasticsearch resource to use.
- <var class="edit" scope="ELASTIC_SEARCH_API_KEY" translate="no">ELASTIC_SEARCH_API_KEY</var>: The API key for the Elasticsearch data endpoint.
- <var class="edit" scope="INDEX_NAME" translate="no">INDEX_NAME</var>: The name of the Elasticsearch index used for grounding.
- <var class="edit" scope="SEARCH_TEMPLATE_NAME" translate="no">SEARCH_TEMPLATE_NAME</var>: The Elasticsearch search template used for grounding.
- <var class="edit" scope="NUM_HITS" translate="no">NUM_HITS</var>: The number of results returned from the
  Elasticsearch data source and used for grounding.

  HTTP method and URL:

      POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent

  Request JSON body:

        {
          "contents": [
            {
              "role": "user",
              "parts": [
                {
                  "text": "PROMPT"
                }
              ]
            }
          ],
          "tools": [{
            "retrieval": {
              "externalApi": {
                "api_spec": "ELASTIC_SEARCH",
                "endpoint": "ELASTIC_SEARCH_ENDPOINT",
                "apiAuth": {
                  "apiKeyConfig": {
                    "apiKeyString": "ApiKey ELASTIC_SEARCH_API_KEY"
                  }
                },
                "elasticSearchParams": {
                  "index": "INDEX_NAME",
                  "searchTemplate": "SEARCH_TEMPLATE_NAME",
                  "numHits": "NUM_HITS",
                }
              }
            }
          }]
        }

For more information on other API fields such as system instructions and
multi-turn chats, see [Generative AI beginner's guide](https://docs.cloud.google.com/vertex-ai/docs/learn/overview).

#### Send the API request

You can save the request body in a file named `request.json`.
Then execute the POST API request, and do the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region to process the request. To use the [global endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#use_the_global_endpoint), exclude the location from the endpoint name, and configure the location of the resource to `global`.
- **<var translate="no">PROJECT_ID</var>** : Your Google Cloud project ID. For more information on project IDs, see [Creating and managing projects](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- **<var translate="no">MODEL_ID</var>**: The model ID of the multimodal model.

      curl -X POST \
          -H "Authorization: Bearer $(gcloud auth print-access-token)" \
          -H "Content-Type: application/json; charset=utf-8" \
          -d @request.json \
      "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent"

You should receive a JSON response similar to the following:

      {
        "candidates": [
          {
            "content": {
              "role": "model",
              "parts": [
                {
                  "text": "Based on the information ..."
                }
              ]
            },
            "finishReason": "STOP",
            "safetyRatings": [ "..." ],
            "groundingMetadata": {
              "groundingChunks": [
                {
                  "retrievedContext": {
                    "text": "ipsum lorem ..."
                  }
                },
                {...},
                {...},
              ],
              "groundingSupports": [
                {
                  "segment": {
                    "startIndex": 25,
                    "endIndex": 147,
                    "text": "ipsum lorem ..."
                  },
                  "groundingChunkIndices": [1,2],
                  "confidenceScores": [0.6626542, 0.82018316],
                },
              ],
            },
          }
        ],
      }

### Understand your response

The response from both APIs include the LLM-generated text, which is called a
*candidate*. If your model prompt successfully grounds to your Elasticsearch
data source, then the responses include grounding metadata, which identifies the
parts of the response that were derived from your Elasticsearch data. However,
there are several reasons this metadata might not be provided, and the prompt
response won't be grounded. These reasons include low-source relevance or
incomplete information within the model's response.

The following is a breakdown of the output data:

- **Role** : Indicates the sender of the grounded answer. Because the response always contains grounded text, the role is always `model`.
- **Text**: The grounded answer generated by the LLM.
- **Grounding metadata** : Information about the grounding source, which contains the following elements:
  - **Grounding chunks**: A list of results from your Elasticsearch index that support the answer.
  - **Grounding supports**: Information about a specific claim within the answer that can be used to show citations:
  - **Segment**: The part of the model's answer that is substantiated by a grounding chunk.
  - **Grounding chunk index**: The index of the grounding chunks in the grounding chunks list that corresponds to this claim.
  - **Confidence scores**: A number from 0 to 1 that indicates how grounded the claim is in the provided set of grounding chunks. Not available for Gemini 2.5 Pro and Gemini 2.5 Flash and later.

## What's next

- To learn how to send chat prompt requests, see [Multiturn chat](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/send-chat-prompts-gemini).
- To learn about responsible AI best practices and Agent Platform's safety filters, see [Safety best practices](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
