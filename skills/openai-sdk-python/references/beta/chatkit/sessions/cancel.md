## Cancel

`beta.chatkit.sessions.cancel(strsession_id)  -> ChatSession`

**post** `/chatkit/sessions/{session_id}/cancel`

Cancel an active ChatKit session and return its most recent metadata.

Cancelling prevents new requests from using the issued client secret.

### Parameters

- `session_id: str`

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
chat_session = client.beta.chatkit.sessions.cancel(
    "cksess_123",
)
print(chat_session.id)
```
