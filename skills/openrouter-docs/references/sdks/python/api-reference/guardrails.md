{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

(*guardrails*)

## Overview

Guardrails endpoints

### Available Operations

* [list](#list) - List guardrails
* [create](#create) - Create a guardrail
* [get](#get) - Get a guardrail
* [update](#update) - Update a guardrail
* [delete](#delete) - Delete a guardrail
* [list\_key\_assignments](#list_key_assignments) - List all key assignments
* [list\_member\_assignments](#list_member_assignments) - List all member assignments
* [list\_guardrail\_key\_assignments](#list_guardrail_key_assignments) - List key assignments for a guardrail
* [bulk\_assign\_keys](#bulk_assign_keys) - Bulk assign keys to a guardrail
* [list\_guardrail\_member\_assignments](#list_guardrail_member_assignments) - List member assignments for a guardrail
* [bulk\_assign\_members](#bulk_assign_members) - Bulk assign members to a guardrail
* [bulk\_unassign\_keys](#bulk_unassign_keys) - Bulk unassign keys from a guardrail
* [bulk\_unassign\_members](#bulk_unassign_members) - Bulk unassign members from a guardrail

## list

List all guardrails for the authenticated user. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="listGuardrails" method="get" path="/guardrails" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.list()

    # Handle response
    print(res)

```

### Parameters

| Parameter | Type                                                               | Required             | Description                                                         | Example |
| --------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | ------- |
| `offset`  | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Number of records to skip for pagination                            | 0       |
| `limit`   | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                       | 50      |
| `retries` | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |         |

### Response

**[operations.ListGuardrailsResponse](/docs/sdks/python/api-reference/operations/listguardrailsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## create

Create a new guardrail for the authenticated user. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="createGuardrail" method="post" path="/guardrails" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.create(name="My New Guardrail")

    # Handle response
    print(res)

```

### Parameters

| Parameter           | Type                                                                                                                          | Required             | Description                                                         | Example                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `name`              | *str*                                                                                                                         | :heavy\_check\_mark: | Name for the new guardrail                                          | My New Guardrail                                                                                                  |
| `description`       | *OptionalNullable\[str]*                                                                                                      | :heavy\_minus\_sign: | Description of the guardrail                                        | A guardrail for limiting API usage                                                                                |
| `limit_usd`         | *OptionalNullable\[float]*                                                                                                    | :heavy\_minus\_sign: | Spending limit in USD                                               | 50                                                                                                                |
| `reset_interval`    | [OptionalNullable\[operations.CreateGuardrailResetIntervalRequest\]](../../operations/createguardrailresetintervalrequest.md) | :heavy\_minus\_sign: | Interval at which the limit resets (daily, weekly, monthly)         | monthly                                                                                                           |
| `allowed_providers` | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | List of allowed provider IDs                                        | \[<br />"openai",<br />"anthropic",<br />"deepseek"<br />]                                                        |
| `allowed_models`    | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | Array of model identifiers (slug or canonical\_slug accepted)       | \[<br />"openai/gpt-5.2",<br />"anthropic/claude-4.5-opus-20251124",<br />"deepseek/deepseek-r1-0528:free"<br />] |
| `enforce_zdr`       | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | Whether to enforce zero data retention                              | false                                                                                                             |
| `retries`           | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                                            | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |                                                                                                                   |

### Response

**[operations.CreateGuardrailResponse](/docs/sdks/python/api-reference/operations/createguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## get

Get a single guardrail by ID. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="getGuardrail" method="get" path="/guardrails/{id}" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.get(id="550e8400-e29b-41d4-a716-446655440000")

    # Handle response
    print(res)

```

### Parameters

| Parameter | Type                                                               | Required             | Description                                                         | Example                              |
| --------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | ------------------------------------ |
| `id`      | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail to retrieve                  | 550e8400-e29b-41d4-a716-446655440000 |
| `retries` | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |                                      |

### Response

**[operations.GetGuardrailResponse](/docs/sdks/python/api-reference/operations/getguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## update

Update an existing guardrail. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="updateGuardrail" method="patch" path="/guardrails/{id}" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.update(id="550e8400-e29b-41d4-a716-446655440000")

    # Handle response
    print(res)

```

### Parameters

| Parameter           | Type                                                                                                                          | Required             | Description                                                         | Example                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| `id`                | *str*                                                                                                                         | :heavy\_check\_mark: | The unique identifier of the guardrail to update                    | 550e8400-e29b-41d4-a716-446655440000                       |
| `name`              | *Optional\[str]*                                                                                                              | :heavy\_minus\_sign: | New name for the guardrail                                          | Updated Guardrail Name                                     |
| `description`       | *OptionalNullable\[str]*                                                                                                      | :heavy\_minus\_sign: | New description for the guardrail                                   | Updated description                                        |
| `limit_usd`         | *OptionalNullable\[float]*                                                                                                    | :heavy\_minus\_sign: | New spending limit in USD                                           | 75                                                         |
| `reset_interval`    | [OptionalNullable\[operations.UpdateGuardrailResetIntervalRequest\]](../../operations/updateguardrailresetintervalrequest.md) | :heavy\_minus\_sign: | Interval at which the limit resets (daily, weekly, monthly)         | monthly                                                    |
| `allowed_providers` | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | New list of allowed provider IDs                                    | \[<br />"openai",<br />"anthropic",<br />"deepseek"<br />] |
| `allowed_models`    | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | Array of model identifiers (slug or canonical\_slug accepted)       | \[<br />"openai/gpt-5.2"<br />]                            |
| `enforce_zdr`       | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | Whether to enforce zero data retention                              | true                                                       |
| `retries`           | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                                            | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |                                                            |

### Response

**[operations.UpdateGuardrailResponse](/docs/sdks/python/api-reference/operations/updateguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## delete

Delete an existing guardrail. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="deleteGuardrail" method="delete" path="/guardrails/{id}" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.delete(id="550e8400-e29b-41d4-a716-446655440000")

    # Handle response
    print(res)

```

### Parameters

| Parameter | Type                                                               | Required             | Description                                                         | Example                              |
| --------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | ------------------------------------ |
| `id`      | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail to delete                    | 550e8400-e29b-41d4-a716-446655440000 |
| `retries` | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |                                      |

### Response

**[operations.DeleteGuardrailResponse](/docs/sdks/python/api-reference/operations/deleteguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_key\_assignments

List all API key guardrail assignments for the authenticated user. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="listKeyAssignments" method="get" path="/guardrails/assignments/keys" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.list_key_assignments()

    # Handle response
    print(res)

```

### Parameters

| Parameter | Type                                                               | Required             | Description                                                         | Example |
| --------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | ------- |
| `offset`  | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Number of records to skip for pagination                            | 0       |
| `limit`   | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                       | 50      |
| `retries` | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |         |

### Response

**[operations.ListKeyAssignmentsResponse](/docs/sdks/python/api-reference/operations/listkeyassignmentsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_member\_assignments

List all organization member guardrail assignments for the authenticated user. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="listMemberAssignments" method="get" path="/guardrails/assignments/members" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.list_member_assignments()

    # Handle response
    print(res)

```

### Parameters

| Parameter | Type                                                               | Required             | Description                                                         | Example |
| --------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | ------- |
| `offset`  | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Number of records to skip for pagination                            | 0       |
| `limit`   | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                       | 50      |
| `retries` | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |         |

### Response

**[operations.ListMemberAssignmentsResponse](/docs/sdks/python/api-reference/operations/listmemberassignmentsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_guardrail\_key\_assignments

List all API key assignments for a specific guardrail. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="listGuardrailKeyAssignments" method="get" path="/guardrails/{id}/assignments/keys" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.list_guardrail_key_assignments(id="550e8400-e29b-41d4-a716-446655440000")

    # Handle response
    print(res)

```

### Parameters

| Parameter | Type                                                               | Required             | Description                                                         | Example                              |
| --------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | ------------------------------------ |
| `id`      | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                              | 550e8400-e29b-41d4-a716-446655440000 |
| `offset`  | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Number of records to skip for pagination                            | 0                                    |
| `limit`   | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                       | 50                                   |
| `retries` | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |                                      |

### Response

**[operations.ListGuardrailKeyAssignmentsResponse](/docs/sdks/python/api-reference/operations/listguardrailkeyassignmentsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## bulk\_assign\_keys

Assign multiple API keys to a specific guardrail. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="bulkAssignKeysToGuardrail" method="post" path="/guardrails/{id}/assignments/keys" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.bulk_assign_keys(id="550e8400-e29b-41d4-a716-446655440000", key_hashes=[
        "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
    ])

    # Handle response
    print(res)

```

### Parameters

| Parameter    | Type                                                               | Required             | Description                                                         | Example                                                                           |
| ------------ | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `id`         | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                              | 550e8400-e29b-41d4-a716-446655440000                                              |
| `key_hashes` | List\[*str*]                                                       | :heavy\_check\_mark: | Array of API key hashes to assign to the guardrail                  | \[<br />"c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93"<br />] |
| `retries`    | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |                                                                                   |

### Response

**[operations.BulkAssignKeysToGuardrailResponse](/docs/sdks/python/api-reference/operations/bulkassignkeystoguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_guardrail\_member\_assignments

List all organization member assignments for a specific guardrail. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="listGuardrailMemberAssignments" method="get" path="/guardrails/{id}/assignments/members" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.list_guardrail_member_assignments(id="550e8400-e29b-41d4-a716-446655440000")

    # Handle response
    print(res)

```

### Parameters

| Parameter | Type                                                               | Required             | Description                                                         | Example                              |
| --------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | ------------------------------------ |
| `id`      | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                              | 550e8400-e29b-41d4-a716-446655440000 |
| `offset`  | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Number of records to skip for pagination                            | 0                                    |
| `limit`   | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                       | 50                                   |
| `retries` | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |                                      |

### Response

**[operations.ListGuardrailMemberAssignmentsResponse](/docs/sdks/python/api-reference/operations/listguardrailmemberassignmentsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## bulk\_assign\_members

Assign multiple organization members to a specific guardrail. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="bulkAssignMembersToGuardrail" method="post" path="/guardrails/{id}/assignments/members" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.bulk_assign_members(id="550e8400-e29b-41d4-a716-446655440000", member_user_ids=[
        "user_abc123",
        "user_def456",
    ])

    # Handle response
    print(res)

```

### Parameters

| Parameter         | Type                                                               | Required             | Description                                                         | Example                                            |
| ----------------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | -------------------------------------------------- |
| `id`              | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                              | 550e8400-e29b-41d4-a716-446655440000               |
| `member_user_ids` | List\[*str*]                                                       | :heavy\_check\_mark: | Array of member user IDs to assign to the guardrail                 | \[<br />"user\_abc123",<br />"user\_def456"<br />] |
| `retries`         | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |                                                    |

### Response

**[operations.BulkAssignMembersToGuardrailResponse](/docs/sdks/python/api-reference/operations/bulkassignmemberstoguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## bulk\_unassign\_keys

Unassign multiple API keys from a specific guardrail. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="bulkUnassignKeysFromGuardrail" method="post" path="/guardrails/{id}/assignments/keys/remove" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.bulk_unassign_keys(id="550e8400-e29b-41d4-a716-446655440000", key_hashes=[
        "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
    ])

    # Handle response
    print(res)

```

### Parameters

| Parameter    | Type                                                               | Required             | Description                                                         | Example                                                                           |
| ------------ | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `id`         | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                              | 550e8400-e29b-41d4-a716-446655440000                                              |
| `key_hashes` | List\[*str*]                                                       | :heavy\_check\_mark: | Array of API key hashes to unassign from the guardrail              | \[<br />"c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93"<br />] |
| `retries`    | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |                                                                                   |

### Response

**[operations.BulkUnassignKeysFromGuardrailResponse](/docs/sdks/python/api-reference/operations/bulkunassignkeysfromguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## bulk\_unassign\_members

Unassign multiple organization members from a specific guardrail. [Provisioning key](/docs/guides/overview/auth/provisioning-api-keys) required.

### Example Usage

{/* UsageSnippet language="python" operationID="bulkUnassignMembersFromGuardrail" method="post" path="/guardrails/{id}/assignments/members/remove" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.guardrails.bulk_unassign_members(id="550e8400-e29b-41d4-a716-446655440000", member_user_ids=[
        "user_abc123",
        "user_def456",
    ])

    # Handle response
    print(res)

```

### Parameters

| Parameter         | Type                                                               | Required             | Description                                                         | Example                                            |
| ----------------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | -------------------------------------------------- |
| `id`              | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                              | 550e8400-e29b-41d4-a716-446655440000               |
| `member_user_ids` | List\[*str*]                                                       | :heavy\_check\_mark: | Array of member user IDs to unassign from the guardrail             | \[<br />"user\_abc123",<br />"user\_def456"<br />] |
| `retries`         | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |                                                    |

### Response

**[operations.BulkUnassignMembersFromGuardrailResponse](/docs/sdks/python/api-reference/operations/bulkunassignmembersfromguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |
