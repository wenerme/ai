> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Speech-to-Text

OpenRouter supports speech-to-text (STT) via a dedicated `/api/v1/audio/transcriptions` endpoint. Send base64-encoded audio and receive a JSON response with the transcribed text and usage statistics.

## Model Discovery

You can find STT models in several ways:

### Via the API

Use the `output_modalities` query parameter on the [Models API](/docs/api-reference/models/get-models) to discover STT models:

```bash
# List only STT models
curl "https://openrouter.ai/api/v1/models?output_modalities=transcription"
```

### On the Models Page

Visit the [Models page](/models) and filter by output modalities to find models capable of audio transcription. You can also browse the [Speech-to-Text collection](/collections/speech-to-text-models) for a curated list.

## API Usage

Send a `POST` request to `/api/v1/audio/transcriptions` with a JSON body containing base64-encoded audio. The response is JSON with the transcribed text and optional usage statistics.

### Basic Example

```typescript title="TypeScript SDK"
import { OpenRouter } from '@openrouter/sdk';
import fs from 'fs';

const openRouter = new OpenRouter({
  apiKey: '{{API_KEY_REF}}',
});

const audioBuffer = await fs.promises.readFile('audio.wav');
const base64Audio = audioBuffer.toString('base64');

const result = await openRouter.stt.createTranscription({
  model: '{{MODEL}}',
  inputAudio: {
    data: base64Audio,
    format: 'wav',
  },
});

console.log(result.text);
```

```python title="Python"
import requests
import base64
import json

with open("audio.wav", "rb") as f:
    base64_audio = base64.b64encode(f.read()).decode("utf-8")

response = requests.post(
    url="https://openrouter.ai/api/v1/audio/transcriptions",
    headers={
        "Authorization": "Bearer {{API_KEY_REF}}",
        "Content-Type": "application/json"
    },
    data=json.dumps({
        "model": "{{MODEL}}",
        "input_audio": {
            "data": base64_audio,
            "format": "wav"
        }
    })
)

result = response.json()
print(result["text"])
```

```typescript title="TypeScript (fetch)"
import fs from 'fs';

const audioBuffer = await fs.promises.readFile('audio.wav');
const base64Audio = audioBuffer.toString('base64');

const response = await fetch('https://openrouter.ai/api/v1/audio/transcriptions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer {{API_KEY_REF}}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: '{{MODEL}}',
    input_audio: {
      data: base64Audio,
      format: 'wav',
    },
  }),
});

const result = await response.json();
console.log(result.text);
```

```bash title="cURL"
# Base64-encode your audio file
AUDIO_BASE64=$(base64 < audio.wav | tr -d '\n')

curl https://openrouter.ai/api/v1/audio/transcriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -d '{
    "model": "{{MODEL}}",
    "input_audio": {
      "data": "'"$AUDIO_BASE64"'",
      "format": "wav"
    }
  }'
```

### Request Parameters

| Parameter            | Type   | Required | Description                                                                           |
| -------------------- | ------ | -------- | ------------------------------------------------------------------------------------- |
| `model`              | string | Yes      | The STT model to use (e.g., `openai/whisper-1`)                                       |
| `input_audio`        | object | Yes      | Audio data to transcribe                                                              |
| `input_audio.data`   | string | Yes      | Base64-encoded audio data (raw bytes, not a data URI)                                 |
| `input_audio.format` | string | Yes      | Audio format (e.g., `wav`, `mp3`, `flac`, `m4a`, `ogg`, `webm`, `aac`)                |
| `language`           | string | No       | ISO-639-1 language code (e.g., `"en"`, `"ja"`). Auto-detected if omitted              |
| `temperature`        | number | No       | Sampling temperature between 0 and 1. Lower values produce more deterministic results |
| `provider`           | object | No       | Provider-specific passthrough configuration                                           |

### Provider-Specific Options

You can pass provider-specific options using the `provider` parameter. Options are keyed by provider slug, and only the options for the matched provider are forwarded:

```json
{
  "model": "openai/whisper-large-v3",
  "input_audio": {
    "data": "UklGRiQA...",
    "format": "wav"
  },
  "provider": {
    "options": {
      "groq": {
        "prompt": "Expected vocabulary: OpenRouter, API, transcription"
      }
    }
  }
}
```

## Response Format

The STT endpoint returns a JSON response with the transcribed text:

```json
{
  "text": "Hello, this is a test of speech-to-text transcription.",
  "usage": {
    "seconds": 9.2,
    "total_tokens": 113,
    "input_tokens": 83,
    "output_tokens": 30,
    "cost": 0.000508
  }
}
```

### Response Fields

| Field                 | Type   | Description                                  |
| --------------------- | ------ | -------------------------------------------- |
| `text`                | string | The transcribed text                         |
| `usage.seconds`       | number | Duration of the input audio in seconds       |
| `usage.total_tokens`  | number | Total number of tokens used (input + output) |
| `usage.input_tokens`  | number | Number of input tokens billed                |
| `usage.output_tokens` | number | Number of output tokens generated            |
| `usage.cost`          | number | Total cost of the request in USD             |

### Response Headers

| Header            | Description                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| `X-Generation-Id` | Unique generation ID for the request, useful for tracking and debugging |

## Supported Audio Formats

Supported audio formats vary by provider. Common formats include:

| Format | MIME Type    | Description                              |
| ------ | ------------ | ---------------------------------------- |
| `wav`  | `audio/wav`  | Uncompressed audio, highest quality      |
| `mp3`  | `audio/mpeg` | Compressed audio, widely compatible      |
| `flac` | `audio/flac` | Lossless compressed audio                |
| `m4a`  | `audio/mp4`  | MPEG-4 audio                             |
| `ogg`  | `audio/ogg`  | Ogg Vorbis audio                         |
| `webm` | `audio/webm` | WebM audio, common in browser recordings |
| `aac`  | `audio/aac`  | Advanced Audio Coding                    |

## Pricing

STT models use different pricing strategies depending on the provider:

* **Duration-based** (e.g., OpenAI Whisper): Priced per second of audio input
* **Token-based** (e.g., newer OpenAI models): Priced per input/output token, similar to text models

You can check the cost for each model on the [Models page](/models) or via the [Models API](/docs/api-reference/models/get-models). The `usage.cost` field in the response shows the actual cost for each request.

## BYOK (Bring Your Own Key)

STT supports [BYOK](/docs/guides/overview/auth/byok), allowing you to use your own provider API keys. When configured, requests are routed directly to the provider using your key, and OpenRouter charges only its platform fee rather than the per-usage model cost.

## Playground

You can test STT models directly in the browser using the [OpenRouter Playground](/playground). Navigate to any STT model's page and use the playground tab to upload an audio file and see the transcription result.

## Differences from Audio Input

OpenRouter supports two ways to process audio:

1. **Speech-to-Text** (this page): A dedicated `/api/v1/audio/transcriptions` endpoint optimized for transcription. Returns structured JSON with the transcribed text and usage data. Best for converting audio to text.

2. **Audio input via Chat Completions** ([Audio docs](/docs/features/multimodal/audio)): Send audio as part of a `/api/v1/chat/completions` request using the `input_audio` content type. The model processes the audio alongside text and responds conversationally. Best for audio analysis, question answering about audio content, or combining audio with other modalities.

## Best Practices

* **Choose the right format**: WAV provides the best quality for transcription. MP3 and other compressed formats work well but may slightly reduce accuracy for borderline audio
* **File size**: For very long audio files, consider splitting them into smaller segments. The upstream provider timeout is 60 seconds, so very large files may time out
* **Base64 encoding**: Audio must be sent as base64-encoded data (raw bytes, not a data URI). Most programming languages have built-in base64 encoding utilities

## Troubleshooting

**Empty or incorrect transcription?**

* Verify the audio format matches the `format` field in your request
* Ensure the audio quality is sufficient for transcription

**Request timing out?**

* Large audio files may exceed the 60-second timeout. Split long recordings into smaller segments
* Compressed formats (MP3, AAC) produce smaller payloads and transfer faster

**Model not found?**

* Use the [Models page](/models) or the [Models API](/docs/api-reference/models/get-models) with `output_modalities=transcription` to find available STT models
* Verify the model slug is correct (e.g., `openai/whisper-1`, not `whisper-1`)

**Authentication error?**

* Ensure you're using a valid API key from [your OpenRouter dashboard](/settings/keys)
* The STT endpoint uses the same authentication as the Chat Completions API