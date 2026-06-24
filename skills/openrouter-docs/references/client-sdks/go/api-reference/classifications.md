> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Classifications - Go SDK

The Go SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).

## Overview

Task classification market-share endpoints

### Available Operations

* [GetTaskClassifications](#gettaskclassifications) - Task classification market share

## GetTaskClassifications

Returns the market-share breakdown of OpenRouter traffic by task classification
(e.g. code generation, web search, summarization) over a trailing time window.

Each classification reports its share of classified sampled requests (`usage_share`)
and classified sampled token volume (`token_share`) as fractions between 0 and 1.
The unclassified `other` bucket is excluded. Absolute volumes are not exposed
because the underlying data is sampled.

Each classification also includes a `models` array listing the top models by
request volume within that classification, with their within-tag usage and token shares.

Classifications are grouped into macro-categories (Code, Data, Agent, General)
with aggregate shares provided for each.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this data, cite as:
"Source: OpenRouter (openrouter.ai/rankings), as of \{as\_of}."

### Example Usage

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/models/operations"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Classifications.GetTaskClassifications(ctx, operations.WindowSevend.ToPointer())
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                                                                                           | Example |
| --------- | --------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------- | ------- |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.                                                                   |         |
| `window`  | [\*operations.Window](/docs/sdks/go/api-reference/operations/window)  | :heavy\_minus\_sign: | Trailing time window for the classification data. Currently only `7d` (trailing 7 days) is supported. | 7d      |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                                                                         |         |

### Response

**[\*components.TaskClassificationResponse](/docs/sdks/go/api-reference/models/taskclassificationresponse), error**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError      | 400         | application/json |
| sdkerrors.UnauthorizedResponseError    | 401         | application/json |
| sdkerrors.TooManyRequestsResponseError | 429         | application/json |
| sdkerrors.InternalServerResponseError  | 500         | application/json |
| sdkerrors.APIError                     | 4XX, 5XX    | \*/\*            |