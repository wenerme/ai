> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Workspaces - Go SDK

The Go SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).

## Overview

Workspaces endpoints

### Available Operations

* [List](#list) - List workspaces
* [Create](#create) - Create a workspace
* [Delete](#delete) - Delete a workspace
* [Get](#get) - Get a workspace
* [Update](#update) - Update a workspace
* [BulkAddMembers](#bulkaddmembers) - Bulk add members to a workspace
* [BulkRemoveMembers](#bulkremovemembers) - Bulk remove members from a workspace

## List

List all workspaces for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res, err := s.Workspaces.List(ctx, optionalnullable.From[int64](nil), nil)
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

**[\*operations.ListWorkspacesResponse](/docs/sdks/go/api-reference/operations/listworkspacesresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## Create

Create a new workspace for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

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

    res, err := s.Workspaces.Create(ctx, components.CreateWorkspaceRequest{
        DefaultImageModel: optionalnullable.From(openrouter.Pointer("openai/dall-e-3")),
        DefaultProviderSort: optionalnullable.From(openrouter.Pointer("price")),
        DefaultTextModel: optionalnullable.From(openrouter.Pointer("openai/gpt-4o")),
        Description: optionalnullable.From(openrouter.Pointer("Production environment workspace")),
        Name: "Production",
        Slug: "production",
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

| Parameter | Type                                                                                           | Required             | Description                                |
| --------- | ---------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                                          | :heavy\_check\_mark: | The context to use for the request.        |
| `request` | [components.CreateWorkspaceRequest](/docs/sdks/go/api-reference/models/createworkspacerequest) | :heavy\_check\_mark: | The request object to use for the request. |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                          | :heavy\_minus\_sign: | The options for this request.              |

### Response

**[\*components.CreateWorkspaceResponse](/docs/sdks/go/api-reference/models/createworkspaceresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## Delete

Delete an existing workspace. The default workspace cannot be deleted. Workspaces with active API keys cannot be deleted. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res, err := s.Workspaces.Delete(ctx, "production")
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                         | Example    |
| --------- | --------------------------------------------------------------------- | -------------------- | ----------------------------------- | ---------- |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request. |            |
| `id`      | `string`                                                              | :heavy\_check\_mark: | The workspace ID (UUID) or slug     | production |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.       |            |

### Response

**[\*components.DeleteWorkspaceResponse](/docs/sdks/go/api-reference/models/deleteworkspaceresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## Get

Get a single workspace by ID or slug. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res, err := s.Workspaces.Get(ctx, "production")
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                         | Example    |
| --------- | --------------------------------------------------------------------- | -------------------- | ----------------------------------- | ---------- |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request. |            |
| `id`      | `string`                                                              | :heavy\_check\_mark: | The workspace ID (UUID) or slug     | production |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.       |            |

### Response

**[\*components.GetWorkspaceResponse](/docs/sdks/go/api-reference/models/getworkspaceresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## Update

Update an existing workspace by ID or slug. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res, err := s.Workspaces.Update(ctx, "production", components.UpdateWorkspaceRequest{
        Name: openrouter.Pointer("Updated Workspace"),
        Slug: openrouter.Pointer("updated-workspace"),
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

| Parameter                | Type                                                                                           | Required             | Description                         | Example                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------- | ----------------------------------------------------------- |
| `ctx`                    | [context.Context](https://pkg.go.dev/context#Context)                                          | :heavy\_check\_mark: | The context to use for the request. |                                                             |
| `id`                     | `string`                                                                                       | :heavy\_check\_mark: | The workspace ID (UUID) or slug     | production                                                  |
| `updateWorkspaceRequest` | [components.UpdateWorkspaceRequest](/docs/sdks/go/api-reference/models/updateworkspacerequest) | :heavy\_check\_mark: | N/A                                 | `{"name": "Updated Workspace","slug": "updated-workspace"}` |
| `opts`                   | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                          | :heavy\_minus\_sign: | The options for this request.       |                                                             |

### Response

**[\*components.UpdateWorkspaceResponse](/docs/sdks/go/api-reference/models/updateworkspaceresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## BulkAddMembers

Add multiple organization members to a workspace. Members are assigned the same role they hold in the organization. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res, err := s.Workspaces.BulkAddMembers(ctx, "production", components.BulkAddWorkspaceMembersRequest{
        UserIds: []string{
            "user_abc123",
            "user_def456",
        },
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

| Parameter                        | Type                                                                                                           | Required             | Description                         | Example                                       |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------- | --------------------------------------------- |
| `ctx`                            | [context.Context](https://pkg.go.dev/context#Context)                                                          | :heavy\_check\_mark: | The context to use for the request. |                                               |
| `id`                             | `string`                                                                                                       | :heavy\_check\_mark: | The workspace ID (UUID) or slug     | production                                    |
| `bulkAddWorkspaceMembersRequest` | [components.BulkAddWorkspaceMembersRequest](/docs/sdks/go/api-reference/models/bulkaddworkspacemembersrequest) | :heavy\_check\_mark: | N/A                                 | `{"user_ids": ["user_abc123","user_def456"]}` |
| `opts`                           | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                                          | :heavy\_minus\_sign: | The options for this request.       |                                               |

### Response

**[\*components.BulkAddWorkspaceMembersResponse](/docs/sdks/go/api-reference/models/bulkaddworkspacemembersresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## BulkRemoveMembers

Remove multiple members from a workspace. Members with active API keys in the workspace cannot be removed. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res, err := s.Workspaces.BulkRemoveMembers(ctx, "production", components.BulkRemoveWorkspaceMembersRequest{
        UserIds: []string{
            "user_abc123",
            "user_def456",
        },
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

| Parameter                           | Type                                                                                                                 | Required             | Description                         | Example                                       |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------- | --------------------------------------------- |
| `ctx`                               | [context.Context](https://pkg.go.dev/context#Context)                                                                | :heavy\_check\_mark: | The context to use for the request. |                                               |
| `id`                                | `string`                                                                                                             | :heavy\_check\_mark: | The workspace ID (UUID) or slug     | production                                    |
| `bulkRemoveWorkspaceMembersRequest` | [components.BulkRemoveWorkspaceMembersRequest](/docs/sdks/go/api-reference/models/bulkremoveworkspacemembersrequest) | :heavy\_check\_mark: | N/A                                 | `{"user_ids": ["user_abc123","user_def456"]}` |
| `opts`                              | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                                                | :heavy\_minus\_sign: | The options for this request.       |                                               |

### Response

**[\*components.BulkRemoveWorkspaceMembersResponse](/docs/sdks/go/api-reference/models/bulkremoveworkspacemembersresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |