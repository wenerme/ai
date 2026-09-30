---
description: Run coding agents such as Claude Code, Devin, and Cursor on a repository in a Linux sandbox that belongs to one task.
title: Run coding agents in a sandbox
image: https://developers.cloudflare.com/sandbox/coding-agents/og.png?v=5789bc681f595744
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run coding agents in a sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/coding-agents/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Coding agents such as Claude Code, Codex, and OpenCode can run a task on their own: they read a repository, edit files, and run commands until the task is done. Run the agent in a Linux sandbox so its commands stay inside a [Container](https://developers.cloudflare.com/containers/) that belongs to one task.

## The agent runs in your sandbox

Your Worker starts the sandbox, holds the credentials, and decides which hostnames the sandbox can reach. The agent calls its model over HTTP, for example through [AI Gateway](https://developers.cloudflare.com/ai-gateway/). Your Worker adds the API token to each request, so the sandbox never receives it.

Each guide in this section changes only the agent-specific parts of one runner. Build the runner first:

### [Build a coding agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/)

Build a Worker that runs Claude Code on a GitHub repository in a sandbox and returns its changes as a diff.

Then switch the runner to another agent:

### [Claude Code](https://developers.cloudflare.com/sandbox/coding-agents/claude-code/)

Edit a GitHub repository with Claude Code, which calls Anthropic models through AI Gateway.

### [Codex](https://developers.cloudflare.com/sandbox/coding-agents/codex/)

Edit a GitHub repository with the Codex CLI, which calls OpenAI models through AI Gateway.

### [OpenCode](https://developers.cloudflare.com/sandbox/coding-agents/opencode/)

Edit a GitHub repository with OpenCode, which calls models through AI Gateway.

### [Pi](https://developers.cloudflare.com/sandbox/coding-agents/pi/)

Edit a GitHub repository with Pi, which calls models through its built-in AI Gateway provider.

## The vendor runs the agent loop

Devin, Cursor, Claude Managed Agents, and the OpenAI Agents API run their agent loop in their own service. The loop sends commands and file edits to sandboxes in your Cloudflare account. Each vendor template gives every session its own sandbox. In the Devin, Cursor, and OpenAI Agents API templates, the vendor worker process runs inside the sandbox, so the sandbox also holds a vendor credential.

### [Devin](https://developers.cloudflare.com/sandbox/coding-agents/devin/)

Deploy a Devin Outpost that runs each Devin session in its own sandbox on Containers.

### [Cursor Cloud Agents](https://developers.cloudflare.com/sandbox/coding-agents/cursor/)

Deploy self-hosted machines that run each Cursor session in its own sandbox on Containers.

### [Claude Managed Agents](https://developers.cloudflare.com/sandbox/coding-agents/claude-managed-agents/)

Run Claude Managed Agents sessions in sandboxes on Containers and Dynamic Workers.

### [OpenAI Agents API](https://developers.cloudflare.com/sandbox/coding-agents/openai-agents-api/)

Deploy a self-hosted environment that runs each Codex session in its own sandbox on Containers.

## Build your own agent

To give an agent that runs in a Durable Object a container to run commands in, refer to [Sandbox](https://developers.cloudflare.com/agents/tools/sandbox/) in the Agents SDK documentation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/coding-agents/#page","headline":"Run coding agents in a sandbox","description":"Run coding agents such as Claude Code, Devin, and Cursor on a repository in a Linux sandbox that belongs to one task.","url":"https://developers.cloudflare.com/sandbox/coding-agents/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/coding-agents/og.png?v=5789bc681f595744","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
