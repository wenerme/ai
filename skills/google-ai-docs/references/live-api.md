# Gemini Live API overview

> [!WARNING]
> **Preview:** The Live API is in [Preview](https://cloud.google.com/products#product-launch-stages).

The Live API enables low-latency, real-time voice and vision interactions with
Gemini. It processes continuous streams of audio, images, and text to deliver
immediate, human-like spoken responses, creating a natural conversational
experience for your users.

![Live API Overview](https://ai.google.dev/static/gemini-api/docs/images/live-api-overview.png)
[Try the Live API in Google AI Studio](https://aistudio.google.com/live) [Clone example apps from GitHub](https://github.com/google-gemini/gemini-live-api-examples) [Use coding agent skills](https://ai.google.dev/gemini-api/docs/coding-agents)

## Use cases

Live API can be used to build real-time voice agents for a
variety of industries, including:

- **E-commerce and retail:** Shopping assistants that offer personalized recommendations and support agents that resolve customer issues.
- **Gaming:** Interactive non-player characters (NPCs), in-game help assistants, and real-time translation of in-game content.
- **Next-gen interfaces:** Voice- and video-enabled experiences in robotics, smart glasses, and vehicles.
- **Healthcare:** Health companions for patient support and education.
- **Financial services:** AI advisors for wealth management and investment guidance.
- **Education:** AI mentors and learner companions that provide personalized instruction and feedback.
- **Translation and localization:** Real-time, low-latency translation of spoken conversations, enabling seamless multilingual communication.

## Key features

Live API offers a comprehensive set of features for building
robust voice agents:

- [**Multilingual support**](https://ai.google.dev/gemini-api/docs/live-guide#supported-languages): Converse in 70 supported languages.
- [**Barge-in**](https://ai.google.dev/gemini-api/docs/live-guide#interruptions): Users can interrupt the model at any time for responsive interactions.
- [**Tool use**](https://ai.google.dev/gemini-api/docs/live-tools): Integrates tools like function calling and Google Search for dynamic interactions.
- [**Audio transcriptions**](https://ai.google.dev/gemini-api/docs/live-guide#audio-transcription): Provides text transcripts of both user input and model output.
- [**Proactive audio**](https://ai.google.dev/gemini-api/docs/live-guide#proactive-audio): Lets you control when the model responds and in what contexts.
- [**Affective dialog**](https://ai.google.dev/gemini-api/docs/live-guide#affective-dialog): Adapts response style and tone to match the user's input expression.
- [**Live Translation**](https://ai.google.dev/gemini-api/docs/live-api/live-translate): Real-time voice-to-voice translation in 70+ languages.

## Technical specifications

The following table outlines the technical specifications for the
Live API:

| Category | Details |
|---|---|
| Input modalities | Audio (raw 16-bit PCM audio, 16kHz, little-endian), images (JPEG \<= 1FPS), text |
| Output modalities | Audio (raw 16-bit PCM audio, 24kHz, little-endian) |
| Protocol | Stateful WebSocket connection (WSS) |

## Choose an implementation approach

When integrating with Live API, you'll need to choose one of the following
implementation approaches:

- **Server-to-server** : Your backend connects to the Live API using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). Typically, your client sends stream data (audio, video, text) to your server, which then forwards it to the Live API.
- **Client-to-server** : Your frontend code connects directly to the Live API using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to stream data, bypassing your backend.

> [!NOTE]
> **Note:** Client-to-server generally offers better performance for streaming audio and video, since it bypasses the need to send the stream to your backend first. It's also easier to set up since you don't need to implement a proxy that sends data from your client to your server and then your server to the API. However, for production environments, in order to mitigate security risks, we recommend using [ephemeral tokens](https://ai.google.dev/gemini-api/docs/ephemeral-tokens) instead of standard API keys.

## Get started

Select the guide that matches your development environment:
Server-to-server

### [GenAI SDK tutorial](https://ai.google.dev/gemini-api/docs/live-api/get-started-sdk)


Connect to the Gemini Live API using the GenAI SDK to build a real-time multimodal application with a Python backend.

Client-to-server

### [WebSocket tutorial](https://ai.google.dev/gemini-api/docs/live-api/get-started-websocket)


Connect to the Gemini Live API using WebSockets to build a real-time multimodal application with a JavaScript frontend and ephemeral tokens.

Agent development kit

### [ADK tutorial](https://google.github.io/adk-docs/streaming/)


Create an agent and use the Agent Development Kit (ADK) Streaming to enable voice and video communication.

## Partner integrations


To streamline the development of real-time audio and video apps, you can use
a third-party integration that supports the Gemini Live
API over WebRTC or WebSockets.
[LiveKit
Use the Gemini Live API with LiveKit Agents.](https://docs.livekit.io/agents/models/realtime/plugins/gemini/) [Pipecat by Daily
Create a real-time AI chatbot using Gemini Live and Pipecat.](https://docs.pipecat.ai/guides/features/gemini-live) [Fishjam by Software Mansion
Create live video and audio streaming applications with Fishjam.](https://docs.fishjam.io/tutorials/gemini-live-integration) [Vision Agents by Stream
Build real-time voice and video AI applications with Vision Agents.](https://visionagents.ai/integrations/gemini) [Voximplant
Connect inbound and outbound calls to Live API with Voximplant.](https://voximplant.com/products/gemini-client) [Agora
Build real-time conversational AI applications with Agora.](https://docs.agora.io/en/conversational-ai/models/mllm/gemini) [Firebase AI SDK
Get started with the Gemini Live API using Firebase AI Logic.](https://firebase.google.com/docs/ai-logic/live-api?api=dev)