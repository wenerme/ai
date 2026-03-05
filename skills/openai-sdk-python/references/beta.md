# Beta

# ChatKit

## Domain Types

### ChatKit Workflow

- `class ChatKitWorkflow: …`

  Workflow metadata and state returned for the session.

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

# Sessions

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

# Threads

## List Items

`beta.chatkit.threads.list_items(strthread_id, ThreadListItemsParams**kwargs)  -> SyncConversationCursorPage[Data]`

**get** `/chatkit/threads/{thread_id}/items`

List items that belong to a ChatKit thread.

### Parameters

- `thread_id: str`

- `after: Optional[str]`

  List items created after this thread item ID. Defaults to null for the first page.

- `before: Optional[str]`

  List items created before this thread item ID. Defaults to null for the newest results.

- `limit: Optional[int]`

  Maximum number of thread items to return. Defaults to 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for results by creation time. Defaults to `desc`.

  - `"asc"`

  - `"desc"`

### Returns

- `Data`

  - `class ChatKitThreadUserMessageItem: …`

    User-authored messages within a thread.

    - `id: str`

      Identifier of the thread item.

    - `attachments: List[ChatKitAttachment]`

      Attachments associated with the user message. Defaults to an empty list.

      - `id: str`

        Identifier for the attachment.

      - `mime_type: str`

        MIME type of the attachment.

      - `name: str`

        Original display name for the attachment.

      - `preview_url: Optional[str]`

        Preview URL for rendering the attachment inline.

      - `type: Literal["image", "file"]`

        Attachment discriminator.

        - `"image"`

        - `"file"`

    - `content: List[Content]`

      Ordered content elements supplied by the user.

      - `class ContentInputText: …`

        Text block that a user contributed to the thread.

        - `text: str`

          Plain-text content supplied by the user.

        - `type: Literal["input_text"]`

          Type discriminator that is always `input_text`.

          - `"input_text"`

      - `class ContentQuotedText: …`

        Quoted snippet that the user referenced in their message.

        - `text: str`

          Quoted text content.

        - `type: Literal["quoted_text"]`

          Type discriminator that is always `quoted_text`.

          - `"quoted_text"`

    - `created_at: int`

      Unix timestamp (in seconds) for when the item was created.

    - `inference_options: Optional[InferenceOptions]`

      Inference overrides applied to the message. Defaults to null when unset.

      - `model: Optional[str]`

        Model name that generated the response. Defaults to null when using the session default.

      - `tool_choice: Optional[InferenceOptionsToolChoice]`

        Preferred tool to invoke. Defaults to null when ChatKit should auto-select.

        - `id: str`

          Identifier of the requested tool.

    - `object: Literal["chatkit.thread_item"]`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `thread_id: str`

      Identifier of the parent thread.

    - `type: Literal["chatkit.user_message"]`

      - `"chatkit.user_message"`

  - `class ChatKitThreadAssistantMessageItem: …`

    Assistant-authored message within a thread.

    - `id: str`

      Identifier of the thread item.

    - `content: List[ChatKitResponseOutputText]`

      Ordered assistant response segments.

      - `annotations: List[Annotation]`

        Ordered list of annotations attached to the response text.

        - `class AnnotationFile: …`

          Annotation that references an uploaded file.

          - `source: AnnotationFileSource`

            File attachment referenced by the annotation.

            - `filename: str`

              Filename referenced by the annotation.

            - `type: Literal["file"]`

              Type discriminator that is always `file`.

              - `"file"`

          - `type: Literal["file"]`

            Type discriminator that is always `file` for this annotation.

            - `"file"`

        - `class AnnotationURL: …`

          Annotation that references a URL.

          - `source: AnnotationURLSource`

            URL referenced by the annotation.

            - `type: Literal["url"]`

              Type discriminator that is always `url`.

              - `"url"`

            - `url: str`

              URL referenced by the annotation.

          - `type: Literal["url"]`

            Type discriminator that is always `url` for this annotation.

            - `"url"`

      - `text: str`

        Assistant generated text.

      - `type: Literal["output_text"]`

        Type discriminator that is always `output_text`.

        - `"output_text"`

    - `created_at: int`

      Unix timestamp (in seconds) for when the item was created.

    - `object: Literal["chatkit.thread_item"]`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `thread_id: str`

      Identifier of the parent thread.

    - `type: Literal["chatkit.assistant_message"]`

      Type discriminator that is always `chatkit.assistant_message`.

      - `"chatkit.assistant_message"`

  - `class ChatKitWidgetItem: …`

    Thread item that renders a widget payload.

    - `id: str`

      Identifier of the thread item.

    - `created_at: int`

      Unix timestamp (in seconds) for when the item was created.

    - `object: Literal["chatkit.thread_item"]`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `thread_id: str`

      Identifier of the parent thread.

    - `type: Literal["chatkit.widget"]`

      Type discriminator that is always `chatkit.widget`.

      - `"chatkit.widget"`

    - `widget: str`

      Serialized widget payload rendered in the UI.

  - `class DataChatKitClientToolCall: …`

    Record of a client side tool invocation initiated by the assistant.

    - `id: str`

      Identifier of the thread item.

    - `arguments: str`

      JSON-encoded arguments that were sent to the tool.

    - `call_id: str`

      Identifier for the client tool call.

    - `created_at: int`

      Unix timestamp (in seconds) for when the item was created.

    - `name: str`

      Tool name that was invoked.

    - `object: Literal["chatkit.thread_item"]`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `output: Optional[str]`

      JSON-encoded output captured from the tool. Defaults to null while execution is in progress.

    - `status: Literal["in_progress", "completed"]`

      Execution status for the tool call.

      - `"in_progress"`

      - `"completed"`

    - `thread_id: str`

      Identifier of the parent thread.

    - `type: Literal["chatkit.client_tool_call"]`

      Type discriminator that is always `chatkit.client_tool_call`.

      - `"chatkit.client_tool_call"`

  - `class DataChatKitTask: …`

    Task emitted by the workflow to show progress and status updates.

    - `id: str`

      Identifier of the thread item.

    - `created_at: int`

      Unix timestamp (in seconds) for when the item was created.

    - `heading: Optional[str]`

      Optional heading for the task. Defaults to null when not provided.

    - `object: Literal["chatkit.thread_item"]`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `summary: Optional[str]`

      Optional summary that describes the task. Defaults to null when omitted.

    - `task_type: Literal["custom", "thought"]`

      Subtype for the task.

      - `"custom"`

      - `"thought"`

    - `thread_id: str`

      Identifier of the parent thread.

    - `type: Literal["chatkit.task"]`

      Type discriminator that is always `chatkit.task`.

      - `"chatkit.task"`

  - `class DataChatKitTaskGroup: …`

    Collection of workflow tasks grouped together in the thread.

    - `id: str`

      Identifier of the thread item.

    - `created_at: int`

      Unix timestamp (in seconds) for when the item was created.

    - `object: Literal["chatkit.thread_item"]`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `tasks: List[DataChatKitTaskGroupTask]`

      Tasks included in the group.

      - `heading: Optional[str]`

        Optional heading for the grouped task. Defaults to null when not provided.

      - `summary: Optional[str]`

        Optional summary that describes the grouped task. Defaults to null when omitted.

      - `type: Literal["custom", "thought"]`

        Subtype for the grouped task.

        - `"custom"`

        - `"thought"`

    - `thread_id: str`

      Identifier of the parent thread.

    - `type: Literal["chatkit.task_group"]`

      Type discriminator that is always `chatkit.task_group`.

      - `"chatkit.task_group"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.beta.chatkit.threads.list_items(
    thread_id="cthr_123",
)
page = page.data[0]
print(page)
```

## Retrieve

`beta.chatkit.threads.retrieve(strthread_id)  -> ChatKitThread`

**get** `/chatkit/threads/{thread_id}`

Retrieve a ChatKit thread by its identifier.

### Parameters

- `thread_id: str`

### Returns

- `class ChatKitThread: …`

  Represents a ChatKit thread and its current status.

  - `id: str`

    Identifier of the thread.

  - `created_at: int`

    Unix timestamp (in seconds) for when the thread was created.

  - `object: Literal["chatkit.thread"]`

    Type discriminator that is always `chatkit.thread`.

    - `"chatkit.thread"`

  - `status: Status`

    Current status for the thread. Defaults to `active` for newly created threads.

    - `class StatusActive: …`

      Indicates that a thread is active.

      - `type: Literal["active"]`

        Status discriminator that is always `active`.

        - `"active"`

    - `class StatusLocked: …`

      Indicates that a thread is locked and cannot accept new input.

      - `reason: Optional[str]`

        Reason that the thread was locked. Defaults to null when no reason is recorded.

      - `type: Literal["locked"]`

        Status discriminator that is always `locked`.

        - `"locked"`

    - `class StatusClosed: …`

      Indicates that a thread has been closed.

      - `reason: Optional[str]`

        Reason that the thread was closed. Defaults to null when no reason is recorded.

      - `type: Literal["closed"]`

        Status discriminator that is always `closed`.

        - `"closed"`

  - `title: Optional[str]`

    Optional human-readable title for the thread. Defaults to null when no title has been generated.

  - `user: str`

    Free-form string that identifies your end user who owns the thread.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
chatkit_thread = client.beta.chatkit.threads.retrieve(
    "cthr_123",
)
print(chatkit_thread.id)
```

## Delete

`beta.chatkit.threads.delete(strthread_id)  -> ThreadDeleteResponse`

**delete** `/chatkit/threads/{thread_id}`

Delete a ChatKit thread along with its items and stored attachments.

### Parameters

- `thread_id: str`

### Returns

- `class ThreadDeleteResponse: …`

  Confirmation payload returned after deleting a thread.

  - `id: str`

    Identifier of the deleted thread.

  - `deleted: bool`

    Indicates that the thread has been deleted.

  - `object: Literal["chatkit.thread.deleted"]`

    Type discriminator that is always `chatkit.thread.deleted`.

    - `"chatkit.thread.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
thread = client.beta.chatkit.threads.delete(
    "cthr_123",
)
print(thread.id)
```

## List

`beta.chatkit.threads.list(ThreadListParams**kwargs)  -> SyncConversationCursorPage[ChatKitThread]`

**get** `/chatkit/threads`

List ChatKit threads with optional pagination and user filters.

### Parameters

- `after: Optional[str]`

  List items created after this thread item ID. Defaults to null for the first page.

- `before: Optional[str]`

  List items created before this thread item ID. Defaults to null for the newest results.

- `limit: Optional[int]`

  Maximum number of thread items to return. Defaults to 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for results by creation time. Defaults to `desc`.

  - `"asc"`

  - `"desc"`

- `user: Optional[str]`

  Filter threads that belong to this user identifier. Defaults to null to return all users.

### Returns

- `class ChatKitThread: …`

  Represents a ChatKit thread and its current status.

  - `id: str`

    Identifier of the thread.

  - `created_at: int`

    Unix timestamp (in seconds) for when the thread was created.

  - `object: Literal["chatkit.thread"]`

    Type discriminator that is always `chatkit.thread`.

    - `"chatkit.thread"`

  - `status: Status`

    Current status for the thread. Defaults to `active` for newly created threads.

    - `class StatusActive: …`

      Indicates that a thread is active.

      - `type: Literal["active"]`

        Status discriminator that is always `active`.

        - `"active"`

    - `class StatusLocked: …`

      Indicates that a thread is locked and cannot accept new input.

      - `reason: Optional[str]`

        Reason that the thread was locked. Defaults to null when no reason is recorded.

      - `type: Literal["locked"]`

        Status discriminator that is always `locked`.

        - `"locked"`

    - `class StatusClosed: …`

      Indicates that a thread has been closed.

      - `reason: Optional[str]`

        Reason that the thread was closed. Defaults to null when no reason is recorded.

      - `type: Literal["closed"]`

        Status discriminator that is always `closed`.

        - `"closed"`

  - `title: Optional[str]`

    Optional human-readable title for the thread. Defaults to null when no title has been generated.

  - `user: str`

    Free-form string that identifies your end user who owns the thread.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.beta.chatkit.threads.list()
page = page.data[0]
print(page.id)
```

## Domain Types

### Chat Session

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

### Chat Session Automatic Thread Titling

- `class ChatSessionAutomaticThreadTitling: …`

  Automatic thread title preferences for the session.

  - `enabled: bool`

    Whether automatic thread titling is enabled.

### Chat Session ChatKit Configuration

- `class ChatSessionChatKitConfiguration: …`

  ChatKit configuration for the session.

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

### Chat Session ChatKit Configuration Param

- `class ChatSessionChatKitConfigurationParam: …`

  Optional per-session configuration settings for ChatKit behavior.

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

### Chat Session Expires After Param

- `class ChatSessionExpiresAfterParam: …`

  Controls when the session expires relative to an anchor timestamp.

  - `anchor: Literal["created_at"]`

    Base timestamp used to calculate expiration. Currently fixed to `created_at`.

    - `"created_at"`

  - `seconds: int`

    Number of seconds after the anchor when the session expires.

### Chat Session File Upload

- `class ChatSessionFileUpload: …`

  Upload permissions and limits applied to the session.

  - `enabled: bool`

    Indicates if uploads are enabled for the session.

  - `max_file_size: Optional[int]`

    Maximum upload size in megabytes.

  - `max_files: Optional[int]`

    Maximum number of uploads allowed during the session.

### Chat Session History

- `class ChatSessionHistory: …`

  History retention preferences returned for the session.

  - `enabled: bool`

    Indicates if chat history is persisted for the session.

  - `recent_threads: Optional[int]`

    Number of prior threads surfaced in history views. Defaults to null when all history is retained.

### Chat Session Rate Limits

- `class ChatSessionRateLimits: …`

  Active per-minute request limit for the session.

  - `max_requests_per_1_minute: int`

    Maximum allowed requests per one-minute window.

### Chat Session Rate Limits Param

- `class ChatSessionRateLimitsParam: …`

  Controls request rate limits for the session.

  - `max_requests_per_1_minute: Optional[int]`

    Maximum number of requests allowed per minute for the session. Defaults to 10.

### Chat Session Status

- `Literal["active", "expired", "cancelled"]`

  - `"active"`

  - `"expired"`

  - `"cancelled"`

### Chat Session Workflow Param

- `class ChatSessionWorkflowParam: …`

  Workflow reference and overrides applied to the chat session.

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

### ChatKit Attachment

- `class ChatKitAttachment: …`

  Attachment metadata included on thread items.

  - `id: str`

    Identifier for the attachment.

  - `mime_type: str`

    MIME type of the attachment.

  - `name: str`

    Original display name for the attachment.

  - `preview_url: Optional[str]`

    Preview URL for rendering the attachment inline.

  - `type: Literal["image", "file"]`

    Attachment discriminator.

    - `"image"`

    - `"file"`

### ChatKit Response Output Text

- `class ChatKitResponseOutputText: …`

  Assistant response text accompanied by optional annotations.

  - `annotations: List[Annotation]`

    Ordered list of annotations attached to the response text.

    - `class AnnotationFile: …`

      Annotation that references an uploaded file.

      - `source: AnnotationFileSource`

        File attachment referenced by the annotation.

        - `filename: str`

          Filename referenced by the annotation.

        - `type: Literal["file"]`

          Type discriminator that is always `file`.

          - `"file"`

      - `type: Literal["file"]`

        Type discriminator that is always `file` for this annotation.

        - `"file"`

    - `class AnnotationURL: …`

      Annotation that references a URL.

      - `source: AnnotationURLSource`

        URL referenced by the annotation.

        - `type: Literal["url"]`

          Type discriminator that is always `url`.

          - `"url"`

        - `url: str`

          URL referenced by the annotation.

      - `type: Literal["url"]`

        Type discriminator that is always `url` for this annotation.

        - `"url"`

  - `text: str`

    Assistant generated text.

  - `type: Literal["output_text"]`

    Type discriminator that is always `output_text`.

    - `"output_text"`

### ChatKit Thread

- `class ChatKitThread: …`

  Represents a ChatKit thread and its current status.

  - `id: str`

    Identifier of the thread.

  - `created_at: int`

    Unix timestamp (in seconds) for when the thread was created.

  - `object: Literal["chatkit.thread"]`

    Type discriminator that is always `chatkit.thread`.

    - `"chatkit.thread"`

  - `status: Status`

    Current status for the thread. Defaults to `active` for newly created threads.

    - `class StatusActive: …`

      Indicates that a thread is active.

      - `type: Literal["active"]`

        Status discriminator that is always `active`.

        - `"active"`

    - `class StatusLocked: …`

      Indicates that a thread is locked and cannot accept new input.

      - `reason: Optional[str]`

        Reason that the thread was locked. Defaults to null when no reason is recorded.

      - `type: Literal["locked"]`

        Status discriminator that is always `locked`.

        - `"locked"`

    - `class StatusClosed: …`

      Indicates that a thread has been closed.

      - `reason: Optional[str]`

        Reason that the thread was closed. Defaults to null when no reason is recorded.

      - `type: Literal["closed"]`

        Status discriminator that is always `closed`.

        - `"closed"`

  - `title: Optional[str]`

    Optional human-readable title for the thread. Defaults to null when no title has been generated.

  - `user: str`

    Free-form string that identifies your end user who owns the thread.

### ChatKit Thread Assistant Message Item

- `class ChatKitThreadAssistantMessageItem: …`

  Assistant-authored message within a thread.

  - `id: str`

    Identifier of the thread item.

  - `content: List[ChatKitResponseOutputText]`

    Ordered assistant response segments.

    - `annotations: List[Annotation]`

      Ordered list of annotations attached to the response text.

      - `class AnnotationFile: …`

        Annotation that references an uploaded file.

        - `source: AnnotationFileSource`

          File attachment referenced by the annotation.

          - `filename: str`

            Filename referenced by the annotation.

          - `type: Literal["file"]`

            Type discriminator that is always `file`.

            - `"file"`

        - `type: Literal["file"]`

          Type discriminator that is always `file` for this annotation.

          - `"file"`

      - `class AnnotationURL: …`

        Annotation that references a URL.

        - `source: AnnotationURLSource`

          URL referenced by the annotation.

          - `type: Literal["url"]`

            Type discriminator that is always `url`.

            - `"url"`

          - `url: str`

            URL referenced by the annotation.

        - `type: Literal["url"]`

          Type discriminator that is always `url` for this annotation.

          - `"url"`

    - `text: str`

      Assistant generated text.

    - `type: Literal["output_text"]`

      Type discriminator that is always `output_text`.

      - `"output_text"`

  - `created_at: int`

    Unix timestamp (in seconds) for when the item was created.

  - `object: Literal["chatkit.thread_item"]`

    Type discriminator that is always `chatkit.thread_item`.

    - `"chatkit.thread_item"`

  - `thread_id: str`

    Identifier of the parent thread.

  - `type: Literal["chatkit.assistant_message"]`

    Type discriminator that is always `chatkit.assistant_message`.

    - `"chatkit.assistant_message"`

### ChatKit Thread Item List

- `class ChatKitThreadItemList: …`

  A paginated list of thread items rendered for the ChatKit API.

  - `data: List[Data]`

    A list of items

    - `class ChatKitThreadUserMessageItem: …`

      User-authored messages within a thread.

      - `id: str`

        Identifier of the thread item.

      - `attachments: List[ChatKitAttachment]`

        Attachments associated with the user message. Defaults to an empty list.

        - `id: str`

          Identifier for the attachment.

        - `mime_type: str`

          MIME type of the attachment.

        - `name: str`

          Original display name for the attachment.

        - `preview_url: Optional[str]`

          Preview URL for rendering the attachment inline.

        - `type: Literal["image", "file"]`

          Attachment discriminator.

          - `"image"`

          - `"file"`

      - `content: List[Content]`

        Ordered content elements supplied by the user.

        - `class ContentInputText: …`

          Text block that a user contributed to the thread.

          - `text: str`

            Plain-text content supplied by the user.

          - `type: Literal["input_text"]`

            Type discriminator that is always `input_text`.

            - `"input_text"`

        - `class ContentQuotedText: …`

          Quoted snippet that the user referenced in their message.

          - `text: str`

            Quoted text content.

          - `type: Literal["quoted_text"]`

            Type discriminator that is always `quoted_text`.

            - `"quoted_text"`

      - `created_at: int`

        Unix timestamp (in seconds) for when the item was created.

      - `inference_options: Optional[InferenceOptions]`

        Inference overrides applied to the message. Defaults to null when unset.

        - `model: Optional[str]`

          Model name that generated the response. Defaults to null when using the session default.

        - `tool_choice: Optional[InferenceOptionsToolChoice]`

          Preferred tool to invoke. Defaults to null when ChatKit should auto-select.

          - `id: str`

            Identifier of the requested tool.

      - `object: Literal["chatkit.thread_item"]`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `thread_id: str`

        Identifier of the parent thread.

      - `type: Literal["chatkit.user_message"]`

        - `"chatkit.user_message"`

    - `class ChatKitThreadAssistantMessageItem: …`

      Assistant-authored message within a thread.

      - `id: str`

        Identifier of the thread item.

      - `content: List[ChatKitResponseOutputText]`

        Ordered assistant response segments.

        - `annotations: List[Annotation]`

          Ordered list of annotations attached to the response text.

          - `class AnnotationFile: …`

            Annotation that references an uploaded file.

            - `source: AnnotationFileSource`

              File attachment referenced by the annotation.

              - `filename: str`

                Filename referenced by the annotation.

              - `type: Literal["file"]`

                Type discriminator that is always `file`.

                - `"file"`

            - `type: Literal["file"]`

              Type discriminator that is always `file` for this annotation.

              - `"file"`

          - `class AnnotationURL: …`

            Annotation that references a URL.

            - `source: AnnotationURLSource`

              URL referenced by the annotation.

              - `type: Literal["url"]`

                Type discriminator that is always `url`.

                - `"url"`

              - `url: str`

                URL referenced by the annotation.

            - `type: Literal["url"]`

              Type discriminator that is always `url` for this annotation.

              - `"url"`

        - `text: str`

          Assistant generated text.

        - `type: Literal["output_text"]`

          Type discriminator that is always `output_text`.

          - `"output_text"`

      - `created_at: int`

        Unix timestamp (in seconds) for when the item was created.

      - `object: Literal["chatkit.thread_item"]`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `thread_id: str`

        Identifier of the parent thread.

      - `type: Literal["chatkit.assistant_message"]`

        Type discriminator that is always `chatkit.assistant_message`.

        - `"chatkit.assistant_message"`

    - `class ChatKitWidgetItem: …`

      Thread item that renders a widget payload.

      - `id: str`

        Identifier of the thread item.

      - `created_at: int`

        Unix timestamp (in seconds) for when the item was created.

      - `object: Literal["chatkit.thread_item"]`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `thread_id: str`

        Identifier of the parent thread.

      - `type: Literal["chatkit.widget"]`

        Type discriminator that is always `chatkit.widget`.

        - `"chatkit.widget"`

      - `widget: str`

        Serialized widget payload rendered in the UI.

    - `class DataChatKitClientToolCall: …`

      Record of a client side tool invocation initiated by the assistant.

      - `id: str`

        Identifier of the thread item.

      - `arguments: str`

        JSON-encoded arguments that were sent to the tool.

      - `call_id: str`

        Identifier for the client tool call.

      - `created_at: int`

        Unix timestamp (in seconds) for when the item was created.

      - `name: str`

        Tool name that was invoked.

      - `object: Literal["chatkit.thread_item"]`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `output: Optional[str]`

        JSON-encoded output captured from the tool. Defaults to null while execution is in progress.

      - `status: Literal["in_progress", "completed"]`

        Execution status for the tool call.

        - `"in_progress"`

        - `"completed"`

      - `thread_id: str`

        Identifier of the parent thread.

      - `type: Literal["chatkit.client_tool_call"]`

        Type discriminator that is always `chatkit.client_tool_call`.

        - `"chatkit.client_tool_call"`

    - `class DataChatKitTask: …`

      Task emitted by the workflow to show progress and status updates.

      - `id: str`

        Identifier of the thread item.

      - `created_at: int`

        Unix timestamp (in seconds) for when the item was created.

      - `heading: Optional[str]`

        Optional heading for the task. Defaults to null when not provided.

      - `object: Literal["chatkit.thread_item"]`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `summary: Optional[str]`

        Optional summary that describes the task. Defaults to null when omitted.

      - `task_type: Literal["custom", "thought"]`

        Subtype for the task.

        - `"custom"`

        - `"thought"`

      - `thread_id: str`

        Identifier of the parent thread.

      - `type: Literal["chatkit.task"]`

        Type discriminator that is always `chatkit.task`.

        - `"chatkit.task"`

    - `class DataChatKitTaskGroup: …`

      Collection of workflow tasks grouped together in the thread.

      - `id: str`

        Identifier of the thread item.

      - `created_at: int`

        Unix timestamp (in seconds) for when the item was created.

      - `object: Literal["chatkit.thread_item"]`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `tasks: List[DataChatKitTaskGroupTask]`

        Tasks included in the group.

        - `heading: Optional[str]`

          Optional heading for the grouped task. Defaults to null when not provided.

        - `summary: Optional[str]`

          Optional summary that describes the grouped task. Defaults to null when omitted.

        - `type: Literal["custom", "thought"]`

          Subtype for the grouped task.

          - `"custom"`

          - `"thought"`

      - `thread_id: str`

        Identifier of the parent thread.

      - `type: Literal["chatkit.task_group"]`

        Type discriminator that is always `chatkit.task_group`.

        - `"chatkit.task_group"`

  - `first_id: Optional[str]`

    The ID of the first item in the list.

  - `has_more: bool`

    Whether there are more items available.

  - `last_id: Optional[str]`

    The ID of the last item in the list.

  - `object: Literal["list"]`

    The type of object returned, must be `list`.

    - `"list"`

### ChatKit Thread User Message Item

- `class ChatKitThreadUserMessageItem: …`

  User-authored messages within a thread.

  - `id: str`

    Identifier of the thread item.

  - `attachments: List[ChatKitAttachment]`

    Attachments associated with the user message. Defaults to an empty list.

    - `id: str`

      Identifier for the attachment.

    - `mime_type: str`

      MIME type of the attachment.

    - `name: str`

      Original display name for the attachment.

    - `preview_url: Optional[str]`

      Preview URL for rendering the attachment inline.

    - `type: Literal["image", "file"]`

      Attachment discriminator.

      - `"image"`

      - `"file"`

  - `content: List[Content]`

    Ordered content elements supplied by the user.

    - `class ContentInputText: …`

      Text block that a user contributed to the thread.

      - `text: str`

        Plain-text content supplied by the user.

      - `type: Literal["input_text"]`

        Type discriminator that is always `input_text`.

        - `"input_text"`

    - `class ContentQuotedText: …`

      Quoted snippet that the user referenced in their message.

      - `text: str`

        Quoted text content.

      - `type: Literal["quoted_text"]`

        Type discriminator that is always `quoted_text`.

        - `"quoted_text"`

  - `created_at: int`

    Unix timestamp (in seconds) for when the item was created.

  - `inference_options: Optional[InferenceOptions]`

    Inference overrides applied to the message. Defaults to null when unset.

    - `model: Optional[str]`

      Model name that generated the response. Defaults to null when using the session default.

    - `tool_choice: Optional[InferenceOptionsToolChoice]`

      Preferred tool to invoke. Defaults to null when ChatKit should auto-select.

      - `id: str`

        Identifier of the requested tool.

  - `object: Literal["chatkit.thread_item"]`

    Type discriminator that is always `chatkit.thread_item`.

    - `"chatkit.thread_item"`

  - `thread_id: str`

    Identifier of the parent thread.

  - `type: Literal["chatkit.user_message"]`

    - `"chatkit.user_message"`

### ChatKit Widget Item

- `class ChatKitWidgetItem: …`

  Thread item that renders a widget payload.

  - `id: str`

    Identifier of the thread item.

  - `created_at: int`

    Unix timestamp (in seconds) for when the item was created.

  - `object: Literal["chatkit.thread_item"]`

    Type discriminator that is always `chatkit.thread_item`.

    - `"chatkit.thread_item"`

  - `thread_id: str`

    Identifier of the parent thread.

  - `type: Literal["chatkit.widget"]`

    Type discriminator that is always `chatkit.widget`.

    - `"chatkit.widget"`

  - `widget: str`

    Serialized widget payload rendered in the UI.

# Assistants

## List

`beta.assistants.list(AssistantListParams**kwargs)  -> SyncCursorPage[Assistant]`

**get** `/assistants`

Returns a list of assistants.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class Assistant: …`

  Represents an `assistant` that can call the model and use tools.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the assistant was created.

  - `description: Optional[str]`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions: Optional[str]`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `name: Optional[str]`

    The name of the assistant. The maximum length is 256 characters.

  - `object: Literal["assistant"]`

    The object type, which is always `assistant`.

    - `"assistant"`

  - `tools: List[AssistantTool]`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `temperature: Optional[float]`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources: Optional[ToolResources]`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

      - `file_ids: Optional[List[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ToolResourcesFileSearch]`

      - `vector_store_ids: Optional[List[str]]`

        The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `top_p: Optional[float]`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.beta.assistants.list()
page = page.data[0]
print(page.id)
```

## Create

`beta.assistants.create(AssistantCreateParams**kwargs)  -> Assistant`

**post** `/assistants`

Create an assistant with a model and instructions.

### Parameters

- `model: Union[str, ChatModel]`

  ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `str`

  - `Literal["gpt-5.2", "gpt-5.2-2025-12-11", "gpt-5.2-chat-latest", 69 more]`

    - `"gpt-5.2"`

    - `"gpt-5.2-2025-12-11"`

    - `"gpt-5.2-chat-latest"`

    - `"gpt-5.2-pro"`

    - `"gpt-5.2-pro-2025-12-11"`

    - `"gpt-5.1"`

    - `"gpt-5.1-2025-11-13"`

    - `"gpt-5.1-codex"`

    - `"gpt-5.1-mini"`

    - `"gpt-5.1-chat-latest"`

    - `"gpt-5"`

    - `"gpt-5-mini"`

    - `"gpt-5-nano"`

    - `"gpt-5-2025-08-07"`

    - `"gpt-5-mini-2025-08-07"`

    - `"gpt-5-nano-2025-08-07"`

    - `"gpt-5-chat-latest"`

    - `"gpt-4.1"`

    - `"gpt-4.1-mini"`

    - `"gpt-4.1-nano"`

    - `"gpt-4.1-2025-04-14"`

    - `"gpt-4.1-mini-2025-04-14"`

    - `"gpt-4.1-nano-2025-04-14"`

    - `"o4-mini"`

    - `"o4-mini-2025-04-16"`

    - `"o3"`

    - `"o3-2025-04-16"`

    - `"o3-mini"`

    - `"o3-mini-2025-01-31"`

    - `"o1"`

    - `"o1-2024-12-17"`

    - `"o1-preview"`

    - `"o1-preview-2024-09-12"`

    - `"o1-mini"`

    - `"o1-mini-2024-09-12"`

    - `"gpt-4o"`

    - `"gpt-4o-2024-11-20"`

    - `"gpt-4o-2024-08-06"`

    - `"gpt-4o-2024-05-13"`

    - `"gpt-4o-audio-preview"`

    - `"gpt-4o-audio-preview-2024-10-01"`

    - `"gpt-4o-audio-preview-2024-12-17"`

    - `"gpt-4o-audio-preview-2025-06-03"`

    - `"gpt-4o-mini-audio-preview"`

    - `"gpt-4o-mini-audio-preview-2024-12-17"`

    - `"gpt-4o-search-preview"`

    - `"gpt-4o-mini-search-preview"`

    - `"gpt-4o-search-preview-2025-03-11"`

    - `"gpt-4o-mini-search-preview-2025-03-11"`

    - `"chatgpt-4o-latest"`

    - `"codex-mini-latest"`

    - `"gpt-4o-mini"`

    - `"gpt-4o-mini-2024-07-18"`

    - `"gpt-4-turbo"`

    - `"gpt-4-turbo-2024-04-09"`

    - `"gpt-4-0125-preview"`

    - `"gpt-4-turbo-preview"`

    - `"gpt-4-1106-preview"`

    - `"gpt-4-vision-preview"`

    - `"gpt-4"`

    - `"gpt-4-0314"`

    - `"gpt-4-0613"`

    - `"gpt-4-32k"`

    - `"gpt-4-32k-0314"`

    - `"gpt-4-32k-0613"`

    - `"gpt-3.5-turbo"`

    - `"gpt-3.5-turbo-16k"`

    - `"gpt-3.5-turbo-0301"`

    - `"gpt-3.5-turbo-0613"`

    - `"gpt-3.5-turbo-1106"`

    - `"gpt-3.5-turbo-0125"`

    - `"gpt-3.5-turbo-16k-0613"`

- `description: Optional[str]`

  The description of the assistant. The maximum length is 512 characters.

- `instructions: Optional[str]`

  The system instructions that the assistant uses. The maximum length is 256,000 characters.

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `name: Optional[str]`

  The name of the assistant. The maximum length is 256 characters.

- `reasoning_effort: Optional[ReasoningEffort]`

  Constrains effort on reasoning for
  [reasoning models](https://platform.openai.com/docs/guides/reasoning).
  Currently supported values are `none`, `minimal`, `low`, `medium`, `high`, and `xhigh`. Reducing
  reasoning effort can result in faster responses and fewer tokens used
  on reasoning in a response.

  - `gpt-5.1` defaults to `none`, which does not perform reasoning. The supported reasoning values for `gpt-5.1` are `none`, `low`, `medium`, and `high`. Tool calls are supported for all reasoning values in gpt-5.1.
  - All models before `gpt-5.1` default to `medium` reasoning effort, and do not support `none`.
  - The `gpt-5-pro` model defaults to (and only supports) `high` reasoning effort.
  - `xhigh` is supported for all models after `gpt-5.1-codex-max`.

  - `"none"`

  - `"minimal"`

  - `"low"`

  - `"medium"`

  - `"high"`

  - `"xhigh"`

- `response_format: Optional[AssistantResponseFormatOptionParam]`

  Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

  Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

  Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

  **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

  - `Literal["auto"]`

    `auto` is the default value

    - `"auto"`

  - `class ResponseFormatText: …`

    Default response format. Used to generate text responses.

    - `type: Literal["text"]`

      The type of response format being defined. Always `text`.

      - `"text"`

  - `class ResponseFormatJSONObject: …`

    JSON object response format. An older method of generating JSON responses.
    Using `json_schema` is recommended for models that support it. Note that the
    model will not generate JSON without a system or user message instructing it
    to do so.

    - `type: Literal["json_object"]`

      The type of response format being defined. Always `json_object`.

      - `"json_object"`

  - `class ResponseFormatJSONSchema: …`

    JSON Schema response format. Used to generate structured JSON responses.
    Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

    - `json_schema: JSONSchema`

      Structured Outputs configuration options, including a JSON Schema.

      - `name: str`

        The name of the response format. Must be a-z, A-Z, 0-9, or contain
        underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the response format is for, used by the model to
        determine how to respond in the format.

      - `schema: Optional[Dict[str, object]]`

        The schema for the response format, described as a JSON Schema object.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the output.
        If set to true, the model will always follow the exact schema defined
        in the `schema` field. Only a subset of JSON Schema is supported when
        `strict` is `true`. To learn more, read the [Structured Outputs
        guide](https://platform.openai.com/docs/guides/structured-outputs).

    - `type: Literal["json_schema"]`

      The type of response format being defined. Always `json_schema`.

      - `"json_schema"`

- `temperature: Optional[float]`

  What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

- `tool_resources: Optional[ToolResources]`

  A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

  - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

    - `file_ids: Optional[SequenceNotStr[str]]`

      A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

  - `file_search: Optional[ToolResourcesFileSearch]`

    - `vector_store_ids: Optional[SequenceNotStr[str]]`

      The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

    - `vector_stores: Optional[Iterable[ToolResourcesFileSearchVectorStore]]`

      A helper to create a [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) with file_ids and attach it to this assistant. There can be a maximum of 1 vector store attached to the assistant.

      - `chunking_strategy: Optional[ToolResourcesFileSearchVectorStoreChunkingStrategy]`

        The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy.

        - `class ToolResourcesFileSearchVectorStoreChunkingStrategyAuto: …`

          The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

          - `type: Literal["auto"]`

            Always `auto`.

            - `"auto"`

        - `class ToolResourcesFileSearchVectorStoreChunkingStrategyStatic: …`

          - `static: ToolResourcesFileSearchVectorStoreChunkingStrategyStaticStatic`

            - `chunk_overlap_tokens: int`

              The number of tokens that overlap between chunks. The default value is `400`.

              Note that the overlap must not exceed half of `max_chunk_size_tokens`.

            - `max_chunk_size_tokens: int`

              The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

          - `type: Literal["static"]`

            Always `static`.

            - `"static"`

      - `file_ids: Optional[SequenceNotStr[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs to add to the vector store. There can be a maximum of 10000 files in a vector store.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

- `tools: Optional[Iterable[AssistantToolParam]]`

  A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

  - `class CodeInterpreterTool: …`

    - `type: Literal["code_interpreter"]`

      The type of tool being defined: `code_interpreter`

      - `"code_interpreter"`

  - `class FileSearchTool: …`

    - `type: Literal["file_search"]`

      The type of tool being defined: `file_search`

      - `"file_search"`

    - `file_search: Optional[FileSearch]`

      Overrides for the file search tool.

      - `max_num_results: Optional[int]`

        The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

        Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

      - `ranking_options: Optional[FileSearchRankingOptions]`

        The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

        See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `score_threshold: float`

          The score threshold for the file search. All values must be a floating point number between 0 and 1.

        - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

          The ranker to use for the file search. If not specified will use the `auto` ranker.

          - `"auto"`

          - `"default_2024_08_21"`

  - `class FunctionTool: …`

    - `function: FunctionDefinition`

      - `name: str`

        The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the function does, used by the model to choose when and how to call the function.

      - `parameters: Optional[FunctionParameters]`

        The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

        Omitting `parameters` defines a function with an empty parameter list.

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

    - `type: Literal["function"]`

      The type of tool being defined: `function`

      - `"function"`

- `top_p: Optional[float]`

  An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

  We generally recommend altering this or temperature but not both.

### Returns

- `class Assistant: …`

  Represents an `assistant` that can call the model and use tools.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the assistant was created.

  - `description: Optional[str]`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions: Optional[str]`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `name: Optional[str]`

    The name of the assistant. The maximum length is 256 characters.

  - `object: Literal["assistant"]`

    The object type, which is always `assistant`.

    - `"assistant"`

  - `tools: List[AssistantTool]`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `temperature: Optional[float]`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources: Optional[ToolResources]`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

      - `file_ids: Optional[List[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ToolResourcesFileSearch]`

      - `vector_store_ids: Optional[List[str]]`

        The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `top_p: Optional[float]`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
assistant = client.beta.assistants.create(
    model="gpt-4o",
)
print(assistant.id)
```

## Retrieve

`beta.assistants.retrieve(strassistant_id)  -> Assistant`

**get** `/assistants/{assistant_id}`

Retrieves an assistant.

### Parameters

- `assistant_id: str`

### Returns

- `class Assistant: …`

  Represents an `assistant` that can call the model and use tools.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the assistant was created.

  - `description: Optional[str]`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions: Optional[str]`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `name: Optional[str]`

    The name of the assistant. The maximum length is 256 characters.

  - `object: Literal["assistant"]`

    The object type, which is always `assistant`.

    - `"assistant"`

  - `tools: List[AssistantTool]`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `temperature: Optional[float]`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources: Optional[ToolResources]`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

      - `file_ids: Optional[List[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ToolResourcesFileSearch]`

      - `vector_store_ids: Optional[List[str]]`

        The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `top_p: Optional[float]`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
assistant = client.beta.assistants.retrieve(
    "assistant_id",
)
print(assistant.id)
```

## Update

`beta.assistants.update(strassistant_id, AssistantUpdateParams**kwargs)  -> Assistant`

**post** `/assistants/{assistant_id}`

Modifies an assistant.

### Parameters

- `assistant_id: str`

- `description: Optional[str]`

  The description of the assistant. The maximum length is 512 characters.

- `instructions: Optional[str]`

  The system instructions that the assistant uses. The maximum length is 256,000 characters.

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `model: Optional[Union[str, Literal["gpt-5", "gpt-5-mini", "gpt-5-nano", 39 more]]]`

  ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `str`

  - `Literal["gpt-5", "gpt-5-mini", "gpt-5-nano", 39 more]`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

    - `"gpt-5"`

    - `"gpt-5-mini"`

    - `"gpt-5-nano"`

    - `"gpt-5-2025-08-07"`

    - `"gpt-5-mini-2025-08-07"`

    - `"gpt-5-nano-2025-08-07"`

    - `"gpt-4.1"`

    - `"gpt-4.1-mini"`

    - `"gpt-4.1-nano"`

    - `"gpt-4.1-2025-04-14"`

    - `"gpt-4.1-mini-2025-04-14"`

    - `"gpt-4.1-nano-2025-04-14"`

    - `"o3-mini"`

    - `"o3-mini-2025-01-31"`

    - `"o1"`

    - `"o1-2024-12-17"`

    - `"gpt-4o"`

    - `"gpt-4o-2024-11-20"`

    - `"gpt-4o-2024-08-06"`

    - `"gpt-4o-2024-05-13"`

    - `"gpt-4o-mini"`

    - `"gpt-4o-mini-2024-07-18"`

    - `"gpt-4.5-preview"`

    - `"gpt-4.5-preview-2025-02-27"`

    - `"gpt-4-turbo"`

    - `"gpt-4-turbo-2024-04-09"`

    - `"gpt-4-0125-preview"`

    - `"gpt-4-turbo-preview"`

    - `"gpt-4-1106-preview"`

    - `"gpt-4-vision-preview"`

    - `"gpt-4"`

    - `"gpt-4-0314"`

    - `"gpt-4-0613"`

    - `"gpt-4-32k"`

    - `"gpt-4-32k-0314"`

    - `"gpt-4-32k-0613"`

    - `"gpt-3.5-turbo"`

    - `"gpt-3.5-turbo-16k"`

    - `"gpt-3.5-turbo-0613"`

    - `"gpt-3.5-turbo-1106"`

    - `"gpt-3.5-turbo-0125"`

    - `"gpt-3.5-turbo-16k-0613"`

- `name: Optional[str]`

  The name of the assistant. The maximum length is 256 characters.

- `reasoning_effort: Optional[ReasoningEffort]`

  Constrains effort on reasoning for
  [reasoning models](https://platform.openai.com/docs/guides/reasoning).
  Currently supported values are `none`, `minimal`, `low`, `medium`, `high`, and `xhigh`. Reducing
  reasoning effort can result in faster responses and fewer tokens used
  on reasoning in a response.

  - `gpt-5.1` defaults to `none`, which does not perform reasoning. The supported reasoning values for `gpt-5.1` are `none`, `low`, `medium`, and `high`. Tool calls are supported for all reasoning values in gpt-5.1.
  - All models before `gpt-5.1` default to `medium` reasoning effort, and do not support `none`.
  - The `gpt-5-pro` model defaults to (and only supports) `high` reasoning effort.
  - `xhigh` is supported for all models after `gpt-5.1-codex-max`.

  - `"none"`

  - `"minimal"`

  - `"low"`

  - `"medium"`

  - `"high"`

  - `"xhigh"`

- `response_format: Optional[AssistantResponseFormatOptionParam]`

  Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

  Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

  Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

  **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

  - `Literal["auto"]`

    `auto` is the default value

    - `"auto"`

  - `class ResponseFormatText: …`

    Default response format. Used to generate text responses.

    - `type: Literal["text"]`

      The type of response format being defined. Always `text`.

      - `"text"`

  - `class ResponseFormatJSONObject: …`

    JSON object response format. An older method of generating JSON responses.
    Using `json_schema` is recommended for models that support it. Note that the
    model will not generate JSON without a system or user message instructing it
    to do so.

    - `type: Literal["json_object"]`

      The type of response format being defined. Always `json_object`.

      - `"json_object"`

  - `class ResponseFormatJSONSchema: …`

    JSON Schema response format. Used to generate structured JSON responses.
    Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

    - `json_schema: JSONSchema`

      Structured Outputs configuration options, including a JSON Schema.

      - `name: str`

        The name of the response format. Must be a-z, A-Z, 0-9, or contain
        underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the response format is for, used by the model to
        determine how to respond in the format.

      - `schema: Optional[Dict[str, object]]`

        The schema for the response format, described as a JSON Schema object.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the output.
        If set to true, the model will always follow the exact schema defined
        in the `schema` field. Only a subset of JSON Schema is supported when
        `strict` is `true`. To learn more, read the [Structured Outputs
        guide](https://platform.openai.com/docs/guides/structured-outputs).

    - `type: Literal["json_schema"]`

      The type of response format being defined. Always `json_schema`.

      - `"json_schema"`

- `temperature: Optional[float]`

  What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

- `tool_resources: Optional[ToolResources]`

  A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

  - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

    - `file_ids: Optional[SequenceNotStr[str]]`

      Overrides the list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

  - `file_search: Optional[ToolResourcesFileSearch]`

    - `vector_store_ids: Optional[SequenceNotStr[str]]`

      Overrides the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

- `tools: Optional[Iterable[AssistantToolParam]]`

  A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

  - `class CodeInterpreterTool: …`

    - `type: Literal["code_interpreter"]`

      The type of tool being defined: `code_interpreter`

      - `"code_interpreter"`

  - `class FileSearchTool: …`

    - `type: Literal["file_search"]`

      The type of tool being defined: `file_search`

      - `"file_search"`

    - `file_search: Optional[FileSearch]`

      Overrides for the file search tool.

      - `max_num_results: Optional[int]`

        The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

        Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

      - `ranking_options: Optional[FileSearchRankingOptions]`

        The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

        See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `score_threshold: float`

          The score threshold for the file search. All values must be a floating point number between 0 and 1.

        - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

          The ranker to use for the file search. If not specified will use the `auto` ranker.

          - `"auto"`

          - `"default_2024_08_21"`

  - `class FunctionTool: …`

    - `function: FunctionDefinition`

      - `name: str`

        The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the function does, used by the model to choose when and how to call the function.

      - `parameters: Optional[FunctionParameters]`

        The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

        Omitting `parameters` defines a function with an empty parameter list.

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

    - `type: Literal["function"]`

      The type of tool being defined: `function`

      - `"function"`

- `top_p: Optional[float]`

  An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

  We generally recommend altering this or temperature but not both.

### Returns

- `class Assistant: …`

  Represents an `assistant` that can call the model and use tools.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the assistant was created.

  - `description: Optional[str]`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions: Optional[str]`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `name: Optional[str]`

    The name of the assistant. The maximum length is 256 characters.

  - `object: Literal["assistant"]`

    The object type, which is always `assistant`.

    - `"assistant"`

  - `tools: List[AssistantTool]`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `temperature: Optional[float]`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources: Optional[ToolResources]`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

      - `file_ids: Optional[List[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ToolResourcesFileSearch]`

      - `vector_store_ids: Optional[List[str]]`

        The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `top_p: Optional[float]`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
assistant = client.beta.assistants.update(
    assistant_id="assistant_id",
)
print(assistant.id)
```

## Delete

`beta.assistants.delete(strassistant_id)  -> AssistantDeleted`

**delete** `/assistants/{assistant_id}`

Delete an assistant.

### Parameters

- `assistant_id: str`

### Returns

- `class AssistantDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["assistant.deleted"]`

    - `"assistant.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
assistant_deleted = client.beta.assistants.delete(
    "assistant_id",
)
print(assistant_deleted.id)
```

## Domain Types

### Assistant

- `class Assistant: …`

  Represents an `assistant` that can call the model and use tools.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the assistant was created.

  - `description: Optional[str]`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions: Optional[str]`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `name: Optional[str]`

    The name of the assistant. The maximum length is 256 characters.

  - `object: Literal["assistant"]`

    The object type, which is always `assistant`.

    - `"assistant"`

  - `tools: List[AssistantTool]`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `temperature: Optional[float]`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources: Optional[ToolResources]`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

      - `file_ids: Optional[List[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ToolResourcesFileSearch]`

      - `vector_store_ids: Optional[List[str]]`

        The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `top_p: Optional[float]`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Assistant Deleted

- `class AssistantDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["assistant.deleted"]`

    - `"assistant.deleted"`

### Assistant Stream Event

- `AssistantStreamEvent`

  Represents an event emitted when streaming a Run.

  Each event in a server-sent events stream has an `event` and `data` property:

  ```
  event: thread.created
  data: {"id": "thread_123", "object": "thread", ...}
  ```

  We emit events whenever a new object is created, transitions to a new state, or is being
  streamed in parts (deltas). For example, we emit `thread.run.created` when a new run
  is created, `thread.run.completed` when a run completes, and so on. When an Assistant chooses
  to create a message during a run, we emit a `thread.message.created event`, a
  `thread.message.in_progress` event, many `thread.message.delta` events, and finally a
  `thread.message.completed` event.

  We may add additional events over time, so we recommend handling unknown events gracefully
  in your code. See the [Assistants API quickstart](https://platform.openai.com/docs/assistants/overview) to learn how to
  integrate the Assistants API with streaming.

  - `class ThreadCreated: …`

    Occurs when a new [thread](https://platform.openai.com/docs/api-reference/threads/object) is created.

    - `data: Thread`

      Represents a thread that contains [messages](https://platform.openai.com/docs/api-reference/messages).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the thread was created.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread"]`

        The object type, which is always `thread`.

        - `"thread"`

      - `tool_resources: Optional[ToolResources]`

        A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

        - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

          - `file_ids: Optional[List[str]]`

            A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

        - `file_search: Optional[ToolResourcesFileSearch]`

          - `vector_store_ids: Optional[List[str]]`

            The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

    - `event: Literal["thread.created"]`

      - `"thread.created"`

    - `enabled: Optional[bool]`

      Whether to enable input audio transcription.

  - `class ThreadRunCreated: …`

    Occurs when a new [run](https://platform.openai.com/docs/api-reference/runs/object) is created.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.created"]`

      - `"thread.run.created"`

  - `class ThreadRunQueued: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `queued` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.queued"]`

      - `"thread.run.queued"`

  - `class ThreadRunInProgress: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to an `in_progress` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.in_progress"]`

      - `"thread.run.in_progress"`

  - `class ThreadRunRequiresAction: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `requires_action` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.requires_action"]`

      - `"thread.run.requires_action"`

  - `class ThreadRunCompleted: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) is completed.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.completed"]`

      - `"thread.run.completed"`

  - `class ThreadRunIncomplete: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) ends with status `incomplete`.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.incomplete"]`

      - `"thread.run.incomplete"`

  - `class ThreadRunFailed: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) fails.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.failed"]`

      - `"thread.run.failed"`

  - `class ThreadRunCancelling: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `cancelling` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.cancelling"]`

      - `"thread.run.cancelling"`

  - `class ThreadRunCancelled: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) is cancelled.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.cancelled"]`

      - `"thread.run.cancelled"`

  - `class ThreadRunExpired: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) expires.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.expired"]`

      - `"thread.run.expired"`

  - `class ThreadRunStepCreated: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is created.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.created"]`

      - `"thread.run.step.created"`

  - `class ThreadRunStepInProgress: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) moves to an `in_progress` state.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.in_progress"]`

      - `"thread.run.step.in_progress"`

  - `class ThreadRunStepDelta: …`

    Occurs when parts of a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) are being streamed.

    - `data: RunStepDeltaEvent`

      Represents a run step delta i.e. any changed fields on a run step during streaming.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `delta: RunStepDelta`

        The delta containing the fields that have changed on the run step.

        - `step_details: Optional[StepDetails]`

          The details of the run step.

          - `class RunStepDeltaMessageDelta: …`

            Details of the message creation by the run step.

            - `type: Literal["message_creation"]`

              Always `message_creation`.

              - `"message_creation"`

            - `message_creation: Optional[MessageCreation]`

              - `message_id: Optional[str]`

                The ID of the message that was created by this run step.

          - `class ToolCallDeltaObject: …`

            Details of the tool call.

            - `type: Literal["tool_calls"]`

              Always `tool_calls`.

              - `"tool_calls"`

            - `tool_calls: Optional[List[ToolCallDelta]]`

              An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

              - `class CodeInterpreterToolCallDelta: …`

                Details of the Code Interpreter tool call the run step was involved in.

                - `index: int`

                  The index of the tool call in the tool calls array.

                - `type: Literal["code_interpreter"]`

                  The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                  - `"code_interpreter"`

                - `id: Optional[str]`

                  The ID of the tool call.

                - `code_interpreter: Optional[CodeInterpreter]`

                  The Code Interpreter tool call definition.

                  - `input: Optional[str]`

                    The input to the Code Interpreter tool call.

                  - `outputs: Optional[List[CodeInterpreterOutput]]`

                    The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                    - `class CodeInterpreterLogs: …`

                      Text output from the Code Interpreter tool call as part of a run step.

                      - `index: int`

                        The index of the output in the outputs array.

                      - `type: Literal["logs"]`

                        Always `logs`.

                        - `"logs"`

                      - `logs: Optional[str]`

                        The text output from the Code Interpreter tool call.

                    - `class CodeInterpreterOutputImage: …`

                      - `index: int`

                        The index of the output in the outputs array.

                      - `type: Literal["image"]`

                        Always `image`.

                        - `"image"`

                      - `image: Optional[Image]`

                        - `file_id: Optional[str]`

                          The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

              - `class FileSearchToolCallDelta: …`

                - `file_search: object`

                  For now, this is always going to be an empty object.

                - `index: int`

                  The index of the tool call in the tool calls array.

                - `type: Literal["file_search"]`

                  The type of tool call. This is always going to be `file_search` for this type of tool call.

                  - `"file_search"`

                - `id: Optional[str]`

                  The ID of the tool call object.

              - `class FunctionToolCallDelta: …`

                - `index: int`

                  The index of the tool call in the tool calls array.

                - `type: Literal["function"]`

                  The type of tool call. This is always going to be `function` for this type of tool call.

                  - `"function"`

                - `id: Optional[str]`

                  The ID of the tool call object.

                - `function: Optional[Function]`

                  The definition of the function that was called.

                  - `arguments: Optional[str]`

                    The arguments passed to the function.

                  - `name: Optional[str]`

                    The name of the function.

                  - `output: Optional[str]`

                    The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

      - `object: Literal["thread.run.step.delta"]`

        The object type, which is always `thread.run.step.delta`.

        - `"thread.run.step.delta"`

    - `event: Literal["thread.run.step.delta"]`

      - `"thread.run.step.delta"`

  - `class ThreadRunStepCompleted: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is completed.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.completed"]`

      - `"thread.run.step.completed"`

  - `class ThreadRunStepFailed: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) fails.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.failed"]`

      - `"thread.run.step.failed"`

  - `class ThreadRunStepCancelled: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is cancelled.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.cancelled"]`

      - `"thread.run.step.cancelled"`

  - `class ThreadRunStepExpired: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) expires.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.expired"]`

      - `"thread.run.step.expired"`

  - `class ThreadMessageCreated: …`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) is created.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: Optional[str]`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Optional[List[Attachment]]`

        A list of files attached to the message, and the tools they were added to.

        - `file_id: Optional[str]`

          The ID of the file to attach to the message.

        - `tools: Optional[List[AttachmentTool]]`

          The tools to add this file to.

          - `class CodeInterpreterTool: …`

            - `type: Literal["code_interpreter"]`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

            - `type: Literal["file_search"]`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: List[MessageContent]`

        The content of the message in array of text and/or images.

        - `class ImageFileContentBlock: …`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: str`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_file"]`

            Always `image_file`.

            - `"image_file"`

        - `class ImageURLContentBlock: …`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: str`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_url"]`

            The type of the content part.

            - `"image_url"`

        - `class TextContentBlock: …`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: List[Annotation]`

              - `class FileCitationAnnotation: …`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: int`

                - `file_citation: FileCitation`

                  - `file_id: str`

                    The ID of the specific File the citation is from.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_citation"]`

                  Always `file_citation`.

                  - `"file_citation"`

              - `class FilePathAnnotation: …`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: int`

                - `file_path: FilePath`

                  - `file_id: str`

                    The ID of the file that was generated.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_path"]`

                  Always `file_path`.

                  - `"file_path"`

            - `value: str`

              The data that makes up the text.

          - `type: Literal["text"]`

            Always `text`.

            - `"text"`

        - `class RefusalContentBlock: …`

          The refusal content generated by the assistant.

          - `refusal: str`

          - `type: Literal["refusal"]`

            Always `refusal`.

            - `"refusal"`

      - `created_at: int`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: Optional[IncompleteDetails]`

        On an incomplete message, details about why the message is incomplete.

        - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.message"]`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: Literal["user", "assistant"]`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: Optional[str]`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: Literal["in_progress", "incomplete", "completed"]`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: str`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: Literal["thread.message.created"]`

      - `"thread.message.created"`

  - `class ThreadMessageInProgress: …`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) moves to an `in_progress` state.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: Optional[str]`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Optional[List[Attachment]]`

        A list of files attached to the message, and the tools they were added to.

        - `file_id: Optional[str]`

          The ID of the file to attach to the message.

        - `tools: Optional[List[AttachmentTool]]`

          The tools to add this file to.

          - `class CodeInterpreterTool: …`

            - `type: Literal["code_interpreter"]`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

            - `type: Literal["file_search"]`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: List[MessageContent]`

        The content of the message in array of text and/or images.

        - `class ImageFileContentBlock: …`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: str`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_file"]`

            Always `image_file`.

            - `"image_file"`

        - `class ImageURLContentBlock: …`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: str`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_url"]`

            The type of the content part.

            - `"image_url"`

        - `class TextContentBlock: …`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: List[Annotation]`

              - `class FileCitationAnnotation: …`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: int`

                - `file_citation: FileCitation`

                  - `file_id: str`

                    The ID of the specific File the citation is from.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_citation"]`

                  Always `file_citation`.

                  - `"file_citation"`

              - `class FilePathAnnotation: …`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: int`

                - `file_path: FilePath`

                  - `file_id: str`

                    The ID of the file that was generated.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_path"]`

                  Always `file_path`.

                  - `"file_path"`

            - `value: str`

              The data that makes up the text.

          - `type: Literal["text"]`

            Always `text`.

            - `"text"`

        - `class RefusalContentBlock: …`

          The refusal content generated by the assistant.

          - `refusal: str`

          - `type: Literal["refusal"]`

            Always `refusal`.

            - `"refusal"`

      - `created_at: int`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: Optional[IncompleteDetails]`

        On an incomplete message, details about why the message is incomplete.

        - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.message"]`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: Literal["user", "assistant"]`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: Optional[str]`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: Literal["in_progress", "incomplete", "completed"]`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: str`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: Literal["thread.message.in_progress"]`

      - `"thread.message.in_progress"`

  - `class ThreadMessageDelta: …`

    Occurs when parts of a [Message](https://platform.openai.com/docs/api-reference/messages/object) are being streamed.

    - `data: MessageDeltaEvent`

      Represents a message delta i.e. any changed fields on a message during streaming.

      - `id: str`

        The identifier of the message, which can be referenced in API endpoints.

      - `delta: MessageDelta`

        The delta containing the fields that have changed on the Message.

        - `content: Optional[List[MessageContentDelta]]`

          The content of the message in array of text and/or images.

          - `class ImageFileDeltaBlock: …`

            References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

            - `index: int`

              The index of the content part in the message.

            - `type: Literal["image_file"]`

              Always `image_file`.

              - `"image_file"`

            - `image_file: Optional[ImageFileDelta]`

              - `detail: Optional[Literal["auto", "low", "high"]]`

                Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

                - `"auto"`

                - `"low"`

                - `"high"`

              - `file_id: Optional[str]`

                The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

          - `class TextDeltaBlock: …`

            The text content that is part of a message.

            - `index: int`

              The index of the content part in the message.

            - `type: Literal["text"]`

              Always `text`.

              - `"text"`

            - `text: Optional[TextDelta]`

              - `annotations: Optional[List[AnnotationDelta]]`

                - `class FileCitationDeltaAnnotation: …`

                  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                  - `index: int`

                    The index of the annotation in the text content part.

                  - `type: Literal["file_citation"]`

                    Always `file_citation`.

                    - `"file_citation"`

                  - `end_index: Optional[int]`

                  - `file_citation: Optional[FileCitation]`

                    - `file_id: Optional[str]`

                      The ID of the specific File the citation is from.

                    - `quote: Optional[str]`

                      The specific quote in the file.

                  - `start_index: Optional[int]`

                  - `text: Optional[str]`

                    The text in the message content that needs to be replaced.

                - `class FilePathDeltaAnnotation: …`

                  A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                  - `index: int`

                    The index of the annotation in the text content part.

                  - `type: Literal["file_path"]`

                    Always `file_path`.

                    - `"file_path"`

                  - `end_index: Optional[int]`

                  - `file_path: Optional[FilePath]`

                    - `file_id: Optional[str]`

                      The ID of the file that was generated.

                  - `start_index: Optional[int]`

                  - `text: Optional[str]`

                    The text in the message content that needs to be replaced.

              - `value: Optional[str]`

                The data that makes up the text.

          - `class RefusalDeltaBlock: …`

            The refusal content that is part of a message.

            - `index: int`

              The index of the refusal part in the message.

            - `type: Literal["refusal"]`

              Always `refusal`.

              - `"refusal"`

            - `refusal: Optional[str]`

          - `class ImageURLDeltaBlock: …`

            References an image URL in the content of a message.

            - `index: int`

              The index of the content part in the message.

            - `type: Literal["image_url"]`

              Always `image_url`.

              - `"image_url"`

            - `image_url: Optional[ImageURLDelta]`

              - `detail: Optional[Literal["auto", "low", "high"]]`

                Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

                - `"auto"`

                - `"low"`

                - `"high"`

              - `url: Optional[str]`

                The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `role: Optional[Literal["user", "assistant"]]`

          The entity that produced the message. One of `user` or `assistant`.

          - `"user"`

          - `"assistant"`

      - `object: Literal["thread.message.delta"]`

        The object type, which is always `thread.message.delta`.

        - `"thread.message.delta"`

    - `event: Literal["thread.message.delta"]`

      - `"thread.message.delta"`

  - `class ThreadMessageCompleted: …`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) is completed.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: Optional[str]`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Optional[List[Attachment]]`

        A list of files attached to the message, and the tools they were added to.

        - `file_id: Optional[str]`

          The ID of the file to attach to the message.

        - `tools: Optional[List[AttachmentTool]]`

          The tools to add this file to.

          - `class CodeInterpreterTool: …`

            - `type: Literal["code_interpreter"]`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

            - `type: Literal["file_search"]`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: List[MessageContent]`

        The content of the message in array of text and/or images.

        - `class ImageFileContentBlock: …`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: str`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_file"]`

            Always `image_file`.

            - `"image_file"`

        - `class ImageURLContentBlock: …`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: str`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_url"]`

            The type of the content part.

            - `"image_url"`

        - `class TextContentBlock: …`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: List[Annotation]`

              - `class FileCitationAnnotation: …`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: int`

                - `file_citation: FileCitation`

                  - `file_id: str`

                    The ID of the specific File the citation is from.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_citation"]`

                  Always `file_citation`.

                  - `"file_citation"`

              - `class FilePathAnnotation: …`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: int`

                - `file_path: FilePath`

                  - `file_id: str`

                    The ID of the file that was generated.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_path"]`

                  Always `file_path`.

                  - `"file_path"`

            - `value: str`

              The data that makes up the text.

          - `type: Literal["text"]`

            Always `text`.

            - `"text"`

        - `class RefusalContentBlock: …`

          The refusal content generated by the assistant.

          - `refusal: str`

          - `type: Literal["refusal"]`

            Always `refusal`.

            - `"refusal"`

      - `created_at: int`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: Optional[IncompleteDetails]`

        On an incomplete message, details about why the message is incomplete.

        - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.message"]`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: Literal["user", "assistant"]`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: Optional[str]`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: Literal["in_progress", "incomplete", "completed"]`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: str`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: Literal["thread.message.completed"]`

      - `"thread.message.completed"`

  - `class ThreadMessageIncomplete: …`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) ends before it is completed.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: Optional[str]`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Optional[List[Attachment]]`

        A list of files attached to the message, and the tools they were added to.

        - `file_id: Optional[str]`

          The ID of the file to attach to the message.

        - `tools: Optional[List[AttachmentTool]]`

          The tools to add this file to.

          - `class CodeInterpreterTool: …`

            - `type: Literal["code_interpreter"]`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

            - `type: Literal["file_search"]`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: List[MessageContent]`

        The content of the message in array of text and/or images.

        - `class ImageFileContentBlock: …`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: str`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_file"]`

            Always `image_file`.

            - `"image_file"`

        - `class ImageURLContentBlock: …`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: str`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_url"]`

            The type of the content part.

            - `"image_url"`

        - `class TextContentBlock: …`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: List[Annotation]`

              - `class FileCitationAnnotation: …`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: int`

                - `file_citation: FileCitation`

                  - `file_id: str`

                    The ID of the specific File the citation is from.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_citation"]`

                  Always `file_citation`.

                  - `"file_citation"`

              - `class FilePathAnnotation: …`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: int`

                - `file_path: FilePath`

                  - `file_id: str`

                    The ID of the file that was generated.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_path"]`

                  Always `file_path`.

                  - `"file_path"`

            - `value: str`

              The data that makes up the text.

          - `type: Literal["text"]`

            Always `text`.

            - `"text"`

        - `class RefusalContentBlock: …`

          The refusal content generated by the assistant.

          - `refusal: str`

          - `type: Literal["refusal"]`

            Always `refusal`.

            - `"refusal"`

      - `created_at: int`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: Optional[IncompleteDetails]`

        On an incomplete message, details about why the message is incomplete.

        - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.message"]`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: Literal["user", "assistant"]`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: Optional[str]`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: Literal["in_progress", "incomplete", "completed"]`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: str`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: Literal["thread.message.incomplete"]`

      - `"thread.message.incomplete"`

  - `class ErrorEvent: …`

    Occurs when an [error](https://platform.openai.com/docs/guides/error-codes#api-errors) occurs. This can happen due to an internal server error or a timeout.

    - `data: ErrorObject`

      - `code: Optional[str]`

      - `message: str`

      - `param: Optional[str]`

      - `type: str`

    - `event: Literal["error"]`

      - `"error"`

### Assistant Tool

- `AssistantTool`

  - `class CodeInterpreterTool: …`

    - `type: Literal["code_interpreter"]`

      The type of tool being defined: `code_interpreter`

      - `"code_interpreter"`

  - `class FileSearchTool: …`

    - `type: Literal["file_search"]`

      The type of tool being defined: `file_search`

      - `"file_search"`

    - `file_search: Optional[FileSearch]`

      Overrides for the file search tool.

      - `max_num_results: Optional[int]`

        The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

        Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

      - `ranking_options: Optional[FileSearchRankingOptions]`

        The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

        See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `score_threshold: float`

          The score threshold for the file search. All values must be a floating point number between 0 and 1.

        - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

          The ranker to use for the file search. If not specified will use the `auto` ranker.

          - `"auto"`

          - `"default_2024_08_21"`

  - `class FunctionTool: …`

    - `function: FunctionDefinition`

      - `name: str`

        The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the function does, used by the model to choose when and how to call the function.

      - `parameters: Optional[FunctionParameters]`

        The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

        Omitting `parameters` defines a function with an empty parameter list.

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

    - `type: Literal["function"]`

      The type of tool being defined: `function`

      - `"function"`

### Code Interpreter Tool

- `class CodeInterpreterTool: …`

  - `type: Literal["code_interpreter"]`

    The type of tool being defined: `code_interpreter`

    - `"code_interpreter"`

### File Search Tool

- `class FileSearchTool: …`

  - `type: Literal["file_search"]`

    The type of tool being defined: `file_search`

    - `"file_search"`

  - `file_search: Optional[FileSearch]`

    Overrides for the file search tool.

    - `max_num_results: Optional[int]`

      The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

      Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

    - `ranking_options: Optional[FileSearchRankingOptions]`

      The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

      See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

      - `score_threshold: float`

        The score threshold for the file search. All values must be a floating point number between 0 and 1.

      - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

        The ranker to use for the file search. If not specified will use the `auto` ranker.

        - `"auto"`

        - `"default_2024_08_21"`

### Function Tool

- `class FunctionTool: …`

  - `function: FunctionDefinition`

    - `name: str`

      The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

    - `description: Optional[str]`

      A description of what the function does, used by the model to choose when and how to call the function.

    - `parameters: Optional[FunctionParameters]`

      The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

      Omitting `parameters` defines a function with an empty parameter list.

    - `strict: Optional[bool]`

      Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

  - `type: Literal["function"]`

    The type of tool being defined: `function`

    - `"function"`

### Message Stream Event

- `MessageStreamEvent`

  Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) is created.

  - `class ThreadMessageCreated: …`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) is created.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: Optional[str]`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Optional[List[Attachment]]`

        A list of files attached to the message, and the tools they were added to.

        - `file_id: Optional[str]`

          The ID of the file to attach to the message.

        - `tools: Optional[List[AttachmentTool]]`

          The tools to add this file to.

          - `class CodeInterpreterTool: …`

            - `type: Literal["code_interpreter"]`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

            - `type: Literal["file_search"]`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: List[MessageContent]`

        The content of the message in array of text and/or images.

        - `class ImageFileContentBlock: …`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: str`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_file"]`

            Always `image_file`.

            - `"image_file"`

        - `class ImageURLContentBlock: …`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: str`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_url"]`

            The type of the content part.

            - `"image_url"`

        - `class TextContentBlock: …`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: List[Annotation]`

              - `class FileCitationAnnotation: …`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: int`

                - `file_citation: FileCitation`

                  - `file_id: str`

                    The ID of the specific File the citation is from.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_citation"]`

                  Always `file_citation`.

                  - `"file_citation"`

              - `class FilePathAnnotation: …`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: int`

                - `file_path: FilePath`

                  - `file_id: str`

                    The ID of the file that was generated.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_path"]`

                  Always `file_path`.

                  - `"file_path"`

            - `value: str`

              The data that makes up the text.

          - `type: Literal["text"]`

            Always `text`.

            - `"text"`

        - `class RefusalContentBlock: …`

          The refusal content generated by the assistant.

          - `refusal: str`

          - `type: Literal["refusal"]`

            Always `refusal`.

            - `"refusal"`

      - `created_at: int`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: Optional[IncompleteDetails]`

        On an incomplete message, details about why the message is incomplete.

        - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.message"]`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: Literal["user", "assistant"]`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: Optional[str]`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: Literal["in_progress", "incomplete", "completed"]`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: str`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: Literal["thread.message.created"]`

      - `"thread.message.created"`

  - `class ThreadMessageInProgress: …`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) moves to an `in_progress` state.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: Optional[str]`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Optional[List[Attachment]]`

        A list of files attached to the message, and the tools they were added to.

        - `file_id: Optional[str]`

          The ID of the file to attach to the message.

        - `tools: Optional[List[AttachmentTool]]`

          The tools to add this file to.

          - `class CodeInterpreterTool: …`

            - `type: Literal["code_interpreter"]`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

            - `type: Literal["file_search"]`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: List[MessageContent]`

        The content of the message in array of text and/or images.

        - `class ImageFileContentBlock: …`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: str`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_file"]`

            Always `image_file`.

            - `"image_file"`

        - `class ImageURLContentBlock: …`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: str`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_url"]`

            The type of the content part.

            - `"image_url"`

        - `class TextContentBlock: …`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: List[Annotation]`

              - `class FileCitationAnnotation: …`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: int`

                - `file_citation: FileCitation`

                  - `file_id: str`

                    The ID of the specific File the citation is from.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_citation"]`

                  Always `file_citation`.

                  - `"file_citation"`

              - `class FilePathAnnotation: …`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: int`

                - `file_path: FilePath`

                  - `file_id: str`

                    The ID of the file that was generated.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_path"]`

                  Always `file_path`.

                  - `"file_path"`

            - `value: str`

              The data that makes up the text.

          - `type: Literal["text"]`

            Always `text`.

            - `"text"`

        - `class RefusalContentBlock: …`

          The refusal content generated by the assistant.

          - `refusal: str`

          - `type: Literal["refusal"]`

            Always `refusal`.

            - `"refusal"`

      - `created_at: int`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: Optional[IncompleteDetails]`

        On an incomplete message, details about why the message is incomplete.

        - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.message"]`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: Literal["user", "assistant"]`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: Optional[str]`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: Literal["in_progress", "incomplete", "completed"]`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: str`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: Literal["thread.message.in_progress"]`

      - `"thread.message.in_progress"`

  - `class ThreadMessageDelta: …`

    Occurs when parts of a [Message](https://platform.openai.com/docs/api-reference/messages/object) are being streamed.

    - `data: MessageDeltaEvent`

      Represents a message delta i.e. any changed fields on a message during streaming.

      - `id: str`

        The identifier of the message, which can be referenced in API endpoints.

      - `delta: MessageDelta`

        The delta containing the fields that have changed on the Message.

        - `content: Optional[List[MessageContentDelta]]`

          The content of the message in array of text and/or images.

          - `class ImageFileDeltaBlock: …`

            References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

            - `index: int`

              The index of the content part in the message.

            - `type: Literal["image_file"]`

              Always `image_file`.

              - `"image_file"`

            - `image_file: Optional[ImageFileDelta]`

              - `detail: Optional[Literal["auto", "low", "high"]]`

                Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

                - `"auto"`

                - `"low"`

                - `"high"`

              - `file_id: Optional[str]`

                The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

          - `class TextDeltaBlock: …`

            The text content that is part of a message.

            - `index: int`

              The index of the content part in the message.

            - `type: Literal["text"]`

              Always `text`.

              - `"text"`

            - `text: Optional[TextDelta]`

              - `annotations: Optional[List[AnnotationDelta]]`

                - `class FileCitationDeltaAnnotation: …`

                  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                  - `index: int`

                    The index of the annotation in the text content part.

                  - `type: Literal["file_citation"]`

                    Always `file_citation`.

                    - `"file_citation"`

                  - `end_index: Optional[int]`

                  - `file_citation: Optional[FileCitation]`

                    - `file_id: Optional[str]`

                      The ID of the specific File the citation is from.

                    - `quote: Optional[str]`

                      The specific quote in the file.

                  - `start_index: Optional[int]`

                  - `text: Optional[str]`

                    The text in the message content that needs to be replaced.

                - `class FilePathDeltaAnnotation: …`

                  A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                  - `index: int`

                    The index of the annotation in the text content part.

                  - `type: Literal["file_path"]`

                    Always `file_path`.

                    - `"file_path"`

                  - `end_index: Optional[int]`

                  - `file_path: Optional[FilePath]`

                    - `file_id: Optional[str]`

                      The ID of the file that was generated.

                  - `start_index: Optional[int]`

                  - `text: Optional[str]`

                    The text in the message content that needs to be replaced.

              - `value: Optional[str]`

                The data that makes up the text.

          - `class RefusalDeltaBlock: …`

            The refusal content that is part of a message.

            - `index: int`

              The index of the refusal part in the message.

            - `type: Literal["refusal"]`

              Always `refusal`.

              - `"refusal"`

            - `refusal: Optional[str]`

          - `class ImageURLDeltaBlock: …`

            References an image URL in the content of a message.

            - `index: int`

              The index of the content part in the message.

            - `type: Literal["image_url"]`

              Always `image_url`.

              - `"image_url"`

            - `image_url: Optional[ImageURLDelta]`

              - `detail: Optional[Literal["auto", "low", "high"]]`

                Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

                - `"auto"`

                - `"low"`

                - `"high"`

              - `url: Optional[str]`

                The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `role: Optional[Literal["user", "assistant"]]`

          The entity that produced the message. One of `user` or `assistant`.

          - `"user"`

          - `"assistant"`

      - `object: Literal["thread.message.delta"]`

        The object type, which is always `thread.message.delta`.

        - `"thread.message.delta"`

    - `event: Literal["thread.message.delta"]`

      - `"thread.message.delta"`

  - `class ThreadMessageCompleted: …`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) is completed.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: Optional[str]`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Optional[List[Attachment]]`

        A list of files attached to the message, and the tools they were added to.

        - `file_id: Optional[str]`

          The ID of the file to attach to the message.

        - `tools: Optional[List[AttachmentTool]]`

          The tools to add this file to.

          - `class CodeInterpreterTool: …`

            - `type: Literal["code_interpreter"]`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

            - `type: Literal["file_search"]`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: List[MessageContent]`

        The content of the message in array of text and/or images.

        - `class ImageFileContentBlock: …`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: str`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_file"]`

            Always `image_file`.

            - `"image_file"`

        - `class ImageURLContentBlock: …`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: str`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_url"]`

            The type of the content part.

            - `"image_url"`

        - `class TextContentBlock: …`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: List[Annotation]`

              - `class FileCitationAnnotation: …`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: int`

                - `file_citation: FileCitation`

                  - `file_id: str`

                    The ID of the specific File the citation is from.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_citation"]`

                  Always `file_citation`.

                  - `"file_citation"`

              - `class FilePathAnnotation: …`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: int`

                - `file_path: FilePath`

                  - `file_id: str`

                    The ID of the file that was generated.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_path"]`

                  Always `file_path`.

                  - `"file_path"`

            - `value: str`

              The data that makes up the text.

          - `type: Literal["text"]`

            Always `text`.

            - `"text"`

        - `class RefusalContentBlock: …`

          The refusal content generated by the assistant.

          - `refusal: str`

          - `type: Literal["refusal"]`

            Always `refusal`.

            - `"refusal"`

      - `created_at: int`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: Optional[IncompleteDetails]`

        On an incomplete message, details about why the message is incomplete.

        - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.message"]`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: Literal["user", "assistant"]`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: Optional[str]`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: Literal["in_progress", "incomplete", "completed"]`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: str`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: Literal["thread.message.completed"]`

      - `"thread.message.completed"`

  - `class ThreadMessageIncomplete: …`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) ends before it is completed.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: Optional[str]`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Optional[List[Attachment]]`

        A list of files attached to the message, and the tools they were added to.

        - `file_id: Optional[str]`

          The ID of the file to attach to the message.

        - `tools: Optional[List[AttachmentTool]]`

          The tools to add this file to.

          - `class CodeInterpreterTool: …`

            - `type: Literal["code_interpreter"]`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

            - `type: Literal["file_search"]`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: List[MessageContent]`

        The content of the message in array of text and/or images.

        - `class ImageFileContentBlock: …`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: str`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_file"]`

            Always `image_file`.

            - `"image_file"`

        - `class ImageURLContentBlock: …`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: str`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_url"]`

            The type of the content part.

            - `"image_url"`

        - `class TextContentBlock: …`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: List[Annotation]`

              - `class FileCitationAnnotation: …`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: int`

                - `file_citation: FileCitation`

                  - `file_id: str`

                    The ID of the specific File the citation is from.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_citation"]`

                  Always `file_citation`.

                  - `"file_citation"`

              - `class FilePathAnnotation: …`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: int`

                - `file_path: FilePath`

                  - `file_id: str`

                    The ID of the file that was generated.

                - `start_index: int`

                - `text: str`

                  The text in the message content that needs to be replaced.

                - `type: Literal["file_path"]`

                  Always `file_path`.

                  - `"file_path"`

            - `value: str`

              The data that makes up the text.

          - `type: Literal["text"]`

            Always `text`.

            - `"text"`

        - `class RefusalContentBlock: …`

          The refusal content generated by the assistant.

          - `refusal: str`

          - `type: Literal["refusal"]`

            Always `refusal`.

            - `"refusal"`

      - `created_at: int`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: Optional[int]`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: Optional[IncompleteDetails]`

        On an incomplete message, details about why the message is incomplete.

        - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.message"]`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: Literal["user", "assistant"]`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: Optional[str]`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: Literal["in_progress", "incomplete", "completed"]`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: str`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: Literal["thread.message.incomplete"]`

      - `"thread.message.incomplete"`

### Run Step Stream Event

- `RunStepStreamEvent`

  Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is created.

  - `class ThreadRunStepCreated: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is created.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.created"]`

      - `"thread.run.step.created"`

  - `class ThreadRunStepInProgress: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) moves to an `in_progress` state.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.in_progress"]`

      - `"thread.run.step.in_progress"`

  - `class ThreadRunStepDelta: …`

    Occurs when parts of a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) are being streamed.

    - `data: RunStepDeltaEvent`

      Represents a run step delta i.e. any changed fields on a run step during streaming.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `delta: RunStepDelta`

        The delta containing the fields that have changed on the run step.

        - `step_details: Optional[StepDetails]`

          The details of the run step.

          - `class RunStepDeltaMessageDelta: …`

            Details of the message creation by the run step.

            - `type: Literal["message_creation"]`

              Always `message_creation`.

              - `"message_creation"`

            - `message_creation: Optional[MessageCreation]`

              - `message_id: Optional[str]`

                The ID of the message that was created by this run step.

          - `class ToolCallDeltaObject: …`

            Details of the tool call.

            - `type: Literal["tool_calls"]`

              Always `tool_calls`.

              - `"tool_calls"`

            - `tool_calls: Optional[List[ToolCallDelta]]`

              An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

              - `class CodeInterpreterToolCallDelta: …`

                Details of the Code Interpreter tool call the run step was involved in.

                - `index: int`

                  The index of the tool call in the tool calls array.

                - `type: Literal["code_interpreter"]`

                  The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                  - `"code_interpreter"`

                - `id: Optional[str]`

                  The ID of the tool call.

                - `code_interpreter: Optional[CodeInterpreter]`

                  The Code Interpreter tool call definition.

                  - `input: Optional[str]`

                    The input to the Code Interpreter tool call.

                  - `outputs: Optional[List[CodeInterpreterOutput]]`

                    The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                    - `class CodeInterpreterLogs: …`

                      Text output from the Code Interpreter tool call as part of a run step.

                      - `index: int`

                        The index of the output in the outputs array.

                      - `type: Literal["logs"]`

                        Always `logs`.

                        - `"logs"`

                      - `logs: Optional[str]`

                        The text output from the Code Interpreter tool call.

                    - `class CodeInterpreterOutputImage: …`

                      - `index: int`

                        The index of the output in the outputs array.

                      - `type: Literal["image"]`

                        Always `image`.

                        - `"image"`

                      - `image: Optional[Image]`

                        - `file_id: Optional[str]`

                          The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

              - `class FileSearchToolCallDelta: …`

                - `file_search: object`

                  For now, this is always going to be an empty object.

                - `index: int`

                  The index of the tool call in the tool calls array.

                - `type: Literal["file_search"]`

                  The type of tool call. This is always going to be `file_search` for this type of tool call.

                  - `"file_search"`

                - `id: Optional[str]`

                  The ID of the tool call object.

              - `class FunctionToolCallDelta: …`

                - `index: int`

                  The index of the tool call in the tool calls array.

                - `type: Literal["function"]`

                  The type of tool call. This is always going to be `function` for this type of tool call.

                  - `"function"`

                - `id: Optional[str]`

                  The ID of the tool call object.

                - `function: Optional[Function]`

                  The definition of the function that was called.

                  - `arguments: Optional[str]`

                    The arguments passed to the function.

                  - `name: Optional[str]`

                    The name of the function.

                  - `output: Optional[str]`

                    The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

      - `object: Literal["thread.run.step.delta"]`

        The object type, which is always `thread.run.step.delta`.

        - `"thread.run.step.delta"`

    - `event: Literal["thread.run.step.delta"]`

      - `"thread.run.step.delta"`

  - `class ThreadRunStepCompleted: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is completed.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.completed"]`

      - `"thread.run.step.completed"`

  - `class ThreadRunStepFailed: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) fails.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.failed"]`

      - `"thread.run.step.failed"`

  - `class ThreadRunStepCancelled: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is cancelled.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.cancelled"]`

      - `"thread.run.step.cancelled"`

  - `class ThreadRunStepExpired: …`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) expires.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: str`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: Optional[LastError]`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded"]`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: str`

          A human-readable description of the error.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: Literal["thread.run.step"]`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: str`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: StepDetails`

        The details of the run step.

        - `class MessageCreationStepDetails: …`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: str`

              The ID of the message that was created by this run step.

          - `type: Literal["message_creation"]`

            Always `message_creation`.

            - `"message_creation"`

        - `class ToolCallsStepDetails: …`

          Details of the tool call.

          - `tool_calls: List[ToolCall]`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `class CodeInterpreterToolCall: …`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: str`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: str`

                  The input to the Code Interpreter tool call.

                - `outputs: List[CodeInterpreterOutput]`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `class CodeInterpreterOutputLogs: …`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: str`

                      The text output from the Code Interpreter tool call.

                    - `type: Literal["logs"]`

                      Always `logs`.

                      - `"logs"`

                  - `class CodeInterpreterOutputImage: …`

                    - `image: CodeInterpreterOutputImageImage`

                      - `file_id: str`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: Literal["image"]`

                      Always `image`.

                      - `"image"`

              - `type: Literal["code_interpreter"]`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `class FileSearchToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options: Optional[FileSearchRankingOptions]`

                  The ranking options for the file search.

                  - `ranker: Literal["auto", "default_2024_08_21"]`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: float`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results: Optional[List[FileSearchResult]]`

                  The results of the file search.

                  - `file_id: str`

                    The ID of the file that result was found in.

                  - `file_name: str`

                    The name of the file that result was found in.

                  - `score: float`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content: Optional[List[FileSearchResultContent]]`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text: Optional[str]`

                      The text content of the file.

                    - `type: Optional[Literal["text"]]`

                      The type of the content.

                      - `"text"`

              - `type: Literal["file_search"]`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `class FunctionToolCall: …`

              - `id: str`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: str`

                  The arguments passed to the function.

                - `name: str`

                  The name of the function.

                - `output: Optional[str]`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: Literal["function"]`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: Literal["tool_calls"]`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: Literal["message_creation", "tool_calls"]`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Optional[Usage]`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

    - `event: Literal["thread.run.step.expired"]`

      - `"thread.run.step.expired"`

### Run Stream Event

- `RunStreamEvent`

  Occurs when a new [run](https://platform.openai.com/docs/api-reference/runs/object) is created.

  - `class ThreadRunCreated: …`

    Occurs when a new [run](https://platform.openai.com/docs/api-reference/runs/object) is created.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.created"]`

      - `"thread.run.created"`

  - `class ThreadRunQueued: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `queued` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.queued"]`

      - `"thread.run.queued"`

  - `class ThreadRunInProgress: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to an `in_progress` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.in_progress"]`

      - `"thread.run.in_progress"`

  - `class ThreadRunRequiresAction: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `requires_action` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.requires_action"]`

      - `"thread.run.requires_action"`

  - `class ThreadRunCompleted: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) is completed.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.completed"]`

      - `"thread.run.completed"`

  - `class ThreadRunIncomplete: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) ends with status `incomplete`.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.incomplete"]`

      - `"thread.run.incomplete"`

  - `class ThreadRunFailed: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) fails.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.failed"]`

      - `"thread.run.failed"`

  - `class ThreadRunCancelling: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `cancelling` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.cancelling"]`

      - `"thread.run.cancelling"`

  - `class ThreadRunCancelled: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) is cancelled.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.cancelled"]`

      - `"thread.run.cancelled"`

  - `class ThreadRunExpired: …`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) expires.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: str`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: str`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: int`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: Optional[IncompleteDetails]`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: str`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: Optional[LastError]`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: str`

          A human-readable description of the error.

      - `max_completion_tokens: Optional[int]`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: Optional[int]`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: str`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: Literal["thread.run"]`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: bool`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: Optional[RequiredAction]`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: List[RequiredActionFunctionToolCall]`

            A list of the relevant tool calls.

            - `id: str`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

              The function definition.

              - `arguments: str`

                The arguments that the model expects you to pass to the function.

              - `name: str`

                The name of the function.

            - `type: Literal["function"]`

              The type of tool call the output is required for. For now, this is always `function`.

              - `"function"`

        - `type: Literal["submit_tool_outputs"]`

          For now, this is always `submit_tool_outputs`.

          - `"submit_tool_outputs"`

      - `response_format: Optional[AssistantResponseFormatOption]`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `Literal["auto"]`

          `auto` is the default value

          - `"auto"`

        - `class ResponseFormatText: …`

          Default response format. Used to generate text responses.

          - `type: Literal["text"]`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `class ResponseFormatJSONObject: …`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: Literal["json_object"]`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

        - `class ResponseFormatJSONSchema: …`

          JSON Schema response format. Used to generate structured JSON responses.
          Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

          - `json_schema: JSONSchema`

            Structured Outputs configuration options, including a JSON Schema.

            - `name: str`

              The name of the response format. Must be a-z, A-Z, 0-9, or contain
              underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the response format is for, used by the model to
              determine how to respond in the format.

            - `schema: Optional[Dict[str, object]]`

              The schema for the response format, described as a JSON Schema object.
              Learn how to build JSON schemas [here](https://json-schema.org/).

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the output.
              If set to true, the model will always follow the exact schema defined
              in the `schema` field. Only a subset of JSON Schema is supported when
              `strict` is `true`. To learn more, read the [Structured Outputs
              guide](https://platform.openai.com/docs/guides/structured-outputs).

          - `type: Literal["json_schema"]`

            The type of response format being defined. Always `json_schema`.

            - `"json_schema"`

      - `started_at: Optional[int]`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

        The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

        - `"queued"`

        - `"in_progress"`

        - `"requires_action"`

        - `"cancelling"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"incomplete"`

        - `"expired"`

      - `thread_id: str`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: Optional[AssistantToolChoiceOption]`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `Literal["none", "auto", "required"]`

          `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

          - `"none"`

          - `"auto"`

          - `"required"`

        - `class AssistantToolChoice: …`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: Literal["function", "code_interpreter", "file_search"]`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function: Optional[AssistantToolChoiceFunction]`

            - `name: str`

              The name of the function to call.

      - `tools: List[AssistantTool]`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class FileSearchTool: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search: Optional[FileSearch]`

            Overrides for the file search tool.

            - `max_num_results: Optional[int]`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `class FunctionTool: …`

          - `function: FunctionDefinition`

            - `name: str`

              The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

            - `description: Optional[str]`

              A description of what the function does, used by the model to choose when and how to call the function.

            - `parameters: Optional[FunctionParameters]`

              The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

              Omitting `parameters` defines a function with an empty parameter list.

            - `strict: Optional[bool]`

              Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

          - `type: Literal["function"]`

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: Optional[TruncationStrategy]`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: Literal["auto", "last_messages"]`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages: Optional[int]`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Optional[Usage]`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: int`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: int`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: int`

          Total number of tokens used (prompt + completion).

      - `temperature: Optional[float]`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p: Optional[float]`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: Literal["thread.run.expired"]`

      - `"thread.run.expired"`

### Thread Stream Event

- `class ThreadStreamEvent: …`

  Occurs when a new [thread](https://platform.openai.com/docs/api-reference/threads/object) is created.

  - `data: Thread`

    Represents a thread that contains [messages](https://platform.openai.com/docs/api-reference/messages).

    - `id: str`

      The identifier, which can be referenced in API endpoints.

    - `created_at: int`

      The Unix timestamp (in seconds) for when the thread was created.

    - `metadata: Optional[Metadata]`

      Set of 16 key-value pairs that can be attached to an object. This can be
      useful for storing additional information about the object in a structured
      format, and querying for objects via API or the dashboard.

      Keys are strings with a maximum length of 64 characters. Values are strings
      with a maximum length of 512 characters.

    - `object: Literal["thread"]`

      The object type, which is always `thread`.

      - `"thread"`

    - `tool_resources: Optional[ToolResources]`

      A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

      - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

        - `file_ids: Optional[List[str]]`

          A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

      - `file_search: Optional[ToolResourcesFileSearch]`

        - `vector_store_ids: Optional[List[str]]`

          The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

  - `event: Literal["thread.created"]`

    - `"thread.created"`

  - `enabled: Optional[bool]`

    Whether to enable input audio transcription.

# Threads

## Create

`beta.threads.create(ThreadCreateParams**kwargs)  -> Thread`

**post** `/threads`

Create a thread.

### Parameters

- `messages: Optional[Iterable[Message]]`

  A list of [messages](https://platform.openai.com/docs/api-reference/messages) to start the thread with.

  - `content: Union[str, Iterable[MessageContentPartParam]]`

    The text contents of the message.

    - `str`

      The text contents of the message.

    - `Iterable[MessageContentPartParam]`

      An array of content parts with a defined type, each can be of type `text` or images can be passed with `image_url` or `image_file`. Image types are only supported on [Vision-compatible models](https://platform.openai.com/docs/models).

      - `class ImageFileContentBlock: …`

        References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

        - `image_file: ImageFile`

          - `file_id: str`

            The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

          - `detail: Optional[Literal["auto", "low", "high"]]`

            Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

            - `"auto"`

            - `"low"`

            - `"high"`

        - `type: Literal["image_file"]`

          Always `image_file`.

          - `"image_file"`

      - `class ImageURLContentBlock: …`

        References an image URL in the content of a message.

        - `image_url: ImageURL`

          - `url: str`

            The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

          - `detail: Optional[Literal["auto", "low", "high"]]`

            Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

            - `"auto"`

            - `"low"`

            - `"high"`

        - `type: Literal["image_url"]`

          The type of the content part.

          - `"image_url"`

      - `class TextContentBlockParam: …`

        The text content that is part of a message.

        - `text: str`

          Text content to be sent to the model

        - `type: Literal["text"]`

          Always `text`.

          - `"text"`

  - `role: Literal["user", "assistant"]`

    The role of the entity that is creating the message. Allowed values include:

    - `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.
    - `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.

    - `"user"`

    - `"assistant"`

  - `attachments: Optional[Iterable[MessageAttachment]]`

    A list of files attached to the message, and the tools they should be added to.

    - `file_id: Optional[str]`

      The ID of the file to attach to the message.

    - `tools: Optional[Iterable[MessageAttachmentTool]]`

      The tools to add this file to.

      - `class CodeInterpreterTool: …`

        - `type: Literal["code_interpreter"]`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `class MessageAttachmentToolFileSearch: …`

        - `type: Literal["file_search"]`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `tool_resources: Optional[ToolResources]`

  A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

  - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

    - `file_ids: Optional[SequenceNotStr[str]]`

      A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

  - `file_search: Optional[ToolResourcesFileSearch]`

    - `vector_store_ids: Optional[SequenceNotStr[str]]`

      The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

    - `vector_stores: Optional[Iterable[ToolResourcesFileSearchVectorStore]]`

      A helper to create a [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) with file_ids and attach it to this thread. There can be a maximum of 1 vector store attached to the thread.

      - `chunking_strategy: Optional[ToolResourcesFileSearchVectorStoreChunkingStrategy]`

        The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy.

        - `class ToolResourcesFileSearchVectorStoreChunkingStrategyAuto: …`

          The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

          - `type: Literal["auto"]`

            Always `auto`.

            - `"auto"`

        - `class ToolResourcesFileSearchVectorStoreChunkingStrategyStatic: …`

          - `static: ToolResourcesFileSearchVectorStoreChunkingStrategyStaticStatic`

            - `chunk_overlap_tokens: int`

              The number of tokens that overlap between chunks. The default value is `400`.

              Note that the overlap must not exceed half of `max_chunk_size_tokens`.

            - `max_chunk_size_tokens: int`

              The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

          - `type: Literal["static"]`

            Always `static`.

            - `"static"`

      - `file_ids: Optional[SequenceNotStr[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs to add to the vector store. There can be a maximum of 10000 files in a vector store.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

### Returns

- `class Thread: …`

  Represents a thread that contains [messages](https://platform.openai.com/docs/api-reference/messages).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the thread was created.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread"]`

    The object type, which is always `thread`.

    - `"thread"`

  - `tool_resources: Optional[ToolResources]`

    A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

      - `file_ids: Optional[List[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ToolResourcesFileSearch]`

      - `vector_store_ids: Optional[List[str]]`

        The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
thread = client.beta.threads.create()
print(thread.id)
```

## Create And Run

`beta.threads.create_and_run(ThreadCreateAndRunParams**kwargs)  -> Run`

**post** `/threads/runs`

Create a thread and run it in one request.

### Parameters

- `assistant_id: str`

  The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) to use to execute this run.

- `instructions: Optional[str]`

  Override the default system message of the assistant. This is useful for modifying the behavior on a per-run basis.

- `max_completion_tokens: Optional[int]`

  The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.

- `max_prompt_tokens: Optional[int]`

  The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `model: Optional[Union[str, ChatModel, null]]`

  The ID of the [Model](https://platform.openai.com/docs/api-reference/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.

  - `str`

  - `Literal["gpt-5.2", "gpt-5.2-2025-12-11", "gpt-5.2-chat-latest", 69 more]`

    - `"gpt-5.2"`

    - `"gpt-5.2-2025-12-11"`

    - `"gpt-5.2-chat-latest"`

    - `"gpt-5.2-pro"`

    - `"gpt-5.2-pro-2025-12-11"`

    - `"gpt-5.1"`

    - `"gpt-5.1-2025-11-13"`

    - `"gpt-5.1-codex"`

    - `"gpt-5.1-mini"`

    - `"gpt-5.1-chat-latest"`

    - `"gpt-5"`

    - `"gpt-5-mini"`

    - `"gpt-5-nano"`

    - `"gpt-5-2025-08-07"`

    - `"gpt-5-mini-2025-08-07"`

    - `"gpt-5-nano-2025-08-07"`

    - `"gpt-5-chat-latest"`

    - `"gpt-4.1"`

    - `"gpt-4.1-mini"`

    - `"gpt-4.1-nano"`

    - `"gpt-4.1-2025-04-14"`

    - `"gpt-4.1-mini-2025-04-14"`

    - `"gpt-4.1-nano-2025-04-14"`

    - `"o4-mini"`

    - `"o4-mini-2025-04-16"`

    - `"o3"`

    - `"o3-2025-04-16"`

    - `"o3-mini"`

    - `"o3-mini-2025-01-31"`

    - `"o1"`

    - `"o1-2024-12-17"`

    - `"o1-preview"`

    - `"o1-preview-2024-09-12"`

    - `"o1-mini"`

    - `"o1-mini-2024-09-12"`

    - `"gpt-4o"`

    - `"gpt-4o-2024-11-20"`

    - `"gpt-4o-2024-08-06"`

    - `"gpt-4o-2024-05-13"`

    - `"gpt-4o-audio-preview"`

    - `"gpt-4o-audio-preview-2024-10-01"`

    - `"gpt-4o-audio-preview-2024-12-17"`

    - `"gpt-4o-audio-preview-2025-06-03"`

    - `"gpt-4o-mini-audio-preview"`

    - `"gpt-4o-mini-audio-preview-2024-12-17"`

    - `"gpt-4o-search-preview"`

    - `"gpt-4o-mini-search-preview"`

    - `"gpt-4o-search-preview-2025-03-11"`

    - `"gpt-4o-mini-search-preview-2025-03-11"`

    - `"chatgpt-4o-latest"`

    - `"codex-mini-latest"`

    - `"gpt-4o-mini"`

    - `"gpt-4o-mini-2024-07-18"`

    - `"gpt-4-turbo"`

    - `"gpt-4-turbo-2024-04-09"`

    - `"gpt-4-0125-preview"`

    - `"gpt-4-turbo-preview"`

    - `"gpt-4-1106-preview"`

    - `"gpt-4-vision-preview"`

    - `"gpt-4"`

    - `"gpt-4-0314"`

    - `"gpt-4-0613"`

    - `"gpt-4-32k"`

    - `"gpt-4-32k-0314"`

    - `"gpt-4-32k-0613"`

    - `"gpt-3.5-turbo"`

    - `"gpt-3.5-turbo-16k"`

    - `"gpt-3.5-turbo-0301"`

    - `"gpt-3.5-turbo-0613"`

    - `"gpt-3.5-turbo-1106"`

    - `"gpt-3.5-turbo-0125"`

    - `"gpt-3.5-turbo-16k-0613"`

- `parallel_tool_calls: Optional[bool]`

  Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

- `response_format: Optional[AssistantResponseFormatOptionParam]`

  Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

  Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

  Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

  **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

  - `Literal["auto"]`

    `auto` is the default value

    - `"auto"`

  - `class ResponseFormatText: …`

    Default response format. Used to generate text responses.

    - `type: Literal["text"]`

      The type of response format being defined. Always `text`.

      - `"text"`

  - `class ResponseFormatJSONObject: …`

    JSON object response format. An older method of generating JSON responses.
    Using `json_schema` is recommended for models that support it. Note that the
    model will not generate JSON without a system or user message instructing it
    to do so.

    - `type: Literal["json_object"]`

      The type of response format being defined. Always `json_object`.

      - `"json_object"`

  - `class ResponseFormatJSONSchema: …`

    JSON Schema response format. Used to generate structured JSON responses.
    Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

    - `json_schema: JSONSchema`

      Structured Outputs configuration options, including a JSON Schema.

      - `name: str`

        The name of the response format. Must be a-z, A-Z, 0-9, or contain
        underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the response format is for, used by the model to
        determine how to respond in the format.

      - `schema: Optional[Dict[str, object]]`

        The schema for the response format, described as a JSON Schema object.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the output.
        If set to true, the model will always follow the exact schema defined
        in the `schema` field. Only a subset of JSON Schema is supported when
        `strict` is `true`. To learn more, read the [Structured Outputs
        guide](https://platform.openai.com/docs/guides/structured-outputs).

    - `type: Literal["json_schema"]`

      The type of response format being defined. Always `json_schema`.

      - `"json_schema"`

- `stream: Optional[Literal[false]]`

  If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.

  - `false`

- `temperature: Optional[float]`

  What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

- `thread: Optional[Thread]`

  Options to create a new thread. If no thread is provided when running a
  request, an empty thread will be created.

  - `messages: Optional[Iterable[ThreadMessage]]`

    A list of [messages](https://platform.openai.com/docs/api-reference/messages) to start the thread with.

    - `content: Union[str, Iterable[MessageContentPartParam]]`

      The text contents of the message.

      - `str`

        The text contents of the message.

      - `Iterable[MessageContentPartParam]`

        An array of content parts with a defined type, each can be of type `text` or images can be passed with `image_url` or `image_file`. Image types are only supported on [Vision-compatible models](https://platform.openai.com/docs/models).

        - `class ImageFileContentBlock: …`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: str`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_file"]`

            Always `image_file`.

            - `"image_file"`

        - `class ImageURLContentBlock: …`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: str`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail: Optional[Literal["auto", "low", "high"]]`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: Literal["image_url"]`

            The type of the content part.

            - `"image_url"`

        - `class TextContentBlockParam: …`

          The text content that is part of a message.

          - `text: str`

            Text content to be sent to the model

          - `type: Literal["text"]`

            Always `text`.

            - `"text"`

    - `role: Literal["user", "assistant"]`

      The role of the entity that is creating the message. Allowed values include:

      - `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.
      - `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.

      - `"user"`

      - `"assistant"`

    - `attachments: Optional[Iterable[ThreadMessageAttachment]]`

      A list of files attached to the message, and the tools they should be added to.

      - `file_id: Optional[str]`

        The ID of the file to attach to the message.

      - `tools: Optional[Iterable[ThreadMessageAttachmentTool]]`

        The tools to add this file to.

        - `class CodeInterpreterTool: …`

          - `type: Literal["code_interpreter"]`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `class ThreadMessageAttachmentToolFileSearch: …`

          - `type: Literal["file_search"]`

            The type of tool being defined: `file_search`

            - `"file_search"`

    - `metadata: Optional[Metadata]`

      Set of 16 key-value pairs that can be attached to an object. This can be
      useful for storing additional information about the object in a structured
      format, and querying for objects via API or the dashboard.

      Keys are strings with a maximum length of 64 characters. Values are strings
      with a maximum length of 512 characters.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `tool_resources: Optional[ThreadToolResources]`

    A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ThreadToolResourcesCodeInterpreter]`

      - `file_ids: Optional[SequenceNotStr[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ThreadToolResourcesFileSearch]`

      - `vector_store_ids: Optional[SequenceNotStr[str]]`

        The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

      - `vector_stores: Optional[Iterable[ThreadToolResourcesFileSearchVectorStore]]`

        A helper to create a [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) with file_ids and attach it to this thread. There can be a maximum of 1 vector store attached to the thread.

        - `chunking_strategy: Optional[ThreadToolResourcesFileSearchVectorStoreChunkingStrategy]`

          The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy.

          - `class ThreadToolResourcesFileSearchVectorStoreChunkingStrategyAuto: …`

            The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

            - `type: Literal["auto"]`

              Always `auto`.

              - `"auto"`

          - `class ThreadToolResourcesFileSearchVectorStoreChunkingStrategyStatic: …`

            - `static: ThreadToolResourcesFileSearchVectorStoreChunkingStrategyStaticStatic`

              - `chunk_overlap_tokens: int`

                The number of tokens that overlap between chunks. The default value is `400`.

                Note that the overlap must not exceed half of `max_chunk_size_tokens`.

              - `max_chunk_size_tokens: int`

                The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

            - `type: Literal["static"]`

              Always `static`.

              - `"static"`

        - `file_ids: Optional[SequenceNotStr[str]]`

          A list of [file](https://platform.openai.com/docs/api-reference/files) IDs to add to the vector store. There can be a maximum of 10000 files in a vector store.

        - `metadata: Optional[Metadata]`

          Set of 16 key-value pairs that can be attached to an object. This can be
          useful for storing additional information about the object in a structured
          format, and querying for objects via API or the dashboard.

          Keys are strings with a maximum length of 64 characters. Values are strings
          with a maximum length of 512 characters.

- `tool_choice: Optional[AssistantToolChoiceOptionParam]`

  Controls which (if any) tool is called by the model.
  `none` means the model will not call any tools and instead generates a message.
  `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
  `required` means the model must call one or more tools before responding to the user.
  Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

  - `Literal["none", "auto", "required"]`

    `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

    - `"none"`

    - `"auto"`

    - `"required"`

  - `class AssistantToolChoice: …`

    Specifies a tool the model should use. Use to force the model to call a specific tool.

    - `type: Literal["function", "code_interpreter", "file_search"]`

      The type of the tool. If type is `function`, the function name must be set

      - `"function"`

      - `"code_interpreter"`

      - `"file_search"`

    - `function: Optional[AssistantToolChoiceFunction]`

      - `name: str`

        The name of the function to call.

- `tool_resources: Optional[ToolResources]`

  A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

  - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

    - `file_ids: Optional[SequenceNotStr[str]]`

      A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

  - `file_search: Optional[ToolResourcesFileSearch]`

    - `vector_store_ids: Optional[SequenceNotStr[str]]`

      The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

- `tools: Optional[Iterable[AssistantToolParam]]`

  Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.

  - `class CodeInterpreterTool: …`

    - `type: Literal["code_interpreter"]`

      The type of tool being defined: `code_interpreter`

      - `"code_interpreter"`

  - `class FileSearchTool: …`

    - `type: Literal["file_search"]`

      The type of tool being defined: `file_search`

      - `"file_search"`

    - `file_search: Optional[FileSearch]`

      Overrides for the file search tool.

      - `max_num_results: Optional[int]`

        The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

        Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

      - `ranking_options: Optional[FileSearchRankingOptions]`

        The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

        See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `score_threshold: float`

          The score threshold for the file search. All values must be a floating point number between 0 and 1.

        - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

          The ranker to use for the file search. If not specified will use the `auto` ranker.

          - `"auto"`

          - `"default_2024_08_21"`

  - `class FunctionTool: …`

    - `function: FunctionDefinition`

      - `name: str`

        The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the function does, used by the model to choose when and how to call the function.

      - `parameters: Optional[FunctionParameters]`

        The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

        Omitting `parameters` defines a function with an empty parameter list.

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

    - `type: Literal["function"]`

      The type of tool being defined: `function`

      - `"function"`

- `top_p: Optional[float]`

  An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

  We generally recommend altering this or temperature but not both.

- `truncation_strategy: Optional[TruncationStrategy]`

  Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

  - `type: Literal["auto", "last_messages"]`

    The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

    - `"auto"`

    - `"last_messages"`

  - `last_messages: Optional[int]`

    The number of most recent messages from the thread when constructing the context for the run.

### Returns

- `class Run: …`

  Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: Optional[IncompleteDetails]`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: str`

    The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `last_error: Optional[LastError]`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: str`

      A human-readable description of the error.

  - `max_completion_tokens: Optional[int]`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: Optional[int]`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `object: Literal["thread.run"]`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: bool`

    Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: Optional[RequiredAction]`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: List[RequiredActionFunctionToolCall]`

        A list of the relevant tool calls.

        - `id: str`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: Function`

          The function definition.

          - `arguments: str`

            The arguments that the model expects you to pass to the function.

          - `name: str`

            The name of the function.

        - `type: Literal["function"]`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: Literal["submit_tool_outputs"]`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: RunStatus`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: Optional[AssistantToolChoiceOption]`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `Literal["none", "auto", "required"]`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `class AssistantToolChoice: …`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: Literal["function", "code_interpreter", "file_search"]`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: Optional[AssistantToolChoiceFunction]`

        - `name: str`

          The name of the function to call.

  - `tools: List[AssistantTool]`

    The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: Optional[TruncationStrategy]`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: Literal["auto", "last_messages"]`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: Optional[int]`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: Optional[Usage]`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

  - `temperature: Optional[float]`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: Optional[float]`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
run = client.beta.threads.create_and_run(
    assistant_id="assistant_id",
)
print(run.id)
```

## Retrieve

`beta.threads.retrieve(strthread_id)  -> Thread`

**get** `/threads/{thread_id}`

Retrieves a thread.

### Parameters

- `thread_id: str`

### Returns

- `class Thread: …`

  Represents a thread that contains [messages](https://platform.openai.com/docs/api-reference/messages).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the thread was created.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread"]`

    The object type, which is always `thread`.

    - `"thread"`

  - `tool_resources: Optional[ToolResources]`

    A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

      - `file_ids: Optional[List[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ToolResourcesFileSearch]`

      - `vector_store_ids: Optional[List[str]]`

        The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
thread = client.beta.threads.retrieve(
    "thread_id",
)
print(thread.id)
```

## Update

`beta.threads.update(strthread_id, ThreadUpdateParams**kwargs)  -> Thread`

**post** `/threads/{thread_id}`

Modifies a thread.

### Parameters

- `thread_id: str`

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `tool_resources: Optional[ToolResources]`

  A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

  - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

    - `file_ids: Optional[SequenceNotStr[str]]`

      A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

  - `file_search: Optional[ToolResourcesFileSearch]`

    - `vector_store_ids: Optional[SequenceNotStr[str]]`

      The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

### Returns

- `class Thread: …`

  Represents a thread that contains [messages](https://platform.openai.com/docs/api-reference/messages).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the thread was created.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread"]`

    The object type, which is always `thread`.

    - `"thread"`

  - `tool_resources: Optional[ToolResources]`

    A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

      - `file_ids: Optional[List[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ToolResourcesFileSearch]`

      - `vector_store_ids: Optional[List[str]]`

        The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
thread = client.beta.threads.update(
    thread_id="thread_id",
)
print(thread.id)
```

## Delete

`beta.threads.delete(strthread_id)  -> ThreadDeleted`

**delete** `/threads/{thread_id}`

Delete a thread.

### Parameters

- `thread_id: str`

### Returns

- `class ThreadDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["thread.deleted"]`

    - `"thread.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
thread_deleted = client.beta.threads.delete(
    "thread_id",
)
print(thread_deleted.id)
```

## Domain Types

### Assistant Response Format Option

- `AssistantResponseFormatOption`

  Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

  Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

  Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

  **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

  - `Literal["auto"]`

    `auto` is the default value

    - `"auto"`

  - `class ResponseFormatText: …`

    Default response format. Used to generate text responses.

    - `type: Literal["text"]`

      The type of response format being defined. Always `text`.

      - `"text"`

  - `class ResponseFormatJSONObject: …`

    JSON object response format. An older method of generating JSON responses.
    Using `json_schema` is recommended for models that support it. Note that the
    model will not generate JSON without a system or user message instructing it
    to do so.

    - `type: Literal["json_object"]`

      The type of response format being defined. Always `json_object`.

      - `"json_object"`

  - `class ResponseFormatJSONSchema: …`

    JSON Schema response format. Used to generate structured JSON responses.
    Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

    - `json_schema: JSONSchema`

      Structured Outputs configuration options, including a JSON Schema.

      - `name: str`

        The name of the response format. Must be a-z, A-Z, 0-9, or contain
        underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the response format is for, used by the model to
        determine how to respond in the format.

      - `schema: Optional[Dict[str, object]]`

        The schema for the response format, described as a JSON Schema object.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the output.
        If set to true, the model will always follow the exact schema defined
        in the `schema` field. Only a subset of JSON Schema is supported when
        `strict` is `true`. To learn more, read the [Structured Outputs
        guide](https://platform.openai.com/docs/guides/structured-outputs).

    - `type: Literal["json_schema"]`

      The type of response format being defined. Always `json_schema`.

      - `"json_schema"`

### Assistant Tool Choice

- `class AssistantToolChoice: …`

  Specifies a tool the model should use. Use to force the model to call a specific tool.

  - `type: Literal["function", "code_interpreter", "file_search"]`

    The type of the tool. If type is `function`, the function name must be set

    - `"function"`

    - `"code_interpreter"`

    - `"file_search"`

  - `function: Optional[AssistantToolChoiceFunction]`

    - `name: str`

      The name of the function to call.

### Assistant Tool Choice Function

- `class AssistantToolChoiceFunction: …`

  - `name: str`

    The name of the function to call.

### Assistant Tool Choice Option

- `AssistantToolChoiceOption`

  Controls which (if any) tool is called by the model.
  `none` means the model will not call any tools and instead generates a message.
  `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
  `required` means the model must call one or more tools before responding to the user.
  Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

  - `Literal["none", "auto", "required"]`

    `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

    - `"none"`

    - `"auto"`

    - `"required"`

  - `class AssistantToolChoice: …`

    Specifies a tool the model should use. Use to force the model to call a specific tool.

    - `type: Literal["function", "code_interpreter", "file_search"]`

      The type of the tool. If type is `function`, the function name must be set

      - `"function"`

      - `"code_interpreter"`

      - `"file_search"`

    - `function: Optional[AssistantToolChoiceFunction]`

      - `name: str`

        The name of the function to call.

### Thread

- `class Thread: …`

  Represents a thread that contains [messages](https://platform.openai.com/docs/api-reference/messages).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the thread was created.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread"]`

    The object type, which is always `thread`.

    - `"thread"`

  - `tool_resources: Optional[ToolResources]`

    A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

      - `file_ids: Optional[List[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ToolResourcesFileSearch]`

      - `vector_store_ids: Optional[List[str]]`

        The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

### Thread Deleted

- `class ThreadDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["thread.deleted"]`

    - `"thread.deleted"`

# Runs

## List

`beta.threads.runs.list(strthread_id, RunListParams**kwargs)  -> SyncCursorPage[Run]`

**get** `/threads/{thread_id}/runs`

Returns a list of runs belonging to a thread.

### Parameters

- `thread_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class Run: …`

  Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: Optional[IncompleteDetails]`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: str`

    The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `last_error: Optional[LastError]`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: str`

      A human-readable description of the error.

  - `max_completion_tokens: Optional[int]`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: Optional[int]`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `object: Literal["thread.run"]`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: bool`

    Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: Optional[RequiredAction]`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: List[RequiredActionFunctionToolCall]`

        A list of the relevant tool calls.

        - `id: str`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: Function`

          The function definition.

          - `arguments: str`

            The arguments that the model expects you to pass to the function.

          - `name: str`

            The name of the function.

        - `type: Literal["function"]`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: Literal["submit_tool_outputs"]`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: RunStatus`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: Optional[AssistantToolChoiceOption]`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `Literal["none", "auto", "required"]`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `class AssistantToolChoice: …`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: Literal["function", "code_interpreter", "file_search"]`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: Optional[AssistantToolChoiceFunction]`

        - `name: str`

          The name of the function to call.

  - `tools: List[AssistantTool]`

    The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: Optional[TruncationStrategy]`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: Literal["auto", "last_messages"]`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: Optional[int]`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: Optional[Usage]`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

  - `temperature: Optional[float]`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: Optional[float]`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.beta.threads.runs.list(
    thread_id="thread_id",
)
page = page.data[0]
print(page.id)
```

## Create

`beta.threads.runs.create(strthread_id, RunCreateParams**kwargs)  -> Run`

**post** `/threads/{thread_id}/runs`

Create a run.

### Parameters

- `thread_id: str`

- `assistant_id: str`

  The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) to use to execute this run.

- `include: Optional[List[RunStepInclude]]`

  A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.

  See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

  - `"step_details.tool_calls[*].file_search.results[*].content"`

- `additional_instructions: Optional[str]`

  Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions.

- `additional_messages: Optional[Iterable[AdditionalMessage]]`

  Adds additional messages to the thread before creating the run.

  - `content: Union[str, Iterable[MessageContentPartParam]]`

    The text contents of the message.

    - `str`

      The text contents of the message.

    - `Iterable[MessageContentPartParam]`

      An array of content parts with a defined type, each can be of type `text` or images can be passed with `image_url` or `image_file`. Image types are only supported on [Vision-compatible models](https://platform.openai.com/docs/models).

      - `class ImageFileContentBlock: …`

        References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

        - `image_file: ImageFile`

          - `file_id: str`

            The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

          - `detail: Optional[Literal["auto", "low", "high"]]`

            Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

            - `"auto"`

            - `"low"`

            - `"high"`

        - `type: Literal["image_file"]`

          Always `image_file`.

          - `"image_file"`

      - `class ImageURLContentBlock: …`

        References an image URL in the content of a message.

        - `image_url: ImageURL`

          - `url: str`

            The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

          - `detail: Optional[Literal["auto", "low", "high"]]`

            Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

            - `"auto"`

            - `"low"`

            - `"high"`

        - `type: Literal["image_url"]`

          The type of the content part.

          - `"image_url"`

      - `class TextContentBlockParam: …`

        The text content that is part of a message.

        - `text: str`

          Text content to be sent to the model

        - `type: Literal["text"]`

          Always `text`.

          - `"text"`

  - `role: Literal["user", "assistant"]`

    The role of the entity that is creating the message. Allowed values include:

    - `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.
    - `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.

    - `"user"`

    - `"assistant"`

  - `attachments: Optional[Iterable[AdditionalMessageAttachment]]`

    A list of files attached to the message, and the tools they should be added to.

    - `file_id: Optional[str]`

      The ID of the file to attach to the message.

    - `tools: Optional[Iterable[AdditionalMessageAttachmentTool]]`

      The tools to add this file to.

      - `class CodeInterpreterTool: …`

        - `type: Literal["code_interpreter"]`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `class AdditionalMessageAttachmentToolFileSearch: …`

        - `type: Literal["file_search"]`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

- `instructions: Optional[str]`

  Overrides the [instructions](https://platform.openai.com/docs/api-reference/assistants/createAssistant) of the assistant. This is useful for modifying the behavior on a per-run basis.

- `max_completion_tokens: Optional[int]`

  The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.

- `max_prompt_tokens: Optional[int]`

  The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `model: Optional[Union[str, ChatModel, null]]`

  The ID of the [Model](https://platform.openai.com/docs/api-reference/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.

  - `str`

  - `Literal["gpt-5.2", "gpt-5.2-2025-12-11", "gpt-5.2-chat-latest", 69 more]`

    - `"gpt-5.2"`

    - `"gpt-5.2-2025-12-11"`

    - `"gpt-5.2-chat-latest"`

    - `"gpt-5.2-pro"`

    - `"gpt-5.2-pro-2025-12-11"`

    - `"gpt-5.1"`

    - `"gpt-5.1-2025-11-13"`

    - `"gpt-5.1-codex"`

    - `"gpt-5.1-mini"`

    - `"gpt-5.1-chat-latest"`

    - `"gpt-5"`

    - `"gpt-5-mini"`

    - `"gpt-5-nano"`

    - `"gpt-5-2025-08-07"`

    - `"gpt-5-mini-2025-08-07"`

    - `"gpt-5-nano-2025-08-07"`

    - `"gpt-5-chat-latest"`

    - `"gpt-4.1"`

    - `"gpt-4.1-mini"`

    - `"gpt-4.1-nano"`

    - `"gpt-4.1-2025-04-14"`

    - `"gpt-4.1-mini-2025-04-14"`

    - `"gpt-4.1-nano-2025-04-14"`

    - `"o4-mini"`

    - `"o4-mini-2025-04-16"`

    - `"o3"`

    - `"o3-2025-04-16"`

    - `"o3-mini"`

    - `"o3-mini-2025-01-31"`

    - `"o1"`

    - `"o1-2024-12-17"`

    - `"o1-preview"`

    - `"o1-preview-2024-09-12"`

    - `"o1-mini"`

    - `"o1-mini-2024-09-12"`

    - `"gpt-4o"`

    - `"gpt-4o-2024-11-20"`

    - `"gpt-4o-2024-08-06"`

    - `"gpt-4o-2024-05-13"`

    - `"gpt-4o-audio-preview"`

    - `"gpt-4o-audio-preview-2024-10-01"`

    - `"gpt-4o-audio-preview-2024-12-17"`

    - `"gpt-4o-audio-preview-2025-06-03"`

    - `"gpt-4o-mini-audio-preview"`

    - `"gpt-4o-mini-audio-preview-2024-12-17"`

    - `"gpt-4o-search-preview"`

    - `"gpt-4o-mini-search-preview"`

    - `"gpt-4o-search-preview-2025-03-11"`

    - `"gpt-4o-mini-search-preview-2025-03-11"`

    - `"chatgpt-4o-latest"`

    - `"codex-mini-latest"`

    - `"gpt-4o-mini"`

    - `"gpt-4o-mini-2024-07-18"`

    - `"gpt-4-turbo"`

    - `"gpt-4-turbo-2024-04-09"`

    - `"gpt-4-0125-preview"`

    - `"gpt-4-turbo-preview"`

    - `"gpt-4-1106-preview"`

    - `"gpt-4-vision-preview"`

    - `"gpt-4"`

    - `"gpt-4-0314"`

    - `"gpt-4-0613"`

    - `"gpt-4-32k"`

    - `"gpt-4-32k-0314"`

    - `"gpt-4-32k-0613"`

    - `"gpt-3.5-turbo"`

    - `"gpt-3.5-turbo-16k"`

    - `"gpt-3.5-turbo-0301"`

    - `"gpt-3.5-turbo-0613"`

    - `"gpt-3.5-turbo-1106"`

    - `"gpt-3.5-turbo-0125"`

    - `"gpt-3.5-turbo-16k-0613"`

- `parallel_tool_calls: Optional[bool]`

  Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

- `reasoning_effort: Optional[ReasoningEffort]`

  Constrains effort on reasoning for
  [reasoning models](https://platform.openai.com/docs/guides/reasoning).
  Currently supported values are `none`, `minimal`, `low`, `medium`, `high`, and `xhigh`. Reducing
  reasoning effort can result in faster responses and fewer tokens used
  on reasoning in a response.

  - `gpt-5.1` defaults to `none`, which does not perform reasoning. The supported reasoning values for `gpt-5.1` are `none`, `low`, `medium`, and `high`. Tool calls are supported for all reasoning values in gpt-5.1.
  - All models before `gpt-5.1` default to `medium` reasoning effort, and do not support `none`.
  - The `gpt-5-pro` model defaults to (and only supports) `high` reasoning effort.
  - `xhigh` is supported for all models after `gpt-5.1-codex-max`.

  - `"none"`

  - `"minimal"`

  - `"low"`

  - `"medium"`

  - `"high"`

  - `"xhigh"`

- `response_format: Optional[AssistantResponseFormatOptionParam]`

  Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

  Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

  Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

  **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

  - `Literal["auto"]`

    `auto` is the default value

    - `"auto"`

  - `class ResponseFormatText: …`

    Default response format. Used to generate text responses.

    - `type: Literal["text"]`

      The type of response format being defined. Always `text`.

      - `"text"`

  - `class ResponseFormatJSONObject: …`

    JSON object response format. An older method of generating JSON responses.
    Using `json_schema` is recommended for models that support it. Note that the
    model will not generate JSON without a system or user message instructing it
    to do so.

    - `type: Literal["json_object"]`

      The type of response format being defined. Always `json_object`.

      - `"json_object"`

  - `class ResponseFormatJSONSchema: …`

    JSON Schema response format. Used to generate structured JSON responses.
    Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

    - `json_schema: JSONSchema`

      Structured Outputs configuration options, including a JSON Schema.

      - `name: str`

        The name of the response format. Must be a-z, A-Z, 0-9, or contain
        underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the response format is for, used by the model to
        determine how to respond in the format.

      - `schema: Optional[Dict[str, object]]`

        The schema for the response format, described as a JSON Schema object.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the output.
        If set to true, the model will always follow the exact schema defined
        in the `schema` field. Only a subset of JSON Schema is supported when
        `strict` is `true`. To learn more, read the [Structured Outputs
        guide](https://platform.openai.com/docs/guides/structured-outputs).

    - `type: Literal["json_schema"]`

      The type of response format being defined. Always `json_schema`.

      - `"json_schema"`

- `stream: Optional[Literal[false]]`

  If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.

  - `false`

- `temperature: Optional[float]`

  What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

- `tool_choice: Optional[AssistantToolChoiceOptionParam]`

  Controls which (if any) tool is called by the model.
  `none` means the model will not call any tools and instead generates a message.
  `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
  `required` means the model must call one or more tools before responding to the user.
  Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

  - `Literal["none", "auto", "required"]`

    `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

    - `"none"`

    - `"auto"`

    - `"required"`

  - `class AssistantToolChoice: …`

    Specifies a tool the model should use. Use to force the model to call a specific tool.

    - `type: Literal["function", "code_interpreter", "file_search"]`

      The type of the tool. If type is `function`, the function name must be set

      - `"function"`

      - `"code_interpreter"`

      - `"file_search"`

    - `function: Optional[AssistantToolChoiceFunction]`

      - `name: str`

        The name of the function to call.

- `tools: Optional[Iterable[AssistantToolParam]]`

  Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.

  - `class CodeInterpreterTool: …`

    - `type: Literal["code_interpreter"]`

      The type of tool being defined: `code_interpreter`

      - `"code_interpreter"`

  - `class FileSearchTool: …`

    - `type: Literal["file_search"]`

      The type of tool being defined: `file_search`

      - `"file_search"`

    - `file_search: Optional[FileSearch]`

      Overrides for the file search tool.

      - `max_num_results: Optional[int]`

        The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

        Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

      - `ranking_options: Optional[FileSearchRankingOptions]`

        The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

        See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `score_threshold: float`

          The score threshold for the file search. All values must be a floating point number between 0 and 1.

        - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

          The ranker to use for the file search. If not specified will use the `auto` ranker.

          - `"auto"`

          - `"default_2024_08_21"`

  - `class FunctionTool: …`

    - `function: FunctionDefinition`

      - `name: str`

        The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the function does, used by the model to choose when and how to call the function.

      - `parameters: Optional[FunctionParameters]`

        The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

        Omitting `parameters` defines a function with an empty parameter list.

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

    - `type: Literal["function"]`

      The type of tool being defined: `function`

      - `"function"`

- `top_p: Optional[float]`

  An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

  We generally recommend altering this or temperature but not both.

- `truncation_strategy: Optional[TruncationStrategy]`

  Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

  - `type: Literal["auto", "last_messages"]`

    The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

    - `"auto"`

    - `"last_messages"`

  - `last_messages: Optional[int]`

    The number of most recent messages from the thread when constructing the context for the run.

### Returns

- `class Run: …`

  Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: Optional[IncompleteDetails]`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: str`

    The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `last_error: Optional[LastError]`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: str`

      A human-readable description of the error.

  - `max_completion_tokens: Optional[int]`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: Optional[int]`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `object: Literal["thread.run"]`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: bool`

    Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: Optional[RequiredAction]`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: List[RequiredActionFunctionToolCall]`

        A list of the relevant tool calls.

        - `id: str`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: Function`

          The function definition.

          - `arguments: str`

            The arguments that the model expects you to pass to the function.

          - `name: str`

            The name of the function.

        - `type: Literal["function"]`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: Literal["submit_tool_outputs"]`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: RunStatus`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: Optional[AssistantToolChoiceOption]`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `Literal["none", "auto", "required"]`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `class AssistantToolChoice: …`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: Literal["function", "code_interpreter", "file_search"]`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: Optional[AssistantToolChoiceFunction]`

        - `name: str`

          The name of the function to call.

  - `tools: List[AssistantTool]`

    The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: Optional[TruncationStrategy]`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: Literal["auto", "last_messages"]`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: Optional[int]`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: Optional[Usage]`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

  - `temperature: Optional[float]`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: Optional[float]`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
run = client.beta.threads.runs.create(
    thread_id="thread_id",
    assistant_id="assistant_id",
)
print(run.id)
```

## Retrieve

`beta.threads.runs.retrieve(strrun_id, RunRetrieveParams**kwargs)  -> Run`

**get** `/threads/{thread_id}/runs/{run_id}`

Retrieves a run.

### Parameters

- `thread_id: str`

- `run_id: str`

### Returns

- `class Run: …`

  Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: Optional[IncompleteDetails]`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: str`

    The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `last_error: Optional[LastError]`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: str`

      A human-readable description of the error.

  - `max_completion_tokens: Optional[int]`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: Optional[int]`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `object: Literal["thread.run"]`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: bool`

    Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: Optional[RequiredAction]`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: List[RequiredActionFunctionToolCall]`

        A list of the relevant tool calls.

        - `id: str`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: Function`

          The function definition.

          - `arguments: str`

            The arguments that the model expects you to pass to the function.

          - `name: str`

            The name of the function.

        - `type: Literal["function"]`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: Literal["submit_tool_outputs"]`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: RunStatus`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: Optional[AssistantToolChoiceOption]`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `Literal["none", "auto", "required"]`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `class AssistantToolChoice: …`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: Literal["function", "code_interpreter", "file_search"]`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: Optional[AssistantToolChoiceFunction]`

        - `name: str`

          The name of the function to call.

  - `tools: List[AssistantTool]`

    The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: Optional[TruncationStrategy]`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: Literal["auto", "last_messages"]`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: Optional[int]`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: Optional[Usage]`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

  - `temperature: Optional[float]`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: Optional[float]`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
run = client.beta.threads.runs.retrieve(
    run_id="run_id",
    thread_id="thread_id",
)
print(run.id)
```

## Update

`beta.threads.runs.update(strrun_id, RunUpdateParams**kwargs)  -> Run`

**post** `/threads/{thread_id}/runs/{run_id}`

Modifies a run.

### Parameters

- `thread_id: str`

- `run_id: str`

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

### Returns

- `class Run: …`

  Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: Optional[IncompleteDetails]`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: str`

    The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `last_error: Optional[LastError]`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: str`

      A human-readable description of the error.

  - `max_completion_tokens: Optional[int]`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: Optional[int]`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `object: Literal["thread.run"]`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: bool`

    Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: Optional[RequiredAction]`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: List[RequiredActionFunctionToolCall]`

        A list of the relevant tool calls.

        - `id: str`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: Function`

          The function definition.

          - `arguments: str`

            The arguments that the model expects you to pass to the function.

          - `name: str`

            The name of the function.

        - `type: Literal["function"]`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: Literal["submit_tool_outputs"]`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: RunStatus`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: Optional[AssistantToolChoiceOption]`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `Literal["none", "auto", "required"]`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `class AssistantToolChoice: …`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: Literal["function", "code_interpreter", "file_search"]`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: Optional[AssistantToolChoiceFunction]`

        - `name: str`

          The name of the function to call.

  - `tools: List[AssistantTool]`

    The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: Optional[TruncationStrategy]`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: Literal["auto", "last_messages"]`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: Optional[int]`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: Optional[Usage]`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

  - `temperature: Optional[float]`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: Optional[float]`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
run = client.beta.threads.runs.update(
    run_id="run_id",
    thread_id="thread_id",
)
print(run.id)
```

## Submit Tool Outputs

`beta.threads.runs.submit_tool_outputs(strrun_id, RunSubmitToolOutputsParams**kwargs)  -> Run`

**post** `/threads/{thread_id}/runs/{run_id}/submit_tool_outputs`

When a run has the `status: "requires_action"` and `required_action.type` is `submit_tool_outputs`, this endpoint can be used to submit the outputs from the tool calls once they're all completed. All outputs must be submitted in a single request.

### Parameters

- `thread_id: str`

- `run_id: str`

- `tool_outputs: Iterable[ToolOutput]`

  A list of tools for which the outputs are being submitted.

  - `output: Optional[str]`

    The output of the tool call to be submitted to continue the run.

  - `tool_call_id: Optional[str]`

    The ID of the tool call in the `required_action` object within the run object the output is being submitted for.

- `stream: Optional[Literal[false]]`

  If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.

  - `false`

### Returns

- `class Run: …`

  Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: Optional[IncompleteDetails]`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: str`

    The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `last_error: Optional[LastError]`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: str`

      A human-readable description of the error.

  - `max_completion_tokens: Optional[int]`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: Optional[int]`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `object: Literal["thread.run"]`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: bool`

    Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: Optional[RequiredAction]`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: List[RequiredActionFunctionToolCall]`

        A list of the relevant tool calls.

        - `id: str`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: Function`

          The function definition.

          - `arguments: str`

            The arguments that the model expects you to pass to the function.

          - `name: str`

            The name of the function.

        - `type: Literal["function"]`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: Literal["submit_tool_outputs"]`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: RunStatus`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: Optional[AssistantToolChoiceOption]`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `Literal["none", "auto", "required"]`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `class AssistantToolChoice: …`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: Literal["function", "code_interpreter", "file_search"]`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: Optional[AssistantToolChoiceFunction]`

        - `name: str`

          The name of the function to call.

  - `tools: List[AssistantTool]`

    The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: Optional[TruncationStrategy]`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: Literal["auto", "last_messages"]`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: Optional[int]`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: Optional[Usage]`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

  - `temperature: Optional[float]`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: Optional[float]`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
run = client.beta.threads.runs.submit_tool_outputs(
    run_id="run_id",
    thread_id="thread_id",
    tool_outputs=[{}],
)
print(run.id)
```

## Cancel

`beta.threads.runs.cancel(strrun_id, RunCancelParams**kwargs)  -> Run`

**post** `/threads/{thread_id}/runs/{run_id}/cancel`

Cancels a run that is `in_progress`.

### Parameters

- `thread_id: str`

- `run_id: str`

### Returns

- `class Run: …`

  Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: Optional[IncompleteDetails]`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: str`

    The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `last_error: Optional[LastError]`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: str`

      A human-readable description of the error.

  - `max_completion_tokens: Optional[int]`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: Optional[int]`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `object: Literal["thread.run"]`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: bool`

    Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: Optional[RequiredAction]`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: List[RequiredActionFunctionToolCall]`

        A list of the relevant tool calls.

        - `id: str`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: Function`

          The function definition.

          - `arguments: str`

            The arguments that the model expects you to pass to the function.

          - `name: str`

            The name of the function.

        - `type: Literal["function"]`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: Literal["submit_tool_outputs"]`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: RunStatus`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: Optional[AssistantToolChoiceOption]`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `Literal["none", "auto", "required"]`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `class AssistantToolChoice: …`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: Literal["function", "code_interpreter", "file_search"]`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: Optional[AssistantToolChoiceFunction]`

        - `name: str`

          The name of the function to call.

  - `tools: List[AssistantTool]`

    The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: Optional[TruncationStrategy]`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: Literal["auto", "last_messages"]`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: Optional[int]`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: Optional[Usage]`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

  - `temperature: Optional[float]`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: Optional[float]`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
run = client.beta.threads.runs.cancel(
    run_id="run_id",
    thread_id="thread_id",
)
print(run.id)
```

## Domain Types

### Required Action Function Tool Call

- `class RequiredActionFunctionToolCall: …`

  Tool call objects

  - `id: str`

    The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

  - `function: Function`

    The function definition.

    - `arguments: str`

      The arguments that the model expects you to pass to the function.

    - `name: str`

      The name of the function.

  - `type: Literal["function"]`

    The type of tool call the output is required for. For now, this is always `function`.

    - `"function"`

### Run

- `class Run: …`

  Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: Optional[IncompleteDetails]`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: str`

    The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `last_error: Optional[LastError]`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: str`

      A human-readable description of the error.

  - `max_completion_tokens: Optional[int]`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: Optional[int]`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `object: Literal["thread.run"]`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: bool`

    Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: Optional[RequiredAction]`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: List[RequiredActionFunctionToolCall]`

        A list of the relevant tool calls.

        - `id: str`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: Function`

          The function definition.

          - `arguments: str`

            The arguments that the model expects you to pass to the function.

          - `name: str`

            The name of the function.

        - `type: Literal["function"]`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: Literal["submit_tool_outputs"]`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: RunStatus`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: Optional[AssistantToolChoiceOption]`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `Literal["none", "auto", "required"]`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `class AssistantToolChoice: …`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: Literal["function", "code_interpreter", "file_search"]`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: Optional[AssistantToolChoiceFunction]`

        - `name: str`

          The name of the function to call.

  - `tools: List[AssistantTool]`

    The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: Optional[TruncationStrategy]`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: Literal["auto", "last_messages"]`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: Optional[int]`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: Optional[Usage]`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

  - `temperature: Optional[float]`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: Optional[float]`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Run Status

- `Literal["queued", "in_progress", "requires_action", 6 more]`

  The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

  - `"queued"`

  - `"in_progress"`

  - `"requires_action"`

  - `"cancelling"`

  - `"cancelled"`

  - `"failed"`

  - `"completed"`

  - `"incomplete"`

  - `"expired"`

# Steps

## List

`beta.threads.runs.steps.list(strrun_id, StepListParams**kwargs)  -> SyncCursorPage[RunStep]`

**get** `/threads/{thread_id}/runs/{run_id}/steps`

Returns a list of run steps belonging to a run.

### Parameters

- `thread_id: str`

- `run_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `include: Optional[List[RunStepInclude]]`

  A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.

  See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

  - `"step_details.tool_calls[*].file_search.results[*].content"`

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class RunStep: …`

  Represents a step in execution of a run.

  - `id: str`

    The identifier of the run step, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run step was created.

  - `expired_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step failed.

  - `last_error: Optional[LastError]`

    The last error associated with this run step. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded"]`

      One of `server_error` or `rate_limit_exceeded`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

    - `message: str`

      A human-readable description of the error.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread.run.step"]`

    The object type, which is always `thread.run.step`.

    - `"thread.run.step"`

  - `run_id: str`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

  - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

    The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

    - `"in_progress"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"expired"`

  - `step_details: StepDetails`

    The details of the run step.

    - `class MessageCreationStepDetails: …`

      Details of the message creation by the run step.

      - `message_creation: MessageCreation`

        - `message_id: str`

          The ID of the message that was created by this run step.

      - `type: Literal["message_creation"]`

        Always `message_creation`.

        - `"message_creation"`

    - `class ToolCallsStepDetails: …`

      Details of the tool call.

      - `tool_calls: List[ToolCall]`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

        - `class CodeInterpreterToolCall: …`

          Details of the Code Interpreter tool call the run step was involved in.

          - `id: str`

            The ID of the tool call.

          - `code_interpreter: CodeInterpreter`

            The Code Interpreter tool call definition.

            - `input: str`

              The input to the Code Interpreter tool call.

            - `outputs: List[CodeInterpreterOutput]`

              The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

              - `class CodeInterpreterOutputLogs: …`

                Text output from the Code Interpreter tool call as part of a run step.

                - `logs: str`

                  The text output from the Code Interpreter tool call.

                - `type: Literal["logs"]`

                  Always `logs`.

                  - `"logs"`

              - `class CodeInterpreterOutputImage: …`

                - `image: CodeInterpreterOutputImageImage`

                  - `file_id: str`

                    The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                - `type: Literal["image"]`

                  Always `image`.

                  - `"image"`

          - `type: Literal["code_interpreter"]`

            The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

            - `"code_interpreter"`

        - `class FileSearchToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `file_search: FileSearch`

            For now, this is always going to be an empty object.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search.

              - `ranker: Literal["auto", "default_2024_08_21"]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

            - `results: Optional[List[FileSearchResult]]`

              The results of the file search.

              - `file_id: str`

                The ID of the file that result was found in.

              - `file_name: str`

                The name of the file that result was found in.

              - `score: float`

                The score of the result. All values must be a floating point number between 0 and 1.

              - `content: Optional[List[FileSearchResultContent]]`

                The content of the result that was found. The content is only included if requested via the include query parameter.

                - `text: Optional[str]`

                  The text content of the file.

                - `type: Optional[Literal["text"]]`

                  The type of the content.

                  - `"text"`

          - `type: Literal["file_search"]`

            The type of tool call. This is always going to be `file_search` for this type of tool call.

            - `"file_search"`

        - `class FunctionToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `function: Function`

            The definition of the function that was called.

            - `arguments: str`

              The arguments passed to the function.

            - `name: str`

              The name of the function.

            - `output: Optional[str]`

              The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

          - `type: Literal["function"]`

            The type of tool call. This is always going to be `function` for this type of tool call.

            - `"function"`

      - `type: Literal["tool_calls"]`

        Always `tool_calls`.

        - `"tool_calls"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

  - `type: Literal["message_creation", "tool_calls"]`

    The type of run step, which can be either `message_creation` or `tool_calls`.

    - `"message_creation"`

    - `"tool_calls"`

  - `usage: Optional[Usage]`

    Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run step.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run step.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.beta.threads.runs.steps.list(
    run_id="run_id",
    thread_id="thread_id",
)
page = page.data[0]
print(page.id)
```

## Retrieve

`beta.threads.runs.steps.retrieve(strstep_id, StepRetrieveParams**kwargs)  -> RunStep`

**get** `/threads/{thread_id}/runs/{run_id}/steps/{step_id}`

Retrieves a run step.

### Parameters

- `thread_id: str`

- `run_id: str`

- `step_id: str`

- `include: Optional[List[RunStepInclude]]`

  A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.

  See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

  - `"step_details.tool_calls[*].file_search.results[*].content"`

### Returns

- `class RunStep: …`

  Represents a step in execution of a run.

  - `id: str`

    The identifier of the run step, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run step was created.

  - `expired_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step failed.

  - `last_error: Optional[LastError]`

    The last error associated with this run step. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded"]`

      One of `server_error` or `rate_limit_exceeded`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

    - `message: str`

      A human-readable description of the error.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread.run.step"]`

    The object type, which is always `thread.run.step`.

    - `"thread.run.step"`

  - `run_id: str`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

  - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

    The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

    - `"in_progress"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"expired"`

  - `step_details: StepDetails`

    The details of the run step.

    - `class MessageCreationStepDetails: …`

      Details of the message creation by the run step.

      - `message_creation: MessageCreation`

        - `message_id: str`

          The ID of the message that was created by this run step.

      - `type: Literal["message_creation"]`

        Always `message_creation`.

        - `"message_creation"`

    - `class ToolCallsStepDetails: …`

      Details of the tool call.

      - `tool_calls: List[ToolCall]`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

        - `class CodeInterpreterToolCall: …`

          Details of the Code Interpreter tool call the run step was involved in.

          - `id: str`

            The ID of the tool call.

          - `code_interpreter: CodeInterpreter`

            The Code Interpreter tool call definition.

            - `input: str`

              The input to the Code Interpreter tool call.

            - `outputs: List[CodeInterpreterOutput]`

              The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

              - `class CodeInterpreterOutputLogs: …`

                Text output from the Code Interpreter tool call as part of a run step.

                - `logs: str`

                  The text output from the Code Interpreter tool call.

                - `type: Literal["logs"]`

                  Always `logs`.

                  - `"logs"`

              - `class CodeInterpreterOutputImage: …`

                - `image: CodeInterpreterOutputImageImage`

                  - `file_id: str`

                    The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                - `type: Literal["image"]`

                  Always `image`.

                  - `"image"`

          - `type: Literal["code_interpreter"]`

            The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

            - `"code_interpreter"`

        - `class FileSearchToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `file_search: FileSearch`

            For now, this is always going to be an empty object.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search.

              - `ranker: Literal["auto", "default_2024_08_21"]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

            - `results: Optional[List[FileSearchResult]]`

              The results of the file search.

              - `file_id: str`

                The ID of the file that result was found in.

              - `file_name: str`

                The name of the file that result was found in.

              - `score: float`

                The score of the result. All values must be a floating point number between 0 and 1.

              - `content: Optional[List[FileSearchResultContent]]`

                The content of the result that was found. The content is only included if requested via the include query parameter.

                - `text: Optional[str]`

                  The text content of the file.

                - `type: Optional[Literal["text"]]`

                  The type of the content.

                  - `"text"`

          - `type: Literal["file_search"]`

            The type of tool call. This is always going to be `file_search` for this type of tool call.

            - `"file_search"`

        - `class FunctionToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `function: Function`

            The definition of the function that was called.

            - `arguments: str`

              The arguments passed to the function.

            - `name: str`

              The name of the function.

            - `output: Optional[str]`

              The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

          - `type: Literal["function"]`

            The type of tool call. This is always going to be `function` for this type of tool call.

            - `"function"`

      - `type: Literal["tool_calls"]`

        Always `tool_calls`.

        - `"tool_calls"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

  - `type: Literal["message_creation", "tool_calls"]`

    The type of run step, which can be either `message_creation` or `tool_calls`.

    - `"message_creation"`

    - `"tool_calls"`

  - `usage: Optional[Usage]`

    Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run step.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run step.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
run_step = client.beta.threads.runs.steps.retrieve(
    step_id="step_id",
    thread_id="thread_id",
    run_id="run_id",
)
print(run_step.id)
```

## Domain Types

### Code Interpreter Logs

- `class CodeInterpreterLogs: …`

  Text output from the Code Interpreter tool call as part of a run step.

  - `index: int`

    The index of the output in the outputs array.

  - `type: Literal["logs"]`

    Always `logs`.

    - `"logs"`

  - `logs: Optional[str]`

    The text output from the Code Interpreter tool call.

### Code Interpreter Output Image

- `class CodeInterpreterOutputImage: …`

  - `index: int`

    The index of the output in the outputs array.

  - `type: Literal["image"]`

    Always `image`.

    - `"image"`

  - `image: Optional[Image]`

    - `file_id: Optional[str]`

      The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

### Code Interpreter Tool Call

- `class CodeInterpreterToolCall: …`

  Details of the Code Interpreter tool call the run step was involved in.

  - `id: str`

    The ID of the tool call.

  - `code_interpreter: CodeInterpreter`

    The Code Interpreter tool call definition.

    - `input: str`

      The input to the Code Interpreter tool call.

    - `outputs: List[CodeInterpreterOutput]`

      The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

      - `class CodeInterpreterOutputLogs: …`

        Text output from the Code Interpreter tool call as part of a run step.

        - `logs: str`

          The text output from the Code Interpreter tool call.

        - `type: Literal["logs"]`

          Always `logs`.

          - `"logs"`

      - `class CodeInterpreterOutputImage: …`

        - `image: CodeInterpreterOutputImageImage`

          - `file_id: str`

            The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

        - `type: Literal["image"]`

          Always `image`.

          - `"image"`

  - `type: Literal["code_interpreter"]`

    The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

    - `"code_interpreter"`

### Code Interpreter Tool Call Delta

- `class CodeInterpreterToolCallDelta: …`

  Details of the Code Interpreter tool call the run step was involved in.

  - `index: int`

    The index of the tool call in the tool calls array.

  - `type: Literal["code_interpreter"]`

    The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

    - `"code_interpreter"`

  - `id: Optional[str]`

    The ID of the tool call.

  - `code_interpreter: Optional[CodeInterpreter]`

    The Code Interpreter tool call definition.

    - `input: Optional[str]`

      The input to the Code Interpreter tool call.

    - `outputs: Optional[List[CodeInterpreterOutput]]`

      The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

      - `class CodeInterpreterLogs: …`

        Text output from the Code Interpreter tool call as part of a run step.

        - `index: int`

          The index of the output in the outputs array.

        - `type: Literal["logs"]`

          Always `logs`.

          - `"logs"`

        - `logs: Optional[str]`

          The text output from the Code Interpreter tool call.

      - `class CodeInterpreterOutputImage: …`

        - `index: int`

          The index of the output in the outputs array.

        - `type: Literal["image"]`

          Always `image`.

          - `"image"`

        - `image: Optional[Image]`

          - `file_id: Optional[str]`

            The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

### File Search Tool Call

- `class FileSearchToolCall: …`

  - `id: str`

    The ID of the tool call object.

  - `file_search: FileSearch`

    For now, this is always going to be an empty object.

    - `ranking_options: Optional[FileSearchRankingOptions]`

      The ranking options for the file search.

      - `ranker: Literal["auto", "default_2024_08_21"]`

        The ranker to use for the file search. If not specified will use the `auto` ranker.

        - `"auto"`

        - `"default_2024_08_21"`

      - `score_threshold: float`

        The score threshold for the file search. All values must be a floating point number between 0 and 1.

    - `results: Optional[List[FileSearchResult]]`

      The results of the file search.

      - `file_id: str`

        The ID of the file that result was found in.

      - `file_name: str`

        The name of the file that result was found in.

      - `score: float`

        The score of the result. All values must be a floating point number between 0 and 1.

      - `content: Optional[List[FileSearchResultContent]]`

        The content of the result that was found. The content is only included if requested via the include query parameter.

        - `text: Optional[str]`

          The text content of the file.

        - `type: Optional[Literal["text"]]`

          The type of the content.

          - `"text"`

  - `type: Literal["file_search"]`

    The type of tool call. This is always going to be `file_search` for this type of tool call.

    - `"file_search"`

### File Search Tool Call Delta

- `class FileSearchToolCallDelta: …`

  - `file_search: object`

    For now, this is always going to be an empty object.

  - `index: int`

    The index of the tool call in the tool calls array.

  - `type: Literal["file_search"]`

    The type of tool call. This is always going to be `file_search` for this type of tool call.

    - `"file_search"`

  - `id: Optional[str]`

    The ID of the tool call object.

### Function Tool Call

- `class FunctionToolCall: …`

  - `id: str`

    The ID of the tool call object.

  - `function: Function`

    The definition of the function that was called.

    - `arguments: str`

      The arguments passed to the function.

    - `name: str`

      The name of the function.

    - `output: Optional[str]`

      The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

  - `type: Literal["function"]`

    The type of tool call. This is always going to be `function` for this type of tool call.

    - `"function"`

### Function Tool Call Delta

- `class FunctionToolCallDelta: …`

  - `index: int`

    The index of the tool call in the tool calls array.

  - `type: Literal["function"]`

    The type of tool call. This is always going to be `function` for this type of tool call.

    - `"function"`

  - `id: Optional[str]`

    The ID of the tool call object.

  - `function: Optional[Function]`

    The definition of the function that was called.

    - `arguments: Optional[str]`

      The arguments passed to the function.

    - `name: Optional[str]`

      The name of the function.

    - `output: Optional[str]`

      The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

### Message Creation Step Details

- `class MessageCreationStepDetails: …`

  Details of the message creation by the run step.

  - `message_creation: MessageCreation`

    - `message_id: str`

      The ID of the message that was created by this run step.

  - `type: Literal["message_creation"]`

    Always `message_creation`.

    - `"message_creation"`

### Run Step

- `class RunStep: …`

  Represents a step in execution of a run.

  - `id: str`

    The identifier of the run step, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run step was created.

  - `expired_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step failed.

  - `last_error: Optional[LastError]`

    The last error associated with this run step. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded"]`

      One of `server_error` or `rate_limit_exceeded`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

    - `message: str`

      A human-readable description of the error.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread.run.step"]`

    The object type, which is always `thread.run.step`.

    - `"thread.run.step"`

  - `run_id: str`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

  - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

    The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

    - `"in_progress"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"expired"`

  - `step_details: StepDetails`

    The details of the run step.

    - `class MessageCreationStepDetails: …`

      Details of the message creation by the run step.

      - `message_creation: MessageCreation`

        - `message_id: str`

          The ID of the message that was created by this run step.

      - `type: Literal["message_creation"]`

        Always `message_creation`.

        - `"message_creation"`

    - `class ToolCallsStepDetails: …`

      Details of the tool call.

      - `tool_calls: List[ToolCall]`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

        - `class CodeInterpreterToolCall: …`

          Details of the Code Interpreter tool call the run step was involved in.

          - `id: str`

            The ID of the tool call.

          - `code_interpreter: CodeInterpreter`

            The Code Interpreter tool call definition.

            - `input: str`

              The input to the Code Interpreter tool call.

            - `outputs: List[CodeInterpreterOutput]`

              The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

              - `class CodeInterpreterOutputLogs: …`

                Text output from the Code Interpreter tool call as part of a run step.

                - `logs: str`

                  The text output from the Code Interpreter tool call.

                - `type: Literal["logs"]`

                  Always `logs`.

                  - `"logs"`

              - `class CodeInterpreterOutputImage: …`

                - `image: CodeInterpreterOutputImageImage`

                  - `file_id: str`

                    The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                - `type: Literal["image"]`

                  Always `image`.

                  - `"image"`

          - `type: Literal["code_interpreter"]`

            The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

            - `"code_interpreter"`

        - `class FileSearchToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `file_search: FileSearch`

            For now, this is always going to be an empty object.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search.

              - `ranker: Literal["auto", "default_2024_08_21"]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

            - `results: Optional[List[FileSearchResult]]`

              The results of the file search.

              - `file_id: str`

                The ID of the file that result was found in.

              - `file_name: str`

                The name of the file that result was found in.

              - `score: float`

                The score of the result. All values must be a floating point number between 0 and 1.

              - `content: Optional[List[FileSearchResultContent]]`

                The content of the result that was found. The content is only included if requested via the include query parameter.

                - `text: Optional[str]`

                  The text content of the file.

                - `type: Optional[Literal["text"]]`

                  The type of the content.

                  - `"text"`

          - `type: Literal["file_search"]`

            The type of tool call. This is always going to be `file_search` for this type of tool call.

            - `"file_search"`

        - `class FunctionToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `function: Function`

            The definition of the function that was called.

            - `arguments: str`

              The arguments passed to the function.

            - `name: str`

              The name of the function.

            - `output: Optional[str]`

              The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

          - `type: Literal["function"]`

            The type of tool call. This is always going to be `function` for this type of tool call.

            - `"function"`

      - `type: Literal["tool_calls"]`

        Always `tool_calls`.

        - `"tool_calls"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

  - `type: Literal["message_creation", "tool_calls"]`

    The type of run step, which can be either `message_creation` or `tool_calls`.

    - `"message_creation"`

    - `"tool_calls"`

  - `usage: Optional[Usage]`

    Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run step.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run step.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

### Run Step Delta

- `class RunStepDelta: …`

  The delta containing the fields that have changed on the run step.

  - `step_details: Optional[StepDetails]`

    The details of the run step.

    - `class RunStepDeltaMessageDelta: …`

      Details of the message creation by the run step.

      - `type: Literal["message_creation"]`

        Always `message_creation`.

        - `"message_creation"`

      - `message_creation: Optional[MessageCreation]`

        - `message_id: Optional[str]`

          The ID of the message that was created by this run step.

    - `class ToolCallDeltaObject: …`

      Details of the tool call.

      - `type: Literal["tool_calls"]`

        Always `tool_calls`.

        - `"tool_calls"`

      - `tool_calls: Optional[List[ToolCallDelta]]`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

        - `class CodeInterpreterToolCallDelta: …`

          Details of the Code Interpreter tool call the run step was involved in.

          - `index: int`

            The index of the tool call in the tool calls array.

          - `type: Literal["code_interpreter"]`

            The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

            - `"code_interpreter"`

          - `id: Optional[str]`

            The ID of the tool call.

          - `code_interpreter: Optional[CodeInterpreter]`

            The Code Interpreter tool call definition.

            - `input: Optional[str]`

              The input to the Code Interpreter tool call.

            - `outputs: Optional[List[CodeInterpreterOutput]]`

              The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

              - `class CodeInterpreterLogs: …`

                Text output from the Code Interpreter tool call as part of a run step.

                - `index: int`

                  The index of the output in the outputs array.

                - `type: Literal["logs"]`

                  Always `logs`.

                  - `"logs"`

                - `logs: Optional[str]`

                  The text output from the Code Interpreter tool call.

              - `class CodeInterpreterOutputImage: …`

                - `index: int`

                  The index of the output in the outputs array.

                - `type: Literal["image"]`

                  Always `image`.

                  - `"image"`

                - `image: Optional[Image]`

                  - `file_id: Optional[str]`

                    The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

        - `class FileSearchToolCallDelta: …`

          - `file_search: object`

            For now, this is always going to be an empty object.

          - `index: int`

            The index of the tool call in the tool calls array.

          - `type: Literal["file_search"]`

            The type of tool call. This is always going to be `file_search` for this type of tool call.

            - `"file_search"`

          - `id: Optional[str]`

            The ID of the tool call object.

        - `class FunctionToolCallDelta: …`

          - `index: int`

            The index of the tool call in the tool calls array.

          - `type: Literal["function"]`

            The type of tool call. This is always going to be `function` for this type of tool call.

            - `"function"`

          - `id: Optional[str]`

            The ID of the tool call object.

          - `function: Optional[Function]`

            The definition of the function that was called.

            - `arguments: Optional[str]`

              The arguments passed to the function.

            - `name: Optional[str]`

              The name of the function.

            - `output: Optional[str]`

              The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

### Run Step Delta Event

- `class RunStepDeltaEvent: …`

  Represents a run step delta i.e. any changed fields on a run step during streaming.

  - `id: str`

    The identifier of the run step, which can be referenced in API endpoints.

  - `delta: RunStepDelta`

    The delta containing the fields that have changed on the run step.

    - `step_details: Optional[StepDetails]`

      The details of the run step.

      - `class RunStepDeltaMessageDelta: …`

        Details of the message creation by the run step.

        - `type: Literal["message_creation"]`

          Always `message_creation`.

          - `"message_creation"`

        - `message_creation: Optional[MessageCreation]`

          - `message_id: Optional[str]`

            The ID of the message that was created by this run step.

      - `class ToolCallDeltaObject: …`

        Details of the tool call.

        - `type: Literal["tool_calls"]`

          Always `tool_calls`.

          - `"tool_calls"`

        - `tool_calls: Optional[List[ToolCallDelta]]`

          An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

          - `class CodeInterpreterToolCallDelta: …`

            Details of the Code Interpreter tool call the run step was involved in.

            - `index: int`

              The index of the tool call in the tool calls array.

            - `type: Literal["code_interpreter"]`

              The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

              - `"code_interpreter"`

            - `id: Optional[str]`

              The ID of the tool call.

            - `code_interpreter: Optional[CodeInterpreter]`

              The Code Interpreter tool call definition.

              - `input: Optional[str]`

                The input to the Code Interpreter tool call.

              - `outputs: Optional[List[CodeInterpreterOutput]]`

                The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                - `class CodeInterpreterLogs: …`

                  Text output from the Code Interpreter tool call as part of a run step.

                  - `index: int`

                    The index of the output in the outputs array.

                  - `type: Literal["logs"]`

                    Always `logs`.

                    - `"logs"`

                  - `logs: Optional[str]`

                    The text output from the Code Interpreter tool call.

                - `class CodeInterpreterOutputImage: …`

                  - `index: int`

                    The index of the output in the outputs array.

                  - `type: Literal["image"]`

                    Always `image`.

                    - `"image"`

                  - `image: Optional[Image]`

                    - `file_id: Optional[str]`

                      The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

          - `class FileSearchToolCallDelta: …`

            - `file_search: object`

              For now, this is always going to be an empty object.

            - `index: int`

              The index of the tool call in the tool calls array.

            - `type: Literal["file_search"]`

              The type of tool call. This is always going to be `file_search` for this type of tool call.

              - `"file_search"`

            - `id: Optional[str]`

              The ID of the tool call object.

          - `class FunctionToolCallDelta: …`

            - `index: int`

              The index of the tool call in the tool calls array.

            - `type: Literal["function"]`

              The type of tool call. This is always going to be `function` for this type of tool call.

              - `"function"`

            - `id: Optional[str]`

              The ID of the tool call object.

            - `function: Optional[Function]`

              The definition of the function that was called.

              - `arguments: Optional[str]`

                The arguments passed to the function.

              - `name: Optional[str]`

                The name of the function.

              - `output: Optional[str]`

                The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

  - `object: Literal["thread.run.step.delta"]`

    The object type, which is always `thread.run.step.delta`.

    - `"thread.run.step.delta"`

### Run Step Delta Message Delta

- `class RunStepDeltaMessageDelta: …`

  Details of the message creation by the run step.

  - `type: Literal["message_creation"]`

    Always `message_creation`.

    - `"message_creation"`

  - `message_creation: Optional[MessageCreation]`

    - `message_id: Optional[str]`

      The ID of the message that was created by this run step.

### Run Step Include

- `Literal["step_details.tool_calls[*].file_search.results[*].content"]`

  - `"step_details.tool_calls[*].file_search.results[*].content"`

### Tool Call

- `ToolCall`

  Details of the Code Interpreter tool call the run step was involved in.

  - `class CodeInterpreterToolCall: …`

    Details of the Code Interpreter tool call the run step was involved in.

    - `id: str`

      The ID of the tool call.

    - `code_interpreter: CodeInterpreter`

      The Code Interpreter tool call definition.

      - `input: str`

        The input to the Code Interpreter tool call.

      - `outputs: List[CodeInterpreterOutput]`

        The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

        - `class CodeInterpreterOutputLogs: …`

          Text output from the Code Interpreter tool call as part of a run step.

          - `logs: str`

            The text output from the Code Interpreter tool call.

          - `type: Literal["logs"]`

            Always `logs`.

            - `"logs"`

        - `class CodeInterpreterOutputImage: …`

          - `image: CodeInterpreterOutputImageImage`

            - `file_id: str`

              The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

          - `type: Literal["image"]`

            Always `image`.

            - `"image"`

    - `type: Literal["code_interpreter"]`

      The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

      - `"code_interpreter"`

  - `class FileSearchToolCall: …`

    - `id: str`

      The ID of the tool call object.

    - `file_search: FileSearch`

      For now, this is always going to be an empty object.

      - `ranking_options: Optional[FileSearchRankingOptions]`

        The ranking options for the file search.

        - `ranker: Literal["auto", "default_2024_08_21"]`

          The ranker to use for the file search. If not specified will use the `auto` ranker.

          - `"auto"`

          - `"default_2024_08_21"`

        - `score_threshold: float`

          The score threshold for the file search. All values must be a floating point number between 0 and 1.

      - `results: Optional[List[FileSearchResult]]`

        The results of the file search.

        - `file_id: str`

          The ID of the file that result was found in.

        - `file_name: str`

          The name of the file that result was found in.

        - `score: float`

          The score of the result. All values must be a floating point number between 0 and 1.

        - `content: Optional[List[FileSearchResultContent]]`

          The content of the result that was found. The content is only included if requested via the include query parameter.

          - `text: Optional[str]`

            The text content of the file.

          - `type: Optional[Literal["text"]]`

            The type of the content.

            - `"text"`

    - `type: Literal["file_search"]`

      The type of tool call. This is always going to be `file_search` for this type of tool call.

      - `"file_search"`

  - `class FunctionToolCall: …`

    - `id: str`

      The ID of the tool call object.

    - `function: Function`

      The definition of the function that was called.

      - `arguments: str`

        The arguments passed to the function.

      - `name: str`

        The name of the function.

      - `output: Optional[str]`

        The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

    - `type: Literal["function"]`

      The type of tool call. This is always going to be `function` for this type of tool call.

      - `"function"`

### Tool Call Delta

- `ToolCallDelta`

  Details of the Code Interpreter tool call the run step was involved in.

  - `class CodeInterpreterToolCallDelta: …`

    Details of the Code Interpreter tool call the run step was involved in.

    - `index: int`

      The index of the tool call in the tool calls array.

    - `type: Literal["code_interpreter"]`

      The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

      - `"code_interpreter"`

    - `id: Optional[str]`

      The ID of the tool call.

    - `code_interpreter: Optional[CodeInterpreter]`

      The Code Interpreter tool call definition.

      - `input: Optional[str]`

        The input to the Code Interpreter tool call.

      - `outputs: Optional[List[CodeInterpreterOutput]]`

        The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

        - `class CodeInterpreterLogs: …`

          Text output from the Code Interpreter tool call as part of a run step.

          - `index: int`

            The index of the output in the outputs array.

          - `type: Literal["logs"]`

            Always `logs`.

            - `"logs"`

          - `logs: Optional[str]`

            The text output from the Code Interpreter tool call.

        - `class CodeInterpreterOutputImage: …`

          - `index: int`

            The index of the output in the outputs array.

          - `type: Literal["image"]`

            Always `image`.

            - `"image"`

          - `image: Optional[Image]`

            - `file_id: Optional[str]`

              The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

  - `class FileSearchToolCallDelta: …`

    - `file_search: object`

      For now, this is always going to be an empty object.

    - `index: int`

      The index of the tool call in the tool calls array.

    - `type: Literal["file_search"]`

      The type of tool call. This is always going to be `file_search` for this type of tool call.

      - `"file_search"`

    - `id: Optional[str]`

      The ID of the tool call object.

  - `class FunctionToolCallDelta: …`

    - `index: int`

      The index of the tool call in the tool calls array.

    - `type: Literal["function"]`

      The type of tool call. This is always going to be `function` for this type of tool call.

      - `"function"`

    - `id: Optional[str]`

      The ID of the tool call object.

    - `function: Optional[Function]`

      The definition of the function that was called.

      - `arguments: Optional[str]`

        The arguments passed to the function.

      - `name: Optional[str]`

        The name of the function.

      - `output: Optional[str]`

        The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

### Tool Call Delta Object

- `class ToolCallDeltaObject: …`

  Details of the tool call.

  - `type: Literal["tool_calls"]`

    Always `tool_calls`.

    - `"tool_calls"`

  - `tool_calls: Optional[List[ToolCallDelta]]`

    An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

    - `class CodeInterpreterToolCallDelta: …`

      Details of the Code Interpreter tool call the run step was involved in.

      - `index: int`

        The index of the tool call in the tool calls array.

      - `type: Literal["code_interpreter"]`

        The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

        - `"code_interpreter"`

      - `id: Optional[str]`

        The ID of the tool call.

      - `code_interpreter: Optional[CodeInterpreter]`

        The Code Interpreter tool call definition.

        - `input: Optional[str]`

          The input to the Code Interpreter tool call.

        - `outputs: Optional[List[CodeInterpreterOutput]]`

          The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

          - `class CodeInterpreterLogs: …`

            Text output from the Code Interpreter tool call as part of a run step.

            - `index: int`

              The index of the output in the outputs array.

            - `type: Literal["logs"]`

              Always `logs`.

              - `"logs"`

            - `logs: Optional[str]`

              The text output from the Code Interpreter tool call.

          - `class CodeInterpreterOutputImage: …`

            - `index: int`

              The index of the output in the outputs array.

            - `type: Literal["image"]`

              Always `image`.

              - `"image"`

            - `image: Optional[Image]`

              - `file_id: Optional[str]`

                The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

    - `class FileSearchToolCallDelta: …`

      - `file_search: object`

        For now, this is always going to be an empty object.

      - `index: int`

        The index of the tool call in the tool calls array.

      - `type: Literal["file_search"]`

        The type of tool call. This is always going to be `file_search` for this type of tool call.

        - `"file_search"`

      - `id: Optional[str]`

        The ID of the tool call object.

    - `class FunctionToolCallDelta: …`

      - `index: int`

        The index of the tool call in the tool calls array.

      - `type: Literal["function"]`

        The type of tool call. This is always going to be `function` for this type of tool call.

        - `"function"`

      - `id: Optional[str]`

        The ID of the tool call object.

      - `function: Optional[Function]`

        The definition of the function that was called.

        - `arguments: Optional[str]`

          The arguments passed to the function.

        - `name: Optional[str]`

          The name of the function.

        - `output: Optional[str]`

          The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

### Tool Calls Step Details

- `class ToolCallsStepDetails: …`

  Details of the tool call.

  - `tool_calls: List[ToolCall]`

    An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

    - `class CodeInterpreterToolCall: …`

      Details of the Code Interpreter tool call the run step was involved in.

      - `id: str`

        The ID of the tool call.

      - `code_interpreter: CodeInterpreter`

        The Code Interpreter tool call definition.

        - `input: str`

          The input to the Code Interpreter tool call.

        - `outputs: List[CodeInterpreterOutput]`

          The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

          - `class CodeInterpreterOutputLogs: …`

            Text output from the Code Interpreter tool call as part of a run step.

            - `logs: str`

              The text output from the Code Interpreter tool call.

            - `type: Literal["logs"]`

              Always `logs`.

              - `"logs"`

          - `class CodeInterpreterOutputImage: …`

            - `image: CodeInterpreterOutputImageImage`

              - `file_id: str`

                The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

            - `type: Literal["image"]`

              Always `image`.

              - `"image"`

      - `type: Literal["code_interpreter"]`

        The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

        - `"code_interpreter"`

    - `class FileSearchToolCall: …`

      - `id: str`

        The ID of the tool call object.

      - `file_search: FileSearch`

        For now, this is always going to be an empty object.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search.

          - `ranker: Literal["auto", "default_2024_08_21"]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

        - `results: Optional[List[FileSearchResult]]`

          The results of the file search.

          - `file_id: str`

            The ID of the file that result was found in.

          - `file_name: str`

            The name of the file that result was found in.

          - `score: float`

            The score of the result. All values must be a floating point number between 0 and 1.

          - `content: Optional[List[FileSearchResultContent]]`

            The content of the result that was found. The content is only included if requested via the include query parameter.

            - `text: Optional[str]`

              The text content of the file.

            - `type: Optional[Literal["text"]]`

              The type of the content.

              - `"text"`

      - `type: Literal["file_search"]`

        The type of tool call. This is always going to be `file_search` for this type of tool call.

        - `"file_search"`

    - `class FunctionToolCall: …`

      - `id: str`

        The ID of the tool call object.

      - `function: Function`

        The definition of the function that was called.

        - `arguments: str`

          The arguments passed to the function.

        - `name: str`

          The name of the function.

        - `output: Optional[str]`

          The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

      - `type: Literal["function"]`

        The type of tool call. This is always going to be `function` for this type of tool call.

        - `"function"`

  - `type: Literal["tool_calls"]`

    Always `tool_calls`.

    - `"tool_calls"`

# Messages

## List

`beta.threads.messages.list(strthread_id, MessageListParams**kwargs)  -> SyncCursorPage[Message]`

**get** `/threads/{thread_id}/messages`

Returns a list of messages for a given thread.

### Parameters

- `thread_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

- `run_id: Optional[str]`

  Filter messages by the run ID that generated them.

### Returns

- `class Message: …`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: Optional[str]`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Optional[List[Attachment]]`

    A list of files attached to the message, and the tools they were added to.

    - `file_id: Optional[str]`

      The ID of the file to attach to the message.

    - `tools: Optional[List[AttachmentTool]]`

      The tools to add this file to.

      - `class CodeInterpreterTool: …`

        - `type: Literal["code_interpreter"]`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

        - `type: Literal["file_search"]`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: List[MessageContent]`

    The content of the message in array of text and/or images.

    - `class ImageFileContentBlock: …`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `image_file: ImageFile`

        - `file_id: str`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_file"]`

        Always `image_file`.

        - `"image_file"`

    - `class ImageURLContentBlock: …`

      References an image URL in the content of a message.

      - `image_url: ImageURL`

        - `url: str`

          The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_url"]`

        The type of the content part.

        - `"image_url"`

    - `class TextContentBlock: …`

      The text content that is part of a message.

      - `text: Text`

        - `annotations: List[Annotation]`

          - `class FileCitationAnnotation: …`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `end_index: int`

            - `file_citation: FileCitation`

              - `file_id: str`

                The ID of the specific File the citation is from.

            - `start_index: int`

            - `text: str`

              The text in the message content that needs to be replaced.

            - `type: Literal["file_citation"]`

              Always `file_citation`.

              - `"file_citation"`

          - `class FilePathAnnotation: …`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `end_index: int`

            - `file_path: FilePath`

              - `file_id: str`

                The ID of the file that was generated.

            - `start_index: int`

            - `text: str`

              The text in the message content that needs to be replaced.

            - `type: Literal["file_path"]`

              Always `file_path`.

              - `"file_path"`

        - `value: str`

          The data that makes up the text.

      - `type: Literal["text"]`

        Always `text`.

        - `"text"`

    - `class RefusalContentBlock: …`

      The refusal content generated by the assistant.

      - `refusal: str`

      - `type: Literal["refusal"]`

        Always `refusal`.

        - `"refusal"`

  - `created_at: int`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: Optional[IncompleteDetails]`

    On an incomplete message, details about why the message is incomplete.

    - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread.message"]`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: Literal["user", "assistant"]`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: Optional[str]`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: Literal["in_progress", "incomplete", "completed"]`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: str`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.beta.threads.messages.list(
    thread_id="thread_id",
)
page = page.data[0]
print(page.id)
```

## Create

`beta.threads.messages.create(strthread_id, MessageCreateParams**kwargs)  -> Message`

**post** `/threads/{thread_id}/messages`

Create a message.

### Parameters

- `thread_id: str`

- `content: Union[str, Iterable[MessageContentPartParam]]`

  The text contents of the message.

  - `str`

    The text contents of the message.

  - `Iterable[MessageContentPartParam]`

    An array of content parts with a defined type, each can be of type `text` or images can be passed with `image_url` or `image_file`. Image types are only supported on [Vision-compatible models](https://platform.openai.com/docs/models).

    - `class ImageFileContentBlock: …`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `image_file: ImageFile`

        - `file_id: str`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_file"]`

        Always `image_file`.

        - `"image_file"`

    - `class ImageURLContentBlock: …`

      References an image URL in the content of a message.

      - `image_url: ImageURL`

        - `url: str`

          The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_url"]`

        The type of the content part.

        - `"image_url"`

    - `class TextContentBlockParam: …`

      The text content that is part of a message.

      - `text: str`

        Text content to be sent to the model

      - `type: Literal["text"]`

        Always `text`.

        - `"text"`

- `role: Literal["user", "assistant"]`

  The role of the entity that is creating the message. Allowed values include:

  - `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.
  - `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.

  - `"user"`

  - `"assistant"`

- `attachments: Optional[Iterable[Attachment]]`

  A list of files attached to the message, and the tools they should be added to.

  - `file_id: Optional[str]`

    The ID of the file to attach to the message.

  - `tools: Optional[Iterable[AttachmentTool]]`

    The tools to add this file to.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class AttachmentToolFileSearch: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

### Returns

- `class Message: …`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: Optional[str]`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Optional[List[Attachment]]`

    A list of files attached to the message, and the tools they were added to.

    - `file_id: Optional[str]`

      The ID of the file to attach to the message.

    - `tools: Optional[List[AttachmentTool]]`

      The tools to add this file to.

      - `class CodeInterpreterTool: …`

        - `type: Literal["code_interpreter"]`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

        - `type: Literal["file_search"]`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: List[MessageContent]`

    The content of the message in array of text and/or images.

    - `class ImageFileContentBlock: …`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `image_file: ImageFile`

        - `file_id: str`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_file"]`

        Always `image_file`.

        - `"image_file"`

    - `class ImageURLContentBlock: …`

      References an image URL in the content of a message.

      - `image_url: ImageURL`

        - `url: str`

          The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_url"]`

        The type of the content part.

        - `"image_url"`

    - `class TextContentBlock: …`

      The text content that is part of a message.

      - `text: Text`

        - `annotations: List[Annotation]`

          - `class FileCitationAnnotation: …`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `end_index: int`

            - `file_citation: FileCitation`

              - `file_id: str`

                The ID of the specific File the citation is from.

            - `start_index: int`

            - `text: str`

              The text in the message content that needs to be replaced.

            - `type: Literal["file_citation"]`

              Always `file_citation`.

              - `"file_citation"`

          - `class FilePathAnnotation: …`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `end_index: int`

            - `file_path: FilePath`

              - `file_id: str`

                The ID of the file that was generated.

            - `start_index: int`

            - `text: str`

              The text in the message content that needs to be replaced.

            - `type: Literal["file_path"]`

              Always `file_path`.

              - `"file_path"`

        - `value: str`

          The data that makes up the text.

      - `type: Literal["text"]`

        Always `text`.

        - `"text"`

    - `class RefusalContentBlock: …`

      The refusal content generated by the assistant.

      - `refusal: str`

      - `type: Literal["refusal"]`

        Always `refusal`.

        - `"refusal"`

  - `created_at: int`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: Optional[IncompleteDetails]`

    On an incomplete message, details about why the message is incomplete.

    - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread.message"]`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: Literal["user", "assistant"]`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: Optional[str]`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: Literal["in_progress", "incomplete", "completed"]`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: str`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
message = client.beta.threads.messages.create(
    thread_id="thread_id",
    content="string",
    role="user",
)
print(message.id)
```

## Update

`beta.threads.messages.update(strmessage_id, MessageUpdateParams**kwargs)  -> Message`

**post** `/threads/{thread_id}/messages/{message_id}`

Modifies a message.

### Parameters

- `thread_id: str`

- `message_id: str`

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

### Returns

- `class Message: …`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: Optional[str]`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Optional[List[Attachment]]`

    A list of files attached to the message, and the tools they were added to.

    - `file_id: Optional[str]`

      The ID of the file to attach to the message.

    - `tools: Optional[List[AttachmentTool]]`

      The tools to add this file to.

      - `class CodeInterpreterTool: …`

        - `type: Literal["code_interpreter"]`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

        - `type: Literal["file_search"]`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: List[MessageContent]`

    The content of the message in array of text and/or images.

    - `class ImageFileContentBlock: …`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `image_file: ImageFile`

        - `file_id: str`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_file"]`

        Always `image_file`.

        - `"image_file"`

    - `class ImageURLContentBlock: …`

      References an image URL in the content of a message.

      - `image_url: ImageURL`

        - `url: str`

          The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_url"]`

        The type of the content part.

        - `"image_url"`

    - `class TextContentBlock: …`

      The text content that is part of a message.

      - `text: Text`

        - `annotations: List[Annotation]`

          - `class FileCitationAnnotation: …`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `end_index: int`

            - `file_citation: FileCitation`

              - `file_id: str`

                The ID of the specific File the citation is from.

            - `start_index: int`

            - `text: str`

              The text in the message content that needs to be replaced.

            - `type: Literal["file_citation"]`

              Always `file_citation`.

              - `"file_citation"`

          - `class FilePathAnnotation: …`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `end_index: int`

            - `file_path: FilePath`

              - `file_id: str`

                The ID of the file that was generated.

            - `start_index: int`

            - `text: str`

              The text in the message content that needs to be replaced.

            - `type: Literal["file_path"]`

              Always `file_path`.

              - `"file_path"`

        - `value: str`

          The data that makes up the text.

      - `type: Literal["text"]`

        Always `text`.

        - `"text"`

    - `class RefusalContentBlock: …`

      The refusal content generated by the assistant.

      - `refusal: str`

      - `type: Literal["refusal"]`

        Always `refusal`.

        - `"refusal"`

  - `created_at: int`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: Optional[IncompleteDetails]`

    On an incomplete message, details about why the message is incomplete.

    - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread.message"]`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: Literal["user", "assistant"]`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: Optional[str]`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: Literal["in_progress", "incomplete", "completed"]`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: str`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
message = client.beta.threads.messages.update(
    message_id="message_id",
    thread_id="thread_id",
)
print(message.id)
```

## Retrieve

`beta.threads.messages.retrieve(strmessage_id, MessageRetrieveParams**kwargs)  -> Message`

**get** `/threads/{thread_id}/messages/{message_id}`

Retrieve a message.

### Parameters

- `thread_id: str`

- `message_id: str`

### Returns

- `class Message: …`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: Optional[str]`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Optional[List[Attachment]]`

    A list of files attached to the message, and the tools they were added to.

    - `file_id: Optional[str]`

      The ID of the file to attach to the message.

    - `tools: Optional[List[AttachmentTool]]`

      The tools to add this file to.

      - `class CodeInterpreterTool: …`

        - `type: Literal["code_interpreter"]`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

        - `type: Literal["file_search"]`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: List[MessageContent]`

    The content of the message in array of text and/or images.

    - `class ImageFileContentBlock: …`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `image_file: ImageFile`

        - `file_id: str`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_file"]`

        Always `image_file`.

        - `"image_file"`

    - `class ImageURLContentBlock: …`

      References an image URL in the content of a message.

      - `image_url: ImageURL`

        - `url: str`

          The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_url"]`

        The type of the content part.

        - `"image_url"`

    - `class TextContentBlock: …`

      The text content that is part of a message.

      - `text: Text`

        - `annotations: List[Annotation]`

          - `class FileCitationAnnotation: …`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `end_index: int`

            - `file_citation: FileCitation`

              - `file_id: str`

                The ID of the specific File the citation is from.

            - `start_index: int`

            - `text: str`

              The text in the message content that needs to be replaced.

            - `type: Literal["file_citation"]`

              Always `file_citation`.

              - `"file_citation"`

          - `class FilePathAnnotation: …`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `end_index: int`

            - `file_path: FilePath`

              - `file_id: str`

                The ID of the file that was generated.

            - `start_index: int`

            - `text: str`

              The text in the message content that needs to be replaced.

            - `type: Literal["file_path"]`

              Always `file_path`.

              - `"file_path"`

        - `value: str`

          The data that makes up the text.

      - `type: Literal["text"]`

        Always `text`.

        - `"text"`

    - `class RefusalContentBlock: …`

      The refusal content generated by the assistant.

      - `refusal: str`

      - `type: Literal["refusal"]`

        Always `refusal`.

        - `"refusal"`

  - `created_at: int`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: Optional[IncompleteDetails]`

    On an incomplete message, details about why the message is incomplete.

    - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread.message"]`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: Literal["user", "assistant"]`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: Optional[str]`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: Literal["in_progress", "incomplete", "completed"]`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: str`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
message = client.beta.threads.messages.retrieve(
    message_id="message_id",
    thread_id="thread_id",
)
print(message.id)
```

## Delete

`beta.threads.messages.delete(strmessage_id, MessageDeleteParams**kwargs)  -> MessageDeleted`

**delete** `/threads/{thread_id}/messages/{message_id}`

Deletes a message.

### Parameters

- `thread_id: str`

- `message_id: str`

### Returns

- `class MessageDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["thread.message.deleted"]`

    - `"thread.message.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
message_deleted = client.beta.threads.messages.delete(
    message_id="message_id",
    thread_id="thread_id",
)
print(message_deleted.id)
```

## Domain Types

### Annotation

- `Annotation`

  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

  - `class FileCitationAnnotation: …`

    A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

    - `end_index: int`

    - `file_citation: FileCitation`

      - `file_id: str`

        The ID of the specific File the citation is from.

    - `start_index: int`

    - `text: str`

      The text in the message content that needs to be replaced.

    - `type: Literal["file_citation"]`

      Always `file_citation`.

      - `"file_citation"`

  - `class FilePathAnnotation: …`

    A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

    - `end_index: int`

    - `file_path: FilePath`

      - `file_id: str`

        The ID of the file that was generated.

    - `start_index: int`

    - `text: str`

      The text in the message content that needs to be replaced.

    - `type: Literal["file_path"]`

      Always `file_path`.

      - `"file_path"`

### Annotation Delta

- `AnnotationDelta`

  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

  - `class FileCitationDeltaAnnotation: …`

    A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

    - `index: int`

      The index of the annotation in the text content part.

    - `type: Literal["file_citation"]`

      Always `file_citation`.

      - `"file_citation"`

    - `end_index: Optional[int]`

    - `file_citation: Optional[FileCitation]`

      - `file_id: Optional[str]`

        The ID of the specific File the citation is from.

      - `quote: Optional[str]`

        The specific quote in the file.

    - `start_index: Optional[int]`

    - `text: Optional[str]`

      The text in the message content that needs to be replaced.

  - `class FilePathDeltaAnnotation: …`

    A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

    - `index: int`

      The index of the annotation in the text content part.

    - `type: Literal["file_path"]`

      Always `file_path`.

      - `"file_path"`

    - `end_index: Optional[int]`

    - `file_path: Optional[FilePath]`

      - `file_id: Optional[str]`

        The ID of the file that was generated.

    - `start_index: Optional[int]`

    - `text: Optional[str]`

      The text in the message content that needs to be replaced.

### File Citation Annotation

- `class FileCitationAnnotation: …`

  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

  - `end_index: int`

  - `file_citation: FileCitation`

    - `file_id: str`

      The ID of the specific File the citation is from.

  - `start_index: int`

  - `text: str`

    The text in the message content that needs to be replaced.

  - `type: Literal["file_citation"]`

    Always `file_citation`.

    - `"file_citation"`

### File Citation Delta Annotation

- `class FileCitationDeltaAnnotation: …`

  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

  - `index: int`

    The index of the annotation in the text content part.

  - `type: Literal["file_citation"]`

    Always `file_citation`.

    - `"file_citation"`

  - `end_index: Optional[int]`

  - `file_citation: Optional[FileCitation]`

    - `file_id: Optional[str]`

      The ID of the specific File the citation is from.

    - `quote: Optional[str]`

      The specific quote in the file.

  - `start_index: Optional[int]`

  - `text: Optional[str]`

    The text in the message content that needs to be replaced.

### File Path Annotation

- `class FilePathAnnotation: …`

  A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

  - `end_index: int`

  - `file_path: FilePath`

    - `file_id: str`

      The ID of the file that was generated.

  - `start_index: int`

  - `text: str`

    The text in the message content that needs to be replaced.

  - `type: Literal["file_path"]`

    Always `file_path`.

    - `"file_path"`

### File Path Delta Annotation

- `class FilePathDeltaAnnotation: …`

  A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

  - `index: int`

    The index of the annotation in the text content part.

  - `type: Literal["file_path"]`

    Always `file_path`.

    - `"file_path"`

  - `end_index: Optional[int]`

  - `file_path: Optional[FilePath]`

    - `file_id: Optional[str]`

      The ID of the file that was generated.

  - `start_index: Optional[int]`

  - `text: Optional[str]`

    The text in the message content that needs to be replaced.

### Image File

- `class ImageFile: …`

  - `file_id: str`

    The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

  - `detail: Optional[Literal["auto", "low", "high"]]`

    Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

    - `"auto"`

    - `"low"`

    - `"high"`

### Image File Content Block

- `class ImageFileContentBlock: …`

  References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

  - `image_file: ImageFile`

    - `file_id: str`

      The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

    - `detail: Optional[Literal["auto", "low", "high"]]`

      Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

      - `"auto"`

      - `"low"`

      - `"high"`

  - `type: Literal["image_file"]`

    Always `image_file`.

    - `"image_file"`

### Image File Delta

- `class ImageFileDelta: …`

  - `detail: Optional[Literal["auto", "low", "high"]]`

    Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

    - `"auto"`

    - `"low"`

    - `"high"`

  - `file_id: Optional[str]`

    The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

### Image File Delta Block

- `class ImageFileDeltaBlock: …`

  References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

  - `index: int`

    The index of the content part in the message.

  - `type: Literal["image_file"]`

    Always `image_file`.

    - `"image_file"`

  - `image_file: Optional[ImageFileDelta]`

    - `detail: Optional[Literal["auto", "low", "high"]]`

      Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

      - `"auto"`

      - `"low"`

      - `"high"`

    - `file_id: Optional[str]`

      The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

### Image URL

- `class ImageURL: …`

  - `url: str`

    The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

  - `detail: Optional[Literal["auto", "low", "high"]]`

    Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

    - `"auto"`

    - `"low"`

    - `"high"`

### Image URL Content Block

- `class ImageURLContentBlock: …`

  References an image URL in the content of a message.

  - `image_url: ImageURL`

    - `url: str`

      The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

    - `detail: Optional[Literal["auto", "low", "high"]]`

      Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

      - `"auto"`

      - `"low"`

      - `"high"`

  - `type: Literal["image_url"]`

    The type of the content part.

    - `"image_url"`

### Image URL Delta

- `class ImageURLDelta: …`

  - `detail: Optional[Literal["auto", "low", "high"]]`

    Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

    - `"auto"`

    - `"low"`

    - `"high"`

  - `url: Optional[str]`

    The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

### Image URL Delta Block

- `class ImageURLDeltaBlock: …`

  References an image URL in the content of a message.

  - `index: int`

    The index of the content part in the message.

  - `type: Literal["image_url"]`

    Always `image_url`.

    - `"image_url"`

  - `image_url: Optional[ImageURLDelta]`

    - `detail: Optional[Literal["auto", "low", "high"]]`

      Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

      - `"auto"`

      - `"low"`

      - `"high"`

    - `url: Optional[str]`

      The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

### Message

- `class Message: …`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: Optional[str]`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Optional[List[Attachment]]`

    A list of files attached to the message, and the tools they were added to.

    - `file_id: Optional[str]`

      The ID of the file to attach to the message.

    - `tools: Optional[List[AttachmentTool]]`

      The tools to add this file to.

      - `class CodeInterpreterTool: …`

        - `type: Literal["code_interpreter"]`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

        - `type: Literal["file_search"]`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: List[MessageContent]`

    The content of the message in array of text and/or images.

    - `class ImageFileContentBlock: …`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `image_file: ImageFile`

        - `file_id: str`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_file"]`

        Always `image_file`.

        - `"image_file"`

    - `class ImageURLContentBlock: …`

      References an image URL in the content of a message.

      - `image_url: ImageURL`

        - `url: str`

          The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: Literal["image_url"]`

        The type of the content part.

        - `"image_url"`

    - `class TextContentBlock: …`

      The text content that is part of a message.

      - `text: Text`

        - `annotations: List[Annotation]`

          - `class FileCitationAnnotation: …`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `end_index: int`

            - `file_citation: FileCitation`

              - `file_id: str`

                The ID of the specific File the citation is from.

            - `start_index: int`

            - `text: str`

              The text in the message content that needs to be replaced.

            - `type: Literal["file_citation"]`

              Always `file_citation`.

              - `"file_citation"`

          - `class FilePathAnnotation: …`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `end_index: int`

            - `file_path: FilePath`

              - `file_id: str`

                The ID of the file that was generated.

            - `start_index: int`

            - `text: str`

              The text in the message content that needs to be replaced.

            - `type: Literal["file_path"]`

              Always `file_path`.

              - `"file_path"`

        - `value: str`

          The data that makes up the text.

      - `type: Literal["text"]`

        Always `text`.

        - `"text"`

    - `class RefusalContentBlock: …`

      The refusal content generated by the assistant.

      - `refusal: str`

      - `type: Literal["refusal"]`

        Always `refusal`.

        - `"refusal"`

  - `created_at: int`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: Optional[IncompleteDetails]`

    On an incomplete message, details about why the message is incomplete.

    - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread.message"]`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: Literal["user", "assistant"]`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: Optional[str]`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: Literal["in_progress", "incomplete", "completed"]`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: str`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Message Content

- `MessageContent`

  References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

  - `class ImageFileContentBlock: …`

    References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

    - `image_file: ImageFile`

      - `file_id: str`

        The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

      - `detail: Optional[Literal["auto", "low", "high"]]`

        Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

        - `"auto"`

        - `"low"`

        - `"high"`

    - `type: Literal["image_file"]`

      Always `image_file`.

      - `"image_file"`

  - `class ImageURLContentBlock: …`

    References an image URL in the content of a message.

    - `image_url: ImageURL`

      - `url: str`

        The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

      - `detail: Optional[Literal["auto", "low", "high"]]`

        Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

        - `"auto"`

        - `"low"`

        - `"high"`

    - `type: Literal["image_url"]`

      The type of the content part.

      - `"image_url"`

  - `class TextContentBlock: …`

    The text content that is part of a message.

    - `text: Text`

      - `annotations: List[Annotation]`

        - `class FileCitationAnnotation: …`

          A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

          - `end_index: int`

          - `file_citation: FileCitation`

            - `file_id: str`

              The ID of the specific File the citation is from.

          - `start_index: int`

          - `text: str`

            The text in the message content that needs to be replaced.

          - `type: Literal["file_citation"]`

            Always `file_citation`.

            - `"file_citation"`

        - `class FilePathAnnotation: …`

          A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

          - `end_index: int`

          - `file_path: FilePath`

            - `file_id: str`

              The ID of the file that was generated.

          - `start_index: int`

          - `text: str`

            The text in the message content that needs to be replaced.

          - `type: Literal["file_path"]`

            Always `file_path`.

            - `"file_path"`

      - `value: str`

        The data that makes up the text.

    - `type: Literal["text"]`

      Always `text`.

      - `"text"`

  - `class RefusalContentBlock: …`

    The refusal content generated by the assistant.

    - `refusal: str`

    - `type: Literal["refusal"]`

      Always `refusal`.

      - `"refusal"`

### Message Content Delta

- `MessageContentDelta`

  References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

  - `class ImageFileDeltaBlock: …`

    References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

    - `index: int`

      The index of the content part in the message.

    - `type: Literal["image_file"]`

      Always `image_file`.

      - `"image_file"`

    - `image_file: Optional[ImageFileDelta]`

      - `detail: Optional[Literal["auto", "low", "high"]]`

        Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

        - `"auto"`

        - `"low"`

        - `"high"`

      - `file_id: Optional[str]`

        The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

  - `class TextDeltaBlock: …`

    The text content that is part of a message.

    - `index: int`

      The index of the content part in the message.

    - `type: Literal["text"]`

      Always `text`.

      - `"text"`

    - `text: Optional[TextDelta]`

      - `annotations: Optional[List[AnnotationDelta]]`

        - `class FileCitationDeltaAnnotation: …`

          A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

          - `index: int`

            The index of the annotation in the text content part.

          - `type: Literal["file_citation"]`

            Always `file_citation`.

            - `"file_citation"`

          - `end_index: Optional[int]`

          - `file_citation: Optional[FileCitation]`

            - `file_id: Optional[str]`

              The ID of the specific File the citation is from.

            - `quote: Optional[str]`

              The specific quote in the file.

          - `start_index: Optional[int]`

          - `text: Optional[str]`

            The text in the message content that needs to be replaced.

        - `class FilePathDeltaAnnotation: …`

          A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

          - `index: int`

            The index of the annotation in the text content part.

          - `type: Literal["file_path"]`

            Always `file_path`.

            - `"file_path"`

          - `end_index: Optional[int]`

          - `file_path: Optional[FilePath]`

            - `file_id: Optional[str]`

              The ID of the file that was generated.

          - `start_index: Optional[int]`

          - `text: Optional[str]`

            The text in the message content that needs to be replaced.

      - `value: Optional[str]`

        The data that makes up the text.

  - `class RefusalDeltaBlock: …`

    The refusal content that is part of a message.

    - `index: int`

      The index of the refusal part in the message.

    - `type: Literal["refusal"]`

      Always `refusal`.

      - `"refusal"`

    - `refusal: Optional[str]`

  - `class ImageURLDeltaBlock: …`

    References an image URL in the content of a message.

    - `index: int`

      The index of the content part in the message.

    - `type: Literal["image_url"]`

      Always `image_url`.

      - `"image_url"`

    - `image_url: Optional[ImageURLDelta]`

      - `detail: Optional[Literal["auto", "low", "high"]]`

        Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

        - `"auto"`

        - `"low"`

        - `"high"`

      - `url: Optional[str]`

        The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

### Message Content Part Param

- `MessageContentPartParam`

  References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

  - `class ImageFileContentBlock: …`

    References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

    - `image_file: ImageFile`

      - `file_id: str`

        The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

      - `detail: Optional[Literal["auto", "low", "high"]]`

        Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

        - `"auto"`

        - `"low"`

        - `"high"`

    - `type: Literal["image_file"]`

      Always `image_file`.

      - `"image_file"`

  - `class ImageURLContentBlock: …`

    References an image URL in the content of a message.

    - `image_url: ImageURL`

      - `url: str`

        The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

      - `detail: Optional[Literal["auto", "low", "high"]]`

        Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

        - `"auto"`

        - `"low"`

        - `"high"`

    - `type: Literal["image_url"]`

      The type of the content part.

      - `"image_url"`

  - `class TextContentBlockParam: …`

    The text content that is part of a message.

    - `text: str`

      Text content to be sent to the model

    - `type: Literal["text"]`

      Always `text`.

      - `"text"`

### Message Deleted

- `class MessageDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["thread.message.deleted"]`

    - `"thread.message.deleted"`

### Message Delta

- `class MessageDelta: …`

  The delta containing the fields that have changed on the Message.

  - `content: Optional[List[MessageContentDelta]]`

    The content of the message in array of text and/or images.

    - `class ImageFileDeltaBlock: …`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `index: int`

        The index of the content part in the message.

      - `type: Literal["image_file"]`

        Always `image_file`.

        - `"image_file"`

      - `image_file: Optional[ImageFileDelta]`

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

        - `file_id: Optional[str]`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

    - `class TextDeltaBlock: …`

      The text content that is part of a message.

      - `index: int`

        The index of the content part in the message.

      - `type: Literal["text"]`

        Always `text`.

        - `"text"`

      - `text: Optional[TextDelta]`

        - `annotations: Optional[List[AnnotationDelta]]`

          - `class FileCitationDeltaAnnotation: …`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `index: int`

              The index of the annotation in the text content part.

            - `type: Literal["file_citation"]`

              Always `file_citation`.

              - `"file_citation"`

            - `end_index: Optional[int]`

            - `file_citation: Optional[FileCitation]`

              - `file_id: Optional[str]`

                The ID of the specific File the citation is from.

              - `quote: Optional[str]`

                The specific quote in the file.

            - `start_index: Optional[int]`

            - `text: Optional[str]`

              The text in the message content that needs to be replaced.

          - `class FilePathDeltaAnnotation: …`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `index: int`

              The index of the annotation in the text content part.

            - `type: Literal["file_path"]`

              Always `file_path`.

              - `"file_path"`

            - `end_index: Optional[int]`

            - `file_path: Optional[FilePath]`

              - `file_id: Optional[str]`

                The ID of the file that was generated.

            - `start_index: Optional[int]`

            - `text: Optional[str]`

              The text in the message content that needs to be replaced.

        - `value: Optional[str]`

          The data that makes up the text.

    - `class RefusalDeltaBlock: …`

      The refusal content that is part of a message.

      - `index: int`

        The index of the refusal part in the message.

      - `type: Literal["refusal"]`

        Always `refusal`.

        - `"refusal"`

      - `refusal: Optional[str]`

    - `class ImageURLDeltaBlock: …`

      References an image URL in the content of a message.

      - `index: int`

        The index of the content part in the message.

      - `type: Literal["image_url"]`

        Always `image_url`.

        - `"image_url"`

      - `image_url: Optional[ImageURLDelta]`

        - `detail: Optional[Literal["auto", "low", "high"]]`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

        - `url: Optional[str]`

          The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

  - `role: Optional[Literal["user", "assistant"]]`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

### Message Delta Event

- `class MessageDeltaEvent: …`

  Represents a message delta i.e. any changed fields on a message during streaming.

  - `id: str`

    The identifier of the message, which can be referenced in API endpoints.

  - `delta: MessageDelta`

    The delta containing the fields that have changed on the Message.

    - `content: Optional[List[MessageContentDelta]]`

      The content of the message in array of text and/or images.

      - `class ImageFileDeltaBlock: …`

        References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

        - `index: int`

          The index of the content part in the message.

        - `type: Literal["image_file"]`

          Always `image_file`.

          - `"image_file"`

        - `image_file: Optional[ImageFileDelta]`

          - `detail: Optional[Literal["auto", "low", "high"]]`

            Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

            - `"auto"`

            - `"low"`

            - `"high"`

          - `file_id: Optional[str]`

            The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

      - `class TextDeltaBlock: …`

        The text content that is part of a message.

        - `index: int`

          The index of the content part in the message.

        - `type: Literal["text"]`

          Always `text`.

          - `"text"`

        - `text: Optional[TextDelta]`

          - `annotations: Optional[List[AnnotationDelta]]`

            - `class FileCitationDeltaAnnotation: …`

              A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

              - `index: int`

                The index of the annotation in the text content part.

              - `type: Literal["file_citation"]`

                Always `file_citation`.

                - `"file_citation"`

              - `end_index: Optional[int]`

              - `file_citation: Optional[FileCitation]`

                - `file_id: Optional[str]`

                  The ID of the specific File the citation is from.

                - `quote: Optional[str]`

                  The specific quote in the file.

              - `start_index: Optional[int]`

              - `text: Optional[str]`

                The text in the message content that needs to be replaced.

            - `class FilePathDeltaAnnotation: …`

              A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

              - `index: int`

                The index of the annotation in the text content part.

              - `type: Literal["file_path"]`

                Always `file_path`.

                - `"file_path"`

              - `end_index: Optional[int]`

              - `file_path: Optional[FilePath]`

                - `file_id: Optional[str]`

                  The ID of the file that was generated.

              - `start_index: Optional[int]`

              - `text: Optional[str]`

                The text in the message content that needs to be replaced.

          - `value: Optional[str]`

            The data that makes up the text.

      - `class RefusalDeltaBlock: …`

        The refusal content that is part of a message.

        - `index: int`

          The index of the refusal part in the message.

        - `type: Literal["refusal"]`

          Always `refusal`.

          - `"refusal"`

        - `refusal: Optional[str]`

      - `class ImageURLDeltaBlock: …`

        References an image URL in the content of a message.

        - `index: int`

          The index of the content part in the message.

        - `type: Literal["image_url"]`

          Always `image_url`.

          - `"image_url"`

        - `image_url: Optional[ImageURLDelta]`

          - `detail: Optional[Literal["auto", "low", "high"]]`

            Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

            - `"auto"`

            - `"low"`

            - `"high"`

          - `url: Optional[str]`

            The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

    - `role: Optional[Literal["user", "assistant"]]`

      The entity that produced the message. One of `user` or `assistant`.

      - `"user"`

      - `"assistant"`

  - `object: Literal["thread.message.delta"]`

    The object type, which is always `thread.message.delta`.

    - `"thread.message.delta"`

### Refusal Content Block

- `class RefusalContentBlock: …`

  The refusal content generated by the assistant.

  - `refusal: str`

  - `type: Literal["refusal"]`

    Always `refusal`.

    - `"refusal"`

### Refusal Delta Block

- `class RefusalDeltaBlock: …`

  The refusal content that is part of a message.

  - `index: int`

    The index of the refusal part in the message.

  - `type: Literal["refusal"]`

    Always `refusal`.

    - `"refusal"`

  - `refusal: Optional[str]`

### Text

- `class Text: …`

  - `annotations: List[Annotation]`

    - `class FileCitationAnnotation: …`

      A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

      - `end_index: int`

      - `file_citation: FileCitation`

        - `file_id: str`

          The ID of the specific File the citation is from.

      - `start_index: int`

      - `text: str`

        The text in the message content that needs to be replaced.

      - `type: Literal["file_citation"]`

        Always `file_citation`.

        - `"file_citation"`

    - `class FilePathAnnotation: …`

      A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

      - `end_index: int`

      - `file_path: FilePath`

        - `file_id: str`

          The ID of the file that was generated.

      - `start_index: int`

      - `text: str`

        The text in the message content that needs to be replaced.

      - `type: Literal["file_path"]`

        Always `file_path`.

        - `"file_path"`

  - `value: str`

    The data that makes up the text.

### Text Content Block

- `class TextContentBlock: …`

  The text content that is part of a message.

  - `text: Text`

    - `annotations: List[Annotation]`

      - `class FileCitationAnnotation: …`

        A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

        - `end_index: int`

        - `file_citation: FileCitation`

          - `file_id: str`

            The ID of the specific File the citation is from.

        - `start_index: int`

        - `text: str`

          The text in the message content that needs to be replaced.

        - `type: Literal["file_citation"]`

          Always `file_citation`.

          - `"file_citation"`

      - `class FilePathAnnotation: …`

        A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

        - `end_index: int`

        - `file_path: FilePath`

          - `file_id: str`

            The ID of the file that was generated.

        - `start_index: int`

        - `text: str`

          The text in the message content that needs to be replaced.

        - `type: Literal["file_path"]`

          Always `file_path`.

          - `"file_path"`

    - `value: str`

      The data that makes up the text.

  - `type: Literal["text"]`

    Always `text`.

    - `"text"`

### Text Content Block Param

- `class TextContentBlockParam: …`

  The text content that is part of a message.

  - `text: str`

    Text content to be sent to the model

  - `type: Literal["text"]`

    Always `text`.

    - `"text"`

### Text Delta

- `class TextDelta: …`

  - `annotations: Optional[List[AnnotationDelta]]`

    - `class FileCitationDeltaAnnotation: …`

      A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

      - `index: int`

        The index of the annotation in the text content part.

      - `type: Literal["file_citation"]`

        Always `file_citation`.

        - `"file_citation"`

      - `end_index: Optional[int]`

      - `file_citation: Optional[FileCitation]`

        - `file_id: Optional[str]`

          The ID of the specific File the citation is from.

        - `quote: Optional[str]`

          The specific quote in the file.

      - `start_index: Optional[int]`

      - `text: Optional[str]`

        The text in the message content that needs to be replaced.

    - `class FilePathDeltaAnnotation: …`

      A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

      - `index: int`

        The index of the annotation in the text content part.

      - `type: Literal["file_path"]`

        Always `file_path`.

        - `"file_path"`

      - `end_index: Optional[int]`

      - `file_path: Optional[FilePath]`

        - `file_id: Optional[str]`

          The ID of the file that was generated.

      - `start_index: Optional[int]`

      - `text: Optional[str]`

        The text in the message content that needs to be replaced.

  - `value: Optional[str]`

    The data that makes up the text.

### Text Delta Block

- `class TextDeltaBlock: …`

  The text content that is part of a message.

  - `index: int`

    The index of the content part in the message.

  - `type: Literal["text"]`

    Always `text`.

    - `"text"`

  - `text: Optional[TextDelta]`

    - `annotations: Optional[List[AnnotationDelta]]`

      - `class FileCitationDeltaAnnotation: …`

        A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

        - `index: int`

          The index of the annotation in the text content part.

        - `type: Literal["file_citation"]`

          Always `file_citation`.

          - `"file_citation"`

        - `end_index: Optional[int]`

        - `file_citation: Optional[FileCitation]`

          - `file_id: Optional[str]`

            The ID of the specific File the citation is from.

          - `quote: Optional[str]`

            The specific quote in the file.

        - `start_index: Optional[int]`

        - `text: Optional[str]`

          The text in the message content that needs to be replaced.

      - `class FilePathDeltaAnnotation: …`

        A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

        - `index: int`

          The index of the annotation in the text content part.

        - `type: Literal["file_path"]`

          Always `file_path`.

          - `"file_path"`

        - `end_index: Optional[int]`

        - `file_path: Optional[FilePath]`

          - `file_id: Optional[str]`

            The ID of the file that was generated.

        - `start_index: Optional[int]`

        - `text: Optional[str]`

          The text in the message content that needs to be replaced.

    - `value: Optional[str]`

      The data that makes up the text.
