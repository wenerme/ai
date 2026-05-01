> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Create a message

POST https://openrouter.ai/api/v1//messages
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
  //messages:
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
    AnthropicCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: AnthropicCacheControlTtl
    AnthropicCacheControlDirectiveType:
      type: string
      enum:
        - ephemeral
      title: AnthropicCacheControlDirectiveType
    AnthropicCacheControlDirective:
      type: object
      properties:
        ttl:
          $ref: '#/components/schemas/AnthropicCacheControlTtl'
        type:
          $ref: '#/components/schemas/AnthropicCacheControlDirectiveType'
      required:
        - type
      title: AnthropicCacheControlDirective
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
    MessagesRequestContextManagementEditsItemsOneOf0Trigger:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_tokens
              description: 'Discriminator value: input_tokens'
            value:
              type: integer
          required:
            - type
            - value
          description: input_tokens variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - tool_uses
              description: 'Discriminator value: tool_uses'
            value:
              type: integer
          required:
            - type
            - value
          description: tool_uses variant
      discriminator:
        propertyName: type
      title: MessagesRequestContextManagementEditsItemsOneOf0Trigger
    MessagesRequestContextManagementEditsItemsOneOf0Type:
      type: string
      enum:
        - clear_tool_uses_20250919
      title: MessagesRequestContextManagementEditsItemsOneOf0Type
    MessagesRequestContextManagementEditsItems0:
      type: object
      properties:
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
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0Type
      required:
        - type
      title: MessagesRequestContextManagementEditsItems0
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
    MessagesRequestContextManagementEditsItemsOneOf1Type:
      type: string
      enum:
        - clear_thinking_20251015
      title: MessagesRequestContextManagementEditsItemsOneOf1Type
    MessagesRequestContextManagementEditsItems1:
      type: object
      properties:
        keep:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf1Keep
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf1Type
      required:
        - type
      title: MessagesRequestContextManagementEditsItems1
    MessagesRequestContextManagementEditsItemsOneOf2TriggerType:
      type: string
      enum:
        - input_tokens
      title: MessagesRequestContextManagementEditsItemsOneOf2TriggerType
    MessagesRequestContextManagementEditsItemsOneOf2Trigger:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf2TriggerType
        value:
          type: integer
      required:
        - type
        - value
      title: MessagesRequestContextManagementEditsItemsOneOf2Trigger
    MessagesRequestContextManagementEditsItemsOneOf2Type:
      type: string
      enum:
        - compact_20260112
      title: MessagesRequestContextManagementEditsItemsOneOf2Type
    MessagesRequestContextManagementEditsItems2:
      type: object
      properties:
        instructions:
          type:
            - string
            - 'null'
        pause_after_compaction:
          type: boolean
        trigger:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf2Trigger
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf2Type
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
    AnthropicTextBlockParamCitationsItems:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - char_location
              description: 'Discriminator value: char_location'
            cited_text:
              type: string
            document_index:
              type: integer
            document_title:
              type:
                - string
                - 'null'
            end_char_index:
              type: integer
            start_char_index:
              type: integer
          required:
            - type
            - cited_text
            - document_index
            - document_title
            - end_char_index
            - start_char_index
          description: char_location variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - content_block_location
              description: 'Discriminator value: content_block_location'
            cited_text:
              type: string
            document_index:
              type: integer
            document_title:
              type:
                - string
                - 'null'
            end_block_index:
              type: integer
            start_block_index:
              type: integer
          required:
            - type
            - cited_text
            - document_index
            - document_title
            - end_block_index
            - start_block_index
          description: content_block_location variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - page_location
              description: 'Discriminator value: page_location'
            cited_text:
              type: string
            document_index:
              type: integer
            document_title:
              type:
                - string
                - 'null'
            end_page_number:
              type: integer
            start_page_number:
              type: integer
          required:
            - type
            - cited_text
            - document_index
            - document_title
            - end_page_number
            - start_page_number
          description: page_location variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - search_result_location
              description: 'Discriminator value: search_result_location'
            cited_text:
              type: string
            end_block_index:
              type: integer
            search_result_index:
              type: integer
            source:
              type: string
            start_block_index:
              type: integer
            title:
              type:
                - string
                - 'null'
          required:
            - type
            - cited_text
            - end_block_index
            - search_result_index
            - source
            - start_block_index
            - title
          description: search_result_location variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - web_search_result_location
              description: 'Discriminator value: web_search_result_location'
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
          description: web_search_result_location variant
      discriminator:
        propertyName: type
      title: AnthropicTextBlockParamCitationsItems
    AnthropicTextBlockParamType:
      type: string
      enum:
        - text
      title: AnthropicTextBlockParamType
    AnthropicTextBlockParam:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/AnthropicTextBlockParamCitationsItems'
        text:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicTextBlockParamType'
      required:
        - text
        - type
      title: AnthropicTextBlockParam
    AnthropicImageMimeType:
      type: string
      enum:
        - image/jpeg
        - image/png
        - image/gif
        - image/webp
      title: AnthropicImageMimeType
    AnthropicUrlImageSourceType:
      type: string
      enum:
        - url
      title: AnthropicUrlImageSourceType
    AnthropicImageBlockParamSource:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - base64
              description: 'Discriminator value: base64'
            data:
              type: string
            media_type:
              $ref: '#/components/schemas/AnthropicImageMimeType'
          required:
            - type
            - data
            - media_type
          description: base64 variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicUrlImageSourceType'
            url:
              type: string
          required:
            - type
            - url
          description: url variant
      discriminator:
        propertyName: type
      title: AnthropicImageBlockParamSource
    AnthropicImageBlockParamType:
      type: string
      enum:
        - image
      title: AnthropicImageBlockParamType
    AnthropicImageBlockParam:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        source:
          $ref: '#/components/schemas/AnthropicImageBlockParamSource'
        type:
          $ref: '#/components/schemas/AnthropicImageBlockParamType'
      required:
        - source
        - type
      title: AnthropicImageBlockParam
    AnthropicDocumentBlockParamCitations:
      type: object
      properties:
        enabled:
          type: boolean
      title: AnthropicDocumentBlockParamCitations
    AnthropicBase64PdfSourceMediaType:
      type: string
      enum:
        - application/pdf
      title: AnthropicBase64PdfSourceMediaType
    AnthropicBase64PdfSourceType:
      type: string
      enum:
        - base64
      title: AnthropicBase64PdfSourceType
    AnthropicBase64PdfSource:
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
      title: AnthropicBase64PdfSource
    AnthropicPlainTextSourceMediaType:
      type: string
      enum:
        - text/plain
      title: AnthropicPlainTextSourceMediaType
    AnthropicPlainTextSourceType:
      type: string
      enum:
        - text
      title: AnthropicPlainTextSourceType
    AnthropicPlainTextSource:
      type: object
      properties:
        data:
          type: string
        media_type:
          $ref: '#/components/schemas/AnthropicPlainTextSourceMediaType'
        type:
          $ref: '#/components/schemas/AnthropicPlainTextSourceType'
      required:
        - data
        - media_type
        - type
      title: AnthropicPlainTextSource
    AnthropicDocumentBlockParamSourceOneOf2ContentOneOf1Items:
      oneOf:
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicImageBlockParamType'
            cache_control:
              $ref: '#/components/schemas/AnthropicCacheControlDirective'
            source:
              $ref: '#/components/schemas/AnthropicImageBlockParamSource'
          required:
            - type
            - source
          description: image variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicTextBlockParamType'
            cache_control:
              $ref: '#/components/schemas/AnthropicCacheControlDirective'
            citations:
              type:
                - array
                - 'null'
              items:
                $ref: '#/components/schemas/AnthropicTextBlockParamCitationsItems'
            text:
              type: string
          required:
            - type
            - text
          description: text variant
      discriminator:
        propertyName: type
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
    AnthropicDocumentBlockParamSourceOneOf2Type:
      type: string
      enum:
        - content
      title: AnthropicDocumentBlockParamSourceOneOf2Type
    AnthropicDocumentBlockParamSource2:
      type: object
      properties:
        content:
          $ref: '#/components/schemas/AnthropicDocumentBlockParamSourceOneOf2Content'
        type:
          $ref: '#/components/schemas/AnthropicDocumentBlockParamSourceOneOf2Type'
      required:
        - content
        - type
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
    AnthropicDocumentBlockParamType:
      type: string
      enum:
        - document
      title: AnthropicDocumentBlockParamType
    AnthropicDocumentBlockParam:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        citations:
          oneOf:
            - $ref: '#/components/schemas/AnthropicDocumentBlockParamCitations'
            - type: 'null'
        context:
          type:
            - string
            - 'null'
        source:
          $ref: '#/components/schemas/AnthropicDocumentBlockParamSource'
        title:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/AnthropicDocumentBlockParamType'
      required:
        - source
        - type
      title: AnthropicDocumentBlockParam
    MessagesMessageParamContentOneOf1ItemsOneOf3Type:
      type: string
      enum:
        - tool_use
      title: MessagesMessageParamContentOneOf1ItemsOneOf3Type
    MessagesMessageParamContentOneOf1Items3:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        id:
          type: string
        input:
          oneOf:
            - description: Any type
            - type: 'null'
        name:
          type: string
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf3Type
      required:
        - id
        - name
        - type
      title: MessagesMessageParamContentOneOf1Items3
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf2Type:
      type: string
      enum:
        - tool_reference
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf2Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items2:
      type: object
      properties:
        tool_name:
          type: string
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf2Type
      required:
        - tool_name
        - type
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items2
    AnthropicSearchResultBlockParamCitations:
      type: object
      properties:
        enabled:
          type: boolean
      title: AnthropicSearchResultBlockParamCitations
    AnthropicSearchResultBlockParamType:
      type: string
      enum:
        - search_result
      title: AnthropicSearchResultBlockParamType
    AnthropicSearchResultBlockParam:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        citations:
          $ref: '#/components/schemas/AnthropicSearchResultBlockParamCitations'
        content:
          type: array
          items:
            $ref: '#/components/schemas/AnthropicTextBlockParam'
        source:
          type: string
        title:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicSearchResultBlockParamType'
      required:
        - content
        - source
        - title
        - type
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
    MessagesMessageParamContentOneOf1ItemsOneOf4Type:
      type: string
      enum:
        - tool_result
      title: MessagesMessageParamContentOneOf1ItemsOneOf4Type
    MessagesMessageParamContentOneOf1Items4:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        content:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4Content
        is_error:
          type: boolean
        tool_use_id:
          type: string
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4Type
      required:
        - tool_use_id
        - type
      title: MessagesMessageParamContentOneOf1Items4
    MessagesMessageParamContentOneOf1ItemsOneOf5Type:
      type: string
      enum:
        - thinking
      title: MessagesMessageParamContentOneOf1ItemsOneOf5Type
    MessagesMessageParamContentOneOf1Items5:
      type: object
      properties:
        signature:
          type: string
        thinking:
          type: string
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf5Type
      required:
        - signature
        - thinking
        - type
      title: MessagesMessageParamContentOneOf1Items5
    MessagesMessageParamContentOneOf1ItemsOneOf6Type:
      type: string
      enum:
        - redacted_thinking
      title: MessagesMessageParamContentOneOf1ItemsOneOf6Type
    MessagesMessageParamContentOneOf1Items6:
      type: object
      properties:
        data:
          type: string
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf6Type
      required:
        - data
        - type
      title: MessagesMessageParamContentOneOf1Items6
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
    MessagesMessageParamContentOneOf1ItemsOneOf7Type:
      type: string
      enum:
        - server_tool_use
      title: MessagesMessageParamContentOneOf1ItemsOneOf7Type
    MessagesMessageParamContentOneOf1Items7:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        id:
          type: string
        input:
          oneOf:
            - description: Any type
            - type: 'null'
        name:
          $ref: '#/components/schemas/AnthropicServerToolName'
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf7Type
      required:
        - id
        - name
        - type
      title: MessagesMessageParamContentOneOf1Items7
    AnthropicWebSearchResultBlockParamType:
      type: string
      enum:
        - web_search_result
      title: AnthropicWebSearchResultBlockParamType
    AnthropicWebSearchResultBlockParam:
      type: object
      properties:
        encrypted_content:
          type: string
        page_age:
          type:
            - string
            - 'null'
        title:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicWebSearchResultBlockParamType'
        url:
          type: string
      required:
        - encrypted_content
        - title
        - type
        - url
      title: AnthropicWebSearchResultBlockParam
    MessagesMessageParamContentOneOf1ItemsOneOf8Content0:
      type: array
      items:
        $ref: '#/components/schemas/AnthropicWebSearchResultBlockParam'
      title: MessagesMessageParamContentOneOf1ItemsOneOf8Content0
    MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1ErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - max_uses_exceeded
        - too_many_requests
        - query_too_long
      title: MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1ErrorCode
    MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1Type:
      type: string
      enum:
        - web_search_tool_result_error
      title: MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf8Content1:
      type: object
      properties:
        error_code:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1ErrorCode
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf1Type
      required:
        - error_code
        - type
      title: MessagesMessageParamContentOneOf1ItemsOneOf8Content1
    MessagesMessageParamContentOneOf1ItemsOneOf8Content:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8Content0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8Content1
      title: MessagesMessageParamContentOneOf1ItemsOneOf8Content
    MessagesMessageParamContentOneOf1ItemsOneOf8Type:
      type: string
      enum:
        - web_search_tool_result
      title: MessagesMessageParamContentOneOf1ItemsOneOf8Type
    MessagesMessageParamContentOneOf1Items8:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        content:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8Content
        tool_use_id:
          type: string
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8Type
      required:
        - content
        - tool_use_id
        - type
      title: MessagesMessageParamContentOneOf1Items8
    MessagesMessageParamContentOneOf1ItemsOneOf10Type:
      type: string
      enum:
        - compaction
      title: MessagesMessageParamContentOneOf1ItemsOneOf10Type
    MessagesMessageParamContentOneOf1Items10:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        content:
          type:
            - string
            - 'null'
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf10Type
      required:
        - content
        - type
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
    MessagesMessageParamRole:
      type: string
      enum:
        - user
        - assistant
      title: MessagesMessageParamRole
    MessagesMessageParam:
      type: object
      properties:
        content:
          $ref: '#/components/schemas/MessagesMessageParamContent'
        role:
          $ref: '#/components/schemas/MessagesMessageParamRole'
      required:
        - content
        - role
      description: Anthropic message with OpenRouter extensions
      title: MessagesMessageParam
    MessagesRequestMetadata:
      type: object
      properties:
        user_id:
          type:
            - string
            - 'null'
      title: MessagesRequestMetadata
    MessagesOutputConfigEffort:
      type: string
      enum:
        - low
        - medium
        - high
        - xhigh
        - max
      description: >-
        How much effort the model should put into its response. Higher effort
        levels may result in more thorough analysis but take longer. Valid
        values are `low`, `medium`, `high`, `xhigh`, or `max`.
      title: MessagesOutputConfigEffort
    MessagesOutputConfigFormatType:
      type: string
      enum:
        - json_schema
      title: MessagesOutputConfigFormatType
    MessagesOutputConfigFormat:
      type: object
      properties:
        schema:
          type: object
          additionalProperties:
            description: Any type
        type:
          $ref: '#/components/schemas/MessagesOutputConfigFormatType'
      required:
        - schema
        - type
      description: >-
        A schema to specify Claude's output format in responses. See [structured
        outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).
      title: MessagesOutputConfigFormat
    MessagesOutputConfigTaskBudgetType:
      type: string
      enum:
        - tokens
      title: MessagesOutputConfigTaskBudgetType
    MessagesOutputConfigTaskBudget:
      type: object
      properties:
        remaining:
          type:
            - integer
            - 'null'
        total:
          type: integer
        type:
          $ref: '#/components/schemas/MessagesOutputConfigTaskBudgetType'
      required:
        - total
        - type
      description: >-
        Task budget for an agentic turn. The model sees a countdown of remaining
        tokens and uses it to prioritize work and wind down gracefully. Advisory
        — does not enforce a hard cap.
      title: MessagesOutputConfigTaskBudget
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
            Valid values are `low`, `medium`, `high`, `xhigh`, or `max`.
        format:
          oneOf:
            - $ref: '#/components/schemas/MessagesOutputConfigFormat'
            - type: 'null'
          description: >-
            A schema to specify Claude's output format in responses. See
            [structured
            outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).
        task_budget:
          oneOf:
            - $ref: '#/components/schemas/MessagesOutputConfigTaskBudget'
            - type: 'null'
          description: >-
            Task budget for an agentic turn. The model sees a countdown of
            remaining tokens and uses it to prioritize work and wind down
            gracefully. Advisory — does not enforce a hard cap.
      description: >-
        Configuration for controlling output behavior. Supports the effort
        parameter and structured output format.
      title: MessagesOutputConfig
    ContextCompressionEngine:
      type: string
      enum:
        - middle-out
      description: The compression engine to use. Defaults to "middle-out".
      title: ContextCompressionEngine
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
    WebSearchEngine:
      type: string
      enum:
        - native
        - exa
        - firecrawl
        - parallel
      description: The search engine to use for web search.
      title: WebSearchEngine
    WebSearchPluginId:
      type: string
      enum:
        - web
      title: WebSearchPluginId
    WebSearchPluginUserLocationType:
      type: string
      enum:
        - approximate
      title: WebSearchPluginUserLocationType
    WebSearchPluginUserLocation:
      type: object
      properties:
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
        type:
          $ref: '#/components/schemas/WebSearchPluginUserLocationType'
      required:
        - type
      description: >-
        Approximate user location for location-biased search results. Passed
        through to native providers that support it (e.g. Anthropic).
      title: WebSearchPluginUserLocation
    MessagesRequestPluginsItems:
      oneOf:
        - type: object
          properties:
            id:
              type: string
              enum:
                - auto-router
              description: 'Discriminator value: auto-router'
            allowed_models:
              type: array
              items:
                type: string
              description: >-
                List of model patterns to filter which models the auto-router
                can route between. Supports wildcards (e.g., "anthropic/*"
                matches all Anthropic models). When not specified, uses the
                default supported models list.
            enabled:
              type: boolean
              description: >-
                Set to false to disable the auto-router plugin for this request.
                Defaults to true.
          required:
            - id
          description: auto-router variant
        - type: object
          properties:
            id:
              type: string
              enum:
                - context-compression
              description: 'Discriminator value: context-compression'
            enabled:
              type: boolean
              description: >-
                Set to false to disable the context-compression plugin for this
                request. Defaults to true.
            engine:
              $ref: '#/components/schemas/ContextCompressionEngine'
          required:
            - id
          description: context-compression variant
        - type: object
          properties:
            id:
              type: string
              enum:
                - file-parser
              description: 'Discriminator value: file-parser'
            enabled:
              type: boolean
              description: >-
                Set to false to disable the file-parser plugin for this request.
                Defaults to true.
            pdf:
              $ref: '#/components/schemas/PDFParserOptions'
          required:
            - id
          description: file-parser variant
        - type: object
          properties:
            id:
              type: string
              enum:
                - moderation
              description: 'Discriminator value: moderation'
          required:
            - id
          description: moderation variant
        - type: object
          properties:
            id:
              type: string
              enum:
                - pareto-router
              description: 'Discriminator value: pareto-router'
            enabled:
              type: boolean
              description: >-
                Set to false to disable the pareto-router plugin for this
                request. Defaults to true.
            min_coding_score:
              type: number
              format: double
              description: >-
                Minimum desired coding score between 0 and 1, where 1 is best.
                Higher values select from stronger coding models (sourced from
                Artificial Analysis coding percentiles). Maps internally to one
                of three tiers (low, medium, high). Omit to use the router
                default tier.
          required:
            - id
          description: pareto-router variant
        - type: object
          properties:
            id:
              type: string
              enum:
                - response-healing
              description: 'Discriminator value: response-healing'
            enabled:
              type: boolean
              description: >-
                Set to false to disable the response-healing plugin for this
                request. Defaults to true.
          required:
            - id
          description: response-healing variant
        - type: object
          properties:
            id:
              $ref: '#/components/schemas/WebSearchPluginId'
            enabled:
              type: boolean
              description: >-
                Set to false to disable the web-search plugin for this request.
                Defaults to true.
            engine:
              $ref: '#/components/schemas/WebSearchEngine'
            exclude_domains:
              type: array
              items:
                type: string
              description: >-
                A list of domains to exclude from web search results. Supports
                wildcards (e.g. "*.substack.com") and path filtering (e.g.
                "openai.com/blog").
            include_domains:
              type: array
              items:
                type: string
              description: >-
                A list of domains to restrict web search results to. Supports
                wildcards (e.g. "*.substack.com") and path filtering (e.g.
                "openai.com/blog").
            max_results:
              type: integer
            max_uses:
              type: integer
              description: >-
                Maximum number of times the model can invoke web search in a
                single turn. Passed through to native providers that support it
                (e.g. Anthropic).
            search_prompt:
              type: string
            user_location:
              $ref: '#/components/schemas/WebSearchPluginUserLocation'
          required:
            - id
          description: web variant
      discriminator:
        propertyName: id
      title: MessagesRequestPluginsItems
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
        - Baidu
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
        - DekaLLM
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
        - Nex AGI
        - NextBit
        - Novita
        - Nvidia
        - OpenAI
        - OpenInference
        - Parasail
        - Poolside
        - Perplexity
        - Phala
        - Recraft
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
    ProviderPreferencesIgnoreItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ProviderPreferencesIgnoreItems
    BigNumberUnion:
      type: string
      description: Price per million prompt tokens
      title: BigNumberUnion
    ProviderPreferencesMaxPrice:
      type: object
      properties:
        audio:
          $ref: '#/components/schemas/BigNumberUnion'
        completion:
          $ref: '#/components/schemas/BigNumberUnion'
        image:
          $ref: '#/components/schemas/BigNumberUnion'
        prompt:
          $ref: '#/components/schemas/BigNumberUnion'
        request:
          $ref: '#/components/schemas/BigNumberUnion'
      description: >-
        The object specifying the maximum price you want to pay for this
        request. USD price per million tokens, for prompt and completion.
      title: ProviderPreferencesMaxPrice
    ProviderPreferencesOnlyItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ProviderPreferencesOnlyItems
    ProviderPreferencesOrderItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ProviderPreferencesOrderItems
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
        enforce_distillable_text:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to restrict routing to only models that allow text
            distillation. When true, only models where the author has allowed
            distillation will be used.
        ignore:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ProviderPreferencesIgnoreItems'
          description: >-
            List of provider slugs to ignore. If provided, this list is merged
            with your account-wide ignored provider settings for this request.
        max_price:
          $ref: '#/components/schemas/ProviderPreferencesMaxPrice'
          description: >-
            The object specifying the maximum price you want to pay for this
            request. USD price per million tokens, for prompt and completion.
        only:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ProviderPreferencesOnlyItems'
          description: >-
            List of provider slugs to allow. If provided, this list is merged
            with your account-wide allowed provider settings for this request.
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
        preferred_max_latency:
          $ref: '#/components/schemas/PreferredMaxLatency'
        preferred_min_throughput:
          $ref: '#/components/schemas/PreferredMinThroughput'
        quantizations:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/Quantization'
          description: A list of quantization levels to filter the provider by.
        require_parameters:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to filter providers to only those that support the
            parameters you've provided. If this setting is omitted or set to
            false, then providers will receive only the parameters they support,
            and ignore the rest.
        sort:
          $ref: '#/components/schemas/ProviderPreferencesSort'
          description: >-
            The sorting strategy to use for this request, if "order" is not
            specified. When set, no load balancing is performed.
        zdr:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to restrict routing to only ZDR (Zero Data Retention)
            endpoints. When true, only endpoints that do not retain prompts will
            be used.
      description: >-
        When multiple model providers are available, optionally indicate your
        routing preference.
      title: ProviderPreferences
    MessagesRequestServiceTier:
      type: string
      enum:
        - auto
        - standard_only
      title: MessagesRequestServiceTier
    AnthropicSpeed:
      type: string
      enum:
        - fast
        - standard
      title: AnthropicSpeed
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
    AnthropicThinkingDisplay:
      type: string
      enum:
        - summarized
        - omitted
      title: AnthropicThinkingDisplay
    MessagesRequestThinkingOneOf0Type:
      type: string
      enum:
        - enabled
      title: MessagesRequestThinkingOneOf0Type
    MessagesRequestThinking0:
      type: object
      properties:
        budget_tokens:
          type: integer
        display:
          $ref: '#/components/schemas/AnthropicThinkingDisplay'
        type:
          $ref: '#/components/schemas/MessagesRequestThinkingOneOf0Type'
      required:
        - budget_tokens
        - type
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
        display:
          $ref: '#/components/schemas/AnthropicThinkingDisplay'
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
    MessagesRequestToolChoiceOneOf0Type:
      type: string
      enum:
        - auto
      title: MessagesRequestToolChoiceOneOf0Type
    MessagesRequestToolChoice0:
      type: object
      properties:
        disable_parallel_tool_use:
          type: boolean
        type:
          $ref: '#/components/schemas/MessagesRequestToolChoiceOneOf0Type'
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
        disable_parallel_tool_use:
          type: boolean
        type:
          $ref: '#/components/schemas/MessagesRequestToolChoiceOneOf1Type'
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
        disable_parallel_tool_use:
          type: boolean
        name:
          type: string
        type:
          $ref: '#/components/schemas/MessagesRequestToolChoiceOneOf3Type'
      required:
        - name
        - type
      title: MessagesRequestToolChoice3
    MessagesRequestToolChoice:
      oneOf:
        - $ref: '#/components/schemas/MessagesRequestToolChoice0'
        - $ref: '#/components/schemas/MessagesRequestToolChoice1'
        - $ref: '#/components/schemas/MessagesRequestToolChoice2'
        - $ref: '#/components/schemas/MessagesRequestToolChoice3'
      title: MessagesRequestToolChoice
    MessagesRequestToolsItemsOneOf0InputSchema:
      type: object
      properties:
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
        type:
          type: string
          default: object
      title: MessagesRequestToolsItemsOneOf0InputSchema
    MessagesRequestToolsItemsOneOf0Type:
      type: string
      enum:
        - custom
      title: MessagesRequestToolsItemsOneOf0Type
    MessagesRequestToolsItems0:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        description:
          type: string
        input_schema:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf0InputSchema'
        name:
          type: string
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf0Type'
      required:
        - input_schema
        - name
      title: MessagesRequestToolsItems0
    MessagesRequestToolsItemsOneOf1Name:
      type: string
      enum:
        - bash
      title: MessagesRequestToolsItemsOneOf1Name
    MessagesRequestToolsItemsOneOf1Type:
      type: string
      enum:
        - bash_20250124
      title: MessagesRequestToolsItemsOneOf1Type
    MessagesRequestToolsItems1:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        name:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf1Name'
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf1Type'
      required:
        - name
        - type
      title: MessagesRequestToolsItems1
    MessagesRequestToolsItemsOneOf2Name:
      type: string
      enum:
        - str_replace_editor
      title: MessagesRequestToolsItemsOneOf2Name
    MessagesRequestToolsItemsOneOf2Type:
      type: string
      enum:
        - text_editor_20250124
      title: MessagesRequestToolsItemsOneOf2Type
    MessagesRequestToolsItems2:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        name:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf2Name'
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf2Type'
      required:
        - name
        - type
      title: MessagesRequestToolsItems2
    MessagesRequestToolsItemsOneOf3Name:
      type: string
      enum:
        - web_search
      title: MessagesRequestToolsItemsOneOf3Name
    MessagesRequestToolsItemsOneOf3Type:
      type: string
      enum:
        - web_search_20250305
      title: MessagesRequestToolsItemsOneOf3Type
    AnthropicWebSearchToolUserLocationType:
      type: string
      enum:
        - approximate
      title: AnthropicWebSearchToolUserLocationType
    AnthropicWebSearchToolUserLocation:
      type: object
      properties:
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
        type:
          $ref: '#/components/schemas/AnthropicWebSearchToolUserLocationType'
      required:
        - type
      title: AnthropicWebSearchToolUserLocation
    MessagesRequestToolsItems3:
      type: object
      properties:
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
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        max_uses:
          type:
            - integer
            - 'null'
        name:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf3Name'
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf3Type'
        user_location:
          $ref: '#/components/schemas/AnthropicWebSearchToolUserLocation'
      required:
        - name
        - type
      title: MessagesRequestToolsItems3
    MessagesRequestToolsItemsOneOf4AllowedCallersItems:
      type: string
      enum:
        - direct
        - code_execution_20250825
        - code_execution_20260120
      title: MessagesRequestToolsItemsOneOf4AllowedCallersItems
    MessagesRequestToolsItemsOneOf4Name:
      type: string
      enum:
        - web_search
      title: MessagesRequestToolsItemsOneOf4Name
    MessagesRequestToolsItemsOneOf4Type:
      type: string
      enum:
        - web_search_20260209
      title: MessagesRequestToolsItemsOneOf4Type
    MessagesRequestToolsItems4:
      type: object
      properties:
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
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        max_uses:
          type:
            - integer
            - 'null'
        name:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf4Name'
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf4Type'
        user_location:
          $ref: '#/components/schemas/AnthropicWebSearchToolUserLocation'
      required:
        - name
        - type
      title: MessagesRequestToolsItems4
    DatetimeServerToolConfig:
      type: object
      properties:
        timezone:
          type: string
          description: IANA timezone name (e.g. "America/New_York"). Defaults to UTC.
      description: Configuration for the openrouter:datetime server tool
      title: DatetimeServerToolConfig
    DatetimeServerToolType:
      type: string
      enum:
        - openrouter:datetime
      title: DatetimeServerToolType
    DatetimeServerTool:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/DatetimeServerToolConfig'
        type:
          $ref: '#/components/schemas/DatetimeServerToolType'
      required:
        - type
      description: 'OpenRouter built-in server tool: returns the current date and time'
      title: DatetimeServerTool
    ImageGenerationServerToolConfig:
      type: object
      properties:
        model:
          type: string
          description: >-
            Which image generation model to use (e.g. "openai/gpt-5-image").
            Defaults to "openai/gpt-5-image".
      description: >-
        Configuration for the openrouter:image_generation server tool. Accepts
        all image_config params (aspect_ratio, quality, size, background,
        output_format, output_compression, moderation, etc.) plus a model field.
      title: ImageGenerationServerToolConfig
    ImageGenerationServerToolOpenRouterType:
      type: string
      enum:
        - openrouter:image_generation
      title: ImageGenerationServerToolOpenRouterType
    ImageGenerationServerTool_OpenRouter:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/ImageGenerationServerToolConfig'
        type:
          $ref: '#/components/schemas/ImageGenerationServerToolOpenRouterType'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: generates images from text prompts
        using an image generation model
      title: ImageGenerationServerTool_OpenRouter
    SearchModelsServerToolConfig:
      type: object
      properties:
        max_results:
          type: integer
          description: Maximum number of models to return. Defaults to 5, max 20.
      description: Configuration for the openrouter:experimental__search_models server tool
      title: SearchModelsServerToolConfig
    ChatSearchModelsServerToolType:
      type: string
      enum:
        - openrouter:experimental__search_models
      title: ChatSearchModelsServerToolType
    ChatSearchModelsServerTool:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/SearchModelsServerToolConfig'
        type:
          $ref: '#/components/schemas/ChatSearchModelsServerToolType'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: searches and filters AI models
        available on OpenRouter
      title: ChatSearchModelsServerTool
    WebFetchEngineEnum:
      type: string
      enum:
        - auto
        - native
        - openrouter
        - firecrawl
        - exa
      description: >-
        Which fetch engine to use. "auto" (default) uses native if the provider
        supports it, otherwise Exa. "native" forces the provider's built-in
        fetch. "exa" uses Exa Contents API (supports BYOK). "openrouter" uses
        direct HTTP fetch. "firecrawl" uses Firecrawl scrape (requires BYOK).
      title: WebFetchEngineEnum
    WebFetchServerToolConfig:
      type: object
      properties:
        allowed_domains:
          type: array
          items:
            type: string
          description: Only fetch from these domains.
        blocked_domains:
          type: array
          items:
            type: string
          description: Never fetch from these domains.
        engine:
          $ref: '#/components/schemas/WebFetchEngineEnum'
        max_content_tokens:
          type: integer
          description: >-
            Maximum content length in approximate tokens. Content exceeding this
            limit is truncated.
        max_uses:
          type: integer
          description: >-
            Maximum number of web fetches per request. Once exceeded, the tool
            returns an error.
      description: Configuration for the openrouter:web_fetch server tool
      title: WebFetchServerToolConfig
    WebFetchServerToolType:
      type: string
      enum:
        - openrouter:web_fetch
      title: WebFetchServerToolType
    WebFetchServerTool:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/WebFetchServerToolConfig'
        type:
          $ref: '#/components/schemas/WebFetchServerToolType'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: fetches full content from a URL (web
        page or PDF)
      title: WebFetchServerTool
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
        chars). Applies to Exa and Parallel engines; ignored with native
        provider search and Firecrawl.
      title: SearchQualityLevel
    WebSearchUserLocationServerToolType:
      type: string
      enum:
        - approximate
      title: WebSearchUserLocationServerToolType
    WebSearchUserLocationServerTool:
      type: object
      properties:
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
        type:
          $ref: '#/components/schemas/WebSearchUserLocationServerToolType'
      description: Approximate user location for location-biased results.
      title: WebSearchUserLocationServerTool
    WebSearchConfig:
      type: object
      properties:
        allowed_domains:
          type: array
          items:
            type: string
          description: >-
            Limit search results to these domains. Supported by Exa, Parallel,
            and most native providers (Anthropic, OpenAI, xAI). Not supported
            with Firecrawl or Perplexity.
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        excluded_domains:
          type: array
          items:
            type: string
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Parallel, Anthropic, and xAI. Not supported with Firecrawl, OpenAI
            (silently ignored), or Perplexity.
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
      title: WebSearchConfig
    OpenRouterWebSearchServerToolType:
      type: string
      enum:
        - openrouter:web_search
      title: OpenRouterWebSearchServerToolType
    OpenRouterWebSearchServerTool:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/WebSearchConfig'
        type:
          $ref: '#/components/schemas/OpenRouterWebSearchServerToolType'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: searches the web for current
        information
      title: OpenRouterWebSearchServerTool
    MessagesRequestToolsItems:
      oneOf:
        - $ref: '#/components/schemas/MessagesRequestToolsItems0'
        - $ref: '#/components/schemas/MessagesRequestToolsItems1'
        - $ref: '#/components/schemas/MessagesRequestToolsItems2'
        - $ref: '#/components/schemas/MessagesRequestToolsItems3'
        - $ref: '#/components/schemas/MessagesRequestToolsItems4'
        - $ref: '#/components/schemas/DatetimeServerTool'
        - $ref: '#/components/schemas/ImageGenerationServerTool_OpenRouter'
        - $ref: '#/components/schemas/ChatSearchModelsServerTool'
        - $ref: '#/components/schemas/WebFetchServerTool'
        - $ref: '#/components/schemas/OpenRouterWebSearchServerTool'
      title: MessagesRequestToolsItems
    TraceConfig:
      type: object
      properties:
        generation_name:
          type: string
        parent_span_id:
          type: string
        span_name:
          type: string
        trace_id:
          type: string
        trace_name:
          type: string
      description: >-
        Metadata for observability and tracing. Known keys (trace_id,
        trace_name, span_name, generation_name, parent_span_id) have special
        handling. Additional keys are passed through as custom metadata to
        configured broadcast destinations.
      title: TraceConfig
    MessagesRequest:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        context_management:
          oneOf:
            - $ref: '#/components/schemas/MessagesRequestContextManagement'
            - type: 'null'
        max_tokens:
          type: integer
        messages:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/MessagesMessageParam'
        metadata:
          $ref: '#/components/schemas/MessagesRequestMetadata'
        model:
          type: string
        models:
          type: array
          items:
            type: string
        output_config:
          $ref: '#/components/schemas/MessagesOutputConfig'
        plugins:
          type: array
          items:
            $ref: '#/components/schemas/MessagesRequestPluginsItems'
          description: >-
            Plugins you want to enable for this request, including their
            settings.
        provider:
          $ref: '#/components/schemas/ProviderPreferences'
        route:
          description: Any type
        service_tier:
          $ref: '#/components/schemas/MessagesRequestServiceTier'
        session_id:
          type: string
          description: >-
            A unique identifier for grouping related requests (e.g., a
            conversation or agent workflow) for observability. If provided in
            both the request body and the x-session-id header, the body value
            takes precedence. Maximum of 256 characters.
        speed:
          $ref: '#/components/schemas/AnthropicSpeed'
        stop_sequences:
          type: array
          items:
            type: string
        stream:
          type: boolean
        system:
          $ref: '#/components/schemas/MessagesRequestSystem'
        temperature:
          type: number
          format: double
        thinking:
          $ref: '#/components/schemas/MessagesRequestThinking'
        tool_choice:
          $ref: '#/components/schemas/MessagesRequestToolChoice'
        tools:
          type: array
          items:
            $ref: '#/components/schemas/MessagesRequestToolsItems'
        top_k:
          type: integer
        top_p:
          type: number
          format: double
        trace:
          $ref: '#/components/schemas/TraceConfig'
        user:
          type: string
          description: >-
            A unique identifier representing your end-user, which helps
            distinguish between different users of your app. This allows your
            app to identify specific users in case of abuse reports, preventing
            your entire app from being affected by the actions of individual
            users. Maximum of 256 characters.
      required:
        - messages
        - model
      description: Request schema for Anthropic Messages API endpoint
      title: MessagesRequest
    AnthropicContainer:
      type: object
      properties:
        expires_at:
          type: string
        id:
          type: string
      required:
        - expires_at
        - id
      title: AnthropicContainer
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
    AnthropicBashCodeExecutionContent:
      oneOf:
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicBashCodeExecutionResultType'
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
          required:
            - type
            - content
            - return_code
            - stderr
            - stdout
          description: bash_code_execution_result variant
        - type: object
          properties:
            type:
              $ref: >-
                #/components/schemas/AnthropicBashCodeExecutionToolResultErrorType
            error_code:
              $ref: >-
                #/components/schemas/AnthropicBashCodeExecutionToolResultErrorErrorCode
          required:
            - type
            - error_code
          description: bash_code_execution_tool_result_error variant
      discriminator:
        propertyName: type
      title: AnthropicBashCodeExecutionContent
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
    AnthropicEncryptedCodeExecutionResultType:
      type: string
      enum:
        - encrypted_code_execution_result
      title: AnthropicEncryptedCodeExecutionResultType
    AnthropicCodeExecutionContent:
      oneOf:
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicCodeExecutionResultType'
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
          required:
            - type
            - content
            - return_code
            - stderr
            - stdout
          description: code_execution_result variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicCodeExecutionToolResultErrorType'
            error_code:
              $ref: '#/components/schemas/AnthropicServerToolErrorCode'
          required:
            - type
            - error_code
          description: code_execution_tool_result_error variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicEncryptedCodeExecutionResultType'
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
          required:
            - type
            - content
            - encrypted_stdout
            - return_code
            - stderr
          description: encrypted_code_execution_result variant
      discriminator:
        propertyName: type
      title: AnthropicCodeExecutionContent
    AnthropicCodeExecution20250825CallerType:
      type: string
      enum:
        - code_execution_20250825
      title: AnthropicCodeExecution20250825CallerType
    AnthropicCodeExecution20260120CallerType:
      type: string
      enum:
        - code_execution_20260120
      title: AnthropicCodeExecution20260120CallerType
    AnthropicDirectCallerType:
      type: string
      enum:
        - direct
      title: AnthropicDirectCallerType
    AnthropicCaller:
      oneOf:
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicCodeExecution20250825CallerType'
            tool_id:
              type: string
          required:
            - type
            - tool_id
          description: code_execution_20250825 variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicCodeExecution20260120CallerType'
            tool_id:
              type: string
          required:
            - type
            - tool_id
          description: code_execution_20260120 variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicDirectCallerType'
          required:
            - type
          description: direct variant
      discriminator:
        propertyName: type
      title: AnthropicCaller
    AnthropicTextCitation:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - char_location
              description: 'Discriminator value: char_location'
            cited_text:
              type: string
            document_index:
              type: integer
            document_title:
              type:
                - string
                - 'null'
            end_char_index:
              type: integer
            file_id:
              type:
                - string
                - 'null'
            start_char_index:
              type: integer
          required:
            - type
            - cited_text
            - document_index
            - document_title
            - end_char_index
            - file_id
            - start_char_index
          description: char_location variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - content_block_location
              description: 'Discriminator value: content_block_location'
            cited_text:
              type: string
            document_index:
              type: integer
            document_title:
              type:
                - string
                - 'null'
            end_block_index:
              type: integer
            file_id:
              type:
                - string
                - 'null'
            start_block_index:
              type: integer
          required:
            - type
            - cited_text
            - document_index
            - document_title
            - end_block_index
            - file_id
            - start_block_index
          description: content_block_location variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - page_location
              description: 'Discriminator value: page_location'
            cited_text:
              type: string
            document_index:
              type: integer
            document_title:
              type:
                - string
                - 'null'
            end_page_number:
              type: integer
            file_id:
              type:
                - string
                - 'null'
            start_page_number:
              type: integer
          required:
            - type
            - cited_text
            - document_index
            - document_title
            - end_page_number
            - file_id
            - start_page_number
          description: page_location variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - search_result_location
              description: 'Discriminator value: search_result_location'
            cited_text:
              type: string
            end_block_index:
              type: integer
            search_result_index:
              type: integer
            source:
              type: string
            start_block_index:
              type: integer
            title:
              type:
                - string
                - 'null'
          required:
            - type
            - cited_text
            - end_block_index
            - search_result_index
            - source
            - start_block_index
            - title
          description: search_result_location variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - web_search_result_location
              description: 'Discriminator value: web_search_result_location'
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
          description: web_search_result_location variant
      discriminator:
        propertyName: type
      title: AnthropicTextCitation
    AnthropicTextEditorCodeExecutionCreateResultType:
      type: string
      enum:
        - text_editor_code_execution_create_result
      title: AnthropicTextEditorCodeExecutionCreateResultType
    AnthropicTextEditorCodeExecutionStrReplaceResultType:
      type: string
      enum:
        - text_editor_code_execution_str_replace_result
      title: AnthropicTextEditorCodeExecutionStrReplaceResultType
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
    AnthropicTextEditorCodeExecutionContent:
      oneOf:
        - type: object
          properties:
            type:
              $ref: >-
                #/components/schemas/AnthropicTextEditorCodeExecutionCreateResultType
            is_file_update:
              type: boolean
          required:
            - type
            - is_file_update
          description: text_editor_code_execution_create_result variant
        - type: object
          properties:
            type:
              $ref: >-
                #/components/schemas/AnthropicTextEditorCodeExecutionStrReplaceResultType
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
          required:
            - type
            - lines
            - new_lines
            - new_start
            - old_lines
            - old_start
          description: text_editor_code_execution_str_replace_result variant
        - type: object
          properties:
            type:
              $ref: >-
                #/components/schemas/AnthropicTextEditorCodeExecutionToolResultErrorType
            error_code:
              $ref: >-
                #/components/schemas/AnthropicTextEditorCodeExecutionToolResultErrorErrorCode
            error_message:
              type:
                - string
                - 'null'
          required:
            - type
            - error_code
            - error_message
          description: text_editor_code_execution_tool_result_error variant
        - type: object
          properties:
            type:
              $ref: >-
                #/components/schemas/AnthropicTextEditorCodeExecutionViewResultType
            content:
              type: string
            file_type:
              $ref: >-
                #/components/schemas/AnthropicTextEditorCodeExecutionViewResultFileType
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
          required:
            - type
            - content
            - file_type
            - num_lines
            - start_line
            - total_lines
          description: text_editor_code_execution_view_result variant
      discriminator:
        propertyName: type
      title: AnthropicTextEditorCodeExecutionContent
    AnthropicToolSearchResultErrorType:
      type: string
      enum:
        - tool_search_tool_result_error
      title: AnthropicToolSearchResultErrorType
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
    AnthropicToolSearchContent:
      oneOf:
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicToolSearchResultErrorType'
            error_code:
              $ref: '#/components/schemas/AnthropicServerToolErrorCode'
            error_message:
              type:
                - string
                - 'null'
          required:
            - type
            - error_code
            - error_message
          description: tool_search_tool_result_error variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicToolSearchResultType'
            tool_references:
              type: array
              items:
                $ref: '#/components/schemas/AnthropicToolReference'
          required:
            - type
            - tool_references
          description: tool_search_tool_search_result variant
      discriminator:
        propertyName: type
      title: AnthropicToolSearchContent
    AnthropicCitationsConfig:
      type: object
      properties:
        enabled:
          type: boolean
      required:
        - enabled
      title: AnthropicCitationsConfig
    AnthropicDocumentBlockSource:
      oneOf:
        - $ref: '#/components/schemas/AnthropicBase64PdfSource'
        - $ref: '#/components/schemas/AnthropicPlainTextSource'
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
    AnthropicWebFetchToolResultErrorType:
      type: string
      enum:
        - web_fetch_tool_result_error
      title: AnthropicWebFetchToolResultErrorType
    AnthropicWebFetchContent:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - web_fetch_result
              description: 'Discriminator value: web_fetch_result'
            content:
              $ref: '#/components/schemas/AnthropicDocumentBlock'
            retrieved_at:
              type:
                - string
                - 'null'
            url:
              type: string
          required:
            - type
            - content
            - retrieved_at
            - url
          description: web_fetch_result variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/AnthropicWebFetchToolResultErrorType'
            error_code:
              $ref: '#/components/schemas/AnthropicWebFetchToolResultErrorErrorCode'
          required:
            - type
            - error_code
          description: web_fetch_tool_result_error variant
      discriminator:
        propertyName: type
      title: AnthropicWebFetchContent
    AnthropicWebSearchResultType:
      type: string
      enum:
        - web_search_result
      title: AnthropicWebSearchResultType
    AnthropicWebSearchResult:
      type: object
      properties:
        encrypted_content:
          type: string
        page_age:
          type:
            - string
            - 'null'
        title:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicWebSearchResultType'
        url:
          type: string
      required:
        - encrypted_content
        - page_age
        - title
        - type
        - url
      title: AnthropicWebSearchResult
    OrAnthropicContentBlockDiscriminatorMappingWebSearchToolResultContent0:
      type: array
      items:
        $ref: '#/components/schemas/AnthropicWebSearchResult'
      title: OrAnthropicContentBlockDiscriminatorMappingWebSearchToolResultContent0
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
    AnthropicWebSearchToolResultErrorType:
      type: string
      enum:
        - web_search_tool_result_error
      title: AnthropicWebSearchToolResultErrorType
    AnthropicWebSearchToolResultError:
      type: object
      properties:
        error_code:
          $ref: '#/components/schemas/AnthropicWebSearchToolResultErrorErrorCode'
        type:
          $ref: '#/components/schemas/AnthropicWebSearchToolResultErrorType'
      required:
        - error_code
        - type
      title: AnthropicWebSearchToolResultError
    OrAnthropicContentBlockDiscriminatorMappingWebSearchToolResultContent:
      oneOf:
        - $ref: >-
            #/components/schemas/OrAnthropicContentBlockDiscriminatorMappingWebSearchToolResultContent0
        - $ref: '#/components/schemas/AnthropicWebSearchToolResultError'
      title: OrAnthropicContentBlockDiscriminatorMappingWebSearchToolResultContent
    ORAnthropicContentBlock:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - bash_code_execution_tool_result
              description: 'Discriminator value: bash_code_execution_tool_result'
            content:
              $ref: '#/components/schemas/AnthropicBashCodeExecutionContent'
            tool_use_id:
              type: string
          required:
            - type
            - content
            - tool_use_id
          description: bash_code_execution_tool_result variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - code_execution_tool_result
              description: 'Discriminator value: code_execution_tool_result'
            content:
              $ref: '#/components/schemas/AnthropicCodeExecutionContent'
            tool_use_id:
              type: string
          required:
            - type
            - content
            - tool_use_id
          description: code_execution_tool_result variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - compaction
              description: 'Discriminator value: compaction'
            content:
              type:
                - string
                - 'null'
          required:
            - type
            - content
          description: compaction variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - container_upload
              description: 'Discriminator value: container_upload'
            file_id:
              type: string
          required:
            - type
            - file_id
          description: container_upload variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - redacted_thinking
              description: 'Discriminator value: redacted_thinking'
            data:
              type: string
          required:
            - type
            - data
          description: redacted_thinking variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - server_tool_use
              description: 'Discriminator value: server_tool_use'
            caller:
              $ref: '#/components/schemas/AnthropicCaller'
            id:
              type: string
            input:
              oneOf:
                - description: Any type
                - type: 'null'
            name:
              $ref: '#/components/schemas/AnthropicServerToolName'
          required:
            - type
            - caller
            - id
            - name
          description: server_tool_use variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - text
              description: 'Discriminator value: text'
            citations:
              type:
                - array
                - 'null'
              items:
                $ref: '#/components/schemas/AnthropicTextCitation'
            text:
              type: string
          required:
            - type
            - citations
            - text
          description: text variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - text_editor_code_execution_tool_result
              description: 'Discriminator value: text_editor_code_execution_tool_result'
            content:
              $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionContent'
            tool_use_id:
              type: string
          required:
            - type
            - content
            - tool_use_id
          description: text_editor_code_execution_tool_result variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - thinking
              description: 'Discriminator value: thinking'
            signature:
              type: string
            thinking:
              type: string
          required:
            - type
            - signature
            - thinking
          description: thinking variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - tool_search_tool_result
              description: 'Discriminator value: tool_search_tool_result'
            content:
              $ref: '#/components/schemas/AnthropicToolSearchContent'
            tool_use_id:
              type: string
          required:
            - type
            - content
            - tool_use_id
          description: tool_search_tool_result variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - tool_use
              description: 'Discriminator value: tool_use'
            caller:
              $ref: '#/components/schemas/AnthropicCaller'
            id:
              type: string
            input:
              oneOf:
                - description: Any type
                - type: 'null'
            name:
              type: string
          required:
            - type
            - caller
            - id
            - name
          description: tool_use variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - web_fetch_tool_result
              description: 'Discriminator value: web_fetch_tool_result'
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
          description: web_fetch_tool_result variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - web_search_tool_result
              description: 'Discriminator value: web_search_tool_result'
            caller:
              $ref: '#/components/schemas/AnthropicCaller'
            content:
              $ref: >-
                #/components/schemas/OrAnthropicContentBlockDiscriminatorMappingWebSearchToolResultContent
            tool_use_id:
              type: string
          required:
            - type
            - caller
            - content
            - tool_use_id
          description: web_search_tool_result variant
      discriminator:
        propertyName: type
      title: ORAnthropicContentBlock
    MessagesResultRole:
      type: string
      enum:
        - assistant
      title: MessagesResultRole
    AnthropicRefusalStopDetailsCategory:
      type: string
      enum:
        - cyber
        - bio
      title: AnthropicRefusalStopDetailsCategory
    AnthropicRefusalStopDetailsType:
      type: string
      enum:
        - refusal
      title: AnthropicRefusalStopDetailsType
    AnthropicRefusalStopDetails:
      type: object
      properties:
        category:
          oneOf:
            - $ref: '#/components/schemas/AnthropicRefusalStopDetailsCategory'
            - type: 'null'
        explanation:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/AnthropicRefusalStopDetailsType'
      required:
        - category
        - explanation
        - type
      description: Structured information about a refusal
      title: AnthropicRefusalStopDetails
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
    MessagesResultType:
      type: string
      enum:
        - message
      title: MessagesResultType
    AnthropicCacheCreation:
      type: object
      properties:
        ephemeral_1h_input_tokens:
          type: integer
        ephemeral_5m_input_tokens:
          type: integer
      required:
        - ephemeral_1h_input_tokens
        - ephemeral_5m_input_tokens
      title: AnthropicCacheCreation
    AnthropicServerToolUsage:
      type: object
      properties:
        web_fetch_requests:
          type: integer
        web_search_requests:
          type: integer
      required:
        - web_fetch_requests
        - web_search_requests
      title: AnthropicServerToolUsage
    AnthropicServiceTier:
      type: string
      enum:
        - standard
        - priority
        - batch
      title: AnthropicServiceTier
    AnthropicIterationCacheCreation:
      type: object
      properties:
        ephemeral_1h_input_tokens:
          type: integer
        ephemeral_5m_input_tokens:
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
        cache_creation:
          $ref: '#/components/schemas/AnthropicIterationCacheCreation'
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        input_tokens:
          type: integer
        output_tokens:
          type: integer
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
        cache_creation:
          $ref: '#/components/schemas/AnthropicIterationCacheCreation'
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        type:
          $ref: '#/components/schemas/AnthropicMessageUsageIterationType'
      required:
        - type
      title: AnthropicMessageUsageIteration
    AnthropicUnknownUsageIteration:
      type: object
      properties:
        cache_creation:
          $ref: '#/components/schemas/AnthropicIterationCacheCreation'
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        input_tokens:
          type: integer
        output_tokens:
          type: integer
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
    MessagesResultUsage:
      type: object
      properties:
        cache_creation:
          $ref: '#/components/schemas/AnthropicCacheCreation'
        cache_creation_input_tokens:
          type:
            - integer
            - 'null'
        cache_read_input_tokens:
          type:
            - integer
            - 'null'
        inference_geo:
          type:
            - string
            - 'null'
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        server_tool_use:
          $ref: '#/components/schemas/AnthropicServerToolUsage'
        service_tier:
          $ref: '#/components/schemas/AnthropicServiceTier'
        iterations:
          type: array
          items:
            $ref: '#/components/schemas/AnthropicUsageIteration'
        speed:
          $ref: '#/components/schemas/AnthropicSpeed'
      required:
        - cache_creation
        - cache_creation_input_tokens
        - cache_read_input_tokens
        - inference_geo
        - input_tokens
        - output_tokens
        - server_tool_use
        - service_tier
      title: MessagesResultUsage
    MessagesResultContextManagementAppliedEditsItems:
      type: object
      properties:
        type:
          type: string
      required:
        - type
      title: MessagesResultContextManagementAppliedEditsItems
    MessagesResultContextManagement:
      type: object
      properties:
        applied_edits:
          type: array
          items:
            $ref: >-
              #/components/schemas/MessagesResultContextManagementAppliedEditsItems
      required:
        - applied_edits
      title: MessagesResultContextManagement
    MessagesResult:
      type: object
      properties:
        container:
          $ref: '#/components/schemas/AnthropicContainer'
        content:
          type: array
          items:
            $ref: '#/components/schemas/ORAnthropicContentBlock'
        id:
          type: string
        model:
          type: string
        role:
          $ref: '#/components/schemas/MessagesResultRole'
        stop_details:
          $ref: '#/components/schemas/AnthropicRefusalStopDetails'
        stop_reason:
          $ref: '#/components/schemas/ORAnthropicStopReason'
        stop_sequence:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/MessagesResultType'
        usage:
          $ref: '#/components/schemas/MessagesResultUsage'
        context_management:
          oneOf:
            - $ref: '#/components/schemas/MessagesResultContextManagement'
            - type: 'null'
        provider:
          $ref: '#/components/schemas/ProviderName'
      required:
        - container
        - content
        - id
        - model
        - role
        - stop_details
        - stop_reason
        - stop_sequence
        - type
        - usage
      description: >-
        Non-streaming response from the Anthropic Messages API with OpenRouter
        extensions
      title: MessagesResult
    MessagesErrorDetail:
      type: object
      properties:
        message:
          type: string
        type:
          type: string
      required:
        - message
        - type
      title: MessagesErrorDetail
    MessagesErrorResponseType:
      type: string
      enum:
        - error
      title: MessagesErrorResponseType
    MessagesErrorResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/MessagesErrorDetail'
        type:
          $ref: '#/components/schemas/MessagesErrorResponseType'
      required:
        - error
        - type
      title: MessagesErrorResponse
  securitySchemes:
    apiKey:
      type: http
      scheme: bearer
      description: API key as bearer token in Authorization header

```

## SDK Code Examples

```python Anthropic Messages_createMessages_example
import requests

url = "https://openrouter.ai/api/v1//messages"

payload = {
    "messages": [
        {
            "content": "Hello, how are you?",
            "role": "user"
        }
    ],
    "model": "anthropic/claude-sonnet-4",
    "max_tokens": 1024
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Anthropic Messages_createMessages_example
const url = 'https://openrouter.ai/api/v1//messages';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"messages":[{"content":"Hello, how are you?","role":"user"}],"model":"anthropic/claude-sonnet-4","max_tokens":1024}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Anthropic Messages_createMessages_example
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1//messages"

	payload := strings.NewReader("{\n  \"messages\": [\n    {\n      \"content\": \"Hello, how are you?\",\n      \"role\": \"user\"\n    }\n  ],\n  \"model\": \"anthropic/claude-sonnet-4\",\n  \"max_tokens\": 1024\n}")

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

```ruby Anthropic Messages_createMessages_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1//messages")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"messages\": [\n    {\n      \"content\": \"Hello, how are you?\",\n      \"role\": \"user\"\n    }\n  ],\n  \"model\": \"anthropic/claude-sonnet-4\",\n  \"max_tokens\": 1024\n}"

response = http.request(request)
puts response.read_body
```

```java Anthropic Messages_createMessages_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1//messages")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"messages\": [\n    {\n      \"content\": \"Hello, how are you?\",\n      \"role\": \"user\"\n    }\n  ],\n  \"model\": \"anthropic/claude-sonnet-4\",\n  \"max_tokens\": 1024\n}")
  .asString();
```

```php Anthropic Messages_createMessages_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1//messages', [
  'body' => '{
  "messages": [
    {
      "content": "Hello, how are you?",
      "role": "user"
    }
  ],
  "model": "anthropic/claude-sonnet-4",
  "max_tokens": 1024
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Anthropic Messages_createMessages_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1//messages");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"messages\": [\n    {\n      \"content\": \"Hello, how are you?\",\n      \"role\": \"user\"\n    }\n  ],\n  \"model\": \"anthropic/claude-sonnet-4\",\n  \"max_tokens\": 1024\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Anthropic Messages_createMessages_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "messages": [
    [
      "content": "Hello, how are you?",
      "role": "user"
    ]
  ],
  "model": "anthropic/claude-sonnet-4",
  "max_tokens": 1024
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1//messages")! as URL,
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