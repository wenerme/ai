> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Byok - Go SDK

The Go SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).

## Overview

BYOK endpoints

### Available Operations

* [List](#list) - List BYOK provider credentials
* [Get](#get) - Get a BYOK provider credential

## List

List the bring-your-own-key (BYOK) provider credentials for the authenticated entity's default workspace. Use the `workspace_id` query parameter to scope the result to a different workspace, or the `provider` query parameter to filter by upstream provider. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/optionalnullable"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Byok.List(ctx, optionalnullable.From[int64](nil), nil, nil, nil)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        for {
            // handle items

            res, err = res.Next()

            if err != nil {
                // handle error
            }

            if res == nil {
                break
            }
        }
    }
}
```

### Parameters

| Parameter     | Type                                                                     | Required             | Description                                                                                   | Example                              |
| ------------- | ------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------ |
| `ctx`         | [context.Context](https://pkg.go.dev/context#Context)                    | :heavy\_check\_mark: | The context to use for the request.                                                           |                                      |
| `offset`      | optionalnullable.OptionalNullable\[`int64`]                              | :heavy\_minus\_sign: | Number of records to skip for pagination                                                      | 0                                    |
| `limit`       | `*int64`                                                                 | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                                                 | 50                                   |
| `workspaceID` | `*string`                                                                | :heavy\_minus\_sign: | Optional workspace ID to filter by. Defaults to the authenticated entity's default workspace. | 550e8400-e29b-41d4-a716-446655440000 |
| `provider`    | [\*operations.Provider](/docs/sdks/go/api-reference/operations/provider) | :heavy\_minus\_sign: | Optional provider slug to filter by (e.g. `openai`, `anthropic`, `amazon-bedrock`).           | openai                               |
| `opts`        | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)    | :heavy\_minus\_sign: | The options for this request.                                                                 |                                      |

### Response

**[\*operations.ListBYOKKeysResponse](/docs/sdks/go/api-reference/operations/listbyokkeysresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## Get

Get a single bring-your-own-key (BYOK) provider credential by its `id`. Defaults to the authenticated entity's default workspace; use the `workspace_id` query parameter to scope to a different workspace. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Byok.Get(ctx, "11111111-2222-3333-4444-555555555555", nil)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter     | Type                                                                  | Required             | Description                                                                      | Example                              |
| ------------- | --------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------- | ------------------------------------ |
| `ctx`         | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.                                              |                                      |
| `id`          | `string`                                                              | :heavy\_check\_mark: | The BYOK credential ID (UUID).                                                   | 11111111-2222-3333-4444-555555555555 |
| `workspaceID` | `*string`                                                             | :heavy\_minus\_sign: | Optional workspace ID. Defaults to the authenticated entity's default workspace. | 550e8400-e29b-41d4-a716-446655440000 |
| `opts`        | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                                                    |                                      |

### Response

**[\*components.GetBYOKKeyResponse](/docs/sdks/go/api-reference/models/getbyokkeyresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |