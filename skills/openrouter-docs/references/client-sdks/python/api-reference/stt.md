> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Transcriptions - Python SDK

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

## Overview

Speech-to-text endpoints

### Available Operations

* [create\_transcription](#create_transcription) - Create transcription

## create\_transcription

Transcribes audio into text. Accepts base64-encoded audio input and returns the transcribed text.

### Example Usage

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.stt.create_transcription(input_audio={
        "data": "UklGRiQA...",
        "format_": "wav",
    }, model="openai/whisper-large-v3", language="en")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                 | Required             | Description                                                                                                                                                 | Example                                   |
| -------------------------- | ------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `input_audio`              | [components.STTInputAudio](/docs/sdks/python/api-reference/components/sttinputaudio) | :heavy\_check\_mark: | Base64-encoded audio to transcribe                                                                                                                          | `{"data": "UklGRiQA...","format": "wav"}` |
| `model`                    | *str*                                                                                | :heavy\_check\_mark: | STT model identifier                                                                                                                                        | openai/whisper-large-v3                   |
| `http_referer`             | *Optional\[str]*                                                                     | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                           |
| `x_open_router_title`      | *Optional\[str]*                                                                     | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                           |
| `x_open_router_categories` | *Optional\[str]*                                                                     | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                           |
| `language`                 | *Optional\[str]*                                                                     | :heavy\_minus\_sign: | ISO-639-1 language code (e.g., "en", "ja"). Auto-detected if omitted.                                                                                       | en                                        |
| `provider`                 | [Optional\[components.STTRequestProvider\]](../../components/sttrequestprovider.md)  | :heavy\_minus\_sign: | Provider-specific passthrough configuration                                                                                                                 |                                           |
| `temperature`              | *Optional\[float]*                                                                   | :heavy\_minus\_sign: | Sampling temperature for transcription                                                                                                                      | 0                                         |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                   | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                           |

### Response

**[components.STTResponse](/docs/sdks/python/api-reference/components/sttresponse)**

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