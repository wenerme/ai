> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/sdks/go/api-reference/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/sdks/go/api-reference/llms-full.txt.

# Organization - Go SDK

{/* banner:start */}

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Organization endpoints

### Available Operations

* [ListMembers](#listmembers) - List organization members

## ListMembers

List all members of the organization associated with the authenticated management key. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="listOrganizationMembers" method="get" path="/organization/members" */}

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

    res, err := s.Organization.ListMembers(ctx, optionalnullable.From[int64](nil), nil)
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

| Parameter | Type                                                                  | Required             | Description                                   | Example |
| --------- | --------------------------------------------------------------------- | -------------------- | --------------------------------------------- | ------- |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.           |         |
| `offset`  | optionalnullable.OptionalNullable\[`int64`]                           | :heavy\_minus\_sign: | Number of records to skip for pagination      | 0       |
| `limit`   | `*int64`                                                              | :heavy\_minus\_sign: | Maximum number of records to return (max 100) | 50      |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                 |         |

### Response

**[\*operations.ListOrganizationMembersResponse](/docs/sdks/go/api-reference/operations/listorganizationmembersresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |