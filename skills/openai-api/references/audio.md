# Audio

## Domain Types

### Audio Model

- `AudioModel = "whisper-1" or "gpt-4o-transcribe" or "gpt-4o-mini-transcribe" or 2 more`

  - `"whisper-1"`

  - `"gpt-4o-transcribe"`

  - `"gpt-4o-mini-transcribe"`

  - `"gpt-4o-mini-transcribe-2025-12-15"`

  - `"gpt-4o-transcribe-diarize"`

### Audio Response Format

- `AudioResponseFormat = "json" or "text" or "srt" or 3 more`

  The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, `vtt`, or `diarized_json`. For `gpt-4o-transcribe` and `gpt-4o-mini-transcribe`, the only supported format is `json`. For `gpt-4o-transcribe-diarize`, the supported formats are `json`, `text`, and `diarized_json`, with `diarized_json` required to receive speaker annotations.

  - `"json"`

  - `"text"`

  - `"srt"`

  - `"verbose_json"`

  - `"vtt"`

  - `"diarized_json"`

# Transcriptions

## Create

**post** `/audio/transcriptions`

Transcribes audio into the input language.

Returns a transcription object in `json`, `diarized_json`, or `verbose_json`
format, or a stream of transcript events.

### Returns

- `Transcription = object { text, logprobs, usage }`

  Represents a transcription response returned by model, based on the provided input.

  - `text: string`

    The transcribed text.

  - `logprobs: optional array of object { token, bytes, logprob }`

    The log probabilities of the tokens in the transcription. Only returned with the models `gpt-4o-transcribe` and `gpt-4o-mini-transcribe` if `logprobs` is added to the `include` array.

    - `token: optional string`

      The token in the transcription.

    - `bytes: optional array of number`

      The bytes of the token.

    - `logprob: optional number`

      The log probability of the token.

  - `usage: optional object { input_tokens, output_tokens, total_tokens, 2 more }  or object { seconds, type }`

    Token usage statistics for the request.

    - `TokenUsage = object { input_tokens, output_tokens, total_tokens, 2 more }`

      Usage statistics for models billed by token usage.

      - `input_tokens: number`

        Number of input tokens billed for this request.

      - `output_tokens: number`

        Number of output tokens generated.

      - `total_tokens: number`

        Total number of tokens used (input + output).

      - `type: "tokens"`

        The type of the usage object. Always `tokens` for this variant.

        - `"tokens"`

      - `input_token_details: optional object { audio_tokens, text_tokens }`

        Details about the input tokens billed for this request.

        - `audio_tokens: optional number`

          Number of audio tokens billed for this request.

        - `text_tokens: optional number`

          Number of text tokens billed for this request.

    - `DurationUsage = object { seconds, type }`

      Usage statistics for models billed by audio input duration.

      - `seconds: number`

        Duration of the input audio in seconds.

      - `type: "duration"`

        The type of the usage object. Always `duration` for this variant.

        - `"duration"`

- `TranscriptionDiarized = object { duration, segments, task, 2 more }`

  Represents a diarized transcription response returned by the model, including the combined transcript and speaker-segment annotations.

  - `duration: number`

    Duration of the input audio in seconds.

  - `segments: array of TranscriptionDiarizedSegment`

    Segments of the transcript annotated with timestamps and speaker labels.

    - `id: string`

      Unique identifier for the segment.

    - `end: number`

      End timestamp of the segment in seconds.

    - `speaker: string`

      Speaker label for this segment. When known speakers are provided, the label matches `known_speaker_names[]`. Otherwise speakers are labeled sequentially using capital letters (`A`, `B`, ...).

    - `start: number`

      Start timestamp of the segment in seconds.

    - `text: string`

      Transcript text for this segment.

    - `type: "transcript.text.segment"`

      The type of the segment. Always `transcript.text.segment`.

      - `"transcript.text.segment"`

  - `task: "transcribe"`

    The type of task that was run. Always `transcribe`.

    - `"transcribe"`

  - `text: string`

    The concatenated transcript text for the entire audio input.

  - `usage: optional object { input_tokens, output_tokens, total_tokens, 2 more }  or object { seconds, type }`

    Token or duration usage statistics for the request.

    - `Tokens = object { input_tokens, output_tokens, total_tokens, 2 more }`

      Usage statistics for models billed by token usage.

      - `input_tokens: number`

        Number of input tokens billed for this request.

      - `output_tokens: number`

        Number of output tokens generated.

      - `total_tokens: number`

        Total number of tokens used (input + output).

      - `type: "tokens"`

        The type of the usage object. Always `tokens` for this variant.

        - `"tokens"`

      - `input_token_details: optional object { audio_tokens, text_tokens }`

        Details about the input tokens billed for this request.

        - `audio_tokens: optional number`

          Number of audio tokens billed for this request.

        - `text_tokens: optional number`

          Number of text tokens billed for this request.

    - `Duration = object { seconds, type }`

      Usage statistics for models billed by audio input duration.

      - `seconds: number`

        Duration of the input audio in seconds.

      - `type: "duration"`

        The type of the usage object. Always `duration` for this variant.

        - `"duration"`

- `TranscriptionVerbose = object { duration, language, text, 3 more }`

  Represents a verbose json transcription response returned by model, based on the provided input.

  - `duration: number`

    The duration of the input audio.

  - `language: string`

    The language of the input audio.

  - `text: string`

    The transcribed text.

  - `segments: optional array of TranscriptionSegment`

    Segments of the transcribed text and their corresponding details.

    - `id: number`

      Unique identifier of the segment.

    - `avg_logprob: number`

      Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.

    - `compression_ratio: number`

      Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.

    - `end: number`

      End time of the segment in seconds.

    - `no_speech_prob: number`

      Probability of no speech in the segment. If the value is higher than 1.0 and the `avg_logprob` is below -1, consider this segment silent.

    - `seek: number`

      Seek offset of the segment.

    - `start: number`

      Start time of the segment in seconds.

    - `temperature: number`

      Temperature parameter used for generating the segment.

    - `text: string`

      Text content of the segment.

    - `tokens: array of number`

      Array of token IDs for the text content.

  - `usage: optional object { seconds, type }`

    Usage statistics for models billed by audio input duration.

    - `seconds: number`

      Duration of the input audio in seconds.

    - `type: "duration"`

      The type of the usage object. Always `duration` for this variant.

      - `"duration"`

  - `words: optional array of TranscriptionWord`

    Extracted words and their corresponding timestamps.

    - `end: number`

      End time of the word in seconds.

    - `start: number`

      Start time of the word in seconds.

    - `word: string`

      The text content of the word.

### Example

```http
curl https://api.openai.com/v1/audio/transcriptions \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F 'file=@/path/to/file' \
    -F model=gpt-4o-transcribe
```

## Domain Types

### Transcription

- `Transcription = object { text, logprobs, usage }`

  Represents a transcription response returned by model, based on the provided input.

  - `text: string`

    The transcribed text.

  - `logprobs: optional array of object { token, bytes, logprob }`

    The log probabilities of the tokens in the transcription. Only returned with the models `gpt-4o-transcribe` and `gpt-4o-mini-transcribe` if `logprobs` is added to the `include` array.

    - `token: optional string`

      The token in the transcription.

    - `bytes: optional array of number`

      The bytes of the token.

    - `logprob: optional number`

      The log probability of the token.

  - `usage: optional object { input_tokens, output_tokens, total_tokens, 2 more }  or object { seconds, type }`

    Token usage statistics for the request.

    - `TokenUsage = object { input_tokens, output_tokens, total_tokens, 2 more }`

      Usage statistics for models billed by token usage.

      - `input_tokens: number`

        Number of input tokens billed for this request.

      - `output_tokens: number`

        Number of output tokens generated.

      - `total_tokens: number`

        Total number of tokens used (input + output).

      - `type: "tokens"`

        The type of the usage object. Always `tokens` for this variant.

        - `"tokens"`

      - `input_token_details: optional object { audio_tokens, text_tokens }`

        Details about the input tokens billed for this request.

        - `audio_tokens: optional number`

          Number of audio tokens billed for this request.

        - `text_tokens: optional number`

          Number of text tokens billed for this request.

    - `DurationUsage = object { seconds, type }`

      Usage statistics for models billed by audio input duration.

      - `seconds: number`

        Duration of the input audio in seconds.

      - `type: "duration"`

        The type of the usage object. Always `duration` for this variant.

        - `"duration"`

### Transcription Diarized

- `TranscriptionDiarized = object { duration, segments, task, 2 more }`

  Represents a diarized transcription response returned by the model, including the combined transcript and speaker-segment annotations.

  - `duration: number`

    Duration of the input audio in seconds.

  - `segments: array of TranscriptionDiarizedSegment`

    Segments of the transcript annotated with timestamps and speaker labels.

    - `id: string`

      Unique identifier for the segment.

    - `end: number`

      End timestamp of the segment in seconds.

    - `speaker: string`

      Speaker label for this segment. When known speakers are provided, the label matches `known_speaker_names[]`. Otherwise speakers are labeled sequentially using capital letters (`A`, `B`, ...).

    - `start: number`

      Start timestamp of the segment in seconds.

    - `text: string`

      Transcript text for this segment.

    - `type: "transcript.text.segment"`

      The type of the segment. Always `transcript.text.segment`.

      - `"transcript.text.segment"`

  - `task: "transcribe"`

    The type of task that was run. Always `transcribe`.

    - `"transcribe"`

  - `text: string`

    The concatenated transcript text for the entire audio input.

  - `usage: optional object { input_tokens, output_tokens, total_tokens, 2 more }  or object { seconds, type }`

    Token or duration usage statistics for the request.

    - `Tokens = object { input_tokens, output_tokens, total_tokens, 2 more }`

      Usage statistics for models billed by token usage.

      - `input_tokens: number`

        Number of input tokens billed for this request.

      - `output_tokens: number`

        Number of output tokens generated.

      - `total_tokens: number`

        Total number of tokens used (input + output).

      - `type: "tokens"`

        The type of the usage object. Always `tokens` for this variant.

        - `"tokens"`

      - `input_token_details: optional object { audio_tokens, text_tokens }`

        Details about the input tokens billed for this request.

        - `audio_tokens: optional number`

          Number of audio tokens billed for this request.

        - `text_tokens: optional number`

          Number of text tokens billed for this request.

    - `Duration = object { seconds, type }`

      Usage statistics for models billed by audio input duration.

      - `seconds: number`

        Duration of the input audio in seconds.

      - `type: "duration"`

        The type of the usage object. Always `duration` for this variant.

        - `"duration"`

### Transcription Diarized Segment

- `TranscriptionDiarizedSegment = object { id, end, speaker, 3 more }`

  A segment of diarized transcript text with speaker metadata.

  - `id: string`

    Unique identifier for the segment.

  - `end: number`

    End timestamp of the segment in seconds.

  - `speaker: string`

    Speaker label for this segment. When known speakers are provided, the label matches `known_speaker_names[]`. Otherwise speakers are labeled sequentially using capital letters (`A`, `B`, ...).

  - `start: number`

    Start timestamp of the segment in seconds.

  - `text: string`

    Transcript text for this segment.

  - `type: "transcript.text.segment"`

    The type of the segment. Always `transcript.text.segment`.

    - `"transcript.text.segment"`

### Transcription Include

- `TranscriptionInclude = "logprobs"`

  - `"logprobs"`

### Transcription Segment

- `TranscriptionSegment = object { id, avg_logprob, compression_ratio, 7 more }`

  - `id: number`

    Unique identifier of the segment.

  - `avg_logprob: number`

    Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.

  - `compression_ratio: number`

    Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.

  - `end: number`

    End time of the segment in seconds.

  - `no_speech_prob: number`

    Probability of no speech in the segment. If the value is higher than 1.0 and the `avg_logprob` is below -1, consider this segment silent.

  - `seek: number`

    Seek offset of the segment.

  - `start: number`

    Start time of the segment in seconds.

  - `temperature: number`

    Temperature parameter used for generating the segment.

  - `text: string`

    Text content of the segment.

  - `tokens: array of number`

    Array of token IDs for the text content.

### Transcription Stream Event

- `TranscriptionStreamEvent = TranscriptionTextSegmentEvent or TranscriptionTextDeltaEvent or TranscriptionTextDoneEvent`

  Emitted when a diarized transcription returns a completed segment with speaker information. Only emitted when you [create a transcription](/docs/api-reference/audio/create-transcription) with `stream` set to `true` and `response_format` set to `diarized_json`.

  - `TranscriptionTextSegmentEvent = object { id, end, speaker, 3 more }`

    Emitted when a diarized transcription returns a completed segment with speaker information. Only emitted when you [create a transcription](/docs/api-reference/audio/create-transcription) with `stream` set to `true` and `response_format` set to `diarized_json`.

    - `id: string`

      Unique identifier for the segment.

    - `end: number`

      End timestamp of the segment in seconds.

    - `speaker: string`

      Speaker label for this segment.

    - `start: number`

      Start timestamp of the segment in seconds.

    - `text: string`

      Transcript text for this segment.

    - `type: "transcript.text.segment"`

      The type of the event. Always `transcript.text.segment`.

      - `"transcript.text.segment"`

  - `TranscriptionTextDeltaEvent = object { delta, type, logprobs, segment_id }`

    Emitted when there is an additional text delta. This is also the first event emitted when the transcription starts. Only emitted when you [create a transcription](/docs/api-reference/audio/create-transcription) with the `Stream` parameter set to `true`.

    - `delta: string`

      The text delta that was additionally transcribed.

    - `type: "transcript.text.delta"`

      The type of the event. Always `transcript.text.delta`.

      - `"transcript.text.delta"`

    - `logprobs: optional array of object { token, bytes, logprob }`

      The log probabilities of the delta. Only included if you [create a transcription](/docs/api-reference/audio/create-transcription) with the `include[]` parameter set to `logprobs`.

      - `token: optional string`

        The token that was used to generate the log probability.

      - `bytes: optional array of number`

        The bytes that were used to generate the log probability.

      - `logprob: optional number`

        The log probability of the token.

    - `segment_id: optional string`

      Identifier of the diarized segment that this delta belongs to. Only present when using `gpt-4o-transcribe-diarize`.

  - `TranscriptionTextDoneEvent = object { text, type, logprobs, usage }`

    Emitted when the transcription is complete. Contains the complete transcription text. Only emitted when you [create a transcription](/docs/api-reference/audio/create-transcription) with the `Stream` parameter set to `true`.

    - `text: string`

      The text that was transcribed.

    - `type: "transcript.text.done"`

      The type of the event. Always `transcript.text.done`.

      - `"transcript.text.done"`

    - `logprobs: optional array of object { token, bytes, logprob }`

      The log probabilities of the individual tokens in the transcription. Only included if you [create a transcription](/docs/api-reference/audio/create-transcription) with the `include[]` parameter set to `logprobs`.

      - `token: optional string`

        The token that was used to generate the log probability.

      - `bytes: optional array of number`

        The bytes that were used to generate the log probability.

      - `logprob: optional number`

        The log probability of the token.

    - `usage: optional object { input_tokens, output_tokens, total_tokens, 2 more }`

      Usage statistics for models billed by token usage.

      - `input_tokens: number`

        Number of input tokens billed for this request.

      - `output_tokens: number`

        Number of output tokens generated.

      - `total_tokens: number`

        Total number of tokens used (input + output).

      - `type: "tokens"`

        The type of the usage object. Always `tokens` for this variant.

        - `"tokens"`

      - `input_token_details: optional object { audio_tokens, text_tokens }`

        Details about the input tokens billed for this request.

        - `audio_tokens: optional number`

          Number of audio tokens billed for this request.

        - `text_tokens: optional number`

          Number of text tokens billed for this request.

### Transcription Text Delta Event

- `TranscriptionTextDeltaEvent = object { delta, type, logprobs, segment_id }`

  Emitted when there is an additional text delta. This is also the first event emitted when the transcription starts. Only emitted when you [create a transcription](/docs/api-reference/audio/create-transcription) with the `Stream` parameter set to `true`.

  - `delta: string`

    The text delta that was additionally transcribed.

  - `type: "transcript.text.delta"`

    The type of the event. Always `transcript.text.delta`.

    - `"transcript.text.delta"`

  - `logprobs: optional array of object { token, bytes, logprob }`

    The log probabilities of the delta. Only included if you [create a transcription](/docs/api-reference/audio/create-transcription) with the `include[]` parameter set to `logprobs`.

    - `token: optional string`

      The token that was used to generate the log probability.

    - `bytes: optional array of number`

      The bytes that were used to generate the log probability.

    - `logprob: optional number`

      The log probability of the token.

  - `segment_id: optional string`

    Identifier of the diarized segment that this delta belongs to. Only present when using `gpt-4o-transcribe-diarize`.

### Transcription Text Done Event

- `TranscriptionTextDoneEvent = object { text, type, logprobs, usage }`

  Emitted when the transcription is complete. Contains the complete transcription text. Only emitted when you [create a transcription](/docs/api-reference/audio/create-transcription) with the `Stream` parameter set to `true`.

  - `text: string`

    The text that was transcribed.

  - `type: "transcript.text.done"`

    The type of the event. Always `transcript.text.done`.

    - `"transcript.text.done"`

  - `logprobs: optional array of object { token, bytes, logprob }`

    The log probabilities of the individual tokens in the transcription. Only included if you [create a transcription](/docs/api-reference/audio/create-transcription) with the `include[]` parameter set to `logprobs`.

    - `token: optional string`

      The token that was used to generate the log probability.

    - `bytes: optional array of number`

      The bytes that were used to generate the log probability.

    - `logprob: optional number`

      The log probability of the token.

  - `usage: optional object { input_tokens, output_tokens, total_tokens, 2 more }`

    Usage statistics for models billed by token usage.

    - `input_tokens: number`

      Number of input tokens billed for this request.

    - `output_tokens: number`

      Number of output tokens generated.

    - `total_tokens: number`

      Total number of tokens used (input + output).

    - `type: "tokens"`

      The type of the usage object. Always `tokens` for this variant.

      - `"tokens"`

    - `input_token_details: optional object { audio_tokens, text_tokens }`

      Details about the input tokens billed for this request.

      - `audio_tokens: optional number`

        Number of audio tokens billed for this request.

      - `text_tokens: optional number`

        Number of text tokens billed for this request.

### Transcription Text Segment Event

- `TranscriptionTextSegmentEvent = object { id, end, speaker, 3 more }`

  Emitted when a diarized transcription returns a completed segment with speaker information. Only emitted when you [create a transcription](/docs/api-reference/audio/create-transcription) with `stream` set to `true` and `response_format` set to `diarized_json`.

  - `id: string`

    Unique identifier for the segment.

  - `end: number`

    End timestamp of the segment in seconds.

  - `speaker: string`

    Speaker label for this segment.

  - `start: number`

    Start timestamp of the segment in seconds.

  - `text: string`

    Transcript text for this segment.

  - `type: "transcript.text.segment"`

    The type of the event. Always `transcript.text.segment`.

    - `"transcript.text.segment"`

### Transcription Verbose

- `TranscriptionVerbose = object { duration, language, text, 3 more }`

  Represents a verbose json transcription response returned by model, based on the provided input.

  - `duration: number`

    The duration of the input audio.

  - `language: string`

    The language of the input audio.

  - `text: string`

    The transcribed text.

  - `segments: optional array of TranscriptionSegment`

    Segments of the transcribed text and their corresponding details.

    - `id: number`

      Unique identifier of the segment.

    - `avg_logprob: number`

      Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.

    - `compression_ratio: number`

      Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.

    - `end: number`

      End time of the segment in seconds.

    - `no_speech_prob: number`

      Probability of no speech in the segment. If the value is higher than 1.0 and the `avg_logprob` is below -1, consider this segment silent.

    - `seek: number`

      Seek offset of the segment.

    - `start: number`

      Start time of the segment in seconds.

    - `temperature: number`

      Temperature parameter used for generating the segment.

    - `text: string`

      Text content of the segment.

    - `tokens: array of number`

      Array of token IDs for the text content.

  - `usage: optional object { seconds, type }`

    Usage statistics for models billed by audio input duration.

    - `seconds: number`

      Duration of the input audio in seconds.

    - `type: "duration"`

      The type of the usage object. Always `duration` for this variant.

      - `"duration"`

  - `words: optional array of TranscriptionWord`

    Extracted words and their corresponding timestamps.

    - `end: number`

      End time of the word in seconds.

    - `start: number`

      Start time of the word in seconds.

    - `word: string`

      The text content of the word.

### Transcription Word

- `TranscriptionWord = object { end, start, word }`

  - `end: number`

    End time of the word in seconds.

  - `start: number`

    Start time of the word in seconds.

  - `word: string`

    The text content of the word.

# Translations

## Create

**post** `/audio/translations`

Translates audio into English.

### Returns

- `Translation = object { text }`

  - `text: string`

- `TranslationVerbose = object { duration, language, text, segments }`

  - `duration: number`

    The duration of the input audio.

  - `language: string`

    The language of the output translation (always `english`).

  - `text: string`

    The translated text.

  - `segments: optional array of TranscriptionSegment`

    Segments of the translated text and their corresponding details.

    - `id: number`

      Unique identifier of the segment.

    - `avg_logprob: number`

      Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.

    - `compression_ratio: number`

      Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.

    - `end: number`

      End time of the segment in seconds.

    - `no_speech_prob: number`

      Probability of no speech in the segment. If the value is higher than 1.0 and the `avg_logprob` is below -1, consider this segment silent.

    - `seek: number`

      Seek offset of the segment.

    - `start: number`

      Start time of the segment in seconds.

    - `temperature: number`

      Temperature parameter used for generating the segment.

    - `text: string`

      Text content of the segment.

    - `tokens: array of number`

      Array of token IDs for the text content.

### Example

```http
curl https://api.openai.com/v1/audio/translations \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F 'file=@/path/to/file' \
    -F model=whisper-1
```

## Domain Types

### Translation

- `Translation = object { text }`

  - `text: string`

### Translation Verbose

- `TranslationVerbose = object { duration, language, text, segments }`

  - `duration: number`

    The duration of the input audio.

  - `language: string`

    The language of the output translation (always `english`).

  - `text: string`

    The translated text.

  - `segments: optional array of TranscriptionSegment`

    Segments of the translated text and their corresponding details.

    - `id: number`

      Unique identifier of the segment.

    - `avg_logprob: number`

      Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.

    - `compression_ratio: number`

      Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.

    - `end: number`

      End time of the segment in seconds.

    - `no_speech_prob: number`

      Probability of no speech in the segment. If the value is higher than 1.0 and the `avg_logprob` is below -1, consider this segment silent.

    - `seek: number`

      Seek offset of the segment.

    - `start: number`

      Start time of the segment in seconds.

    - `temperature: number`

      Temperature parameter used for generating the segment.

    - `text: string`

      Text content of the segment.

    - `tokens: array of number`

      Array of token IDs for the text content.

# Speech

## Create

**post** `/audio/speech`

Generates audio from the input text.

Returns the audio file content, or a stream of audio events.

### Body Parameters

- `input: string`

  The text to generate audio for. The maximum length is 4096 characters.

- `model: string or SpeechModel`

  One of the available [TTS models](/docs/models#tts): `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts`, or `gpt-4o-mini-tts-2025-12-15`.

  - `UnionMember0 = string`

  - `SpeechModel = "tts-1" or "tts-1-hd" or "gpt-4o-mini-tts" or "gpt-4o-mini-tts-2025-12-15"`

    - `"tts-1"`

    - `"tts-1-hd"`

    - `"gpt-4o-mini-tts"`

    - `"gpt-4o-mini-tts-2025-12-15"`

- `voice: string or "alloy" or "ash" or "ballad" or 7 more or object { id }`

  The voice to use when generating the audio. Supported built-in voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`, `verse`, `marin`, and `cedar`. You may also provide a custom voice object with an `id`, for example `{ "id": "voice_1234" }`. Previews of the voices are available in the [Text to speech guide](/docs/guides/text-to-speech#voice-options).

  - `UnionMember0 = string`

  - `UnionMember1 = "alloy" or "ash" or "ballad" or 7 more`

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

  - `ID = object { id }`

    Custom voice reference.

    - `id: string`

      The custom voice ID, e.g. `voice_1234`.

- `instructions: optional string`

  Control the voice of your generated audio with additional instructions. Does not work with `tts-1` or `tts-1-hd`.

- `response_format: optional "mp3" or "opus" or "aac" or 3 more`

  The format to audio in. Supported formats are `mp3`, `opus`, `aac`, `flac`, `wav`, and `pcm`.

  - `"mp3"`

  - `"opus"`

  - `"aac"`

  - `"flac"`

  - `"wav"`

  - `"pcm"`

- `speed: optional number`

  The speed of the generated audio. Select a value from `0.25` to `4.0`. `1.0` is the default.

- `stream_format: optional "sse" or "audio"`

  The format to stream the audio in. Supported formats are `sse` and `audio`. `sse` is not supported for `tts-1` or `tts-1-hd`.

  - `"sse"`

  - `"audio"`

### Example

```http
curl https://api.openai.com/v1/audio/speech \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "input": "input",
          "model": "string",
          "voice": "string"
        }'
```

## Domain Types

### Speech Model

- `SpeechModel = "tts-1" or "tts-1-hd" or "gpt-4o-mini-tts" or "gpt-4o-mini-tts-2025-12-15"`

  - `"tts-1"`

  - `"tts-1-hd"`

  - `"gpt-4o-mini-tts"`

  - `"gpt-4o-mini-tts-2025-12-15"`

# Voices

## Create

**post** `/audio/voices`

Creates a custom voice.

### Returns

- `id: string`

  The voice identifier, which can be referenced in API endpoints.

- `created_at: number`

  The Unix timestamp (in seconds) for when the voice was created.

- `name: string`

  The name of the voice.

- `object: "audio.voice"`

  The object type, which is always `audio.voice`.

  - `"audio.voice"`

### Example

```http
curl https://api.openai.com/v1/audio/voices \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F 'audio_sample=@/path/to/audio_sample' \
    -F consent=consent \
    -F name=name
```

# Voice Consents

## List

**get** `/audio/voice_consents`

Returns a list of voice consent recordings.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of object { id, created_at, language, 2 more }`

  - `id: string`

    The consent recording identifier.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the consent recording was created.

  - `language: string`

    The BCP 47 language tag for the consent phrase (for example, `en-US`).

  - `name: string`

    The label provided when the consent recording was uploaded.

  - `object: "audio.voice_consent"`

    The object type, which is always `audio.voice_consent`.

    - `"audio.voice_consent"`

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create

**post** `/audio/voice_consents`

Upload a voice consent recording.

### Returns

- `id: string`

  The consent recording identifier.

- `created_at: number`

  The Unix timestamp (in seconds) for when the consent recording was created.

- `language: string`

  The BCP 47 language tag for the consent phrase (for example, `en-US`).

- `name: string`

  The label provided when the consent recording was uploaded.

- `object: "audio.voice_consent"`

  The object type, which is always `audio.voice_consent`.

  - `"audio.voice_consent"`

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F language=language \
    -F name=name \
    -F 'recording=@/path/to/recording'
```

## Retrieve

**get** `/audio/voice_consents/{consent_id}`

Retrieves a voice consent recording.

### Path Parameters

- `consent_id: string`

### Returns

- `id: string`

  The consent recording identifier.

- `created_at: number`

  The Unix timestamp (in seconds) for when the consent recording was created.

- `language: string`

  The BCP 47 language tag for the consent phrase (for example, `en-US`).

- `name: string`

  The label provided when the consent recording was uploaded.

- `object: "audio.voice_consent"`

  The object type, which is always `audio.voice_consent`.

  - `"audio.voice_consent"`

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents/$CONSENT_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Update

**post** `/audio/voice_consents/{consent_id}`

Updates a voice consent recording (metadata only).

### Path Parameters

- `consent_id: string`

### Body Parameters

- `name: string`

  The updated label for this consent recording.

### Returns

- `id: string`

  The consent recording identifier.

- `created_at: number`

  The Unix timestamp (in seconds) for when the consent recording was created.

- `language: string`

  The BCP 47 language tag for the consent phrase (for example, `en-US`).

- `name: string`

  The label provided when the consent recording was uploaded.

- `object: "audio.voice_consent"`

  The object type, which is always `audio.voice_consent`.

  - `"audio.voice_consent"`

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents/$CONSENT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "name"
        }'
```

## Delete

**delete** `/audio/voice_consents/{consent_id}`

Deletes a voice consent recording.

### Path Parameters

- `consent_id: string`

### Returns

- `id: string`

  The consent recording identifier.

- `deleted: boolean`

- `object: "audio.voice_consent"`

  - `"audio.voice_consent"`

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents/$CONSENT_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
