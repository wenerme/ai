> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Generating content

The Gemini API supports content generation with images, audio, code, tools, and more. For details on each of these features, read on and check out the task-focused sample code, or read the comprehensive guides.

*  [Text generation](/docs/text-generation)
*  [Vision](/docs/image-understanding)
*  [Audio](/docs/audio)
*  [Embeddings](/docs/embeddings)
*  [Long context](/docs/long-context)
*  [Code execution](/docs/code-execution)
*  [JSON Mode](/docs/structured-output)
*  [Function calling](/docs/function-calling)
*  [System instructions](/docs/text-generation#system-instructions)

## Methods  {% id="methods" %}

{% table %}
  * Method
  * HTTP request

  ---

  * [Generating content](/api-reference/generate-content/generate-content)
  *     {% mark class="http-post" %}{% icon name="north_east" /%}`POST`{% /mark %} `/v1beta/models/{model}:generateContent`

    Generates a model response given an input [`GenerateContentRequest`](/api-reference/generate-content/generate-content#request-body).


  ---

  * [Streaming generated content](/api-reference/generate-content/stream-generate-content)
  *     {% mark class="http-post" %}{% icon name="north_east" /%}`POST`{% /mark %} `/v1beta/models/{model}:streamGenerateContent`

    Generates a [streamed response](/docs/text-generation#streaming-responses) from the model given an input [`GenerateContentRequest`](/api-reference/generate-content/stream-generate-content#request-body).


  ---

  * [Creating an ephemeral auth token](/api-reference/generate-content/create-token)
  *     {% mark class="http-post" %}{% icon name="north_east" /%}`POST`{% /mark %} `/v1beta/auth_tokens`

    Creates a token that can be used to constrain the behavior of a BidiGenerateContent session.

{% /table %}

## Data Models  {% id="data-models" %}

### GenerateContentResponse  {% id="Resource:GenerateContentResponse" %}

Response from the model supporting multiple candidate responses.

Safety ratings and content filtering are reported for both
prompt in `GenerateContentResponse.prompt_feedback` and for each candidate
in `finish_reason` and in `safety_ratings`. The API:

-    Returns either all requested candidates or none of them

-    Returns no candidates at all only if there was something wrong with the
  prompt (check `prompt_feedback`)

-    Reports feedback on each candidate in `finish_reason` and
  `safety_ratings`.


**Properties:**

{% section class="api-ref-property-list" %}
  **candidates**: [`Candidate`](/api-reference/generate-content#Resource:Candidate) `array`

  Candidate responses from the model.

  {% hr /%}

  {% details %}
  {% summary %}
  **promptFeedback**: `PromptFeedback`

  Returns the prompt's feedback related to the content filters.

  {% /summary %}

  {% details %}
  {% summary %}
  **blockReason**: `string enum`

  Optional. If set, the prompt was blocked and no candidates are returned. Rephrase the prompt.

  {% /summary %}

  Possible values:

  - `BLOCK_REASON_UNSPECIFIED`: Default value. This value is unused.
  - `SAFETY`: Prompt was blocked due to safety reasons. Inspect `safety_ratings` to understand which safety category blocked it.
  - `OTHER`: Prompt was blocked due to unknown reasons.
  - `BLOCKLIST`: Prompt was blocked due to the terms which are included from the terminology blocklist.
  - `PROHIBITED_CONTENT`: Prompt was blocked due to prohibited content.
  - `IMAGE_SAFETY`: Candidates blocked due to unsafe image generation content.

  {% /details %}

  **safetyRatings**: [`SafetyRating`](/api-reference/generate-content#Resource:SafetyRating) `array`

  Ratings for safety of the prompt. There is at most one rating per category.

  {% /details %}

  {% hr /%}

  {% details %}
  {% summary %}
  **usageMetadata**: `UsageMetadata`

  Output only. Metadata on the generation requests' token usage.

  {% /summary %}

  **promptTokenCount**: `integer`

  Number of tokens in the prompt. When `cached_content` is set, this is still the total effective prompt size meaning this includes the number of tokens in the cached content.

  **cachedContentTokenCount**: `integer`

  Number of tokens in the cached part of the prompt (the cached content)

  **candidatesTokenCount**: `integer`

  Total number of tokens across all the generated response candidates.

  **toolUsePromptTokenCount**: `integer`

  Output only. Number of tokens present in tool-use prompt(s).

  **thoughtsTokenCount**: `integer`

  Output only. Number of tokens of thoughts for thinking models.

  **totalTokenCount**: `integer`

  Total token count for the generation request (prompt + tool-use prompt + thoughts + response candidates).

  **promptTokensDetails**: [`ModalityTokenCount`](/api-reference/generate-content#Resource:ModalityTokenCount) `array`

  Output only. List of modalities that were processed in the request input.

  **cacheTokensDetails**: [`ModalityTokenCount`](/api-reference/generate-content#Resource:ModalityTokenCount) `array`

  Output only. List of modalities of the cached content in the request input.

  **candidatesTokensDetails**: [`ModalityTokenCount`](/api-reference/generate-content#Resource:ModalityTokenCount) `array`

  Output only. List of modalities that were returned in the response.

  **toolUsePromptTokensDetails**: [`ModalityTokenCount`](/api-reference/generate-content#Resource:ModalityTokenCount) `array`

  Output only. List of modalities that were processed for tool-use request inputs.

  {% details %}
  {% summary %}
  **serviceTier**: [`ServiceTier`](/api-reference/generate-content#Resource:ServiceTier)

  Output only. Service tier of the request.

  {% /summary %}

  Possible values:

  - `unspecified`: Default service tier, which is standard.
  - `standard`: Standard service tier.
  - `flex`: Flex service tier.
  - `priority`: Priority service tier.

  {% /details %}

  {% /details %}

  {% hr /%}

  **modelVersion**: `string`

  Output only. The model version used to generate the response.

  {% hr /%}

  **responseId**: `string`

  Output only. response_id is used to identify each response.

  {% hr /%}

  {% details %}
  {% summary %}
  **modelStatus**: `ModelStatus`

  Output only. The current model status of this model.

  {% /summary %}

  {% details %}
  {% summary %}
  **modelStage**: `ModelStage`

  The stage of the underlying model.

  {% /summary %}

  Possible values:

  - `MODEL_STAGE_UNSPECIFIED`: Unspecified model stage.
  - `EXPERIMENTAL`: Models in this stage are for experimental purposes only.
  - `PREVIEW`: Models in this stage are more mature than experimental models.
  - `STABLE`: Models in this stage are considered stable and ready for production use.
  - `LEGACY`: If the model is on this stage, it means that this model is on the path to deprecation in near future. Only existing customers can use this model.
  - `RETIRED`: Models in this stage are retired. These models cannot be used.

  {% /details %}

  **retirementTime**: `string`

  The time at which the model will be retired.

  **message**: `string`

  A message explaining the model status.

  {% /details %}

{% /section %}

### Candidate  {% id="Resource:Candidate" %}

A response candidate generated from the model.

**Properties:**

{% section class="api-ref-property-list" %}
  **index**: `integer`

  Output only. Index of the candidate in the list of response candidates.

  {% hr /%}

  **content**: [`Content`](/api-reference/generate-content#Resource:Content)

  Output only. Generated content returned from the model.

  {% hr /%}

  {% details %}
  {% summary %}
  **finishReason**: `string enum`

  Optional. Output only. The reason why the model stopped generating tokens. If empty, the model has not stopped generating tokens.

  {% /summary %}

  Possible values:

  - `FINISH_REASON_UNSPECIFIED`: Default value. This value is unused.
  - `STOP`: Natural stop point of the model or provided stop sequence.
  - `MAX_TOKENS`: The maximum number of tokens as specified in the request was reached.
  - `SAFETY`: The response candidate content was flagged for safety reasons.
  - `RECITATION`: The response candidate content was flagged for recitation reasons.
  - `LANGUAGE`: The response candidate content was flagged for using an unsupported language.
  - `OTHER`: Unknown reason.
  - `BLOCKLIST`: Token generation stopped because the content contains forbidden terms.
  - `PROHIBITED_CONTENT`: Token generation stopped for potentially containing prohibited content.
  - `SPII`: Token generation stopped because the content potentially contains Sensitive Personally Identifiable Information (SPII).
  - `MALFORMED_FUNCTION_CALL`: The function call generated by the model is invalid.
  - `IMAGE_SAFETY`: Token generation stopped because generated images contain safety violations.
  - `IMAGE_PROHIBITED_CONTENT`: Image generation stopped because generated images has other prohibited content.
  - `IMAGE_OTHER`: Image generation stopped because of other miscellaneous issue.
  - `NO_IMAGE`: The model was expected to generate an image, but none was generated.
  - `IMAGE_RECITATION`: Image generation stopped due to recitation.
  - `UNEXPECTED_TOOL_CALL`: Model generated a tool call but no tools were enabled in the request.
  - `TOO_MANY_TOOL_CALLS`: Model called too many tools consecutively, thus the system exited execution.
  - `MISSING_THOUGHT_SIGNATURE`: Request has at least one thought signature missing.
  - `MALFORMED_RESPONSE`: Finished due to malformed response.
  - `ESCALATION`: Request was filtered by an escalation rule.
  - `PUP_LIMITED_DISABLED`: Indicates that token generation stopped because the user account is limited or disabled due to Prohibited Use Policy (PUP) violations.
  - `CONTINUATION`: Token generation was stopped because the response reached the per-request token limit, but generation is not yet complete. The model response can be continued via a subsequent request using the returned `continuation_token`. Note, the `max_output_tokens` is cumulative across continuation hops and must be monotonically increased or omitted.

  {% /details %}

  {% hr /%}

  **finishMessage**: `string`

  Optional. Output only. Details the reason why the model stopped generating tokens. This is populated only when `finish_reason` is set.

  {% hr /%}

  **safetyRatings**: [`SafetyRating`](/api-reference/generate-content#Resource:SafetyRating) `array`

  List of ratings for the safety of a response candidate. There is at most one rating per category.

  {% hr /%}

  **citationMetadata**: [`CitationMetadata`](/api-reference/generate-content#Resource:CitationMetadata)

  Output only. Citation information for model-generated candidate. This field may be populated with recitation information for any text included in the `content`. These are passages that are "recited" from copyrighted material in the foundational LLM's training data.

  {% hr /%}

  **tokenCount**: `integer`

  Output only. Token count for this candidate.

  {% hr /%}

  {% details %}
  {% summary %}
  **groundingAttributions**: `GroundingAttribution array`

  Output only. Attribution information for sources that contributed to a grounded answer. This field is populated for `GenerateAnswer` calls.

  {% /summary %}

  {% details %}
  {% summary %}
  **sourceId**: `AttributionSourceId`

  Output only. Identifier for the source contributing to this attribution.

  {% /summary %}

  {% details %}
  {% summary %}
  **source**: `Union type`

  {% /summary %}

  Union field `source` can be only one of the following:

  {% details %}
  {% summary %}
  **groundingPassage**: `GroundingPassageId`

  Identifier for an inline passage.

  {% /summary %}

  **passageId**: `string`

  Output only. ID of the passage matching the `GenerateAnswerRequest`'s `GroundingPassage.id`.

  **partIndex**: `integer`

  Output only. Index of the part within the `GenerateAnswerRequest`'s `GroundingPassage.content`.

  {% /details %}

  {% details %}
  {% summary %}
  **semanticRetrieverChunk**: `SemanticRetrieverChunk`

  Identifier for a `Chunk` fetched via Semantic Retriever.

  {% /summary %}

  **source**: `string`

  Output only. Name of the source matching the request's `SemanticRetrieverConfig.source`. Example: `corpora/123` or `corpora/123/documents/abc`

  **chunk**: `string`

  Output only. Name of the `Chunk` containing the attributed text. Example: `corpora/123/documents/abc/chunks/xyz`

  {% /details %}

  {% /details %}

  {% /details %}

  **content**: [`Content`](/api-reference/generate-content#Resource:Content)

  Grounding source content that makes up this attribution.

  {% /details %}

  {% hr /%}

  {% details %}
  {% summary %}
  **groundingMetadata**: `GroundingMetadata`

  Output only. Grounding metadata for the candidate. This field is populated for `GenerateContent` calls.

  {% /summary %}

  {% details %}
  {% summary %}
  **searchEntryPoint**: `SearchEntryPoint`

  Optional. Google search entry for the following-up web searches.

  {% /summary %}

  **renderedContent**: `string`

  Optional. Web content snippet that can be embedded in a web page or an app webview.

  **sdkBlob**: `string`

  Optional. Base64 encoded JSON representing array of tuple.

  {% /details %}

  {% details %}
  {% summary %}
  **groundingChunks**: `GroundingChunk array`

  List of supporting references retrieved from specified grounding source. When streaming, this only contains the grounding chunks that have not been included in the grounding metadata of previous responses.

  {% /summary %}

  {% details %}
  {% summary %}
  **chunkType**: `Union type`

  Chunk type.

  {% /summary %}

  Union field `chunkType` can be only one of the following:

  {% details %}
  {% summary %}
  **web**: `Web`

  Grounding chunk from the web.

  {% /summary %}

  **uri**: `string`

  Output only. URI reference of the chunk.

  **title**: `string`

  Output only. Title of the chunk.

  {% /details %}

  {% details %}
  {% summary %}
  **image**: `Image`

  Optional. Grounding chunk from image search.

  {% /summary %}

  **sourceUri**: `string`

  The web page URI for attribution.

  **imageUri**: `string`

  The image asset URL.

  **title**: `string`

  The title of the web page that the image is from.

  **domain**: `string`

  The root domain of the web page that the image is from, e.g. "example.com".

  {% /details %}

  {% details %}
  {% summary %}
  **retrievedContext**: `RetrievedContext`

  Optional. Grounding chunk from context retrieved by the file search tool.

  {% /summary %}

  **uri**: `string`

  Optional. URI reference of the semantic retrieval document.

  **title**: `string`

  Optional. Title of the document.

  **text**: `string`

  Optional. Text of the chunk.

  **fileSearchStore**: `string`

  Optional. Name of the `FileSearchStore` containing the document. Example: `fileSearchStores/123`

  {% details %}
  {% summary %}
  **customMetadata**: `GroundingChunkCustomMetadata array`

  Optional. User-provided metadata about the retrieved context.

  {% /summary %}

  {% details %}
  {% summary %}
  **value**: `Union type`

  The value of the metadata. Can be a string, a list of strings, or a number.

  {% /summary %}

  Union field `value` can be only one of the following:

  **stringValue**: `string`

  Optional. The string value of the metadata.

  {% details %}
  {% summary %}
  **stringListValue**: `GroundingChunkStringList`

  Optional. A list of string values for the metadata.

  {% /summary %}

  **values**: `string array`

  The string values of the list.

  {% /details %}

  **numericValue**: `number`

  Optional. The numeric value of the metadata. The expected range for this value depends on the specific `key` used.

  {% /details %}

  **key**: `string`

  The key of the metadata.

  {% /details %}

  **pageNumber**: `integer`

  Optional. Page number of the retrieved context, if applicable.

  **mediaId**: `string`

  Optional. The media blob resource name for multimodal file search results. Format: fileSearchStores/{file_search_store_id}/media/{blob_id}

  {% /details %}

  {% details %}
  {% summary %}
  **maps**: `Maps`

  Optional. Grounding chunk from Google Maps.

  {% /summary %}

  **uri**: `string`

  URI reference of the place.

  **title**: `string`

  Title of the place.

  **text**: `string`

  Text description of the place answer.

  **placeId**: `string`

  The ID of the place, in `places/{place_id}` format. A user can use this ID to look up that place.

  {% details %}
  {% summary %}
  **placeAnswerSources**: `PlaceAnswerSources`

  Sources that provide answers about the features of a given place in Google Maps.

  {% /summary %}

  {% details %}
  {% summary %}
  **reviewSnippets**: `ReviewSnippet array`

  Snippets of reviews that are used to generate answers about the features of a given place in Google Maps.

  {% /summary %}

  **reviewId**: `string`

  The ID of the review snippet.

  **googleMapsUri**: `string`

  A link that corresponds to the user review on Google Maps.

  **title**: `string`

  Title of the review.

  {% /details %}

  {% /details %}

  {% /details %}

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **groundingSupports**: `GoogleAiGenerativelanguageV1betaGroundingSupport array`

  List of grounding support.

  {% /summary %}

  {% details %}
  {% summary %}
  **segment**: `GoogleAiGenerativelanguageV1betaSegment`

  Segment of the content this support belongs to.

  {% /summary %}

  **partIndex**: `integer`

  The index of a Part object within its parent Content object.

  **startIndex**: `integer`

  Start index in the given Part, measured in bytes. Offset from the start of the Part, inclusive, starting at zero.

  **endIndex**: `integer`

  End index in the given Part, measured in bytes. Offset from the start of the Part, exclusive, starting at zero.

  **text**: `string`

  The text corresponding to the segment from the response.

  {% /details %}

  **groundingChunkIndices**: `integer array`

  Optional. A list of indices (into 'grounding_chunk' in `response.candidate.grounding_metadata`) specifying the citations associated with the claim. For instance [1,3,4] means that grounding_chunk[1], grounding_chunk[3], grounding_chunk[4] are the retrieved content attributed to the claim. If the response is streaming, the grounding_chunk_indices refer to the indices across all responses. It is the client's responsibility to accumulate the grounding chunks from all responses (while maintaining the same order).

  **confidenceScores**: `number array`

  Optional. Confidence score of the support references. Ranges from 0 to 1. 1 is the most confident. This list must have the same size as the grounding_chunk_indices.

  **renderedParts**: `integer array`

  Output only. Indices into the `parts` field of the candidate's content. These indices specify which rendered parts are associated with this support source.

  {% /details %}

  {% details %}
  {% summary %}
  **retrievalMetadata**: `RetrievalMetadata`

  Metadata related to retrieval in the grounding flow.

  {% /summary %}

  **googleSearchDynamicRetrievalScore**: `number`

  Optional. Score indicating how likely information from google search could help answer the prompt. The score is in the range [0, 1], where 0 is the least likely and 1 is the most likely. This score is only populated when google search grounding and dynamic retrieval is enabled. It will be compared to the threshold to determine whether to trigger google search.

  {% /details %}

  **webSearchQueries**: `string array`

  Web search queries for the following-up web search.

  **imageSearchQueries**: `string array`

  Image search queries used for grounding.

  **googleMapsWidgetContextToken**: `string`

  Optional. Resource name of the Google Maps widget context token that can be used with the PlacesContextElement widget in order to render contextual data. Only populated in the case that grounding with Google Maps is enabled.

  {% /details %}

  {% hr /%}

  **avgLogprobs**: `number`

  Output only. Average log probability score of the candidate.

  {% hr /%}

  {% details %}
  {% summary %}
  **logprobsResult**: `LogprobsResult`

  Output only. Log-likelihood scores for the response tokens and top tokens

  {% /summary %}

  **logProbabilitySum**: `number`

  Sum of log probabilities for all tokens.

  {% details %}
  {% summary %}
  **topCandidates**: `TopCandidates array`

  Length = total number of decoding steps.

  {% /summary %}

  {% details %}
  {% summary %}
  **candidates**: `LogprobsResultCandidate array`

  Sorted by log probability in descending order.

  {% /summary %}

  **token**: `string`

  The candidate’s token string value.

  **tokenId**: `integer`

  The candidate’s token id value.

  **logProbability**: `number`

  The candidate's log probability.

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **chosenCandidates**: `LogprobsResultCandidate array`

  Length = total number of decoding steps. The chosen candidates may or may not be in top_candidates.

  {% /summary %}

  **token**: `string`

  The candidate’s token string value.

  **tokenId**: `integer`

  The candidate’s token id value.

  **logProbability**: `number`

  The candidate's log probability.

  {% /details %}

  {% /details %}

  {% hr /%}

  {% details %}
  {% summary %}
  **urlContextMetadata**: `UrlContextMetadata`

  Output only. Metadata related to url context retrieval tool.

  {% /summary %}

  {% details %}
  {% summary %}
  **urlMetadata**: `UrlMetadata array`

  List of url context.

  {% /summary %}

  **retrievedUrl**: `string`

  Retrieved url by the tool.

  {% details %}
  {% summary %}
  **urlRetrievalStatus**: `string enum`

  Status of the url retrieval.

  {% /summary %}

  Possible values:

  - `URL_RETRIEVAL_STATUS_UNSPECIFIED`: Default value. This value is unused.
  - `URL_RETRIEVAL_STATUS_SUCCESS`: Url retrieval is successful.
  - `URL_RETRIEVAL_STATUS_ERROR`: Url retrieval is failed due to error.
  - `URL_RETRIEVAL_STATUS_PAYWALL`: Url retrieval is failed because the content is behind paywall.
  - `URL_RETRIEVAL_STATUS_UNSAFE`: Url retrieval is failed because the content is unsafe.

  {% /details %}

  {% /details %}

  {% /details %}

  {% hr /%}

  **continuationToken**: `string`

  An optional opaque continuation token returned when `finish_reason` is `CONTINUATION`. Clients can pass this token in a subsequent `GenerateContentRequest` to continue generation.

{% /section %}

### CitationMetadata  {% id="Resource:CitationMetadata" %}

A collection of source attributions for a piece of content.

**Properties:**

{% section class="api-ref-property-list" %}
  {% details %}
  {% summary %}
  **citationSources**: `CitationSource array`

  Citations to sources for a specific response.

  {% /summary %}

  **startIndex**: `integer`

  Optional. Start of segment of the response that is attributed to this source. Index indicates the start of the segment, measured in bytes.

  **endIndex**: `integer`

  Optional. End of the attributed segment, exclusive.

  **uri**: `string`

  Optional. URI that is attributed as a source for a portion of the text.

  **license**: `string`

  Optional. License for the GitHub project that is attributed as a source for segment. License info is required for code citations.

  {% /details %}

{% /section %}

### HarmCategory  {% id="Resource:HarmCategory" %}

**Possible values:**

- `HARM_CATEGORY_UNSPECIFIED`: Category is unspecified.
- `HARM_CATEGORY_HARASSMENT`: **Gemini** - Harassment content.
- `HARM_CATEGORY_HATE_SPEECH`: **Gemini** - Hate speech and content.
- `HARM_CATEGORY_SEXUALLY_EXPLICIT`: **Gemini** - Sexually explicit content.
- `HARM_CATEGORY_DANGEROUS_CONTENT`: **Gemini** - Dangerous content.
- `HARM_CATEGORY_JAILBREAK`: **Gemini** - Prompts attempting to bypass or subvert the model's safety guidelines (jailbreak attempts).

### ModalityTokenCount  {% id="Resource:ModalityTokenCount" %}

Represents token counting info for a single modality.

**Properties:**

{% section class="api-ref-property-list" %}
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

  {% hr /%}

  **tokenCount**: `integer`

  Number of tokens.

{% /section %}

### SafetyRating  {% id="Resource:SafetyRating" %}

Safety rating for a piece of content.

The safety rating contains the category of harm and the
harm probability level in that category for a piece of content.
Content is classified for safety across a number of
harm categories and the probability of the harm classification is included
here.

**Properties:**

{% section class="api-ref-property-list" %}
  {% details %}
  {% summary %}
  **category**: {% mark %}required{% /mark %} [`HarmCategory`](/api-reference/generate-content#Resource:HarmCategory)

  The category for this rating.

  {% /summary %}

  Possible values:

  - `HARM_CATEGORY_UNSPECIFIED`: Category is unspecified.
  - `HARM_CATEGORY_HARASSMENT`: **Gemini** - Harassment content.
  - `HARM_CATEGORY_HATE_SPEECH`: **Gemini** - Hate speech and content.
  - `HARM_CATEGORY_SEXUALLY_EXPLICIT`: **Gemini** - Sexually explicit content.
  - `HARM_CATEGORY_DANGEROUS_CONTENT`: **Gemini** - Dangerous content.
  - `HARM_CATEGORY_JAILBREAK`: **Gemini** - Prompts attempting to bypass or subvert the model's safety guidelines (jailbreak attempts).

  {% /details %}

  {% hr /%}

  {% details %}
  {% summary %}
  **probability**: {% mark %}required{% /mark %} `string enum`

  The probability of harm for this content.

  {% /summary %}

  Possible values:

  - `HARM_PROBABILITY_UNSPECIFIED`: Probability is unspecified.
  - `NEGLIGIBLE`: Content has a negligible chance of being unsafe.
  - `LOW`: Content has a low chance of being unsafe.
  - `MEDIUM`: Content has a medium chance of being unsafe.
  - `HIGH`: Content has a high chance of being unsafe.

  {% /details %}

  {% hr /%}

  **blocked**: `boolean`

  Was this content blocked because of this rating?

{% /section %}

### SafetySetting  {% id="Resource:SafetySetting" %}

Safety setting, affecting the safety-blocking behavior.

Passing a safety setting for a category changes the allowed probability that
content is blocked.

**Properties:**

{% section class="api-ref-property-list" %}
  {% details %}
  {% summary %}
  **category**: {% mark %}required{% /mark %} [`HarmCategory`](/api-reference/generate-content#Resource:HarmCategory)

  The category for this setting.

  {% /summary %}

  Possible values:

  - `HARM_CATEGORY_UNSPECIFIED`: Category is unspecified.
  - `HARM_CATEGORY_HARASSMENT`: **Gemini** - Harassment content.
  - `HARM_CATEGORY_HATE_SPEECH`: **Gemini** - Hate speech and content.
  - `HARM_CATEGORY_SEXUALLY_EXPLICIT`: **Gemini** - Sexually explicit content.
  - `HARM_CATEGORY_DANGEROUS_CONTENT`: **Gemini** - Dangerous content.
  - `HARM_CATEGORY_JAILBREAK`: **Gemini** - Prompts attempting to bypass or subvert the model's safety guidelines (jailbreak attempts).

  {% /details %}

  {% hr /%}

  {% details %}
  {% summary %}
  **threshold**: {% mark %}required{% /mark %} `string enum`

  Controls the probability threshold at which harm is blocked.

  {% /summary %}

  Possible values:

  - `HARM_BLOCK_THRESHOLD_UNSPECIFIED`: Threshold is unspecified.
  - `BLOCK_LOW_AND_ABOVE`: Content with NEGLIGIBLE will be allowed.
  - `BLOCK_MEDIUM_AND_ABOVE`: Content with NEGLIGIBLE and LOW will be allowed.
  - `BLOCK_ONLY_HIGH`: Content with NEGLIGIBLE, LOW, and MEDIUM will be allowed.
  - `BLOCK_NONE`: All content will be allowed.
  - `OFF`: Turn off the safety filter.

  {% /details %}

{% /section %}

### ServiceTier  {% id="Resource:ServiceTier" %}

**Possible values:**

- `unspecified`: Default service tier, which is standard.
- `standard`: Standard service tier.
- `flex`: Flex service tier.
- `priority`: Priority service tier.

### Content  {% id="Resource:Content" %}

The base structured datatype containing multi-part content of a message.

A [`Content`](/api-reference/generate-content#Resource:Content) includes a `role` field designating the producer of the [`Content`](/api-reference/generate-content#Resource:Content)
and a `parts` field containing multi-part data that contains the content of
the message turn.

**Properties:**

{% section class="api-ref-property-list" %}
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

  The function response in JSON object format. Callers can use any keys of their choice that fit the function's syntax to return the function output, e.g. "output", "result", etc. In particular, if the function call failed to execute, the response can have an "error" key to return error details to the model. Multimedia can be included by using a subobject containing a single "$ref" key whose value is the `inline_data.display_name` of a `FunctionResponsePart` holding the multimedia. See /docs/function-calling#multimodal.

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

  Optional. Display name of the blob. Used to provide a label or filename to distinguish blobs.

  {% /details %}

  {% details %}
  {% summary %}
  **fileData**: `FunctionResponseFileData`

  URI based data.

  {% /summary %}

  **fileUri**: {% mark %}required{% /mark %} `string`

  URI.

  **mimeType**: `string`

  The IANA standard MIME type of the source data.

  **displayName**: `string`

  Optional. Display name of the file. Used to provide a label or filename to distinguish file data.

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

  {% hr /%}

  **role**: `string`

  Optional. The producer of the content. Must be either 'user' or 'model'. Useful to set for multi-turn conversations, otherwise can be left blank or unset.

{% /section %}

### Environment  {% id="Resource:Environment" %}

An execution environment for an agent.

**Properties:**

{% section class="api-ref-property-list" %}
  **id**: {% mark %}required{% /mark %} `string`

  Output only. The ID of the environment.

  {% hr /%}

  {% details %}
  {% summary %}
  **sources**: `Source array`

  Sources to be mounted into the environment.

  {% /summary %}

  {% details %}
  {% summary %}
  **type**: `string enum`

  {% /summary %}

  Possible values:

  - `TYPE_UNSPECIFIED`
  - `GCS`: A Cloud Storage bucket.
  - `INLINE`: Inline content.
  - `REPOSITORY`: A generic repository. The protocol prefix in the source URL identifies the provider (e.g., github://, gcs://).

  {% /details %}

  **source**: `string`

  The source of the environment. For Cloud Storage, this is the Cloud Storage path. For GitHub, this is the GitHub path.

  **target**: `string`

  Where the source should appear in the environment.

  **content**: `string`

  The inline content if `type` is `INLINE`.

  **encoding**: `string`

  Optional encoding for inline content (e.g. `base64`).

  {% /details %}

  {% hr /%}

  **created**: `string`

  Output only. The time at which the environment was created in ISO 8601 format (YYYY-MM-DDThh:mm:ssZ).

  {% hr /%}

  **updated**: `string`

  Output only. The time at which the environment was last updated in ISO 8601 format (YYYY-MM-DDThh:mm:ssZ).

  {% hr /%}

  **lastAccessed**: `string`

  Output only. The time at which the environment was last accessed in ISO 8601 format (YYYY-MM-DDThh:mm:ssZ).

  {% hr /%}

  {% details %}
  {% summary %}
  **status**: `string enum`

  Output only. The status of the environment container.

  {% /summary %}

  Possible values:

  - `STATUS_UNSPECIFIED`: Output only. The status of the environment container.
  - `ACTIVE`: Output only. The status of the environment container.
  - `EXPIRED`: Output only. The status of the environment container.

  {% /details %}

  {% hr /%}

  {% details %}
  {% summary %}
  **network**: `Union type`

  Network configuration for the environment.

  {% /summary %}

  Union field `network` can be only one of the following:

  {% details %}
  {% summary %}
  **networkAllowlist**: `EnvironmentNetworkEgressAllowlist`

  Allow only specific domains.

  {% /summary %}

  {% details %}
  {% summary %}
  **allowlist**: `EgressRule array`

  List of allowed domains and their configurations. Set to `"disabled"` to block all network egress.

  {% /summary %}

  **domain**: `string`

  Domain to allow outbound requests to. Supports wildcards (e.g. '*.googleapis.com'). Use '*' to allow all domains.

  **transform**: `object`

  Headers to inject into requests matching this rule. Key: header name (e.g., "Authorization"). Value: header value (e.g., "Bearer your-token").

  **credential**: `string`

  Optional. Reference to a server-managed Credential resource by ID.

  {% details %}
  {% summary %}
  **mode**: `string enum`

  Network egress mode. Set via the `"allowlist": "disabled"` short form; must be the only rule in the allowlist and cannot be combined with `domain`, `transform` or `credential`.

  {% /summary %}

  Possible values:

  - `NETWORK_MODE_UNSPECIFIED`: Default value. Unused.
  - `DISABLED`: All network egress is blocked.

  {% /details %}

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **networkMode**: `string enum`

  Network egress mode.

  {% /summary %}

  Possible values:

  - `NETWORK_MODE_UNSPECIFIED`: Default value. Unused.
  - `DISABLED`: All network egress is blocked.

  {% /details %}

  {% /details %}

  {% hr /%}

  **fileCount**: `string`

  Output only. The number of files in the environment, output only.

  {% hr /%}

  **sizeBytes**: `string`

  Output only. The total size of the environment files in bytes, output only.

{% /section %}

### Schema  {% id="Resource:Schema" %}

The [`Schema`](/api-reference/generate-content#Resource:Schema) object allows the definition of input and output data types.
These types can be objects, but also primitives and arrays.
Represents a select subset of an [OpenAPI 3.0 schema
object](https://spec.openapis.org/oas/v3.0.3#schema).

**Properties:**

{% section class="api-ref-property-list" %}
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

  {% hr /%}

  **format**: `string`

  Optional. The format of the data. Any value is allowed, but most do not trigger any special functionality.

  {% hr /%}

  **title**: `string`

  Optional. The title of the schema.

  {% hr /%}

  **description**: `string`

  Optional. A brief description of the parameter. This could contain examples of use. Parameter description may be formatted as Markdown.

  {% hr /%}

  **nullable**: `boolean`

  Optional. Indicates if the value may be null.

  {% hr /%}

  **enum**: `string array`

  Optional. Possible values of the element of Type.STRING with enum format. For example we can define an Enum Direction as : {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]}

  {% hr /%}

  **items**: [`Schema`](/api-reference/generate-content#Resource:Schema)

  Optional. Schema of the elements of Type.ARRAY.

  {% hr /%}

  **maxItems**: `string`

  Optional. Maximum number of the elements for Type.ARRAY.

  {% hr /%}

  **minItems**: `string`

  Optional. Minimum number of the elements for Type.ARRAY.

  {% hr /%}

  **properties**: `object`

  Optional. Properties of Type.OBJECT.

  {% hr /%}

  **required**: `string array`

  Optional. Required properties of Type.OBJECT.

  {% hr /%}

  **minProperties**: `string`

  Optional. Minimum number of the properties for Type.OBJECT.

  {% hr /%}

  **maxProperties**: `string`

  Optional. Maximum number of the properties for Type.OBJECT.

  {% hr /%}

  **minimum**: `number`

  Optional. SCHEMA FIELDS FOR TYPE INTEGER and NUMBER Minimum value of the Type.INTEGER and Type.NUMBER

  {% hr /%}

  **maximum**: `number`

  Optional. Maximum value of the Type.INTEGER and Type.NUMBER

  {% hr /%}

  **minLength**: `string`

  Optional. SCHEMA FIELDS FOR TYPE STRING Minimum length of the Type.STRING

  {% hr /%}

  **maxLength**: `string`

  Optional. Maximum length of the Type.STRING

  {% hr /%}

  **pattern**: `string`

  Optional. Pattern of the Type.STRING to restrict a string to a regular expression.

  {% hr /%}

  **example**: `object`

  Optional. Example of the object. Will only populated when the object is the root.

  {% hr /%}

  **anyOf**: [`Schema`](/api-reference/generate-content#Resource:Schema) `array`

  Optional. The value should be validated against any (one or more) of the subschemas in the list.

  {% hr /%}

  **propertyOrdering**: `string array`

  Optional. The order of the properties. Not a standard field in open api spec. Used to determine the order of the properties in the response.

  {% hr /%}

  **default**: `object`

  Optional. Default value of the field. Per JSON Schema, this field is intended for documentation generators and doesn't affect validation. Thus it's included here and ignored so that developers who send schemas with a `default` field don't get unknown-field errors.

{% /section %}

### Tool  {% id="Resource:Tool" %}

Tool details that the model may use to generate response.

A [`Tool`](/api-reference/generate-content#Resource:Tool) is a piece of code that enables the system to interact with
external systems to perform an action, or set of actions, outside of
knowledge and scope of the model.

**Properties:**

{% section class="api-ref-property-list" %}
  {% details %}
  {% summary %}
  **functionDeclarations**: `FunctionDeclaration array`

  Optional. A list of `FunctionDeclarations` available to the model that can be used for function calling. The model or system does not execute the function. Instead the defined function may be returned as a FunctionCall with arguments to the client side for execution. The model may decide to call a subset of these functions by populating FunctionCall in the response. The next conversation turn may contain a FunctionResponse with the Content.role "function" generation context for the next model turn.

  {% /summary %}

  **name**: {% mark %}required{% /mark %} `string`

  The name of the function. Must be a-z, A-Z, 0-9, or contain underscores, colons, dots, and dashes, with a maximum length of 128.

  **description**: {% mark %}required{% /mark %} `string`

  A brief description of the function.

  **parameters**: [`Schema`](/api-reference/generate-content#Resource:Schema)

  Optional. Describes the parameters to this function. Reflects the Open API 3.03 Parameter Object string Key: the name of the parameter. Parameter names are case sensitive. Schema Value: the Schema defining the type used for the parameter.

  **parametersJsonSchema**: `object`

  Optional. Describes the parameters to the function in JSON Schema format. The schema must describe an object where the properties are the parameters to the function. For example: `{ "type": "object", "properties": { "name": { "type": "string" }, "age": { "type": "integer" } }, "additionalProperties": false, "required": ["name", "age"], "propertyOrdering": ["name", "age"] }` This field is mutually exclusive with `parameters`.

  **response**: [`Schema`](/api-reference/generate-content#Resource:Schema)

  Optional. Describes the output from this function in JSON Schema format. Reflects the Open API 3.03 Response Object. The Schema defines the type used for the response value of the function.

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

  {% hr /%}

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

  {% hr /%}

  {% details %}
  {% summary %}
  **codeExecution**: `CodeExecution`

  Optional. Enables the model to execute code as part of generation.

  {% /summary %}

  {% /details %}

  {% hr /%}

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

  {% hr /%}

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

  {% hr /%}

  {% details %}
  {% summary %}
  **urlContext**: `UrlContext`

  Optional. Tool to support URL context retrieval.

  {% /summary %}

  {% /details %}

  {% hr /%}

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

  {% hr /%}

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

  {% hr /%}

  {% details %}
  {% summary %}
  **googleMaps**: `GoogleMaps`

  Optional. Tool that allows grounding the model's response with geospatial context related to the user's query.

  {% /summary %}

  **enableWidget**: `boolean`

  Optional. Whether to return a widget context token in the GroundingMetadata of the response. Developers can use the widget context token to render a Google Maps widget with geospatial context related to the places that the model references in the response.

  {% /details %}

{% /section %}

### AuthToken  {% id="Resource:AuthToken" %}

A request to create an ephemeral authentication token.

**Properties:**

{% section class="api-ref-property-list" %}
  {% details %}
  {% summary %}
  **config**: `Union type`

  The method-specific configuration for the resulting token.

  {% /summary %}

  Union field `config` can be only one of the following:

  {% details %}
  {% summary %}
  **bidiGenerateContentSetup**: `BidiGenerateContentSetup`

  Optional. Input only. Immutable. Configuration specific to `BidiGenerateContent`.

  {% /summary %}

  **model**: {% mark %}required{% /mark %} `string`

  The model's resource name. This serves as an ID for the Model to use. Format: `models/{model}`

  {% details %}
  {% summary %}
  **generationConfig**: `GenerationConfig`

  Optional. Generation config. The following fields are not supported:

  - `response_logprobs`
  - `response_mime_type`
  - `logprobs`
  - `response_schema`
  - `response_json_schema`
  - `stop_sequence`
  - `skip_response_cache`
  - `routing_config`
  - `audio_timestamp`

  {% /summary %}

  **candidateCount**: `integer`

  Optional. Number of generated responses to return. If unset, this will default to 1. Please note that this doesn't work for previous generation models (Gemini 1.0 family)

  **stopSequences**: `string array`

  Optional. The set of character sequences (up to 5) that will stop output generation. If specified, the API will stop at the first appearance of a `stop_sequence`. The stop sequence will not be included as part of the response.

  **maxOutputTokens**: `integer`

  Optional. The maximum number of tokens to include in a response candidate. Note: The default value varies by model, see the `Model.output_token_limit` attribute of the `Model` returned from the `getModel` function.

  **temperature**: `number`

  Optional. Controls the randomness of the output. Note: The default value varies by model, see the `Model.temperature` attribute of the `Model` returned from the `getModel` function. Values can range from [0.0, 2.0]. This field is no longer supported and is silently ignored on Gemini 3.6 Flash and newer models.

  **topP**: `number`

  Optional. The maximum cumulative probability of tokens to consider when sampling. The model uses combined Top-k and Top-p (nucleus) sampling. Tokens are sorted based on their assigned probabilities so that only the most likely tokens are considered. Top-k sampling directly limits the maximum number of tokens to consider, while Nucleus sampling limits the number of tokens based on the cumulative probability. Note: The default value varies by `Model` and is specified by the`Model.top_p` attribute returned from the `getModel` function. An empty `top_k` attribute indicates that the model doesn't apply top-k sampling and doesn't allow setting `top_k` on requests. This field is no longer supported and is silently ignored on Gemini 3.6 Flash and newer models.

  **topK**: `integer`

  Optional. The maximum number of tokens to consider when sampling. Gemini models use Top-p (nucleus) sampling or a combination of Top-k and nucleus sampling. Top-k sampling considers the set of `top_k` most probable tokens. Models running with nucleus sampling don't allow top_k setting. Note: The default value varies by `Model` and is specified by the`Model.top_p` attribute returned from the `getModel` function. An empty `top_k` attribute indicates that the model doesn't apply top-k sampling and doesn't allow setting `top_k` on requests. This field is no longer supported and is silently ignored on Gemini 3.6 Flash and newer models.

  **seed**: `integer`

  Optional. Seed used in decoding. If not set, the request uses a randomly generated seed.

  **responseMimeType**: `string`

  Optional. MIME type of the generated candidate text. Supported MIME types are: `text/plain`: (default) Text output. `application/json`: JSON response in the response candidates. `text/x.enum`: ENUM as a string response in the response candidates. Refer to the [docs](/docs/file-input-methods#text-file-types) for a list of all supported text MIME types.

  **responseJsonSchema**: `object`

  Optional. An internal detail. Use `responseJsonSchema` rather than this field.

  **presencePenalty**: `number`

  Optional. Presence penalty applied to the next token's logprobs if the token has already been seen in the response. This penalty is binary on/off and not dependant on the number of times the token is used (after the first). Use frequency_penalty for a penalty that increases with each use. A positive penalty will discourage the use of tokens that have already been used in the response, increasing the vocabulary. A negative penalty will encourage the use of tokens that have already been used in the response, decreasing the vocabulary.

  **frequencyPenalty**: `number`

  Optional. Frequency penalty applied to the next token's logprobs, multiplied by the number of times each token has been seen in the respponse so far. A positive penalty will discourage the use of tokens that have already been used, proportional to the number of times the token has been used: The more a token is used, the more difficult it is for the model to use that token again increasing the vocabulary of responses. Caution: A *negative* penalty will encourage the model to reuse tokens proportional to the number of times the token has been used. Small negative values will reduce the vocabulary of a response. Larger negative values will cause the model to start repeating a common token until it hits the max_output_tokens limit.

  **responseLogprobs**: `boolean`

  Optional. If true, export the logprobs results in response.

  **logprobs**: `integer`

  Optional. Only valid if response_logprobs=True. This sets the number of top logprobs, including the chosen candidate, to return at each decoding step in the Candidate.logprobs_result. The number must be in the range of [0, 20].

  **enableEnhancedCivicAnswers**: `boolean`

  Optional. Enables enhanced civic answers. It may not be available for all models.

  {% details %}
  {% summary %}
  **responseModalities**: `string enum array`

  Optional. The requested modalities of the response. Represents the set of modalities that the model can return, and should be expected in the response. This is an exact match to the modalities of the response. A model may have multiple combinations of supported modalities. If the requested modalities do not match any of the supported combinations, an error will be returned. An empty list is equivalent to requesting only text.

  {% /summary %}

  Possible values:

  - `MODALITY_UNSPECIFIED`: Default value.
  - `TEXT`: Indicates the model should return text.
  - `IMAGE`: Indicates the model should return images.
  - `AUDIO`: Indicates the model should return audio.

  {% /details %}

  {% details %}
  {% summary %}
  **speechConfig**: `SpeechConfig`

  Optional. The speech generation config.

  {% /summary %}

  {% details %}
  {% summary %}
  **voiceConfig**: `VoiceConfig`

  The configuration in case of single-voice output.

  {% /summary %}

  {% details %}
  {% summary %}
  **voiceConfig**: `Union type`

  The configuration for the speaker to use.

  {% /summary %}

  Union field `voiceConfig` can be only one of the following:

  {% details %}
  {% summary %}
  **prebuiltVoiceConfig**: `PrebuiltVoiceConfig`

  The configuration for the prebuilt voice to use.

  {% /summary %}

  **voiceName**: `string`

  Optional. The name of the preset voice to use.

  {% /details %}

  **voice**: `string`

  Optional. The speaker identifier for synthesis. Supported formats:

  - Speaker name for prebuilt voices (for example, `Orus` or `Kore`).
  - Voice ID for stored voices (for example, `voice_xxx`).
  - Voice replication key (for example, `voicekey_xxx`).

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **multiSpeakerVoiceConfig**: `MultiSpeakerVoiceConfig`

  Optional. The configuration for the multi-speaker setup. It is mutually exclusive with the voice_config field.

  {% /summary %}

  {% details %}
  {% summary %}
  **speakerVoiceConfigs**: {% mark %}required{% /mark %} `SpeakerVoiceConfig array`

  All the enabled speaker voices.

  {% /summary %}

  **speaker**: {% mark %}required{% /mark %} `string`

  The name of the speaker to use. Should be the same as in the prompt.

  {% details %}
  {% summary %}
  **voiceConfig**: {% mark %}required{% /mark %} `VoiceConfig`

  The configuration for the voice to use.

  {% /summary %}

  {% details %}
  {% summary %}
  **voiceConfig**: `Union type`

  The configuration for the speaker to use.

  {% /summary %}

  Union field `voiceConfig` can be only one of the following:

  {% details %}
  {% summary %}
  **prebuiltVoiceConfig**: `PrebuiltVoiceConfig`

  The configuration for the prebuilt voice to use.

  {% /summary %}

  **voiceName**: `string`

  Optional. The name of the preset voice to use.

  {% /details %}

  **voice**: `string`

  Optional. The speaker identifier for synthesis. Supported formats:

  - Speaker name for prebuilt voices (for example, `Orus` or `Kore`).
  - Voice ID for stored voices (for example, `voice_xxx`).
  - Voice replication key (for example, `voicekey_xxx`).

  {% /details %}

  {% /details %}

  {% /details %}

  {% /details %}

  **languageCode**: `string`

  Optional. The IETF [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language code that the user configured the app to use. Used for speech recognition and synthesis. Valid values are: `de-DE`, `en-AU`, `en-GB`, `en-IN`, `en-US`, `es-US`, `fr-FR`, `hi-IN`, `pt-BR`, `ar-XA`, `es-ES`, `fr-CA`, `id-ID`, `it-IT`, `ja-JP`, `tr-TR`, `vi-VN`, `bn-IN`, `gu-IN`, `kn-IN`, `ml-IN`, `mr-IN`, `ta-IN`, `te-IN`, `nl-NL`, `ko-KR`, `cmn-CN`, `pl-PL`, `ru-RU`, and `th-TH`.

  {% /details %}

  {% details %}
  {% summary %}
  **thinkingConfig**: `ThinkingConfig`

  Optional. Config for thinking features. An error will be returned if this field is set for models that don't support thinking.

  {% /summary %}

  **includeThoughts**: `boolean`

  Indicates whether to include thoughts in the response. If true, thoughts are returned only when available.

  **thinkingBudget**: `integer`

  The number of thoughts tokens that the model should generate.

  {% details %}
  {% summary %}
  **thinkingLevel**: `string enum`

  Optional. Controls the maximum depth of the model's internal reasoning process before it produces a response. The default value is model-dependent. Refer to the [Thinking levels guide](/docs/thinking#thinking-levels) for more details. Recommended for Gemini 3 or later models. Use with earlier models results in an error.

  {% /summary %}

  Possible values:

  - `THINKING_LEVEL_UNSPECIFIED`: Default value.
  - `MINIMAL`: Little to no thinking.
  - `LOW`: Low thinking level.
  - `MEDIUM`: Medium thinking level.
  - `HIGH`: High thinking level.

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **imageConfig**: `ImageConfig`

  Optional. Config for image generation. An error will be returned if this field is set for models that don't support these config options.

  {% /summary %}

  **aspectRatio**: `string`

  Optional. The aspect ratio of the image to generate. Supported aspect ratios: `1:1`, `1:4`, `4:1`, `1:8`, `8:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, or `21:9`. If not specified, the model will choose a default aspect ratio based on any reference images provided.

  **imageSize**: `string`

  Optional. Specifies the size of generated images. Supported values are `512`, `1K`, `2K`, `4K`. If not specified, the model will use default value `1K`.

  {% /details %}

  {% details %}
  {% summary %}
  **mediaResolution**: `string enum`

  Optional. If specified, the media resolution specified will be used.

  {% /summary %}

  Possible values:

  - `MEDIA_RESOLUTION_UNSPECIFIED`: Media resolution has not been set.
  - `MEDIA_RESOLUTION_LOW`: Media resolution set to low (64 tokens).
  - `MEDIA_RESOLUTION_MEDIUM`: Media resolution set to medium (256 tokens).
  - `MEDIA_RESOLUTION_HIGH`: Media resolution set to high (zoomed reframing with 256 tokens).

  {% /details %}

  **enableAffectiveDialog**: `boolean`

  Optional. If enabled, the model will detect emotions and adapt its responses accordingly.

  {% details %}
  {% summary %}
  **responseFormat**: `ResponseFormatConfig`

  Optional. Configuration for the response output format. Allows specifying output configuration per modality (text, audio, image) in a flat structure.

  {% /summary %}

  {% details %}
  {% summary %}
  **text**: `TextResponseFormat`

  Optional. Text output format configuration.

  {% /summary %}

  {% details %}
  {% summary %}
  **mimeType**: `string enum`

  Optional. The MIME type of the text output.

  {% /summary %}

  Possible values:

  - `MIME_TYPE_UNSPECIFIED`: Default value. This value is unused.
  - `APPLICATION_JSON`: JSON output format.
  - `TEXT_PLAIN`: Plain text output format.

  {% /details %}

  **schema**: `object`

  Optional. The JSON schema that the output should conform to. Only applicable when mime_type is APPLICATION_JSON.

  {% /details %}

  {% details %}
  {% summary %}
  **audio**: `AudioResponseFormat`

  Optional. Audio output format configuration.

  {% /summary %}

  {% details %}
  {% summary %}
  **mimeType**: `string enum`

  Optional. The MIME type of the audio output.

  {% /summary %}

  Possible values:

  - `MIME_TYPE_UNSPECIFIED`: Default value. This value is unused.
  - `AUDIO_MP3`: MP3 audio format.
  - `AUDIO_OGG_OPUS`: OGG Opus audio format.
  - `AUDIO_L16`: Raw PCM (L16) audio format.
  - `AUDIO_WAV`: WAV audio format.
  - `AUDIO_ALAW`: A-law audio format.
  - `AUDIO_MULAW`: Mu-law audio format.

  {% /details %}

  {% details %}
  {% summary %}
  **delivery**: `string enum`

  Optional. The delivery mode for the audio output.

  {% /summary %}

  Possible values:

  - `DELIVERY_UNSPECIFIED`: Default value. This value is unused.
  - `INLINE`: Audio data is returned inline in the response.
  - `URI`: Audio data is returned as a URI.

  {% /details %}

  **sampleRate**: `integer`

  Optional. Sample rate in Hz.

  **bitRate**: `integer`

  Optional. Bit rate in bits per second (bps). Only applicable for compressed formats (MP3, Opus).

  {% /details %}

  {% details %}
  {% summary %}
  **image**: `ImageResponseFormat`

  Optional. Image output format configuration.

  {% /summary %}

  {% details %}
  {% summary %}
  **mimeType**: `string enum`

  Optional. The MIME type of the image output.

  {% /summary %}

  Possible values:

  - `MIME_TYPE_UNSPECIFIED`: Default value. This value is unused.
  - `IMAGE_JPEG`: JPEG image format.

  {% /details %}

  {% details %}
  {% summary %}
  **delivery**: `string enum`

  Optional. The delivery mode for the image output.

  {% /summary %}

  Possible values:

  - `DELIVERY_UNSPECIFIED`: Default value. This value is unused.
  - `INLINE`: Image data is returned inline in the response.
  - `URI`: Image data is returned as a URI.

  {% /details %}

  {% details %}
  {% summary %}
  **aspectRatio**: `string enum`

  Optional. The aspect ratio for the image output.

  {% /summary %}

  Possible values:

  - `ASPECT_RATIO_UNSPECIFIED`: Default value. This value is unused.
  - `ASPECT_RATIO_ONE_BY_ONE`: 1:1 aspect ratio.
  - `ASPECT_RATIO_TWO_BY_THREE`: 2:3 aspect ratio.
  - `ASPECT_RATIO_THREE_BY_TWO`: 3:2 aspect ratio.
  - `ASPECT_RATIO_THREE_BY_FOUR`: 3:4 aspect ratio.
  - `ASPECT_RATIO_FOUR_BY_THREE`: 4:3 aspect ratio.
  - `ASPECT_RATIO_FOUR_BY_FIVE`: 4:5 aspect ratio.
  - `ASPECT_RATIO_FIVE_BY_FOUR`: 5:4 aspect ratio.
  - `ASPECT_RATIO_NINE_BY_SIXTEEN`: 9:16 aspect ratio.
  - `ASPECT_RATIO_SIXTEEN_BY_NINE`: 16:9 aspect ratio.
  - `ASPECT_RATIO_TWENTY_ONE_BY_NINE`: 21:9 aspect ratio.
  - `ASPECT_RATIO_ONE_BY_EIGHT`: 1:8 aspect ratio.
  - `ASPECT_RATIO_EIGHT_BY_ONE`: 8:1 aspect ratio.
  - `ASPECT_RATIO_ONE_BY_FOUR`: 1:4 aspect ratio.
  - `ASPECT_RATIO_FOUR_BY_ONE`: 4:1 aspect ratio.

  {% /details %}

  {% details %}
  {% summary %}
  **imageSize**: `string enum`

  Optional. The size of the image output.

  {% /summary %}

  Possible values:

  - `IMAGE_SIZE_UNSPECIFIED`: Default value. This value is unused.
  - `IMAGE_SIZE_FIVE_TWELVE`: 512px image size.
  - `IMAGE_SIZE_ONE_K`: 1K image size.
  - `IMAGE_SIZE_TWO_K`: 2K image size.
  - `IMAGE_SIZE_FOUR_K`: 4K image size.

  {% /details %}

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **translationConfig**: `TranslationConfig`

  Optional. Config for translation.

  {% /summary %}

  **targetLanguageCode**: {% mark %}required{% /mark %} `string`

  The target language for translation. Supported values are BCP-47 language codes (e.g. "en", "es", "fr").

  **echoTargetLanguage**: `boolean`

  Optional. If true, the model will generate audio when the target language is spoken, essentially it will parrot the input. If false, we will not produce audio for the target language.

  {% /details %}

  {% details %}
  {% summary %}
  **audioTranscriptionConfig**: `AudioTranscriptionConfig`

  Optional. Config for audio transcription (speech recognition).

  {% /summary %}

  **languageCodes**: `string array`

  Optional. BCP-47 language codes providing hints about the languages present in the audio. If omitted or empty, defaults to automatic language detection.

  **customVocabulary**: `string array`

  Optional. A list of custom vocabulary phrases to bias the speech recognition model toward recognizing specific terms (product names, proper nouns, jargon).

  **wordTimestamp**: `boolean`

  Optional. Configures word-level timestamp generation.

  **diarization**: `boolean`

  Optional. Configures speaker diarization.

  {% details %}
  {% summary %}
  **mode**: `string enum`

  Optional. Configures transcription mode. Supported values: `VERBATIM`, `SMART`. If unspecified, defaults to `VERBATIM` transcription. In `SMART` mode, the model performs disfluency removal (eliminating filler words, repetitions, and false starts), light grammatical cleanup, automatic formatting (paragraphs, bullet points, numbered lists), and minor user edits (inline self-corrections). Timestamps and diarization are incompatible with mode `SMART`.

  {% /summary %}

  Possible values:

  - `MODE_UNSPECIFIED`: Unspecified transcription mode.
  - `VERBATIM`: Verbatim transcription mode.
  - `SMART`: Smart transcription mode.

  {% /details %}

  {% /details %}

  {% /details %}

  **systemInstruction**: [`Content`](/api-reference/generate-content#Resource:Content)

  Optional. The user provided system instructions for the model. Note: Only text should be used in parts and content in each part will be in a separate paragraph.

  **tools**: [`Tool`](/api-reference/generate-content#Resource:Tool) `array`

  Optional. A list of `Tools` the model may use to generate the next response. A [`Tool`](/api-reference/generate-content#Resource:Tool) is a piece of code that enables the system to interact with external systems to perform an action, or set of actions, outside of knowledge and scope of the model.

  {% details %}
  {% summary %}
  **realtimeInputConfig**: `RealtimeInputConfig`

  Optional. Configures the handling of realtime input.

  {% /summary %}

  {% details %}
  {% summary %}
  **automaticActivityDetection**: `AutomaticActivityDetection`

  Optional. If not set, automatic activity detection is enabled by default. If automatic voice detection is disabled, the client must send activity signals.

  {% /summary %}

  **disabled**: `boolean`

  Optional. If enabled (the default), detected voice and text input count as activity. If disabled, the client must send activity signals.

  {% details %}
  {% summary %}
  **startOfSpeechSensitivity**: `string enum`

  Optional. Determines how likely speech is to be detected.

  {% /summary %}

  Possible values:

  - `START_SENSITIVITY_UNSPECIFIED`: The default is START_SENSITIVITY_HIGH.
  - `START_SENSITIVITY_HIGH`: Automatic detection will detect the start of speech more often.
  - `START_SENSITIVITY_LOW`: Automatic detection will detect the start of speech less often.

  {% /details %}

  **prefixPaddingMs**: `integer`

  Optional. The required duration of detected speech before start-of-speech is committed. The lower this value, the more sensitive the start-of-speech detection is and shorter speech can be recognized. However, this also increases the probability of false positives.

  {% details %}
  {% summary %}
  **endOfSpeechSensitivity**: `string enum`

  Optional. Determines how likely detected speech is ended.

  {% /summary %}

  Possible values:

  - `END_SENSITIVITY_UNSPECIFIED`: The default is END_SENSITIVITY_HIGH.
  - `END_SENSITIVITY_HIGH`: Automatic detection ends speech more often.
  - `END_SENSITIVITY_LOW`: Automatic detection ends speech less often.

  {% /details %}

  **silenceDurationMs**: `integer`

  Optional. The required duration of detected non-speech (e.g. silence) before end-of-speech is committed. The larger this value, the longer speech gaps can be without interrupting the user's activity but this will increase the model's latency.

  {% /details %}

  {% details %}
  {% summary %}
  **activityHandling**: `ActivityHandling`

  Optional. Defines what effect activity has.

  {% /summary %}

  Possible values:

  - `ACTIVITY_HANDLING_UNSPECIFIED`: If unspecified, the default behavior is `START_OF_ACTIVITY_INTERRUPTS`.
  - `START_OF_ACTIVITY_INTERRUPTS`: If true, start of activity will interrupt the model's response (also called "barge in"). The model's current response will be cut-off in the moment of the interruption. This is the default behavior.
  - `NO_INTERRUPTION`: The model's response will not be interrupted.

  {% /details %}

  {% details %}
  {% summary %}
  **turnCoverage**: `string enum`

  Optional. Defines which input is included in the user's turn.

  {% /summary %}

  Possible values:

  - `TURN_COVERAGE_UNSPECIFIED`: If unspecified, a default behavior is selected based on the model. E.g., for Gemini 2.5, the default is `TURN_INCLUDES_ONLY_ACTIVITY`, while for Gemini 3.1 and onwards, it's `TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO`.
  - `TURN_INCLUDES_ONLY_ACTIVITY`: Includes activity since the last turn, excluding inactivity (e.g. silence on the audio stream).
  - `TURN_INCLUDES_ALL_INPUT`: Includes all realtime input since the last turn, including inactivity (e.g. silence on the audio stream).
  - `TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO`: Includes audio activity and all video since the last turn. With automatic activity detection, audio activity means speech and excludes silence.

  {% /details %}

  **interimTranscriptTimestampEnabled**: `boolean`

  Optional. Configures interim transcript timestamps.

  {% /details %}

  {% details %}
  {% summary %}
  **sessionResumption**: `SessionResumptionConfig`

  Optional. Configures session resumption mechanism. If included, the server will send `SessionResumptionUpdate` messages.

  {% /summary %}

  **handle**: `string`

  The handle of a previous session. If not present then a new session is created. Session handles come from `SessionResumptionUpdate.token` values in previous connections.

  {% /details %}

  {% details %}
  {% summary %}
  **contextWindowCompression**: `ContextWindowCompressionConfig`

  Optional. Configures a context window compression mechanism. If included, the server will automatically reduce the size of the context when it exceeds the configured length.

  {% /summary %}

  {% details %}
  {% summary %}
  **compressionMechanism**: `Union type`

  The context window compression mechanism used.

  {% /summary %}

  Union field `compressionMechanism` can be only one of the following:

  {% details %}
  {% summary %}
  **slidingWindow**: `SlidingWindow`

  A sliding-window mechanism.

  {% /summary %}

  **targetTokens**: `string`

  The target number of tokens to keep. The default value is trigger_tokens/2. Discarding parts of the context window causes a temporary latency increase so this value should be calibrated to avoid frequent compression operations.

  {% /details %}

  {% /details %}

  **triggerTokens**: `string`

  The number of tokens (before running a turn) required to trigger a context window compression. This can be used to balance quality against latency as shorter context windows may result in faster model responses. However, any compression operation will cause a temporary latency increase, so they should not be triggered frequently. If not set, the default is 80% of the model's context window limit. This leaves 20% for the next user request/model response.

  {% /details %}

  {% details %}
  {% summary %}
  **inputAudioTranscription**: `AudioTranscriptionConfig`

  Optional. If set, enables transcription of voice input. The transcription aligns with the input audio language, if configured.

  {% /summary %}

  **languageCodes**: `string array`

  Optional. BCP-47 language codes providing hints about the languages present in the audio. If omitted or empty, defaults to automatic language detection.

  **customVocabulary**: `string array`

  Optional. A list of custom vocabulary phrases to bias the speech recognition model toward recognizing specific terms (product names, proper nouns, jargon).

  **wordTimestamp**: `boolean`

  Optional. Configures word-level timestamp generation.

  **diarization**: `boolean`

  Optional. Configures speaker diarization.

  {% details %}
  {% summary %}
  **mode**: `string enum`

  Optional. Configures transcription mode. Supported values: `VERBATIM`, `SMART`. If unspecified, defaults to `VERBATIM` transcription. In `SMART` mode, the model performs disfluency removal (eliminating filler words, repetitions, and false starts), light grammatical cleanup, automatic formatting (paragraphs, bullet points, numbered lists), and minor user edits (inline self-corrections). Timestamps and diarization are incompatible with mode `SMART`.

  {% /summary %}

  Possible values:

  - `MODE_UNSPECIFIED`: Unspecified transcription mode.
  - `VERBATIM`: Verbatim transcription mode.
  - `SMART`: Smart transcription mode.

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **outputAudioTranscription**: `AudioTranscriptionConfig`

  Optional. If set, enables transcription of the model's audio output. The transcription aligns with the language code specified for the output audio, if configured.

  {% /summary %}

  **languageCodes**: `string array`

  Optional. BCP-47 language codes providing hints about the languages present in the audio. If omitted or empty, defaults to automatic language detection.

  **customVocabulary**: `string array`

  Optional. A list of custom vocabulary phrases to bias the speech recognition model toward recognizing specific terms (product names, proper nouns, jargon).

  **wordTimestamp**: `boolean`

  Optional. Configures word-level timestamp generation.

  **diarization**: `boolean`

  Optional. Configures speaker diarization.

  {% details %}
  {% summary %}
  **mode**: `string enum`

  Optional. Configures transcription mode. Supported values: `VERBATIM`, `SMART`. If unspecified, defaults to `VERBATIM` transcription. In `SMART` mode, the model performs disfluency removal (eliminating filler words, repetitions, and false starts), light grammatical cleanup, automatic formatting (paragraphs, bullet points, numbered lists), and minor user edits (inline self-corrections). Timestamps and diarization are incompatible with mode `SMART`.

  {% /summary %}

  Possible values:

  - `MODE_UNSPECIFIED`: Unspecified transcription mode.
  - `VERBATIM`: Verbatim transcription mode.
  - `SMART`: Smart transcription mode.

  {% /details %}

  {% /details %}

  {% details %}
  {% summary %}
  **proactivity**: `ProactivityConfig`

  Optional. Configures the proactivity of the model. This allows the model to respond proactively to the input and to ignore irrelevant input.

  {% /summary %}

  **proactiveAudio**: `boolean`

  Optional. If enabled, the model can reject responding to the last prompt. For example, this allows the model to ignore out of context speech or to stay silent if the user did not make a request, yet.

  {% /details %}

  {% details %}
  {% summary %}
  **historyConfig**: `HistoryConfig`

  Optional. Configures the exchange of history between the client and the server.

  {% /summary %}

  **initialHistoryInClientContent**: `boolean`

  Optional. If true, after sending `setup_complete`, the server will wait and at first process `client_content` messages until `turn_complete` is `true`. This initial history will not trigger a model call and may end with role `MODEL`. After `turn_complete` is `true`, the client can start the realtime conversation via `realtime_input`.

  {% /details %}

  **labels**: `object`

  Optional. Labels with user-defined metadata for the request. Optional. Labels must follow standard unified Cloud label requirements:

  - Label keys must start with a letter.
  - Label keys and values can be no longer than 63 characters (Unicode codepoints) and can only contain lowercase letters, numeric characters, underscores, and dashes.
  - International characters are allowed.

  Usage:

  - Safety identifiers from aggregators: Use the key `safety_identifier` (e.g. `{"safety_identifier": "user_session_123"}`)

  {% /details %}

  {% /details %}

  {% hr /%}

  **name**: `string`

  Output only. Identifier. The token itself.

  {% hr /%}

  **expireTime**: `string`

  Optional. Input only. Immutable. An optional time after which, when using the resulting token, messages in BidiGenerateContent sessions will be rejected. (Gemini may preemptively close the session after this time.) If not set then this defaults to 30 minutes in the future. If set, this value must be less than 20 hours in the future.

  {% hr /%}

  **newSessionExpireTime**: `string`

  Optional. Input only. Immutable. The time after which new Live API sessions using the token resulting from this request will be rejected. If not set this defaults to 60 seconds in the future. If set, this value must be less than 20 hours in the future.

  {% hr /%}

  **uses**: `integer`

  Optional. Input only. Immutable. The number of times the token can be used. If this value is zero then no limit is applied. Resuming a Live API session does not count as a use. If unspecified, the default is 1.

  {% hr /%}

  **fieldMask**: `string`

  Optional. Input only. Immutable. If field_mask is empty, and `bidi_generate_content_setup` is not present, then the effective `BidiGenerateContentSetup` message is taken from the Live API connection. If field_mask is empty, and `bidi_generate_content_setup` *is* present, then the effective `BidiGenerateContentSetup` message is taken entirely from `bidi_generate_content_setup` in this request. The setup message from the Live API connection is ignored. If field_mask is not empty, then the corresponding fields from `bidi_generate_content_setup` will overwrite the fields from the setup message in the Live API connection.

{% /section %}

