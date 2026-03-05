# Vector Stores

## List

`vector_stores.list(VectorStoreListParams**kwargs)  -> SyncCursorPage[VectorStore]`

**get** `/vector_stores`

Returns a list of vector stores.

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

- `class VectorStore: …`

  A vector store is a collection of processed files can be used by the `file_search` tool.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: FileCounts`

    - `cancelled: int`

      The number of files that were cancelled.

    - `completed: int`

      The number of files that have been successfully processed.

    - `failed: int`

      The number of files that have failed to process.

    - `in_progress: int`

      The number of files that are currently being processed.

    - `total: int`

      The total number of files.

  - `last_active_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: str`

    The name of the vector store.

  - `object: Literal["vector_store"]`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: Literal["expired", "in_progress", "completed"]`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: int`

    The total number of bytes used by the files in the vector store.

  - `expires_after: Optional[ExpiresAfter]`

    The expiration policy for a vector store.

    - `anchor: Literal["last_active_at"]`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: int`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store will expire.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.vector_stores.list()
page = page.data[0]
print(page.id)
```

## Create

`vector_stores.create(VectorStoreCreateParams**kwargs)  -> VectorStore`

**post** `/vector_stores`

Create a vector store.

### Parameters

- `chunking_strategy: Optional[FileChunkingStrategyParam]`

  The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. Only applicable if `file_ids` is non-empty.

  - `class AutoFileChunkingStrategyParam: …`

    The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

    - `type: Literal["auto"]`

      Always `auto`.

      - `"auto"`

  - `class StaticFileChunkingStrategyObjectParam: …`

    Customize your own chunking strategy by setting chunk size and chunk overlap.

    - `static: StaticFileChunkingStrategy`

      - `chunk_overlap_tokens: int`

        The number of tokens that overlap between chunks. The default value is `400`.

        Note that the overlap must not exceed half of `max_chunk_size_tokens`.

      - `max_chunk_size_tokens: int`

        The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

    - `type: Literal["static"]`

      Always `static`.

      - `"static"`

- `description: Optional[str]`

  A description for the vector store. Can be used to describe the vector store's purpose.

- `expires_after: Optional[ExpiresAfter]`

  The expiration policy for a vector store.

  - `anchor: Literal["last_active_at"]`

    Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

    - `"last_active_at"`

  - `days: int`

    The number of days after the anchor time that the vector store will expire.

- `file_ids: Optional[SequenceNotStr[str]]`

  A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files.

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `name: Optional[str]`

  The name of the vector store.

### Returns

- `class VectorStore: …`

  A vector store is a collection of processed files can be used by the `file_search` tool.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: FileCounts`

    - `cancelled: int`

      The number of files that were cancelled.

    - `completed: int`

      The number of files that have been successfully processed.

    - `failed: int`

      The number of files that have failed to process.

    - `in_progress: int`

      The number of files that are currently being processed.

    - `total: int`

      The total number of files.

  - `last_active_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: str`

    The name of the vector store.

  - `object: Literal["vector_store"]`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: Literal["expired", "in_progress", "completed"]`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: int`

    The total number of bytes used by the files in the vector store.

  - `expires_after: Optional[ExpiresAfter]`

    The expiration policy for a vector store.

    - `anchor: Literal["last_active_at"]`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: int`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store will expire.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store = client.vector_stores.create()
print(vector_store.id)
```

## Retrieve

`vector_stores.retrieve(strvector_store_id)  -> VectorStore`

**get** `/vector_stores/{vector_store_id}`

Retrieves a vector store.

### Parameters

- `vector_store_id: str`

### Returns

- `class VectorStore: …`

  A vector store is a collection of processed files can be used by the `file_search` tool.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: FileCounts`

    - `cancelled: int`

      The number of files that were cancelled.

    - `completed: int`

      The number of files that have been successfully processed.

    - `failed: int`

      The number of files that have failed to process.

    - `in_progress: int`

      The number of files that are currently being processed.

    - `total: int`

      The total number of files.

  - `last_active_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: str`

    The name of the vector store.

  - `object: Literal["vector_store"]`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: Literal["expired", "in_progress", "completed"]`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: int`

    The total number of bytes used by the files in the vector store.

  - `expires_after: Optional[ExpiresAfter]`

    The expiration policy for a vector store.

    - `anchor: Literal["last_active_at"]`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: int`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store will expire.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store = client.vector_stores.retrieve(
    "vector_store_id",
)
print(vector_store.id)
```

## Update

`vector_stores.update(strvector_store_id, VectorStoreUpdateParams**kwargs)  -> VectorStore`

**post** `/vector_stores/{vector_store_id}`

Modifies a vector store.

### Parameters

- `vector_store_id: str`

- `expires_after: Optional[ExpiresAfter]`

  The expiration policy for a vector store.

  - `anchor: Literal["last_active_at"]`

    Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

    - `"last_active_at"`

  - `days: int`

    The number of days after the anchor time that the vector store will expire.

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `name: Optional[str]`

  The name of the vector store.

### Returns

- `class VectorStore: …`

  A vector store is a collection of processed files can be used by the `file_search` tool.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: FileCounts`

    - `cancelled: int`

      The number of files that were cancelled.

    - `completed: int`

      The number of files that have been successfully processed.

    - `failed: int`

      The number of files that have failed to process.

    - `in_progress: int`

      The number of files that are currently being processed.

    - `total: int`

      The total number of files.

  - `last_active_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: str`

    The name of the vector store.

  - `object: Literal["vector_store"]`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: Literal["expired", "in_progress", "completed"]`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: int`

    The total number of bytes used by the files in the vector store.

  - `expires_after: Optional[ExpiresAfter]`

    The expiration policy for a vector store.

    - `anchor: Literal["last_active_at"]`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: int`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store will expire.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store = client.vector_stores.update(
    vector_store_id="vector_store_id",
)
print(vector_store.id)
```

## Delete

`vector_stores.delete(strvector_store_id)  -> VectorStoreDeleted`

**delete** `/vector_stores/{vector_store_id}`

Delete a vector store.

### Parameters

- `vector_store_id: str`

### Returns

- `class VectorStoreDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["vector_store.deleted"]`

    - `"vector_store.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store_deleted = client.vector_stores.delete(
    "vector_store_id",
)
print(vector_store_deleted.id)
```

## Search

`vector_stores.search(strvector_store_id, VectorStoreSearchParams**kwargs)  -> SyncPage[VectorStoreSearchResponse]`

**post** `/vector_stores/{vector_store_id}/search`

Search a vector store for relevant chunks based on a query and file attributes filter.

### Parameters

- `vector_store_id: str`

- `query: Union[str, SequenceNotStr[str]]`

  A query string for a search

  - `str`

  - `SequenceNotStr[str]`

- `filters: Optional[Filters]`

  A filter to apply based on file attributes.

  - `class ComparisonFilter: …`

    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

    - `key: str`

      The key to compare against the value.

    - `type: Literal["eq", "ne", "gt", 3 more]`

      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

      - `eq`: equals
      - `ne`: not equal
      - `gt`: greater than
      - `gte`: greater than or equal
      - `lt`: less than
      - `lte`: less than or equal
      - `in`: in
      - `nin`: not in

      - `"eq"`

      - `"ne"`

      - `"gt"`

      - `"gte"`

      - `"lt"`

      - `"lte"`

    - `value: Union[str, float, bool, List[Union[str, float]]]`

      The value to compare against the attribute key; supports string, number, or boolean types.

      - `str`

      - `float`

      - `bool`

      - `List[Union[str, float]]`

        - `str`

        - `float`

  - `class CompoundFilter: …`

    Combine multiple filters using `and` or `or`.

    - `filters: List[Filter]`

      Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

      - `class ComparisonFilter: …`

        A filter used to compare a specified attribute key to a given value using a defined comparison operation.

        - `key: str`

          The key to compare against the value.

        - `type: Literal["eq", "ne", "gt", 3 more]`

          Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

          - `eq`: equals
          - `ne`: not equal
          - `gt`: greater than
          - `gte`: greater than or equal
          - `lt`: less than
          - `lte`: less than or equal
          - `in`: in
          - `nin`: not in

          - `"eq"`

          - `"ne"`

          - `"gt"`

          - `"gte"`

          - `"lt"`

          - `"lte"`

        - `value: Union[str, float, bool, List[Union[str, float]]]`

          The value to compare against the attribute key; supports string, number, or boolean types.

          - `str`

          - `float`

          - `bool`

          - `List[Union[str, float]]`

            - `str`

            - `float`

      - `object`

    - `type: Literal["and", "or"]`

      Type of operation: `and` or `or`.

      - `"and"`

      - `"or"`

- `max_num_results: Optional[int]`

  The maximum number of results to return. This number should be between 1 and 50 inclusive.

- `ranking_options: Optional[RankingOptions]`

  Ranking options for search.

  - `ranker: Optional[Literal["none", "auto", "default-2024-11-15"]]`

    Enable re-ranking; set to `none` to disable, which can help reduce latency.

    - `"none"`

    - `"auto"`

    - `"default-2024-11-15"`

  - `score_threshold: Optional[float]`

- `rewrite_query: Optional[bool]`

  Whether to rewrite the natural language query for vector search.

### Returns

- `class VectorStoreSearchResponse: …`

  - `attributes: Optional[Dict[str, Union[str, float, bool]]]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `str`

    - `float`

    - `bool`

  - `content: List[Content]`

    Content chunks from the file.

    - `text: str`

      The text content returned from search.

    - `type: Literal["text"]`

      The type of content.

      - `"text"`

  - `file_id: str`

    The ID of the vector store file.

  - `filename: str`

    The name of the vector store file.

  - `score: float`

    The similarity score for the result.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.vector_stores.search(
    vector_store_id="vs_abc123",
    query="string",
)
page = page.data[0]
print(page.file_id)
```

## Domain Types

### Auto File Chunking Strategy Param

- `class AutoFileChunkingStrategyParam: …`

  The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

  - `type: Literal["auto"]`

    Always `auto`.

    - `"auto"`

### File Chunking Strategy

- `FileChunkingStrategy`

  The strategy used to chunk the file.

  - `class StaticFileChunkingStrategyObject: …`

    - `static: StaticFileChunkingStrategy`

      - `chunk_overlap_tokens: int`

        The number of tokens that overlap between chunks. The default value is `400`.

        Note that the overlap must not exceed half of `max_chunk_size_tokens`.

      - `max_chunk_size_tokens: int`

        The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

    - `type: Literal["static"]`

      Always `static`.

      - `"static"`

  - `class OtherFileChunkingStrategyObject: …`

    This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

    - `type: Literal["other"]`

      Always `other`.

      - `"other"`

### File Chunking Strategy Param

- `FileChunkingStrategyParam`

  The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. Only applicable if `file_ids` is non-empty.

  - `class AutoFileChunkingStrategyParam: …`

    The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

    - `type: Literal["auto"]`

      Always `auto`.

      - `"auto"`

  - `class StaticFileChunkingStrategyObjectParam: …`

    Customize your own chunking strategy by setting chunk size and chunk overlap.

    - `static: StaticFileChunkingStrategy`

      - `chunk_overlap_tokens: int`

        The number of tokens that overlap between chunks. The default value is `400`.

        Note that the overlap must not exceed half of `max_chunk_size_tokens`.

      - `max_chunk_size_tokens: int`

        The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

    - `type: Literal["static"]`

      Always `static`.

      - `"static"`

### Other File Chunking Strategy Object

- `class OtherFileChunkingStrategyObject: …`

  This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

  - `type: Literal["other"]`

    Always `other`.

    - `"other"`

### Static File Chunking Strategy

- `class StaticFileChunkingStrategy: …`

  - `chunk_overlap_tokens: int`

    The number of tokens that overlap between chunks. The default value is `400`.

    Note that the overlap must not exceed half of `max_chunk_size_tokens`.

  - `max_chunk_size_tokens: int`

    The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

### Static File Chunking Strategy Object

- `class StaticFileChunkingStrategyObject: …`

  - `static: StaticFileChunkingStrategy`

    - `chunk_overlap_tokens: int`

      The number of tokens that overlap between chunks. The default value is `400`.

      Note that the overlap must not exceed half of `max_chunk_size_tokens`.

    - `max_chunk_size_tokens: int`

      The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

  - `type: Literal["static"]`

    Always `static`.

    - `"static"`

### Static File Chunking Strategy Object Param

- `class StaticFileChunkingStrategyObjectParam: …`

  Customize your own chunking strategy by setting chunk size and chunk overlap.

  - `static: StaticFileChunkingStrategy`

    - `chunk_overlap_tokens: int`

      The number of tokens that overlap between chunks. The default value is `400`.

      Note that the overlap must not exceed half of `max_chunk_size_tokens`.

    - `max_chunk_size_tokens: int`

      The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

  - `type: Literal["static"]`

    Always `static`.

    - `"static"`

### Vector Store

- `class VectorStore: …`

  A vector store is a collection of processed files can be used by the `file_search` tool.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: FileCounts`

    - `cancelled: int`

      The number of files that were cancelled.

    - `completed: int`

      The number of files that have been successfully processed.

    - `failed: int`

      The number of files that have failed to process.

    - `in_progress: int`

      The number of files that are currently being processed.

    - `total: int`

      The total number of files.

  - `last_active_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: str`

    The name of the vector store.

  - `object: Literal["vector_store"]`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: Literal["expired", "in_progress", "completed"]`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: int`

    The total number of bytes used by the files in the vector store.

  - `expires_after: Optional[ExpiresAfter]`

    The expiration policy for a vector store.

    - `anchor: Literal["last_active_at"]`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: int`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store will expire.

### Vector Store Deleted

- `class VectorStoreDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["vector_store.deleted"]`

    - `"vector_store.deleted"`

# Files

## List

`vector_stores.files.list(strvector_store_id, FileListParams**kwargs)  -> SyncCursorPage[VectorStoreFile]`

**get** `/vector_stores/{vector_store_id}/files`

Returns a list of vector store files.

### Parameters

- `vector_store_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `filter: Optional[Literal["in_progress", "completed", "failed", "cancelled"]]`

  Filter by file status. One of `in_progress`, `completed`, `failed`, `cancelled`.

  - `"in_progress"`

  - `"completed"`

  - `"failed"`

  - `"cancelled"`

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class VectorStoreFile: …`

  A list of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: Optional[LastError]`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: Literal["server_error", "unsupported_file", "invalid_file"]`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: str`

      A human-readable description of the error.

  - `object: Literal["vector_store.file"]`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: int`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

  - `attributes: Optional[Dict[str, Union[str, float, bool]]]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `str`

    - `float`

    - `bool`

  - `chunking_strategy: Optional[FileChunkingStrategy]`

    The strategy used to chunk the file.

    - `class StaticFileChunkingStrategyObject: …`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: int`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: int`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: Literal["static"]`

        Always `static`.

        - `"static"`

    - `class OtherFileChunkingStrategyObject: …`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: Literal["other"]`

        Always `other`.

        - `"other"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.vector_stores.files.list(
    vector_store_id="vector_store_id",
)
page = page.data[0]
print(page.id)
```

## Create

`vector_stores.files.create(strvector_store_id, FileCreateParams**kwargs)  -> VectorStoreFile`

**post** `/vector_stores/{vector_store_id}/files`

Create a vector store file by attaching a [File](https://platform.openai.com/docs/api-reference/files) to a [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object).

### Parameters

- `vector_store_id: str`

- `file_id: str`

  A [File](https://platform.openai.com/docs/api-reference/files) ID that the vector store should use. Useful for tools like `file_search` that can access files.

- `attributes: Optional[Dict[str, Union[str, float, bool]]]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard. Keys are strings
  with a maximum length of 64 characters. Values are strings with a maximum
  length of 512 characters, booleans, or numbers.

  - `str`

  - `float`

  - `bool`

- `chunking_strategy: Optional[FileChunkingStrategyParam]`

  The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. Only applicable if `file_ids` is non-empty.

  - `class AutoFileChunkingStrategyParam: …`

    The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

    - `type: Literal["auto"]`

      Always `auto`.

      - `"auto"`

  - `class StaticFileChunkingStrategyObjectParam: …`

    Customize your own chunking strategy by setting chunk size and chunk overlap.

    - `static: StaticFileChunkingStrategy`

      - `chunk_overlap_tokens: int`

        The number of tokens that overlap between chunks. The default value is `400`.

        Note that the overlap must not exceed half of `max_chunk_size_tokens`.

      - `max_chunk_size_tokens: int`

        The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

    - `type: Literal["static"]`

      Always `static`.

      - `"static"`

### Returns

- `class VectorStoreFile: …`

  A list of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: Optional[LastError]`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: Literal["server_error", "unsupported_file", "invalid_file"]`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: str`

      A human-readable description of the error.

  - `object: Literal["vector_store.file"]`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: int`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

  - `attributes: Optional[Dict[str, Union[str, float, bool]]]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `str`

    - `float`

    - `bool`

  - `chunking_strategy: Optional[FileChunkingStrategy]`

    The strategy used to chunk the file.

    - `class StaticFileChunkingStrategyObject: …`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: int`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: int`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: Literal["static"]`

        Always `static`.

        - `"static"`

    - `class OtherFileChunkingStrategyObject: …`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: Literal["other"]`

        Always `other`.

        - `"other"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store_file = client.vector_stores.files.create(
    vector_store_id="vs_abc123",
    file_id="file_id",
)
print(vector_store_file.id)
```

## Update

`vector_stores.files.update(strfile_id, FileUpdateParams**kwargs)  -> VectorStoreFile`

**post** `/vector_stores/{vector_store_id}/files/{file_id}`

Update attributes on a vector store file.

### Parameters

- `vector_store_id: str`

- `file_id: str`

- `attributes: Optional[Dict[str, Union[str, float, bool]]]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard. Keys are strings
  with a maximum length of 64 characters. Values are strings with a maximum
  length of 512 characters, booleans, or numbers.

  - `str`

  - `float`

  - `bool`

### Returns

- `class VectorStoreFile: …`

  A list of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: Optional[LastError]`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: Literal["server_error", "unsupported_file", "invalid_file"]`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: str`

      A human-readable description of the error.

  - `object: Literal["vector_store.file"]`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: int`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

  - `attributes: Optional[Dict[str, Union[str, float, bool]]]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `str`

    - `float`

    - `bool`

  - `chunking_strategy: Optional[FileChunkingStrategy]`

    The strategy used to chunk the file.

    - `class StaticFileChunkingStrategyObject: …`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: int`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: int`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: Literal["static"]`

        Always `static`.

        - `"static"`

    - `class OtherFileChunkingStrategyObject: …`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: Literal["other"]`

        Always `other`.

        - `"other"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store_file = client.vector_stores.files.update(
    file_id="file-abc123",
    vector_store_id="vs_abc123",
    attributes={
        "foo": "string"
    },
)
print(vector_store_file.id)
```

## Retrieve

`vector_stores.files.retrieve(strfile_id, FileRetrieveParams**kwargs)  -> VectorStoreFile`

**get** `/vector_stores/{vector_store_id}/files/{file_id}`

Retrieves a vector store file.

### Parameters

- `vector_store_id: str`

- `file_id: str`

### Returns

- `class VectorStoreFile: …`

  A list of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: Optional[LastError]`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: Literal["server_error", "unsupported_file", "invalid_file"]`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: str`

      A human-readable description of the error.

  - `object: Literal["vector_store.file"]`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: int`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

  - `attributes: Optional[Dict[str, Union[str, float, bool]]]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `str`

    - `float`

    - `bool`

  - `chunking_strategy: Optional[FileChunkingStrategy]`

    The strategy used to chunk the file.

    - `class StaticFileChunkingStrategyObject: …`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: int`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: int`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: Literal["static"]`

        Always `static`.

        - `"static"`

    - `class OtherFileChunkingStrategyObject: …`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: Literal["other"]`

        Always `other`.

        - `"other"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store_file = client.vector_stores.files.retrieve(
    file_id="file-abc123",
    vector_store_id="vs_abc123",
)
print(vector_store_file.id)
```

## Delete

`vector_stores.files.delete(strfile_id, FileDeleteParams**kwargs)  -> VectorStoreFileDeleted`

**delete** `/vector_stores/{vector_store_id}/files/{file_id}`

Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted. To delete the file, use the [delete file](https://platform.openai.com/docs/api-reference/files/delete) endpoint.

### Parameters

- `vector_store_id: str`

- `file_id: str`

### Returns

- `class VectorStoreFileDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["vector_store.file.deleted"]`

    - `"vector_store.file.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store_file_deleted = client.vector_stores.files.delete(
    file_id="file_id",
    vector_store_id="vector_store_id",
)
print(vector_store_file_deleted.id)
```

## Content

`vector_stores.files.content(strfile_id, FileContentParams**kwargs)  -> SyncPage[FileContentResponse]`

**get** `/vector_stores/{vector_store_id}/files/{file_id}/content`

Retrieve the parsed contents of a vector store file.

### Parameters

- `vector_store_id: str`

- `file_id: str`

### Returns

- `class FileContentResponse: …`

  - `text: Optional[str]`

    The text content

  - `type: Optional[str]`

    The content type (currently only `"text"`)

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.vector_stores.files.content(
    file_id="file-abc123",
    vector_store_id="vs_abc123",
)
page = page.data[0]
print(page.text)
```

## Domain Types

### Vector Store File

- `class VectorStoreFile: …`

  A list of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: Optional[LastError]`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: Literal["server_error", "unsupported_file", "invalid_file"]`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: str`

      A human-readable description of the error.

  - `object: Literal["vector_store.file"]`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: int`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

  - `attributes: Optional[Dict[str, Union[str, float, bool]]]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `str`

    - `float`

    - `bool`

  - `chunking_strategy: Optional[FileChunkingStrategy]`

    The strategy used to chunk the file.

    - `class StaticFileChunkingStrategyObject: …`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: int`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: int`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: Literal["static"]`

        Always `static`.

        - `"static"`

    - `class OtherFileChunkingStrategyObject: …`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: Literal["other"]`

        Always `other`.

        - `"other"`

### Vector Store File Deleted

- `class VectorStoreFileDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["vector_store.file.deleted"]`

    - `"vector_store.file.deleted"`

# File Batches

## Create

`vector_stores.file_batches.create(strvector_store_id, FileBatchCreateParams**kwargs)  -> VectorStoreFileBatch`

**post** `/vector_stores/{vector_store_id}/file_batches`

Create a vector store file batch.

### Parameters

- `vector_store_id: str`

- `attributes: Optional[Dict[str, Union[str, float, bool]]]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard. Keys are strings
  with a maximum length of 64 characters. Values are strings with a maximum
  length of 512 characters, booleans, or numbers.

  - `str`

  - `float`

  - `bool`

- `chunking_strategy: Optional[FileChunkingStrategyParam]`

  The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. Only applicable if `file_ids` is non-empty.

  - `class AutoFileChunkingStrategyParam: …`

    The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

    - `type: Literal["auto"]`

      Always `auto`.

      - `"auto"`

  - `class StaticFileChunkingStrategyObjectParam: …`

    Customize your own chunking strategy by setting chunk size and chunk overlap.

    - `static: StaticFileChunkingStrategy`

      - `chunk_overlap_tokens: int`

        The number of tokens that overlap between chunks. The default value is `400`.

        Note that the overlap must not exceed half of `max_chunk_size_tokens`.

      - `max_chunk_size_tokens: int`

        The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

    - `type: Literal["static"]`

      Always `static`.

      - `"static"`

- `file_ids: Optional[SequenceNotStr[str]]`

  A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files.  If `attributes` or `chunking_strategy` are provided, they will be  applied to all files in the batch. The maximum batch size is 2000 files. Mutually exclusive with `files`.

- `files: Optional[Iterable[File]]`

  A list of objects that each include a `file_id` plus optional `attributes` or `chunking_strategy`. Use this when you need to override metadata for specific files. The global `attributes` or `chunking_strategy` will be ignored and must be specified for each file. The maximum batch size is 2000 files. Mutually exclusive with `file_ids`.

  - `file_id: str`

    A [File](https://platform.openai.com/docs/api-reference/files) ID that the vector store should use. Useful for tools like `file_search` that can access files.

  - `attributes: Optional[Dict[str, Union[str, float, bool]]]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `str`

    - `float`

    - `bool`

  - `chunking_strategy: Optional[FileChunkingStrategyParam]`

    The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. Only applicable if `file_ids` is non-empty.

    - `class AutoFileChunkingStrategyParam: …`

      The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

      - `type: Literal["auto"]`

        Always `auto`.

        - `"auto"`

    - `class StaticFileChunkingStrategyObjectParam: …`

      Customize your own chunking strategy by setting chunk size and chunk overlap.

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: int`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: int`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: Literal["static"]`

        Always `static`.

        - `"static"`

### Returns

- `class VectorStoreFileBatch: …`

  A batch of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store files batch was created.

  - `file_counts: FileCounts`

    - `cancelled: int`

      The number of files that where cancelled.

    - `completed: int`

      The number of files that have been processed.

    - `failed: int`

      The number of files that have failed to process.

    - `in_progress: int`

      The number of files that are currently being processed.

    - `total: int`

      The total number of files.

  - `object: Literal["vector_store.files_batch"]`

    The object type, which is always `vector_store.file_batch`.

    - `"vector_store.files_batch"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store_file_batch = client.vector_stores.file_batches.create(
    vector_store_id="vs_abc123",
)
print(vector_store_file_batch.id)
```

## Retrieve

`vector_stores.file_batches.retrieve(strbatch_id, FileBatchRetrieveParams**kwargs)  -> VectorStoreFileBatch`

**get** `/vector_stores/{vector_store_id}/file_batches/{batch_id}`

Retrieves a vector store file batch.

### Parameters

- `vector_store_id: str`

- `batch_id: str`

### Returns

- `class VectorStoreFileBatch: …`

  A batch of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store files batch was created.

  - `file_counts: FileCounts`

    - `cancelled: int`

      The number of files that where cancelled.

    - `completed: int`

      The number of files that have been processed.

    - `failed: int`

      The number of files that have failed to process.

    - `in_progress: int`

      The number of files that are currently being processed.

    - `total: int`

      The total number of files.

  - `object: Literal["vector_store.files_batch"]`

    The object type, which is always `vector_store.file_batch`.

    - `"vector_store.files_batch"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store_file_batch = client.vector_stores.file_batches.retrieve(
    batch_id="vsfb_abc123",
    vector_store_id="vs_abc123",
)
print(vector_store_file_batch.id)
```

## Cancel

`vector_stores.file_batches.cancel(strbatch_id, FileBatchCancelParams**kwargs)  -> VectorStoreFileBatch`

**post** `/vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel`

Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible.

### Parameters

- `vector_store_id: str`

- `batch_id: str`

### Returns

- `class VectorStoreFileBatch: …`

  A batch of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store files batch was created.

  - `file_counts: FileCounts`

    - `cancelled: int`

      The number of files that where cancelled.

    - `completed: int`

      The number of files that have been processed.

    - `failed: int`

      The number of files that have failed to process.

    - `in_progress: int`

      The number of files that are currently being processed.

    - `total: int`

      The total number of files.

  - `object: Literal["vector_store.files_batch"]`

    The object type, which is always `vector_store.file_batch`.

    - `"vector_store.files_batch"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store_file_batch = client.vector_stores.file_batches.cancel(
    batch_id="batch_id",
    vector_store_id="vector_store_id",
)
print(vector_store_file_batch.id)
```

## List Files

`vector_stores.file_batches.list_files(strbatch_id, FileBatchListFilesParams**kwargs)  -> SyncCursorPage[VectorStoreFile]`

**get** `/vector_stores/{vector_store_id}/file_batches/{batch_id}/files`

Returns a list of vector store files in a batch.

### Parameters

- `vector_store_id: str`

- `batch_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `filter: Optional[Literal["in_progress", "completed", "failed", "cancelled"]]`

  Filter by file status. One of `in_progress`, `completed`, `failed`, `cancelled`.

  - `"in_progress"`

  - `"completed"`

  - `"failed"`

  - `"cancelled"`

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class VectorStoreFile: …`

  A list of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: Optional[LastError]`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: Literal["server_error", "unsupported_file", "invalid_file"]`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: str`

      A human-readable description of the error.

  - `object: Literal["vector_store.file"]`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: int`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

  - `attributes: Optional[Dict[str, Union[str, float, bool]]]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `str`

    - `float`

    - `bool`

  - `chunking_strategy: Optional[FileChunkingStrategy]`

    The strategy used to chunk the file.

    - `class StaticFileChunkingStrategyObject: …`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: int`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: int`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: Literal["static"]`

        Always `static`.

        - `"static"`

    - `class OtherFileChunkingStrategyObject: …`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: Literal["other"]`

        Always `other`.

        - `"other"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.vector_stores.file_batches.list_files(
    batch_id="batch_id",
    vector_store_id="vector_store_id",
)
page = page.data[0]
print(page.id)
```

## Domain Types

### Vector Store File Batch

- `class VectorStoreFileBatch: …`

  A batch of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store files batch was created.

  - `file_counts: FileCounts`

    - `cancelled: int`

      The number of files that where cancelled.

    - `completed: int`

      The number of files that have been processed.

    - `failed: int`

      The number of files that have failed to process.

    - `in_progress: int`

      The number of files that are currently being processed.

    - `total: int`

      The total number of files.

  - `object: Literal["vector_store.files_batch"]`

    The object type, which is always `vector_store.file_batch`.

    - `"vector_store.files_batch"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.
