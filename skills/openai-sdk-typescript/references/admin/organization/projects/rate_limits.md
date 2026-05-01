# Rate Limits

## List project rate limits

`client.admin.organization.projects.rateLimits.listRateLimits(stringprojectID, RateLimitListRateLimitsParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectRateLimit>`

**get** `/organization/projects/{project_id}/rate_limits`

Returns the rate limits per model for a project.

### Parameters

- `projectID: string`

- `query: RateLimitListRateLimitsParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `before?: string`

    A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, beginning with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. The default is 100.

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

// Automatically fetches more pages as needed.
for await (const projectRateLimit of client.admin.organization.projects.rateLimits.listRateLimits(
  'project_id',
)) {
  console.log(projectRateLimit.id);
}
```

#### Response

```json
{
  "data": [
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
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

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

## Domain Types

### Project Rate Limit

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
