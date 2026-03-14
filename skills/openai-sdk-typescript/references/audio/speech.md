# Speech

## Create

`client.audio.speech.create(SpeechCreateParamsbody, RequestOptionsoptions?): Response`

**post** `/audio/speech`

Generates audio from the input text.

Returns the audio file content, or a stream of audio events.

### Parameters

- `body: SpeechCreateParams`

  - `input: string`

    The text to generate audio for. The maximum length is 4096 characters.

  - `model: (string & {}) | SpeechModel`

    One of the available [TTS models](https://platform.openai.com/docs/models#tts): `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts`, or `gpt-4o-mini-tts-2025-12-15`.

    - `(string & {})`

    - `SpeechModel = "tts-1" | "tts-1-hd" | "gpt-4o-mini-tts" | "gpt-4o-mini-tts-2025-12-15"`

      - `"tts-1"`

      - `"tts-1-hd"`

      - `"gpt-4o-mini-tts"`

      - `"gpt-4o-mini-tts-2025-12-15"`

  - `voice: string | "alloy" | "ash" | "ballad" | 7 more | ID`

    The voice to use when generating the audio. Supported built-in voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`, `verse`, `marin`, and `cedar`. You may also provide a custom voice object with an `id`, for example `{ "id": "voice_1234" }`. Previews of the voices are available in the [Text to speech guide](https://platform.openai.com/docs/guides/text-to-speech#voice-options).

    - `string`

    - `"alloy" | "ash" | "ballad" | 7 more`

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

    - `ID`

      Custom voice reference.

      - `id: string`

        The custom voice ID, e.g. `voice_1234`.

  - `instructions?: string`

    Control the voice of your generated audio with additional instructions. Does not work with `tts-1` or `tts-1-hd`.

  - `response_format?: "mp3" | "opus" | "aac" | 3 more`

    The format to audio in. Supported formats are `mp3`, `opus`, `aac`, `flac`, `wav`, and `pcm`.

    - `"mp3"`

    - `"opus"`

    - `"aac"`

    - `"flac"`

    - `"wav"`

    - `"pcm"`

  - `speed?: number`

    The speed of the generated audio. Select a value from `0.25` to `4.0`. `1.0` is the default.

  - `stream_format?: "sse" | "audio"`

    The format to stream the audio in. Supported formats are `sse` and `audio`. `sse` is not supported for `tts-1` or `tts-1-hd`.

    - `"sse"`

    - `"audio"`

### Returns

- `unnamed_schema_1 = Response`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const speech = await client.audio.speech.create({
  input: 'input',
  model: 'string',
  voice: 'string',
});

console.log(speech);

const content = await speech.blob();
console.log(content);
```

## Domain Types

### Speech Model

- `SpeechModel = "tts-1" | "tts-1-hd" | "gpt-4o-mini-tts" | "gpt-4o-mini-tts-2025-12-15"`

  - `"tts-1"`

  - `"tts-1-hd"`

  - `"gpt-4o-mini-tts"`

  - `"gpt-4o-mini-tts-2025-12-15"`
