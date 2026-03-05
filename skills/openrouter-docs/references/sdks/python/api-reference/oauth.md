{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

(*o\_auth*)

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
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.o_auth.exchange_auth_code_for_api_key(code="auth_code_abc123def456")

    # Handle response
    print(res)

```

### Parameters

| Parameter               | Type                                                                                                                                            | Required             | Description                                                                | Example                                      |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------- | -------------------------------------------- |
| `code`                  | *str*                                                                                                                                           | :heavy\_check\_mark: | The authorization code received from the OAuth redirect                    | auth\_code\_abc123def456                     |
| `code_verifier`         | *Optional\[str]*                                                                                                                                | :heavy\_minus\_sign: | The code verifier if code\_challenge was used in the authorization request | dBjftJeZ4CVP-mB92K27uhbUJU1p1r\_wW1gFWFOEjXk |
| `code_challenge_method` | [OptionalNullable\[operations.ExchangeAuthCodeForAPIKeyCodeChallengeMethod\]](../../operations/exchangeauthcodeforapikeycodechallengemethod.md) | :heavy\_minus\_sign: | The method used to generate the code challenge                             | S256                                         |
| `retries`               | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                                                              | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.        |                                              |

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
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.o_auth.create_auth_code(callback_url="https://myapp.com/auth/callback")

    # Handle response
    print(res)

```

### Parameters

| Parameter               | Type                                                                                                                      | Required             | Description                                                                                                   | Example                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `callback_url`          | *str*                                                                                                                     | :heavy\_check\_mark: | The callback URL to redirect to after authorization. Note, only https URLs on ports 443 and 3000 are allowed. | [https://myapp.com/auth/callback](https://myapp.com/auth/callback) |
| `code_challenge`        | *Optional\[str]*                                                                                                          | :heavy\_minus\_sign: | PKCE code challenge for enhanced security                                                                     | E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM                        |
| `code_challenge_method` | [Optional\[operations.CreateAuthKeysCodeCodeChallengeMethod\]](../../operations/createauthkeyscodecodechallengemethod.md) | :heavy\_minus\_sign: | The method used to generate the code challenge                                                                | S256                                                               |
| `limit`                 | *Optional\[float]*                                                                                                        | :heavy\_minus\_sign: | Credit limit for the API key to be created                                                                    | 100                                                                |
| `expires_at`            | [date](https://docs.python.org/3/library/datetime.html#date-objects)                                                      | :heavy\_minus\_sign: | Optional expiration time for the API key to be created                                                        |                                                                    |
| `retries`               | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                                        | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                           |                                                                    |

### Response

**[operations.CreateAuthKeysCodeResponse](/docs/sdks/python/api-reference/operations/createauthkeyscoderesponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |
