> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Speech-to-Text

> How to transcribe audio into text with OpenRouter models

export const API_KEY_REF = '<OPENROUTER_API_KEY>';

export const Template = ({children, data}) => {
  const replace = s => s.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in data) ? data[k] : `{{${k}}}`);
  const leafText = node => typeof node === 'string' ? node : node?.$$typeof && typeof node.props?.children === 'string' ? node.props.children : null;
  const collapseTokens = nodes => {
    const out = [];
    let i = 0;
    while (i < nodes.length) {
      const ta = leafText(nodes[i]);
      const tb = leafText(nodes[i + 1]);
      const tc = leafText(nodes[i + 2]);
      if (ta != null && tb != null && tc != null) {
        const m = (ta + tb + tc).match(/^([\s\S]*)\{\{(\w+)\}\}([\s\S]*)$/);
        if (m && (m[2] in data)) {
          out.push(m[1] + data[m[2]] + m[3]);
          i += 3;
          continue;
        }
      }
      out.push(nodes[i]);
      i++;
    }
    return out;
  };
  const process = node => {
    if (typeof node === 'string') return replace(node);
    if (Array.isArray(node)) return collapseTokens(node.map(process));
    if (node && typeof node === 'object') {
      if (node.$$typeof) return {
        ...node,
        props: process(node.props)
      };
      return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, process(v)]));
    }
    return node;
  };
  return <>{process(children)}</>;
};

OpenRouter supports speech-to-text (STT) via a dedicated `/api/v1/audio/transcriptions` endpoint. Send base64-encoded audio and receive a JSON response with the transcribed text and usage statistics.

## Model Discovery

You can find STT models in several ways:

### Via the API

Use the `output_modalities` query parameter on the [Models API](/docs/api/api-reference/models/list-all-models-and-their-properties) to discover STT models:

```bash lines theme={null}
# List only STT models
curl "https://openrouter.ai/api/v1/models?output_modalities=transcription"
```

### On the Models Page

Visit the [Models page](/docs/guides/overview/models) and filter by output modalities to find models capable of audio transcription. You can also browse the [Speech-to-Text collection](https://openrouter.ai/collections/speech-to-text-models) for a curated list.

## API Usage

Send a `POST` request to `/api/v1/audio/transcriptions` with a JSON body containing base64-encoded audio. The response is JSON with the transcribed text and optional usage statistics.

### Basic Example

<Template
  data={{
API_KEY_REF,
MODEL: 'openai/whisper-1'
}}
>
  <CodeGroup>
    ```typescript title="TypeScript SDK" lines theme={null}
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

    ```python title="Python" expandable lines theme={null}
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

    ```typescript title="TypeScript (fetch)" expandable lines theme={null}
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

    ```bash title="cURL" lines theme={null}
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
  </CodeGroup>
</Template>

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

### OpenAI-Compatible Multipart Requests

The endpoint also accepts OpenAI-style `multipart/form-data` requests, so clients built for OpenAI's `/v1/audio/transcriptions` (including the official OpenAI SDKs) work by pointing their base URL at `https://openrouter.ai/api/v1`:

```python title="OpenAI SDK (Python)" lines theme={null}
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="<OPENROUTER_API_KEY>",
)

with open("audio.wav", "rb") as f:
    result = client.audio.transcriptions.create(
        model="openai/whisper-large-v3",
        file=f,
    )

print(result.text)
```

```bash title="cURL (multipart)" lines theme={null}
curl https://openrouter.ai/api/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -F file="@audio.wav" \
  -F model="openai/whisper-large-v3"
```

The `file`, `model`, `language`, `temperature`, `response_format`, and `timestamp_granularities` fields are supported. `prompt` is accepted but ignored. `response_format` may be `json` (the default) or `verbose_json`, which adds `task`, `language`, `duration`, and segment-level timestamps to the response; `verbose_json` is only available on OpenAI-compatible providers (OpenAI, Groq, Together). Other providers reject it with a 400. `text`, `srt`, and `vtt` are rejected with a 400. With `verbose_json`, pass `timestamp_granularities[]=word` to also receive word-level timestamps in the `words` array (`segment` is the provider default). The same `response_format` and `timestamp_granularities` fields work on the base64 JSON path.

Multipart uploads are limited to 25 MB, the same cap OpenAI enforces. For compressed formats this covers long recordings, roughly 26 minutes of 128 kbps MP3, 52 minutes at 64 kbps, or over 2 hours of 24 kbps Opus voice notes. Uncompressed WAV fills the cap much faster (about 13 minutes at 16 kHz mono); prefer `mp3` or `opus` for long recordings. Larger files should be sent as base64 JSON via `input_audio`, which supports streaming offload. Recordings longer than about a minute of processing time should be split anyway, since upstream providers time out after 60 seconds per request.

### Provider-Specific Options

You can pass provider-specific options using the `provider` parameter. Options are keyed by provider slug, and only the options for the matched provider are forwarded:

```json lines theme={null}
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

```json lines theme={null}
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

You can check the cost for each model on the [Models page](/docs/guides/overview/models) or via the [Models API](/docs/api/api-reference/models/list-all-models-and-their-properties). The `usage.cost` field in the response shows the actual cost for each request.

## BYOK (Bring Your Own Key)

STT supports [BYOK](/docs/guides/overview/auth/byok), allowing you to use your own provider API keys. When configured, requests are routed directly to the provider using your key, and OpenRouter charges only its platform fee rather than the per-usage model cost.

## Playground

You can test STT models directly in the browser using the [OpenRouter Playground](https://openrouter.ai/playground). Navigate to any STT model's page and use the playground tab to upload an audio file and see the transcription result.

## Differences from Audio Input

OpenRouter supports two ways to process audio:

1. **Speech-to-Text** (this page): A dedicated `/api/v1/audio/transcriptions` endpoint optimized for transcription. Returns structured JSON with the transcribed text and usage data. Best for converting audio to text.

2. **Audio input via Chat Completions** ([Audio docs](/docs/guides/overview/multimodal/audio)): Send audio as part of a `/api/v1/chat/completions` request using the `input_audio` content type. The model processes the audio alongside text and responds conversationally. Best for audio analysis, question answering about audio content, or combining audio with other modalities.

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

* Use the [Models page](/docs/guides/overview/models) or the [Models API](/docs/api/api-reference/models/list-all-models-and-their-properties) with `output_modalities=transcription` to find available STT models
* Verify the model slug is correct (e.g., `openai/whisper-1`, not `whisper-1`)

**Authentication error?**

* Ensure you're using a valid API key from [your OpenRouter dashboard](https://openrouter.ai/settings/keys)
* The STT endpoint uses the same authentication as the Chat Completions API
