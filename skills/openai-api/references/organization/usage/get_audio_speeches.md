## Audio speeches

**get** `/organization/usage/audio_speeches`

Get audio speeches usage details for the organization.

### Query Parameters

- `start_time: number`

  Start time (Unix seconds) of the query time range, inclusive.

- `api_key_ids: optional array of string`

  Return only usage for these API keys.

- `bucket_width: optional "1m" or "1h" or "1d"`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: optional number`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: optional array of "project_id" or "user_id" or "api_key_id" or "model"`

  Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them.

  - `"project_id"`

  - `"user_id"`

  - `"api_key_id"`

  - `"model"`

- `limit: optional number`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `models: optional array of string`

  Return only usage for these models.

- `page: optional string`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: optional array of string`

  Return only usage for these projects.

- `user_ids: optional array of string`

  Return only usage for these users.

### Returns

- `data: array of object { end_time, object, result, start_time }`

  - `end_time: number`

  - `object: "bucket"`

    - `"bucket"`

  - `result: array of object { input_tokens, num_model_requests, object, 10 more }  or object { input_tokens, num_model_requests, object, 4 more }  or object { input_tokens, num_model_requests, object, 4 more }  or 6 more`

    - `UsageCompletionsResult object { input_tokens, num_model_requests, object, 10 more }`

      The aggregated completions usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.completions.result"`

        - `"organization.usage.completions.result"`

      - `output_tokens: number`

        The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `batch: optional boolean`

        When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

      - `input_audio_tokens: optional number`

        The aggregated number of audio input tokens used, including cached tokens.

      - `input_cached_tokens: optional number`

        The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `output_audio_tokens: optional number`

        The aggregated number of audio output tokens used.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `service_tier: optional string`

        When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `UsageEmbeddingsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated embeddings usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.embeddings.result"`

        - `"organization.usage.embeddings.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `UsageModerationsResult object { input_tokens, num_model_requests, object, 4 more }`

      The aggregated moderations usage details of the specific time bucket.

      - `input_tokens: number`

        The aggregated number of input tokens used.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.moderations.result"`

        - `"organization.usage.moderations.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `UsageImagesResult object { images, num_model_requests, object, 6 more }`

      The aggregated images usage details of the specific time bucket.

      - `images: number`

        The number of images processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.images.result"`

        - `"organization.usage.images.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `size: optional string`

        When `group_by=size`, this field provides the image size of the grouped usage result.

      - `source: optional string`

        When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `UsageAudioSpeechesResult object { characters, num_model_requests, object, 4 more }`

      The aggregated audio speeches usage details of the specific time bucket.

      - `characters: number`

        The number of characters processed.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_speeches.result"`

        - `"organization.usage.audio_speeches.result"`

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `UsageAudioTranscriptionsResult object { num_model_requests, object, seconds, 4 more }`

      The aggregated audio transcriptions usage details of the specific time bucket.

      - `num_model_requests: number`

        The count of requests made to the model.

      - `object: "organization.usage.audio_transcriptions.result"`

        - `"organization.usage.audio_transcriptions.result"`

      - `seconds: number`

        The number of seconds processed.

      - `api_key_id: optional string`

        When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

      - `model: optional string`

        When `group_by=model`, this field provides the model name of the grouped usage result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `user_id: optional string`

        When `group_by=user_id`, this field provides the user ID of the grouped usage result.

    - `UsageVectorStoresResult object { object, usage_bytes, project_id }`

      The aggregated vector stores usage details of the specific time bucket.

      - `object: "organization.usage.vector_stores.result"`

        - `"organization.usage.vector_stores.result"`

      - `usage_bytes: number`

        The vector stores usage in bytes.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `UsageCodeInterpreterSessionsResult object { object, num_sessions, project_id }`

      The aggregated code interpreter sessions usage details of the specific time bucket.

      - `object: "organization.usage.code_interpreter_sessions.result"`

        - `"organization.usage.code_interpreter_sessions.result"`

      - `num_sessions: optional number`

        The number of code interpreter sessions.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped usage result.

    - `CostsResult object { object, amount, line_item, project_id }`

      The aggregated costs details of the specific time bucket.

      - `object: "organization.costs.result"`

        - `"organization.costs.result"`

      - `amount: optional object { currency, value }`

        The monetary value in its associated currency.

        - `currency: optional string`

          Lowercase ISO-4217 currency e.g. "usd"

        - `value: optional number`

          The numeric value of the cost.

      - `line_item: optional string`

        When `group_by=line_item`, this field provides the line item of the grouped costs result.

      - `project_id: optional string`

        When `group_by=project_id`, this field provides the project ID of the grouped costs result.

  - `start_time: number`

- `has_more: boolean`

- `next_page: string`

- `object: "page"`

  - `"page"`

### Example

```http
curl https://api.openai.com/v1/organization/usage/audio_speeches \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "end_time": 0,
      "object": "bucket",
      "result": [
        {
          "input_tokens": 0,
          "num_model_requests": 0,
          "object": "organization.usage.completions.result",
          "output_tokens": 0,
          "api_key_id": "api_key_id",
          "batch": true,
          "input_audio_tokens": 0,
          "input_cached_tokens": 0,
          "model": "model",
          "output_audio_tokens": 0,
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
curl "https://api.openai.com/v1/organization/usage/audio_speeches?start_time=1730419200&limit=1" \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "page",
    "data": [
        {
            "object": "bucket",
            "start_time": 1730419200,
            "end_time": 1730505600,
            "results": [
                {
                    "object": "organization.usage.audio_speeches.result",
                    "characters": 45,
                    "num_model_requests": 1,
                    "project_id": null,
                    "user_id": null,
                    "api_key_id": null,
                    "model": null
                }
            ]
        }
    ],
    "has_more": false,
    "next_page": null
}
```
