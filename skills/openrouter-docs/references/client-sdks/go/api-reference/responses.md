> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Beta.Responses - Go SDK

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

## Overview

beta.responses endpoints

### Available Operations

* [Send](#send) - Create a response

## Send

Creates a streaming or non-streaming response using OpenResponses API format

### Example Usage

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

    res, err := s.Beta.Responses.Send(ctx, components.ResponsesRequest{
        Input: openrouter.Pointer(components.CreateInputsUnionStr(
            "Tell me a joke",
        )),
        Model: openrouter.Pointer("openai/gpt-4o"),
    }, components.MetadataLevelEnabled.ToPointer())
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        defer res.ResponsesStreamingResponse.Close()

        for res.ResponsesStreamingResponse.Next() {
            event := res.ResponsesStreamingResponse.Value()
            log.Print(event)
            // Handle the event
	      }
    }
}
```

### Parameters

| Parameter                         | Type                                                                               | Required             | Description                                                                                             | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`                             | [context.Context](https://pkg.go.dev/context#Context)                              | :heavy\_check\_mark: | The context to use for the request.                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `responsesRequest`                | [components.ResponsesRequest](/docs/sdks/go/api-reference/models/responsesrequest) | :heavy\_check\_mark: | N/A                                                                                                     | `{"input": [{"content": "Hello, how are you?","role": "user","type": "message"}`<br />],<br />"model": "anthropic/claude-4.5-sonnet-20250929",<br />"temperature": 0.7,<br />"tools": \[<br />`{"description": "Get the current weather in a given location","name": "get_current_weather","parameters": {"properties": {"location": {"type": "string"}`<br />},<br />"type": "object"<br />},<br />"type": "function"<br />}<br />],<br />"top\_p": 0.9<br />} |
| `xOpenRouterExperimentalMetadata` | [\*components.MetadataLevel](/docs/sdks/go/api-reference/models/metadatalevel)     | :heavy\_minus\_sign: | Opt-in to surface routing metadata on the response under `openrouter_metadata`. Defaults to `disabled`. | enabled                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `opts`                            | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)              | :heavy\_minus\_sign: | The options for this request.                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### Response

**[\*operations.CreateResponsesResponse](/docs/sdks/go/api-reference/operations/createresponsesresponse), error**

### Errors

| Error Type                                 | Status Code | Content Type     |
| ------------------------------------------ | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError          | 400         | application/json |
| sdkerrors.UnauthorizedResponseError        | 401         | application/json |
| sdkerrors.PaymentRequiredResponseError     | 402         | application/json |
| sdkerrors.NotFoundResponseError            | 404         | application/json |
| sdkerrors.RequestTimeoutResponseError      | 408         | application/json |
| sdkerrors.PayloadTooLargeResponseError     | 413         | application/json |
| sdkerrors.UnprocessableEntityResponseError | 422         | application/json |
| sdkerrors.TooManyRequestsResponseError     | 429         | application/json |
| sdkerrors.InternalServerResponseError      | 500         | application/json |
| sdkerrors.BadGatewayResponseError          | 502         | application/json |
| sdkerrors.ServiceUnavailableResponseError  | 503         | application/json |
| sdkerrors.EdgeNetworkTimeoutResponseError  | 524         | application/json |
| sdkerrors.ProviderOverloadedResponseError  | 529         | application/json |
| sdkerrors.APIError                         | 4XX, 5XX    | \*/\*            |