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
