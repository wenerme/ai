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
