> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Embeddings

Embeddings are a numerical representation of text input that open up a number of unique use cases, such as clustering, similarity measurement and information retrieval. For an introduction, check out the [Embeddings guide](/docs/embeddings).

Unlike generative AI models that create new content, the Gemini Embedding model is only intended to transform the format of your input data into a numerical representation. While Google is responsible for providing an embedding model that transforms the format of your input data to the numerical-format requested, users retain full responsibility for the data they input and the resulting embeddings. By using the Gemini Embedding model you confirm that you have the necessary rights to any content that you upload. Do not generate content that infringes on others' intellectual property or privacy rights. Your use of this service is subject to our [Prohibited Use Policy](https://policies.google.com/terms/generative-ai/use-policy) and [Google's Terms of Service](/docs/terms).

## Methods  {% id="methods" %}

{% table %}
  * Method
  * HTTP request

  ---

  * [Embedding content](/api-reference/embeddings/embed-content)
  *     {% mark class="http-post" %}{% icon name="north_east" /%}`POST`{% /mark %} `/v1beta/models/{model}:embedContent`

    Generates a text embedding vector from the input `Content` using the specified [Gemini Embedding model](/docs/models#specialized-task-models).


  ---

  * [Embedding a batch of contents](/api-reference/embeddings/batch-embed-contents)
  *     {% mark class="http-post" %}{% icon name="north_east" /%}`POST`{% /mark %} `/v1beta/models/{model}:batchEmbedContents`

    Generates multiple embedding vectors from the input `Content` which consists of a batch of strings represented as `EmbedContentRequest` objects.


  ---

  * [Creating an embedding batch](/api-reference/embeddings/async-batch-embed-content)
  *     {% mark class="http-post" %}{% icon name="north_east" /%}`POST`{% /mark %} `/v1beta/models/{model}:asyncBatchEmbedContent`

    Enqueues a batch of `EmbedContent` requests for batch processing.

{% /table %}

## Data Models  {% id="data-models" %}

### EmbedContentResponse  {% id="Resource:EmbedContentResponse" %}

The response to an `EmbedContentRequest`.

**Properties:**

{% section class="api-ref-property-list" %}
  **embedding**: [`ContentEmbedding`](/api-reference/embeddings#Resource:ContentEmbedding)

  Output only. The embedding generated from the input content.

  {% hr /%}

  **usageMetadata**: [`EmbeddingUsageMetadata`](/api-reference/embeddings#Resource:EmbeddingUsageMetadata)

  Output only. The usage metadata for the request.

{% /section %}

### ContentEmbedding  {% id="Resource:ContentEmbedding" %}

A list of floats representing an embedding.

**Properties:**

{% section class="api-ref-property-list" %}
  **values**: `number array`

  The embedding values. This is for 3P users only and will not be populated for 1P calls.

  {% hr /%}

  **shape**: `integer array`

  This field stores the soft tokens tensor frame shape (e.g. [1, 1, 256, 2048]).

{% /section %}

### TaskType  {% id="Resource:TaskType" %}

**Possible values:**

- `TASK_TYPE_UNSPECIFIED`: Unset value, which will default to one of the other enum values.
- `RETRIEVAL_QUERY`: Specifies the given text is a query in a search/retrieval setting.
- `RETRIEVAL_DOCUMENT`: Specifies the given text is a document from the corpus being searched.
- `SEMANTIC_SIMILARITY`: Specifies the given text will be used for STS.
- `CLASSIFICATION`: Specifies that the given text will be classified.
- `CLUSTERING`: Specifies that the embeddings will be used for clustering.
- `QUESTION_ANSWERING`: Specifies that the given text will be used for question answering.
- `FACT_VERIFICATION`: Specifies that the given text will be used for fact verification.
- `CODE_RETRIEVAL_QUERY`: Specifies that the given text will be used for code retrieval.

### EmbedContentBatch  {% id="Resource:EmbedContentBatch" %}

A resource representing a batch of `EmbedContent` requests.

**Properties:**

{% section class="api-ref-property-list" %}
  **model**: {% mark %}required{% /mark %} `string`

  The name of the `Model` to use for generating the completion. Format: `models/{model}`.

  {% hr /%}

  **displayName**: {% mark %}required{% /mark %} `string`

  The user-defined name of this batch.

  {% hr /%}

  {% details %}
  {% summary %}
  **inputConfig**: {% mark %}required{% /mark %} `InputEmbedContentConfig`

  Input configuration of the instances on which batch processing are performed.

  {% /summary %}

  {% details %}
  {% summary %}
  **source**: {% mark %}required{% /mark %} `Union type`

  The source of the input.

  {% /summary %}

  Union field `source` can be only one of the following:

  **fileName**: `string`

  The name of the `File` containing the input requests.

  {% details %}
  {% summary %}
  **requests**: `InlinedEmbedContentRequests`

  The requests to be processed in the batch.

  {% /summary %}

  {% details %}
  {% summary %}
  **requests**: {% mark %}required{% /mark %} `InlinedEmbedContentRequest array`

  The requests to be processed in the batch.

  {% /summary %}

  {% details %}
  {% summary %}
  **request**: {% mark %}required{% /mark %} `EmbedContentRequest`

  The request to be processed in the batch.

  {% /summary %}

  **model**: {% mark %}required{% /mark %} `string`

  The model's resource name. This serves as an ID for the Model to use. This name should match a model name returned by the `ListModels` method. Format: `models/{model}`

  {% details %}
  {% summary %}
  **content**: {% mark %}required{% /mark %} `Content`

  The content to embed. Only the `parts.text` fields will be counted.

  {% /summary %}

  {% details %}
  {% summary %}
  **parts**: `Part array`

  Ordered `Parts` that constitute a single message. Parts may have different MIME types.

  {% /summary %}

  {% details %}
  {% summary %}
  **data**: `Union type`

  {% /summary %}

  Union field `data` can be only one of the following:

  **text**: `string`

  Inline text.

  {% details %}
  {% summary %}
  **inlineData**: `Blob`

  Inline media bytes.

  {% /summary %}

  **mimeType**: `string`

  The IANA standard MIME type of the source data. Examples of supported types:

  - Images: image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/gif, image/avif
  - Audio: audio/*, video/audio/s16le, video/audio/wav
  - Video: video/*
  - Text: text/plain, text/html, text/css, text/javascript, text/x-typescript, text/csv, text/markdown, text/x-python, text/xml, text/rtf, video/text/timestamp
  - Applications: application/x-javascript, application/x-typescript, application/x-python-code, application/json, application/x-ipynb+json, application/rtf, application/pdf For additional context, see [Supported file formats](/docs/file-input-methods#supported-content-types).

  **data**: `string`

  Raw bytes for media formats.

  **displayName**: `string`

  Optional. Specifies the name used to refer to this blob to the model (e.g. "my_blob.png"). Used as the blob reference identifier when `verbalization_mode` is set to `REFERENCE_ONLY`.

  {% /details %}

  {% details %}
  {% summary %}
  **functionCall**: `FunctionCall`

  A predicted `FunctionCall` returned from the model that contains a string representing the `FunctionDeclaration.name` with the arguments and their values.

  {% /summary %}

  **name**: {% mark %}required{% /mark %} `string`

  The name of the function to call. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 128.

  **id**: `string`

  Optional. Unique identifier of the function call. If populated, the client to execute the `function_call` and return the response with the matching `id`.

  **args**: `object`

  Optional. The function parameters and values in JSON object format.

  {% /details %}

  {% details %}
  {% summary %}
  **functionResponse**: `FunctionResponse`

  The result output of a `FunctionCall` that contains a string representing the `FunctionDeclaration.name` and a structured JSON object containing any output from the function is used as context to the model.

  {% /summary %}

  **name**: {% mark %}required{% /mark %} `string`

  The name of the function to call. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 128.

  **response**: {% mark %}required{% /mark %} `object`

  The function response in JSON object format. Callers can use any keys of their choice that fit the function's syntax to return the function output, e.g. "output", "result", etc. In particular, if the function call failed to execute, the response can have an "error" key to return error details to the model. Multimedia can be included by using a subobject containing a single "$ref" key whose value is the `inline_data.display_name` or `file_data.display_name` of a `FunctionResponsePart` holding the multimedia. See [Multimodal function responses](/docs/function-calling#multimodal).

  **id**: `string`

  Optional. The identifier of the function call this response is for. Populated by the client to match the corresponding function call `id`.

  {% details %}
  {% summary %}
  **parts**: `FunctionResponsePart array`

  Optional. Ordered `Parts` that constitute a function response. Parts may have different IANA MIME types.

  {% /summary %}

  {% details %}
  {% summary %}
  **data**: `Union type`

  The data of the function response part.

  {% /summary %}

  Union field `data` can be only one of the following:

  {% details %}
  {% summary %}
  **inlineData**: `FunctionResponseBlob`

  Inline media bytes.

  {% /summary %}

  **mimeType**: `string`

  The IANA standard MIME type of the source data. Examples:

  - image/png
  - image/jpeg

  If an unsupported MIME type is provided, an error will be returned. For a complete list of supported types, see [Supported file formats](/docs/file-input-methods#supported-content-types).

  **data**: `string`

  Raw bytes for media formats.

  **displayName**: `string`

  Optional. Display name of the blob. Used to provide a label or filename to distinguish blobs, and to reference the blob from `FunctionResponse.response` (for example, via `{"$ref": "DISPLAY_NAME"}`).

  {% /details %}

  {% details %}
  {% summary %}
  **fileData**: `FunctionResponseFileData`

  URI based data.

  {% /summary %}

  **fileUri**: {% mark %}required{% /mark %} `string`

  URI.

  **mimeType**: `string`

  The IANA standard MIME type of the source data. If an unsupported MIME type is provided, an error will be returned. For a complete list of supported types, see [Multimodal function responses](/docs/function-calling#multimodal) and [Supported file formats](/docs/file-input-methods#supported-content-types).

  **displayName**: `string`

  Optional. Display name of the file. Used to provide a label or filename to distinguish file data, and to reference the file from `FunctionResponse.response` (for example, via `{"$ref": "DISPLAY_NAME"}`).

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **mediaProcessing**: `string enum`

  Optional. How the model processes this part's media for understanding. Only meaningful for video parts (`inline_data` or `file_data` with video mime). Non-video parts ignore this field.

  {% /summary %}

  Possible values:

  - `MEDIA_PROCESSING_UNSPECIFIED`: Defaults to model-specific processing.
  - `STATIC`: Fixed-rate frame extraction. All frames placed in context.
  - `AGENTIC`: Model-driven dynamic navigation. Recommended for most use cases.

  {% /details %}

  {% /details %}

  **willContinue**: `boolean`

  Optional. Signals that function call continues, and more responses will be returned, turning the function call into a generator. Is only applicable to NON_BLOCKING function calls, is ignored otherwise. If set to false, future responses will not be considered. It is allowed to return empty `response` with `will_continue=False` to signal that the function call is finished. This may still trigger the model generation. To avoid triggering the generation and finish the function call, additionally set `scheduling` to `SILENT`.

  {% details %}
  {% summary %}
  **scheduling**: `string enum`

  Optional. Specifies how the response should be scheduled in the conversation. Only applicable to NON_BLOCKING function calls, is ignored otherwise. Defaults to WHEN_IDLE.

  {% /summary %}

  Possible values:

  - `SCHEDULING_UNSPECIFIED`: This value is unused.
  - `SILENT`: Only add the result to the conversation context, do not interrupt or trigger generation.
  - `WHEN_IDLE`: Add the result to the conversation context, and prompt to generate output without interrupting ongoing generation.
  - `INTERRUPT`: Add the result to the conversation context, interrupt ongoing generation and prompt to generate output.

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **fileData**: `FileData`

  URI based data.

  {% /summary %}

  **fileUri**: {% mark %}required{% /mark %} `string`

  URI.

  **mimeType**: `string`

  Optional. The IANA standard MIME type of the source data.

  **displayName**: `string`

  Optional. Specifies the name used to refer to this file to the model (e.g. "my_file.pdf"). Used as the file reference identifier when `verbalization_mode` is set to `REFERENCE_ONLY`.

  {% /details %}

  {% details %}
  {% summary %}
  **executableCode**: `ExecutableCode`

  Code generated by the model that is meant to be executed.

  {% /summary %}

  {% details %}
  {% summary %}
  **language**: {% mark %}required{% /mark %} `string enum`

  Programming language of the `code`.

  {% /summary %}

  Possible values:

  - `LANGUAGE_UNSPECIFIED`: Unspecified language. This value should not be used.
  - `PYTHON`: Python >= 3.10, with numpy and simpy available. Python is the default language.

  {% /details %}

  **code**: {% mark %}required{% /mark %} `string`

  The code to be executed.

  **id**: `string`

  Optional. Unique identifier of the `ExecutableCode` part. The server returns the `CodeExecutionResult` with the matching `id`.

  {% /details %}

  {% details %}
  {% summary %}
  **codeExecutionResult**: `CodeExecutionResult`

  Result of executing the `ExecutableCode`.

  {% /summary %}

  {% details %}
  {% summary %}
  **outcome**: {% mark %}required{% /mark %} `string enum`

  Outcome of the code execution.

  {% /summary %}

  Possible values:

  - `OUTCOME_UNSPECIFIED`: Unspecified status. This value should not be used.
  - `OUTCOME_OK`: Code execution completed successfully. `output` contains the stdout, if any.
  - `OUTCOME_FAILED`: Code execution failed. `output` contains the stderr and stdout, if any.
  - `OUTCOME_DEADLINE_EXCEEDED`: Code execution ran for too long, and was cancelled. There may or may not be a partial `output` present.

  {% /details %}

  **id**: `string`

  Optional. The identifier of the `ExecutableCode` part this result is for. Only populated if the corresponding `ExecutableCode` has an id.

  **output**: `string`

  Optional. Contains stdout when code execution is successful, stderr or other description otherwise.

  {% /details %}

  {% details %}
  {% summary %}
  **toolCall**: `ToolCall`

  Server-side tool call. This field is populated when the model predicts a tool invocation that should be executed on the server. The client is expected to echo this message back to the API.

  {% /summary %}

  {% details %}
  {% summary %}
  **toolType**: {% mark %}required{% /mark %} `V1mainToolType`

  The type of tool that was called.

  {% /summary %}

  Possible values:

  - `TOOL_TYPE_UNSPECIFIED`: Unspecified tool type.
  - `GOOGLE_SEARCH_WEB`: Google search tool, maps to Tool.google_search.search_types.web_search.
  - `GOOGLE_SEARCH_IMAGE`: Image search tool, maps to Tool.google_search.search_types.image_search.
  - `URL_CONTEXT`: URL context tool, maps to Tool.url_context.
  - `GOOGLE_MAPS`: Google maps tool, maps to Tool.google_maps.
  - `FILE_SEARCH`: File search tool, maps to Tool.file_search.
  - `MEDIA_PROCESSING`: Media processing tool types (e.g. video, audio, etc.), maps to invisible tools used for multimodal understanding like GOOGLE_UNDERSTANDING_VIDEO.

  {% /details %}

  **id**: `string`

  Optional. Unique identifier of the tool call. The server returns the tool response with the matching `id`.

  **toolName**: `string`

  Optional. The name of the tool that was called.

  **args**: `object`

  Optional. The tool call arguments. Example: {"arg1" : "value1", "arg2" : "value2" , ...}

  {% /details %}

  {% details %}
  {% summary %}
  **toolResponse**: `ToolResponse`

  The output from a server-side `ToolCall` execution. This field is populated by the client with the results of executing the corresponding `ToolCall`.

  {% /summary %}

  {% details %}
  {% summary %}
  **toolType**: {% mark %}required{% /mark %} `V1mainToolType`

  The type of tool that was called, matching the `tool_type` in the corresponding `ToolCall`.

  {% /summary %}

  Possible values:

  - `TOOL_TYPE_UNSPECIFIED`: Unspecified tool type.
  - `GOOGLE_SEARCH_WEB`: Google search tool, maps to Tool.google_search.search_types.web_search.
  - `GOOGLE_SEARCH_IMAGE`: Image search tool, maps to Tool.google_search.search_types.image_search.
  - `URL_CONTEXT`: URL context tool, maps to Tool.url_context.
  - `GOOGLE_MAPS`: Google maps tool, maps to Tool.google_maps.
  - `FILE_SEARCH`: File search tool, maps to Tool.file_search.
  - `MEDIA_PROCESSING`: Media processing tool types (e.g. video, audio, etc.), maps to invisible tools used for multimodal understanding like GOOGLE_UNDERSTANDING_VIDEO.

  {% /details %}

  **id**: `string`

  Optional. The identifier of the tool call this response is for.

  **response**: `object`

  Optional. The tool response.

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **metadata**: `Union type`

  Controls extra preprocessing of data. Set this when `inline_data` or `file_data` is present to configure per-part static media preprocessing.

  {% /summary %}

  Union field `metadata` can be only one of the following:

  {% details %}
  {% summary %}
  **videoMetadata**: `VideoMetadata`

  Optional. Video metadata. The metadata should only be specified while the video data is presented in inline_data or file_data.

  {% /summary %}

  **startOffset**: `string`

  Optional. The start offset of the video.

  **endOffset**: `string`

  Optional. The end offset of the video.

  **fps**: `number`

  Optional. The frame rate of the video sent to the model. If not specified, the default value will be 1.0. The fps range is (0.0, 24.0].

  {% /details %}

  {% /details %}

  **thought**: `boolean`

  Optional. Indicates if the part is thought from the model.

  **thoughtSignature**: `string`

  Optional. An opaque signature for the thought so it can be reused in subsequent requests.

  **partMetadata**: `object`

  Custom metadata associated with the Part. Agents using genai.Part as content representation may need to keep track of the additional information. For example it can be name of a file/source from which the Part originates or a way to multiplex multiple Part streams.

  {% details %}
  {% summary %}
  **mediaResolution**: `V1mainMediaResolution`

  Optional. Media resolution for the input media.

  {% /summary %}

  {% details %}
  {% summary %}
  **value**: `Union type`

  The media resolution level.

  {% /summary %}

  Union field `value` can be only one of the following:

  {% details %}
  {% summary %}
  **level**: `string enum`

  The tokenization quality used for given media. for Gemini API support .

  {% /summary %}

  Possible values:

  - `MEDIA_RESOLUTION_UNSPECIFIED`: Media resolution has not been set.
  - `MEDIA_RESOLUTION_LOW`: Media resolution set to low.
  - `MEDIA_RESOLUTION_MEDIUM`: Media resolution set to medium.
  - `MEDIA_RESOLUTION_HIGH`: Media resolution set to high.
  - `MEDIA_RESOLUTION_ULTRA_HIGH`: Media resolution set to ultra high.

  {% /details %}

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **mediaProcessing**: `string enum`

  Optional. How the model processes this part's media for understanding. Only meaningful for video parts (`inline_data` or `file_data` with video mime). Non-video parts ignore this field.

  {% /summary %}

  Possible values:

  - `MEDIA_PROCESSING_UNSPECIFIED`: Defaults to model-specific processing.
  - `STATIC`: Fixed-rate frame extraction. All frames placed in context.
  - `AGENTIC`: Model-driven dynamic navigation. Recommended for most use cases.

  {% /details %}

  {% details %}
  {% summary %}
  **audioTranscription**: `AudioTranscription`

  Optional. Audio (input or output) transcription. This is only set when this Part contains audio data.

  {% /summary %}

  **text**: {% mark %}required{% /mark %} `string`

  The transcription text of this audio segment.

  **speakerLabel**: `string`

  Optional. A label identifying the speaker of this audio segment (e.g. "spk_1", "spk_2"). Present when diarization is set.

  {% details %}
  {% summary %}
  **words**: `WordInfo array`

  Optional. Detailed word-level transcriptions and timing details. Present when word_timestamp is set.

  {% /summary %}

  **word**: {% mark %}required{% /mark %} `string`

  Transcript of the word.

  **startOffset**: `string`

  Optional. Start offset in time of the word relative to the start of the audio.

  **endOffset**: `string`

  Optional. End offset in time of the word relative to the start of the audio.

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **speechMetadata**: `SpeechMetadata`

  Optional. Metadata applied to text parts to customize how they should be spoken or synthesized, such as specifying speaker identity or speaking style.

  {% /summary %}

  **speaker**: `string`

  Optional. Optional speaker name for multi-speaker synthesis.

  **style**: `string`

  Optional. Optional style instruction for the speech synthesis.

  {% /details %}

  {% /details %}

  **role**: `string`

  Optional. The producer of the content. Must be either 'user' or 'model'. Useful to set for multi-turn conversations, otherwise can be left blank or unset.

  {% /details %}

  **embedContentConfig**: [`EmbedContentConfig`](/api-reference/embeddings#Resource:EmbedContentConfig)

  Optional. Configuration for the EmbedContent request.

  {% /details %}

  **metadata**: `object`

  Optional. The metadata to be associated with the request.

  {% /details %}

  {% /details %}

  {% /details %}

  {% /details %}

  {% hr /%}

  **name**: `string`

  Output only. Identifier. Resource name of the batch. Format: `batches/{batch_id}`.

  {% hr /%}

  {% details %}
  {% summary %}
  **output**: `EmbedContentBatchOutput`

  Output only. The output of the batch request.

  {% /summary %}

  {% details %}
  {% summary %}
  **output**: `Union type`

  The output of the batch request.

  {% /summary %}

  Union field `output` can be only one of the following:

  **responsesFile**: `string`

  Output only. The file ID of the file containing the responses. The file will be a JSONL file with a single response per line. The responses will be [`EmbedContentResponse`](/api-reference/embeddings#Resource:EmbedContentResponse) messages formatted as JSON. The responses will be written in the same order as the input requests.

  {% details %}
  {% summary %}
  **inlinedResponses**: `InlinedEmbedContentResponses`

  Output only. The responses to the requests in the batch. Returned when the batch was built using inlined requests. The responses will be in the same order as the input requests.

  {% /summary %}

  {% details %}
  {% summary %}
  **inlinedResponses**: `InlinedEmbedContentResponse array`

  Output only. The responses to the requests in the batch.

  {% /summary %}

  {% details %}
  {% summary %}
  **output**: `Union type`

  The output of the request.

  {% /summary %}

  Union field `output` can be only one of the following:

  {% details %}
  {% summary %}
  **error**: `Status`

  Output only. The error encountered while processing the request.

  {% /summary %}

  **code**: `integer`

  The status code, which should be an enum value of google.rpc.Code.

  **message**: `string`

  A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.

  **details**: `object array`

  A list of messages that carry the error details. There is a common set of message types for APIs to use.

  {% /details %}

  **response**: [`EmbedContentResponse`](/api-reference/embeddings#Resource:EmbedContentResponse)

  Output only. The response to the request.

  {% /details %}

  **metadata**: `object`

  Output only. The metadata associated with the request.

  {% /details %}

  {% /details %}

  {% /details %}

  {% /details %}

  {% hr /%}

  **createTime**: `string`

  Output only. The time at which the batch was created.

  {% hr /%}

  **endTime**: `string`

  Output only. The time at which the batch processing completed.

  {% hr /%}

  **updateTime**: `string`

  Output only. The time at which the batch was last updated.

  {% hr /%}

  {% details %}
  {% summary %}
  **batchStats**: `EmbedContentBatchStats`

  Output only. Stats about the batch.

  {% /summary %}

  **requestCount**: `string`

  Output only. The number of requests in the batch.

  **successfulRequestCount**: `string`

  Output only. The number of requests that were successfully processed.

  **failedRequestCount**: `string`

  Output only. The number of requests that failed to be processed.

  **pendingRequestCount**: `string`

  Output only. The number of requests that are still pending processing.

  {% /details %}

  {% hr /%}

  {% details %}
  {% summary %}
  **state**: `BatchState`

  Output only. The state of the batch.

  {% /summary %}

  Possible values:

  - `BATCH_STATE_UNSPECIFIED`: The batch state is unspecified.
  - `BATCH_STATE_PENDING`: The service is preparing to run the batch.
  - `BATCH_STATE_RUNNING`: The batch is in progress.
  - `BATCH_STATE_SUCCEEDED`: The batch completed successfully.
  - `BATCH_STATE_FAILED`: The batch failed.
  - `BATCH_STATE_CANCELLED`: The batch has been cancelled.
  - `BATCH_STATE_EXPIRED`: The batch has expired.

  {% /details %}

  {% hr /%}

  **priority**: `string`

  Optional. The priority of the batch. Batches with a higher priority value will be processed before batches with a lower priority value. Negative values are allowed. Default is 0.

{% /section %}

### EmbedContentConfig  {% id="Resource:EmbedContentConfig" %}

Configurations for the EmbedContent request.

**Properties:**

{% section class="api-ref-property-list" %}
  **title**: `string`

  Optional. The title for the text.

  {% hr /%}

  {% details %}
  {% summary %}
  **taskType**: [`TaskType`](/api-reference/embeddings#Resource:TaskType)

  Optional. The task type of the embedding.

  {% /summary %}

  Possible values:

  - `TASK_TYPE_UNSPECIFIED`: Unset value, which will default to one of the other enum values.
  - `RETRIEVAL_QUERY`: Specifies the given text is a query in a search/retrieval setting.
  - `RETRIEVAL_DOCUMENT`: Specifies the given text is a document from the corpus being searched.
  - `SEMANTIC_SIMILARITY`: Specifies the given text will be used for STS.
  - `CLASSIFICATION`: Specifies that the given text will be classified.
  - `CLUSTERING`: Specifies that the embeddings will be used for clustering.
  - `QUESTION_ANSWERING`: Specifies that the given text will be used for question answering.
  - `FACT_VERIFICATION`: Specifies that the given text will be used for fact verification.
  - `CODE_RETRIEVAL_QUERY`: Specifies that the given text will be used for code retrieval.

  {% /details %}

  {% hr /%}

  **autoTruncate**: `boolean`

  Optional. Whether to silently truncate the input content if it's longer than the maximum sequence length.

  {% hr /%}

  **outputDimensionality**: `integer`

  Optional. Reduced dimension for the output embedding. If set, excessive values in the output embedding are truncated from the end.

  {% hr /%}

  **documentOcr**: `boolean`

  Optional. Whether to enable OCR for document content.

  {% hr /%}

  **audioTrackExtraction**: `boolean`

  Optional. Whether to extract audio from video content.

{% /section %}

### EmbeddingUsageMetadata  {% id="Resource:EmbeddingUsageMetadata" %}

Metadata on the usage of the embedding request.

**Properties:**

{% section class="api-ref-property-list" %}
  **promptTokenCount**: `integer`

  Output only. Number of tokens in the prompt.

  {% hr /%}

  {% details %}
  {% summary %}
  **promptTokenDetails**: `ModalityTokenCount array`

  Output only. List of modalities that were processed in the request input.

  {% /summary %}

  {% details %}
  {% summary %}
  **modality**: `GenerativeLanguageModality`

  The modality associated with this token count.

  {% /summary %}

  Possible values:

  - `MODALITY_UNSPECIFIED`: Unspecified modality.
  - `TEXT`: Plain text.
  - `IMAGE`: Image.
  - `VIDEO`: Video.
  - `AUDIO`: Audio.
  - `DOCUMENT`: Document, e.g. PDF.

  {% /details %}

  **tokenCount**: `integer`

  Number of tokens.

  {% /details %}

{% /section %}

