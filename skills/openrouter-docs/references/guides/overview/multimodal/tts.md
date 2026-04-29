> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Text-to-Speech

OpenRouter supports text-to-speech (TTS) via a dedicated `/api/v1/audio/speech` endpoint that is compatible with the [OpenAI Audio Speech API](https://platform.openai.com/docs/api-reference/audio/createSpeech). Send text and receive a raw audio byte stream in your chosen format.

## Model Discovery

You can find TTS models in several ways:

### Via the API

Use the `output_modalities` query parameter on the [Models API](/docs/api-reference/models/get-models) to discover TTS models:

```bash
# List only TTS models
curl "https://openrouter.ai/api/v1/models?output_modalities=speech"
```

### On the Models Page

Visit the [Models page](/models) and filter by output modalities to find models capable of speech synthesis. Look for models that list `"speech"` in their output modalities.

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
    ```typescript title="TypeScript SDK"
    import { OpenRouter } from '@openrouter/sdk';
    import fs from 'fs';

    const openRouter = new OpenRouter({
      apiKey: '{{API_KEY_REF}}',
    });

    const stream = await openRouter.tts.createSpeech({
      speechRequest: {
        model: '{{MODEL}}',
        input: 'Hello! This is a text-to-speech test.',
        voice: 'alloy',
        responseFormat: 'mp3',
      },
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

    ```python title="OpenAI Python"
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

    ```python
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

    ```typescript title="TypeScript (fetch)"
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

    ```bash title="cURL"
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

| Parameter         | Type   | Required | Description                                                                                                                      |
| ----------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `model`           | string | Yes      | The TTS model to use (e.g., `openai/gpt-4o-mini-tts-2025-12-15`, `mistralai/voxtral-mini-tts-2603`)                              |
| `input`           | string | Yes      | The text to synthesize into speech                                                                                               |
| `voice`           | string | Yes      | Voice identifier. Available voices vary by model — check each model's page on the [Models page](/models) for supported voices    |
| `response_format` | string | No       | Audio output format: `mp3` or `pcm`. Defaults to `pcm`                                                                           |
| `speed`           | number | No       | Playback speed multiplier. Only used by models that support it (e.g., OpenAI TTS). Ignored by other providers. Defaults to `1.0` |
| `provider`        | object | No       | Provider-specific passthrough configuration                                                                                      |

### Provider-Specific Options

You can pass provider-specific options using the `provider` parameter. Options are keyed by provider slug, and only the options for the matched provider are forwarded:

```json
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

TTS models are priced **per character** of input text. Pricing varies by model and provider. You can check the per-character cost for each model on the [Models page](/models) or via the [Models API](/docs/api-reference/models/get-models).

## OpenAI SDK Compatibility

The TTS endpoint is fully compatible with the OpenAI SDK. You can use the OpenAI client libraries by pointing them at OpenRouter's base URL:

<Template
  data={{
  API_KEY_REF,
}}
>
  <CodeGroup>
    ```python title="OpenAI Python SDK"
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

    ```typescript title="OpenAI TypeScript SDK"
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

* Use the [Models page](/models) to find available TTS models
* Verify the model slug is correct (e.g., `openai/gpt-4o-mini-tts-2025-12-15`, not `gpt-4o-mini-tts`)

**Voice not available?**

* Available voices vary by provider. Check the provider's documentation for supported voice identifiers
* Each model has its own set of voices — check the model's page on the [Models page](/models) for the full list