# Create a response

POST https://openrouter.ai/api/v1/responses
Content-Type: application/json

Creates a streaming or non-streaming response using OpenResponses API format

Reference: https://openrouter.ai/docs/api/api-reference/responses/create-responses

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /responses:
    post:
      operationId: create-responses
      summary: Create a response
      description: >-
        Creates a streaming or non-streaming response using OpenResponses API
        format
      tags:
        - subpackage_betaResponses
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
                $ref: '#/components/schemas/OpenResponsesResult'
        '400':
          description: Bad Request - Invalid request parameters or malformed input
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
        '401':
          description: Unauthorized - Authentication required or invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
        '402':
          description: Payment Required - Insufficient credits or quota to complete request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentRequiredResponse'
        '404':
          description: Not Found - Resource does not exist
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotFoundResponse'
        '408':
          description: Request Timeout - Operation exceeded time limit
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestTimeoutResponse'
        '413':
          description: Payload Too Large - Request payload exceeds size limits
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PayloadTooLargeResponse'
        '422':
          description: Unprocessable Entity - Semantic validation failure
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnprocessableEntityResponse'
        '429':
          description: Too Many Requests - Rate limit exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TooManyRequestsResponse'
        '500':
          description: Internal Server Error - Unexpected server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
        '502':
          description: Bad Gateway - Provider/upstream API failure
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadGatewayResponse'
        '503':
          description: Service Unavailable - Service temporarily unavailable
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ServiceUnavailableResponse'
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ResponsesRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    OutputItemReasoningType:
      type: string
      enum:
        - reasoning
      title: OutputItemReasoningType
    ReasoningTextContentType:
      type: string
      enum:
        - reasoning_text
      title: ReasoningTextContentType
    ReasoningTextContent:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ReasoningTextContentType'
        text:
          type: string
      required:
        - type
        - text
      title: ReasoningTextContent
    ReasoningSummaryTextType:
      type: string
      enum:
        - summary_text
      title: ReasoningSummaryTextType
    ReasoningSummaryText:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ReasoningSummaryTextType'
        text:
          type: string
      required:
        - type
        - text
      title: ReasoningSummaryText
    OutputItemReasoningStatus0:
      type: string
      enum:
        - completed
      title: OutputItemReasoningStatus0
    OutputItemReasoningStatus1:
      type: string
      enum:
        - incomplete
      title: OutputItemReasoningStatus1
    OutputItemReasoningStatus2:
      type: string
      enum:
        - in_progress
      title: OutputItemReasoningStatus2
    OutputItemReasoningStatus:
      oneOf:
        - $ref: '#/components/schemas/OutputItemReasoningStatus0'
        - $ref: '#/components/schemas/OutputItemReasoningStatus1'
        - $ref: '#/components/schemas/OutputItemReasoningStatus2'
      title: OutputItemReasoningStatus
    ReasoningFormat:
      type: string
      enum:
        - unknown
        - openai-responses-v1
        - azure-openai-responses-v1
        - xai-responses-v1
        - anthropic-claude-v1
        - google-gemini-v1
      title: ReasoningFormat
    ReasoningItem:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemReasoningType'
        id:
          type: string
        content:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ReasoningTextContent'
        summary:
          type: array
          items:
            $ref: '#/components/schemas/ReasoningSummaryText'
        encrypted_content:
          type:
            - string
            - 'null'
        status:
          $ref: '#/components/schemas/OutputItemReasoningStatus'
        signature:
          type:
            - string
            - 'null'
        format:
          $ref: '#/components/schemas/ReasoningFormat'
      required:
        - type
        - id
        - summary
      description: Reasoning output item with signature and format extensions
      title: ReasoningItem
    EasyInputMessageType:
      type: string
      enum:
        - message
      title: EasyInputMessageType
    EasyInputMessageRole0:
      type: string
      enum:
        - user
      title: EasyInputMessageRole0
    EasyInputMessageRole1:
      type: string
      enum:
        - system
      title: EasyInputMessageRole1
    EasyInputMessageRole2:
      type: string
      enum:
        - assistant
      title: EasyInputMessageRole2
    EasyInputMessageRole3:
      type: string
      enum:
        - developer
      title: EasyInputMessageRole3
    EasyInputMessageRole:
      oneOf:
        - $ref: '#/components/schemas/EasyInputMessageRole0'
        - $ref: '#/components/schemas/EasyInputMessageRole1'
        - $ref: '#/components/schemas/EasyInputMessageRole2'
        - $ref: '#/components/schemas/EasyInputMessageRole3'
      title: EasyInputMessageRole
    InputTextType:
      type: string
      enum:
        - input_text
      title: InputTextType
    InputText:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/InputTextType'
        text:
          type: string
      required:
        - type
        - text
      description: Text input content item
      title: InputText
    InputImageType:
      type: string
      enum:
        - input_image
      title: InputImageType
    InputImageDetail:
      type: string
      enum:
        - auto
        - high
        - low
      title: InputImageDetail
    EasyInputMessageContentOneOf0Items1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/InputImageType'
        detail:
          $ref: '#/components/schemas/InputImageDetail'
        image_url:
          type:
            - string
            - 'null'
      required:
        - type
        - detail
      description: Image input content item
      title: EasyInputMessageContentOneOf0Items1
    InputFileType:
      type: string
      enum:
        - input_file
      title: InputFileType
    InputFile:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/InputFileType'
        file_id:
          type:
            - string
            - 'null'
        file_data:
          type: string
        filename:
          type: string
        file_url:
          type: string
      required:
        - type
      description: File input content item
      title: InputFile
    InputAudioType:
      type: string
      enum:
        - input_audio
      title: InputAudioType
    InputAudioInputAudioFormat:
      type: string
      enum:
        - mp3
        - wav
      title: InputAudioInputAudioFormat
    InputAudioInputAudio:
      type: object
      properties:
        data:
          type: string
        format:
          $ref: '#/components/schemas/InputAudioInputAudioFormat'
      required:
        - data
        - format
      title: InputAudioInputAudio
    InputAudio:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/InputAudioType'
        input_audio:
          $ref: '#/components/schemas/InputAudioInputAudio'
      required:
        - type
        - input_audio
      description: Audio input content item
      title: InputAudio
    InputVideoType:
      type: string
      enum:
        - input_video
      title: InputVideoType
    InputVideo:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/InputVideoType'
        video_url:
          type: string
          description: A base64 data URL or remote URL that resolves to a video file
      required:
        - type
        - video_url
      description: Video input content item
      title: InputVideo
    EasyInputMessageContentOneOf0Items:
      oneOf:
        - $ref: '#/components/schemas/InputText'
        - $ref: '#/components/schemas/EasyInputMessageContentOneOf0Items1'
        - $ref: '#/components/schemas/InputFile'
        - $ref: '#/components/schemas/InputAudio'
        - $ref: '#/components/schemas/InputVideo'
      title: EasyInputMessageContentOneOf0Items
    EasyInputMessageContent0:
      type: array
      items:
        $ref: '#/components/schemas/EasyInputMessageContentOneOf0Items'
      title: EasyInputMessageContent0
    EasyInputMessageContent:
      oneOf:
        - $ref: '#/components/schemas/EasyInputMessageContent0'
        - type: string
        - description: Any type
      title: EasyInputMessageContent
    EasyInputMessagePhase0:
      type: string
      enum:
        - commentary
      title: EasyInputMessagePhase0
    EasyInputMessagePhase1:
      type: string
      enum:
        - final_answer
      title: EasyInputMessagePhase1
    EasyInputMessagePhase:
      oneOf:
        - $ref: '#/components/schemas/EasyInputMessagePhase0'
        - $ref: '#/components/schemas/EasyInputMessagePhase1'
        - description: Any type
      description: >-
        The phase of an assistant message. Use `commentary` for an intermediate
        assistant message and `final_answer` for the final assistant message.
        For follow-up requests with models like `gpt-5.3-codex` and later,
        preserve and resend phase on all assistant messages. Omitting it can
        degrade performance. Not used for user messages.
      title: EasyInputMessagePhase
    EasyInputMessage:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/EasyInputMessageType'
        role:
          $ref: '#/components/schemas/EasyInputMessageRole'
        content:
          $ref: '#/components/schemas/EasyInputMessageContent'
        phase:
          $ref: '#/components/schemas/EasyInputMessagePhase'
          description: >-
            The phase of an assistant message. Use `commentary` for an
            intermediate assistant message and `final_answer` for the final
            assistant message. For follow-up requests with models like
            `gpt-5.3-codex` and later, preserve and resend phase on all
            assistant messages. Omitting it can degrade performance. Not used
            for user messages.
      required:
        - role
      title: EasyInputMessage
    InputMessageItemType:
      type: string
      enum:
        - message
      title: InputMessageItemType
    InputMessageItemRole0:
      type: string
      enum:
        - user
      title: InputMessageItemRole0
    InputMessageItemRole1:
      type: string
      enum:
        - system
      title: InputMessageItemRole1
    InputMessageItemRole2:
      type: string
      enum:
        - developer
      title: InputMessageItemRole2
    InputMessageItemRole:
      oneOf:
        - $ref: '#/components/schemas/InputMessageItemRole0'
        - $ref: '#/components/schemas/InputMessageItemRole1'
        - $ref: '#/components/schemas/InputMessageItemRole2'
      title: InputMessageItemRole
    InputMessageItemContentItems1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/InputImageType'
        detail:
          $ref: '#/components/schemas/InputImageDetail'
        image_url:
          type:
            - string
            - 'null'
      required:
        - type
        - detail
      description: Image input content item
      title: InputMessageItemContentItems1
    InputMessageItemContentItems:
      oneOf:
        - $ref: '#/components/schemas/InputText'
        - $ref: '#/components/schemas/InputMessageItemContentItems1'
        - $ref: '#/components/schemas/InputFile'
        - $ref: '#/components/schemas/InputAudio'
        - $ref: '#/components/schemas/InputVideo'
      title: InputMessageItemContentItems
    InputMessageItem:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: '#/components/schemas/InputMessageItemType'
        role:
          $ref: '#/components/schemas/InputMessageItemRole'
        content:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/InputMessageItemContentItems'
      required:
        - role
      title: InputMessageItem
    OpenAiResponseFunctionToolCallType:
      type: string
      enum:
        - function_call
      title: OpenAiResponseFunctionToolCallType
    ToolCallStatus:
      type: string
      enum:
        - in_progress
        - completed
        - incomplete
      title: ToolCallStatus
    FunctionCallItem:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallType'
        call_id:
          type: string
        name:
          type: string
        arguments:
          type: string
        id:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
      required:
        - type
        - call_id
        - name
        - arguments
      description: A function call initiated by the model
      title: FunctionCallItem
    OpenAiResponseFunctionToolCallOutputType:
      type: string
      enum:
        - function_call_output
      title: OpenAiResponseFunctionToolCallOutputType
    InputImage:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/InputImageType'
        detail:
          $ref: '#/components/schemas/InputImageDetail'
        image_url:
          type:
            - string
            - 'null'
      required:
        - type
        - detail
      description: Image input content item
      title: InputImage
    OpenAiResponseFunctionToolCallOutputOutputOneOf1Items:
      oneOf:
        - $ref: '#/components/schemas/InputText'
        - $ref: '#/components/schemas/InputImage'
        - $ref: '#/components/schemas/InputFile'
      title: OpenAiResponseFunctionToolCallOutputOutputOneOf1Items
    OpenAiResponseFunctionToolCallOutputOutput1:
      type: array
      items:
        $ref: >-
          #/components/schemas/OpenAiResponseFunctionToolCallOutputOutputOneOf1Items
      title: OpenAiResponseFunctionToolCallOutputOutput1
    OpenAiResponseFunctionToolCallOutputOutput:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputOutput1'
      title: OpenAiResponseFunctionToolCallOutputOutput
    OpenAiResponseFunctionToolCallOutputStatus:
      type: object
      properties: {}
      title: OpenAiResponseFunctionToolCallOutputStatus
    FunctionCallOutputItemOutputOneOf1Items1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/InputImageType'
        detail:
          $ref: '#/components/schemas/InputImageDetail'
        image_url:
          type:
            - string
            - 'null'
      required:
        - type
        - detail
      description: Image input content item
      title: FunctionCallOutputItemOutputOneOf1Items1
    FunctionCallOutputItemOutputOneOf1Items:
      oneOf:
        - $ref: '#/components/schemas/InputText'
        - $ref: '#/components/schemas/FunctionCallOutputItemOutputOneOf1Items1'
        - $ref: '#/components/schemas/InputFile'
      title: FunctionCallOutputItemOutputOneOf1Items
    FunctionCallOutputItemOutput1:
      type: array
      items:
        $ref: '#/components/schemas/FunctionCallOutputItemOutputOneOf1Items'
      title: FunctionCallOutputItemOutput1
    FunctionCallOutputItemOutput:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/FunctionCallOutputItemOutput1'
      title: FunctionCallOutputItemOutput
    FunctionCallOutputItem:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputType'
        id:
          type:
            - string
            - 'null'
        call_id:
          type: string
        output:
          $ref: '#/components/schemas/FunctionCallOutputItemOutput'
        status:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputStatus'
      required:
        - type
        - call_id
        - output
      description: The output from a function call execution
      title: FunctionCallOutputItem
    OutputMessageRole:
      type: string
      enum:
        - assistant
      title: OutputMessageRole
    OutputMessageType:
      type: string
      enum:
        - message
      title: OutputMessageType
    OutputMessageStatus0:
      type: string
      enum:
        - completed
      title: OutputMessageStatus0
    OutputMessageStatus1:
      type: string
      enum:
        - incomplete
      title: OutputMessageStatus1
    OutputMessageStatus2:
      type: string
      enum:
        - in_progress
      title: OutputMessageStatus2
    OutputMessageStatus:
      oneOf:
        - $ref: '#/components/schemas/OutputMessageStatus0'
        - $ref: '#/components/schemas/OutputMessageStatus1'
        - $ref: '#/components/schemas/OutputMessageStatus2'
      title: OutputMessageStatus
    ResponseOutputTextType:
      type: string
      enum:
        - output_text
      title: ResponseOutputTextType
    FileCitationType:
      type: string
      enum:
        - file_citation
      title: FileCitationType
    FileCitation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/FileCitationType'
        file_id:
          type: string
        filename:
          type: string
        index:
          type: integer
      required:
        - type
        - file_id
        - filename
        - index
      title: FileCitation
    UrlCitationType:
      type: string
      enum:
        - url_citation
      title: UrlCitationType
    URLCitation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/UrlCitationType'
        url:
          type: string
        title:
          type: string
        start_index:
          type: integer
        end_index:
          type: integer
      required:
        - type
        - url
        - title
        - start_index
        - end_index
      title: URLCitation
    FilePathType:
      type: string
      enum:
        - file_path
      title: FilePathType
    FilePath:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/FilePathType'
        file_id:
          type: string
        index:
          type: integer
      required:
        - type
        - file_id
        - index
      title: FilePath
    OpenAIResponsesAnnotation:
      oneOf:
        - $ref: '#/components/schemas/FileCitation'
        - $ref: '#/components/schemas/URLCitation'
        - $ref: '#/components/schemas/FilePath'
      title: OpenAIResponsesAnnotation
    ResponseOutputTextLogprobsItemsTopLogprobsItems:
      type: object
      properties:
        token:
          type: string
        bytes:
          type: array
          items:
            type: integer
        logprob:
          type: number
          format: double
      required:
        - token
        - bytes
        - logprob
      title: ResponseOutputTextLogprobsItemsTopLogprobsItems
    ResponseOutputTextLogprobsItems:
      type: object
      properties:
        token:
          type: string
        bytes:
          type: array
          items:
            type: integer
        logprob:
          type: number
          format: double
        top_logprobs:
          type: array
          items:
            $ref: >-
              #/components/schemas/ResponseOutputTextLogprobsItemsTopLogprobsItems
      required:
        - token
        - bytes
        - logprob
        - top_logprobs
      title: ResponseOutputTextLogprobsItems
    ResponseOutputText:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ResponseOutputTextType'
        text:
          type: string
        annotations:
          type: array
          items:
            $ref: '#/components/schemas/OpenAIResponsesAnnotation'
        logprobs:
          type: array
          items:
            $ref: '#/components/schemas/ResponseOutputTextLogprobsItems'
      required:
        - type
        - text
      title: ResponseOutputText
    OpenAiResponsesRefusalContentType:
      type: string
      enum:
        - refusal
      title: OpenAiResponsesRefusalContentType
    OpenAIResponsesRefusalContent:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OpenAiResponsesRefusalContentType'
        refusal:
          type: string
      required:
        - type
        - refusal
      title: OpenAIResponsesRefusalContent
    OutputMessageContentItems:
      oneOf:
        - $ref: '#/components/schemas/ResponseOutputText'
        - $ref: '#/components/schemas/OpenAIResponsesRefusalContent'
      title: OutputMessageContentItems
    OutputMessagePhase0:
      type: string
      enum:
        - commentary
      title: OutputMessagePhase0
    OutputMessagePhase1:
      type: string
      enum:
        - final_answer
      title: OutputMessagePhase1
    OutputMessagePhase:
      oneOf:
        - $ref: '#/components/schemas/OutputMessagePhase0'
        - $ref: '#/components/schemas/OutputMessagePhase1'
        - description: Any type
      description: >-
        The phase of an assistant message. Use `commentary` for an intermediate
        assistant message and `final_answer` for the final assistant message.
        For follow-up requests with models like `gpt-5.3-codex` and later,
        preserve and resend phase on all assistant messages. Omitting it can
        degrade performance. Not used for user messages.
      title: OutputMessagePhase
    InputsOneOf1ItemsOneOf5ContentOneOf0Items:
      oneOf:
        - $ref: '#/components/schemas/ResponseOutputText'
        - $ref: '#/components/schemas/OpenAIResponsesRefusalContent'
      title: InputsOneOf1ItemsOneOf5ContentOneOf0Items
    InputsOneOf1ItemsOneOf5Content0:
      type: array
      items:
        $ref: '#/components/schemas/InputsOneOf1ItemsOneOf5ContentOneOf0Items'
      title: InputsOneOf1ItemsOneOf5Content0
    InputsOneOf1ItemsOneOf5Content:
      oneOf:
        - $ref: '#/components/schemas/InputsOneOf1ItemsOneOf5Content0'
        - type: string
        - description: Any type
      title: InputsOneOf1ItemsOneOf5Content
    InputsOneOf1Items5:
      type: object
      properties:
        id:
          type: string
        role:
          $ref: '#/components/schemas/OutputMessageRole'
        type:
          $ref: '#/components/schemas/OutputMessageType'
        status:
          $ref: '#/components/schemas/OutputMessageStatus'
        content:
          $ref: '#/components/schemas/InputsOneOf1ItemsOneOf5Content'
        phase:
          $ref: '#/components/schemas/OutputMessagePhase'
          description: >-
            The phase of an assistant message. Use `commentary` for an
            intermediate assistant message and `final_answer` for the final
            assistant message. For follow-up requests with models like
            `gpt-5.3-codex` and later, preserve and resend phase on all
            assistant messages. Omitting it can degrade performance. Not used
            for user messages.
      required:
        - id
        - role
        - type
        - content
      description: An output message item
      title: InputsOneOf1Items5
    InputsOneOf1Items6:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemReasoningType'
        id:
          type: string
        content:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ReasoningTextContent'
        summary:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ReasoningSummaryText'
        encrypted_content:
          type:
            - string
            - 'null'
        status:
          $ref: '#/components/schemas/OutputItemReasoningStatus'
        signature:
          type:
            - string
            - 'null'
          description: A signature for the reasoning content, used for verification
        format:
          $ref: '#/components/schemas/ReasoningFormat'
      required:
        - type
        - id
        - summary
      description: An output item containing reasoning
      title: InputsOneOf1Items6
    OutputItemFunctionCallType:
      type: string
      enum:
        - function_call
      title: OutputItemFunctionCallType
    OutputItemFunctionCallStatus0:
      type: string
      enum:
        - completed
      title: OutputItemFunctionCallStatus0
    OutputItemFunctionCallStatus1:
      type: string
      enum:
        - incomplete
      title: OutputItemFunctionCallStatus1
    OutputItemFunctionCallStatus2:
      type: string
      enum:
        - in_progress
      title: OutputItemFunctionCallStatus2
    OutputItemFunctionCallStatus:
      oneOf:
        - $ref: '#/components/schemas/OutputItemFunctionCallStatus0'
        - $ref: '#/components/schemas/OutputItemFunctionCallStatus1'
        - $ref: '#/components/schemas/OutputItemFunctionCallStatus2'
      title: OutputItemFunctionCallStatus
    OutputFunctionCallItem:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemFunctionCallType'
        id:
          type: string
        name:
          type: string
        arguments:
          type: string
        call_id:
          type: string
        status:
          $ref: '#/components/schemas/OutputItemFunctionCallStatus'
      required:
        - type
        - name
        - arguments
        - call_id
      title: OutputFunctionCallItem
    OutputItemWebSearchCallType:
      type: string
      enum:
        - web_search_call
      title: OutputItemWebSearchCallType
    OutputItemWebSearchCallActionOneOf0Type:
      type: string
      enum:
        - search
      title: OutputItemWebSearchCallActionOneOf0Type
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
    OutputItemWebSearchCallAction0:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemWebSearchCallActionOneOf0Type'
        query:
          type: string
        queries:
          type: array
          items:
            type: string
        sources:
          type: array
          items:
            $ref: '#/components/schemas/WebSearchSource'
      required:
        - type
        - query
      title: OutputItemWebSearchCallAction0
    OutputItemWebSearchCallActionOneOf1Type:
      type: string
      enum:
        - open_page
      title: OutputItemWebSearchCallActionOneOf1Type
    OutputItemWebSearchCallAction1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemWebSearchCallActionOneOf1Type'
        url:
          type:
            - string
            - 'null'
      required:
        - type
      title: OutputItemWebSearchCallAction1
    OutputItemWebSearchCallActionOneOf2Type:
      type: string
      enum:
        - find_in_page
      title: OutputItemWebSearchCallActionOneOf2Type
    OutputItemWebSearchCallAction2:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemWebSearchCallActionOneOf2Type'
        pattern:
          type: string
        url:
          type: string
      required:
        - type
        - pattern
        - url
      title: OutputItemWebSearchCallAction2
    OutputItemWebSearchCallAction:
      oneOf:
        - $ref: '#/components/schemas/OutputItemWebSearchCallAction0'
        - $ref: '#/components/schemas/OutputItemWebSearchCallAction1'
        - $ref: '#/components/schemas/OutputItemWebSearchCallAction2'
      title: OutputItemWebSearchCallAction
    WebSearchStatus:
      type: string
      enum:
        - completed
        - searching
        - in_progress
        - failed
      title: WebSearchStatus
    OutputWebSearchCallItem:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemWebSearchCallType'
        id:
          type: string
        action:
          $ref: '#/components/schemas/OutputItemWebSearchCallAction'
        status:
          $ref: '#/components/schemas/WebSearchStatus'
      required:
        - type
        - id
        - action
        - status
      title: OutputWebSearchCallItem
    OutputItemFileSearchCallType:
      type: string
      enum:
        - file_search_call
      title: OutputItemFileSearchCallType
    OutputFileSearchCallItem:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemFileSearchCallType'
        id:
          type: string
        queries:
          type: array
          items:
            type: string
        status:
          $ref: '#/components/schemas/WebSearchStatus'
      required:
        - type
        - id
        - queries
        - status
      title: OutputFileSearchCallItem
    OutputItemImageGenerationCallType:
      type: string
      enum:
        - image_generation_call
      title: OutputItemImageGenerationCallType
    ImageGenerationStatus:
      type: string
      enum:
        - in_progress
        - completed
        - generating
        - failed
      title: ImageGenerationStatus
    OutputImageGenerationCallItem:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemImageGenerationCallType'
        id:
          type: string
        result:
          type:
            - string
            - 'null'
        status:
          $ref: '#/components/schemas/ImageGenerationStatus'
      required:
        - type
        - id
        - status
      title: OutputImageGenerationCallItem
    OutputDatetimeItemType:
      type: string
      enum:
        - openrouter:datetime
      title: OutputDatetimeItemType
    OutputDatetimeItem:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputDatetimeItemType'
        id:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        datetime:
          type: string
          description: ISO 8601 datetime string
        timezone:
          type: string
          description: IANA timezone name
      required:
        - type
        - status
        - datetime
        - timezone
      description: An openrouter:datetime server tool output item
      title: OutputDatetimeItem
    OutputServerToolItem:
      type: object
      properties:
        type:
          type: string
          description: Server tool type (e.g. openrouter:datetime, openrouter:web_search)
        id:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
      required:
        - type
        - status
      description: A generic OpenRouter server tool output item
      title: OutputServerToolItem
    InputsOneOf1Items:
      oneOf:
        - $ref: '#/components/schemas/ReasoningItem'
        - $ref: '#/components/schemas/EasyInputMessage'
        - $ref: '#/components/schemas/InputMessageItem'
        - $ref: '#/components/schemas/FunctionCallItem'
        - $ref: '#/components/schemas/FunctionCallOutputItem'
        - $ref: '#/components/schemas/InputsOneOf1Items5'
        - $ref: '#/components/schemas/InputsOneOf1Items6'
        - $ref: '#/components/schemas/OutputFunctionCallItem'
        - $ref: '#/components/schemas/OutputWebSearchCallItem'
        - $ref: '#/components/schemas/OutputFileSearchCallItem'
        - $ref: '#/components/schemas/OutputImageGenerationCallItem'
        - $ref: '#/components/schemas/OutputDatetimeItem'
        - $ref: '#/components/schemas/OutputServerToolItem'
      title: InputsOneOf1Items
    Inputs1:
      type: array
      items:
        $ref: '#/components/schemas/InputsOneOf1Items'
      title: Inputs1
    Inputs:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/Inputs1'
      description: Input for a response request - can be a string or array of items
      title: Inputs
    RequestMetadata:
      type: object
      additionalProperties:
        type: string
      description: >-
        Metadata key-value pairs for the request. Keys must be ≤64 characters
        and cannot contain brackets. Values must be ≤512 characters. Maximum 16
        pairs allowed.
      title: RequestMetadata
    FunctionToolType:
      type: string
      enum:
        - function
      title: FunctionToolType
    ResponsesRequestToolsItems0:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/FunctionToolType'
        name:
          type: string
        description:
          type:
            - string
            - 'null'
        strict:
          type:
            - boolean
            - 'null'
        parameters:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - type
        - name
        - parameters
      description: Function tool definition
      title: ResponsesRequestToolsItems0
    PreviewWebSearchServerToolType:
      type: string
      enum:
        - web_search_preview
      title: PreviewWebSearchServerToolType
    SearchContextSizeEnum:
      type: string
      enum:
        - low
        - medium
        - high
      description: Size of the search context for web search tools
      title: SearchContextSizeEnum
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
    WebSearchDomainFilter:
      type: object
      properties:
        allowed_domains:
          type:
            - array
            - 'null'
          items:
            type: string
        excluded_domains:
          type:
            - array
            - 'null'
          items:
            type: string
      title: WebSearchDomainFilter
    Preview_WebSearchServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/PreviewWebSearchServerToolType'
        search_context_size:
          $ref: '#/components/schemas/SearchContextSizeEnum'
        user_location:
          $ref: '#/components/schemas/Preview_WebSearchUserLocation'
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        filters:
          $ref: '#/components/schemas/WebSearchDomainFilter'
      required:
        - type
      description: Web search preview tool configuration
      title: Preview_WebSearchServerTool
    Preview20250311WebSearchServerToolType:
      type: string
      enum:
        - web_search_preview_2025_03_11
      title: Preview20250311WebSearchServerToolType
    Preview_20250311_WebSearchServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/Preview20250311WebSearchServerToolType'
        search_context_size:
          $ref: '#/components/schemas/SearchContextSizeEnum'
        user_location:
          $ref: '#/components/schemas/Preview_WebSearchUserLocation'
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        filters:
          $ref: '#/components/schemas/WebSearchDomainFilter'
      required:
        - type
      description: Web search preview tool configuration (2025-03-11 version)
      title: Preview_20250311_WebSearchServerTool
    LegacyWebSearchServerToolType:
      type: string
      enum:
        - web_search
      title: LegacyWebSearchServerToolType
    WebSearchUserLocationType:
      type: string
      enum:
        - approximate
      title: WebSearchUserLocationType
    WebSearchUserLocation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/WebSearchUserLocationType'
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
      description: User location information for web search
      title: WebSearchUserLocation
    Legacy_WebSearchServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/LegacyWebSearchServerToolType'
        filters:
          $ref: '#/components/schemas/WebSearchDomainFilter'
        search_context_size:
          $ref: '#/components/schemas/SearchContextSizeEnum'
        user_location:
          $ref: '#/components/schemas/WebSearchUserLocation'
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
      required:
        - type
      description: Web search tool configuration
      title: Legacy_WebSearchServerTool
    WebSearchServerToolType:
      type: string
      enum:
        - web_search_2025_08_26
      title: WebSearchServerToolType
    WebSearchServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/WebSearchServerToolType'
        filters:
          $ref: '#/components/schemas/WebSearchDomainFilter'
        search_context_size:
          $ref: '#/components/schemas/SearchContextSizeEnum'
        user_location:
          $ref: '#/components/schemas/WebSearchUserLocation'
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
      required:
        - type
      description: Web search tool configuration (2025-08-26 version)
      title: WebSearchServerTool
    FileSearchServerToolType:
      type: string
      enum:
        - file_search
      title: FileSearchServerToolType
    FileSearchServerToolFiltersOneOf0Type:
      type: string
      enum:
        - eq
        - ne
        - gt
        - gte
        - lt
        - lte
      title: FileSearchServerToolFiltersOneOf0Type
    FileSearchServerToolFiltersOneOf0ValueOneOf3Items:
      oneOf:
        - type: string
        - type: number
          format: double
      title: FileSearchServerToolFiltersOneOf0ValueOneOf3Items
    FileSearchServerToolFiltersOneOf0Value3:
      type: array
      items:
        $ref: '#/components/schemas/FileSearchServerToolFiltersOneOf0ValueOneOf3Items'
      title: FileSearchServerToolFiltersOneOf0Value3
    FileSearchServerToolFiltersOneOf0Value:
      oneOf:
        - type: string
        - type: number
          format: double
        - type: boolean
        - $ref: '#/components/schemas/FileSearchServerToolFiltersOneOf0Value3'
      title: FileSearchServerToolFiltersOneOf0Value
    FileSearchServerToolFilters0:
      type: object
      properties:
        key:
          type: string
        type:
          $ref: '#/components/schemas/FileSearchServerToolFiltersOneOf0Type'
        value:
          $ref: '#/components/schemas/FileSearchServerToolFiltersOneOf0Value'
      required:
        - key
        - type
        - value
      title: FileSearchServerToolFilters0
    CompoundFilterType:
      type: string
      enum:
        - and
        - or
      title: CompoundFilterType
    CompoundFilter:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/CompoundFilterType'
        filters:
          type: array
          items:
            type: object
            additionalProperties:
              description: Any type
      required:
        - type
        - filters
      description: A compound filter that combines multiple comparison or compound filters
      title: CompoundFilter
    FileSearchServerToolFilters:
      oneOf:
        - $ref: '#/components/schemas/FileSearchServerToolFilters0'
        - $ref: '#/components/schemas/CompoundFilter'
        - description: Any type
      title: FileSearchServerToolFilters
    FileSearchServerToolRankingOptionsRanker:
      type: string
      enum:
        - auto
        - default-2024-11-15
      title: FileSearchServerToolRankingOptionsRanker
    FileSearchServerToolRankingOptions:
      type: object
      properties:
        ranker:
          $ref: '#/components/schemas/FileSearchServerToolRankingOptionsRanker'
        score_threshold:
          type: number
          format: double
      title: FileSearchServerToolRankingOptions
    FileSearchServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/FileSearchServerToolType'
        vector_store_ids:
          type: array
          items:
            type: string
        filters:
          $ref: '#/components/schemas/FileSearchServerToolFilters'
        max_num_results:
          type: integer
        ranking_options:
          $ref: '#/components/schemas/FileSearchServerToolRankingOptions'
      required:
        - type
        - vector_store_ids
      description: File search tool configuration
      title: FileSearchServerTool
    ComputerUseServerToolType:
      type: string
      enum:
        - computer_use_preview
      title: ComputerUseServerToolType
    ComputerUseServerToolEnvironment:
      type: string
      enum:
        - windows
        - mac
        - linux
        - ubuntu
        - browser
      title: ComputerUseServerToolEnvironment
    ComputerUseServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ComputerUseServerToolType'
        display_height:
          type: integer
        display_width:
          type: integer
        environment:
          $ref: '#/components/schemas/ComputerUseServerToolEnvironment'
      required:
        - type
        - display_height
        - display_width
        - environment
      description: Computer use preview tool configuration
      title: ComputerUseServerTool
    CodeInterpreterServerToolType:
      type: string
      enum:
        - code_interpreter
      title: CodeInterpreterServerToolType
    CodeInterpreterServerToolContainerOneOf1Type:
      type: string
      enum:
        - auto
      title: CodeInterpreterServerToolContainerOneOf1Type
    CodeInterpreterServerToolContainerOneOf1MemoryLimit:
      type: string
      enum:
        - 1g
        - 4g
        - 16g
        - 64g
      title: CodeInterpreterServerToolContainerOneOf1MemoryLimit
    CodeInterpreterServerToolContainer1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/CodeInterpreterServerToolContainerOneOf1Type'
        file_ids:
          type: array
          items:
            type: string
        memory_limit:
          oneOf:
            - $ref: >-
                #/components/schemas/CodeInterpreterServerToolContainerOneOf1MemoryLimit
            - type: 'null'
      required:
        - type
      title: CodeInterpreterServerToolContainer1
    CodeInterpreterServerToolContainer:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/CodeInterpreterServerToolContainer1'
      title: CodeInterpreterServerToolContainer
    CodeInterpreterServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/CodeInterpreterServerToolType'
        container:
          $ref: '#/components/schemas/CodeInterpreterServerToolContainer'
      required:
        - type
        - container
      description: Code interpreter tool configuration
      title: CodeInterpreterServerTool
    McpServerToolType:
      type: string
      enum:
        - mcp
      title: McpServerToolType
    McpServerToolAllowedTools1:
      type: object
      properties:
        tool_names:
          type: array
          items:
            type: string
        read_only:
          type: boolean
      title: McpServerToolAllowedTools1
    McpServerToolAllowedTools:
      oneOf:
        - type: array
          items:
            type: string
        - $ref: '#/components/schemas/McpServerToolAllowedTools1'
        - description: Any type
      title: McpServerToolAllowedTools
    McpServerToolConnectorId:
      type: string
      enum:
        - connector_dropbox
        - connector_gmail
        - connector_googlecalendar
        - connector_googledrive
        - connector_microsoftteams
        - connector_outlookcalendar
        - connector_outlookemail
        - connector_sharepoint
      title: McpServerToolConnectorId
    McpServerToolRequireApprovalOneOf0Never:
      type: object
      properties:
        tool_names:
          type: array
          items:
            type: string
      title: McpServerToolRequireApprovalOneOf0Never
    McpServerToolRequireApprovalOneOf0Always:
      type: object
      properties:
        tool_names:
          type: array
          items:
            type: string
      title: McpServerToolRequireApprovalOneOf0Always
    McpServerToolRequireApproval0:
      type: object
      properties:
        never:
          $ref: '#/components/schemas/McpServerToolRequireApprovalOneOf0Never'
        always:
          $ref: '#/components/schemas/McpServerToolRequireApprovalOneOf0Always'
      title: McpServerToolRequireApproval0
    McpServerToolRequireApproval1:
      type: string
      enum:
        - always
      title: McpServerToolRequireApproval1
    McpServerToolRequireApproval2:
      type: string
      enum:
        - never
      title: McpServerToolRequireApproval2
    McpServerToolRequireApproval:
      oneOf:
        - $ref: '#/components/schemas/McpServerToolRequireApproval0'
        - $ref: '#/components/schemas/McpServerToolRequireApproval1'
        - $ref: '#/components/schemas/McpServerToolRequireApproval2'
        - description: Any type
      title: McpServerToolRequireApproval
    McpServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/McpServerToolType'
        server_label:
          type: string
        allowed_tools:
          $ref: '#/components/schemas/McpServerToolAllowedTools'
        authorization:
          type: string
        connector_id:
          $ref: '#/components/schemas/McpServerToolConnectorId'
        headers:
          type:
            - object
            - 'null'
          additionalProperties:
            type: string
        require_approval:
          $ref: '#/components/schemas/McpServerToolRequireApproval'
        server_description:
          type: string
        server_url:
          type: string
      required:
        - type
        - server_label
      description: MCP (Model Context Protocol) tool configuration
      title: McpServerTool
    ImageGenerationServerToolType:
      type: string
      enum:
        - image_generation
      title: ImageGenerationServerToolType
    ImageGenerationServerToolBackground:
      type: string
      enum:
        - transparent
        - opaque
        - auto
      title: ImageGenerationServerToolBackground
    ImageGenerationServerToolInputFidelity:
      type: string
      enum:
        - high
        - low
      title: ImageGenerationServerToolInputFidelity
    ImageGenerationServerToolInputImageMask:
      type: object
      properties:
        image_url:
          type: string
        file_id:
          type: string
      title: ImageGenerationServerToolInputImageMask
    ImageGenerationServerToolModel:
      type: string
      enum:
        - gpt-image-1
        - gpt-image-1-mini
      title: ImageGenerationServerToolModel
    ImageGenerationServerToolModeration:
      type: string
      enum:
        - auto
        - low
      title: ImageGenerationServerToolModeration
    ImageGenerationServerToolOutputFormat:
      type: string
      enum:
        - png
        - webp
        - jpeg
      title: ImageGenerationServerToolOutputFormat
    ImageGenerationServerToolQuality:
      type: string
      enum:
        - low
        - medium
        - high
        - auto
      title: ImageGenerationServerToolQuality
    ImageGenerationServerToolSize:
      type: string
      enum:
        - 1024x1024
        - 1024x1536
        - 1536x1024
        - auto
      title: ImageGenerationServerToolSize
    ImageGenerationServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ImageGenerationServerToolType'
        background:
          $ref: '#/components/schemas/ImageGenerationServerToolBackground'
        input_fidelity:
          oneOf:
            - $ref: '#/components/schemas/ImageGenerationServerToolInputFidelity'
            - type: 'null'
        input_image_mask:
          $ref: '#/components/schemas/ImageGenerationServerToolInputImageMask'
        model:
          $ref: '#/components/schemas/ImageGenerationServerToolModel'
        moderation:
          $ref: '#/components/schemas/ImageGenerationServerToolModeration'
        output_compression:
          type: integer
        output_format:
          $ref: '#/components/schemas/ImageGenerationServerToolOutputFormat'
        partial_images:
          type: integer
        quality:
          $ref: '#/components/schemas/ImageGenerationServerToolQuality'
        size:
          $ref: '#/components/schemas/ImageGenerationServerToolSize'
      required:
        - type
      description: Image generation tool configuration
      title: ImageGenerationServerTool
    CodexLocalShellToolType:
      type: string
      enum:
        - local_shell
      title: CodexLocalShellToolType
    CodexLocalShellTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/CodexLocalShellToolType'
      required:
        - type
      description: Local shell tool configuration
      title: CodexLocalShellTool
    ShellServerToolType:
      type: string
      enum:
        - shell
      title: ShellServerToolType
    ShellServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ShellServerToolType'
      required:
        - type
      description: Shell tool configuration
      title: ShellServerTool
    ApplyPatchServerToolType:
      type: string
      enum:
        - apply_patch
      title: ApplyPatchServerToolType
    ApplyPatchServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ApplyPatchServerToolType'
      required:
        - type
      description: Apply patch tool configuration
      title: ApplyPatchServerTool
    CustomToolType:
      type: string
      enum:
        - custom
      title: CustomToolType
    CustomToolFormatOneOf0Type:
      type: string
      enum:
        - text
      title: CustomToolFormatOneOf0Type
    CustomToolFormat0:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/CustomToolFormatOneOf0Type'
      required:
        - type
      title: CustomToolFormat0
    CustomToolFormatOneOf1Type:
      type: string
      enum:
        - grammar
      title: CustomToolFormatOneOf1Type
    CustomToolFormatOneOf1Syntax:
      type: string
      enum:
        - lark
        - regex
      title: CustomToolFormatOneOf1Syntax
    CustomToolFormat1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/CustomToolFormatOneOf1Type'
        definition:
          type: string
        syntax:
          $ref: '#/components/schemas/CustomToolFormatOneOf1Syntax'
      required:
        - type
        - definition
        - syntax
      title: CustomToolFormat1
    CustomToolFormat:
      oneOf:
        - $ref: '#/components/schemas/CustomToolFormat0'
        - $ref: '#/components/schemas/CustomToolFormat1'
      title: CustomToolFormat
    CustomTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/CustomToolType'
        name:
          type: string
        description:
          type: string
        format:
          $ref: '#/components/schemas/CustomToolFormat'
      required:
        - type
        - name
      description: Custom tool configuration
      title: CustomTool
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
    WebSearchServerToolOpenRouterType:
      type: string
      enum:
        - openrouter:web_search
      title: WebSearchServerToolOpenRouterType
    WebSearchServerToolOpenRouterParameters:
      type: object
      properties:
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5.
        max_total_results:
          type: integer
          description: >-
            Maximum total number of search results across all search calls in a
            single request. Once this limit is reached, the tool will stop
            returning new results.
      title: WebSearchServerToolOpenRouterParameters
    WebSearchServerTool_OpenRouter:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/WebSearchServerToolOpenRouterType'
        parameters:
          $ref: '#/components/schemas/WebSearchServerToolOpenRouterParameters'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: searches the web for current
        information
      title: WebSearchServerTool_OpenRouter
    ResponsesRequestToolsItems:
      oneOf:
        - $ref: '#/components/schemas/ResponsesRequestToolsItems0'
        - $ref: '#/components/schemas/Preview_WebSearchServerTool'
        - $ref: '#/components/schemas/Preview_20250311_WebSearchServerTool'
        - $ref: '#/components/schemas/Legacy_WebSearchServerTool'
        - $ref: '#/components/schemas/WebSearchServerTool'
        - $ref: '#/components/schemas/FileSearchServerTool'
        - $ref: '#/components/schemas/ComputerUseServerTool'
        - $ref: '#/components/schemas/CodeInterpreterServerTool'
        - $ref: '#/components/schemas/McpServerTool'
        - $ref: '#/components/schemas/ImageGenerationServerTool'
        - $ref: '#/components/schemas/CodexLocalShellTool'
        - $ref: '#/components/schemas/ShellServerTool'
        - $ref: '#/components/schemas/ApplyPatchServerTool'
        - $ref: '#/components/schemas/CustomTool'
        - $ref: '#/components/schemas/DatetimeServerTool'
        - $ref: '#/components/schemas/WebSearchServerTool_OpenRouter'
      title: ResponsesRequestToolsItems
    OpenAiResponsesToolChoice0:
      type: string
      enum:
        - auto
      title: OpenAiResponsesToolChoice0
    OpenAiResponsesToolChoice1:
      type: string
      enum:
        - none
      title: OpenAiResponsesToolChoice1
    OpenAiResponsesToolChoice2:
      type: string
      enum:
        - required
      title: OpenAiResponsesToolChoice2
    OpenAiResponsesToolChoiceOneOf3Type:
      type: string
      enum:
        - function
      title: OpenAiResponsesToolChoiceOneOf3Type
    OpenAiResponsesToolChoice3:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OpenAiResponsesToolChoiceOneOf3Type'
        name:
          type: string
      required:
        - type
        - name
      title: OpenAiResponsesToolChoice3
    OpenAiResponsesToolChoiceOneOf4Type0:
      type: string
      enum:
        - web_search_preview_2025_03_11
      title: OpenAiResponsesToolChoiceOneOf4Type0
    OpenAiResponsesToolChoiceOneOf4Type1:
      type: string
      enum:
        - web_search_preview
      title: OpenAiResponsesToolChoiceOneOf4Type1
    OpenAiResponsesToolChoiceOneOf4Type:
      oneOf:
        - $ref: '#/components/schemas/OpenAiResponsesToolChoiceOneOf4Type0'
        - $ref: '#/components/schemas/OpenAiResponsesToolChoiceOneOf4Type1'
      title: OpenAiResponsesToolChoiceOneOf4Type
    OpenAiResponsesToolChoice4:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OpenAiResponsesToolChoiceOneOf4Type'
      required:
        - type
      title: OpenAiResponsesToolChoice4
    ToolChoiceAllowedType:
      type: string
      enum:
        - allowed_tools
      title: ToolChoiceAllowedType
    ToolChoiceAllowedMode0:
      type: string
      enum:
        - auto
      title: ToolChoiceAllowedMode0
    ToolChoiceAllowedMode1:
      type: string
      enum:
        - required
      title: ToolChoiceAllowedMode1
    ToolChoiceAllowedMode:
      oneOf:
        - $ref: '#/components/schemas/ToolChoiceAllowedMode0'
        - $ref: '#/components/schemas/ToolChoiceAllowedMode1'
      title: ToolChoiceAllowedMode
    ToolChoiceAllowed:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ToolChoiceAllowedType'
        mode:
          $ref: '#/components/schemas/ToolChoiceAllowedMode'
        tools:
          type: array
          items:
            type: object
            additionalProperties:
              description: Any type
      required:
        - type
        - mode
        - tools
      description: Constrains the model to a pre-defined set of allowed tools
      title: ToolChoiceAllowed
    OpenAIResponsesToolChoice:
      oneOf:
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice0'
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice1'
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice2'
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice3'
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice4'
        - $ref: '#/components/schemas/ToolChoiceAllowed'
      title: OpenAIResponsesToolChoice
    FormatTextConfigType:
      type: string
      enum:
        - text
      title: FormatTextConfigType
    FormatTextConfig:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/FormatTextConfigType'
      required:
        - type
      description: Plain text response format
      title: FormatTextConfig
    FormatJsonObjectConfigType:
      type: string
      enum:
        - json_object
      title: FormatJsonObjectConfigType
    FormatJsonObjectConfig:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/FormatJsonObjectConfigType'
      required:
        - type
      description: JSON object response format
      title: FormatJsonObjectConfig
    FormatJsonSchemaConfigType:
      type: string
      enum:
        - json_schema
      title: FormatJsonSchemaConfigType
    FormatJsonSchemaConfig:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/FormatJsonSchemaConfigType'
        name:
          type: string
        description:
          type: string
        strict:
          type:
            - boolean
            - 'null'
        schema:
          type: object
          additionalProperties:
            description: Any type
      required:
        - type
        - name
        - schema
      description: JSON schema constrained response format
      title: FormatJsonSchemaConfig
    Formats:
      oneOf:
        - $ref: '#/components/schemas/FormatTextConfig'
        - $ref: '#/components/schemas/FormatJsonObjectConfig'
        - $ref: '#/components/schemas/FormatJsonSchemaConfig'
      description: Text response format configuration
      title: Formats
    TextConfigVerbosity:
      type: string
      enum:
        - high
        - low
        - medium
      title: TextConfigVerbosity
    TextExtendedConfig:
      type: object
      properties:
        format:
          $ref: '#/components/schemas/Formats'
        verbosity:
          oneOf:
            - $ref: '#/components/schemas/TextConfigVerbosity'
            - type: 'null'
      description: Text output configuration including format and verbosity
      title: TextExtendedConfig
    ReasoningEffort:
      type: string
      enum:
        - xhigh
        - high
        - medium
        - low
        - minimal
        - none
      title: ReasoningEffort
    ReasoningSummaryVerbosity:
      type: string
      enum:
        - auto
        - concise
        - detailed
      title: ReasoningSummaryVerbosity
    ReasoningConfig:
      type: object
      properties:
        effort:
          $ref: '#/components/schemas/ReasoningEffort'
        summary:
          $ref: '#/components/schemas/ReasoningSummaryVerbosity'
        max_tokens:
          type: integer
        enabled:
          type:
            - boolean
            - 'null'
      description: Configuration for reasoning mode in the response
      title: ReasoningConfig
    ResponsesRequestImageConfig:
      oneOf:
        - type: string
        - type: number
          format: double
      title: ResponsesRequestImageConfig
    OutputModalityEnum:
      type: string
      enum:
        - text
        - image
      title: OutputModalityEnum
    StoredPromptTemplateVariables:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/InputText'
        - $ref: '#/components/schemas/InputImage'
        - $ref: '#/components/schemas/InputFile'
      title: StoredPromptTemplateVariables
    StoredPromptTemplate:
      type: object
      properties:
        id:
          type: string
        variables:
          type:
            - object
            - 'null'
          additionalProperties:
            $ref: '#/components/schemas/StoredPromptTemplateVariables'
      required:
        - id
      title: StoredPromptTemplate
    ResponseIncludesEnum:
      type: string
      enum:
        - file_search_call.results
        - message.input_image.image_url
        - computer_call_output.output.image_url
        - reasoning.encrypted_content
        - code_interpreter_call.outputs
      title: ResponseIncludesEnum
    ResponsesRequestServiceTier:
      type: string
      enum:
        - auto
        - default
        - flex
        - priority
        - scale
      default: auto
      title: ResponsesRequestServiceTier
    OpenAIResponsesTruncation:
      type: string
      enum:
        - auto
        - disabled
      title: OpenAIResponsesTruncation
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
    ResponsesRequestPluginsItems:
      oneOf:
        - $ref: '#/components/schemas/AutoRouterPlugin'
        - $ref: '#/components/schemas/ModerationPlugin'
        - $ref: '#/components/schemas/WebSearchPlugin'
        - $ref: '#/components/schemas/FileParserPlugin'
        - $ref: '#/components/schemas/ResponseHealingPlugin'
        - $ref: '#/components/schemas/ContextCompressionPlugin'
      title: ResponsesRequestPluginsItems
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
    ResponsesRequest:
      type: object
      properties:
        input:
          $ref: '#/components/schemas/Inputs'
        instructions:
          type:
            - string
            - 'null'
        metadata:
          $ref: '#/components/schemas/RequestMetadata'
        tools:
          type: array
          items:
            $ref: '#/components/schemas/ResponsesRequestToolsItems'
        tool_choice:
          $ref: '#/components/schemas/OpenAIResponsesToolChoice'
        parallel_tool_calls:
          type:
            - boolean
            - 'null'
        model:
          type: string
        models:
          type: array
          items:
            type: string
        text:
          $ref: '#/components/schemas/TextExtendedConfig'
        reasoning:
          $ref: '#/components/schemas/ReasoningConfig'
        max_output_tokens:
          type: integer
        temperature:
          type: number
          format: double
        top_p:
          type: number
          format: double
        top_logprobs:
          type: integer
        max_tool_calls:
          type: integer
        presence_penalty:
          type: number
          format: double
        frequency_penalty:
          type: number
          format: double
        top_k:
          type: integer
        image_config:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ResponsesRequestImageConfig'
          description: >-
            Provider-specific image configuration options. Keys and values vary
            by model/provider. See
            https://openrouter.ai/docs/features/multimodal/image-generation for
            more details.
        modalities:
          type: array
          items:
            $ref: '#/components/schemas/OutputModalityEnum'
          description: >-
            Output modalities for the response. Supported values are "text" and
            "image".
        prompt_cache_key:
          type:
            - string
            - 'null'
        previous_response_id:
          type:
            - string
            - 'null'
        prompt:
          $ref: '#/components/schemas/StoredPromptTemplate'
        include:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ResponseIncludesEnum'
        background:
          type:
            - boolean
            - 'null'
        safety_identifier:
          type:
            - string
            - 'null'
        store:
          type: boolean
          enum:
            - false
        service_tier:
          oneOf:
            - $ref: '#/components/schemas/ResponsesRequestServiceTier'
            - type: 'null'
        truncation:
          $ref: '#/components/schemas/OpenAIResponsesTruncation'
        stream:
          type: boolean
          default: false
        provider:
          $ref: '#/components/schemas/ProviderPreferences'
        plugins:
          type: array
          items:
            $ref: '#/components/schemas/ResponsesRequestPluginsItems'
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
      description: Request schema for Responses endpoint
      title: ResponsesRequest
    BaseResponsesResultObject:
      type: string
      enum:
        - response
      title: BaseResponsesResultObject
    OpenAIResponsesResponseStatus:
      type: string
      enum:
        - completed
        - incomplete
        - in_progress
        - failed
        - cancelled
        - queued
      title: OpenAIResponsesResponseStatus
    OutputMessage:
      type: object
      properties:
        id:
          type: string
        role:
          $ref: '#/components/schemas/OutputMessageRole'
        type:
          $ref: '#/components/schemas/OutputMessageType'
        status:
          $ref: '#/components/schemas/OutputMessageStatus'
        content:
          type: array
          items:
            $ref: '#/components/schemas/OutputMessageContentItems'
        phase:
          $ref: '#/components/schemas/OutputMessagePhase'
          description: >-
            The phase of an assistant message. Use `commentary` for an
            intermediate assistant message and `final_answer` for the final
            assistant message. For follow-up requests with models like
            `gpt-5.3-codex` and later, preserve and resend phase on all
            assistant messages. Omitting it can degrade performance. Not used
            for user messages.
      required:
        - id
        - role
        - type
        - content
      title: OutputMessage
    OutputItemReasoning:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemReasoningType'
        id:
          type: string
        content:
          type: array
          items:
            $ref: '#/components/schemas/ReasoningTextContent'
        summary:
          type: array
          items:
            $ref: '#/components/schemas/ReasoningSummaryText'
        encrypted_content:
          type:
            - string
            - 'null'
        status:
          $ref: '#/components/schemas/OutputItemReasoningStatus'
      required:
        - type
        - id
        - summary
      title: OutputItemReasoning
    OutputItemFunctionCall:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemFunctionCallType'
        id:
          type: string
        name:
          type: string
        arguments:
          type: string
        call_id:
          type: string
        status:
          $ref: '#/components/schemas/OutputItemFunctionCallStatus'
      required:
        - type
        - name
        - arguments
        - call_id
      title: OutputItemFunctionCall
    OutputItemWebSearchCall:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemWebSearchCallType'
        id:
          type: string
        action:
          $ref: '#/components/schemas/OutputItemWebSearchCallAction'
        status:
          $ref: '#/components/schemas/WebSearchStatus'
      required:
        - type
        - id
        - action
        - status
      title: OutputItemWebSearchCall
    OutputItemFileSearchCall:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemFileSearchCallType'
        id:
          type: string
        queries:
          type: array
          items:
            type: string
        status:
          $ref: '#/components/schemas/WebSearchStatus'
      required:
        - type
        - id
        - queries
        - status
      title: OutputItemFileSearchCall
    OutputItemImageGenerationCall:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemImageGenerationCallType'
        id:
          type: string
        result:
          type:
            - string
            - 'null'
        status:
          $ref: '#/components/schemas/ImageGenerationStatus'
      required:
        - type
        - id
        - status
      title: OutputItemImageGenerationCall
    BaseResponsesResultOutputItems:
      oneOf:
        - $ref: '#/components/schemas/OutputMessage'
        - $ref: '#/components/schemas/OutputItemReasoning'
        - $ref: '#/components/schemas/OutputItemFunctionCall'
        - $ref: '#/components/schemas/OutputItemWebSearchCall'
        - $ref: '#/components/schemas/OutputItemFileSearchCall'
        - $ref: '#/components/schemas/OutputItemImageGenerationCall'
      title: BaseResponsesResultOutputItems
    ResponsesErrorFieldCode:
      type: string
      enum:
        - server_error
        - rate_limit_exceeded
        - invalid_prompt
        - vector_store_timeout
        - invalid_image
        - invalid_image_format
        - invalid_base64_image
        - invalid_image_url
        - image_too_large
        - image_too_small
        - image_parse_error
        - image_content_policy_violation
        - invalid_image_mode
        - image_file_too_large
        - unsupported_image_media_type
        - empty_image_file
        - failed_to_download_image
        - image_file_not_found
      title: ResponsesErrorFieldCode
    ResponsesErrorField:
      type: object
      properties:
        code:
          $ref: '#/components/schemas/ResponsesErrorFieldCode'
        message:
          type: string
      required:
        - code
        - message
      description: Error information returned from the API
      title: ResponsesErrorField
    IncompleteDetailsReason:
      type: string
      enum:
        - max_output_tokens
        - content_filter
      title: IncompleteDetailsReason
    IncompleteDetails:
      type: object
      properties:
        reason:
          $ref: '#/components/schemas/IncompleteDetailsReason'
      title: IncompleteDetails
    OpenAiResponsesUsageInputTokensDetails:
      type: object
      properties:
        cached_tokens:
          type: integer
      required:
        - cached_tokens
      title: OpenAiResponsesUsageInputTokensDetails
    OpenAiResponsesUsageOutputTokensDetails:
      type: object
      properties:
        reasoning_tokens:
          type: integer
      required:
        - reasoning_tokens
      title: OpenAiResponsesUsageOutputTokensDetails
    OpenAIResponsesUsage:
      type: object
      properties:
        input_tokens:
          type: integer
        input_tokens_details:
          $ref: '#/components/schemas/OpenAiResponsesUsageInputTokensDetails'
        output_tokens:
          type: integer
        output_tokens_details:
          $ref: '#/components/schemas/OpenAiResponsesUsageOutputTokensDetails'
        total_tokens:
          type: integer
      required:
        - input_tokens
        - input_tokens_details
        - output_tokens
        - output_tokens_details
        - total_tokens
      title: OpenAIResponsesUsage
    BaseInputsOneOf1ItemsOneOf0Type:
      type: string
      enum:
        - message
      title: BaseInputsOneOf1ItemsOneOf0Type
    BaseInputsOneOf1ItemsOneOf0Role0:
      type: string
      enum:
        - user
      title: BaseInputsOneOf1ItemsOneOf0Role0
    BaseInputsOneOf1ItemsOneOf0Role1:
      type: string
      enum:
        - system
      title: BaseInputsOneOf1ItemsOneOf0Role1
    BaseInputsOneOf1ItemsOneOf0Role2:
      type: string
      enum:
        - assistant
      title: BaseInputsOneOf1ItemsOneOf0Role2
    BaseInputsOneOf1ItemsOneOf0Role3:
      type: string
      enum:
        - developer
      title: BaseInputsOneOf1ItemsOneOf0Role3
    BaseInputsOneOf1ItemsOneOf0Role:
      oneOf:
        - $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Role0'
        - $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Role1'
        - $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Role2'
        - $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Role3'
      title: BaseInputsOneOf1ItemsOneOf0Role
    BaseInputsOneOf1ItemsOneOf0ContentOneOf0Items:
      oneOf:
        - $ref: '#/components/schemas/InputText'
        - $ref: '#/components/schemas/InputImage'
        - $ref: '#/components/schemas/InputFile'
        - $ref: '#/components/schemas/InputAudio'
      title: BaseInputsOneOf1ItemsOneOf0ContentOneOf0Items
    BaseInputsOneOf1ItemsOneOf0Content0:
      type: array
      items:
        $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0ContentOneOf0Items'
      title: BaseInputsOneOf1ItemsOneOf0Content0
    BaseInputsOneOf1ItemsOneOf0Content:
      oneOf:
        - $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Content0'
        - type: string
      title: BaseInputsOneOf1ItemsOneOf0Content
    BaseInputsOneOf1ItemsOneOf0Phase0:
      type: string
      enum:
        - commentary
      title: BaseInputsOneOf1ItemsOneOf0Phase0
    BaseInputsOneOf1ItemsOneOf0Phase1:
      type: string
      enum:
        - final_answer
      title: BaseInputsOneOf1ItemsOneOf0Phase1
    BaseInputsOneOf1ItemsOneOf0Phase:
      oneOf:
        - $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Phase0'
        - $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Phase1'
        - description: Any type
      title: BaseInputsOneOf1ItemsOneOf0Phase
    BaseInputsOneOf1Items0:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Type'
        role:
          $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Role'
        content:
          $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Content'
        phase:
          $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Phase'
      required:
        - role
        - content
      title: BaseInputsOneOf1Items0
    OpenAiResponseInputMessageItemType:
      type: string
      enum:
        - message
      title: OpenAiResponseInputMessageItemType
    OpenAiResponseInputMessageItemRole0:
      type: string
      enum:
        - user
      title: OpenAiResponseInputMessageItemRole0
    OpenAiResponseInputMessageItemRole1:
      type: string
      enum:
        - system
      title: OpenAiResponseInputMessageItemRole1
    OpenAiResponseInputMessageItemRole2:
      type: string
      enum:
        - developer
      title: OpenAiResponseInputMessageItemRole2
    OpenAiResponseInputMessageItemRole:
      oneOf:
        - $ref: '#/components/schemas/OpenAiResponseInputMessageItemRole0'
        - $ref: '#/components/schemas/OpenAiResponseInputMessageItemRole1'
        - $ref: '#/components/schemas/OpenAiResponseInputMessageItemRole2'
      title: OpenAiResponseInputMessageItemRole
    OpenAiResponseInputMessageItemContentItems:
      oneOf:
        - $ref: '#/components/schemas/InputText'
        - $ref: '#/components/schemas/InputImage'
        - $ref: '#/components/schemas/InputFile'
        - $ref: '#/components/schemas/InputAudio'
      title: OpenAiResponseInputMessageItemContentItems
    OpenAIResponseInputMessageItem:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: '#/components/schemas/OpenAiResponseInputMessageItemType'
        role:
          $ref: '#/components/schemas/OpenAiResponseInputMessageItemRole'
        content:
          type: array
          items:
            $ref: '#/components/schemas/OpenAiResponseInputMessageItemContentItems'
      required:
        - id
        - role
        - content
      title: OpenAIResponseInputMessageItem
    OpenAIResponseFunctionToolCallOutput:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputType'
        id:
          type:
            - string
            - 'null'
        call_id:
          type: string
        output:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputOutput'
        status:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputStatus'
      required:
        - type
        - call_id
        - output
      title: OpenAIResponseFunctionToolCallOutput
    OpenAIResponseFunctionToolCall:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallType'
        call_id:
          type: string
        name:
          type: string
        arguments:
          type: string
        id:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
      required:
        - type
        - call_id
        - name
        - arguments
      title: OpenAIResponseFunctionToolCall
    BaseInputsOneOf1Items:
      oneOf:
        - $ref: '#/components/schemas/BaseInputsOneOf1Items0'
        - $ref: '#/components/schemas/OpenAIResponseInputMessageItem'
        - $ref: '#/components/schemas/OpenAIResponseFunctionToolCallOutput'
        - $ref: '#/components/schemas/OpenAIResponseFunctionToolCall'
        - $ref: '#/components/schemas/OutputItemImageGenerationCall'
        - $ref: '#/components/schemas/OutputMessage'
      title: BaseInputsOneOf1Items
    BaseInputs1:
      type: array
      items:
        $ref: '#/components/schemas/BaseInputsOneOf1Items'
      title: BaseInputs1
    BaseInputs:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/BaseInputs1'
        - description: Any type
      title: BaseInputs
    BaseResponsesResultToolsItems0:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/FunctionToolType'
        name:
          type: string
        description:
          type:
            - string
            - 'null'
        strict:
          type:
            - boolean
            - 'null'
        parameters:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - type
        - name
        - parameters
      description: Function tool definition
      title: BaseResponsesResultToolsItems0
    BaseResponsesResultToolsItems:
      oneOf:
        - $ref: '#/components/schemas/BaseResponsesResultToolsItems0'
        - $ref: '#/components/schemas/Preview_WebSearchServerTool'
        - $ref: '#/components/schemas/Preview_20250311_WebSearchServerTool'
        - $ref: '#/components/schemas/Legacy_WebSearchServerTool'
        - $ref: '#/components/schemas/WebSearchServerTool'
        - $ref: '#/components/schemas/FileSearchServerTool'
        - $ref: '#/components/schemas/ComputerUseServerTool'
        - $ref: '#/components/schemas/CodeInterpreterServerTool'
        - $ref: '#/components/schemas/McpServerTool'
        - $ref: '#/components/schemas/ImageGenerationServerTool'
        - $ref: '#/components/schemas/CodexLocalShellTool'
        - $ref: '#/components/schemas/ShellServerTool'
        - $ref: '#/components/schemas/ApplyPatchServerTool'
        - $ref: '#/components/schemas/CustomTool'
      title: BaseResponsesResultToolsItems
    BaseReasoningConfig:
      type: object
      properties:
        effort:
          $ref: '#/components/schemas/ReasoningEffort'
        summary:
          $ref: '#/components/schemas/ReasoningSummaryVerbosity'
      title: BaseReasoningConfig
    ServiceTier:
      type: string
      enum:
        - auto
        - default
        - flex
        - priority
        - scale
      title: ServiceTier
    Truncation:
      type: string
      enum:
        - auto
        - disabled
      title: Truncation
    TextConfig:
      type: object
      properties:
        format:
          $ref: '#/components/schemas/Formats'
        verbosity:
          oneOf:
            - $ref: '#/components/schemas/TextConfigVerbosity'
            - type: 'null'
      description: Text output configuration including format and verbosity
      title: TextConfig
    OutputMessageItem:
      type: object
      properties:
        id:
          type: string
        role:
          $ref: '#/components/schemas/OutputMessageRole'
        type:
          $ref: '#/components/schemas/OutputMessageType'
        status:
          $ref: '#/components/schemas/OutputMessageStatus'
        content:
          type: array
          items:
            $ref: '#/components/schemas/OutputMessageContentItems'
        phase:
          $ref: '#/components/schemas/OutputMessagePhase'
          description: >-
            The phase of an assistant message. Use `commentary` for an
            intermediate assistant message and `final_answer` for the final
            assistant message. For follow-up requests with models like
            `gpt-5.3-codex` and later, preserve and resend phase on all
            assistant messages. Omitting it can degrade performance. Not used
            for user messages.
      required:
        - id
        - role
        - type
        - content
      description: An output message item
      title: OutputMessageItem
    OutputReasoningItem:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputItemReasoningType'
        id:
          type: string
        content:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ReasoningTextContent'
        summary:
          type: array
          items:
            $ref: '#/components/schemas/ReasoningSummaryText'
        encrypted_content:
          type:
            - string
            - 'null'
        status:
          $ref: '#/components/schemas/OutputItemReasoningStatus'
        signature:
          type:
            - string
            - 'null'
          description: A signature for the reasoning content, used for verification
        format:
          $ref: '#/components/schemas/ReasoningFormat'
      required:
        - type
        - id
        - summary
      description: An output item containing reasoning
      title: OutputReasoningItem
    OutputItems:
      oneOf:
        - $ref: '#/components/schemas/OutputMessageItem'
        - $ref: '#/components/schemas/OutputReasoningItem'
        - $ref: '#/components/schemas/OutputFunctionCallItem'
        - $ref: '#/components/schemas/OutputWebSearchCallItem'
        - $ref: '#/components/schemas/OutputFileSearchCallItem'
        - $ref: '#/components/schemas/OutputImageGenerationCallItem'
        - $ref: '#/components/schemas/OutputServerToolItem'
      description: An output item from the response
      title: OutputItems
    UsageCostDetails:
      type: object
      properties:
        upstream_inference_cost:
          type: number
          format: double
        upstream_inference_input_cost:
          type: number
          format: double
        upstream_inference_output_cost:
          type: number
          format: double
      required:
        - upstream_inference_input_cost
        - upstream_inference_output_cost
      title: UsageCostDetails
    Usage:
      type: object
      properties:
        input_tokens:
          type: integer
        input_tokens_details:
          $ref: '#/components/schemas/OpenAiResponsesUsageInputTokensDetails'
        output_tokens:
          type: integer
        output_tokens_details:
          $ref: '#/components/schemas/OpenAiResponsesUsageOutputTokensDetails'
        total_tokens:
          type: integer
        cost:
          type: number
          format: double
          description: Cost of the completion
        is_byok:
          type: boolean
          description: Whether a request was made using a Bring Your Own Key configuration
        cost_details:
          $ref: '#/components/schemas/UsageCostDetails'
      required:
        - input_tokens
        - input_tokens_details
        - output_tokens
        - output_tokens_details
        - total_tokens
      description: Token usage information for the response
      title: Usage
    OpenResponsesResult:
      type: object
      properties:
        id:
          type: string
        object:
          $ref: '#/components/schemas/BaseResponsesResultObject'
        created_at:
          type: integer
        model:
          type: string
        status:
          $ref: '#/components/schemas/OpenAIResponsesResponseStatus'
        completed_at:
          type: integer
        output:
          type: array
          items:
            $ref: '#/components/schemas/OutputItems'
        user:
          type:
            - string
            - 'null'
        output_text:
          type: string
        prompt_cache_key:
          type:
            - string
            - 'null'
        safety_identifier:
          type:
            - string
            - 'null'
        error:
          $ref: '#/components/schemas/ResponsesErrorField'
        incomplete_details:
          $ref: '#/components/schemas/IncompleteDetails'
        usage:
          $ref: '#/components/schemas/Usage'
        max_tool_calls:
          type: integer
        top_logprobs:
          type: integer
        max_output_tokens:
          type: integer
        temperature:
          type: number
          format: double
        top_p:
          type: number
          format: double
        presence_penalty:
          type: number
          format: double
        frequency_penalty:
          type: number
          format: double
        instructions:
          $ref: '#/components/schemas/BaseInputs'
        metadata:
          $ref: '#/components/schemas/RequestMetadata'
        tools:
          type: array
          items:
            $ref: '#/components/schemas/BaseResponsesResultToolsItems'
        tool_choice:
          $ref: '#/components/schemas/OpenAIResponsesToolChoice'
        parallel_tool_calls:
          type: boolean
        prompt:
          $ref: '#/components/schemas/StoredPromptTemplate'
        background:
          type:
            - boolean
            - 'null'
        previous_response_id:
          type:
            - string
            - 'null'
        reasoning:
          $ref: '#/components/schemas/BaseReasoningConfig'
        service_tier:
          type:
            - string
            - 'null'
        store:
          type: boolean
        truncation:
          $ref: '#/components/schemas/Truncation'
        text:
          $ref: '#/components/schemas/TextConfig'
      required:
        - id
        - object
        - created_at
        - model
        - status
        - completed_at
        - output
        - error
        - incomplete_details
        - temperature
        - top_p
        - presence_penalty
        - frequency_penalty
        - instructions
        - metadata
        - tools
        - tool_choice
        - parallel_tool_calls
      description: Complete non-streaming response from the Responses API
      title: OpenResponsesResult
    BadRequestResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for BadRequestResponse
      title: BadRequestResponseErrorData
    BadRequestResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/BadRequestResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Bad Request - Invalid request parameters or malformed input
      title: BadRequestResponse
    UnauthorizedResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for UnauthorizedResponse
      title: UnauthorizedResponseErrorData
    UnauthorizedResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/UnauthorizedResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Unauthorized - Authentication required or invalid credentials
      title: UnauthorizedResponse
    PaymentRequiredResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for PaymentRequiredResponse
      title: PaymentRequiredResponseErrorData
    PaymentRequiredResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/PaymentRequiredResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Payment Required - Insufficient credits or quota to complete request
      title: PaymentRequiredResponse
    NotFoundResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for NotFoundResponse
      title: NotFoundResponseErrorData
    NotFoundResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/NotFoundResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Not Found - Resource does not exist
      title: NotFoundResponse
    RequestTimeoutResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for RequestTimeoutResponse
      title: RequestTimeoutResponseErrorData
    RequestTimeoutResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/RequestTimeoutResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Request Timeout - Operation exceeded time limit
      title: RequestTimeoutResponse
    PayloadTooLargeResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for PayloadTooLargeResponse
      title: PayloadTooLargeResponseErrorData
    PayloadTooLargeResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/PayloadTooLargeResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Payload Too Large - Request payload exceeds size limits
      title: PayloadTooLargeResponse
    UnprocessableEntityResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for UnprocessableEntityResponse
      title: UnprocessableEntityResponseErrorData
    UnprocessableEntityResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/UnprocessableEntityResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Unprocessable Entity - Semantic validation failure
      title: UnprocessableEntityResponse
    TooManyRequestsResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for TooManyRequestsResponse
      title: TooManyRequestsResponseErrorData
    TooManyRequestsResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/TooManyRequestsResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Too Many Requests - Rate limit exceeded
      title: TooManyRequestsResponse
    InternalServerResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for InternalServerResponse
      title: InternalServerResponseErrorData
    InternalServerResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/InternalServerResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Internal Server Error - Unexpected server error
      title: InternalServerResponse
    BadGatewayResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for BadGatewayResponse
      title: BadGatewayResponseErrorData
    BadGatewayResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/BadGatewayResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Bad Gateway - Provider/upstream API failure
      title: BadGatewayResponse
    ServiceUnavailableResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for ServiceUnavailableResponse
      title: ServiceUnavailableResponseErrorData
    ServiceUnavailableResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/ServiceUnavailableResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Service Unavailable - Service temporarily unavailable
      title: ServiceUnavailableResponse
  securitySchemes:
    apiKey:
      type: http
      scheme: bearer
      description: API key as bearer token in Authorization header

```

## SDK Code Examples

```python
import requests

url = "https://openrouter.ai/api/v1/responses"

payload = {
    "input": "Tell me a joke about computers",
    "model": "openai/gpt-4o"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/responses';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"input":"Tell me a joke about computers","model":"openai/gpt-4o"}'
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

	url := "https://openrouter.ai/api/v1/responses"

	payload := strings.NewReader("{\n  \"input\": \"Tell me a joke about computers\",\n  \"model\": \"openai/gpt-4o\"\n}")

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

url = URI("https://openrouter.ai/api/v1/responses")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"input\": \"Tell me a joke about computers\",\n  \"model\": \"openai/gpt-4o\"\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/responses")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"input\": \"Tell me a joke about computers\",\n  \"model\": \"openai/gpt-4o\"\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/responses', [
  'body' => '{
  "input": "Tell me a joke about computers",
  "model": "openai/gpt-4o"
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

var client = new RestClient("https://openrouter.ai/api/v1/responses");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"input\": \"Tell me a joke about computers\",\n  \"model\": \"openai/gpt-4o\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "input": "Tell me a joke about computers",
  "model": "openai/gpt-4o"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/responses")! as URL,
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