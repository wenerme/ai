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
