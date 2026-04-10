For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/sdks/python/api-reference/llms.txt. For full documentation content, see https://openrouter.ai/docs/sdks/python/api-reference/llms-full.txt.

{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Rerank endpoints

### Available Operations

* [rerank](#rerank) - Submit a rerank request

## rerank

Submits a rerank request to the rerank router

### Example Usage

{/* UsageSnippet language="python" operationID="createRerank" method="post" path="/rerank" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.rerank.rerank(documents=[
        "Paris is the capital of France.",
        "Berlin is the capital of Germany.",
    ], model="cohere/rerank-v3.5", query="What is the capital of France?")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                          | Required             | Description                                                                                                                                                 | Example                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `documents`                | List\[*str*]                                                                                  | :heavy\_check\_mark: | The list of documents to rerank                                                                                                                             | \[<br />"Paris is the capital of France.",<br />"Berlin is the capital of Germany."<br />] |
| `model`                    | *str*                                                                                         | :heavy\_check\_mark: | The rerank model to use                                                                                                                                     | cohere/rerank-v3.5                                                                         |
| `query`                    | *str*                                                                                         | :heavy\_check\_mark: | The search query to rerank documents against                                                                                                                | What is the capital of France?                                                             |
| `http_referer`             | *Optional\[str]*                                                                              | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                            |
| `x_open_router_title`      | *Optional\[str]*                                                                              | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                            |
| `x_open_router_categories` | *Optional\[str]*                                                                              | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                            |
| `provider`                 | [OptionalNullable\[components.ProviderPreferences\]](../../components/providerpreferences.md) | :heavy\_minus\_sign: | N/A                                                                                                                                                         | `{"allow_fallbacks": true}`                                                                |
| `top_n`                    | *Optional\[int]*                                                                              | :heavy\_minus\_sign: | Number of most relevant documents to return                                                                                                                 | 3                                                                                          |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                            | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                                                                            |

### Response

**[operations.CreateRerankResponse](/docs/sdks/python/api-reference/operations/creatererankresponse)**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.PaymentRequiredResponseError    | 402         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.ServiceUnavailableResponseError | 503         | application/json |
| errors.EdgeNetworkTimeoutResponseError | 524         | application/json |
| errors.ProviderOverloadedResponseError | 529         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |