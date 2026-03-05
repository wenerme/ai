# Files

## List

**get** `/vector_stores/{vector_store_id}/files`

Returns a list of vector store files.

### Path Parameters

- `vector_store_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: optional string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `filter: optional "in_progress" or "completed" or "failed" or "cancelled"`

  Filter by file status. One of `in_progress`, `completed`, `failed`, `cancelled`.

  - `"in_progress"`

  - `"completed"`

  - `"failed"`

  - `"cancelled"`

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of VectorStoreFile`

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: object { code, message }`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: "server_error" or "unsupported_file" or "invalid_file"`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: string`

      A human-readable description of the error.

  - `object: "vector_store.file"`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: "in_progress" or "completed" or "cancelled" or "failed"`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: number`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: string`

    The ID of the [vector store](/docs/api-reference/vector-stores/object) that the [File](/docs/api-reference/files) is attached to.

  - `attributes: optional map[string or number or boolean]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `UnionMember0 = string`

    - `UnionMember1 = number`

    - `UnionMember2 = boolean`

  - `chunking_strategy: optional StaticFileChunkingStrategyObject or OtherFileChunkingStrategyObject`

    The strategy used to chunk the file.

    - `StaticFileChunkingStrategyObject = object { static, type }`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: number`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: number`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: "static"`

        Always `static`.

        - `"static"`

    - `OtherFileChunkingStrategyObject = object { type }`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: "other"`

        Always `other`.

        - `"other"`

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: string`

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID/files \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create

**post** `/vector_stores/{vector_store_id}/files`

Create a vector store file by attaching a [File](/docs/api-reference/files) to a [vector store](/docs/api-reference/vector-stores/object).

### Path Parameters

- `vector_store_id: string`

### Body Parameters

- `file_id: string`

  A [File](/docs/api-reference/files) ID that the vector store should use. Useful for tools like `file_search` that can access files.

- `attributes: optional map[string or number or boolean]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard. Keys are strings
  with a maximum length of 64 characters. Values are strings with a maximum
  length of 512 characters, booleans, or numbers.

  - `UnionMember0 = string`

  - `UnionMember1 = number`

  - `UnionMember2 = boolean`

- `chunking_strategy: optional FileChunkingStrategyParam`

  The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy.

  - `AutoFileChunkingStrategyParam = object { type }`

    The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

    - `type: "auto"`

      Always `auto`.

      - `"auto"`

  - `StaticFileChunkingStrategyObjectParam = object { static, type }`

    Customize your own chunking strategy by setting chunk size and chunk overlap.

    - `static: StaticFileChunkingStrategy`

      - `chunk_overlap_tokens: number`

        The number of tokens that overlap between chunks. The default value is `400`.

        Note that the overlap must not exceed half of `max_chunk_size_tokens`.

      - `max_chunk_size_tokens: number`

        The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

    - `type: "static"`

      Always `static`.

      - `"static"`

### Returns

- `VectorStoreFile = object { id, created_at, last_error, 6 more }`

  A list of files attached to a vector store.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: object { code, message }`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: "server_error" or "unsupported_file" or "invalid_file"`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: string`

      A human-readable description of the error.

  - `object: "vector_store.file"`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: "in_progress" or "completed" or "cancelled" or "failed"`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: number`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: string`

    The ID of the [vector store](/docs/api-reference/vector-stores/object) that the [File](/docs/api-reference/files) is attached to.

  - `attributes: optional map[string or number or boolean]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `UnionMember0 = string`

    - `UnionMember1 = number`

    - `UnionMember2 = boolean`

  - `chunking_strategy: optional StaticFileChunkingStrategyObject or OtherFileChunkingStrategyObject`

    The strategy used to chunk the file.

    - `StaticFileChunkingStrategyObject = object { static, type }`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: number`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: number`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: "static"`

        Always `static`.

        - `"static"`

    - `OtherFileChunkingStrategyObject = object { type }`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: "other"`

        Always `other`.

        - `"other"`

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID/files \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "file_id": "file_id"
        }'
```

## Update

**post** `/vector_stores/{vector_store_id}/files/{file_id}`

Update attributes on a vector store file.

### Path Parameters

- `vector_store_id: string`

- `file_id: string`

### Body Parameters

- `attributes: map[string or number or boolean]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard. Keys are strings
  with a maximum length of 64 characters. Values are strings with a maximum
  length of 512 characters, booleans, or numbers.

  - `UnionMember0 = string`

  - `UnionMember1 = number`

  - `UnionMember2 = boolean`

### Returns

- `VectorStoreFile = object { id, created_at, last_error, 6 more }`

  A list of files attached to a vector store.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: object { code, message }`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: "server_error" or "unsupported_file" or "invalid_file"`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: string`

      A human-readable description of the error.

  - `object: "vector_store.file"`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: "in_progress" or "completed" or "cancelled" or "failed"`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: number`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: string`

    The ID of the [vector store](/docs/api-reference/vector-stores/object) that the [File](/docs/api-reference/files) is attached to.

  - `attributes: optional map[string or number or boolean]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `UnionMember0 = string`

    - `UnionMember1 = number`

    - `UnionMember2 = boolean`

  - `chunking_strategy: optional StaticFileChunkingStrategyObject or OtherFileChunkingStrategyObject`

    The strategy used to chunk the file.

    - `StaticFileChunkingStrategyObject = object { static, type }`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: number`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: number`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: "static"`

        Always `static`.

        - `"static"`

    - `OtherFileChunkingStrategyObject = object { type }`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: "other"`

        Always `other`.

        - `"other"`

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID/files/$FILE_ID \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "attributes": {
            "foo": "string"
          }
        }'
```

## Retrieve

**get** `/vector_stores/{vector_store_id}/files/{file_id}`

Retrieves a vector store file.

### Path Parameters

- `vector_store_id: string`

- `file_id: string`

### Returns

- `VectorStoreFile = object { id, created_at, last_error, 6 more }`

  A list of files attached to a vector store.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: object { code, message }`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: "server_error" or "unsupported_file" or "invalid_file"`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: string`

      A human-readable description of the error.

  - `object: "vector_store.file"`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: "in_progress" or "completed" or "cancelled" or "failed"`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: number`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: string`

    The ID of the [vector store](/docs/api-reference/vector-stores/object) that the [File](/docs/api-reference/files) is attached to.

  - `attributes: optional map[string or number or boolean]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `UnionMember0 = string`

    - `UnionMember1 = number`

    - `UnionMember2 = boolean`

  - `chunking_strategy: optional StaticFileChunkingStrategyObject or OtherFileChunkingStrategyObject`

    The strategy used to chunk the file.

    - `StaticFileChunkingStrategyObject = object { static, type }`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: number`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: number`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: "static"`

        Always `static`.

        - `"static"`

    - `OtherFileChunkingStrategyObject = object { type }`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: "other"`

        Always `other`.

        - `"other"`

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID/files/$FILE_ID \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Delete

**delete** `/vector_stores/{vector_store_id}/files/{file_id}`

Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted. To delete the file, use the [delete file](/docs/api-reference/files/delete) endpoint.

### Path Parameters

- `vector_store_id: string`

- `file_id: string`

### Returns

- `VectorStoreFileDeleted = object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "vector_store.file.deleted"`

    - `"vector_store.file.deleted"`

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID/files/$FILE_ID \
    -X DELETE \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Content

**get** `/vector_stores/{vector_store_id}/files/{file_id}/content`

Retrieve the parsed contents of a vector store file.

### Path Parameters

- `vector_store_id: string`

- `file_id: string`

### Returns

- `data: array of object { text, type }`

  Parsed content of the file.

  - `text: optional string`

    The text content

  - `type: optional string`

    The content type (currently only `"text"`)

- `has_more: boolean`

  Indicates if there are more content pages to fetch.

- `next_page: string`

  The token for the next page, if any.

- `object: "vector_store.file_content.page"`

  The object type, which is always `vector_store.file_content.page`

  - `"vector_store.file_content.page"`

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID/files/$FILE_ID/content \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Domain Types

### Vector Store File

- `VectorStoreFile = object { id, created_at, last_error, 6 more }`

  A list of files attached to a vector store.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: object { code, message }`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: "server_error" or "unsupported_file" or "invalid_file"`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: string`

      A human-readable description of the error.

  - `object: "vector_store.file"`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: "in_progress" or "completed" or "cancelled" or "failed"`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: number`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: string`

    The ID of the [vector store](/docs/api-reference/vector-stores/object) that the [File](/docs/api-reference/files) is attached to.

  - `attributes: optional map[string or number or boolean]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `UnionMember0 = string`

    - `UnionMember1 = number`

    - `UnionMember2 = boolean`

  - `chunking_strategy: optional StaticFileChunkingStrategyObject or OtherFileChunkingStrategyObject`

    The strategy used to chunk the file.

    - `StaticFileChunkingStrategyObject = object { static, type }`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: number`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: number`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: "static"`

        Always `static`.

        - `"static"`

    - `OtherFileChunkingStrategyObject = object { type }`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: "other"`

        Always `other`.

        - `"other"`

### Vector Store File Deleted

- `VectorStoreFileDeleted = object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "vector_store.file.deleted"`

    - `"vector_store.file.deleted"`
