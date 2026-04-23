> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/sdks/go/api-reference/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/sdks/go/api-reference/llms-full.txt.

# Tts - Go SDK

{/* banner:start */}

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Text-to-speech endpoints

### Available Operations

* [CreateSpeech](#createspeech) - Create speech

## CreateSpeech

Synthesizes audio from the input text

### Example Usage

{/* UsageSnippet language="go" operationID="createAudioSpeech" method="post" path="/audio/speech" */}

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/models/components"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Tts.CreateSpeech(ctx, components.SpeechRequest{
        Input: "Hello world",
        Model: "elevenlabs/eleven-turbo-v2",
        Speed: openrouter.Pointer[float64](1.0),
        Voice: "alloy",
    })
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                         | Required             | Description                                |
| --------- | ---------------------------------------------------------------------------- | -------------------- | ------------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                        | :heavy\_check\_mark: | The context to use for the request.        |
| `request` | [components.SpeechRequest](/docs/sdks/go/api-reference/models/speechrequest) | :heavy\_check\_mark: | The request object to use for the request. |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)        | :heavy\_minus\_sign: | The options for this request.              |

### Response

**[io.ReadCloser](/docs/sdks/go/api-reference/), error**

### Errors

| Error Type                                | Status Code | Content Type     |
| ----------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError         | 400         | application/json |
| sdkerrors.UnauthorizedResponseError       | 401         | application/json |
| sdkerrors.PaymentRequiredResponseError    | 402         | application/json |
| sdkerrors.NotFoundResponseError           | 404         | application/json |
| sdkerrors.TooManyRequestsResponseError    | 429         | application/json |
| sdkerrors.InternalServerResponseError     | 500         | application/json |
| sdkerrors.BadGatewayResponseError         | 502         | application/json |
| sdkerrors.ServiceUnavailableResponseError | 503         | application/json |
| sdkerrors.EdgeNetworkTimeoutResponseError | 524         | application/json |
| sdkerrors.ProviderOverloadedResponseError | 529         | application/json |
| sdkerrors.APIError                        | 4XX, 5XX    | \*/\*            |