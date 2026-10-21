# Custom voices

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Custom voices enable you to create a voice for your agent or application. Choose how to create the voice:

- **From a description:** Use prompt-to-voice to generate a voice for [GPT-Live](https://developers.openai.com/api/docs/guides/live). Describe the vocal qualities you want in a text prompt.
- **From a recording:** Provide a consent recording and a short reference sample. These voices can be used with GPT-Live, the [Text to Speech API](https://developers.openai.com/api/reference/resources/audio/subresources/speech/methods/create), the [Realtime API](https://developers.openai.com/api/reference/resources/realtime), or the [Chat Completions API with audio output](https://developers.openai.com/api/docs/guides/audio-chat-completions).

To choose an existing GPT-Live voice, see [Voice options](https://developers.openai.com/api/docs/guides/live-conversations#voice-options).

## Create a voice from a description

Prompt-to-voice creates and saves a voice from a text description. You don't need a reference recording or a consent recording for this workflow.

Prompt-to-voice is generally available to all API customers. Prompt-generated
  voices work with GPT-Live. They aren't supported by the Text to Speech,
  Realtime, or Chat Completions APIs.

### Responsible use

- **Use voices responsibly.** Don’t impersonate others or violate our [Usage Policies](https://openai.com/policies/usage-policies/).
- **Use adult voices.** Children's voices aren't allowed.
- **Be transparent.** Tell listeners that the speech is AI-generated, and preserve any provenance metadata, watermarks, or other indicators of its synthetic origin.
- **Voices aren’t guaranteed to be unique.** Others may generate similar voices or output. Your output ownership rights remain governed by your Agreement with OpenAI.
- **[Terms](https://openai.com/policies/service-terms/)** apply to your and your end users’ use of prompt-to-voice.

### Create and save the voice

Create a voice through the API or in the [voice Playground](https://platform.openai.com/audio/voices/edit). Creating a prompt-generated voice is free. Using it to generate speech in GPT-Live is billed at regular session rates.

Send a JSON request to `/v1/audio/voices` with `type` set to `prompt`:

```bash
curl --fail-with-body https://api.openai.com/v1/audio/voices \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "prompt",
    "name": "Support assistant",
    "prompt": "A calm, reassuring adult voice for a customer support assistant. Speak with an American English accent, a mid-range pitch, a smooth, warm tone, and a steady, conversational pace.",
    "model": "auto"
  }' \
  -o voice.json
```


`script_hint` is an optional example script used to guide voice generation. If you leave it out, the service generates a script from your voice description. To supply your own, include up to 2,000 characters of representative speech. Blank or too-short scripts are rejected.

Each successful request creates a new saved voice. The response contains metadata, including its ID, creation time in Unix seconds, and original voice-description prompt. It doesn't include audio or a preview:

```json
{
  "object": "audio.voice",
  "id": "voice_123",
  "name": "Support assistant",
  "created_at": 0,
  "type": "prompt",
  "prompt": "A calm, reassuring adult voice for a customer support assistant. Speak with an American English accent, a mid-range pitch, a smooth, warm tone, and a steady, conversational pace."
}
```

Save the returned `id` and retain the original voice prompt. Reuse a saved voice when you want the same voice in another session. You can create up to 100 prompt-generated voices per organization. This limit also applies when your application creates voices for its customers.

### Describe the voice

Describe vocal qualities in plain language. For example:

```text
A calm, reassuring adult voice for a customer support assistant. Speak with an
American English accent, a mid-range pitch, a smooth, warm tone, and a steady,
conversational pace.
```

The following examples show qualities you can describe. These are words in your prompt, rather than separate API parameters:

| Quality         | What to describe                                          | Example wording                        |
| --------------- | --------------------------------------------------------- | -------------------------------------- |
| Accent          | Regional pronunciation and accent strength                | American English, with a strong accent |
| Age             | The perceived age of the voice                            | An adult in their 30s                  |
| Presentation    | How the voice presents                                    | Feminine                               |
| Pitch           | How low or high the voice sounds                          | Mid-range pitch                        |
| Timbre          | The tone of the voice                                     | Smooth and rich                        |
| Texture         | Raspiness, hoarseness, or clarity                         | Smooth                                 |
| Loudness        | Vocal effort                                              | Moderate vocal effort                  |
| Speech rate     | How quickly the voice speaks                              | Medium pace                            |
| Distinctiveness | How pronounced the voice's individual character should be | Moderately distinctive                 |

Describe the qualities themselves. Don't request imitation of a named person, public figure, or fictional character. Children's voices aren't allowed; describe an adult voice.

### Example descriptions

Use these descriptions as starting points and listen to the results in your application.

**Calm assistant**

```text
A warm adult voice with a mid-range pitch and smooth, rich timbre.
Use moderate vocal effort and an unhurried, reassuring delivery.
```

**Lively guide**

```text
A bright, clear adult voice with a slightly higher pitch and a lightly textured timbre.
Use a lively, conversational delivery at a brisk but easy-to-follow pace.
```

Keep conversation rules, such as answer length, interruptions, and when to delegate, in your [GPT-Live session instructions](https://developers.openai.com/api/docs/guides/live-prompting).

### Listen to the voice in GPT-Live

Listening to a voice in the Playground runs a GPT-Live session and is billed as a regular session.

Set `session.audio.output.voice.id` to the returned voice ID. For voice performance, include the original voice description in `session.instructions` alongside your application's conversation instructions.

Replace `voice_123` with the ID returned by your creation request:

```json
{
  "model": "gpt-live-1",
  "instructions": "You are a helpful voice assistant. A calm, reassuring adult voice for a customer support assistant. Speak with an American English accent, a mid-range pitch, a smooth, warm tone, and a steady, conversational pace.",
  "audio": { "output": { "voice": { "id": "voice_123" } } }
}
```

For [WebRTC](https://developers.openai.com/api/docs/guides/voice-webrtc?api=live), include this configuration in the JSON `session` field alongside `transport`. For [WebSockets](https://developers.openai.com/api/docs/guides/voice-websockets?api=live), include it in the first `session.start` event. Follow the connection guide to send audio and hear the voice. Choose the voice at startup; start a new session to try a different voice.

Voice creation through `/v1/audio/voices`, including creation from recordings, isn't compatible with Zero Data Retention. GPT-Live speech generations are eligible for Zero Data Retention when it's enabled for your organization or project. Stored session recordings, recording downloads, and session forking aren't available with Zero Data Retention. See the [data controls](https://developers.openai.com/api/docs/guides/your-data#v1livesessions) for session storage and retention requirements.

### Refine and reuse

Change one quality at a time and compare the results using the same short passage and a few conversational turns. Listen for the accent, pace, and other qualities your application needs. Keep the voice ID you prefer and reuse it.

Each creation request saves a new voice. To try another saved voice, start a new GPT-Live session with its ID.

## Create a voice from a recording

To create a voice from a recording, provide a short sample audio reference that the model will seek to replicate.



    {
      "Custom voices created from recordings are limited to eligible customers. Contact our "
    }
    [{"sales team"}](https://openai.com/contact-sales/)
    {
      " to learn more. Once enabled for your organization, you’ll have access to the "
    }
    [{"Voices"}](https://platform.openai.com/audio/voices)
    {" tab under Audio."}
  






### Prepare and upload the recordings

Voices from recordings must be created through an API request. See the API reference for the full set of API operations.

Creating a voice from a recording requires two separate audio recordings:

1. **Consent recording:** This recording captures the voice actor providing consent to create a likeness of their voice. The actor must read one of the consent phrases provided below.
2. **Sample recording:** The actual audio sample that the model will try to adhere to. The voice must match the consent recording.

**Tips for creating a high-quality voice**

The quality of your custom voice is highly dependent on the quality of the sample you provide. Optimizing the recording quality can make a big difference.

- Record in a quiet space with minimal echo.
- Use a professional XLR microphone.
- Stay about 7–8 inches from the mic with a pop filter in between, and keep that distance consistent.
- The model copies exactly what you give it—tone, cadence, energy, pauses, habits—so record the exact voice you want. Be consistent in energy, style, and accent throughout.
- Small variations in the audio sample can result in quality differences with the generated voice. Try multiple examples to find the best fit.

**Requirements and limitations**

- At most 20 voices from recordings can be created per organization.
- The audio samples must be 30 seconds or less.
- The audio samples must be one of the following types: `mpeg`, `wav`, `ogg`, `aac`, `flac`, `webm`, or `mp4`.

Refer to the Text-to-Speech Supplemental Agreement for additional terms of use.

**Creating a voice consent**

The consent audio recording must only include one of the following phrases. Any divergence from the script will lead to a failure.


| Language          | Phrase                                                                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| German (`de`)     | Ich bin der Eigentümer dieser Stimme und bin damit einverstanden, dass OpenAI diese Stimme zur Erstellung eines synthetischen Stimmmodells verwendet. |
| English (`en`)    | I am the owner of this voice and I consent to OpenAI using this voice to create a synthetic voice model.                                              |
| Spanish (`es`)    | Soy el propietario de esta voz y doy mi consentimiento para que OpenAI la utilice para crear un modelo de voz sintética.                              |
| French (`fr`)     | Je suis le propriétaire de cette voix et j'autorise OpenAI à utiliser cette voix pour créer un modèle de voix synthétique.                            |
| Hindi (`hi`)      | मैं इस आवाज का मालिक हूं और मैं सिंथेटिक आवाज मॉडल बनाने के लिए OpenAI को इस आवाज का उपयोग करने की सहमति देता हूं                                     |
| Indonesian (`id`) | Saya adalah pemilik suara ini dan saya memberikan persetujuan kepada OpenAI untuk menggunakan suara ini guna membuat model suara sintetis.            |
| Italian (`it`)    | Sono il proprietario di questa voce e acconsento che OpenAI la utilizzi per creare un modello di voce sintetica.                                      |
| Japanese (`ja`)   | 私はこの音声の所有者であり、OpenAIがこの音声を使用して音声合成 モデルを作成することを承認します。                                                     |
| Korean (`ko`)     | 나는 이 음성의 소유자이며 OpenAI가 이 음성을 사용하여 음성 합성 모델을 생성할 것을 허용합니다.                                                        |
| Dutch (`nl`)      | Ik ben de eigenaar van deze stem en ik geef OpenAI toestemming om deze stem te gebruiken om een synthetisch stemmodel te maken.                       |
| Polish (`pl`)     | Jestem właścicielem tego głosu i wyrażam zgodę na wykorzystanie go przez OpenAI w celu utworzenia syntetycznego modelu głosu.                         |
| Portuguese (`pt`) | Eu sou o proprietário desta voz e autorizo o OpenAI a usá-la para criar um modelo de voz sintética.                                                   |
| Russian (`ru`)    | Я являюсь владельцем этого голоса и даю согласие OpenAI на использование этого голоса для создания модели синтетического голоса.                      |
| Ukrainian (`uk`)  | Я є власником цього голосу і даю згоду OpenAI використовувати цей голос для створення синтетичної голосової моделі.                                   |
| Vietnamese (`vi`) | Tôi là chủ sở hữu giọng nói này và tôi đồng ý cho OpenAI sử dụng giọng nói này để tạo mô hình giọng nói tổng hợp.                                     |
| Chinese (`zh`)    | 我是此声音的拥有者并授权OpenAI使用此声音创建语音合成模型                                                                                              |

Then upload the recording via the API. A successful upload will return the consent recording ID that you’ll reference later. Note the consent can be used for multiple different voice creations if the same voice actor is making multiple attempts.

```bash
curl https://api.openai.com/v1/audio/voice_consents \
  -X POST \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "name=test_consent" \
  -F "language=en" \
  -F "recording=@$HOME/tmp/voice_consent/consent_recording.wav;type=audio/x-wav"
```


**Creating a voice**

Next, you’ll create the actual voice by referencing the consent recording ID, and providing the voice sample.

```bash
curl https://api.openai.com/v1/audio/voices \
  -X POST \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "name=test_voice" \
  -F "audio_sample=@$HOME/tmp/voice_consent/audio_sample_recording.wav;type=audio/x-wav" \
  -F "consent=cons_123abc"
```


If successful, the created voice will be listed under the [Audio tab](https://platform.openai.com/audio/voices).





## Using a voice from a recording during speech generation

Use `gpt-realtime-2.1-mini` with the [Realtime API](https://developers.openai.com/api/docs/guides/realtime) to generate speech in your custom voice. Set `session.audio.output.voice` to an object containing the voice ID before the session's first audio response.

**Configure the Realtime session**

Use the following request body when [creating a Realtime client secret](https://developers.openai.com/api/reference/resources/realtime/subresources/client_secrets/methods/create), then follow the [WebRTC connection guide](https://developers.openai.com/api/docs/guides/voice-webrtc?api=realtime) to connect with that secret. Replace `voice_123abc` with the ID returned by your voice creation request:

```javascript
const sessionConfig = JSON.stringify({
  session: {
    type: "realtime",
    model: "gpt-realtime-2.1-mini",
    instructions: "Read the user's text aloud without adding commentary.",
    output_modalities: ["audio"],
    audio: {
      output: {
        voice: { id: "voice_123abc" },
      },
    },
  },
});
```

```ruby
# Replace the illustrative IDs and URLs below with your own resource values.
require "json"

session_config = JSON.generate(
  session: {
    type: "realtime",
    model: "gpt-realtime-2.1-mini",
    instructions: "Read the user's text aloud without adding commentary.",
    output_modalities: ["audio"],
    audio: { output: { voice: { id: "voice_123abc" } } }
  }
)
puts(session_config)
```


For text-to-speech generation, [add a user message containing the text](https://developers.openai.com/api/docs/guides/realtime-conversations#text-inputs-and-outputs), then send `response.create` with `output_modalities` set to `["audio"]`. The session instructions ask the model to read the supplied text aloud. Receive the generated audio through the WebRTC audio track, as described in [Handling audio with WebRTC](https://developers.openai.com/api/docs/guides/realtime-conversations#handling-audio-with-webrtc).





## Use a voice from a recording with GPT-Live

Use a project-scoped API key approved for both GPT-Live and custom voice
creation. Reading consent phrases and using a custom voice require
`api.voices.read`; creating consents and voices requires `api.voices.write` and
custom-voice API access. Use the same project for every request and keep the API
key on a trusted server.

### Prepare the recordings

List the current supported consent phrases before recording:

```bash
curl https://api.openai.com/v1/audio/consent_phrases \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

The consent recording and reference sample must come from the same person. The
sample needs at least five seconds of actual speech and at least 15 transcribed
text tokens; silence does not count. Use a 10–30-second
recording with several complete sentences. Each upload is limited to 10 MiB.
The service extracts the reference transcript from your recording.

Browser recorders may label audio `audio/webm;codecs=opus`, which the upload
endpoint rejects. When constructing an upload, use the supported base MIME type
`audio/webm` while preserving the original audio bytes. Use the consent and voice
creation requests above, then save the returned voice ID.

### Select the voice at session creation

Pass a custom voice as an object, such as `{ "id": "voice_123" }`. Named voices
such as `"marin"` use strings.

`gpt-live-1` supports custom voices with English accents. To use an accent, also
specify it in `session.instructions`, such as "Speak British English" or "Speak
Irish English." The example below uses British English; change the instruction
to match the accent you want for your custom voice.

Include the following configuration in the initial session:

```json
{
  "model": "gpt-live-1",
  "instructions": "You are a helpful voice assistant. Speak British English.",
  "audio": { "output": { "voice": { "id": "voice_123" } } }
}
```

For [WebRTC](https://developers.openai.com/api/docs/guides/voice-webrtc?api=live), have your application server
place this configuration in the JSON `session` field alongside `transport`.
Authenticate requests to your server with application credentials, and keep the
OpenAI API key on the server.

For [WebSockets](https://developers.openai.com/api/docs/guides/voice-websockets?api=live), put the configuration
in the first `session.start` event. Follow the connection guide for streaming
audio and closing the session.

### Handle access and lifecycle failures

- Choose the voice at session creation. Start a new session to use a different voice.
- A deleted or revoked voice, a consent from another project, or missing custom-voice access can appear as a `404`.
- Malformed audio, a mismatched speaker, or a non-project-scoped key is rejected.

Confirm your project's permissions, recording minimums, and upload limits
before creating a voice. See [GPT-Live getting started](https://developers.openai.com/api/docs/guides/live)
for session setup requirements.