> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Models - Go SDK

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

## Overview

Model information endpoints

### Available Operations

* [List](#list) - List all models and their properties
* [Count](#count) - Get total count of available models
* [ListForUser](#listforuser) - List models filtered by user provider preferences, privacy settings, and guardrails

## List

List all models and their properties

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

    res, err := s.Models.List(ctx, nil, nil, nil)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter             | Type                                                                     | Required             | Description                                                                                                                                                         | Example     |
| --------------------- | ------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `ctx`                 | [context.Context](https://pkg.go.dev/context#Context)                    | :heavy\_check\_mark: | The context to use for the request.                                                                                                                                 |             |
| `category`            | [\*operations.Category](/docs/sdks/go/api-reference/operations/category) | :heavy\_minus\_sign: | Filter models by use case category                                                                                                                                  | programming |
| `supportedParameters` | `*string`                                                                | :heavy\_minus\_sign: | Filter models by supported parameter (comma-separated)                                                                                                              | temperature |
| `outputModalities`    | `*string`                                                                | :heavy\_minus\_sign: | Filter models by output modality. Accepts a comma-separated list of modalities (text, image, audio, embeddings) or "all" to include all models. Defaults to "text". | text        |
| `opts`                | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)    | :heavy\_minus\_sign: | The options for this request.                                                                                                                                       |             |

### Response

**[\*components.ModelsListResponse](/docs/sdks/go/api-reference/models/modelslistresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## Count

Get total count of available models

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

    res, err := s.Models.Count(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter          | Type                                                                  | Required             | Description                                                                                                                                                         | Example |
| ------------------ | --------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `ctx`              | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.                                                                                                                                 |         |
| `outputModalities` | `*string`                                                             | :heavy\_minus\_sign: | Filter models by output modality. Accepts a comma-separated list of modalities (text, image, audio, embeddings) or "all" to include all models. Defaults to "text". | text    |
| `opts`             | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                                                                                                                                       |         |

### Response

**[\*components.ModelsCountResponse](/docs/sdks/go/api-reference/models/modelscountresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## ListForUser

List models filtered by user provider preferences, [privacy settings](https://openrouter.ai/docs/guides/privacy/provider-logging), and [guardrails](https://openrouter.ai/docs/guides/features/guardrails). If requesting through `eu.openrouter.ai/api/v1/...` the results will be filtered to models that satisfy [EU in-region routing](https://openrouter.ai/docs/guides/privacy/provider-logging#enterprise-eu-in-region-routing).

### Example Usage

```go
package main

import(
	"context"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"os"
	"github.com/OpenRouterTeam/go-sdk/models/operations"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New()

    res, err := s.Models.ListForUser(ctx, operations.ListModelsUserSecurity{
        Bearer: os.Getenv("OPENROUTER_BEARER"),
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

| Parameter  | Type                                                                                               | Required             | Description                                       |
| ---------- | -------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------- |
| `ctx`      | [context.Context](https://pkg.go.dev/context#Context)                                              | :heavy\_check\_mark: | The context to use for the request.               |
| `security` | [operations.ListModelsUserSecurity](/docs/sdks/go/api-reference/operations/listmodelsusersecurity) | :heavy\_check\_mark: | The security requirements to use for the request. |
| `opts`     | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                              | :heavy\_minus\_sign: | The options for this request.                     |

### Response

**[\*components.ModelsListResponse](/docs/sdks/go/api-reference/models/modelslistresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |