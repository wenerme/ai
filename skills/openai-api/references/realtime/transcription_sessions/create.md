## Create

**post** `/realtime/transcription_sessions`

Create an ephemeral API token for use in client-side applications with the
Realtime API specifically for realtime transcriptions.
Can be configured with the same session parameters as the `transcription_session.update` client event.

It responds with a session object, plus a `client_secret` key which contains
a usable ephemeral API token that can be used to authenticate browser clients
for the Realtime API.

Returns the created Realtime transcription session object, plus an ephemeral key.

### Body Parameters

- `include: optional array of "item.input_audio_transcription.logprobs"`

  The set of items to include in the transcription. Current available items are:
  `item.input_audio_transcription.logprobs`

  - `"item.input_audio_transcription.logprobs"`

- `input_audio_format: optional "pcm16" or "g711_ulaw" or "g711_alaw"`

  The format of input audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
  For `pcm16`, input audio must be 16-bit PCM at a 24kHz sample rate,
  single channel (mono), and little-endian byte order.

  - `"pcm16"`

  - `"g711_ulaw"`

  - `"g711_alaw"`

- `input_audio_noise_reduction: optional object { type }`

  Configuration for input audio noise reduction. This can be set to `null` to turn off.
  Noise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.
  Filtering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.

  - `type: optional NoiseReductionType`

    Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones.

    - `"near_field"`

    - `"far_field"`

- `input_audio_transcription: optional AudioTranscription`

  Configuration for input audio transcription. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service.

  - `language: optional string`

    The language of the input audio. Supplying the input language in
    [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
    will improve accuracy and latency.

  - `model: optional string or "whisper-1" or "gpt-4o-mini-transcribe" or "gpt-4o-mini-transcribe-2025-12-15" or 2 more`

    The model to use for transcription. Current options are `whisper-1`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, and `gpt-4o-transcribe-diarize`. Use `gpt-4o-transcribe-diarize` when you need diarization with speaker labels.

    - `UnionMember0 = string`

    - `UnionMember1 = "whisper-1" or "gpt-4o-mini-transcribe" or "gpt-4o-mini-transcribe-2025-12-15" or 2 more`

      The model to use for transcription. Current options are `whisper-1`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, and `gpt-4o-transcribe-diarize`. Use `gpt-4o-transcribe-diarize` when you need diarization with speaker labels.

      - `"whisper-1"`

      - `"gpt-4o-mini-transcribe"`

      - `"gpt-4o-mini-transcribe-2025-12-15"`

      - `"gpt-4o-transcribe"`

      - `"gpt-4o-transcribe-diarize"`

  - `prompt: optional string`

    An optional text to guide the model's style or continue a previous audio
    segment.
    For `whisper-1`, the [prompt is a list of keywords](/docs/guides/speech-to-text#prompting).
    For `gpt-4o-transcribe` models (excluding `gpt-4o-transcribe-diarize`), the prompt is a free text string, for example "expect words related to technology".

- `turn_detection: optional object { prefix_padding_ms, silence_duration_ms, threshold, type }`

  Configuration for turn detection. Can be set to `null` to turn off. Server VAD means that the model will detect the start and end of speech based on audio volume and respond at the end of user speech.

  - `prefix_padding_ms: optional number`

    Amount of audio to include before the VAD detected speech (in
    milliseconds). Defaults to 300ms.

  - `silence_duration_ms: optional number`

    Duration of silence to detect speech stop (in milliseconds). Defaults
    to 500ms. With shorter values the model will respond more quickly,
    but may jump in on short pauses from the user.

  - `threshold: optional number`

    Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A
    higher threshold will require louder audio to activate the model, and
    thus might perform better in noisy environments.

  - `type: optional "server_vad"`

    Type of turn detection. Only `server_vad` is currently supported for transcription sessions.

    - `"server_vad"`

### Returns

- `client_secret: object { expires_at, value }`

  Ephemeral key returned by the API. Only present when the session is
  created on the server via REST API.

  - `expires_at: number`

    Timestamp for when the token expires. Currently, all tokens expire
    after one minute.

  - `value: string`

    Ephemeral key usable in client environments to authenticate connections
    to the Realtime API. Use this in client-side environments rather than
    a standard API token, which should only be used server-side.

- `input_audio_format: optional string`

  The format of input audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.

- `input_audio_transcription: optional AudioTranscription`

  Configuration of the transcription model.

  - `language: optional string`

    The language of the input audio. Supplying the input language in
    [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
    will improve accuracy and latency.

  - `model: optional string or "whisper-1" or "gpt-4o-mini-transcribe" or "gpt-4o-mini-transcribe-2025-12-15" or 2 more`

    The model to use for transcription. Current options are `whisper-1`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, and `gpt-4o-transcribe-diarize`. Use `gpt-4o-transcribe-diarize` when you need diarization with speaker labels.

    - `UnionMember0 = string`

    - `UnionMember1 = "whisper-1" or "gpt-4o-mini-transcribe" or "gpt-4o-mini-transcribe-2025-12-15" or 2 more`

      The model to use for transcription. Current options are `whisper-1`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, and `gpt-4o-transcribe-diarize`. Use `gpt-4o-transcribe-diarize` when you need diarization with speaker labels.

      - `"whisper-1"`

      - `"gpt-4o-mini-transcribe"`

      - `"gpt-4o-mini-transcribe-2025-12-15"`

      - `"gpt-4o-transcribe"`

      - `"gpt-4o-transcribe-diarize"`

  - `prompt: optional string`

    An optional text to guide the model's style or continue a previous audio
    segment.
    For `whisper-1`, the [prompt is a list of keywords](/docs/guides/speech-to-text#prompting).
    For `gpt-4o-transcribe` models (excluding `gpt-4o-transcribe-diarize`), the prompt is a free text string, for example "expect words related to technology".

- `modalities: optional array of "text" or "audio"`

  The set of modalities the model can respond with. To disable audio,
  set this to ["text"].

  - `"text"`

  - `"audio"`

- `turn_detection: optional object { prefix_padding_ms, silence_duration_ms, threshold, type }`

  Configuration for turn detection. Can be set to `null` to turn off. Server
  VAD means that the model will detect the start and end of speech based on
  audio volume and respond at the end of user speech.

  - `prefix_padding_ms: optional number`

    Amount of audio to include before the VAD detected speech (in
    milliseconds). Defaults to 300ms.

  - `silence_duration_ms: optional number`

    Duration of silence to detect speech stop (in milliseconds). Defaults
    to 500ms. With shorter values the model will respond more quickly,
    but may jump in on short pauses from the user.

  - `threshold: optional number`

    Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A
    higher threshold will require louder audio to activate the model, and
    thus might perform better in noisy environments.

  - `type: optional string`

    Type of turn detection, only `server_vad` is currently supported.

### Example

```http
curl https://api.openai.com/v1/realtime/transcription_sessions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{}'
```
