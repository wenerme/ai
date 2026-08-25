---
description: Spin up isolated Workers on demand to execute code.
title: Dynamic Workers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Dynamic Workers

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dynamic-workers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Spin up Workers at runtime to execute code on-demand in a secure, sandboxed environment.

Dynamic Workers let you spin up an unlimited number of Workers to execute arbitrary code specified at runtime. Dynamic Workers can be used as a lightweight alternative to containers for securely sandboxing code you don't trust.

Dynamic Workers are the lowest-level primitive for spinning up a Worker, giving you full control over defining how the Worker is composed, which bindings it receives, whether it can reach the network, and more.

### Get started

Deploy the [Dynamic Workers Playground ↗](https://github.com/cloudflare/agents/tree/main/examples/dynamic-workers-playground) to create and run Workers dynamically from code you write or import from GitHub, with real-time logs and observability.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dinasaur404/dynamic-workers-playground)

## Use Dynamic Workers for

Use this pattern when code needs to run quickly in a secure, isolated environment.

* **AI Agent "Code Mode"**: LLMs are trained to write code. Instead of supplying an agent with tool calls to perform tasks, give it an API and let it write and execute code. Save up to 80% in inference tokens and cost by allowing the agent to programmatically process data instead of sending it all through the LLM.
* **AI-generated applications / "Vibe Code"**: Run generated code for prototypes, projects, and automations in a secure, isolated sandboxed environment.
* **Fast development and previews**: Load prototypes, previews, and playgrounds in milliseconds.
* **Custom automations**: Create custom tools on the fly that execute a task, call an integration, or automate a workflow.
* **Platforms**: Run applications uploaded by your users.

## Features

Because you compose the Worker that runs the code at runtime, you control how that Worker is configured and what it can access.

* **[Bindings](https://developers.cloudflare.com/dynamic-workers/usage/bindings/)**: Decide which bindings and structured data the dynamic Worker receives.
* **[Observability](https://developers.cloudflare.com/dynamic-workers/usage/observability/)**: Attach Tail Workers and capture logs for each run.
* **[Network access](https://developers.cloudflare.com/dynamic-workers/usage/egress-control/)**: Intercept or block Internet access for outbound requests.
* **[Limits](https://developers.cloudflare.com/dynamic-workers/usage/limits/)**: Enforce custom limits on the dynamic Worker's resource usage.
* **[Durable Object Facets](https://developers.cloudflare.com/dynamic-workers/usage/durable-object-facets/)**: Run dynamically-loaded code as a Durable Object with its own isolated SQLite storage.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/dynamic-workers/#page","headline":"Dynamic Workers · Cloudflare Dynamic Workers docs","description":"Spin up isolated Workers on demand to execute code.","url":"https://developers.cloudflare.com/dynamic-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
