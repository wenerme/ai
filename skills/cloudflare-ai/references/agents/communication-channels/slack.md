---
description: Connect agents to Slack workspaces so they can respond to direct messages, mentions, and threaded conversations.
title: Slack
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Slack

Last updated Jun 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/communication-channels/slack/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Slack is a communication channel for agents that need to participate in team conversations. A Slack-connected agent can receive events from Slack, route each message to the right agent instance, and respond back to direct messages or channel mentions.

Use Slack when you want an agent to:

* Respond to direct messages from Slack users.
* Reply when mentioned in public channels.
* Maintain context inside Slack threads.
* Serve multiple Slack workspaces from one deployment.

## How it works

Slack sends events to your Worker through the [Slack Events API ↗](https://api.slack.com/apis/events-api). Your Worker verifies each request, identifies the installed workspace, and routes the event to an agent instance.

Common Slack events include:

| Event        | Use case                   |
| ------------ | -------------------------- |
| message.im   | Direct messages to the bot |
| app\_mention | Mentions in channels       |

For multi-workspace Slack apps, store each workspace installation separately and route events by team or enterprise ID. Each workspace can map to an isolated agent instance with its own Durable Object-backed state.

## Build a Slack agent

For a complete walkthrough, including Slack app setup, OAuth, event subscriptions, and deployment, use the Slack agent example.

### [Slack agent](https://developers.cloudflare.com/agents/examples/slack-agent/)

Build and deploy an AI-powered Slack bot on Cloudflare Workers using the Agents SDK.

## Related resources

### [Slack Events API](https://api.slack.com/apis/events-api)

Receive events when users message, mention, or interact with a Slack app.

### [Slack app authentication](https://api.slack.com/authentication)

Configure OAuth, bot tokens, signing secrets, and request verification for Slack apps.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/communication-channels/slack/#page","headline":"Slack · Cloudflare Agents docs","description":"Connect agents to Slack workspaces so they can respond to direct messages, mentions, and threaded conversations.","url":"https://developers.cloudflare.com/agents/communication-channels/slack/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
