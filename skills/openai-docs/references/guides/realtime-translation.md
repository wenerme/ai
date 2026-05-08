# Realtime translation

import {
  Bolt,
  Cube,
  Desktop,
  Phone,
} from "@components/react/oai/platform/ui/Icon.react";


Realtime translation lets you stream source audio into a dedicated translation session and receive translated audio plus transcript deltas while the speaker is still talking. Use it for live interpretation, multilingual calls, broadcasts, meetings, lessons, and video rooms.

Use [`gpt-realtime-translate`](https://developers.openai.com/api/docs/models/gpt-realtime-translate) when your application should translate what a human says. If you need an assistant that answers questions, calls tools, and manages a conversation, use [`gpt-realtime-2`](https://developers.openai.com/api/docs/models/gpt-realtime-2) with a standard Realtime session instead.

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

In the browser, capture audio, create a peer connection, and post the SDP offer to the translation calls endpoint:

## Create a WebSocket session

Connect to the dedicated translation endpoint and select the model in the URL:

Install the `ws` package for Node.js or the `websocket-client` package for Python before running this example.

Connect to a translation session

```javascript
import WebSocket from "ws";

const ws = new WebSocket(
  "wss://api.openai.com/v1/realtime/translations?model=gpt-realtime-translate",
  {
    headers: {
      Authorization: \`Bearer \${process.env.OPENAI_API_KEY}\`,
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


Configure the target language after the socket opens:

Configure the target language

```javascript
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


Then append audio continuously:

Append source audio

```javascript
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


Listen for translated audio and transcripts:

Listen for translated audio and transcripts

```javascript
ws.on("message", (data) => {
  const event = JSON.parse(data);

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
while True:
    event = json.loads(ws.recv())

    if event["type"] == "session.output_audio.delta":
        play_pcm16(event["delta"])

    if event["type"] == "session.output_transcript.delta":
        print(event["delta"], end="", flush=True)

    if event["type"] == "session.input_transcript.delta":
        update_source_transcript(event["delta"])
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
- Keep speaker tracks separate for conversational translation.
- Use one session per output language.
- Render both source and target transcripts when useful.
- Expose controls for original audio, translated audio, subtitles, mute, and volume.
- Surface reconnecting, delayed, and unavailable states.
- Track latency apart from translation quality.

## Related guides

<a href="/api/docs/guides/realtime">
  

<span slot="icon">
      </span>
    Compare voice-agent, translation, and transcription sessions.


</a>

<a href="/api/docs/guides/realtime-webrtc">
  

<span slot="icon">
      </span>
    Connect browser media to a realtime session.


</a>

<a href="/api/docs/guides/realtime-websocket">
  

<span slot="icon">
      </span>
    Stream raw audio through a server-side media pipeline.


</a>

<a href="/api/docs/guides/realtime-transcription">
  

<span slot="icon">
      </span>
    Stream transcript deltas from live audio.


</a>