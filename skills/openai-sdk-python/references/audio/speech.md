# Speech

## Create

`audio.speech.create(SpeechCreateParams**kwargs)  -> BinaryResponseContent`

**post** `/audio/speech`

Generates audio from the input text.

Returns the audio file content, or a stream of audio events.

### Parameters

- `input: str`

  The text to generate audio for. The maximum length is 4096 characters.

- `model: Union[str, SpeechModel]`

  One of the available [TTS models](https://platform.openai.com/docs/models#tts): `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts`, or `gpt-4o-mini-tts-2025-12-15`.

  - `str`

  - `Literal["tts-1", "tts-1-hd", "gpt-4o-mini-tts", "gpt-4o-mini-tts-2025-12-15"]`

    - `"tts-1"`

    - `"tts-1-hd"`

    - `"gpt-4o-mini-tts"`

    - `"gpt-4o-mini-tts-2025-12-15"`

- `voice: Union[str, Literal["alloy", "ash", "ballad", 7 more]]`

  The voice to use when generating the audio. Supported built-in voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`, `verse`, `marin`, and `cedar`. Previews of the voices are available in the [Text to speech guide](https://platform.openai.com/docs/guides/text-to-speech#voice-options).

  - `str`

  - `Literal["alloy", "ash", "ballad", 7 more]`

    The voice to use when generating the audio. Supported built-in voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`, `verse`, `marin`, and `cedar`. Previews of the voices are available in the [Text to speech guide](https://platform.openai.com/docs/guides/text-to-speech#voice-options).

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

- `instructions: Optional[str]`

  Control the voice of your generated audio with additional instructions. Does not work with `tts-1` or `tts-1-hd`.

- `response_format: Optional[Literal["mp3", "opus", "aac", 3 more]]`

  The format to audio in. Supported formats are `mp3`, `opus`, `aac`, `flac`, `wav`, and `pcm`.

  - `"mp3"`

  - `"opus"`

  - `"aac"`

  - `"flac"`

  - `"wav"`

  - `"pcm"`

- `speed: Optional[float]`

  The speed of the generated audio. Select a value from `0.25` to `4.0`. `1.0` is the default.

- `stream_format: Optional[Literal["sse", "audio"]]`

  The format to stream the audio in. Supported formats are `sse` and `audio`. `sse` is not supported for `tts-1` or `tts-1-hd`.

  - `"sse"`

  - `"audio"`

### Returns

- `BinaryResponseContent`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
speech = client.audio.speech.create(
    input="input",
    model="string",
    voice="ash",
)
print(speech)
content = speech.read()
print(content)
```

## Domain Types

### Speech Model

- `Literal["tts-1", "tts-1-hd", "gpt-4o-mini-tts", "gpt-4o-mini-tts-2025-12-15"]`

  - `"tts-1"`

  - `"tts-1-hd"`

  - `"gpt-4o-mini-tts"`

  - `"gpt-4o-mini-tts-2025-12-15"`
