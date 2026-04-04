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
    AnthropicCitationWebSearchResultLocationParamType:
      type: string
      enum:
        - web_search_result_location
      title: AnthropicCitationWebSearchResultLocationParamType
    AnthropicCitationWebSearchResultLocationParam:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicCitationWebSearchResultLocationParamType
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
      title: AnthropicCitationWebSearchResultLocationParam
    AnthropicCitationSearchResultLocationParamType:
      type: string
      enum:
        - search_result_location
      title: AnthropicCitationSearchResultLocationParamType
    AnthropicCitationSearchResultLocationParam:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicCitationSearchResultLocationParamType'
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
      title: AnthropicCitationSearchResultLocationParam
    AnthropicTextBlockParamCitationsItems:
      oneOf:
        - $ref: '#/components/schemas/AnthropicCitationCharLocationParam'
        - $ref: '#/components/schemas/AnthropicCitationPageLocationParam'
        - $ref: '#/components/schemas/AnthropicCitationContentBlockLocationParam'
        - $ref: '#/components/schemas/AnthropicCitationWebSearchResultLocationParam'
        - $ref: '#/components/schemas/AnthropicCitationSearchResultLocationParam'
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
    PreviewWebSearchUserLocationType:
      type: string
      enum:
        - approximate
      title: PreviewWebSearchUserLocationType
    Preview_WebSearchUserLocation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/PreviewWebSearchUserLocationType'
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
      title: Preview_WebSearchUserLocation
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
          $ref: '#/components/schemas/Preview_WebSearchUserLocation'
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
          $ref: '#/components/schemas/Preview_WebSearchUserLocation'
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
          type: number
          format: double
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        max_total_results:
          type: number
          format: double
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
    WebSearchSourceType:
      type: string
      enum:
        - url
      title: WebSearchSourceType
    WebSearchSource:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/WebSearchSourceType'
        url:
          type: string
      required:
        - type
        - url
      title: WebSearchSource
    AnthropicImageBlockParamSource:
      oneOf:
        - $ref: '#/components/schemas/AnthropicBase64ImageSource'
        - $ref: '#/components/schemas/WebSearchSource'
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
    AnthropicDocumentBlockParamSource:
      oneOf:
        - $ref: '#/components/schemas/AnthropicBase64PdfSource'
        - $ref: '#/components/schemas/AnthropicPlainTextSource'
        - $ref: '#/components/schemas/AnthropicDocumentBlockParamSource2'
        - $ref: '#/components/schemas/WebSearchSource'
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
    MessagesMessageParamContentOneOf1ItemsOneOf7Name:
      type: string
      enum:
        - web_search
        - web_fetch
        - code_execution
        - bash_code_execution
        - text_editor_code_execution
        - tool_search_tool_regex
        - tool_search_tool_bm25
      title: MessagesMessageParamContentOneOf1ItemsOneOf7Name
    MessagesMessageParamContentOneOf1Items7:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf7Type
        id:
          type: string
        name:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf7Name
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
    MessagesRequestContextManagementEditsItemsOneOf0Trigger:
      oneOf:
        - $ref: '#/components/schemas/AnthropicInputTokensTrigger'
        - $ref: '#/components/schemas/AnthropicToolUsesKeep'
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
    MessagesRequestProviderDataCollection:
      type: object
      properties: {}
      title: MessagesRequestProviderDataCollection
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
    MessagesRequestProviderOrderItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: MessagesRequestProviderOrderItems
    MessagesRequestProviderOnlyItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: MessagesRequestProviderOnlyItems
    MessagesRequestProviderIgnoreItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: MessagesRequestProviderIgnoreItems
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
    MessagesRequestProviderSort:
      type: object
      properties: {}
      title: MessagesRequestProviderSort
    BigNumberUnion:
      type: string
      description: Price per million prompt tokens
      title: BigNumberUnion
    MessagesRequestProviderMaxPriceCompletion:
      type: object
      properties: {}
      title: MessagesRequestProviderMaxPriceCompletion
    MessagesRequestProviderMaxPriceImage:
      type: object
      properties: {}
      title: MessagesRequestProviderMaxPriceImage
    MessagesRequestProviderMaxPriceAudio:
      type: object
      properties: {}
      title: MessagesRequestProviderMaxPriceAudio
    MessagesRequestProviderMaxPriceRequest:
      type: object
      properties: {}
      title: MessagesRequestProviderMaxPriceRequest
    MessagesRequestProviderMaxPrice:
      type: object
      properties:
        prompt:
          $ref: '#/components/schemas/BigNumberUnion'
        completion:
          $ref: '#/components/schemas/MessagesRequestProviderMaxPriceCompletion'
        image:
          $ref: '#/components/schemas/MessagesRequestProviderMaxPriceImage'
        audio:
          $ref: '#/components/schemas/MessagesRequestProviderMaxPriceAudio'
        request:
          $ref: '#/components/schemas/MessagesRequestProviderMaxPriceRequest'
      description: >-
        The object specifying the maximum price you want to pay for this
        request. USD price per million tokens, for prompt and completion.
      title: MessagesRequestProviderMaxPrice
    PercentileThroughputCutoffs:
      type: object
      properties:
        p50:
          type:
            - number
            - 'null'
          format: double
          description: Minimum p50 throughput (tokens/sec)
        p75:
          type:
            - number
            - 'null'
          format: double
          description: Minimum p75 throughput (tokens/sec)
        p90:
          type:
            - number
            - 'null'
          format: double
          description: Minimum p90 throughput (tokens/sec)
        p99:
          type:
            - number
            - 'null'
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
          type:
            - number
            - 'null'
          format: double
          description: Maximum p50 latency (seconds)
        p75:
          type:
            - number
            - 'null'
          format: double
          description: Maximum p75 latency (seconds)
        p90:
          type:
            - number
            - 'null'
          format: double
          description: Maximum p90 latency (seconds)
        p99:
          type:
            - number
            - 'null'
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
    MessagesRequestProvider:
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
          $ref: '#/components/schemas/MessagesRequestProviderDataCollection'
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
            $ref: '#/components/schemas/MessagesRequestProviderOrderItems'
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
            $ref: '#/components/schemas/MessagesRequestProviderOnlyItems'
          description: >-
            List of provider slugs to allow. If provided, this list is merged
            with your account-wide allowed provider settings for this request.
        ignore:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/MessagesRequestProviderIgnoreItems'
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
          $ref: '#/components/schemas/MessagesRequestProviderSort'
        max_price:
          $ref: '#/components/schemas/MessagesRequestProviderMaxPrice'
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
      title: MessagesRequestProvider
    MessagesRequestPluginsItemsOneOf0Id:
      type: string
      enum:
        - auto-router
      title: MessagesRequestPluginsItemsOneOf0Id
    MessagesRequestPluginsItems0:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/MessagesRequestPluginsItemsOneOf0Id'
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
      title: MessagesRequestPluginsItems0
    MessagesRequestPluginsItemsOneOf1Id:
      type: string
      enum:
        - moderation
      title: MessagesRequestPluginsItemsOneOf1Id
    MessagesRequestPluginsItems1:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/MessagesRequestPluginsItemsOneOf1Id'
      required:
        - id
      title: MessagesRequestPluginsItems1
    MessagesRequestPluginsItemsOneOf2Id:
      type: string
      enum:
        - web
      title: MessagesRequestPluginsItemsOneOf2Id
    WebSearchEngine:
      type: string
      enum:
        - native
        - exa
        - firecrawl
        - parallel
      description: The search engine to use for web search.
      title: WebSearchEngine
    MessagesRequestPluginsItems2:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/MessagesRequestPluginsItemsOneOf2Id'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the web-search plugin for this request.
            Defaults to true.
        max_results:
          type: number
          format: double
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
      title: MessagesRequestPluginsItems2
    MessagesRequestPluginsItemsOneOf3Id:
      type: string
      enum:
        - file-parser
      title: MessagesRequestPluginsItemsOneOf3Id
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
    MessagesRequestPluginsItems3:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/MessagesRequestPluginsItemsOneOf3Id'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the file-parser plugin for this request.
            Defaults to true.
        pdf:
          $ref: '#/components/schemas/PDFParserOptions'
      required:
        - id
      title: MessagesRequestPluginsItems3
    MessagesRequestPluginsItemsOneOf4Id:
      type: string
      enum:
        - response-healing
      title: MessagesRequestPluginsItemsOneOf4Id
    MessagesRequestPluginsItems4:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/MessagesRequestPluginsItemsOneOf4Id'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the response-healing plugin for this
            request. Defaults to true.
      required:
        - id
      title: MessagesRequestPluginsItems4
    MessagesRequestPluginsItemsOneOf5Id:
      type: string
      enum:
        - context-compression
      title: MessagesRequestPluginsItemsOneOf5Id
    ContextCompressionEngine:
      type: string
      enum:
        - middle-out
      description: The compression engine to use. Defaults to "middle-out".
      title: ContextCompressionEngine
    MessagesRequestPluginsItems5:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/MessagesRequestPluginsItemsOneOf5Id'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the context-compression plugin for this
            request. Defaults to true.
        engine:
          $ref: '#/components/schemas/ContextCompressionEngine'
      required:
        - id
      title: MessagesRequestPluginsItems5
    MessagesRequestPluginsItems:
      oneOf:
        - $ref: '#/components/schemas/MessagesRequestPluginsItems0'
        - $ref: '#/components/schemas/MessagesRequestPluginsItems1'
        - $ref: '#/components/schemas/MessagesRequestPluginsItems2'
        - $ref: '#/components/schemas/MessagesRequestPluginsItems3'
        - $ref: '#/components/schemas/MessagesRequestPluginsItems4'
        - $ref: '#/components/schemas/MessagesRequestPluginsItems5'
      title: MessagesRequestPluginsItems
    MessagesRequestTrace:
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
      title: MessagesRequestTrace
    MessagesRequestSpeed:
      type: string
      enum:
        - fast
        - standard
      description: >-
        Controls output generation speed. When set to `fast`, uses a
        higher-speed inference configuration at premium pricing. Defaults to
        `standard` when omitted.
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
          oneOf:
            - $ref: '#/components/schemas/MessagesRequestProvider'
            - type: 'null'
          description: >-
            When multiple model providers are available, optionally indicate
            your routing preference.
        plugins:
          type: array
          items:
            $ref: '#/components/schemas/MessagesRequestPluginsItems'
          description: >-
            Plugins you want to enable for this request, including their
            settings.
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
          $ref: '#/components/schemas/MessagesRequestTrace'
          description: >-
            Metadata for observability and tracing. Known keys (trace_id,
            trace_name, span_name, generation_name, parent_span_id) have special
            handling. Additional keys are passed through as custom metadata to
            configured broadcast destinations.
        models:
          type: array
          items:
            type: string
        speed:
          $ref: '#/components/schemas/MessagesRequestSpeed'
          description: >-
            Controls output generation speed. When set to `fast`, uses a
            higher-speed inference configuration at premium pricing. Defaults to
            `standard` when omitted.
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
    BaseMessagesResultContainer:
      type: object
      properties:
        id:
          type: string
        expires_at:
          type: string
      required:
        - id
        - expires_at
      title: BaseMessagesResultContainer
    BaseMessagesResultContentItemsOneOf0Type:
      type: string
      enum:
        - text
      title: BaseMessagesResultContentItemsOneOf0Type
    BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf0Type
    BaseMessagesResultContentItemsOneOf0CitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf0Type
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
      title: BaseMessagesResultContentItemsOneOf0CitationsItems0
    BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf1Type
    BaseMessagesResultContentItemsOneOf0CitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf1Type
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
      title: BaseMessagesResultContentItemsOneOf0CitationsItems1
    BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf2Type
    BaseMessagesResultContentItemsOneOf0CitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf2Type
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
      title: BaseMessagesResultContentItemsOneOf0CitationsItems2
    BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf3Type
    BaseMessagesResultContentItemsOneOf0CitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf3Type
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
      title: BaseMessagesResultContentItemsOneOf0CitationsItems3
    BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf4Type
    BaseMessagesResultContentItemsOneOf0CitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf0CitationsItemsOneOf4Type
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
      title: BaseMessagesResultContentItemsOneOf0CitationsItems4
    BaseMessagesResultContentItemsOneOf0CitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf0CitationsItems0
        - $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf0CitationsItems1
        - $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf0CitationsItems2
        - $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf0CitationsItems3
        - $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf0CitationsItems4
      title: BaseMessagesResultContentItemsOneOf0CitationsItems
    BaseMessagesResultContentItems0:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf0Type'
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/BaseMessagesResultContentItemsOneOf0CitationsItems
      required:
        - type
        - text
        - citations
      title: BaseMessagesResultContentItems0
    BaseMessagesResultContentItemsOneOf1Type:
      type: string
      enum:
        - tool_use
      title: BaseMessagesResultContentItemsOneOf1Type
    BaseMessagesResultContentItemsOneOf1CallerOneOf0Type:
      type: string
      enum:
        - direct
      title: BaseMessagesResultContentItemsOneOf1CallerOneOf0Type
    BaseMessagesResultContentItemsOneOf1Caller0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf1CallerOneOf0Type
      required:
        - type
      title: BaseMessagesResultContentItemsOneOf1Caller0
    BaseMessagesResultContentItemsOneOf1CallerOneOf1Type:
      type: string
      enum:
        - code_execution_20250825
      title: BaseMessagesResultContentItemsOneOf1CallerOneOf1Type
    BaseMessagesResultContentItemsOneOf1Caller1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf1CallerOneOf1Type
        tool_id:
          type: string
      required:
        - type
        - tool_id
      title: BaseMessagesResultContentItemsOneOf1Caller1
    BaseMessagesResultContentItemsOneOf1CallerOneOf2Type:
      type: string
      enum:
        - code_execution_20260120
      title: BaseMessagesResultContentItemsOneOf1CallerOneOf2Type
    BaseMessagesResultContentItemsOneOf1Caller2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf1CallerOneOf2Type
        tool_id:
          type: string
      required:
        - type
        - tool_id
      title: BaseMessagesResultContentItemsOneOf1Caller2
    BaseMessagesResultContentItemsOneOf1Caller:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf1Caller0'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf1Caller1'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf1Caller2'
      title: BaseMessagesResultContentItemsOneOf1Caller
    BaseMessagesResultContentItems1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf1Type'
        id:
          type: string
        caller:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf1Caller'
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
      title: BaseMessagesResultContentItems1
    BaseMessagesResultContentItemsOneOf2Type:
      type: string
      enum:
        - thinking
      title: BaseMessagesResultContentItemsOneOf2Type
    BaseMessagesResultContentItems2:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf2Type'
        thinking:
          type: string
        signature:
          type: string
      required:
        - type
        - thinking
        - signature
      title: BaseMessagesResultContentItems2
    BaseMessagesResultContentItemsOneOf3Type:
      type: string
      enum:
        - redacted_thinking
      title: BaseMessagesResultContentItemsOneOf3Type
    BaseMessagesResultContentItems3:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf3Type'
        data:
          type: string
      required:
        - type
        - data
      title: BaseMessagesResultContentItems3
    BaseMessagesResultContentItemsOneOf4Type:
      type: string
      enum:
        - server_tool_use
      title: BaseMessagesResultContentItemsOneOf4Type
    BaseMessagesResultContentItemsOneOf4CallerOneOf0Type:
      type: string
      enum:
        - direct
      title: BaseMessagesResultContentItemsOneOf4CallerOneOf0Type
    BaseMessagesResultContentItemsOneOf4Caller0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf4CallerOneOf0Type
      required:
        - type
      title: BaseMessagesResultContentItemsOneOf4Caller0
    BaseMessagesResultContentItemsOneOf4CallerOneOf1Type:
      type: string
      enum:
        - code_execution_20250825
      title: BaseMessagesResultContentItemsOneOf4CallerOneOf1Type
    BaseMessagesResultContentItemsOneOf4Caller1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf4CallerOneOf1Type
        tool_id:
          type: string
      required:
        - type
        - tool_id
      title: BaseMessagesResultContentItemsOneOf4Caller1
    BaseMessagesResultContentItemsOneOf4CallerOneOf2Type:
      type: string
      enum:
        - code_execution_20260120
      title: BaseMessagesResultContentItemsOneOf4CallerOneOf2Type
    BaseMessagesResultContentItemsOneOf4Caller2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf4CallerOneOf2Type
        tool_id:
          type: string
      required:
        - type
        - tool_id
      title: BaseMessagesResultContentItemsOneOf4Caller2
    BaseMessagesResultContentItemsOneOf4Caller:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf4Caller0'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf4Caller1'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf4Caller2'
      title: BaseMessagesResultContentItemsOneOf4Caller
    BaseMessagesResultContentItemsOneOf4Name:
      type: string
      enum:
        - web_search
        - web_fetch
        - code_execution
        - bash_code_execution
        - text_editor_code_execution
        - tool_search_tool_regex
        - tool_search_tool_bm25
      title: BaseMessagesResultContentItemsOneOf4Name
    BaseMessagesResultContentItems4:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf4Type'
        id:
          type: string
        caller:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf4Caller'
        name:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf4Name'
        input:
          oneOf:
            - description: Any type
            - type: 'null'
      required:
        - type
        - id
        - caller
        - name
      title: BaseMessagesResultContentItems4
    BaseMessagesResultContentItemsOneOf5Type:
      type: string
      enum:
        - web_search_tool_result
      title: BaseMessagesResultContentItemsOneOf5Type
    BaseMessagesResultContentItemsOneOf5CallerOneOf0Type:
      type: string
      enum:
        - direct
      title: BaseMessagesResultContentItemsOneOf5CallerOneOf0Type
    BaseMessagesResultContentItemsOneOf5Caller0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf5CallerOneOf0Type
      required:
        - type
      title: BaseMessagesResultContentItemsOneOf5Caller0
    BaseMessagesResultContentItemsOneOf5CallerOneOf1Type:
      type: string
      enum:
        - code_execution_20250825
      title: BaseMessagesResultContentItemsOneOf5CallerOneOf1Type
    BaseMessagesResultContentItemsOneOf5Caller1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf5CallerOneOf1Type
        tool_id:
          type: string
      required:
        - type
        - tool_id
      title: BaseMessagesResultContentItemsOneOf5Caller1
    BaseMessagesResultContentItemsOneOf5CallerOneOf2Type:
      type: string
      enum:
        - code_execution_20260120
      title: BaseMessagesResultContentItemsOneOf5CallerOneOf2Type
    BaseMessagesResultContentItemsOneOf5Caller2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf5CallerOneOf2Type
        tool_id:
          type: string
      required:
        - type
        - tool_id
      title: BaseMessagesResultContentItemsOneOf5Caller2
    BaseMessagesResultContentItemsOneOf5Caller:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf5Caller0'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf5Caller1'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf5Caller2'
      title: BaseMessagesResultContentItemsOneOf5Caller
    BaseMessagesResultContentItemsOneOf5ContentOneOf0ItemsType:
      type: string
      enum:
        - web_search_result
      title: BaseMessagesResultContentItemsOneOf5ContentOneOf0ItemsType
    BaseMessagesResultContentItemsOneOf5ContentOneOf0Items:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf5ContentOneOf0ItemsType
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
      title: BaseMessagesResultContentItemsOneOf5ContentOneOf0Items
    BaseMessagesResultContentItemsOneOf5Content0:
      type: array
      items:
        $ref: >-
          #/components/schemas/BaseMessagesResultContentItemsOneOf5ContentOneOf0Items
      title: BaseMessagesResultContentItemsOneOf5Content0
    BaseMessagesResultContentItemsOneOf5ContentOneOf1Type:
      type: string
      enum:
        - web_search_tool_result_error
      title: BaseMessagesResultContentItemsOneOf5ContentOneOf1Type
    BaseMessagesResultContentItemsOneOf5ContentOneOf1ErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - max_uses_exceeded
        - too_many_requests
        - query_too_long
        - request_too_large
      title: BaseMessagesResultContentItemsOneOf5ContentOneOf1ErrorCode
    BaseMessagesResultContentItemsOneOf5Content1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf5ContentOneOf1Type
        error_code:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf5ContentOneOf1ErrorCode
      required:
        - type
        - error_code
      title: BaseMessagesResultContentItemsOneOf5Content1
    BaseMessagesResultContentItemsOneOf5Content:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf5Content0'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf5Content1'
      title: BaseMessagesResultContentItemsOneOf5Content
    BaseMessagesResultContentItems5:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf5Type'
        caller:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf5Caller'
        tool_use_id:
          type: string
        content:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf5Content'
      required:
        - type
        - caller
        - tool_use_id
        - content
      title: BaseMessagesResultContentItems5
    BaseMessagesResultContentItemsOneOf6Type:
      type: string
      enum:
        - web_fetch_tool_result
      title: BaseMessagesResultContentItemsOneOf6Type
    BaseMessagesResultContentItemsOneOf6CallerOneOf0Type:
      type: string
      enum:
        - direct
      title: BaseMessagesResultContentItemsOneOf6CallerOneOf0Type
    BaseMessagesResultContentItemsOneOf6Caller0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6CallerOneOf0Type
      required:
        - type
      title: BaseMessagesResultContentItemsOneOf6Caller0
    BaseMessagesResultContentItemsOneOf6CallerOneOf1Type:
      type: string
      enum:
        - code_execution_20250825
      title: BaseMessagesResultContentItemsOneOf6CallerOneOf1Type
    BaseMessagesResultContentItemsOneOf6Caller1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6CallerOneOf1Type
        tool_id:
          type: string
      required:
        - type
        - tool_id
      title: BaseMessagesResultContentItemsOneOf6Caller1
    BaseMessagesResultContentItemsOneOf6CallerOneOf2Type:
      type: string
      enum:
        - code_execution_20260120
      title: BaseMessagesResultContentItemsOneOf6CallerOneOf2Type
    BaseMessagesResultContentItemsOneOf6Caller2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6CallerOneOf2Type
        tool_id:
          type: string
      required:
        - type
        - tool_id
      title: BaseMessagesResultContentItemsOneOf6Caller2
    BaseMessagesResultContentItemsOneOf6Caller:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf6Caller0'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf6Caller1'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf6Caller2'
      title: BaseMessagesResultContentItemsOneOf6Caller
    BaseMessagesResultContentItemsOneOf6ContentOneOf0Type:
      type: string
      enum:
        - web_fetch_tool_result_error
      title: BaseMessagesResultContentItemsOneOf6ContentOneOf0Type
    BaseMessagesResultContentItemsOneOf6ContentOneOf0ErrorCode:
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
      title: BaseMessagesResultContentItemsOneOf6ContentOneOf0ErrorCode
    BaseMessagesResultContentItemsOneOf6Content0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf0Type
        error_code:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf0ErrorCode
      required:
        - type
        - error_code
      title: BaseMessagesResultContentItemsOneOf6Content0
    BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentCitations:
      type: object
      properties:
        enabled:
          type: boolean
      required:
        - enabled
      title: BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentCitations
    BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf0MediaType:
      type: string
      enum:
        - application/pdf
      title: >-
        BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf0MediaType
    BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf0Type:
      type: string
      enum:
        - base64
      title: BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf0Type
    BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSource0:
      type: object
      properties:
        data:
          type: string
        media_type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf0MediaType
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf0Type
      required:
        - data
        - media_type
        - type
      title: BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSource0
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
    BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSource:
      oneOf:
        - $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSource0
        - $ref: '#/components/schemas/AnthropicPlainTextSourceResponse'
      title: BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSource
    BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentType:
      type: string
      enum:
        - document
      title: BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentType
    BaseMessagesResultContentItemsOneOf6ContentOneOf1Content:
      type: object
      properties:
        citations:
          oneOf:
            - $ref: >-
                #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentCitations
            - type: 'null'
        source:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSource
        title:
          type:
            - string
            - 'null'
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentType
      required:
        - citations
        - source
        - title
        - type
      title: BaseMessagesResultContentItemsOneOf6ContentOneOf1Content
    BaseMessagesResultContentItemsOneOf6ContentOneOf1Type:
      type: string
      enum:
        - web_fetch_result
      title: BaseMessagesResultContentItemsOneOf6ContentOneOf1Type
    BaseMessagesResultContentItemsOneOf6Content1:
      type: object
      properties:
        content:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1Content
        retrieved_at:
          type:
            - string
            - 'null'
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1Type
        url:
          type: string
      required:
        - content
        - retrieved_at
        - type
        - url
      title: BaseMessagesResultContentItemsOneOf6Content1
    BaseMessagesResultContentItemsOneOf6Content:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf6Content0'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf6Content1'
      title: BaseMessagesResultContentItemsOneOf6Content
    BaseMessagesResultContentItems6:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf6Type'
        caller:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf6Caller'
        content:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf6Content'
        tool_use_id:
          type: string
      required:
        - type
        - caller
        - content
        - tool_use_id
      title: BaseMessagesResultContentItems6
    BaseMessagesResultContentItemsOneOf7Type:
      type: string
      enum:
        - code_execution_tool_result
      title: BaseMessagesResultContentItemsOneOf7Type
    BaseMessagesResultContentItemsOneOf7ContentOneOf0ErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - too_many_requests
        - execution_time_exceeded
      title: BaseMessagesResultContentItemsOneOf7ContentOneOf0ErrorCode
    BaseMessagesResultContentItemsOneOf7ContentOneOf0Type:
      type: string
      enum:
        - code_execution_tool_result_error
      title: BaseMessagesResultContentItemsOneOf7ContentOneOf0Type
    BaseMessagesResultContentItemsOneOf7Content0:
      type: object
      properties:
        error_code:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf7ContentOneOf0ErrorCode
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf7ContentOneOf0Type
      required:
        - error_code
        - type
      title: BaseMessagesResultContentItemsOneOf7Content0
    BaseMessagesResultContentItemsOneOf7ContentOneOf1ContentItemsType:
      type: string
      enum:
        - code_execution_output
      title: BaseMessagesResultContentItemsOneOf7ContentOneOf1ContentItemsType
    BaseMessagesResultContentItemsOneOf7ContentOneOf1ContentItems:
      type: object
      properties:
        file_id:
          type: string
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf7ContentOneOf1ContentItemsType
      required:
        - file_id
        - type
      title: BaseMessagesResultContentItemsOneOf7ContentOneOf1ContentItems
    BaseMessagesResultContentItemsOneOf7ContentOneOf1Type:
      type: string
      enum:
        - code_execution_result
      title: BaseMessagesResultContentItemsOneOf7ContentOneOf1Type
    BaseMessagesResultContentItemsOneOf7Content1:
      type: object
      properties:
        content:
          type: array
          items:
            $ref: >-
              #/components/schemas/BaseMessagesResultContentItemsOneOf7ContentOneOf1ContentItems
        return_code:
          type: integer
        stderr:
          type: string
        stdout:
          type: string
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf7ContentOneOf1Type
      required:
        - content
        - return_code
        - stderr
        - stdout
        - type
      title: BaseMessagesResultContentItemsOneOf7Content1
    BaseMessagesResultContentItemsOneOf7ContentOneOf2ContentItemsType:
      type: string
      enum:
        - code_execution_output
      title: BaseMessagesResultContentItemsOneOf7ContentOneOf2ContentItemsType
    BaseMessagesResultContentItemsOneOf7ContentOneOf2ContentItems:
      type: object
      properties:
        file_id:
          type: string
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf7ContentOneOf2ContentItemsType
      required:
        - file_id
        - type
      title: BaseMessagesResultContentItemsOneOf7ContentOneOf2ContentItems
    BaseMessagesResultContentItemsOneOf7ContentOneOf2Type:
      type: string
      enum:
        - encrypted_code_execution_result
      title: BaseMessagesResultContentItemsOneOf7ContentOneOf2Type
    BaseMessagesResultContentItemsOneOf7Content2:
      type: object
      properties:
        content:
          type: array
          items:
            $ref: >-
              #/components/schemas/BaseMessagesResultContentItemsOneOf7ContentOneOf2ContentItems
        encrypted_stdout:
          type: string
        return_code:
          type: integer
        stderr:
          type: string
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf7ContentOneOf2Type
      required:
        - content
        - encrypted_stdout
        - return_code
        - stderr
        - type
      title: BaseMessagesResultContentItemsOneOf7Content2
    BaseMessagesResultContentItemsOneOf7Content:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf7Content0'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf7Content1'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf7Content2'
      title: BaseMessagesResultContentItemsOneOf7Content
    BaseMessagesResultContentItems7:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf7Type'
        content:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf7Content'
        tool_use_id:
          type: string
      required:
        - type
        - content
        - tool_use_id
      title: BaseMessagesResultContentItems7
    BaseMessagesResultContentItemsOneOf8Type:
      type: string
      enum:
        - bash_code_execution_tool_result
      title: BaseMessagesResultContentItemsOneOf8Type
    BaseMessagesResultContentItemsOneOf8ContentOneOf0ErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - too_many_requests
        - execution_time_exceeded
        - output_file_too_large
      title: BaseMessagesResultContentItemsOneOf8ContentOneOf0ErrorCode
    BaseMessagesResultContentItemsOneOf8ContentOneOf0Type:
      type: string
      enum:
        - bash_code_execution_tool_result_error
      title: BaseMessagesResultContentItemsOneOf8ContentOneOf0Type
    BaseMessagesResultContentItemsOneOf8Content0:
      type: object
      properties:
        error_code:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf8ContentOneOf0ErrorCode
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf8ContentOneOf0Type
      required:
        - error_code
        - type
      title: BaseMessagesResultContentItemsOneOf8Content0
    BaseMessagesResultContentItemsOneOf8ContentOneOf1ContentItemsType:
      type: string
      enum:
        - bash_code_execution_output
      title: BaseMessagesResultContentItemsOneOf8ContentOneOf1ContentItemsType
    BaseMessagesResultContentItemsOneOf8ContentOneOf1ContentItems:
      type: object
      properties:
        file_id:
          type: string
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf8ContentOneOf1ContentItemsType
      required:
        - file_id
        - type
      title: BaseMessagesResultContentItemsOneOf8ContentOneOf1ContentItems
    BaseMessagesResultContentItemsOneOf8ContentOneOf1Type:
      type: string
      enum:
        - bash_code_execution_result
      title: BaseMessagesResultContentItemsOneOf8ContentOneOf1Type
    BaseMessagesResultContentItemsOneOf8Content1:
      type: object
      properties:
        content:
          type: array
          items:
            $ref: >-
              #/components/schemas/BaseMessagesResultContentItemsOneOf8ContentOneOf1ContentItems
        return_code:
          type: integer
        stderr:
          type: string
        stdout:
          type: string
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf8ContentOneOf1Type
      required:
        - content
        - return_code
        - stderr
        - stdout
        - type
      title: BaseMessagesResultContentItemsOneOf8Content1
    BaseMessagesResultContentItemsOneOf8Content:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf8Content0'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf8Content1'
      title: BaseMessagesResultContentItemsOneOf8Content
    BaseMessagesResultContentItems8:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf8Type'
        content:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf8Content'
        tool_use_id:
          type: string
      required:
        - type
        - content
        - tool_use_id
      title: BaseMessagesResultContentItems8
    BaseMessagesResultContentItemsOneOf9Type:
      type: string
      enum:
        - text_editor_code_execution_tool_result
      title: BaseMessagesResultContentItemsOneOf9Type
    BaseMessagesResultContentItemsOneOf9ContentOneOf0ErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - too_many_requests
        - execution_time_exceeded
        - file_not_found
      title: BaseMessagesResultContentItemsOneOf9ContentOneOf0ErrorCode
    BaseMessagesResultContentItemsOneOf9ContentOneOf0Type:
      type: string
      enum:
        - text_editor_code_execution_tool_result_error
      title: BaseMessagesResultContentItemsOneOf9ContentOneOf0Type
    BaseMessagesResultContentItemsOneOf9Content0:
      type: object
      properties:
        error_code:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf9ContentOneOf0ErrorCode
        error_message:
          type:
            - string
            - 'null'
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf9ContentOneOf0Type
      required:
        - error_code
        - error_message
        - type
      title: BaseMessagesResultContentItemsOneOf9Content0
    BaseMessagesResultContentItemsOneOf9ContentOneOf1FileType:
      type: string
      enum:
        - text
        - image
        - pdf
      title: BaseMessagesResultContentItemsOneOf9ContentOneOf1FileType
    BaseMessagesResultContentItemsOneOf9ContentOneOf1Type:
      type: string
      enum:
        - text_editor_code_execution_view_result
      title: BaseMessagesResultContentItemsOneOf9ContentOneOf1Type
    BaseMessagesResultContentItemsOneOf9Content1:
      type: object
      properties:
        content:
          type: string
        file_type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf9ContentOneOf1FileType
        num_lines:
          type:
            - integer
            - 'null'
        start_line:
          type:
            - integer
            - 'null'
        total_lines:
          type:
            - integer
            - 'null'
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf9ContentOneOf1Type
      required:
        - content
        - file_type
        - num_lines
        - start_line
        - total_lines
        - type
      title: BaseMessagesResultContentItemsOneOf9Content1
    BaseMessagesResultContentItemsOneOf9ContentOneOf2Type:
      type: string
      enum:
        - text_editor_code_execution_create_result
      title: BaseMessagesResultContentItemsOneOf9ContentOneOf2Type
    BaseMessagesResultContentItemsOneOf9Content2:
      type: object
      properties:
        is_file_update:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf9ContentOneOf2Type
      required:
        - is_file_update
        - type
      title: BaseMessagesResultContentItemsOneOf9Content2
    BaseMessagesResultContentItemsOneOf9ContentOneOf3Type:
      type: string
      enum:
        - text_editor_code_execution_str_replace_result
      title: BaseMessagesResultContentItemsOneOf9ContentOneOf3Type
    BaseMessagesResultContentItemsOneOf9Content3:
      type: object
      properties:
        lines:
          type:
            - array
            - 'null'
          items:
            type: string
        new_lines:
          type:
            - integer
            - 'null'
        new_start:
          type:
            - integer
            - 'null'
        old_lines:
          type:
            - integer
            - 'null'
        old_start:
          type:
            - integer
            - 'null'
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf9ContentOneOf3Type
      required:
        - lines
        - new_lines
        - new_start
        - old_lines
        - old_start
        - type
      title: BaseMessagesResultContentItemsOneOf9Content3
    BaseMessagesResultContentItemsOneOf9Content:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf9Content0'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf9Content1'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf9Content2'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf9Content3'
      title: BaseMessagesResultContentItemsOneOf9Content
    BaseMessagesResultContentItems9:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf9Type'
        content:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf9Content'
        tool_use_id:
          type: string
      required:
        - type
        - content
        - tool_use_id
      title: BaseMessagesResultContentItems9
    BaseMessagesResultContentItemsOneOf10Type:
      type: string
      enum:
        - tool_search_tool_result
      title: BaseMessagesResultContentItemsOneOf10Type
    BaseMessagesResultContentItemsOneOf10ContentOneOf0ErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - too_many_requests
        - execution_time_exceeded
      title: BaseMessagesResultContentItemsOneOf10ContentOneOf0ErrorCode
    BaseMessagesResultContentItemsOneOf10ContentOneOf0Type:
      type: string
      enum:
        - tool_search_tool_result_error
      title: BaseMessagesResultContentItemsOneOf10ContentOneOf0Type
    BaseMessagesResultContentItemsOneOf10Content0:
      type: object
      properties:
        error_code:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf10ContentOneOf0ErrorCode
        error_message:
          type:
            - string
            - 'null'
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf10ContentOneOf0Type
      required:
        - error_code
        - error_message
        - type
      title: BaseMessagesResultContentItemsOneOf10Content0
    BaseMessagesResultContentItemsOneOf10ContentOneOf1ToolReferencesItemsType:
      type: string
      enum:
        - tool_reference
      title: >-
        BaseMessagesResultContentItemsOneOf10ContentOneOf1ToolReferencesItemsType
    BaseMessagesResultContentItemsOneOf10ContentOneOf1ToolReferencesItems:
      type: object
      properties:
        tool_name:
          type: string
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf10ContentOneOf1ToolReferencesItemsType
      required:
        - tool_name
        - type
      title: BaseMessagesResultContentItemsOneOf10ContentOneOf1ToolReferencesItems
    BaseMessagesResultContentItemsOneOf10ContentOneOf1Type:
      type: string
      enum:
        - tool_search_tool_search_result
      title: BaseMessagesResultContentItemsOneOf10ContentOneOf1Type
    BaseMessagesResultContentItemsOneOf10Content1:
      type: object
      properties:
        tool_references:
          type: array
          items:
            $ref: >-
              #/components/schemas/BaseMessagesResultContentItemsOneOf10ContentOneOf1ToolReferencesItems
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf10ContentOneOf1Type
      required:
        - tool_references
        - type
      title: BaseMessagesResultContentItemsOneOf10Content1
    BaseMessagesResultContentItemsOneOf10Content:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf10Content0'
        - $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf10Content1'
      title: BaseMessagesResultContentItemsOneOf10Content
    BaseMessagesResultContentItems10:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf10Type'
        content:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf10Content'
        tool_use_id:
          type: string
      required:
        - type
        - content
        - tool_use_id
      title: BaseMessagesResultContentItems10
    BaseMessagesResultContentItemsOneOf11Type:
      type: string
      enum:
        - container_upload
      title: BaseMessagesResultContentItemsOneOf11Type
    BaseMessagesResultContentItems11:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf11Type'
        file_id:
          type: string
      required:
        - type
        - file_id
      title: BaseMessagesResultContentItems11
    BaseMessagesResultContentItemsOneOf12Type:
      type: string
      enum:
        - compaction
      title: BaseMessagesResultContentItemsOneOf12Type
    BaseMessagesResultContentItems12:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseMessagesResultContentItemsOneOf12Type'
        content:
          type:
            - string
            - 'null'
      required:
        - type
        - content
      title: BaseMessagesResultContentItems12
    BaseMessagesResultContentItems:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultContentItems0'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems1'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems2'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems3'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems4'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems5'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems6'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems7'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems8'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems9'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems10'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems11'
        - $ref: '#/components/schemas/BaseMessagesResultContentItems12'
      title: BaseMessagesResultContentItems
    BaseMessagesResultStopReason:
      type: string
      enum:
        - end_turn
        - max_tokens
        - stop_sequence
        - tool_use
        - pause_turn
        - refusal
        - compaction
      title: BaseMessagesResultStopReason
    BaseMessagesResultUsageCacheCreation:
      type: object
      properties:
        ephemeral_5m_input_tokens:
          type: integer
        ephemeral_1h_input_tokens:
          type: integer
      required:
        - ephemeral_5m_input_tokens
        - ephemeral_1h_input_tokens
      title: BaseMessagesResultUsageCacheCreation
    BaseMessagesResultUsageServerToolUse:
      type: object
      properties:
        web_search_requests:
          type: integer
        web_fetch_requests:
          type: integer
      required:
        - web_search_requests
        - web_fetch_requests
      title: BaseMessagesResultUsageServerToolUse
    BaseMessagesResultUsageServiceTier:
      type: string
      enum:
        - standard
        - priority
        - batch
      title: BaseMessagesResultUsageServiceTier
    BaseMessagesResultUsageSpeed:
      type: string
      enum:
        - fast
        - standard
      title: BaseMessagesResultUsageSpeed
    BaseMessagesResultUsageIterationsItemsOneOf0CacheCreation:
      type: object
      properties:
        ephemeral_5m_input_tokens:
          type: integer
          default: 0
        ephemeral_1h_input_tokens:
          type: integer
          default: 0
      title: BaseMessagesResultUsageIterationsItemsOneOf0CacheCreation
    BaseMessagesResultUsageIterationsItemsOneOf0Type:
      type: string
      enum:
        - compaction
      title: BaseMessagesResultUsageIterationsItemsOneOf0Type
    BaseMessagesResultUsageIterationsItems0:
      type: object
      properties:
        input_tokens:
          type: integer
          default: 0
        output_tokens:
          type: integer
          default: 0
        cache_creation_input_tokens:
          type: integer
          default: 0
        cache_read_input_tokens:
          type: integer
          default: 0
        cache_creation:
          oneOf:
            - $ref: >-
                #/components/schemas/BaseMessagesResultUsageIterationsItemsOneOf0CacheCreation
            - type: 'null'
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultUsageIterationsItemsOneOf0Type
      required:
        - type
      title: BaseMessagesResultUsageIterationsItems0
    BaseMessagesResultUsageIterationsItemsOneOf1CacheCreation:
      type: object
      properties:
        ephemeral_5m_input_tokens:
          type: integer
          default: 0
        ephemeral_1h_input_tokens:
          type: integer
          default: 0
      title: BaseMessagesResultUsageIterationsItemsOneOf1CacheCreation
    BaseMessagesResultUsageIterationsItemsOneOf1Type:
      type: string
      enum:
        - message
      title: BaseMessagesResultUsageIterationsItemsOneOf1Type
    BaseMessagesResultUsageIterationsItems1:
      type: object
      properties:
        input_tokens:
          type: integer
          default: 0
        output_tokens:
          type: integer
          default: 0
        cache_creation_input_tokens:
          type: integer
          default: 0
        cache_read_input_tokens:
          type: integer
          default: 0
        cache_creation:
          oneOf:
            - $ref: >-
                #/components/schemas/BaseMessagesResultUsageIterationsItemsOneOf1CacheCreation
            - type: 'null'
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultUsageIterationsItemsOneOf1Type
      required:
        - type
      title: BaseMessagesResultUsageIterationsItems1
    BaseMessagesResultUsageIterationsItemsOneOf2CacheCreation:
      type: object
      properties:
        ephemeral_5m_input_tokens:
          type: integer
          default: 0
        ephemeral_1h_input_tokens:
          type: integer
          default: 0
      title: BaseMessagesResultUsageIterationsItemsOneOf2CacheCreation
    BaseMessagesResultUsageIterationsItems2:
      type: object
      properties:
        input_tokens:
          type: integer
          default: 0
        output_tokens:
          type: integer
          default: 0
        cache_creation_input_tokens:
          type: integer
          default: 0
        cache_read_input_tokens:
          type: integer
          default: 0
        cache_creation:
          oneOf:
            - $ref: >-
                #/components/schemas/BaseMessagesResultUsageIterationsItemsOneOf2CacheCreation
            - type: 'null'
        type:
          type: string
      required:
        - type
      title: BaseMessagesResultUsageIterationsItems2
    BaseMessagesResultUsageIterationsItems:
      oneOf:
        - $ref: '#/components/schemas/BaseMessagesResultUsageIterationsItems0'
        - $ref: '#/components/schemas/BaseMessagesResultUsageIterationsItems1'
        - $ref: '#/components/schemas/BaseMessagesResultUsageIterationsItems2'
      title: BaseMessagesResultUsageIterationsItems
    BaseMessagesResultUsage:
      type: object
      properties:
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        cache_creation_input_tokens:
          type:
            - integer
            - 'null'
        cache_read_input_tokens:
          type:
            - integer
            - 'null'
        cache_creation:
          oneOf:
            - $ref: '#/components/schemas/BaseMessagesResultUsageCacheCreation'
            - type: 'null'
        inference_geo:
          type:
            - string
            - 'null'
        server_tool_use:
          oneOf:
            - $ref: '#/components/schemas/BaseMessagesResultUsageServerToolUse'
            - type: 'null'
        service_tier:
          oneOf:
            - $ref: '#/components/schemas/BaseMessagesResultUsageServiceTier'
            - type: 'null'
        speed:
          oneOf:
            - $ref: '#/components/schemas/BaseMessagesResultUsageSpeed'
            - type: 'null'
        iterations:
          type: array
          items:
            $ref: '#/components/schemas/BaseMessagesResultUsageIterationsItems'
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
    MessagesResultUsageCacheCreation:
      type: object
      properties:
        ephemeral_5m_input_tokens:
          type: integer
        ephemeral_1h_input_tokens:
          type: integer
      required:
        - ephemeral_5m_input_tokens
        - ephemeral_1h_input_tokens
      title: MessagesResultUsageCacheCreation
    MessagesResultUsageServerToolUse:
      type: object
      properties:
        web_search_requests:
          type: integer
        web_fetch_requests:
          type: integer
      required:
        - web_search_requests
        - web_fetch_requests
      title: MessagesResultUsageServerToolUse
    MessagesResultUsageSpeed:
      type: string
      enum:
        - fast
        - standard
      title: MessagesResultUsageSpeed
    MessagesResultUsageIterationsItemsOneOf0CacheCreation:
      type: object
      properties:
        ephemeral_5m_input_tokens:
          type: integer
          default: 0
        ephemeral_1h_input_tokens:
          type: integer
          default: 0
      title: MessagesResultUsageIterationsItemsOneOf0CacheCreation
    MessagesResultUsageIterationsItemsOneOf0Type:
      type: string
      enum:
        - compaction
      title: MessagesResultUsageIterationsItemsOneOf0Type
    MessagesResultUsageIterationsItems0:
      type: object
      properties:
        input_tokens:
          type: integer
          default: 0
        output_tokens:
          type: integer
          default: 0
        cache_creation_input_tokens:
          type: integer
          default: 0
        cache_read_input_tokens:
          type: integer
          default: 0
        cache_creation:
          oneOf:
            - $ref: >-
                #/components/schemas/MessagesResultUsageIterationsItemsOneOf0CacheCreation
            - type: 'null'
        type:
          $ref: '#/components/schemas/MessagesResultUsageIterationsItemsOneOf0Type'
      required:
        - type
      title: MessagesResultUsageIterationsItems0
    MessagesResultUsageIterationsItemsOneOf1CacheCreation:
      type: object
      properties:
        ephemeral_5m_input_tokens:
          type: integer
          default: 0
        ephemeral_1h_input_tokens:
          type: integer
          default: 0
      title: MessagesResultUsageIterationsItemsOneOf1CacheCreation
    MessagesResultUsageIterationsItemsOneOf1Type:
      type: string
      enum:
        - message
      title: MessagesResultUsageIterationsItemsOneOf1Type
    MessagesResultUsageIterationsItems1:
      type: object
      properties:
        input_tokens:
          type: integer
          default: 0
        output_tokens:
          type: integer
          default: 0
        cache_creation_input_tokens:
          type: integer
          default: 0
        cache_read_input_tokens:
          type: integer
          default: 0
        cache_creation:
          oneOf:
            - $ref: >-
                #/components/schemas/MessagesResultUsageIterationsItemsOneOf1CacheCreation
            - type: 'null'
        type:
          $ref: '#/components/schemas/MessagesResultUsageIterationsItemsOneOf1Type'
      required:
        - type
      title: MessagesResultUsageIterationsItems1
    MessagesResultUsageIterationsItemsOneOf2CacheCreation:
      type: object
      properties:
        ephemeral_5m_input_tokens:
          type: integer
          default: 0
        ephemeral_1h_input_tokens:
          type: integer
          default: 0
      title: MessagesResultUsageIterationsItemsOneOf2CacheCreation
    MessagesResultUsageIterationsItems2:
      type: object
      properties:
        input_tokens:
          type: integer
          default: 0
        output_tokens:
          type: integer
          default: 0
        cache_creation_input_tokens:
          type: integer
          default: 0
        cache_read_input_tokens:
          type: integer
          default: 0
        cache_creation:
          oneOf:
            - $ref: >-
                #/components/schemas/MessagesResultUsageIterationsItemsOneOf2CacheCreation
            - type: 'null'
        type:
          type: string
      required:
        - type
      title: MessagesResultUsageIterationsItems2
    MessagesResultUsageIterationsItems:
      oneOf:
        - $ref: '#/components/schemas/MessagesResultUsageIterationsItems0'
        - $ref: '#/components/schemas/MessagesResultUsageIterationsItems1'
        - $ref: '#/components/schemas/MessagesResultUsageIterationsItems2'
      title: MessagesResultUsageIterationsItems
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
          type:
            - integer
            - 'null'
        cache_read_input_tokens:
          type:
            - integer
            - 'null'
        cache_creation:
          oneOf:
            - $ref: '#/components/schemas/MessagesResultUsageCacheCreation'
            - type: 'null'
        inference_geo:
          type:
            - string
            - 'null'
        server_tool_use:
          oneOf:
            - $ref: '#/components/schemas/MessagesResultUsageServerToolUse'
            - type: 'null'
        service_tier:
          type:
            - string
            - 'null'
        speed:
          oneOf:
            - $ref: '#/components/schemas/MessagesResultUsageSpeed'
            - type: 'null'
        iterations:
          type: array
          items:
            $ref: '#/components/schemas/MessagesResultUsageIterationsItems'
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
    MessagesResultProvider:
      type: string
      enum:
        - AnyScale
        - Atoma
        - Cent-ML
        - CrofAI
        - Enfer
        - GoPomelo
        - HuggingFace
        - Hyperbolic 2
        - InoCloud
        - Kluster
        - Lambda
        - Lepton
        - Lynn 2
        - Lynn
        - Mancer
        - Meta
        - Modal
        - Nineteen
        - OctoAI
        - Recursal
        - Reflection
        - Replicate
        - SambaNova 2
        - SF Compute
        - Targon
        - Together 2
        - Ubicloud
        - 01.AI
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
      title: MessagesResultProvider
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
          oneOf:
            - $ref: '#/components/schemas/BaseMessagesResultContainer'
            - type: 'null'
        content:
          type: array
          items:
            $ref: '#/components/schemas/BaseMessagesResultContentItems'
        model:
          type: string
        stop_reason:
          oneOf:
            - $ref: '#/components/schemas/BaseMessagesResultStopReason'
            - type: 'null'
        stop_sequence:
          type:
            - string
            - 'null'
        usage:
          $ref: '#/components/schemas/MessagesResultUsage'
        provider:
          $ref: '#/components/schemas/MessagesResultProvider'
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