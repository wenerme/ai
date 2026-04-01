{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

(*credits*)

## Overview

Credit management endpoints

### Available Operations

* [get\_credits](#get_credits) - Get remaining credits
* [create\_coinbase\_charge](#create_coinbase_charge) - Deprecated Coinbase Commerce charge endpoint

## get\_credits

Get total credits purchased and used for the authenticated user. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="getCredits" method="get" path="/credits" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.credits.get_credits()

    # Handle response
    print(res)

```

### Parameters

| Parameter | Type                                                               | Required             | Description                                                         |
| --------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- |
| `retries` | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |

### Response

**[operations.GetCreditsResponse](/docs/sdks/python/api-reference/operations/getcreditsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## create\_coinbase\_charge

Deprecated. This Coinbase Commerce endpoint now returns `410 Gone`. Use the web credits
purchase flow instead.

### Errors

| Error Type                    | Status Code   | Content Type |
| ----------------------------- | ------------- | ------------ |
| errors.OpenRouterDefaultError | 410, 4XX, 5XX | \*/\*        |
