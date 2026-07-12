## Modify project rate limit

`client.admin.organization.projects.rateLimits.updateRateLimit(stringrateLimitID, RateLimitUpdateRateLimitParamsparams, RequestOptionsoptions?): ProjectRateLimit`

**post** `/organization/projects/{project_id}/rate_limits/{rate_limit_id}`

Updates a project rate limit.

### Parameters

- `rateLimitID: string`

- `params: RateLimitUpdateRateLimitParams`

  - `project_id: string`

    Path param: The ID of the project.

  - `batch_1_day_max_input_tokens?: number`

    Body param: The maximum batch input tokens per day. Only relevant for certain models.

  - `max_audio_megabytes_per_1_minute?: number`

    Body param: The maximum audio megabytes per minute. Only relevant for certain models.

  - `max_images_per_1_minute?: number`

    Body param: The maximum images per minute. Only relevant for certain models.

  - `max_requests_per_1_day?: number`

    Body param: The maximum requests per day. Only relevant for certain models.

  - `max_requests_per_1_minute?: number`

    Body param: The maximum requests per minute.

  - `max_tokens_per_1_minute?: number`

    Body param: The maximum tokens per minute.

### Returns

- `ProjectRateLimit`

  Represents a project rate limit config.

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

  - `batch_1_day_max_input_tokens?: number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute?: number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute?: number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day?: number`

    The maximum requests per day. Only present for relevant models.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectRateLimit = await client.admin.organization.projects.rateLimits.updateRateLimit(
  'rate_limit_id',
  { project_id: 'project_id' },
);

console.log(projectRateLimit.id);
```

#### Response

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
