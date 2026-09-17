> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Vault

> Store host-bound secrets for a workspace or for one intern. Scope is selected by the API key. Responses return metadata only, never secret values. See https://openrouter.ai/docs/guides/ori/vault.

## Overview

Store host-bound secrets for a workspace or for one intern. Scope is selected by the API key. Responses return metadata only, never secret values. See [https://openrouter.ai/docs/guides/ori/vault](https://openrouter.ai/docs/guides/ori/vault).

### Available Operations

* [list\_intern\_vault\_secrets](#list_intern_vault_secrets) - List intern secrets
* [delete\_intern\_vault\_secret](#delete_intern_vault_secret) - Delete an intern secret
* [store\_intern\_vault\_secret](#store_intern_vault_secret) - Store an intern secret
* [copy\_vault\_secrets\_to\_intern](#copy_vault_secrets_to_intern) - Copy workspace secrets to an intern
* [list\_vault\_secrets](#list_vault_secrets) - List workspace secrets
* [delete\_vault\_secret](#delete_vault_secret) - Delete a workspace secret
* [store\_vault\_secret](#store_vault_secret) - Store a workspace secret

## list\_intern\_vault\_secrets

Lists secret metadata stored for one intern. Responses contain names, bound hosts, fingerprints and creation times, never secret values. Results are ordered by name and paginated with `limit` and `offset`. The scope is selected by the API key: workspace routes act on the key's active workspace and intern routes act on one intern inside that workspace. There is no default workspace and no fallback to another scope. Every vault route, including reads, requires access to the Intern API programme and returns 404 outside it. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/client-sdks/python/docs/api-reference/authentication) required.

### Example Usage

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.list_intern_vault_secrets(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", limit=50, offset=0)

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                | Required             | Description                                                                                                                                                 | Example                              |
| -------------------------- | ------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `intern_id`                | *str*                                                               | :heavy\_check\_mark: | UUID of an intern in the workspace selected by the API key.                                                                                                 | 7c9e6679-7425-40de-944b-e07fc1f90ae7 |
| `http_referer`             | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                    | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `limit`                    | *Optional\[int]*                                                    | :heavy\_minus\_sign: | Page size, 1 to 100. Defaults to 100.                                                                                                                       | 50                                   |
| `offset`                   | *Optional\[int]*                                                    | :heavy\_minus\_sign: | Number of secrets to skip, 0 to 10000. Defaults to 0.                                                                                                       | 0                                    |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[components.VaultSecretListResponse](../../components/vaultsecretlistresponse.mdx)**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.ForbiddenResponseError          | 403         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.RequestTimeoutResponseError     | 408         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.ServiceUnavailableResponseError | 503         | application/json |
| errors.GatewayTimeoutResponseError     | 504         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |

## delete\_intern\_vault\_secret

Deletes a secret stored for one intern. Returns 204 with no body on success and 404 when the secret does not exist in the selected scope. Writes return 503 while vault writes are disabled for the caller. The scope is selected by the API key: workspace routes act on the key's active workspace and intern routes act on one intern inside that workspace. There is no default workspace and no fallback to another scope. Every vault route, including reads, requires access to the Intern API programme and returns 404 outside it. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/client-sdks/python/docs/api-reference/authentication) required.

### Example Usage

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    open_router.vault.delete_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token")

    # Use the SDK ...

```

### Parameters

| Parameter                  | Type                                                                | Required             | Description                                                                                                                                                 | Example                              |
| -------------------------- | ------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `intern_id`                | *str*                                                               | :heavy\_check\_mark: | UUID of an intern in the workspace selected by the API key.                                                                                                 | 7c9e6679-7425-40de-944b-e07fc1f90ae7 |
| `name`                     | *str*                                                               | :heavy\_check\_mark: | Secret name. Lowercase letters, digits and single underscores, starting with a letter and not ending with an underscore, 1 to 255 characters.               | github\_token                        |
| `http_referer`             | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                    | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.ForbiddenResponseError          | 403         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.RequestTimeoutResponseError     | 408         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.ServiceUnavailableResponseError | 503         | application/json |
| errors.GatewayTimeoutResponseError     | 504         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |

## store\_intern\_vault\_secret

Creates or replaces a secret stored for one intern. The value is encrypted at rest and released only to the exact hostnames in `hosts`. The response carries metadata only. Writes return 503 while vault writes are disabled for the caller. The scope is selected by the API key: workspace routes act on the key's active workspace and intern routes act on one intern inside that workspace. There is no default workspace and no fallback to another scope. Every vault route, including reads, requires access to the Intern API programme and returns 404 outside it. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/client-sdks/python/docs/api-reference/authentication) required.

### Example Usage: body-timed-out

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: body-too-large

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: internal-error

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: invalid-or-missing-api-key

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: invalid-vault-request

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: invalid-vault-response

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: not-found

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: rate-limited

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: regional-hostname

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: route-deadline

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: transfer-in-progress

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: vault-request-failed

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: vault-timed-out

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: vault-unavailable

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: workspace-scope-unavailable

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: writes-disabled

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_intern_vault_secret(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                | Required             | Description                                                                                                                                                                                                                                                                                                                                                                                                   | Example                              |
| -------------------------- | ------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `intern_id`                | *str*                                                               | :heavy\_check\_mark: | UUID of an intern in the workspace selected by the API key.                                                                                                                                                                                                                                                                                                                                                   | 7c9e6679-7425-40de-944b-e07fc1f90ae7 |
| `name`                     | *str*                                                               | :heavy\_check\_mark: | Secret name. Lowercase letters, digits and single underscores, starting with a letter and not ending with an underscore, 1 to 255 characters.                                                                                                                                                                                                                                                                 | github\_token                        |
| `hosts`                    | List\[*str*]                                                        | :heavy\_check\_mark: | Exact DNS hostnames the secret may be sent to, 1 to 100 entries. Each entry is lowercased and a trailing dot is removed, so `API.Example.com.` is stored as `api.example.com`. Schemes, ports, paths, wildcards and empty values are rejected. Duplicates after normalization are collapsed. Matching is exact: a secret bound to `api.example.com` is never released to `example.com` or any other hostname. |                                      |
| `value`                    | *str*                                                               | :heavy\_check\_mark: | Secret value, 1 to 65536 characters. It is encrypted at rest and never returned.                                                                                                                                                                                                                                                                                                                              |                                      |
| `http_referer`             | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                                                                                                                                                                                                                                   |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                                                                                                                                                                                                                            |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                    | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                                                                                                                                                                                                                                   |                                      |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                                                                                                                                                                                                                           |                                      |

### Response

**[components.VaultSecretResponse](../../components/vaultsecretresponse.mdx)**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.ForbiddenResponseError          | 403         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.RequestTimeoutResponseError     | 408         | application/json |
| errors.ConflictResponseError           | 409         | application/json |
| errors.PayloadTooLargeResponseError    | 413         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.ServiceUnavailableResponseError | 503         | application/json |
| errors.GatewayTimeoutResponseError     | 504         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |

## copy\_vault\_secrets\_to\_intern

Copies the named workspace secrets into one intern's scope, replacing any intern secret with the same name. Each copy keeps the source value and host bindings. Every name must exist in the workspace scope or the request fails with 404 and nothing is copied. A workspace secret whose `hosts` is `null` cannot be copied: the request fails with 409 and nothing is copied until that secret is stored again with hosts. The response carries metadata only. Writes return 503 while vault writes are disabled for the caller. The scope is selected by the API key: workspace routes act on the key's active workspace and intern routes act on one intern inside that workspace. There is no default workspace and no fallback to another scope. Every vault route, including reads, requires access to the Intern API programme and returns 404 outside it. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/client-sdks/python/docs/api-reference/authentication) required.

### Example Usage: body-timed-out

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: body-too-large

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: copy-conflict

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: internal-error

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: invalid-or-missing-api-key

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: invalid-vault-request

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: invalid-vault-response

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: not-found

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: rate-limited

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: regional-hostname

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: route-deadline

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: vault-request-failed

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: vault-timed-out

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: vault-unavailable

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: workspace-scope-unavailable

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Example Usage: writes-disabled

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.copy_vault_secrets_to_intern(intern_id="7c9e6679-7425-40de-944b-e07fc1f90ae7", names=[
        "github_token",
    ])

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                | Required             | Description                                                                                                                                                 | Example                              |
| -------------------------- | ------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `intern_id`                | *str*                                                               | :heavy\_check\_mark: | UUID of an intern in the workspace selected by the API key.                                                                                                 | 7c9e6679-7425-40de-944b-e07fc1f90ae7 |
| `names`                    | List\[*str*]                                                        | :heavy\_check\_mark: | Names of workspace secrets to copy, 1 to 100 unique entries. Every name must exist in the workspace scope.                                                  |                                      |
| `http_referer`             | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                    | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[components.VaultSecretCopyResponse](../../components/vaultsecretcopyresponse.mdx)**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.ForbiddenResponseError          | 403         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.RequestTimeoutResponseError     | 408         | application/json |
| errors.ConflictResponseError           | 409         | application/json |
| errors.PayloadTooLargeResponseError    | 413         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.ServiceUnavailableResponseError | 503         | application/json |
| errors.GatewayTimeoutResponseError     | 504         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |

## list\_vault\_secrets

Lists secret metadata for the workspace of the authenticated API key. Responses contain names, bound hosts, fingerprints and creation times, never secret values. Results are ordered by name and paginated with `limit` and `offset`. The scope is selected by the API key: workspace routes act on the key's active workspace and intern routes act on one intern inside that workspace. There is no default workspace and no fallback to another scope. Every vault route, including reads, requires access to the Intern API programme and returns 404 outside it. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/client-sdks/python/docs/api-reference/authentication) required.

### Example Usage

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.list_vault_secrets(limit=50, offset=0)

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                | Required             | Description                                                                                                                                                 | Example |
| -------------------------- | ------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `http_referer`             | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |         |
| `x_open_router_title`      | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |         |
| `x_open_router_categories` | *Optional\[str]*                                                    | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |         |
| `limit`                    | *Optional\[int]*                                                    | :heavy\_minus\_sign: | Page size, 1 to 100. Defaults to 100.                                                                                                                       | 50      |
| `offset`                   | *Optional\[int]*                                                    | :heavy\_minus\_sign: | Number of secrets to skip, 0 to 10000. Defaults to 0.                                                                                                       | 0       |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |         |

### Response

**[components.VaultSecretListResponse](../../components/vaultsecretlistresponse.mdx)**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.ForbiddenResponseError          | 403         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.RequestTimeoutResponseError     | 408         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.ServiceUnavailableResponseError | 503         | application/json |
| errors.GatewayTimeoutResponseError     | 504         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |

## delete\_vault\_secret

Deletes a secret from the workspace of the authenticated API key. Returns 204 with no body on success and 404 when the secret does not exist in the selected scope. Writes return 503 while vault writes are disabled for the caller. The scope is selected by the API key: workspace routes act on the key's active workspace and intern routes act on one intern inside that workspace. There is no default workspace and no fallback to another scope. Every vault route, including reads, requires access to the Intern API programme and returns 404 outside it. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/client-sdks/python/docs/api-reference/authentication) required.

### Example Usage

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    open_router.vault.delete_vault_secret(name="github_token")

    # Use the SDK ...

```

### Parameters

| Parameter                  | Type                                                                | Required             | Description                                                                                                                                                 | Example       |
| -------------------------- | ------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `name`                     | *str*                                                               | :heavy\_check\_mark: | Secret name. Lowercase letters, digits and single underscores, starting with a letter and not ending with an underscore, 1 to 255 characters.               | github\_token |
| `http_referer`             | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |               |
| `x_open_router_title`      | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |               |
| `x_open_router_categories` | *Optional\[str]*                                                    | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |               |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |               |

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.ForbiddenResponseError          | 403         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.RequestTimeoutResponseError     | 408         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.ServiceUnavailableResponseError | 503         | application/json |
| errors.GatewayTimeoutResponseError     | 504         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |

## store\_vault\_secret

Creates or replaces a secret in the workspace of the authenticated API key. The value is encrypted at rest and released only to the exact hostnames in `hosts`. The response carries metadata only. Writes return 503 while vault writes are disabled for the caller. The scope is selected by the API key: workspace routes act on the key's active workspace and intern routes act on one intern inside that workspace. There is no default workspace and no fallback to another scope. Every vault route, including reads, requires access to the Intern API programme and returns 404 outside it. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/client-sdks/python/docs/api-reference/authentication) required.

### Example Usage: body-timed-out

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: body-too-large

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: internal-error

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: invalid-or-missing-api-key

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: invalid-vault-request

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: invalid-vault-response

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: not-found

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: rate-limited

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: regional-hostname

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: route-deadline

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: vault-request-failed

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: vault-timed-out

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: vault-unavailable

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: workspace-scope-unavailable

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Example Usage: writes-disabled

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.vault.store_vault_secret(name="github_token", hosts=[
        "api.github.com",
    ], value="ghp_exampleTokenValue")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                | Required             | Description                                                                                                                                                                                                                                                                                                                                                                                                   | Example       |
| -------------------------- | ------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `name`                     | *str*                                                               | :heavy\_check\_mark: | Secret name. Lowercase letters, digits and single underscores, starting with a letter and not ending with an underscore, 1 to 255 characters.                                                                                                                                                                                                                                                                 | github\_token |
| `hosts`                    | List\[*str*]                                                        | :heavy\_check\_mark: | Exact DNS hostnames the secret may be sent to, 1 to 100 entries. Each entry is lowercased and a trailing dot is removed, so `API.Example.com.` is stored as `api.example.com`. Schemes, ports, paths, wildcards and empty values are rejected. Duplicates after normalization are collapsed. Matching is exact: a secret bound to `api.example.com` is never released to `example.com` or any other hostname. |               |
| `value`                    | *str*                                                               | :heavy\_check\_mark: | Secret value, 1 to 65536 characters. It is encrypted at rest and never returned.                                                                                                                                                                                                                                                                                                                              |               |
| `http_referer`             | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                                                                                                                                                                                                                                   |               |
| `x_open_router_title`      | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                                                                                                                                                                                                                            |               |
| `x_open_router_categories` | *Optional\[str]*                                                    | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                                                                                                                                                                                                                                   |               |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                                                                                                                                                                                                                           |               |

### Response

**[components.VaultSecretResponse](../../components/vaultsecretresponse.mdx)**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.ForbiddenResponseError          | 403         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.RequestTimeoutResponseError     | 408         | application/json |
| errors.PayloadTooLargeResponseError    | 413         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.ServiceUnavailableResponseError | 503         | application/json |
| errors.GatewayTimeoutResponseError     | 504         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |
