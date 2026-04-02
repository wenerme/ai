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
              $ref: '#/components/schemas/MessagesRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    MessagesMessageParamRole:
      type: string
      enum:
        - user
        - assistant
      title: MessagesMessageParamRole
    MessagesMessageParamContentOneOf1ItemsOneOf0Type:
      type: string
      enum:
        - text
      title: MessagesMessageParamContentOneOf1ItemsOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
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
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems0
    MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
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
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems1
    MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
    MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
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
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems2
    MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
    MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
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
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems3
    MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
    MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
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
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems4
    MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems1
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems2
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems3
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems4
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems
    MessagesMessageParamContentOneOf1ItemsOneOf0CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf0CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf0CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CacheControlTtl
      required:
        - type
      title: MessagesMessageParamContentOneOf1ItemsOneOf0CacheControl
    MessagesMessageParamContentOneOf1Items0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0Type
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CitationsItems
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf0CacheControl
      required:
        - type
        - text
      title: MessagesMessageParamContentOneOf1Items0
    MessagesMessageParamContentOneOf1ItemsOneOf1Type:
      type: string
      enum:
        - image
      title: MessagesMessageParamContentOneOf1ItemsOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf1SourceOneOf0Type:
      type: string
      enum:
        - base64
      title: MessagesMessageParamContentOneOf1ItemsOneOf1SourceOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf1SourceOneOf0MediaType:
      type: string
      enum:
        - image/jpeg
        - image/png
        - image/gif
        - image/webp
      title: MessagesMessageParamContentOneOf1ItemsOneOf1SourceOneOf0MediaType
    MessagesMessageParamContentOneOf1ItemsOneOf1Source0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf1SourceOneOf0Type
        media_type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf1SourceOneOf0MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: MessagesMessageParamContentOneOf1ItemsOneOf1Source0
    MessagesMessageParamContentOneOf1ItemsOneOf1SourceOneOf1Type:
      type: string
      enum:
        - url
      title: MessagesMessageParamContentOneOf1ItemsOneOf1SourceOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf1Source1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf1SourceOneOf1Type
        url:
          type: string
      required:
        - type
        - url
      title: MessagesMessageParamContentOneOf1ItemsOneOf1Source1
    MessagesMessageParamContentOneOf1ItemsOneOf1Source:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf1Source0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf1Source1
      title: MessagesMessageParamContentOneOf1ItemsOneOf1Source
    MessagesMessageParamContentOneOf1ItemsOneOf1CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesMessageParamContentOneOf1ItemsOneOf1CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf1CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesMessageParamContentOneOf1ItemsOneOf1CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf1CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf1CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf1CacheControlTtl
      required:
        - type
      title: MessagesMessageParamContentOneOf1ItemsOneOf1CacheControl
    MessagesMessageParamContentOneOf1Items1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf1Type
        source:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf1Source
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf1CacheControl
      required:
        - type
        - source
      title: MessagesMessageParamContentOneOf1Items1
    MessagesMessageParamContentOneOf1ItemsOneOf2Type:
      type: string
      enum:
        - document
      title: MessagesMessageParamContentOneOf1ItemsOneOf2Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf0Type:
      type: string
      enum:
        - base64
      title: MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf0MediaType:
      type: string
      enum:
        - application/pdf
      title: MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf0MediaType
    MessagesMessageParamContentOneOf1ItemsOneOf2Source0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf0Type
        media_type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf0MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: MessagesMessageParamContentOneOf1ItemsOneOf2Source0
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf1Type:
      type: string
      enum:
        - text
      title: MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf1MediaType:
      type: string
      enum:
        - text/plain
      title: MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf1MediaType
    MessagesMessageParamContentOneOf1ItemsOneOf2Source1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf1Type
        media_type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf1MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: MessagesMessageParamContentOneOf1ItemsOneOf2Source1
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Type:
      type: string
      enum:
        - content
      title: MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0Type:
      type: string
      enum:
        - text
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems0
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems1
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems2
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems3
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems4
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems1
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems2
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems3
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems4
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlTtl
      required:
        - type
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControl
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0Type
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf0CacheControl
      required:
        - type
        - text
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items0
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Type:
      type: string
      enum:
        - image
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0Type:
      type: string
      enum:
        - base64
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0MediaType:
      type: string
      enum:
        - image/jpeg
        - image/png
        - image/gif
        - image/webp
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0MediaType
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0Type
        media_type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source0
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf1Type:
      type: string
      enum:
        - url
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf1Type
        url:
          type: string
      required:
        - type
        - url
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source1
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source1
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlTtl
      required:
        - type
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControl
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Type
        source:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1Source
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1ItemsOneOf1CacheControl
      required:
        - type
        - source
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items1
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items1
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content1:
      type: array
      items:
        $ref: >-
          #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2ContentOneOf1Items
      title: MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content1
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content:
      oneOf:
        - type: string
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content1
      title: MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content
    MessagesMessageParamContentOneOf1ItemsOneOf2Source2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Type
        content:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf2Content
      required:
        - type
        - content
      title: MessagesMessageParamContentOneOf1ItemsOneOf2Source2
    MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf3Type:
      type: string
      enum:
        - url
      title: MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf3Type
    MessagesMessageParamContentOneOf1ItemsOneOf2Source3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2SourceOneOf3Type
        url:
          type: string
      required:
        - type
        - url
      title: MessagesMessageParamContentOneOf1ItemsOneOf2Source3
    MessagesMessageParamContentOneOf1ItemsOneOf2Source:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2Source0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2Source1
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2Source2
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2Source3
      title: MessagesMessageParamContentOneOf1ItemsOneOf2Source
    MessagesMessageParamContentOneOf1ItemsOneOf2Citations:
      type: object
      properties:
        enabled:
          type: boolean
      title: MessagesMessageParamContentOneOf1ItemsOneOf2Citations
    MessagesMessageParamContentOneOf1ItemsOneOf2CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesMessageParamContentOneOf1ItemsOneOf2CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf2CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesMessageParamContentOneOf1ItemsOneOf2CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf2CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2CacheControlTtl
      required:
        - type
      title: MessagesMessageParamContentOneOf1ItemsOneOf2CacheControl
    MessagesMessageParamContentOneOf1Items2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2Type
        source:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2Source
        citations:
          oneOf:
            - $ref: >-
                #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2Citations
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
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf2CacheControl
      required:
        - type
        - source
      title: MessagesMessageParamContentOneOf1Items2
    MessagesMessageParamContentOneOf1ItemsOneOf3Type:
      type: string
      enum:
        - tool_use
      title: MessagesMessageParamContentOneOf1ItemsOneOf3Type
    MessagesMessageParamContentOneOf1ItemsOneOf3CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesMessageParamContentOneOf1ItemsOneOf3CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf3CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesMessageParamContentOneOf1ItemsOneOf3CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf3CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf3CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf3CacheControlTtl
      required:
        - type
      title: MessagesMessageParamContentOneOf1ItemsOneOf3CacheControl
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
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf3CacheControl
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
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0Type:
      type: string
      enum:
        - text
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems0
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems1
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems2
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems3
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems4
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems1
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems2
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems3
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems4
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControlTtl
      required:
        - type
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0Type
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CitationsItems
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf0CacheControl
      required:
        - type
        - text
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items0
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Type:
      type: string
      enum:
        - image
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0Type:
      type: string
      enum:
        - base64
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0MediaType:
      type: string
      enum:
        - image/jpeg
        - image/png
        - image/gif
        - image/webp
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0MediaType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0Type
        media_type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf0MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source0
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf1Type:
      type: string
      enum:
        - url
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1SourceOneOf1Type
        url:
          type: string
      required:
        - type
        - url
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source1
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source1
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControlTtl
      required:
        - type
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Type
        source:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1Source
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf1CacheControl
      required:
        - type
        - source
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items1
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
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3Type:
      type: string
      enum:
        - search_result
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsType:
      type: string
      enum:
        - text
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf0Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems0
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf1Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems1
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf2Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf2Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems2
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf3Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf3Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems3
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf4Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItemsOneOf4Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems4
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems1
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems2
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems3
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems4
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCacheControlTtl
      required:
        - type
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCacheControl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItems:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsType
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCitationsItems
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItemsCacheControl
      required:
        - type
        - text
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItems
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3Citations:
      type: object
      properties:
        enabled:
          type: boolean
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3Citations
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3CacheControlTtl
      required:
        - type
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3CacheControl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3Type
        source:
          type: string
        title:
          type: string
        content:
          type: array
          items:
            $ref: >-
              #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3ContentItems
        citations:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3Citations
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf3CacheControl
      required:
        - type
        - source
        - title
        - content
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items3
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Type:
      type: string
      enum:
        - document
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf0Type:
      type: string
      enum:
        - base64
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf0MediaType:
      type: string
      enum:
        - application/pdf
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf0MediaType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf0Type
        media_type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf0MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source0
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf1Type:
      type: string
      enum:
        - text
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf1MediaType:
      type: string
      enum:
        - text/plain
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf1MediaType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf1Type
        media_type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf1MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source1
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2Type:
      type: string
      enum:
        - content
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0Type:
      type: string
      enum:
        - text
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf0Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems0
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf1Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems1
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf2Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems2
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf3Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems3
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItemsOneOf4Type
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
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems4
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems1
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems2
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems3
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems4
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CacheControlTtl
      required:
        - type
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CacheControl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1Items0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0Type
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CitationsItems
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf0CacheControl
      required:
        - type
        - text
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1Items0
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Type:
      type: string
      enum:
        - image
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0Type:
      type: string
      enum:
        - base64
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0MediaType:
      type: string
      enum:
        - image/jpeg
        - image/png
        - image/gif
        - image/webp
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0MediaType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Source0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0Type
        media_type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf0MediaType
        data:
          type: string
      required:
        - type
        - media_type
        - data
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Source0
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf1Type:
      type: string
      enum:
        - url
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Source1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1SourceOneOf1Type
        url:
          type: string
      required:
        - type
        - url
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Source1
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Source:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Source0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Source1
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Source
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1CacheControlTtl
      required:
        - type
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1CacheControl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1Items1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Type
        source:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1Source
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1ItemsOneOf1CacheControl
      required:
        - type
        - source
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1Items1
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1Items:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1Items0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1Items1
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1Items
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2Content1:
      type: array
      items:
        $ref: >-
          #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2ContentOneOf1Items
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2Content1
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2Content:
      oneOf:
        - type: string
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2Content1
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2Content
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2Type
        content:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf2Content
      required:
        - type
        - content
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source2
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf3Type:
      type: string
      enum:
        - url
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf3Type
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4SourceOneOf3Type
        url:
          type: string
      required:
        - type
        - url
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source3
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source1
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source2
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source3
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Citations:
      type: object
      properties:
        enabled:
          type: boolean
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Citations
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4CacheControlType:
      type: string
      enum:
        - ephemeral
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4CacheControlTtl
      required:
        - type
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4CacheControl
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Type
        source:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Source
        citations:
          oneOf:
            - $ref: >-
                #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4Citations
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
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1ItemsOneOf4CacheControl
      required:
        - type
        - source
      title: MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items4
    MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items1
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items2
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items3
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4ContentOneOf1Items4
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
    MessagesMessageParamContentOneOf1ItemsOneOf4CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesMessageParamContentOneOf1ItemsOneOf4CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf4CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesMessageParamContentOneOf1ItemsOneOf4CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf4CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4CacheControlTtl
      required:
        - type
      title: MessagesMessageParamContentOneOf1ItemsOneOf4CacheControl
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
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf4CacheControl
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
    MessagesMessageParamContentOneOf1ItemsOneOf7CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesMessageParamContentOneOf1ItemsOneOf7CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf7CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesMessageParamContentOneOf1ItemsOneOf7CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf7CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf7CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf7CacheControlTtl
      required:
        - type
      title: MessagesMessageParamContentOneOf1ItemsOneOf7CacheControl
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
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf7CacheControl
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
    MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf0ItemsType:
      type: string
      enum:
        - web_search_result
      title: MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf0ItemsType
    MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf0Items:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf0ItemsType
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
      title: MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf0Items
    MessagesMessageParamContentOneOf1ItemsOneOf8Content0:
      type: array
      items:
        $ref: >-
          #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8ContentOneOf0Items
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
    MessagesMessageParamContentOneOf1ItemsOneOf8CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesMessageParamContentOneOf1ItemsOneOf8CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf8CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesMessageParamContentOneOf1ItemsOneOf8CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf8CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8CacheControlTtl
      required:
        - type
      title: MessagesMessageParamContentOneOf1ItemsOneOf8CacheControl
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
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf8CacheControl
      required:
        - type
        - tool_use_id
        - content
      title: MessagesMessageParamContentOneOf1Items8
    MessagesMessageParamContentOneOf1ItemsOneOf9Type:
      type: string
      enum:
        - search_result
      title: MessagesMessageParamContentOneOf1ItemsOneOf9Type
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsType:
      type: string
      enum:
        - text
      title: MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsType
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf0Type
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf0Type
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
      title: MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems0
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf1Type
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf1Type
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
      title: MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems1
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf2Type
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf2Type
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
      title: MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems2
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf3Type
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf3Type
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
      title: MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems3
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: >-
        MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf4Type
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItemsOneOf4Type
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
      title: MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems4
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems0
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems1
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems2
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems3
        - $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems4
      title: MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControlTtl
      required:
        - type
      title: MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControl
    MessagesMessageParamContentOneOf1ItemsOneOf9ContentItems:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsType
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCitationsItems
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItemsCacheControl
      required:
        - type
        - text
      title: MessagesMessageParamContentOneOf1ItemsOneOf9ContentItems
    MessagesMessageParamContentOneOf1ItemsOneOf9Citations:
      type: object
      properties:
        enabled:
          type: boolean
      title: MessagesMessageParamContentOneOf1ItemsOneOf9Citations
    MessagesMessageParamContentOneOf1ItemsOneOf9CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesMessageParamContentOneOf1ItemsOneOf9CacheControlType
    MessagesMessageParamContentOneOf1ItemsOneOf9CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesMessageParamContentOneOf1ItemsOneOf9CacheControlTtl
    MessagesMessageParamContentOneOf1ItemsOneOf9CacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9CacheControlType
        ttl:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9CacheControlTtl
      required:
        - type
      title: MessagesMessageParamContentOneOf1ItemsOneOf9CacheControl
    MessagesMessageParamContentOneOf1Items9:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9Type
        source:
          type: string
        title:
          type: string
        content:
          type: array
          items:
            $ref: >-
              #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9ContentItems
        citations:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9Citations
        cache_control:
          $ref: >-
            #/components/schemas/MessagesMessageParamContentOneOf1ItemsOneOf9CacheControl
      required:
        - type
        - source
        - title
        - content
      title: MessagesMessageParamContentOneOf1Items9
    MessagesMessageParamContentOneOf1Items:
      oneOf:
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items0'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items1'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items2'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items3'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items4'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items5'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items6'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items7'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items8'
        - $ref: '#/components/schemas/MessagesMessageParamContentOneOf1Items9'
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
    MessagesRequestSystemOneOf1ItemsType:
      type: string
      enum:
        - text
      title: MessagesRequestSystemOneOf1ItemsType
    MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf0Type:
      type: string
      enum:
        - char_location
      title: MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf0Type
    MessagesRequestSystemOneOf1ItemsCitationsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf0Type
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
      title: MessagesRequestSystemOneOf1ItemsCitationsItems0
    MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf1Type:
      type: string
      enum:
        - page_location
      title: MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf1Type
    MessagesRequestSystemOneOf1ItemsCitationsItems1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf1Type
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
      title: MessagesRequestSystemOneOf1ItemsCitationsItems1
    MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf2Type:
      type: string
      enum:
        - content_block_location
      title: MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf2Type
    MessagesRequestSystemOneOf1ItemsCitationsItems2:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf2Type
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
      title: MessagesRequestSystemOneOf1ItemsCitationsItems2
    MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf3Type:
      type: string
      enum:
        - web_search_result_location
      title: MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf3Type
    MessagesRequestSystemOneOf1ItemsCitationsItems3:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf3Type
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
      title: MessagesRequestSystemOneOf1ItemsCitationsItems3
    MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf4Type:
      type: string
      enum:
        - search_result_location
      title: MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf4Type
    MessagesRequestSystemOneOf1ItemsCitationsItems4:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestSystemOneOf1ItemsCitationsItemsOneOf4Type
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
      title: MessagesRequestSystemOneOf1ItemsCitationsItems4
    MessagesRequestSystemOneOf1ItemsCitationsItems:
      oneOf:
        - $ref: '#/components/schemas/MessagesRequestSystemOneOf1ItemsCitationsItems0'
        - $ref: '#/components/schemas/MessagesRequestSystemOneOf1ItemsCitationsItems1'
        - $ref: '#/components/schemas/MessagesRequestSystemOneOf1ItemsCitationsItems2'
        - $ref: '#/components/schemas/MessagesRequestSystemOneOf1ItemsCitationsItems3'
        - $ref: '#/components/schemas/MessagesRequestSystemOneOf1ItemsCitationsItems4'
      title: MessagesRequestSystemOneOf1ItemsCitationsItems
    MessagesRequestSystemOneOf1ItemsCacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesRequestSystemOneOf1ItemsCacheControlType
    MessagesRequestSystemOneOf1ItemsCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesRequestSystemOneOf1ItemsCacheControlTtl
    MessagesRequestSystemOneOf1ItemsCacheControl:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestSystemOneOf1ItemsCacheControlType
        ttl:
          $ref: '#/components/schemas/MessagesRequestSystemOneOf1ItemsCacheControlTtl'
      required:
        - type
      title: MessagesRequestSystemOneOf1ItemsCacheControl
    MessagesRequestSystemOneOf1Items:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestSystemOneOf1ItemsType'
        text:
          type: string
        citations:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/MessagesRequestSystemOneOf1ItemsCitationsItems
        cache_control:
          $ref: '#/components/schemas/MessagesRequestSystemOneOf1ItemsCacheControl'
      required:
        - type
        - text
      title: MessagesRequestSystemOneOf1Items
    MessagesRequestSystem1:
      type: array
      items:
        $ref: '#/components/schemas/MessagesRequestSystemOneOf1Items'
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
    MessagesRequestToolsItemsOneOf0CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesRequestToolsItemsOneOf0CacheControlType
    MessagesRequestToolsItemsOneOf0CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesRequestToolsItemsOneOf0CacheControlTtl
    MessagesRequestToolsItemsOneOf0CacheControl:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf0CacheControlType'
        ttl:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf0CacheControlTtl'
      required:
        - type
      title: MessagesRequestToolsItemsOneOf0CacheControl
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
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf0CacheControl'
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
    MessagesRequestToolsItemsOneOf1CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesRequestToolsItemsOneOf1CacheControlType
    MessagesRequestToolsItemsOneOf1CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesRequestToolsItemsOneOf1CacheControlTtl
    MessagesRequestToolsItemsOneOf1CacheControl:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf1CacheControlType'
        ttl:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf1CacheControlTtl'
      required:
        - type
      title: MessagesRequestToolsItemsOneOf1CacheControl
    MessagesRequestToolsItems1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf1Type'
        name:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf1Name'
        cache_control:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf1CacheControl'
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
    MessagesRequestToolsItemsOneOf2CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesRequestToolsItemsOneOf2CacheControlType
    MessagesRequestToolsItemsOneOf2CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesRequestToolsItemsOneOf2CacheControlTtl
    MessagesRequestToolsItemsOneOf2CacheControl:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf2CacheControlType'
        ttl:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf2CacheControlTtl'
      required:
        - type
      title: MessagesRequestToolsItemsOneOf2CacheControl
    MessagesRequestToolsItems2:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf2Type'
        name:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf2Name'
        cache_control:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf2CacheControl'
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
    MessagesRequestToolsItemsOneOf3UserLocationType:
      type: string
      enum:
        - approximate
      title: MessagesRequestToolsItemsOneOf3UserLocationType
    MessagesRequestToolsItemsOneOf3UserLocation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf3UserLocationType'
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
      title: MessagesRequestToolsItemsOneOf3UserLocation
    MessagesRequestToolsItemsOneOf3CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesRequestToolsItemsOneOf3CacheControlType
    MessagesRequestToolsItemsOneOf3CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesRequestToolsItemsOneOf3CacheControlTtl
    MessagesRequestToolsItemsOneOf3CacheControl:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf3CacheControlType'
        ttl:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf3CacheControlTtl'
      required:
        - type
      title: MessagesRequestToolsItemsOneOf3CacheControl
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
          type:
            - number
            - 'null'
          format: double
        user_location:
          oneOf:
            - $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf3UserLocation'
            - type: 'null'
        cache_control:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf3CacheControl'
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
    MessagesRequestToolsItemsOneOf4UserLocationType:
      type: string
      enum:
        - approximate
      title: MessagesRequestToolsItemsOneOf4UserLocationType
    MessagesRequestToolsItemsOneOf4UserLocation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf4UserLocationType'
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
      title: MessagesRequestToolsItemsOneOf4UserLocation
    MessagesRequestToolsItemsOneOf4CacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesRequestToolsItemsOneOf4CacheControlType
    MessagesRequestToolsItemsOneOf4CacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesRequestToolsItemsOneOf4CacheControlTtl
    MessagesRequestToolsItemsOneOf4CacheControl:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf4CacheControlType'
        ttl:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf4CacheControlTtl'
      required:
        - type
      title: MessagesRequestToolsItemsOneOf4CacheControl
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
          type:
            - number
            - 'null'
          format: double
        user_location:
          oneOf:
            - $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf4UserLocation'
            - type: 'null'
        cache_control:
          $ref: '#/components/schemas/MessagesRequestToolsItemsOneOf4CacheControl'
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
    MessagesWebSearchServerToolParametersEngine:
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
      title: MessagesWebSearchServerToolParametersEngine
    MessagesWebSearchServerToolParametersSearchContextSize:
      type: string
      enum:
        - low
        - medium
        - high
      description: >-
        How much context to retrieve per result. Defaults to medium (15000
        chars). Only applies when using the Exa engine; ignored with native
        provider search.
      title: MessagesWebSearchServerToolParametersSearchContextSize
    MessagesWebSearchServerToolParametersUserLocationType:
      type: string
      enum:
        - approximate
      title: MessagesWebSearchServerToolParametersUserLocationType
    MessagesWebSearchServerToolParametersUserLocation:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesWebSearchServerToolParametersUserLocationType
        city:
          type: string
        region:
          type: string
        country:
          type: string
        timezone:
          type: string
      description: Approximate user location for location-biased results.
      title: MessagesWebSearchServerToolParametersUserLocation
    MessagesWebSearchServerToolParameters:
      type: object
      properties:
        engine:
          $ref: '#/components/schemas/MessagesWebSearchServerToolParametersEngine'
          description: >-
            Which search engine to use. "auto" (default) uses native if the
            provider supports it, otherwise Exa. "native" forces the provider's
            built-in search. "exa" forces the Exa search API. "firecrawl" uses
            Firecrawl (requires BYOK). "parallel" uses the Parallel search API.
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
          $ref: >-
            #/components/schemas/MessagesWebSearchServerToolParametersSearchContextSize
          description: >-
            How much context to retrieve per result. Defaults to medium (15000
            chars). Only applies when using the Exa engine; ignored with native
            provider search.
        user_location:
          $ref: >-
            #/components/schemas/MessagesWebSearchServerToolParametersUserLocation
          description: Approximate user location for location-biased results.
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
      title: MessagesWebSearchServerToolParameters
    MessagesWebSearchServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesWebSearchServerToolType'
        parameters:
          $ref: '#/components/schemas/MessagesWebSearchServerToolParameters'
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
          type: number
          format: double
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
    MessagesRequestCacheControlType:
      type: string
      enum:
        - ephemeral
      title: MessagesRequestCacheControlType
    MessagesRequestCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: MessagesRequestCacheControlTtl
    MessagesRequestCacheControl:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/MessagesRequestCacheControlType'
        ttl:
          $ref: '#/components/schemas/MessagesRequestCacheControlTtl'
      required:
        - type
      title: MessagesRequestCacheControl
    MessagesRequestContextManagementEditsItemsOneOf0Type:
      type: string
      enum:
        - clear_tool_uses_20250919
      title: MessagesRequestContextManagementEditsItemsOneOf0Type
    MessagesRequestContextManagementEditsItemsOneOf0ClearAtLeastType:
      type: string
      enum:
        - input_tokens
      title: MessagesRequestContextManagementEditsItemsOneOf0ClearAtLeastType
    MessagesRequestContextManagementEditsItemsOneOf0ClearAtLeast:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0ClearAtLeastType
        value:
          type: number
          format: double
      required:
        - type
        - value
      title: MessagesRequestContextManagementEditsItemsOneOf0ClearAtLeast
    MessagesRequestContextManagementEditsItemsOneOf0ClearToolInputs:
      oneOf:
        - type: boolean
        - type: array
          items:
            type: string
        - description: Any type
      title: MessagesRequestContextManagementEditsItemsOneOf0ClearToolInputs
    MessagesRequestContextManagementEditsItemsOneOf0KeepType:
      type: string
      enum:
        - tool_uses
      title: MessagesRequestContextManagementEditsItemsOneOf0KeepType
    MessagesRequestContextManagementEditsItemsOneOf0Keep:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0KeepType
        value:
          type: number
          format: double
      required:
        - type
        - value
      title: MessagesRequestContextManagementEditsItemsOneOf0Keep
    MessagesRequestContextManagementEditsItemsOneOf0TriggerOneOf0Type:
      type: string
      enum:
        - input_tokens
      title: MessagesRequestContextManagementEditsItemsOneOf0TriggerOneOf0Type
    MessagesRequestContextManagementEditsItemsOneOf0Trigger0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0TriggerOneOf0Type
        value:
          type: number
          format: double
      required:
        - type
        - value
      title: MessagesRequestContextManagementEditsItemsOneOf0Trigger0
    MessagesRequestContextManagementEditsItemsOneOf0TriggerOneOf1Type:
      type: string
      enum:
        - tool_uses
      title: MessagesRequestContextManagementEditsItemsOneOf0TriggerOneOf1Type
    MessagesRequestContextManagementEditsItemsOneOf0Trigger1:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0TriggerOneOf1Type
        value:
          type: number
          format: double
      required:
        - type
        - value
      title: MessagesRequestContextManagementEditsItemsOneOf0Trigger1
    MessagesRequestContextManagementEditsItemsOneOf0Trigger:
      oneOf:
        - $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0Trigger0
        - $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0Trigger1
      title: MessagesRequestContextManagementEditsItemsOneOf0Trigger
    MessagesRequestContextManagementEditsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0Type
        clear_at_least:
          oneOf:
            - $ref: >-
                #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0ClearAtLeast
            - type: 'null'
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
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf0Keep
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
    MessagesRequestContextManagementEditsItemsOneOf1KeepOneOf0Type:
      type: string
      enum:
        - thinking_turns
      title: MessagesRequestContextManagementEditsItemsOneOf1KeepOneOf0Type
    MessagesRequestContextManagementEditsItemsOneOf1Keep0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf1KeepOneOf0Type
        value:
          type: number
          format: double
      required:
        - type
        - value
      title: MessagesRequestContextManagementEditsItemsOneOf1Keep0
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
        - $ref: >-
            #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf1Keep0
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
          type: number
          format: double
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
          oneOf:
            - $ref: >-
                #/components/schemas/MessagesRequestContextManagementEditsItemsOneOf2Trigger
            - type: 'null'
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
          type: number
          format: double
        messages:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/MessagesMessageParam'
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
          type: number
          format: double
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
          $ref: '#/components/schemas/MessagesRequestCacheControl'
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
    BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf1MediaType:
      type: string
      enum:
        - text/plain
      title: >-
        BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf1MediaType
    BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf1Type:
      type: string
      enum:
        - text
      title: BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf1Type
    BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSource1:
      type: object
      properties:
        data:
          type: string
        media_type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf1MediaType
        type:
          $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSourceOneOf1Type
      required:
        - data
        - media_type
        - type
      title: BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSource1
    BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSource:
      oneOf:
        - $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSource0
        - $ref: >-
            #/components/schemas/BaseMessagesResultContentItemsOneOf6ContentOneOf1ContentSource1
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
          type: number
          format: double
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
          type: number
          format: double
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
          type: number
          format: double
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
            - number
            - 'null'
          format: double
        start_line:
          type:
            - number
            - 'null'
          format: double
        total_lines:
          type:
            - number
            - 'null'
          format: double
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
            - number
            - 'null'
          format: double
        new_start:
          type:
            - number
            - 'null'
          format: double
        old_lines:
          type:
            - number
            - 'null'
          format: double
        old_start:
          type:
            - number
            - 'null'
          format: double
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
      title: BaseMessagesResultStopReason
    BaseMessagesResultUsageCacheCreation:
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
      title: BaseMessagesResultUsageCacheCreation
    BaseMessagesResultUsageServerToolUse:
      type: object
      properties:
        web_search_requests:
          type: number
          format: double
        web_fetch_requests:
          type: number
          format: double
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
    BaseMessagesResultUsage:
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
          type: number
          format: double
        ephemeral_1h_input_tokens:
          type: number
          format: double
      required:
        - ephemeral_5m_input_tokens
        - ephemeral_1h_input_tokens
      title: MessagesResultUsageCacheCreation
    MessagesResultUsageServerToolUse:
      type: object
      properties:
        web_search_requests:
          type: number
          format: double
        web_fetch_requests:
          type: number
          format: double
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
    MessagesResultUsageCostDetails:
      type: object
      properties:
        upstream_inference_cost:
          type:
            - number
            - 'null'
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
        cost:
          type:
            - number
            - 'null'
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
    "messages": [
        {
            "role": "user",
            "content": "Hello, how are you?"
        }
    ],
    "max_tokens": 1024,
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
  body: '{"model":"anthropic/claude-4.5-sonnet-20250929","messages":[{"role":"user","content":"Hello, how are you?"}],"max_tokens":1024,"temperature":0.7}'
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

	payload := strings.NewReader("{\n  \"model\": \"anthropic/claude-4.5-sonnet-20250929\",\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"max_tokens\": 1024,\n  \"temperature\": 0.7\n}")

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
request.body = "{\n  \"model\": \"anthropic/claude-4.5-sonnet-20250929\",\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"max_tokens\": 1024,\n  \"temperature\": 0.7\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/messages")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"model\": \"anthropic/claude-4.5-sonnet-20250929\",\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"max_tokens\": 1024,\n  \"temperature\": 0.7\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/messages', [
  'body' => '{
  "model": "anthropic/claude-4.5-sonnet-20250929",
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "max_tokens": 1024,
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
request.AddParameter("application/json", "{\n  \"model\": \"anthropic/claude-4.5-sonnet-20250929\",\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": \"Hello, how are you?\"\n    }\n  ],\n  \"max_tokens\": 1024,\n  \"temperature\": 0.7\n}", ParameterType.RequestBody);
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
  "messages": [
    [
      "role": "user",
      "content": "Hello, how are you?"
    ]
  ],
  "max_tokens": 1024,
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