> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Stream a chat completion with an intern

> Sends a prompt to one of your interns and streams the reply as OpenAI-compatible server-sent events ending with `[DONE]`. The run executes on the intern, which may pause to ask you something. It then streams one `openrouter.provide_input` tool call and finishes with `finish_reason: "tool_calls"`, and the run stays open on the intern.

Every response, whether it ends with `stop`, `tool_calls` or `error`, is followed by a final chunk with empty `choices` that carries `session_id`, then `data: [DONE]`. That chunk carries the `usage` the intern reported for the run, after `stop` or `error`, and `null` when the intern reported none. After `tool_calls` its `usage` is `null` because the turn is not over. Read through `[DONE]`: the `session_id` you need to reply arrives after the `tool_calls` finish chunk.

To answer, send a second request with the same `session_id`, the assistant message echoing that tool call, and a `tool` message whose `tool_call_id` is the tool call id and whose `content` is the answer. The answer is delivered to the run that asked and the stream continues from where it paused. A question stays open for its interaction deadline (5 minutes by default) and the run is cancelled when that passes. Rejected replies do not extend the deadline.

Closing the connection after the `[DONE]` that follows `finish_reason: "tool_calls"` keeps the run alive. Disconnecting while a response is still streaming cancels the run. The stream writes a `: keepalive` comment whenever nothing else has been written for 30 seconds, so a disconnect is noticed within that interval even while the intern is silent.

A run the intern ends while you are still connected, by cancellation or by a deadline, ends the stream with a `finish_reason: "error"` chunk carrying `410` and reason `run_ended`, then the final empty-`choices` chunk and `[DONE]`. That error reports only an ending the intern confirmed. A connection that breaks without that confirmation ends with reason `stream_severed`, and a client that has already disconnected is promised no final event.

Set `approval_mode` to `manual` to have the intern ask before approval-bearing tools such as the shell. Omitted, the run self-drives and consents on your behalf. The mode belongs to the run started by that prompt and must be repeated on later prompts.

Available to interns programme members. Callers outside the programme receive `404` for every path under `/api/v1/interns`.



## OpenAPI

````yaml /openapi/openapi.yaml post /interns/{internId}/chat/completions
openapi: 3.1.0
info:
  contact:
    email: support@openrouter.ai
    name: OpenRouter Support
    url: https://openrouter.ai/docs
  description: OpenAI-compatible API with additional OpenRouter features
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
  title: OpenRouter API
  version: 1.0.0
servers:
  - description: Production server
    url: https://openrouter.ai/api/v1
    x-speakeasy-server-id: production
security:
  - apiKey: []
tags:
  - description: API key management endpoints
    name: API Keys
  - description: Analytics and usage endpoints
    name: Analytics
  - description: Anthropic Messages endpoints
    name: Anthropic Messages
  - description: BYOK endpoints
    name: BYOK
  - description: Benchmarks endpoints
    name: Benchmarks
  - description: Chat completion endpoints
    name: Chat
  - description: Task classification market-share endpoints
    name: Classifications
  - description: Containers endpoints
    name: Containers
  - description: Credit management endpoints
    name: Credits
  - description: >-
      Public OpenRouter usage datasets. Data returned by these endpoints is
      licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/):
      reuse and republish it, including commercially, with attribution to
      OpenRouter.
    name: Datasets
  - description: Text embedding endpoints
    name: Embeddings
  - description: Endpoint information
    name: Endpoints
  - description: Files endpoints
    name: Files
  - description: Generation history endpoints
    name: Generations
  - description: Guardrails endpoints
    name: Guardrails
  - description: Images endpoints
    name: Images
  - description: >-
      Create, inspect, update, provision, suspend and delete OpenRouter interns
      through an API key, and talk to them: the chat route streams
      OpenAI-compatible completions from one intern, pausing as an
      `openrouter.provide_input` tool call when the intern needs your permission
      or an answer. Available to interns programme members; other callers
      receive 404. See https://openrouter.ai/docs/guides/ori/intern-chat.
    name: Interns
  - description: Model information endpoints
    name: Models
  - description: OAuth authentication endpoints
    name: OAuth
  - description: Observability endpoints
    name: Observability
  - description: Organization endpoints
    name: Organization
  - description: Presets endpoints
    name: Presets
  - description: Provider information endpoints
    name: Providers
  - description: Rerank endpoints
    name: Rerank
  - description: OpenAI-compatible Responses API endpoints
    name: Responses
  - description: >-
      Management endpoints for SCIM group-to-workspace mappings, authenticated
      with a management key. These are not the SCIM 2.0 connector endpoints for
      your identity provider. In your identity provider, enter the SCIM endpoint
      URL shown when you enable provisioning under Settings > Members > SCIM
      Mappings. See
      https://openrouter.ai/docs/guides/features/scim-mappings#set-up-provisioning.
    name: SCIM
  - description: Speech-to-text endpoints
    name: STT
    x-displayName: Transcriptions
  - description: >-
      System One endpoints for models such as Jev, compatible with the TypeSafe
      SDKs. See https://openrouter.ai/docs/guides/community/typesafe-sdk.
    name: SystemOne
    x-displayName: System One
  - description: Text-to-speech endpoints
    name: TTS
    x-displayName: Speech
  - description: >-
      Store host-bound secrets for a workspace or for one intern. Scope is
      selected by the API key. Responses return metadata only, never secret
      values. See https://openrouter.ai/docs/guides/ori/vault.
    name: Vault
  - description: Video Generation endpoints
    name: Video Generation
  - description: Workspaces endpoints
    name: Workspaces
  - description: Alpha feature endpoints for Decisions requests
    name: alpha.decisions
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /interns/{internId}/chat/completions:
    post:
      tags:
        - Interns
      summary: Stream a chat completion with an intern
      description: >-
        Sends a prompt to one of your interns and streams the reply as
        OpenAI-compatible server-sent events ending with `[DONE]`. The run
        executes on the intern, which may pause to ask you something. It then
        streams one `openrouter.provide_input` tool call and finishes with
        `finish_reason: "tool_calls"`, and the run stays open on the intern.


        Every response, whether it ends with `stop`, `tool_calls` or `error`, is
        followed by a final chunk with empty `choices` that carries
        `session_id`, then `data: [DONE]`. That chunk carries the `usage` the
        intern reported for the run, after `stop` or `error`, and `null` when
        the intern reported none. After `tool_calls` its `usage` is `null`
        because the turn is not over. Read through `[DONE]`: the `session_id`
        you need to reply arrives after the `tool_calls` finish chunk.


        To answer, send a second request with the same `session_id`, the
        assistant message echoing that tool call, and a `tool` message whose
        `tool_call_id` is the tool call id and whose `content` is the answer.
        The answer is delivered to the run that asked and the stream continues
        from where it paused. A question stays open for its interaction deadline
        (5 minutes by default) and the run is cancelled when that passes.
        Rejected replies do not extend the deadline.


        Closing the connection after the `[DONE]` that follows `finish_reason:
        "tool_calls"` keeps the run alive. Disconnecting while a response is
        still streaming cancels the run. The stream writes a `: keepalive`
        comment whenever nothing else has been written for 30 seconds, so a
        disconnect is noticed within that interval even while the intern is
        silent.


        A run the intern ends while you are still connected, by cancellation or
        by a deadline, ends the stream with a `finish_reason: "error"` chunk
        carrying `410` and reason `run_ended`, then the final empty-`choices`
        chunk and `[DONE]`. That error reports only an ending the intern
        confirmed. A connection that breaks without that confirmation ends with
        reason `stream_severed`, and a client that has already disconnected is
        promised no final event.


        Set `approval_mode` to `manual` to have the intern ask before
        approval-bearing tools such as the shell. Omitted, the run self-drives
        and consents on your behalf. The mode belongs to the run started by that
        prompt and must be repeated on later prompts.


        Available to interns programme members. Callers outside the programme
        receive `404` for every path under `/api/v1/interns`.
      operationId: createInternChatCompletion
      parameters:
        - description: The intern to talk to.
          in: path
          name: internId
          required: true
          schema:
            description: The intern to talk to.
            example: a11e0000-0000-4000-8000-000000000005
            type: string
      requestBody:
        content:
          application/json:
            example:
              approval_mode: manual
              messages:
                - content: Summarize the open pull requests.
                  role: user
              stream: true
            schema:
              $ref: '#/components/schemas/InternChatCompletionRequest'
        required: true
      responses:
        '200':
          content:
            text/event-stream:
              example:
                data:
                  choices:
                    - delta:
                        tool_calls:
                          - function:
                              arguments: >-
                                {"kind":"permission","operation":"shell","options":["allow_once","allow_always","reject_once","reject_always"]}
                              name: openrouter.provide_input
                            id: 15e90ad6-5320-4a59-af4f-b371428154fa
                            index: 0
                            type: function
                      finish_reason: null
                      index: 0
                  created: 1789537541
                  id: chatcmpl-f727571a-3bad-4e0d-8a9e-f18f8cda9750
                  model: openrouter/intern
                  object: chat.completion.chunk
              schema:
                $ref: '#/components/schemas/InternChatStreamingResponse'
              x-speakeasy-sse-sentinel: '[DONE]'
          description: >-
            The streamed completion. Chunks carry text, then a finish chunk:
            `finish_reason: "stop"` when the turn is complete, `finish_reason:
            "tool_calls"` when the intern is waiting for an answer, or
            `finish_reason: "error"` for a failure after this status. A final
            chunk with empty `choices` follows in every case, carrying
            `session_id` and `usage` (`null` unless the intern reported usage,
            and always `null` after `tool_calls`), and the stream ends with
            `data: [DONE]`.
        '202':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternChatSteeredResponse'
          description: >-
            A turn is already running on this intern for the same `session_id`,
            and the message was delivered into it instead of starting a new
            turn. Nothing streams here: the intern takes the message up on the
            running turn, whose stream continues on the request that started it.
            Sent only for a `user` message with a `session_id`; a `tool` reply,
            a request without a `session_id`, or one for another session gets
            `409 busy`, as does a message the intern could not take.
        '400':
          content:
            application/json:
              example:
                error:
                  code: 400
                  message: The intern did not accept that answer for this tool_call_id.
                  metadata:
                    reason: bad_request
                    retryable: false
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: >-
            The body is not a valid request (`bad_request`), or the intern did
            not accept the answer for the pending question, such as a permission
            option it did not offer.
        '401':
          content:
            application/json:
              example:
                error:
                  code: 401
                  message: Invalid or missing API key
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: No valid API key.
        '403':
          content:
            application/json:
              example:
                error:
                  code: 403
                  message: >-
                    This API key's creator is no longer a member of the
                    organization. Ask an organization admin to reassign the key
                    to an active member.
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: >-
            The key belongs to a member who has left the organization and holds
            no grant.
        '404':
          content:
            application/json:
              example:
                error:
                  code: 404
                  message: No pending question has this tool_call_id.
                  metadata:
                    reason: interaction_unknown
                    retryable: false
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: >-
            The caller is outside the interns programme, the intern does not
            exist for this key (`not_found`), or no pending question has this
            `tool_call_id` in this session (`interaction_unknown`).
        '408':
          content:
            application/json:
              example:
                error:
                  code: 408
                  message: Operation timed out after 300s. Please try again later.
                  metadata:
                    reason: timeout
                    retryable: true
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: >-
            The request exceeded the route's own deadline before the handler
            answered (`timeout`). Distinct from the 504, which is the intern
            failing to answer within the turn budget.
        '409':
          content:
            application/json:
              example:
                error:
                  code: 409
                  message: The run that asked this question has already ended.
                  metadata:
                    reason: interaction_not_pending
                    retryable: false
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: >-
            The intern is not running (`intern_not_ready`), another turn is
            already running on this intern for a different session, for no
            session, or for a `tool` reply (`busy`), the question is no longer
            waiting (`interaction_not_pending`), or another request is already
            attached to the run (`attachment_failed`). The turn lock is per
            intern, not per session. `intern_not_ready` and `busy` report
            `retryable: true`, and a `busy` refusal carries `Retry-After`.
          headers:
            Retry-After:
              description: >-
                Seconds to wait before retrying this request. Present only on a
                `busy` refusal.
              required: false
              schema:
                description: >-
                  Seconds to wait before retrying this request. Present only on
                  a `busy` refusal.
                example: '5'
                type: string
        '410':
          content:
            application/json:
              example:
                error:
                  code: 410
                  message: >-
                    The run produced more output than the intern retains for
                    replay.
                  metadata:
                    reason: attachment_failed
                    retryable: false
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: >-
            The run produced more output than the intern retains, so the paused
            stream cannot be resumed (`attachment_failed`).
        '413':
          content:
            application/json:
              example:
                error:
                  code: 413
                  message: Request body exceeds 1048576 bytes
                  metadata:
                    reason: payload_too_large
                    retryable: false
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: The body exceeds 1 MiB (`payload_too_large`).
        '429':
          content:
            application/json:
              example:
                error:
                  code: 429
                  message: Too many intern turns. Please wait a moment.
                  metadata:
                    reason: rate_limited
                    retryable: true
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: >-
            Too many turns for the user or organization this key acts as
            (`rate_limited`). It reports `retryable: true` and carries
            `Retry-After`.
          headers:
            Retry-After:
              description: Seconds to wait before retrying this request.
              required: true
              schema:
                description: Seconds to wait before retrying this request.
                example: '60'
                type: string
        '502':
          content:
            application/json:
              example:
                error:
                  code: 502
                  message: The intern could not be reached.
                  metadata:
                    reason: intern_unreachable
                    retryable: true
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: >-
            The intern could not be reached or rejected the request
            (`intern_unreachable`, `intern_rejected`), the intern refused the
            turn before any output (`turn_failed`), or its stream ended before
            the turn started (`stream_severed`). `intern_unreachable` and
            `stream_severed` are transient and report `retryable: true`;
            `intern_rejected` reports `false`. A `turn_failed` varies by failure
            and carries the intern's own classification of what went wrong, so
            read `metadata.retryable` rather than assuming from the reason.
        '503':
          content:
            application/json:
              example:
                error:
                  code: 503
                  message: >-
                    The intern cannot hold another run open across a question
                    right now. Retry later.
                  metadata:
                    reason: busy
                    retryable: true
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: >-
            The intern cannot hold another run open across a question right now
            (`busy`). It reports `retryable: true` and carries `Retry-After`.
          headers:
            Retry-After:
              description: Seconds to wait before retrying this request.
              required: true
              schema:
                description: Seconds to wait before retrying this request.
                example: '5'
                type: string
        '504':
          content:
            application/json:
              example:
                error:
                  code: 504
                  message: The intern did not answer in time.
                  metadata:
                    reason: timeout
                    retryable: true
              schema:
                $ref: '#/components/schemas/InternChatErrorResponse'
          description: The intern did not answer within the request budget (`timeout`).
      security:
        - apiKey: []
components:
  schemas:
    InternChatCompletionRequest:
      description: >-
        An OpenAI-compatible streaming chat completion request for one intern.
        Other OpenAI fields such as `temperature` or `tools` are ignored. The
        intern owns its sampling and its tools.
      example:
        approval_mode: manual
        messages:
          - content: Summarize the open pull requests.
            role: user
        stream: true
      properties:
        approval_mode:
          $ref: '#/components/schemas/InternApprovalMode'
        messages:
          description: >-
            The conversation. Only the last message is read. A last `user`
            message starts a run. A last `tool` message answers the interaction
            named by its `tool_call_id` and requires `session_id`.
          items:
            $ref: '#/components/schemas/InternChatMessage'
          minItems: 1
          type: array
        model:
          description: >-
            Accepted for OpenAI compatibility and never used. The intern runs
            the model configured on it (`PATCH` the intern to change it).
            Streamed chunks report the runtime's identifier for that model as
            the intern reports it, or `openrouter/intern` on chunks whose event
            carries no model (before the intern reports one, and on the chunks
            the API emits itself: the timeout, run-ended and severed-stream
            error chunks, the stop chunk of a replay that ends without a
            terminal daemon event, and the final usage chunk after any of them).
            A usage chunk that follows a daemon completion event carries the
            model the intern reported.
          example: openrouter/intern
          maxLength: 256
          minLength: 1
          type: string
        session_id:
          description: >-
            The daemon session to continue, as returned in `session_id` on the
            final chunk of an earlier response. Omit it to start a new session.
            An id the intern has not seen before is not an error: it starts a
            new session under that id, so a mistyped id forks the conversation.
            Sessions are scoped to the intern's own daemon. Required when the
            last message has role `tool`.
          example: ses_7f3c9a
          maxLength: 256
          minLength: 1
          type: string
        stream:
          const: true
          description: >-
            Must be `true`. This endpoint only streams. `false` or an omitted
            `stream` is refused with `400` and reason `bad_request`.
          example: true
          type: boolean
      required:
        - messages
        - stream
      type: object
    InternChatStreamingResponse:
      description: >-
        A server-sent event carrying one chunk. The stream ends with `data:
        [DONE]`.
      example:
        data:
          choices:
            - delta:
                tool_calls:
                  - function:
                      arguments: >-
                        {"fields":[{"name":"answer","options":["red","blue","Other"],"required":true,"type":"string"}],"kind":"elicitation","message":"Which
                        colour do you prefer?"}
                      name: openrouter.provide_input
                    id: 15e90ad6-5320-4a59-af4f-b371428154fa
                    index: 0
                    type: function
              finish_reason: null
              index: 0
          created: 1789537541
          id: chatcmpl-f727571a-3bad-4e0d-8a9e-f18f8cda9750
          model: openrouter/intern
          object: chat.completion.chunk
      properties:
        data:
          $ref: '#/components/schemas/InternChatCompletionChunk'
      required:
        - data
      type: object
    InternChatSteeredResponse:
      description: >-
        The message was delivered into the turn already running on the same
        session. Its effect is streamed on that turn, not here.
      example:
        session_id: sess_01j9x0k4q7v8r2t3m6n5p8w9y1
        status: steered
      properties:
        session_id:
          description: The session of the running turn the message was delivered to.
          example: sess_01j9x0k4q7v8r2t3m6n5p8w9y1
          type: string
        status:
          description: The message was handed to the turn already running on this session.
          enum:
            - steered
          type: string
      required:
        - session_id
        - status
      type: object
    InternChatErrorResponse:
      description: >-
        A refusal before the stream opens. Once the response is `200` and
        streaming, failures arrive as a chunk with `finish_reason: "error"`
        instead.
      example:
        error:
          code: 409
          message: That question is no longer waiting for an answer.
          metadata:
            reason: interaction_not_pending
            retryable: false
      properties:
        error:
          $ref: '#/components/schemas/InternChatError'
      required:
        - error
      type: object
    InternApprovalMode:
      description: >-
        How the run started by this prompt handles tool approvals. `self-drive`
        (the default when omitted) consents on your behalf and runs the shell
        unsandboxed. `manual` asks you before an approval-bearing tool runs, as
        an `openrouter.provide_input` permission request, and keeps the shell
        sandboxed until an escalation is allowed. The mode applies to the run
        this prompt starts and is not remembered by the session. Repeat it on
        each new prompt that should use it. A `tool` reply continues the run
        under the mode it started with.
      enum:
        - manual
        - self-drive
      example: manual
      type: string
    InternChatMessage:
      description: One OpenAI-compatible chat message, discriminated by `role`.
      discriminator:
        mapping:
          assistant:
            $ref: '#/components/schemas/InternChatAssistantMessage'
          developer:
            $ref: '#/components/schemas/InternChatDeveloperMessage'
          system:
            $ref: '#/components/schemas/InternChatSystemMessage'
          tool:
            $ref: '#/components/schemas/InternChatToolMessage'
          user:
            $ref: '#/components/schemas/InternChatUserMessage'
        propertyName: role
      example:
        content: Summarize the open pull requests.
        role: user
      oneOf:
        - $ref: '#/components/schemas/InternChatSystemMessage'
        - $ref: '#/components/schemas/InternChatDeveloperMessage'
        - $ref: '#/components/schemas/InternChatUserMessage'
        - $ref: '#/components/schemas/InternChatAssistantMessage'
        - $ref: '#/components/schemas/InternChatToolMessage'
    InternChatCompletionChunk:
      description: >-
        One `data:` line of the stream. A run streams a role chunk, content and
        reasoning chunks, then a finish chunk: `stop`, `tool_calls` (the run is
        paused for input) or `error` (with an `error` object). A final chunk
        with empty `choices` follows in every case, carrying `session_id` and
        `usage` (`null` unless the daemon reported usage, and always `null`
        after `tool_calls`). Every stream ends with `[DONE]`.
      example:
        choices:
          - delta:
              content: Hello
            finish_reason: null
            index: 0
        created: 1789537541
        id: chatcmpl-f727571a-3bad-4e0d-8a9e-f18f8cda9750
        model: openrouter/intern
        object: chat.completion.chunk
      properties:
        choices:
          description: >-
            One choice on content, tool-call and error chunks. Empty on the
            final chunk that carries `session_id`.
          items:
            $ref: '#/components/schemas/InternChatChoice'
          type: array
        created:
          type: integer
        error:
          $ref: '#/components/schemas/InternChatStreamError'
        id:
          description: The completion id, constant for the whole response.
          example: chatcmpl-f727571a-3bad-4e0d-8a9e-f18f8cda9750
          type: string
        model:
          description: >-
            The runtime's identifier for the model the intern is running, as the
            intern reports it. Each chunk carries the model from the event
            behind it: `openrouter/intern` on chunks emitted before the intern
            has reported one and on chunks the API emits itself (timeout,
            run-ended and severed-stream errors and their final usage chunk),
            even after an earlier chunk named a model. It can change within a
            stream. It is not an OpenRouter model slug, and the request `model`
            is never used.
          type: string
        object:
          enum:
            - chat.completion.chunk
          type: string
        session_id:
          description: >-
            On the final chunk of every response, the daemon session to continue
            with, or `null` when the run failed before the intern reported one.
            Send it as `session_id` on the next request, including the `tool`
            reply to an interaction. Session ids are client-visible and scoped
            to the intern's own daemon.
          example: ses_7f3c9a
          type:
            - string
            - 'null'
        usage:
          $ref: '#/components/schemas/InternChatUsage'
      required:
        - choices
        - created
        - id
        - model
        - object
      type: object
    InternChatError:
      description: >-
        The OpenAI-compatible error object. `metadata` is present on refusals
        from the chat route. Authentication refusals (`401`), the
        departed-creator `403` and the programme `404` carry only `code` and
        `message`.
      example:
        code: 409
        message: That question is no longer waiting for an answer.
        metadata:
          reason: interaction_not_pending
          retryable: false
      properties:
        code:
          description: The HTTP status of the response.
          type: integer
        message:
          type: string
        metadata:
          $ref: '#/components/schemas/InternChatErrorMetadata'
      required:
        - code
        - message
      type: object
    InternChatAssistantMessage:
      description: >-
        An assistant message from an earlier response. When answering an
        interaction, echo the streamed `tool_calls` here before the `tool`
        message.
      example:
        content: null
        role: assistant
        tool_calls:
          - function:
              arguments: >-
                {"kind":"permission","operation":"shell","options":["allow_once","reject_once"]}
              name: openrouter.provide_input
            id: 15e90ad6-5320-4a59-af4f-b371428154fa
      properties:
        content:
          $ref: '#/components/schemas/InternChatMessageContent'
        role:
          enum:
            - assistant
          type: string
        tool_calls:
          items:
            $ref: '#/components/schemas/InternChatEchoedToolCall'
          type: array
      required:
        - role
      type: object
    InternChatDeveloperMessage:
      description: >-
        A developer message. Accepted for client compatibility and not
        forwarded.
      example:
        content: Answer briefly.
        role: developer
      properties:
        content:
          $ref: '#/components/schemas/InternChatMessageContent'
        role:
          enum:
            - developer
          type: string
      required:
        - content
        - role
      type: object
    InternChatSystemMessage:
      description: A system message. Accepted for client compatibility and not forwarded.
      example:
        content: You are a helpful assistant.
        role: system
      properties:
        content:
          $ref: '#/components/schemas/InternChatMessageContent'
        role:
          enum:
            - system
          type: string
      required:
        - content
        - role
      type: object
    InternChatToolMessage:
      description: >-
        The answer to an `openrouter.provide_input` tool call. `tool_call_id` is
        the streamed tool call id and `session_id` must name the same session.
        For a permission, `content` is one of the offered option kinds
        (`allow_once`, `allow_always`, `reject_once`, `reject_always`) or
        `cancel`. For a question (elicitation), `content` is a JSON object
        string with `action` (`accept`, `decline` or `cancel`) and, for
        `accept`, `content` holding the field values. The answer is delivered to
        the run that asked. It never starts a new run.
      example:
        content: allow_once
        role: tool
        tool_call_id: 15e90ad6-5320-4a59-af4f-b371428154fa
      properties:
        content:
          $ref: '#/components/schemas/InternChatMessageContent'
        role:
          enum:
            - tool
          type: string
        tool_call_id:
          maxLength: 128
          minLength: 1
          type: string
      required:
        - content
        - role
        - tool_call_id
      type: object
    InternChatUserMessage:
      description: >-
        A user message. When it is the last message its text is the prompt for a
        new run, at most 32000 characters.
      example:
        content: Summarize the open pull requests.
        role: user
      properties:
        content:
          $ref: '#/components/schemas/InternChatMessageContent'
        role:
          enum:
            - user
          type: string
      required:
        - content
        - role
      type: object
    InternChatChoice:
      description: The single choice this endpoint streams.
      example:
        delta:
          content: Hello
        finish_reason: null
        index: 0
      properties:
        delta:
          $ref: '#/components/schemas/InternChatDelta'
        finish_reason:
          description: >-
            `null` while streaming. `stop` when the run completed, `tool_calls`
            when the run is waiting for the caller to answer the streamed tool
            call, `error` on the terminal error chunk.
          enum:
            - error
            - stop
            - tool_calls
            - null
          type:
            - string
            - 'null'
        index:
          type: integer
      required:
        - delta
        - finish_reason
        - index
      type: object
    InternChatStreamError:
      description: >-
        A failure after the response headers were sent. The chunk that carries
        it has `finish_reason: "error"`, then the final empty-`choices` chunk
        and `[DONE]` follow. Reasons here are `attachment_failed`, `busy`,
        `client_closed_request`, `interaction_not_pending`,
        `interaction_unknown`, `intern_unreachable`, `run_ended`,
        `stream_severed`, `timeout` or `turn_failed`. `run_ended` reports an
        ending the intern confirmed, such as a cancellation or a deadline, while
        `stream_severed` reports a connection lost without that confirmation.
      example:
        code: 502
        message: The intern could not continue this run.
        metadata:
          reason: attachment_failed
          retryable: false
      properties:
        code:
          description: >-
            The HTTP status this failure would have had before the stream
            opened.
          type: integer
        message:
          type: string
        metadata:
          $ref: '#/components/schemas/InternChatErrorMetadata'
      required:
        - code
        - message
        - metadata
      type: object
    InternChatUsage:
      description: >-
        Token usage for the run as the daemon reported it, on the final chunk
        before `[DONE]`. `null` when the daemon reported none, and always `null`
        after `tool_calls` because the turn is not over.
      example:
        completion_tokens: 12
        prompt_tokens: 40
        total_tokens: 52
      properties:
        completion_tokens:
          type: integer
        cost:
          description: The cost of the run in USD, when the daemon reported one.
          format: double
          type: number
        prompt_tokens:
          type: integer
        prompt_tokens_details:
          $ref: '#/components/schemas/InternChatPromptTokensDetails'
        total_tokens:
          type: integer
      required:
        - completion_tokens
        - prompt_tokens
        - total_tokens
      type:
        - object
        - 'null'
    InternChatErrorMetadata:
      description: Machine-readable detail for the failure.
      example:
        reason: interaction_not_pending
        retryable: false
      properties:
        reason:
          description: A stable reason a client can branch on.
          enum:
            - attachment_failed
            - bad_request
            - busy
            - client_closed_request
            - interaction_not_pending
            - interaction_unknown
            - intern_not_ready
            - intern_rejected
            - intern_unreachable
            - not_found
            - payload_too_large
            - rate_limited
            - run_ended
            - stream_severed
            - timeout
            - turn_failed
          type: string
        retryable:
          description: >-
            Whether the same request may be sent again unchanged. Always `true`
            for the transient refusals — `busy`, `intern_not_ready`,
            `intern_unreachable`, `rate_limited`, `stream_severed` and `timeout`
            — and always `false` for the ones a retry cannot fix. For
            `turn_failed` it varies by failure and is the intern's own
            classification of what went wrong: `true` for an upstream overload,
            rate limit, timeout or transport fault, `false` for an
            authentication or bad-request failure that would be rejected the
            same way again. Branch on this field rather than on `reason` when
            deciding whether to retry. A `429`, and a `409` or `503` with reason
            `busy`, also carry a `Retry-After` header saying how long to wait.
          type: boolean
      required:
        - reason
        - retryable
      type: object
    InternChatMessageContent:
      anyOf:
        - type: string
        - items:
            $ref: '#/components/schemas/InternChatTextPart'
          type: array
        - type: 'null'
      description: >-
        Message text as a string or a list of text parts. Assistant history may
        carry null. Only the last message is read; earlier messages are accepted
        so ordinary clients can resend history.
      example: Summarize the open pull requests.
    InternChatEchoedToolCall:
      description: >-
        The `openrouter.provide_input` tool call from the previous response,
        echoed back unchanged. Its `id` is the interaction the following `tool`
        message answers.
      example:
        function:
          arguments: >-
            {"kind":"permission","operation":"shell","options":["allow_once","reject_once"]}
          name: openrouter.provide_input
        id: 15e90ad6-5320-4a59-af4f-b371428154fa
      properties:
        function:
          $ref: '#/components/schemas/InternChatEchoedToolCallFunction'
        id:
          maxLength: 128
          minLength: 1
          type: string
      required:
        - function
        - id
      type: object
    InternChatDelta:
      description: >-
        The incremental content of one chunk. The first chunk carries `role`,
        text chunks carry `content`, reasoning chunks carry `reasoning`, and an
        interaction chunk carries one complete `tool_calls` entry.
      example:
        content: Hello
      properties:
        content:
          type: string
        reasoning:
          type: string
        role:
          enum:
            - assistant
          type: string
        tool_calls:
          items:
            $ref: '#/components/schemas/InternChatToolCall'
          type: array
      type: object
    InternChatPromptTokensDetails:
      description: Prompt tokens served from cache, when the daemon reported them.
      example:
        cached_tokens: 1024
      properties:
        cached_tokens:
          type: integer
      required:
        - cached_tokens
      type: object
    InternChatTextPart:
      description: One text part of a message.
      example:
        text: Summarize the open pull requests.
        type: text
      properties:
        text:
          type: string
        type:
          enum:
            - text
          type: string
      required:
        - text
        - type
      type: object
    InternChatEchoedToolCallFunction:
      description: The function name and JSON arguments string exactly as streamed.
      example:
        arguments: >-
          {"kind":"permission","operation":"shell","options":["allow_once","reject_once"]}
        name: openrouter.provide_input
      properties:
        arguments:
          type: string
        name:
          type: string
      required:
        - arguments
        - name
      type: object
    InternChatToolCall:
      description: >-
        An `openrouter.provide_input` request. The run pauses on the daemon
        until a `tool` message answers it, the caller cancels it, or its
        interaction deadline passes.
      example:
        function:
          arguments: >-
            {"fields":[{"name":"answer","options":["red","blue","Other"],"required":true,"type":"string"}],"kind":"elicitation","message":"Which
            colour do you prefer?"}
          name: openrouter.provide_input
        id: 15e90ad6-5320-4a59-af4f-b371428154fa
        index: 0
        type: function
      properties:
        function:
          $ref: '#/components/schemas/InternChatToolCallFunction'
        id:
          description: >-
            The interaction id. Send it back as `tool_call_id` on the `tool`
            message that answers it.
          example: 15e90ad6-5320-4a59-af4f-b371428154fa
          type: string
        index:
          type: integer
        type:
          enum:
            - function
          type: string
      required:
        - function
        - id
        - index
        - type
      type: object
    InternChatToolCallFunction:
      description: The single tool this endpoint calls, asking the caller for input.
      example:
        arguments: >-
          {"fields":[{"name":"answer","options":["red","blue","Other"],"required":true,"type":"string"}],"kind":"elicitation","message":"Which
          colour do you prefer?"}
        name: openrouter.provide_input
      properties:
        arguments:
          description: >-
            A JSON object string describing the interaction. A permission
            request is `{"kind":"permission","operation":<tool name or
            null>,"options":[<permission option kinds>]}`. A question is
            `{"kind":"elicitation","message":<question>,"fields":[<field
            descriptors>]}`.
          example: >-
            {"fields":[{"name":"answer","options":["red","blue","Other"],"required":true,"type":"string"}],"kind":"elicitation","message":"Which
            colour do you prefer?"}
          type: string
        name:
          enum:
            - openrouter.provide_input
          type: string
      required:
        - arguments
        - name
      type: object
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````