> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

[Parallel Web Systems](https://Parallel.ai) offers a search API that provides
access to publicly available web data that's optimized for use by large language
models for grounding. This page explains how to ground Gemini responses
by using Parallel.

Grounding with Parallel on Gemini Enterprise Agent Platform is a Separate Offering (as defined
in your Google Cloud Agreement) that connects Gemini models to public
web data provided by [Parallel Web Systems' search API](https://Parallel.ai).
This service gives Gemini access to live information from billions of
web pages to ensure more up-to-date and factual responses.

> [!NOTE]
> **Note:** For web publishers, grounding with Parallel on Gemini Enterprise Agent Platform does not use web pages for grounding that have disallowed ShapBot. Web publishers can [manage their opt outs with a robots.txt file.](https://docs.parallel.ai/resources/crawler)

## Use cases

Grounding with Parallel is suitable for use cases such as the following:

- Using web data for information completion or enrichment purposes.
- Multi-hop agents that require deeper web searches for more complex questions.
- Building an API that integrates web search data.
- Employee-facing assistants that allow end users to ask questions and create complex reports using the latest web information.
- Consumer-facing applications, like retail and travel, that allow the user to make informed purchase decisions.
- Automated agents that run autonomously to perform automated tasks, like news analysis and KYC checks.
- Vertical agents (sales agents, coding agents, finance agents) getting the latest up-to-date context from the web.

**Example**

*Who won the 2025 Las Vegas F1 Grand Prix?*

| Without Grounding | With Grounding |
|---|---|
| The 2025 Las Vegas Grand Prix has not happened yet. The race is scheduled to take place on the weekend of November 20-22, 2025. Therefore, the winner is unknown. | The winner of the 2025 Las Vegas F1 Grand Prix was Max Verstappen of Red Bull Racing. The race took place on November 22, 2025. **Sources:** domain1.com, domain2.com, ... |

## Supported models

Grounding with Parallel web search is supported by the following models:

- Gemini 2.5 Flash (`gemini-2.5-flash`)
- Gemini 2.5 Flash-Lite (`gemini-2.5-flash-lite`)
- Gemini 2.5 Pro (`gemini-2.5-pro`)
- Gemini 3.1 Pro (`gemini-3.1-pro-preview`)
- Gemini 3.1 Flash Lite (`gemini-3.1-flash-lite`)
- Gemini 3.5 Flash (`gemini-3.5-flash`)

## Before you begin

To use Grounding with Parallel Web Search, you must set up your access. You have
two options:

- Subscribe directly to Grounding with Parallel Web Search on
  [Google Cloud Marketplace](https://console.cloud.google.com/marketplace/product/parallel-web-systems-public/parallel-web-systems)
  ([Preview](https://cloud.google.com/products#product-launch-stages)) for a
  streamlined integration within your existing cloud environment.

- Use an existing Parallel API key.

### Subscribe on Google Cloud Marketplace (recommended)

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

Integrating through Google Cloud Marketplace lets you manage your Grounding with
Parallel Web Search service directly within Google Cloud. To get started,
subscribe to the Grounding with Parallel Web Search service on
Google Cloud Marketplace, accept the terms of service, and review the pricing.

> [!NOTE]
> **Note:** When you subscribe to Grounding with Parallel Web Search on Google Cloud Marketplace, Google Cloud is required to send certain data, such as queries derived and rewritten from the original user prompt, to Parallel Web Search for processing. Your use of the Parallel Web Search service is governed by the Google Cloud Marketplace terms of use for Parallel Web Search.

### Bring your own API key

If you prefer to manage your Parallel billing and API access separately, you can
provide your own API key. To use this method, you need to get an API key from
the [Parallel developer platform](https://platform.parallel.ai). This API key is
used directly in your REST API requests to Gemini.

> [!NOTE]
> **Note:** When you bring your own API key, Google Cloud is required to send certain data, such as queries derived and rewritten from the original user prompt, to Parallel Web Search for processing. Your use of the Parallel Web Search service is governed by the Parallel [terms of use](https://parallel.ai/customer-terms) and [acceptable use policy](https://parallel.ai/acceptable-use-policy).

## Ground Gemini responses with Parallel

Request grounded responses from Gemini by using the REST API as
follows. For best performance, we recommend using default settings for optional
parameters unless you strictly require non-default values.

If you subscribed to Grounding with Parallel Web Search on Google Cloud Marketplace
([Preview](https://cloud.google.com/products#product-launch-stages)), verify
that the billing account used for your subscription is active in your
Google Cloud project.

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region to process the request. To use the global endpoint, exclude the location from the endpoint name and configure the location of the resource to \`global\`.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var class="edit" scope="MODEL_ID" translate="no">MODEL_ID</var>: The ID of the model to use.
- <var class="edit" scope="TEXT" translate="no">TEXT</var>: The text prompt to send to the model.
- <var class="edit" scope="API_KEY" translate="no">API_KEY</var>: Your API key for Parallel Web Search. If you specify an API key and are also subscribed to Grounding with Parallel Web Search on Google Cloud Marketplace ([Preview](https://cloud.google.com/products#product-launch-stages)), the API key takes precedence.
- <var class="edit" scope="EXCLUDE_DOMAINS" translate="no">EXCLUDE_DOMAINS</var>: Optional: List of domains to exclude from grounding sources. If specified, sources from these domains are excluded. Acceptable values are domains (www.example.com) or domain extensions starting with a period ( .gov, .edu, .co.uk). You can specify up to 10 domains.
- <var class="edit" scope="INCLUDE_DOMAINS" translate="no">INCLUDE_DOMAINS</var>: Optional: List of domains to include in grounding sources. If specified, sources from these domains are included. Acceptable values are domains (www.example.com) or domain extensions starting with a period ( .gov, .edu, .co.uk). You can specify up to 10 domains.
- <var class="edit" scope="MAX_CHARS_PER_RESULT" translate="no">MAX_CHARS_PER_RESULT</var>: Optional: The maximum number of characters to include in each search result excerpt. If not specified, defaults to `30000`. The allowed range is `[1000, 100000]`.
- <var class="edit" scope="MAX_CHARS_TOTAL" translate="no">MAX_CHARS_TOTAL</var>: Optional: The maximum total characters from all search result excerpts. If not specified, defaults to `100000`. The allowed range is `[1000, 1000000]`.
- <var class="edit" scope="MAX_RESULTS" translate="no">MAX_RESULTS</var>: Optional: The maximum number of search results to use for grounding. If not specified, defaults to `10`. The allowed range is `[1, 20]`.
- <var class="edit" scope="MODE" translate="no">MODE</var>: Optional: Mode to be used for the request either `basic` or `advanced`. The default is `basic`. Consider `advanced` mode if you want more thorough search results at the expense of higher latency.
- <var class="edit" scope="SEARCH_LOCATION" translate="no">SEARCH_LOCATION</var>: Optional: [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) for geo-targeted search results. Example: `"us"`.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent
```

Request JSON body:

```
{
  "contents": [{
    "role": "user",
    "parts": [{
      "text": "TEXT"
    }]
  }],
  "tools": [{
    "parallelAiSearch": {
        "api_key": "API_KEY",
        "customConfigs": {
            "mode": "MODE",
            "location": "SEARCH_LOCATION",
            "max_results": MAX_RESULTS,
            "source_policy": {
                "exclude_domains": ["EXCLUDE_DOMAINS"],
                "include_domains": ["INCLUDE_DOMAINS"],
            },
            "excerpts": {
                "max_chars_per_result": MAX_CHARS_PER_RESULT,
                "max_chars_total": MAX_CHARS_TOTAL
            }
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
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "The most recent Super Bowl was Super Bowl LIX (59), which was played in 2025. The winner of Super Bowl LIX was the **Philadelphia Eagles**, who defeated the Kansas City Chiefs with a score of 40-22."
          }
        ]
      },
      "finishReason": "STOP",
      "groundingMetadata": {
        "webSearchQueries": [
          "who won the last super bowl"
        ],
        "groundingChunks": [
          {
            "web": {
              "uri": "https://...",
              "title": "Super Bowl LIX",
              "domain": "domain.com"
            }
          },
          {
            "web": {
              "uri": "https://...",
              "title": "Super Bowl LIX Results",
              "domain": "domain.com"
            }
          }
        ],
        "groundingSupports": [
          {
            "segment": {
              "endIndex": 77,
              "text": "The most recent Super Bowl was Super Bowl LIX (59), which was played in 2025."
            },
            "groundingChunkIndices": [
              0,
              1
            ]
          },
          {
            "segment": {
              "startIndex": 78,
              "endIndex": 198,
              "text": "The winner of Super Bowl LIX was the **Philadelphia Eagles**, who defeated the Kansas City Chiefs with a score of 40-22."
            },
            "groundingChunkIndices": [
              0
            ]
          },
        ]
      }
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 33,
    "candidatesTokenCount": 106,
    "totalTokenCount": 284,
    "billablePromptUsage": {
      "textCount": 142
    },
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 33
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 106
      }
    ],
    "toolUsePromptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 39
      }
    ],
    "toolUsePromptTokenCount": 39,
    "thoughtsTokenCount": 106
  },
  "modelVersion": "MODEL_VERSION",
  "createTime": "CREATE_TIME",
  "responseId": "RESPONSE_ID"
}
```

## Quota

The default quota is 200 prompts per minute. To request an increase to your rate
limits, provide your use case and requirements to the appropriate contact:

- **If you subscribed to Grounding with Parallel Web Search on
  Google Cloud Marketplace
  ([Preview](https://cloud.google.com/products#product-launch-stages)):**
  Contact your Google account team.

- **If you provide your own API key:** Contact
  [support@parallel.ai](mailto:support@parallel.ai) and your Google account
  team.

## Billing

The use of Grounding with Parallel Web Search incurs the following charges:

- **Gemini token consumption:** You can be billed for:

  - Prompt tokens
  - Thinking tokens
  - Output tokens

  For more information, see
  [Pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).
- **Gemini's Grounding with your data:** For more information, see
  [Pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).

- **Pricing for the use of the Parallel Web Search API:**

  - If you subscribed to Grounding with Parallel Web Search on
    Google Cloud Marketplace
    ([Preview](https://cloud.google.com/products#product-launch-stages)),
    see the
    [Parallel pricing](https://console.cloud.google.com/marketplace/product/parallel-web-systems-public/parallel-web-systems)
    section on Google Cloud Marketplace for more information.

  - If you provide your own API key, see the
    [Parallel website](https://parallel.ai/pricing) for more information.
