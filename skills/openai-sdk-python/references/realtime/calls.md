# Calls

## Accept

`realtime.calls.accept(strcall_id, CallAcceptParams**kwargs)`

**post** `/realtime/calls/{call_id}/accept`

Accept an incoming SIP call and configure the realtime session that will
handle it.

### Parameters

- `call_id: str`

- `type: Literal["realtime"]`

  The type of session to create. Always `realtime` for the Realtime API.

  - `"realtime"`

- `audio: Optional[RealtimeAudioConfigParam]`

  Configuration for input and output audio.

  - `input: Optional[RealtimeAudioConfigInput]`

    - `format: Optional[RealtimeAudioFormats]`

      The format of the input audio.

      - `class AudioPCM: …`

        The PCM audio format. Only a 24kHz sample rate is supported.

        - `rate: Optional[Literal[24000]]`

          The sample rate of the audio. Always `24000`.

          - `24000`

        - `type: Optional[Literal["audio/pcm"]]`

          The audio format. Always `audio/pcm`.

          - `"audio/pcm"`

      - `class AudioPCMU: …`

        The G.711 μ-law format.

        - `type: Optional[Literal["audio/pcmu"]]`

          The audio format. Always `audio/pcmu`.

          - `"audio/pcmu"`

      - `class AudioPCMA: …`

        The G.711 A-law format.

        - `type: Optional[Literal["audio/pcma"]]`

          The audio format. Always `audio/pcma`.

          - `"audio/pcma"`

    - `noise_reduction: Optional[NoiseReduction]`

      Configuration for input audio noise reduction. This can be set to `null` to turn off.
      Noise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.
      Filtering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.

      - `type: Optional[NoiseReductionType]`

        Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones.

        - `"near_field"`

        - `"far_field"`

    - `transcription: Optional[AudioTranscription]`

      Configuration for input audio transcription, defaults to off and can be set to `null` to turn off once on. Input audio transcription is not native to the model, since the model consumes audio directly. Transcription runs asynchronously through [the /audio/transcriptions endpoint](https://platform.openai.com/docs/api-reference/audio/createTranscription) and should be treated as guidance of input audio content rather than precisely what the model heard. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service.

      - `language: Optional[str]`

        The language of the input audio. Supplying the input language in
        [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
        will improve accuracy and latency.

      - `model: Optional[Union[str, Literal["whisper-1", "gpt-4o-mini-transcribe", "gpt-4o-mini-transcribe-2025-12-15", 2 more], null]]`

        The model to use for transcription. Current options are `whisper-1`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, and `gpt-4o-transcribe-diarize`. Use `gpt-4o-transcribe-diarize` when you need diarization with speaker labels.

        - `str`

        - `Literal["whisper-1", "gpt-4o-mini-transcribe", "gpt-4o-mini-transcribe-2025-12-15", 2 more]`

          The model to use for transcription. Current options are `whisper-1`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, and `gpt-4o-transcribe-diarize`. Use `gpt-4o-transcribe-diarize` when you need diarization with speaker labels.

          - `"whisper-1"`

          - `"gpt-4o-mini-transcribe"`

          - `"gpt-4o-mini-transcribe-2025-12-15"`

          - `"gpt-4o-transcribe"`

          - `"gpt-4o-transcribe-diarize"`

      - `prompt: Optional[str]`

        An optional text to guide the model's style or continue a previous audio
        segment.
        For `whisper-1`, the [prompt is a list of keywords](https://platform.openai.com/docs/guides/speech-to-text#prompting).
        For `gpt-4o-transcribe` models (excluding `gpt-4o-transcribe-diarize`), the prompt is a free text string, for example "expect words related to technology".

    - `turn_detection: Optional[RealtimeAudioInputTurnDetection]`

      Configuration for turn detection, ether Server VAD or Semantic VAD. This can be set to `null` to turn off, in which case the client must manually trigger model response.

      Server VAD means that the model will detect the start and end of speech based on audio volume and respond at the end of user speech.

      Semantic VAD is more advanced and uses a turn detection model (in conjunction with VAD) to semantically estimate whether the user has finished speaking, then dynamically sets a timeout based on this probability. For example, if user audio trails off with "uhhm", the model will score a low probability of turn end and wait longer for the user to continue speaking. This can be useful for more natural conversations, but may have a higher latency.

      - `class ServerVad: …`

        Server-side voice activity detection (VAD) which flips on when user speech is detected and off after a period of silence.

        - `type: Literal["server_vad"]`

          Type of turn detection, `server_vad` to turn on simple Server VAD.

          - `"server_vad"`

        - `create_response: Optional[bool]`

          Whether or not to automatically generate a response when a VAD stop event occurs. If `interrupt_response` is set to `false` this may fail to create a response if the model is already responding.

          If both `create_response` and `interrupt_response` are set to `false`, the model will never respond automatically but VAD events will still be emitted.

        - `idle_timeout_ms: Optional[int]`

          Optional timeout after which a model response will be triggered automatically. This is
          useful for situations in which a long pause from the user is unexpected, such as a phone
          call. The model will effectively prompt the user to continue the conversation based
          on the current context.

          The timeout value will be applied after the last model response's audio has finished playing,
          i.e. it's set to the `response.done` time plus audio playback duration.

          An `input_audio_buffer.timeout_triggered` event (plus events
          associated with the Response) will be emitted when the timeout is reached.
          Idle timeout is currently only supported for `server_vad` mode.

        - `interrupt_response: Optional[bool]`

          Whether or not to automatically interrupt (cancel) any ongoing response with output to the default
          conversation (i.e. `conversation` of `auto`) when a VAD start event occurs. If `true` then the response will be cancelled, otherwise it will continue until complete.

          If both `create_response` and `interrupt_response` are set to `false`, the model will never respond automatically but VAD events will still be emitted.

        - `prefix_padding_ms: Optional[int]`

          Used only for `server_vad` mode. Amount of audio to include before the VAD detected speech (in
          milliseconds). Defaults to 300ms.

        - `silence_duration_ms: Optional[int]`

          Used only for `server_vad` mode. Duration of silence to detect speech stop (in milliseconds). Defaults
          to 500ms. With shorter values the model will respond more quickly,
          but may jump in on short pauses from the user.

        - `threshold: Optional[float]`

          Used only for `server_vad` mode. Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A
          higher threshold will require louder audio to activate the model, and
          thus might perform better in noisy environments.

      - `class SemanticVad: …`

        Server-side semantic turn detection which uses a model to determine when the user has finished speaking.

        - `type: Literal["semantic_vad"]`

          Type of turn detection, `semantic_vad` to turn on Semantic VAD.

          - `"semantic_vad"`

        - `create_response: Optional[bool]`

          Whether or not to automatically generate a response when a VAD stop event occurs.

        - `eagerness: Optional[Literal["low", "medium", "high", "auto"]]`

          Used only for `semantic_vad` mode. The eagerness of the model to respond. `low` will wait longer for the user to continue speaking, `high` will respond more quickly. `auto` is the default and is equivalent to `medium`. `low`, `medium`, and `high` have max timeouts of 8s, 4s, and 2s respectively.

          - `"low"`

          - `"medium"`

          - `"high"`

          - `"auto"`

        - `interrupt_response: Optional[bool]`

          Whether or not to automatically interrupt any ongoing response with output to the default
          conversation (i.e. `conversation` of `auto`) when a VAD start event occurs.

  - `output: Optional[RealtimeAudioConfigOutput]`

    - `format: Optional[RealtimeAudioFormats]`

      The format of the output audio.

      - `class AudioPCM: …`

        The PCM audio format. Only a 24kHz sample rate is supported.

        - `rate: Optional[Literal[24000]]`

          The sample rate of the audio. Always `24000`.

          - `24000`

        - `type: Optional[Literal["audio/pcm"]]`

          The audio format. Always `audio/pcm`.

          - `"audio/pcm"`

      - `class AudioPCMU: …`

        The G.711 μ-law format.

        - `type: Optional[Literal["audio/pcmu"]]`

          The audio format. Always `audio/pcmu`.

          - `"audio/pcmu"`

      - `class AudioPCMA: …`

        The G.711 A-law format.

        - `type: Optional[Literal["audio/pcma"]]`

          The audio format. Always `audio/pcma`.

          - `"audio/pcma"`

    - `speed: Optional[float]`

      The speed of the model's spoken response as a multiple of the original speed.
      1.0 is the default speed. 0.25 is the minimum speed. 1.5 is the maximum speed. This value can only be changed in between model turns, not while a response is in progress.

      This parameter is a post-processing adjustment to the audio after it is generated, it's
      also possible to prompt the model to speak faster or slower.

    - `voice: Optional[Union[str, Literal["alloy", "ash", "ballad", 7 more], null]]`

      The voice the model uses to respond. Supported built-in voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer`, `verse`, `marin`, and `cedar`. Voice cannot be changed during the session once the model has responded with audio at least once. We recommend `marin` and `cedar` for best quality.

      - `str`

      - `Literal["alloy", "ash", "ballad", 7 more]`

        The voice the model uses to respond. Supported built-in voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer`, `verse`, `marin`, and `cedar`. Voice cannot be changed during the session once the model has responded with audio at least once. We recommend `marin` and `cedar` for best quality.

        - `"alloy"`

        - `"ash"`

        - `"ballad"`

        - `"coral"`

        - `"echo"`

        - `"sage"`

        - `"shimmer"`

        - `"verse"`

        - `"marin"`

        - `"cedar"`

- `include: Optional[List[Literal["item.input_audio_transcription.logprobs"]]]`

  Additional fields to include in server outputs.

  `item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.

  - `"item.input_audio_transcription.logprobs"`

- `instructions: Optional[str]`

  The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.

  Note that the server sets default instructions which will be used if this field is not set and are visible in the `session.created` event at the start of the session.

- `max_output_tokens: Optional[Union[int, Literal["inf"]]]`

  Maximum number of output tokens for a single assistant response,
  inclusive of tool calls. Provide an integer between 1 and 4096 to
  limit output tokens, or `inf` for the maximum available tokens for a
  given model. Defaults to `inf`.

  - `int`

  - `Literal["inf"]`

    - `"inf"`

- `model: Optional[Union[str, Literal["gpt-realtime", "gpt-realtime-1.5", "gpt-realtime-2025-08-28", 13 more]]]`

  The Realtime model used for this session.

  - `str`

  - `Literal["gpt-realtime", "gpt-realtime-1.5", "gpt-realtime-2025-08-28", 13 more]`

    The Realtime model used for this session.

    - `"gpt-realtime"`

    - `"gpt-realtime-1.5"`

    - `"gpt-realtime-2025-08-28"`

    - `"gpt-4o-realtime-preview"`

    - `"gpt-4o-realtime-preview-2024-10-01"`

    - `"gpt-4o-realtime-preview-2024-12-17"`

    - `"gpt-4o-realtime-preview-2025-06-03"`

    - `"gpt-4o-mini-realtime-preview"`

    - `"gpt-4o-mini-realtime-preview-2024-12-17"`

    - `"gpt-realtime-mini"`

    - `"gpt-realtime-mini-2025-10-06"`

    - `"gpt-realtime-mini-2025-12-15"`

    - `"gpt-audio-1.5"`

    - `"gpt-audio-mini"`

    - `"gpt-audio-mini-2025-10-06"`

    - `"gpt-audio-mini-2025-12-15"`

- `output_modalities: Optional[List[Literal["text", "audio"]]]`

  The set of modalities the model can respond with. It defaults to `["audio"]`, indicating
  that the model will respond with audio plus a transcript. `["text"]` can be used to make
  the model respond with text only. It is not possible to request both `text` and `audio` at the same time.

  - `"text"`

  - `"audio"`

- `prompt: Optional[ResponsePromptParam]`

  Reference to a prompt template and its variables.
  [Learn more](https://platform.openai.com/docs/guides/text?api-mode=responses#reusable-prompts).

  - `id: str`

    The unique identifier of the prompt template to use.

  - `variables: Optional[Dict[str, Variables]]`

    Optional map of values to substitute in for variables in your
    prompt. The substitution values can either be strings, or other
    Response input types like images or files.

    - `str`

    - `class ResponseInputText: …`

      A text input to the model.

      - `text: str`

        The text input to the model.

      - `type: Literal["input_text"]`

        The type of the input item. Always `input_text`.

        - `"input_text"`

    - `class ResponseInputImage: …`

      An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

      - `detail: Literal["low", "high", "auto", "original"]`

        The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

        - `"low"`

        - `"high"`

        - `"auto"`

        - `"original"`

      - `type: Literal["input_image"]`

        The type of the input item. Always `input_image`.

        - `"input_image"`

      - `file_id: Optional[str]`

        The ID of the file to be sent to the model.

      - `image_url: Optional[str]`

        The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

    - `class ResponseInputFile: …`

      A file input to the model.

      - `type: Literal["input_file"]`

        The type of the input item. Always `input_file`.

        - `"input_file"`

      - `file_data: Optional[str]`

        The content of the file to be sent to the model.

      - `file_id: Optional[str]`

        The ID of the file to be sent to the model.

      - `file_url: Optional[str]`

        The URL of the file to be sent to the model.

      - `filename: Optional[str]`

        The name of the file to be sent to the model.

  - `version: Optional[str]`

    Optional version of the prompt template.

- `tool_choice: Optional[RealtimeToolChoiceConfigParam]`

  How the model chooses tools. Provide one of the string modes or force a specific
  function/MCP tool.

  - `Literal["none", "auto", "required"]`

    - `"none"`

    - `"auto"`

    - `"required"`

  - `class ToolChoiceFunction: …`

    Use this option to force the model to call a specific function.

    - `name: str`

      The name of the function to call.

    - `type: Literal["function"]`

      For function calling, the type is always `function`.

      - `"function"`

  - `class ToolChoiceMcp: …`

    Use this option to force the model to call a specific tool on a remote MCP server.

    - `server_label: str`

      The label of the MCP server to use.

    - `type: Literal["mcp"]`

      For MCP tools, the type is always `mcp`.

      - `"mcp"`

    - `name: Optional[str]`

      The name of the tool to call on the server.

- `tools: Optional[RealtimeToolsConfigParam]`

  Tools available to the model.

  - `class RealtimeFunctionTool: …`

    - `description: Optional[str]`

      The description of the function, including guidance on when and how
      to call it, and guidance about what to tell the user when calling
      (if anything).

    - `name: Optional[str]`

      The name of the function.

    - `parameters: Optional[object]`

      Parameters of the function in JSON Schema.

    - `type: Optional[Literal["function"]]`

      The type of the tool, i.e. `function`.

      - `"function"`

  - `class Mcp: …`

    Give the model access to additional tools via remote Model Context Protocol
    (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

    - `server_label: str`

      A label for this MCP server, used to identify it in tool calls.

    - `type: Literal["mcp"]`

      The type of the MCP tool. Always `mcp`.

      - `"mcp"`

    - `allowed_tools: Optional[McpAllowedTools]`

      List of allowed tool names or a filter object.

      - `List[str]`

        A string array of allowed tool names

      - `class McpAllowedToolsMcpToolFilter: …`

        A filter object to specify which tools are allowed.

        - `read_only: Optional[bool]`

          Indicates whether or not a tool modifies data or is read-only. If an
          MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
          it will match this filter.

        - `tool_names: Optional[List[str]]`

          List of allowed tool names.

    - `authorization: Optional[str]`

      An OAuth access token that can be used with a remote MCP server, either
      with a custom MCP server URL or a service connector. Your application
      must handle the OAuth authorization flow and provide the token here.

    - `connector_id: Optional[Literal["connector_dropbox", "connector_gmail", "connector_googlecalendar", 5 more]]`

      Identifier for service connectors, like those available in ChatGPT. One of
      `server_url` or `connector_id` must be provided. Learn more about service
      connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

      Currently supported `connector_id` values are:

      - Dropbox: `connector_dropbox`
      - Gmail: `connector_gmail`
      - Google Calendar: `connector_googlecalendar`
      - Google Drive: `connector_googledrive`
      - Microsoft Teams: `connector_microsoftteams`
      - Outlook Calendar: `connector_outlookcalendar`
      - Outlook Email: `connector_outlookemail`
      - SharePoint: `connector_sharepoint`

      - `"connector_dropbox"`

      - `"connector_gmail"`

      - `"connector_googlecalendar"`

      - `"connector_googledrive"`

      - `"connector_microsoftteams"`

      - `"connector_outlookcalendar"`

      - `"connector_outlookemail"`

      - `"connector_sharepoint"`

    - `defer_loading: Optional[bool]`

      Whether this MCP tool is deferred and discovered via tool search.

    - `headers: Optional[Dict[str, str]]`

      Optional HTTP headers to send to the MCP server. Use for authentication
      or other purposes.

    - `require_approval: Optional[McpRequireApproval]`

      Specify which of the MCP server's tools require approval.

      - `class McpRequireApprovalMcpToolApprovalFilter: …`

        Specify which of the MCP server's tools require approval. Can be
        `always`, `never`, or a filter object associated with tools
        that require approval.

        - `always: Optional[McpRequireApprovalMcpToolApprovalFilterAlways]`

          A filter object to specify which tools are allowed.

          - `read_only: Optional[bool]`

            Indicates whether or not a tool modifies data or is read-only. If an
            MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
            it will match this filter.

          - `tool_names: Optional[List[str]]`

            List of allowed tool names.

        - `never: Optional[McpRequireApprovalMcpToolApprovalFilterNever]`

          A filter object to specify which tools are allowed.

          - `read_only: Optional[bool]`

            Indicates whether or not a tool modifies data or is read-only. If an
            MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
            it will match this filter.

          - `tool_names: Optional[List[str]]`

            List of allowed tool names.

      - `Literal["always", "never"]`

        Specify a single approval policy for all tools. One of `always` or
        `never`. When set to `always`, all tools will require approval. When
        set to `never`, all tools will not require approval.

        - `"always"`

        - `"never"`

    - `server_description: Optional[str]`

      Optional description of the MCP server, used to provide more context.

    - `server_url: Optional[str]`

      The URL for the MCP server. One of `server_url` or `connector_id` must be
      provided.

- `tracing: Optional[RealtimeTracingConfigParam]`

  Realtime API can write session traces to the [Traces Dashboard](/logs?api=traces). Set to null to disable tracing. Once
  tracing is enabled for a session, the configuration cannot be modified.

  `auto` will create a trace for the session with default values for the
  workflow name, group id, and metadata.

  - `Literal["auto"]`

    Enables tracing and sets default values for tracing configuration options. Always `auto`.

    - `"auto"`

  - `class TracingConfiguration: …`

    Granular configuration for tracing.

    - `group_id: Optional[str]`

      The group id to attach to this trace to enable filtering and
      grouping in the Traces Dashboard.

    - `metadata: Optional[object]`

      The arbitrary metadata to attach to this trace to enable
      filtering in the Traces Dashboard.

    - `workflow_name: Optional[str]`

      The name of the workflow to attach to this trace. This is used to
      name the trace in the Traces Dashboard.

- `truncation: Optional[RealtimeTruncationParam]`

  When the number of tokens in a conversation exceeds the model's input token limit, the conversation be truncated, meaning messages (starting from the oldest) will not be included in the model's context. A 32k context model with 4,096 max output tokens can only include 28,224 tokens in the context before truncation occurs.

  Clients can configure truncation behavior to truncate with a lower max token limit, which is an effective way to control token usage and cost.

  Truncation will reduce the number of cached tokens on the next turn (busting the cache), since messages are dropped from the beginning of the context. However, clients can also configure truncation to retain messages up to a fraction of the maximum context size, which will reduce the need for future truncations and thus improve the cache rate.

  Truncation can be disabled entirely, which means the server will never truncate but would instead return an error if the conversation exceeds the model's input token limit.

  - `Literal["auto", "disabled"]`

    The truncation strategy to use for the session. `auto` is the default truncation strategy. `disabled` will disable truncation and emit errors when the conversation exceeds the input token limit.

    - `"auto"`

    - `"disabled"`

  - `class RealtimeTruncationRetentionRatio: …`

    Retain a fraction of the conversation tokens when the conversation exceeds the input token limit. This allows you to amortize truncations across multiple turns, which can help improve cached token usage.

    - `retention_ratio: float`

      Fraction of post-instruction conversation tokens to retain (`0.0` - `1.0`) when the conversation exceeds the input token limit. Setting this to `0.8` means that messages will be dropped until 80% of the maximum allowed tokens are used. This helps reduce the frequency of truncations and improve cache rates.

    - `type: Literal["retention_ratio"]`

      Use retention ratio truncation.

      - `"retention_ratio"`

    - `token_limits: Optional[TokenLimits]`

      Optional custom token limits for this truncation strategy. If not provided, the model's default token limits will be used.

      - `post_instructions: Optional[int]`

        Maximum tokens allowed in the conversation after instructions (which including tool definitions). For example, setting this to 5,000 would mean that truncation would occur when the conversation exceeds 5,000 tokens after instructions. This cannot be higher than the model's context window size minus the maximum output tokens.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.realtime.calls.accept(
    call_id="call_id",
    type="realtime",
)
```

## Hangup

`realtime.calls.hangup(strcall_id)`

**post** `/realtime/calls/{call_id}/hangup`

End an active Realtime API call, whether it was initiated over SIP or
WebRTC.

### Parameters

- `call_id: str`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.realtime.calls.hangup(
    "call_id",
)
```

## Refer

`realtime.calls.refer(strcall_id, CallReferParams**kwargs)`

**post** `/realtime/calls/{call_id}/refer`

Transfer an active SIP call to a new destination using the SIP REFER verb.

### Parameters

- `call_id: str`

- `target_uri: str`

  URI that should appear in the SIP Refer-To header. Supports values like
  `tel:+14155550123` or `sip:agent@example.com`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.realtime.calls.refer(
    call_id="call_id",
    target_uri="tel:+14155550123",
)
```

## Reject

`realtime.calls.reject(strcall_id, CallRejectParams**kwargs)`

**post** `/realtime/calls/{call_id}/reject`

Decline an incoming SIP call by returning a SIP status code to the caller.

### Parameters

- `call_id: str`

- `status_code: Optional[int]`

  SIP response code to send back to the caller. Defaults to `603` (Decline)
  when omitted.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.realtime.calls.reject(
    call_id="call_id",
)
```

## Create

`realtime.calls.create(CallCreateParams**kwargs)  -> BinaryResponseContent`

**post** `/realtime/calls`

Create a new Realtime API call over WebRTC and receive the SDP answer needed
to complete the peer connection.

### Parameters

- `sdp: str`

  WebRTC Session Description Protocol (SDP) offer generated by the caller.

- `session: Optional[RealtimeSessionCreateRequestParam]`

  Realtime session object configuration.

  - `type: Literal["realtime"]`

    The type of session to create. Always `realtime` for the Realtime API.

    - `"realtime"`

  - `audio: Optional[RealtimeAudioConfig]`

    Configuration for input and output audio.

    - `input: Optional[RealtimeAudioConfigInput]`

      - `format: Optional[RealtimeAudioFormats]`

        The format of the input audio.

        - `class AudioPCM: …`

          The PCM audio format. Only a 24kHz sample rate is supported.

          - `rate: Optional[Literal[24000]]`

            The sample rate of the audio. Always `24000`.

            - `24000`

          - `type: Optional[Literal["audio/pcm"]]`

            The audio format. Always `audio/pcm`.

            - `"audio/pcm"`

        - `class AudioPCMU: …`

          The G.711 μ-law format.

          - `type: Optional[Literal["audio/pcmu"]]`

            The audio format. Always `audio/pcmu`.

            - `"audio/pcmu"`

        - `class AudioPCMA: …`

          The G.711 A-law format.

          - `type: Optional[Literal["audio/pcma"]]`

            The audio format. Always `audio/pcma`.

            - `"audio/pcma"`

      - `noise_reduction: Optional[NoiseReduction]`

        Configuration for input audio noise reduction. This can be set to `null` to turn off.
        Noise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.
        Filtering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.

        - `type: Optional[NoiseReductionType]`

          Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones.

          - `"near_field"`

          - `"far_field"`

      - `transcription: Optional[AudioTranscription]`

        Configuration for input audio transcription, defaults to off and can be set to `null` to turn off once on. Input audio transcription is not native to the model, since the model consumes audio directly. Transcription runs asynchronously through [the /audio/transcriptions endpoint](https://platform.openai.com/docs/api-reference/audio/createTranscription) and should be treated as guidance of input audio content rather than precisely what the model heard. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service.

        - `language: Optional[str]`

          The language of the input audio. Supplying the input language in
          [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
          will improve accuracy and latency.

        - `model: Optional[Union[str, Literal["whisper-1", "gpt-4o-mini-transcribe", "gpt-4o-mini-transcribe-2025-12-15", 2 more], null]]`

          The model to use for transcription. Current options are `whisper-1`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, and `gpt-4o-transcribe-diarize`. Use `gpt-4o-transcribe-diarize` when you need diarization with speaker labels.

          - `str`

          - `Literal["whisper-1", "gpt-4o-mini-transcribe", "gpt-4o-mini-transcribe-2025-12-15", 2 more]`

            The model to use for transcription. Current options are `whisper-1`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, and `gpt-4o-transcribe-diarize`. Use `gpt-4o-transcribe-diarize` when you need diarization with speaker labels.

            - `"whisper-1"`

            - `"gpt-4o-mini-transcribe"`

            - `"gpt-4o-mini-transcribe-2025-12-15"`

            - `"gpt-4o-transcribe"`

            - `"gpt-4o-transcribe-diarize"`

        - `prompt: Optional[str]`

          An optional text to guide the model's style or continue a previous audio
          segment.
          For `whisper-1`, the [prompt is a list of keywords](https://platform.openai.com/docs/guides/speech-to-text#prompting).
          For `gpt-4o-transcribe` models (excluding `gpt-4o-transcribe-diarize`), the prompt is a free text string, for example "expect words related to technology".

      - `turn_detection: Optional[RealtimeAudioInputTurnDetection]`

        Configuration for turn detection, ether Server VAD or Semantic VAD. This can be set to `null` to turn off, in which case the client must manually trigger model response.

        Server VAD means that the model will detect the start and end of speech based on audio volume and respond at the end of user speech.

        Semantic VAD is more advanced and uses a turn detection model (in conjunction with VAD) to semantically estimate whether the user has finished speaking, then dynamically sets a timeout based on this probability. For example, if user audio trails off with "uhhm", the model will score a low probability of turn end and wait longer for the user to continue speaking. This can be useful for more natural conversations, but may have a higher latency.

        - `class ServerVad: …`

          Server-side voice activity detection (VAD) which flips on when user speech is detected and off after a period of silence.

          - `type: Literal["server_vad"]`

            Type of turn detection, `server_vad` to turn on simple Server VAD.

            - `"server_vad"`

          - `create_response: Optional[bool]`

            Whether or not to automatically generate a response when a VAD stop event occurs. If `interrupt_response` is set to `false` this may fail to create a response if the model is already responding.

            If both `create_response` and `interrupt_response` are set to `false`, the model will never respond automatically but VAD events will still be emitted.

          - `idle_timeout_ms: Optional[int]`

            Optional timeout after which a model response will be triggered automatically. This is
            useful for situations in which a long pause from the user is unexpected, such as a phone
            call. The model will effectively prompt the user to continue the conversation based
            on the current context.

            The timeout value will be applied after the last model response's audio has finished playing,
            i.e. it's set to the `response.done` time plus audio playback duration.

            An `input_audio_buffer.timeout_triggered` event (plus events
            associated with the Response) will be emitted when the timeout is reached.
            Idle timeout is currently only supported for `server_vad` mode.

          - `interrupt_response: Optional[bool]`

            Whether or not to automatically interrupt (cancel) any ongoing response with output to the default
            conversation (i.e. `conversation` of `auto`) when a VAD start event occurs. If `true` then the response will be cancelled, otherwise it will continue until complete.

            If both `create_response` and `interrupt_response` are set to `false`, the model will never respond automatically but VAD events will still be emitted.

          - `prefix_padding_ms: Optional[int]`

            Used only for `server_vad` mode. Amount of audio to include before the VAD detected speech (in
            milliseconds). Defaults to 300ms.

          - `silence_duration_ms: Optional[int]`

            Used only for `server_vad` mode. Duration of silence to detect speech stop (in milliseconds). Defaults
            to 500ms. With shorter values the model will respond more quickly,
            but may jump in on short pauses from the user.

          - `threshold: Optional[float]`

            Used only for `server_vad` mode. Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A
            higher threshold will require louder audio to activate the model, and
            thus might perform better in noisy environments.

        - `class SemanticVad: …`

          Server-side semantic turn detection which uses a model to determine when the user has finished speaking.

          - `type: Literal["semantic_vad"]`

            Type of turn detection, `semantic_vad` to turn on Semantic VAD.

            - `"semantic_vad"`

          - `create_response: Optional[bool]`

            Whether or not to automatically generate a response when a VAD stop event occurs.

          - `eagerness: Optional[Literal["low", "medium", "high", "auto"]]`

            Used only for `semantic_vad` mode. The eagerness of the model to respond. `low` will wait longer for the user to continue speaking, `high` will respond more quickly. `auto` is the default and is equivalent to `medium`. `low`, `medium`, and `high` have max timeouts of 8s, 4s, and 2s respectively.

            - `"low"`

            - `"medium"`

            - `"high"`

            - `"auto"`

          - `interrupt_response: Optional[bool]`

            Whether or not to automatically interrupt any ongoing response with output to the default
            conversation (i.e. `conversation` of `auto`) when a VAD start event occurs.

    - `output: Optional[RealtimeAudioConfigOutput]`

      - `format: Optional[RealtimeAudioFormats]`

        The format of the output audio.

        - `class AudioPCM: …`

          The PCM audio format. Only a 24kHz sample rate is supported.

          - `rate: Optional[Literal[24000]]`

            The sample rate of the audio. Always `24000`.

            - `24000`

          - `type: Optional[Literal["audio/pcm"]]`

            The audio format. Always `audio/pcm`.

            - `"audio/pcm"`

        - `class AudioPCMU: …`

          The G.711 μ-law format.

          - `type: Optional[Literal["audio/pcmu"]]`

            The audio format. Always `audio/pcmu`.

            - `"audio/pcmu"`

        - `class AudioPCMA: …`

          The G.711 A-law format.

          - `type: Optional[Literal["audio/pcma"]]`

            The audio format. Always `audio/pcma`.

            - `"audio/pcma"`

      - `speed: Optional[float]`

        The speed of the model's spoken response as a multiple of the original speed.
        1.0 is the default speed. 0.25 is the minimum speed. 1.5 is the maximum speed. This value can only be changed in between model turns, not while a response is in progress.

        This parameter is a post-processing adjustment to the audio after it is generated, it's
        also possible to prompt the model to speak faster or slower.

      - `voice: Optional[Union[str, Literal["alloy", "ash", "ballad", 7 more], null]]`

        The voice the model uses to respond. Supported built-in voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer`, `verse`, `marin`, and `cedar`. Voice cannot be changed during the session once the model has responded with audio at least once. We recommend `marin` and `cedar` for best quality.

        - `str`

        - `Literal["alloy", "ash", "ballad", 7 more]`

          The voice the model uses to respond. Supported built-in voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer`, `verse`, `marin`, and `cedar`. Voice cannot be changed during the session once the model has responded with audio at least once. We recommend `marin` and `cedar` for best quality.

          - `"alloy"`

          - `"ash"`

          - `"ballad"`

          - `"coral"`

          - `"echo"`

          - `"sage"`

          - `"shimmer"`

          - `"verse"`

          - `"marin"`

          - `"cedar"`

  - `include: Optional[List[Literal["item.input_audio_transcription.logprobs"]]]`

    Additional fields to include in server outputs.

    `item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.

    - `"item.input_audio_transcription.logprobs"`

  - `instructions: Optional[str]`

    The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.

    Note that the server sets default instructions which will be used if this field is not set and are visible in the `session.created` event at the start of the session.

  - `max_output_tokens: Optional[Union[int, Literal["inf"], null]]`

    Maximum number of output tokens for a single assistant response,
    inclusive of tool calls. Provide an integer between 1 and 4096 to
    limit output tokens, or `inf` for the maximum available tokens for a
    given model. Defaults to `inf`.

    - `int`

    - `Literal["inf"]`

      - `"inf"`

  - `model: Optional[Union[str, Literal["gpt-realtime", "gpt-realtime-1.5", "gpt-realtime-2025-08-28", 13 more], null]]`

    The Realtime model used for this session.

    - `str`

    - `Literal["gpt-realtime", "gpt-realtime-1.5", "gpt-realtime-2025-08-28", 13 more]`

      The Realtime model used for this session.

      - `"gpt-realtime"`

      - `"gpt-realtime-1.5"`

      - `"gpt-realtime-2025-08-28"`

      - `"gpt-4o-realtime-preview"`

      - `"gpt-4o-realtime-preview-2024-10-01"`

      - `"gpt-4o-realtime-preview-2024-12-17"`

      - `"gpt-4o-realtime-preview-2025-06-03"`

      - `"gpt-4o-mini-realtime-preview"`

      - `"gpt-4o-mini-realtime-preview-2024-12-17"`

      - `"gpt-realtime-mini"`

      - `"gpt-realtime-mini-2025-10-06"`

      - `"gpt-realtime-mini-2025-12-15"`

      - `"gpt-audio-1.5"`

      - `"gpt-audio-mini"`

      - `"gpt-audio-mini-2025-10-06"`

      - `"gpt-audio-mini-2025-12-15"`

  - `output_modalities: Optional[List[Literal["text", "audio"]]]`

    The set of modalities the model can respond with. It defaults to `["audio"]`, indicating
    that the model will respond with audio plus a transcript. `["text"]` can be used to make
    the model respond with text only. It is not possible to request both `text` and `audio` at the same time.

    - `"text"`

    - `"audio"`

  - `prompt: Optional[ResponsePrompt]`

    Reference to a prompt template and its variables.
    [Learn more](https://platform.openai.com/docs/guides/text?api-mode=responses#reusable-prompts).

    - `id: str`

      The unique identifier of the prompt template to use.

    - `variables: Optional[Dict[str, Variables]]`

      Optional map of values to substitute in for variables in your
      prompt. The substitution values can either be strings, or other
      Response input types like images or files.

      - `str`

      - `class ResponseInputText: …`

        A text input to the model.

        - `text: str`

          The text input to the model.

        - `type: Literal["input_text"]`

          The type of the input item. Always `input_text`.

          - `"input_text"`

      - `class ResponseInputImage: …`

        An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

        - `detail: Literal["low", "high", "auto", "original"]`

          The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

          - `"low"`

          - `"high"`

          - `"auto"`

          - `"original"`

        - `type: Literal["input_image"]`

          The type of the input item. Always `input_image`.

          - `"input_image"`

        - `file_id: Optional[str]`

          The ID of the file to be sent to the model.

        - `image_url: Optional[str]`

          The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

      - `class ResponseInputFile: …`

        A file input to the model.

        - `type: Literal["input_file"]`

          The type of the input item. Always `input_file`.

          - `"input_file"`

        - `file_data: Optional[str]`

          The content of the file to be sent to the model.

        - `file_id: Optional[str]`

          The ID of the file to be sent to the model.

        - `file_url: Optional[str]`

          The URL of the file to be sent to the model.

        - `filename: Optional[str]`

          The name of the file to be sent to the model.

    - `version: Optional[str]`

      Optional version of the prompt template.

  - `tool_choice: Optional[RealtimeToolChoiceConfig]`

    How the model chooses tools. Provide one of the string modes or force a specific
    function/MCP tool.

    - `Literal["none", "auto", "required"]`

      - `"none"`

      - `"auto"`

      - `"required"`

    - `class ToolChoiceFunction: …`

      Use this option to force the model to call a specific function.

      - `name: str`

        The name of the function to call.

      - `type: Literal["function"]`

        For function calling, the type is always `function`.

        - `"function"`

    - `class ToolChoiceMcp: …`

      Use this option to force the model to call a specific tool on a remote MCP server.

      - `server_label: str`

        The label of the MCP server to use.

      - `type: Literal["mcp"]`

        For MCP tools, the type is always `mcp`.

        - `"mcp"`

      - `name: Optional[str]`

        The name of the tool to call on the server.

  - `tools: Optional[RealtimeToolsConfig]`

    Tools available to the model.

    - `class RealtimeFunctionTool: …`

      - `description: Optional[str]`

        The description of the function, including guidance on when and how
        to call it, and guidance about what to tell the user when calling
        (if anything).

      - `name: Optional[str]`

        The name of the function.

      - `parameters: Optional[object]`

        Parameters of the function in JSON Schema.

      - `type: Optional[Literal["function"]]`

        The type of the tool, i.e. `function`.

        - `"function"`

    - `class Mcp: …`

      Give the model access to additional tools via remote Model Context Protocol
      (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

      - `server_label: str`

        A label for this MCP server, used to identify it in tool calls.

      - `type: Literal["mcp"]`

        The type of the MCP tool. Always `mcp`.

        - `"mcp"`

      - `allowed_tools: Optional[McpAllowedTools]`

        List of allowed tool names or a filter object.

        - `List[str]`

          A string array of allowed tool names

        - `class McpAllowedToolsMcpToolFilter: …`

          A filter object to specify which tools are allowed.

          - `read_only: Optional[bool]`

            Indicates whether or not a tool modifies data or is read-only. If an
            MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
            it will match this filter.

          - `tool_names: Optional[List[str]]`

            List of allowed tool names.

      - `authorization: Optional[str]`

        An OAuth access token that can be used with a remote MCP server, either
        with a custom MCP server URL or a service connector. Your application
        must handle the OAuth authorization flow and provide the token here.

      - `connector_id: Optional[Literal["connector_dropbox", "connector_gmail", "connector_googlecalendar", 5 more]]`

        Identifier for service connectors, like those available in ChatGPT. One of
        `server_url` or `connector_id` must be provided. Learn more about service
        connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

        Currently supported `connector_id` values are:

        - Dropbox: `connector_dropbox`
        - Gmail: `connector_gmail`
        - Google Calendar: `connector_googlecalendar`
        - Google Drive: `connector_googledrive`
        - Microsoft Teams: `connector_microsoftteams`
        - Outlook Calendar: `connector_outlookcalendar`
        - Outlook Email: `connector_outlookemail`
        - SharePoint: `connector_sharepoint`

        - `"connector_dropbox"`

        - `"connector_gmail"`

        - `"connector_googlecalendar"`

        - `"connector_googledrive"`

        - `"connector_microsoftteams"`

        - `"connector_outlookcalendar"`

        - `"connector_outlookemail"`

        - `"connector_sharepoint"`

      - `defer_loading: Optional[bool]`

        Whether this MCP tool is deferred and discovered via tool search.

      - `headers: Optional[Dict[str, str]]`

        Optional HTTP headers to send to the MCP server. Use for authentication
        or other purposes.

      - `require_approval: Optional[McpRequireApproval]`

        Specify which of the MCP server's tools require approval.

        - `class McpRequireApprovalMcpToolApprovalFilter: …`

          Specify which of the MCP server's tools require approval. Can be
          `always`, `never`, or a filter object associated with tools
          that require approval.

          - `always: Optional[McpRequireApprovalMcpToolApprovalFilterAlways]`

            A filter object to specify which tools are allowed.

            - `read_only: Optional[bool]`

              Indicates whether or not a tool modifies data or is read-only. If an
              MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
              it will match this filter.

            - `tool_names: Optional[List[str]]`

              List of allowed tool names.

          - `never: Optional[McpRequireApprovalMcpToolApprovalFilterNever]`

            A filter object to specify which tools are allowed.

            - `read_only: Optional[bool]`

              Indicates whether or not a tool modifies data or is read-only. If an
              MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
              it will match this filter.

            - `tool_names: Optional[List[str]]`

              List of allowed tool names.

        - `Literal["always", "never"]`

          Specify a single approval policy for all tools. One of `always` or
          `never`. When set to `always`, all tools will require approval. When
          set to `never`, all tools will not require approval.

          - `"always"`

          - `"never"`

      - `server_description: Optional[str]`

        Optional description of the MCP server, used to provide more context.

      - `server_url: Optional[str]`

        The URL for the MCP server. One of `server_url` or `connector_id` must be
        provided.

  - `tracing: Optional[RealtimeTracingConfig]`

    Realtime API can write session traces to the [Traces Dashboard](/logs?api=traces). Set to null to disable tracing. Once
    tracing is enabled for a session, the configuration cannot be modified.

    `auto` will create a trace for the session with default values for the
    workflow name, group id, and metadata.

    - `Literal["auto"]`

      Enables tracing and sets default values for tracing configuration options. Always `auto`.

      - `"auto"`

    - `class TracingConfiguration: …`

      Granular configuration for tracing.

      - `group_id: Optional[str]`

        The group id to attach to this trace to enable filtering and
        grouping in the Traces Dashboard.

      - `metadata: Optional[object]`

        The arbitrary metadata to attach to this trace to enable
        filtering in the Traces Dashboard.

      - `workflow_name: Optional[str]`

        The name of the workflow to attach to this trace. This is used to
        name the trace in the Traces Dashboard.

  - `truncation: Optional[RealtimeTruncation]`

    When the number of tokens in a conversation exceeds the model's input token limit, the conversation be truncated, meaning messages (starting from the oldest) will not be included in the model's context. A 32k context model with 4,096 max output tokens can only include 28,224 tokens in the context before truncation occurs.

    Clients can configure truncation behavior to truncate with a lower max token limit, which is an effective way to control token usage and cost.

    Truncation will reduce the number of cached tokens on the next turn (busting the cache), since messages are dropped from the beginning of the context. However, clients can also configure truncation to retain messages up to a fraction of the maximum context size, which will reduce the need for future truncations and thus improve the cache rate.

    Truncation can be disabled entirely, which means the server will never truncate but would instead return an error if the conversation exceeds the model's input token limit.

    - `Literal["auto", "disabled"]`

      The truncation strategy to use for the session. `auto` is the default truncation strategy. `disabled` will disable truncation and emit errors when the conversation exceeds the input token limit.

      - `"auto"`

      - `"disabled"`

    - `class RealtimeTruncationRetentionRatio: …`

      Retain a fraction of the conversation tokens when the conversation exceeds the input token limit. This allows you to amortize truncations across multiple turns, which can help improve cached token usage.

      - `retention_ratio: float`

        Fraction of post-instruction conversation tokens to retain (`0.0` - `1.0`) when the conversation exceeds the input token limit. Setting this to `0.8` means that messages will be dropped until 80% of the maximum allowed tokens are used. This helps reduce the frequency of truncations and improve cache rates.

      - `type: Literal["retention_ratio"]`

        Use retention ratio truncation.

        - `"retention_ratio"`

      - `token_limits: Optional[TokenLimits]`

        Optional custom token limits for this truncation strategy. If not provided, the model's default token limits will be used.

        - `post_instructions: Optional[int]`

          Maximum tokens allowed in the conversation after instructions (which including tool definitions). For example, setting this to 5,000 would mean that truncation would occur when the conversation exceeds 5,000 tokens after instructions. This cannot be higher than the model's context window size minus the maximum output tokens.

### Returns

- `BinaryResponseContent`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
call = client.realtime.calls.create(
    sdp="sdp",
)
print(call)
content = call.read()
print(content)
```
