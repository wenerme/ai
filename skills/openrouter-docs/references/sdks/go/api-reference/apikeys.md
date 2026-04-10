For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/sdks/go/api-reference/llms.txt. For full documentation content, see https://openrouter.ai/docs/sdks/go/api-reference/llms-full.txt.

{/* banner:start */}

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

API key management endpoints

### Available Operations

* [GetCurrentKeyMetadata](#getcurrentkeymetadata) - Get current API key
* [List](#list) - List API keys
* [Create](#create) - Create a new API key
* [Delete](#delete) - Delete an API key
* [Get](#get) - Get a single API key
* [Update](#update) - Update an API key

## GetCurrentKeyMetadata

Get information on the API key associated with the current authentication session

### Example Usage

{/* UsageSnippet language="go" operationID="getCurrentKey" method="get" path="/key" */}

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

    res, err := s.APIKeys.GetCurrentKeyMetadata(ctx)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                         |
| --------- | --------------------------------------------------------------------- | -------------------- | ----------------------------------- |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request. |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.       |

### Response

**[\*operations.GetCurrentKeyResponse](/docs/sdks/go/api-reference/operations/getcurrentkeyresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## List

List all API keys for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="list" method="get" path="/keys" */}

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

    res, err := s.APIKeys.List(ctx, nil, nil)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter         | Type                                                                  | Required             | Description                                          | Example |
| ----------------- | --------------------------------------------------------------------- | -------------------- | ---------------------------------------------------- | ------- |
| `ctx`             | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.                  |         |
| `includeDisabled` | `*bool`                                                               | :heavy\_minus\_sign: | Whether to include disabled API keys in the response | false   |
| `offset`          | `*int64`                                                              | :heavy\_minus\_sign: | Number of API keys to skip for pagination            | 0       |
| `opts`            | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                        |         |

### Response

**[\*operations.ListResponse](/docs/sdks/go/api-reference/operations/listresponse), error**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError    | 401         | application/json |
| sdkerrors.TooManyRequestsResponseError | 429         | application/json |
| sdkerrors.InternalServerResponseError  | 500         | application/json |
| sdkerrors.APIError                     | 4XX, 5XX    | \*/\*            |

## Create

Create a new API key for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="createKeys" method="post" path="/keys" */}

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/types"
	"github.com/OpenRouterTeam/go-sdk/optionalnullable"
	"github.com/OpenRouterTeam/go-sdk/models/operations"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.APIKeys.Create(ctx, operations.CreateKeysRequest{
        ExpiresAt: optionalnullable.From(openrouter.Pointer(types.MustNewTimeFromString("2027-12-31T23:59:59Z"))),
        IncludeByokInLimit: openrouter.Pointer(true),
        Limit: openrouter.Pointer[float64](50.0),
        LimitReset: optionalnullable.From(openrouter.Pointer(operations.CreateKeysLimitResetMonthly)),
        Name: "My New API Key",
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

| Parameter | Type                                                                                     | Required             | Description                                |
| --------- | ---------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                                    | :heavy\_check\_mark: | The context to use for the request.        |
| `request` | [operations.CreateKeysRequest](/docs/sdks/go/api-reference/operations/createkeysrequest) | :heavy\_check\_mark: | The request object to use for the request. |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                    | :heavy\_minus\_sign: | The options for this request.              |

### Response

**[\*operations.CreateKeysResponse](/docs/sdks/go/api-reference/operations/createkeysresponse), error**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError      | 400         | application/json |
| sdkerrors.UnauthorizedResponseError    | 401         | application/json |
| sdkerrors.TooManyRequestsResponseError | 429         | application/json |
| sdkerrors.InternalServerResponseError  | 500         | application/json |
| sdkerrors.APIError                     | 4XX, 5XX    | \*/\*            |

## Delete

Delete an existing API key. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="deleteKeys" method="delete" path="/keys/{hash}" */}

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

    res, err := s.APIKeys.Delete(ctx, "f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943")
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                                  | Example                                                          |
| --------- | --------------------------------------------------------------------- | -------------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.          |                                                                  |
| `hash`    | `string`                                                              | :heavy\_check\_mark: | The hash identifier of the API key to delete | f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943 |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                |                                                                  |

### Response

**[\*operations.DeleteKeysResponse](/docs/sdks/go/api-reference/operations/deletekeysresponse), error**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError    | 401         | application/json |
| sdkerrors.NotFoundResponseError        | 404         | application/json |
| sdkerrors.TooManyRequestsResponseError | 429         | application/json |
| sdkerrors.InternalServerResponseError  | 500         | application/json |
| sdkerrors.APIError                     | 4XX, 5XX    | \*/\*            |

## Get

Get a single API key by hash. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="getKey" method="get" path="/keys/{hash}" */}

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

    res, err := s.APIKeys.Get(ctx, "f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943")
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                                    | Example                                                          |
| --------- | --------------------------------------------------------------------- | -------------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.            |                                                                  |
| `hash`    | `string`                                                              | :heavy\_check\_mark: | The hash identifier of the API key to retrieve | f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943 |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                  |                                                                  |

### Response

**[\*operations.GetKeyResponse](/docs/sdks/go/api-reference/operations/getkeyresponse), error**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError    | 401         | application/json |
| sdkerrors.NotFoundResponseError        | 404         | application/json |
| sdkerrors.TooManyRequestsResponseError | 429         | application/json |
| sdkerrors.InternalServerResponseError  | 500         | application/json |
| sdkerrors.APIError                     | 4XX, 5XX    | \*/\*            |

## Update

Update an existing API key. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="updateKeys" method="patch" path="/keys/{hash}" */}

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/models/operations"
	"github.com/OpenRouterTeam/go-sdk/optionalnullable"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.APIKeys.Update(ctx, "f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943", operations.UpdateKeysRequestBody{
        Disabled: openrouter.Pointer(false),
        IncludeByokInLimit: openrouter.Pointer(true),
        Limit: openrouter.Pointer[float64](75.0),
        LimitReset: optionalnullable.From(openrouter.Pointer(operations.UpdateKeysLimitResetDaily)),
        Name: openrouter.Pointer("Updated API Key Name"),
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

| Parameter     | Type                                                                                             | Required             | Description                                  | Example                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------ | -------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `ctx`         | [context.Context](https://pkg.go.dev/context#Context)                                            | :heavy\_check\_mark: | The context to use for the request.          |                                                                                                                       |
| `hash`        | `string`                                                                                         | :heavy\_check\_mark: | The hash identifier of the API key to update | f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943                                                      |
| `requestBody` | [operations.UpdateKeysRequestBody](/docs/sdks/go/api-reference/operations/updatekeysrequestbody) | :heavy\_check\_mark: | N/A                                          | `{"disabled": false,"include_byok_in_limit": true,"limit": 75,"limit_reset": "daily","name": "Updated API Key Name"}` |
| `opts`        | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                            | :heavy\_minus\_sign: | The options for this request.                |                                                                                                                       |

### Response

**[\*operations.UpdateKeysResponse](/docs/sdks/go/api-reference/operations/updatekeysresponse), error**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError      | 400         | application/json |
| sdkerrors.UnauthorizedResponseError    | 401         | application/json |
| sdkerrors.NotFoundResponseError        | 404         | application/json |
| sdkerrors.TooManyRequestsResponseError | 429         | application/json |
| sdkerrors.InternalServerResponseError  | 500         | application/json |
| sdkerrors.APIError                     | 4XX, 5XX    | \*/\*            |