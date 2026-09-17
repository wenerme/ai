> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# STT

> Speech-to-text endpoints

## Overview

Speech-to-text endpoints

### Available Operations

* [create\_transcription](#create_transcription) - Create transcription
* [create\_transcription\_multipart](#create_transcription_multipart) - Create transcription

## create\_transcription

Transcribes audio into text. Accepts base64-encoded audio input as JSON or an OpenAI-style multipart/form-data file upload, and returns the transcribed text.

### Example Usage

```python theme={null}
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

| Parameter                  | Type                                                                                             | Required             | Description                                                                                                                                                                                                                                                                                                             | Example                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `input_audio`              | [components.STTInputAudio](../../components/sttinputaudio.mdx)                                   | :heavy\_check\_mark: | Base64-encoded audio to transcribe                                                                                                                                                                                                                                                                                      | \{<br />"data": "UklGRiQA...",<br />"format": "wav"<br />}                     |
| `model`                    | *str*                                                                                            | :heavy\_check\_mark: | STT model identifier                                                                                                                                                                                                                                                                                                    | openai/whisper-large-v3                                                        |
| `http_referer`             | *Optional\[str]*                                                                                 | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                                                                                                                                             |                                                                                |
| `x_open_router_title`      | *Optional\[str]*                                                                                 | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                                                                                                                                      |                                                                                |
| `x_open_router_categories` | *Optional\[str]*                                                                                 | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                                                                                                                                             |                                                                                |
| `language`                 | *Optional\[str]*                                                                                 | :heavy\_minus\_sign: | ISO-639-1 language code (e.g., "en", "ja"). Auto-detected if omitted.                                                                                                                                                                                                                                                   | en                                                                             |
| `provider`                 | [Optional\[components.STTRequestProvider\]](../../components/sttrequestprovider.mdx)             | :heavy\_minus\_sign: | Provider-specific passthrough configuration                                                                                                                                                                                                                                                                             |                                                                                |
| `response_format`          | [Optional\[components.STTRequestResponseFormat\]](../../components/sttrequestresponseformat.mdx) | :heavy\_minus\_sign: | Output format. "json" (default) returns \{ text, usage }. "verbose\_json" additionally returns task, language, duration, and segment-level timestamps; only supported by OpenAI-compatible providers.                                                                                                                   | json                                                                           |
| `session_id`               | *Optional\[str]*                                                                                 | :heavy\_minus\_sign: | A unique identifier for grouping related requests (e.g., a conversation or agent workflow). Used for observability grouping in Broadcast and private logging; never sent to the provider. If provided in both the request body and the x-session-id header, the body value takes precedence. Maximum of 256 characters. | session-1234                                                                   |
| `temperature`              | *Optional\[float]*                                                                               | :heavy\_minus\_sign: | Sampling temperature for transcription                                                                                                                                                                                                                                                                                  | 0                                                                              |
| `timestamp_granularities`  | List\[[components.STTTimestampGranularity](../../components/stttimestampgranularity.mdx)]        | :heavy\_minus\_sign: | Timestamp detail levels to include when response\_format is "verbose\_json". "segment" returns segment-level timestamps; "word" additionally returns word-level timestamps in the words array. Ignored unless response\_format is "verbose\_json".                                                                      | \[<br />"segment"<br />]                                                       |
| `trace`                    | [Optional\[components.TraceConfig\]](../../components/traceconfig.mdx)                           | :heavy\_minus\_sign: | Metadata for observability and tracing. Known keys (trace\_id, trace\_name, span\_name, generation\_name, parent\_span\_id) have special handling. Additional keys are passed through as custom metadata to configured broadcast destinations.                                                                          | \{<br />"trace\_id": "trace-abc123",<br />"trace\_name": "my-app-trace"<br />} |
| `user`                     | *Optional\[str]*                                                                                 | :heavy\_minus\_sign: | A unique identifier representing your end-user. Forwarded to Broadcast and private logging as the end-user id; never sent to the provider.                                                                                                                                                                              | user-1234                                                                      |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx)                              | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                                                                                                                                     |                                                                                |

### Response

**[components.STTResponse](../../components/sttresponse.mdx)**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.PaymentRequiredResponseError    | 402         | application/json |
| errors.ForbiddenResponseError          | 403         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.PayloadTooLargeResponseError    | 413         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.ServiceUnavailableResponseError | 503         | application/json |
| errors.GatewayTimeoutResponseError     | 504         | application/json |
| errors.EdgeNetworkTimeoutResponseError | 524         | application/json |
| errors.ProviderOverloadedResponseError | 529         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |

## create\_transcription\_multipart

Transcribes audio into text. Accepts base64-encoded audio input as JSON or an OpenAI-style multipart/form-data file upload, and returns the transcribed text.

### Example Usage

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.stt.create_transcription_multipart(file={
        "file_name": "example.file",
        "content": open("example.file", "rb"),
    }, model="openai/whisper-large-v3", language="en")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                                             | Required             | Description                                                                                                                                                                                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `file`                     | [operations.CreateAudioTranscriptionsMultipartFile](../../operations/createaudiotranscriptionsmultipartfile.mdx) | :heavy\_check\_mark: | The audio file to transcribe. The format is derived from the filename extension or the file part content type. Max 25 MB; send larger files as base64 JSON via input\_audio.                                                                                                                 |
| `model`                    | *str*                                                                                                            | :heavy\_check\_mark: | The model to use for transcription.                                                                                                                                                                                                                                                          |
| `http_referer`             | *Optional\[str]*                                                                                                 | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                                                                                                                  |
| `x_open_router_title`      | *Optional\[str]*                                                                                                 | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                                                                                                           |
| `x_open_router_categories` | *Optional\[str]*                                                                                                 | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                                                                                                                  |
| `language`                 | *Optional\[str]*                                                                                                 | :heavy\_minus\_sign: | The language of the input audio (ISO-639-1).                                                                                                                                                                                                                                                 |
| `response_format`          | [Optional\[operations.ResponseFormat\]](../../operations/responseformat.mdx)                                     | :heavy\_minus\_sign: | The response format. "json" (default) returns \{ text, usage }; "verbose\_json" additionally returns task, language, duration, and segment-level timestamps (OpenAI-compatible providers only).                                                                                              |
| `session_id`               | *Optional\[str]*                                                                                                 | :heavy\_minus\_sign: | A unique identifier for grouping related requests (e.g., a conversation or agent workflow). Used for observability grouping in Broadcast and private logging; never sent to the provider. If provided in both the request body and the x-session-id header, the body value takes precedence. |
| `temperature`              | *Optional\[float]*                                                                                               | :heavy\_minus\_sign: | The sampling temperature.                                                                                                                                                                                                                                                                    |
| `timestamp_granularities`  | List\[[operations.TimestampGranularities](../../operations/timestampgranularities.mdx)]                          | :heavy\_minus\_sign: | Timestamp detail levels to include when response\_format is "verbose\_json". "word" additionally returns word-level timestamps in the words array.                                                                                                                                           |
| `trace`                    | *Optional\[str]*                                                                                                 | :heavy\_minus\_sign: | JSON-encoded trace metadata object (trace\_id, trace\_name, span\_name, generation\_name, parent\_span\_id and custom keys) attached to the Broadcast trace. Must decode to a JSON object.                                                                                                   |
| `user`                     | *Optional\[str]*                                                                                                 | :heavy\_minus\_sign: | A unique identifier representing your end-user. Forwarded to Broadcast and private logging as the end-user id; never sent to the provider.                                                                                                                                                   |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx)                                              | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                                                                                                          |

### Response

**[components.STTResponse](../../components/sttresponse.mdx)**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.PaymentRequiredResponseError    | 402         | application/json |
| errors.ForbiddenResponseError          | 403         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.PayloadTooLargeResponseError    | 413         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.ServiceUnavailableResponseError | 503         | application/json |
| errors.GatewayTimeoutResponseError     | 504         | application/json |
| errors.EdgeNetworkTimeoutResponseError | 524         | application/json |
| errors.ProviderOverloadedResponseError | 529         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |
