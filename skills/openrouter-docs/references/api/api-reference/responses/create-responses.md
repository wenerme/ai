> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

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
        - name: X-OpenRouter-Experimental-Metadata
          in: header
          description: >-
            Opt-in to surface routing metadata on the response under
            `openrouter_metadata`. Defaults to `disabled`.
          required: false
          schema:
            $ref: '#/components/schemas/MetadataLevel'
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
        '403':
          description: >-
            Forbidden - Authentication successful but insufficient permissions,
            or a guardrail blocked the request. When guardrails block and the
            `X-OpenRouter-Experimental-Metadata: enabled` header is present, the
            response includes `openrouter_metadata` with full routing context
            and a `pipeline` array containing guardrail stage details.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ForbiddenResponse'
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
    MetadataLevel:
      type: string
      enum:
        - disabled
        - enabled
      description: >-
        Opt-in level for surfacing routing metadata on the response under
        `openrouter_metadata`.
      title: MetadataLevel
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
      description: >-
        Enable automatic prompt caching. When set at the top level, the system
        automatically applies cache breakpoints to the last cacheable block in
        the request. Currently supported for Anthropic Claude models.
      title: AnthropicCacheControlDirective
    ImageConfig:
      oneOf:
        - type: string
        - type: number
          format: double
        - type: array
          items:
            description: Any type
      title: ImageConfig
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
    ReasoningItemStatus0:
      type: string
      enum:
        - completed
      title: ReasoningItemStatus0
    ReasoningItemStatus1:
      type: string
      enum:
        - incomplete
      title: ReasoningItemStatus1
    ReasoningItemStatus2:
      type: string
      enum:
        - in_progress
      title: ReasoningItemStatus2
    ReasoningItemStatus:
      oneOf:
        - $ref: '#/components/schemas/ReasoningItemStatus0'
        - $ref: '#/components/schemas/ReasoningItemStatus1'
        - $ref: '#/components/schemas/ReasoningItemStatus2'
      title: ReasoningItemStatus
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
    ReasoningItemType:
      type: string
      enum:
        - reasoning
      title: ReasoningItemType
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
          $ref: '#/components/schemas/ReasoningItemStatus'
        summary:
          type: array
          items:
            $ref: '#/components/schemas/ReasoningSummaryText'
        type:
          $ref: '#/components/schemas/ReasoningItemType'
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
    InputText:
      type: object
      properties:
        text:
          type: string
      required:
        - text
      description: Text input content item
      title: InputText
    EasyInputMessageContentOneOf0ItemsOneOf1Detail:
      type: string
      enum:
        - auto
        - high
        - low
        - original
      title: EasyInputMessageContentOneOf0ItemsOneOf1Detail
    EasyInputMessageContentOneOf0ItemsOneOf1Type:
      type: string
      enum:
        - input_image
      title: EasyInputMessageContentOneOf0ItemsOneOf1Type
    EasyInputMessageContentOneOf0Items1:
      type: object
      properties:
        detail:
          $ref: '#/components/schemas/EasyInputMessageContentOneOf0ItemsOneOf1Detail'
        image_url:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/EasyInputMessageContentOneOf0ItemsOneOf1Type'
      required:
        - detail
        - type
      description: Image input content item
      title: EasyInputMessageContentOneOf0Items1
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
      description: File input content item
      title: InputFile
    OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputAudioInputAudioFormat:
      type: string
      enum:
        - mp3
        - wav
      title: >-
        OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputAudioInputAudioFormat
    OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputAudioInputAudio:
      type: object
      properties:
        data:
          type: string
        format:
          $ref: >-
            #/components/schemas/OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputAudioInputAudioFormat
      required:
        - data
        - format
      title: >-
        OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputAudioInputAudio
    InputAudio:
      type: object
      properties:
        input_audio:
          $ref: >-
            #/components/schemas/OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputAudioInputAudio
      required:
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
    InputMessageItemContentItemsOneOf1Detail:
      type: string
      enum:
        - auto
        - high
        - low
        - original
      title: InputMessageItemContentItemsOneOf1Detail
    InputMessageItemContentItemsOneOf1Type:
      type: string
      enum:
        - input_image
      title: InputMessageItemContentItemsOneOf1Type
    InputMessageItemContentItems1:
      type: object
      properties:
        detail:
          $ref: '#/components/schemas/InputMessageItemContentItemsOneOf1Detail'
        image_url:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/InputMessageItemContentItemsOneOf1Type'
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
    FunctionCallItemType:
      type: string
      enum:
        - function_call
      title: FunctionCallItemType
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
        namespace:
          type: string
          description: >-
            Namespace qualifier for tools registered as part of a namespace tool
            group (e.g. an MCP server)
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/FunctionCallItemType'
      required:
        - arguments
        - call_id
        - id
        - name
        - type
      description: A function call initiated by the model
      title: FunctionCallItem
    OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputImageDetail:
      type: string
      enum:
        - auto
        - high
        - low
        - original
      title: >-
        OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputImageDetail
    FunctionCallOutputItemOutputOneOf1Items:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_file
              description: 'Discriminator value: input_file'
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
          required:
            - type
          description: File input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_image
              description: 'Discriminator value: input_image'
            detail:
              $ref: >-
                #/components/schemas/OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputImageDetail
            image_url:
              type:
                - string
                - 'null'
          required:
            - type
            - detail
          description: Image input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_text
              description: 'Discriminator value: input_text'
            text:
              type: string
          required:
            - type
            - text
          description: Text input content item
      discriminator:
        propertyName: type
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
    FunctionCallOutputItemType:
      type: string
      enum:
        - function_call_output
      title: FunctionCallOutputItemType
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
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/FunctionCallOutputItemType'
      required:
        - call_id
        - output
        - type
      description: The output from a function call execution
      title: FunctionCallOutputItem
    ApplyPatchCallOperation:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - create_file
              description: 'Discriminator value: create_file'
            diff:
              type: string
            path:
              type: string
          required:
            - type
            - diff
            - path
          description: >-
            The `create_file` variant of an `apply_patch_call.operation`.
            Carries a V4A diff describing the new file contents.
        - type: object
          properties:
            type:
              type: string
              enum:
                - delete_file
              description: 'Discriminator value: delete_file'
            path:
              type: string
          required:
            - type
            - path
          description: >-
            The `delete_file` variant of an `apply_patch_call.operation`.
            Identifies the file to remove; no diff is required.
        - type: object
          properties:
            type:
              type: string
              enum:
                - update_file
              description: 'Discriminator value: update_file'
            diff:
              type: string
            path:
              type: string
          required:
            - type
            - diff
            - path
          description: >-
            The `update_file` variant of an `apply_patch_call.operation`.
            Carries a V4A diff describing edits to an existing file.
      discriminator:
        propertyName: type
      description: >-
        The patch operation requested by an `apply_patch_call`. `create_file`
        and `update_file` carry a V4A diff; `delete_file` omits it.
      title: ApplyPatchCallOperation
    ApplyPatchCallStatus:
      type: string
      enum:
        - in_progress
        - completed
      description: Lifecycle state of an `apply_patch_call` output item.
      title: ApplyPatchCallStatus
    ApplyPatchCallItemType:
      type: string
      enum:
        - apply_patch_call
      title: ApplyPatchCallItemType
    ApplyPatchCallItem:
      type: object
      properties:
        call_id:
          type: string
        id:
          type:
            - string
            - 'null'
        operation:
          $ref: '#/components/schemas/ApplyPatchCallOperation'
        status:
          $ref: '#/components/schemas/ApplyPatchCallStatus'
        type:
          $ref: '#/components/schemas/ApplyPatchCallItemType'
      required:
        - call_id
        - operation
        - status
        - type
      description: >-
        A tool call emitted by the model requesting a V4A patch operation. The
        client applies the patch and echoes an `apply_patch_call_output` on the
        next turn.
      title: ApplyPatchCallItem
    ApplyPatchCallOutputItemStatus:
      type: string
      enum:
        - completed
        - failed
      title: ApplyPatchCallOutputItemStatus
    ApplyPatchCallOutputItemType:
      type: string
      enum:
        - apply_patch_call_output
      title: ApplyPatchCallOutputItemType
    ApplyPatchCallOutputItem:
      type: object
      properties:
        call_id:
          type: string
        id:
          type:
            - string
            - 'null'
        output:
          type:
            - string
            - 'null'
        status:
          $ref: '#/components/schemas/ApplyPatchCallOutputItemStatus'
        type:
          $ref: '#/components/schemas/ApplyPatchCallOutputItemType'
      required:
        - call_id
        - status
        - type
      description: >-
        The client's echo of an `apply_patch_call` after applying the patch.
        `output` is an optional human-readable log; `status` is `completed` when
        the patch was applied successfully, `failed` otherwise.
      title: ApplyPatchCallOutputItem
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
    InputsOneOf1ItemsOneOf7ContentOneOf0Items:
      oneOf:
        - $ref: '#/components/schemas/ResponseOutputText'
        - $ref: '#/components/schemas/OpenAIResponsesRefusalContent'
      title: InputsOneOf1ItemsOneOf7ContentOneOf0Items
    InputsOneOf1ItemsOneOf7Content0:
      type: array
      items:
        $ref: '#/components/schemas/InputsOneOf1ItemsOneOf7ContentOneOf0Items'
      title: InputsOneOf1ItemsOneOf7Content0
    InputsOneOf1ItemsOneOf7Content:
      oneOf:
        - $ref: '#/components/schemas/InputsOneOf1ItemsOneOf7Content0'
        - type: string
        - description: Any type
      title: InputsOneOf1ItemsOneOf7Content
    InputsOneOf1Items7:
      type: object
      properties:
        content:
          $ref: '#/components/schemas/InputsOneOf1ItemsOneOf7Content'
      description: An output message item
      title: InputsOneOf1Items7
    InputsOneOf1Items8:
      type: object
      properties:
        content:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ReasoningTextContent'
        format:
          $ref: '#/components/schemas/ReasoningFormat'
        signature:
          type:
            - string
            - 'null'
          description: A signature for the reasoning content, used for verification
        summary:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ReasoningSummaryText'
      description: An output item containing reasoning
      title: InputsOneOf1Items8
    OutputFunctionCallItemStatus0:
      type: string
      enum:
        - completed
      title: OutputFunctionCallItemStatus0
    OutputFunctionCallItemStatus1:
      type: string
      enum:
        - incomplete
      title: OutputFunctionCallItemStatus1
    OutputFunctionCallItemStatus2:
      type: string
      enum:
        - in_progress
      title: OutputFunctionCallItemStatus2
    OutputFunctionCallItemStatus:
      oneOf:
        - $ref: '#/components/schemas/OutputFunctionCallItemStatus0'
        - $ref: '#/components/schemas/OutputFunctionCallItemStatus1'
        - $ref: '#/components/schemas/OutputFunctionCallItemStatus2'
      title: OutputFunctionCallItemStatus
    OutputFunctionCallItemType:
      type: string
      enum:
        - function_call
      title: OutputFunctionCallItemType
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
        namespace:
          type: string
          description: >-
            Namespace qualifier for tools registered as part of a namespace tool
            group (e.g. an MCP server)
        status:
          $ref: '#/components/schemas/OutputFunctionCallItemStatus'
        type:
          $ref: '#/components/schemas/OutputFunctionCallItemType'
      required:
        - arguments
        - call_id
        - name
        - type
      title: OutputFunctionCallItem
    OutputCustomToolCallItem:
      type: object
      properties:
        call_id:
          type: string
        id:
          type: string
        input:
          type: string
        name:
          type: string
        namespace:
          type: string
          description: >-
            Namespace qualifier for tools registered as part of a namespace tool
            group (e.g. an MCP server)
      required:
        - call_id
        - input
        - name
      description: >-
        A call to a custom (freeform-grammar) tool created by the model —
        distinct from `function_call`. Used for tools like Codex CLI's
        `apply_patch` whose payload is opaque text rather than JSON arguments.
      title: OutputCustomToolCallItem
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
    OutputWebSearchCallItemActionOneOf0Type:
      type: string
      enum:
        - search
      title: OutputWebSearchCallItemActionOneOf0Type
    OutputWebSearchCallItemAction0:
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
          $ref: '#/components/schemas/OutputWebSearchCallItemActionOneOf0Type'
      required:
        - query
        - type
      title: OutputWebSearchCallItemAction0
    OutputWebSearchCallItemActionOneOf1Type:
      type: string
      enum:
        - open_page
      title: OutputWebSearchCallItemActionOneOf1Type
    OutputWebSearchCallItemAction1:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OutputWebSearchCallItemActionOneOf1Type'
        url:
          type:
            - string
            - 'null'
      required:
        - type
      title: OutputWebSearchCallItemAction1
    OutputWebSearchCallItemActionOneOf2Type:
      type: string
      enum:
        - find_in_page
      title: OutputWebSearchCallItemActionOneOf2Type
    OutputWebSearchCallItemAction2:
      type: object
      properties:
        pattern:
          type: string
        type:
          $ref: '#/components/schemas/OutputWebSearchCallItemActionOneOf2Type'
        url:
          type: string
      required:
        - pattern
        - type
        - url
      title: OutputWebSearchCallItemAction2
    OutputWebSearchCallItemAction:
      oneOf:
        - $ref: '#/components/schemas/OutputWebSearchCallItemAction0'
        - $ref: '#/components/schemas/OutputWebSearchCallItemAction1'
        - $ref: '#/components/schemas/OutputWebSearchCallItemAction2'
      title: OutputWebSearchCallItemAction
    WebSearchStatus:
      type: string
      enum:
        - completed
        - searching
        - in_progress
        - failed
      title: WebSearchStatus
    OutputWebSearchCallItemType:
      type: string
      enum:
        - web_search_call
      title: OutputWebSearchCallItemType
    OutputWebSearchCallItem:
      type: object
      properties:
        action:
          $ref: '#/components/schemas/OutputWebSearchCallItemAction'
        id:
          type: string
        status:
          $ref: '#/components/schemas/WebSearchStatus'
        type:
          $ref: '#/components/schemas/OutputWebSearchCallItemType'
      required:
        - action
        - id
        - status
        - type
      title: OutputWebSearchCallItem
    OutputFileSearchCallItemType:
      type: string
      enum:
        - file_search_call
      title: OutputFileSearchCallItemType
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
          $ref: '#/components/schemas/OutputFileSearchCallItemType'
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
    OutputImageGenerationCallItemType:
      type: string
      enum:
        - image_generation_call
      title: OutputImageGenerationCallItemType
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
          $ref: '#/components/schemas/OutputImageGenerationCallItemType'
      required:
        - id
        - status
        - type
      title: OutputImageGenerationCallItem
    OutputCodeInterpreterCallItemOutputsItemsOneOf0Type:
      type: string
      enum:
        - image
      title: OutputCodeInterpreterCallItemOutputsItemsOneOf0Type
    OutputCodeInterpreterCallItemOutputsItems0:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OutputCodeInterpreterCallItemOutputsItemsOneOf0Type
        url:
          type: string
      required:
        - type
        - url
      title: OutputCodeInterpreterCallItemOutputsItems0
    OutputCodeInterpreterCallItemOutputsItemsOneOf1Type:
      type: string
      enum:
        - logs
      title: OutputCodeInterpreterCallItemOutputsItemsOneOf1Type
    OutputCodeInterpreterCallItemOutputsItems1:
      type: object
      properties:
        logs:
          type: string
        type:
          $ref: >-
            #/components/schemas/OutputCodeInterpreterCallItemOutputsItemsOneOf1Type
      required:
        - logs
        - type
      title: OutputCodeInterpreterCallItemOutputsItems1
    OutputCodeInterpreterCallItemOutputsItems:
      oneOf:
        - $ref: '#/components/schemas/OutputCodeInterpreterCallItemOutputsItems0'
        - $ref: '#/components/schemas/OutputCodeInterpreterCallItemOutputsItems1'
      title: OutputCodeInterpreterCallItemOutputsItems
    OutputCodeInterpreterCallItemType:
      type: string
      enum:
        - code_interpreter_call
      title: OutputCodeInterpreterCallItemType
    OutputCodeInterpreterCallItem:
      type: object
      properties:
        code:
          type:
            - string
            - 'null'
        container_id:
          type: string
        id:
          type: string
        outputs:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/OutputCodeInterpreterCallItemOutputsItems'
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/OutputCodeInterpreterCallItemType'
      required:
        - code
        - container_id
        - id
        - outputs
        - status
        - type
      description: A code interpreter execution call with outputs
      title: OutputCodeInterpreterCallItem
    OutputItemsDiscriminatorMappingComputerCallPendingSafetyChecksItems:
      type: object
      properties:
        code:
          type: string
        id:
          type: string
        message:
          type: string
      required:
        - code
        - id
        - message
      title: OutputItemsDiscriminatorMappingComputerCallPendingSafetyChecksItems
    OutputItemsDiscriminatorMappingComputerCallStatus:
      type: string
      enum:
        - completed
        - incomplete
        - in_progress
      title: OutputItemsDiscriminatorMappingComputerCallStatus
    OutputComputerCallItem:
      type: object
      properties:
        action:
          oneOf:
            - description: Any type
            - type: 'null'
        call_id:
          type: string
        id:
          type: string
        pending_safety_checks:
          type: array
          items:
            $ref: >-
              #/components/schemas/OutputItemsDiscriminatorMappingComputerCallPendingSafetyChecksItems
        status:
          $ref: >-
            #/components/schemas/OutputItemsDiscriminatorMappingComputerCallStatus
      required:
        - call_id
        - pending_safety_checks
        - status
      title: OutputComputerCallItem
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
      required:
        - datetime
        - status
        - timezone
      description: An openrouter:datetime server tool output item
      title: OutputDatetimeItem
    OutputWebSearchServerToolItemActionSourcesItemsType:
      type: string
      enum:
        - url
      title: OutputWebSearchServerToolItemActionSourcesItemsType
    OutputWebSearchServerToolItemActionSourcesItems:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/OutputWebSearchServerToolItemActionSourcesItemsType
        url:
          type: string
      required:
        - type
        - url
      title: OutputWebSearchServerToolItemActionSourcesItems
    OutputWebSearchServerToolItemActionType:
      type: string
      enum:
        - search
      title: OutputWebSearchServerToolItemActionType
    OutputWebSearchServerToolItemAction:
      type: object
      properties:
        query:
          type: string
        sources:
          type: array
          items:
            $ref: >-
              #/components/schemas/OutputWebSearchServerToolItemActionSourcesItems
        type:
          $ref: '#/components/schemas/OutputWebSearchServerToolItemActionType'
      required:
        - query
        - type
      description: >-
        The search action performed, matching OpenAI web_search_call.action
        shape. Includes the query the model issued and optional source URLs
        returned by the search provider.
      title: OutputWebSearchServerToolItemAction
    OutputWebSearchServerToolItemType:
      type: string
      enum:
        - openrouter:web_search
      title: OutputWebSearchServerToolItemType
    OutputWebSearchServerToolItem:
      type: object
      properties:
        action:
          $ref: '#/components/schemas/OutputWebSearchServerToolItemAction'
          description: >-
            The search action performed, matching OpenAI web_search_call.action
            shape. Includes the query the model issued and optional source URLs
            returned by the search provider.
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
    OutputCodeInterpreterServerToolItem:
      type: object
      properties:
        code:
          type: string
        exitCode:
          type: integer
        id:
          type: string
        language:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        stderr:
          type: string
        stdout:
          type: string
      required:
        - status
      description: An openrouter:code_interpreter server tool output item
      title: OutputCodeInterpreterServerToolItem
    OutputFileSearchServerToolItem:
      type: object
      properties:
        id:
          type: string
        queries:
          type: array
          items:
            type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
      required:
        - status
      description: An openrouter:file_search server tool output item
      title: OutputFileSearchServerToolItem
    OutputImageGenerationServerToolItem:
      type: object
      properties:
        id:
          type: string
        imageB64:
          type: string
        imageUrl:
          type: string
        result:
          type:
            - string
            - 'null'
          description: >-
            The generated image as a base64-encoded string or URL, matching
            OpenAI image_generation_call format
        revisedPrompt:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
      required:
        - status
      description: An openrouter:image_generation server tool output item
      title: OutputImageGenerationServerToolItem
    OutputBrowserUseServerToolItem:
      type: object
      properties:
        action:
          type: string
        id:
          type: string
        screenshotB64:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
      required:
        - status
      description: An openrouter:browser_use server tool output item
      title: OutputBrowserUseServerToolItem
    OutputBashServerToolItem:
      type: object
      properties:
        command:
          type: string
        exitCode:
          type: integer
        id:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        stderr:
          type: string
        stdout:
          type: string
      required:
        - status
      description: An openrouter:bash server tool output item
      title: OutputBashServerToolItem
    OutputTextEditorServerToolItemCommand:
      type: string
      enum:
        - view
        - create
        - str_replace
        - insert
      title: OutputTextEditorServerToolItemCommand
    OutputTextEditorServerToolItemType:
      type: string
      enum:
        - openrouter:text_editor
      title: OutputTextEditorServerToolItemType
    OutputTextEditorServerToolItem:
      type: object
      properties:
        command:
          $ref: '#/components/schemas/OutputTextEditorServerToolItemCommand'
        filePath:
          type: string
        id:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/OutputTextEditorServerToolItemType'
      required:
        - status
        - type
      description: An openrouter:text_editor server tool output item
      title: OutputTextEditorServerToolItem
    OutputApplyPatchServerToolItem:
      type: object
      properties:
        call_id:
          type: string
        id:
          type: string
        operation:
          $ref: '#/components/schemas/ApplyPatchCallOperation'
        status:
          $ref: '#/components/schemas/ToolCallStatus'
      required:
        - status
      description: >-
        An openrouter:apply_patch server tool output item. The turn halts when
        validation succeeds so the client can apply the patch and echo an
        `apply_patch_call_output` on the next turn.
      title: OutputApplyPatchServerToolItem
    OutputWebFetchServerToolItemType:
      type: string
      enum:
        - openrouter:web_fetch
      title: OutputWebFetchServerToolItemType
    OutputWebFetchServerToolItem:
      type: object
      properties:
        content:
          type: string
        error:
          type: string
          description: The error message if the fetch failed.
        httpStatus:
          type: integer
          description: The HTTP status code returned by the upstream URL fetch.
        id:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        title:
          type: string
        type:
          $ref: '#/components/schemas/OutputWebFetchServerToolItemType'
        url:
          type: string
      required:
        - status
        - type
      description: An openrouter:web_fetch server tool output item
      title: OutputWebFetchServerToolItem
    OutputToolSearchServerToolItemType:
      type: string
      enum:
        - openrouter:tool_search
      title: OutputToolSearchServerToolItemType
    OutputToolSearchServerToolItem:
      type: object
      properties:
        id:
          type: string
        query:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/OutputToolSearchServerToolItemType'
      required:
        - status
        - type
      description: An openrouter:tool_search server tool output item
      title: OutputToolSearchServerToolItem
    OutputMemoryServerToolItemAction:
      type: string
      enum:
        - read
        - write
        - delete
      title: OutputMemoryServerToolItemAction
    OutputMemoryServerToolItemType:
      type: string
      enum:
        - openrouter:memory
      title: OutputMemoryServerToolItemType
    OutputMemoryServerToolItem:
      type: object
      properties:
        action:
          $ref: '#/components/schemas/OutputMemoryServerToolItemAction'
        id:
          type: string
        key:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/OutputMemoryServerToolItemType'
        value:
          oneOf:
            - description: Any type
            - type: 'null'
      required:
        - status
        - type
      description: An openrouter:memory server tool output item
      title: OutputMemoryServerToolItem
    OutputMcpServerToolItemType:
      type: string
      enum:
        - openrouter:mcp
      title: OutputMcpServerToolItemType
    OutputMcpServerToolItem:
      type: object
      properties:
        id:
          type: string
        serverLabel:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        toolName:
          type: string
        type:
          $ref: '#/components/schemas/OutputMcpServerToolItemType'
      required:
        - status
        - type
      description: An openrouter:mcp server tool output item
      title: OutputMcpServerToolItem
    OutputSearchModelsServerToolItemType:
      type: string
      enum:
        - openrouter:experimental__search_models
      title: OutputSearchModelsServerToolItemType
    OutputSearchModelsServerToolItem:
      type: object
      properties:
        arguments:
          type: string
          description: >-
            The JSON arguments submitted to the search tool (e.g.
            {"query":"Claude"})
        id:
          type: string
        query:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/OutputSearchModelsServerToolItemType'
      required:
        - status
        - type
      description: An openrouter:experimental__search_models server tool output item
      title: OutputSearchModelsServerToolItem
    LocalShellCallItemActionType:
      type: string
      enum:
        - exec
      title: LocalShellCallItemActionType
    LocalShellCallItemAction:
      type: object
      properties:
        command:
          type: array
          items:
            type: string
        env:
          type: object
          additionalProperties:
            type: string
        timeout_ms:
          type:
            - integer
            - 'null'
        type:
          $ref: '#/components/schemas/LocalShellCallItemActionType'
        user:
          type:
            - string
            - 'null'
        working_directory:
          type:
            - string
            - 'null'
      required:
        - command
        - env
        - type
      title: LocalShellCallItemAction
    LocalShellCallItemType:
      type: string
      enum:
        - local_shell_call
      title: LocalShellCallItemType
    LocalShellCallItem:
      type: object
      properties:
        action:
          $ref: '#/components/schemas/LocalShellCallItemAction'
        call_id:
          type: string
        id:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/LocalShellCallItemType'
      required:
        - action
        - call_id
        - id
        - status
        - type
      description: A local shell command execution call
      title: LocalShellCallItem
    LocalShellCallOutputItemType:
      type: string
      enum:
        - local_shell_call_output
      title: LocalShellCallOutputItemType
    LocalShellCallOutputItem:
      type: object
      properties:
        id:
          type: string
        output:
          type: string
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/LocalShellCallOutputItemType'
      required:
        - id
        - output
        - type
      description: Output from a local shell command execution
      title: LocalShellCallOutputItem
    ShellCallItemAction:
      type: object
      properties:
        commands:
          type: array
          items:
            type: string
        max_output_length:
          type:
            - integer
            - 'null'
        timeout_ms:
          type:
            - integer
            - 'null'
      required:
        - commands
      title: ShellCallItemAction
    ShellCallItemType:
      type: string
      enum:
        - shell_call
      title: ShellCallItemType
    ShellCallItem:
      type: object
      properties:
        action:
          $ref: '#/components/schemas/ShellCallItemAction'
        call_id:
          type: string
        environment:
          oneOf:
            - description: Any type
            - type: 'null'
        id:
          type:
            - string
            - 'null'
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/ShellCallItemType'
      required:
        - action
        - call_id
        - type
      description: A shell command execution call (newer variant)
      title: ShellCallItem
    ShellCallOutputItemOutputItems:
      type: object
      properties:
        content:
          type:
            - string
            - 'null'
        exit_code:
          type:
            - integer
            - 'null'
        type:
          type: string
      required:
        - type
      title: ShellCallOutputItemOutputItems
    ShellCallOutputItemType:
      type: string
      enum:
        - shell_call_output
      title: ShellCallOutputItemType
    ShellCallOutputItem:
      type: object
      properties:
        call_id:
          type: string
        id:
          type:
            - string
            - 'null'
        max_output_length:
          type:
            - integer
            - 'null'
        output:
          type: array
          items:
            $ref: '#/components/schemas/ShellCallOutputItemOutputItems'
        status:
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/ShellCallOutputItemType'
      required:
        - call_id
        - output
        - type
      description: Output from a shell command execution (newer variant)
      title: ShellCallOutputItem
    McpListToolsItemToolsItems:
      type: object
      properties:
        annotations:
          oneOf:
            - description: Any type
            - type: 'null'
        description:
          type:
            - string
            - 'null'
        input_schema:
          type: object
          additionalProperties:
            description: Any type
        name:
          type: string
      required:
        - input_schema
        - name
      title: McpListToolsItemToolsItems
    McpListToolsItemType:
      type: string
      enum:
        - mcp_list_tools
      title: McpListToolsItemType
    McpListToolsItem:
      type: object
      properties:
        error:
          type:
            - string
            - 'null'
        id:
          type: string
        server_label:
          type: string
        tools:
          type: array
          items:
            $ref: '#/components/schemas/McpListToolsItemToolsItems'
        type:
          $ref: '#/components/schemas/McpListToolsItemType'
      required:
        - id
        - server_label
        - tools
        - type
      description: List of available MCP tools from a server
      title: McpListToolsItem
    McpApprovalRequestItemType:
      type: string
      enum:
        - mcp_approval_request
      title: McpApprovalRequestItemType
    McpApprovalRequestItem:
      type: object
      properties:
        arguments:
          type: string
        id:
          type: string
        name:
          type: string
        server_label:
          type: string
        type:
          $ref: '#/components/schemas/McpApprovalRequestItemType'
      required:
        - arguments
        - id
        - name
        - server_label
        - type
      description: Request for approval to execute an MCP tool
      title: McpApprovalRequestItem
    McpApprovalResponseItemType:
      type: string
      enum:
        - mcp_approval_response
      title: McpApprovalResponseItemType
    McpApprovalResponseItem:
      type: object
      properties:
        approval_request_id:
          type: string
        approve:
          type: boolean
        id:
          type:
            - string
            - 'null'
        reason:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/McpApprovalResponseItemType'
      required:
        - approval_request_id
        - approve
        - type
      description: User response to an MCP tool approval request
      title: McpApprovalResponseItem
    McpCallItemType:
      type: string
      enum:
        - mcp_call
      title: McpCallItemType
    McpCallItem:
      type: object
      properties:
        arguments:
          type: string
        error:
          type:
            - string
            - 'null'
        id:
          type: string
        name:
          type: string
        output:
          type:
            - string
            - 'null'
        server_label:
          type: string
        type:
          $ref: '#/components/schemas/McpCallItemType'
      required:
        - arguments
        - id
        - name
        - server_label
        - type
      description: An MCP tool call with its output or error
      title: McpCallItem
    CustomToolCallItemType:
      type: string
      enum:
        - custom_tool_call
      title: CustomToolCallItemType
    CustomToolCallItem:
      type: object
      properties:
        call_id:
          type: string
        id:
          type: string
        input:
          type: string
        name:
          type: string
        namespace:
          type: string
          description: >-
            Namespace qualifier for tools registered as part of a namespace tool
            group (e.g. an MCP server)
        type:
          $ref: '#/components/schemas/CustomToolCallItemType'
      required:
        - call_id
        - input
        - name
        - type
      description: >-
        A call to a custom (freeform-grammar) tool created by the model —
        distinct from `function_call`. Used for tools like Codex CLI's
        `apply_patch` whose payload is opaque text rather than JSON arguments.
      title: CustomToolCallItem
    CustomToolCallOutputItemOutputOneOf1Items:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_file
              description: 'Discriminator value: input_file'
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
          required:
            - type
          description: File input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_image
              description: 'Discriminator value: input_image'
            detail:
              $ref: >-
                #/components/schemas/OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputImageDetail
            image_url:
              type:
                - string
                - 'null'
          required:
            - type
            - detail
          description: Image input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_text
              description: 'Discriminator value: input_text'
            text:
              type: string
          required:
            - type
            - text
          description: Text input content item
      discriminator:
        propertyName: type
      title: CustomToolCallOutputItemOutputOneOf1Items
    CustomToolCallOutputItemOutput1:
      type: array
      items:
        $ref: '#/components/schemas/CustomToolCallOutputItemOutputOneOf1Items'
      title: CustomToolCallOutputItemOutput1
    CustomToolCallOutputItemOutput:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/CustomToolCallOutputItemOutput1'
      title: CustomToolCallOutputItemOutput
    CustomToolCallOutputItemType:
      type: string
      enum:
        - custom_tool_call_output
      title: CustomToolCallOutputItemType
    CustomToolCallOutputItem:
      type: object
      properties:
        call_id:
          type: string
        id:
          type: string
        output:
          $ref: '#/components/schemas/CustomToolCallOutputItemOutput'
        type:
          $ref: '#/components/schemas/CustomToolCallOutputItemType'
      required:
        - call_id
        - output
        - type
      description: >-
        The output from a custom (freeform-grammar) tool call execution. Mirrors
        `function_call_output` but is matched to a `custom_tool_call` rather
        than a `function_call`.
      title: CustomToolCallOutputItem
    CompactionItemType:
      type: string
      enum:
        - compaction
      title: CompactionItemType
    CompactionItem:
      type: object
      properties:
        encrypted_content:
          type: string
        id:
          type:
            - string
            - 'null'
        type:
          $ref: '#/components/schemas/CompactionItemType'
      required:
        - encrypted_content
        - type
      description: A context compaction marker with encrypted summary
      title: CompactionItem
    ItemReferenceItemType:
      type: string
      enum:
        - item_reference
      title: ItemReferenceItemType
    ItemReferenceItem:
      type: object
      properties:
        id:
          type: string
        type:
          $ref: '#/components/schemas/ItemReferenceItemType'
      required:
        - id
        - type
      description: A reference to a previous response item by ID
      title: ItemReferenceItem
    InputsOneOf1Items:
      oneOf:
        - $ref: '#/components/schemas/ReasoningItem'
        - $ref: '#/components/schemas/EasyInputMessage'
        - $ref: '#/components/schemas/InputMessageItem'
        - $ref: '#/components/schemas/FunctionCallItem'
        - $ref: '#/components/schemas/FunctionCallOutputItem'
        - $ref: '#/components/schemas/ApplyPatchCallItem'
        - $ref: '#/components/schemas/ApplyPatchCallOutputItem'
        - $ref: '#/components/schemas/InputsOneOf1Items7'
        - $ref: '#/components/schemas/InputsOneOf1Items8'
        - $ref: '#/components/schemas/OutputFunctionCallItem'
        - $ref: '#/components/schemas/OutputCustomToolCallItem'
        - $ref: '#/components/schemas/OutputWebSearchCallItem'
        - $ref: '#/components/schemas/OutputFileSearchCallItem'
        - $ref: '#/components/schemas/OutputImageGenerationCallItem'
        - $ref: '#/components/schemas/OutputCodeInterpreterCallItem'
        - $ref: '#/components/schemas/OutputComputerCallItem'
        - $ref: '#/components/schemas/OutputDatetimeItem'
        - $ref: '#/components/schemas/OutputWebSearchServerToolItem'
        - $ref: '#/components/schemas/OutputCodeInterpreterServerToolItem'
        - $ref: '#/components/schemas/OutputFileSearchServerToolItem'
        - $ref: '#/components/schemas/OutputImageGenerationServerToolItem'
        - $ref: '#/components/schemas/OutputBrowserUseServerToolItem'
        - $ref: '#/components/schemas/OutputBashServerToolItem'
        - $ref: '#/components/schemas/OutputTextEditorServerToolItem'
        - $ref: '#/components/schemas/OutputApplyPatchServerToolItem'
        - $ref: '#/components/schemas/OutputWebFetchServerToolItem'
        - $ref: '#/components/schemas/OutputToolSearchServerToolItem'
        - $ref: '#/components/schemas/OutputMemoryServerToolItem'
        - $ref: '#/components/schemas/OutputMcpServerToolItem'
        - $ref: '#/components/schemas/OutputSearchModelsServerToolItem'
        - $ref: '#/components/schemas/LocalShellCallItem'
        - $ref: '#/components/schemas/LocalShellCallOutputItem'
        - $ref: '#/components/schemas/ShellCallItem'
        - $ref: '#/components/schemas/ShellCallOutputItem'
        - $ref: '#/components/schemas/McpListToolsItem'
        - $ref: '#/components/schemas/McpApprovalRequestItem'
        - $ref: '#/components/schemas/McpApprovalResponseItem'
        - $ref: '#/components/schemas/McpCallItem'
        - $ref: '#/components/schemas/CustomToolCallItem'
        - $ref: '#/components/schemas/CustomToolCallOutputItem'
        - $ref: '#/components/schemas/CompactionItem'
        - $ref: '#/components/schemas/ItemReferenceItem'
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
    WebFetchPluginId:
      type: string
      enum:
        - web-fetch
      title: WebFetchPluginId
    ResponsesRequestPluginsItems:
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
            cost_quality_tradeoff:
              type: integer
              description: >-
                Controls cost vs. quality routing tradeoff (0–10). 0 = pure
                quality (best model regardless of cost), 10 = maximize for cost
                (cheapest model wins). Intermediate values blend quality and
                cost signals continuously. Defaults to 7.
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
                - fusion
              description: 'Discriminator value: fusion'
            analysis_models:
              type: array
              items:
                type: string
              description: >-
                Slugs of models to run in parallel as the "expert panel" the
                judge analyzes. Each model receives the same user prompt with
                web_search + web_fetch enabled. Capped at 8 models to bound cost
                amplification. When omitted, defaults to the Quality preset from
                the /labs/fusion UI (~anthropic/claude-opus-latest,
                ~openai/gpt-latest, ~google/gemini-pro-latest).
            enabled:
              type: boolean
              description: >-
                Set to false to disable the fusion plugin for this request.
                Defaults to true.
            max_tool_calls:
              type: integer
              description: >-
                Maximum number of tool-calling steps each panelist (analysis
                model) and the judge model may take during their agentic
                web-research loop. Models with web_search/web_fetch enabled
                iterate until they produce a text response or hit this ceiling.
                Defaults to 8. Capped at 16.
            model:
              type: string
              description: >-
                Slug of the model that performs both the judge step (with
                web_search + web_fetch) and the final synthesis. When omitted,
                defaults to the first model in the Quality preset.
          required:
            - id
          description: fusion variant
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
        - type: object
          properties:
            id:
              $ref: '#/components/schemas/WebFetchPluginId'
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
            max_content_tokens:
              type: integer
              description: >-
                Maximum content length in approximate tokens. Content exceeding
                this limit is truncated.
            max_uses:
              type: integer
              description: >-
                Maximum number of web fetches per request. Once exceeded, the
                tool returns an error.
          required:
            - id
          description: web-fetch variant
      discriminator:
        propertyName: id
      title: ResponsesRequestPluginsItems
    InputImage:
      type: object
      properties:
        detail:
          $ref: >-
            #/components/schemas/OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputImageDetail
        image_url:
          type:
            - string
            - 'null'
      required:
        - detail
      description: Image input content item
      title: InputImage
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
        - Crucible
        - Crusoe
        - Darkbloom
        - DeepInfra
        - DeepSeek
        - DekaLLM
        - DigitalOcean
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
        - Perceptron
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
          type:
            - integer
            - 'null'
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
    StopServerToolsWhenFinishReasonIsType:
      type: string
      enum:
        - finish_reason_is
      title: StopServerToolsWhenFinishReasonIsType
    StopServerToolsWhenHasToolCallType:
      type: string
      enum:
        - has_tool_call
      title: StopServerToolsWhenHasToolCallType
    StopServerToolsWhenMaxCostType:
      type: string
      enum:
        - max_cost
      title: StopServerToolsWhenMaxCostType
    StopServerToolsWhenMaxTokensUsedType:
      type: string
      enum:
        - max_tokens_used
      title: StopServerToolsWhenMaxTokensUsedType
    StopServerToolsWhenStepCountIsType:
      type: string
      enum:
        - step_count_is
      title: StopServerToolsWhenStepCountIsType
    StopServerToolsWhenCondition:
      oneOf:
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/StopServerToolsWhenFinishReasonIsType'
            reason:
              type: string
          required:
            - type
            - reason
          description: >-
            Stop when the upstream model emits this finish reason (e.g.
            `length`).
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/StopServerToolsWhenHasToolCallType'
            tool_name:
              type: string
          required:
            - type
            - tool_name
          description: Stop after a tool with this name has been called.
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/StopServerToolsWhenMaxCostType'
            max_cost_in_dollars:
              type: number
              format: double
          required:
            - type
            - max_cost_in_dollars
          description: >-
            Stop once cumulative cost across the loop exceeds this dollar
            threshold.
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/StopServerToolsWhenMaxTokensUsedType'
            max_tokens:
              type: integer
          required:
            - type
            - max_tokens
          description: >-
            Stop once cumulative token usage across the loop exceeds this
            threshold.
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/StopServerToolsWhenStepCountIsType'
            step_count:
              type: integer
          required:
            - type
            - step_count
          description: Stop after the agent loop has executed this many steps.
      discriminator:
        propertyName: type
      description: A single condition that, when met, halts the server-tool agent loop.
      title: StopServerToolsWhenCondition
    StopServerToolsWhen:
      type: array
      items:
        $ref: '#/components/schemas/StopServerToolsWhenCondition'
      description: >-
        Stop conditions for the server-tool agent loop. Any condition firing
        halts the loop (OR logic). When set, this overrides `max_tool_calls`.
      title: StopServerToolsWhen
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
    TextExtendedConfigVerbosity:
      type: string
      enum:
        - low
        - medium
        - high
        - xhigh
        - max
      title: TextExtendedConfigVerbosity
    TextExtendedConfig:
      type: object
      properties:
        format:
          $ref: '#/components/schemas/Formats'
        verbosity:
          oneOf:
            - $ref: '#/components/schemas/TextExtendedConfigVerbosity'
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
    OpenAiResponsesToolChoiceOneOf6Type:
      type: string
      enum:
        - apply_patch
      title: OpenAiResponsesToolChoiceOneOf6Type
    OpenAiResponsesToolChoice6:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OpenAiResponsesToolChoiceOneOf6Type'
      required:
        - type
      title: OpenAiResponsesToolChoice6
    OpenAiResponsesToolChoiceOneOf7Type:
      type: string
      enum:
        - shell
      title: OpenAiResponsesToolChoiceOneOf7Type
    OpenAiResponsesToolChoice7:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/OpenAiResponsesToolChoiceOneOf7Type'
      required:
        - type
      title: OpenAiResponsesToolChoice7
    OpenAIResponsesToolChoice:
      oneOf:
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice0'
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice1'
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice2'
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice3'
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice4'
        - $ref: '#/components/schemas/ToolChoiceAllowed'
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice6'
        - $ref: '#/components/schemas/OpenAiResponsesToolChoice7'
      title: OpenAIResponsesToolChoice
    ResponsesRequestToolsItemsOneOf0Type:
      type: string
      enum:
        - function
      title: ResponsesRequestToolsItemsOneOf0Type
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
          $ref: '#/components/schemas/ResponsesRequestToolsItemsOneOf0Type'
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
        - parallel
        - firecrawl
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
    FusionServerToolConfigReasoningEffort:
      type: string
      enum:
        - xhigh
        - high
        - medium
        - low
        - minimal
        - none
      description: Reasoning effort level for panelist and judge inner calls.
      title: FusionServerToolConfigReasoningEffort
    FusionServerToolConfigReasoning:
      type: object
      properties:
        effort:
          $ref: '#/components/schemas/FusionServerToolConfigReasoningEffort'
          description: Reasoning effort level for panelist and judge inner calls.
        max_tokens:
          type: integer
          description: >-
            Maximum number of reasoning tokens each panelist and judge model may
            use. Helps bound cost when models allocate too much budget to
            chain-of-thought.
      description: >-
        Reasoning configuration forwarded to panelist and judge inner calls. Use
        this to control reasoning effort and token budget for models that
        support extended thinking.
      title: FusionServerToolConfigReasoning
    FusionServerToolConfig:
      type: object
      properties:
        analysis_models:
          type: array
          items:
            type: string
          description: >-
            Slugs of models to run in parallel as the analysis panel. Each model
            receives the user prompt with openrouter:web_search and
            openrouter:web_fetch enabled, then a judge model summarizes the
            collective output into structured analysis JSON. Capped at 8 models
            to bound cost amplification. Defaults to the Quality preset from
            /labs/fusion.
        max_completion_tokens:
          type: integer
          description: >-
            Maximum number of output tokens (including reasoning tokens) each
            panelist and the judge model may produce per inner call. Controls
            the total output budget so reasoning-heavy models like GPT-5.5 do
            not exhaust their token allowance before producing visible text.
            When omitted, the provider's default applies.
        max_tool_calls:
          type: integer
          description: >-
            Maximum number of tool-calling steps each panelist (analysis model)
            and the judge model may take during their agentic web-research loop.
            Models with web_search/web_fetch enabled iterate until they produce
            a text response or hit this ceiling. Defaults to 8. Capped at 16.
        model:
          type: string
          description: >-
            Slug of the judge model that produces the structured analysis JSON.
            Defaults to the model used in the outer API request.
        reasoning:
          $ref: '#/components/schemas/FusionServerToolConfigReasoning'
          description: >-
            Reasoning configuration forwarded to panelist and judge inner calls.
            Use this to control reasoning effort and token budget for models
            that support extended thinking.
        temperature:
          type: number
          format: double
          description: >-
            Sampling temperature forwarded to panelist and judge inner calls.
            When omitted, the provider's default applies.
      description: Configuration for the openrouter:fusion server tool.
      title: FusionServerToolConfig
    FusionServerToolOpenRouterType:
      type: string
      enum:
        - openrouter:fusion
      title: FusionServerToolOpenRouterType
    FusionServerTool_OpenRouter:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/FusionServerToolConfig'
        type:
          $ref: '#/components/schemas/FusionServerToolOpenRouterType'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: fans out the user prompt to a panel of
        analysis models, then asks a judge model to summarize their collective
        output as structured JSON the outer model can synthesize from.
      title: FusionServerTool_OpenRouter
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
        - exa
        - parallel
        - firecrawl
      description: >-
        Which fetch engine to use. "auto" (default) uses native if the provider
        supports it, otherwise Exa. "native" forces the provider's built-in
        fetch. "exa" uses Exa Contents API. "openrouter" uses direct HTTP fetch.
        "firecrawl" uses Firecrawl scrape (requires BYOK). "parallel" uses the
        Parallel extract API.
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
    SearchQualityLevel:
      type: string
      enum:
        - low
        - medium
        - high
      description: >-
        How much context to retrieve per result. Applies to Exa and Parallel
        engines; ignored with native provider search and Firecrawl. For Exa,
        pins a fixed per-result character cap (low=5,000, medium=15,000,
        high=30,000); when omitted, Exa picks an adaptive size per query and
        document (typically ~2,000–4,000 characters per result). For Parallel,
        controls the total characters across all results; when omitted, Parallel
        uses its own default size.
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
    WebSearchServerToolConfig:
      type: object
      properties:
        allowed_domains:
          type: array
          items:
            type: string
          description: >-
            Limit search results to these domains. Supported by Exa, Firecrawl,
            Parallel, and most native providers (Anthropic, OpenAI, xAI). Not
            supported with Perplexity. Cannot be used with excluded_domains.
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        excluded_domains:
          type: array
          items:
            type: string
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Firecrawl, Parallel, Anthropic, and xAI. Not supported with OpenAI
            (silently ignored) or Perplexity. Cannot be used with
            allowed_domains.
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
            in agentic loops. Defaults to 50 when not specified.
        search_context_size:
          $ref: '#/components/schemas/SearchQualityLevel'
        user_location:
          $ref: '#/components/schemas/WebSearchUserLocationServerTool'
      description: Configuration for the openrouter:web_search server tool
      title: WebSearchServerToolConfig
    WebSearchServerToolOpenRouterType:
      type: string
      enum:
        - openrouter:web_search
      title: WebSearchServerToolOpenRouterType
    WebSearchServerTool_OpenRouter:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/WebSearchServerToolConfig'
        type:
          $ref: '#/components/schemas/WebSearchServerToolOpenRouterType'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: searches the web for current
        information
      title: WebSearchServerTool_OpenRouter
    ApplyPatchEngineEnum:
      type: string
      enum:
        - auto
        - native
        - openrouter
      description: >-
        Which apply_patch engine to use. "auto" (default) uses native
        passthrough when the endpoint advertises native apply_patch support,
        otherwise falls back to OpenRouter's HITL validator. "native" forces
        native passthrough — when the endpoint does not support native, the
        request falls back to HITL. "openrouter" always runs the HITL validator.
        Native passthrough streams the diff incrementally via
        `apply_patch_call_operation_diff.delta` events; HITL buffers the diff
        for atomic delivery as a single delta.
      title: ApplyPatchEngineEnum
    ApplyPatchServerToolConfig:
      type: object
      properties:
        engine:
          $ref: '#/components/schemas/ApplyPatchEngineEnum'
      description: Configuration for the openrouter:apply_patch server tool
      title: ApplyPatchServerToolConfig
    ApplyPatchServerToolOpenRouterType:
      type: string
      enum:
        - openrouter:apply_patch
      title: ApplyPatchServerToolOpenRouterType
    ApplyPatchServerTool_OpenRouter:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/ApplyPatchServerToolConfig'
        type:
          $ref: '#/components/schemas/ApplyPatchServerToolOpenRouterType'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: validates V4A diff patches for file
        operations (create, update, delete). Restricted to the Responses API.
      title: ApplyPatchServerTool_OpenRouter
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
        - $ref: '#/components/schemas/FusionServerTool_OpenRouter'
        - $ref: '#/components/schemas/ImageGenerationServerTool_OpenRouter'
        - $ref: '#/components/schemas/ChatSearchModelsServerTool'
        - $ref: '#/components/schemas/WebFetchServerTool'
        - $ref: '#/components/schemas/WebSearchServerTool_OpenRouter'
        - $ref: '#/components/schemas/ApplyPatchServerTool_OpenRouter'
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
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        frequency_penalty:
          type:
            - number
            - 'null'
          format: double
        image_config:
          $ref: '#/components/schemas/ImageConfig'
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
          type:
            - integer
            - 'null'
        max_tool_calls:
          type:
            - integer
            - 'null'
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
          type:
            - number
            - 'null'
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
            conversation or agent workflow). When provided, OpenRouter uses it
            as the sticky routing key, routing all requests in the session to
            the same provider to maximize prompt cache hits. Also used for
            observability grouping. If provided in both the request body and the
            x-session-id header, the body value takes precedence. Maximum of 256
            characters.
        stop_server_tools_when:
          $ref: '#/components/schemas/StopServerToolsWhen'
        store:
          type: boolean
          enum:
            - false
        stream:
          type: boolean
          default: false
        temperature:
          type:
            - number
            - 'null'
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
          type:
            - integer
            - 'null'
        top_p:
          type:
            - number
            - 'null'
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
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_audio
              description: 'Discriminator value: input_audio'
            input_audio:
              $ref: >-
                #/components/schemas/OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputAudioInputAudio
          required:
            - type
            - input_audio
          description: Audio input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_file
              description: 'Discriminator value: input_file'
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
          required:
            - type
          description: File input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_image
              description: 'Discriminator value: input_image'
            detail:
              $ref: >-
                #/components/schemas/OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputImageDetail
            image_url:
              type:
                - string
                - 'null'
          required:
            - type
            - detail
          description: Image input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_text
              description: 'Discriminator value: input_text'
            text:
              type: string
          required:
            - type
            - text
          description: Text input content item
      discriminator:
        propertyName: type
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
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_audio
              description: 'Discriminator value: input_audio'
            input_audio:
              $ref: >-
                #/components/schemas/OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputAudioInputAudio
          required:
            - type
            - input_audio
          description: Audio input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_file
              description: 'Discriminator value: input_file'
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
          required:
            - type
          description: File input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_image
              description: 'Discriminator value: input_image'
            detail:
              $ref: >-
                #/components/schemas/OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputImageDetail
            image_url:
              type:
                - string
                - 'null'
          required:
            - type
            - detail
          description: Image input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_text
              description: 'Discriminator value: input_text'
            text:
              type: string
          required:
            - type
            - text
          description: Text input content item
      discriminator:
        propertyName: type
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
    OpenAiResponseFunctionToolCallOutputOutputOneOf1Items:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_file
              description: 'Discriminator value: input_file'
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
          required:
            - type
          description: File input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_image
              description: 'Discriminator value: input_image'
            detail:
              $ref: >-
                #/components/schemas/OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputImageDetail
            image_url:
              type:
                - string
                - 'null'
          required:
            - type
            - detail
          description: Image input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_text
              description: 'Discriminator value: input_text'
            text:
              type: string
          required:
            - type
            - text
          description: Text input content item
      discriminator:
        propertyName: type
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
    OpenAiResponseFunctionToolCallOutputType:
      type: string
      enum:
        - function_call_output
      title: OpenAiResponseFunctionToolCallOutputType
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
          $ref: '#/components/schemas/ToolCallStatus'
        type:
          $ref: '#/components/schemas/OpenAiResponseFunctionToolCallOutputType'
      required:
        - call_id
        - output
        - type
      title: OpenAIResponseFunctionToolCallOutput
    OpenAiResponseFunctionToolCallType:
      type: string
      enum:
        - function_call
      title: OpenAiResponseFunctionToolCallType
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
        namespace:
          type: string
          description: >-
            Namespace qualifier for tools registered as part of a namespace tool
            group (e.g. an MCP server)
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
    OutputItemImageGenerationCallType:
      type: string
      enum:
        - image_generation_call
      title: OutputItemImageGenerationCallType
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
    OpenAiResponseCustomToolCallType:
      type: string
      enum:
        - custom_tool_call
      title: OpenAiResponseCustomToolCallType
    OpenAIResponseCustomToolCall:
      type: object
      properties:
        call_id:
          type: string
        id:
          type: string
        input:
          type: string
        name:
          type: string
        namespace:
          type: string
          description: >-
            Namespace qualifier for tools registered as part of a namespace tool
            group (e.g. an MCP server)
        type:
          $ref: '#/components/schemas/OpenAiResponseCustomToolCallType'
      required:
        - call_id
        - input
        - name
        - type
      title: OpenAIResponseCustomToolCall
    OpenAiResponseCustomToolCallOutputOutputOneOf1Items:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_file
              description: 'Discriminator value: input_file'
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
          required:
            - type
          description: File input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_image
              description: 'Discriminator value: input_image'
            detail:
              $ref: >-
                #/components/schemas/OpenAiResponseInputMessageItemContentItemsDiscriminatorMappingInputImageDetail
            image_url:
              type:
                - string
                - 'null'
          required:
            - type
            - detail
          description: Image input content item
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_text
              description: 'Discriminator value: input_text'
            text:
              type: string
          required:
            - type
            - text
          description: Text input content item
      discriminator:
        propertyName: type
      title: OpenAiResponseCustomToolCallOutputOutputOneOf1Items
    OpenAiResponseCustomToolCallOutputOutput1:
      type: array
      items:
        $ref: >-
          #/components/schemas/OpenAiResponseCustomToolCallOutputOutputOneOf1Items
      title: OpenAiResponseCustomToolCallOutputOutput1
    OpenAiResponseCustomToolCallOutputOutput:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/OpenAiResponseCustomToolCallOutputOutput1'
      title: OpenAiResponseCustomToolCallOutputOutput
    OpenAiResponseCustomToolCallOutputType:
      type: string
      enum:
        - custom_tool_call_output
      title: OpenAiResponseCustomToolCallOutputType
    OpenAIResponseCustomToolCallOutput:
      type: object
      properties:
        call_id:
          type: string
        id:
          type: string
        output:
          $ref: '#/components/schemas/OpenAiResponseCustomToolCallOutputOutput'
        type:
          $ref: '#/components/schemas/OpenAiResponseCustomToolCallOutputType'
      required:
        - call_id
        - output
        - type
      title: OpenAIResponseCustomToolCallOutput
    BaseInputsOneOf1Items:
      oneOf:
        - $ref: '#/components/schemas/BaseInputsOneOf1Items0'
        - $ref: '#/components/schemas/OpenAIResponseInputMessageItem'
        - $ref: '#/components/schemas/OpenAIResponseFunctionToolCallOutput'
        - $ref: '#/components/schemas/OpenAIResponseFunctionToolCall'
        - $ref: '#/components/schemas/OutputItemImageGenerationCall'
        - $ref: '#/components/schemas/OutputMessage'
        - $ref: '#/components/schemas/OpenAIResponseCustomToolCall'
        - $ref: '#/components/schemas/OpenAIResponseCustomToolCallOutput'
        - $ref: '#/components/schemas/ApplyPatchCallItem'
        - $ref: '#/components/schemas/ApplyPatchCallOutputItem'
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
    OpenResponsesResultObject:
      type: string
      enum:
        - response
      title: OpenResponsesResultObject
    OutputMessageItemContentItems:
      oneOf:
        - $ref: '#/components/schemas/ResponseOutputText'
        - $ref: '#/components/schemas/OpenAIResponsesRefusalContent'
      title: OutputMessageItemContentItems
    OutputMessageItemPhase0:
      type: string
      enum:
        - commentary
      title: OutputMessageItemPhase0
    OutputMessageItemPhase1:
      type: string
      enum:
        - final_answer
      title: OutputMessageItemPhase1
    OutputMessageItemPhase:
      oneOf:
        - $ref: '#/components/schemas/OutputMessageItemPhase0'
        - $ref: '#/components/schemas/OutputMessageItemPhase1'
        - description: Any type
      description: >-
        The phase of an assistant message. Use `commentary` for an intermediate
        assistant message and `final_answer` for the final assistant message.
        For follow-up requests with models like `gpt-5.3-codex` and later,
        preserve and resend phase on all assistant messages. Omitting it can
        degrade performance. Not used for user messages.
      title: OutputMessageItemPhase
    OutputMessageItemRole:
      type: string
      enum:
        - assistant
      title: OutputMessageItemRole
    OutputMessageItemStatus0:
      type: string
      enum:
        - completed
      title: OutputMessageItemStatus0
    OutputMessageItemStatus1:
      type: string
      enum:
        - incomplete
      title: OutputMessageItemStatus1
    OutputMessageItemStatus2:
      type: string
      enum:
        - in_progress
      title: OutputMessageItemStatus2
    OutputMessageItemStatus:
      oneOf:
        - $ref: '#/components/schemas/OutputMessageItemStatus0'
        - $ref: '#/components/schemas/OutputMessageItemStatus1'
        - $ref: '#/components/schemas/OutputMessageItemStatus2'
      title: OutputMessageItemStatus
    OutputMessageItemType:
      type: string
      enum:
        - message
      title: OutputMessageItemType
    OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisContradictionsItemsStancesItems:
      type: object
      properties:
        model:
          type: string
        stance:
          type: string
      required:
        - model
        - stance
      title: >-
        OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisContradictionsItemsStancesItems
    OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisContradictionsItems:
      type: object
      properties:
        stances:
          type: array
          items:
            $ref: >-
              #/components/schemas/OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisContradictionsItemsStancesItems
        topic:
          type: string
      required:
        - stances
        - topic
      title: >-
        OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisContradictionsItems
    OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisPartialCoverageItems:
      type: object
      properties:
        models:
          type: array
          items:
            type: string
        point:
          type: string
      required:
        - models
        - point
      title: >-
        OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisPartialCoverageItems
    OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisUniqueInsightsItems:
      type: object
      properties:
        insight:
          type: string
        model:
          type: string
      required:
        - insight
        - model
      title: >-
        OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisUniqueInsightsItems
    OutputItemsDiscriminatorMappingOpenrouterFusionAnalysis:
      type: object
      properties:
        blind_spots:
          type: array
          items:
            type: string
        consensus:
          type: array
          items:
            type: string
        contradictions:
          type: array
          items:
            $ref: >-
              #/components/schemas/OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisContradictionsItems
        partial_coverage:
          type: array
          items:
            $ref: >-
              #/components/schemas/OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisPartialCoverageItems
        unique_insights:
          type: array
          items:
            $ref: >-
              #/components/schemas/OutputItemsDiscriminatorMappingOpenrouterFusionAnalysisUniqueInsightsItems
      required:
        - blind_spots
        - consensus
        - contradictions
        - partial_coverage
        - unique_insights
      description: Structured analysis produced by the fusion judge model.
      title: OutputItemsDiscriminatorMappingOpenrouterFusionAnalysis
    OutputItemsDiscriminatorMappingOpenrouterFusionFailedModelsItems:
      type: object
      properties:
        error:
          type: string
          description: Error message describing why the model failed.
        model:
          type: string
          description: Slug of the analysis model that failed.
        status_code:
          type: integer
          description: >-
            HTTP status code from the upstream response, when available (e.g.
            402, 429).
      required:
        - error
        - model
      title: OutputItemsDiscriminatorMappingOpenrouterFusionFailedModelsItems
    OutputItemsDiscriminatorMappingOpenrouterFusionResponsesItems:
      type: object
      properties:
        model:
          type: string
      required:
        - model
      title: OutputItemsDiscriminatorMappingOpenrouterFusionResponsesItems
    OutputReasoningItemStatus0:
      type: string
      enum:
        - completed
      title: OutputReasoningItemStatus0
    OutputReasoningItemStatus1:
      type: string
      enum:
        - incomplete
      title: OutputReasoningItemStatus1
    OutputReasoningItemStatus2:
      type: string
      enum:
        - in_progress
      title: OutputReasoningItemStatus2
    OutputReasoningItemStatus:
      oneOf:
        - $ref: '#/components/schemas/OutputReasoningItemStatus0'
        - $ref: '#/components/schemas/OutputReasoningItemStatus1'
        - $ref: '#/components/schemas/OutputReasoningItemStatus2'
      title: OutputReasoningItemStatus
    OutputReasoningItemType:
      type: string
      enum:
        - reasoning
      title: OutputReasoningItemType
    OutputItems:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - apply_patch_call
              description: 'Discriminator value: apply_patch_call'
            call_id:
              type: string
            id:
              type: string
            operation:
              $ref: '#/components/schemas/ApplyPatchCallOperation'
            status:
              $ref: '#/components/schemas/ApplyPatchCallStatus'
          required:
            - type
            - call_id
            - id
            - operation
            - status
          description: >-
            A native `apply_patch_call` output item matching OpenAI's Responses
            API shape. Emitted when the client requested the `apply_patch`
            shorthand.
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputCodeInterpreterCallItemType'
            code:
              type:
                - string
                - 'null'
            container_id:
              type: string
            id:
              type: string
            outputs:
              type:
                - array
                - 'null'
              items:
                $ref: '#/components/schemas/OutputCodeInterpreterCallItemOutputsItems'
            status:
              $ref: '#/components/schemas/ToolCallStatus'
          required:
            - type
            - code
            - container_id
            - id
            - outputs
            - status
          description: A code interpreter execution call with outputs
        - type: object
          properties:
            type:
              type: string
              enum:
                - computer_call
              description: 'Discriminator value: computer_call'
            action:
              oneOf:
                - description: Any type
                - type: 'null'
            call_id:
              type: string
            id:
              type: string
            pending_safety_checks:
              type: array
              items:
                $ref: >-
                  #/components/schemas/OutputItemsDiscriminatorMappingComputerCallPendingSafetyChecksItems
            status:
              $ref: >-
                #/components/schemas/OutputItemsDiscriminatorMappingComputerCallStatus
          required:
            - type
            - call_id
            - pending_safety_checks
            - status
          description: computer_call variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - custom_tool_call
              description: 'Discriminator value: custom_tool_call'
            call_id:
              type: string
            id:
              type: string
            input:
              type: string
            name:
              type: string
            namespace:
              type: string
              description: >-
                Namespace qualifier for tools registered as part of a namespace
                tool group (e.g. an MCP server)
          required:
            - type
            - call_id
            - input
            - name
          description: >-
            A call to a custom (freeform-grammar) tool created by the model —
            distinct from `function_call`. Used for tools like Codex CLI's
            `apply_patch` whose payload is opaque text rather than JSON
            arguments.
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputFileSearchCallItemType'
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
              $ref: '#/components/schemas/OutputFunctionCallItemType'
            arguments:
              type: string
            call_id:
              type: string
            id:
              type: string
            name:
              type: string
            namespace:
              type: string
              description: >-
                Namespace qualifier for tools registered as part of a namespace
                tool group (e.g. an MCP server)
            status:
              $ref: '#/components/schemas/OutputFunctionCallItemStatus'
          required:
            - type
            - arguments
            - call_id
            - name
          description: function_call variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputImageGenerationCallItemType'
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
              $ref: '#/components/schemas/OutputMessageItemType'
            content:
              type: array
              items:
                $ref: '#/components/schemas/OutputMessageItemContentItems'
            id:
              type: string
            phase:
              $ref: '#/components/schemas/OutputMessageItemPhase'
              description: >-
                The phase of an assistant message. Use `commentary` for an
                intermediate assistant message and `final_answer` for the final
                assistant message. For follow-up requests with models like
                `gpt-5.3-codex` and later, preserve and resend phase on all
                assistant messages. Omitting it can degrade performance. Not
                used for user messages.
            role:
              $ref: '#/components/schemas/OutputMessageItemRole'
            status:
              $ref: '#/components/schemas/OutputMessageItemStatus'
          required:
            - type
            - content
            - id
            - role
          description: An output message item
        - type: object
          properties:
            type:
              type: string
              enum:
                - openrouter:apply_patch
              description: 'Discriminator value: openrouter:apply_patch'
            call_id:
              type: string
            id:
              type: string
            operation:
              $ref: '#/components/schemas/ApplyPatchCallOperation'
            status:
              $ref: '#/components/schemas/ToolCallStatus'
          required:
            - type
            - status
          description: >-
            An openrouter:apply_patch server tool output item. The turn halts
            when validation succeeds so the client can apply the patch and echo
            an `apply_patch_call_output` on the next turn.
        - type: object
          properties:
            type:
              type: string
              enum:
                - openrouter:bash
              description: 'Discriminator value: openrouter:bash'
            command:
              type: string
            exitCode:
              type: integer
            id:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
            stderr:
              type: string
            stdout:
              type: string
          required:
            - type
            - status
          description: An openrouter:bash server tool output item
        - type: object
          properties:
            type:
              type: string
              enum:
                - openrouter:browser_use
              description: 'Discriminator value: openrouter:browser_use'
            action:
              type: string
            id:
              type: string
            screenshotB64:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
          required:
            - type
            - status
          description: An openrouter:browser_use server tool output item
        - type: object
          properties:
            type:
              type: string
              enum:
                - openrouter:code_interpreter
              description: 'Discriminator value: openrouter:code_interpreter'
            code:
              type: string
            exitCode:
              type: integer
            id:
              type: string
            language:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
            stderr:
              type: string
            stdout:
              type: string
          required:
            - type
            - status
          description: An openrouter:code_interpreter server tool output item
        - type: object
          properties:
            type:
              type: string
              enum:
                - openrouter:datetime
              description: 'Discriminator value: openrouter:datetime'
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
          description: An openrouter:datetime server tool output item
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputSearchModelsServerToolItemType'
            arguments:
              type: string
              description: >-
                The JSON arguments submitted to the search tool (e.g.
                {"query":"Claude"})
            id:
              type: string
            query:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
          required:
            - type
            - status
          description: An openrouter:experimental__search_models server tool output item
        - type: object
          properties:
            type:
              type: string
              enum:
                - openrouter:file_search
              description: 'Discriminator value: openrouter:file_search'
            id:
              type: string
            queries:
              type: array
              items:
                type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
          required:
            - type
            - status
          description: An openrouter:file_search server tool output item
        - type: object
          properties:
            type:
              type: string
              enum:
                - openrouter:fusion
              description: 'Discriminator value: openrouter:fusion'
            analysis:
              $ref: >-
                #/components/schemas/OutputItemsDiscriminatorMappingOpenrouterFusionAnalysis
              description: Structured analysis produced by the fusion judge model.
            error:
              type: string
              description: >-
                Error message when the fusion run did not produce an analysis
                result.
            failed_models:
              type: array
              items:
                $ref: >-
                  #/components/schemas/OutputItemsDiscriminatorMappingOpenrouterFusionFailedModelsItems
              description: >-
                Models that were requested as part of the analysis panel but did
                not produce a response. Present when at least one requested
                analysis model failed. The fusion result is still usable but was
                produced from a degraded panel.
            failure_reason:
              type: string
              description: >-
                Typed failure reason when the fusion run failed. Possible values
                include: all_panels_failed, insufficient_credits, rate_limited,
                judge_not_valid_json, judge_schema_mismatch,
                judge_upstream_error, judge_empty_completion.
            id:
              type: string
            responses:
              type: array
              items:
                $ref: >-
                  #/components/schemas/OutputItemsDiscriminatorMappingOpenrouterFusionResponsesItems
              description: >-
                Slugs of the analysis models that produced a response in this
                fusion run.
            status:
              $ref: '#/components/schemas/ToolCallStatus'
          required:
            - type
            - status
          description: An openrouter:fusion server tool output item
        - type: object
          properties:
            type:
              type: string
              enum:
                - openrouter:image_generation
              description: 'Discriminator value: openrouter:image_generation'
            id:
              type: string
            imageB64:
              type: string
            imageUrl:
              type: string
            result:
              type:
                - string
                - 'null'
              description: >-
                The generated image as a base64-encoded string or URL, matching
                OpenAI image_generation_call format
            revisedPrompt:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
          required:
            - type
            - status
          description: An openrouter:image_generation server tool output item
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputMcpServerToolItemType'
            id:
              type: string
            serverLabel:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
            toolName:
              type: string
          required:
            - type
            - status
          description: An openrouter:mcp server tool output item
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputMemoryServerToolItemType'
            action:
              $ref: '#/components/schemas/OutputMemoryServerToolItemAction'
            id:
              type: string
            key:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
            value:
              oneOf:
                - description: Any type
                - type: 'null'
          required:
            - type
            - status
          description: An openrouter:memory server tool output item
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputTextEditorServerToolItemType'
            command:
              $ref: '#/components/schemas/OutputTextEditorServerToolItemCommand'
            filePath:
              type: string
            id:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
          required:
            - type
            - status
          description: An openrouter:text_editor server tool output item
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputToolSearchServerToolItemType'
            id:
              type: string
            query:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
          required:
            - type
            - status
          description: An openrouter:tool_search server tool output item
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputWebFetchServerToolItemType'
            content:
              type: string
            error:
              type: string
              description: The error message if the fetch failed.
            httpStatus:
              type: integer
              description: The HTTP status code returned by the upstream URL fetch.
            id:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
            title:
              type: string
            url:
              type: string
          required:
            - type
            - status
          description: An openrouter:web_fetch server tool output item
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputWebSearchServerToolItemType'
            action:
              $ref: '#/components/schemas/OutputWebSearchServerToolItemAction'
              description: >-
                The search action performed, matching OpenAI
                web_search_call.action shape. Includes the query the model
                issued and optional source URLs returned by the search provider.
            id:
              type: string
            status:
              $ref: '#/components/schemas/ToolCallStatus'
          required:
            - type
            - status
          description: An openrouter:web_search server tool output item
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputReasoningItemType'
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
              $ref: '#/components/schemas/OutputReasoningItemStatus'
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
          description: An output item containing reasoning
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/OutputWebSearchCallItemType'
            action:
              $ref: '#/components/schemas/OutputWebSearchCallItemAction'
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
    OpenResponsesResultToolsItemsOneOf0Type:
      type: string
      enum:
        - function
      title: OpenResponsesResultToolsItemsOneOf0Type
    OpenResponsesResultToolsItems0:
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
          $ref: '#/components/schemas/OpenResponsesResultToolsItemsOneOf0Type'
      required:
        - name
        - parameters
        - type
      description: Function tool definition
      title: OpenResponsesResultToolsItems0
    OpenResponsesResultToolsItems:
      oneOf:
        - $ref: '#/components/schemas/OpenResponsesResultToolsItems0'
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
      title: OpenResponsesResultToolsItems
    Truncation:
      type: string
      enum:
        - auto
        - disabled
      title: Truncation
    UsageInputTokensDetails:
      type: object
      properties:
        cached_tokens:
          type: integer
      required:
        - cached_tokens
      title: UsageInputTokensDetails
    UsageOutputTokensDetails:
      type: object
      properties:
        reasoning_tokens:
          type: integer
      required:
        - reasoning_tokens
      title: UsageOutputTokensDetails
    UsageCostDetails:
      type: object
      properties:
        upstream_inference_cost:
          type:
            - number
            - 'null'
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
          $ref: '#/components/schemas/UsageInputTokensDetails'
        output_tokens:
          type: integer
        output_tokens_details:
          $ref: '#/components/schemas/UsageOutputTokensDetails'
        total_tokens:
          type: integer
        cost:
          type:
            - number
            - 'null'
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
    RouterAttempt:
      type: object
      properties:
        model:
          type: string
        provider:
          type: string
        status:
          type: integer
      required:
        - model
        - provider
        - status
      title: RouterAttempt
    EndpointInfo:
      type: object
      properties:
        model:
          type: string
        provider:
          type: string
        selected:
          type: boolean
      required:
        - model
        - provider
        - selected
      title: EndpointInfo
    EndpointsMetadata:
      type: object
      properties:
        available:
          type: array
          items:
            $ref: '#/components/schemas/EndpointInfo'
        total:
          type: integer
      required:
        - available
        - total
      title: EndpointsMetadata
    RouterParams:
      type: object
      properties:
        quality_floor:
          type: number
          format: double
        throughput_floor:
          type: number
          format: double
        version_group:
          type: string
      title: RouterParams
    PipelineStageType:
      type: string
      enum:
        - guardrail
        - plugin
        - server_tools
        - response_healing
        - context_compression
      description: >-
        Categorical kind of a pipeline stage. Multiple plugins can share a type
        (e.g. all guardrail-level plugins emit `guardrail`); the `name` field
        disambiguates which plugin emitted it.
      title: PipelineStageType
    PipelineStage:
      type: object
      properties:
        cost_usd:
          type:
            - number
            - 'null'
          format: double
        data:
          type: object
          additionalProperties:
            description: Any type
        guardrail_id:
          type: string
        guardrail_scope:
          type: string
        name:
          type: string
        summary:
          type: string
        type:
          $ref: '#/components/schemas/PipelineStageType'
      required:
        - name
        - type
      title: PipelineStage
    RoutingStrategy:
      type: string
      enum:
        - direct
        - auto
        - free
        - latest
        - alias
        - fallback
        - pareto
        - bodybuilder
        - fusion
      title: RoutingStrategy
    OpenRouterMetadata:
      type: object
      properties:
        attempt:
          type: integer
        attempts:
          type: array
          items:
            $ref: '#/components/schemas/RouterAttempt'
        endpoints:
          $ref: '#/components/schemas/EndpointsMetadata'
        is_byok:
          type: boolean
        params:
          $ref: '#/components/schemas/RouterParams'
        pipeline:
          type: array
          items:
            $ref: '#/components/schemas/PipelineStage'
        region:
          type:
            - string
            - 'null'
        requested:
          type: string
        strategy:
          $ref: '#/components/schemas/RoutingStrategy'
        summary:
          type: string
      required:
        - attempt
        - endpoints
        - is_byok
        - region
        - requested
        - strategy
        - summary
      title: OpenRouterMetadata
    OpenResponsesResult:
      type: object
      properties:
        background:
          type:
            - boolean
            - 'null'
        completed_at:
          type:
            - integer
            - 'null'
        created_at:
          type: integer
        error:
          $ref: '#/components/schemas/ResponsesErrorField'
        frequency_penalty:
          type:
            - number
            - 'null'
          format: double
        id:
          type: string
        incomplete_details:
          $ref: '#/components/schemas/IncompleteDetails'
        instructions:
          $ref: '#/components/schemas/BaseInputs'
        max_output_tokens:
          type:
            - integer
            - 'null'
        max_tool_calls:
          type:
            - integer
            - 'null'
        metadata:
          $ref: '#/components/schemas/RequestMetadata'
        model:
          type: string
        object:
          $ref: '#/components/schemas/OpenResponsesResultObject'
        output:
          type: array
          items:
            $ref: '#/components/schemas/OutputItems'
        output_text:
          type: string
        parallel_tool_calls:
          type: boolean
        presence_penalty:
          type:
            - number
            - 'null'
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
          oneOf:
            - $ref: '#/components/schemas/ServiceTier'
            - type: 'null'
        status:
          $ref: '#/components/schemas/OpenAIResponsesResponseStatus'
        store:
          type: boolean
        temperature:
          type:
            - number
            - 'null'
          format: double
        text:
          $ref: '#/components/schemas/TextExtendedConfig'
        tool_choice:
          $ref: '#/components/schemas/OpenAIResponsesToolChoice'
        tools:
          type: array
          items:
            $ref: '#/components/schemas/OpenResponsesResultToolsItems'
        top_logprobs:
          type: integer
        top_p:
          type:
            - number
            - 'null'
          format: double
        truncation:
          $ref: '#/components/schemas/Truncation'
        usage:
          $ref: '#/components/schemas/Usage'
        user:
          type:
            - string
            - 'null'
        openrouter_metadata:
          $ref: '#/components/schemas/OpenRouterMetadata'
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Payment Required - Insufficient credits or quota to complete request
      title: PaymentRequiredResponse
    ForbiddenResponseErrorData:
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
      description: Error data for ForbiddenResponse
      title: ForbiddenResponseErrorData
    ForbiddenResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/ForbiddenResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Forbidden - Authentication successful but insufficient permissions
      title: ForbiddenResponse
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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

```python beta.responses_createResponses_example
import requests

url = "https://openrouter.ai/api/v1/responses"

payload = {
    "input": "Tell me a joke",
    "model": "openai/gpt-4o"
}
headers = {
    "X-OpenRouter-Experimental-Metadata": "enabled",
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript beta.responses_createResponses_example
const url = 'https://openrouter.ai/api/v1/responses';
const options = {
  method: 'POST',
  headers: {
    'X-OpenRouter-Experimental-Metadata': 'enabled',
    Authorization: 'Bearer <token>',
    'Content-Type': 'application/json'
  },
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

```go beta.responses_createResponses_example
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

	req.Header.Add("X-OpenRouter-Experimental-Metadata", "enabled")
	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby beta.responses_createResponses_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/responses")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["X-OpenRouter-Experimental-Metadata"] = 'enabled'
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"input\": \"Tell me a joke\",\n  \"model\": \"openai/gpt-4o\"\n}"

response = http.request(request)
puts response.read_body
```

```java beta.responses_createResponses_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/responses")
  .header("X-OpenRouter-Experimental-Metadata", "enabled")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"input\": \"Tell me a joke\",\n  \"model\": \"openai/gpt-4o\"\n}")
  .asString();
```

```php beta.responses_createResponses_example
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
    'X-OpenRouter-Experimental-Metadata' => 'enabled',
  ],
]);

echo $response->getBody();
```

```csharp beta.responses_createResponses_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/responses");
var request = new RestRequest(Method.POST);
request.AddHeader("X-OpenRouter-Experimental-Metadata", "enabled");
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"input\": \"Tell me a joke\",\n  \"model\": \"openai/gpt-4o\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift beta.responses_createResponses_example
import Foundation

let headers = [
  "X-OpenRouter-Experimental-Metadata": "enabled",
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