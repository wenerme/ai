> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Gemini Live API overview

The Live API enables low-latency, real-time voice and vision interactions with
Gemini. It processes continuous streams of audio, images, and text to deliver
immediate, human-like spoken responses, creating a natural conversational
experience for your users.

![](https://www.gstatic.com/cloud-cms/995b16822e9fa0e87694e97e1da60e42.png)

{% button href="https://aistudio.google.com/live" icon="mic" variant="primary" %}Try the Live API in Google AI Studio{% /button %}

{% button href="https://github.com/google-gemini/gemini-live-api-examples" icon="code" variant="primary" %}Clone example apps from GitHub{% /button %}

{% button href="/docs/coding-agents" icon="terminal" variant="primary" %}Use coding agent skills{% /button %}

## Use cases  {% id="use-cases" %}

Live API can be used to build real-time voice agents for a
variety of industries, including:

*   **E-commerce and retail:** Shopping assistants that offer personalized
  recommendations and support agents that resolve customer issues.

*   **Gaming:** Interactive non-player characters (NPCs), in-game help
  assistants, and real-time translation of in-game content.

*   **Next-gen interfaces:** Voice- and video-enabled experiences in robotics,
  smart glasses, and vehicles.

*   **Healthcare:** Health companions for patient support and education.

*   **Financial services:** AI advisors for wealth management and investment
  guidance.

*   **Education:** AI mentors and learner companions that provide personalized
  instruction and feedback.

*   **Translation and localization:** Real-time, low-latency translation of
  spoken conversations, enabling seamless multilingual communication.

*   **Live transcription and captioning:** Real-time speech-to-text streaming for
  live subtitles, meeting transcription, voice dictation, and customer call logging.


## Key features  {% id="key-features" %}

Live API offers a comprehensive set of features for building
robust voice agents:

*   [**Multilingual support**](/docs/live-api/capabilities#supported-languages):
  Converse in 70 supported languages.

*   [**Barge-in**](/docs/live-api/capabilities#interruptions):
  Users can interrupt the model at any time for responsive interactions.

*   [**Tool use**](/docs/live-api/tools):
  Integrates tools like function calling and Google Search for dynamic
  interactions.

*   [**Audio transcriptions**](/docs/live-api/capabilities#audio-transcription):
  Provides text transcripts of both user input and model output.

*   [**Proactive audio**](/docs/live-api/capabilities#proactive-audio):
  Lets you control when the model responds and in what contexts.

*   [**Affective dialog**](/docs/live-api/capabilities#affective-dialog):
  Adapts response style and tone to match the user's input expression.

*   [**Live Transcription**](/docs/live-api/live-transcribe):
  Real-time, continuous speech-to-text streaming with automatic language detection and custom vocabulary.

*   [**Live Translation**](/docs/live-api/live-translate):
  Real-time voice-to-voice translation in 70+ languages.


## Technical specifications  {% id="technical-specifications" %}

The following table outlines the technical specifications for the
Live API:

{% table %}
  * Category
  * Details

  ---

  * Input modalities
  * Audio (raw 16-bit PCM audio, 16kHz, little-endian), images (JPEG <= 1FPS), text

  ---

  * Output modalities
  * Audio (raw 16-bit PCM audio, 24kHz, little-endian)

  ---

  * Protocol
  * Stateful WebSocket connection (WSS)
{% /table %}

## Choose an implementation approach  {% id="implementation-approach" %}

When integrating with Live API, you'll need to choose one of the following
implementation approaches:

-   **Server-to-server**: Your backend connects to the Live API using
  [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). Typically, your client sends stream data (audio, video,
  text) to your server, which then forwards it to the Live API.

-   **Client-to-server**: Your frontend code connects directly to the Live API
  using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to stream data, bypassing your backend.


{% callout type="note" %}
  Note: Client-to-server generally offers better performance for streaming audio
  and video, since it bypasses the need to send the stream to your backend first.
  It's also easier to set up since you don't need to implement a proxy that sends
  data from your client to your server and then your server to the API. However,
  for production environments, in order to mitigate security risks, we recommend
  using [ephemeral tokens](/docs/live-api/ephemeral-tokens) instead of standard
  API keys.

{% /callout %}

## Get started  {% id="get-started" %}

Select the guide that matches your development environment:

{% card-grid %}
  {% card badge="Server-to-server" description="Connect to the Gemini Live API using the GenAI SDK to build a\nreal-time multimodal application with a Python backend." href="/docs/live-api/get-started-sdk" title="GenAI SDK tutorial" /%}

  {% card badge="Client-to-server" description="Connect to the Gemini Live API using WebSockets to build a\nreal-time multimodal application with a JavaScript frontend and ephemeral\ntokens." href="/docs/live-api/get-started-websocket" title="WebSocket tutorial" /%}

  {% card badge="Agent Development Kit" description=Create an agent and use the Agent Development Kit (ADK)
Streaming to enable voice and video communication. href="https://google.github.io/adk-docs/streaming/" title="ADK tutorial" /%}

{% /card-grid %}

## Partner integrations  {% id="partner-integrations" %}

To streamline the development of real-time audio and video apps, you can use
a third-party integration that supports the Gemini Live API over WebRTC or
WebSockets.

{% card-grid %}
  {% card description="Use the Gemini Live API with LiveKit Agents." href="https://docs.livekit.io/agents/models/realtime/plugins/gemini/" title="LiveKit" /%}

  {% card description="Create a real-time AI chatbot using Gemini Live and Pipecat." href="https://docs.pipecat.ai/guides/features/gemini-live" title="Pipecat by Daily" /%}

  {% card description="Create live video and audio streaming applications with\nFishjam." href="https://docs.fishjam.io/tutorials/gemini-live-integration" title="Fishjam by Software Mansion" /%}

  {% card description="Build real-time voice and video AI applications with Vision\nAgents." href="https://visionagents.ai/integrations/gemini" title="Vision Agents by Stream" /%}

  {% card description="Connect inbound and outbound calls to Live API with\nVoximplant." href="https://voximplant.com/products/gemini-client" title="Voximplant" /%}

  {% card description="Build real-time conversational AI applications with Agora." href="https://docs.agora.io/en/conversational-ai/models/mllm/gemini" title="Agora" /%}

  {% card description="Get started with the Gemini Live API using Firebase AI\nLogic." href="https://firebase.google.com/docs/ai-logic/live-api?api=dev" title="Firebase AI SDK" /%}

{% /card-grid %}

