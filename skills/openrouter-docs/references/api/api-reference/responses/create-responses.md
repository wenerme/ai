For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/api/api-reference/responses/llms.txt. For full documentation content, see https://openrouter.ai/docs/api/api-reference/responses/llms-full.txt.

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
    ResponsesRequestImageConfig:
      oneOf:
        - type: string
        - type: number
          format: double
      title: ResponsesRequestImageConfig
    ResponseIncludesEnum:
      type: string
      enum:
        - file_search_call.results
        - message.input_image.image_url
        - computer_call_output.output.image_url
        - reasoning.encrypted_content
        - code_interpreter_call.outputs
      title: ResponseIncludesEnum
    ReasoningTextContentType:
      type: string
      enum:
        - reasoning_text
      title: ReasoningTextContentType
    ReasoningTextContent:
      type: object
      properties:
        text:
          type: string
        type:
          $ref: '#/components/schemas/ReasoningTextContentType'
      required:
        - text
        - type
      title: ReasoningTextContent
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
    ReasoningSummaryTextType:
      type: string
      enum:
        - summary_text
      title: ReasoningSummaryTextType
    ReasoningSummaryText:
      type: object
      properties:
        text:
          type: string
        type:
          $ref: '#/components/schemas/ReasoningSummaryTextType'
      required:
        - text
        - type
      title: ReasoningSummaryText
    OutputItemReasoningType:
      type: string
      enum:
        - reasoning
      title: OutputItemReasoningType
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
        content:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ReasoningTextContent'
        encrypted_content:
          type:
            - string
            - 'null'
        id:
          type: string
        status:
          $ref: '#/components/schemas/OutputItemReasoningStatus'
        summary:
          type: array
          items:
            $ref: '#/components/schemas/ReasoningSummaryText'
        type:
          $ref: '#/components/schemas/OutputItemReasoningType'
        format:
          $ref: '#/components/schemas/ReasoningFormat'
        signature:
          type:
            - string
            - 'null'
      required:
        - id
        - summary
        - type
      description: Reasoning output item with signature and format extensions
      title: ReasoningItem
    InputTextType:
      type: string
      enum:
        - input_text
      title: InputTextType
    InputText:
      type: object
      properties:
        text:
          type: string
        type:
          $ref: '#/components/schemas/InputTextType'
      required:
        - text
        - type
      description: Text input content item
      title: InputText
    InputImageDetail:
      type: string
      enum:
        - auto
        - high
        - low
      title: InputImageDetail
    InputImageType:
      type: string
      enum:
        - input_image
      title: InputImageType
    EasyInputMessageContentOneOf0Items1:
      type: object
      properties:
        detail:
          $ref: '#/components/schemas/InputImageDetail'
        image_url:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/InputImageType'
      required:
        - detail
        - type
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
        file_data:
          type: string
        file_id:
          type:
            - string
            - 'null'
        file_url:
          type: string
        filename:
          type: string
        type:
          $ref: '#/components/schemas/InputFileType'
      required:
        - type
      description: File input content item
      title: InputFile
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
    InputAudioType:
      type: string
      enum:
        - input_audio
      title: InputAudioType
    InputAudio:
      type: object
      properties:
        input_audio:
          $ref: '#/components/schemas/InputAudioInputAudio'
        type:
          $ref: '#/components/schemas/InputAudioType'
      required:
        - input_audio
        - type
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
    EasyInputMessageType:
      type: string
      enum:
        - message
      title: EasyInputMessageType
    EasyInputMessage:
      type: object
      properties:
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
        role:
          $ref: '#/components/schemas/EasyInputMessageRole'
        type:
          $ref: '#/components/schemas/EasyInputMessageType'
      required:
        - role
      title: EasyInputMessage
    InputMessageItemContentItems1:
      type: object
      properties:
        detail:
          $ref: '#/components/schemas/InputImageDetail'
        image_url:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/InputImageType'
      required:
        - detail
        - type
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
    InputMessageItemType:
      type: string
      enum:
        - message
      title: InputMessageItemType
    InputMessageItem:
      type: object
      properties:
        content:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/InputMessageItemContentItems'
        id:
          type: string
        role:
          $ref: '#/components/schemas/InputMessageItemRole'
        type:
          $ref: '#/components/schemas/InputMessageItemType'
      required:
        - role
      title: InputMessageItem
    ToolCallStatus:
      type: string
      enum:
        - in_progress
        - completed
        - incomplete
      title: ToolCallStatus
    OpenAiResponseFunctionToolCallType:
      type: string
      enum:
        - function_call
      title: OpenAiResponseFunctionToolCallType
    FunctionCallItem:
      type: object
      properties:
        arguments:
          type: string
        call_id:
          type: string
        id:
          type: string
        name:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallType'
      required:
        - arguments
        - call_id
        - name
        - type
      description: A function call initiated by the model
      title: FunctionCallItem
    InputImage:
      type: object
      properties:
        detail:
          $ref: '#/components/schemas/InputImageDetail'
        image_url:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/InputImageType'
      required:
        - detail
        - type
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
    OpenAiResponseFunctionToolCallOutputType:
      type: string
      enum:
        - function_call_output
      title: OpenAiResponseFunctionToolCallOutputType
    FunctionCallOutputItemOutputOneOf1Items1:
      type: object
      properties:
        detail:
          $ref: '#/components/schemas/InputImageDetail'
        image_url:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/InputImageType'
      required:
        - detail
        - type
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
        call_id:
          type: string
        id:
          type:
            - string
            - 'null'
        output:
          $ref: '#/components/schemas/FunctionCallOutputItemOutput'
        status:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputStatus'
        type:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputType'
      required:
        - call_id
        - output
        - type
      description: The output from a function call execution
      title: FunctionCallOutputItem
    FileCitationType:
      type: string
      enum:
        - file_citation
      title: FileCitationType
    FileCitation:
      type: object
      properties:
        file_id:
          type: string
        filename:
          type: string
        index:
          type: integer
        type:
          $ref: '#/components/schemas/FileCitationType'
      required:
        - file_id
        - filename
        - index
        - type
      title: FileCitation
    UrlCitationType:
      type: string
      enum:
        - url_citation
      title: UrlCitationType
    URLCitation:
      type: object
      properties:
        end_index:
          type: integer
        start_index:
          type: integer
        title:
          type: string
        type:
          $ref: '#/components/schemas/UrlCitationType'
        url:
          type: string
      required:
        - end_index
        - start_index
        - title
        - type
        - url
      title: URLCitation
    FilePathType:
      type: string
      enum:
        - file_path
      title: FilePathType
    FilePath:
      type: object
      properties:
        file_id:
          type: string
        index:
          type: integer
        type:
          $ref: '#/components/schemas/FilePathType'
      required:
        - file_id
        - index
        - type
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
        bytes:
          type: array
          items:
            type: integer
        logprob:
          type: number
          format: double
        token:
          type: string
      required:
        - bytes
        - logprob
        - token
      title: ResponseOutputTextLogprobsItemsTopLogprobsItems
    ResponseOutputTextLogprobsItems:
      type: object
      properties:
        bytes:
          type: array
          items:
            type: integer
        logprob:
          type: number
          format: double
        token:
          type: string
        top_logprobs:
          type: array
          items:
            $ref: >-
              #/components/schemas/ResponseOutputTextLogprobsItemsTopLogprobsItems
      required:
        - bytes
        - logprob
        - token
        - top_logprobs
      title: ResponseOutputTextLogprobsItems
    ResponseOutputTextType:
      type: string
      enum:
        - output_text
      title: ResponseOutputTextType
    ResponseOutputText:
      type: object
      properties:
        annotations:
          type: array
          items:
            $ref: '#/components/schemas/OpenAIResponsesAnnotation'
        logprobs:
          type: array
          items:
            $ref: '#/components/schemas/ResponseOutputTextLogprobsItems'
        text:
          type: string
        type:
          $ref: '#/components/schemas/ResponseOutputTextType'
      required:
        - text
        - type
      title: ResponseOutputText
    OpenAiResponsesRefusalContentType:
      type: string
      enum:
        - refusal
      title: OpenAiResponsesRefusalContentType
    OpenAIResponsesRefusalContent:
      type: object
      properties:
        refusal:
          type: string
        type:
          $ref: '#/components/schemas/OpenAiResponsesRefusalContentType'
      required:
        - refusal
        - type
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
    OutputMessageRole:
      type: string
      enum:
        - assistant
      title: OutputMessageRole
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
    OutputMessageType:
      type: string
      enum:
        - message
      title: OutputMessageType
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
        content:
          $ref: '#/components/schemas/InputsOneOf1ItemsOneOf5Content'
        id:
          type: string
        phase:
          $ref: '#/components/schemas/OutputMessagePhase'
          description: >-
            The phase of an assistant message. Use `commentary` for an
            intermediate assistant message and `final_answer` for the final
            assistant message. For follow-up requests with models like
            `gpt-5.3-codex` and later, preserve and resend phase on all
            assistant messages. Omitting it can degrade performance. Not used
            for user messages.
        role:
          $ref: '#/components/schemas/OutputMessageRole'
        status:
          $ref: '#/components/schemas/OutputMessageStatus'
        type:
          $ref: '#/components/schemas/OutputMessageType'
      required:
        - content
        - id
        - role
        - type
      description: An output message item
      title: InputsOneOf1Items5
    InputsOneOf1Items6:
      type: object
      properties:
        content:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ReasoningTextContent'
        encrypted_content:
          type:
            - string
            - 'null'
        id:
          type: string
        status:
          $ref: '#/components/schemas/OutputItemReasoningStatus'
        summary:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ReasoningSummaryText'
        type:
          $ref: '#/components/schemas/OutputItemReasoningType'
        format:
          $ref: '#/components/schemas/ReasoningFormat'
        signature:
          type:
            - string
            - 'null'
          description: A signature for the reasoning content, used for verification
      required:
        - id
        - summary
        - type
      description: An output item containing reasoning
      title: InputsOneOf1Items6
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
    OutputItemFunctionCallType:
      type: string
      enum:
        - function_call
      title: OutputItemFunctionCallType
    OutputFunctionCallItem:
      type: object
      properties:
        arguments:
          type: string
        call_id:
          type: string
        id:
          type: string
        name:
          type: string
        status:
          $ref: '#/components/schemas/OutputItemFunctionCallStatus'
        type:
          $ref: '#/components/schemas/OutputItemFunctionCallType'
      required:
        - arguments
        - call_id
        - name
        - type
      title: OutputFunctionCallItem
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
    OutputItemWebSearchCallActionOneOf0Type:
      type: string
      enum:
        - search
      title: OutputItemWebSearchCallActionOneOf0Type
    OutputItemWebSearchCallAction0:
      type: object
      properties:
        queries:
          type: array
          items:
            type: string
        query:
          type: string
        sources:
          type: array
          items:
            $ref: '#/components/schemas/WebSearchSource'
        type:
          $ref: '#/components/schemas/OutputItemWebSearchCallActionOneOf0Type'
      required:
        - query
        - type
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
        pattern:
          type: string
        type:
          $ref: '#/components/schemas/OutputItemWebSearchCallActionOneOf2Type'
        url:
          type: string
      required:
        - pattern
        - type
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
    OutputItemWebSearchCallType:
      type: string
      enum:
        - web_search_call
      title: OutputItemWebSearchCallType
    OutputWebSearchCallItem:
      type: object
      properties:
        action:
          $ref: '#/components/schemas/OutputItemWebSearchCallAction'
        id:
          type: string
        status:
          $ref: '#/components/schemas/WebSearchStatus'
        type:
          $ref: '#/components/schemas/OutputItemWebSearchCallType'
      required:
        - action
        - id
        - status
        - type
      title: OutputWebSearchCallItem
    OutputItemFileSearchCallType:
      type: string
      enum:
        - file_search_call
      title: OutputItemFileSearchCallType
    OutputFileSearchCallItem:
      type: object
      properties:
        id:
          type: string
        queries:
          type: array
          items:
            type: string
        status:
          $ref: '#/components/schemas/WebSearchStatus'
        type:
          $ref: '#/components/schemas/OutputItemFileSearchCallType'
      required:
        - id
        - queries
        - status
        - type
      title: OutputFileSearchCallItem
    ImageGenerationStatus:
      type: string
      enum:
        - in_progress
        - completed
        - generating
        - failed
      title: ImageGenerationStatus
    OutputItemImageGenerationCallType:
      type: string
      enum:
        - image_generation_call
      title: OutputItemImageGenerationCallType
    OutputImageGenerationCallItem:
      type: object
      properties:
        id:
          type: string
        result:
          type:
            - string
            - 'null'
        status:
          $ref: '#/components/schemas/ImageGenerationStatus'
        type:
          $ref: '#/components/schemas/OutputItemImageGenerationCallType'
      required:
        - id
        - status
        - type
      title: OutputImageGenerationCallItem
    OutputDatetimeItemType:
      type: string
      enum:
        - openrouter:datetime
      title: OutputDatetimeItemType
    OutputDatetimeItem:
      type: object
      properties:
        datetime:
          type: string
          description: ISO 8601 datetime string
        id:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        timezone:
          type: string
          description: IANA timezone name
        type:
          $ref: '#/components/schemas/OutputDatetimeItemType'
      required:
        - datetime
        - status
        - timezone
        - type
      description: An openrouter:datetime server tool output item
      title: OutputDatetimeItem
    OutputWebSearchServerToolItemType:
      type: string
      enum:
        - openrouter:web_search
      title: OutputWebSearchServerToolItemType
    OutputWebSearchServerToolItem:
      type: object
      properties:
        id:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/OutputWebSearchServerToolItemType'
      required:
        - status
        - type
      description: An openrouter:web_search server tool output item
      title: OutputWebSearchServerToolItem
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
        - $ref: '#/components/schemas/OutputWebSearchServerToolItem'
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
    OutputModalityEnum:
      type: string
      enum:
        - text
        - image
      title: OutputModalityEnum
    AutoRouterPluginId:
      type: string
      enum:
        - auto-router
      title: AutoRouterPluginId
    AutoRouterPlugin:
      type: object
      properties:
        allowed_models:
          type: array
          items:
            type: string
          description: >-
            List of model patterns to filter which models the auto-router can
            route between. Supports wildcards (e.g., "anthropic/*" matches all
            Anthropic models). When not specified, uses the default supported
            models list.
        enabled:
          type: boolean
          description: >-
            Set to false to disable the auto-router plugin for this request.
            Defaults to true.
        id:
          $ref: '#/components/schemas/AutoRouterPluginId'
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
    WebSearchPlugin:
      type: object
      properties:
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
        id:
          $ref: '#/components/schemas/WebSearchPluginId'
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
        search_prompt:
          type: string
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
        enabled:
          type: boolean
          description: >-
            Set to false to disable the file-parser plugin for this request.
            Defaults to true.
        id:
          $ref: '#/components/schemas/FileParserPluginId'
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
        enabled:
          type: boolean
          description: >-
            Set to false to disable the response-healing plugin for this
            request. Defaults to true.
        id:
          $ref: '#/components/schemas/ResponseHealingPluginId'
      required:
        - id
      title: ResponseHealingPlugin
    ContextCompressionEngine:
      type: string
      enum:
        - middle-out
      description: The compression engine to use. Defaults to "middle-out".
      title: ContextCompressionEngine
    ContextCompressionPluginId:
      type: string
      enum:
        - context-compression
      title: ContextCompressionPluginId
    ContextCompressionPlugin:
      type: object
      properties:
        enabled:
          type: boolean
          description: >-
            Set to false to disable the context-compression plugin for this
            request. Defaults to true.
        engine:
          $ref: '#/components/schemas/ContextCompressionEngine'
        id:
          $ref: '#/components/schemas/ContextCompressionPluginId'
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
    ProviderPreferencesIgnoreItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ProviderPreferencesIgnoreItems
    ProviderPreferencesMaxPriceAudio:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceAudio
    ProviderPreferencesMaxPriceCompletion:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceCompletion
    ProviderPreferencesMaxPriceImage:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceImage
    BigNumberUnion:
      type: string
      description: Price per million prompt tokens
      title: BigNumberUnion
    ProviderPreferencesMaxPriceRequest:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceRequest
    ProviderPreferencesMaxPrice:
      type: object
      properties:
        audio:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceAudio'
        completion:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceCompletion'
        image:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceImage'
        prompt:
          $ref: '#/components/schemas/BigNumberUnion'
        request:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceRequest'
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
        enabled:
          type:
            - boolean
            - 'null'
        max_tokens:
          type: integer
      description: Configuration for reasoning mode in the response
      title: ReasoningConfig
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
        description:
          type: string
        name:
          type: string
        schema:
          type: object
          additionalProperties:
            description: Any type
        strict:
          type:
            - boolean
            - 'null'
        type:
          $ref: '#/components/schemas/FormatJsonSchemaConfigType'
      required:
        - name
        - schema
        - type
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
        name:
          type: string
        type:
          $ref: '#/components/schemas/OpenAiResponsesToolChoiceOneOf3Type'
      required:
        - name
        - type
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
    ToolChoiceAllowedType:
      type: string
      enum:
        - allowed_tools
      title: ToolChoiceAllowedType
    ToolChoiceAllowed:
      type: object
      properties:
        mode:
          $ref: '#/components/schemas/ToolChoiceAllowedMode'
        tools:
          type: array
          items:
            type: object
            additionalProperties:
              description: Any type
        type:
          $ref: '#/components/schemas/ToolChoiceAllowedType'
      required:
        - mode
        - tools
        - type
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
    FunctionToolType:
      type: string
      enum:
        - function
      title: FunctionToolType
    ResponsesRequestToolsItems0:
      type: object
      properties:
        description:
          type:
            - string
            - 'null'
        name:
          type: string
        parameters:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        strict:
          type:
            - boolean
            - 'null'
        type:
          $ref: '#/components/schemas/FunctionToolType'
      required:
        - name
        - parameters
        - type
      description: Function tool definition
      title: ResponsesRequestToolsItems0
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
    SearchContextSizeEnum:
      type: string
      enum:
        - low
        - medium
        - high
      description: Size of the search context for web search tools
      title: SearchContextSizeEnum
    PreviewWebSearchServerToolType:
      type: string
      enum:
        - web_search_preview
      title: PreviewWebSearchServerToolType
    PreviewWebSearchUserLocationType:
      type: string
      enum:
        - approximate
      title: PreviewWebSearchUserLocationType
    Preview_WebSearchUserLocation:
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
          $ref: '#/components/schemas/PreviewWebSearchUserLocationType'
      required:
        - type
      title: Preview_WebSearchUserLocation
    Preview_WebSearchServerTool:
      type: object
      properties:
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        filters:
          $ref: '#/components/schemas/WebSearchDomainFilter'
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        search_context_size:
          $ref: '#/components/schemas/SearchContextSizeEnum'
        type:
          $ref: '#/components/schemas/PreviewWebSearchServerToolType'
        user_location:
          $ref: '#/components/schemas/Preview_WebSearchUserLocation'
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
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        filters:
          $ref: '#/components/schemas/WebSearchDomainFilter'
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        search_context_size:
          $ref: '#/components/schemas/SearchContextSizeEnum'
        type:
          $ref: '#/components/schemas/Preview20250311WebSearchServerToolType'
        user_location:
          $ref: '#/components/schemas/Preview_WebSearchUserLocation'
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
          $ref: '#/components/schemas/WebSearchUserLocationType'
      description: User location information for web search
      title: WebSearchUserLocation
    Legacy_WebSearchServerTool:
      type: object
      properties:
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        filters:
          $ref: '#/components/schemas/WebSearchDomainFilter'
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        search_context_size:
          $ref: '#/components/schemas/SearchContextSizeEnum'
        type:
          $ref: '#/components/schemas/LegacyWebSearchServerToolType'
        user_location:
          $ref: '#/components/schemas/WebSearchUserLocation'
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
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        filters:
          $ref: '#/components/schemas/WebSearchDomainFilter'
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        search_context_size:
          $ref: '#/components/schemas/SearchContextSizeEnum'
        type:
          $ref: '#/components/schemas/WebSearchServerToolType'
        user_location:
          $ref: '#/components/schemas/WebSearchUserLocation'
      required:
        - type
      description: Web search tool configuration (2025-08-26 version)
      title: WebSearchServerTool
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
        filters:
          type: array
          items:
            type: object
            additionalProperties:
              description: Any type
        type:
          $ref: '#/components/schemas/CompoundFilterType'
      required:
        - filters
        - type
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
    FileSearchServerToolType:
      type: string
      enum:
        - file_search
      title: FileSearchServerToolType
    FileSearchServerTool:
      type: object
      properties:
        filters:
          $ref: '#/components/schemas/FileSearchServerToolFilters'
        max_num_results:
          type: integer
        ranking_options:
          $ref: '#/components/schemas/FileSearchServerToolRankingOptions'
        type:
          $ref: '#/components/schemas/FileSearchServerToolType'
        vector_store_ids:
          type: array
          items:
            type: string
      required:
        - type
        - vector_store_ids
      description: File search tool configuration
      title: FileSearchServerTool
    ComputerUseServerToolEnvironment:
      type: string
      enum:
        - windows
        - mac
        - linux
        - ubuntu
        - browser
      title: ComputerUseServerToolEnvironment
    ComputerUseServerToolType:
      type: string
      enum:
        - computer_use_preview
      title: ComputerUseServerToolType
    ComputerUseServerTool:
      type: object
      properties:
        display_height:
          type: integer
        display_width:
          type: integer
        environment:
          $ref: '#/components/schemas/ComputerUseServerToolEnvironment'
        type:
          $ref: '#/components/schemas/ComputerUseServerToolType'
      required:
        - display_height
        - display_width
        - environment
        - type
      description: Computer use preview tool configuration
      title: ComputerUseServerTool
    CodeInterpreterServerToolContainerOneOf1MemoryLimit:
      type: string
      enum:
        - 1g
        - 4g
        - 16g
        - 64g
      title: CodeInterpreterServerToolContainerOneOf1MemoryLimit
    CodeInterpreterServerToolContainerOneOf1Type:
      type: string
      enum:
        - auto
      title: CodeInterpreterServerToolContainerOneOf1Type
    CodeInterpreterServerToolContainer1:
      type: object
      properties:
        file_ids:
          type: array
          items:
            type: string
        memory_limit:
          oneOf:
            - $ref: >-
                #/components/schemas/CodeInterpreterServerToolContainerOneOf1MemoryLimit
            - type: 'null'
        type:
          $ref: '#/components/schemas/CodeInterpreterServerToolContainerOneOf1Type'
      required:
        - type
      title: CodeInterpreterServerToolContainer1
    CodeInterpreterServerToolContainer:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/CodeInterpreterServerToolContainer1'
      title: CodeInterpreterServerToolContainer
    CodeInterpreterServerToolType:
      type: string
      enum:
        - code_interpreter
      title: CodeInterpreterServerToolType
    CodeInterpreterServerTool:
      type: object
      properties:
        container:
          $ref: '#/components/schemas/CodeInterpreterServerToolContainer'
        type:
          $ref: '#/components/schemas/CodeInterpreterServerToolType'
      required:
        - container
        - type
      description: Code interpreter tool configuration
      title: CodeInterpreterServerTool
    McpServerToolAllowedTools1:
      type: object
      properties:
        read_only:
          type: boolean
        tool_names:
          type: array
          items:
            type: string
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
    McpServerToolRequireApprovalOneOf0Always:
      type: object
      properties:
        tool_names:
          type: array
          items:
            type: string
      title: McpServerToolRequireApprovalOneOf0Always
    McpServerToolRequireApprovalOneOf0Never:
      type: object
      properties:
        tool_names:
          type: array
          items:
            type: string
      title: McpServerToolRequireApprovalOneOf0Never
    McpServerToolRequireApproval0:
      type: object
      properties:
        always:
          $ref: '#/components/schemas/McpServerToolRequireApprovalOneOf0Always'
        never:
          $ref: '#/components/schemas/McpServerToolRequireApprovalOneOf0Never'
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
    McpServerToolType:
      type: string
      enum:
        - mcp
      title: McpServerToolType
    McpServerTool:
      type: object
      properties:
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
        server_label:
          type: string
        server_url:
          type: string
        type:
          $ref: '#/components/schemas/McpServerToolType'
      required:
        - server_label
        - type
      description: MCP (Model Context Protocol) tool configuration
      title: McpServerTool
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
        file_id:
          type: string
        image_url:
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
    ImageGenerationServerToolType:
      type: string
      enum:
        - image_generation
      title: ImageGenerationServerToolType
    ImageGenerationServerTool:
      type: object
      properties:
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
        type:
          $ref: '#/components/schemas/ImageGenerationServerToolType'
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
    CustomToolFormatOneOf1Syntax:
      type: string
      enum:
        - lark
        - regex
      title: CustomToolFormatOneOf1Syntax
    CustomToolFormatOneOf1Type:
      type: string
      enum:
        - grammar
      title: CustomToolFormatOneOf1Type
    CustomToolFormat1:
      type: object
      properties:
        definition:
          type: string
        syntax:
          $ref: '#/components/schemas/CustomToolFormatOneOf1Syntax'
        type:
          $ref: '#/components/schemas/CustomToolFormatOneOf1Type'
      required:
        - definition
        - syntax
        - type
      title: CustomToolFormat1
    CustomToolFormat:
      oneOf:
        - $ref: '#/components/schemas/CustomToolFormat0'
        - $ref: '#/components/schemas/CustomToolFormat1'
      title: CustomToolFormat
    CustomToolType:
      type: string
      enum:
        - custom
      title: CustomToolType
    CustomTool:
      type: object
      properties:
        description:
          type: string
        format:
          $ref: '#/components/schemas/CustomToolFormat'
        name:
          type: string
        type:
          $ref: '#/components/schemas/CustomToolType'
      required:
        - name
        - type
      description: Custom tool configuration
      title: CustomTool
    DatetimeServerToolParameters:
      type: object
      properties:
        timezone:
          type: string
          description: IANA timezone name (e.g. "America/New_York"). Defaults to UTC.
      title: DatetimeServerToolParameters
    DatetimeServerToolType:
      type: string
      enum:
        - openrouter:datetime
      title: DatetimeServerToolType
    DatetimeServerTool:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/DatetimeServerToolParameters'
        type:
          $ref: '#/components/schemas/DatetimeServerToolType'
      required:
        - type
      description: 'OpenRouter built-in server tool: returns the current date and time'
      title: DatetimeServerTool
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
    WebSearchServerToolOpenRouterType:
      type: string
      enum:
        - openrouter:web_search
      title: WebSearchServerToolOpenRouterType
    WebSearchServerTool_OpenRouter:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/WebSearchServerToolOpenRouterParameters'
        type:
          $ref: '#/components/schemas/WebSearchServerToolOpenRouterType'
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
    OpenAIResponsesTruncation:
      type: string
      enum:
        - auto
        - disabled
      title: OpenAIResponsesTruncation
    ResponsesRequest:
      type: object
      properties:
        background:
          type:
            - boolean
            - 'null'
        frequency_penalty:
          type: number
          format: double
        image_config:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ResponsesRequestImageConfig'
          description: >-
            Provider-specific image configuration options. Keys and values vary
            by model/provider. See
            https://openrouter.ai/docs/features/multimodal/image-generation for
            more details.
        include:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ResponseIncludesEnum'
        input:
          $ref: '#/components/schemas/Inputs'
        instructions:
          type:
            - string
            - 'null'
        max_output_tokens:
          type: integer
        max_tool_calls:
          type: integer
        metadata:
          $ref: '#/components/schemas/RequestMetadata'
        modalities:
          type: array
          items:
            $ref: '#/components/schemas/OutputModalityEnum'
          description: >-
            Output modalities for the response. Supported values are "text" and
            "image".
        model:
          type: string
        models:
          type: array
          items:
            type: string
        parallel_tool_calls:
          type:
            - boolean
            - 'null'
        plugins:
          type: array
          items:
            $ref: '#/components/schemas/ResponsesRequestPluginsItems'
          description: >-
            Plugins you want to enable for this request, including their
            settings.
        presence_penalty:
          type: number
          format: double
        previous_response_id:
          type:
            - string
            - 'null'
        prompt:
          $ref: '#/components/schemas/StoredPromptTemplate'
        prompt_cache_key:
          type:
            - string
            - 'null'
        provider:
          $ref: '#/components/schemas/ProviderPreferences'
        reasoning:
          $ref: '#/components/schemas/ReasoningConfig'
        route:
          description: Any type
        safety_identifier:
          type:
            - string
            - 'null'
        service_tier:
          oneOf:
            - $ref: '#/components/schemas/ResponsesRequestServiceTier'
            - type: 'null'
        session_id:
          type: string
          description: >-
            A unique identifier for grouping related requests (e.g., a
            conversation or agent workflow) for observability. If provided in
            both the request body and the x-session-id header, the body value
            takes precedence. Maximum of 256 characters.
        store:
          type: boolean
          enum:
            - false
        stream:
          type: boolean
          default: false
        temperature:
          type: number
          format: double
        text:
          $ref: '#/components/schemas/TextExtendedConfig'
        tool_choice:
          $ref: '#/components/schemas/OpenAIResponsesToolChoice'
        tools:
          type: array
          items:
            $ref: '#/components/schemas/ResponsesRequestToolsItems'
        top_k:
          type: integer
        top_logprobs:
          type: integer
        top_p:
          type: number
          format: double
        trace:
          $ref: '#/components/schemas/TraceConfig'
        truncation:
          $ref: '#/components/schemas/OpenAIResponsesTruncation'
        user:
          type: string
          description: >-
            A unique identifier representing your end-user, which helps
            distinguish between different users of your app. This allows your
            app to identify specific users in case of abuse reports, preventing
            your entire app from being affected by the actions of individual
            users. Maximum of 256 characters.
      description: Request schema for Responses endpoint
      title: ResponsesRequest
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
    BaseInputsOneOf1ItemsOneOf0Type:
      type: string
      enum:
        - message
      title: BaseInputsOneOf1ItemsOneOf0Type
    BaseInputsOneOf1Items0:
      type: object
      properties:
        content:
          $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Content'
        phase:
          $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Phase'
        role:
          $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Role'
        type:
          $ref: '#/components/schemas/BaseInputsOneOf1ItemsOneOf0Type'
      required:
        - content
        - role
      title: BaseInputsOneOf1Items0
    OpenAiResponseInputMessageItemContentItems:
      oneOf:
        - $ref: '#/components/schemas/InputText'
        - $ref: '#/components/schemas/InputImage'
        - $ref: '#/components/schemas/InputFile'
        - $ref: '#/components/schemas/InputAudio'
      title: OpenAiResponseInputMessageItemContentItems
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
    OpenAiResponseInputMessageItemType:
      type: string
      enum:
        - message
      title: OpenAiResponseInputMessageItemType
    OpenAIResponseInputMessageItem:
      type: object
      properties:
        content:
          type: array
          items:
            $ref: '#/components/schemas/OpenAiResponseInputMessageItemContentItems'
        id:
          type: string
        role:
          $ref: '#/components/schemas/OpenAiResponseInputMessageItemRole'
        type:
          $ref: '#/components/schemas/OpenAiResponseInputMessageItemType'
      required:
        - content
        - id
        - role
      title: OpenAIResponseInputMessageItem
    OpenAIResponseFunctionToolCallOutput:
      type: object
      properties:
        call_id:
          type: string
        id:
          type:
            - string
            - 'null'
        output:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputOutput'
        status:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputStatus'
        type:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputType'
      required:
        - call_id
        - output
        - type
      title: OpenAIResponseFunctionToolCallOutput
    OpenAIResponseFunctionToolCall:
      type: object
      properties:
        arguments:
          type: string
        call_id:
          type: string
        id:
          type: string
        name:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallType'
      required:
        - arguments
        - call_id
        - name
        - type
      title: OpenAIResponseFunctionToolCall
    OutputItemImageGenerationCall:
      type: object
      properties:
        id:
          type: string
        result:
          type:
            - string
            - 'null'
        status:
          $ref: '#/components/schemas/ImageGenerationStatus'
        type:
          $ref: '#/components/schemas/OutputItemImageGenerationCallType'
      required:
        - id
        - status
        - type
      title: OutputItemImageGenerationCall
    OutputMessage:
      type: object
      properties:
        content:
          type: array
          items:
            $ref: '#/components/schemas/OutputMessageContentItems'
        id:
          type: string
        phase:
          $ref: '#/components/schemas/OutputMessagePhase'
          description: >-
            The phase of an assistant message. Use `commentary` for an
            intermediate assistant message and `final_answer` for the final
            assistant message. For follow-up requests with models like
            `gpt-5.3-codex` and later, preserve and resend phase on all
            assistant messages. Omitting it can degrade performance. Not used
            for user messages.
        role:
          $ref: '#/components/schemas/OutputMessageRole'
        status:
          $ref: '#/components/schemas/OutputMessageStatus'
        type:
          $ref: '#/components/schemas/OutputMessageType'
      required:
        - content
        - id
        - role
        - type
      title: OutputMessage
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
    BaseResponsesResultObject:
      type: string
      enum:
        - response
      title: BaseResponsesResultObject
    OutputItemReasoning:
      type: object
      properties:
        content:
          type: array
          items:
            $ref: '#/components/schemas/ReasoningTextContent'
        encrypted_content:
          type:
            - string
            - 'null'
        id:
          type: string
        status:
          $ref: '#/components/schemas/OutputItemReasoningStatus'
        summary:
          type: array
          items:
            $ref: '#/components/schemas/ReasoningSummaryText'
        type:
          $ref: '#/components/schemas/OutputItemReasoningType'
      required:
        - id
        - summary
        - type
      title: OutputItemReasoning
    OutputItemFunctionCall:
      type: object
      properties:
        arguments:
          type: string
        call_id:
          type: string
        id:
          type: string
        name:
          type: string
        status:
          $ref: '#/components/schemas/OutputItemFunctionCallStatus'
        type:
          $ref: '#/components/schemas/OutputItemFunctionCallType'
      required:
        - arguments
        - call_id
        - name
        - type
      title: OutputItemFunctionCall
    OutputItemWebSearchCall:
      type: object
      properties:
        action:
          $ref: '#/components/schemas/OutputItemWebSearchCallAction'
        id:
          type: string
        status:
          $ref: '#/components/schemas/WebSearchStatus'
        type:
          $ref: '#/components/schemas/OutputItemWebSearchCallType'
      required:
        - action
        - id
        - status
        - type
      title: OutputItemWebSearchCall
    OutputItemFileSearchCall:
      type: object
      properties:
        id:
          type: string
        queries:
          type: array
          items:
            type: string
        status:
          $ref: '#/components/schemas/WebSearchStatus'
        type:
          $ref: '#/components/schemas/OutputItemFileSearchCallType'
      required:
        - id
        - queries
        - status
        - type
      title: OutputItemFileSearchCall
    BaseResponsesResultOutputItems:
      oneOf:
        - $ref: '#/components/schemas/OutputMessage'
        - $ref: '#/components/schemas/OutputItemReasoning'
        - $ref: '#/components/schemas/OutputItemFunctionCall'
        - $ref: '#/components/schemas/OutputItemWebSearchCall'
        - $ref: '#/components/schemas/OutputItemFileSearchCall'
        - $ref: '#/components/schemas/OutputItemImageGenerationCall'
      title: BaseResponsesResultOutputItems
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
    BaseResponsesResultToolsItems0:
      type: object
      properties:
        description:
          type:
            - string
            - 'null'
        name:
          type: string
        parameters:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        strict:
          type:
            - boolean
            - 'null'
        type:
          $ref: '#/components/schemas/FunctionToolType'
      required:
        - name
        - parameters
        - type
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
    Truncation:
      type: string
      enum:
        - auto
        - disabled
      title: Truncation
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
    OutputItems:
      oneOf:
        - type: object
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
          description: file_search_call variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputItemFunctionCallType'
            arguments:
              type: string
            call_id:
              type: string
            id:
              type: string
            name:
              type: string
            status:
              $ref: '#/components/schemas/OutputItemFunctionCallStatus'
          required:
            - type
            - arguments
            - call_id
            - name
          description: function_call variant
        - type: object
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
          description: image_generation_call variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputMessageType'
            content:
              type: array
              items:
                $ref: '#/components/schemas/OutputMessageContentItems'
            id:
              type: string
            phase:
              $ref: '#/components/schemas/OutputMessagePhase'
              description: >-
                The phase of an assistant message. Use `commentary` for an
                intermediate assistant message and `final_answer` for the final
                assistant message. For follow-up requests with models like
                `gpt-5.3-codex` and later, preserve and resend phase on all
                assistant messages. Omitting it can degrade performance. Not
                used for user messages.
            role:
              $ref: '#/components/schemas/OutputMessageRole'
            status:
              $ref: '#/components/schemas/OutputMessageStatus'
          required:
            - type
            - content
            - id
            - role
          description: message variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputDatetimeItemType'
            datetime:
              type: string
              description: ISO 8601 datetime string
            id:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
            timezone:
              type: string
              description: IANA timezone name
          required:
            - type
            - datetime
            - status
            - timezone
          description: openrouter:datetime variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputWebSearchServerToolItemType'
            id:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
          required:
            - type
            - status
          description: openrouter:web_search variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputItemReasoningType'
            content:
              type:
                - array
                - 'null'
              items:
                $ref: '#/components/schemas/ReasoningTextContent'
            encrypted_content:
              type:
                - string
                - 'null'
            id:
              type: string
            status:
              $ref: '#/components/schemas/OutputItemReasoningStatus'
            summary:
              type: array
              items:
                $ref: '#/components/schemas/ReasoningSummaryText'
            format:
              $ref: '#/components/schemas/ReasoningFormat'
            signature:
              type:
                - string
                - 'null'
              description: A signature for the reasoning content, used for verification
          required:
            - type
            - id
            - summary
          description: reasoning variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputItemWebSearchCallType'
            action:
              $ref: '#/components/schemas/OutputItemWebSearchCallAction'
            id:
              type: string
            status:
              $ref: '#/components/schemas/WebSearchStatus'
          required:
            - type
            - action
            - id
            - status
          description: web_search_call variant
      discriminator:
        propertyName: type
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
        cost_details:
          $ref: '#/components/schemas/UsageCostDetails'
        is_byok:
          type: boolean
          description: Whether a request was made using a Bring Your Own Key configuration
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
        background:
          type:
            - boolean
            - 'null'
        completed_at:
          type: integer
        created_at:
          type: integer
        error:
          $ref: '#/components/schemas/ResponsesErrorField'
        frequency_penalty:
          type: number
          format: double
        id:
          type: string
        incomplete_details:
          $ref: '#/components/schemas/IncompleteDetails'
        instructions:
          $ref: '#/components/schemas/BaseInputs'
        max_output_tokens:
          type: integer
        max_tool_calls:
          type: integer
        metadata:
          $ref: '#/components/schemas/RequestMetadata'
        model:
          type: string
        object:
          $ref: '#/components/schemas/BaseResponsesResultObject'
        output:
          type: array
          items:
            $ref: '#/components/schemas/OutputItems'
        output_text:
          type: string
        parallel_tool_calls:
          type: boolean
        presence_penalty:
          type: number
          format: double
        previous_response_id:
          type:
            - string
            - 'null'
        prompt:
          $ref: '#/components/schemas/StoredPromptTemplate'
        prompt_cache_key:
          type:
            - string
            - 'null'
        reasoning:
          $ref: '#/components/schemas/BaseReasoningConfig'
        safety_identifier:
          type:
            - string
            - 'null'
        service_tier:
          type:
            - string
            - 'null'
        status:
          $ref: '#/components/schemas/OpenAIResponsesResponseStatus'
        store:
          type: boolean
        temperature:
          type: number
          format: double
        text:
          $ref: '#/components/schemas/TextConfig'
        tool_choice:
          $ref: '#/components/schemas/OpenAIResponsesToolChoice'
        tools:
          type: array
          items:
            $ref: '#/components/schemas/BaseResponsesResultToolsItems'
        top_logprobs:
          type: integer
        top_p:
          type: number
          format: double
        truncation:
          $ref: '#/components/schemas/Truncation'
        usage:
          $ref: '#/components/schemas/Usage'
        user:
          type:
            - string
            - 'null'
      required:
        - completed_at
        - created_at
        - error
        - frequency_penalty
        - id
        - incomplete_details
        - instructions
        - metadata
        - model
        - object
        - output
        - parallel_tool_calls
        - presence_penalty
        - status
        - temperature
        - tool_choice
        - tools
        - top_p
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
    "input": "Tell me a joke",
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
  body: '{"input":"Tell me a joke","model":"openai/gpt-4o"}'
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

	payload := strings.NewReader("{\n  \"input\": \"Tell me a joke\",\n  \"model\": \"openai/gpt-4o\"\n}")

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
request.body = "{\n  \"input\": \"Tell me a joke\",\n  \"model\": \"openai/gpt-4o\"\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/responses")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"input\": \"Tell me a joke\",\n  \"model\": \"openai/gpt-4o\"\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/responses', [
  'body' => '{
  "input": "Tell me a joke",
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
request.AddParameter("application/json", "{\n  \"input\": \"Tell me a joke\",\n  \"model\": \"openai/gpt-4o\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "input": "Tell me a joke",
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