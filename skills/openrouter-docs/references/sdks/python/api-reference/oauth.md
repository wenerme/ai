For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/sdks/python/api-reference/llms.txt. For full documentation content, see https://openrouter.ai/docs/sdks/python/api-reference/llms-full.txt.

{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

OAuth authentication endpoints

### Available Operations

* [exchange\_auth\_code\_for\_api\_key](#exchange_auth_code_for_api_key) - Exchange authorization code for API key
* [create\_auth\_code](#create_auth_code) - Create authorization code

## exchange\_auth\_code\_for\_api\_key

Exchange an authorization code from the PKCE flow for a user-controlled API key

### Example Usage

{/* UsageSnippet language="python" operationID="exchangeAuthCodeForAPIKey" method="post" path="/auth/keys" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.o_auth.exchange_auth_code_for_api_key(code="auth_code_abc123def456", code_challenge_method="S256", code_verifier="dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                                                                            | Required             | Description                                                                                                                                                 | Example                                      |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `code`                     | *str*                                                                                                                                           | :heavy\_check\_mark: | The authorization code received from the OAuth redirect                                                                                                     | auth\_code\_abc123def456                     |
| `http_referer`             | *Optional\[str]*                                                                                                                                | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                              |
| `x_open_router_title`      | *Optional\[str]*                                                                                                                                | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                              |
| `x_open_router_categories` | *Optional\[str]*                                                                                                                                | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                              |
| `code_challenge_method`    | [OptionalNullable\[operations.ExchangeAuthCodeForAPIKeyCodeChallengeMethod\]](../../operations/exchangeauthcodeforapikeycodechallengemethod.md) | :heavy\_minus\_sign: | The method used to generate the code challenge                                                                                                              | S256                                         |
| `code_verifier`            | *Optional\[str]*                                                                                                                                | :heavy\_minus\_sign: | The code verifier if code\_challenge was used in the authorization request                                                                                  | dBjftJeZ4CVP-mB92K27uhbUJU1p1r\_wW1gFWFOEjXk |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                                                              | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                              |

### Response

**[operations.ExchangeAuthCodeForAPIKeyResponse](/docs/sdks/python/api-reference/operations/exchangeauthcodeforapikeyresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## create\_auth\_code

Create an authorization code for the PKCE flow to generate a user-controlled API key

### Example Usage

{/* UsageSnippet language="python" operationID="createAuthKeysCode" method="post" path="/auth/keys/code" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.o_auth.create_auth_code(callback_url="https://myapp.com/auth/callback", code_challenge="E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM", code_challenge_method="S256", limit=100)

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                                                      | Required             | Description                                                                                                                                                 | Example                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `callback_url`             | *str*                                                                                                                     | :heavy\_check\_mark: | The callback URL to redirect to after authorization. Note, only https URLs on ports 443 and 3000 are allowed.                                               | [https://myapp.com/auth/callback](https://myapp.com/auth/callback) |
| `http_referer`             | *Optional\[str]*                                                                                                          | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                    |
| `x_open_router_title`      | *Optional\[str]*                                                                                                          | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                    |
| `x_open_router_categories` | *Optional\[str]*                                                                                                          | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                    |
| `code_challenge`           | *Optional\[str]*                                                                                                          | :heavy\_minus\_sign: | PKCE code challenge for enhanced security                                                                                                                   | E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM                        |
| `code_challenge_method`    | [Optional\[operations.CreateAuthKeysCodeCodeChallengeMethod\]](../../operations/createauthkeyscodecodechallengemethod.md) | :heavy\_minus\_sign: | The method used to generate the code challenge                                                                                                              | S256                                                               |
| `expires_at`               | [date](https://docs.python.org/3/library/datetime.html#date-objects)                                                      | :heavy\_minus\_sign: | Optional expiration time for the API key to be created                                                                                                      | 2027-12-31T23:59:59Z                                               |
| `key_label`                | *Optional\[str]*                                                                                                          | :heavy\_minus\_sign: | Optional custom label for the API key. Defaults to the app name if not provided.                                                                            | My Custom Key                                                      |
| `limit`                    | *Optional\[float]*                                                                                                        | :heavy\_minus\_sign: | Credit limit for the API key to be created                                                                                                                  | 100                                                                |
| `usage_limit_type`         | [Optional\[operations.UsageLimitType\]](../../operations/usagelimittype.md)                                               | :heavy\_minus\_sign: | Optional credit limit reset interval. When set, the credit limit resets on this interval.                                                                   | monthly                                                            |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                                        | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                                                    |

### Response

**[operations.CreateAuthKeysCodeResponse](/docs/sdks/python/api-reference/operations/createauthkeyscoderesponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ConflictResponseError       | 409         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |