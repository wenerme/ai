---
title: Dynamic Workers
description: Spin up isolated Workers on demand to execute code.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dynamic-workers/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Dynamic Workers

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dynamic-workers/","name":"Dynamic Workers"}}]}
```
