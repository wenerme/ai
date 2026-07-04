This page explains how you can ground responses by using your data from
Agent Search.

## Grounding Gemini to your data

If you want to do retrieval-augmented generation (RAG), connect your model to
your website data or your sets of documents, then use [Grounding with
Agent Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-vertex-ai-search#prerequisites).

Grounding to your data supports a maximum of 10 Agent Search
data sources and can be combined with [Grounding with
Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search).

## Supported models

This section lists the models that support grounding with your data.

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

## Prerequisites

Before you can ground model output to your data, do the following:

1. In the Google Cloud console, go to the **IAM** page, and search for the
   `discoveryengine.servingConfigs.search` permission, which is required for the
   grounding service to work.

   [Go to IAM](https://console.cloud.google.com/iam-admin/iam)

   To get the permissions that you need to use grounding with
   Agent Search, ask your administrator to grant you the following
   IAM roles:
   - To read all Discovery Engine resources: **Discovery Engine
     Viewer** (`roles/discoveryengine.viewer`).

   - To read and write all Discovery Engine resources and to create a
     Agent Search instance: **Discovery Engine Editor**
     (`roles/discoveryengine.editor`).

   For more information about IAM, see [IAM roles
   and permissions](https://docs.cloud.google.com/gemini/enterprise/docs/access-control).
2. [Enable AI Applications](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-vertex-ai-search#enable) and activate the API.

3. [Create a AI Applications data source](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-vertex-ai-search#create-data-store) and
   application.

   For more information, see the [Introduction to Agent Search](https://docs.cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction).

### Enable AI Applications

To use Agent Search to ground your responses, you must activate the
Agent Search service by following these steps:

1. In the Google Cloud console, go to the **AI Applications** page.

   [Go to AI Applications](https://console.cloud.google.com/gen-app-builder/engines)
2. Optional: Review the [terms for data use](https://cloud.google.com/retail/data-use-terms).

AI Applications is available in the `global` location or the
`eu` and `us` multi-region. To learn more, see [AI Applications
locations](https://docs.cloud.google.com/generative-ai-app-builder/docs/locations#multi-regions).

### Create a data store in AI Applications

To create a data store in AI Applications, you can choose to
ground with website data or documents.

### Website

1. Open the [**Create Data
   Store**](https://console.cloud.google.com/gen-app-builder/data-stores/create) page from the Google Cloud console.

2. In **Website Content** box, click **Select** .
   **Specify the
   websites for your data store** pane displays.

3. If **Advanced website indexing** isn't checked, then select the **Advanced
   website indexing** checkbox to turn it on.
   **Configure your data store**
   pane displays.

4. In the **Specify URL patterns to index** section, do the following:

   - Add URLs for **Sites to include**.
   - Optional: Add URLs for **Sites to exclude**.
5. Click **Continue**.

6. In the **Configure your data store** pane,

   1. Select a value from the **Location of your data store** list.
   2. Enter a name in the **Your data store name** field. The ID is generated. Use this ID when you generate your grounded responses with your data store. For more information, see [Generate grounded responses
      with your data store](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-vertex-ai-search#generate-grounded-responses-with-data-store).
   3. Click **Create**.

### Documents

1. Open the [**Create Data
   Store**](https://console.cloud.google.com/gen-app-builder/data-stores/create) page from the Google Cloud console.

2. In **Cloud Storage** box, click **Select** .
   **Import data from
   Cloud Storage** pane displays.

3. In the **Unstructured documents (PDF, HTML, TXT and more)** section, select
   **Unstructured documents (PDF, HTML, TXT and more)**.

4. Select a **Synchronization frequency** option.

5. Select a **Select a folder or a file you want to import** option, and
   enter the path in the field.

6. Click **Continue** .
   **Configure your data store** pane displays.

7. In the **Configure your data store** pane,

   1. Select a value from the **Location of your data store** list.
   2. Enter a name in the **Your data store name** field. The ID is generated.
   3. To select parsing and chunking options for your documents, expand the **Document Processing Options** section. For more information about different parsers, see [Parse
      documents](https://docs.cloud.google.com/generative-ai-app-builder/docs/parse-chunk-documents#parsing).
   4. Click **Create**.
8. Click **Create**.

## Generate grounded responses with your data store

Use the following instructions to ground a model with your data. A maximum
of 10 data stores is supported.

If you don't know your data store ID, follow these steps:

1. In the Google Cloud console, go to the **AI Applications** page and
   in the navigation menu, click **Data stores**.

   [Go to the Data stores page](https://console.cloud.google.com/gen-app-builder/data-stores)
2. Click the name of your data store.

3. On the **Data** page for your data store, get the data store ID.

### Console

To ground your model output to AI Applications by using Vertex AI Studio in the
Google Cloud console, follow these steps:

1. In the Google Cloud console, go to the **Vertex AI Studio** page.

   [Go to
   Vertex AI Studio](https://console.cloud.google.com/agent-platform/studio/freeform)
2. To turn on grounding, follow these steps:
   1. Click **+ New** and **Chat** from the navigation menu.
   2. Expand the **Model settings** pane, and select your model.
   3. Optional: If **Structured output** or **Grounding: Google** toggle is on, turn the option off.
   4. Click the **Grounding: Your data** toggle. The **Customize Grounding** pane appears.
      1. Select a grounding source option from the following table:

      | **Grounding option** | **Description** | **Input** |
      |---|---|---|
      | RAG Engine | Grounds using your data and do-it-yourself components. | If you don't have a corpus, you must create one. Otherwise, enter your corpus. |
      | Agent Search | Grounds using your data with a Google-managed search engine. | Enter your path into the **Gemini Enterprise Agent Platform datastore path** field. |
      | Elasticsearch | Grounds using Elasticsearch. | Enter the following information: 1. Enter a value into the **Elasticsearch endpoint** field. 2. Enter a value into the **Elasticsearch API Key** field. 3. Enter a value into the **Elasticsearch index** field. 4. Enter a value into the **Elasticsearch search template** field. |

      2. Click **Save**.
3. Enter your prompt in the text box, and click **Submit**. Your prompt responses are grounded in AI Applications.

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
        VertexAISearch,
        Retrieval,
        Tool,
        HttpOptions,
    )

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    # Replace with your Agent Search data store details
    DATASTORE_PATH = "projects/PROJECT_ID/locations/global/collections/default_collection/dataStores/DATASTORE_ID"

    tool = Tool(
        retrieval=Retrieval(
            vertex_ai_search=VertexAISearch(
                datastore=DATASTORE_PATH
            )
        )
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",  # Or another supported model
        contents="What information can you find about topic X in the provided documents?", # Your query
        config=GenerateContentConfig(
            tools=[tool],
        ),
    )

    print(response.text)

### REST

To test a text prompt by using the Agent Platform API, send a POST request to the
publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region to process the request. To use the [`global`
  endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#use_the_global_endpoint), exclude the location from the endpoint name, and configure the location of the resource to `global`.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- <var class="edit" scope="MODEL_ID" translate="no">MODEL_ID</var>: The model ID of the multimodal model.
- <var class="edit" scope="PROMPT" translate="no">PROMPT</var>: The prompt to send to the model.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent
```

Request JSON body:

```
{
  "contents": [{
    "role": "user",
    "parts": [{
      "text": "PROMPT"
    }]
  }],
  "tools": [{
    "retrieval": {
      "vertexAiSearch": {
        "datastore": projects/PROJECT_ID/locations/global/collections/default_collection/dataStores/DATASTORE_ID
      }
    }
  }],
  "model": "projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID"
}
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "You can make an appointment on the website https://dmv.gov/"
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        "..."
      ],
      "groundingMetadata": {
        "retrievalQueries": [
          "How to make appointment to renew driving license?"
        ],
        "groundingChunks": [
          {
            "retrievedContext": {
              "uri": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AXiHM.....QTN92V5ePQ==",
              "title": "dmv"
            }
          }
        ],
        "groundingSupport": [
          {
            "segment": {
              "startIndex": 25,
              "endIndex": 147
            },
            "segment_text": "ipsum lorem ...",
            "supportChunkIndices": [1, 2],
            "confidenceScore": [0.9541752, 0.97726375]
          },
          {
            "segment": {
              "startIndex": 294,
              "endIndex": 439
            },
            "segment_text": "ipsum lorem ...",
            "supportChunkIndices": [1],
            "confidenceScore": [0.9541752, 0.9325467]
          }
        ]
      }
    }
  ],
  "usageMetadata": {
    "..."
  }
}
```

## Understand your response

The response from both APIs include the LLM-generated text, which is called a
*candidate*. If your model prompt successfully grounds to your data source, then
the responses include grounding metadata, which identifies the parts of the
response that were derived from your data. However, there are several reasons
this metadata may not be provided, and the prompt response won't be grounded.
These reasons include low-source relevance or incomplete information within the
model's response.

The following is a breakdown of the output data:

- **Role** : Indicates the sender of the grounded answer. Because the response always contains grounded text, the role is always `model`.
- **Text**: The grounded answer generated by the LLM.
- **Grounding metadata** : Information about the grounding source, which contains the following elements:
  - **Grounding chunks**: A list of results from your index that support the answer.
  - **Grounding supports**: Information about a specific claim within the answer that can be used to show citations:
  - **Segment**: The part of the model's answer that is substantiated by a grounding chunk.
  - **Grounding chunk index**: The index of the grounding chunks in the grounding chunks list that corresponds to this claim.
  - **Confidence scores**: A number from 0 to 1 that indicates how grounded the claim is in the provided set of grounding chunks. Not available for Gemini 2.5 and later.

## What's next

- To learn how to send chat prompt requests, see [Multiturn chat](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/send-chat-prompts-gemini).
- To learn about responsible AI best practices and Agent Platform's safety filters, see [Safety best practices](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
