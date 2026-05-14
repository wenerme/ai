> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Chat - Go SDK

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

## Overview

### Available Operations

* [Send](#send) - Create a chat completion

## Send

Sends a request for a model response for the given chat conversation. Supports both streaming and non-streaming modes.

### Example Usage: guardrail-blocked

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

    res, err := s.Chat.Send(ctx, components.ChatRequest{
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
    }, nil)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        defer res.ChatStreamingResponse.Close()

        for res.ChatStreamingResponse.Next() {
            event := res.ChatStreamingResponse.Value()
            log.Print(event)
            // Handle the event
	      }
    }
}
```

### Example Usage: insufficient-permissions

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

    res, err := s.Chat.Send(ctx, components.ChatRequest{
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
    }, nil)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        defer res.ChatStreamingResponse.Close()

        for res.ChatStreamingResponse.Next() {
            event := res.ChatStreamingResponse.Value()
            log.Print(event)
            // Handle the event
	      }
    }
}
```

### Parameters

| Parameter                         | Type                                                                           | Required             | Description                                                                                             | Example                                                                                                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`                             | [context.Context](https://pkg.go.dev/context#Context)                          | :heavy\_check\_mark: | The context to use for the request.                                                                     |                                                                                                                                                                                                                                          |
| `chatRequest`                     | [components.ChatRequest](/docs/sdks/go/api-reference/models/chatrequest)       | :heavy\_check\_mark: | N/A                                                                                                     | `{"max_tokens": 150,"messages": [{"content": "You are a helpful assistant.","role": "system"}`,<br />`{"content": "What is the capital of France?","role": "user"}`<br />],<br />"model": "openai/gpt-4",<br />"temperature": 0.7<br />} |
| `xOpenRouterExperimentalMetadata` | [\*components.MetadataLevel](/docs/sdks/go/api-reference/models/metadatalevel) | :heavy\_minus\_sign: | Opt-in to surface routing metadata on the response under `openrouter_metadata`. Defaults to `disabled`. | enabled                                                                                                                                                                                                                                  |
| `opts`                            | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)          | :heavy\_minus\_sign: | The options for this request.                                                                           |                                                                                                                                                                                                                                          |

### Response

**[\*operations.SendChatCompletionRequestResponse](/docs/sdks/go/api-reference/operations/sendchatcompletionrequestresponse), error**

### Errors

| Error Type                                 | Status Code | Content Type     |
| ------------------------------------------ | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError          | 400         | application/json |
| sdkerrors.UnauthorizedResponseError        | 401         | application/json |
| sdkerrors.PaymentRequiredResponseError     | 402         | application/json |
| sdkerrors.ForbiddenResponseError           | 403         | application/json |
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