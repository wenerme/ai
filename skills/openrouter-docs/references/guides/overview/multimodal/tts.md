> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Text-to-Speech

> How to generate speech audio from text with OpenRouter models

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

OpenRouter supports text-to-speech (TTS) via a dedicated `/api/v1/audio/speech` endpoint that is compatible with the [OpenAI Audio Speech API](https://platform.openai.com/docs/api-reference/audio/createSpeech). Send text and receive a raw audio byte stream in your chosen format.

## Model Discovery

You can find TTS models in several ways:

### Via the API

Use the `output_modalities` query parameter on the [Models API](/docs/api/api-reference/models/list-all-models-and-their-properties) to discover TTS models:

```bash lines theme={null}
# List only TTS models
curl "https://openrouter.ai/api/v1/models?output_modalities=speech"
```

### On the Models Page

Visit the [Models page](/docs/guides/overview/models) and filter by output modalities to find models capable of speech synthesis. Look for models that list `"speech"` in their output modalities.

## API Usage

Send a `POST` request to `/api/v1/audio/speech` with the text you want to synthesize. The response is a raw audio byte stream — not JSON — so you can pipe it directly to a file or audio player.

### Basic Example

<Template
  data={{
API_KEY_REF,
MODEL: 'openai/gpt-4o-mini-tts-2025-12-15'
}}
>
  <CodeGroup>
    ```typescript title="TypeScript SDK" expandable lines theme={null}
    import { OpenRouter } from '@openrouter/sdk';
    import fs from 'fs';

    const openRouter = new OpenRouter({
      apiKey: '{{API_KEY_REF}}',
    });

    const stream = await openRouter.tts.createSpeech({
      model: '{{MODEL}}',
      input: 'Hello! This is a text-to-speech test.',
      voice: 'alloy',
      responseFormat: 'mp3',
    });

    // Collect the audio stream and save to a file
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
    const buffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      buffer.set(chunk, offset);
      offset += chunk.length;
    }
    await fs.promises.writeFile('output.mp3', buffer);
    console.log('Audio saved to output.mp3');
    ```

    ```python title="OpenAI Python" lines theme={null}
    from openai import OpenAI

    client = OpenAI(
      base_url="https://openrouter.ai/api/v1",
      api_key="{{API_KEY_REF}}",
    )

    with client.audio.speech.with_streaming_response.create(
      model="{{MODEL}}",
      input="Hello! This is a text-to-speech test.",
      voice="alloy",
      response_format="mp3"
    ) as response:
      response.stream_to_file("output.mp3")
    ```

    ```python title="Python 1" expandable lines theme={null}
    import requests

    response = requests.post(
      url="https://openrouter.ai/api/v1/audio/speech",
      headers={
        "Authorization": f"Bearer {API_KEY_REF}",
        "Content-Type": "application/json"
      },
      json={
        "model": "{{MODEL}}",
        "input": "Hello! This is a text-to-speech test.",
        "voice": "alloy",
        "response_format": "mp3"
      }
    )
    response.raise_for_status()

    with open("output.mp3", "wb") as f:
      f.write(response.content)

    generation_id = response.headers.get("X-Generation-Id")
    print(f"Audio saved. Generation ID: {generation_id}")
    ```

    ```typescript title="TypeScript (fetch)" expandable lines theme={null}
    const response = await fetch('https://openrouter.ai/api/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY_REF}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: '{{MODEL}}',
        input: 'Hello! This is a text-to-speech test.',
        voice: 'alloy',
        response_format: 'mp3',
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(`TTS error ${response.status}: ${JSON.stringify(err)}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const generationId = response.headers.get('X-Generation-Id');
    console.log(`Generation ID: ${generationId}`);
    // Save audioBuffer to a file or play it directly
    ```

    ```bash title="cURL" lines theme={null}
    curl https://openrouter.ai/api/v1/audio/speech \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $OPENROUTER_API_KEY" \
      --output output.mp3 \
      -d '{
        "model": "{{MODEL}}",
        "input": "Hello! This is a text-to-speech test.",
        "voice": "alloy",
        "response_format": "mp3"
      }'
    ```
  </CodeGroup>
</Template>

### Request Parameters

| Parameter          | Type   | Required           | Description                                                                                                                                                                                                                                                            |
| ------------------ | ------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`            | string | Yes                | The TTS model to use (e.g., `openai/gpt-4o-mini-tts-2025-12-15`, `mistralai/voxtral-mini-tts-2603`)                                                                                                                                                                    |
| `input`            | string | Yes                | The text to synthesize into speech                                                                                                                                                                                                                                     |
| `voice`            | string | Provider-dependent | Voice identifier. Available voices vary by model — check each model's page on the [Models page](/docs/guides/overview/models) for supported voices. Omit this parameter only when the selected provider documents a default voice; otherwise an explicit voice is required. |
| `response_format`  | string | No                 | Audio output format: `mp3` or `pcm`. Defaults to `pcm`                                                                                                                                                                                                                 |
| `speed`            | number | No                 | Playback speed multiplier. Only used by models that support it (e.g., OpenAI TTS). Ignored by other providers. Defaults to `1.0`                                                                                                                                       |
| `input_references` | array  | No                 | Reference content for stateless voice cloning: one `input_audio` part carrying the voice sample, optionally accompanied by one `text` part with its transcript. See [Voice Cloning](#voice-cloning) below                                                              |
| `provider`         | object | No                 | Provider-specific passthrough configuration                                                                                                                                                                                                                            |

When `voice` is omitted, OpenRouter only forwards the request to providers whose adapter supports a provider-side default voice. For other providers, the request is rejected with a validation error.

### Voice Cloning

Some models support **stateless voice cloning**: you send a short sample of reference audio directly with the TTS request, and the generated speech mimics that voice. No separate voice-creation or upload step is required.

Pass the reference audio as a base64 `input_audio` part in `input_references` (a `data:audio/...;base64,` URI also works), and optionally include its transcript as a `text` part:

```json lines theme={null}
{
  "model": "fish-audio/s2.1-pro",
  "input": "Hello from my cloned voice!",
  "response_format": "mp3",
  "input_references": [
    { "type": "input_audio", "input_audio": { "data": "data:audio/wav;base64,UklGRuQXDAB..." } },
    { "type": "text", "text": "This is the transcript of the reference audio." }
  ]
}
```

Note: some providers for a voice-cloning model may not support voice cloning — check the `supports_voice_cloning` field on the [endpoints API](/docs/api/api-reference/endpoints/list-all-endpoints-for-a-model).

Limits and requirements:

* Supported audio formats for the reference sample are provider-specific.
* `input_references` accepts at most one `input_audio` part and one `text` part, and requires `input_audio`.
* The reference audio is limited to 20 MiB of base64 (15 MiB of decoded audio); larger requests are rejected with a 400.

### Provider-Specific Options

You can pass provider-specific options using the `provider` parameter. Options are keyed by provider slug, and only the options for the matched provider are forwarded:

```json lines theme={null}
{
  "model": "openai/gpt-4o-mini-tts-2025-12-15",
  "input": "Hello world",
  "voice": "alloy",
  "provider": {
    "options": {
      "openai": {
        "instructions": "Speak in a warm, friendly tone."
      }
    }
  }
}
```

#### Azure (MAI-Voice-2)

Azure TTS uses SSML internally, but this is fully abstracted — you only need the standard parameters. The `voice` parameter takes an Azure voice name (e.g., `en-US-Harper:MAI-Voice-2`), and `speed` is supported (range: 0.5–2.0).

For expressive synthesis, pass `style` and optionally `styledegree` via provider options:

```json lines theme={null}
{
  "model": "microsoft/mai-voice-2",
  "input": "Welcome to the event!",
  "voice": "en-US-Harper:MAI-Voice-2",
  "response_format": "mp3",
  "speed": 1.0,
  "provider": {
    "options": {
      "azure": {
        "style": "cheerful",
        "styledegree": 1.2
      }
    }
  }
}
```

| Option        | Type   | Description                                                                                                    |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| `style`       | string | Expressive speaking style (e.g., `cheerful`, `sad`, `angry`, `excited`). Available styles depend on the voice. |
| `styledegree` | number | Intensity of the style effect. Default is `1.0`; higher values increase expressiveness.                        |

## Response Format

The TTS endpoint returns a **raw audio byte stream**, not JSON. The response includes the following headers:

| Header            | Description                                                                             |
| ----------------- | --------------------------------------------------------------------------------------- |
| `Content-Type`    | The MIME type of the audio. `audio/mpeg` for `mp3` format, `audio/pcm` for `pcm` format |
| `X-Generation-Id` | The unique generation ID for the request, useful for tracking and debugging             |

### Output Formats

| Format | Content-Type | Description                                                                       |
| ------ | ------------ | --------------------------------------------------------------------------------- |
| `mp3`  | `audio/mpeg` | Compressed audio, smaller file size. Good for storage and playback                |
| `pcm`  | `audio/pcm`  | Uncompressed raw audio. Lower latency, suitable for real-time streaming pipelines |

## Pricing

TTS models are priced **per character** of input text. Pricing varies by model and provider. You can check the per-character cost for each model on the [Models page](/docs/guides/overview/models) or via the [Models API](/docs/api/api-reference/models/list-all-models-and-their-properties).

## OpenAI SDK Compatibility

The TTS endpoint is fully compatible with the OpenAI SDK. You can use the OpenAI client libraries by pointing them at OpenRouter's base URL:

<Template
  data={{
API_KEY_REF,
}}
>
  <CodeGroup>
    ```python title="OpenAI Python SDK" expandable lines theme={null}
    from openai import OpenAI

    client = OpenAI(
      base_url="https://openrouter.ai/api/v1",
      api_key="{{API_KEY_REF}}",
    )

    # Non-streaming: get the full audio response
    response = client.audio.speech.create(
      model="openai/gpt-4o-mini-tts-2025-12-15",
      input="The quick brown fox jumps over the lazy dog.",
      voice="nova",
      response_format="mp3"
    )
    response.write_to_file("output.mp3")

    # Streaming: process audio chunks as they arrive
    with client.audio.speech.with_streaming_response.create(
      model="openai/gpt-4o-mini-tts-2025-12-15",
      input="The quick brown fox jumps over the lazy dog.",
      voice="nova",
      response_format="mp3"
    ) as response:
      response.stream_to_file("output.mp3")
    ```

    ```typescript title="OpenAI TypeScript SDK" lines theme={null}
    import OpenAI from 'openai';
    import fs from 'fs';

    const client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: '{{API_KEY_REF}}',
    });

    const response = await client.audio.speech.create({
      model: 'openai/gpt-4o-mini-tts-2025-12-15',
      input: 'The quick brown fox jumps over the lazy dog.',
      voice: 'nova',
      response_format: 'mp3',
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.promises.writeFile('output.mp3', buffer);
    console.log('Audio saved to output.mp3');
    ```
  </CodeGroup>
</Template>

## Best Practices

* **Choose the right format**: Use `mp3` for storage and general playback. Use `pcm` for real-time streaming pipelines where latency matters
* **Voice selection**: Different providers offer different voices. Check the model's documentation or experiment with available voices to find the best fit for your use case
* **Input length**: For very long texts, consider splitting the input into smaller segments and concatenating the audio output. This can improve reliability and reduce latency for the first audio chunk
* **Speed parameter**: The `speed` parameter is only supported by certain providers (e.g., OpenAI). It is silently ignored by providers that don't support it

## Troubleshooting

**Empty or corrupted audio file?**

* Verify the `response_format` matches how you're saving the file (e.g., don't save `pcm` output with a `.mp3` extension)
* Check the response status code — non-200 responses return JSON error bodies, not audio

**Model not found?**

* Use the [Models page](/docs/guides/overview/models) to find available TTS models
* Verify the model slug is correct (e.g., `openai/gpt-4o-mini-tts-2025-12-15`, not `gpt-4o-mini-tts`)

**Voice not available?**

* Available voices vary by provider. Check the provider's documentation for supported voice identifiers
* Each model has its own set of voices — check the model's page on the [Models page](/docs/guides/overview/models) for the full list
