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
                $ref: '#/components/schemas/AnthropicMessagesResponse'
        '400':
          description: Invalid request error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateMessagesRequestBadRequestError'
        '401':
          description: Authentication error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateMessagesRequestUnauthorizedError'
        '403':
          description: Permission denied error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateMessagesRequestForbiddenError'
        '404':
          description: Not found error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateMessagesRequestNotFoundError'
        '429':
          description: Rate limit error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateMessagesRequestTooManyRequestsError'
        '500':
          description: API error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateMessagesRequestInternalServerError'
        '503':
          description: Overloaded error
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/CreateMessagesRequestServiceUnavailableError
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AnthropicMessagesRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    OpenRouterAnthropicMessageParamRole:
      type: string
      enum:
        - user
        - assistant
      title: OpenRouterAnthropicMessageParamRole
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0Type:
      type: string
      enum:
        - text
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_char_index:
          type: number
          format: double
        end_char_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_char_index
        - end_char_index
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_page_number:
          type: number
          format: double
        end_page_number:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_page_number
        - end_page_number
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_block_index
        - end_block_index
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems2
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
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
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems3
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
        cited_text:
          type: string
        search_result_index:
          type: number
          format: double
        source:
          type: string
        title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - search_result_index
        - source
        - title
        - start_block_index
        - end_block_index
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems4
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems1
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems2
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems3
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems4
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CacheControlType:
      type: string
      enum:
        - ephemeral
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CacheControlTtl
      required:
        - type
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1Items0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0Type
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CitationsItems
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf0CacheControl
      required:
        - type
        - text
      title: OpenRouterAnthropicMessageParamContentOneOf1Items0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Type:
      type: string
      enum:
        - image
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1SourceOneOf0Type:
      type: string
      enum:
        - base64
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1SourceOneOf0Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1SourceOneOf0MediaType:
      type: string
      enum:
        - image/jpeg
        - image/png
        - image/gif
        - image/webp
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1SourceOneOf0MediaType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Source0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1SourceOneOf0Type
        media_type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1SourceOneOf0MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Source0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1SourceOneOf1Type:
      type: string
      enum:
        - url
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1SourceOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Source1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1SourceOneOf1Type
        url:
          type: string
      required:
        - type
        - url
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Source1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Source:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Source0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Source1
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Source
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1CacheControlType:
      type: string
      enum:
        - ephemeral
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1CacheControlTtl
      required:
        - type
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1Items1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Type
        source:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1Source
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf1CacheControl
      required:
        - type
        - source
      title: OpenRouterAnthropicMessageParamContentOneOf1Items1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Type:
      type: string
      enum:
        - document
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf0Type:
      type: string
      enum:
        - base64
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf0Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf0MediaType:
      type: string
      enum:
        - application/pdf
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf0MediaType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf0Type
        media_type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf0MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf1Type:
      type: string
      enum:
        - text
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf1MediaType:
      type: string
      enum:
        - text/plain
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf1MediaType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf1Type
        media_type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf1MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Type:
      type: string
      enum:
        - content
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0Type:
      type: string
      enum:
        - text
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_char_index:
          type: number
          format: double
        end_char_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_char_index
        - end_char_index
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_page_number:
          type: number
          format: double
        end_page_number:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_page_number
        - end_page_number
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_block_index
        - end_block_index
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems2
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
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
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems3
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
        cited_text:
          type: string
        search_result_index:
          type: number
          format: double
        source:
          type: string
        title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - search_result_index
        - source
        - title
        - start_block_index
        - end_block_index
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems4
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems1
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems2
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems3
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems4
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlTtl
      required:
        - type
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0Type
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControl
      required:
        - type
        - text
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Type:
      type: string
      enum:
        - image
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0Type:
      type: string
      enum:
        - base64
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0MediaType:
      type: string
      enum:
        - image/jpeg
        - image/png
        - image/gif
        - image/webp
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0MediaType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0Type
        media_type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf1Type:
      type: string
      enum:
        - url
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf1Type
        url:
          type: string
      required:
        - type
        - url
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source1
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlTtl
      required:
        - type
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Type
        source:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControl
      required:
        - type
        - source
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items1
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content1:
      type: array
      items:
        $ref: >-
          #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content:
      oneOf:
        - type: string
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content1
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Type
        content:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content
      required:
        - type
        - content
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source2
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf3Type:
      type: string
      enum:
        - url
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf3Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2SourceOneOf3Type
        url:
          type: string
      required:
        - type
        - url
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source3
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source1
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source2
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source3
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Citations:
      type: object
      properties:
        enabled:
          type: boolean
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Citations
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2CacheControlType:
      type: string
      enum:
        - ephemeral
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2CacheControlTtl
      required:
        - type
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1Items2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Type
        source:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Source
        citations:
          oneOf:
            - $ref: >-
                #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2Citations
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
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf2CacheControl
      required:
        - type
        - source
      title: OpenRouterAnthropicMessageParamContentOneOf1Items2
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3Type:
      type: string
      enum:
        - tool_use
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3CacheControlType:
      type: string
      enum:
        - ephemeral
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3CacheControlTtl
      required:
        - type
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1Items3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3Type
        id:
          type: string
        name:
          type: string
        input:
          oneOf:
            - description: Any type
            - type: 'null'
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf3CacheControl
      required:
        - type
        - id
        - name
      title: OpenRouterAnthropicMessageParamContentOneOf1Items3
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4Type:
      type: string
      enum:
        - tool_result
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0Type:
      type: string
      enum:
        - text
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_char_index:
          type: number
          format: double
        end_char_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_char_index
        - end_char_index
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_page_number:
          type: number
          format: double
        end_page_number:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_page_number
        - end_page_number
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_block_index
        - end_block_index
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems2
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
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
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems3
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
        cited_text:
          type: string
        search_result_index:
          type: number
          format: double
        source:
          type: string
        title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - search_result_index
        - source
        - title
        - start_block_index
        - end_block_index
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems4
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems1
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems2
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems3
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems4
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlTtl
      required:
        - type
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0Type
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControl
      required:
        - type
        - text
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Type:
      type: string
      enum:
        - image
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0Type:
      type: string
      enum:
        - base64
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0MediaType:
      type: string
      enum:
        - image/jpeg
        - image/png
        - image/gif
        - image/webp
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0MediaType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0Type
        media_type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf1Type:
      type: string
      enum:
        - url
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf1Type
        url:
          type: string
      required:
        - type
        - url
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source1
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlTtl
      required:
        - type
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Type
        source:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControl
      required:
        - type
        - source
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items1
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4Content1:
      type: array
      items:
        $ref: >-
          #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4Content1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4Content:
      oneOf:
        - type: string
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4Content1
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4Content
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4CacheControlType:
      type: string
      enum:
        - ephemeral
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4CacheControlTtl
      required:
        - type
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1Items4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4Type
        tool_use_id:
          type: string
        content:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4Content
        is_error:
          type: boolean
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf4CacheControl
      required:
        - type
        - tool_use_id
      title: OpenRouterAnthropicMessageParamContentOneOf1Items4
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf5Type:
      type: string
      enum:
        - thinking
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf5Type
    OpenRouterAnthropicMessageParamContentOneOf1Items5:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf5Type
        thinking:
          type: string
        signature:
          type: string
      required:
        - type
        - thinking
        - signature
      title: OpenRouterAnthropicMessageParamContentOneOf1Items5
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf6Type:
      type: string
      enum:
        - redacted_thinking
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf6Type
    OpenRouterAnthropicMessageParamContentOneOf1Items6:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf6Type
        data:
          type: string
      required:
        - type
        - data
      title: OpenRouterAnthropicMessageParamContentOneOf1Items6
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7Type:
      type: string
      enum:
        - server_tool_use
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7Name:
      type: string
      enum:
        - web_search
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7Name
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7CacheControlType:
      type: string
      enum:
        - ephemeral
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7CacheControlTtl
      required:
        - type
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1Items7:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7Type
        id:
          type: string
        name:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7Name
        input:
          oneOf:
            - description: Any type
            - type: 'null'
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf7CacheControl
      required:
        - type
        - id
        - name
      title: OpenRouterAnthropicMessageParamContentOneOf1Items7
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Type:
      type: string
      enum:
        - web_search_tool_result
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf0ItemsType:
      type: string
      enum:
        - web_search_result
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf0ItemsType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf0Items:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf0ItemsType
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
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf0Items
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Content0:
      type: array
      items:
        $ref: >-
          #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf0Items
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Content0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf1Type:
      type: string
      enum:
        - web_search_tool_result_error
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf1ErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - max_uses_exceeded
        - too_many_requests
        - query_too_long
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf1ErrorCode
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Content1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf1Type
        error_code:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8ContentOneOf1ErrorCode
      required:
        - type
        - error_code
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Content1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Content:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Content0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Content1
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Content
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8CacheControlType:
      type: string
      enum:
        - ephemeral
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8CacheControlTtl
      required:
        - type
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1Items8:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Type
        tool_use_id:
          type: string
        content:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8Content
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf8CacheControl
      required:
        - type
        - tool_use_id
        - content
      title: OpenRouterAnthropicMessageParamContentOneOf1Items8
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9Type:
      type: string
      enum:
        - search_result
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsType:
      type: string
      enum:
        - text
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf0Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf0Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_char_index:
          type: number
          format: double
        end_char_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_char_index
        - end_char_index
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems0
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf1Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf1Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_page_number:
          type: number
          format: double
        end_page_number:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_page_number
        - end_page_number
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems1
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf2Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf2Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_block_index
        - end_block_index
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems2
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf3Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf3Type
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
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems3
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf4Type
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf4Type
        cited_text:
          type: string
        search_result_index:
          type: number
          format: double
        source:
          type: string
        title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - search_result_index
        - source
        - title
        - start_block_index
        - end_block_index
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems4
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems1
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems2
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems3
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems4
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlTtl
      required:
        - type
      title: >-
        OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItems:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsType
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControl
      required:
        - type
        - text
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItems
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9Citations:
      type: object
      properties:
        enabled:
          type: boolean
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9Citations
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9CacheControlType:
      type: string
      enum:
        - ephemeral
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9CacheControlType
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9CacheControlTtl
    OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9CacheControlTtl
      required:
        - type
      title: OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9CacheControl
    OpenRouterAnthropicMessageParamContentOneOf1Items9:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9Type
        source:
          type: string
        title:
          type: string
        content:
          type: array
          items:
            $ref: >-
              #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9ContentItems
        citations:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9Citations
        cache_control:
          $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1ItemsOneOf9CacheControl
      required:
        - type
        - source
        - title
        - content
      title: OpenRouterAnthropicMessageParamContentOneOf1Items9
    OpenRouterAnthropicMessageParamContentOneOf1Items:
      oneOf:
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1Items0
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1Items1
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1Items2
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1Items3
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1Items4
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1Items5
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1Items6
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1Items7
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1Items8
        - $ref: >-
            #/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1Items9
      title: OpenRouterAnthropicMessageParamContentOneOf1Items
    OpenRouterAnthropicMessageParamContent1:
      type: array
      items:
        $ref: '#/components/schemas/OpenRouterAnthropicMessageParamContentOneOf1Items'
      title: OpenRouterAnthropicMessageParamContent1
    OpenRouterAnthropicMessageParamContent:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/OpenRouterAnthropicMessageParamContent1'
      title: OpenRouterAnthropicMessageParamContent
    OpenRouterAnthropicMessageParam:
      type: object
      properties:
        role:
          $ref: '#/components/schemas/OpenRouterAnthropicMessageParamRole'
        content:
          $ref: '#/components/schemas/OpenRouterAnthropicMessageParamContent'
      required:
        - role
        - content
      description: Anthropic message with OpenRouter extensions
      title: OpenRouterAnthropicMessageParam
    AnthropicMessagesRequestSystemOneOf1ItemsType:
      type: string
      enum:
        - text
      title: AnthropicMessagesRequestSystemOneOf1ItemsType
    AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf0Type
    AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf0Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_char_index:
          type: number
          format: double
        end_char_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_char_index
        - end_char_index
      title: AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems0
    AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf1Type
    AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf1Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_page_number:
          type: number
          format: double
        end_page_number:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_page_number
        - end_page_number
      title: AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems1
    AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf2Type
    AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf2Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_block_index
        - end_block_index
      title: AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems2
    AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf3Type
    AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf3Type
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
      title: AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems3
    AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf4Type
    AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCitationsItemsOneOf4Type
        cited_text:
          type: string
        search_result_index:
          type: number
          format: double
        source:
          type: string
        title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - search_result_index
        - source
        - title
        - start_block_index
        - end_block_index
      title: AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems4
    AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems0
        - $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems1
        - $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems2
        - $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems3
        - $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems4
      title: AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems
    AnthropicMessagesRequestSystemOneOf1ItemsCacheControlType:
      type: string
      enum:
        - ephemeral
      title: AnthropicMessagesRequestSystemOneOf1ItemsCacheControlType
    AnthropicMessagesRequestSystemOneOf1ItemsCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: AnthropicMessagesRequestSystemOneOf1ItemsCacheControlTtl
    AnthropicMessagesRequestSystemOneOf1ItemsCacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCacheControlType
        ttl:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCacheControlTtl
      required:
        - type
      title: AnthropicMessagesRequestSystemOneOf1ItemsCacheControl
    AnthropicMessagesRequestSystemOneOf1Items:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsType'
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCitationsItems
        cache_control:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestSystemOneOf1ItemsCacheControl
      required:
        - type
        - text
      title: AnthropicMessagesRequestSystemOneOf1Items
    AnthropicMessagesRequestSystem1:
      type: array
      items:
        $ref: '#/components/schemas/AnthropicMessagesRequestSystemOneOf1Items'
      title: AnthropicMessagesRequestSystem1
    AnthropicMessagesRequestSystem:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/AnthropicMessagesRequestSystem1'
      title: AnthropicMessagesRequestSystem
    AnthropicMessagesRequestMetadata:
      type: object
      properties:
        user_id:
          type:
            - string
            - 'null'
      title: AnthropicMessagesRequestMetadata
    AnthropicMessagesRequestToolsItemsOneOf0InputSchemaType:
      type: string
      enum:
        - object
      title: AnthropicMessagesRequestToolsItemsOneOf0InputSchemaType
    AnthropicMessagesRequestToolsItemsOneOf0InputSchema:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf0InputSchemaType
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
      required:
        - type
      title: AnthropicMessagesRequestToolsItemsOneOf0InputSchema
    AnthropicMessagesRequestToolsItemsOneOf0Type:
      type: string
      enum:
        - custom
      title: AnthropicMessagesRequestToolsItemsOneOf0Type
    AnthropicMessagesRequestToolsItemsOneOf0CacheControlType:
      type: string
      enum:
        - ephemeral
      title: AnthropicMessagesRequestToolsItemsOneOf0CacheControlType
    AnthropicMessagesRequestToolsItemsOneOf0CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: AnthropicMessagesRequestToolsItemsOneOf0CacheControlTtl
    AnthropicMessagesRequestToolsItemsOneOf0CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf0CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf0CacheControlTtl
      required:
        - type
      title: AnthropicMessagesRequestToolsItemsOneOf0CacheControl
    AnthropicMessagesRequestToolsItems0:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        input_schema:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf0InputSchema
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolsItemsOneOf0Type'
        cache_control:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf0CacheControl
      required:
        - name
        - input_schema
      title: AnthropicMessagesRequestToolsItems0
    AnthropicMessagesRequestToolsItemsOneOf1Type:
      type: string
      enum:
        - bash_20250124
      title: AnthropicMessagesRequestToolsItemsOneOf1Type
    AnthropicMessagesRequestToolsItemsOneOf1Name:
      type: string
      enum:
        - bash
      title: AnthropicMessagesRequestToolsItemsOneOf1Name
    AnthropicMessagesRequestToolsItemsOneOf1CacheControlType:
      type: string
      enum:
        - ephemeral
      title: AnthropicMessagesRequestToolsItemsOneOf1CacheControlType
    AnthropicMessagesRequestToolsItemsOneOf1CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: AnthropicMessagesRequestToolsItemsOneOf1CacheControlTtl
    AnthropicMessagesRequestToolsItemsOneOf1CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf1CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf1CacheControlTtl
      required:
        - type
      title: AnthropicMessagesRequestToolsItemsOneOf1CacheControl
    AnthropicMessagesRequestToolsItems1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolsItemsOneOf1Type'
        name:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolsItemsOneOf1Name'
        cache_control:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf1CacheControl
      required:
        - type
        - name
      title: AnthropicMessagesRequestToolsItems1
    AnthropicMessagesRequestToolsItemsOneOf2Type:
      type: string
      enum:
        - text_editor_20250124
      title: AnthropicMessagesRequestToolsItemsOneOf2Type
    AnthropicMessagesRequestToolsItemsOneOf2Name:
      type: string
      enum:
        - str_replace_editor
      title: AnthropicMessagesRequestToolsItemsOneOf2Name
    AnthropicMessagesRequestToolsItemsOneOf2CacheControlType:
      type: string
      enum:
        - ephemeral
      title: AnthropicMessagesRequestToolsItemsOneOf2CacheControlType
    AnthropicMessagesRequestToolsItemsOneOf2CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: AnthropicMessagesRequestToolsItemsOneOf2CacheControlTtl
    AnthropicMessagesRequestToolsItemsOneOf2CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf2CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf2CacheControlTtl
      required:
        - type
      title: AnthropicMessagesRequestToolsItemsOneOf2CacheControl
    AnthropicMessagesRequestToolsItems2:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolsItemsOneOf2Type'
        name:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolsItemsOneOf2Name'
        cache_control:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf2CacheControl
      required:
        - type
        - name
      title: AnthropicMessagesRequestToolsItems2
    AnthropicMessagesRequestToolsItemsOneOf3Type:
      type: string
      enum:
        - web_search_20250305
      title: AnthropicMessagesRequestToolsItemsOneOf3Type
    AnthropicMessagesRequestToolsItemsOneOf3Name:
      type: string
      enum:
        - web_search
      title: AnthropicMessagesRequestToolsItemsOneOf3Name
    AnthropicMessagesRequestToolsItemsOneOf3UserLocationType:
      type: string
      enum:
        - approximate
      title: AnthropicMessagesRequestToolsItemsOneOf3UserLocationType
    AnthropicMessagesRequestToolsItemsOneOf3UserLocation:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf3UserLocationType
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
      title: AnthropicMessagesRequestToolsItemsOneOf3UserLocation
    AnthropicMessagesRequestToolsItemsOneOf3CacheControlType:
      type: string
      enum:
        - ephemeral
      title: AnthropicMessagesRequestToolsItemsOneOf3CacheControlType
    AnthropicMessagesRequestToolsItemsOneOf3CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: AnthropicMessagesRequestToolsItemsOneOf3CacheControlTtl
    AnthropicMessagesRequestToolsItemsOneOf3CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf3CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf3CacheControlTtl
      required:
        - type
      title: AnthropicMessagesRequestToolsItemsOneOf3CacheControl
    AnthropicMessagesRequestToolsItems3:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolsItemsOneOf3Type'
        name:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolsItemsOneOf3Name'
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
          type:
            - number
            - 'null'
          format: double
        user_location:
          oneOf:
            - $ref: >-
                #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf3UserLocation
            - type: 'null'
        cache_control:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestToolsItemsOneOf3CacheControl
      required:
        - type
        - name
      title: AnthropicMessagesRequestToolsItems3
    AnthropicMessagesRequestToolsItems:
      oneOf:
        - $ref: '#/components/schemas/AnthropicMessagesRequestToolsItems0'
        - $ref: '#/components/schemas/AnthropicMessagesRequestToolsItems1'
        - $ref: '#/components/schemas/AnthropicMessagesRequestToolsItems2'
        - $ref: '#/components/schemas/AnthropicMessagesRequestToolsItems3'
      title: AnthropicMessagesRequestToolsItems
    AnthropicMessagesRequestToolChoiceOneOf0Type:
      type: string
      enum:
        - auto
      title: AnthropicMessagesRequestToolChoiceOneOf0Type
    AnthropicMessagesRequestToolChoice0:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolChoiceOneOf0Type'
        disable_parallel_tool_use:
          type: boolean
      required:
        - type
      title: AnthropicMessagesRequestToolChoice0
    AnthropicMessagesRequestToolChoiceOneOf1Type:
      type: string
      enum:
        - any
      title: AnthropicMessagesRequestToolChoiceOneOf1Type
    AnthropicMessagesRequestToolChoice1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolChoiceOneOf1Type'
        disable_parallel_tool_use:
          type: boolean
      required:
        - type
      title: AnthropicMessagesRequestToolChoice1
    AnthropicMessagesRequestToolChoiceOneOf2Type:
      type: string
      enum:
        - none
      title: AnthropicMessagesRequestToolChoiceOneOf2Type
    AnthropicMessagesRequestToolChoice2:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolChoiceOneOf2Type'
      required:
        - type
      title: AnthropicMessagesRequestToolChoice2
    AnthropicMessagesRequestToolChoiceOneOf3Type:
      type: string
      enum:
        - tool
      title: AnthropicMessagesRequestToolChoiceOneOf3Type
    AnthropicMessagesRequestToolChoice3:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolChoiceOneOf3Type'
        name:
          type: string
        disable_parallel_tool_use:
          type: boolean
      required:
        - type
        - name
      title: AnthropicMessagesRequestToolChoice3
    AnthropicMessagesRequestToolChoice:
      oneOf:
        - $ref: '#/components/schemas/AnthropicMessagesRequestToolChoice0'
        - $ref: '#/components/schemas/AnthropicMessagesRequestToolChoice1'
        - $ref: '#/components/schemas/AnthropicMessagesRequestToolChoice2'
        - $ref: '#/components/schemas/AnthropicMessagesRequestToolChoice3'
      title: AnthropicMessagesRequestToolChoice
    AnthropicMessagesRequestThinkingOneOf0Type:
      type: string
      enum:
        - enabled
      title: AnthropicMessagesRequestThinkingOneOf0Type
    AnthropicMessagesRequestThinking0:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestThinkingOneOf0Type'
        budget_tokens:
          type: number
          format: double
      required:
        - type
        - budget_tokens
      title: AnthropicMessagesRequestThinking0
    AnthropicMessagesRequestThinkingOneOf1Type:
      type: string
      enum:
        - disabled
      title: AnthropicMessagesRequestThinkingOneOf1Type
    AnthropicMessagesRequestThinking1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestThinkingOneOf1Type'
      required:
        - type
      title: AnthropicMessagesRequestThinking1
    AnthropicMessagesRequestThinkingOneOf2Type:
      type: string
      enum:
        - adaptive
      title: AnthropicMessagesRequestThinkingOneOf2Type
    AnthropicMessagesRequestThinking2:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/AnthropicMessagesRequestThinkingOneOf2Type'
      required:
        - type
      title: AnthropicMessagesRequestThinking2
    AnthropicMessagesRequestThinking:
      oneOf:
        - $ref: '#/components/schemas/AnthropicMessagesRequestThinking0'
        - $ref: '#/components/schemas/AnthropicMessagesRequestThinking1'
        - $ref: '#/components/schemas/AnthropicMessagesRequestThinking2'
      title: AnthropicMessagesRequestThinking
    AnthropicMessagesRequestServiceTier:
      type: string
      enum:
        - auto
        - standard_only
      title: AnthropicMessagesRequestServiceTier
    DataCollection:
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
      title: DataCollection
    ProviderName:
      type: string
      enum:
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
    AnthropicMessagesRequestProviderOrderItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: AnthropicMessagesRequestProviderOrderItems
    AnthropicMessagesRequestProviderOnlyItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: AnthropicMessagesRequestProviderOnlyItems
    AnthropicMessagesRequestProviderIgnoreItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: AnthropicMessagesRequestProviderIgnoreItems
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
    AnthropicMessagesRequestProviderSort:
      type: object
      properties: {}
      title: AnthropicMessagesRequestProviderSort
    BigNumberUnion:
      type: string
      description: Price per million prompt tokens
      title: BigNumberUnion
    AnthropicMessagesRequestProviderMaxPriceCompletion:
      type: object
      properties: {}
      title: AnthropicMessagesRequestProviderMaxPriceCompletion
    AnthropicMessagesRequestProviderMaxPriceImage:
      type: object
      properties: {}
      title: AnthropicMessagesRequestProviderMaxPriceImage
    AnthropicMessagesRequestProviderMaxPriceAudio:
      type: object
      properties: {}
      title: AnthropicMessagesRequestProviderMaxPriceAudio
    AnthropicMessagesRequestProviderMaxPriceRequest:
      type: object
      properties: {}
      title: AnthropicMessagesRequestProviderMaxPriceRequest
    AnthropicMessagesRequestProviderMaxPrice:
      type: object
      properties:
        prompt:
          $ref: '#/components/schemas/BigNumberUnion'
        completion:
          $ref: >-
            #/components/schemas/AnthropicMessagesRequestProviderMaxPriceCompletion
        image:
          $ref: '#/components/schemas/AnthropicMessagesRequestProviderMaxPriceImage'
        audio:
          $ref: '#/components/schemas/AnthropicMessagesRequestProviderMaxPriceAudio'
        request:
          $ref: '#/components/schemas/AnthropicMessagesRequestProviderMaxPriceRequest'
      description: >-
        The object specifying the maximum price you want to pay for this
        request. USD price per million tokens, for prompt and completion.
      title: AnthropicMessagesRequestProviderMaxPrice
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
    AnthropicMessagesRequestProvider:
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
          $ref: '#/components/schemas/DataCollection'
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
            $ref: '#/components/schemas/AnthropicMessagesRequestProviderOrderItems'
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
            $ref: '#/components/schemas/AnthropicMessagesRequestProviderOnlyItems'
          description: >-
            List of provider slugs to allow. If provided, this list is merged
            with your account-wide allowed provider settings for this request.
        ignore:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/AnthropicMessagesRequestProviderIgnoreItems'
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
          $ref: '#/components/schemas/AnthropicMessagesRequestProviderSort'
        max_price:
          $ref: '#/components/schemas/AnthropicMessagesRequestProviderMaxPrice'
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
      title: AnthropicMessagesRequestProvider
    AnthropicMessagesRequestPluginsItemsOneOf0Id:
      type: string
      enum:
        - auto-router
      title: AnthropicMessagesRequestPluginsItemsOneOf0Id
    AnthropicMessagesRequestPluginsItems0:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/AnthropicMessagesRequestPluginsItemsOneOf0Id'
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
      title: AnthropicMessagesRequestPluginsItems0
    AnthropicMessagesRequestPluginsItemsOneOf1Id:
      type: string
      enum:
        - moderation
      title: AnthropicMessagesRequestPluginsItemsOneOf1Id
    AnthropicMessagesRequestPluginsItems1:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/AnthropicMessagesRequestPluginsItemsOneOf1Id'
      required:
        - id
      title: AnthropicMessagesRequestPluginsItems1
    AnthropicMessagesRequestPluginsItemsOneOf2Id:
      type: string
      enum:
        - web
      title: AnthropicMessagesRequestPluginsItemsOneOf2Id
    WebSearchEngine:
      type: string
      enum:
        - native
        - exa
      description: The search engine to use for web search.
      title: WebSearchEngine
    AnthropicMessagesRequestPluginsItems2:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/AnthropicMessagesRequestPluginsItemsOneOf2Id'
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
      title: AnthropicMessagesRequestPluginsItems2
    AnthropicMessagesRequestPluginsItemsOneOf3Id:
      type: string
      enum:
        - file-parser
      title: AnthropicMessagesRequestPluginsItemsOneOf3Id
    PDFParserEngine:
      type: string
      enum:
        - mistral-ocr
        - pdf-text
        - native
      description: The engine to use for parsing PDF files.
      title: PDFParserEngine
    PDFParserOptions:
      type: object
      properties:
        engine:
          $ref: '#/components/schemas/PDFParserEngine'
      description: Options for PDF parsing.
      title: PDFParserOptions
    AnthropicMessagesRequestPluginsItems3:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/AnthropicMessagesRequestPluginsItemsOneOf3Id'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the file-parser plugin for this request.
            Defaults to true.
        pdf:
          $ref: '#/components/schemas/PDFParserOptions'
      required:
        - id
      title: AnthropicMessagesRequestPluginsItems3
    AnthropicMessagesRequestPluginsItemsOneOf4Id:
      type: string
      enum:
        - response-healing
      title: AnthropicMessagesRequestPluginsItemsOneOf4Id
    AnthropicMessagesRequestPluginsItems4:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/AnthropicMessagesRequestPluginsItemsOneOf4Id'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the response-healing plugin for this
            request. Defaults to true.
      required:
        - id
      title: AnthropicMessagesRequestPluginsItems4
    AnthropicMessagesRequestPluginsItems:
      oneOf:
        - $ref: '#/components/schemas/AnthropicMessagesRequestPluginsItems0'
        - $ref: '#/components/schemas/AnthropicMessagesRequestPluginsItems1'
        - $ref: '#/components/schemas/AnthropicMessagesRequestPluginsItems2'
        - $ref: '#/components/schemas/AnthropicMessagesRequestPluginsItems3'
        - $ref: '#/components/schemas/AnthropicMessagesRequestPluginsItems4'
      title: AnthropicMessagesRequestPluginsItems
    AnthropicMessagesRequestTrace:
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
      title: AnthropicMessagesRequestTrace
    AnthropicOutputConfigEffort:
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
      title: AnthropicOutputConfigEffort
    AnthropicOutputConfig:
      type: object
      properties:
        effort:
          oneOf:
            - $ref: '#/components/schemas/AnthropicOutputConfigEffort'
            - type: 'null'
          description: >-
            How much effort the model should put into its response. Higher
            effort levels may result in more thorough analysis but take longer.
            Valid values are `low`, `medium`, `high`, or `max`.
      description: >-
        Configuration for controlling output behavior. Currently supports the
        effort parameter for Claude Opus 4.5.
      title: AnthropicOutputConfig
    AnthropicMessagesRequest:
      type: object
      properties:
        model:
          type: string
        max_tokens:
          type: number
          format: double
        messages:
          type: array
          items:
            $ref: '#/components/schemas/OpenRouterAnthropicMessageParam'
        system:
          $ref: '#/components/schemas/AnthropicMessagesRequestSystem'
        metadata:
          $ref: '#/components/schemas/AnthropicMessagesRequestMetadata'
        stop_sequences:
          type: array
          items:
            type: string
        stream:
          type: boolean
        temperature:
          type: number
          format: double
        top_p:
          type: number
          format: double
        top_k:
          type: number
          format: double
        tools:
          type: array
          items:
            $ref: '#/components/schemas/AnthropicMessagesRequestToolsItems'
        tool_choice:
          $ref: '#/components/schemas/AnthropicMessagesRequestToolChoice'
        thinking:
          $ref: '#/components/schemas/AnthropicMessagesRequestThinking'
        service_tier:
          $ref: '#/components/schemas/AnthropicMessagesRequestServiceTier'
        provider:
          oneOf:
            - $ref: '#/components/schemas/AnthropicMessagesRequestProvider'
            - type: 'null'
          description: >-
            When multiple model providers are available, optionally indicate
            your routing preference.
        plugins:
          type: array
          items:
            $ref: '#/components/schemas/AnthropicMessagesRequestPluginsItems'
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
            users. Maximum of 128 characters.
        session_id:
          type: string
          description: >-
            A unique identifier for grouping related requests (e.g., a
            conversation or agent workflow) for observability. If provided in
            both the request body and the x-session-id header, the body value
            takes precedence. Maximum of 128 characters.
        trace:
          $ref: '#/components/schemas/AnthropicMessagesRequestTrace'
          description: >-
            Metadata for observability and tracing. Known keys (trace_id,
            trace_name, span_name, generation_name, parent_span_id) have special
            handling. Additional keys are passed through as custom metadata to
            configured broadcast destinations.
        models:
          type: array
          items:
            type: string
        output_config:
          $ref: '#/components/schemas/AnthropicOutputConfig'
      required:
        - model
        - max_tokens
        - messages
      description: Request schema for Anthropic Messages API endpoint
      title: AnthropicMessagesRequest
    BaseAnthropicMessagesResponseType:
      type: string
      enum:
        - message
      title: BaseAnthropicMessagesResponseType
    BaseAnthropicMessagesResponseRole:
      type: string
      enum:
        - assistant
      title: BaseAnthropicMessagesResponseRole
    BaseAnthropicMessagesResponseContentItemsOneOf0Type:
      type: string
      enum:
        - text
      title: BaseAnthropicMessagesResponseContentItemsOneOf0Type
    BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf0Type
    BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf0Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_char_index:
          type: number
          format: double
        end_char_index:
          type: number
          format: double
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
      title: BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems0
    BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf1Type
    BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf1Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_page_number:
          type: number
          format: double
        end_page_number:
          type: number
          format: double
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
      title: BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems1
    BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf2Type
    BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf2Type
        cited_text:
          type: string
        document_index:
          type: number
          format: double
        document_title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
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
      title: BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems2
    BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf3Type
    BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf3Type
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
      title: BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems3
    BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf4Type
    BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItemsOneOf4Type
        cited_text:
          type: string
        search_result_index:
          type: number
          format: double
        source:
          type: string
        title:
          type:
            - string
            - 'null'
        start_block_index:
          type: number
          format: double
        end_block_index:
          type: number
          format: double
      required:
        - type
        - cited_text
        - search_result_index
        - source
        - title
        - start_block_index
        - end_block_index
      title: BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems4
    BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems0
        - $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems1
        - $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems2
        - $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems3
        - $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems4
      title: BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems
    BaseAnthropicMessagesResponseContentItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0Type
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf0CitationsItems
      required:
        - type
        - text
        - citations
      title: BaseAnthropicMessagesResponseContentItems0
    BaseAnthropicMessagesResponseContentItemsOneOf1Type:
      type: string
      enum:
        - tool_use
      title: BaseAnthropicMessagesResponseContentItemsOneOf1Type
    BaseAnthropicMessagesResponseContentItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf1Type
        id:
          type: string
        name:
          type: string
        input:
          oneOf:
            - description: Any type
            - type: 'null'
      required:
        - type
        - id
        - name
      title: BaseAnthropicMessagesResponseContentItems1
    BaseAnthropicMessagesResponseContentItemsOneOf2Type:
      type: string
      enum:
        - thinking
      title: BaseAnthropicMessagesResponseContentItemsOneOf2Type
    BaseAnthropicMessagesResponseContentItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf2Type
        thinking:
          type: string
        signature:
          type: string
      required:
        - type
        - thinking
        - signature
      title: BaseAnthropicMessagesResponseContentItems2
    BaseAnthropicMessagesResponseContentItemsOneOf3Type:
      type: string
      enum:
        - redacted_thinking
      title: BaseAnthropicMessagesResponseContentItemsOneOf3Type
    BaseAnthropicMessagesResponseContentItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf3Type
        data:
          type: string
      required:
        - type
        - data
      title: BaseAnthropicMessagesResponseContentItems3
    BaseAnthropicMessagesResponseContentItemsOneOf4Type:
      type: string
      enum:
        - server_tool_use
      title: BaseAnthropicMessagesResponseContentItemsOneOf4Type
    BaseAnthropicMessagesResponseContentItemsOneOf4Name:
      type: string
      enum:
        - web_search
      title: BaseAnthropicMessagesResponseContentItemsOneOf4Name
    BaseAnthropicMessagesResponseContentItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf4Type
        id:
          type: string
        name:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf4Name
        input:
          oneOf:
            - description: Any type
            - type: 'null'
      required:
        - type
        - id
        - name
      title: BaseAnthropicMessagesResponseContentItems4
    BaseAnthropicMessagesResponseContentItemsOneOf5Type:
      type: string
      enum:
        - web_search_tool_result
      title: BaseAnthropicMessagesResponseContentItemsOneOf5Type
    BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf0ItemsType:
      type: string
      enum:
        - web_search_result
      title: BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf0ItemsType
    BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf0Items:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf0ItemsType
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
      title: BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf0Items
    BaseAnthropicMessagesResponseContentItemsOneOf5Content0:
      type: array
      items:
        $ref: >-
          #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf0Items
      title: BaseAnthropicMessagesResponseContentItemsOneOf5Content0
    BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf1Type:
      type: string
      enum:
        - web_search_tool_result_error
      title: BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf1Type
    BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf1ErrorCode:
      type: string
      enum:
        - invalid_tool_input
        - unavailable
        - max_uses_exceeded
        - too_many_requests
        - query_too_long
      title: BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf1ErrorCode
    BaseAnthropicMessagesResponseContentItemsOneOf5Content1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf1Type
        error_code:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf5ContentOneOf1ErrorCode
      required:
        - type
        - error_code
      title: BaseAnthropicMessagesResponseContentItemsOneOf5Content1
    BaseAnthropicMessagesResponseContentItemsOneOf5Content:
      oneOf:
        - $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf5Content0
        - $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf5Content1
      title: BaseAnthropicMessagesResponseContentItemsOneOf5Content
    BaseAnthropicMessagesResponseContentItems5:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf5Type
        tool_use_id:
          type: string
        content:
          $ref: >-
            #/components/schemas/BaseAnthropicMessagesResponseContentItemsOneOf5Content
      required:
        - type
        - tool_use_id
        - content
      title: BaseAnthropicMessagesResponseContentItems5
    BaseAnthropicMessagesResponseContentItems:
      oneOf:
        - $ref: '#/components/schemas/BaseAnthropicMessagesResponseContentItems0'
        - $ref: '#/components/schemas/BaseAnthropicMessagesResponseContentItems1'
        - $ref: '#/components/schemas/BaseAnthropicMessagesResponseContentItems2'
        - $ref: '#/components/schemas/BaseAnthropicMessagesResponseContentItems3'
        - $ref: '#/components/schemas/BaseAnthropicMessagesResponseContentItems4'
        - $ref: '#/components/schemas/BaseAnthropicMessagesResponseContentItems5'
      title: BaseAnthropicMessagesResponseContentItems
    BaseAnthropicMessagesResponseStopReason:
      type: string
      enum:
        - end_turn
        - max_tokens
        - stop_sequence
        - tool_use
        - pause_turn
        - refusal
      title: BaseAnthropicMessagesResponseStopReason
    BaseAnthropicMessagesResponseUsageCacheCreation:
      type: object
      properties:
        ephemeral_5m_input_tokens:
          type: number
          format: double
        ephemeral_1h_input_tokens:
          type: number
          format: double
      required:
        - ephemeral_5m_input_tokens
        - ephemeral_1h_input_tokens
      title: BaseAnthropicMessagesResponseUsageCacheCreation
    BaseAnthropicMessagesResponseUsageServerToolUse:
      type: object
      properties:
        web_search_requests:
          type: number
          format: double
      required:
        - web_search_requests
      title: BaseAnthropicMessagesResponseUsageServerToolUse
    BaseAnthropicMessagesResponseUsageServiceTier:
      type: string
      enum:
        - standard
        - priority
        - batch
      title: BaseAnthropicMessagesResponseUsageServiceTier
    BaseAnthropicMessagesResponseUsage:
      type: object
      properties:
        input_tokens:
          type: number
          format: double
        output_tokens:
          type: number
          format: double
        cache_creation_input_tokens:
          type:
            - number
            - 'null'
          format: double
        cache_read_input_tokens:
          type:
            - number
            - 'null'
          format: double
        cache_creation:
          oneOf:
            - $ref: >-
                #/components/schemas/BaseAnthropicMessagesResponseUsageCacheCreation
            - type: 'null'
        inference_geo:
          type:
            - string
            - 'null'
        server_tool_use:
          oneOf:
            - $ref: >-
                #/components/schemas/BaseAnthropicMessagesResponseUsageServerToolUse
            - type: 'null'
        service_tier:
          oneOf:
            - $ref: >-
                #/components/schemas/BaseAnthropicMessagesResponseUsageServiceTier
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
      title: BaseAnthropicMessagesResponseUsage
    AnthropicMessagesResponse:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: '#/components/schemas/BaseAnthropicMessagesResponseType'
        role:
          $ref: '#/components/schemas/BaseAnthropicMessagesResponseRole'
        content:
          type: array
          items:
            $ref: '#/components/schemas/BaseAnthropicMessagesResponseContentItems'
        model:
          type: string
        stop_reason:
          oneOf:
            - $ref: '#/components/schemas/BaseAnthropicMessagesResponseStopReason'
            - type: 'null'
        stop_sequence:
          type:
            - string
            - 'null'
        usage:
          $ref: '#/components/schemas/BaseAnthropicMessagesResponseUsage'
      required:
        - id
        - type
        - role
        - content
        - model
        - stop_reason
        - stop_sequence
        - usage
      description: >-
        Non-streaming response from the Anthropic Messages API with OpenRouter
        extensions
      title: AnthropicMessagesResponse
    MessagesPostResponsesContentApplicationJsonSchemaType:
      type: string
      enum:
        - error
      title: MessagesPostResponsesContentApplicationJsonSchemaType
    MessagesPostResponsesContentApplicationJsonSchemaError:
      type: object
      properties:
        type:
          type: string
        message:
          type: string
      required:
        - type
        - message
      title: MessagesPostResponsesContentApplicationJsonSchemaError
    CreateMessagesRequestBadRequestError:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaType
        error:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaError
      required:
        - type
        - error
      title: CreateMessagesRequestBadRequestError
    CreateMessagesRequestUnauthorizedError:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaType
        error:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaError
      required:
        - type
        - error
      title: CreateMessagesRequestUnauthorizedError
    CreateMessagesRequestForbiddenError:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaType
        error:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaError
      required:
        - type
        - error
      title: CreateMessagesRequestForbiddenError
    CreateMessagesRequestNotFoundError:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaType
        error:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaError
      required:
        - type
        - error
      title: CreateMessagesRequestNotFoundError
    CreateMessagesRequestTooManyRequestsError:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaType
        error:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaError
      required:
        - type
        - error
      title: CreateMessagesRequestTooManyRequestsError
    CreateMessagesRequestInternalServerError:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaType
        error:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaError
      required:
        - type
        - error
      title: CreateMessagesRequestInternalServerError
    CreateMessagesRequestServiceUnavailableError:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaType
        error:
          $ref: >-
            #/components/schemas/MessagesPostResponsesContentApplicationJsonSchemaError
      required:
        - type
        - error
      title: CreateMessagesRequestServiceUnavailableError
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
    "model": "anthropic/claude-4.5-sonnet-20250929",
    "max_tokens": 1024,
    "messages": [
        {
            "role": "user",
            "content": "Hello, how are you?"
        }
    ],
    "temperature": 0.7
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
  body: '{"model":"anthropic/claude-4.5-sonnet-20250929","max_tokens":1024,"messages":[{"role":"user","content":"Hello, how are you?"}],"temperature":0.7}'
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

	payload := strings.NewReader("{\n  \"model\": \"anthropic/claude-4.5-sonnet-20250929\",\n  \"max_tokens\": 1024,\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"temperature\": 0.7\n}")

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
request.body = "{\n  \"model\": \"anthropic/claude-4.5-sonnet-20250929\",\n  \"max_tokens\": 1024,\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"temperature\": 0.7\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/messages")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"model\": \"anthropic/claude-4.5-sonnet-20250929\",\n  \"max_tokens\": 1024,\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"temperature\": 0.7\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/messages', [
  'body' => '{
  "model": "anthropic/claude-4.5-sonnet-20250929",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "temperature": 0.7
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
request.AddParameter("application/json", "{\n  \"model\": \"anthropic/claude-4.5-sonnet-20250929\",\n  \"max_tokens\": 1024,\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"temperature\": 0.7\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "model": "anthropic/claude-4.5-sonnet-20250929",
  "max_tokens": 1024,
  "messages": [
    [
      "role": "user",
      "content": "Hello, how are you?"
    ]
  ],
  "temperature": 0.7
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