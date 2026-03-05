# Threads

## List Items

`client.beta.chatkit.threads.listItems(stringthreadID, ThreadListItemsParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ChatKitThreadUserMessageItem | ChatKitThreadAssistantMessageItem | ChatKitWidgetItem | 3 more>`

**get** `/chatkit/threads/{thread_id}/items`

List items that belong to a ChatKit thread.

### Parameters

- `threadID: string`

- `query: ThreadListItemsParams`

  - `after?: string`

    List items created after this thread item ID. Defaults to null for the first page.

  - `before?: string`

    List items created before this thread item ID. Defaults to null for the newest results.

  - `limit?: number`

    Maximum number of thread items to return. Defaults to 20.

  - `order?: "asc" | "desc"`

    Sort order for results by creation time. Defaults to `desc`.

    - `"asc"`

    - `"desc"`

### Returns

- `Data = ChatKitThreadUserMessageItem | ChatKitThreadAssistantMessageItem | ChatKitWidgetItem | 3 more`

  User-authored messages within a thread.

  - `ChatKitThreadUserMessageItem`

    User-authored messages within a thread.

    - `id: string`

      Identifier of the thread item.

    - `attachments: Array<ChatKitAttachment>`

      Attachments associated with the user message. Defaults to an empty list.

      - `id: string`

        Identifier for the attachment.

      - `mime_type: string`

        MIME type of the attachment.

      - `name: string`

        Original display name for the attachment.

      - `preview_url: string | null`

        Preview URL for rendering the attachment inline.

      - `type: "image" | "file"`

        Attachment discriminator.

        - `"image"`

        - `"file"`

    - `content: Array<InputText | QuotedText>`

      Ordered content elements supplied by the user.

      - `InputText`

        Text block that a user contributed to the thread.

        - `text: string`

          Plain-text content supplied by the user.

        - `type: "input_text"`

          Type discriminator that is always `input_text`.

          - `"input_text"`

      - `QuotedText`

        Quoted snippet that the user referenced in their message.

        - `text: string`

          Quoted text content.

        - `type: "quoted_text"`

          Type discriminator that is always `quoted_text`.

          - `"quoted_text"`

    - `created_at: number`

      Unix timestamp (in seconds) for when the item was created.

    - `inference_options: InferenceOptions | null`

      Inference overrides applied to the message. Defaults to null when unset.

      - `model: string | null`

        Model name that generated the response. Defaults to null when using the session default.

      - `tool_choice: ToolChoice | null`

        Preferred tool to invoke. Defaults to null when ChatKit should auto-select.

        - `id: string`

          Identifier of the requested tool.

    - `object: "chatkit.thread_item"`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `thread_id: string`

      Identifier of the parent thread.

    - `type: "chatkit.user_message"`

      - `"chatkit.user_message"`

  - `ChatKitThreadAssistantMessageItem`

    Assistant-authored message within a thread.

    - `id: string`

      Identifier of the thread item.

    - `content: Array<ChatKitResponseOutputText>`

      Ordered assistant response segments.

      - `annotations: Array<File | URL>`

        Ordered list of annotations attached to the response text.

        - `File`

          Annotation that references an uploaded file.

          - `source: Source`

            File attachment referenced by the annotation.

            - `filename: string`

              Filename referenced by the annotation.

            - `type: "file"`

              Type discriminator that is always `file`.

              - `"file"`

          - `type: "file"`

            Type discriminator that is always `file` for this annotation.

            - `"file"`

        - `URL`

          Annotation that references a URL.

          - `source: Source`

            URL referenced by the annotation.

            - `type: "url"`

              Type discriminator that is always `url`.

              - `"url"`

            - `url: string`

              URL referenced by the annotation.

          - `type: "url"`

            Type discriminator that is always `url` for this annotation.

            - `"url"`

      - `text: string`

        Assistant generated text.

      - `type: "output_text"`

        Type discriminator that is always `output_text`.

        - `"output_text"`

    - `created_at: number`

      Unix timestamp (in seconds) for when the item was created.

    - `object: "chatkit.thread_item"`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `thread_id: string`

      Identifier of the parent thread.

    - `type: "chatkit.assistant_message"`

      Type discriminator that is always `chatkit.assistant_message`.

      - `"chatkit.assistant_message"`

  - `ChatKitWidgetItem`

    Thread item that renders a widget payload.

    - `id: string`

      Identifier of the thread item.

    - `created_at: number`

      Unix timestamp (in seconds) for when the item was created.

    - `object: "chatkit.thread_item"`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `thread_id: string`

      Identifier of the parent thread.

    - `type: "chatkit.widget"`

      Type discriminator that is always `chatkit.widget`.

      - `"chatkit.widget"`

    - `widget: string`

      Serialized widget payload rendered in the UI.

  - `ChatKitClientToolCall`

    Record of a client side tool invocation initiated by the assistant.

    - `id: string`

      Identifier of the thread item.

    - `arguments: string`

      JSON-encoded arguments that were sent to the tool.

    - `call_id: string`

      Identifier for the client tool call.

    - `created_at: number`

      Unix timestamp (in seconds) for when the item was created.

    - `name: string`

      Tool name that was invoked.

    - `object: "chatkit.thread_item"`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `output: string | null`

      JSON-encoded output captured from the tool. Defaults to null while execution is in progress.

    - `status: "in_progress" | "completed"`

      Execution status for the tool call.

      - `"in_progress"`

      - `"completed"`

    - `thread_id: string`

      Identifier of the parent thread.

    - `type: "chatkit.client_tool_call"`

      Type discriminator that is always `chatkit.client_tool_call`.

      - `"chatkit.client_tool_call"`

  - `ChatKitTask`

    Task emitted by the workflow to show progress and status updates.

    - `id: string`

      Identifier of the thread item.

    - `created_at: number`

      Unix timestamp (in seconds) for when the item was created.

    - `heading: string | null`

      Optional heading for the task. Defaults to null when not provided.

    - `object: "chatkit.thread_item"`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `summary: string | null`

      Optional summary that describes the task. Defaults to null when omitted.

    - `task_type: "custom" | "thought"`

      Subtype for the task.

      - `"custom"`

      - `"thought"`

    - `thread_id: string`

      Identifier of the parent thread.

    - `type: "chatkit.task"`

      Type discriminator that is always `chatkit.task`.

      - `"chatkit.task"`

  - `ChatKitTaskGroup`

    Collection of workflow tasks grouped together in the thread.

    - `id: string`

      Identifier of the thread item.

    - `created_at: number`

      Unix timestamp (in seconds) for when the item was created.

    - `object: "chatkit.thread_item"`

      Type discriminator that is always `chatkit.thread_item`.

      - `"chatkit.thread_item"`

    - `tasks: Array<Task>`

      Tasks included in the group.

      - `heading: string | null`

        Optional heading for the grouped task. Defaults to null when not provided.

      - `summary: string | null`

        Optional summary that describes the grouped task. Defaults to null when omitted.

      - `type: "custom" | "thought"`

        Subtype for the grouped task.

        - `"custom"`

        - `"thought"`

    - `thread_id: string`

      Identifier of the parent thread.

    - `type: "chatkit.task_group"`

      Type discriminator that is always `chatkit.task_group`.

      - `"chatkit.task_group"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const thread of client.beta.chatkit.threads.listItems('cthr_123')) {
  console.log(thread);
}
```

## Retrieve

`client.beta.chatkit.threads.retrieve(stringthreadID, RequestOptionsoptions?): ChatKitThread`

**get** `/chatkit/threads/{thread_id}`

Retrieve a ChatKit thread by its identifier.

### Parameters

- `threadID: string`

### Returns

- `ChatKitThread`

  Represents a ChatKit thread and its current status.

  - `id: string`

    Identifier of the thread.

  - `created_at: number`

    Unix timestamp (in seconds) for when the thread was created.

  - `object: "chatkit.thread"`

    Type discriminator that is always `chatkit.thread`.

    - `"chatkit.thread"`

  - `status: Active | Locked | Closed`

    Current status for the thread. Defaults to `active` for newly created threads.

    - `Active`

      Indicates that a thread is active.

      - `type: "active"`

        Status discriminator that is always `active`.

        - `"active"`

    - `Locked`

      Indicates that a thread is locked and cannot accept new input.

      - `reason: string | null`

        Reason that the thread was locked. Defaults to null when no reason is recorded.

      - `type: "locked"`

        Status discriminator that is always `locked`.

        - `"locked"`

    - `Closed`

      Indicates that a thread has been closed.

      - `reason: string | null`

        Reason that the thread was closed. Defaults to null when no reason is recorded.

      - `type: "closed"`

        Status discriminator that is always `closed`.

        - `"closed"`

  - `title: string | null`

    Optional human-readable title for the thread. Defaults to null when no title has been generated.

  - `user: string`

    Free-form string that identifies your end user who owns the thread.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const chatkitThread = await client.beta.chatkit.threads.retrieve('cthr_123');

console.log(chatkitThread.id);
```

## Delete

`client.beta.chatkit.threads.delete(stringthreadID, RequestOptionsoptions?): ThreadDeleteResponse`

**delete** `/chatkit/threads/{thread_id}`

Delete a ChatKit thread along with its items and stored attachments.

### Parameters

- `threadID: string`

### Returns

- `ThreadDeleteResponse`

  Confirmation payload returned after deleting a thread.

  - `id: string`

    Identifier of the deleted thread.

  - `deleted: boolean`

    Indicates that the thread has been deleted.

  - `object: "chatkit.thread.deleted"`

    Type discriminator that is always `chatkit.thread.deleted`.

    - `"chatkit.thread.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const thread = await client.beta.chatkit.threads.delete('cthr_123');

console.log(thread.id);
```

## List

`client.beta.chatkit.threads.list(ThreadListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ChatKitThread>`

**get** `/chatkit/threads`

List ChatKit threads with optional pagination and user filters.

### Parameters

- `query: ThreadListParams`

  - `after?: string`

    List items created after this thread item ID. Defaults to null for the first page.

  - `before?: string`

    List items created before this thread item ID. Defaults to null for the newest results.

  - `limit?: number`

    Maximum number of thread items to return. Defaults to 20.

  - `order?: "asc" | "desc"`

    Sort order for results by creation time. Defaults to `desc`.

    - `"asc"`

    - `"desc"`

  - `user?: string`

    Filter threads that belong to this user identifier. Defaults to null to return all users.

### Returns

- `ChatKitThread`

  Represents a ChatKit thread and its current status.

  - `id: string`

    Identifier of the thread.

  - `created_at: number`

    Unix timestamp (in seconds) for when the thread was created.

  - `object: "chatkit.thread"`

    Type discriminator that is always `chatkit.thread`.

    - `"chatkit.thread"`

  - `status: Active | Locked | Closed`

    Current status for the thread. Defaults to `active` for newly created threads.

    - `Active`

      Indicates that a thread is active.

      - `type: "active"`

        Status discriminator that is always `active`.

        - `"active"`

    - `Locked`

      Indicates that a thread is locked and cannot accept new input.

      - `reason: string | null`

        Reason that the thread was locked. Defaults to null when no reason is recorded.

      - `type: "locked"`

        Status discriminator that is always `locked`.

        - `"locked"`

    - `Closed`

      Indicates that a thread has been closed.

      - `reason: string | null`

        Reason that the thread was closed. Defaults to null when no reason is recorded.

      - `type: "closed"`

        Status discriminator that is always `closed`.

        - `"closed"`

  - `title: string | null`

    Optional human-readable title for the thread. Defaults to null when no title has been generated.

  - `user: string`

    Free-form string that identifies your end user who owns the thread.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const chatkitThread of client.beta.chatkit.threads.list()) {
  console.log(chatkitThread.id);
}
```

## Domain Types

### Chat Session

- `ChatSession`

  Represents a ChatKit session and its resolved configuration.

  - `id: string`

    Identifier for the ChatKit session.

  - `chatkit_configuration: ChatSessionChatKitConfiguration`

    Resolved ChatKit feature configuration for the session.

    - `automatic_thread_titling: ChatSessionAutomaticThreadTitling`

      Automatic thread titling preferences.

      - `enabled: boolean`

        Whether automatic thread titling is enabled.

    - `file_upload: ChatSessionFileUpload`

      Upload settings for the session.

      - `enabled: boolean`

        Indicates if uploads are enabled for the session.

      - `max_file_size: number | null`

        Maximum upload size in megabytes.

      - `max_files: number | null`

        Maximum number of uploads allowed during the session.

    - `history: ChatSessionHistory`

      History retention configuration.

      - `enabled: boolean`

        Indicates if chat history is persisted for the session.

      - `recent_threads: number | null`

        Number of prior threads surfaced in history views. Defaults to null when all history is retained.

  - `client_secret: string`

    Ephemeral client secret that authenticates session requests.

  - `expires_at: number`

    Unix timestamp (in seconds) for when the session expires.

  - `max_requests_per_1_minute: number`

    Convenience copy of the per-minute request limit.

  - `object: "chatkit.session"`

    Type discriminator that is always `chatkit.session`.

    - `"chatkit.session"`

  - `rate_limits: ChatSessionRateLimits`

    Resolved rate limit values.

    - `max_requests_per_1_minute: number`

      Maximum allowed requests per one-minute window.

  - `status: ChatSessionStatus`

    Current lifecycle state of the session.

    - `"active"`

    - `"expired"`

    - `"cancelled"`

  - `user: string`

    User identifier associated with the session.

  - `workflow: ChatKitWorkflow`

    Workflow metadata for the session.

    - `id: string`

      Identifier of the workflow backing the session.

    - `state_variables: Record<string, string | boolean | number> | null`

      State variable key-value pairs applied when invoking the workflow. Defaults to null when no overrides were provided.

      - `string`

      - `boolean`

      - `number`

    - `tracing: Tracing`

      Tracing settings applied to the workflow.

      - `enabled: boolean`

        Indicates whether tracing is enabled.

    - `version: string | null`

      Specific workflow version used for the session. Defaults to null when using the latest deployment.

### Chat Session Automatic Thread Titling

- `ChatSessionAutomaticThreadTitling`

  Automatic thread title preferences for the session.

  - `enabled: boolean`

    Whether automatic thread titling is enabled.

### Chat Session ChatKit Configuration

- `ChatSessionChatKitConfiguration`

  ChatKit configuration for the session.

  - `automatic_thread_titling: ChatSessionAutomaticThreadTitling`

    Automatic thread titling preferences.

    - `enabled: boolean`

      Whether automatic thread titling is enabled.

  - `file_upload: ChatSessionFileUpload`

    Upload settings for the session.

    - `enabled: boolean`

      Indicates if uploads are enabled for the session.

    - `max_file_size: number | null`

      Maximum upload size in megabytes.

    - `max_files: number | null`

      Maximum number of uploads allowed during the session.

  - `history: ChatSessionHistory`

    History retention configuration.

    - `enabled: boolean`

      Indicates if chat history is persisted for the session.

    - `recent_threads: number | null`

      Number of prior threads surfaced in history views. Defaults to null when all history is retained.

### Chat Session ChatKit Configuration Param

- `ChatSessionChatKitConfigurationParam`

  Optional per-session configuration settings for ChatKit behavior.

  - `automatic_thread_titling?: AutomaticThreadTitling`

    Configuration for automatic thread titling. When omitted, automatic thread titling is enabled by default.

    - `enabled?: boolean`

      Enable automatic thread title generation. Defaults to true.

  - `file_upload?: FileUpload`

    Configuration for upload enablement and limits. When omitted, uploads are disabled by default (max_files 10, max_file_size 512 MB).

    - `enabled?: boolean`

      Enable uploads for this session. Defaults to false.

    - `max_file_size?: number`

      Maximum size in megabytes for each uploaded file. Defaults to 512 MB, which is the maximum allowable size.

    - `max_files?: number`

      Maximum number of files that can be uploaded to the session. Defaults to 10.

  - `history?: History`

    Configuration for chat history retention. When omitted, history is enabled by default with no limit on recent_threads (null).

    - `enabled?: boolean`

      Enables chat users to access previous ChatKit threads. Defaults to true.

    - `recent_threads?: number`

      Number of recent ChatKit threads users have access to. Defaults to unlimited when unset.

### Chat Session Expires After Param

- `ChatSessionExpiresAfterParam`

  Controls when the session expires relative to an anchor timestamp.

  - `anchor: "created_at"`

    Base timestamp used to calculate expiration. Currently fixed to `created_at`.

    - `"created_at"`

  - `seconds: number`

    Number of seconds after the anchor when the session expires.

### Chat Session File Upload

- `ChatSessionFileUpload`

  Upload permissions and limits applied to the session.

  - `enabled: boolean`

    Indicates if uploads are enabled for the session.

  - `max_file_size: number | null`

    Maximum upload size in megabytes.

  - `max_files: number | null`

    Maximum number of uploads allowed during the session.

### Chat Session History

- `ChatSessionHistory`

  History retention preferences returned for the session.

  - `enabled: boolean`

    Indicates if chat history is persisted for the session.

  - `recent_threads: number | null`

    Number of prior threads surfaced in history views. Defaults to null when all history is retained.

### Chat Session Rate Limits

- `ChatSessionRateLimits`

  Active per-minute request limit for the session.

  - `max_requests_per_1_minute: number`

    Maximum allowed requests per one-minute window.

### Chat Session Rate Limits Param

- `ChatSessionRateLimitsParam`

  Controls request rate limits for the session.

  - `max_requests_per_1_minute?: number`

    Maximum number of requests allowed per minute for the session. Defaults to 10.

### Chat Session Status

- `ChatSessionStatus = "active" | "expired" | "cancelled"`

  - `"active"`

  - `"expired"`

  - `"cancelled"`

### Chat Session Workflow Param

- `ChatSessionWorkflowParam`

  Workflow reference and overrides applied to the chat session.

  - `id: string`

    Identifier for the workflow invoked by the session.

  - `state_variables?: Record<string, string | boolean | number>`

    State variables forwarded to the workflow. Keys may be up to 64 characters, values must be primitive types, and the map defaults to an empty object.

    - `string`

    - `boolean`

    - `number`

  - `tracing?: Tracing`

    Optional tracing overrides for the workflow invocation. When omitted, tracing is enabled by default.

    - `enabled?: boolean`

      Whether tracing is enabled during the session. Defaults to true.

  - `version?: string`

    Specific workflow version to run. Defaults to the latest deployed version.

### ChatKit Attachment

- `ChatKitAttachment`

  Attachment metadata included on thread items.

  - `id: string`

    Identifier for the attachment.

  - `mime_type: string`

    MIME type of the attachment.

  - `name: string`

    Original display name for the attachment.

  - `preview_url: string | null`

    Preview URL for rendering the attachment inline.

  - `type: "image" | "file"`

    Attachment discriminator.

    - `"image"`

    - `"file"`

### ChatKit Response Output Text

- `ChatKitResponseOutputText`

  Assistant response text accompanied by optional annotations.

  - `annotations: Array<File | URL>`

    Ordered list of annotations attached to the response text.

    - `File`

      Annotation that references an uploaded file.

      - `source: Source`

        File attachment referenced by the annotation.

        - `filename: string`

          Filename referenced by the annotation.

        - `type: "file"`

          Type discriminator that is always `file`.

          - `"file"`

      - `type: "file"`

        Type discriminator that is always `file` for this annotation.

        - `"file"`

    - `URL`

      Annotation that references a URL.

      - `source: Source`

        URL referenced by the annotation.

        - `type: "url"`

          Type discriminator that is always `url`.

          - `"url"`

        - `url: string`

          URL referenced by the annotation.

      - `type: "url"`

        Type discriminator that is always `url` for this annotation.

        - `"url"`

  - `text: string`

    Assistant generated text.

  - `type: "output_text"`

    Type discriminator that is always `output_text`.

    - `"output_text"`

### ChatKit Thread

- `ChatKitThread`

  Represents a ChatKit thread and its current status.

  - `id: string`

    Identifier of the thread.

  - `created_at: number`

    Unix timestamp (in seconds) for when the thread was created.

  - `object: "chatkit.thread"`

    Type discriminator that is always `chatkit.thread`.

    - `"chatkit.thread"`

  - `status: Active | Locked | Closed`

    Current status for the thread. Defaults to `active` for newly created threads.

    - `Active`

      Indicates that a thread is active.

      - `type: "active"`

        Status discriminator that is always `active`.

        - `"active"`

    - `Locked`

      Indicates that a thread is locked and cannot accept new input.

      - `reason: string | null`

        Reason that the thread was locked. Defaults to null when no reason is recorded.

      - `type: "locked"`

        Status discriminator that is always `locked`.

        - `"locked"`

    - `Closed`

      Indicates that a thread has been closed.

      - `reason: string | null`

        Reason that the thread was closed. Defaults to null when no reason is recorded.

      - `type: "closed"`

        Status discriminator that is always `closed`.

        - `"closed"`

  - `title: string | null`

    Optional human-readable title for the thread. Defaults to null when no title has been generated.

  - `user: string`

    Free-form string that identifies your end user who owns the thread.

### ChatKit Thread Assistant Message Item

- `ChatKitThreadAssistantMessageItem`

  Assistant-authored message within a thread.

  - `id: string`

    Identifier of the thread item.

  - `content: Array<ChatKitResponseOutputText>`

    Ordered assistant response segments.

    - `annotations: Array<File | URL>`

      Ordered list of annotations attached to the response text.

      - `File`

        Annotation that references an uploaded file.

        - `source: Source`

          File attachment referenced by the annotation.

          - `filename: string`

            Filename referenced by the annotation.

          - `type: "file"`

            Type discriminator that is always `file`.

            - `"file"`

        - `type: "file"`

          Type discriminator that is always `file` for this annotation.

          - `"file"`

      - `URL`

        Annotation that references a URL.

        - `source: Source`

          URL referenced by the annotation.

          - `type: "url"`

            Type discriminator that is always `url`.

            - `"url"`

          - `url: string`

            URL referenced by the annotation.

        - `type: "url"`

          Type discriminator that is always `url` for this annotation.

          - `"url"`

    - `text: string`

      Assistant generated text.

    - `type: "output_text"`

      Type discriminator that is always `output_text`.

      - `"output_text"`

  - `created_at: number`

    Unix timestamp (in seconds) for when the item was created.

  - `object: "chatkit.thread_item"`

    Type discriminator that is always `chatkit.thread_item`.

    - `"chatkit.thread_item"`

  - `thread_id: string`

    Identifier of the parent thread.

  - `type: "chatkit.assistant_message"`

    Type discriminator that is always `chatkit.assistant_message`.

    - `"chatkit.assistant_message"`

### ChatKit Thread Item List

- `ChatKitThreadItemList`

  A paginated list of thread items rendered for the ChatKit API.

  - `data: Array<ChatKitThreadUserMessageItem | ChatKitThreadAssistantMessageItem | ChatKitWidgetItem | 3 more>`

    A list of items

    - `ChatKitThreadUserMessageItem`

      User-authored messages within a thread.

      - `id: string`

        Identifier of the thread item.

      - `attachments: Array<ChatKitAttachment>`

        Attachments associated with the user message. Defaults to an empty list.

        - `id: string`

          Identifier for the attachment.

        - `mime_type: string`

          MIME type of the attachment.

        - `name: string`

          Original display name for the attachment.

        - `preview_url: string | null`

          Preview URL for rendering the attachment inline.

        - `type: "image" | "file"`

          Attachment discriminator.

          - `"image"`

          - `"file"`

      - `content: Array<InputText | QuotedText>`

        Ordered content elements supplied by the user.

        - `InputText`

          Text block that a user contributed to the thread.

          - `text: string`

            Plain-text content supplied by the user.

          - `type: "input_text"`

            Type discriminator that is always `input_text`.

            - `"input_text"`

        - `QuotedText`

          Quoted snippet that the user referenced in their message.

          - `text: string`

            Quoted text content.

          - `type: "quoted_text"`

            Type discriminator that is always `quoted_text`.

            - `"quoted_text"`

      - `created_at: number`

        Unix timestamp (in seconds) for when the item was created.

      - `inference_options: InferenceOptions | null`

        Inference overrides applied to the message. Defaults to null when unset.

        - `model: string | null`

          Model name that generated the response. Defaults to null when using the session default.

        - `tool_choice: ToolChoice | null`

          Preferred tool to invoke. Defaults to null when ChatKit should auto-select.

          - `id: string`

            Identifier of the requested tool.

      - `object: "chatkit.thread_item"`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `thread_id: string`

        Identifier of the parent thread.

      - `type: "chatkit.user_message"`

        - `"chatkit.user_message"`

    - `ChatKitThreadAssistantMessageItem`

      Assistant-authored message within a thread.

      - `id: string`

        Identifier of the thread item.

      - `content: Array<ChatKitResponseOutputText>`

        Ordered assistant response segments.

        - `annotations: Array<File | URL>`

          Ordered list of annotations attached to the response text.

          - `File`

            Annotation that references an uploaded file.

            - `source: Source`

              File attachment referenced by the annotation.

              - `filename: string`

                Filename referenced by the annotation.

              - `type: "file"`

                Type discriminator that is always `file`.

                - `"file"`

            - `type: "file"`

              Type discriminator that is always `file` for this annotation.

              - `"file"`

          - `URL`

            Annotation that references a URL.

            - `source: Source`

              URL referenced by the annotation.

              - `type: "url"`

                Type discriminator that is always `url`.

                - `"url"`

              - `url: string`

                URL referenced by the annotation.

            - `type: "url"`

              Type discriminator that is always `url` for this annotation.

              - `"url"`

        - `text: string`

          Assistant generated text.

        - `type: "output_text"`

          Type discriminator that is always `output_text`.

          - `"output_text"`

      - `created_at: number`

        Unix timestamp (in seconds) for when the item was created.

      - `object: "chatkit.thread_item"`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `thread_id: string`

        Identifier of the parent thread.

      - `type: "chatkit.assistant_message"`

        Type discriminator that is always `chatkit.assistant_message`.

        - `"chatkit.assistant_message"`

    - `ChatKitWidgetItem`

      Thread item that renders a widget payload.

      - `id: string`

        Identifier of the thread item.

      - `created_at: number`

        Unix timestamp (in seconds) for when the item was created.

      - `object: "chatkit.thread_item"`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `thread_id: string`

        Identifier of the parent thread.

      - `type: "chatkit.widget"`

        Type discriminator that is always `chatkit.widget`.

        - `"chatkit.widget"`

      - `widget: string`

        Serialized widget payload rendered in the UI.

    - `ChatKitClientToolCall`

      Record of a client side tool invocation initiated by the assistant.

      - `id: string`

        Identifier of the thread item.

      - `arguments: string`

        JSON-encoded arguments that were sent to the tool.

      - `call_id: string`

        Identifier for the client tool call.

      - `created_at: number`

        Unix timestamp (in seconds) for when the item was created.

      - `name: string`

        Tool name that was invoked.

      - `object: "chatkit.thread_item"`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `output: string | null`

        JSON-encoded output captured from the tool. Defaults to null while execution is in progress.

      - `status: "in_progress" | "completed"`

        Execution status for the tool call.

        - `"in_progress"`

        - `"completed"`

      - `thread_id: string`

        Identifier of the parent thread.

      - `type: "chatkit.client_tool_call"`

        Type discriminator that is always `chatkit.client_tool_call`.

        - `"chatkit.client_tool_call"`

    - `ChatKitTask`

      Task emitted by the workflow to show progress and status updates.

      - `id: string`

        Identifier of the thread item.

      - `created_at: number`

        Unix timestamp (in seconds) for when the item was created.

      - `heading: string | null`

        Optional heading for the task. Defaults to null when not provided.

      - `object: "chatkit.thread_item"`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `summary: string | null`

        Optional summary that describes the task. Defaults to null when omitted.

      - `task_type: "custom" | "thought"`

        Subtype for the task.

        - `"custom"`

        - `"thought"`

      - `thread_id: string`

        Identifier of the parent thread.

      - `type: "chatkit.task"`

        Type discriminator that is always `chatkit.task`.

        - `"chatkit.task"`

    - `ChatKitTaskGroup`

      Collection of workflow tasks grouped together in the thread.

      - `id: string`

        Identifier of the thread item.

      - `created_at: number`

        Unix timestamp (in seconds) for when the item was created.

      - `object: "chatkit.thread_item"`

        Type discriminator that is always `chatkit.thread_item`.

        - `"chatkit.thread_item"`

      - `tasks: Array<Task>`

        Tasks included in the group.

        - `heading: string | null`

          Optional heading for the grouped task. Defaults to null when not provided.

        - `summary: string | null`

          Optional summary that describes the grouped task. Defaults to null when omitted.

        - `type: "custom" | "thought"`

          Subtype for the grouped task.

          - `"custom"`

          - `"thought"`

      - `thread_id: string`

        Identifier of the parent thread.

      - `type: "chatkit.task_group"`

        Type discriminator that is always `chatkit.task_group`.

        - `"chatkit.task_group"`

  - `first_id: string | null`

    The ID of the first item in the list.

  - `has_more: boolean`

    Whether there are more items available.

  - `last_id: string | null`

    The ID of the last item in the list.

  - `object: "list"`

    The type of object returned, must be `list`.

    - `"list"`

### ChatKit Thread User Message Item

- `ChatKitThreadUserMessageItem`

  User-authored messages within a thread.

  - `id: string`

    Identifier of the thread item.

  - `attachments: Array<ChatKitAttachment>`

    Attachments associated with the user message. Defaults to an empty list.

    - `id: string`

      Identifier for the attachment.

    - `mime_type: string`

      MIME type of the attachment.

    - `name: string`

      Original display name for the attachment.

    - `preview_url: string | null`

      Preview URL for rendering the attachment inline.

    - `type: "image" | "file"`

      Attachment discriminator.

      - `"image"`

      - `"file"`

  - `content: Array<InputText | QuotedText>`

    Ordered content elements supplied by the user.

    - `InputText`

      Text block that a user contributed to the thread.

      - `text: string`

        Plain-text content supplied by the user.

      - `type: "input_text"`

        Type discriminator that is always `input_text`.

        - `"input_text"`

    - `QuotedText`

      Quoted snippet that the user referenced in their message.

      - `text: string`

        Quoted text content.

      - `type: "quoted_text"`

        Type discriminator that is always `quoted_text`.

        - `"quoted_text"`

  - `created_at: number`

    Unix timestamp (in seconds) for when the item was created.

  - `inference_options: InferenceOptions | null`

    Inference overrides applied to the message. Defaults to null when unset.

    - `model: string | null`

      Model name that generated the response. Defaults to null when using the session default.

    - `tool_choice: ToolChoice | null`

      Preferred tool to invoke. Defaults to null when ChatKit should auto-select.

      - `id: string`

        Identifier of the requested tool.

  - `object: "chatkit.thread_item"`

    Type discriminator that is always `chatkit.thread_item`.

    - `"chatkit.thread_item"`

  - `thread_id: string`

    Identifier of the parent thread.

  - `type: "chatkit.user_message"`

    - `"chatkit.user_message"`

### ChatKit Widget Item

- `ChatKitWidgetItem`

  Thread item that renders a widget payload.

  - `id: string`

    Identifier of the thread item.

  - `created_at: number`

    Unix timestamp (in seconds) for when the item was created.

  - `object: "chatkit.thread_item"`

    Type discriminator that is always `chatkit.thread_item`.

    - `"chatkit.thread_item"`

  - `thread_id: string`

    Identifier of the parent thread.

  - `type: "chatkit.widget"`

    Type discriminator that is always `chatkit.widget`.

    - `"chatkit.widget"`

  - `widget: string`

    Serialized widget payload rendered in the UI.
