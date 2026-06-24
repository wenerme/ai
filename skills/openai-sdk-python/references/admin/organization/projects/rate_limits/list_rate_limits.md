## List project rate limits

`admin.organization.projects.rate_limits.list_rate_limits(strproject_id, RateLimitListRateLimitsParams**kwargs)  -> SyncConversationCursorPage[ProjectRateLimit]`

**get** `/organization/projects/{project_id}/rate_limits`

Returns the rate limits per model for a project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, beginning with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. The default is 100.

### Returns

- `class ProjectRateLimit: …`

  Represents a project rate limit config.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: int`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: int`

    The maximum tokens per minute.

  - `model: str`

    The model this rate limit applies to.

  - `object: Literal["project.rate_limit"]`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens: Optional[int]`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: Optional[int]`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: Optional[int]`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: Optional[int]`

    The maximum requests per day. Only present for relevant models.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.projects.rate_limits.list_rate_limits(
    project_id="project_id",
)
page = page.data[0]
print(page.id)
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
