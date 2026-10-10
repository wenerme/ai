## Decisions

**get** `/organization/usage/decisions`

Get Decisions API usage details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: optional array of string or null`

  Return only usage for these API keys.

  - `array of string`

- `batch: optional boolean or null`

  If `true`, return batch jobs only. If `false`, return non-batch jobs only. By default, return both.

- `bucket_width: optional "1m" or "1h" or "1d" or null`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: optional number or null`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id" or "user_id" or "api_key_id" or 4 more or null`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, `api_source` or any combination of them. When grouped by `api_source`, results use `agents_api` for attributed Agents API activity and `unlabeled` for all other activity. Without source grouping, `api_source` is null.

  - `array of "project_id" or "user_id" or "api_key_id" or 4 more`

    - `"project_id"`

    - `"user_id"`

    - `"api_key_id"`

    - `"model"`

    - `"batch"`

    - `"service_tier"`

    - `"api_source"`

- `limit: optional number or null`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: optional array of string or null`

  Return only usage for these models.

  - `array of string`

- `page: optional string or null`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string or null`

  Return only usage for these projects.

  - `array of string`

- `user_ids: optional array of string or null`

  Return only usage for these users.

  - `array of string`

### Returns

- `data: array of object { end_time, object, results, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `results: array of object { input_tokens, num_model_requests, object, 21 more }`

    - `input_tokens: number`

      The aggregated number of input tokens used, including cached and cache-write tokens. This includes text, audio, and image tokens. For customers subscribed to Scale Tier, this includes Scale Tier tokens.

    - `num_model_requests: number`

      The count of requests made to the model.

    - `object: "organization.usage.decisions.result"`

      - `"organization.usage.decisions.result"`

    - `output_tokens: number`

      The aggregated number of output tokens used across text, audio, and image outputs. For customers subscribed to Scale Tier, this includes Scale Tier tokens.

    - `api_key_id: optional string or null`

      When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

    - `api_source: optional "agents_api" or "unlabeled" or null`

      When grouped by `api_source`, `agents_api` identifies attributed Agents API activity and `unlabeled` includes all records without published source attribution, including historical and unknown origins. Unlabeled does not imply direct API usage. Without source grouping, this field is null.

      - `"agents_api"`

      - `"unlabeled"`

    - `batch: optional boolean or null`

      When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

    - `input_audio_tokens: optional number or null`

      The aggregated number of uncached audio input tokens used.

    - `input_cache_write_12h_tokens: optional number or null`

      The aggregated number of input tokens written to the cache with a 12-hour retention period.

    - `input_cache_write_tokens: optional number or null`

      The aggregated number of input tokens written to the cache with a 30-minute retention period.

    - `input_cached_audio_tokens: optional number or null`

      The aggregated number of cached audio input tokens used.

    - `input_cached_image_tokens: optional number or null`

      The aggregated number of cached image input tokens used.

    - `input_cached_text_tokens: optional number or null`

      The aggregated number of cached text input tokens used.

    - `input_cached_tokens: optional number or null`

      The aggregated number of cached input tokens used across text, audio, and image inputs. For customers subscribed to Scale Tier, this includes Scale Tier tokens.

    - `input_image_tokens: optional number or null`

      The aggregated number of uncached image input tokens used.

    - `input_text_tokens: optional number or null`

      The aggregated number of uncached text input tokens used, excluding cache-write tokens.

    - `input_uncached_tokens: optional number or null`

      The aggregated number of uncached input tokens used across text, audio, and image inputs, excluding cache-write tokens.

    - `model: optional string or null`

      When `group_by=model`, this field provides the model name of the grouped usage result.

    - `output_audio_tokens: optional number or null`

      The aggregated number of audio output tokens used.

    - `output_image_tokens: optional number or null`

      The aggregated number of image output tokens used.

    - `output_text_tokens: optional number or null`

      The aggregated number of text output tokens used.

    - `project_id: optional string or null`

      When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `service_tier: optional string or null`

      When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

    - `user_id: optional string or null`

      When `group_by=user_id`, this field provides the user ID of the grouped usage result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string or null`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/decisions \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "end_time": 0,
      "object": "bucket",
      "results": [
        {
          "input_tokens": 0,
          "num_model_requests": 0,
          "object": "organization.usage.decisions.result",
          "output_tokens": 0,
          "api_key_id": "api_key_id",
          "api_source": "agents_api",
          "batch": true,
          "input_audio_tokens": 0,
          "input_cache_write_12h_tokens": 0,
          "input_cache_write_tokens": 0,
          "input_cached_audio_tokens": 0,
          "input_cached_image_tokens": 0,
          "input_cached_text_tokens": 0,
          "input_cached_tokens": 0,
          "input_image_tokens": 0,
          "input_text_tokens": 0,
          "input_uncached_tokens": 0,
          "model": "model",
          "output_audio_tokens": 0,
          "output_image_tokens": 0,
          "output_text_tokens": 0,
          "project_id": "project_id",
          "service_tier": "service_tier",
          "user_id": "user_id"
        }
      ],
      "start_time": 0
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "page"
}
```

### Example

```http
curl --get "https://api.openai.com/v1/organization/usage/decisions" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  --data-urlencode "start_time=1790812800" \
  --data-urlencode "end_time=1790899200" \
  --data-urlencode "bucket_width=1d" \
  --data-urlencode "group_by=project_id" \
  --data-urlencode "group_by=model"
```

#### Response

```json
{
    "object": "page",
    "data": [
        {
            "object": "bucket",
            "start_time": 1790812800,
            "end_time": 1790899200,
            "results": [
                {
                    "object": "organization.usage.decisions.result",
                    "input_tokens": 1000,
                    "input_cached_tokens": 400,
                    "output_tokens": 0,
                    "num_model_requests": 5,
                    "project_id": "proj_example",
                    "model": "gpt-6-luna",
                    "user_id": null,
                    "api_key_id": null,
                    "batch": null,
                    "service_tier": null
                }
            ]
        }
    ],
    "has_more": false,
    "next_page": null
}
```
