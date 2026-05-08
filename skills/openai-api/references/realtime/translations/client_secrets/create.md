## Create translation client secret

**post** `/realtime/translations/client_secrets`

Create a Realtime translation client secret with an associated translation session configuration.

Client secrets are short-lived tokens that can be passed to a client app,
such as a web frontend or mobile client, which grants access to the Realtime
Translation API without leaking your main API key. You can configure a custom
TTL for each client secret.

Returns the created client secret and the effective translation session object.
The client secret is a string that looks like `ek_1234`.

### Body Parameters

- `session: RealtimeTranslationSessionCreateRequest`

  Realtime translation session configuration. Translation sessions stream source
  audio in and translated audio plus transcript deltas out continuously.

  - `model: string`

    The Realtime translation model used for this session.

  - `audio: optional object { input, output }`

    Configuration for translation input and output audio.

    - `input: optional object { noise_reduction, transcription }`

      - `noise_reduction: optional object { type }`

        Optional input noise reduction. Set to `null` to disable it.

        - `type: NoiseReductionType`

          Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones.

          - `"near_field"`

          - `"far_field"`

      - `transcription: optional object { model }`

        Optional source-language transcription. When configured, the server emits
        `session.input_transcript.delta` events. Translation itself still runs from
        the input audio stream.

        - `model: string`

          The transcription model to use for source transcript deltas.

    - `output: optional object { language }`

      - `language: optional string`

        Target language for translated output audio and transcript deltas.

- `expires_after: optional object { anchor, seconds }`

  Configuration for the client secret expiration. Expiration refers to the time after which
  a client secret will no longer be valid for creating sessions. The session itself may
  continue after that time once started. A secret can be used to create multiple sessions
  until it expires.

  - `anchor: optional "created_at"`

    The anchor point for the client secret expiration, meaning that `seconds` will be added to the `created_at` time of the client secret to produce an expiration timestamp. Only `created_at` is currently supported.

    - `"created_at"`

  - `seconds: optional number`

    The number of seconds from the anchor point to the expiration. Select a value between `10` and `7200` (2 hours). This default to 600 seconds (10 minutes) if not specified.

### Returns

- `RealtimeTranslationClientSecretCreateResponse object { expires_at, session, value }`

  Response from creating a translation session and client secret for the Realtime API.

  - `expires_at: number`

    Expiration timestamp for the client secret, in seconds since epoch.

  - `session: RealtimeTranslationSession`

    A Realtime translation session. Translation sessions continuously translate input
    audio into the configured output language.

    - `id: string`

      Unique identifier for the session that looks like `sess_1234567890abcdef`.

    - `audio: object { input, output }`

      Configuration for translation input and output audio.

      - `input: optional object { noise_reduction, transcription }`

        - `noise_reduction: optional object { type }`

          Optional input noise reduction.

          - `type: NoiseReductionType`

            Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones.

            - `"near_field"`

            - `"far_field"`

        - `transcription: optional object { model }`

          Optional source-language transcription. When configured, the server emits
          `session.input_transcript.delta` events. Translation itself still runs from
          the input audio stream.

          - `model: string`

            The transcription model used for source transcript deltas.

      - `output: optional object { language }`

        - `language: optional string`

          Target language for translated output audio and transcript deltas.

    - `expires_at: number`

      Expiration timestamp for the session, in seconds since epoch.

    - `model: string`

      The Realtime translation model used for this session. This field is set at
      session creation and cannot be changed with `session.update`.

    - `type: "translation"`

      The session type. Always `translation` for Realtime translation sessions.

      - `"translation"`

  - `value: string`

    The generated client secret value.

### Example

```http
curl https://api.openai.com/v1/realtime/translations/client_secrets \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "session": {
            "model": "model"
          }
        }'
```

#### Response

```json
{
  "expires_at": 0,
  "session": {
    "id": "id",
    "audio": {
      "input": {
        "noise_reduction": {
          "type": "near_field"
        },
        "transcription": {
          "model": "model"
        }
      },
      "output": {
        "language": "language"
      }
    },
    "expires_at": 0,
    "model": "model",
    "type": "translation"
  },
  "value": "value"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/realtime/translations/client_secrets \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "expires_after": {
      "anchor": "created_at",
      "seconds": 600
    },
    "session": {
      "model": "gpt-realtime-translate",
      "audio": {
        "input": {
          "transcription": {
            "model": "gpt-realtime-whisper"
          },
          "noise_reduction": null
        },
        "output": {
          "language": "es"
        }
      }
    }
  }'
```

#### Response

```json
{
  "value": "ek_68af296e8e408191a1120ab6383263c2",
  "expires_at": 1756310470,
  "session": {
    "id": "sess_C9CiUVUzUzYIssh3ELY1d",
    "type": "translation",
    "expires_at": 1756310470,
    "model": "gpt-realtime-translate",
    "audio": {
      "input": {
        "transcription": {
          "model": "gpt-realtime-whisper"
        },
        "noise_reduction": null
      },
      "output": {
        "language": "es"
      }
    }
  }
}
```
