> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Tts - Python SDK

{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Text-to-speech endpoints

### Available Operations

* [create\_speech](#create_speech) - Create speech

## create\_speech

Synthesizes audio from the input text

### Example Usage

{/* UsageSnippet language="python" operationID="createAudioSpeech" method="post" path="/audio/speech" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.tts.create_speech(input="Hello world", model="elevenlabs/eleven-turbo-v2", voice="alloy", response_format="pcm", speed=1)

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                      | Required             | Description                                                                                                                                                 | Example                    |
| -------------------------- | ----------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `input`                    | *str*                                                                                     | :heavy\_check\_mark: | Text to synthesize                                                                                                                                          | Hello world                |
| `model`                    | *str*                                                                                     | :heavy\_check\_mark: | TTS model identifier                                                                                                                                        | elevenlabs/eleven-turbo-v2 |
| `voice`                    | *str*                                                                                     | :heavy\_check\_mark: | Voice identifier (provider-specific).                                                                                                                       | alloy                      |
| `http_referer`             | *Optional\[str]*                                                                          | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                            |
| `x_open_router_title`      | *Optional\[str]*                                                                          | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                            |
| `x_open_router_categories` | *Optional\[str]*                                                                          | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                            |
| `provider`                 | [Optional\[components.SpeechRequestProvider\]](../../components/speechrequestprovider.md) | :heavy\_minus\_sign: | Provider-specific passthrough configuration                                                                                                                 |                            |
| `response_format`          | [Optional\[components.ResponseFormatEnum\]](../../components/responseformatenum.md)       | :heavy\_minus\_sign: | Audio output format                                                                                                                                         | pcm                        |
| `speed`                    | *Optional\[float]*                                                                        | :heavy\_minus\_sign: | Playback speed multiplier. Only used by models that support it (e.g. OpenAI TTS). Ignored by other providers.                                               | 1                          |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                        | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                            |

### Response

**[httpx.Response](/docs/sdks/python/api-reference/models)**

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