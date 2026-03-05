# Messages

## List

`client.beta.threads.messages.list(stringthreadID, MessageListParamsquery?, RequestOptionsoptions?): CursorPage<Message>`

**get** `/threads/{thread_id}/messages`

Returns a list of messages for a given thread.

### Parameters

- `threadID: string`

- `query: MessageListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `before?: string`

    A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `order?: "asc" | "desc"`

    Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

  - `run_id?: string`

    Filter messages by the run ID that generated them.

### Returns

- `Message`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string | null`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Array<Attachment> | null`

    A list of files attached to the message, and the tools they were added to.

    - `file_id?: string`

      The ID of the file to attach to the message.

    - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

      The tools to add this file to.

      - `CodeInterpreterTool`

        - `type: "code_interpreter"`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `AssistantToolsFileSearchTypeOnly`

        - `type: "file_search"`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: number | null`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: Array<MessageContent>`

    The content of the message in array of text and/or images.

    - `ImageFileContentBlock`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `image_file: ImageFile`

        - `file_id: string`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_file"`

        Always `image_file`.

        - `"image_file"`

    - `ImageURLContentBlock`

      References an image URL in the content of a message.

      - `image_url: ImageURL`

        - `url: string`

          The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_url"`

        The type of the content part.

        - `"image_url"`

    - `TextContentBlock`

      The text content that is part of a message.

      - `text: Text`

        - `annotations: Array<Annotation>`

          - `FileCitationAnnotation`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `end_index: number`

            - `file_citation: FileCitation`

              - `file_id: string`

                The ID of the specific File the citation is from.

            - `start_index: number`

            - `text: string`

              The text in the message content that needs to be replaced.

            - `type: "file_citation"`

              Always `file_citation`.

              - `"file_citation"`

          - `FilePathAnnotation`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `end_index: number`

            - `file_path: FilePath`

              - `file_id: string`

                The ID of the file that was generated.

            - `start_index: number`

            - `text: string`

              The text in the message content that needs to be replaced.

            - `type: "file_path"`

              Always `file_path`.

              - `"file_path"`

        - `value: string`

          The data that makes up the text.

      - `type: "text"`

        Always `text`.

        - `"text"`

    - `RefusalContentBlock`

      The refusal content generated by the assistant.

      - `refusal: string`

      - `type: "refusal"`

        Always `refusal`.

        - `"refusal"`

  - `created_at: number`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: number | null`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: IncompleteDetails | null`

    On an incomplete message, details about why the message is incomplete.

    - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: "thread.message"`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: "user" | "assistant"`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: string | null`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: "in_progress" | "incomplete" | "completed"`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: string`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const message of client.beta.threads.messages.list('thread_id')) {
  console.log(message.id);
}
```

## Create

`client.beta.threads.messages.create(stringthreadID, MessageCreateParamsbody, RequestOptionsoptions?): Message`

**post** `/threads/{thread_id}/messages`

Create a message.

### Parameters

- `threadID: string`

- `body: MessageCreateParams`

  - `content: string | Array<MessageContentPartParam>`

    The text contents of the message.

    - `string`

    - `Array<MessageContentPartParam>`

      - `ImageFileContentBlock`

        References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

        - `image_file: ImageFile`

          - `file_id: string`

            The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

          - `detail?: "auto" | "low" | "high"`

            Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

            - `"auto"`

            - `"low"`

            - `"high"`

        - `type: "image_file"`

          Always `image_file`.

          - `"image_file"`

      - `ImageURLContentBlock`

        References an image URL in the content of a message.

        - `image_url: ImageURL`

          - `url: string`

            The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

          - `detail?: "auto" | "low" | "high"`

            Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

            - `"auto"`

            - `"low"`

            - `"high"`

        - `type: "image_url"`

          The type of the content part.

          - `"image_url"`

      - `TextContentBlockParam`

        The text content that is part of a message.

        - `text: string`

          Text content to be sent to the model

        - `type: "text"`

          Always `text`.

          - `"text"`

  - `role: "user" | "assistant"`

    The role of the entity that is creating the message. Allowed values include:

    - `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.
    - `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.

    - `"user"`

    - `"assistant"`

  - `attachments?: Array<Attachment> | null`

    A list of files attached to the message, and the tools they should be added to.

    - `file_id?: string`

      The ID of the file to attach to the message.

    - `tools?: Array<CodeInterpreterTool | FileSearch>`

      The tools to add this file to.

      - `CodeInterpreterTool`

        - `type: "code_interpreter"`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `FileSearch`

        - `type: "file_search"`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `metadata?: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

### Returns

- `Message`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string | null`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Array<Attachment> | null`

    A list of files attached to the message, and the tools they were added to.

    - `file_id?: string`

      The ID of the file to attach to the message.

    - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

      The tools to add this file to.

      - `CodeInterpreterTool`

        - `type: "code_interpreter"`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `AssistantToolsFileSearchTypeOnly`

        - `type: "file_search"`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: number | null`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: Array<MessageContent>`

    The content of the message in array of text and/or images.

    - `ImageFileContentBlock`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `image_file: ImageFile`

        - `file_id: string`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_file"`

        Always `image_file`.

        - `"image_file"`

    - `ImageURLContentBlock`

      References an image URL in the content of a message.

      - `image_url: ImageURL`

        - `url: string`

          The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_url"`

        The type of the content part.

        - `"image_url"`

    - `TextContentBlock`

      The text content that is part of a message.

      - `text: Text`

        - `annotations: Array<Annotation>`

          - `FileCitationAnnotation`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `end_index: number`

            - `file_citation: FileCitation`

              - `file_id: string`

                The ID of the specific File the citation is from.

            - `start_index: number`

            - `text: string`

              The text in the message content that needs to be replaced.

            - `type: "file_citation"`

              Always `file_citation`.

              - `"file_citation"`

          - `FilePathAnnotation`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `end_index: number`

            - `file_path: FilePath`

              - `file_id: string`

                The ID of the file that was generated.

            - `start_index: number`

            - `text: string`

              The text in the message content that needs to be replaced.

            - `type: "file_path"`

              Always `file_path`.

              - `"file_path"`

        - `value: string`

          The data that makes up the text.

      - `type: "text"`

        Always `text`.

        - `"text"`

    - `RefusalContentBlock`

      The refusal content generated by the assistant.

      - `refusal: string`

      - `type: "refusal"`

        Always `refusal`.

        - `"refusal"`

  - `created_at: number`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: number | null`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: IncompleteDetails | null`

    On an incomplete message, details about why the message is incomplete.

    - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: "thread.message"`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: "user" | "assistant"`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: string | null`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: "in_progress" | "incomplete" | "completed"`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: string`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const message = await client.beta.threads.messages.create('thread_id', {
  content: 'string',
  role: 'user',
});

console.log(message.id);
```

## Update

`client.beta.threads.messages.update(stringmessageID, MessageUpdateParamsparams, RequestOptionsoptions?): Message`

**post** `/threads/{thread_id}/messages/{message_id}`

Modifies a message.

### Parameters

- `messageID: string`

- `params: MessageUpdateParams`

  - `thread_id: string`

    Path param: The ID of the thread to which this message belongs.

  - `metadata?: Metadata | null`

    Body param: Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

### Returns

- `Message`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string | null`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Array<Attachment> | null`

    A list of files attached to the message, and the tools they were added to.

    - `file_id?: string`

      The ID of the file to attach to the message.

    - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

      The tools to add this file to.

      - `CodeInterpreterTool`

        - `type: "code_interpreter"`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `AssistantToolsFileSearchTypeOnly`

        - `type: "file_search"`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: number | null`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: Array<MessageContent>`

    The content of the message in array of text and/or images.

    - `ImageFileContentBlock`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `image_file: ImageFile`

        - `file_id: string`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_file"`

        Always `image_file`.

        - `"image_file"`

    - `ImageURLContentBlock`

      References an image URL in the content of a message.

      - `image_url: ImageURL`

        - `url: string`

          The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_url"`

        The type of the content part.

        - `"image_url"`

    - `TextContentBlock`

      The text content that is part of a message.

      - `text: Text`

        - `annotations: Array<Annotation>`

          - `FileCitationAnnotation`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `end_index: number`

            - `file_citation: FileCitation`

              - `file_id: string`

                The ID of the specific File the citation is from.

            - `start_index: number`

            - `text: string`

              The text in the message content that needs to be replaced.

            - `type: "file_citation"`

              Always `file_citation`.

              - `"file_citation"`

          - `FilePathAnnotation`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `end_index: number`

            - `file_path: FilePath`

              - `file_id: string`

                The ID of the file that was generated.

            - `start_index: number`

            - `text: string`

              The text in the message content that needs to be replaced.

            - `type: "file_path"`

              Always `file_path`.

              - `"file_path"`

        - `value: string`

          The data that makes up the text.

      - `type: "text"`

        Always `text`.

        - `"text"`

    - `RefusalContentBlock`

      The refusal content generated by the assistant.

      - `refusal: string`

      - `type: "refusal"`

        Always `refusal`.

        - `"refusal"`

  - `created_at: number`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: number | null`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: IncompleteDetails | null`

    On an incomplete message, details about why the message is incomplete.

    - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: "thread.message"`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: "user" | "assistant"`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: string | null`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: "in_progress" | "incomplete" | "completed"`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: string`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const message = await client.beta.threads.messages.update('message_id', { thread_id: 'thread_id' });

console.log(message.id);
```

## Retrieve

`client.beta.threads.messages.retrieve(stringmessageID, MessageRetrieveParamsparams, RequestOptionsoptions?): Message`

**get** `/threads/{thread_id}/messages/{message_id}`

Retrieve a message.

### Parameters

- `messageID: string`

- `params: MessageRetrieveParams`

  - `thread_id: string`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) to which this message belongs.

### Returns

- `Message`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string | null`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Array<Attachment> | null`

    A list of files attached to the message, and the tools they were added to.

    - `file_id?: string`

      The ID of the file to attach to the message.

    - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

      The tools to add this file to.

      - `CodeInterpreterTool`

        - `type: "code_interpreter"`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `AssistantToolsFileSearchTypeOnly`

        - `type: "file_search"`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: number | null`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: Array<MessageContent>`

    The content of the message in array of text and/or images.

    - `ImageFileContentBlock`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `image_file: ImageFile`

        - `file_id: string`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_file"`

        Always `image_file`.

        - `"image_file"`

    - `ImageURLContentBlock`

      References an image URL in the content of a message.

      - `image_url: ImageURL`

        - `url: string`

          The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_url"`

        The type of the content part.

        - `"image_url"`

    - `TextContentBlock`

      The text content that is part of a message.

      - `text: Text`

        - `annotations: Array<Annotation>`

          - `FileCitationAnnotation`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `end_index: number`

            - `file_citation: FileCitation`

              - `file_id: string`

                The ID of the specific File the citation is from.

            - `start_index: number`

            - `text: string`

              The text in the message content that needs to be replaced.

            - `type: "file_citation"`

              Always `file_citation`.

              - `"file_citation"`

          - `FilePathAnnotation`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `end_index: number`

            - `file_path: FilePath`

              - `file_id: string`

                The ID of the file that was generated.

            - `start_index: number`

            - `text: string`

              The text in the message content that needs to be replaced.

            - `type: "file_path"`

              Always `file_path`.

              - `"file_path"`

        - `value: string`

          The data that makes up the text.

      - `type: "text"`

        Always `text`.

        - `"text"`

    - `RefusalContentBlock`

      The refusal content generated by the assistant.

      - `refusal: string`

      - `type: "refusal"`

        Always `refusal`.

        - `"refusal"`

  - `created_at: number`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: number | null`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: IncompleteDetails | null`

    On an incomplete message, details about why the message is incomplete.

    - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: "thread.message"`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: "user" | "assistant"`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: string | null`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: "in_progress" | "incomplete" | "completed"`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: string`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const message = await client.beta.threads.messages.retrieve('message_id', {
  thread_id: 'thread_id',
});

console.log(message.id);
```

## Delete

`client.beta.threads.messages.delete(stringmessageID, MessageDeleteParamsparams, RequestOptionsoptions?): MessageDeleted`

**delete** `/threads/{thread_id}/messages/{message_id}`

Deletes a message.

### Parameters

- `messageID: string`

- `params: MessageDeleteParams`

  - `thread_id: string`

    The ID of the thread to which this message belongs.

### Returns

- `MessageDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: "thread.message.deleted"`

    - `"thread.message.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const messageDeleted = await client.beta.threads.messages.delete('message_id', {
  thread_id: 'thread_id',
});

console.log(messageDeleted.id);
```

## Domain Types

### Annotation

- `Annotation = FileCitationAnnotation | FilePathAnnotation`

  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

  - `FileCitationAnnotation`

    A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

    - `end_index: number`

    - `file_citation: FileCitation`

      - `file_id: string`

        The ID of the specific File the citation is from.

    - `start_index: number`

    - `text: string`

      The text in the message content that needs to be replaced.

    - `type: "file_citation"`

      Always `file_citation`.

      - `"file_citation"`

  - `FilePathAnnotation`

    A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

    - `end_index: number`

    - `file_path: FilePath`

      - `file_id: string`

        The ID of the file that was generated.

    - `start_index: number`

    - `text: string`

      The text in the message content that needs to be replaced.

    - `type: "file_path"`

      Always `file_path`.

      - `"file_path"`

### Annotation Delta

- `AnnotationDelta = FileCitationDeltaAnnotation | FilePathDeltaAnnotation`

  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

  - `FileCitationDeltaAnnotation`

    A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

    - `index: number`

      The index of the annotation in the text content part.

    - `type: "file_citation"`

      Always `file_citation`.

      - `"file_citation"`

    - `end_index?: number`

    - `file_citation?: FileCitation`

      - `file_id?: string`

        The ID of the specific File the citation is from.

      - `quote?: string`

        The specific quote in the file.

    - `start_index?: number`

    - `text?: string`

      The text in the message content that needs to be replaced.

  - `FilePathDeltaAnnotation`

    A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

    - `index: number`

      The index of the annotation in the text content part.

    - `type: "file_path"`

      Always `file_path`.

      - `"file_path"`

    - `end_index?: number`

    - `file_path?: FilePath`

      - `file_id?: string`

        The ID of the file that was generated.

    - `start_index?: number`

    - `text?: string`

      The text in the message content that needs to be replaced.

### File Citation Annotation

- `FileCitationAnnotation`

  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

  - `end_index: number`

  - `file_citation: FileCitation`

    - `file_id: string`

      The ID of the specific File the citation is from.

  - `start_index: number`

  - `text: string`

    The text in the message content that needs to be replaced.

  - `type: "file_citation"`

    Always `file_citation`.

    - `"file_citation"`

### File Citation Delta Annotation

- `FileCitationDeltaAnnotation`

  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

  - `index: number`

    The index of the annotation in the text content part.

  - `type: "file_citation"`

    Always `file_citation`.

    - `"file_citation"`

  - `end_index?: number`

  - `file_citation?: FileCitation`

    - `file_id?: string`

      The ID of the specific File the citation is from.

    - `quote?: string`

      The specific quote in the file.

  - `start_index?: number`

  - `text?: string`

    The text in the message content that needs to be replaced.

### File Path Annotation

- `FilePathAnnotation`

  A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

  - `end_index: number`

  - `file_path: FilePath`

    - `file_id: string`

      The ID of the file that was generated.

  - `start_index: number`

  - `text: string`

    The text in the message content that needs to be replaced.

  - `type: "file_path"`

    Always `file_path`.

    - `"file_path"`

### File Path Delta Annotation

- `FilePathDeltaAnnotation`

  A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

  - `index: number`

    The index of the annotation in the text content part.

  - `type: "file_path"`

    Always `file_path`.

    - `"file_path"`

  - `end_index?: number`

  - `file_path?: FilePath`

    - `file_id?: string`

      The ID of the file that was generated.

  - `start_index?: number`

  - `text?: string`

    The text in the message content that needs to be replaced.

### Image File

- `ImageFile`

  - `file_id: string`

    The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

  - `detail?: "auto" | "low" | "high"`

    Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

    - `"auto"`

    - `"low"`

    - `"high"`

### Image File Content Block

- `ImageFileContentBlock`

  References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

  - `image_file: ImageFile`

    - `file_id: string`

      The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

    - `detail?: "auto" | "low" | "high"`

      Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

      - `"auto"`

      - `"low"`

      - `"high"`

  - `type: "image_file"`

    Always `image_file`.

    - `"image_file"`

### Image File Delta

- `ImageFileDelta`

  - `detail?: "auto" | "low" | "high"`

    Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

    - `"auto"`

    - `"low"`

    - `"high"`

  - `file_id?: string`

    The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

### Image File Delta Block

- `ImageFileDeltaBlock`

  References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

  - `index: number`

    The index of the content part in the message.

  - `type: "image_file"`

    Always `image_file`.

    - `"image_file"`

  - `image_file?: ImageFileDelta`

    - `detail?: "auto" | "low" | "high"`

      Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

      - `"auto"`

      - `"low"`

      - `"high"`

    - `file_id?: string`

      The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

### Image URL

- `ImageURL`

  - `url: string`

    The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

  - `detail?: "auto" | "low" | "high"`

    Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

    - `"auto"`

    - `"low"`

    - `"high"`

### Image URL Content Block

- `ImageURLContentBlock`

  References an image URL in the content of a message.

  - `image_url: ImageURL`

    - `url: string`

      The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

    - `detail?: "auto" | "low" | "high"`

      Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

      - `"auto"`

      - `"low"`

      - `"high"`

  - `type: "image_url"`

    The type of the content part.

    - `"image_url"`

### Image URL Delta

- `ImageURLDelta`

  - `detail?: "auto" | "low" | "high"`

    Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

    - `"auto"`

    - `"low"`

    - `"high"`

  - `url?: string`

    The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

### Image URL Delta Block

- `ImageURLDeltaBlock`

  References an image URL in the content of a message.

  - `index: number`

    The index of the content part in the message.

  - `type: "image_url"`

    Always `image_url`.

    - `"image_url"`

  - `image_url?: ImageURLDelta`

    - `detail?: "auto" | "low" | "high"`

      Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

      - `"auto"`

      - `"low"`

      - `"high"`

    - `url?: string`

      The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

### Message

- `Message`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string | null`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Array<Attachment> | null`

    A list of files attached to the message, and the tools they were added to.

    - `file_id?: string`

      The ID of the file to attach to the message.

    - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

      The tools to add this file to.

      - `CodeInterpreterTool`

        - `type: "code_interpreter"`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `AssistantToolsFileSearchTypeOnly`

        - `type: "file_search"`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: number | null`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: Array<MessageContent>`

    The content of the message in array of text and/or images.

    - `ImageFileContentBlock`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `image_file: ImageFile`

        - `file_id: string`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_file"`

        Always `image_file`.

        - `"image_file"`

    - `ImageURLContentBlock`

      References an image URL in the content of a message.

      - `image_url: ImageURL`

        - `url: string`

          The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_url"`

        The type of the content part.

        - `"image_url"`

    - `TextContentBlock`

      The text content that is part of a message.

      - `text: Text`

        - `annotations: Array<Annotation>`

          - `FileCitationAnnotation`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `end_index: number`

            - `file_citation: FileCitation`

              - `file_id: string`

                The ID of the specific File the citation is from.

            - `start_index: number`

            - `text: string`

              The text in the message content that needs to be replaced.

            - `type: "file_citation"`

              Always `file_citation`.

              - `"file_citation"`

          - `FilePathAnnotation`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `end_index: number`

            - `file_path: FilePath`

              - `file_id: string`

                The ID of the file that was generated.

            - `start_index: number`

            - `text: string`

              The text in the message content that needs to be replaced.

            - `type: "file_path"`

              Always `file_path`.

              - `"file_path"`

        - `value: string`

          The data that makes up the text.

      - `type: "text"`

        Always `text`.

        - `"text"`

    - `RefusalContentBlock`

      The refusal content generated by the assistant.

      - `refusal: string`

      - `type: "refusal"`

        Always `refusal`.

        - `"refusal"`

  - `created_at: number`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: number | null`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: IncompleteDetails | null`

    On an incomplete message, details about why the message is incomplete.

    - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: "thread.message"`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: "user" | "assistant"`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: string | null`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: "in_progress" | "incomplete" | "completed"`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: string`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Message Content

- `MessageContent = ImageFileContentBlock | ImageURLContentBlock | TextContentBlock | RefusalContentBlock`

  References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

  - `ImageFileContentBlock`

    References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

    - `image_file: ImageFile`

      - `file_id: string`

        The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

      - `detail?: "auto" | "low" | "high"`

        Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

        - `"auto"`

        - `"low"`

        - `"high"`

    - `type: "image_file"`

      Always `image_file`.

      - `"image_file"`

  - `ImageURLContentBlock`

    References an image URL in the content of a message.

    - `image_url: ImageURL`

      - `url: string`

        The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

      - `detail?: "auto" | "low" | "high"`

        Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

        - `"auto"`

        - `"low"`

        - `"high"`

    - `type: "image_url"`

      The type of the content part.

      - `"image_url"`

  - `TextContentBlock`

    The text content that is part of a message.

    - `text: Text`

      - `annotations: Array<Annotation>`

        - `FileCitationAnnotation`

          A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

          - `end_index: number`

          - `file_citation: FileCitation`

            - `file_id: string`

              The ID of the specific File the citation is from.

          - `start_index: number`

          - `text: string`

            The text in the message content that needs to be replaced.

          - `type: "file_citation"`

            Always `file_citation`.

            - `"file_citation"`

        - `FilePathAnnotation`

          A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

          - `end_index: number`

          - `file_path: FilePath`

            - `file_id: string`

              The ID of the file that was generated.

          - `start_index: number`

          - `text: string`

            The text in the message content that needs to be replaced.

          - `type: "file_path"`

            Always `file_path`.

            - `"file_path"`

      - `value: string`

        The data that makes up the text.

    - `type: "text"`

      Always `text`.

      - `"text"`

  - `RefusalContentBlock`

    The refusal content generated by the assistant.

    - `refusal: string`

    - `type: "refusal"`

      Always `refusal`.

      - `"refusal"`

### Message Content Delta

- `MessageContentDelta = ImageFileDeltaBlock | TextDeltaBlock | RefusalDeltaBlock | ImageURLDeltaBlock`

  References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

  - `ImageFileDeltaBlock`

    References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

    - `index: number`

      The index of the content part in the message.

    - `type: "image_file"`

      Always `image_file`.

      - `"image_file"`

    - `image_file?: ImageFileDelta`

      - `detail?: "auto" | "low" | "high"`

        Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

        - `"auto"`

        - `"low"`

        - `"high"`

      - `file_id?: string`

        The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

  - `TextDeltaBlock`

    The text content that is part of a message.

    - `index: number`

      The index of the content part in the message.

    - `type: "text"`

      Always `text`.

      - `"text"`

    - `text?: TextDelta`

      - `annotations?: Array<AnnotationDelta>`

        - `FileCitationDeltaAnnotation`

          A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

          - `index: number`

            The index of the annotation in the text content part.

          - `type: "file_citation"`

            Always `file_citation`.

            - `"file_citation"`

          - `end_index?: number`

          - `file_citation?: FileCitation`

            - `file_id?: string`

              The ID of the specific File the citation is from.

            - `quote?: string`

              The specific quote in the file.

          - `start_index?: number`

          - `text?: string`

            The text in the message content that needs to be replaced.

        - `FilePathDeltaAnnotation`

          A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

          - `index: number`

            The index of the annotation in the text content part.

          - `type: "file_path"`

            Always `file_path`.

            - `"file_path"`

          - `end_index?: number`

          - `file_path?: FilePath`

            - `file_id?: string`

              The ID of the file that was generated.

          - `start_index?: number`

          - `text?: string`

            The text in the message content that needs to be replaced.

      - `value?: string`

        The data that makes up the text.

  - `RefusalDeltaBlock`

    The refusal content that is part of a message.

    - `index: number`

      The index of the refusal part in the message.

    - `type: "refusal"`

      Always `refusal`.

      - `"refusal"`

    - `refusal?: string`

  - `ImageURLDeltaBlock`

    References an image URL in the content of a message.

    - `index: number`

      The index of the content part in the message.

    - `type: "image_url"`

      Always `image_url`.

      - `"image_url"`

    - `image_url?: ImageURLDelta`

      - `detail?: "auto" | "low" | "high"`

        Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

        - `"auto"`

        - `"low"`

        - `"high"`

      - `url?: string`

        The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

### Message Content Part Param

- `MessageContentPartParam = ImageFileContentBlock | ImageURLContentBlock | TextContentBlockParam`

  References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

  - `ImageFileContentBlock`

    References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

    - `image_file: ImageFile`

      - `file_id: string`

        The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

      - `detail?: "auto" | "low" | "high"`

        Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

        - `"auto"`

        - `"low"`

        - `"high"`

    - `type: "image_file"`

      Always `image_file`.

      - `"image_file"`

  - `ImageURLContentBlock`

    References an image URL in the content of a message.

    - `image_url: ImageURL`

      - `url: string`

        The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

      - `detail?: "auto" | "low" | "high"`

        Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

        - `"auto"`

        - `"low"`

        - `"high"`

    - `type: "image_url"`

      The type of the content part.

      - `"image_url"`

  - `TextContentBlockParam`

    The text content that is part of a message.

    - `text: string`

      Text content to be sent to the model

    - `type: "text"`

      Always `text`.

      - `"text"`

### Message Deleted

- `MessageDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: "thread.message.deleted"`

    - `"thread.message.deleted"`

### Message Delta

- `MessageDelta`

  The delta containing the fields that have changed on the Message.

  - `content?: Array<MessageContentDelta>`

    The content of the message in array of text and/or images.

    - `ImageFileDeltaBlock`

      References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

      - `index: number`

        The index of the content part in the message.

      - `type: "image_file"`

        Always `image_file`.

        - `"image_file"`

      - `image_file?: ImageFileDelta`

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

        - `file_id?: string`

          The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

    - `TextDeltaBlock`

      The text content that is part of a message.

      - `index: number`

        The index of the content part in the message.

      - `type: "text"`

        Always `text`.

        - `"text"`

      - `text?: TextDelta`

        - `annotations?: Array<AnnotationDelta>`

          - `FileCitationDeltaAnnotation`

            A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

            - `index: number`

              The index of the annotation in the text content part.

            - `type: "file_citation"`

              Always `file_citation`.

              - `"file_citation"`

            - `end_index?: number`

            - `file_citation?: FileCitation`

              - `file_id?: string`

                The ID of the specific File the citation is from.

              - `quote?: string`

                The specific quote in the file.

            - `start_index?: number`

            - `text?: string`

              The text in the message content that needs to be replaced.

          - `FilePathDeltaAnnotation`

            A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

            - `index: number`

              The index of the annotation in the text content part.

            - `type: "file_path"`

              Always `file_path`.

              - `"file_path"`

            - `end_index?: number`

            - `file_path?: FilePath`

              - `file_id?: string`

                The ID of the file that was generated.

            - `start_index?: number`

            - `text?: string`

              The text in the message content that needs to be replaced.

        - `value?: string`

          The data that makes up the text.

    - `RefusalDeltaBlock`

      The refusal content that is part of a message.

      - `index: number`

        The index of the refusal part in the message.

      - `type: "refusal"`

        Always `refusal`.

        - `"refusal"`

      - `refusal?: string`

    - `ImageURLDeltaBlock`

      References an image URL in the content of a message.

      - `index: number`

        The index of the content part in the message.

      - `type: "image_url"`

        Always `image_url`.

        - `"image_url"`

      - `image_url?: ImageURLDelta`

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

          - `"auto"`

          - `"low"`

          - `"high"`

        - `url?: string`

          The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

  - `role?: "user" | "assistant"`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

### Message Delta Event

- `MessageDeltaEvent`

  Represents a message delta i.e. any changed fields on a message during streaming.

  - `id: string`

    The identifier of the message, which can be referenced in API endpoints.

  - `delta: MessageDelta`

    The delta containing the fields that have changed on the Message.

    - `content?: Array<MessageContentDelta>`

      The content of the message in array of text and/or images.

      - `ImageFileDeltaBlock`

        References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

        - `index: number`

          The index of the content part in the message.

        - `type: "image_file"`

          Always `image_file`.

          - `"image_file"`

        - `image_file?: ImageFileDelta`

          - `detail?: "auto" | "low" | "high"`

            Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

            - `"auto"`

            - `"low"`

            - `"high"`

          - `file_id?: string`

            The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

      - `TextDeltaBlock`

        The text content that is part of a message.

        - `index: number`

          The index of the content part in the message.

        - `type: "text"`

          Always `text`.

          - `"text"`

        - `text?: TextDelta`

          - `annotations?: Array<AnnotationDelta>`

            - `FileCitationDeltaAnnotation`

              A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

              - `index: number`

                The index of the annotation in the text content part.

              - `type: "file_citation"`

                Always `file_citation`.

                - `"file_citation"`

              - `end_index?: number`

              - `file_citation?: FileCitation`

                - `file_id?: string`

                  The ID of the specific File the citation is from.

                - `quote?: string`

                  The specific quote in the file.

              - `start_index?: number`

              - `text?: string`

                The text in the message content that needs to be replaced.

            - `FilePathDeltaAnnotation`

              A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

              - `index: number`

                The index of the annotation in the text content part.

              - `type: "file_path"`

                Always `file_path`.

                - `"file_path"`

              - `end_index?: number`

              - `file_path?: FilePath`

                - `file_id?: string`

                  The ID of the file that was generated.

              - `start_index?: number`

              - `text?: string`

                The text in the message content that needs to be replaced.

          - `value?: string`

            The data that makes up the text.

      - `RefusalDeltaBlock`

        The refusal content that is part of a message.

        - `index: number`

          The index of the refusal part in the message.

        - `type: "refusal"`

          Always `refusal`.

          - `"refusal"`

        - `refusal?: string`

      - `ImageURLDeltaBlock`

        References an image URL in the content of a message.

        - `index: number`

          The index of the content part in the message.

        - `type: "image_url"`

          Always `image_url`.

          - `"image_url"`

        - `image_url?: ImageURLDelta`

          - `detail?: "auto" | "low" | "high"`

            Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

            - `"auto"`

            - `"low"`

            - `"high"`

          - `url?: string`

            The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

    - `role?: "user" | "assistant"`

      The entity that produced the message. One of `user` or `assistant`.

      - `"user"`

      - `"assistant"`

  - `object: "thread.message.delta"`

    The object type, which is always `thread.message.delta`.

    - `"thread.message.delta"`

### Refusal Content Block

- `RefusalContentBlock`

  The refusal content generated by the assistant.

  - `refusal: string`

  - `type: "refusal"`

    Always `refusal`.

    - `"refusal"`

### Refusal Delta Block

- `RefusalDeltaBlock`

  The refusal content that is part of a message.

  - `index: number`

    The index of the refusal part in the message.

  - `type: "refusal"`

    Always `refusal`.

    - `"refusal"`

  - `refusal?: string`

### Text

- `Text`

  - `annotations: Array<Annotation>`

    - `FileCitationAnnotation`

      A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

      - `end_index: number`

      - `file_citation: FileCitation`

        - `file_id: string`

          The ID of the specific File the citation is from.

      - `start_index: number`

      - `text: string`

        The text in the message content that needs to be replaced.

      - `type: "file_citation"`

        Always `file_citation`.

        - `"file_citation"`

    - `FilePathAnnotation`

      A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

      - `end_index: number`

      - `file_path: FilePath`

        - `file_id: string`

          The ID of the file that was generated.

      - `start_index: number`

      - `text: string`

        The text in the message content that needs to be replaced.

      - `type: "file_path"`

        Always `file_path`.

        - `"file_path"`

  - `value: string`

    The data that makes up the text.

### Text Content Block

- `TextContentBlock`

  The text content that is part of a message.

  - `text: Text`

    - `annotations: Array<Annotation>`

      - `FileCitationAnnotation`

        A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

        - `end_index: number`

        - `file_citation: FileCitation`

          - `file_id: string`

            The ID of the specific File the citation is from.

        - `start_index: number`

        - `text: string`

          The text in the message content that needs to be replaced.

        - `type: "file_citation"`

          Always `file_citation`.

          - `"file_citation"`

      - `FilePathAnnotation`

        A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

        - `end_index: number`

        - `file_path: FilePath`

          - `file_id: string`

            The ID of the file that was generated.

        - `start_index: number`

        - `text: string`

          The text in the message content that needs to be replaced.

        - `type: "file_path"`

          Always `file_path`.

          - `"file_path"`

    - `value: string`

      The data that makes up the text.

  - `type: "text"`

    Always `text`.

    - `"text"`

### Text Content Block Param

- `TextContentBlockParam`

  The text content that is part of a message.

  - `text: string`

    Text content to be sent to the model

  - `type: "text"`

    Always `text`.

    - `"text"`

### Text Delta

- `TextDelta`

  - `annotations?: Array<AnnotationDelta>`

    - `FileCitationDeltaAnnotation`

      A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

      - `index: number`

        The index of the annotation in the text content part.

      - `type: "file_citation"`

        Always `file_citation`.

        - `"file_citation"`

      - `end_index?: number`

      - `file_citation?: FileCitation`

        - `file_id?: string`

          The ID of the specific File the citation is from.

        - `quote?: string`

          The specific quote in the file.

      - `start_index?: number`

      - `text?: string`

        The text in the message content that needs to be replaced.

    - `FilePathDeltaAnnotation`

      A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

      - `index: number`

        The index of the annotation in the text content part.

      - `type: "file_path"`

        Always `file_path`.

        - `"file_path"`

      - `end_index?: number`

      - `file_path?: FilePath`

        - `file_id?: string`

          The ID of the file that was generated.

      - `start_index?: number`

      - `text?: string`

        The text in the message content that needs to be replaced.

  - `value?: string`

    The data that makes up the text.

### Text Delta Block

- `TextDeltaBlock`

  The text content that is part of a message.

  - `index: number`

    The index of the content part in the message.

  - `type: "text"`

    Always `text`.

    - `"text"`

  - `text?: TextDelta`

    - `annotations?: Array<AnnotationDelta>`

      - `FileCitationDeltaAnnotation`

        A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

        - `index: number`

          The index of the annotation in the text content part.

        - `type: "file_citation"`

          Always `file_citation`.

          - `"file_citation"`

        - `end_index?: number`

        - `file_citation?: FileCitation`

          - `file_id?: string`

            The ID of the specific File the citation is from.

          - `quote?: string`

            The specific quote in the file.

        - `start_index?: number`

        - `text?: string`

          The text in the message content that needs to be replaced.

      - `FilePathDeltaAnnotation`

        A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

        - `index: number`

          The index of the annotation in the text content part.

        - `type: "file_path"`

          Always `file_path`.

          - `"file_path"`

        - `end_index?: number`

        - `file_path?: FilePath`

          - `file_id?: string`

            The ID of the file that was generated.

        - `start_index?: number`

        - `text?: string`

          The text in the message content that needs to be replaced.

    - `value?: string`

      The data that makes up the text.
