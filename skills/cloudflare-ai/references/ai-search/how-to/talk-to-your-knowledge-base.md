---
title: Talk to your knowledge base
description: Build a voice agent that lets users speak to an AI Search knowledge base and hear spoken answers, using the Cloudflare Agents voice pipeline.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Talk to your knowledge base

This tutorial builds a voice agent that you can talk to and that answers out loud from your [AI Search](https://developers.cloudflare.com/ai-search/) knowledge base. It uses the [Cloudflare Agents](https://developers.cloudflare.com/agents/) [@cloudflare/voice](https://developers.cloudflare.com/agents/communication-channels/voice/) package for the speech pipeline, and AI Search as the agent's knowledge base, exposed as a retrieval tool the agent's model calls.

**What you will build:** A voice agent that transcribes your speech, calls AI Search to retrieve relevant content from your indexed knowledge base, generates a grounded answer, and speaks it back.

## How it works

The `@cloudflare/voice` package adds a full voice pipeline to a Cloudflare Agent: speech-to-text (STT), a "turn" handler where you produce a reply, and text-to-speech (TTS). The pipeline runs in a single Worker backed by a Durable Object, and the browser connects to it over a WebSocket.

The one method you write is `onTurn()`, which receives the user's transcript and returns the text to speak. This is where AI Search fits in: you run a language model and give it AI Search as a retrieval tool. The model decides when to search your knowledge base, grounds its reply in the results it gets back, and returns the answer text, which the pipeline speaks.

Browser Mic

[ Workers AI Speech-to-text ](https://developers.cloudflare.com/workers-ai/)

Cloudflare Agents onTurn(transcript)

tool [ AI Search retrieval ](https://developers.cloudflare.com/ai-search/)

[ Workers AI Text-to-speech ](https://developers.cloudflare.com/workers-ai/)

Browser Speaker

Note

The voice pipeline uses [Workers AI](https://developers.cloudflare.com/workers-ai/) for STT and TTS, so no extra API keys are required. `@cloudflare/voice` is in beta.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You also need an AI Search instance that already contains indexed content. This is the knowledge base you will speak to. To create one and add content, refer to [Get started](https://developers.cloudflare.com/ai-search/get-started/).

## 1\. Create the voice agent

Scaffold a Cloudflare Agents project with the voice starter template, which includes the Durable Object wiring and a React client:

```sh
npm create cloudflare@latest voice-knowledge-base -- --template cloudflare/agents-starter
cd voice-knowledge-base
```

Install the voice package:

 npm  yarn  pnpm  bun

```
npm i @cloudflare/voice
```

```
yarn add @cloudflare/voice
```

```
pnpm add @cloudflare/voice
```

```
bun add @cloudflare/voice
```

The [@cloudflare/voice](https://developers.cloudflare.com/agents/communication-channels/voice/) package provides the `withVoice` mixin and the Workers AI providers (`WorkersAIFluxSTT` and `WorkersAITTS`). For a full walkthrough of the voice agent itself, including the browser client, refer to the [Voice agent example](https://developers.cloudflare.com/agents/examples/voice-agent/).

## 2\. Add the AI Search binding

Add an [AI Search binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/) to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), alongside the Workers AI binding and the agent's Durable Object. Replace `my-instance` with the name of your instance.

* [  wrangler.jsonc ](#tab-panel-7115)
* [  wrangler.toml ](#tab-panel-7116)

**JSONC**

```jsonc
{
  "name": "voice-knowledge-base",
  "main": "src/server.ts",
  // Set this to today's date
  "compatibility_date": "2026-07-11",
  "compatibility_flags": ["nodejs_compat"],
  "ai": {
    "binding": "AI",
    "remote": true
  },
  "ai_search": [
    {
      "binding": "AI_SEARCH",
      "instance_name": "my-instance",
      "remote": true
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "TalkToDocs",
        "class_name": "TalkToDocs"
      }
    ]
  },
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["TalkToDocs"]
    }
  ]
}
```

**TOML**

```toml
name = "voice-knowledge-base"
main = "src/server.ts"
# Set this to today's date
compatibility_date = "2026-07-11"
compatibility_flags = [ "nodejs_compat" ]


[ai]
binding = "AI"
remote = true


[[ai_search]]
binding = "AI_SEARCH"
instance_name = "my-instance"
remote = true


[[durable_objects.bindings]]
name = "TalkToDocs"
class_name = "TalkToDocs"


[[migrations]]
tag = "v1"
new_sqlite_classes = [ "TalkToDocs" ]
```

Note

The AI Search binding requires a `compatibility_date` of `2026-03-27` or later.

Regenerate your binding types so `env.AI` and `env.AI_SEARCH` are typed:

 npm  yarn  pnpm

```
npx wrangler types
```

```
yarn wrangler types
```

```
pnpm wrangler types
```

## 3\. Answer from your knowledge base

Update `src/server.ts`. Build the agent with the `withVoice` mixin, set the STT and TTS providers, and in `onTurn()` run a Workers AI model that calls AI Search as a retrieval tool.

The model is given a `searchKnowledgeBase` tool that calls AI Search's `search()` for retrieval. It calls the tool when it needs facts from your knowledge base, grounds its answer in the returned chunks, and you return the generated text for the pipeline to speak. The agent stores conversation history automatically, so you can pass `context.messages` for follow-up questions.

* [  JavaScript ](#tab-panel-7117)
* [  TypeScript ](#tab-panel-7118)

**src/server.js**

```js
import { Agent, routeAgentRequest } from "agents";
import { withVoice, WorkersAIFluxSTT, WorkersAITTS } from "@cloudflare/voice";
import { generateText, tool, stepCountIs } from "ai";
import { createWorkersAI } from "workers-ai-provider";
import { z } from "zod";


const VoiceAgent = withVoice(Agent);


export class TalkToDocs extends VoiceAgent {
  // Workers AI powers speech-to-text and text-to-speech (no API keys needed).
  transcriber = new WorkersAIFluxSTT(this.env.AI);
  tts = new WorkersAITTS(this.env.AI);


  // Called each time the user finishes speaking. The agent's model generates
  // the reply, calling AI Search as a retrieval tool when it needs facts from
  // your knowledge base.
  async onTurn(transcript, context) {
    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = await generateText({
      // Use a Workers AI model that supports function calling.
      model: workersai("@cf/zai-org/glm-5.2"),
      system:
        "You are a helpful voice assistant that answers from a Cloudflare AI Search knowledge base. " +
        "For questions about the product, call the searchKnowledgeBase tool first and answer using the results. " +
        "Skip the tool for greetings and small talk. Keep replies short and conversational.",
      messages: [
        ...context.messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        { role: "user", content: transcript },
      ],
      tools: {
        searchKnowledgeBase: tool({
          description:
            "Search the knowledge base for information to answer the user's question.",
          inputSchema: z.object({
            query: z.string().describe("A focused search query"),
          }),
          execute: async ({ query }) => {
            // search() runs retrieval only and returns the matching chunks.
            const res = await this.env.AI_SEARCH.search({
              query,
              ai_search_options: { retrieval: { max_num_results: 5 } },
            });
            return res.chunks.map((chunk) => chunk.text).join("\n\n");
          },
        }),
      },
      // Let the model call the tool, then answer from the results.
      stopWhen: stepCountIs(4),
    });


    // Return the generated answer for the pipeline to speak.
    return result.text;
  }
}


export default {
  async fetch(request, env) {
    return (
      (await routeAgentRequest(request, env)) ??
      new Response("Not found", { status: 404 })
    );
  },
};
```

**src/server.ts**

```ts
import { Agent, routeAgentRequest } from "agents";
import {
  withVoice,
  WorkersAIFluxSTT,
  WorkersAITTS,
  type VoiceTurnContext,
} from "@cloudflare/voice";
import { generateText, tool, stepCountIs } from "ai";
import { createWorkersAI } from "workers-ai-provider";
import { z } from "zod";


const VoiceAgent = withVoice(Agent);


export class TalkToDocs extends VoiceAgent<Env> {
  // Workers AI powers speech-to-text and text-to-speech (no API keys needed).
  transcriber = new WorkersAIFluxSTT(this.env.AI);
  tts = new WorkersAITTS(this.env.AI);


  // Called each time the user finishes speaking. The agent's model generates
  // the reply, calling AI Search as a retrieval tool when it needs facts from
  // your knowledge base.
  async onTurn(transcript: string, context: VoiceTurnContext) {
    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = await generateText({
      // Use a Workers AI model that supports function calling.
      model: workersai("@cf/zai-org/glm-5.2"),
      system:
        "You are a helpful voice assistant that answers from a Cloudflare AI Search knowledge base. " +
        "For questions about the product, call the searchKnowledgeBase tool first and answer using the results. " +
        "Skip the tool for greetings and small talk. Keep replies short and conversational.",
      messages: [
        ...context.messages.map((message) => ({
          role: message.role as "user" | "assistant",
          content: message.content,
        })),
        { role: "user" as const, content: transcript },
      ],
      tools: {
        searchKnowledgeBase: tool({
          description:
            "Search the knowledge base for information to answer the user's question.",
          inputSchema: z.object({
            query: z.string().describe("A focused search query"),
          }),
          execute: async ({ query }) => {
            // search() runs retrieval only and returns the matching chunks.
            const res = await this.env.AI_SEARCH.search({
              query,
              ai_search_options: { retrieval: { max_num_results: 5 } },
            });
            return res.chunks.map((chunk) => chunk.text).join("\n\n");
          },
        }),
      },
      // Let the model call the tool, then answer from the results.
      stopWhen: stepCountIs(4),
    });


    // Return the generated answer for the pipeline to speak.
    return result.text;
  }
}


export default {
  async fetch(request: Request, env: Env) {
    return (
      (await routeAgentRequest(request, env)) ??
      new Response("Not found", { status: 404 })
    );
  },
} satisfies ExportedHandler<Env>;
```

Each chunk returned by `search()` includes its source item and a relevance score, so you can surface citations or log what the agent retrieved.

Note

Use a Workers AI model that supports function calling so the model can call the tool. This example returns the resolved answer text from `onTurn()`.

## 4\. Build the client

Replace `src/client.tsx` with a React component that uses the [useVoiceAgent](https://developers.cloudflare.com/agents/communication-channels/voice/) hook. The hook manages the microphone, the WebSocket connection to your agent, audio playback, and interrupt detection, so the component only needs to render controls. Set `agent` to your agent class name, `TalkToDocs`.

**src/client.tsx**

```tsx
import { useVoiceAgent } from "@cloudflare/voice/react";


function App() {
  // useVoiceAgent connects to your agent over WebSocket, captures the
  // microphone, plays the spoken response, and exposes the live call state.
  // `agent` matches your Durable Object class name.
  const {
    // Pipeline state: "idle" | "listening" | "thinking" | "speaking".
    status,
    // Finalized conversation turns (your speech and the agent's replies).
    transcript,
    // Live partial transcription of what you are currently saying.
    interimTranscript,
    // Whether the WebSocket connection to the agent is open.
    connected,
    startCall,
    endCall,
    toggleMute,
    isMuted,
  } = useVoiceAgent({ agent: "TalkToDocs" });


  const inCall = status !== "idle";


  return (
    <div>
      <h1>Talk to your knowledge base</h1>


      {/* Shows "thinking" while the agent searches the KB and generates a reply. */}
      <p>Status: {status}</p>


      {/* Toggle the call. Disabled until the agent connection is open. */}
      <button
        onClick={inCall ? endCall : startCall}
        disabled={!connected && !inCall}
      >
        {!connected ? "Connecting…" : inCall ? "End call" : "Start call"}
      </button>


      {/* Mute only applies once a call is active. */}
      {inCall && (
        <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
      )}


      {/* Lightweight loading state while the agent works on a reply. */}
      {status === "thinking" && <p>Thinking…</p>}


      {/* Live partial transcript, updated as you speak. */}
      {interimTranscript && (
        <p>
          <em>{interimTranscript}</em>
        </p>
      )}


      {/* Finalized turns from both you and the agent. */}
      {transcript.map((message, index) => (
        <p key={index}>
          <strong>{message.role}:</strong> {message.text}
        </p>
      ))}
    </div>
  );
}


export default App;
```

The hook handles the microphone and playback, so there is no push-to-talk button. The model detects when you finish speaking, runs `onTurn()`, and plays the spoken answer back automatically.

## 5\. Run it locally

Start a local development server:

 npm  yarn  pnpm

```
npm run dev
```

```
yarn run dev
```

```
pnpm run dev
```

Open the app in your browser, select **Start call** and allow microphone access, then ask a question that your content can answer. You will see your words transcribed in real time, and the agent speaks its answer from your knowledge base. The `status` value moves through `listening`, `thinking`, and `speaking` as it works.

## 6\. Deploy

Deploy your agent to make it available on the Internet:

 npm  yarn  pnpm

```
npx wrangler deploy
```

```
yarn wrangler deploy
```

```
pnpm wrangler deploy
```

## Talk to your knowledge base with multiple people

This tutorial builds a single-user voice agent. If you instead need several people in a live room talking to your knowledge base together, use [RealtimeKit](https://developers.cloudflare.com/realtime/realtimekit/) for the multi-party audio and video layer, and keep this voice agent as the component that answers from AI Search. RealtimeKit provides the meeting room and transcription, but it does not host the answer engine.

## Next steps

[ Voice agents API reference ](https://developers.cloudflare.com/agents/communication-channels/voice/) The @cloudflare/voice pipeline, providers, and onTurn contract.

[ Voice agent example ](https://developers.cloudflare.com/agents/examples/voice-agent/) A full walkthrough of the voice agent and its browser client.

[ Search Workers binding ](https://developers.cloudflare.com/ai-search/api/search/workers-binding/) Full reference for chatCompletions() and search() from a Worker.

[ Bring your own generation model ](https://developers.cloudflare.com/ai-search/how-to/bring-your-own-generation-model/) Use a third-party model for generation while AI Search handles retrieval.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/talk-to-your-knowledge-base/#page","headline":"Talk to your knowledge base · Cloudflare AI Search docs","description":"Build a voice agent that lets users speak to an AI Search knowledge base and hear spoken answers, using the Cloudflare Agents voice pipeline.","url":"https://developers.cloudflare.com/ai-search/how-to/talk-to-your-knowledge-base/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-07-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/how-to/talk-to-your-knowledge-base/","name":"Talk to your knowledge base"}}]}
```
