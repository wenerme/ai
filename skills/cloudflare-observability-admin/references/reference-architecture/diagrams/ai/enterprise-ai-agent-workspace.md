---
title: Enterprise AI agent workspace
description: Reference architecture for building governed, stateful enterprise AI agent workspaces on Cloudflare.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Enterprise AI agent workspace

## Introduction

An enterprise AI agent workspace gives employees a persistent environment for completing work with AI. It pairs that workspace with a curated library of organizational context and skills, so people do their best work using an organization's own knowledge and proven playbooks. Each workspace holds its own conversation state, files, enterprise tools, and isolated execution.

Employees use a workspace to produce documents, presentations, spreadsheets, research, workflows, source code, and apps. These outputs outlive the conversation. An employee can review, share, export, or keep improving them with AI.

The architecture uses [Cloudflare Workers](https://developers.cloudflare.com/workers/) and the [Agents SDK](https://developers.cloudflare.com/agents/) for orchestration, [Durable Objects](https://developers.cloudflare.com/durable-objects/) for state, [AI Gateway](https://developers.cloudflare.com/ai-gateway/) for model governance, and [MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) for enterprise tools. [Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/), [Sandbox SDK](https://developers.cloudflare.com/sandbox/) containers, and [Browser Run](https://developers.cloudflare.com/browser-run/) handle work that needs more than model inference.

Unlike an [enterprise vibe coding platform](https://developers.cloudflare.com/reference-architecture/diagrams/ai/enterprise-ai-vibe-coding-platform/), the result is not always a deployed application. Source code and apps are two output types among documents, data, analysis, and repeatable workflows.

## Core architecture

![Enterprise AI agent workspace architecture showing multiple ways to invoke work, verified access, a stateful agent workspace built on Workers, Durable Objects, Dynamic Workers, and Sandbox containers, curated organizational knowledge, secure access to AI model providers through AI Gateway and to internal and SaaS MCP servers through MCP server portals, and durable outputs.](https://developers.cloudflare.com/_astro/top-level.uTywJ-Pf_2aC8Ny.svg)
1. **Invoke work:** An employee starts or resumes work from the web application, enterprise chat, or email. Webhooks and schedules can also start work without an open browser session. [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/) authenticates browser sessions, and each asynchronous channel validates its signature, token, or sender before a request is accepted.
2. **Reach the agent workspace:** Workers route the request to the workspace agent. The agent restores conversation history, tasks, files, permissions, and queued events from durable state, draws on curated organization knowledge, then runs bounded code in Dynamic Workers or a Sandbox container when a task needs more than model inference.
3. **Use governed models and tools:** The agent calls approved models through AI Gateway and approved enterprise tools through an MCP server portal. Both layers keep provider routing, credentials, policy, and logging outside the workspace.
4. **Save an output:** The workspace saves the result as a durable work product that the employee can review, continue with AI, share, or export.

The web application is the primary surface, but it is not the agent runtime. Every channel sends events to the same stateful workspace, so an employee can start work in chat, review it in the web application, and continue later against one agent history.

## State and isolation model

![Workspace isolation and state model showing a stateless Worker routing to one per-user Durable Object and per-workspace Durable Objects, each coordinating Dynamic Workers, a Sandbox container, and durable file and output storage.](https://developers.cloudflare.com/_astro/worker-do.DlvZndlT_qNVqs.svg)

Workers stay stateless. They serve the interface and route each request to the right Durable Object using the identity and workspace in the request.

Each workspace maps to one Durable Object running the Agents SDK. This object is the durable authority for the workspace. It owns the conversation, tasks, schedules, consent decisions, and event queue, and it coordinates model calls, tools, files, and execution. Work continues after the browser disconnects or a Worker isolate restarts, and workspaces scale independently instead of sharing one agent process.

A separate per-user Durable Object stores profile settings, the workspace registry, integrations, and grants. One user owns many independently stateful workspaces.

The workspace coordinates resources but does not store everything. The workspace picks an execution environment per task: Dynamic Workers for bounded [Code Mode](https://developers.cloudflare.com/agents/model-context-protocol/), Sandbox SDK containers for a full shell and build environment, and Browser Run for isolated browser sessions. Large files and reusable outputs live in a versioned file service, and sharing grants are kept separate from the output bytes so access can be granted or revoked without moving the file. Sandbox backups and shared organizational context use [R2](https://developers.cloudflare.com/r2/). Usage and lifecycle events use [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) or an external system.

| Scope                          | Cloudflare primitive          | Responsibility                                                  | Lifetime                   |
| ------------------------------ | ----------------------------- | --------------------------------------------------------------- | -------------------------- |
| Application                    | Workers                       | UI, APIs, authentication, routing, and channel ingress          | Stateless request handling |
| User                           | Durable Object                | Profile, workspace registry, integrations, grants, and activity | Durable                    |
| Workspace                      | Agents SDK and Durable Object | Agent state, event queue, and turn orchestration                | Durable                    |
| Code Mode execution            | Dynamic Worker                | Bounded code and tool composition                               | Ephemeral                  |
| Active development environment | Sandbox SDK container         | Shell, builds, previews, and coding sessions                    | Created on demand          |
| Browser session                | Browser Run                   | Web navigation, interaction, screenshots, and PDF rendering     | Session scoped             |
| User files                     | Versioned file service        | Files, saved outputs, and revisions                             | Durable                    |
| Skills and context library     | Read-only object store (R2)   | Curated skills, reference context, and commands                 | Published centrally        |
| Backup                         | R2                            | Sandbox backups                                                 | Durable                    |

## Governed access to models and tools

All model requests go through [AI Gateway](https://developers.cloudflare.com/ai-gateway/). The agent uses models from different providers without moving provider-specific logic into each workspace. AI Gateway applies routing, tracks usage and cost, and stores request logs.

Enterprise tools connect through an [MCP server portal](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/). The portal exposes one endpoint, applies Access policies, curates the available tools, routes per-user credentials, and logs tool activity. Administrators build portals per team so an agent receives the tools for its work instead of every tool in the organization.

## Skills and organizational context

A workspace draws on a curated, read-only library that is published centrally and shared across every workspace. The library holds skills, which are reusable task playbooks the agent loads on demand, and context, which is the reference material an organization wants agents to use.

Skills layer by source, from platform-provided to organization-shared to workspace-local, so a team can extend or override the defaults. The agent lists skills, loads one when a task matches, and unloads it afterward. This keeps guidance out of the model context until it is needed.

Publish the library through a versioned, read-only store so changes to skills and context stay auditable and reviewable. The library is read-only to the agent and governed centrally.

## Security model

Treat model output, tool output, and generated code as untrusted. Apply controls at the platform boundary, not in generated code.

* **Identity:** Use Access for browser sessions and MCP portal connections. Verify asynchronous channels before routing their events to a workspace.
* **Authorization:** Check user ownership before resolving a workspace, opening a terminal, reading an output, or serving a preview.
* **Tool access:** Use MCP server portal policies, tool allowlists, OAuth, grants, and consent for sensitive operations.
* **Code isolation:** Run bounded code in Dynamic Workers and full development workloads in Sandbox SDK containers.
* **Credential isolation:** Keep model and tool credentials in platform services. Never expose them to generated code or model context.
* **Curated inputs:** Publish skills and context to a read-only, versioned store. A workspace cannot mutate the shared library.
* **Auditability:** Record model usage, tool calls, consent decisions, output sharing, and execution lifecycle events.

## Related resources

* [Agents SDK](https://developers.cloudflare.com/agents/)
* [AI Gateway](https://developers.cloudflare.com/ai-gateway/)
* [MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/)
* [Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/)
* [Sandbox SDK](https://developers.cloudflare.com/sandbox/)
* [Browser Run](https://developers.cloudflare.com/browser-run/)
* [AI Vibe Coding Platform](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-vibe-coding-platform/)
* [Enterprise AI Vibe Coding Platform](https://developers.cloudflare.com/reference-architecture/diagrams/ai/enterprise-ai-vibe-coding-platform/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/enterprise-ai-agent-workspace/#page","headline":"Enterprise AI agent workspace · Cloudflare Reference Architecture docs","description":"Reference architecture for building governed, stateful enterprise AI agent workspaces on Cloudflare.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/enterprise-ai-agent-workspace/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-14","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/ai/","name":"Artificial Intelligence (AI)"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/ai/enterprise-ai-agent-workspace/","name":"Enterprise AI agent workspace"}}]}
```
