## Create translation

**post** `/audio/translations`

Translates audio into English.

This endpoint supports only `whisper-1`. The endpoint and model are deprecated
and scheduled to shut down on February 26, 2027. Migrate to
`/v1/realtime/translations`, which requires a separate integration. See the
[deprecation schedule](https://developers.openai.com/api/docs/deprecations)
for details.

### Returns

- `Translation object { text }`

  - `text: string`

- `TranslationVerbose object { duration, language, text, segments }`

  - `duration: number`

    The duration of the input audio.

    `format: double`

  - `language: string`

    The language of the output translation (always `english`).

  - `text: string`

    The translated text.

  - `segments: optional array of TranscriptionSegment`

    Segments of the translated text and their corresponding details.

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

### Example

```http
curl https://api.openai.com/v1/audio/translations \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F 'file=@/path/to/file' \
    -F model=whisper-1
```

#### 200 — Example

```json
{
  "text": "text"
}
```

### Example

```http
curl https://api.openai.com/v1/audio/translations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F file="@/path/to/file/german.m4a" \
  -F model="whisper-1"
```

#### Response example

```json
{
  "text": "Hello, my name is Wolfgang and I come from Germany. Where are you heading today?"
}
```
