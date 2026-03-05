## Update Rate Limit

**post** `/organization/projects/{project_id}/rate_limits/{rate_limit_id}`

Updates a project rate limit.

### Path Parameters

- `project_id: string`

- `rate_limit_id: string`

### Body Parameters

- `batch_1_day_max_input_tokens: optional number`

  The maximum batch input tokens per day. Only relevant for certain models.

- `max_audio_megabytes_per_1_minute: optional number`

  The maximum audio megabytes per minute. Only relevant for certain models.

- `max_images_per_1_minute: optional number`

  The maximum images per minute. Only relevant for certain models.

- `max_requests_per_1_day: optional number`

  The maximum requests per day. Only relevant for certain models.

- `max_requests_per_1_minute: optional number`

  The maximum requests per minute.

- `max_tokens_per_1_minute: optional number`

  The maximum tokens per minute.

### Returns

- `id: string`

  The identifier, which can be referenced in API endpoints.

- `max_requests_per_1_minute: number`

  The maximum requests per minute.

- `max_tokens_per_1_minute: number`

  The maximum tokens per minute.

- `model: string`

  The model this rate limit applies to.

- `object: "project.rate_limit"`

  The object type, which is always `project.rate_limit`

  - `"project.rate_limit"`

- `batch_1_day_max_input_tokens: optional number`

  The maximum batch input tokens per day. Only present for relevant models.

- `max_audio_megabytes_per_1_minute: optional number`

  The maximum audio megabytes per minute. Only present for relevant models.

- `max_images_per_1_minute: optional number`

  The maximum images per minute. Only present for relevant models.

- `max_requests_per_1_day: optional number`

  The maximum requests per day. Only present for relevant models.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/rate_limits/$RATE_LIMIT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{}'
```
