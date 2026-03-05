## Search

`client.vectorStores.search(stringvectorStoreID, VectorStoreSearchParamsbody, RequestOptionsoptions?): Page<VectorStoreSearchResponse>`

**post** `/vector_stores/{vector_store_id}/search`

Search a vector store for relevant chunks based on a query and file attributes filter.

### Parameters

- `vectorStoreID: string`

- `body: VectorStoreSearchParams`

  - `query: string | Array<string>`

    A query string for a search

    - `string`

    - `Array<string>`

  - `filters?: ComparisonFilter | CompoundFilter`

    A filter to apply based on file attributes.

    - `ComparisonFilter`

      A filter used to compare a specified attribute key to a given value using a defined comparison operation.

      - `key: string`

        The key to compare against the value.

      - `type: "eq" | "ne" | "gt" | 3 more`

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

      - `value: string | number | boolean | Array<string | number>`

        The value to compare against the attribute key; supports string, number, or boolean types.

        - `string`

        - `number`

        - `boolean`

        - `Array<string | number>`

          - `string`

          - `number`

    - `CompoundFilter`

      Combine multiple filters using `and` or `or`.

      - `filters: Array<ComparisonFilter | unknown>`

        Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

        - `ComparisonFilter`

          A filter used to compare a specified attribute key to a given value using a defined comparison operation.

          - `key: string`

            The key to compare against the value.

          - `type: "eq" | "ne" | "gt" | 3 more`

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

          - `value: string | number | boolean | Array<string | number>`

            The value to compare against the attribute key; supports string, number, or boolean types.

            - `string`

            - `number`

            - `boolean`

            - `Array<string | number>`

              - `string`

              - `number`

        - `unknown`

      - `type: "and" | "or"`

        Type of operation: `and` or `or`.

        - `"and"`

        - `"or"`

  - `max_num_results?: number`

    The maximum number of results to return. This number should be between 1 and 50 inclusive.

  - `ranking_options?: RankingOptions`

    Ranking options for search.

    - `ranker?: "none" | "auto" | "default-2024-11-15"`

      Enable re-ranking; set to `none` to disable, which can help reduce latency.

      - `"none"`

      - `"auto"`

      - `"default-2024-11-15"`

    - `score_threshold?: number`

  - `rewrite_query?: boolean`

    Whether to rewrite the natural language query for vector search.

### Returns

- `VectorStoreSearchResponse`

  - `attributes: Record<string, string | number | boolean> | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `string`

    - `number`

    - `boolean`

  - `content: Array<Content>`

    Content chunks from the file.

    - `text: string`

      The text content returned from search.

    - `type: "text"`

      The type of content.

      - `"text"`

  - `file_id: string`

    The ID of the vector store file.

  - `filename: string`

    The name of the vector store file.

  - `score: number`

    The similarity score for the result.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const vectorStoreSearchResponse of client.vectorStores.search('vs_abc123', {
  query: 'string',
})) {
  console.log(vectorStoreSearchResponse.file_id);
}
```
