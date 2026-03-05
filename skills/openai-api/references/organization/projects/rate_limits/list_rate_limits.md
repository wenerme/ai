## List Rate Limits

**get** `/organization/projects/{project_id}/rate_limits`

Returns the rate limits per model for a project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: optional string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, beginning with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. The default is 100.

### Returns

- `data: array of object { id, max_requests_per_1_minute, max_tokens_per_1_minute, 6 more }`

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

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/rate_limits \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
