## List agent session turns

**get** `/agents/sessions/{session_id}/turns`

Lists turns by creation time and turn ID. The after cursor is exclusive in the selected order. See [session turns](/api/docs/guides/agents-api/sessions/manage#inspect-session-turns).

### Path Parameters

- `session_id: string`

  The ID of the session.

  `minLength: 0`, `maxLength: 1048576`

### Query Parameters

- `after: optional string`

  Return resources after this resource ID in the selected order.

  `minLength: 0`, `maxLength: 1048576`

- `limit: optional integer (default: 20)`

  The maximum number of resources to return, between 1 and 100. Defaults to 20.

  `format: int64`, `minimum: 1`, `maximum: 100`

- `order: optional "asc" or "desc" (default: "desc")`

  The order in which resources are returned. Defaults to `desc`.

  - `"asc"`

    Returns resources in ascending order.

  - `"desc"`

    Returns resources in descending order.

### Returns

- `data: array of Turn`

  The resources returned in this page, in the requested sort order.

  `minItems: 0`, `maxItems: 2000`

  - `id: string`

    The ID of the turn.

    `minLength: 0`

  - `agent_id: string`

    The ID of the agent that ran the turn.

    `minLength: 0`

  - `completed_at: integer or null`

    The Unix timestamp, in seconds, when the turn reached a terminal state.

    `format: int64`

  - `created_at: integer`

    The Unix timestamp, in seconds, used to order the turn by creation time. Subagent turns use their start time, falling back to completion time or the subagent opening time when the preceding timestamps are unavailable.

    `format: int64`

  - `error: SessionTurnError or null`

    A customer-safe error. Non-null only for a failed turn.

    - `code: "context_length_exceeded" or "session_budget_exceeded" or "usage_limit_exceeded" or 20 more`

      A stable, machine-readable failure category.

      - `"context_length_exceeded"`

        The request exceeds the model's context window.

      - `"session_budget_exceeded"`

        The session has reached its usage budget.

      - `"usage_limit_exceeded"`

        The organization has reached a usage, plan, or billing limit.

      - `"project_spend_limit_exceeded"`

        The project has reached its enforced spend limit.

      - `"organization_spend_limit_exceeded"`

        The organization has reached its enforced spend limit.

      - `"organization_usage_limit_exceeded"`

        The organization has reached its OpenAI-assigned usage limit.

      - `"billing_not_active"`

        Billing is not active for the account.

      - `"credit_balance_exhausted"`

        The organization has no API credits remaining.

      - `"rate_limit_exceeded"`

        The request exceeds the available rate limit.

      - `"flex_unavailable"`

        Flex processing is temporarily unavailable.

      - `"server_overloaded"`

        The model service is temporarily overloaded.

      - `"cyber_policy"`

        The request was rejected by a safety policy.

      - `"misalignment_policy_violation"`

        The request was blocked by the safety systems.

      - `"connection_failed"`

        The request could not connect to the model service.

      - `"server_error"`

        The model service encountered an unexpected error.

      - `"authentication_error"`

        The API credentials are invalid or lack the required access.

      - `"invalid_request"`

        The request contains invalid input or configuration.

      - `"resource_not_found"`

        The requested model or resource is unavailable.

      - `"sandbox_error"`

        The request could not complete in its execution environment.

      - `"executor_version_incompatible"`

        The executor must be upgraded before it can run this turn.

      - `"active_turn_not_steerable"`

        The session cannot accept additional input while a request is running.

      - `"request_timeout"`

        The request timed out before the model service responded.

      - `"internal_error"`

        An unexpected internal error prevented the session request from completing.

    - `message: string`

      A customer-safe explanation of the failure.

      `minLength: 0`

  - `object: "agent.session.turn" (default: "agent.session.turn")`

    The object type. Always `agent.session.turn`.

    - `"agent.session.turn"`

  - `session_id: string`

    The ID of the session that owns the turn.

    `minLength: 0`

  - `started_at: integer or null`

    The Unix timestamp, in seconds, when the turn started.

    `format: int64`

  - `status: "queued" or "in_progress" or "waiting" or 3 more`

    The current status of the turn.

    - `"queued"`

      The turn is waiting to start.

    - `"in_progress"`

      The turn is in progress.

    - `"waiting"`

      The turn is waiting for external input.

    - `"completed"`

      The turn completed successfully.

    - `"failed"`

      The turn failed.

    - `"cancelled"`

      The turn was cancelled.

  - `subagent_id: string or null`

    The ID of the subagent that ran the turn, if applicable.

    `minLength: 0`

  - `usage: TokenUsage or null`

    Best-effort token usage for the turn, or null if unknown. Recorded usage may change.

    - `input_tokens: integer`

      The number of input tokens used by the agent.

      `format: int64`

    - `input_tokens_details: object { cached_tokens }`

      A breakdown of the agent's input token usage.

      - `cached_tokens: integer`

        The number of input tokens retrieved from the prompt cache.

        `format: int64`

    - `output_tokens: integer`

      The number of output tokens generated by the agent.

      `format: int64`

    - `output_tokens_details: object { reasoning_tokens }`

      A breakdown of the agent's output token usage.

      - `reasoning_tokens: integer`

        The number of output tokens used for reasoning.

        `format: int64`

    - `total_tokens: integer`

      The total number of input and output tokens used by the agent.

      `format: int64`

- `first_id: string or null`

  The ID of the first resource in `data`, or `null` if the page is empty.

  `minLength: 0`

- `has_more: boolean`

  Whether there are more resources to retrieve after this page.

- `last_id: string or null`

  The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.

  `minLength: 0`

- `object: "list" (default: "list")`

  The object type, which is always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/agents/sessions/$SESSION_ID/turns \
    -H 'OpenAI-Beta: agents=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 200 — Example

```json
{
  "data": [
    {
      "id": "id",
      "agent_id": "agent_id",
      "completed_at": 0,
      "created_at": 0,
      "error": {
        "code": "context_length_exceeded",
        "message": "message"
      },
      "object": "agent.session.turn",
      "session_id": "session_id",
      "started_at": 0,
      "status": "queued",
      "subagent_id": "subagent_id",
      "usage": {
        "input_tokens": 0,
        "input_tokens_details": {
          "cached_tokens": 0
        },
        "output_tokens": 0,
        "output_tokens_details": {
          "reasoning_tokens": 0
        },
        "total_tokens": 0
      }
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```
