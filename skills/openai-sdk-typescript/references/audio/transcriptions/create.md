## Create

`client.audio.transcriptions.create(TranscriptionCreateParamsbody, RequestOptionsoptions?): TranscriptionCreateResponse | Stream<TranscriptionStreamEvent>`

**post** `/audio/transcriptions`

Transcribes audio into the input language.

Returns a transcription object in `json`, `diarized_json`, or `verbose_json`
format, or a stream of transcript events.

### Parameters

- `TranscriptionCreateParams = TranscriptionCreateParamsNonStreaming | TranscriptionCreateParamsStreaming`

  - `TranscriptionCreateParamsBase`

    - `file: Uploadable`

      The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.

    - `model: (string & {}) | AudioModel`

      ID of the model to use. The options are `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `whisper-1` (which is powered by our open source Whisper V2 model), and `gpt-4o-transcribe-diarize`.

      - `(string & {})`

      - `AudioModel = "whisper-1" | "gpt-4o-transcribe" | "gpt-4o-mini-transcribe" | 2 more`

        - `"whisper-1"`

        - `"gpt-4o-transcribe"`

        - `"gpt-4o-mini-transcribe"`

        - `"gpt-4o-mini-transcribe-2025-12-15"`

        - `"gpt-4o-transcribe-diarize"`

    - `chunking_strategy?: "auto" | VadConfig | null`

      Controls how the audio is cut into chunks. When set to `"auto"`, the server first normalizes loudness and then uses voice activity detection (VAD) to choose boundaries. `server_vad` object can be provided to tweak VAD detection parameters manually. If unset, the audio is transcribed as a single block. Required when using `gpt-4o-transcribe-diarize` for inputs longer than 30 seconds.

      - `"auto"`

        - `"auto"`

      - `VadConfig`

        - `type: "server_vad"`

          Must be set to `server_vad` to enable manual chunking using server side VAD.

          - `"server_vad"`

        - `prefix_padding_ms?: number`

          Amount of audio to include before the VAD detected speech (in
          milliseconds).

        - `silence_duration_ms?: number`

          Duration of silence to detect speech stop (in milliseconds).
          With shorter values the model will respond more quickly,
          but may jump in on short pauses from the user.

        - `threshold?: number`

          Sensitivity threshold (0.0 to 1.0) for voice activity detection. A
          higher threshold will require louder audio to activate the model, and
          thus might perform better in noisy environments.

    - `include?: Array<TranscriptionInclude>`

      Additional information to include in the transcription response.
      `logprobs` will return the log probabilities of the tokens in the
      response to understand the model's confidence in the transcription.
      `logprobs` only works with response_format set to `json` and only with
      the models `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `gpt-4o-mini-transcribe-2025-12-15`. This field is not supported when using `gpt-4o-transcribe-diarize`.

      - `"logprobs"`

    - `known_speaker_names?: Array<string>`

      Optional list of speaker names that correspond to the audio samples provided in `known_speaker_references[]`. Each entry should be a short identifier (for example `customer` or `agent`). Up to 4 speakers are supported.

    - `known_speaker_references?: Array<string>`

      Optional list of audio samples (as [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)) that contain known speaker references matching `known_speaker_names[]`. Each sample must be between 2 and 10 seconds, and can use any of the same input audio formats supported by `file`.

    - `language?: string`

      The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format will improve accuracy and latency.

    - `prompt?: string`

      An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://platform.openai.com/docs/guides/speech-to-text#prompting) should match the audio language. This field is not supported when using `gpt-4o-transcribe-diarize`.

    - `response_format?: AudioResponseFormat`

      The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, `vtt`, or `diarized_json`. For `gpt-4o-transcribe` and `gpt-4o-mini-transcribe`, the only supported format is `json`. For `gpt-4o-transcribe-diarize`, the supported formats are `json`, `text`, and `diarized_json`, with `diarized_json` required to receive speaker annotations.

      - `"json"`

      - `"text"`

      - `"srt"`

      - `"verbose_json"`

      - `"vtt"`

      - `"diarized_json"`

    - `stream?: false | null`

      If set to true, the model response data will be streamed to the client
      as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
      See the [Streaming section of the Speech-to-Text guide](https://platform.openai.com/docs/guides/speech-to-text?lang=curl#streaming-transcriptions)
      for more information.

      Note: Streaming is not supported for the `whisper-1` model and will be ignored.

      - `false`

    - `temperature?: number`

      The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.

    - `timestamp_granularities?: Array<"word" | "segment">`

      The timestamp granularities to populate for this transcription. `response_format` must be set `verbose_json` to use timestamp granularities. Either or both of these options are supported: `word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.
      This option is not available for `gpt-4o-transcribe-diarize`.

      - `"word"`

      - `"segment"`

  - `TranscriptionCreateParamsNonStreaming extends TranscriptionCreateParamsBase`

    - `stream?: false | null`

      If set to true, the model response data will be streamed to the client
      as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
      See the [Streaming section of the Speech-to-Text guide](https://platform.openai.com/docs/guides/speech-to-text?lang=curl#streaming-transcriptions)
      for more information.

      Note: Streaming is not supported for the `whisper-1` model and will be ignored.

      - `false`

  - `TranscriptionCreateParamsNonStreaming extends TranscriptionCreateParamsBase`

    - `stream?: false | null`

      If set to true, the model response data will be streamed to the client
      as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
      See the [Streaming section of the Speech-to-Text guide](https://platform.openai.com/docs/guides/speech-to-text?lang=curl#streaming-transcriptions)
      for more information.

      Note: Streaming is not supported for the `whisper-1` model and will be ignored.

      - `false`

### Returns

- `TranscriptionCreateResponse = Transcription | TranscriptionDiarized | TranscriptionVerbose`

  Represents a transcription response returned by model, based on the provided input.

  - `Transcription`

    Represents a transcription response returned by model, based on the provided input.

    - `text: string`

      The transcribed text.

    - `logprobs?: Array<Logprob>`

      The log probabilities of the tokens in the transcription. Only returned with the models `gpt-4o-transcribe` and `gpt-4o-mini-transcribe` if `logprobs` is added to the `include` array.

      - `token?: string`

        The token in the transcription.

      - `bytes?: Array<number>`

        The bytes of the token.

      - `logprob?: number`

        The log probability of the token.

    - `usage?: Tokens | Duration`

      Token usage statistics for the request.

      - `Tokens`

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

        - `input_token_details?: InputTokenDetails`

          Details about the input tokens billed for this request.

          - `audio_tokens?: number`

            Number of audio tokens billed for this request.

          - `text_tokens?: number`

            Number of text tokens billed for this request.

      - `Duration`

        Usage statistics for models billed by audio input duration.

        - `seconds: number`

          Duration of the input audio in seconds.

        - `type: "duration"`

          The type of the usage object. Always `duration` for this variant.

          - `"duration"`

  - `TranscriptionDiarized`

    Represents a diarized transcription response returned by the model, including the combined transcript and speaker-segment annotations.

    - `duration: number`

      Duration of the input audio in seconds.

    - `segments: Array<TranscriptionDiarizedSegment>`

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

    - `usage?: Tokens | Duration`

      Token or duration usage statistics for the request.

      - `Tokens`

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

        - `input_token_details?: InputTokenDetails`

          Details about the input tokens billed for this request.

          - `audio_tokens?: number`

            Number of audio tokens billed for this request.

          - `text_tokens?: number`

            Number of text tokens billed for this request.

      - `Duration`

        Usage statistics for models billed by audio input duration.

        - `seconds: number`

          Duration of the input audio in seconds.

        - `type: "duration"`

          The type of the usage object. Always `duration` for this variant.

          - `"duration"`

  - `TranscriptionVerbose`

    Represents a verbose json transcription response returned by model, based on the provided input.

    - `duration: number`

      The duration of the input audio.

    - `language: string`

      The language of the input audio.

    - `text: string`

      The transcribed text.

    - `segments?: Array<TranscriptionSegment>`

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

      - `tokens: Array<number>`

        Array of token IDs for the text content.

    - `usage?: Usage`

      Usage statistics for models billed by audio input duration.

      - `seconds: number`

        Duration of the input audio in seconds.

      - `type: "duration"`

        The type of the usage object. Always `duration` for this variant.

        - `"duration"`

    - `words?: Array<TranscriptionWord>`

      Extracted words and their corresponding timestamps.

      - `end: number`

        End time of the word in seconds.

      - `start: number`

        Start time of the word in seconds.

      - `word: string`

        The text content of the word.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const transcription = await client.audio.transcriptions.create({
  file: fs.createReadStream('speech.mp3'),
  model: 'gpt-4o-transcribe',
});

console.log(transcription);
```
