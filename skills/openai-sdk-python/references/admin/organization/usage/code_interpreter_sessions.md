## Code interpreter sessions

`admin.organization.usage.code_interpreter_sessions(UsageCodeInterpreterSessionsParams**kwargs)  -> UsageCodeInterpreterSessionsResponse`

**get** `/organization/usage/code_interpreter_sessions`

Get code interpreter sessions usage details for the organization.

### Parameters

- `start_time: int`

  Start time (Unix seconds) of the query time range, inclusive.

- `bucket_width: Optional[Literal["1m", "1h", "1d"]]`

  Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.

  - `"1m"`

  - `"1h"`

  - `"1d"`

- `end_time: Optional[int]`

  End time (Unix seconds) of the query time range, exclusive.

- `group_by: Optional[List[Literal["project_id"]]]`

  Group the usage data by the specified fields. Support fields include `project_id`.

  - `"project_id"`

- `limit: Optional[int]`

  Specifies the number of buckets to return.

  - `bucket_width=1d`: default: 7, max: 31
  - `bucket_width=1h`: default: 24, max: 168
  - `bucket_width=1m`: default: 60, max: 1440

- `page: Optional[str]`

  A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.

- `project_ids: Optional[Sequence[str]]`

  Return only usage for these projects.

### Returns

- `class UsageCodeInterpreterSessionsResponse: …`

  - `data: List[Data]`

    - `end_time: int`

    - `object: Literal["bucket"]`

      - `"bucket"`

    - `results: List[DataResult]`

      - `class DataResultOrganizationUsageCompletionsResult: …`

        The aggregated completions usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.completions.result"]`

          - `"organization.usage.completions.result"`

        - `output_tokens: int`

          The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `batch: Optional[bool]`

          When `group_by=batch`, this field tells whether the grouped usage result is batch or not.

        - `input_audio_tokens: Optional[int]`

          The aggregated number of audio input tokens used, including cached tokens.

        - `input_cached_tokens: Optional[int]`

          The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `output_audio_tokens: Optional[int]`

          The aggregated number of audio output tokens used.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `service_tier: Optional[str]`

          When `group_by=service_tier`, this field provides the service tier of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageEmbeddingsResult: …`

        The aggregated embeddings usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.embeddings.result"]`

          - `"organization.usage.embeddings.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageModerationsResult: …`

        The aggregated moderations usage details of the specific time bucket.

        - `input_tokens: int`

          The aggregated number of input tokens used.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.moderations.result"]`

          - `"organization.usage.moderations.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageImagesResult: …`

        The aggregated images usage details of the specific time bucket.

        - `images: int`

          The number of images processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.images.result"]`

          - `"organization.usage.images.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `size: Optional[str]`

          When `group_by=size`, this field provides the image size of the grouped usage result.

        - `source: Optional[str]`

          When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioSpeechesResult: …`

        The aggregated audio speeches usage details of the specific time bucket.

        - `characters: int`

          The number of characters processed.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_speeches.result"]`

          - `"organization.usage.audio_speeches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageAudioTranscriptionsResult: …`

        The aggregated audio transcriptions usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of requests made to the model.

        - `object: Literal["organization.usage.audio_transcriptions.result"]`

          - `"organization.usage.audio_transcriptions.result"`

        - `seconds: int`

          The number of seconds processed.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationUsageVectorStoresResult: …`

        The aggregated vector stores usage details of the specific time bucket.

        - `object: Literal["organization.usage.vector_stores.result"]`

          - `"organization.usage.vector_stores.result"`

        - `usage_bytes: int`

          The vector stores usage in bytes.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageCodeInterpreterSessionsResult: …`

        The aggregated code interpreter sessions usage details of the specific time bucket.

        - `num_sessions: int`

          The number of code interpreter sessions.

        - `object: Literal["organization.usage.code_interpreter_sessions.result"]`

          - `"organization.usage.code_interpreter_sessions.result"`

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

      - `class DataResultOrganizationUsageFileSearchesResult: …`

        The aggregated file search calls usage details of the specific time bucket.

        - `num_requests: int`

          The count of file search calls.

        - `object: Literal["organization.usage.file_searches.result"]`

          - `"organization.usage.file_searches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

        - `vector_store_id: Optional[str]`

          When `group_by=vector_store_id`, this field provides the vector store ID of the grouped usage result.

      - `class DataResultOrganizationUsageWebSearchesResult: …`

        The aggregated web search calls usage details of the specific time bucket.

        - `num_model_requests: int`

          The count of model requests.

        - `num_requests: int`

          The count of web search calls.

        - `object: Literal["organization.usage.web_searches.result"]`

          - `"organization.usage.web_searches.result"`

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result.

        - `context_level: Optional[str]`

          When `group_by=context_level`, this field provides the search context size of the grouped usage result.

        - `model: Optional[str]`

          When `group_by=model`, this field provides the model name of the grouped usage result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped usage result.

        - `user_id: Optional[str]`

          When `group_by=user_id`, this field provides the user ID of the grouped usage result.

      - `class DataResultOrganizationCostsResult: …`

        The aggregated costs details of the specific time bucket.

        - `object: Literal["organization.costs.result"]`

          - `"organization.costs.result"`

        - `amount: Optional[DataResultOrganizationCostsResultAmount]`

          The monetary value in its associated currency.

          - `currency: Optional[str]`

            Lowercase ISO-4217 currency e.g. "usd"

          - `value: Optional[float]`

            The numeric value of the cost.

        - `api_key_id: Optional[str]`

          When `group_by=api_key_id`, this field provides the API Key ID of the grouped costs result.

        - `line_item: Optional[str]`

          When `group_by=line_item`, this field provides the line item of the grouped costs result.

        - `project_id: Optional[str]`

          When `group_by=project_id`, this field provides the project ID of the grouped costs result.

        - `quantity: Optional[float]`

          When `group_by=line_item`, this field provides the quantity of the grouped costs result.

    - `start_time: int`

  - `has_more: bool`

  - `next_page: Optional[str]`

  - `object: Literal["page"]`

    - `"page"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
response = client.admin.organization.usage.code_interpreter_sessions(
    start_time=0,
)
print(response.data)
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
