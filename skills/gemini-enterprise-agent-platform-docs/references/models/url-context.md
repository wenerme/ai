> [!NOTE]
> To see an example of URL context,
> run the "Intro to URL Context" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/url-context/intro_url_context.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Furl-context%2Fintro_url_context.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/url-context/intro_url_context.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/url-context/intro_url_context.ipynb)

You can use the URL context tool to provide Gemini with URLs as additional
context for your prompt. The model can then retrieve content from the URLs and
use that content to inform and shape its response.

This tool is useful for tasks like the following:

- Extracting key data points or talking points from articles
- Comparing information across multiple links
- Synthesizing data from several sources
- Answering questions based on the content of a specific page or pages
- Analyzing content for specific purposes (like writing a job description or creating test questions)

Note that the index used to pull data may not necessarily be up to date, so some
information may be stale.

This guide explains how to use the URL context tool in the Gemini API.

## Supported models

The following models provide support for URL Context:

#### Click to expand supported models

- [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview
- [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

## Use URL context

You can use the URL context tool in two main ways, by itself or in conjunction
with [Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search).

### URL context only

You can provide specific URLs that you want the model to analyze directly in
your prompt:

    Summarize this document: YOUR_URLs

    Extract the key features from the product description on this page: YOUR_URLs

### Python

    from google import genai
    from google.genai.types import Tool, GenerateContentConfig, HttpOptions, UrlContext

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    model_id = "gemini-3.5-flash"

    url_context_tool = Tool(
        url_context = UrlContext
    )

    response = client.models.generate_content(
        model=model_id,
        contents="Compare recipes from YOUR_URL1 and YOUR_URL2",
        config=GenerateContentConfig(
            tools=[url_context_tool],
            response_modalities=["TEXT"],
        )
    )

    for each in response.candidates[0].content.parts:
        print(each.text)
    # get URLs retrieved for context
    print(response.candidates[0].url_context_metadata)

### Javascript

    # Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
    # with appropriate values for your project.
    export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
    export GOOGLE_CLOUD_LOCATION=global
    export GOOGLE_GENAI_USE_ENTERPRISE=True

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({
      vertexai: true,
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION,
      apiVersion: 'v1',
    });

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
            "Compare recipes from YOUR_URL1 and YOUR_URL2",
        ],
        config: {
          tools: [{urlContext: {}}],
        },
      });
      console.log(response.text);
      // To get URLs retrieved for context
      console.log(response.candidates[0].urlContextMetadata)
    }

    await main();

### REST

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://aiplatform.googleapis.com/v1beta1/projects/GOOGLE_CLOUD_PROJECT/locations/global/publishers/google/models/gemini-3.5-flash:generateContent \
      -d '{
          "contents": [
              {
                  "role": "user",
                  "parts": [
                      {"text": "Compare recipes from YOUR_URL1 and YOUR_URL2"}
                  ]
              }
          ],
          "tools": [
              {
                  "url_context": {}
              }
          ]
      }' > result.json

    cat result.json

### Grounding with Google Search with URL context

You can also enable both URL context and Grounding with Google Search,
using prompts with or without URLs. The model may first
search for relevant information and then use the URL context tool to read the
content of the search results for a more in-depth understanding.

This feature is experimental and available in API version `v1beta1`.

Example prompts:

    Give me a three day event schedule based on YOUR_URL. Also let me know what needs to taken care of considering weather and commute.

    Recommend 3 books for beginners to read to learn more about the latest YOUR_SUBJECT.

### Python

    from google import genai
    from google.genai.types import Tool, GenerateContentConfig, HttpOptions, UrlContext, GoogleSearch

    client = genai.Client(http_options=HttpOptions(api_version="v1beta1"))
    model_id = "gemini-3.5-flash"

    tools = []
    tools.append(Tool(url_context=UrlContext))
    tools.append(Tool(google_search=GoogleSearch))

    response = client.models.generate_content(
        model=model_id,
        contents="Give me three day events schedule based on YOUR_URL. Also let me know what needs to taken care of considering weather and commute.",
        config=GenerateContentConfig(
            tools=tools,
            response_modalities=["TEXT"],
        )
    )

    for each in response.candidates[0].content.parts:
        print(each.text)
    # get URLs retrieved for context
    print(response.candidates[0].url_context_metadata)

### Javascript

    # Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
    # with appropriate values for your project.
    export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
    export GOOGLE_CLOUD_LOCATION=global
    export GOOGLE_GENAI_USE_ENTERPRISE=True

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({
      vertexai: true,
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION,
      apiVersion: 'v1beta1',
    });

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
            "Give me a three day event schedule based on YOUR_URL. Also let me know what needs to taken care of considering weather and commute.",
        ],
        config: {
          tools: [{urlContext: {}}, {googleSearch: {}}],
        },
      });
      console.log(response.text);
      // To get URLs retrieved for context
      console.log(response.candidates[0].urlContextMetadata)
    }

    await main();

### REST

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://aiplatform.googleapis.com/v1beta1/projects/GOOGLE_CLOUD_PROJECT/locations/global/publishers/google/models/gemini-3.5-flash:generateContent \
      -d '{
          "contents": [
              {
                  "role": "user",
                  "parts": [
                      {"text": "Give me a three day event schedule based on YOUR_URL. Also let me know what needs to taken care of considering weather and commute."}
                  ]
              }
          ],
          "tools": [
              {
                  "url_context": {}
              },
              {
                  "google_search": {}
              }
          ]
      }' > result.json

    cat result.json

For more details about Grounding with Google Search, see the
[overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/overview) page.

### Web Grounding for Enterprise with URL context

You can enable both URL context and Web Grounding for Enterprise
if you have specific compliance needs or are in a regulated industry
like health, finance, or the public sector. The web index used in Web Grounding for Enterprise
is more limited than the standard Grounding with Google Search index, as it
uses a subset of what's available on Google Search.

For more details about Web Grounding for Enterprise, see the
[Web Grounding for Enterprise](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/web-grounding-enterprise) page.

### Contextual response

The model's response is based on the content it retrieved from the URLs. If the
model retrieved content from URLs, the response will include
`url_context_metadata`. Such a response might look something like the following
(parts of the response have been omitted for brevity):

    {
      "candidates": [
        {
          "content": {
            "parts": [
              {
                "text": "... \n"
              }
            ],
            "role": "model"
          },
          ...
          "url_context_metadata":
          {
              "url_metadata":
              [
                {
                  "retrieved_url": "https://cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/code-execution",
                  "url_retrieval_status": <UrlRetrievalStatus.URL_RETRIEVAL_STATUS_SUCCESS: "URL_RETRIEVAL_STATUS_SUCCESS">
                },
                {
                  "retrieved_url": "https://cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search",
                  "url_retrieval_status": <UrlRetrievalStatus.URL_RETRIEVAL_STATUS_SUCCESS: "URL_RETRIEVAL_STATUS_SUCCESS">
                },
              ]
            }
        }
      ]
    }

For more information about this object, see the
[`UrlContextMetadata`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/GenerateContentResponse#UrlContextMetadata) API reference.

### Live fetch

The URL context tool fetches live versions of web pages to keep your information
current.

> [!NOTE]
> **Note:** Don't put any sensitive or confidential information in the URLs. Both the URLs and the data in the pages, files, etc that the URLs identify are handled as Service Data. The URL context tool adheres to `robots.txt` policies when fetching data.

To efficiently retrieve web page content, the URL context tool uses a two-stage
process designed to balance speed, cost, and access to the most current
information:

1. **Indexed content retrieval**: This is the first stage. When you provide a
   URL, the tool first attempts to fetch the content from Google's
   extensive and highly optimized web index. This method provides fast access to
   a vast collection of crawled web pages.

2. **Live fetch fallback**: This is the second stage. If the content for a given
   URL isn't available in the index (for example, if the page is very new and
   not yet indexed), the tool automatically performs a live fetch. This fallback
   mechanism can directly access the URL, and retrieve the latest version of the
   content in real-time.

### Safety checks

The system performs a content moderation check on the URL to confirm that the
URL meets safety standards. If the URL that you provided fails this check, you
get a `url_retrieval_status` of `URL_RETRIEVAL_STATUS_UNSAFE`.

### Token count

The input token count includes content retrieved from the URLs that you specify
in your prompt. From the model output, you can see the token count for your
prompt and tools usage in the `usage_metadata` object. The following is an
example output:

    'usage_metadata': {
      'candidates_token_count': 45,
      'prompt_token_count': 27,
      'prompt_tokens_details': [{'modality': <MediaModality.TEXT: 'TEXT'>,
        'token_count': 27}],
      'thoughts_token_count': 31,
      'tool_use_prompt_token_count': 10309,
      'tool_use_prompt_tokens_details': [{'modality': <MediaModality.TEXT: 'TEXT'>,
        'token_count': 10309}],
      'total_token_count': 10412
      }

Price per token depends on the model that you use. For more information, see
[Cost of building and deploying AI models in
Gemini Enterprise Agent Platform](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).

## Supported and unsupported content types

The URL context tool can extract content from URLs with the following content
types:

| **Content** | **Type** |
|---|---|
| Text | `text/html` `application/json` `text/plain` `text/xml` `text/css` `text/javascript` `text/csv` `text/rtf` |
| Image | `image/png` `image/jpeg` `image/bmp` `image/webp` |
| PDF | `application/pdf` |

The URL context tool doesn't support the following content types:

- Paywalled content
- YouTube videos (For more information, see [Video
  understanding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/video-understanding).)
- Google Workspace files like Google Docs or Google Sheets
- Video and audio files

## Limitations

- The URL context tool consumes up to 20 URLs per request for analysis.
- For best results during experimental phase, use the tool on standard web pages rather than multimedia content such as YouTube videos.
