# Create a message

POST https://openrouter.ai/api/v1/messages
Content-Type: application/json

Creates a message using the Anthropic Messages API format. Supports text, images, PDFs, tools, and extended thinking.

Reference: https://openrouter.ai/docs/api/api-reference/anthropic-messages/create-messages

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /messages:
    post:
      operationId: create-messages
      summary: Create a message
      description: >-
        Creates a message using the Anthropic Messages API format. Supports
        text, images, PDFs, tools, and extended thinking.
      tags:
        - subpackage_anthropicMessages
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessagesResult'
        '400':
          description: Invalid request error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
        '401':
          description: Authentication error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
        '403':
          description: Permission denied error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
        '404':
          description: Not found error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
        '429':
          description: Rate limit error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
        '500':
          description: API error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
        '503':
          description: Overloaded error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MessagesRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    AnthropicTextBlockParamType:
      type: string
      enum:
        - text
      title: AnthropicTextBlockParamType
    AnthropicCitationCharLocationParamType:
      type: string
      enum:
        - char_location
      title: AnthropicCitationCharLocationParamType
    AnthropicCitationCharLocationParam:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCitationCharLocationParamType'
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          type:
            - string
            - 'null'
        start_char_index:
          type: integer
        end_char_index:
          type: integer
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_char_index
        - end_char_index
      title: AnthropicCitationCharLocationParam
    AnthropicCitationPageLocationParamType:
      type: string
      enum:
        - page_location
      title: AnthropicCitationPageLocationParamType
    AnthropicCitationPageLocationParam:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCitationPageLocationParamType'
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          type:
            - string
            - 'null'
        start_page_number:
          type: integer
        end_page_number:
          type: integer
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_page_number
        - end_page_number
      title: AnthropicCitationPageLocationParam
    AnthropicCitationContentBlockLocationParamType:
      type: string
      enum:
        - content_block_location
      title: AnthropicCitationContentBlockLocationParamType
    AnthropicCitationContentBlockLocationParam:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCitationContentBlockLocationParamType'
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          type:
            - string
            - 'null'
        start_block_index:
          type: integer
        end_block_index:
          type: integer
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_block_index
        - end_block_index
      title: AnthropicCitationContentBlockLocationParam
    AnthropicCitationWebSearchResultLocationType:
      type: string
      enum:
        - web_search_result_location
      title: AnthropicCitationWebSearchResultLocationType
    AnthropicCitationWebSearchResultLocation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCitationWebSearchResultLocationType'
        cited_text:
          type: string
        encrypted_index:
          type: string
        title:
          type:
            - string
            - 'null'
        url:
          type: string
      required:
        - type
        - cited_text
        - encrypted_index
        - title
        - url
      title: AnthropicCitationWebSearchResultLocation
    AnthropicCitationSearchResultLocationType:
      type: string
      enum:
        - search_result_location
      title: AnthropicCitationSearchResultLocationType
    AnthropicCitationSearchResultLocation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCitationSearchResultLocationType'
        cited_text:
          type: string
        search_result_index:
          type: integer
        source:
          type: string
        title:
          type:
            - string
            - 'null'
        start_block_index:
          type: integer
        end_block_index:
          type: integer
      required:
        - type
        - cited_text
        - search_result_index
        - source
        - title
        - start_block_index
        - end_block_index
      title: AnthropicCitationSearchResultLocation
    AnthropicTextBlockParamCitationsItems:
      oneOf:
        - $ref: '#/components/schemas/AnthropicCitationCharLocationParam'
        - $ref: '#/components/schemas/AnthropicCitationPageLocationParam'
        - $ref: '#/components/schemas/AnthropicCitationContentBlockLocationParam'
        - $ref: '#/components/schemas/AnthropicCitationWebSearchResultLocation'
        - $ref: '#/components/schemas/AnthropicCitationSearchResultLocation'
      title: AnthropicTextBlockParamCitationsItems
    AnthropicCacheControlDirectiveType:
      type: string
      enum:
        - ephemeral
      title: AnthropicCacheControlDirectiveType
    AnthropicCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: AnthropicCacheControlTtl
    AnthropicCacheControlDirective:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCacheControlDirectiveType'
        ttl:
          $ref: '#/components/schemas/AnthropicCacheControlTtl'
      required:
        - type
      title: AnthropicCacheControlDirective
    AnthropicTextBlockParam:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicTextBlockParamType'
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/AnthropicTextBlockParamCitationsItems'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - text
      title: AnthropicTextBlockParam
    MessagesRequestSystem1:
      type: array
      items:
        $ref: '#/components/schemas/AnthropicTextBlockParam'
      title: MessagesRequestSystem1
    MessagesRequestSystem:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/MessagesRequestSystem1'
      title: MessagesRequestSystem
    MessagesRequestMetadata:
      type: object
      properties:
        user_id:
          type:
            - string
            - 'null'
      title: MessagesRequestMetadata
    MessagesRequestToolsItemsOneOf0InputSchema:
      type: object
      properties:
        type:
          type: string
          default: object
        properties:
          oneOf:
            - description: Any type
            - type: 'null'
        required:
          type:
            - array
            - 'null'
          items:
            type: string
      title: MessagesRequestToolsItemsOneOf0InputSchema
    MessagesRequestToolsItemsOneOf0Type:
      type: string
      enum:
        - custom
      title: MessagesRequestToolsItemsOneOf0Type
    MessagesRequestToolsItems0:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        input_schema:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf0InputSchema'
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf0Type'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - name
        - input_schema
      title: MessagesRequestToolsItems0
    MessagesRequestToolsItemsOneOf1Type:
      type: string
      enum:
        - bash_20250124
      title: MessagesRequestToolsItemsOneOf1Type
    MessagesRequestToolsItemsOneOf1Name:
      type: string
      enum:
        - bash
      title: MessagesRequestToolsItemsOneOf1Name
    MessagesRequestToolsItems1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf1Type'
        name:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf1Name'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - name
      title: MessagesRequestToolsItems1
    MessagesRequestToolsItemsOneOf2Type:
      type: string
      enum:
        - text_editor_20250124
      title: MessagesRequestToolsItemsOneOf2Type
    MessagesRequestToolsItemsOneOf2Name:
      type: string
      enum:
        - str_replace_editor
      title: MessagesRequestToolsItemsOneOf2Name
    MessagesRequestToolsItems2:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf2Type'
        name:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf2Name'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - name
      title: MessagesRequestToolsItems2
    MessagesRequestToolsItemsOneOf3Type:
      type: string
      enum:
        - web_search_20250305
      title: MessagesRequestToolsItemsOneOf3Type
    MessagesRequestToolsItemsOneOf3Name:
      type: string
      enum:
        - web_search
      title: MessagesRequestToolsItemsOneOf3Name
    AnthropicWebSearchToolUserLocationType:
      type: string
      enum:
        - approximate
      title: AnthropicWebSearchToolUserLocationType
    AnthropicWebSearchToolUserLocation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicWebSearchToolUserLocationType'
        city:
          type:
            - string
            - 'null'
        country:
          type:
            - string
            - 'null'
        region:
          type:
            - string
            - 'null'
        timezone:
          type:
            - string
            - 'null'
      required:
        - type
      title: AnthropicWebSearchToolUserLocation
    MessagesRequestToolsItems3:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf3Type'
        name:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf3Name'
        allowed_domains:
          type:
            - array
            - 'null'
          items:
            type: string
        blocked_domains:
          type:
            - array
            - 'null'
          items:
            type: string
        max_uses:
          type: integer
        user_location:
          $ref: '#/components/schemas/AnthropicWebSearchToolUserLocation'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - name
      title: MessagesRequestToolsItems3
    MessagesRequestToolsItemsOneOf4Type:
      type: string
      enum:
        - web_search_20260209
      title: MessagesRequestToolsItemsOneOf4Type
    MessagesRequestToolsItemsOneOf4Name:
      type: string
      enum:
        - web_search
      title: MessagesRequestToolsItemsOneOf4Name
    MessagesRequestToolsItemsOneOf4AllowedCallersItems:
      type: string
      enum:
        - direct
        - code_execution_20250825
        - code_execution_20260120
      title: MessagesRequestToolsItemsOneOf4AllowedCallersItems
    MessagesRequestToolsItems4:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf4Type'
        name:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf4Name'
        allowed_callers:
          type: array
          items:
            $ref: >-
              #/components/schemas/MessagesRequestToolsItemsOneOf4AllowedCallersItems
        allowed_domains:
          type:
            - array
            - 'null'
          items:
            type: string
        blocked_domains:
          type:
            - array
            - 'null'
          items:
            type: string
        max_uses:
          type: integer
        user_location:
          $ref: '#/components/schemas/AnthropicWebSearchToolUserLocation'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - name
      title: MessagesRequestToolsItems4
    DatetimeServerToolType:
      type: string
      enum:
        - openrouter:datetime
      title: DatetimeServerToolType
    DatetimeServerToolParameters:
      type: object
      properties:
        timezone:
          type: string
          description: IANA timezone name (e.g. "America/New_York"). Defaults to UTC.
      title: DatetimeServerToolParameters
    DatetimeServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/DatetimeServerToolType'
        parameters:
          $ref: '#/components/schemas/DatetimeServerToolParameters'
      required:
        - type
      description: 'OpenRouter built-in server tool: returns the current date and time'
      title: DatetimeServerTool
    MessagesWebSearchServerToolType:
      type: string
      enum:
        - openrouter:web_search
      title: MessagesWebSearchServerToolType
    WebSearchEngineEnum:
      type: string
      enum:
        - auto
        - native
        - exa
        - firecrawl
        - parallel
      description: >-
        Which search engine to use. "auto" (default) uses native if the provider
        supports it, otherwise Exa. "native" forces the provider's built-in
        search. "exa" forces the Exa search API. "firecrawl" uses Firecrawl
        (requires BYOK). "parallel" uses the Parallel search API.
      title: WebSearchEngineEnum
    SearchQualityLevel:
      type: string
      enum:
        - low
        - medium
        - high
      description: >-
        How much context to retrieve per result. Defaults to medium (15000
        chars). Only applies when using the Exa engine; ignored with native
        provider search.
      title: SearchQualityLevel
    WebSearchUserLocationServerToolType:
      type: string
      enum:
        - approximate
      title: WebSearchUserLocationServerToolType
    WebSearchUserLocationServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/WebSearchUserLocationServerToolType'
        city:
          type: string
        region:
          type: string
        country:
          type: string
        timezone:
          type: string
      description: Approximate user location for location-biased results.
      title: WebSearchUserLocationServerTool
    WebSearchConfig:
      type: object
      properties:
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        max_total_results:
          type: integer
          description: >-
            Maximum total number of search results across all search calls in a
            single request. Once this limit is reached, the tool will stop
            returning new results. Useful for controlling cost and context size
            in agentic loops.
        search_context_size:
          $ref: '#/components/schemas/SearchQualityLevel'
        user_location:
          $ref: '#/components/schemas/WebSearchUserLocationServerTool'
        allowed_domains:
          type: array
          items:
            type: string
          description: >-
            Limit search results to these domains. Supported by Exa, Parallel,
            and most native providers (Anthropic, OpenAI, xAI). Not supported
            with Firecrawl or Perplexity.
        excluded_domains:
          type: array
          items:
            type: string
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Parallel, Anthropic, and xAI. Not supported with Firecrawl, OpenAI
            (silently ignored), or Perplexity.
      title: WebSearchConfig
    MessagesWebSearchServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesWebSearchServerToolType'
        parameters:
          $ref: '#/components/schemas/WebSearchConfig'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: searches the web for current
        information
      title: MessagesWebSearchServerTool
    MessagesRequestToolsItems:
      oneOf:
        - $ref: '#/components/schemas/MessagesRequestToolsItems0'
        - $ref: '#/components/schemas/MessagesRequestToolsItems1'
        - $ref: '#/components/schemas/MessagesRequestToolsItems2'
        - $ref: '#/components/schemas/MessagesRequestToolsItems3'
        - $ref: '#/components/schemas/MessagesRequestToolsItems4'
        - $ref: '#/components/schemas/DatetimeServerTool'
        - $ref: '#/components/schemas/MessagesWebSearchServerTool'
      title: MessagesRequestToolsItems
    MessagesRequestToolChoiceOneOf0Type:
      type: string
      enum:
        - auto
      title: MessagesRequestToolChoiceOneOf0Type
    MessagesRequestToolChoice0:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolChoiceOneOf0Type'
        disable_parallel_tool_use:
          type: boolean
      required:
        - type
      title: MessagesRequestToolChoice0
    MessagesRequestToolChoiceOneOf1Type:
      type: string
      enum:
        - any
      title: MessagesRequestToolChoiceOneOf1Type
    MessagesRequestToolChoice1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolChoiceOneOf1Type'
        disable_parallel_tool_use:
          type: boolean
      required:
        - type
      title: MessagesRequestToolChoice1
    MessagesRequestToolChoiceOneOf2Type:
      type: string
      enum:
        - none
      title: MessagesRequestToolChoiceOneOf2Type
    MessagesRequestToolChoice2:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolChoiceOneOf2Type'
      required:
        - type
      title: MessagesRequestToolChoice2
    MessagesRequestToolChoiceOneOf3Type:
      type: string
      enum:
        - tool
      title: MessagesRequestToolChoiceOneOf3Type
    MessagesRequestToolChoice3:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolChoiceOneOf3Type'
        name:
          type: string
        disable_parallel_tool_use:
          type: boolean
      required:
        - type
        - name
      title: MessagesRequestToolChoice3
    MessagesRequestToolChoice:
      oneOf:
        - $ref: '#/components/schemas/MessagesRequestToolChoice0'
        - $ref: '#/components/schemas/MessagesRequestToolChoice1'
        - $ref: '#/components/schemas/MessagesRequestToolChoice2'
        - $ref: '#/components/schemas/MessagesRequestToolChoice3'
      title: MessagesRequestToolChoice
    MessagesRequestThinkingOneOf0Type:
      type: string
      enum:
        - enabled
      title: MessagesRequestThinkingOneOf0Type
    MessagesRequestThinking0:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestThinkingOneOf0Type'
        budget_tokens:
          type: integer
      required:
        - type
        - budget_tokens
      title: MessagesRequestThinking0
    MessagesRequestThinkingOneOf1Type:
      type: string
      enum:
        - disabled
      title: MessagesRequestThinkingOneOf1Type
    MessagesRequestThinking1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestThinkingOneOf1Type'
      required:
        - type
      title: MessagesRequestThinking1
    MessagesRequestThinkingOneOf2Type:
      type: string
      enum:
        - adaptive
      title: MessagesRequestThinkingOneOf2Type
    MessagesRequestThinking2:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestThinkingOneOf2Type'
      required:
        - type
      title: MessagesRequestThinking2
    MessagesRequestThinking:
      oneOf:
        - $ref: '#/components/schemas/MessagesRequestThinking0'
        - $ref: '#/components/schemas/MessagesRequestThinking1'
        - $ref: '#/components/schemas/MessagesRequestThinking2'
      title: MessagesRequestThinking
    MessagesRequestServiceTier:
      type: string
      enum:
        - auto
        - standard_only
      title: MessagesRequestServiceTier
    MessagesOutputConfigEffort:
      type: string
      enum:
        - low
        - medium
        - high
        - max
      description: >-
        How much effort the model should put into its response. Higher effort
        levels may result in more thorough analysis but take longer. Valid
        values are `low`, `medium`, `high`, or `max`.
      title: MessagesOutputConfigEffort
    MessagesOutputConfigFormatType:
      type: string
      enum:
        - json_schema
      title: MessagesOutputConfigFormatType
    MessagesOutputConfigFormat:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesOutputConfigFormatType'
        schema:
          type: object
          additionalProperties:
            description: Any type
      required:
        - type
        - schema
      description: >-
        A schema to specify Claude's output format in responses. See [structured
        outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).
      title: MessagesOutputConfigFormat
    MessagesOutputConfig:
      type: object
      properties:
        effort:
          oneOf:
            - $ref: '#/components/schemas/MessagesOutputConfigEffort'
            - type: 'null'
          description: >-
            How much effort the model should put into its response. Higher
            effort levels may result in more thorough analysis but take longer.
            Valid values are `low`, `medium`, `high`, or `max`.
        format:
          oneOf:
            - $ref: '#/components/schemas/MessagesOutputConfigFormat'
            - type: 'null'
          description: >-
            A schema to specify Claude's output format in responses. See
            [structured
            outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).
      description: >-
        Configuration for controlling output behavior. Supports the effort
        parameter and structured output format.
      title: MessagesOutputConfig
    MessagesMessageParamRole:
      type: string
      enum:
        - user
        - assistant
      title: MessagesMessageParamRole
    AnthropicImageBlockParamType:
      type: string
      enum:
        - image
      title: AnthropicImageBlockParamType
    AnthropicBase64ImageSourceType:
      type: string
      enum:
        - base64
      title: AnthropicBase64ImageSourceType
    AnthropicImageMimeType:
      type: string
      enum:
        - image/jpeg
        - image/png
        - image/gif
        - image/webp
      title: AnthropicImageMimeType
    AnthropicBase64ImageSource:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicBase64ImageSourceType'
        media_type:
          $ref: '#/components/schemas/AnthropicImageMimeType'
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: AnthropicBase64ImageSource
    AnthropicUrlImageSourceType:
      type: string
      enum:
        - url
      title: AnthropicUrlImageSourceType
    AnthropicUrlImageSource:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicUrlImageSourceType'
        url:
          type: string
      required:
        - type
        - url
      title: AnthropicUrlImageSource
    AnthropicImageBlockParamSource:
      oneOf:
        - $ref: '#/components/schemas/AnthropicBase64ImageSource'
        - $ref: '#/components/schemas/AnthropicUrlImageSource'
      title: AnthropicImageBlockParamSource
    AnthropicImageBlockParam:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicImageBlockParamType'
        source:
          $ref: '#/components/schemas/AnthropicImageBlockParamSource'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - source
      title: AnthropicImageBlockParam
    AnthropicDocumentBlockParamType:
      type: string
      enum:
        - document
      title: AnthropicDocumentBlockParamType
    AnthropicBase64PdfSourceType:
      type: string
      enum:
        - base64
      title: AnthropicBase64PdfSourceType
    AnthropicBase64PdfSourceMediaType:
      type: string
      enum:
        - application/pdf
      title: AnthropicBase64PdfSourceMediaType
    AnthropicBase64PdfSource:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicBase64PdfSourceType'
        media_type:
          $ref: '#/components/schemas/AnthropicBase64PdfSourceMediaType'
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: AnthropicBase64PdfSource
    AnthropicPlainTextSourceType:
      type: string
      enum:
        - text
      title: AnthropicPlainTextSourceType
    AnthropicPlainTextSourceMediaType:
      type: string
      enum:
        - text/plain
      title: AnthropicPlainTextSourceMediaType
    AnthropicPlainTextSource:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicPlainTextSourceType'
        media_type:
          $ref: '#/components/schemas/AnthropicPlainTextSourceMediaType'
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: AnthropicPlainTextSource
    AnthropicDocumentBlockParamSourceOneOf2Type:
      type: string
      enum:
        - content
      title: AnthropicDocumentBlockParamSourceOneOf2Type
    AnthropicDocumentBlockParamSourceOneOf2ContentOneOf1Items:
      oneOf:
        - $ref: '#/components/schemas/AnthropicTextBlockParam'
        - $ref: '#/components/schemas/AnthropicImageBlockParam'
      title: AnthropicDocumentBlockParamSourceOneOf2ContentOneOf1Items
    AnthropicDocumentBlockParamSourceOneOf2Content1:
      type: array
      items:
        $ref: >-
          #/components/schemas/AnthropicDocumentBlockParamSourceOneOf2ContentOneOf1Items
      title: AnthropicDocumentBlockParamSourceOneOf2Content1
    AnthropicDocumentBlockParamSourceOneOf2Content:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/AnthropicDocumentBlockParamSourceOneOf2Content1'
      title: AnthropicDocumentBlockParamSourceOneOf2Content
    AnthropicDocumentBlockParamSource2:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicDocumentBlockParamSourceOneOf2Type'
        content:
          $ref: '#/components/schemas/AnthropicDocumentBlockParamSourceOneOf2Content'
      required:
        - type
        - content
      title: AnthropicDocumentBlockParamSource2
    AnthropicUrlPdfSourceType:
      type: string
      enum:
        - url
      title: AnthropicUrlPdfSourceType
    AnthropicUrlPdfSource:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicUrlPdfSourceType'
        url:
          type: string
      required:
        - type
        - url
      title: AnthropicUrlPdfSource
    AnthropicDocumentBlockParamSource:
      oneOf:
        - $ref: '#/components/schemas/AnthropicBase64PdfSource'
        - $ref: '#/components/schemas/AnthropicPlainTextSource'
        - $ref: '#/components/schemas/AnthropicDocumentBlockParamSource2'
        - $ref: '#/components/schemas/AnthropicUrlPdfSource'
      title: AnthropicDocumentBlockParamSource
    AnthropicDocumentBlockParamCitations:
      type: object
      properties:
        enabled:
          type: boolean
      title: AnthropicDocumentBlockParamCitations
    AnthropicDocumentBlockParam:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicDocumentBlockParamType'
        source:
          $ref: '#/components/schemas/AnthropicDocumentBlockParamSource'
        citations:
          oneOf:
            - $ref: '#/components/schemas/AnthropicDocumentBlockParamCitations'
            - type: 'null'
        context:
          type:
            - string
            - 'null'
        title:
          type:
            - string
            - 'null'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - source
      title: AnthropicDocumentBlockParam
    MessagesMessageParamContentOneOf1ItemsOneOf3Type:
      type: string
      enum:
        - tool_use
      title: MessagesMessageParamContentOneOf1ItemsOneOf3Type
    MessagesMessageParamContentOneOf1Items3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf3Type
        id:
          type: string
        name:
          type: string
        input:
          oneOf:
            - description: Any type
            - type: 'null'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - id
        - name
      title: MessagesMessageParamContentOneOf1Items3
    MessagesMessageParamContentOneOf1ItemsOneOf4Type:
      type: string
      enum:
        - tool_result
      title: MessagesMessageParamContentOneOf1ItemsOneOf4Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf2Type:
      type: string
      enum:
        - tool_reference
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf2Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf2Type
        tool_name:
          type: string
      required:
        - type
        - tool_name
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items2
    AnthropicSearchResultBlockParamType:
      type: string
      enum:
        - search_result
      title: AnthropicSearchResultBlockParamType
    AnthropicSearchResultBlockParamCitations:
      type: object
      properties:
        enabled:
          type: boolean
      title: AnthropicSearchResultBlockParamCitations
    AnthropicSearchResultBlockParam:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicSearchResultBlockParamType'
        source:
          type: string
        title:
          type: string
        content:
          type: array
          items:
            $ref: '#/components/schemas/AnthropicTextBlockParam'
        citations:
          $ref: '#/components/schemas/AnthropicSearchResultBlockParamCitations'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - source
        - title
        - content
      title: AnthropicSearchResultBlockParam
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items:
      oneOf:
        - $ref: '#/components/schemas/AnthropicTextBlockParam'
        - $ref: '#/components/schemas/AnthropicImageBlockParam'
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items2
        - $ref: '#/components/schemas/AnthropicSearchResultBlockParam'
        - $ref: '#/components/schemas/AnthropicDocumentBlockParam'
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items
    MessagesMessageParamContentOneOf1ItemsOneOf4Content1:
      type: array
      items:
        $ref: >-
          #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items
      title: MessagesMessageParamContentOneOf1ItemsOneOf4Content1
    MessagesMessageParamContentOneOf1ItemsOneOf4Content:
      oneOf:
        - type: string
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4Content1
      title: MessagesMessageParamContentOneOf1ItemsOneOf4Content
    MessagesMessageParamContentOneOf1Items4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4Type
        tool_use_id:
          type: string
        content:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4Content
        is_error:
          type: boolean
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - tool_use_id
      title: MessagesMessageParamContentOneOf1Items4
    MessagesMessageParamContentOneOf1ItemsOneOf5Type:
      type: string
      enum:
        - thinking
      title: MessagesMessageParamContentOneOf1ItemsOneOf5Type
    MessagesMessageParamContentOneOf1Items5:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf5Type
        thinking:
          type: string
        signature:
          type: string
      required:
        - type
        - thinking
        - signature
      title: MessagesMessageParamContentOneOf1Items5
    MessagesMessageParamContentOneOf1ItemsOneOf6Type:
      type: string
      enum:
        - redacted_thinking
      title: MessagesMessageParamContentOneOf1ItemsOneOf6Type
    MessagesMessageParamContentOneOf1Items6:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf6Type
        data:
          type: string
      required:
        - type
        - data
      title: MessagesMessageParamContentOneOf1Items6
    MessagesMessageParamContentOneOf1ItemsOneOf7Type:
      type: string
      enum:
        - server_tool_use
      title: MessagesMessageParamContentOneOf1ItemsOneOf7Type
    AnthropicServerToolName:
      type: string
      enum:
        - web_search
        - web_fetch
        - code_execution
        - bash_code_execution
        - text_editor_code_execution
        - tool_search_tool_regex
        - tool_search_tool_bm25
      title: AnthropicServerToolName
    MessagesMessageParamContentOneOf1Items7:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf7Type
        id:
          type: string
        name:
          $ref: '#/components/schemas/AnthropicServerToolName'
        input:
          oneOf:
            - description: Any type
            - type: 'null'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - id
        - name
      title: MessagesMessageParamContentOneOf1Items7
    MessagesMessageParamContentOneOf1ItemsOneOf8Type:
      type: string
      enum:
        - web_search_tool_result
      title: MessagesMessageParamContentOneOf1ItemsOneOf8Type
    AnthropicWebSearchResultBlockParamType:
      type: string
      enum:
        - web_search_result
      title: AnthropicWebSearchResultBlockParamType
    AnthropicWebSearchResultBlockParam:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicWebSearchResultBlockParamType'
        encrypted_content:
          type: string
        title:
          type: string
        url:
          type: string
        page_age:
          type:
            - string
            - 'null'
      required:
        - type
        - encrypted_content
        - title
        - url
      title: AnthropicWebSearchResultBlockParam
    MessagesMessageParamContentOneOf1ItemsOneOf8Content0:
      type: array
      items:
        $ref: '#/components/schemas/AnthropicWebSearchResultBlockParam'
      title: MessagesMessageParamContentOneOf1ItemsOneOf8Content0
    MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1Type:
      type: string
      enum:
        - web_search_tool_result_error
      title: MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1ErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - max_uses_exceeded
        - too_many_requests
        - query_too_long
      title: MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1ErrorCode
    MessagesMessageParamContentOneOf1ItemsOneOf8Content1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1Type
        error_code:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1ErrorCode
      required:
        - type
        - error_code
      title: MessagesMessageParamContentOneOf1ItemsOneOf8Content1
    MessagesMessageParamContentOneOf1ItemsOneOf8Content:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8Content0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8Content1
      title: MessagesMessageParamContentOneOf1ItemsOneOf8Content
    MessagesMessageParamContentOneOf1Items8:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8Type
        tool_use_id:
          type: string
        content:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8Content
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - tool_use_id
        - content
      title: MessagesMessageParamContentOneOf1Items8
    MessagesMessageParamContentOneOf1ItemsOneOf10Type:
      type: string
      enum:
        - compaction
      title: MessagesMessageParamContentOneOf1ItemsOneOf10Type
    MessagesMessageParamContentOneOf1Items10:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf10Type
        content:
          type:
            - string
            - 'null'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
      required:
        - type
        - content
      title: MessagesMessageParamContentOneOf1Items10
    MessagesMessageParamContentOneOf1Items:
      oneOf:
        - $ref: '#/components/schemas/AnthropicTextBlockParam'
        - $ref: '#/components/schemas/AnthropicImageBlockParam'
        - $ref: '#/components/schemas/AnthropicDocumentBlockParam'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items3'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items4'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items5'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items6'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items7'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items8'
        - $ref: '#/components/schemas/AnthropicSearchResultBlockParam'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items10'
      title: MessagesMessageParamContentOneOf1Items
    MessagesMessageParamContent1:
      type: array
      items:
        $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items'
      title: MessagesMessageParamContent1
    MessagesMessageParamContent:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/MessagesMessageParamContent1'
      title: MessagesMessageParamContent
    MessagesMessageParam:
      type: object
      properties:
        role:
          $ref: '#/components/schemas/MessagesMessageParamRole'
        content:
          $ref: '#/components/schemas/MessagesMessageParamContent'
      required:
        - role
        - content
      description: Anthropic message with OpenRouter extensions
      title: MessagesMessageParam
    MessagesRequestContextManagementEditsItemsOneOf0Type:
      type: string
      enum:
        - clear_tool_uses_20250919
      title: MessagesRequestContextManagementEditsItemsOneOf0Type
    AnthropicInputTokensClearAtLeastType:
      type: string
      enum:
        - input_tokens
      title: AnthropicInputTokensClearAtLeastType
    AnthropicInputTokensClearAtLeast:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicInputTokensClearAtLeastType'
        value:
          type: integer
      required:
        - type
        - value
      title: AnthropicInputTokensClearAtLeast
    MessagesRequestContextManagementEditsItemsOneOf0ClearToolInputs:
      oneOf:
        - type: boolean
        - type: array
          items:
            type: string
        - description: Any type
      title: MessagesRequestContextManagementEditsItemsOneOf0ClearToolInputs
    AnthropicToolUsesKeepType:
      type: string
      enum:
        - tool_uses
      title: AnthropicToolUsesKeepType
    AnthropicToolUsesKeep:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicToolUsesKeepType'
        value:
          type: integer
      required:
        - type
        - value
      title: AnthropicToolUsesKeep
    AnthropicInputTokensTriggerType:
      type: string
      enum:
        - input_tokens
      title: AnthropicInputTokensTriggerType
    AnthropicInputTokensTrigger:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicInputTokensTriggerType'
        value:
          type: integer
      required:
        - type
        - value
      title: AnthropicInputTokensTrigger
    AnthropicToolUsesTriggerType:
      type: string
      enum:
        - tool_uses
      title: AnthropicToolUsesTriggerType
    AnthropicToolUsesTrigger:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicToolUsesTriggerType'
        value:
          type: integer
      required:
        - type
        - value
      title: AnthropicToolUsesTrigger
    MessagesRequestContextManagementEditsItemsOneOf0Trigger:
      oneOf:
        - $ref: '#/components/schemas/AnthropicInputTokensTrigger'
        - $ref: '#/components/schemas/AnthropicToolUsesTrigger'
      title: MessagesRequestContextManagementEditsItemsOneOf0Trigger
    MessagesRequestContextManagementEditsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0Type
        clear_at_least:
          $ref: '#/components/schemas/AnthropicInputTokensClearAtLeast'
        clear_tool_inputs:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0ClearToolInputs
        exclude_tools:
          type:
            - array
            - 'null'
          items:
            type: string
        keep:
          $ref: '#/components/schemas/AnthropicToolUsesKeep'
        trigger:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0Trigger
      required:
        - type
      title: MessagesRequestContextManagementEditsItems0
    MessagesRequestContextManagementEditsItemsOneOf1Type:
      type: string
      enum:
        - clear_thinking_20251015
      title: MessagesRequestContextManagementEditsItemsOneOf1Type
    AnthropicThinkingTurnsType:
      type: string
      enum:
        - thinking_turns
      title: AnthropicThinkingTurnsType
    AnthropicThinkingTurns:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicThinkingTurnsType'
        value:
          type: integer
      required:
        - type
        - value
      title: AnthropicThinkingTurns
    MessagesRequestContextManagementEditsItemsOneOf1KeepOneOf1Type:
      type: string
      enum:
        - all
      title: MessagesRequestContextManagementEditsItemsOneOf1KeepOneOf1Type
    MessagesRequestContextManagementEditsItemsOneOf1Keep1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf1KeepOneOf1Type
      required:
        - type
      title: MessagesRequestContextManagementEditsItemsOneOf1Keep1
    MessagesRequestContextManagementEditsItemsOneOf1Keep2:
      type: string
      enum:
        - all
      title: MessagesRequestContextManagementEditsItemsOneOf1Keep2
    MessagesRequestContextManagementEditsItemsOneOf1Keep:
      oneOf:
        - $ref: '#/components/schemas/AnthropicThinkingTurns'
        - $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf1Keep1
        - $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf1Keep2
      title: MessagesRequestContextManagementEditsItemsOneOf1Keep
    MessagesRequestContextManagementEditsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf1Type
        keep:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf1Keep
      required:
        - type
      title: MessagesRequestContextManagementEditsItems1
    MessagesRequestContextManagementEditsItemsOneOf2Type:
      type: string
      enum:
        - compact_20260112
      title: MessagesRequestContextManagementEditsItemsOneOf2Type
    MessagesRequestContextManagementEditsItemsOneOf2Trigger:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicInputTokensTriggerType'
        value:
          type: integer
      required:
        - type
        - value
      title: MessagesRequestContextManagementEditsItemsOneOf2Trigger
    MessagesRequestContextManagementEditsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf2Type
        instructions:
          type:
            - string
            - 'null'
        pause_after_compaction:
          type: boolean
        trigger:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf2Trigger
      required:
        - type
      title: MessagesRequestContextManagementEditsItems2
    MessagesRequestContextManagementEditsItems:
      oneOf:
        - $ref: '#/components/schemas/MessagesRequestContextManagementEditsItems0'
        - $ref: '#/components/schemas/MessagesRequestContextManagementEditsItems1'
        - $ref: '#/components/schemas/MessagesRequestContextManagementEditsItems2'
      title: MessagesRequestContextManagementEditsItems
    MessagesRequestContextManagement:
      type: object
      properties:
        edits:
          type: array
          items:
            $ref: '#/components/schemas/MessagesRequestContextManagementEditsItems'
      title: MessagesRequestContextManagement
    ProviderPreferencesDataCollection:
      type: string
      enum:
        - deny
        - allow
      description: >-
        Data collection setting. If no available model provider meets the
        requirement, your request will return an error.

        - allow: (default) allow providers which store user data non-transiently
        and may train on it


        - deny: use only providers which do not collect user data.
      title: ProviderPreferencesDataCollection
    ProviderName:
      type: string
      enum:
        - AkashML
        - AI21
        - AionLabs
        - Alibaba
        - Ambient
        - Amazon Bedrock
        - Amazon Nova
        - Anthropic
        - Arcee AI
        - AtlasCloud
        - Avian
        - Azure
        - BaseTen
        - BytePlus
        - Black Forest Labs
        - Cerebras
        - Chutes
        - Cirrascale
        - Clarifai
        - Cloudflare
        - Cohere
        - Crusoe
        - DeepInfra
        - DeepSeek
        - Featherless
        - Fireworks
        - Friendli
        - GMICloud
        - Google
        - Google AI Studio
        - Groq
        - Hyperbolic
        - Inception
        - Inceptron
        - InferenceNet
        - Ionstream
        - Infermatic
        - Io Net
        - Inflection
        - Liquid
        - Mara
        - Mancer 2
        - Minimax
        - ModelRun
        - Mistral
        - Modular
        - Moonshot AI
        - Morph
        - NCompass
        - Nebius
        - NextBit
        - Novita
        - Nvidia
        - OpenAI
        - OpenInference
        - Parasail
        - Perplexity
        - Phala
        - Reka
        - Relace
        - SambaNova
        - Seed
        - SiliconFlow
        - Sourceful
        - StepFun
        - Stealth
        - StreamLake
        - Switchpoint
        - Together
        - Upstage
        - Venice
        - WandB
        - Xiaomi
        - xAI
        - Z.AI
        - FakeProvider
      title: ProviderName
    ProviderPreferencesOrderItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ProviderPreferencesOrderItems
    ProviderPreferencesOnlyItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ProviderPreferencesOnlyItems
    ProviderPreferencesIgnoreItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ProviderPreferencesIgnoreItems
    Quantization:
      type: string
      enum:
        - int4
        - int8
        - fp4
        - fp6
        - fp8
        - fp16
        - bf16
        - fp32
        - unknown
      title: Quantization
    ProviderSort:
      type: string
      enum:
        - price
        - throughput
        - latency
        - exacto
      description: The provider sorting strategy (price, throughput, latency)
      title: ProviderSort
    ProviderSortConfigBy:
      type: string
      enum:
        - price
        - throughput
        - latency
        - exacto
      description: The provider sorting strategy (price, throughput, latency)
      title: ProviderSortConfigBy
    ProviderSortConfigPartition:
      type: string
      enum:
        - model
        - none
      description: >-
        Partitioning strategy for sorting: "model" (default) groups endpoints by
        model before sorting (fallback models remain fallbacks), "none" sorts
        all endpoints together regardless of model.
      title: ProviderSortConfigPartition
    ProviderSortConfig:
      type: object
      properties:
        by:
          oneOf:
            - $ref: '#/components/schemas/ProviderSortConfigBy'
            - type: 'null'
          description: The provider sorting strategy (price, throughput, latency)
        partition:
          oneOf:
            - $ref: '#/components/schemas/ProviderSortConfigPartition'
            - type: 'null'
          description: >-
            Partitioning strategy for sorting: "model" (default) groups
            endpoints by model before sorting (fallback models remain
            fallbacks), "none" sorts all endpoints together regardless of model.
      description: The provider sorting strategy (price, throughput, latency)
      title: ProviderSortConfig
    ProviderPreferencesSort:
      oneOf:
        - $ref: '#/components/schemas/ProviderSort'
        - $ref: '#/components/schemas/ProviderSortConfig'
        - description: Any type
      description: >-
        The sorting strategy to use for this request, if "order" is not
        specified. When set, no load balancing is performed.
      title: ProviderPreferencesSort
    BigNumberUnion:
      type: string
      description: Price per million prompt tokens
      title: BigNumberUnion
    ProviderPreferencesMaxPriceCompletion:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceCompletion
    ProviderPreferencesMaxPriceImage:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceImage
    ProviderPreferencesMaxPriceAudio:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceAudio
    ProviderPreferencesMaxPriceRequest:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceRequest
    ProviderPreferencesMaxPrice:
      type: object
      properties:
        prompt:
          $ref: '#/components/schemas/BigNumberUnion'
        completion:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceCompletion'
        image:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceImage'
        audio:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceAudio'
        request:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceRequest'
      description: >-
        The object specifying the maximum price you want to pay for this
        request. USD price per million tokens, for prompt and completion.
      title: ProviderPreferencesMaxPrice
    PercentileThroughputCutoffs:
      type: object
      properties:
        p50:
          type: number
          format: double
          description: Minimum p50 throughput (tokens/sec)
        p75:
          type: number
          format: double
          description: Minimum p75 throughput (tokens/sec)
        p90:
          type: number
          format: double
          description: Minimum p90 throughput (tokens/sec)
        p99:
          type: number
          format: double
          description: Minimum p99 throughput (tokens/sec)
      description: >-
        Percentile-based throughput cutoffs. All specified cutoffs must be met
        for an endpoint to be preferred.
      title: PercentileThroughputCutoffs
    PreferredMinThroughput:
      oneOf:
        - type: number
          format: double
        - $ref: '#/components/schemas/PercentileThroughputCutoffs'
        - description: Any type
      description: >-
        Preferred minimum throughput (in tokens per second). Can be a number
        (applies to p50) or an object with percentile-specific cutoffs.
        Endpoints below the threshold(s) may still be used, but are
        deprioritized in routing. When using fallback models, this may cause a
        fallback model to be used instead of the primary model if it meets the
        threshold.
      title: PreferredMinThroughput
    PercentileLatencyCutoffs:
      type: object
      properties:
        p50:
          type: number
          format: double
          description: Maximum p50 latency (seconds)
        p75:
          type: number
          format: double
          description: Maximum p75 latency (seconds)
        p90:
          type: number
          format: double
          description: Maximum p90 latency (seconds)
        p99:
          type: number
          format: double
          description: Maximum p99 latency (seconds)
      description: >-
        Percentile-based latency cutoffs. All specified cutoffs must be met for
        an endpoint to be preferred.
      title: PercentileLatencyCutoffs
    PreferredMaxLatency:
      oneOf:
        - type: number
          format: double
        - $ref: '#/components/schemas/PercentileLatencyCutoffs'
        - description: Any type
      description: >-
        Preferred maximum latency (in seconds). Can be a number (applies to p50)
        or an object with percentile-specific cutoffs. Endpoints above the
        threshold(s) may still be used, but are deprioritized in routing. When
        using fallback models, this may cause a fallback model to be used
        instead of the primary model if it meets the threshold.
      title: PreferredMaxLatency
    ProviderPreferences:
      type: object
      properties:
        allow_fallbacks:
          type:
            - boolean
            - 'null'
          description: >
            Whether to allow backup providers to serve requests

            - true: (default) when the primary provider (or your custom
            providers in "order") is unavailable, use the next best provider.

            - false: use only the primary/custom provider, and return the
            upstream error if it's unavailable.
        require_parameters:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to filter providers to only those that support the
            parameters you've provided. If this setting is omitted or set to
            false, then providers will receive only the parameters they support,
            and ignore the rest.
        data_collection:
          oneOf:
            - $ref: '#/components/schemas/ProviderPreferencesDataCollection'
            - type: 'null'
          description: >-
            Data collection setting. If no available model provider meets the
            requirement, your request will return an error.

            - allow: (default) allow providers which store user data
            non-transiently and may train on it


            - deny: use only providers which do not collect user data.
        zdr:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to restrict routing to only ZDR (Zero Data Retention)
            endpoints. When true, only endpoints that do not retain prompts will
            be used.
        enforce_distillable_text:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to restrict routing to only models that allow text
            distillation. When true, only models where the author has allowed
            distillation will be used.
        order:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ProviderPreferencesOrderItems'
          description: >-
            An ordered list of provider slugs. The router will attempt to use
            the first provider in the subset of this list that supports your
            requested model, and fall back to the next if it is unavailable. If
            no providers are available, the request will fail with an error
            message.
        only:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ProviderPreferencesOnlyItems'
          description: >-
            List of provider slugs to allow. If provided, this list is merged
            with your account-wide allowed provider settings for this request.
        ignore:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ProviderPreferencesIgnoreItems'
          description: >-
            List of provider slugs to ignore. If provided, this list is merged
            with your account-wide ignored provider settings for this request.
        quantizations:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/Quantization'
          description: A list of quantization levels to filter the provider by.
        sort:
          $ref: '#/components/schemas/ProviderPreferencesSort'
          description: >-
            The sorting strategy to use for this request, if "order" is not
            specified. When set, no load balancing is performed.
        max_price:
          $ref: '#/components/schemas/ProviderPreferencesMaxPrice'
          description: >-
            The object specifying the maximum price you want to pay for this
            request. USD price per million tokens, for prompt and completion.
        preferred_min_throughput:
          $ref: '#/components/schemas/PreferredMinThroughput'
        preferred_max_latency:
          $ref: '#/components/schemas/PreferredMaxLatency'
      description: >-
        When multiple model providers are available, optionally indicate your
        routing preference.
      title: ProviderPreferences
    AutoRouterPluginId:
      type: string
      enum:
        - auto-router
      title: AutoRouterPluginId
    AutoRouterPlugin:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/AutoRouterPluginId'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the auto-router plugin for this request.
            Defaults to true.
        allowed_models:
          type: array
          items:
            type: string
          description: >-
            List of model patterns to filter which models the auto-router can
            route between. Supports wildcards (e.g., "anthropic/*" matches all
            Anthropic models). When not specified, uses the default supported
            models list.
      required:
        - id
      title: AutoRouterPlugin
    ModerationPluginId:
      type: string
      enum:
        - moderation
      title: ModerationPluginId
    ModerationPlugin:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/ModerationPluginId'
      required:
        - id
      title: ModerationPlugin
    WebSearchPluginId:
      type: string
      enum:
        - web
      title: WebSearchPluginId
    WebSearchEngine:
      type: string
      enum:
        - native
        - exa
        - firecrawl
        - parallel
      description: The search engine to use for web search.
      title: WebSearchEngine
    WebSearchPlugin:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/WebSearchPluginId'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the web-search plugin for this request.
            Defaults to true.
        max_results:
          type: integer
        search_prompt:
          type: string
        engine:
          $ref: '#/components/schemas/WebSearchEngine'
        include_domains:
          type: array
          items:
            type: string
          description: >-
            A list of domains to restrict web search results to. Supports
            wildcards (e.g. "*.substack.com") and path filtering (e.g.
            "openai.com/blog").
        exclude_domains:
          type: array
          items:
            type: string
          description: >-
            A list of domains to exclude from web search results. Supports
            wildcards (e.g. "*.substack.com") and path filtering (e.g.
            "openai.com/blog").
      required:
        - id
      title: WebSearchPlugin
    FileParserPluginId:
      type: string
      enum:
        - file-parser
      title: FileParserPluginId
    PdfParserEngine0:
      type: string
      enum:
        - mistral-ocr
        - native
        - cloudflare-ai
      title: PdfParserEngine0
    PdfParserEngine1:
      type: string
      enum:
        - pdf-text
      title: PdfParserEngine1
    PDFParserEngine:
      oneOf:
        - $ref: '#/components/schemas/PdfParserEngine0'
        - $ref: '#/components/schemas/PdfParserEngine1'
      description: >-
        The engine to use for parsing PDF files. "pdf-text" is deprecated and
        automatically redirected to "cloudflare-ai".
      title: PDFParserEngine
    PDFParserOptions:
      type: object
      properties:
        engine:
          $ref: '#/components/schemas/PDFParserEngine'
      description: Options for PDF parsing.
      title: PDFParserOptions
    FileParserPlugin:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/FileParserPluginId'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the file-parser plugin for this request.
            Defaults to true.
        pdf:
          $ref: '#/components/schemas/PDFParserOptions'
      required:
        - id
      title: FileParserPlugin
    ResponseHealingPluginId:
      type: string
      enum:
        - response-healing
      title: ResponseHealingPluginId
    ResponseHealingPlugin:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/ResponseHealingPluginId'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the response-healing plugin for this
            request. Defaults to true.
      required:
        - id
      title: ResponseHealingPlugin
    ContextCompressionPluginId:
      type: string
      enum:
        - context-compression
      title: ContextCompressionPluginId
    ContextCompressionEngine:
      type: string
      enum:
        - middle-out
      description: The compression engine to use. Defaults to "middle-out".
      title: ContextCompressionEngine
    ContextCompressionPlugin:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/ContextCompressionPluginId'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the context-compression plugin for this
            request. Defaults to true.
        engine:
          $ref: '#/components/schemas/ContextCompressionEngine'
      required:
        - id
      title: ContextCompressionPlugin
    MessagesRequestPluginsItems:
      oneOf:
        - $ref: '#/components/schemas/AutoRouterPlugin'
        - $ref: '#/components/schemas/ModerationPlugin'
        - $ref: '#/components/schemas/WebSearchPlugin'
        - $ref: '#/components/schemas/FileParserPlugin'
        - $ref: '#/components/schemas/ResponseHealingPlugin'
        - $ref: '#/components/schemas/ContextCompressionPlugin'
      title: MessagesRequestPluginsItems
    TraceConfig:
      type: object
      properties:
        trace_id:
          type: string
        trace_name:
          type: string
        span_name:
          type: string
        generation_name:
          type: string
        parent_span_id:
          type: string
      description: >-
        Metadata for observability and tracing. Known keys (trace_id,
        trace_name, span_name, generation_name, parent_span_id) have special
        handling. Additional keys are passed through as custom metadata to
        configured broadcast destinations.
      title: TraceConfig
    MessagesRequestSpeed:
      type: object
      properties: {}
      title: MessagesRequestSpeed
    MessagesRequest:
      type: object
      properties:
        model:
          type: string
        max_tokens:
          type: integer
        system:
          $ref: '#/components/schemas/MessagesRequestSystem'
        metadata:
          $ref: '#/components/schemas/MessagesRequestMetadata'
        stop_sequences:
          type: array
          items:
            type: string
        temperature:
          type: number
          format: double
        top_p:
          type: number
          format: double
        top_k:
          type: integer
        tools:
          type: array
          items:
            $ref: '#/components/schemas/MessagesRequestToolsItems'
        tool_choice:
          $ref: '#/components/schemas/MessagesRequestToolChoice'
        thinking:
          $ref: '#/components/schemas/MessagesRequestThinking'
        service_tier:
          $ref: '#/components/schemas/MessagesRequestServiceTier'
        output_config:
          $ref: '#/components/schemas/MessagesOutputConfig'
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        messages:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/MessagesMessageParam'
        stream:
          type: boolean
        context_management:
          oneOf:
            - $ref: '#/components/schemas/MessagesRequestContextManagement'
            - type: 'null'
        provider:
          $ref: '#/components/schemas/ProviderPreferences'
        plugins:
          type: array
          items:
            $ref: '#/components/schemas/MessagesRequestPluginsItems'
          description: >-
            Plugins you want to enable for this request, including their
            settings.
        route:
          description: Any type
        user:
          type: string
          description: >-
            A unique identifier representing your end-user, which helps
            distinguish between different users of your app. This allows your
            app to identify specific users in case of abuse reports, preventing
            your entire app from being affected by the actions of individual
            users. Maximum of 256 characters.
        session_id:
          type: string
          description: >-
            A unique identifier for grouping related requests (e.g., a
            conversation or agent workflow) for observability. If provided in
            both the request body and the x-session-id header, the body value
            takes precedence. Maximum of 256 characters.
        trace:
          $ref: '#/components/schemas/TraceConfig'
        models:
          type: array
          items:
            type: string
        speed:
          $ref: '#/components/schemas/MessagesRequestSpeed'
      required:
        - model
        - messages
      description: Request schema for Anthropic Messages API endpoint
      title: MessagesRequest
    BaseMessagesResultType:
      type: string
      enum:
        - message
      title: BaseMessagesResultType
    BaseMessagesResultRole:
      type: string
      enum:
        - assistant
      title: BaseMessagesResultRole
    AnthropicContainer:
      type: object
      properties:
        id:
          type: string
        expires_at:
          type: string
      required:
        - id
        - expires_at
      title: AnthropicContainer
    AnthropicTextBlockType:
      type: string
      enum:
        - text
      title: AnthropicTextBlockType
    AnthropicCitationCharLocationType:
      type: string
      enum:
        - char_location
      title: AnthropicCitationCharLocationType
    AnthropicCitationCharLocation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCitationCharLocationType'
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          type:
            - string
            - 'null'
        start_char_index:
          type: integer
        end_char_index:
          type: integer
        file_id:
          type:
            - string
            - 'null'
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_char_index
        - end_char_index
        - file_id
      title: AnthropicCitationCharLocation
    AnthropicCitationPageLocationType:
      type: string
      enum:
        - page_location
      title: AnthropicCitationPageLocationType
    AnthropicCitationPageLocation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCitationPageLocationType'
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          type:
            - string
            - 'null'
        start_page_number:
          type: integer
        end_page_number:
          type: integer
        file_id:
          type:
            - string
            - 'null'
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_page_number
        - end_page_number
        - file_id
      title: AnthropicCitationPageLocation
    AnthropicCitationContentBlockLocationType:
      type: string
      enum:
        - content_block_location
      title: AnthropicCitationContentBlockLocationType
    AnthropicCitationContentBlockLocation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCitationContentBlockLocationType'
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          type:
            - string
            - 'null'
        start_block_index:
          type: integer
        end_block_index:
          type: integer
        file_id:
          type:
            - string
            - 'null'
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_block_index
        - end_block_index
        - file_id
      title: AnthropicCitationContentBlockLocation
    AnthropicTextCitation:
      oneOf:
        - $ref: '#/components/schemas/AnthropicCitationCharLocation'
        - $ref: '#/components/schemas/AnthropicCitationPageLocation'
        - $ref: '#/components/schemas/AnthropicCitationContentBlockLocation'
        - $ref: '#/components/schemas/AnthropicCitationWebSearchResultLocation'
        - $ref: '#/components/schemas/AnthropicCitationSearchResultLocation'
      title: AnthropicTextCitation
    AnthropicTextBlock:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicTextBlockType'
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/AnthropicTextCitation'
      required:
        - type
        - text
        - citations
      title: AnthropicTextBlock
    AnthropicToolUseBlockType:
      type: string
      enum:
        - tool_use
      title: AnthropicToolUseBlockType
    AnthropicDirectCallerType:
      type: string
      enum:
        - direct
      title: AnthropicDirectCallerType
    AnthropicDirectCaller:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicDirectCallerType'
      required:
        - type
      title: AnthropicDirectCaller
    AnthropicCodeExecution20250825CallerType:
      type: string
      enum:
        - code_execution_20250825
      title: AnthropicCodeExecution20250825CallerType
    AnthropicCodeExecution20250825Caller:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCodeExecution20250825CallerType'
        tool_id:
          type: string
      required:
        - type
        - tool_id
      title: AnthropicCodeExecution20250825Caller
    AnthropicCodeExecution20260120CallerType:
      type: string
      enum:
        - code_execution_20260120
      title: AnthropicCodeExecution20260120CallerType
    AnthropicCodeExecution20260120Caller:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCodeExecution20260120CallerType'
        tool_id:
          type: string
      required:
        - type
        - tool_id
      title: AnthropicCodeExecution20260120Caller
    AnthropicCaller:
      oneOf:
        - $ref: '#/components/schemas/AnthropicDirectCaller'
        - $ref: '#/components/schemas/AnthropicCodeExecution20250825Caller'
        - $ref: '#/components/schemas/AnthropicCodeExecution20260120Caller'
      title: AnthropicCaller
    AnthropicToolUseBlock:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicToolUseBlockType'
        id:
          type: string
        caller:
          $ref: '#/components/schemas/AnthropicCaller'
        name:
          type: string
        input:
          oneOf:
            - description: Any type
            - type: 'null'
      required:
        - type
        - id
        - caller
        - name
      title: AnthropicToolUseBlock
    AnthropicThinkingBlockType:
      type: string
      enum:
        - thinking
      title: AnthropicThinkingBlockType
    AnthropicThinkingBlock:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicThinkingBlockType'
        thinking:
          type: string
        signature:
          type: string
      required:
        - type
        - thinking
        - signature
      title: AnthropicThinkingBlock
    AnthropicRedactedThinkingBlockType:
      type: string
      enum:
        - redacted_thinking
      title: AnthropicRedactedThinkingBlockType
    AnthropicRedactedThinkingBlock:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicRedactedThinkingBlockType'
        data:
          type: string
      required:
        - type
        - data
      title: AnthropicRedactedThinkingBlock
    AnthropicServerToolUseBlockType:
      type: string
      enum:
        - server_tool_use
      title: AnthropicServerToolUseBlockType
    AnthropicServerToolUseBlock:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicServerToolUseBlockType'
        id:
          type: string
        caller:
          $ref: '#/components/schemas/AnthropicCaller'
        name:
          $ref: '#/components/schemas/AnthropicServerToolName'
        input:
          oneOf:
            - description: Any type
            - type: 'null'
      required:
        - type
        - id
        - caller
        - name
      title: AnthropicServerToolUseBlock
    AnthropicWebSearchToolResultType:
      type: string
      enum:
        - web_search_tool_result
      title: AnthropicWebSearchToolResultType
    AnthropicWebSearchResultType:
      type: string
      enum:
        - web_search_result
      title: AnthropicWebSearchResultType
    AnthropicWebSearchResult:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicWebSearchResultType'
        encrypted_content:
          type: string
        page_age:
          type:
            - string
            - 'null'
        title:
          type: string
        url:
          type: string
      required:
        - type
        - encrypted_content
        - page_age
        - title
        - url
      title: AnthropicWebSearchResult
    AnthropicWebSearchToolResultContent0:
      type: array
      items:
        $ref: '#/components/schemas/AnthropicWebSearchResult'
      title: AnthropicWebSearchToolResultContent0
    AnthropicWebSearchToolResultErrorType:
      type: string
      enum:
        - web_search_tool_result_error
      title: AnthropicWebSearchToolResultErrorType
    AnthropicWebSearchToolResultErrorErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - max_uses_exceeded
        - too_many_requests
        - query_too_long
        - request_too_large
      title: AnthropicWebSearchToolResultErrorErrorCode
    AnthropicWebSearchToolResultError:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicWebSearchToolResultErrorType'
        error_code:
          $ref: '#/components/schemas/AnthropicWebSearchToolResultErrorErrorCode'
      required:
        - type
        - error_code
      title: AnthropicWebSearchToolResultError
    AnthropicWebSearchToolResultContent:
      oneOf:
        - $ref: '#/components/schemas/AnthropicWebSearchToolResultContent0'
        - $ref: '#/components/schemas/AnthropicWebSearchToolResultError'
      title: AnthropicWebSearchToolResultContent
    AnthropicWebSearchToolResult:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicWebSearchToolResultType'
        caller:
          $ref: '#/components/schemas/AnthropicCaller'
        tool_use_id:
          type: string
        content:
          $ref: '#/components/schemas/AnthropicWebSearchToolResultContent'
      required:
        - type
        - caller
        - tool_use_id
        - content
      title: AnthropicWebSearchToolResult
    AnthropicWebFetchToolResultType:
      type: string
      enum:
        - web_fetch_tool_result
      title: AnthropicWebFetchToolResultType
    AnthropicWebFetchToolResultErrorType:
      type: string
      enum:
        - web_fetch_tool_result_error
      title: AnthropicWebFetchToolResultErrorType
    AnthropicWebFetchToolResultErrorErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - url_too_long
        - url_not_allowed
        - url_not_accessible
        - unsupported_content_type
        - too_many_requests
        - max_uses_exceeded
        - unavailable
      title: AnthropicWebFetchToolResultErrorErrorCode
    AnthropicWebFetchToolResultError:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicWebFetchToolResultErrorType'
        error_code:
          $ref: '#/components/schemas/AnthropicWebFetchToolResultErrorErrorCode'
      required:
        - type
        - error_code
      title: AnthropicWebFetchToolResultError
    AnthropicCitationsConfig:
      type: object
      properties:
        enabled:
          type: boolean
      required:
        - enabled
      title: AnthropicCitationsConfig
    AnthropicBase64PDFSource:
      type: object
      properties:
        data:
          type: string
        media_type:
          $ref: '#/components/schemas/AnthropicBase64PdfSourceMediaType'
        type:
          $ref: '#/components/schemas/AnthropicBase64PdfSourceType'
      required:
        - data
        - media_type
        - type
      title: AnthropicBase64PDFSource
    AnthropicPlainTextSourceResponseMediaType:
      type: string
      enum:
        - text/plain
      title: AnthropicPlainTextSourceResponseMediaType
    AnthropicPlainTextSourceResponseType:
      type: string
      enum:
        - text
      title: AnthropicPlainTextSourceResponseType
    AnthropicPlainTextSourceResponse:
      type: object
      properties:
        data:
          type: string
        media_type:
          $ref: '#/components/schemas/AnthropicPlainTextSourceResponseMediaType'
        type:
          $ref: '#/components/schemas/AnthropicPlainTextSourceResponseType'
      required:
        - data
        - media_type
        - type
      title: AnthropicPlainTextSourceResponse
    AnthropicDocumentBlockSource:
      oneOf:
        - $ref: '#/components/schemas/AnthropicBase64PDFSource'
        - $ref: '#/components/schemas/AnthropicPlainTextSourceResponse'
      title: AnthropicDocumentBlockSource
    AnthropicDocumentBlockType:
      type: string
      enum:
        - document
      title: AnthropicDocumentBlockType
    AnthropicDocumentBlock:
      type: object
      properties:
        citations:
          $ref: '#/components/schemas/AnthropicCitationsConfig'
        source:
          $ref: '#/components/schemas/AnthropicDocumentBlockSource'
        title:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/AnthropicDocumentBlockType'
      required:
        - citations
        - source
        - title
        - type
      title: AnthropicDocumentBlock
    AnthropicWebFetchBlockType:
      type: string
      enum:
        - web_fetch_result
      title: AnthropicWebFetchBlockType
    AnthropicWebFetchBlock:
      type: object
      properties:
        content:
          $ref: '#/components/schemas/AnthropicDocumentBlock'
        retrieved_at:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/AnthropicWebFetchBlockType'
        url:
          type: string
      required:
        - content
        - retrieved_at
        - type
        - url
      title: AnthropicWebFetchBlock
    AnthropicWebFetchContent:
      oneOf:
        - $ref: '#/components/schemas/AnthropicWebFetchToolResultError'
        - $ref: '#/components/schemas/AnthropicWebFetchBlock'
      title: AnthropicWebFetchContent
    AnthropicWebFetchToolResult:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicWebFetchToolResultType'
        caller:
          $ref: '#/components/schemas/AnthropicCaller'
        content:
          $ref: '#/components/schemas/AnthropicWebFetchContent'
        tool_use_id:
          type: string
      required:
        - type
        - caller
        - content
        - tool_use_id
      title: AnthropicWebFetchToolResult
    AnthropicCodeExecutionToolResultType:
      type: string
      enum:
        - code_execution_tool_result
      title: AnthropicCodeExecutionToolResultType
    AnthropicServerToolErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - too_many_requests
        - execution_time_exceeded
      title: AnthropicServerToolErrorCode
    AnthropicCodeExecutionToolResultErrorType:
      type: string
      enum:
        - code_execution_tool_result_error
      title: AnthropicCodeExecutionToolResultErrorType
    AnthropicCodeExecutionToolResultError:
      type: object
      properties:
        error_code:
          $ref: '#/components/schemas/AnthropicServerToolErrorCode'
        type:
          $ref: '#/components/schemas/AnthropicCodeExecutionToolResultErrorType'
      required:
        - error_code
        - type
      title: AnthropicCodeExecutionToolResultError
    AnthropicCodeExecutionOutputType:
      type: string
      enum:
        - code_execution_output
      title: AnthropicCodeExecutionOutputType
    AnthropicCodeExecutionOutput:
      type: object
      properties:
        file_id:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicCodeExecutionOutputType'
      required:
        - file_id
        - type
      title: AnthropicCodeExecutionOutput
    AnthropicCodeExecutionResultType:
      type: string
      enum:
        - code_execution_result
      title: AnthropicCodeExecutionResultType
    AnthropicCodeExecutionResult:
      type: object
      properties:
        content:
          type: array
          items:
            $ref: '#/components/schemas/AnthropicCodeExecutionOutput'
        return_code:
          type: integer
        stderr:
          type: string
        stdout:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicCodeExecutionResultType'
      required:
        - content
        - return_code
        - stderr
        - stdout
        - type
      title: AnthropicCodeExecutionResult
    AnthropicEncryptedCodeExecutionResultType:
      type: string
      enum:
        - encrypted_code_execution_result
      title: AnthropicEncryptedCodeExecutionResultType
    AnthropicEncryptedCodeExecutionResult:
      type: object
      properties:
        content:
          type: array
          items:
            $ref: '#/components/schemas/AnthropicCodeExecutionOutput'
        encrypted_stdout:
          type: string
        return_code:
          type: integer
        stderr:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicEncryptedCodeExecutionResultType'
      required:
        - content
        - encrypted_stdout
        - return_code
        - stderr
        - type
      title: AnthropicEncryptedCodeExecutionResult
    AnthropicCodeExecutionContent:
      oneOf:
        - $ref: '#/components/schemas/AnthropicCodeExecutionToolResultError'
        - $ref: '#/components/schemas/AnthropicCodeExecutionResult'
        - $ref: '#/components/schemas/AnthropicEncryptedCodeExecutionResult'
      title: AnthropicCodeExecutionContent
    AnthropicCodeExecutionToolResult:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCodeExecutionToolResultType'
        content:
          $ref: '#/components/schemas/AnthropicCodeExecutionContent'
        tool_use_id:
          type: string
      required:
        - type
        - content
        - tool_use_id
      title: AnthropicCodeExecutionToolResult
    AnthropicBashCodeExecutionToolResultType:
      type: string
      enum:
        - bash_code_execution_tool_result
      title: AnthropicBashCodeExecutionToolResultType
    AnthropicBashCodeExecutionToolResultErrorErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - too_many_requests
        - execution_time_exceeded
        - output_file_too_large
      title: AnthropicBashCodeExecutionToolResultErrorErrorCode
    AnthropicBashCodeExecutionToolResultErrorType:
      type: string
      enum:
        - bash_code_execution_tool_result_error
      title: AnthropicBashCodeExecutionToolResultErrorType
    AnthropicBashCodeExecutionToolResultError:
      type: object
      properties:
        error_code:
          $ref: >-
            #/components/schemas/AnthropicBashCodeExecutionToolResultErrorErrorCode
        type:
          $ref: '#/components/schemas/AnthropicBashCodeExecutionToolResultErrorType'
      required:
        - error_code
        - type
      title: AnthropicBashCodeExecutionToolResultError
    AnthropicBashCodeExecutionOutputType:
      type: string
      enum:
        - bash_code_execution_output
      title: AnthropicBashCodeExecutionOutputType
    AnthropicBashCodeExecutionOutput:
      type: object
      properties:
        file_id:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicBashCodeExecutionOutputType'
      required:
        - file_id
        - type
      title: AnthropicBashCodeExecutionOutput
    AnthropicBashCodeExecutionResultType:
      type: string
      enum:
        - bash_code_execution_result
      title: AnthropicBashCodeExecutionResultType
    AnthropicBashCodeExecutionResult:
      type: object
      properties:
        content:
          type: array
          items:
            $ref: '#/components/schemas/AnthropicBashCodeExecutionOutput'
        return_code:
          type: integer
        stderr:
          type: string
        stdout:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicBashCodeExecutionResultType'
      required:
        - content
        - return_code
        - stderr
        - stdout
        - type
      title: AnthropicBashCodeExecutionResult
    AnthropicBashCodeExecutionContent:
      oneOf:
        - $ref: '#/components/schemas/AnthropicBashCodeExecutionToolResultError'
        - $ref: '#/components/schemas/AnthropicBashCodeExecutionResult'
      title: AnthropicBashCodeExecutionContent
    AnthropicBashCodeExecutionToolResult:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicBashCodeExecutionToolResultType'
        content:
          $ref: '#/components/schemas/AnthropicBashCodeExecutionContent'
        tool_use_id:
          type: string
      required:
        - type
        - content
        - tool_use_id
      title: AnthropicBashCodeExecutionToolResult
    AnthropicTextEditorCodeExecutionToolResultType:
      type: string
      enum:
        - text_editor_code_execution_tool_result
      title: AnthropicTextEditorCodeExecutionToolResultType
    AnthropicTextEditorCodeExecutionToolResultErrorErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - too_many_requests
        - execution_time_exceeded
        - file_not_found
      title: AnthropicTextEditorCodeExecutionToolResultErrorErrorCode
    AnthropicTextEditorCodeExecutionToolResultErrorType:
      type: string
      enum:
        - text_editor_code_execution_tool_result_error
      title: AnthropicTextEditorCodeExecutionToolResultErrorType
    AnthropicTextEditorCodeExecutionToolResultError:
      type: object
      properties:
        error_code:
          $ref: >-
            #/components/schemas/AnthropicTextEditorCodeExecutionToolResultErrorErrorCode
        error_message:
          type:
            - string
            - 'null'
        type:
          $ref: >-
            #/components/schemas/AnthropicTextEditorCodeExecutionToolResultErrorType
      required:
        - error_code
        - error_message
        - type
      title: AnthropicTextEditorCodeExecutionToolResultError
    AnthropicTextEditorCodeExecutionViewResultFileType:
      type: string
      enum:
        - text
        - image
        - pdf
      title: AnthropicTextEditorCodeExecutionViewResultFileType
    AnthropicTextEditorCodeExecutionViewResultType:
      type: string
      enum:
        - text_editor_code_execution_view_result
      title: AnthropicTextEditorCodeExecutionViewResultType
    AnthropicTextEditorCodeExecutionViewResult:
      type: object
      properties:
        content:
          type: string
        file_type:
          $ref: >-
            #/components/schemas/AnthropicTextEditorCodeExecutionViewResultFileType
        num_lines:
          type: integer
        start_line:
          type: integer
        total_lines:
          type: integer
        type:
          $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionViewResultType'
      required:
        - content
        - file_type
        - num_lines
        - start_line
        - total_lines
        - type
      title: AnthropicTextEditorCodeExecutionViewResult
    AnthropicTextEditorCodeExecutionCreateResultType:
      type: string
      enum:
        - text_editor_code_execution_create_result
      title: AnthropicTextEditorCodeExecutionCreateResultType
    AnthropicTextEditorCodeExecutionCreateResult:
      type: object
      properties:
        is_file_update:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/AnthropicTextEditorCodeExecutionCreateResultType
      required:
        - is_file_update
        - type
      title: AnthropicTextEditorCodeExecutionCreateResult
    AnthropicTextEditorCodeExecutionStrReplaceResultType:
      type: string
      enum:
        - text_editor_code_execution_str_replace_result
      title: AnthropicTextEditorCodeExecutionStrReplaceResultType
    AnthropicTextEditorCodeExecutionStrReplaceResult:
      type: object
      properties:
        lines:
          type:
            - array
            - 'null'
          items:
            type: string
        new_lines:
          type: integer
        new_start:
          type: integer
        old_lines:
          type: integer
        old_start:
          type: integer
        type:
          $ref: >-
            #/components/schemas/AnthropicTextEditorCodeExecutionStrReplaceResultType
      required:
        - lines
        - new_lines
        - new_start
        - old_lines
        - old_start
        - type
      title: AnthropicTextEditorCodeExecutionStrReplaceResult
    AnthropicTextEditorCodeExecutionContent:
      oneOf:
        - $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionToolResultError'
        - $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionViewResult'
        - $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionCreateResult'
        - $ref: >-
            #/components/schemas/AnthropicTextEditorCodeExecutionStrReplaceResult
      title: AnthropicTextEditorCodeExecutionContent
    AnthropicTextEditorCodeExecutionToolResult:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionToolResultType'
        content:
          $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionContent'
        tool_use_id:
          type: string
      required:
        - type
        - content
        - tool_use_id
      title: AnthropicTextEditorCodeExecutionToolResult
    AnthropicToolSearchToolResultType:
      type: string
      enum:
        - tool_search_tool_result
      title: AnthropicToolSearchToolResultType
    AnthropicToolSearchResultErrorType:
      type: string
      enum:
        - tool_search_tool_result_error
      title: AnthropicToolSearchResultErrorType
    AnthropicToolSearchResultError:
      type: object
      properties:
        error_code:
          $ref: '#/components/schemas/AnthropicServerToolErrorCode'
        error_message:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/AnthropicToolSearchResultErrorType'
      required:
        - error_code
        - error_message
        - type
      title: AnthropicToolSearchResultError
    AnthropicToolReferenceType:
      type: string
      enum:
        - tool_reference
      title: AnthropicToolReferenceType
    AnthropicToolReference:
      type: object
      properties:
        tool_name:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicToolReferenceType'
      required:
        - tool_name
        - type
      title: AnthropicToolReference
    AnthropicToolSearchResultType:
      type: string
      enum:
        - tool_search_tool_search_result
      title: AnthropicToolSearchResultType
    AnthropicToolSearchResult:
      type: object
      properties:
        tool_references:
          type: array
          items:
            $ref: '#/components/schemas/AnthropicToolReference'
        type:
          $ref: '#/components/schemas/AnthropicToolSearchResultType'
      required:
        - tool_references
        - type
      title: AnthropicToolSearchResult
    AnthropicToolSearchContent:
      oneOf:
        - $ref: '#/components/schemas/AnthropicToolSearchResultError'
        - $ref: '#/components/schemas/AnthropicToolSearchResult'
      title: AnthropicToolSearchContent
    AnthropicToolSearchToolResult:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicToolSearchToolResultType'
        content:
          $ref: '#/components/schemas/AnthropicToolSearchContent'
        tool_use_id:
          type: string
      required:
        - type
        - content
        - tool_use_id
      title: AnthropicToolSearchToolResult
    AnthropicContainerUploadType:
      type: string
      enum:
        - container_upload
      title: AnthropicContainerUploadType
    AnthropicContainerUpload:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicContainerUploadType'
        file_id:
          type: string
      required:
        - type
        - file_id
      title: AnthropicContainerUpload
    AnthropicCompactionBlockType:
      type: string
      enum:
        - compaction
      title: AnthropicCompactionBlockType
    AnthropicCompactionBlock:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCompactionBlockType'
        content:
          type:
            - string
            - 'null'
      required:
        - type
        - content
      title: AnthropicCompactionBlock
    ORAnthropicContentBlock:
      oneOf:
        - $ref: '#/components/schemas/AnthropicTextBlock'
        - $ref: '#/components/schemas/AnthropicToolUseBlock'
        - $ref: '#/components/schemas/AnthropicThinkingBlock'
        - $ref: '#/components/schemas/AnthropicRedactedThinkingBlock'
        - $ref: '#/components/schemas/AnthropicServerToolUseBlock'
        - $ref: '#/components/schemas/AnthropicWebSearchToolResult'
        - $ref: '#/components/schemas/AnthropicWebFetchToolResult'
        - $ref: '#/components/schemas/AnthropicCodeExecutionToolResult'
        - $ref: '#/components/schemas/AnthropicBashCodeExecutionToolResult'
        - $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionToolResult'
        - $ref: '#/components/schemas/AnthropicToolSearchToolResult'
        - $ref: '#/components/schemas/AnthropicContainerUpload'
        - $ref: '#/components/schemas/AnthropicCompactionBlock'
      title: ORAnthropicContentBlock
    ORAnthropicStopReason:
      type: string
      enum:
        - end_turn
        - max_tokens
        - stop_sequence
        - tool_use
        - pause_turn
        - refusal
        - compaction
      title: ORAnthropicStopReason
    AnthropicCacheCreation:
      type: object
      properties:
        ephemeral_5m_input_tokens:
          type: integer
        ephemeral_1h_input_tokens:
          type: integer
      required:
        - ephemeral_5m_input_tokens
        - ephemeral_1h_input_tokens
      title: AnthropicCacheCreation
    AnthropicServerToolUsage:
      type: object
      properties:
        web_search_requests:
          type: integer
        web_fetch_requests:
          type: integer
      required:
        - web_search_requests
        - web_fetch_requests
      title: AnthropicServerToolUsage
    AnthropicServiceTier:
      type: string
      enum:
        - standard
        - priority
        - batch
      title: AnthropicServiceTier
    AnthropicSpeed:
      type: string
      enum:
        - fast
        - standard
      title: AnthropicSpeed
    AnthropicIterationCacheCreation:
      type: object
      properties:
        ephemeral_5m_input_tokens:
          type: integer
        ephemeral_1h_input_tokens:
          type: integer
      title: AnthropicIterationCacheCreation
    AnthropicCompactionUsageIterationType:
      type: string
      enum:
        - compaction
      title: AnthropicCompactionUsageIterationType
    AnthropicCompactionUsageIteration:
      type: object
      properties:
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        cache_creation:
          $ref: '#/components/schemas/AnthropicIterationCacheCreation'
        type:
          $ref: '#/components/schemas/AnthropicCompactionUsageIterationType'
      required:
        - type
      title: AnthropicCompactionUsageIteration
    AnthropicMessageUsageIterationType:
      type: string
      enum:
        - message
      title: AnthropicMessageUsageIterationType
    AnthropicMessageUsageIteration:
      type: object
      properties:
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        cache_creation:
          $ref: '#/components/schemas/AnthropicIterationCacheCreation'
        type:
          $ref: '#/components/schemas/AnthropicMessageUsageIterationType'
      required:
        - type
      title: AnthropicMessageUsageIteration
    AnthropicUnknownUsageIteration:
      type: object
      properties:
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        cache_creation:
          $ref: '#/components/schemas/AnthropicIterationCacheCreation'
        type:
          type: string
      required:
        - type
      title: AnthropicUnknownUsageIteration
    AnthropicUsageIteration:
      oneOf:
        - $ref: '#/components/schemas/AnthropicCompactionUsageIteration'
        - $ref: '#/components/schemas/AnthropicMessageUsageIteration'
        - $ref: '#/components/schemas/AnthropicUnknownUsageIteration'
      title: AnthropicUsageIteration
    BaseMessagesResultUsage:
      type: object
      properties:
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        cache_creation:
          $ref: '#/components/schemas/AnthropicCacheCreation'
        inference_geo:
          type:
            - string
            - 'null'
        server_tool_use:
          $ref: '#/components/schemas/AnthropicServerToolUsage'
        service_tier:
          $ref: '#/components/schemas/AnthropicServiceTier'
        speed:
          $ref: '#/components/schemas/AnthropicSpeed'
        iterations:
          type: array
          items:
            $ref: '#/components/schemas/AnthropicUsageIteration'
      required:
        - input_tokens
        - output_tokens
        - cache_creation_input_tokens
        - cache_read_input_tokens
        - cache_creation
        - inference_geo
        - server_tool_use
        - service_tier
      title: BaseMessagesResultUsage
    MessagesResultUsageCostDetails:
      type: object
      properties:
        upstream_inference_cost:
          type: number
          format: double
        upstream_inference_prompt_cost:
          type: number
          format: double
        upstream_inference_completions_cost:
          type: number
          format: double
      required:
        - upstream_inference_prompt_cost
        - upstream_inference_completions_cost
      title: MessagesResultUsageCostDetails
    MessagesResultUsage:
      type: object
      properties:
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        cache_creation:
          $ref: '#/components/schemas/AnthropicCacheCreation'
        inference_geo:
          type:
            - string
            - 'null'
        server_tool_use:
          $ref: '#/components/schemas/AnthropicServerToolUsage'
        service_tier:
          type:
            - string
            - 'null'
        speed:
          $ref: '#/components/schemas/AnthropicSpeed'
        iterations:
          type: array
          items:
            $ref: '#/components/schemas/AnthropicUsageIteration'
        cost:
          type: number
          format: double
        is_byok:
          type: boolean
        cost_details:
          oneOf:
            - $ref: '#/components/schemas/MessagesResultUsageCostDetails'
            - type: 'null'
      required:
        - input_tokens
        - output_tokens
        - cache_creation_input_tokens
        - cache_read_input_tokens
        - cache_creation
        - inference_geo
        - server_tool_use
        - service_tier
      title: MessagesResultUsage
    MessagesResult:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: '#/components/schemas/BaseMessagesResultType'
        role:
          $ref: '#/components/schemas/BaseMessagesResultRole'
        container:
          $ref: '#/components/schemas/AnthropicContainer'
        content:
          type: array
          items:
            $ref: '#/components/schemas/ORAnthropicContentBlock'
        model:
          type: string
        stop_reason:
          $ref: '#/components/schemas/ORAnthropicStopReason'
        stop_sequence:
          type:
            - string
            - 'null'
        usage:
          $ref: '#/components/schemas/MessagesResultUsage'
        provider:
          $ref: '#/components/schemas/ProviderName'
      required:
        - id
        - type
        - role
        - container
        - content
        - model
        - stop_reason
        - stop_sequence
        - usage
      description: >-
        Non-streaming response from the Anthropic Messages API with OpenRouter
        extensions
      title: MessagesResult
    MessagesErrorResponseType:
      type: string
      enum:
        - error
      title: MessagesErrorResponseType
    MessagesErrorDetail:
      type: object
      properties:
        type:
          type: string
        message:
          type: string
      required:
        - type
        - message
      title: MessagesErrorDetail
    MessagesErrorResponse:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesErrorResponseType'
        error:
          $ref: '#/components/schemas/MessagesErrorDetail'
      required:
        - type
        - error
      title: MessagesErrorResponse
  securitySchemes:
    apiKey:
      type: http
      scheme: bearer
      description: API key as bearer token in Authorization header

```

## SDK Code Examples

```python
import requests

url = "https://openrouter.ai/api/v1/messages"

payload = {
    "model": "anthropic/claude-sonnet-4",
    "messages": [
        {
            "role": "user",
            "content": "Hello, how are you?"
        }
    ],
    "max_tokens": 1024
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/messages';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"model":"anthropic/claude-sonnet-4","messages":[{"role":"user","content":"Hello, how are you?"}],"max_tokens":1024}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/messages"

	payload := strings.NewReader("{\n  \"model\": \"anthropic/claude-sonnet-4\",\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"max_tokens\": 1024\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/messages")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"model\": \"anthropic/claude-sonnet-4\",\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"max_tokens\": 1024\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/messages")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"model\": \"anthropic/claude-sonnet-4\",\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"max_tokens\": 1024\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/messages', [
  'body' => '{
  "model": "anthropic/claude-sonnet-4",
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "max_tokens": 1024
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/messages");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"model\": \"anthropic/claude-sonnet-4\",\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"max_tokens\": 1024\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "model": "anthropic/claude-sonnet-4",
  "messages": [
    [
      "role": "user",
      "content": "Hello, how are you?"
    ]
  ],
  "max_tokens": 1024
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/messages")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```