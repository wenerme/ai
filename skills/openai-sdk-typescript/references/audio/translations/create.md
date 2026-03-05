## Create

`client.audio.translations.create(TranslationCreateParamsbody, RequestOptionsoptions?): TranslationCreateResponse`

**post** `/audio/translations`

Translates audio into English.

### Parameters

- `body: TranslationCreateParams`

  - `file: Uploadable`

    The audio file object (not file name) translate, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.

  - `model: (string & {}) | AudioModel`

    ID of the model to use. Only `whisper-1` (which is powered by our open source Whisper V2 model) is currently available.

    - `(string & {})`

    - `AudioModel = "whisper-1" | "gpt-4o-transcribe" | "gpt-4o-mini-transcribe" | 2 more`

      - `"whisper-1"`

      - `"gpt-4o-transcribe"`

      - `"gpt-4o-mini-transcribe"`

      - `"gpt-4o-mini-transcribe-2025-12-15"`

      - `"gpt-4o-transcribe-diarize"`

  - `prompt?: string`

    An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://platform.openai.com/docs/guides/speech-to-text#prompting) should be in English.

  - `response_format?: "json" | "text" | "srt" | 2 more`

    The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, or `vtt`.

    - `"json"`

    - `"text"`

    - `"srt"`

    - `"verbose_json"`

    - `"vtt"`

  - `temperature?: number`

    The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.

### Returns

- `TranslationCreateResponse = Translation | TranslationVerbose`

  - `Translation`

    - `text: string`

  - `TranslationVerbose`

    - `duration: number`

      The duration of the input audio.

    - `language: string`

      The language of the output translation (always `english`).

    - `text: string`

      The translated text.

    - `segments?: Array<TranscriptionSegment>`

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

      - `tokens: Array<number>`

        Array of token IDs for the text content.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const translation = await client.audio.translations.create({
  file: fs.createReadStream('speech.mp3'),
  model: 'whisper-1',
});

console.log(translation);
```
