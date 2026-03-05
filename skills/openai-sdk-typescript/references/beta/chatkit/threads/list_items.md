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
