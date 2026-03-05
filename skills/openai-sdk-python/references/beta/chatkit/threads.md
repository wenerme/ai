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
