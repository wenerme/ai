## Create

`beta.chatkit.sessions.create(SessionCreateParams**kwargs)  -> ChatSession`

**post** `/chatkit/sessions`

Create a ChatKit session.

### Parameters

- `user: str`

  A free-form string that identifies your end user; ensures this Session can access other objects that have the same `user` scope.

- `workflow: ChatSessionWorkflowParam`

  Workflow that powers the session.

  - `id: str`

    Identifier for the workflow invoked by the session.

  - `state_variables: Optional[Dict[str, Union[str, bool, float]]]`

    State variables forwarded to the workflow. Keys may be up to 64 characters, values must be primitive types, and the map defaults to an empty object.

    - `str`

    - `bool`

    - `float`

  - `tracing: Optional[Tracing]`

    Optional tracing overrides for the workflow invocation. When omitted, tracing is enabled by default.

    - `enabled: Optional[bool]`

      Whether tracing is enabled during the session. Defaults to true.

  - `version: Optional[str]`

    Specific workflow version to run. Defaults to the latest deployed version.

- `chatkit_configuration: Optional[ChatSessionChatKitConfigurationParam]`

  Optional overrides for ChatKit runtime configuration features

  - `automatic_thread_titling: Optional[AutomaticThreadTitling]`

    Configuration for automatic thread titling. When omitted, automatic thread titling is enabled by default.

    - `enabled: Optional[bool]`

      Enable automatic thread title generation. Defaults to true.

  - `file_upload: Optional[FileUpload]`

    Configuration for upload enablement and limits. When omitted, uploads are disabled by default (max_files 10, max_file_size 512 MB).

    - `enabled: Optional[bool]`

      Enable uploads for this session. Defaults to false.

    - `max_file_size: Optional[int]`

      Maximum size in megabytes for each uploaded file. Defaults to 512 MB, which is the maximum allowable size.

    - `max_files: Optional[int]`

      Maximum number of files that can be uploaded to the session. Defaults to 10.

  - `history: Optional[History]`

    Configuration for chat history retention. When omitted, history is enabled by default with no limit on recent_threads (null).

    - `enabled: Optional[bool]`

      Enables chat users to access previous ChatKit threads. Defaults to true.

    - `recent_threads: Optional[int]`

      Number of recent ChatKit threads users have access to. Defaults to unlimited when unset.

- `expires_after: Optional[ChatSessionExpiresAfterParam]`

  Optional override for session expiration timing in seconds from creation. Defaults to 10 minutes.

  - `anchor: Literal["created_at"]`

    Base timestamp used to calculate expiration. Currently fixed to `created_at`.

    - `"created_at"`

  - `seconds: int`

    Number of seconds after the anchor when the session expires.

- `rate_limits: Optional[ChatSessionRateLimitsParam]`

  Optional override for per-minute request limits. When omitted, defaults to 10.

  - `max_requests_per_1_minute: Optional[int]`

    Maximum number of requests allowed per minute for the session. Defaults to 10.

### Returns

- `class ChatSession: …`

  Represents a ChatKit session and its resolved configuration.

  - `id: str`

    Identifier for the ChatKit session.

  - `chatkit_configuration: ChatSessionChatKitConfiguration`

    Resolved ChatKit feature configuration for the session.

    - `automatic_thread_titling: ChatSessionAutomaticThreadTitling`

      Automatic thread titling preferences.

      - `enabled: bool`

        Whether automatic thread titling is enabled.

    - `file_upload: ChatSessionFileUpload`

      Upload settings for the session.

      - `enabled: bool`

        Indicates if uploads are enabled for the session.

      - `max_file_size: Optional[int]`

        Maximum upload size in megabytes.

      - `max_files: Optional[int]`

        Maximum number of uploads allowed during the session.

    - `history: ChatSessionHistory`

      History retention configuration.

      - `enabled: bool`

        Indicates if chat history is persisted for the session.

      - `recent_threads: Optional[int]`

        Number of prior threads surfaced in history views. Defaults to null when all history is retained.

  - `client_secret: str`

    Ephemeral client secret that authenticates session requests.

  - `expires_at: int`

    Unix timestamp (in seconds) for when the session expires.

  - `max_requests_per_1_minute: int`

    Convenience copy of the per-minute request limit.

  - `object: Literal["chatkit.session"]`

    Type discriminator that is always `chatkit.session`.

    - `"chatkit.session"`

  - `rate_limits: ChatSessionRateLimits`

    Resolved rate limit values.

    - `max_requests_per_1_minute: int`

      Maximum allowed requests per one-minute window.

  - `status: ChatSessionStatus`

    Current lifecycle state of the session.

    - `"active"`

    - `"expired"`

    - `"cancelled"`

  - `user: str`

    User identifier associated with the session.

  - `workflow: ChatKitWorkflow`

    Workflow metadata for the session.

    - `id: str`

      Identifier of the workflow backing the session.

    - `state_variables: Optional[Dict[str, Union[str, bool, float]]]`

      State variable key-value pairs applied when invoking the workflow. Defaults to null when no overrides were provided.

      - `str`

      - `bool`

      - `float`

    - `tracing: Tracing`

      Tracing settings applied to the workflow.

      - `enabled: bool`

        Indicates whether tracing is enabled.

    - `version: Optional[str]`

      Specific workflow version used for the session. Defaults to null when using the latest deployment.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
chat_session = client.beta.chatkit.sessions.create(
    user="x",
    workflow={
        "id": "id"
    },
)
print(chat_session.id)
```
