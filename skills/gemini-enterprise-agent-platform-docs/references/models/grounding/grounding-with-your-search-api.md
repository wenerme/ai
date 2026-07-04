You can connect Gemini to your external data sources by grounding with
your search API. This lets you use any search service as a grounding source for
Gemini, which helps to ensure that responses are based on the
latest and most relevant information from your systems. This is particularly
useful for enterprise-specific data that isn't publicly available.

This page explains how to configure and use grounding using any search API with
Gemini.

## How grounding with your search API works

When you ground with your search API, Gemini can query an
external API endpoint that you provide. This allows Gemini to use
your custom search functionality as a tool to enhance its responses. It enables
more dynamic and context-aware interactions, as the model can seek out
information from your specified data sources when needed.

During a generation request, Gemini can make a call to the
external API endpoint with a search query. Your API should then return relevant
data snippets. Gemini uses these snippets as a source of truth to
generate a more accurate and grounded response.

You can combine grounding using your search API with other grounding sources
like Google Search. A generation request supports up to 10 grounding
sources and multi-tool queries where Gemini can take advantage of
different information sources to generate the best possible answer.

## Supported models

This section lists the models that support grounding with your search API.

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

## Before you begin

To use grounding with your search API, do the following:

1. Ensure that [Agent Platform API is enabled](https://console.cloud.google.com/apis/library/aiplatform.googleapis.com) in your Google Cloud project.
2. If you plan to follow the detailed setup guide for creating a new search API endpoint, make sure you have the [Google Cloud CLI installed and
   initialized](https://docs.cloud.google.com/sdk/docs/install).

## Search API requirements

To use your existing search infrastructure with
Gemini, your API endpoint must meet the following requirements:

### API schema

- **HTTP method** : `POST`
- **Request Body (from Gemini to your API)**:

      {
        "query": "the user's search query string"
      }

- **Response body (from your API to Gemini)**: A JSON array of objects. Each
  object represents a search result and must contain snippet and uri fields.

      [
        {
          "snippet": "A text snippet containing the answer or relevant information.",
          "uri": "A URI/URL linking to the source of the information, or a relevant identifier."
        },
        {
          "snippet": "Another piece of information.",
          "uri": "https://example.com/another-source"
        }
      ]

If no results are found, your API endpoint should return an empty array.

### Authentication

Grounding with your search API supports the use of the API key, which secures
your API endpoint. Gemini sends this API key as a query parameter
named `key`.

## Use grounding with your search API with a compatible endpoint

If you already have an API endpoint that meets the schema and authentication
requirements, you can directly configure it in your Gemini API
calls.

### Configure the `externalApi` tool

When making a request to the Gemini API, include the tools
parameter with a retrieval tool configured for the `externalApi`. Key fields
include the following:

- **`api_spec: "SIMPLE_SEARCH"`**: This tells Gemini to use the predefined input and output schema.
- **`endpoint`** : The full URL to your API Gateway endpoint, such as `https://YOUR_GATEWAY_HOSTNAME/v0/search`.
- **`apiAuth.apiKeyConfig.apiKeyString`** : The API key that Gemini uses to authenticate with your API. Gemini appends this key as `?key=<YOUR_API_KEY>` to the endpoint URL.

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
          ExternalApi,
          Retrieval,
          Tool,
          HttpOptions,
      )

      client = genai.Client(http_options=HttpOptions(api_version="v1"))

      # Replace with your API details
      EXTERNAL_API_ENDPOINT = "YOUR_EXTERNAL_API_ENDPOINT"  # e.g., https://YOUR_GATEWAY_HOSTNAME/v0/search
      EXTERNAL_API_KEY = "YOUR_EXTERNAL_API_KEY"

      tool = Tool(
          retrieval=Retrieval(
              external_api=ExternalApi(
                  api_spec="SIMPLE_SEARCH",
                  endpoint=EXTERNAL_API_ENDPOINT,
                  api_auth={
                      "apiKeyConfig": {
                          "apiKeyString": EXTERNAL_API_KEY
                      }
                  }
              )
          )
      )

      response = client.models.generate_content(
          model="gemini-2.5-flash",  # Or another supported model
          contents="What can you tell me about product Y based on my API?", # Your query
          config=GenerateContentConfig(
              tools=[tool],
          ),
      )

      print(response.text)

### REST

Before using any of the request data, make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region to process the request. To use the [global endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#use_the_global_endpoint), exclude the location from the endpoint name,and configure the location of the resource to `global`.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var class="edit" scope="MODEL_ID" translate="no">MODEL_ID</var>: The model ID of a compatible Gemini model, such as `gemini-2.5-flash`.
- <var class="edit" scope="PROMPT" translate="no">PROMPT</var>: The text instructions to include in the prompt.
- <var class="edit" scope="EXTERNAL_API_ENDPOINT" translate="no">EXTERNAL_API_ENDPOINT</var>: The full URL to your secured API Gateway endpoint that Gemini calls, such as `https://YOUR_GATEWAY_HOSTNAME/v0/search`. This endpoint must adhere to the specified API schema.
- <var class="edit" scope="EXTERNAL_API_KEY" translate="no">EXTERNAL_API_KEY</var>: The API key that you generated and configured for your
  API Gateway. Gemini uses this key to authenticate
  with your endpoint.

  HTTP method and URL:

      POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent

  Request JSON body:

        {
        "contents": [{
            "role": "user",
            "parts": [{
                "text": "PROMPT"
            }]
        }],
        "tools": [{
            "retrieval": {
              "externalApi": {
                "api_spec": "SIMPLE_SEARCH",
                "endpoint": "EXTERNAL_API_ENDPOINT",
                "apiAuth": {
                  "apiKeyConfig": {
                    "apiKeyString": "EXTERNAL_API_KEY"
                  }
                }
              }
            }
        }]
      }

  To send your request, use one of these options:

  ### curl

  The following command assumes that you have logged in to the
  gcloud CLI with your user account by running
  gcloud CLI init or gcloud CLI auth login , or by
  using Cloud Shell, which automatically logs you into the
  gcloud CLI. You can check the active account by running
  gcloud CLI auth list.

  Save the request body in a file named `request.json`, and execute the
  following command:

      curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      -d @request.json \
      "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent"

  ### Powershell

  The following command assumes that you have logged in to the
  gcloud CLI with your user account by running
  gcloud CLI init or gcloud CLI auth login. You can
  check the active account by running gcloud CLI auth list.

  Save the request body in a file named `request.json`, and execute the
  following command:

      $cred = gcloud auth print-access-token
      $headers = @{ "Authorization" = "Bearer $cred" }

      Invoke-WebRequest `
        -Method POST `
        -Headers $headers `
        -ContentType: "application/json; charset=utf-8" `
        -InFile request.json `
        -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent" | Select-Object -Expand Content

  You should receive a JSON response similar to the following:

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
                    "uri": "https://...",
                    "snippet": "Snippet text about driving license renewal"
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

## Set up a search API endpoint

If you don't have an existing API endpoint that meets the requirements, this
section guides you through setting one up using Cloud Functions and
API Gateway.

### Create your external API wrapper with Cloud Functions

A Cloud Function can act as an intermediary that receives queries from
Gemini, issues appropriate queries to your existing search
infrastructure, such as a database, internal search engine, or vector search,
and then formats the results in the schema Gemini understands.

For more information, see [Cloud Run functions documentation](https://docs.cloud.google.com/functions/docs).

#### Example Cloud Function setup (Python)

This example uses a hardcoded product list for demonstration. You'll need to
replace the data retrieval logic with calls to your actual search system.

1. `main.py`

       import functions_framework
       import json
       from flask import jsonify

       @functions_framework.http
       def custom_search_wrapper(request):
           """
           HTTP Cloud Function to provide a minimal, fixed response for Gemini grounding.
           """
           if request.method != 'POST':
               return 'Only POST requests are accepted', 405

           request_json = request.get_json(silent=True)

           if not request_json or 'query' not in request_json:
               return jsonify({"error": "Invalid request. JSON body with 'query' field is required."}), 400

           user_query = request_json['query']
           print(f"Received query: '{user_query}'. Responding with fixed data.")

           # --- FIXED RESPONSE ---
           # This is a hardcoded response. In a real scenario, you would
           # use the 'user_query' to fetch relevant data.
           fixed_results = [
               {
                   "snippet": "This is a fixed snippet from your custom Search API. The original query was: " + user_query,
                   "uri": "https://example.com/docs/fixed-test-data"
               },
               {
                   "snippet": "Another piece of fixed information to demonstrate the list format.",
                   "uri": "https://example.com/another-fixed-source"
               }
           ]
           # --- END OF FIXED RESPONSE ---

           return jsonify(fixed_results)

2. `requirements.py`

       functions-framework>=3.0.0
       Flask>=2.0.0

3. Deployment: Navigate to the directory containing `main.py` and
   `requirements.txt` and run:

       gcloud functions deploy custom_search_wrapper \
         --runtime python311 \
         --trigger-http \
         --entry-point custom_search_wrapper \
         --region YOUR_REGION \
         --allow-unauthenticated \
         --gen2

   - Replace YOUR_REGION with your chosen Google Cloud region, such as `us-central1`.
   - `--allow-unauthenticated` is specified because API Gateway handles authentication.

   > [!IMPORTANT]
   > **Important:** The trigger URL after deployment has a format of `https://....run.app`. Use this format for the API Gateway configuration in the next step.

### Secure the Cloud Functions with API Gateway and an API key

API Gateway provides a secure, managed entry point to your
Cloud Functions and lets you enforce API key authentication.

For more information, see [API Gateway documentation](https://docs.cloud.google.com/api-gateway/docs).

1. **Create an OpenAPI specification (`openapi-spec.yaml`)** : This file defines
   how API Gateway exposes your Cloud Functions. It
   specifies that the gateway expects a `POST` request to the `/v0/search` path
   and requires an API key sent as a query parameter named `key`.

       swagger: '2.0'
       info:
         title: Custom Search API for Gemini Grounding
         description: Wraps an internal search function, secured by API Key for Gemini.
         version: 1.0.0
       schemes:
         - https
       produces:
         - application/json
       consumes:
         - application/json
       paths:
         /v0/search: # TODO: This will be part of API endpoint URL change if necessary
           post:
             summary: Custom search endpoint for Gemini
             operationId: customSearchForGemini # TODO: Change if needed
             x-google-backend:
               address: YOUR_CLOUD_FUNCTION_TRIGGER_URL # TODO: Replace with your Cloud Function trigger URL
             parameters:
               - name: body
                 in: body
                 required: true
                 schema:
                   type: object
                   properties:
                     query:
                       type: string
             security:
               - api_key_query: []
             responses:
               '200':
                 description: Search results
                 schema:
                   type: array
                   items:
                     type: object
                     properties:
                       snippet:
                         type: string
                       uri:
                         type: string
               '400':
                 description: Invalid request
               '401':
                 description: Unauthorized (Missing or invalid API key)
               '500':
                 description: Internal server error
       securityDefinitions:
         api_key_query:
           type: apiKey
           name: key # Gemini will send its API key using this query parameter name
           in: query

   > [!IMPORTANT]
   > **Important:** Replace `YOUR_CLOUD_FUNCTION_TRIGGER_URL` with the trigger URL that you noted when deploying your Cloud Functions.

2. **Deploy API Gateway**: After you replace the following
   variables, execute the gcloud CLI commands:

   - **<var translate="no">YOUR_PROJECT_ID</var>**: Your Google Cloud project ID.
   - **<var translate="no">YOUR_REGION</var>** : The Google Cloud region that you used for your Cloud Functions, such as `us-central1`.

       # 1. Create an API
       gcloud api-gateway apis create custom-search-gemini-api --project=YOUR_PROJECT_ID

       # 2. Create an API Config from your OpenAPI spec
       gcloud api-gateway api-configs create v1 \
         --api=custom-search-gemini-api \
         --openapi-spec=openapi-spec.yaml \
         --project=YOUR_PROJECT_ID \
         --display-name="Version 1"

       # 3. Create a Gateway
       gcloud api-gateway gateways create custom-search-gateway \
         --api=custom-search-gemini-api \
         --api-config=v1 \
         --location=YOUR_REGION \
         --project=YOUR_PROJECT_ID

   After deployment, the hostname (gateway URL) has the following format:

   `https://custom-search-gateway-UNIQUE_ID.nw.gateway.dev`

   You can use the hostname to construct the full endpoint URL for
   Gemini. For example:

   `https://custom-search-gateway-UNIQUE_ID.nw.gateway.dev/v0/search`
3. **Create and restrict an API Key** : You must create an API key that
   Gemini uses to access your API Gateway endpoint.
   For more information, see [Manage API keys](https://docs.cloud.google.com/docs/authentication/api-keys).

   To create and restrict an API key, do the following:
   1. In the Google Cloud console, go to the **API Gateway / Enable APIs** page.

      [Go to **API Gateway API / Enable APIs**](https://console.cloud.google.com/api-gateway/enable_api)

   2. If the API Gateway API isn't enabled, click **Launch** , and click
      **Enable**.

   3. Select **Credentials**.

   4. Click **Create credentials** , and select **API key**.

   5. Click **Show key**, and copy the generated API key. Store the key in a
      secure location. This key is used by Gemini.

   6. Click **Edit API key**, or click the key name.

   7. In the **API restrictions** section, do the following:

      1. Select the **Restrict key** option.

      2. Select your API Gateway managed service. It must be named
         after your API, such as `Custom Search API for Gemini Grounding API`.

      3. If the key isn't included or if you intend to manage the gateway with
         the API using this key, ensure that the
         **API Gateway API** (`apigateway.googleapis.com`) is
         selected. For grounding, the key needs access to your specific API
         service hosted by API Gateway.

      > [!NOTE]
      > **Note:** Usually a separate key or service account is used for management.

   8. Click **Save**. Your API Gateway endpoint is secured, and
      when you use the API Gateway endpoint, you must pass the API
      key as a query parameter. For example:

      `https://custom-search-gateway-UNIQUE_ID.nw.gateway.dev/v0/search?key=YOUR_GENERATED_API_KEY`

## Considerations for your search API

Review the following considerations to help you choose your search API:

- **Snippet quality**: The snippet text returned by your API is crucial. It should be concise yet informative enough for Gemini to use as a factual basis for its response.
- **Latency**: Your search API should respond quickly. High latency in your API increases the overall response time from Gemini.
- **Error handling**: Implement robust error handling in your Cloud Functions or search API. If your API frequently errors or times out, it negatively impacts Gemini's ability to generate grounded responses.

## What's next

- [Grounding with
  Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search).
