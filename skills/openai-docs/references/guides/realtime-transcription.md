# Realtime transcription

import {
  Bolt,
  Cube,
  Desktop,
  Phone,
} from "@components/react/oai/platform/ui/Icon.react";

Use realtime transcription when your application needs live speech-to-text without a spoken assistant response. Realtime transcription sessions stream transcript deltas as audio arrives, so users can see text before the full utterance is complete.

For the lowest-latency streaming transcription path, use [`gpt-realtime-whisper`](https://developers.openai.com/api/docs/models/gpt-realtime-whisper). For offline files or workflows that don't need streaming deltas, use the standard speech-to-text models in the Audio API.

## Choose a transcription model

<table>
  <thead>
    <tr>
      <th>Model</th>
      <th>Best for</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="whitespace-nowrap">
        <a href="/api/docs/models/gpt-realtime-whisper">
          gpt-realtime-whisper
        </a>
      </td>
      <td>Live audio, transcript deltas, tunable latency.</td>
      <td>Natively streaming and designed for realtime sessions.</td>
    </tr>
    <tr>
      <td className="whitespace-nowrap">
        <a href="/api/docs/models/gpt-4o-transcribe">gpt-4o-transcribe</a>
      </td>
      <td>Higher-accuracy speech-to-text where streaming isn't required.</td>
      <td>Use for file and request-response transcription workflows.</td>
    </tr>
    <tr>
      <td className="whitespace-nowrap">
        <a href="/api/docs/models/gpt-4o-mini-transcribe">
          gpt-4o-mini-transcribe
        </a>
      </td>
      <td>Lower-cost transcription.</td>
      <td>Use when cost matters more than top accuracy.</td>
    </tr>
    <tr>
      <td className="whitespace-nowrap">
        <a href="/api/docs/models/whisper-1">whisper-1</a>
      </td>
      <td>Existing Whisper integrations.</td>
      <td>
        Not natively streaming in the same way as{" "}
        <code>gpt-realtime-whisper</code>.
      </td>
    </tr>
  </tbody>
</table>

`gpt-realtime-whisper` is an alternative for live transcription, not a blanket replacement for every transcription model. Test it against your audio, languages, vocabulary, and latency requirements before switching production traffic.

## Create a transcription session

Realtime transcription uses a session with `type: "transcription"`. You can connect with [WebSocket](https://developers.openai.com/api/docs/guides/realtime-websocket) for server-side audio pipelines or [WebRTC](https://developers.openai.com/api/docs/guides/realtime-webrtc) for browser audio.

```json
{
  "type": "session.update",
  "session": {
    "type": "transcription",
    "audio": {
      "input": {
        "format": {
          "type": "audio/pcm",
          "rate": 24000
        },
        "transcription": {
          "model": "gpt-realtime-whisper",
          "language": "en"
        },
        "turn_detection": {
          "type": "server_vad",
          "threshold": 0.5,
          "prefix_padding_ms": 300,
          "silence_duration_ms": 500
        }
      }
    }
  }
}
```

### Session fields

- `type`: Set to `transcription` for transcription-only sessions.
- `audio.input.format`: Input encoding for audio appended to the buffer. Use 24 kHz mono PCM when sending `audio/pcm`.
- `audio.input.transcription.model`: Use `gpt-realtime-whisper` for streaming transcription.
- `audio.input.transcription.language`: Optional language hint such as `en`.
- `audio.input.turn_detection`: Optional voice activity detection. Set it to `null` if you want to commit audio manually.

## Stream audio

Send audio chunks with `input_audio_buffer.append`:

```javascript
ws.send(
  JSON.stringify({
    type: "input_audio_buffer.append",
    audio: base64Pcm16,
  })
);
```

If you disable turn detection, commit the buffer when you want transcription to begin:

```javascript
ws.send(
  JSON.stringify({
    type: "input_audio_buffer.commit",
  })
);
```

With server VAD enabled, the session commits audio automatically when it detects a turn boundary.

## Handle transcript events

Listen for incremental transcript deltas and completion events:

```javascript
ws.on("message", (data) => {
  const event = JSON.parse(data);

  if (event.type === "conversation.item.input_audio_transcription.delta") {
    process.stdout.write(event.delta);
  }

  if (event.type === "conversation.item.input_audio_transcription.completed") {
    console.log("\nFinal transcript:", event.transcript);
  }
});
```

A delta event contains newly available transcript text:

```json
{
  "type": "conversation.item.input_audio_transcription.delta",
  "item_id": "item_003",
  "content_index": 0,
  "delta": "Hello,"
}
```

A completion event contains the final transcript for the committed item:

```json
{
  "type": "conversation.item.input_audio_transcription.completed",
  "item_id": "item_003",
  "content_index": 0,
  "transcript": "Hello, how are you?"
}
```

Ordering between completion events from different speech turns isn't guaranteed. Use `item_id` to match transcription events to committed input items.

## Tune latency and accuracy

Streaming transcription trades latency for transcript quality. Lower delay settings can produce earlier partial text. Higher delay settings give the model more audio context before emitting text and can improve word error rate.

Start by testing a few delay targets against your real audio. Useful evaluation points are:

- 0.4 seconds for the most latency-sensitive interactions;
- 0.8 to 1.2 seconds for balanced live captions;
- 1.5 to 2.0 seconds when accuracy matters more than immediate display;
- 3.0 seconds for workflows that can tolerate more delay.

Don't choose a setting from synthetic audio alone. Test with representative microphones, telephony audio, accents, background noise, code-switching, domain vocabulary, and long sessions.

## Guide vocabulary and domain terms

If your application depends on exact domain vocabulary, include a language hint and test whether your model and endpoint support prompt or keyword steering before relying on it. Where supported, use short keyword lists rather than long instructions.

Example keyword style:

```text
Keywords: metoprolol, atorvastatin, A1C, systolic, diastolic
```

For production, treat keyword steering as an aid rather than a guarantee. Continue to evaluate names, numbers, dates, medication names, product names, artist names, and other high-value entities manually.

## Handle confidence, timestamps, and diarization

Only request optional fields that your selected model and endpoint support. If your application needs confidence scoring, timestamps, or diarization, verify support before launch and add fallbacks for fields that aren't available.

When log probabilities are available, request them with `include`:

```json
{
  "type": "session.update",
  "session": {
    "type": "transcription",
    "audio": {
      "input": {
        "transcription": {
          "model": "gpt-realtime-whisper"
        }
      }
    },
    "include": ["item.input_audio_transcription.logprobs"]
  }
}
```

## Production checklist

- Pick a target latency and accuracy threshold before tuning.
- Test against real production audio, not only clean samples.
- Test each target language.
- Include numbers, dates, currency, email addresses, product names, and domain terms in your eval set.
- Track empty, truncated, and delayed transcripts apart from word error rate.
- Decide how your UI should revise partial text when later deltas correct earlier text.
- Use `item_id` to order and reconcile final transcripts.
- Keep a fallback path for unsupported timestamps, diarization, or confidence fields.

## Related guides

<a href="/api/docs/guides/realtime">
  

<span slot="icon">
      </span>
    Compare voice-agent, translation, and transcription sessions.


</a>

<a href="/api/docs/guides/realtime-translation">
  

<span slot="icon">
      </span>
    Translate live speech with a dedicated translation session.


</a>

<a href="/api/docs/guides/realtime-websocket">
  

<span slot="icon">
      </span>
    Stream raw audio through a server-side media pipeline.


</a>

<a href="/api/docs/guides/realtime-vad">
  

<span slot="icon">
      </span>
    Configure turn detection for live audio streams.


</a>