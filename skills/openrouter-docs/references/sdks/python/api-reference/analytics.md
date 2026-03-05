{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

(*analytics*)

## Overview

Analytics and usage endpoints

### Available Operations

* [get\_user\_activity](#get_user_activity) - Get user activity grouped by endpoint

## get\_user\_activity

Returns user activity data grouped by endpoint for the last 30 (completed) UTC days. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="getUserActivity" method="get" path="/activity" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.analytics.get_user_activity(date_="2025-08-24")

    # Handle response
    print(res)

```

### Parameters

| Parameter | Type                                                               | Required             | Description                                                          | Example    |
| --------- | ------------------------------------------------------------------ | -------------------- | -------------------------------------------------------------------- | ---------- |
| `date_`   | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Filter by a single UTC date in the last 30 days (YYYY-MM-DD format). | 2025-08-24 |
| `retries` | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.  |            |

### Response

**[operations.GetUserActivityResponse](/docs/sdks/python/api-reference/operations/getuseractivityresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |
