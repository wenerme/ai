# File search

import {
  CheckCircleFilled,
  XCircle,
} from "@components/react/oai/platform/ui/Icon.react";

import {
  uploadFileExample,
  createVectorStoreExample,
  addFileToVectorStoreExample,
  checkFileStatusExample,
  defaultSearchExample,
  defaultSearchResponse,
  limitResultsExample,
  includeSearchResultsExample,
  metadataFilteringExample,
} from "./file-search-examples";



File search is a tool available in the [Responses API](https://developers.openai.com/api/docs/api-reference/responses).
It enables models to retrieve information in a knowledge base of previously uploaded files through semantic and keyword search.
By creating vector stores and uploading files to them, you can augment the models' inherent knowledge by giving them access to these knowledge bases or `vector_stores`.

To learn more about how vector stores and semantic search work, refer to our
  [retrieval guide](https://developers.openai.com/api/docs/guides/retrieval).

This is a hosted tool managed by OpenAI, meaning you don't have to implement code on your end to handle its execution.
When the model decides to use it, it will automatically call the tool, retrieve information from your files, and return an output.

## How to use

Prior to using file search with the Responses API, you need to have set up a knowledge base in a vector store and uploaded files to it.

Create a vector store and upload a file

Follow these steps to create a vector store and upload a file to it. You can use [this example file](https://cdn.openai.com/API/docs/deep_research_blog.pdf) or upload your own.

#### Upload the file to the File API

#### Create a vector store

#### Add the file to the vector store

#### Check status

Run this code until the file is ready to be used (i.e., when the status is `completed`).

Once your knowledge base is set up, you can include the `file_search` tool in the list of tools available to the model, along with the list of vector stores in which to search.

When this tool is called by the model, you will receive a response with multiple outputs:

1. A `file_search_call` output item, which contains the id of the file search call.
2. A `message` output item, which contains the response from the model, along with the file citations.

## Retrieval customization

### Limiting the number of results

Using the file search tool with the Responses API, you can customize the number of results you want to retrieve from the vector stores. This can help reduce both token usage and latency, but may come at the cost of reduced answer quality.

### Include search results in the response

While you can see annotations (references to files) in the output text, the file search call will not return search results by default.

To include search results in the response, you can use the `include` parameter when creating the response.

### Metadata filtering

You can filter the search results based on the metadata of the files. For more details, refer to our [retrieval guide](https://developers.openai.com/api/docs/guides/retrieval), which covers:

- How to [set attributes on vector store files](https://developers.openai.com/api/docs/guides/retrieval#attributes)
- How to [define filters](https://developers.openai.com/api/docs/guides/retrieval#attribute-filtering)

## Supported files

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

## Usage notes

<table>
<tbody>

<tr>
  <th>API Availability</th>
  <th>Rate limits</th>
  <th>Notes</th>
</tr>

<tr>
<td>
<div className="mb-1 flex items-center gap-2">
    [Responses](https://developers.openai.com/api/docs/api-reference/responses)
</div>
<div className="mb-1 flex items-center gap-2">
    [Chat Completions](https://developers.openai.com/api/docs/api-reference/chat)
</div>
<div className="mb-1 flex items-center gap-2">
    [Assistants](https://developers.openai.com/api/docs/api-reference/assistants)
</div>
</td>
<td style={{"maxWidth": "150px"}}>
**Tier 1**<br/>
100 RPM

**Tier 2 and 3**<br/>
500 RPM

**Tier 4 and 5**<br/>
1000 RPM

</td>
<td style={{"maxWidth": "150px"}}>
[Pricing](https://developers.openai.com/api/docs/pricing#built-in-tools) <br/>
[ZDR and data residency](https://developers.openai.com/api/docs/guides/your-data)
</td>
</tr>

</tbody>
</table>