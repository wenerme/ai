# Realtime translation

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Realtime translation lets you stream source audio into a dedicated translation session and receive translated audio plus transcript deltas while the speaker is still talking. Use it for live interpretation, multilingual calls, broadcasts, meetings, lessons, and video rooms.

Use [`gpt-realtime-translate`](https://developers.openai.com/api/docs/models/gpt-realtime-translate) when your application should translate what a human says. If you need an assistant that answers questions, calls tools, and manages a conversation, use [`gpt-realtime-2.1`](https://developers.openai.com/api/docs/models/gpt-realtime-2.1) with a standard Realtime session instead.

## How translation sessions differ

Realtime translation sessions use a different architecture from voice-agent sessions:

| Voice-agent session                         | Translation session                              |
| ------------------------------------------- | ------------------------------------------------ |
| Connects to `/v1/realtime`.                 | Connects to `/v1/realtime/translations`.         |
| The model acts as an assistant.             | The model acts as an interpreter.                |
| Uses a conversation and response lifecycle. | Streams continuously from incoming audio.        |
| May call tools and produce assistant turns. | Produces translated audio and transcript deltas. |
| You can call `response.create`.             | You don't call `response.create`.                |

Translation starts from the audio stream itself. Keep appending audio, including silence between phrases, and handle output events as they arrive.

## Choose a transport

Use WebRTC when the browser captures or plays audio. WebRTC sends source audio as a media track and receives translated speech as a remote audio track, so you don't need to manually resample or play PCM chunks.

Use WebSockets when your server already receives raw audio, such as Twilio Media Streams, SIP media, broadcast ingest, or a media worker. With WebSockets, send base64-encoded 24 kHz PCM16 audio and play returned audio deltas yourself.

## Create a browser WebRTC session

For browser apps, create a short-lived client secret on your server. Don't expose your standard API key in the browser.

Create a translation client secret

```typescript
app.post("/session", async (req, res) => {
  const language = req.body.targetLanguage ?? "es";

  const response = await fetch(
    "https://api.openai.com/v1/realtime/translations/client_secrets",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Safety-Identifier": "hashed-user-id",
      },
      body: JSON.stringify({
        session: {
          model: "gpt-realtime-translate",
          audio: {
            output: { language },
          },
        },
      }),
    }
  );

  res.status(response.status).json(await response.json());
});
```


In the browser, capture audio, create a peer connection, and post the SDP offer to the translation calls endpoint:

Connect a browser translation call

```typescript
const { value: clientSecret } = await fetch("/session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ targetLanguage: "es" }),
}).then((response) => response.json());

const sourceStream = await navigator.mediaDevices.getUserMedia({
  audio: true,
});

const pc = new RTCPeerConnection();
pc.addTrack(sourceStream.getAudioTracks()[0], sourceStream);

const translatedAudio = new Audio();
translatedAudio.autoplay = true;
pc.ontrack = ({ streams }) => {
  translatedAudio.srcObject = streams[0];
};

const events = pc.createDataChannel("oai-events");
events.onmessage = ({ data }) => {
  const event = JSON.parse(data);
  if (event.type === "session.output_transcript.delta") {
    subtitles.textContent += event.delta;
  }
};

const offer = await pc.createOffer();
await pc.setLocalDescription(offer);

const sdpResponse = await fetch(
  "https://api.openai.com/v1/realtime/translations/calls",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${clientSecret}`,
      "Content-Type": "application/sdp",
    },
    body: offer.sdp,
  }
);

if (!sdpResponse.ok) {
  throw new Error(await sdpResponse.text());
}

await pc.setRemoteDescription({
  type: "answer",
  sdp: await sdpResponse.text(),
});
```


## Create a WebSocket session

Connect to the dedicated translation endpoint and select the model in the URL:




Before running this example, install `ws` for Node.js.







Before running this example, install `websocket-client` and `sounddevice` for Python.







Before running this example, install `openai` and `async-websocket` for Ruby (`gem install openai` and `gem install async-websocket`).







Before running this example, add the Maven dependency `com.openai:openai-java:4.75.1`.







The Java examples cover connection setup, language configuration, and audio input separately. They don't show a complete translation workflow: the Java SDK supports receiving events and finishing a session, but this guide doesn't include Java examples for those steps. Use the Node.js or Python examples to follow the complete workflow below.




Connect to a translation session

```typescript
import WebSocket from "ws";

const ws = new WebSocket(
  "wss://api.openai.com/v1/realtime/translations?model=gpt-realtime-translate",
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "OpenAI-Safety-Identifier": "hashed-user-id",
    },
  }
);
```

```python
import os
import websocket

ws = websocket.WebSocket()
ws.connect(
    "wss://api.openai.com/v1/realtime/translations?model=gpt-realtime-translate",
    header=[
        f"Authorization: Bearer {os.environ['OPENAI_API_KEY']}",
        "OpenAI-Safety-Identifier: hashed-user-id",
    ],
)
```

```go
ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
defer cancel()
client := openai.NewClient()
session, err := client.Realtime.ConnectTranslation(ctx, "gpt-realtime-translate", realtime.TranslationConnectionOptions{}, option.WithHeader("OpenAI-Safety-Identifier", "hashed-user-id"))
if err != nil {
	return err
}
defer session.Abort()
created, err := session.Recv(ctx)
if err != nil {
	return err
}
fmt.Println(created.Type)
if created.Type != "session.created" {
	return fmt.Errorf("expected session.created, got %s", created.Type)
}
```

```java
import com.openai.client.okhttp.OkHttpClient;
import com.openai.core.ClientOptions;
import com.openai.helpers.TranslationConnection;
import com.openai.helpers.TranslationWebSocketOptions;
import com.openai.models.realtime.*;

var http = OkHttpClient.builder().build();
var options =
    ClientOptions.builder()
        .fromEnv()
        .httpClient(http)
        .putHeader("OpenAI-Safety-Identifier", "hashed-user-id")
        .build();
try (http;
    var connection =
        TranslationConnection.connect(
            options,
            TranslationWebSocketOptions.builder()
                .model("gpt-realtime-translate")
                .sendTimeout(java.time.Duration.ofSeconds(30))
                .build())) {
  while (true) {
    var event = connection.receive();
    if (event.error().isPresent())
      throw new IllegalStateException(event.error().orElseThrow().toString());
    if (event.sessionCreated().isPresent()) {
      System.out.println("Connected to translation session.");
      System.out.println(event);
      break;
    }
  }
}
```

```ruby
require "openai"
require "base64"

client = OpenAI::Client.new
client.realtime.connect_translation(
  model: "gpt-realtime-translate",
  request_options: { extra_headers: { "OpenAI-Safety-Identifier" => "hashed-user-id" } }
) do |session|
  created = session.receive
  unless created.is_a?(OpenAI::Realtime::RealtimeTranslationSessionCreatedEvent)
    raise "Connection closed before session creation"
  end

  puts created.type
  # Insert the configuration, audio, listener, and closing steps here.
end
```





For Ruby, insert the configuration, audio-append, listener, and closing snippets below inside the same `client.realtime.connect_translation` block, after the session-created check. The listener snippet defines the event handler. The closing snippet calls that handler while `session.finish` drains the existing connection through `session.closed`. Keep all four steps inside the block so they use the configured Spanish session.







The Java connection example closes the socket when its `try` block ends. The Java configuration and audio-input examples require an open `TranslationConnection`; keep it open while sending audio and receiving output. Before leaving the block, finish the session and drain its events through `session.closed` as described in [Close a WebSocket session](#close-a-websocket-session).




Configure the target language after the socket opens:

Configure the target language

```typescript
ws.on("open", () => {
  ws.send(
    JSON.stringify({
      type: "session.update",
      session: {
        audio: {
          output: {
            language: "es",
          },
        },
      },
    })
  );
});
```

```python
import json

ws.send(
    json.dumps(
        {
            "type": "session.update",
            "session": {
                "audio": {
                    "output": {
                        "language": "es",
                    },
                },
            },
        }
    )
)
```

```go
if err := session.Send(ctx, realtime.RealtimeTranslationClientEventParamOfSessionUpdate(realtime.RealtimeTranslationSessionUpdateRequestParam{
	Audio: realtime.RealtimeTranslationSessionUpdateRequestAudioParam{
		Output: realtime.RealtimeTranslationSessionUpdateRequestAudioOutputParam{
			Language: openai.String("es"),
		},
	},
})); err != nil {
	return err
}
```

```java
import com.openai.client.okhttp.OkHttpClient;
import com.openai.core.ClientOptions;
import com.openai.helpers.TranslationConnection;
import com.openai.helpers.TranslationWebSocketOptions;
import com.openai.models.realtime.*;

connection.send(
    RealtimeTranslationClientEvent.ofSessionUpdate(
        RealtimeTranslationSessionUpdateEvent.builder()
            .session(
                RealtimeTranslationSessionUpdateRequest.builder()
                    .audio(
                        RealtimeTranslationSessionUpdateRequest.Audio.builder()
                            .output(
                                RealtimeTranslationSessionUpdateRequest.Audio.Output.builder()
                                    .language("es")
                                    .build())
                            .build())
                    .build())
            .build()));
```

```ruby
session.send_event(type: "session.update", session: { audio: { output: { language: "es" } } })
updated = session.receive
unless updated.is_a?(OpenAI::Realtime::RealtimeTranslationSessionUpdatedEvent)
  raise "Connection closed before session update"
end

puts updated.type
```


Then append audio continuously:

Append source audio

```typescript
ws.send(
  JSON.stringify({
    type: "session.input_audio_buffer.append",
    audio: base64Pcm16,
  })
);
```

```python
ws.send(
    json.dumps(
        {
            "type": "session.input_audio_buffer.append",
            "audio": base64_pcm16,
        }
    )
)
```

```go
// audio contains mono PCM16 samples at 24 kHz.
for start := 0; start < len(audio); start += 4800 {
	end := min(start+4800, len(audio))
	if err := session.Send(ctx, realtime.RealtimeTranslationClientEventParamOfSessionInputAudioBufferAppend(base64.StdEncoding.EncodeToString(audio[start:end]))); err != nil {
		return err
	}
}
```

```java
import com.openai.client.okhttp.OkHttpClient;
import com.openai.core.ClientOptions;
import com.openai.helpers.TranslationConnection;
import com.openai.helpers.TranslationWebSocketOptions;
import com.openai.models.realtime.*;
import java.util.Base64;

// Call for each PCM16, 24 kHz, mono chunk supplied by your audio source.
static void appendAudio(TranslationConnection connection, byte[] pcmAudio) {
  String base64Pcm16 = Base64.getEncoder().encodeToString(pcmAudio);
  connection.send(
      RealtimeTranslationClientEvent.ofSessionInputAudioBufferAppend(
          RealtimeTranslationInputAudioBufferAppendEvent.builder().audio(base64Pcm16).build()));
}
```

```ruby
# speech.pcm contains nonempty mono PCM16 audio sampled at 24 kHz.
raise "Expected nonempty PCM16 audio" unless File.size("speech.pcm").positive? && File.size("speech.pcm").even?

File.open("speech.pcm", "rb") do |input|
  while (chunk = input.read(4800))
    session.send_event(type: "session.input_audio_buffer.append", audio: Base64.strict_encode64(chunk))
  end
end
```


Listen for translated audio and transcripts:

Listen for translated audio and transcripts

```typescript
ws.on("message", (data) => {
  const event = JSON.parse(data.toString());

  if (event.type === "session.output_audio.delta") {
    playPcm16(event.delta);
  }

  if (event.type === "session.output_transcript.delta") {
    process.stdout.write(event.delta);
  }

  if (event.type === "session.input_transcript.delta") {
    updateSourceTranscript(event.delta);
  }
});
```

```python
import base64
import json
from concurrent.futures import ThreadPoolExecutor
from contextlib import suppress
from queue import SimpleQueue

import sounddevice as sd

audio_queue = SimpleQueue()


def play_audio():
    try:
        # Closing the stream waits for PortAudio's pending buffers to finish.
        with sd.RawOutputStream(samplerate=24000, channels=1, dtype="int16") as stream:
            while (pcm := audio_queue.get()) is not None:
                stream.write(pcm)
    except Exception:
        # The receiver may have already closed the socket.
        with suppress(OSError):
            ws.abort()  # Wake recv() so the receiver can report the playback failure.
        raise


with ThreadPoolExecutor(max_workers=1) as executor:
    playback = executor.submit(play_audio)
    try:
        while True:
            event = json.loads(ws.recv())
            if playback.done():
                playback.result()  # Report a playback failure on the receiver.

            if event["type"] == "session.output_audio.delta":
                audio_queue.put(base64.b64decode(event["delta"]))

            if event["type"] in (
                "session.output_transcript.delta",
                "session.input_transcript.delta",
            ):
                print(event["delta"], end="", flush=True)

            if event["type"] == "error":
                raise RuntimeError(f"Translation error: {event['error']['code']}")

            if event["type"] == "session.closed":
                break
    finally:
        ws.close()
        audio_queue.put(None)
        playback.result()
```

```go
// Run this listener while another goroutine sends audio into the session.
func listen(ctx context.Context, session *realtime.TranslationSession) error {
	for {
		event, err := session.Recv(ctx)
		if err != nil {
			return err
		}
		switch event.Type {
		case "error":
			return fmt.Errorf("translation error: %s", event.OfRealtimeErrorEvent.Error.Message)
		case "session.output_transcript.delta":
			fmt.Print(event.OfRealtimeTranslationOutputTranscriptDeltaEvent.Delta)
		case "session.output_audio.delta":
			pcm, err := base64.StdEncoding.DecodeString(event.OfRealtimeTranslationOutputAudioDeltaEvent.Delta)
			if err != nil {
				return err
			}
			// Feed pcm into your application's 24 kHz audio player.
			fmt.Fprintln(log.Writer(), "Received audio bytes:", len(pcm))
		case "session.closed":
			return session.Close()
		}
	}
}
```

```ruby
handle_translation_event = lambda do |event, output|
  case event
  when OpenAI::Realtime::RealtimeErrorEvent
    raise "Translation error: #{event.error.message}"
  when OpenAI::Realtime::RealtimeTranslationOutputTranscriptDeltaEvent
    print event.delta
    $stdout.flush
  when OpenAI::Realtime::RealtimeTranslationOutputAudioDeltaEvent
    pcm = Base64.strict_decode64(event.delta)
    output.write(pcm)
    warn "Received audio bytes: #{pcm.bytesize}"
  end
end
```


In Go, run `listen` concurrently while sending audio. It closes the transport after receiving `session.closed`.

## Close a WebSocket session

When your source stream ends, send a [`session.close`](https://developers.openai.com/api/reference/resources/realtime/translation-client-events#session-close) event before closing the WebSocket. The event tells the service to flush pending input audio, emit any remaining translated audio and transcript output, and then send a `session.closed` event. The `session.close` event is only supported for translation sessions.

After you send `session.close`, stop appending audio and continue reading events in your normal receive loop until you receive `session.closed`. Closing the socket immediately can drop translated output still draining from the session.

Close a translation session

```typescript
let translationSessionClosing = false;
let gotTranslationClosed = false;
let drainDeadline: ReturnType<typeof setTimeout> | undefined;

ws.on("close", () => {
  clearTimeout(drainDeadline);
  if (!gotTranslationClosed) {
    console.error("Translation disconnected before final session.closed");
    process.exitCode = 1;
  }
});

function closeTranslationSession() {
  if (translationSessionClosing) {
    return;
  }

  translationSessionClosing = true;
  // Adjust this deadline for your application's finalization requirements.
  drainDeadline = setTimeout(() => {
    console.error("Translation finalization timed out");
    process.exitCode = 1;
    ws.close();
  }, 15_000);
  ws.send(JSON.stringify({ type: "session.close" }));
}

// Use this in place of the earlier output handler, so audio plays only once.
ws.on("message", (data) => {
  const event = JSON.parse(data.toString());

  if (event.type === "session.output_audio.delta") {
    playPcm16(event.delta);
  }

  if (event.type === "session.output_transcript.delta") {
    process.stdout.write(event.delta);
  }

  if (event.type === "session.input_transcript.delta") {
    updateSourceTranscript(event.delta);
  }

  if (event.type === "error") {
    clearTimeout(drainDeadline);
    console.error("Translation error", event.error?.code);
    process.exitCode = 1;
    ws.close();
  }

  if (event.type === "session.closed") {
    clearTimeout(drainDeadline);
    gotTranslationClosed = true;
    ws.close();
  }
});

// Call this when the source stream ends.
closeTranslationSession();
```

```python
import base64
import json
import time
from concurrent.futures import ThreadPoolExecutor
from contextlib import suppress
from queue import SimpleQueue

import sounddevice as sd

audio_queue = SimpleQueue()


def play_audio():
    try:
        # Closing the stream waits for PortAudio's pending buffers to finish.
        with sd.RawOutputStream(samplerate=24000, channels=1, dtype="int16") as stream:
            while (pcm := audio_queue.get()) is not None:
                stream.write(pcm)
    except Exception:
        # The receiver may have already closed the socket.
        with suppress(OSError):
            ws.abort()  # Wake recv() so the receiver can report the playback failure.
        raise


translation_session_closing = False


def close_translation_session():
    global translation_session_closing
    if translation_session_closing:
        return

    translation_session_closing = True
    ws.send(json.dumps({"type": "session.close"}))


with ThreadPoolExecutor(max_workers=1) as executor:
    playback = executor.submit(play_audio)
    try:
        # Call this when the source stream ends.
        close_translation_session()
        # Adjust this deadline for your application's finalization requirements.
        drain_deadline = time.monotonic() + 15.0

        while True:
            remaining = drain_deadline - time.monotonic()
            if remaining <= 0:
                raise TimeoutError("Translation finalization timed out")
            ws.settimeout(remaining)
            data = ws.recv()
            if not data:
                raise RuntimeError("Translation disconnected before session.closed")
            event = json.loads(data)
            if playback.done():
                playback.result()  # Report a playback failure on the receiver.

            if event["type"] == "error":
                raise RuntimeError(f"Translation error: {event['error']['code']}")

            if event["type"] == "session.output_audio.delta":
                audio_queue.put(base64.b64decode(event["delta"]))

            if event["type"] in (
                "session.output_transcript.delta",
                "session.input_transcript.delta",
            ):
                print(event["delta"], end="", flush=True)

            if event["type"] == "session.closed":
                break
    finally:
        # The server deadline covers receiving events, not local playback.
        ws.close()
        audio_queue.put(None)
        playback.result()
```

```go
// Stop sending audio first. The listener closes the transport after session.closed.
if err := session.Send(ctx, realtime.RealtimeTranslationClientEventUnionParam{
	OfSessionClose: &realtime.RealtimeTranslationSessionCloseEventParam{},
}); err != nil {
	return err
}
```

```ruby
# Finish the existing session and consume its trailing output through session.closed.
File.open("translated.pcm", "wb") do |output|
  session.finish(timeout: 15) do |event|
    handle_translation_event.call(event, output)
  end
end
# translated.pcm is ready for your application's 24 kHz PCM16 audio player.
```


## Build listen-along translation

Use listen-along translation when one source speaker or stream needs translated audio for an audience. Examples include livestreams, conference talks, webinars, earnings calls, lectures, and videos.

The typical architecture is:

```text
source audio -> translation session -> translated audio + subtitles
```


Create one translation session for each target language. If the same English source needs Spanish and French output, create one English-to-Spanish session and one English-to-French session.

For browser listen-along apps, capture tab audio with `getDisplayMedia()`, send it over WebRTC, and play the remote translated audio track. For production broadcasts, run translation in a server media worker and publish translated audio tracks or captions to listeners.

## Build conversational translation

Use conversational translation when two or more participants speak across languages. Examples include support calls, sales calls, tutoring, and video rooms.

Keep participant audio tracks separate. Mixing speakers into one stream makes speaker identity, speaker captions, and overlapping speech more difficult to handle.

For a two-person call, create one translation session per direction:

```text
Caller A audio -> translate into Caller B language -> play to Caller B
Caller B audio -> translate into Caller A language -> play to Caller A
```


For group rooms, session count depends on active speakers and target languages:

```text
translation sessions ~= active source speaker tracks x distinct target languages
```


For small rooms, each listener can create browser-side translation sidecars for the remote speakers they want translated. For larger rooms, use a server-side participant or media worker that subscribes to each source speaker once, creates one translation session per target language, and republishes translated tracks.

## Test quality and latency

Test translation with real audio and bilingual review. Automated metrics can help, but they won't catch every error users notice.

Test:

- language-pair quality;
- names, numbers, dates, currency, and phone numbers;
- domain-specific terminology;
- code-switching and mixed-language conversation;
- accents, fast speech, and overlapping speech;
- first translated audio latency;
- end-of-utterance latency;
- subtitle timing;
- voice consistency;
- reconnect behavior.

If your use case depends on exact names or domain terms, build a golden set before launch and review failures manually.

## Production checklist

- Choose WebRTC for browser media and WebSockets for server media.
- Use the dedicated `/v1/realtime/translations` endpoint.
- Stream audio continuously, including silence between phrases.
- Use `session.close` and wait for `session.closed` before closing a WebSocket session.
- Keep speaker tracks separate for conversational translation.
- Use one session per output language.
- Render both source and target transcripts when useful.
- Expose controls for original audio, translated audio, subtitles, mute, and volume.
- Surface reconnecting, delayed, and unavailable states.
- Track latency apart from translation quality.

## Related guides

[Realtime and audio overview](https://developers.openai.com/api/docs/guides/realtime)

Compare voice-agent, translation, and transcription sessions.



[WebRTC connection](https://developers.openai.com/api/docs/guides/voice-webrtc?api=realtime)

Connect browser media to a realtime session.



[WebSocket connection](https://developers.openai.com/api/docs/guides/voice-websockets?api=realtime)

Stream raw audio through a server-side media pipeline.



[Realtime transcription](https://developers.openai.com/api/docs/guides/realtime-transcription)

Stream transcript deltas from live audio.