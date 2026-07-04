> [!NOTE]
> To see an example of context caching,
> run the "Intro to context caching" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/context-caching/intro_context_caching.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fcontext-caching%2Fintro_context_caching.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/context-caching/intro_context_caching.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/context-caching/intro_context_caching.ipynb)

Context caching helps reduce the cost and latency of requests to
Gemini that contain repeated content. Gemini Enterprise Agent Platform offers two
types of caching:

- **Implicit caching:** Automatic caching enabled by default that provides cost savings when cache hits occur.
- **Explicit caching:** Manual caching enabled using the Gemini Enterprise API, where you explicitly declare the content you want to cache and whether or not your prompts should refer to the cached content.

For both implicit and explicit caching, the [`cachedContentTokenCount`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/GenerateContentResponse)
field in your response's metadata indicates the number of tokens in the cached
part of your input.

## Caching storage costs

For both implicit and explicit caching, you're billed for the input tokens used
to create the cache at the standard input token price. For explicit caching,
there are also storage costs based on how long caches are stored. There are no
storage costs for implicit caching. For more information, see [Agent Platform pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#context-caching).

## Implicit caching

All Google Cloud projects have implicit caching enabled by default. Implicit
caching provides a 90% discount on cached tokens compared to standard
input tokens.

When enabled, implicit cache hit cost savings are automatically passed on to
you. To increase the chances of an implicit cache hit:

- Place large and common contents at the beginning of your prompt.
- Send requests with a similar prefix in a short amount of time.

### Supported models

Implicit caching is supported when using the following models:

#### Click to expand supported models

- [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)
- [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview
- [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

Implicit caching also supports the latest aliases, including:

- `gemini-flash-latest`
- `gemini-flash-lite-latest`

Implicit caching also supports Open Models. For more information, see
[Agent Platform open models for MaaS](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/use-open-models#context-caching).

## Explicit caching

Explicit caching offers more control and ensures a discount on input tokens
that reference an existing context cache. On Gemini 2.5 or later
models, this discount is 90%; on Gemini 2.0 models, this discount is 75%.

Using the Gemini Enterprise API, you can:

- [Create context caches](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create) and control them more effectively.
- [Use a context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-use) by referencing its contents in a prompt request with its resource name.
- [Update a context cache's expiration time (Time to Live, or TTL)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-update) past the default 60 minutes.
- [Delete a context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-delete) when no longer needed.

You can also use the Gemini Enterprise API to
[retrieve information about a context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-getinfo).

Explicit caches interact with implicit caching, potentially leading to
additional caching beyond the specified contents when [creating a cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create). To
prevent cache data retention, disable implicit caching and avoid creating
explicit caches. For more information, see [Enable and disable caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/zero-data-retention#enabling-disabling-caching).

### Supported models

Explicit caching is supported when using the following models:

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

Explicit caching also supports the latest aliases, including:

- `gemini-flash-latest`
- `gemini-flash-lite-latest`

## When to use context caching

Context caching is particularly well suited to scenarios where a substantial
initial context is referenced repeatedly by subsequent requests.

Cached context items, such as a large amount of text, an audio file, or a video
file, can be used in prompt requests to the Gemini API to generate output.
Requests that use the same cache in the prompt also include text unique to each
prompt. For example, each prompt request that composes a chat conversation might
include the same context cache that references a video along with unique text
that comprises each turn in the chat.

Consider using context caching for use cases such as:

- Chatbots with extensive system instructions
- Repetitive analysis of lengthy video files
- Recurring queries against large document sets
- Frequent code repository analysis or bug fixing

Implicit and explicit caching are supported with Provisioned Throughput
in [Preview](https://cloud.google.com/products#product-launch-stages). Refer to the [Provisioned Throughput guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/measure-provisioned-throughput#context_caching)
for more details. Caches work across traffic types. For example, a cache created
while using Provisioned Throughput also works with
PayGo.

## Availability

Context caching is available in regions where Generative AI on Gemini Enterprise Agent Platform is
available. For more information, see [Generative AI on Gemini Enterprise Agent Platform
locations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations).

## Limits

The content that you explicitly cache must adhere to the limits shown in the following
table:

| Context caching limits ||
|---|---|
| Minimum cache token count for implicit and explicit caching | - **Gemini 3 family models:** 4,096 tokens - **Gemini 2 family models:** 2,048 tokens |
| Maximum size of content you can cache using a blob or text | 10 MB |
| Minimum time before a cache expires after it's created | 1 minute |
| Maximum time before a cache expires after it's created | There isn't a maximum cache duration |

> [!IMPORTANT]
> **Important:** When caching objects that are stored in a Cloud Storage bucket, don't make changes to objects until the cached contents are expired or deleted. Updates to Cloud Storage objects can cause the associated cached contents to be unusable.

## VPC Service Controls support

Context caching supports VPC Service Controls, meaning your cache cannot be
exfiltrated beyond your service perimeter. If you use Cloud Storage to build
your cache, include your bucket in your service perimeter as well to protect
your cache content.

For more information, see [VPC Service Controls with Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/vpc-service-controls)
in the Gemini Enterprise Agent Platform documentation.

## What's next

- Learn about [the Gemini API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models).
- Learn how to [use multimodal prompts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/design-multimodal-prompts).
