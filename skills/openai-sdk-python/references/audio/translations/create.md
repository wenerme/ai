## Create

`audio.translations.create(TranslationCreateParams**kwargs)  -> TranslationCreateResponse`

**post** `/audio/translations`

Translates audio into English.

### Parameters

- `file: FileTypes`

  The audio file object (not file name) translate, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.

- `model: Union[str, AudioModel]`

  ID of the model to use. Only `whisper-1` (which is powered by our open source Whisper V2 model) is currently available.

  - `str`

  - `Literal["whisper-1", "gpt-4o-transcribe", "gpt-4o-mini-transcribe", 2 more]`

    - `"whisper-1"`

    - `"gpt-4o-transcribe"`

    - `"gpt-4o-mini-transcribe"`

    - `"gpt-4o-mini-transcribe-2025-12-15"`

    - `"gpt-4o-transcribe-diarize"`

- `prompt: Optional[str]`

  An optional text to guide the model's style or continue a previous audio segment. The [prompt](https://platform.openai.com/docs/guides/speech-to-text#prompting) should be in English.

- `response_format: Optional[Literal["json", "text", "srt", 2 more]]`

  The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, or `vtt`.

  - `"json"`

  - `"text"`

  - `"srt"`

  - `"verbose_json"`

  - `"vtt"`

- `temperature: Optional[float]`

  The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.

### Returns

- `TranslationCreateResponse`

  - `class Translation: …`

    - `text: str`

  - `class TranslationVerbose: …`

    - `duration: float`

      The duration of the input audio.

    - `language: str`

      The language of the output translation (always `english`).

    - `text: str`

      The translated text.

    - `segments: Optional[List[TranscriptionSegment]]`

      Segments of the translated text and their corresponding details.

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

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
translation = client.audio.translations.create(
    file=b"raw file contents",
    model="whisper-1",
)
print(translation)
```
