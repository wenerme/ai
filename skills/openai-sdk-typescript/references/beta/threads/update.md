## Update

`client.beta.threads.update(stringthreadID, ThreadUpdateParamsbody, RequestOptionsoptions?): Thread`

**post** `/threads/{thread_id}`

Modifies a thread.

### Parameters

- `threadID: string`

- `body: ThreadUpdateParams`

  - `metadata?: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `tool_resources?: ToolResources | null`

    A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter?: CodeInterpreter`

      - `file_ids?: Array<string>`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search?: FileSearch`

      - `vector_store_ids?: Array<string>`

        The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

### Returns

- `Thread`

  Represents a thread that contains [messages](https://platform.openai.com/docs/api-reference/messages).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the thread was created.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: "thread"`

    The object type, which is always `thread`.

    - `"thread"`

  - `tool_resources: ToolResources | null`

    A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter?: CodeInterpreter`

      - `file_ids?: Array<string>`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search?: FileSearch`

      - `vector_store_ids?: Array<string>`

        The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const thread = await client.beta.threads.update('thread_id');

console.log(thread.id);
```
