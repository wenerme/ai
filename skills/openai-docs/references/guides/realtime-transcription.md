# Realtime transcription

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use realtime transcription when your application needs text from a microphone, call, or other live audio stream without a spoken assistant response. The recommended model returns transcript deltas as speech arrives and a final transcript when your application commits each audio turn.

Start with [`gpt-live-transcribe`](https://developers.openai.com/api/docs/models/gpt-live-transcribe). Use [file transcription](https://developers.openai.com/api/docs/guides/speech-to-text) if your audio is already recorded, or see the [Transcription overview](https://developers.openai.com/api/docs/guides/transcription) to compare the workflows.

## Create a transcription session

For server-side WebSocket transcription with a standard API key, connect to `wss://api.openai.com/v1/realtime?intent=transcription`. Use the authentication header shown in the [WebSocket guide](https://developers.openai.com/api/docs/guides/voice-websockets?api=realtime), but omit `model` from the URL. That guide's model-based URL creates a conversation session and doesn't accept the transcription update below.

After the connection opens, send `session.update` with `type: "transcription"` and select `gpt-live-transcribe` in the session configuration. For browser audio, see [WebRTC](https://developers.openai.com/api/docs/guides/voice-webrtc?api=realtime).

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
          "model": "gpt-live-transcribe"
        },
        "turn_detection": null
      }
    }
  }
}
```


This example uses 24 kHz PCM audio. In `gpt-live-transcribe` transcription sessions, omit `audio.input.turn_detection` or set it to `null`. The model doesn't support `server_vad` or `semantic_vad`. For the full session configuration, see the [Realtime sessions reference](https://developers.openai.com/api/reference/resources/realtime/subresources/client_secrets).

## Stream audio

Send audio chunks with `input_audio_buffer.append`:

```typescript
ws.send(
  JSON.stringify({
    type: "input_audio_buffer.append",
    audio: base64Pcm16,
  })
);
```


Send `input_audio_buffer.commit` at the end of each audio turn to receive the final transcript:

```typescript
ws.send(
  JSON.stringify({
    type: "input_audio_buffer.commit",
  })
);
```


Use client-side VAD to detect the end of speech, then send `input_audio_buffer.commit`.

## Handle transcript events

Listen for incremental transcript deltas and completion events:

```typescript
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

After configuring a transcription session, use this function to send mono PCM16 audio at 24 kHz, commit the turn, and match the final transcript to the committed item:

```typescript
// Use a transcription session configured for 24 kHz mono PCM16 and manual commits.
function transcribeTurn(
  connection: OpenAIRealtimeWS,
  audio: Buffer
): Promise<string> {
  if (!audio.length || audio.length % 2)
    throw new Error("Expected nonempty PCM16 audio");
  return new Promise((resolve, reject) => {
    let itemID: string | undefined;
    const completed = new Map<string, string>();
    const failed = new Set<string>();
    const timer = setTimeout(
      () => finish(new Error("Transcription timed out")),
      120000
    );
    function finish(error?: Error, transcript?: string) {
      clearTimeout(timer);
      connection.off("event", onEvent);
      connection.off("error", onError);
      connection.socket.off("close", onClose);
      if (error) reject(error);
      else resolve(transcript!);
    }
    const onError = (error: Error) => finish(error);
    const onClose = () =>
      finish(new Error("Connection closed before transcription"));
    const onEvent = (event: RealtimeServerEvent) => {
      if (
        event.type === "conversation.item.input_audio_transcription.delta" &&
        event.item_id === itemID
      )
        console.error(`Partial transcript (${event.item_id}): ${event.delta}`);
      if (event.type === "input_audio_buffer.committed") itemID = event.item_id;
      if (
        event.type === "conversation.item.input_audio_transcription.completed"
      )
        completed.set(event.item_id, event.transcript);
      if (event.type === "conversation.item.input_audio_transcription.failed")
        failed.add(event.item_id);
      if (itemID && failed.has(itemID))
        finish(new Error("Transcription failed"));
      else if (itemID && completed.has(itemID))
        finish(undefined, completed.get(itemID));
    };
    connection.on("event", onEvent);
    connection.on("error", onError);
    connection.socket.on("close", onClose);
    for (let start = 0; start < audio.length; start += 9600) {
      connection.send({
        type: "input_audio_buffer.append",
        audio: audio.subarray(start, start + 9600).toString("base64"),
      });
    }
    connection.send({ type: "input_audio_buffer.commit" });
  });
}
```

```go
func transcribeTurn(ctx context.Context, conn *realtime.RealtimeConnection, audio []byte) error {
	for start := 0; start < len(audio); start += 9600 {
		end := min(start+9600, len(audio))
		if err := conn.Send(ctx, realtime.RealtimeClientEventParamOfInputAudioBufferAppend(base64.StdEncoding.EncodeToString(audio[start:end]))); err != nil {
			return err
		}
	}
	if err := conn.Send(ctx, realtime.RealtimeClientEventUnionParam{
		OfInputAudioBufferCommit: &realtime.InputAudioBufferCommitEventParam{},
	}); err != nil {
		return err
	}
	// Match the final transcript to the committed item, not event arrival order.
	var itemID string
	for {
		event, err := conn.Recv(ctx)
		if err != nil {
			return err
		}
		switch event.Type {
		case "input_audio_buffer.committed":
			itemID = event.OfInputAudioBufferCommittedEvent.ItemID
		case "conversation.item.input_audio_transcription.delta":
			delta := event.OfConversationItemInputAudioTranscriptionDeltaEvent
			if itemID != "" && delta.ItemID == itemID {
				fmt.Fprintf(os.Stderr, "Partial transcript (%s): %s\n", delta.ItemID, delta.Delta)
			}
		case "conversation.item.input_audio_transcription.completed":
			completed := event.OfConversationItemInputAudioTranscriptionCompletedEvent
			if itemID == "" || completed.ItemID != itemID {
				continue
			}
			fmt.Println("Final transcript:", completed.Transcript)
			return nil
		case "conversation.item.input_audio_transcription.failed":
			if itemID != "" && event.OfConversationItemInputAudioTranscriptionFailedEvent.ItemID == itemID {
				return fmt.Errorf("transcription failed")
			}
		case "error":
			return fmt.Errorf("Realtime API error: %s", event.OfRealtimeErrorEvent.Error.Message)
		}
	}
}
```

```csharp
using OpenAI.Realtime;
#pragma warning disable OPENAI002

RealtimeTranscriptionSessionInputAudioOptions input = new()
{
    AudioFormat = new RealtimePcmAudioFormat(),
    AudioTranscriptionOptions = new() { Model = "gpt-live-transcribe" }
};
input.DisableTurnDetection();
await session.SendCommandAsync(new RealtimeClientCommandSessionUpdate(new RealtimeTranscriptionSessionOptions
{
    AudioOptions = new() { InputAudioOptions = input }
}), timeout.Token);
byte[] audio = await File.ReadAllBytesAsync("speech.pcm", timeout.Token);
for (int offset = 0; offset < audio.Length; offset += 9600)
{
    BinaryData chunk = BinaryData.FromBytes(audio.AsMemory(offset, Math.Min(9600, audio.Length - offset)));
    await session.SendCommandAsync(new RealtimeClientCommandInputAudioBufferAppend(chunk), timeout.Token);
}
await session.SendCommandAsync(new RealtimeClientCommandInputAudioBufferCommit(), timeout.Token);
string? itemId = null;
await foreach (RealtimeServerUpdate update in session.ReceiveUpdatesAsync(timeout.Token))
{
    if (update is RealtimeServerUpdateError error)
        throw new InvalidOperationException(error.Error.Message);
    if (update is RealtimeServerUpdateInputAudioBufferCommitted committed)
        itemId = committed.ItemId;
    if (update is RealtimeServerUpdateConversationItemInputAudioTranscriptionDelta delta)
        Console.Error.WriteLine($"Partial transcript ({delta.ItemId}): {delta.Delta}");
    if (update is RealtimeServerUpdateConversationItemInputAudioTranscriptionFailed failed && failed.ItemId == itemId)
        throw new InvalidOperationException(failed.Error.Message);
    if (update is RealtimeServerUpdateConversationItemInputAudioTranscriptionCompleted transcript && transcript.ItemId == itemId)
    {
        Console.WriteLine($"Final transcript: {transcript.Transcript}");
        return;
    }
}
throw new InvalidOperationException("Session ended before the committed audio was transcribed.");
```

```ruby
require "openai"
require "base64"

client = OpenAI::Client.new
client.realtime.connect_transcription do |connection|
  connection.session.update(
    type: :transcription,
    audio: {
      input: {
        format: {
          type: "audio/pcm",
          rate: 24000
        },
        transcription: { model: "gpt-live-transcribe" },

        turn_detection: nil
      }
    }
  )
  updated = connection.find do |event|
    raise event.error.message if event.is_a?(OpenAI::Realtime::RealtimeErrorEvent)

    event.is_a?(OpenAI::Realtime::SessionUpdatedEvent)
  end
  raise "Connection closed before transcription configuration" unless updated

  # speech.pcm contains mono PCM16 audio sampled at 24 kHz.
  raise "Expected nonempty PCM16 audio" unless File.size("speech.pcm").positive? && File.size("speech.pcm").even?

  File.open("speech.pcm", "rb") do |input|
    while (chunk = input.read(9600))
      connection.input_audio_buffer.append(audio: Base64.strict_encode64(chunk))
    end
  end
  connection.input_audio_buffer.commit
  state = {}
  completed = connection.find do |event|
    case event
    when OpenAI::Realtime::InputAudioBufferCommittedEvent
      state[:item_id] = event.item_id
    when OpenAI::Realtime::ConversationItemInputAudioTranscriptionDeltaEvent
      warn "Partial transcript (#{event.item_id}): #{event.delta}" if state[:item_id] && event.item_id == state[:item_id]
    when OpenAI::Realtime::ConversationItemInputAudioTranscriptionCompletedEvent
      if state[:item_id] && event.item_id == state[:item_id]
        puts "Final transcript: #{event.transcript}"
        next true
      end
    when OpenAI::Realtime::ConversationItemInputAudioTranscriptionFailedEvent
      raise "Transcription failed" if state[:item_id] && event.item_id == state[:item_id]
    when OpenAI::Realtime::RealtimeErrorEvent
      raise event.error.message
    end
    false
  end
  raise "Connection closed before the committed item's final transcript" unless completed
end
```


## Add transcription context

Add context when the audio contains specialized vocabulary or more than one expected language. Send another `session.update` event to change the transcription configuration during an existing session.

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
          "model": "gpt-live-transcribe",
          "prompt": "A customer support call about a premium plan and account AC-42.",
          "keywords": ["premium plan", "AC-42", "billing"],
          "languages": ["en", "fr"],
          "delay": "low"
        },
        "turn_detection": null
      }
    }
  }
}
```


- Use `prompt` to describe the recording or its setting.
- Use `keywords` for product names, acronyms, and other literal terms that may appear in the audio.
- Use `languages` for expected input languages.

Supported language-code formats include:

- ISO 639-1 codes, such as `en`, `es`, and `fr`.
- Selected ISO 639-3 codes, such as `eng`, `spa`, `yue`, and `cmn`.
- Regional `zh` locale codes, such as `zh-cn`, `zh-tw`, and `zh-hk`.

The Realtime API rejects unsupported or incorrectly formatted language codes.

Keywords are hints, not required output. Keep each keyword on one line and don't include `<`, `>`, a carriage return, or a line feed. The Realtime API rejects the session update if a keyword contains one of these characters or `prompt` exceeds the model's length limit.

`gpt-live-transcribe` uses `languages` instead of the singular `language` field. Don't send both.

## Transcribe a committed turn

Use `gpt-transcribe` in a Realtime session only when you specifically need transcription to begin after a committed audio turn or need detected-language output. This specialized workflow requires a WebSocket connection.

When `gpt-transcribe` performs input transcription in a Realtime API session or runs in a dedicated transcription session, it automatically uses earlier transcribed turns as context.

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
          "model": "gpt-transcribe"
        },
        "turn_detection": null
      }
    }
  }
}
```


Append audio and send `input_audio_buffer.commit`. The model can then emit transcript deltas before the final completion event. Its completion event also includes detected languages:

```json
{
  "type": "conversation.item.input_audio_transcription.completed",
  "item_id": "item_003",
  "content_index": 0,
  "transcript": "Bonjour, pouvez-vous m'entendre ?",
  "languages": [{ "code": "fr" }]
}
```


When `gpt-transcribe` can't make a reliable language prediction, `languages` is an empty array. `gpt-live-transcribe` doesn't return detected-language predictions.

## Tune latency and accuracy

Streaming transcription trades latency for transcript quality. Lower delay settings can produce earlier partial text. Higher delay settings give the model more audio context before emitting text and can improve word error rate.

Start by setting `audio.input.transcription.delay` and testing against your real audio. Useful starting points are:

- `minimal` for the most latency-sensitive interactions;
- `low` for low-latency live captions;
- `medium` for a balanced latency/accuracy tradeoff;
- `high` when accuracy matters more than immediate display;
- `xhigh` when your workflow can tolerate the most delay for more context.

The exact delay in milliseconds can vary by model configuration, so benchmark with representative audio instead of assuming a fixed timing per level.

Don't choose a setting from synthetic audio alone. Test with representative microphones, telephony audio, accents, background noise, code-switching, domain vocabulary, and long sessions.

## Handle confidence, timestamps, and speaker labels

`gpt-live-transcribe` doesn't return word-level timestamps, speaker labels, or transcription confidence scores. If your application requires timestamps or speaker labels, use a compatible [file transcription](https://developers.openai.com/api/docs/guides/speech-to-text) model or add an application-level fallback.

## Production checklist

- Pick a target latency and accuracy threshold before tuning.
- Test against real production audio, not only clean samples.
- Test each target language.
- Include numbers, dates, currency, email addresses, product names, and domain terms in your eval set.
- Track empty, truncated, and delayed transcripts apart from word error rate.
- Decide how your UI should revise partial text when later deltas correct earlier text.
- Use `item_id` to order and reconcile final transcripts.
- Keep a fallback path for unsupported timestamps, speaker labels, or confidence fields.

## Related guides

[Realtime and audio overview](https://developers.openai.com/api/docs/guides/realtime)

Compare voice-agent, translation, and transcription sessions.



[Realtime translation](https://developers.openai.com/api/docs/guides/realtime-translation)

Translate live speech with a dedicated translation session.



[WebSocket connection](https://developers.openai.com/api/docs/guides/voice-websockets?api=realtime)

Stream raw audio through a server-side media pipeline.



[Voice activity detection](https://developers.openai.com/api/docs/guides/realtime-vad)

Configure turn detection for live audio streams.