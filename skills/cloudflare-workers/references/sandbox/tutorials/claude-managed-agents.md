---
description: Run Claude Managed Agents on self-managed Cloudflare environments.
title: Set up Claude Managed Agents
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

#  Set up Claude Managed Agents

Last updated May 19, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/sandbox/tutorials/claude-managed-agents/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare provides a self-managed environment for [Claude Managed Agents ↗](https://platform.claude.com/docs/en/managed-agents/overview). The agent loop runs on the Anthropic platform, while Cloudflare provides the runtime — sandboxes, egress control, browser access, email, and custom tools — that the agent's actions execute in.

This integration ships as an open-source deployment template. Fork the repo, deploy it to your Cloudflare account, and customize it as needed.

[ Get Started ](https://github.com/cloudflare/claude-managed-agents)

## What you get

Deploy a Workers-based control plane that gives you:

* **Two sandbox backends** — Each agent can run on a full MicroVM ([Containers](https://developers.cloudflare.com/containers/)) or a lightweight isolate ([Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/)). MicroVMs give the agent a full Linux environment with bash and arbitrary processes. Isolates cold-start in milliseconds and costs a fraction of a container session.
* **Private service connectivity** — Connect agents to private internal services over [Workers VPC](https://developers.cloudflare.com/workers-vpc/) and [Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) without exposing them to the public internet.
* **Egress control** — Run all agent traffic through customizable proxies. Inject credentials into outbound requests without the agent ever seeing them, restrict access to specific domains, or write arbitrary proxy middleware.
* **Agent Email** — Give each agent session its own email address for sending and receiving messages with [Cloudflare Email Service](https://developers.cloudflare.com/email-service).
* **Browser Run tools** — Give agents headless browsers powered by [Browser Run](https://developers.cloudflare.com/browser-run/) for web fetches, screenshots, and CDP control. Session recordings provide an audit trail of every browser action.
* **Image generation** — Generate images with [Workers AI](https://developers.cloudflare.com/workers-ai/).
* **Custom tools** — Extend agents with your own tools by adding a function definition to a single file. Tools run in the Workers runtime with access to all your bindings. No additional infrastructure required.
* **Dashboard** — A built-in UI for managing agents, viewing sessions, inspecting logs, and SSH-ing into running MicroVM sandboxes.

## How it works

When a Claude agent starts a session, Anthropic sends a webhook to the Workers-based control plane running in your Cloudflare account. The control plane gives each session its own sandbox, routes outbound traffic through a per-session egress policy, and persists state across session sleeps.

Anthropic describes this as decoupling the brain from the hands — the agent loop runs on Anthropic (the brain), but the infrastructure for running and executing code (the hands) runs on Cloudflare.

## When to use this

Use a self-managed Cloudflare environment when you need:

* Control over the sandbox infrastructure your agents run in
* Secure connections to private internal services
* Custom egress policies for credential injection and domain restrictions
* Custom tools that use Cloudflare bindings (R2, D1, KV, Vectorize, and others)
* The ability to choose between MicroVM and isolate backends per agent

## Get started

Follow the [onboarding guide ↗](https://github.com/cloudflare/claude-managed-agents#onboarding-guide) in the repository to deploy the control plane to your account. The guide walks through creating an Anthropic environment, setting secrets, provisioning storage, deploying the Worker, and configuring webhooks.

Note

You need a Workers Paid plan or Enterprise account. [Containers](https://developers.cloudflare.com/containers/) (used by MicroVM sandboxes) and Worker Loader bindings (used by isolate code execution and egress proxies) require the paid plan.

## Key documentation

The repository includes detailed documentation on each capability:

| Topic                                                                                                                                      | What it covers                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Connecting to private services ↗](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/connecting-to-private-services.md)   | Reach services in other clouds, on-prem, or on your laptop with Workers VPC bindings                                                                             |
| [Applying egress policies ↗](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/applying-egress-policies.md)               | Inject credentials and lock down agent sessions. Set up allow/deny lists, header injection, custom Worker proxies, and VPC routing                               |
| [Isolate vs VM-based sandboxes ↗](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/isolate-vs-vm-sandboxes.md)           | Pick the best agent execution environment                                                                                                                        |
| [Agent email ↗](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/agent-email.md)                                         | Give agents their own email addresses and sending abilities                                                                                                      |
| [Browser rendering tools ↗](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/browser-rendering-tools.md)                 | Observable agent browser interactions with Browser Run                                                                                                           |
| [Adding custom tools ↗](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/adding-custom-tools.md)                         | New tools are declared in a single file — [src/tools/custom-tools.ts ↗](https://github.com/cloudflare/claude-managed-agents/blob/main/src/tools/custom-tools.ts) |
| [Customizing sandboxes ↗](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/customizing-sandboxes.md)                     | Change Dockerfile and instance\_type knobs for the MicroVM backend                                                                                               |
| [Snapshots and state persistence ↗](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/snapshots-and-state-persistence.md) | State persistence across both sandbox types                                                                                                                      |
| [Architecture ↗](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/architecture.md)                                       | Request lifecycle from webhook ingress through dispatch to either sandbox backend, and every Worker binding the control plane uses                               |
| [Securing access ↗](https://github.com/cloudflare/claude-managed-agents/blob/main/docs/securing-access.md)                                 | Secure access to the CMA control plane                                                                                                                           |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/tutorials/claude-managed-agents/#page","headline":"Set up Claude Managed Agents · Cloudflare Sandbox SDK docs","description":"Run Claude Managed Agents on self-managed Cloudflare environments.","url":"https://developers.cloudflare.com/sandbox/tutorials/claude-managed-agents/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
