## Modify project rate limit

**post** `/organization/projects/{project_id}/rate_limits/{rate_limit_id}`

Updates a project rate limit.

### Path Parameters

- `project_id: string`

  The ID of the project.

- `rate_limit_id: string`

  The ID of the rate limit.

### Body Parameters

- `batch_1_day_max_input_tokens: optional integer`

  The maximum batch input tokens per day. Only relevant for certain models.

- `max_audio_megabytes_per_1_minute: optional integer`

  The maximum audio megabytes per minute. Only relevant for certain models.

- `max_images_per_1_minute: optional integer`

  The maximum images per minute. Only relevant for certain models.

- `max_requests_per_1_day: optional integer`

  The maximum requests per day. Only relevant for certain models.

- `max_requests_per_1_minute: optional integer`

  The maximum requests per minute.

- `max_tokens_per_1_minute: optional integer`

  The maximum tokens per minute.

### Returns

- `ProjectRateLimit object { id, max_requests_per_1_minute, max_tokens_per_1_minute, 6 more }`

  Represents a project rate limit config.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: integer`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: integer`

    The maximum tokens per minute.

  - `model: string`

    The model this rate limit applies to.

  - `object: "project.rate_limit"`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: optional integer`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: optional integer`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: optional integer`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: optional integer`

    The maximum requests per day. Only present for relevant models.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/rate_limits/$RATE_LIMIT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
```

#### 200 example 1

```json
{
  "id": "id",
  "max_requests_per_1_minute": 0,
  "max_tokens_per_1_minute": 0,
  "model": "model",
  "object": "project.rate_limit",
  "batch_1_day_max_input_tokens": 0,
  "max_audio_megabytes_per_1_minute": 0,
  "max_images_per_1_minute": 0,
  "max_requests_per_1_day": 0
}
```

#### 404 — default

```json
{
  "error": {
    "code": "project_not_found",
    "message": "The project proj_abc was not found",
    "type": "invalid_request_error",
    "param": null
  }
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/rate_limits/rl_xxx \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "max_requests_per_1_minute": 500
  }'
```

#### Response example

```json
{
    "object": "project.rate_limit",
    "id": "rl-ada",
    "model": "ada",
    "max_requests_per_1_minute": 600,
    "max_tokens_per_1_minute": 150000,
    "max_images_per_1_minute": 10
  }
```
