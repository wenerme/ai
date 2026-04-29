> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Guardrails - Go SDK

{/* banner:start */}

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Guardrails endpoints

### Available Operations

* [List](#list) - List guardrails
* [Create](#create) - Create a guardrail
* [Delete](#delete) - Delete a guardrail
* [Get](#get) - Get a guardrail
* [Update](#update) - Update a guardrail
* [ListGuardrailKeyAssignments](#listguardrailkeyassignments) - List key assignments for a guardrail
* [BulkAssignKeys](#bulkassignkeys) - Bulk assign keys to a guardrail
* [BulkUnassignKeys](#bulkunassignkeys) - Bulk unassign keys from a guardrail
* [ListGuardrailMemberAssignments](#listguardrailmemberassignments) - List member assignments for a guardrail
* [BulkAssignMembers](#bulkassignmembers) - Bulk assign members to a guardrail
* [BulkUnassignMembers](#bulkunassignmembers) - Bulk unassign members from a guardrail
* [ListKeyAssignments](#listkeyassignments) - List all key assignments
* [ListMemberAssignments](#listmemberassignments) - List all member assignments

## List

List all guardrails for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="listGuardrails" method="get" path="/guardrails" */}

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

    res, err := s.Guardrails.List(ctx, optionalnullable.From[int64](nil), nil, nil)
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

| Parameter     | Type                                                                  | Required             | Description                                                                                      | Example                              |
| ------------- | --------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `ctx`         | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.                                                              |                                      |
| `offset`      | optionalnullable.OptionalNullable\[`int64`]                           | :heavy\_minus\_sign: | Number of records to skip for pagination                                                         | 0                                    |
| `limit`       | `*int64`                                                              | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                                                    | 50                                   |
| `workspaceID` | `*string`                                                             | :heavy\_minus\_sign: | Filter guardrails by workspace ID. By default, guardrails in the default workspace are returned. | 0df9e665-d932-5740-b2c7-b52af166bc11 |
| `opts`        | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                                                                    |                                      |

### Response

**[\*operations.ListGuardrailsResponse](/docs/sdks/go/api-reference/operations/listguardrailsresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## Create

Create a new guardrail for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="createGuardrail" method="post" path="/guardrails" */}

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

    res, err := s.Guardrails.Create(ctx, components.CreateGuardrailRequest{
        AllowedModels: optionalnullable.From[[]string](nil),
        AllowedProviders: optionalnullable.From(openrouter.Pointer([]string{
            "openai",
            "anthropic",
            "deepseek",
        })),
        Description: optionalnullable.From(openrouter.Pointer("A guardrail for limiting API usage")),
        EnforceZdr: optionalnullable.From(openrouter.Pointer(false)),
        IgnoredModels: optionalnullable.From[[]string](nil),
        IgnoredProviders: optionalnullable.From[[]string](nil),
        LimitUsd: optionalnullable.From(openrouter.Pointer[float64](50.0)),
        Name: "My New Guardrail",
        ResetInterval: optionalnullable.From(openrouter.Pointer(components.GuardrailIntervalMonthly)),
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
| `request` | [components.CreateGuardrailRequest](/docs/sdks/go/api-reference/models/createguardrailrequest) | :heavy\_check\_mark: | The request object to use for the request. |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                          | :heavy\_minus\_sign: | The options for this request.              |

### Response

**[\*components.CreateGuardrailResponse](/docs/sdks/go/api-reference/models/createguardrailresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## Delete

Delete an existing guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="deleteGuardrail" method="delete" path="/guardrails/{id}" */}

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

    res, err := s.Guardrails.Delete(ctx, "550e8400-e29b-41d4-a716-446655440000")
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                                      | Example                              |
| --------- | --------------------------------------------------------------------- | -------------------- | ------------------------------------------------ | ------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.              |                                      |
| `id`      | `string`                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail to delete | 550e8400-e29b-41d4-a716-446655440000 |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                    |                                      |

### Response

**[\*components.DeleteGuardrailResponse](/docs/sdks/go/api-reference/models/deleteguardrailresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## Get

Get a single guardrail by ID. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="getGuardrail" method="get" path="/guardrails/{id}" */}

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

    res, err := s.Guardrails.Get(ctx, "550e8400-e29b-41d4-a716-446655440000")
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                                        | Example                              |
| --------- | --------------------------------------------------------------------- | -------------------- | -------------------------------------------------- | ------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.                |                                      |
| `id`      | `string`                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail to retrieve | 550e8400-e29b-41d4-a716-446655440000 |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                      |                                      |

### Response

**[\*components.GetGuardrailResponse](/docs/sdks/go/api-reference/models/getguardrailresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## Update

Update an existing guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="updateGuardrail" method="patch" path="/guardrails/{id}" */}

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

    res, err := s.Guardrails.Update(ctx, "550e8400-e29b-41d4-a716-446655440000", components.UpdateGuardrailRequest{
        Description: optionalnullable.From(openrouter.Pointer("Updated description")),
        LimitUsd: optionalnullable.From(openrouter.Pointer[float64](75.0)),
        Name: openrouter.Pointer("Updated Guardrail Name"),
        ResetInterval: optionalnullable.From(openrouter.Pointer(components.GuardrailIntervalWeekly)),
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

| Parameter                | Type                                                                                           | Required             | Description                                      | Example                                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `ctx`                    | [context.Context](https://pkg.go.dev/context#Context)                                          | :heavy\_check\_mark: | The context to use for the request.              |                                                                                                                      |
| `id`                     | `string`                                                                                       | :heavy\_check\_mark: | The unique identifier of the guardrail to update | 550e8400-e29b-41d4-a716-446655440000                                                                                 |
| `updateGuardrailRequest` | [components.UpdateGuardrailRequest](/docs/sdks/go/api-reference/models/updateguardrailrequest) | :heavy\_check\_mark: | N/A                                              | `{"description": "Updated description","limit_usd": 75,"name": "Updated Guardrail Name","reset_interval": "weekly"}` |
| `opts`                   | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                          | :heavy\_minus\_sign: | The options for this request.                    |                                                                                                                      |

### Response

**[\*components.UpdateGuardrailResponse](/docs/sdks/go/api-reference/models/updateguardrailresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## ListGuardrailKeyAssignments

List all API key assignments for a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="listGuardrailKeyAssignments" method="get" path="/guardrails/{id}/assignments/keys" */}

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

    res, err := s.Guardrails.ListGuardrailKeyAssignments(ctx, "550e8400-e29b-41d4-a716-446655440000", optionalnullable.From[int64](nil), nil)
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

| Parameter | Type                                                                  | Required             | Description                                   | Example                              |
| --------- | --------------------------------------------------------------------- | -------------------- | --------------------------------------------- | ------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.           |                                      |
| `id`      | `string`                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail        | 550e8400-e29b-41d4-a716-446655440000 |
| `offset`  | optionalnullable.OptionalNullable\[`int64`]                           | :heavy\_minus\_sign: | Number of records to skip for pagination      | 0                                    |
| `limit`   | `*int64`                                                              | :heavy\_minus\_sign: | Maximum number of records to return (max 100) | 50                                   |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                 |                                      |

### Response

**[\*operations.ListGuardrailKeyAssignmentsResponse](/docs/sdks/go/api-reference/operations/listguardrailkeyassignmentsresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## BulkAssignKeys

Assign multiple API keys to a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="bulkAssignKeysToGuardrail" method="post" path="/guardrails/{id}/assignments/keys" */}

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

    res, err := s.Guardrails.BulkAssignKeys(ctx, "550e8400-e29b-41d4-a716-446655440000", components.BulkAssignKeysRequest{
        KeyHashes: []string{
            "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
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

| Parameter               | Type                                                                                         | Required             | Description                            | Example                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------- | -------------------------------------------------------------------------------------- |
| `ctx`                   | [context.Context](https://pkg.go.dev/context#Context)                                        | :heavy\_check\_mark: | The context to use for the request.    |                                                                                        |
| `id`                    | `string`                                                                                     | :heavy\_check\_mark: | The unique identifier of the guardrail | 550e8400-e29b-41d4-a716-446655440000                                                   |
| `bulkAssignKeysRequest` | [components.BulkAssignKeysRequest](/docs/sdks/go/api-reference/models/bulkassignkeysrequest) | :heavy\_check\_mark: | N/A                                    | `{"key_hashes": ["c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93"]}` |
| `opts`                  | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                        | :heavy\_minus\_sign: | The options for this request.          |                                                                                        |

### Response

**[\*components.BulkAssignKeysResponse](/docs/sdks/go/api-reference/models/bulkassignkeysresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## BulkUnassignKeys

Unassign multiple API keys from a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="bulkUnassignKeysFromGuardrail" method="post" path="/guardrails/{id}/assignments/keys/remove" */}

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

    res, err := s.Guardrails.BulkUnassignKeys(ctx, "550e8400-e29b-41d4-a716-446655440000", components.BulkUnassignKeysRequest{
        KeyHashes: []string{
            "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
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

| Parameter                 | Type                                                                                             | Required             | Description                            | Example                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------ | -------------------- | -------------------------------------- | -------------------------------------------------------------------------------------- |
| `ctx`                     | [context.Context](https://pkg.go.dev/context#Context)                                            | :heavy\_check\_mark: | The context to use for the request.    |                                                                                        |
| `id`                      | `string`                                                                                         | :heavy\_check\_mark: | The unique identifier of the guardrail | 550e8400-e29b-41d4-a716-446655440000                                                   |
| `bulkUnassignKeysRequest` | [components.BulkUnassignKeysRequest](/docs/sdks/go/api-reference/models/bulkunassignkeysrequest) | :heavy\_check\_mark: | N/A                                    | `{"key_hashes": ["c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93"]}` |
| `opts`                    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                            | :heavy\_minus\_sign: | The options for this request.          |                                                                                        |

### Response

**[\*components.BulkUnassignKeysResponse](/docs/sdks/go/api-reference/models/bulkunassignkeysresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## ListGuardrailMemberAssignments

List all organization member assignments for a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="listGuardrailMemberAssignments" method="get" path="/guardrails/{id}/assignments/members" */}

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

    res, err := s.Guardrails.ListGuardrailMemberAssignments(ctx, "550e8400-e29b-41d4-a716-446655440000", optionalnullable.From[int64](nil), nil)
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

| Parameter | Type                                                                  | Required             | Description                                   | Example                              |
| --------- | --------------------------------------------------------------------- | -------------------- | --------------------------------------------- | ------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.           |                                      |
| `id`      | `string`                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail        | 550e8400-e29b-41d4-a716-446655440000 |
| `offset`  | optionalnullable.OptionalNullable\[`int64`]                           | :heavy\_minus\_sign: | Number of records to skip for pagination      | 0                                    |
| `limit`   | `*int64`                                                              | :heavy\_minus\_sign: | Maximum number of records to return (max 100) | 50                                   |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                 |                                      |

### Response

**[\*operations.ListGuardrailMemberAssignmentsResponse](/docs/sdks/go/api-reference/operations/listguardrailmemberassignmentsresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## BulkAssignMembers

Assign multiple organization members to a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="bulkAssignMembersToGuardrail" method="post" path="/guardrails/{id}/assignments/members" */}

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

    res, err := s.Guardrails.BulkAssignMembers(ctx, "550e8400-e29b-41d4-a716-446655440000", components.BulkAssignMembersRequest{
        MemberUserIds: []string{
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

| Parameter                  | Type                                                                                               | Required             | Description                            | Example                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------- | ---------------------------------------------------- |
| `ctx`                      | [context.Context](https://pkg.go.dev/context#Context)                                              | :heavy\_check\_mark: | The context to use for the request.    |                                                      |
| `id`                       | `string`                                                                                           | :heavy\_check\_mark: | The unique identifier of the guardrail | 550e8400-e29b-41d4-a716-446655440000                 |
| `bulkAssignMembersRequest` | [components.BulkAssignMembersRequest](/docs/sdks/go/api-reference/models/bulkassignmembersrequest) | :heavy\_check\_mark: | N/A                                    | `{"member_user_ids": ["user_abc123","user_def456"]}` |
| `opts`                     | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                              | :heavy\_minus\_sign: | The options for this request.          |                                                      |

### Response

**[\*components.BulkAssignMembersResponse](/docs/sdks/go/api-reference/models/bulkassignmembersresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## BulkUnassignMembers

Unassign multiple organization members from a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="bulkUnassignMembersFromGuardrail" method="post" path="/guardrails/{id}/assignments/members/remove" */}

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

    res, err := s.Guardrails.BulkUnassignMembers(ctx, "550e8400-e29b-41d4-a716-446655440000", components.BulkUnassignMembersRequest{
        MemberUserIds: []string{
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

| Parameter                    | Type                                                                                                   | Required             | Description                            | Example                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------- | -------------------------------------- | ---------------------------------------------------- |
| `ctx`                        | [context.Context](https://pkg.go.dev/context#Context)                                                  | :heavy\_check\_mark: | The context to use for the request.    |                                                      |
| `id`                         | `string`                                                                                               | :heavy\_check\_mark: | The unique identifier of the guardrail | 550e8400-e29b-41d4-a716-446655440000                 |
| `bulkUnassignMembersRequest` | [components.BulkUnassignMembersRequest](/docs/sdks/go/api-reference/models/bulkunassignmembersrequest) | :heavy\_check\_mark: | N/A                                    | `{"member_user_ids": ["user_abc123","user_def456"]}` |
| `opts`                       | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                                  | :heavy\_minus\_sign: | The options for this request.          |                                                      |

### Response

**[\*components.BulkUnassignMembersResponse](/docs/sdks/go/api-reference/models/bulkunassignmembersresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## ListKeyAssignments

List all API key guardrail assignments for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="listKeyAssignments" method="get" path="/guardrails/assignments/keys" */}

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

    res, err := s.Guardrails.ListKeyAssignments(ctx, optionalnullable.From[int64](nil), nil)
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

**[\*operations.ListKeyAssignmentsResponse](/docs/sdks/go/api-reference/operations/listkeyassignmentsresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## ListMemberAssignments

List all organization member guardrail assignments for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="listMemberAssignments" method="get" path="/guardrails/assignments/members" */}

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

    res, err := s.Guardrails.ListMemberAssignments(ctx, optionalnullable.From[int64](nil), nil)
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

**[\*operations.ListMemberAssignmentsResponse](/docs/sdks/go/api-reference/operations/listmemberassignmentsresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |