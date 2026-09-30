---
description: Run Claude Managed Agents with sandboxes on Containers and Dynamic Workers in your Cloudflare account.
title: Run Claude Managed Agents in a sandbox
image: https://developers.cloudflare.com/sandbox/coding-agents/claude-managed-agents/og.png?v=1aa96be3a3075149
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run Claude Managed Agents in a sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/coding-agents/claude-managed-agents/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Claude Managed Agents ↗︎](https://platform.claude.com/docs/en/managed-agents/overview) runs its agent loop on the Anthropic platform. A self-managed environment runs the actions of the agent in your Cloudflare account instead. Cloudflare publishes an open-source template for that environment. Fork it, deploy it to your account, and change it as you need.

[Get the template](https://github.com/cloudflare/claude-managed-agents)

Caution

The template is alpha software. It is not yet stable and may contain bugs.

## How it works

When an agent session starts or ends, Anthropic sends a webhook to a Worker that the template deploys in your account. The Worker gives each session its own sandbox, applies an egress policy to its outbound traffic, saves the sandbox state while the session sleeps, and shuts the sandbox down when the session ends.

Each agent runs in one of two sandbox types:

- A Linux sandbox on [Containers](https://developers.cloudflare.com/containers/) gives the agent a shell and any process it needs to run. The template builds these sandboxes with [Sandbox SDK 0.x](https://developers.cloudflare.com/sandbox/sdk/).
- A [Dynamic Worker](https://developers.cloudflare.com/dynamic-workers/) starts in milliseconds and costs less than a container session, but runs code in the Workers runtime without a Linux shell or processes.

For more information about the trade-offs, refer to [Choose a sandbox environment](https://developers.cloudflare.com/sandbox/concepts/).

## What the template adds

The template also gives agents access to other Cloudflare products:

- Agents reach private services over [Workers VPC](https://developers.cloudflare.com/workers-vpc/) and [Cloudflare Mesh](https://developers.cloudflare.com/mesh/) without exposing those services to the Internet.
- Outbound traffic passes through proxies that you configure. A proxy can add credentials to requests without the agent seeing them, restrict the domains an agent can reach, or run your own code on each request.
- Each session can have its own email address for sending and receiving messages with [Email Service](https://developers.cloudflare.com/email-service/).
- Agents can use headless browsers from [Browser Run](https://developers.cloudflare.com/browser-run/) to fetch pages, take screenshots, and control a browser over the Chrome DevTools Protocol.
- Agents can generate images with [Workers AI](https://developers.cloudflare.com/workers-ai/).
- You add a tool by adding a function to one file. Tools run in the Worker with access to all of its bindings.
- A dashboard lists agents and sessions, shows logs, and opens a shell in a running Linux sandbox.

## When to use it

Use a self-managed Cloudflare environment when you need:

- Control over the sandbox infrastructure your agents run in
- Secure connections to private internal services
- Custom egress policies for credential injection and domain restrictions
- Custom tools that use Cloudflare bindings, such as R2, D1, KV, and Vectorize
- A choice between Linux sandboxes and Dynamic Workers for each agent

## Deploy the template

Follow the [onboarding guide ↗︎](https://github.com/cloudflare/claude-managed-agents#onboarding-guide) in the repository. It covers the Anthropic environment and webhook, secrets, D1 migrations, R2 credentials for snapshots, and dashboard security. Deploy with the **Deploy to Cloudflare** button, which builds the template in Workers Builds, or run `npm run deploy` from your terminal.

Note

You need a Workers Paid plan or an Enterprise account. The template runs Linux sandboxes on [Containers](https://developers.cloudflare.com/containers/), and runs Dynamic Workers and egress proxies through Worker Loader bindings.

## Template documentation

The repository documents each capability:

| Topic | What it covers |
| --- | --- |
| [Connecting to private services ↗︎](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/connecting-to-private-services.md) | Reach services in other clouds, on-premises, or on your laptop with Workers VPC bindings |
| [Applying egress policies ↗︎](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/applying-egress-policies.md) | Allow and deny lists, header injection, custom Worker proxies, and VPC routing |
| [Choosing a sandbox type ↗︎](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/isolate-vs-vm-sandboxes.md) | When to run an agent in a Dynamic Worker or a Linux sandbox |
| [Agent email ↗︎](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/agent-email.md) | Email addresses and sending for agents |
| [Browser tools ↗︎](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/browser-rendering-tools.md) | Browser Run tools for agents |
| [Adding custom tools ↗︎](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/adding-custom-tools.md) | Declaring new tools in [`src/tools/custom-tools.ts` ↗︎](https://github.com/cloudflare/claude-managed-agents/blob/main/src/tools/custom-tools.ts) |
| [Customizing sandboxes ↗︎](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/customizing-sandboxes.md) | The `Dockerfile` and `instance_type` of Linux sandboxes |
| [Snapshots and state persistence ↗︎](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/snapshots-and-state-persistence.md) | How both sandbox types keep their state while a session sleeps |
| [Architecture ↗︎](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/architecture.md) | The request path from webhook to sandbox, and every binding the Worker uses |
| [Securing access ↗︎](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/securing-access.md) | Securing the dashboard and API |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/coding-agents/claude-managed-agents/#page","headline":"Run Claude Managed Agents in a sandbox","description":"Run Claude Managed Agents with sandboxes on Containers and Dynamic Workers in your Cloudflare account.","url":"https://developers.cloudflare.com/sandbox/coding-agents/claude-managed-agents/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/coding-agents/claude-managed-agents/og.png?v=1aa96be3a3075149","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
