> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Caching

Context caching allows you to save and reuse precomputed input tokens that you wish to use repeatedly, for example when asking different questions about the same media file. This can lead to cost and speed savings, depending on the usage. For a detailed introduction, see the [Context caching](/docs/caching) guide.

## Methods  {% id="methods" %}

{% table %}
  * Method
  * HTTP request

  ---

  * [Creating cached content](/api-reference/caching/create-cached-content)
  *     {% mark class="http-post" %}{% icon name="north_east" /%}`POST`{% /mark %} `/v1beta/cachedContents`

    Creates CachedContent resource.


  ---

  * [Listing cached content](/api-reference/caching/list-cached-contents)
  *     {% mark class="http-get" %}{% icon name="south_west" /%}`GET`{% /mark %} `/v1beta/cachedContents`

    Lists CachedContents.


  ---

  * [Getting cached content](/api-reference/caching/get-cached-content)
  *     {% mark class="http-get" %}{% icon name="south_west" /%}`GET`{% /mark %} `/v1beta/cachedContents/{id}`

    Reads CachedContent resource.


  ---

  * [Updating cached content](/api-reference/caching/update-cached-content)
  *     {% mark class="http-patch" %}{% icon name="north_east" /%}`PATCH`{% /mark %} `/v1beta/cachedContents/{id}`

    Updates CachedContent resource (only expiration is updatable).


  ---

  * [Deleting cached content](/api-reference/caching/delete-cached-content)
  *     {% mark class="http-delete" %}{% icon name="close" /%}`DELETE`{% /mark %} `/v1beta/cachedContents/{id}`

    Deletes CachedContent resource.

{% /table %}

## Resources  {% id="resources" %}

### CachedContent  {% id="Resource:CachedContent" %}

Content that has been preprocessed and can be used in subsequent request
to GenerativeService.

Cached content can be only used with model it was created for.

**Properties:**

{% section class="api-ref-property-list" %}
  **model**: {% mark %}required{% /mark %} `string`

  Immutable. The name of the `Model` to use for cached content Format: `models/{model}`

  {% hr /%}

  {% details %}
  {% summary %}
  **expiration**: `Union type`

  Specifies when this resource will expire.

  {% /summary %}

  Union field `expiration` can be only one of the following:

  **expireTime**: `string`

  Timestamp in UTC of when this resource is considered expired. This is *always* provided on output, regardless of what was sent on input.

  **ttl**: `string`

  Input only. New TTL for this resource, input only.

  {% /details %}

  {% hr /%}

  **name**: `string`

  Output only. Identifier. The resource name referring to the cached content. Format: `cachedContents/{id}`

  {% hr /%}

  **displayName**: `string`

  Optional. Immutable. The user-generated meaningful display name of the cached content. Maximum 128 Unicode characters.

  {% hr /%}

  {% details %}
  {% summary %}
  **systemInstruction**: `Content`

  Optional. Input only. Immutable. Developer set system instruction. Currently text only.

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

  {% hr /%}

  {% details %}
  {% summary %}
  **contents**: `Content array`

  Optional. Input only. Immutable. The content to cache.

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

  {% hr /%}

  {% details %}
  {% summary %}
  **tools**: `Tool array`

  Optional. Input only. Immutable. A list of `Tools` the model may use to generate the next response

  {% /summary %}

  {% details %}
  {% summary %}
  **functionDeclarations**: `FunctionDeclaration array`

  Optional. A list of `FunctionDeclarations` available to the model that can be used for function calling. The model or system does not execute the function. Instead the defined function may be returned as a FunctionCall with arguments to the client side for execution. The model may decide to call a subset of these functions by populating FunctionCall in the response. The next conversation turn may contain a FunctionResponse with the Content.role "function" generation context for the next model turn.

  {% /summary %}

  **name**: {% mark %}required{% /mark %} `string`

  The name of the function. Must be a-z, A-Z, 0-9, or contain underscores, colons, dots, and dashes, with a maximum length of 128.

  **description**: {% mark %}required{% /mark %} `string`

  A brief description of the function.

  {% details %}
  {% summary %}
  **parameters**: `Schema`

  Optional. Describes the parameters to this function. Reflects the Open API 3.03 Parameter Object string Key: the name of the parameter. Parameter names are case sensitive. Schema Value: the Schema defining the type used for the parameter.

  {% /summary %}

  {% details %}
  {% summary %}
  **type**: {% mark %}required{% /mark %} `Type`

  Data type.

  {% /summary %}

  Possible values:

  - `TYPE_UNSPECIFIED`: Not specified, should not be used.
  - `STRING`: String type.
  - `NUMBER`: Number type.
  - `INTEGER`: Integer type.
  - `BOOLEAN`: Boolean type.
  - `ARRAY`: Array type.
  - `OBJECT`: Object type.
  - `NULL`: Null type.

  {% /details %}

  **format**: `string`

  Optional. The format of the data. Any value is allowed, but most do not trigger any special functionality.

  **title**: `string`

  Optional. The title of the schema.

  **description**: `string`

  Optional. A brief description of the parameter. This could contain examples of use. Parameter description may be formatted as Markdown.

  **nullable**: `boolean`

  Optional. Indicates if the value may be null.

  **enum**: `string array`

  Optional. Possible values of the element of Type.STRING with enum format. For example we can define an Enum Direction as : {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]}

  **items**: `Schema`

  Optional. Schema of the elements of Type.ARRAY.

  **maxItems**: `string`

  Optional. Maximum number of the elements for Type.ARRAY.

  **minItems**: `string`

  Optional. Minimum number of the elements for Type.ARRAY.

  **properties**: `object`

  Optional. Properties of Type.OBJECT.

  **required**: `string array`

  Optional. Required properties of Type.OBJECT.

  **minProperties**: `string`

  Optional. Minimum number of the properties for Type.OBJECT.

  **maxProperties**: `string`

  Optional. Maximum number of the properties for Type.OBJECT.

  **minimum**: `number`

  Optional. SCHEMA FIELDS FOR TYPE INTEGER and NUMBER Minimum value of the Type.INTEGER and Type.NUMBER

  **maximum**: `number`

  Optional. Maximum value of the Type.INTEGER and Type.NUMBER

  **minLength**: `string`

  Optional. SCHEMA FIELDS FOR TYPE STRING Minimum length of the Type.STRING

  **maxLength**: `string`

  Optional. Maximum length of the Type.STRING

  **pattern**: `string`

  Optional. Pattern of the Type.STRING to restrict a string to a regular expression.

  **example**: `object`

  Optional. Example of the object. Will only populated when the object is the root.

  **anyOf**: `Schema array`

  Optional. The value should be validated against any (one or more) of the subschemas in the list.

  **propertyOrdering**: `string array`

  Optional. The order of the properties. Not a standard field in open api spec. Used to determine the order of the properties in the response.

  **default**: `object`

  Optional. Default value of the field. Per JSON Schema, this field is intended for documentation generators and doesn't affect validation. Thus it's included here and ignored so that developers who send schemas with a `default` field don't get unknown-field errors.

  {% /details %}

  **parametersJsonSchema**: `object`

  Optional. Describes the parameters to the function in JSON Schema format. The schema must describe an object where the properties are the parameters to the function. For example: `{ "type": "object", "properties": { "name": { "type": "string" }, "age": { "type": "integer" } }, "additionalProperties": false, "required": ["name", "age"], "propertyOrdering": ["name", "age"] }` This field is mutually exclusive with `parameters`.

  {% details %}
  {% summary %}
  **response**: `Schema`

  Optional. Describes the output from this function in JSON Schema format. Reflects the Open API 3.03 Response Object. The Schema defines the type used for the response value of the function.

  {% /summary %}

  {% details %}
  {% summary %}
  **type**: {% mark %}required{% /mark %} `Type`

  Data type.

  {% /summary %}

  Possible values:

  - `TYPE_UNSPECIFIED`: Not specified, should not be used.
  - `STRING`: String type.
  - `NUMBER`: Number type.
  - `INTEGER`: Integer type.
  - `BOOLEAN`: Boolean type.
  - `ARRAY`: Array type.
  - `OBJECT`: Object type.
  - `NULL`: Null type.

  {% /details %}

  **format**: `string`

  Optional. The format of the data. Any value is allowed, but most do not trigger any special functionality.

  **title**: `string`

  Optional. The title of the schema.

  **description**: `string`

  Optional. A brief description of the parameter. This could contain examples of use. Parameter description may be formatted as Markdown.

  **nullable**: `boolean`

  Optional. Indicates if the value may be null.

  **enum**: `string array`

  Optional. Possible values of the element of Type.STRING with enum format. For example we can define an Enum Direction as : {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]}

  **items**: `Schema`

  Optional. Schema of the elements of Type.ARRAY.

  **maxItems**: `string`

  Optional. Maximum number of the elements for Type.ARRAY.

  **minItems**: `string`

  Optional. Minimum number of the elements for Type.ARRAY.

  **properties**: `object`

  Optional. Properties of Type.OBJECT.

  **required**: `string array`

  Optional. Required properties of Type.OBJECT.

  **minProperties**: `string`

  Optional. Minimum number of the properties for Type.OBJECT.

  **maxProperties**: `string`

  Optional. Maximum number of the properties for Type.OBJECT.

  **minimum**: `number`

  Optional. SCHEMA FIELDS FOR TYPE INTEGER and NUMBER Minimum value of the Type.INTEGER and Type.NUMBER

  **maximum**: `number`

  Optional. Maximum value of the Type.INTEGER and Type.NUMBER

  **minLength**: `string`

  Optional. SCHEMA FIELDS FOR TYPE STRING Minimum length of the Type.STRING

  **maxLength**: `string`

  Optional. Maximum length of the Type.STRING

  **pattern**: `string`

  Optional. Pattern of the Type.STRING to restrict a string to a regular expression.

  **example**: `object`

  Optional. Example of the object. Will only populated when the object is the root.

  **anyOf**: `Schema array`

  Optional. The value should be validated against any (one or more) of the subschemas in the list.

  **propertyOrdering**: `string array`

  Optional. The order of the properties. Not a standard field in open api spec. Used to determine the order of the properties in the response.

  **default**: `object`

  Optional. Default value of the field. Per JSON Schema, this field is intended for documentation generators and doesn't affect validation. Thus it's included here and ignored so that developers who send schemas with a `default` field don't get unknown-field errors.

  {% /details %}

  **responseJsonSchema**: `object`

  Optional. Describes the output from this function in JSON Schema format. The value specified by the schema is the response value of the function. This field is mutually exclusive with `response`.

  {% details %}
  {% summary %}
  **behavior**: `string enum`

  Optional. Specifies the function Behavior. Currently only supported by the BidiGenerateContent method.

  {% /summary %}

  Possible values:

  - `UNSPECIFIED`: This value is unused.
  - `BLOCKING`: If set, the system will wait to receive the function response before continuing the conversation.
  - `NON_BLOCKING`: If set, the system will not wait to receive the function response. Instead, it will attempt to handle function responses as they become available while maintaining the conversation between the user and the model.

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **googleSearchRetrieval**: `GoogleSearchRetrieval`

  Optional. Retrieval tool that is powered by Google search.

  {% /summary %}

  {% details %}
  {% summary %}
  **dynamicRetrievalConfig**: `DynamicRetrievalConfig`

  Specifies the dynamic retrieval configuration for the given source.

  {% /summary %}

  {% details %}
  {% summary %}
  **mode**: `string enum`

  The mode of the predictor to be used in dynamic retrieval.

  {% /summary %}

  Possible values:

  - `MODE_UNSPECIFIED`: Always trigger retrieval.
  - `MODE_DYNAMIC`: Run retrieval only when system decides it is necessary.

  {% /details %}

  **dynamicThreshold**: `number`

  The threshold to be used in dynamic retrieval. If not set, a system default value is used.

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **codeExecution**: `CodeExecution`

  Optional. Enables the model to execute code as part of generation.

  {% /summary %}

  {% /details %}

  {% details %}
  {% summary %}
  **googleSearch**: `GoogleSearch`

  Optional. GoogleSearch tool type. Tool to support Google Search in Model. Powered by Google.

  {% /summary %}

  {% details %}
  {% summary %}
  **timeRangeFilter**: `Interval`

  Optional. Filter search results to a specific time range. If customers set a start time, they must set an end time (and vice versa).

  {% /summary %}

  **startTime**: `string`

  Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.

  **endTime**: `string`

  Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.

  {% /details %}

  {% details %}
  {% summary %}
  **searchTypes**: `SearchTypes`

  Optional. The set of search types to enable. If not set, web search is enabled by default.

  {% /summary %}

  {% details %}
  {% summary %}
  **webSearch**: `WebSearch`

  Optional. Enables web search. Only text results are returned.

  {% /summary %}

  {% /details %}

  {% details %}
  {% summary %}
  **imageSearch**: `ImageSearch`

  Optional. Enables image search. Image bytes are returned.

  {% /summary %}

  {% /details %}

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **computerUse**: `ComputerUse`

  Optional. Tool to support the model interacting directly with the computer. If enabled, it automatically populates computer-use specific Function Declarations.

  {% /summary %}

  {% details %}
  {% summary %}
  **environment**: {% mark %}required{% /mark %} `string enum`

  The environment being operated.

  {% /summary %}

  Possible values:

  - `ENVIRONMENT_UNSPECIFIED`: Defaults to browser.
  - `ENVIRONMENT_BROWSER`: Operates in a web browser.
  - `ENVIRONMENT_MOBILE`: Operates in a mobile environment.
  - `ENVIRONMENT_DESKTOP`: Operates in a desktop environment.

  {% /details %}

  **excludedPredefinedFunctions**: `string array`

  Optional. By default, predefined functions are included in the final model call. Some of them can be explicitly excluded from being automatically included. This can serve two purposes: 1. Using a more restricted / different action space. 2. Improving the definitions / instructions of predefined functions.

  **enablePromptInjectionDetection**: `boolean`

  Optional. Whether enable the prompt injection detection check on computer-use request.

  {% details %}
  {% summary %}
  **disabledSafetyPolicies**: `string enum array`

  Optional. Disabled safety policies for computer use.

  {% /summary %}

  Possible values:

  - `SAFETY_POLICY_UNSPECIFIED`: Unspecified safety policy.
  - `FINANCIAL_TRANSACTIONS`: Safety policy for financial transactions.
  - `SENSITIVE_DATA_MODIFICATION`: Safety policy for sensitive data modification.
  - `COMMUNICATION_TOOL`: Safety policy for communication tools (e.g. Gmail, Chat, Meet).
  - `ACCOUNT_CREATION`: Safety policy for account creation.
  - `DATA_MODIFICATION`: Safety policy for data modification.
  - `USER_CONSENT_MANAGEMENT`: Safety policy for user consent management.
  - `LEGAL_TERMS_AND_AGREEMENTS`: Safety policy for legal terms and agreements.

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **urlContext**: `UrlContext`

  Optional. Tool to support URL context retrieval.

  {% /summary %}

  {% /details %}

  {% details %}
  {% summary %}
  **fileSearch**: `FileSearch`

  Optional. FileSearch tool type. Tool to retrieve knowledge from Semantic Retrieval corpora.

  {% /summary %}

  **fileSearchStoreNames**: {% mark %}required{% /mark %} `string array`

  The names of the file_search_stores to retrieve from. Example: `fileSearchStores/my-file-search-store-123`

  **topK**: `integer`

  Optional. The number of semantic retrieval chunks to retrieve.

  **metadataFilter**: `string`

  Optional. Metadata filter to apply to the semantic retrieval documents and chunks.

  {% /details %}

  {% details %}
  {% summary %}
  **mcpServers**: `McpServer array`

  Optional. MCP Servers to connect to.

  {% /summary %}

  {% details %}
  {% summary %}
  **transport**: `Union type`

  The transport to use to connect to the MCPServer.

  {% /summary %}

  Union field `transport` can be only one of the following:

  {% details %}
  {% summary %}
  **streamableHttpTransport**: `StreamableHttpTransport`

  A transport that can stream HTTP requests and responses.

  {% /summary %}

  **url**: `string`

  The full URL for the MCPServer endpoint. Example: "https://api.example.com/mcp"

  **headers**: `object`

  Optional: Fields for authentication headers, timeouts, etc., if needed.

  **timeout**: `string`

  HTTP timeout for regular operations.

  **sseReadTimeout**: `string`

  Timeout for SSE read operations.

  **terminateOnClose**: `boolean`

  Whether to close the client session when the transport closes.

  {% /details %}

  {% /details %}

  **name**: `string`

  The name of the MCPServer.

  {% /details %}

  {% details %}
  {% summary %}
  **googleMaps**: `GoogleMaps`

  Optional. Tool that allows grounding the model's response with geospatial context related to the user's query.

  {% /summary %}

  **enableWidget**: `boolean`

  Optional. Whether to return a widget context token in the GroundingMetadata of the response. Developers can use the widget context token to render a Google Maps widget with geospatial context related to the places that the model references in the response.

  {% /details %}

  {% /details %}

  {% hr /%}

  {% details %}
  {% summary %}
  **toolConfig**: `ToolConfig`

  Optional. Input only. Immutable. Tool config. This config is shared for all tools.

  {% /summary %}

  {% details %}
  {% summary %}
  **functionCallingConfig**: `FunctionCallingConfig`

  Optional. Function calling config.

  {% /summary %}

  {% details %}
  {% summary %}
  **mode**: `string enum`

  Optional. Specifies the mode in which function calling should execute. If unspecified, the default value will be set to AUTO.

  {% /summary %}

  Possible values:

  - `MODE_UNSPECIFIED`: Unspecified function calling mode. This value should not be used.
  - `AUTO`: Default model behavior, model decides to predict either a function call or a natural language response.
  - `ANY`: Model is constrained to always predicting a function call only. If "allowed_function_names" are set, the predicted function call will be limited to any one of "allowed_function_names", else the predicted function call will be any one of the provided "function_declarations".
  - `NONE`: Model will not predict any function call. Model behavior is same as when not passing any function declarations.
  - `VALIDATED`: Model decides to predict either a function call or a natural language response, but will validate function calls with constrained decoding. If "allowed_function_names" are set, the predicted function call will be limited to any one of "allowed_function_names", else the predicted function call will be any one of the provided "function_declarations".

  {% /details %}

  **allowedFunctionNames**: `string array`

  Optional. A set of function names that, when provided, limits the functions the model will call. This should only be set when the Mode is ANY or VALIDATED. Function names should match [FunctionDeclaration.name]. When set, model will predict a function call from only allowed function names.

  {% /details %}

  {% details %}
  {% summary %}
  **retrievalConfig**: `RetrievalConfig`

  Optional. Retrieval config.

  {% /summary %}

  {% details %}
  {% summary %}
  **latLng**: `LatLng`

  Optional. The location of the user.

  {% /summary %}

  **latitude**: `number`

  The latitude in degrees. It must be in the range [-90.0, +90.0].

  **longitude**: `number`

  The longitude in degrees. It must be in the range [-180.0, +180.0].

  {% /details %}

  **languageCode**: `string`

  Optional. The language code of the user. Language code for content. Use language tags defined by [BCP47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt).

  {% /details %}

  **includeServerSideToolInvocations**: `boolean`

  Optional. If true, the API response will include the server-side tool calls and responses within the `Content` message. This allows clients to observe the server's tool interactions.

  {% /details %}

  {% hr /%}

  **createTime**: `string`

  Output only. Creation time of the cache entry.

  {% hr /%}

  **updateTime**: `string`

  Output only. When the cache entry was last updated in UTC time.

  {% hr /%}

  {% details %}
  {% summary %}
  **usageMetadata**: `CachedContentUsageMetadata`

  Output only. Metadata on the usage of the cached content.

  {% /summary %}

  **totalTokenCount**: `integer`

  Total number of tokens that the cached content consumes.

  {% /details %}

{% /section %}

