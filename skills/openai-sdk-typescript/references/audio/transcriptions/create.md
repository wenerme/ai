## Create transcription

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

  - `TranscriptionCreateParamsStreaming extends TranscriptionCreateParamsBase`

    - `stream: true`

      If set to true, the model response data will be streamed to the client
      as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
      See the [Streaming section of the Speech-to-Text guide](https://platform.openai.com/docs/guides/speech-to-text?lang=curl#streaming-transcriptions)
      for more information.

      Note: Streaming is not supported for the `whisper-1` model and will be ignored.

      - `true`

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

#### Response

```json
{
  "text": "text",
  "logprobs": [
    {
      "token": "token",
      "bytes": [
        0
      ],
      "logprob": 0
    }
  ],
  "usage": {
    "input_tokens": 0,
    "output_tokens": 0,
    "total_tokens": 0,
    "type": "tokens",
    "input_token_details": {
      "audio_tokens": 0,
      "text_tokens": 0
    }
  }
}
```

### Example

```typescript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio.mp3"),
    model: "gpt-4o-transcribe",
  });

  console.log(transcription.text);
}
main();
```

#### Response

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

```typescript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

const speakerRef = fs.readFileSync("agent.wav").toString("base64");

const transcript = await openai.audio.transcriptions.create({
  file: fs.createReadStream("meeting.wav"),
  model: "gpt-4o-transcribe-diarize",
  response_format: "diarized_json",
  chunking_strategy: "auto",
  extra_body: {
    known_speaker_names: ["agent"],
    known_speaker_references: [`data:audio/wav;base64,${speakerRef}`],
  },
});

console.log(transcript.segments);
```

#### Response

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

### Streaming

```typescript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

const stream = await openai.audio.transcriptions.create({
  file: fs.createReadStream("audio.mp3"),
  model: "gpt-4o-mini-transcribe",
  stream: true,
});

for await (const event of stream) {
  console.log(event);
}
```

#### Response

```json
data: {"type":"transcript.text.delta","delta":"I","logprobs":[{"token":"I","logprob":-0.00007588794,"bytes":[73]}]}

data: {"type":"transcript.text.delta","delta":" see","logprobs":[{"token":" see","logprob":-3.1281633e-7,"bytes":[32,115,101,101]}]}

data: {"type":"transcript.text.delta","delta":" skies","logprobs":[{"token":" skies","logprob":-2.3392786e-6,"bytes":[32,115,107,105,101,115]}]}

data: {"type":"transcript.text.delta","delta":" of","logprobs":[{"token":" of","logprob":-3.1281633e-7,"bytes":[32,111,102]}]}

data: {"type":"transcript.text.delta","delta":" blue","logprobs":[{"token":" blue","logprob":-1.0280384e-6,"bytes":[32,98,108,117,101]}]}

data: {"type":"transcript.text.delta","delta":" and","logprobs":[{"token":" and","logprob":-0.0005108566,"bytes":[32,97,110,100]}]}

data: {"type":"transcript.text.delta","delta":" clouds","logprobs":[{"token":" clouds","logprob":-1.9361265e-7,"bytes":[32,99,108,111,117,100,115]}]}

data: {"type":"transcript.text.delta","delta":" of","logprobs":[{"token":" of","logprob":-1.9361265e-7,"bytes":[32,111,102]}]}

data: {"type":"transcript.text.delta","delta":" white","logprobs":[{"token":" white","logprob":-7.89631e-7,"bytes":[32,119,104,105,116,101]}]}

data: {"type":"transcript.text.delta","delta":",","logprobs":[{"token":",","logprob":-0.0014890312,"bytes":[44]}]}

data: {"type":"transcript.text.delta","delta":" the","logprobs":[{"token":" the","logprob":-0.0110956915,"bytes":[32,116,104,101]}]}

data: {"type":"transcript.text.delta","delta":" bright","logprobs":[{"token":" bright","logprob":0.0,"bytes":[32,98,114,105,103,104,116]}]}

data: {"type":"transcript.text.delta","delta":" blessed","logprobs":[{"token":" blessed","logprob":-0.000045848617,"bytes":[32,98,108,101,115,115,101,100]}]}

data: {"type":"transcript.text.delta","delta":" days","logprobs":[{"token":" days","logprob":-0.000010802739,"bytes":[32,100,97,121,115]}]}

data: {"type":"transcript.text.delta","delta":",","logprobs":[{"token":",","logprob":-0.00001700133,"bytes":[44]}]}

data: {"type":"transcript.text.delta","delta":" the","logprobs":[{"token":" the","logprob":-0.0000118755715,"bytes":[32,116,104,101]}]}

data: {"type":"transcript.text.delta","delta":" dark","logprobs":[{"token":" dark","logprob":-5.5122365e-7,"bytes":[32,100,97,114,107]}]}

data: {"type":"transcript.text.delta","delta":" sacred","logprobs":[{"token":" sacred","logprob":-5.4385737e-6,"bytes":[32,115,97,99,114,101,100]}]}

data: {"type":"transcript.text.delta","delta":" nights","logprobs":[{"token":" nights","logprob":-4.00813e-6,"bytes":[32,110,105,103,104,116,115]}]}

data: {"type":"transcript.text.delta","delta":",","logprobs":[{"token":",","logprob":-0.0036910512,"bytes":[44]}]}

data: {"type":"transcript.text.delta","delta":" and","logprobs":[{"token":" and","logprob":-0.0031903093,"bytes":[32,97,110,100]}]}

data: {"type":"transcript.text.delta","delta":" I","logprobs":[{"token":" I","logprob":-1.504853e-6,"bytes":[32,73]}]}

data: {"type":"transcript.text.delta","delta":" think","logprobs":[{"token":" think","logprob":-4.3202e-7,"bytes":[32,116,104,105,110,107]}]}

data: {"type":"transcript.text.delta","delta":" to","logprobs":[{"token":" to","logprob":-1.9361265e-7,"bytes":[32,116,111]}]}

data: {"type":"transcript.text.delta","delta":" myself","logprobs":[{"token":" myself","logprob":-1.7432603e-6,"bytes":[32,109,121,115,101,108,102]}]}

data: {"type":"transcript.text.delta","delta":",","logprobs":[{"token":",","logprob":-0.29254505,"bytes":[44]}]}

data: {"type":"transcript.text.delta","delta":" what","logprobs":[{"token":" what","logprob":-0.016815351,"bytes":[32,119,104,97,116]}]}

data: {"type":"transcript.text.delta","delta":" a","logprobs":[{"token":" a","logprob":-3.1281633e-7,"bytes":[32,97]}]}

data: {"type":"transcript.text.delta","delta":" wonderful","logprobs":[{"token":" wonderful","logprob":-2.1008714e-6,"bytes":[32,119,111,110,100,101,114,102,117,108]}]}

data: {"type":"transcript.text.delta","delta":" world","logprobs":[{"token":" world","logprob":-8.180258e-6,"bytes":[32,119,111,114,108,100]}]}

data: {"type":"transcript.text.delta","delta":".","logprobs":[{"token":".","logprob":-0.014231676,"bytes":[46]}]}

data: {"type":"transcript.text.done","text":"I see skies of blue and clouds of white, the bright blessed days, the dark sacred nights, and I think to myself, what a wonderful world.","logprobs":[{"token":"I","logprob":-0.00007588794,"bytes":[73]},{"token":" see","logprob":-3.1281633e-7,"bytes":[32,115,101,101]},{"token":" skies","logprob":-2.3392786e-6,"bytes":[32,115,107,105,101,115]},{"token":" of","logprob":-3.1281633e-7,"bytes":[32,111,102]},{"token":" blue","logprob":-1.0280384e-6,"bytes":[32,98,108,117,101]},{"token":" and","logprob":-0.0005108566,"bytes":[32,97,110,100]},{"token":" clouds","logprob":-1.9361265e-7,"bytes":[32,99,108,111,117,100,115]},{"token":" of","logprob":-1.9361265e-7,"bytes":[32,111,102]},{"token":" white","logprob":-7.89631e-7,"bytes":[32,119,104,105,116,101]},{"token":",","logprob":-0.0014890312,"bytes":[44]},{"token":" the","logprob":-0.0110956915,"bytes":[32,116,104,101]},{"token":" bright","logprob":0.0,"bytes":[32,98,114,105,103,104,116]},{"token":" blessed","logprob":-0.000045848617,"bytes":[32,98,108,101,115,115,101,100]},{"token":" days","logprob":-0.000010802739,"bytes":[32,100,97,121,115]},{"token":",","logprob":-0.00001700133,"bytes":[44]},{"token":" the","logprob":-0.0000118755715,"bytes":[32,116,104,101]},{"token":" dark","logprob":-5.5122365e-7,"bytes":[32,100,97,114,107]},{"token":" sacred","logprob":-5.4385737e-6,"bytes":[32,115,97,99,114,101,100]},{"token":" nights","logprob":-4.00813e-6,"bytes":[32,110,105,103,104,116,115]},{"token":",","logprob":-0.0036910512,"bytes":[44]},{"token":" and","logprob":-0.0031903093,"bytes":[32,97,110,100]},{"token":" I","logprob":-1.504853e-6,"bytes":[32,73]},{"token":" think","logprob":-4.3202e-7,"bytes":[32,116,104,105,110,107]},{"token":" to","logprob":-1.9361265e-7,"bytes":[32,116,111]},{"token":" myself","logprob":-1.7432603e-6,"bytes":[32,109,121,115,101,108,102]},{"token":",","logprob":-0.29254505,"bytes":[44]},{"token":" what","logprob":-0.016815351,"bytes":[32,119,104,97,116]},{"token":" a","logprob":-3.1281633e-7,"bytes":[32,97]},{"token":" wonderful","logprob":-2.1008714e-6,"bytes":[32,119,111,110,100,101,114,102,117,108]},{"token":" world","logprob":-8.180258e-6,"bytes":[32,119,111,114,108,100]},{"token":".","logprob":-0.014231676,"bytes":[46]}],"usage":{"input_tokens":14,"input_token_details":{"text_tokens":0,"audio_tokens":14},"output_tokens":45,"total_tokens":59}}
```

### Logprobs

```typescript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio.mp3"),
    model: "gpt-4o-transcribe",
    response_format: "json",
    include: ["logprobs"]
  });

  console.log(transcription);
}
main();
```

#### Response

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

### Word timestamps

```typescript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio.mp3"),
    model: "whisper-1",
    response_format: "verbose_json",
    timestamp_granularities: ["word"]
  });

  console.log(transcription.text);
}
main();
```

#### Response

```json
{
  "task": "transcribe",
  "language": "english",
  "duration": 8.470000267028809,
  "text": "The beach was a popular spot on a hot summer day. People were swimming in the ocean, building sandcastles, and playing beach volleyball.",
  "words": [
    {
      "word": "The",
      "start": 0.0,
      "end": 0.23999999463558197
    },
    ...
    {
      "word": "volleyball",
      "start": 7.400000095367432,
      "end": 7.900000095367432
    }
  ],
  "usage": {
    "type": "duration",
    "seconds": 9
  }
}
```

### Segment timestamps

```typescript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio.mp3"),
    model: "whisper-1",
    response_format: "verbose_json",
    timestamp_granularities: ["segment"]
  });

  console.log(transcription.text);
}
main();
```

#### Response

```json
{
  "task": "transcribe",
  "language": "english",
  "duration": 8.470000267028809,
  "text": "The beach was a popular spot on a hot summer day. People were swimming in the ocean, building sandcastles, and playing beach volleyball.",
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
    },
    ...
  ],
  "usage": {
    "type": "duration",
    "seconds": 9
  }
}
```
