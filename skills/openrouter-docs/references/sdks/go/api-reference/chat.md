For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/sdks/go/api-reference/llms.txt. For full documentation content, see https://openrouter.ai/docs/sdks/go/api-reference/llms-full.txt.

{/* banner:start */}

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

### Available Operations

* [Send](#send) - Create a chat completion

## Send

Sends a request for a model response for the given chat conversation. Supports both streaming and non-streaming modes.

### Example Usage

{/* UsageSnippet language="go" operationID="sendChatCompletionRequest" method="post" path="/chat/completions" */}

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/optionalnullable"
	"github.com/OpenRouterTeam/go-sdk/models/components"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Chat.Send(ctx, components.ChatRequest{
        MaxTokens: optionalnullable.From(openrouter.Pointer[int64](150)),
        Messages: []components.ChatMessages{
            components.CreateChatMessagesSystem(
                components.ChatSystemMessage{
                    Content: components.CreateChatSystemMessageContentStr(
                        "You are a helpful assistant.",
                    ),
                    Role: components.ChatSystemMessageRoleSystem,
                },
            ),
            components.CreateChatMessagesUser(
                components.ChatUserMessage{
                    Content: components.CreateChatUserMessageContentStr(
                        "What is the capital of France?",
                    ),
                    Role: components.ChatUserMessageRoleUser,
                },
            ),
        },
        Model: openrouter.Pointer("openai/gpt-4"),
        Temperature: optionalnullable.From(openrouter.Pointer[float64](0.7)),
    })
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        defer res.Object.Close()

        for res.Object.Next() {
            event := res.Object.Value()
            log.Print(event)
            // Handle the event
	      }
    }
}
```

### Parameters

| Parameter | Type                                                                     | Required             | Description                                |
| --------- | ------------------------------------------------------------------------ | -------------------- | ------------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                    | :heavy\_check\_mark: | The context to use for the request.        |
| `request` | [components.ChatRequest](/docs/sdks/go/api-reference/models/chatrequest) | :heavy\_check\_mark: | The request object to use for the request. |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)    | :heavy\_minus\_sign: | The options for this request.              |

### Response

**[\*operations.SendChatCompletionRequestResponse](/docs/sdks/go/api-reference/operations/sendchatcompletionrequestresponse), error**

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