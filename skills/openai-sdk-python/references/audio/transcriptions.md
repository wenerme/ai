# Transcriptions

## Create

`audio.transcriptions.create(TranscriptionCreateParams**kwargs)  -> TranscriptionCreateResponse`

**post** `/audio/transcriptions`

Transcribes audio into the input language.

Returns a transcription object in `json`, `diarized_json`, or `verbose_json`
format, or a stream of transcript events.

### Parameters

- `file: FileTypes`

  The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.

- `model: Union[str, AudioModel]`

  ID of the model to use. The options are `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `whisper-1` (which is powered by our open source Whisper V2 model), and `gpt-4o-transcribe-diarize`.

  - `str`

  - `Literal["whisper-1", "gpt-4o-transcribe", "gpt-4o-mini-transcribe", 2 more]`

    - `"whisper-1"`

    - `"gpt-4o-transcribe"`

    - `"gpt-4o-mini-transcribe"`

    - `"gpt-4o-mini-transcribe-2025-12-15"`

    - `"gpt-4o-transcribe-diarize"`

- `chunking_strategy: Optional[ChunkingStrategy]`

  Controls how the audio is cut into chunks. When set to `"auto"`, the server first normalizes loudness and then uses voice activity detection (VAD) to choose boundaries. `server_vad` object can be provided to tweak VAD detection parameters manually. If unset, the audio is transcribed as a single block. Required when using `gpt-4o-transcribe-diarize` for inputs longer than 30 seconds.

  - `Literal["auto"]`

    Automatically set chunking parameters based on the audio. Must be set to `"auto"`.

    - `"auto"`

  - `class ChunkingStrategyVadConfig: …`

    - `type: Literal["server_vad"]`

      Must be set to `server_vad` to enable manual chunking using server side VAD.

      - `"server_vad"`

    - `prefix_padding_ms: Optional[int]`

      Amount of audio to include before the VAD detected speech (in
      milliseconds).

    - `silence_duration_ms: Optional[int]`

      Duration of silence to detect speech stop (in milliseconds).
      With shorter values the model will respond more quickly,
      but may jump in on short pauses from the user.

    - `threshold: Optional[float]`

      Sensitivity threshold (0.0 to 1.0) for voice activity detection. A
      higher threshold will require louder audio to activate the model, and
      thus might perform better in noisy environments.

- `include: Optional[List[TranscriptionInclude]]`

  Additional information to include in the transcription response.
  `logprobs` will return the log probabilities of the tokens in the
  response to understand the model's confidence in the transcription.
  `logprobs` only works with response_format set to `json` and only with
  the models `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `gpt-4o-mini-transcribe-2025-12-15`. This field is not supported when using `gpt-4o-transcribe-diarize`.

  - `"logprobs"`

- `known_speaker_names: Optional[SequenceNotStr[str]]`

  Optional list of speaker names that correspond to the audio samples provided in `known_speaker_references[]`. Each entry should be a short identifier (for example `customer` or `agent`). Up to 4 speakers are supported.

- `known_speaker_references: Optional[SequenceNotStr[str]]`

  Optional list of audio samples (as [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)) that contain known speaker references matching `known_speaker_names[]`. Each sample must be between 2 and 10 seconds, and can use any of the same input audio formats supported by `file`.

- `language: Optional[str]`

  The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format will improve accuracy and latency.

- `prompt: Optional[str]`

  An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://platform.openai.com/docs/guides/speech-to-text#prompting) should match the audio language. This field is not supported when using `gpt-4o-transcribe-diarize`.

- `response_format: Optional[AudioResponseFormat]`

  The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, `vtt`, or `diarized_json`. For `gpt-4o-transcribe` and `gpt-4o-mini-transcribe`, the only supported format is `json`. For `gpt-4o-transcribe-diarize`, the supported formats are `json`, `text`, and `diarized_json`, with `diarized_json` required to receive speaker annotations.

  - `"json"`

  - `"text"`

  - `"srt"`

  - `"verbose_json"`

  - `"vtt"`

  - `"diarized_json"`

- `stream: Optional[Literal[false]]`

  If set to true, the model response data will be streamed to the client
  as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
  See the [Streaming section of the Speech-to-Text guide](https://platform.openai.com/docs/guides/speech-to-text?lang=curl#streaming-transcriptions)
  for more information.

  Note: Streaming is not supported for the `whisper-1` model and will be ignored.

  - `false`

- `temperature: Optional[float]`

  The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.

- `timestamp_granularities: Optional[List[Literal["word", "segment"]]]`

  The timestamp granularities to populate for this transcription. `response_format` must be set `verbose_json` to use timestamp granularities. Either or both of these options are supported: `word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.
  This option is not available for `gpt-4o-transcribe-diarize`.

  - `"word"`

  - `"segment"`

### Returns

- `TranscriptionCreateResponse`

  Represents a transcription response returned by model, based on the provided input.

  - `class Transcription: …`

    Represents a transcription response returned by model, based on the provided input.

    - `text: str`

      The transcribed text.

    - `logprobs: Optional[List[Logprob]]`

      The log probabilities of the tokens in the transcription. Only returned with the models `gpt-4o-transcribe` and `gpt-4o-mini-transcribe` if `logprobs` is added to the `include` array.

      - `token: Optional[str]`

        The token in the transcription.

      - `bytes: Optional[List[float]]`

        The bytes of the token.

      - `logprob: Optional[float]`

        The log probability of the token.

    - `usage: Optional[Usage]`

      Token usage statistics for the request.

      - `class UsageTokens: …`

        Usage statistics for models billed by token usage.

        - `input_tokens: int`

          Number of input tokens billed for this request.

        - `output_tokens: int`

          Number of output tokens generated.

        - `total_tokens: int`

          Total number of tokens used (input + output).

        - `type: Literal["tokens"]`

          The type of the usage object. Always `tokens` for this variant.

          - `"tokens"`

        - `input_token_details: Optional[UsageTokensInputTokenDetails]`

          Details about the input tokens billed for this request.

          - `audio_tokens: Optional[int]`

            Number of audio tokens billed for this request.

          - `text_tokens: Optional[int]`

            Number of text tokens billed for this request.

      - `class UsageDuration: …`

        Usage statistics for models billed by audio input duration.

        - `seconds: float`

          Duration of the input audio in seconds.

        - `type: Literal["duration"]`

          The type of the usage object. Always `duration` for this variant.

          - `"duration"`

  - `class TranscriptionDiarized: …`

    Represents a diarized transcription response returned by the model, including the combined transcript and speaker-segment annotations.

    - `duration: float`

      Duration of the input audio in seconds.

    - `segments: List[TranscriptionDiarizedSegment]`

      Segments of the transcript annotated with timestamps and speaker labels.

      - `id: str`

        Unique identifier for the segment.

      - `end: float`

        End timestamp of the segment in seconds.

      - `speaker: str`

        Speaker label for this segment. When known speakers are provided, the label matches `known_speaker_names[]`. Otherwise speakers are labeled sequentially using capital letters (`A`, `B`, ...).

      - `start: float`

        Start timestamp of the segment in seconds.

      - `text: str`

        Transcript text for this segment.

      - `type: Literal["transcript.text.segment"]`

        The type of the segment. Always `transcript.text.segment`.

        - `"transcript.text.segment"`

    - `task: Literal["transcribe"]`

      The type of task that was run. Always `transcribe`.

      - `"transcribe"`

    - `text: str`

      The concatenated transcript text for the entire audio input.

    - `usage: Optional[Usage]`

      Token or duration usage statistics for the request.

      - `class UsageTokens: …`

        Usage statistics for models billed by token usage.

        - `input_tokens: int`

          Number of input tokens billed for this request.

        - `output_tokens: int`

          Number of output tokens generated.

        - `total_tokens: int`

          Total number of tokens used (input + output).

        - `type: Literal["tokens"]`

          The type of the usage object. Always `tokens` for this variant.

          - `"tokens"`

        - `input_token_details: Optional[UsageTokensInputTokenDetails]`

          Details about the input tokens billed for this request.

          - `audio_tokens: Optional[int]`

            Number of audio tokens billed for this request.

          - `text_tokens: Optional[int]`

            Number of text tokens billed for this request.

      - `class UsageDuration: …`

        Usage statistics for models billed by audio input duration.

        - `seconds: float`

          Duration of the input audio in seconds.

        - `type: Literal["duration"]`

          The type of the usage object. Always `duration` for this variant.

          - `"duration"`

  - `class TranscriptionVerbose: …`

    Represents a verbose json transcription response returned by model, based on the provided input.

    - `duration: float`

      The duration of the input audio.

    - `language: str`

      The language of the input audio.

    - `text: str`

      The transcribed text.

    - `segments: Optional[List[TranscriptionSegment]]`

      Segments of the transcribed text and their corresponding details.

      - `id: int`

        Unique identifier of the segment.

      - `avg_logprob: float`

        Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.

      - `compression_ratio: float`

        Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.

      - `end: float`

        End time of the segment in seconds.

      - `no_speech_prob: float`

        Probability of no speech in the segment. If the value is higher than 1.0 and the `avg_logprob` is below -1, consider this segment silent.

      - `seek: int`

        Seek offset of the segment.

      - `start: float`

        Start time of the segment in seconds.

      - `temperature: float`

        Temperature parameter used for generating the segment.

      - `text: str`

        Text content of the segment.

      - `tokens: List[int]`

        Array of token IDs for the text content.

    - `usage: Optional[Usage]`

      Usage statistics for models billed by audio input duration.

      - `seconds: float`

        Duration of the input audio in seconds.

      - `type: Literal["duration"]`

        The type of the usage object. Always `duration` for this variant.

        - `"duration"`

    - `words: Optional[List[TranscriptionWord]]`

      Extracted words and their corresponding timestamps.

      - `end: float`

        End time of the word in seconds.

      - `start: float`

        Start time of the word in seconds.

      - `word: str`

        The text content of the word.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
transcription = client.audio.transcriptions.create(
    file=b"raw file contents",
    model="gpt-4o-transcribe",
)
print(transcription)
```

## Domain Types

### Transcription

- `class Transcription: …`

  Represents a transcription response returned by model, based on the provided input.

  - `text: str`

    The transcribed text.

  - `logprobs: Optional[List[Logprob]]`

    The log probabilities of the tokens in the transcription. Only returned with the models `gpt-4o-transcribe` and `gpt-4o-mini-transcribe` if `logprobs` is added to the `include` array.

    - `token: Optional[str]`

      The token in the transcription.

    - `bytes: Optional[List[float]]`

      The bytes of the token.

    - `logprob: Optional[float]`

      The log probability of the token.

  - `usage: Optional[Usage]`

    Token usage statistics for the request.

    - `class UsageTokens: …`

      Usage statistics for models billed by token usage.

      - `input_tokens: int`

        Number of input tokens billed for this request.

      - `output_tokens: int`

        Number of output tokens generated.

      - `total_tokens: int`

        Total number of tokens used (input + output).

      - `type: Literal["tokens"]`

        The type of the usage object. Always `tokens` for this variant.

        - `"tokens"`

      - `input_token_details: Optional[UsageTokensInputTokenDetails]`

        Details about the input tokens billed for this request.

        - `audio_tokens: Optional[int]`

          Number of audio tokens billed for this request.

        - `text_tokens: Optional[int]`

          Number of text tokens billed for this request.

    - `class UsageDuration: …`

      Usage statistics for models billed by audio input duration.

      - `seconds: float`

        Duration of the input audio in seconds.

      - `type: Literal["duration"]`

        The type of the usage object. Always `duration` for this variant.

        - `"duration"`

### Transcription Diarized

- `class TranscriptionDiarized: …`

  Represents a diarized transcription response returned by the model, including the combined transcript and speaker-segment annotations.

  - `duration: float`

    Duration of the input audio in seconds.

  - `segments: List[TranscriptionDiarizedSegment]`

    Segments of the transcript annotated with timestamps and speaker labels.

    - `id: str`

      Unique identifier for the segment.

    - `end: float`

      End timestamp of the segment in seconds.

    - `speaker: str`

      Speaker label for this segment. When known speakers are provided, the label matches `known_speaker_names[]`. Otherwise speakers are labeled sequentially using capital letters (`A`, `B`, ...).

    - `start: float`

      Start timestamp of the segment in seconds.

    - `text: str`

      Transcript text for this segment.

    - `type: Literal["transcript.text.segment"]`

      The type of the segment. Always `transcript.text.segment`.

      - `"transcript.text.segment"`

  - `task: Literal["transcribe"]`

    The type of task that was run. Always `transcribe`.

    - `"transcribe"`

  - `text: str`

    The concatenated transcript text for the entire audio input.

  - `usage: Optional[Usage]`

    Token or duration usage statistics for the request.

    - `class UsageTokens: …`

      Usage statistics for models billed by token usage.

      - `input_tokens: int`

        Number of input tokens billed for this request.

      - `output_tokens: int`

        Number of output tokens generated.

      - `total_tokens: int`

        Total number of tokens used (input + output).

      - `type: Literal["tokens"]`

        The type of the usage object. Always `tokens` for this variant.

        - `"tokens"`

      - `input_token_details: Optional[UsageTokensInputTokenDetails]`

        Details about the input tokens billed for this request.

        - `audio_tokens: Optional[int]`

          Number of audio tokens billed for this request.

        - `text_tokens: Optional[int]`

          Number of text tokens billed for this request.

    - `class UsageDuration: …`

      Usage statistics for models billed by audio input duration.

      - `seconds: float`

        Duration of the input audio in seconds.

      - `type: Literal["duration"]`

        The type of the usage object. Always `duration` for this variant.

        - `"duration"`

### Transcription Diarized Segment

- `class TranscriptionDiarizedSegment: …`

  A segment of diarized transcript text with speaker metadata.

  - `id: str`

    Unique identifier for the segment.

  - `end: float`

    End timestamp of the segment in seconds.

  - `speaker: str`

    Speaker label for this segment. When known speakers are provided, the label matches `known_speaker_names[]`. Otherwise speakers are labeled sequentially using capital letters (`A`, `B`, ...).

  - `start: float`

    Start timestamp of the segment in seconds.

  - `text: str`

    Transcript text for this segment.

  - `type: Literal["transcript.text.segment"]`

    The type of the segment. Always `transcript.text.segment`.

    - `"transcript.text.segment"`

### Transcription Include

- `Literal["logprobs"]`

  - `"logprobs"`

### Transcription Segment

- `class TranscriptionSegment: …`

  - `id: int`

    Unique identifier of the segment.

  - `avg_logprob: float`

    Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.

  - `compression_ratio: float`

    Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.

  - `end: float`

    End time of the segment in seconds.

  - `no_speech_prob: float`

    Probability of no speech in the segment. If the value is higher than 1.0 and the `avg_logprob` is below -1, consider this segment silent.

  - `seek: int`

    Seek offset of the segment.

  - `start: float`

    Start time of the segment in seconds.

  - `temperature: float`

    Temperature parameter used for generating the segment.

  - `text: str`

    Text content of the segment.

  - `tokens: List[int]`

    Array of token IDs for the text content.

### Transcription Stream Event

- `TranscriptionStreamEvent`

  Emitted when a diarized transcription returns a completed segment with speaker information. Only emitted when you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with `stream` set to `true` and `response_format` set to `diarized_json`.

  - `class TranscriptionTextSegmentEvent: …`

    Emitted when a diarized transcription returns a completed segment with speaker information. Only emitted when you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with `stream` set to `true` and `response_format` set to `diarized_json`.

    - `id: str`

      Unique identifier for the segment.

    - `end: float`

      End timestamp of the segment in seconds.

    - `speaker: str`

      Speaker label for this segment.

    - `start: float`

      Start timestamp of the segment in seconds.

    - `text: str`

      Transcript text for this segment.

    - `type: Literal["transcript.text.segment"]`

      The type of the event. Always `transcript.text.segment`.

      - `"transcript.text.segment"`

  - `class TranscriptionTextDeltaEvent: …`

    Emitted when there is an additional text delta. This is also the first event emitted when the transcription starts. Only emitted when you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the `Stream` parameter set to `true`.

    - `delta: str`

      The text delta that was additionally transcribed.

    - `type: Literal["transcript.text.delta"]`

      The type of the event. Always `transcript.text.delta`.

      - `"transcript.text.delta"`

    - `logprobs: Optional[List[Logprob]]`

      The log probabilities of the delta. Only included if you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the `include[]` parameter set to `logprobs`.

      - `token: Optional[str]`

        The token that was used to generate the log probability.

      - `bytes: Optional[List[int]]`

        The bytes that were used to generate the log probability.

      - `logprob: Optional[float]`

        The log probability of the token.

    - `segment_id: Optional[str]`

      Identifier of the diarized segment that this delta belongs to. Only present when using `gpt-4o-transcribe-diarize`.

  - `class TranscriptionTextDoneEvent: …`

    Emitted when the transcription is complete. Contains the complete transcription text. Only emitted when you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the `Stream` parameter set to `true`.

    - `text: str`

      The text that was transcribed.

    - `type: Literal["transcript.text.done"]`

      The type of the event. Always `transcript.text.done`.

      - `"transcript.text.done"`

    - `logprobs: Optional[List[Logprob]]`

      The log probabilities of the individual tokens in the transcription. Only included if you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the `include[]` parameter set to `logprobs`.

      - `token: Optional[str]`

        The token that was used to generate the log probability.

      - `bytes: Optional[List[int]]`

        The bytes that were used to generate the log probability.

      - `logprob: Optional[float]`

        The log probability of the token.

    - `usage: Optional[Usage]`

      Usage statistics for models billed by token usage.

      - `input_tokens: int`

        Number of input tokens billed for this request.

      - `output_tokens: int`

        Number of output tokens generated.

      - `total_tokens: int`

        Total number of tokens used (input + output).

      - `type: Literal["tokens"]`

        The type of the usage object. Always `tokens` for this variant.

        - `"tokens"`

      - `input_token_details: Optional[UsageInputTokenDetails]`

        Details about the input tokens billed for this request.

        - `audio_tokens: Optional[int]`

          Number of audio tokens billed for this request.

        - `text_tokens: Optional[int]`

          Number of text tokens billed for this request.

### Transcription Text Delta Event

- `class TranscriptionTextDeltaEvent: …`

  Emitted when there is an additional text delta. This is also the first event emitted when the transcription starts. Only emitted when you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the `Stream` parameter set to `true`.

  - `delta: str`

    The text delta that was additionally transcribed.

  - `type: Literal["transcript.text.delta"]`

    The type of the event. Always `transcript.text.delta`.

    - `"transcript.text.delta"`

  - `logprobs: Optional[List[Logprob]]`

    The log probabilities of the delta. Only included if you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the `include[]` parameter set to `logprobs`.

    - `token: Optional[str]`

      The token that was used to generate the log probability.

    - `bytes: Optional[List[int]]`

      The bytes that were used to generate the log probability.

    - `logprob: Optional[float]`

      The log probability of the token.

  - `segment_id: Optional[str]`

    Identifier of the diarized segment that this delta belongs to. Only present when using `gpt-4o-transcribe-diarize`.

### Transcription Text Done Event

- `class TranscriptionTextDoneEvent: …`

  Emitted when the transcription is complete. Contains the complete transcription text. Only emitted when you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the `Stream` parameter set to `true`.

  - `text: str`

    The text that was transcribed.

  - `type: Literal["transcript.text.done"]`

    The type of the event. Always `transcript.text.done`.

    - `"transcript.text.done"`

  - `logprobs: Optional[List[Logprob]]`

    The log probabilities of the individual tokens in the transcription. Only included if you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with the `include[]` parameter set to `logprobs`.

    - `token: Optional[str]`

      The token that was used to generate the log probability.

    - `bytes: Optional[List[int]]`

      The bytes that were used to generate the log probability.

    - `logprob: Optional[float]`

      The log probability of the token.

  - `usage: Optional[Usage]`

    Usage statistics for models billed by token usage.

    - `input_tokens: int`

      Number of input tokens billed for this request.

    - `output_tokens: int`

      Number of output tokens generated.

    - `total_tokens: int`

      Total number of tokens used (input + output).

    - `type: Literal["tokens"]`

      The type of the usage object. Always `tokens` for this variant.

      - `"tokens"`

    - `input_token_details: Optional[UsageInputTokenDetails]`

      Details about the input tokens billed for this request.

      - `audio_tokens: Optional[int]`

        Number of audio tokens billed for this request.

      - `text_tokens: Optional[int]`

        Number of text tokens billed for this request.

### Transcription Text Segment Event

- `class TranscriptionTextSegmentEvent: …`

  Emitted when a diarized transcription returns a completed segment with speaker information. Only emitted when you [create a transcription](https://platform.openai.com/docs/api-reference/audio/create-transcription) with `stream` set to `true` and `response_format` set to `diarized_json`.

  - `id: str`

    Unique identifier for the segment.

  - `end: float`

    End timestamp of the segment in seconds.

  - `speaker: str`

    Speaker label for this segment.

  - `start: float`

    Start timestamp of the segment in seconds.

  - `text: str`

    Transcript text for this segment.

  - `type: Literal["transcript.text.segment"]`

    The type of the event. Always `transcript.text.segment`.

    - `"transcript.text.segment"`

### Transcription Verbose

- `class TranscriptionVerbose: …`

  Represents a verbose json transcription response returned by model, based on the provided input.

  - `duration: float`

    The duration of the input audio.

  - `language: str`

    The language of the input audio.

  - `text: str`

    The transcribed text.

  - `segments: Optional[List[TranscriptionSegment]]`

    Segments of the transcribed text and their corresponding details.

    - `id: int`

      Unique identifier of the segment.

    - `avg_logprob: float`

      Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.

    - `compression_ratio: float`

      Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.

    - `end: float`

      End time of the segment in seconds.

    - `no_speech_prob: float`

      Probability of no speech in the segment. If the value is higher than 1.0 and the `avg_logprob` is below -1, consider this segment silent.

    - `seek: int`

      Seek offset of the segment.

    - `start: float`

      Start time of the segment in seconds.

    - `temperature: float`

      Temperature parameter used for generating the segment.

    - `text: str`

      Text content of the segment.

    - `tokens: List[int]`

      Array of token IDs for the text content.

  - `usage: Optional[Usage]`

    Usage statistics for models billed by audio input duration.

    - `seconds: float`

      Duration of the input audio in seconds.

    - `type: Literal["duration"]`

      The type of the usage object. Always `duration` for this variant.

      - `"duration"`

  - `words: Optional[List[TranscriptionWord]]`

    Extracted words and their corresponding timestamps.

    - `end: float`

      End time of the word in seconds.

    - `start: float`

      Start time of the word in seconds.

    - `word: str`

      The text content of the word.

### Transcription Word

- `class TranscriptionWord: …`

  - `end: float`

    End time of the word in seconds.

  - `start: float`

    Start time of the word in seconds.

  - `word: str`

    The text content of the word.
