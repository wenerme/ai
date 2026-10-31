## Create voice consent

**post** `/audio/voice_consents`

Upload a voice consent recording.

### Body Parameters

Content type: `multipart/form-data`

- `language: string`

  The BCP 47 language tag for the consent phrase (for example, `en-US`).

- `name: string`

  The label to use for this consent recording.

- `recording: string`

  The consent audio recording file. Maximum size is 10 MiB.

  Supported MIME types:
  `audio/mpeg`, `audio/wav`, `audio/x-wav`, `audio/ogg`, `audio/aac`, `audio/flac`, `audio/webm`, `audio/mp4`.

### Returns

- `VoiceConsent object { id, created_at, language, 2 more }`

  A consent recording used to authorize creation of a custom voice.

  - `id: string`

    The consent recording identifier.

  - `created_at: integer`

    The Unix timestamp (in seconds) for when the consent recording was created.

    `format: unixtime`

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

#### 200 — Example

```json
{
  "id": "cons_1234",
  "created_at": 0,
  "language": "language",
  "name": "name",
  "object": "audio.voice_consent"
}
```

### Example

```http
curl https://api.openai.com/v1/audio/voice_consents \
  -X POST \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "name=John Doe" \
  -F "language=en-US" \
  -F "recording=@$HOME/consent_recording.wav;type=audio/x-wav"
```
