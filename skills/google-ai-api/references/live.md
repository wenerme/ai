> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Live API - WebSockets API reference

{% callout type="note" %}
  **Preview:** The Live API is in preview.

{% /callout %}

The Live API is a stateful API
that uses [WebSockets](https://en.wikipedia.org/wiki/WebSocket).
In this section, you'll find additional details regarding the WebSockets API.

## Methods  {% id="methods" %}

{% table %}
  * Method
  * Endpoint

  ---

  * [Starting a Live session](/api-reference/live/bidi-generate-content)
  *     {% mark class="http-wss" %}{% icon name="sync_alt" /%}`WSS`{% /mark %} `/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent`

    Opens a stateful WebSocket session for exchanging text, audio, and video with the model.


  ---

  * [Creating an ephemeral auth token](/api-reference/generate-content/create-token)
  *     {% mark class="http-post" %}{% icon name="north_east" /%}`POST`{% /mark %} `/v1beta/auth_tokens`

    Creates a token that can be used to constrain the behavior of a BidiGenerateContent session.

{% /table %}

## Data Models  {% id="data-models" %}

### ActivityEnd  {% id="BidiGenerateContentRealtimeInput.ActivityEnd" %}

Marks the end of user activity.

This type has no fields.

### ActivityHandling  {% id="ActivityHandling" %}

The different ways of handling user activity.

{% table %}
  * Value
  * Description

  ---

  * `ACTIVITY_HANDLING_UNSPECIFIED`
  * If unspecified, the default behavior is `START_OF_ACTIVITY_INTERRUPTS`.

  ---

  * `START_OF_ACTIVITY_INTERRUPTS`
  * If true, start of activity will interrupt the model's response (also called "barge in"). The model's current response will be cut-off in the moment of the interruption. This is the default behavior.

  ---

  * `NO_INTERRUPTION`
  * The model's response will not be interrupted.
{% /table %}

### ActivityStart  {% id="BidiGenerateContentRealtimeInput.ActivityStart" %}

Marks the start of user activity.

This type has no fields.

### AudioTranscriptionConfig  {% id="AudioTranscriptionConfig" %}

The audio transcription configuration.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `languageCodes[]`
  * `string`
  * Optional. BCP-47 language codes providing hints about the languages present in the audio. If omitted or empty, defaults to automatic language detection.

  ---

  * `customVocabulary[]`
  * `string`
  * Optional. A list of custom vocabulary phrases to bias the speech recognition model toward recognizing specific terms (product names, proper nouns, jargon).

  ---

  * `wordTimestamp`
  * `bool`
  * Optional. Configures word-level timestamp generation.

  ---

  * `diarization`
  * `bool`
  * Optional. Configures speaker diarization.

  ---

  * `sourceText`
  * `string`
  * Optional. The source text to be edited or rewritten via voice instructions. When provided in `SMART` mode, the model evaluates the audio input against this text and emits the complete replacement text in the candidate response rather than appending to it.

  ---

  * `mode`
  * [`Mode`](/api-reference/live#AudioTranscriptionConfig.Mode)
  * Optional. Configures transcription mode. Supported values: `VERBATIM`, `SMART`. If unspecified, defaults to `VERBATIM` transcription. In `SMART` mode, the model performs disfluency removal (eliminating filler words, repetitions, and false starts), light grammatical cleanup, automatic formatting (paragraphs, bullet points, numbered lists), and minor user edits (inline self-corrections). Timestamps and diarization are incompatible with mode `SMART`.
{% /table %}

### Mode  {% id="AudioTranscriptionConfig.Mode" %}

Transcription mode.

{% table %}
  * Value
  * Description

  ---

  * `MODE_UNSPECIFIED`
  * Unspecified transcription mode.

  ---

  * `VERBATIM`
  * Verbatim transcription mode.

  ---

  * `SMART`
  * Smart transcription mode.
{% /table %}

### AutomaticActivityDetection  {% id="RealtimeInputConfig.AutomaticActivityDetection" %}

Configures automatic detection of activity.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `disabled`
  * `bool`
  * Optional. If enabled (the default), detected voice and text input count as activity. If disabled, the client must send activity signals.

  ---

  * `startOfSpeechSensitivity`
  * [`StartSensitivity`](/api-reference/live#RealtimeInputConfig.AutomaticActivityDetection.StartSensitivity)
  * Optional. Determines how likely speech is to be detected.

  ---

  * `prefixPaddingMs`
  * `int32`
  * Optional. The required duration of detected speech before start-of-speech is committed. The lower this value, the more sensitive the start-of-speech detection is and shorter speech can be recognized. However, this also increases the probability of false positives.

  ---

  * `endOfSpeechSensitivity`
  * [`EndSensitivity`](/api-reference/live#RealtimeInputConfig.AutomaticActivityDetection.EndSensitivity)
  * Optional. Determines how likely detected speech is ended.

  ---

  * `silenceDurationMs`
  * `int32`
  * Optional. The required duration of detected non-speech (e.g. silence) before end-of-speech is committed. The larger this value, the longer speech gaps can be without interrupting the user's activity but this will increase the model's latency.
{% /table %}

### BidiGenerateContentClientContent  {% id="BidiGenerateContentClientContent" %}

Incremental update of the current conversation delivered from the client. All of the content here is unconditionally appended to the conversation history and used as part of the prompt to the model to generate content.

A message here will interrupt any current model generation.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `turns[]`
  * [`Content`](/api-reference/generate-content#Resource:Content)
  *     Optional. The content appended to the current conversation with the model.

    For single-turn queries, this is a single instance. For multi-turn queries, this is a repeated field that contains conversation history and the latest request.


  ---

  * `turnComplete`
  * `bool`
  * Optional. If true, indicates that the server content generation should start with the currently accumulated prompt. Otherwise, the server awaits additional messages before starting generation.
{% /table %}

### BidiGenerateContentRealtimeInput  {% id="BidiGenerateContentRealtimeInput" %}

User input that is sent in real time.

The different modalities (audio, video and text) are handled as concurrent streams. The ordering across these streams is not guaranteed.

This is different from [`BidiGenerateContentClientContent`](/api-reference/live#BidiGenerateContentClientContent) in a few ways:

- Can be sent continuously without interruption to model generation.
- If there is a need to mix data interleaved across the [`BidiGenerateContentClientContent`](/api-reference/live#BidiGenerateContentClientContent) and the [`BidiGenerateContentRealtimeInput`](/api-reference/live#BidiGenerateContentRealtimeInput), the server attempts to optimize for best response, but there are no guarantees.
- End of turn is not explicitly specified, but is rather derived from user activity (for example, end of speech).
- Even before the end of turn, the data is processed incrementally to optimize for a fast start of the response from the model.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `mediaChunks[]`
  * [`Blob`](/api-reference/generate-content)
  *     Optional. Inlined bytes data for media input. Multiple `mediaChunks` are not supported, all but the first will be ignored.

    DEPRECATED: Use one of `audio`, `video`, or `text` instead.


  ---

  * `audio`
  * [`Blob`](/api-reference/generate-content)
  * Optional. These form the realtime audio input stream.

  ---

  * `video`
  * [`Blob`](/api-reference/generate-content)
  * Optional. These form the realtime video input stream.

  ---

  * `activityStart`
  * [`ActivityStart`](/api-reference/live#BidiGenerateContentRealtimeInput.ActivityStart)
  * Optional. Marks the start of user activity. This can only be sent if automatic (i.e. server-side) activity detection is disabled.

  ---

  * `activityEnd`
  * [`ActivityEnd`](/api-reference/live#BidiGenerateContentRealtimeInput.ActivityEnd)
  * Optional. Marks the end of user activity. This can only be sent if automatic (i.e. server-side) activity detection is disabled.

  ---

  * `mediaResolution`
  * [`MediaResolution`](/api-reference/generate-content)
  * Optional. The media resolution to use. If not specified, `setup.generationConfig.mediaResolution` is used or a default if the setup is not provided.

  ---

  * `audioStreamEnd`
  * `bool`
  *     Optional. Indicates that the audio stream has ended, e.g. because the microphone was turned off.

    This should only be sent when automatic activity detection is enabled (which is the default).

    The client can reopen the stream by sending an audio message.


  ---

  * `text`
  * `string`
  * Optional. These form the realtime text input stream.
{% /table %}

### BidiGenerateContentServerContent  {% id="BidiGenerateContentServerContent" %}

Incremental server update generated by the model in response to client messages.

Content is generated as quickly as possible, and not in real time. Clients may choose to buffer and play it out in real time.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `generationComplete`
  * `bool`
  *     Output only. If true, indicates that the model is done generating.

    When model is interrupted while generating there will be no 'generation_complete' message in interrupted turn, it will go through 'interrupted > turn_complete'.

    When model assumes realtime playback there will be delay between generation_complete and turn_complete that is caused by model waiting for playback to finish.


  ---

  * `turnComplete`
  * `bool`
  * Output only. If true, indicates that the model has completed its turn. Generation will only start in response to additional client messages. Note when playback status reporting is enabled, this is emitted only when the playback status indicates that the playback is done. Future playback status of the same generation will be ignored.

  ---

  * `interrupted`
  * `bool`
  * Output only. If true, indicates that a client message has interrupted current model generation. If the client is playing out the content in real time, this is a good signal to stop and empty the current playback queue.

  ---

  * `groundingMetadata`
  * [`GroundingMetadata`](/api-reference/generate-content)
  * Output only. Grounding metadata for the generated content.

  ---

  * `inputTranscription`
  * [`BidiGenerateContentTranscription`](/api-reference/live#BidiGenerateContentTranscription)
  * Output only. Input audio transcription. The transcription is sent independently of the other server messages and there is no guaranteed ordering.

  ---

  * `interimInputTranscription`
  * [`BidiGenerateContentTranscription`](/api-reference/live#BidiGenerateContentTranscription)
  * Output only. Low latency transcription updated while the user is speaking. This field is subject to frequent updates.

  ---

  * `outputTranscription`
  * [`BidiGenerateContentTranscription`](/api-reference/live#BidiGenerateContentTranscription)
  * Output only. Output audio transcription. These transcriptions are part of the Generation output of the server. The last output transcription of this turn is sent before either `generationComplete` or `interrupted`, which in turn are followed by `turnComplete`. There is no guaranteed exact ordering between transcriptions and other `modelTurn` output but the server tries to send the transcripts close to the corresponding audio output.

  ---

  * `urlContextMetadata`
  * [`UrlContextMetadata`](/api-reference/live#UrlContextMetadata)
  * 

  ---

  * `waitingForInput`
  * `bool`
  * Output only. If true, indicates that the model is not generating content because it is waiting for more input from the user, e.g. because it expects the user to continue talking.

  ---

  * `interactionStatus`
  * [`InteractionStatus`](/api-reference/live#BidiGenerateContentServerContent.InteractionStatus)
  * Output only. The current activity status of the live session. Always sent alongside `turnComplete`.

  ---

  * `modelTurn`
  * [`Content`](/api-reference/generate-content#Resource:Content)
  * Output only. The content that the model has generated as part of the current conversation with the user.
{% /table %}

### BidiGenerateContentServerMessage  {% id="BidiGenerateContentServerMessage" %}

Response message for the BidiGenerateContent call.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `usageMetadata`
  * [`UsageMetadata`](/api-reference/live#UsageMetadata)
  * Output only. Usage metadata about the response(s).

  ---

  * `voiceActivity`
  * [`VoiceActivity`](/api-reference/live#VoiceActivity)
  * Output only. Voice activity detected in audio stream.
{% /table %}

Union field `messageType`. The type of the message. `messageType` can be only one of the following:

{% table %}
  * Field
  * Type
  * Description

  ---

  * `setupComplete`
  * [`BidiGenerateContentSetupComplete`](/api-reference/live#BidiGenerateContentSetupComplete)
  * Output only. Sent in response to a `BidiGenerateContentSetup` message from the client when setup is complete.

  ---

  * `serverContent`
  * [`BidiGenerateContentServerContent`](/api-reference/live#BidiGenerateContentServerContent)
  * Output only. Content generated by the model in response to client messages.

  ---

  * `toolCall`
  * [`BidiGenerateContentToolCall`](/api-reference/live#BidiGenerateContentToolCall)
  * Output only. Request for the client to execute the `functionCalls` and return the responses with the matching `id`s.

  ---

  * `toolCallCancellation`
  * [`BidiGenerateContentToolCallCancellation`](/api-reference/live#BidiGenerateContentToolCallCancellation)
  * Output only. Notification for the client that a previously issued `ToolCallMessage` with the specified `id`s should be cancelled.

  ---

  * `goAway`
  * [`GoAway`](/api-reference/live#GoAway)
  * Output only. A notice that the server will soon disconnect.

  ---

  * `sessionResumptionUpdate`
  * [`SessionResumptionUpdate`](/api-reference/live#SessionResumptionUpdate)
  * Output only. Update of the session resumption state.
{% /table %}

### BidiGenerateContentSetup  {% id="BidiGenerateContentSetup" %}

Message to be sent in the first (and only in the first) `BidiGenerateContentClientMessage`. Contains configuration that will apply for the duration of the streaming RPC.

Clients should wait for a `BidiGenerateContentSetupComplete` message before sending any additional messages.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `model`
  * `string`
  *     Required. The model's resource name. This serves as an ID for the Model to use.

    Format: `models/{model}`


  ---

  * `generationConfig`
  * [`GenerationConfig`](/api-reference/generate-content)
  *     Optional. Generation config.

    The following fields are not supported:

    - `responseLogprobs`
    - `responseMimeType`
    - `logprobs`
    - `responseSchema`
    - `responseJsonSchema`
    - `stopSequence`
    - `skipResponseCache`
    - `routingConfig`
    - `audioTimestamp`


  ---

  * `systemInstruction`
  * [`Content`](/api-reference/generate-content#Resource:Content)
  *     Optional. The user provided system instructions for the model.

    Note: Only text should be used in parts and content in each part will be in a separate paragraph.


  ---

  * `tools[]`
  * [`Tool`](/api-reference/generate-content#Resource:Tool)
  *     Optional. A list of `Tools` the model may use to generate the next response.

    A `Tool` is a piece of code that enables the system to interact with external systems to perform an action, or set of actions, outside of knowledge and scope of the model.


  ---

  * `realtimeInputConfig`
  * [`RealtimeInputConfig`](/api-reference/live#RealtimeInputConfig)
  * Optional. Configures the handling of realtime input.

  ---

  * `sessionResumption`
  * [`SessionResumptionConfig`](/api-reference/live#SessionResumptionConfig)
  *     Optional. Configures session resumption mechanism.

    If included, the server will send `SessionResumptionUpdate` messages.


  ---

  * `contextWindowCompression`
  * [`ContextWindowCompressionConfig`](/api-reference/live#ContextWindowCompressionConfig)
  *     Optional. Configures a context window compression mechanism.

    If included, the server will automatically reduce the size of the context when it exceeds the configured length.


  ---

  * `inputAudioTranscription`
  * [`AudioTranscriptionConfig`](/api-reference/live#AudioTranscriptionConfig)
  * Optional. If set, enables transcription of voice input. The transcription aligns with the input audio language, if configured.

  ---

  * `outputAudioTranscription`
  * [`AudioTranscriptionConfig`](/api-reference/live#AudioTranscriptionConfig)
  * Optional. If set, enables transcription of the model's audio output. The transcription aligns with the language code specified for the output audio, if configured.

  ---

  * `proactivity`
  * [`ProactivityConfig`](/api-reference/live#ProactivityConfig)
  *     Optional. Configures the proactivity of the model.

    This allows the model to respond proactively to the input and to ignore irrelevant input.


  ---

  * `historyConfig`
  * [`HistoryConfig`](/api-reference/live#HistoryConfig)
  * Optional. Configures the exchange of history between the client and the server.

  ---

  * `labels`
  * `map<string, string>`
  *     Optional. Labels with user-defined metadata for the request.

    Optional. Labels must follow standard unified Cloud label requirements: - Label keys must start with a letter. - Label keys and values can be no longer than 63 characters (Unicode codepoints) and can only contain lowercase letters, numeric characters, underscores, and dashes. - International characters are allowed.

    Usage: - Safety identifiers from aggregators: Use the key `safety_identifier` (e.g. `{"safety_identifier": "user_session_123"}`)

{% /table %}

### BidiGenerateContentSetupComplete  {% id="BidiGenerateContentSetupComplete" %}

Sent in response to a `BidiGenerateContentSetup` message from the client.

This type has no fields.

### BidiGenerateContentToolCall  {% id="BidiGenerateContentToolCall" %}

Request for the client to execute the `functionCalls` and return the responses with the matching `id`s.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `functionCalls[]`
  * [`FunctionCall`](/api-reference/generate-content)
  * Output only. The function call to be executed.
{% /table %}

### BidiGenerateContentToolCallCancellation  {% id="BidiGenerateContentToolCallCancellation" %}

Notification for the client that a previously issued `ToolCallMessage` with the specified `id`s should not have been executed and should be cancelled. If there were side-effects to those tool calls, clients may attempt to undo the tool calls. This message occurs only in cases where the clients interrupt server turns.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `ids[]`
  * `string`
  * Output only. The ids of the tool calls to be cancelled.
{% /table %}

### BidiGenerateContentToolResponse  {% id="BidiGenerateContentToolResponse" %}

Client generated response to a `ToolCall` received from the server. Individual `FunctionResponse` objects are matched to the respective `FunctionCall` objects by the `id` field.

Note that in the unary and server-streaming GenerateContent APIs function calling happens by exchanging the `Content` parts, while in the bidi GenerateContent APIs function calling happens over these dedicated set of messages.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `functionResponses[]`
  * [`FunctionResponse`](/api-reference/generate-content)
  * Optional. The response to the function calls.
{% /table %}

### BidiGenerateContentTranscription  {% id="BidiGenerateContentTranscription" %}

Transcription of audio (input or output).

{% table %}
  * Field
  * Type
  * Description

  ---

  * `text`
  * `string`
  * Transcription text.

  ---

  * `languageCode`
  * `string`
  * The BCP-47 language code of the transcription.

  ---

  * `startOffset`
  * [`Duration`](https://protobuf.dev/reference/protobuf/google.protobuf/#duration)
  * Optional. Start offset in time of the transcription relative to the start of the audio.

  ---

  * `endOffset`
  * [`Duration`](https://protobuf.dev/reference/protobuf/google.protobuf/#duration)
  * Optional. End offset in time of the transcription relative to the start of the audio.
{% /table %}

### ContextWindowCompressionConfig  {% id="ContextWindowCompressionConfig" %}

Enables context window compression — a mechanism for managing the model's context window so that it does not exceed a given length.

Union field `compressionMechanism`. The context window compression mechanism used. `compressionMechanism` can be only one of the following:

{% table %}
  * Field
  * Type
  * Description

  ---

  * `slidingWindow`
  * [`SlidingWindow`](/api-reference/live#ContextWindowCompressionConfig.SlidingWindow)
  * A sliding-window mechanism.

  ---

  * `triggerTokens`
  * `int64`
  *     The number of tokens (before running a turn) required to trigger a context window compression.

    This can be used to balance quality against latency as shorter context windows may result in faster model responses. However, any compression operation will cause a temporary latency increase, so they should not be triggered frequently.

    If not set, the default is 80% of the model's context window limit. This leaves 20% for the next user request/model response.

{% /table %}

### EndSensitivity  {% id="RealtimeInputConfig.AutomaticActivityDetection.EndSensitivity" %}

Determines how end of speech is detected.

{% table %}
  * Value
  * Description

  ---

  * `END_SENSITIVITY_UNSPECIFIED`
  * The default is END_SENSITIVITY_HIGH.

  ---

  * `END_SENSITIVITY_HIGH`
  * Automatic detection ends speech more often.

  ---

  * `END_SENSITIVITY_LOW`
  * Automatic detection ends speech less often.
{% /table %}

### GoAway  {% id="GoAway" %}

A notice that the server will soon disconnect.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `timeLeft`
  * [`Duration`](https://protobuf.dev/reference/protobuf/google.protobuf/#duration)
  *     The remaining time before the connection will be terminated as ABORTED.

    This duration will never be less than a model-specific minimum, which will be specified together with the rate limits for the model.

{% /table %}

### HistoryConfig  {% id="HistoryConfig" %}

History configuration.

This message is included in the session configuration as `BidiGenerateContentSetup.historyConfig`. Configures the exchange of history messages.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `initialHistoryInClientContent`
  * `bool`
  * Optional. If true, after sending `setupComplete`, the server will wait and at first process `clientContent` messages until `turnComplete` is `true`. This initial history will not trigger a model call and may end with role `MODEL`. After `turnComplete` is `true`, the client can start the realtime conversation via `realtimeInput`.
{% /table %}

### InteractionStatus  {% id="BidiGenerateContentServerContent.InteractionStatus" %}

The different activity states of the live session. This field is always sent together with `turnComplete` to indicate whether the server has finished all processing.

{% table %}
  * Value
  * Description

  ---

  * `INTERACTION_STATUS_UNSPECIFIED`
  * Unspecified interaction status.

  ---

  * `IN_PROGRESS`
  * The server is still actively processing user input or running background reasoning. More model output may follow.

  ---

  * `REQUIRES_ACTION`
  * Deprecated: Use IDLE instead.

  ---

  * `IDLE`
  * The server has completed all processing and background reasoning.
{% /table %}

### ProactivityConfig  {% id="ProactivityConfig" %}

Config for proactivity features.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `proactiveAudio`
  * `bool`
  * Optional. If enabled, the model can reject responding to the last prompt. For example, this allows the model to ignore out of context speech or to stay silent if the user did not make a request, yet.

  ---

  * `proactiveVideo`
  * `bool`
  * Optional. If enabled, the system might trigger a generation on each received image. This requires that `proactiveAudio` is enabled. The rate of generation depends on the rate of incoming images and can cause a significant increase in cost.
{% /table %}

### RealtimeInputConfig  {% id="RealtimeInputConfig" %}

Configures the realtime input behavior in `BidiGenerateContent`.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `automaticActivityDetection`
  * [`AutomaticActivityDetection`](/api-reference/live#RealtimeInputConfig.AutomaticActivityDetection)
  * Optional. If not set, automatic activity detection is enabled by default. If automatic voice detection is disabled, the client must send activity signals.

  ---

  * `activityHandling`
  * [`ActivityHandling`](/api-reference/live#ActivityHandling)
  * Optional. Defines what effect activity has.

  ---

  * `turnCoverage`
  * [`TurnCoverage`](/api-reference/live#RealtimeInputConfig.TurnCoverage)
  * Optional. Defines which input is included in the user's turn.

  ---

  * `interimTranscriptTimestampEnabled`
  * `bool`
  * Optional. Configures interim transcript timestamps.
{% /table %}

### SessionResumptionConfig  {% id="SessionResumptionConfig" %}

Session resumption configuration.

This message is included in the session configuration as `BidiGenerateContentSetup.sessionResumption`. If configured, the server will send `SessionResumptionUpdate` messages.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `handle`
  * `string`
  *     The handle of a previous session. If not present then a new session is created.

    Session handles come from `SessionResumptionUpdate.token` values in previous connections.

{% /table %}

### SessionResumptionUpdate  {% id="SessionResumptionUpdate" %}

Update of the session resumption state.

Only sent if `BidiGenerateContentSetup.sessionResumption` was set.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `newHandle`
  * `string`
  * New handle that represents a state that can be resumed. Empty if `resumable`=false.

  ---

  * `resumable`
  * `bool`
  *     True if the current session can be resumed at this point.

    Resumption is not possible at some points in the session. For example, when the model is executing function calls or generating. Resuming the session (using a previous session token) in such a state will result in some data loss. In these cases, `newHandle` will be empty and `resumable` will be false.

{% /table %}

### SlidingWindow  {% id="ContextWindowCompressionConfig.SlidingWindow" %}

The SlidingWindow method operates by discarding content at the beginning of the context window. The resulting context will always begin at the start of a USER role turn. System instructions and any `BidiGenerateContentSetup.prefixTurns` will always remain at the beginning of the result.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `targetTokens`
  * `int64`
  *     The target number of tokens to keep. The default value is trigger_tokens/2.

    Discarding parts of the context window causes a temporary latency increase so this value should be calibrated to avoid frequent compression operations.

{% /table %}

### StartSensitivity  {% id="RealtimeInputConfig.AutomaticActivityDetection.StartSensitivity" %}

Determines how start of speech is detected.

{% table %}
  * Value
  * Description

  ---

  * `START_SENSITIVITY_UNSPECIFIED`
  * The default is START_SENSITIVITY_HIGH.

  ---

  * `START_SENSITIVITY_HIGH`
  * Automatic detection will detect the start of speech more often.

  ---

  * `START_SENSITIVITY_LOW`
  * Automatic detection will detect the start of speech less often.
{% /table %}

### TurnCoverage  {% id="RealtimeInputConfig.TurnCoverage" %}

Options about which input is included in the user's turn.

{% table %}
  * Value
  * Description

  ---

  * `TURN_COVERAGE_UNSPECIFIED`
  * If unspecified, a default behavior is selected based on the model. E.g., for Gemini 2.5, the default is `TURN_INCLUDES_ONLY_ACTIVITY`, while for Gemini 3.1 and onwards, it's `TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO`.

  ---

  * `TURN_INCLUDES_ONLY_ACTIVITY`
  * Includes activity since the last turn, excluding inactivity (e.g. silence on the audio stream).

  ---

  * `TURN_INCLUDES_ALL_INPUT`
  * Includes all realtime input since the last turn, including inactivity (e.g. silence on the audio stream).

  ---

  * `TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO`
  * Includes audio activity and all video since the last turn. With automatic activity detection, audio activity means speech and excludes silence.
{% /table %}

### TranslationConfig  {% id="TranslationConfig" %}

Config for translation features.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `targetLanguageCode`
  * `string`
  * Required. The target language for translation. Supported values are BCP-47 language codes (e.g. "en", "es", "fr").

  ---

  * `echoTargetLanguage`
  * `bool`
  * Optional. If true, the model will generate audio when the target language is spoken, essentially it will parrot the input. If false, we will not produce audio for the target language.
{% /table %}

### UrlContextMetadata  {% id="UrlContextMetadata" %}

Metadata related to url context retrieval tool.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `urlMetadata[]`
  * [`UrlMetadata`](/api-reference/generate-content)
  * List of url context.
{% /table %}

### UsageMetadata  {% id="UsageMetadata" %}

Usage metadata about response(s).

{% table %}
  * Field
  * Type
  * Description

  ---

  * `promptTokenCount`
  * `int32`
  * Output only. Number of tokens in the prompt. When `cachedContent` is set, this is still the total effective prompt size meaning this includes the number of tokens in the cached content.

  ---

  * `cachedContentTokenCount`
  * `int32`
  * Number of tokens in the cached part of the prompt (the cached content)

  ---

  * `responseTokenCount`
  * `int32`
  * Output only. Total number of tokens across all the generated response candidates.

  ---

  * `toolUsePromptTokenCount`
  * `int32`
  * Output only. Number of tokens present in tool-use prompt(s).

  ---

  * `thoughtsTokenCount`
  * `int32`
  * Output only. Number of tokens of thoughts for thinking models.

  ---

  * `totalTokenCount`
  * `int32`
  * Output only. Total token count for the generation request (prompt + response candidates).

  ---

  * `promptTokensDetails[]`
  * [`ModalityTokenCount`](/api-reference/generate-content#Resource:ModalityTokenCount)
  * Output only. List of modalities that were processed in the request input.

  ---

  * `cacheTokensDetails[]`
  * [`ModalityTokenCount`](/api-reference/generate-content#Resource:ModalityTokenCount)
  * Output only. List of modalities of the cached content in the request input.

  ---

  * `responseTokensDetails[]`
  * [`ModalityTokenCount`](/api-reference/generate-content#Resource:ModalityTokenCount)
  * Output only. List of modalities that were returned in the response.

  ---

  * `toolUsePromptTokensDetails[]`
  * [`ModalityTokenCount`](/api-reference/generate-content#Resource:ModalityTokenCount)
  * Output only. List of modalities that were processed for tool-use request inputs.
{% /table %}

### VoiceActivity  {% id="VoiceActivity" %}

Voice activity detected in audio stream.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `type`
  * [`Type`](/api-reference/live#VoiceActivity.Type)
  * Output only. The type of the VAD(voice activity detection) signal.

  ---

  * `audioOffset`
  * [`Duration`](https://protobuf.dev/reference/protobuf/google.protobuf/#duration)
  * Output only. The time voice activity detected in audio time, relative to the start of the audio stream.
{% /table %}

### Type  {% id="VoiceActivity.Type" %}

The type of the VAD signal.

{% table %}
  * Value
  * Description

  ---

  * `TYPE_UNSPECIFIED`
  * The default is UNSPECIFIED.

  ---

  * `ACTIVITY_START`
  * Start of sentence signal.

  ---

  * `ACTIVITY_END`
  * End of sentence signal.
{% /table %}

## Ephemeral authentication tokens  {% id="ephemeral-auth-tokens" %}

Ephemeral authentication tokens can be obtained by calling
`AuthTokenService.CreateToken` and then used with
`GenerativeService.BidiGenerateContentConstrained`, either by passing the token
in an `access_token` query parameter, or in an HTTP `Authorization` header with
"`Token `" prefixed to it.

### CreateAuthTokenRequest  {% id="CreateAuthTokenRequest" %}

Create an ephemeral authentication token.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `authToken`
  * [`AuthToken`](/api-reference/live#AuthToken)
  * Required. The token to create.
{% /table %}

### AuthToken  {% id="AuthToken" %}

A request to create an ephemeral authentication token.

{% table %}
  * Field
  * Type
  * Description

  ---

  * `name`
  * `string`
  * Output only. Identifier. The token itself.

  ---

  * `expireTime`
  * [`Timestamp`](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp)
  *     Optional. Input only. Immutable. An optional time after which, when using the resulting token, messages in BidiGenerateContent sessions will be rejected. (Gemini may preemptively close the session after this time.)

    If not set then this defaults to 30 minutes in the future. If set, this value must be less than 20 hours in the future.


  ---

  * `newSessionExpireTime`
  * [`Timestamp`](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp)
  *     Optional. Input only. Immutable. The time after which new Live API sessions using the token resulting from this request will be rejected.

    If not set this defaults to 60 seconds in the future. If set, this value must be less than 20 hours in the future.


  ---

  * `fieldMask`
  * [`FieldMask`](https://protobuf.dev/reference/protobuf/google.protobuf/#field-mask)
  *     Optional. Input only. Immutable. If field_mask is empty, and `bidiGenerateContentSetup` is not present, then the effective `BidiGenerateContentSetup` message is taken from the Live API connection.

    If field_mask is empty, and `bidiGenerateContentSetup` *is* present, then the effective `BidiGenerateContentSetup` message is taken entirely from `bidiGenerateContentSetup` in this request. The setup message from the Live API connection is ignored.

    If field_mask is not empty, then the corresponding fields from `bidiGenerateContentSetup` will overwrite the fields from the setup message in the Live API connection.

{% /table %}

Union field `config`. The method-specific configuration for the resulting token. `config` can be only one of the following:

{% table %}
  * Field
  * Type
  * Description

  ---

  * `bidiGenerateContentSetup`
  * [`BidiGenerateContentSetup`](/api-reference/live#BidiGenerateContentSetup)
  * Optional. Input only. Immutable. Configuration specific to `BidiGenerateContent`.

  ---

  * `uses`
  * `int32`
  * Optional. Input only. Immutable. The number of times the token can be used. If this value is zero then no limit is applied. Resuming a Live API session does not count as a use. If unspecified, the default is 1.
{% /table %}

## More information on common types  {% id="more-info" %}

For more information on the commonly-used API resource types `Blob`,
`Content`, `FunctionCall`, `FunctionResponse`, `GenerationConfig`,
`GroundingMetadata`, `ModalityTokenCount`, and `Tool`, see
[Generating content](/api-reference/generate-content).

