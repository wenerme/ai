> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Management API Keys

> Manage API keys programmatically

OpenRouter provides endpoints to programmatically manage your API keys, enabling key creation and management for applications that need to distribute or rotate keys automatically.

## Creating a Management API Key

To use the key management API, you first need to create a Management API key:

1. Go to the [Management API Keys page](https://openrouter.ai/settings/management-keys)
2. Click "Create New Key"
3. Complete the key creation process

Management keys cannot be used to make API calls to OpenRouter's completion endpoints - they are exclusively for administrative operations.

## Use Cases

Common scenarios for programmatic key management include:

* **SaaS Applications**: Automatically create unique API keys for each customer instance
* **Key Rotation**: Regularly rotate API keys for security compliance
* **Usage Monitoring**: Track key usage and automatically disable keys that exceed limits (with optional daily/weekly/monthly limit resets)

## Example Usage

All key management endpoints are under `/api/v1/keys` and require a Management API key in the Authorization header.

<CodeGroup>
  ```typescript title="TypeScript SDK" expandable lines theme={null}
  import { OpenRouter } from '@openrouter/sdk';

  const openRouter = new OpenRouter({
    apiKey: 'your-management-key', // Use your Management API key
  });

  // List the most recent 100 API keys
  const keys = await openRouter.apiKeys.list();

  // You can paginate using the offset parameter
  const keysPage2 = await openRouter.apiKeys.list({ offset: 100 });

  // Create a new API key
  const newKey = await openRouter.apiKeys.create({
    name: 'Customer Instance Key',
    limit: 1000, // Optional credit limit
  });

  // Get a specific key
  const keyHash = '<YOUR_KEY_HASH>';
  const key = await openRouter.apiKeys.get(keyHash);

  // Update a key
  const updatedKey = await openRouter.apiKeys.update(keyHash, {
    name: 'Updated Key Name',
    disabled: true, // Optional: Disable the key
    includeByokInLimit: false, // Optional: control BYOK usage in limit
    limitReset: 'daily', // Optional: reset limit every day at midnight UTC
  });

  // Delete a key
  await openRouter.apiKeys.delete(keyHash);
  ```

  ```python title="Python" expandable lines theme={null}
  import requests

  MANAGEMENT_API_KEY = "your-management-key"
  BASE_URL = "https://openrouter.ai/api/v1/keys"

  # List the most recent 100 API keys
  response = requests.get(
      BASE_URL,
      headers={
          "Authorization": f"Bearer {MANAGEMENT_API_KEY}",
          "Content-Type": "application/json"
      }
  )

  # You can paginate using the offset parameter
  response = requests.get(
      f"{BASE_URL}?offset=100",
      headers={
          "Authorization": f"Bearer {MANAGEMENT_API_KEY}",
          "Content-Type": "application/json"
      }
  )

  # Create a new API key
  response = requests.post(
      f"{BASE_URL}/",
      headers={
          "Authorization": f"Bearer {MANAGEMENT_API_KEY}",
          "Content-Type": "application/json"
      },
      json={
          "name": "Customer Instance Key",
          "limit": 1000  # Optional credit limit
      }
  )

  # Get a specific key
  key_hash = "<YOUR_KEY_HASH>"
  response = requests.get(
      f"{BASE_URL}/{key_hash}",
      headers={
          "Authorization": f"Bearer {MANAGEMENT_API_KEY}",
          "Content-Type": "application/json"
      }
  )

  # Update a key
  response = requests.patch(
      f"{BASE_URL}/{key_hash}",
      headers={
          "Authorization": f"Bearer {MANAGEMENT_API_KEY}",
          "Content-Type": "application/json"
      },
      json={
          "name": "Updated Key Name",
          "disabled": True,  # Optional: Disable the key
          "include_byok_in_limit": False,  # Optional: control BYOK usage in limit
          "limit_reset": "daily"  # Optional: reset limit every day at midnight UTC
      }
  )

  # Delete a key
  response = requests.delete(
      f"{BASE_URL}/{key_hash}",
      headers={
          "Authorization": f"Bearer {MANAGEMENT_API_KEY}",
          "Content-Type": "application/json"
      }
  )
  ```

  ```typescript title="TypeScript (fetch)" expandable lines theme={null}
  const MANAGEMENT_API_KEY = 'your-management-key';
  const BASE_URL = 'https://openrouter.ai/api/v1/keys';

  // List the most recent 100 API keys
  const listKeys = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${MANAGEMENT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  // You can paginate using the `offset` query parameter
  const listKeys = await fetch(`${BASE_URL}?offset=100`, {
    headers: {
      Authorization: `Bearer ${MANAGEMENT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  // Create a new API key
  const createKey = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MANAGEMENT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Customer Instance Key',
      limit: 1000, // Optional credit limit
    }),
  });

  // Get a specific key
  const keyHash = '<YOUR_KEY_HASH>';
  const getKey = await fetch(`${BASE_URL}/${keyHash}`, {
    headers: {
      Authorization: `Bearer ${MANAGEMENT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  // Update a key
  const updateKey = await fetch(`${BASE_URL}/${keyHash}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${MANAGEMENT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Updated Key Name',
      disabled: true, // Optional: Disable the key
      include_byok_in_limit: false, // Optional: control BYOK usage in limit
      limit_reset: 'daily', // Optional: reset limit every day at midnight UTC
    }),
  });

  // Delete a key
  const deleteKey = await fetch(`${BASE_URL}/${keyHash}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${MANAGEMENT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  ```
</CodeGroup>

## Response Format

API responses return JSON objects containing key information:

```json expandable lines theme={null}
{
  "data": [
    {
      "created_at": "2025-02-19T20:52:27.363244+00:00",
      "updated_at": "2025-02-19T21:24:11.708154+00:00",
      "hash": "<YOUR_KEY_HASH>",
      "label": "sk-or-v1-abc...123",
      "name": "Customer Key",
      "disabled": false,
      "limit": 10,
      "limit_remaining": 10,
      "limit_reset": null,
      "include_byok_in_limit": false,
      "usage": 0,
      "usage_daily": 0,
      "usage_weekly": 0,
      "usage_monthly": 0,
      "byok_usage": 0,
      "byok_usage_daily": 0,
      "byok_usage_weekly": 0,
      "byok_usage_monthly": 0
    }
  ]
}
```

When creating a new key, the response will include the key string itself. Read more in the [API reference](/docs/api/api-reference/api-keys/create-a-new-api-key).

## Routes That Require a Management Key

The following documented routes reject regular API keys and must be called with a Management API key.

### Analytics

| Method | Route                     | Reference                                                                                                                     |
| ------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/activity`        | [Get user activity grouped by endpoint](/docs/api/api-reference/analytics/get-user-activity-grouped-by-endpoint)                   |
| `GET`  | `/api/v1/analytics/meta`  | [Get available analytics metrics and dimensions](/docs/api/api-reference/analytics/get-available-analytics-metrics-and-dimensions) |
| `POST` | `/api/v1/analytics/query` | [Query analytics data](/docs/api/api-reference/analytics/query-analytics-data)                                                     |

### API Keys

| Method   | Route                 | Reference                                                                |
| -------- | --------------------- | ------------------------------------------------------------------------ |
| `GET`    | `/api/v1/keys`        | [List API keys](/docs/api/api-reference/api-keys/list-api-keys)               |
| `POST`   | `/api/v1/keys`        | [Create a new API key](/docs/api/api-reference/api-keys/create-a-new-api-key) |
| `GET`    | `/api/v1/keys/{hash}` | [Get a single API key](/docs/api/api-reference/api-keys/get-a-single-api-key) |
| `DELETE` | `/api/v1/keys/{hash}` | [Delete an API key](/docs/api/api-reference/api-keys/delete-an-api-key)       |
| `PATCH`  | `/api/v1/keys/{hash}` | [Update an API key](/docs/api/api-reference/api-keys/update-an-api-key)       |

### BYOK

| Method   | Route               | Reference                                                                                      |
| -------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| `GET`    | `/api/v1/byok`      | [List BYOK provider credentials](/docs/api/api-reference/byok/list-byok-provider-credentials)       |
| `POST`   | `/api/v1/byok`      | [Create a BYOK provider credential](/docs/api/api-reference/byok/create-a-byok-provider-credential) |
| `GET`    | `/api/v1/byok/{id}` | [Get a BYOK provider credential](/docs/api/api-reference/byok/get-a-byok-provider-credential)       |
| `DELETE` | `/api/v1/byok/{id}` | [Delete a BYOK provider credential](/docs/api/api-reference/byok/delete-a-byok-provider-credential) |
| `PATCH`  | `/api/v1/byok/{id}` | [Update a BYOK provider credential](/docs/api/api-reference/byok/update-a-byok-provider-credential) |

### Credits

| Method | Route             | Reference                                                                 |
| ------ | ----------------- | ------------------------------------------------------------------------- |
| `GET`  | `/api/v1/credits` | [Get remaining credits](/docs/api/api-reference/credits/get-remaining-credits) |

### Generations

| Method | Route                         | Reference                                                                                           |
| ------ | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `POST` | `/api/v1/generation/feedback` | [Submit feedback for a generation](/docs/api/api-reference/generations/submit-feedback-for-a-generation) |

### Guardrails

| Method   | Route                                                | Reference                                                                                                        |
| -------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/v1/guardrails`                                 | [List guardrails](/docs/api/api-reference/guardrails/list-guardrails)                                                 |
| `POST`   | `/api/v1/guardrails`                                 | [Create a guardrail](/docs/api/api-reference/guardrails/create-a-guardrail)                                           |
| `GET`    | `/api/v1/guardrails/{id}`                            | [Get a guardrail](/docs/api/api-reference/guardrails/get-a-guardrail)                                                 |
| `DELETE` | `/api/v1/guardrails/{id}`                            | [Delete a guardrail](/docs/api/api-reference/guardrails/delete-a-guardrail)                                           |
| `PATCH`  | `/api/v1/guardrails/{id}`                            | [Update a guardrail](/docs/api/api-reference/guardrails/update-a-guardrail)                                           |
| `GET`    | `/api/v1/guardrails/{id}/assignments/keys`           | [List key assignments for a guardrail](/docs/api/api-reference/guardrails/list-key-assignments-for-a-guardrail)       |
| `POST`   | `/api/v1/guardrails/{id}/assignments/keys`           | [Bulk assign keys to a guardrail](/docs/api/api-reference/guardrails/bulk-assign-keys-to-a-guardrail)                 |
| `POST`   | `/api/v1/guardrails/{id}/assignments/keys/remove`    | [Bulk unassign keys from a guardrail](/docs/api/api-reference/guardrails/bulk-unassign-keys-from-a-guardrail)         |
| `GET`    | `/api/v1/guardrails/{id}/assignments/members`        | [List member assignments for a guardrail](/docs/api/api-reference/guardrails/list-member-assignments-for-a-guardrail) |
| `POST`   | `/api/v1/guardrails/{id}/assignments/members`        | [Bulk assign members to a guardrail](/docs/api/api-reference/guardrails/bulk-assign-members-to-a-guardrail)           |
| `POST`   | `/api/v1/guardrails/{id}/assignments/members/remove` | [Bulk unassign members from a guardrail](/docs/api/api-reference/guardrails/bulk-unassign-members-from-a-guardrail)   |
| `GET`    | `/api/v1/guardrails/assignments/keys`                | [List all key assignments](/docs/api/api-reference/guardrails/list-all-key-assignments)                               |
| `GET`    | `/api/v1/guardrails/assignments/members`             | [List all member assignments](/docs/api/api-reference/guardrails/list-all-member-assignments)                         |

### Observability

| Method   | Route                                     | Reference                                                                                                   |
| -------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/v1/observability/destinations`      | [List observability destinations](/docs/api/api-reference/observability/list-observability-destinations)         |
| `POST`   | `/api/v1/observability/destinations`      | [Create an observability destination](/docs/api/api-reference/observability/create-an-observability-destination) |
| `GET`    | `/api/v1/observability/destinations/{id}` | [Get an observability destination](/docs/api/api-reference/observability/get-an-observability-destination)       |
| `DELETE` | `/api/v1/observability/destinations/{id}` | [Delete an observability destination](/docs/api/api-reference/observability/delete-an-observability-destination) |
| `PATCH`  | `/api/v1/observability/destinations/{id}` | [Update an observability destination](/docs/api/api-reference/observability/update-an-observability-destination) |

### Organization

| Method | Route                          | Reference                                                                              |
| ------ | ------------------------------ | -------------------------------------------------------------------------------------- |
| `GET`  | `/api/v1/organization/members` | [List organization members](/docs/api/api-reference/organization/list-organization-members) |

### SCIM

| Method   | Route                              | Reference                                                                                |
| -------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `GET`    | `/api/v1/scim/group-mappings`      | [List SCIM group mappings](/docs/api/api-reference/scim/list-scim-group-mappings)             |
| `POST`   | `/api/v1/scim/group-mappings`      | [Create a SCIM group mapping](/docs/api/api-reference/scim/create-a-scim-group-mapping)       |
| `GET`    | `/api/v1/scim/group-mappings/{id}` | [Get a SCIM group mapping](/docs/api/api-reference/scim/get-a-scim-group-mapping)             |
| `DELETE` | `/api/v1/scim/group-mappings/{id}` | [Delete a SCIM group mapping](/docs/api/api-reference/scim/delete-a-scim-group-mapping)       |
| `PATCH`  | `/api/v1/scim/group-mappings/{id}` | [Update a SCIM group mapping](/docs/api/api-reference/scim/update-a-scim-group-mapping)       |
| `GET`    | `/api/v1/scim/groups`              | [List SCIM groups](/docs/api/api-reference/scim/list-scim-groups)                             |
| `POST`   | `/api/v1/scim/sync-jobs`           | [Start a SCIM directory sync](/docs/api/api-reference/scim/start-a-scim-directory-sync)       |
| `GET`    | `/api/v1/scim/sync-jobs/{id}`      | [Get SCIM directory sync status](/docs/api/api-reference/scim/get-scim-directory-sync-status) |

### Workspaces

| Method   | Route                                                   | Reference                                                                                                  |
| -------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/v1/workspaces`                                    | [List workspaces](/docs/api/api-reference/workspaces/list-workspaces)                                           |
| `POST`   | `/api/v1/workspaces`                                    | [Create a workspace](/docs/api/api-reference/workspaces/create-a-workspace)                                     |
| `GET`    | `/api/v1/workspaces/{id}`                               | [Get a workspace](/docs/api/api-reference/workspaces/get-a-workspace)                                           |
| `DELETE` | `/api/v1/workspaces/{id}`                               | [Delete a workspace](/docs/api/api-reference/workspaces/delete-a-workspace)                                     |
| `PATCH`  | `/api/v1/workspaces/{id}`                               | [Update a workspace](/docs/api/api-reference/workspaces/update-a-workspace)                                     |
| `GET`    | `/api/v1/workspaces/{id}/members`                       | [List workspace members](/docs/api/api-reference/workspaces/list-workspace-members)                             |
| `POST`   | `/api/v1/workspaces/{id}/members/add`                   | [Bulk add members to a workspace](/docs/api/api-reference/workspaces/bulk-add-members-to-a-workspace)           |
| `POST`   | `/api/v1/workspaces/{id}/members/remove`                | [Bulk remove members from a workspace](/docs/api/api-reference/workspaces/bulk-remove-members-from-a-workspace) |
| `GET`    | `/api/v1/workspaces/{workspace_ref}/budgets`            | [List workspace budgets](/docs/api/api-reference/workspaces/list-workspace-budgets)                             |
| `GET`    | `/api/v1/workspaces/{workspace_ref}/budgets/{interval}` | [Get a workspace budget](/docs/api/api-reference/workspaces/get-a-workspace-budget)                             |
| `PUT`    | `/api/v1/workspaces/{workspace_ref}/budgets/{interval}` | [Create or update a workspace budget](/docs/api/api-reference/workspaces/create-or-update-a-workspace-budget)   |
| `DELETE` | `/api/v1/workspaces/{workspace_ref}/budgets/{interval}` | [Delete a workspace budget](/docs/api/api-reference/workspaces/delete-a-workspace-budget)                       |
