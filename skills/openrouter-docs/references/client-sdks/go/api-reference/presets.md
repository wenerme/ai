> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Presets - Go SDK

The Go SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).

## Overview

Presets endpoints

### Available Operations

* [CreatePresetsChatCompletions](#createpresetschatcompletions) - Create a preset from a chat-completions request body
* [CreatePresetsMessages](#createpresetsmessages) - Create a preset from a messages request body

## CreatePresetsChatCompletions

Creates a preset (or a new version of an existing one) from an inference request body. Only fields that overlap with the preset config are persisted; other fields (e.g. `messages`, `stream`, `prompt`) are silently ignored.

### Example Usage

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/models/components"
	"github.com/OpenRouterTeam/go-sdk/optionalnullable"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Presets.CreatePresetsChatCompletions(ctx, "my-preset", components.ChatRequest{
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
                        "Hello!",
                    ),
                    Role: components.ChatUserMessageRoleUser,
                },
            ),
        },
        Model: openrouter.Pointer("openai/gpt-5.4"),
        Temperature: optionalnullable.From(openrouter.Pointer[float64](0.7)),
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

| Parameter     | Type                                                                     | Required             | Description                                                         | Example                                                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`         | [context.Context](https://pkg.go.dev/context#Context)                    | :heavy\_check\_mark: | The context to use for the request.                                 |                                                                                                                                                                                                                                          |
| `slug`        | `string`                                                                 | :heavy\_check\_mark: | URL-safe slug identifying the preset. Created if it does not exist. | my-preset                                                                                                                                                                                                                                |
| `chatRequest` | [components.ChatRequest](/docs/sdks/go/api-reference/models/chatrequest) | :heavy\_check\_mark: | N/A                                                                 | `{"max_tokens": 150,"messages": [{"content": "You are a helpful assistant.","role": "system"}`,<br />`{"content": "What is the capital of France?","role": "user"}`<br />],<br />"model": "openai/gpt-4",<br />"temperature": 0.7<br />} |
| `opts`        | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)    | :heavy\_minus\_sign: | The options for this request.                                       |                                                                                                                                                                                                                                          |

### Response

**[\*components.CreatePresetFromInferenceResponse](/docs/sdks/go/api-reference/models/createpresetfrominferenceresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.ConflictResponseError       | 409         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## CreatePresetsMessages

Creates a preset (or a new version of an existing one) from an inference request body. Only fields that overlap with the preset config are persisted; other fields (e.g. `messages`, `stream`, `prompt`) are silently ignored.

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

    res, err := s.Presets.CreatePresetsMessages(ctx, "my-preset", components.MessagesRequest{
        MaxTokens: openrouter.Pointer[int64](1024),
        Messages: []components.MessagesMessageParam{
            components.MessagesMessageParam{
                Content: components.CreateMessagesMessageParamContentUnion5Str(
                    "Hello!",
                ),
                Role: components.MessagesMessageParamRoleUser,
            },
        },
        Model: "anthropic/claude-4.6-sonnet",
        System: openrouter.Pointer(components.CreateSystemStr(
            "You are a helpful assistant.",
        )),
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

| Parameter         | Type                                                                             | Required             | Description                                                         | Example                                                                                                                                                                           |
| ----------------- | -------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`             | [context.Context](https://pkg.go.dev/context#Context)                            | :heavy\_check\_mark: | The context to use for the request.                                 |                                                                                                                                                                                   |
| `slug`            | `string`                                                                         | :heavy\_check\_mark: | URL-safe slug identifying the preset. Created if it does not exist. | my-preset                                                                                                                                                                         |
| `messagesRequest` | [components.MessagesRequest](/docs/sdks/go/api-reference/models/messagesrequest) | :heavy\_check\_mark: | N/A                                                                 | `{"max_tokens": 1024,"messages": [{"content": "Hello, how are you?","role": "user"}`<br />],<br />"model": "anthropic/claude-4.5-sonnet-20250929",<br />"temperature": 0.7<br />} |
| `opts`            | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)            | :heavy\_minus\_sign: | The options for this request.                                       |                                                                                                                                                                                   |

### Response

**[\*components.CreatePresetFromInferenceResponse](/docs/sdks/go/api-reference/models/createpresetfrominferenceresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.ConflictResponseError       | 409         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |