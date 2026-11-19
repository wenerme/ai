## Create transcription

**post** `/audio/transcriptions`

Transcribes audio into the input language.

Returns a transcription object in `json`, `diarized_json`, or `verbose_json`
format, plain text in `text`, `srt`, or `vtt` format, or a stream of
transcript events. Supported formats depend on the model.

### Body Parameters

Content type: `multipart/form-data`

- `file: string`

  The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.
  The request must include enough format metadata for the file to be identified. We recommend an extension-bearing filename and an appropriate content type.

- `model: string or AudioModel`

  ID of the model to use. The options are `gpt-transcribe`, `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `whisper-1` (which is powered by our open source Whisper V2 model), and `gpt-4o-transcribe-diarize`.

  - `string`

  - `AudioModel = "whisper-1" or "gpt-transcribe" or "gpt-4o-transcribe" or 3 more`

    - `"whisper-1"`

    - `"gpt-transcribe"`

    - `"gpt-4o-transcribe"`

    - `"gpt-4o-mini-transcribe"`

    - `"gpt-4o-mini-transcribe-2025-12-15"`

    - `"gpt-4o-transcribe-diarize"`

- `chunking_strategy: optional "auto" or VadConfig { type, prefix_padding_ms, silence_duration_ms, threshold }  or null`

  Controls how the audio is cut into chunks. When set to `"auto"`, the server first normalizes loudness and then uses voice activity detection (VAD) to choose boundaries. `server_vad` object can be provided to tweak VAD detection parameters manually. If unset, the audio is transcribed as a single block. Required when using `gpt-4o-transcribe-diarize` for inputs longer than 30 seconds.

  - `"auto"`

    Automatically set chunking parameters based on the audio. Must be set to `"auto"`.

    - `"auto"`

  - `VadConfig object { type, prefix_padding_ms, silence_duration_ms, threshold }`

    - `type: "server_vad"`

      Must be set to `server_vad` to enable manual chunking using server side VAD.

      - `"server_vad"`

    - `prefix_padding_ms: optional integer (default: 300)`

      Amount of audio to include before the VAD detected speech (in
      milliseconds).

    - `silence_duration_ms: optional integer (default: 200)`

      Duration of silence to detect speech stop (in milliseconds).
      With shorter values the model will respond more quickly,
      but may jump in on short pauses from the user.

    - `threshold: optional number (default: 0.5)`

      Sensitivity threshold (0.0 to 1.0) for voice activity detection. A
      higher threshold will require louder audio to activate the model, and
      thus might perform better in noisy environments.

- `include: optional array of TranscriptionInclude`

  Additional information to include in the transcription response.
  `logprobs` will return the log probabilities of the tokens in the
  response to understand the model's confidence in the transcription.
  `logprobs` only works with response_format set to `json` and only with
  the models `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `gpt-4o-mini-transcribe-2025-12-15`. This field is not supported when using `gpt-4o-transcribe-diarize`.

  - `"logprobs"`

- `keywords: optional array of string`

  Words or phrases to guide transcription of the input audio. Supported by `gpt-transcribe`.

- `known_speaker_names: optional array of string`

  Optional list of speaker names that correspond to the audio samples provided in `known_speaker_references[]`. Each entry should be a short identifier (for example `customer` or `agent`). Up to 4 speakers are supported.

  `maxItems: 4`

- `known_speaker_references: optional array of string`

  Optional list of audio samples (as [data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)) that contain known speaker references matching `known_speaker_names[]`. Each sample must be between 2 and 10 seconds, and can use any of the same input audio formats supported by `file`.

  `maxItems: 4`

- `language: optional string`

  The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format will improve accuracy and latency.

- `languages: optional array of string`

  Possible languages of the input audio, in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. Supported by `gpt-transcribe`.

  `minItems: 1`

- `prompt: optional string`

  An optional text to guide the model's style or continue a previous audio segment. The [prompt](/api/docs/guides/speech-to-text#prompting) should match the audio language. This field is not supported when using `gpt-4o-transcribe-diarize`.

- `response_format: optional AudioResponseFormat (default: "json")`

  The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, `vtt`, or `diarized_json`. For `gpt-4o-transcribe` and `gpt-4o-mini-transcribe`, the only supported format is `json`. For `gpt-4o-transcribe-diarize`, the supported formats are `json`, `text`, and `diarized_json`, with `diarized_json` required to receive speaker annotations.

  - `"json"`

  - `"text"`

  - `"srt"`

  - `"verbose_json"`

  - `"vtt"`

  - `"diarized_json"`

- `stream: optional boolean or null (default: false)`

  If set to true, the model response data will be streamed to the client
  as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
  See the [Streaming section of the Speech-to-Text guide](/api/docs/guides/speech-to-text?lang=curl#streaming)
  for more information.

  Note: Streaming is not supported for the `whisper-1` model and will be ignored.

- `temperature: optional number (default: 0)`

  The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.

- `timestamp_granularities: optional array of "word" or "segment" (default: ["segment"])`

  The timestamp granularities to populate for this transcription. `response_format` must be set `verbose_json` to use timestamp granularities. Either or both of these options are supported: `word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.
  This option is not available for `gpt-4o-transcribe-diarize`.

  - `"word"`

  - `"segment"`

### Returns

- `Transcription object { text, languages, logprobs, usage }`

  Represents a transcription response returned by model, based on the provided input.

  - `text: string`

    The transcribed text.

  - `languages: optional array of TranscriptionLanguage`

    The languages detected in the audio. Returned by `gpt-transcribe`. An empty array indicates that no language could be reliably detected.

    - `code: string`

      The code of a language detected in the audio.

  - `logprobs: optional array of object { token, bytes, logprob }`

    The log probabilities of the tokens in the transcription. Only returned with the models `gpt-4o-transcribe` and `gpt-4o-mini-transcribe` if `logprobs` is added to the `include` array.

    - `token: optional string`

      The token in the transcription.

    - `bytes: optional array of number`

      The bytes of the token.

    - `logprob: optional number`

      The log probability of the token.

  - `usage: optional Tokens { input_tokens, output_tokens, total_tokens, 2 more }  or Duration { seconds, type }`

    Token usage statistics for the request.

    - `Tokens object { input_tokens, output_tokens, total_tokens, 2 more }`

      Usage statistics for models billed by token usage.

      - `input_tokens: integer`

        Number of input tokens billed for this request.

      - `output_tokens: integer`

        Number of output tokens generated.

      - `total_tokens: integer`

        Total number of tokens used (input + output).

      - `type: "tokens"`

        The type of the usage object. Always `tokens` for this variant.

        - `"tokens"`

      - `input_token_details: optional object { audio_tokens, text_tokens }`

        Details about the input tokens billed for this request.

        - `audio_tokens: optional integer`

          Number of audio tokens billed for this request.

        - `text_tokens: optional integer`

          Number of text tokens billed for this request.

    - `Duration object { seconds, type }`

      Usage statistics for models billed by audio input duration.

      - `seconds: number`

        Duration of the input audio in seconds.

        `format: double`

      - `type: "duration"`

        The type of the usage object. Always `duration` for this variant.

        - `"duration"`

- `TranscriptionDiarized object { duration, segments, task, 2 more }`

  Represents a diarized transcription response returned by the model, including the combined transcript and speaker-segment annotations.

  - `duration: number`

    Duration of the input audio in seconds.

    `format: double`

  - `segments: array of TranscriptionDiarizedSegment`

    Segments of the transcript annotated with timestamps and speaker labels.

    - `id: string`

      Unique identifier for the segment.

    - `end: number`

      End timestamp of the segment in seconds.

      `format: double`

    - `speaker: string`

      Speaker label for this segment. When known speakers are provided, the label matches `known_speaker_names[]`. Otherwise speakers are labeled sequentially using capital letters (`A`, `B`, ...).

    - `start: number`

      Start timestamp of the segment in seconds.

      `format: double`

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

  - `usage: optional Tokens { input_tokens, output_tokens, total_tokens, 2 more }  or Duration { seconds, type }`

    Token or duration usage statistics for the request.

    - `Tokens object { input_tokens, output_tokens, total_tokens, 2 more }`

      Usage statistics for models billed by token usage.

      - `input_tokens: integer`

        Number of input tokens billed for this request.

      - `output_tokens: integer`

        Number of output tokens generated.

      - `total_tokens: integer`

        Total number of tokens used (input + output).

      - `type: "tokens"`

        The type of the usage object. Always `tokens` for this variant.

        - `"tokens"`

      - `input_token_details: optional object { audio_tokens, text_tokens }`

        Details about the input tokens billed for this request.

        - `audio_tokens: optional integer`

          Number of audio tokens billed for this request.

        - `text_tokens: optional integer`

          Number of text tokens billed for this request.

    - `Duration object { seconds, type }`

      Usage statistics for models billed by audio input duration.

      - `seconds: number`

        Duration of the input audio in seconds.

        `format: double`

      - `type: "duration"`

        The type of the usage object. Always `duration` for this variant.

        - `"duration"`

- `TranscriptionVerbose object { duration, language, text, 3 more }`

  Represents a verbose json transcription response returned by model, based on the provided input.

  - `duration: number`

    The duration of the input audio.

    `format: double`

  - `language: string`

    The language of the input audio.

  - `text: string`

    The transcribed text.

  - `segments: optional array of TranscriptionSegment`

    Segments of the transcribed text and their corresponding details.

    - `id: integer`

      Unique identifier of the segment.

    - `avg_logprob: number`

      Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.

      `format: float`

    - `compression_ratio: number`

      Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.

      `format: float`

    - `end: number`

      End time of the segment in seconds.

      `format: double`

    - `no_speech_prob: number`

      Probability of no speech in the segment. If the value is higher than 1.0 and the `avg_logprob` is below -1, consider this segment silent.

      `format: float`

    - `seek: integer`

      Seek offset of the segment.

    - `start: number`

      Start time of the segment in seconds.

      `format: double`

    - `temperature: number`

      Temperature parameter used for generating the segment.

      `format: float`

    - `text: string`

      Text content of the segment.

    - `tokens: array of number`

      Array of token IDs for the text content.

  - `usage: optional object { seconds, type }`

    Usage statistics for models billed by audio input duration.

    - `seconds: number`

      Duration of the input audio in seconds.

      `format: double`

    - `type: "duration"`

      The type of the usage object. Always `duration` for this variant.

      - `"duration"`

  - `words: optional array of TranscriptionWord`

    Extracted words and their corresponding timestamps.

    - `end: number`

      End time of the word in seconds.

      `format: double`

    - `start: number`

      Start time of the word in seconds.

      `format: double`

    - `word: string`

      The text content of the word.

### Example

```http
curl https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F file="@/path/to/file/audio.mp3" \
  -F model="gpt-transcribe"
```

#### Response example

```json
{
  "text": "Imagine the wildest idea that you've ever had, and you're curious about how it might scale to something that's a 100, a 1,000 times bigger. This is a place where you can get to do that.",
  "usage": {
    "type": "tokens",
    "input_tokens": 14,
    "input_token_details": {
      "text_tokens": 0,
      "audio_tokens": 14
    },
    "output_tokens": 45,
    "total_tokens": 59
  }
}
```

### Diarization

```http
curl https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F file="@/path/to/file/meeting.wav" \
  -F model="gpt-4o-transcribe-diarize" \
  -F response_format="diarized_json" \
  -F chunking_strategy=auto \
  -F 'known_speaker_names[]=agent' \
  -F 'known_speaker_references[]=data:audio/wav;base64,AAA...'
```

#### Response example

```json
{
  "task": "transcribe",
  "duration": 27.4,
  "text": "Agent: Thanks for calling OpenAI support.\nA: Hi, I'm trying to enable diarization.\nAgent: Happy to walk you through the steps.",
  "segments": [
    {
      "type": "transcript.text.segment",
      "id": "seg_001",
      "start": 0.0,
      "end": 4.7,
      "text": "Thanks for calling OpenAI support.",
      "speaker": "agent"
    },
    {
      "type": "transcript.text.segment",
      "id": "seg_002",
      "start": 4.7,
      "end": 11.8,
      "text": "Hi, I'm trying to enable diarization.",
      "speaker": "A"
    },
    {
      "type": "transcript.text.segment",
      "id": "seg_003",
      "start": 12.1,
      "end": 18.5,
      "text": "Happy to walk you through the steps.",
      "speaker": "agent"
    }
  ],
  "usage": {
    "type": "duration",
    "seconds": 27
  }
}
```

### Logprobs

```http
curl https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F file="@/path/to/file/audio.mp3" \
  -F "include[]=logprobs" \
  -F model="gpt-4o-transcribe" \
  -F response_format="json"
```

#### Response example

```json
{
  "text": "Hey, my knee is hurting and I want to see the doctor tomorrow ideally.",
  "logprobs": [
    { "token": "Hey", "logprob": -1.0415299, "bytes": [72, 101, 121] },
    { "token": ",", "logprob": -9.805982e-5, "bytes": [44] },
    { "token": " my", "logprob": -0.00229799, "bytes": [32, 109, 121] },
    {
      "token": " knee",
      "logprob": -4.7159858e-5,
      "bytes": [32, 107, 110, 101, 101]
    },
    { "token": " is", "logprob": -0.043909557, "bytes": [32, 105, 115] },
    {
      "token": " hurting",
      "logprob": -1.1041146e-5,
      "bytes": [32, 104, 117, 114, 116, 105, 110, 103]
    },
    { "token": " and", "logprob": -0.011076359, "bytes": [32, 97, 110, 100] },
    { "token": " I", "logprob": -5.3193703e-6, "bytes": [32, 73] },
    {
      "token": " want",
      "logprob": -0.0017156356,
      "bytes": [32, 119, 97, 110, 116]
    },
    { "token": " to", "logprob": -7.89631e-7, "bytes": [32, 116, 111] },
    { "token": " see", "logprob": -5.5122365e-7, "bytes": [32, 115, 101, 101] },
    { "token": " the", "logprob": -0.0040786397, "bytes": [32, 116, 104, 101] },
    {
      "token": " doctor",
      "logprob": -2.3392786e-6,
      "bytes": [32, 100, 111, 99, 116, 111, 114]
    },
    {
      "token": " tomorrow",
      "logprob": -7.89631e-7,
      "bytes": [32, 116, 111, 109, 111, 114, 114, 111, 119]
    },
    {
      "token": " ideally",
      "logprob": -0.5800861,
      "bytes": [32, 105, 100, 101, 97, 108, 108, 121]
    },
    { "token": ".", "logprob": -0.00011093382, "bytes": [46] }
  ],
  "usage": {
    "type": "tokens",
    "input_tokens": 14,
    "input_token_details": {
      "text_tokens": 0,
      "audio_tokens": 14
    },
    "output_tokens": 45,
    "total_tokens": 59
  }
}
```

### Segment timestamps

```http
curl https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F file="@/path/to/file/audio.mp3" \
  -F "timestamp_granularities[]=segment" \
  -F model="whisper-1" \
  -F response_format="verbose_json"
```

#### Response example

```json
{
  "task": "transcribe",
  "language": "english",
  "duration": 3.32,
  "text": "The beach was a popular spot on a hot summer day.",
  "segments": [
    {
      "id": 0,
      "seek": 0,
      "start": 0.0,
      "end": 3.319999933242798,
      "text": " The beach was a popular spot on a hot summer day.",
      "tokens": [
        50364, 440, 7534, 390, 257, 3743, 4008, 322, 257, 2368, 4266, 786, 13, 50530
      ],
      "temperature": 0.0,
      "avg_logprob": -0.2860786020755768,
      "compression_ratio": 1.2363636493682861,
      "no_speech_prob": 0.00985979475080967
    }
  ],
  "usage": {
    "type": "duration",
    "seconds": 4
  }
}
```

### Streaming

```http
curl https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F file="@/path/to/file/audio.mp3" \
  -F model="gpt-transcribe" \
  -F stream=true
```

#### Response example

```json
data: {"type":"transcript.text.delta","delta":"I"}

data: {"type":"transcript.text.delta","delta":" see"}

data: {"type":"transcript.text.delta","delta":" skies"}

data: {"type":"transcript.text.delta","delta":" of"}

data: {"type":"transcript.text.delta","delta":" blue"}

data: {"type":"transcript.text.delta","delta":" and"}

data: {"type":"transcript.text.delta","delta":" clouds"}

data: {"type":"transcript.text.delta","delta":" of"}

data: {"type":"transcript.text.delta","delta":" white"}

data: {"type":"transcript.text.delta","delta":","}

data: {"type":"transcript.text.delta","delta":" the"}

data: {"type":"transcript.text.delta","delta":" bright"}

data: {"type":"transcript.text.delta","delta":" blessed"}

data: {"type":"transcript.text.delta","delta":" days"}

data: {"type":"transcript.text.delta","delta":","}

data: {"type":"transcript.text.delta","delta":" the"}

data: {"type":"transcript.text.delta","delta":" dark"}

data: {"type":"transcript.text.delta","delta":" sacred"}

data: {"type":"transcript.text.delta","delta":" nights"}

data: {"type":"transcript.text.delta","delta":","}

data: {"type":"transcript.text.delta","delta":" and"}

data: {"type":"transcript.text.delta","delta":" I"}

data: {"type":"transcript.text.delta","delta":" think"}

data: {"type":"transcript.text.delta","delta":" to"}

data: {"type":"transcript.text.delta","delta":" myself"}

data: {"type":"transcript.text.delta","delta":","}

data: {"type":"transcript.text.delta","delta":" what"}

data: {"type":"transcript.text.delta","delta":" a"}

data: {"type":"transcript.text.delta","delta":" wonderful"}

data: {"type":"transcript.text.delta","delta":" world"}

data: {"type":"transcript.text.delta","delta":"."}

data: {"type":"transcript.text.done","text":"I see skies of blue and clouds of white, the bright blessed days, the dark sacred nights, and I think to myself, what a wonderful world.","languages":[{"code":"en"}],"usage":{"type":"tokens","input_tokens":14,"input_token_details":{"text_tokens":0,"audio_tokens":14},"output_tokens":45,"total_tokens":59}}
```

### Word timestamps

```http
curl https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F file="@/path/to/file/audio.mp3" \
  -F "timestamp_granularities[]=word" \
  -F model="whisper-1" \
  -F response_format="verbose_json"
```

#### Response example

```json
{
  "task": "transcribe",
  "language": "english",
  "duration": 0.5,
  "text": "Hello.",
  "words": [
    {
      "word": "Hello",
      "start": 0.0,
      "end": 0.5
    }
  ],
  "usage": {
    "type": "duration",
    "seconds": 1
  }
}
```
