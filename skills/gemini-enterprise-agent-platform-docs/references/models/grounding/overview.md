> [!NOTE]
> To see an example of grounding,
> run the "Intro to grounding" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/grounding/intro-grounding-gemini.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgrounding%2Fintro-grounding-gemini.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/grounding/intro-grounding-gemini.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/grounding/intro-grounding-gemini.ipynb)

[Video](https://www.youtube.com/watch?v=Ph0g6dnsB4g)

In generative AI, grounding is the ability to connect model output to verifiable
sources of information. If you provide models with access to specific data
sources, then grounding tethers their output to these data and reduces the
chances of inventing content. This is particularly important in situations where
accuracy and reliability are significant.

Grounding provides the following benefits:

- Reduces model hallucinations, which are instances where the model generates content that isn't factual.
- Anchors model responses to your data sources.
- Provides auditability by providing grounding support, which are links to sources.

You can ground supported-model output in Gemini Enterprise Agent Platform in the following ways:

| **Grounding type** | **Description** |
|---|---|
| [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search) | Connect your model to world knowledge and a wide possible range of topics using results from Google's search engine. |
| [Grounding with Google Maps](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-maps) | Use Google Maps data with your model to provide more accurate and context-aware responses to your prompts, including geospatial context. |
| [Grounding with Agent Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-vertex-ai-search) | Use retrieval-augmented generation (RAG) to connect your model to your website data or your sets of documents stored in Agent Search. |
| [Grounding with RAG Engine on Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-overview) | Ground using your data through RAG Engine on Gemini Enterprise Agent Platform, which is a configurable managed RAG service. |
| [Grounding with Elasticsearch](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-elasticsearch) | Use retrieval-augmented generation with your existing Elasticsearch indexes and Gemini. |
| [Grounding with your search API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-your-search-api) | Connect Gemini to your external data sources by grounding with any search API. |
| [Web Grounding for Enterprise](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/web-grounding-enterprise) | Use a web index suitable for highly-regulated industries to generate grounded responses with compliance controls. |
| [Grounding with Parallel web search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-parallel) | Connect Gemini to an LLM-optimized web index to use the most recent information from the web. |

For language support, see
[Supported languages for prompts](https://docs.cloud.google.com/gemini/docs/codeassist/supported-languages#supported_languages_for_prompts).

## What's next

- To learn more about responsible AI best practices and Gemini Enterprise Agent Platform's safety filters, see [Responsible AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
