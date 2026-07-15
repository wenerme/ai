# Retrieval

The **Retrieval API** allows you to perform [**semantic search**](#semantic-search) over your data, which is a technique that surfaces semantically similar results — even when they match few or no keywords. Retrieval is useful on its own, but is especially powerful when combined with our models to synthesize responses.

![Retrieval depiction](https://cdn.openai.com/API/docs/images/retrieval-depiction.png)

The Retrieval API is powered by [**vector stores**](#vector-stores), which serve as indices for your data. This guide will cover how to perform semantic search, and go into the details of vector stores.

## Quickstart

<li className={s.StandaloneLi} data-number={1}>
  **Create vector store** and upload files.
</li>

Create vector store with files

```python
from openai import OpenAI
client = OpenAI()

vector_store = client.vector_stores.create(        # Create vector store
    name="Support FAQ",
)

client.vector_stores.files.upload_and_poll(        # Upload file
    vector_store_id=vector_store.id,
    file=open("customer_policies.txt", "rb")
)
```

```javascript
import OpenAI from "openai";
const client = new OpenAI();

const vector_store = await client.vectorStores.create({   // Create vector store
    name: "Support FAQ",
});

await client.vector_stores.files.upload_and_poll({         // Upload file
    vector_store_id: vector_store.id,
    file: fs.createReadStream("customer_policies.txt"),
});
```


<li className={s.StandaloneLi} data-number={2}>
  **Send search query** to get relevant results.
</li>

Search query

```python
user_query = "What is the return policy?"

results = client.vector_stores.search(
    vector_store_id=vector_store.id,
    query=user_query,
)
```

```javascript
const userQuery = "What is the return policy?";

const results = await client.vectorStores.search({
    vector_store_id: vector_store.id,
    query: userQuery,
});
```


To learn how to use the results with our models, check out the [synthesizing
  responses](#synthesizing-responses) section.

## Semantic search

**Semantic search** is a technique that leverages [vector embeddings](https://developers.openai.com/api/docs/guides/embeddings) to surface semantically relevant results. Importantly, this includes results with few or no shared keywords, which classical search techniques might miss.

For example, let's look at potential results for `"When did we go to the moon?"`:

| Text                                              | Keyword Similarity | Semantic Similarity |
| ------------------------------------------------- | ------------------ | ------------------- |
| The first lunar landing occurred in July of 1969. | 0%                 | 65%                 |
| The first man on the moon was Neil Armstrong.     | 27%                | 43%                 |
| When I ate the moon cake, it was delicious.       | 40%                | 28%                 |

_([Jaccard](https://en.wikipedia.org/wiki/Jaccard_index) used for keyword, [cosine](https://en.wikipedia.org/wiki/Cosine_similarity) with `text-embedding-3-small` used for semantic.)_

Notice how the most relevant result contains none of the words in the search query. This flexibility makes semantic search a very powerful technique for querying knowledge bases of any size.

Semantic search is powered by [vector stores](#vector-stores), which we cover in detail later in the guide. This section will focus on the mechanics of semantic search.

### Performing semantic search

You can query a vector store using the `search` function and specifying a `query` in natural language. This will return a list of results, each with the relevant chunks, similarity scores, and file of origin.

Search query

```python
results = client.vector_stores.search(
    vector_store_id=vector_store.id,
    query="How many woodchucks are allowed per passenger?",
)
```

```javascript
const results = await client.vectorStores.search({
    vector_store_id: vector_store.id,
    query: "How many woodchucks are allowed per passenger?",
});
```


Results

```json
{
  "object": "vector_store.search_results.page",
  "search_query": "How many woodchucks are allowed per passenger?",
  "data": [
    {
      "file_id": "file-12345",
      "filename": "woodchuck_policy.txt",
      "score": 0.85,
      "attributes": {
        "region": "North America",
        "author": "Wildlife Department"
      },
      "content": [
        {
          "type": "text",
          "text": "According to the latest regulations, each passenger is allowed to carry up to two woodchucks."
        },
        {
          "type": "text",
          "text": "Ensure that the woodchucks are properly contained during transport."
        }
      ]
    },
    {
      "file_id": "file-67890",
      "filename": "transport_guidelines.txt",
      "score": 0.75,
      "attributes": {
        "region": "North America",
        "author": "Transport Authority"
      },
      "content": [
        {
          "type": "text",
          "text": "Passengers must adhere to the guidelines set forth by the Transport Authority regarding the transport of woodchucks."
        }
      ]
    }
  ],
  "has_more": false,
  "next_page": null
}
```


A response will contain 10 results maximum by default, but you can set up to 50 using the `max_num_results` param.

### Query rewriting

Certain query styles yield better results, so we've provided a setting to automatically rewrite your queries for optimal performance. Enable this feature by setting `rewrite_query=true` when performing a `search`.

The rewritten query will be available in the result's `search_query` field.

| **Original**                                                          | **Rewritten**                              |
| --------------------------------------------------------------------- | ------------------------------------------ |
| I'd like to know the height of the main office building.              | primary office building height             |
| What are the safety regulations for transporting hazardous materials? | safety regulations for hazardous materials |
| How do I file a complaint about a service issue?                      | service complaint filing process           |

### Attribute filtering

Attribute filtering helps narrow down results by applying criteria, such as restricting searches to a specific date range. You can define and combine criteria in `attribute_filter` to target files based on their attributes before performing semantic search.

Use **comparison filters** to compare a specific `key` in a file's `attributes` with a given `value`, and **compound filters** to combine multiple filters using `and` and `or`.

Comparison filter

```json
{
  "type": "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "nin",  // comparison operators
  "key": "attributes_key",                           // attributes key
  "value": "target_value"                             // value to compare against
}
```


Compound filter

```json
{
  "type": "and" | "or",                                // logical operators
  "filters": [...]                                   
}
```


Below are some example filters.



<div data-content-switcher-pane data-value="region">
    <div class="hidden">Region</div>
    Filter for a region

```json
{
  "type": "eq",
  "key": "region",
  "value": "us"
}
```

  </div>
  <div data-content-switcher-pane data-value="date-range" hidden>
    <div class="hidden">Date range</div>
    Filter for a date range

```json
{
  "type": "and",
  "filters": [
    {
      "type": "gte",
      "key": "date",
      "value": 1704067200  // unix timestamp for 2024-01-01
    },
    {
      "type": "lte",
      "key": "date",
      "value": 1710892800  // unix timestamp for 2024-03-20
    }
  ]
}
```

  </div>
  <div data-content-switcher-pane data-value="filename" hidden>
    <div class="hidden">Filenames</div>
    Filter to match any of a set of filenames

```json
{
  "type": "in",
  "property": "filename",
  "value": ["example.txt", "example2.txt"]
}
```

  </div>
  <div data-content-switcher-pane data-value="exclude-filenames" hidden>
    <div class="hidden">Exclude filenames</div>
    Filter to exclude drafts by filename

```json
{
  "type": "nin",
  "property": "filename",
  "value": ["draft.txt", "internal_notes.md"]
}
```

  </div>
  <div data-content-switcher-pane data-value="date-range-and-region" hidden>
    <div class="hidden">Complex</div>
    Filter for top secret projects with certain names in english

```json
{
  "type": "or",
  "filters": [
    {
      "type": "and",
      "filters": [
        {
          "type": "or",
          "filters": [
            {
              "type": "eq",
              "key": "project_code",
              "value": "X123"
            },
            {
              "type": "eq",
              "key": "project_code",
              "value": "X999"
            }
          ]
        },
        {
          "type": "eq",
          "key": "confidentiality",
          "value": "top_secret"
        }
      ]
    },
    {
      "type": "eq",
      "key": "language",
      "value": "en"
    }
  ]
}
```

  </div>



### Ranking

If you find that your file search results are not sufficiently relevant, you can adjust the `ranking_options` to improve the quality of responses. This includes specifying a `ranker`, such as `auto` or `default-2024-08-21`, and setting a `score_threshold` between 0.0 and 1.0. A higher `score_threshold` will limit the results to more relevant chunks, though it may exclude some potentially useful ones. When `ranking_options.hybrid_search` is provided you can also tune `hybrid_search.embedding_weight` (`rrf_embedding_weight`) and `hybrid_search.text_weight` (`rrf_text_weight`) to control how reciprocal rank fusion balances semantic embedding matches vs. sparse keyword matches. Increase the former to emphasize semantic similarity, increase the latter to emphasize textual overlap, and ensure at least one of the weights is greater than zero.

## Vector stores

Vector stores are the containers that power semantic search for the Retrieval API and the [file search](https://developers.openai.com/api/docs/guides/tools-file-search) tool. When you add a file to a vector store it will be automatically chunked, embedded, and indexed.

Vector stores contain `vector_store_file` objects, which are backed by a `file` object.

| <div style={{ minWidth: '150px', whiteSpace: 'nowrap' }}>Object type</div> | Description                                                                                                                                                                           |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `file`                                                                     | Represents content uploaded through the [Files API](https://developers.openai.com/api/docs/api-reference/files). Often used with vector stores, but also for fine-tuning and other use cases.                      |
| `vector_store`                                                             | Container for searchable files.                                                                                                                                                       |
| `vector_store.file`                                                        | Wrapper type specifically representing a `file` that has been chunked and embedded, and has been associated with a `vector_store`. <br/>Contains `attributes` map used for filtering. |

### Pricing

You will be charged based on the total storage used across all your vector stores, determined by the size of parsed chunks and their corresponding embeddings.

| Storage                        | Cost         |
| ------------------------------ | ------------ |
| Up to 1 GB (across all stores) | Free         |
| Beyond 1 GB                    | $0.10/GB/day |

See [expiration policies](#expiration-policies) for options to minimize costs.

### Vector store operations



<div data-content-switcher-pane data-value="create">
    <div class="hidden">Create</div>
    Create vector store

```python
client.vector_stores.create(
    name="Support FAQ",
    file_ids=["file_123"]
)
```

```javascript
await client.vector_stores.create({
    name: "Support FAQ",
    file_ids: ["file_123"]
});
```

  </div>
  <div data-content-switcher-pane data-value="retrieve" hidden>
    <div class="hidden">Retrieve</div>
    Retrieve vector store

```python
client.vector_stores.retrieve(
    vector_store_id="vs_123"
)
```

```javascript
await client.vector_stores.retrieve({
    vector_store_id: "vs_123"
});
```

  </div>
  <div data-content-switcher-pane data-value="update" hidden>
    <div class="hidden">Update</div>
    Update vector store

```python
client.vector_stores.update(
    vector_store_id="vs_123",
    name="Support FAQ Updated"
)
```

```javascript
await client.vector_stores.update({
    vector_store_id: "vs_123",
    name: "Support FAQ Updated"
});
```

  </div>
  <div data-content-switcher-pane data-value="delete" hidden>
    <div class="hidden">Delete</div>
    Delete vector store

```python
client.vector_stores.delete(
    vector_store_id="vs_123"
)
```

```javascript
await client.vector_stores.delete({
    vector_store_id: "vs_123"
});
```

  </div>
  <div data-content-switcher-pane data-value="list" hidden>
    <div class="hidden">List</div>
    List vector stores

```python
client.vector_stores.list()
```

```javascript
await client.vector_stores.list();
```

  </div>



### Vector store file operations

Some operations, like `create` for `vector_store.file`, are asynchronous and may take time to complete — use our helper functions, like `create_and_poll` to block until it is. Otherwise, you may check the status. Removing files from a vector store is eventually consistent, and search results may still include content from a removed file for a short period.

Adding files is rate limited per vector store ID. Requests to [`/vector_stores/{vector_store_id}/files`](https://developers.openai.com/api/docs/api-reference/vector-stores/createFile) and [`/vector_stores/{vector_store_id}/file_batches`](https://developers.openai.com/api/docs/api-reference/vector-stores/createBatch) share a per-vector-store limit of 300 requests per minute.



<div data-content-switcher-pane data-value="create">
    <div class="hidden">Create</div>
    Create vector store file

```python
client.vector_stores.files.create_and_poll(
    vector_store_id="vs_123",
    file_id="file_123"
)
```

```javascript
await client.vector_stores.files.create_and_poll({
    vector_store_id: "vs_123",
    file_id: "file_123"
});
```

  </div>
  <div data-content-switcher-pane data-value="upload" hidden>
    <div class="hidden">Upload</div>
    Upload vector store file

```python
client.vector_stores.files.upload_and_poll(
    vector_store_id="vs_123",
    file=open("customer_policies.txt", "rb")
)
```

```javascript
await client.vector_stores.files.upload_and_poll({
    vector_store_id: "vs_123",
    file: fs.createReadStream("customer_policies.txt"),
});
```

  </div>
  <div data-content-switcher-pane data-value="retrieve" hidden>
    <div class="hidden">Retrieve</div>
    Retrieve vector store file

```python
client.vector_stores.files.retrieve(
    vector_store_id="vs_123",
    file_id="file_123"
)
```

```javascript
await client.vector_stores.files.retrieve({
    vector_store_id: "vs_123",
    file_id: "file_123"
});
```

  </div>
  <div data-content-switcher-pane data-value="update" hidden>
    <div class="hidden">Update</div>
    Update vector store file

```python
client.vector_stores.files.update(
    vector_store_id="vs_123",
    file_id="file_123",
    attributes={"key": "value"}
)
```

```javascript
await client.vector_stores.files.update({
    vector_store_id: "vs_123",
    file_id: "file_123",
    attributes: { key: "value" }
});
```

  </div>
  <div data-content-switcher-pane data-value="delete" hidden>
    <div class="hidden">Delete</div>
    Delete vector store file

```python
client.vector_stores.files.delete(
    vector_store_id="vs_123",
    file_id="file_123"
)
```

```javascript
await client.vector_stores.files.delete({
    vector_store_id: "vs_123",
    file_id: "file_123"
});
```

  </div>
  <div data-content-switcher-pane data-value="list" hidden>
    <div class="hidden">List</div>
    List vector store files

```python
client.vector_stores.files.list(
    vector_store_id="vs_123"
)
```

```javascript
await client.vector_stores.files.list({
    vector_store_id: "vs_123"
});
```

  </div>



### Batch operations



<div data-content-switcher-pane data-value="create">
    <div class="hidden">Create</div>
    Batch create operation

```python
client.vector_stores.file_batches.create_and_poll(
    vector_store_id="vs_123",
    files=[
        {
            "file_id": "file_123",
            "attributes": {"department": "finance"}
        },
        {
            "file_id": "file_456",
            "chunking_strategy": {
                "type": "static",
                "max_chunk_size_tokens": 1200,
                "chunk_overlap_tokens": 200
            }
        }
    ]
)
```

```javascript
await client.vector_stores.file_batches.create_and_poll({
    vector_store_id: "vs_123",
    files: [
        {
            file_id: "file_123",
            attributes: { department: "finance" }
        },
        {
            file_id: "file_456",
            chunking_strategy: {
                type: "static",
                max_chunk_size_tokens: 1200,
                chunk_overlap_tokens: 200
            }
        }
    ]
});
```

  </div>
  <div data-content-switcher-pane data-value="retrieve" hidden>
    <div class="hidden">Retrieve</div>
    Batch retrieve operation

```python
client.vector_stores.file_batches.retrieve(
    vector_store_id="vs_123",
    batch_id="vsfb_123"
)
```

```javascript
await client.vector_stores.file_batches.retrieve({
    vector_store_id: "vs_123",
    batch_id: "vsfb_123"
});
```

  </div>
  <div data-content-switcher-pane data-value="cancel" hidden>
    <div class="hidden">Cancel</div>
    Batch cancel operation

```python
client.vector_stores.file_batches.cancel(
    vector_store_id="vs_123",
    batch_id="vsfb_123"
)
```

```javascript
await client.vector_stores.file_batches.cancel({
    vector_store_id: "vs_123",
    batch_id: "vsfb_123"
});
```

  </div>
  <div data-content-switcher-pane data-value="list" hidden>
    <div class="hidden">List</div>
    Batch list operation

```python
client.vector_stores.file_batches.list(
    vector_store_id="vs_123"
)
```

```javascript
await client.vector_stores.file_batches.list({
    vector_store_id: "vs_123"
});
```

  </div>



When creating a batch you can either provide `file_ids` with optional `attributes` and/or `chunking_strategy`, or use the `files` array to pass objects that include a `file_id` plus optional `attributes` and `chunking_strategy` for each file. The two options are mutually exclusive so that you can cleanly control whether every file shares the same settings or you need per-file overrides.

For higher-throughput ingestion into a single vector store, we recommend batch creation whenever possible. Batches can include up to 500 files in one request, which usually reduces contention and improves end-to-end latency versus sending many single-file create requests.

### Attributes

Each `vector_store.file` can have associated `attributes`, a dictionary of values that can be referenced when performing [semantic search](#semantic-search) with [attribute filtering](#attribute-filtering). The dictionary can have at most 16 keys, with a limit of 256 characters each.

Create vector store file with attributes

```python
client.vector_stores.files.create(
    vector_store_id="<vector_store_id>",
    file_id="file_123",
    attributes={
        "region": "US",
        "category": "Marketing",
        "date": 1672531200      # Jan 1, 2023
    }
)
```

```javascript
await client.vector_stores.files.create(<vector_store_id>, {
    file_id: "file_123",
    attributes: {
        region: "US",
        category: "Marketing",
        date: 1672531200, // Jan 1, 2023
    },
});
```


### Expiration policies

You can set an expiration policy on `vector_store` objects with `expires_after`. Once a vector store expires, all associated `vector_store.file` objects will be deleted and you'll no longer be charged for them.

Set expiration policy for vector store

```python
client.vector_stores.update(
    vector_store_id="vs_123",
    expires_after={
        "anchor": "last_active_at",
        "days": 7
    }
)
```

```javascript
await client.vector_stores.update({
    vector_store_id: "vs_123",
    expires_after: {
        anchor: "last_active_at",
        days: 7,
    },
});
```


### Limits

The maximum file size is 512 MB. Each file should contain no more than 5,000,000 tokens per file (computed automatically when you attach a file).

### Chunking

By default, `max_chunk_size_tokens` is set to `800` and `chunk_overlap_tokens` is set to `400`, meaning every file is indexed by being split up into 800-token chunks, with 400-token overlap between consecutive chunks.

You can adjust this by setting [`chunking_strategy`](https://developers.openai.com/api/docs/api-reference/vector-stores-files/createFile#vector-stores-files-createfile-chunking_strategy) when adding files to the vector store. There are certain limitations to `chunking_strategy`:

- `max_chunk_size_tokens` must be between 100 and 4096 inclusive.
- `chunk_overlap_tokens` must be non-negative and should not exceed `max_chunk_size_tokens / 2`.

Supported file types

_For `text/` MIME types, the encoding must be one of `utf-8`, `utf-16`, or `ascii`._

{/* Keep this table in sync with RETRIEVAL_SUPPORTED_EXTENSIONS in the agentapi service */}

| File format | MIME type                                                                   |
| ----------- | --------------------------------------------------------------------------- |
| `.c`        | `text/x-c`                                                                  |
| `.cpp`      | `text/x-c++`                                                                |
| `.cs`       | `text/x-csharp`                                                             |
| `.css`      | `text/css`                                                                  |
| `.doc`      | `application/msword`                                                        |
| `.docx`     | `application/vnd.openxmlformats-officedocument.wordprocessingml.document`   |
| `.go`       | `text/x-golang`                                                             |
| `.html`     | `text/html`                                                                 |
| `.java`     | `text/x-java`                                                               |
| `.js`       | `text/javascript`                                                           |
| `.json`     | `application/json`                                                          |
| `.md`       | `text/markdown`                                                             |
| `.pdf`      | `application/pdf`                                                           |
| `.php`      | `text/x-php`                                                                |
| `.pptx`     | `application/vnd.openxmlformats-officedocument.presentationml.presentation` |
| `.py`       | `text/x-python`                                                             |
| `.py`       | `text/x-script.python`                                                      |
| `.rb`       | `text/x-ruby`                                                               |
| `.sh`       | `application/x-sh`                                                          |
| `.tex`      | `text/x-tex`                                                                |
| `.ts`       | `application/typescript`                                                    |
| `.txt`      | `text/plain`                                                                |

## Synthesizing responses

After performing a query you may want to synthesize a response based on the results. You can leverage our models to do so, by supplying the results and original query, to get back a grounded response.

Perform search query to get results

```python
from openai import OpenAI

client = OpenAI()

user_query = "What is the return policy?"

results = client.vector_stores.search(
    vector_store_id=vector_store.id,
    query=user_query,
)
```

```javascript
import OpenAI from "openai";
const client = new OpenAI();

const userQuery = "What is the return policy?";

const results = await client.vectorStores.search({
    vector_store_id: vector_store.id,
    query: userQuery,
});
```


Synthesize a response based on results

```python
formatted_results = format_results(results.data)

'\n'.join('\n'.join(c.text) for c in result.content for result in results.data)

completion = client.chat.completions.create(
    model="gpt-5.6",
    messages=[
        {
            "role": "developer",
            "content": "Produce a concise answer to the query based on the provided sources."
        },
        {
            "role": "user",
            "content": f"Sources: {formatted_results}\n\nQuery: '{user_query}'"
        }
    ],
)

print(completion.choices[0].message.content)
```

```javascript
const formattedResults = formatResults(results.data);
// Join the text content of all results
const textSources = results.data.map(result => result.content.map(c => c.text).join('\n')).join('\n');

const completion = await client.chat.completions.create({
    model: "gpt-5.6",
    messages: [
        {
            role: "developer",
            content: "Produce a concise answer to the query based on the provided sources."
        },
        {
            role: "user",
            content: `Sources: ${formattedResults}\n\nQuery: '${userQuery}'`
        }
    ],
});

console.log(completion.choices[0].message.content);
```


```json
"Our return policy allows returns within 30 days of purchase."
```

This uses a sample `format_results` function, which could be implemented like
so:

Sample result formatting function

```python
def format_results(results):
    formatted_results = ''
    for result in results.data:
        formatted_result = f"<result file_id='{result.file_id}' file_name='{result.file_name}'>"
        for part in result.content:
            formatted_result += f"<content>{part.text}</content>"
        formatted_results += formatted_result + "</result>"
    return f"<sources>{formatted_results}</sources>"
```

```javascript
function formatResults(results) {
    let formattedResults = '';
    for (const result of results.data) {
        let formattedResult = `<result file_id='${result.file_id}' file_name='${result.file_name}'>`;
        for (const part of result.content) {
            formattedResult += `<content>${part.text}</content>`;
        }
        formattedResults += formattedResult + "</result>";
    }
    return `<sources>${formattedResults}</sources>`;
}
```