---
description: Add a server-side agent to a RealtimeKit meeting and stream transcripts, participant presence, and broadcasts to a Worker or Durable Object.
title: Agent Participant
image: https://developers.cloudflare.com/realtime/realtimekit/agents/og.png?v=c6625ab8f4d89f64
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent Participant

Last updated Oct 19, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/agents/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Agent Participant adds a server-side agent to a RealtimeKit meeting. Any backend that can open a WebSocket — a Cloudflare Worker, a Durable Object, or your own server — can connect to it. No client SDK or browser is required.

Today an agent receives live meeting activity, such as transcripts, participant presence, and broadcasts. More capabilities are planned, including sending messages and working with meeting media.

## What an agent can do

**Participants**Browsers and apps using RealtimeKit SDKs

Audio, video, chats, polls, broadcasts

RealtimeKit meeting

**Agent participant**Configured by preset

Listen: transcripts, presence, broadcasts

Send: chat, broadcasts, stream audio (future-scope)

My code**Durable Object**WebSocket ↔ JSON

Participants↔RealtimeKit meeting

Agent participantJoins the meetingRealtimeKit meeting

Agent ParticipantListen →Worker or Durable Object

Worker or Durable ObjectSend (planned) →Agent Participant

The agent is a meeting participant. Its [preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/) decides how it joins the meeting, and its subscriptions decide which events it receives.

To create a preset and choose subscriptions, refer to [Build an agent](https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/). To compare what an agent and a human participant can do, refer to the [Capability matrix](https://developers.cloudflare.com/realtime/realtimekit/agents/capabilities/).

## How it works

**My Worker**

**My Durable Object**

**Agent Participant**

**RealtimeKit Meeting**

Add participant with the agent preset

start(token)

Upgrade with token + subscriptions

Join as visible or hidden participant

session.started

Transcripts, joins, broadcasts

Subscribed events as JSON

1. Create a participant using [create-participant-api](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant/) for the agent, using your configured preset.
2. Durable Object opens the WebSocket with that agent's participant token.
3. The agent joins the meeting and forwards the events you subscribed to.
4. When the session ends, the server sends `session.ended` and closes the WebSocket.

[Build an agent with Durable Objects](https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/)

## Choose your agent

Decide whether people in the meeting should see the agent. The agent receives the same events either way.

| Your agent | Example | Others see it |
| --- | --- | --- |
| [Hidden agent](https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/#hidden-agent) | Compliance monitor, quality review, live meeting analytics | No |
| [Visible agent](https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/#visible-agent) | Note-taker that appears in the participant list | Yes |

Agents that speak or send chat messages are not supported yet. Refer to the [Capability matrix](https://developers.cloudflare.com/realtime/realtimekit/agents/capabilities/).

## Billing

The agent is billed as a participant for as long as it is connected. A connected agent keeps the session active even after everyone else leaves, so your backend must remove it. Refer to [Billing and ending the session](https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/#billing-and-ending-the-session).

## Reference

- [Build an agent](https://developers.cloudflare.com/realtime/realtimekit/agents/get-started/): create a preset, run the agent in a Durable Object, and connect to the WebSocket
- [Events](https://developers.cloudflare.com/realtime/realtimekit/agents/events/): event types, payloads, and delivery rules
- [Capability matrix](https://developers.cloudflare.com/realtime/realtimekit/agents/capabilities/): what an agent can do compared to a human participant

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/agents/#page","headline":"Agent Participant","description":"Add a server-side agent to a RealtimeKit meeting and stream transcripts, participant presence, and broadcasts to a Worker or Durable Object.","url":"https://developers.cloudflare.com/realtime/realtimekit/agents/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/agents/og.png?v=c6625ab8f4d89f64","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
