---
description: Definitions of key terms used in the Cloudflare Workflows documentation.
title: Glossary
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt
> Use this file to discover all available pages before exploring further.

# Glossary

Last updated Apr 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workflows/reference/glossary/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Review the definitions for terms used across Cloudflare's Workflows documentation.

| Term              | Definition                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Durable Execution | "Durable Execution" is a programming model that allows applications to execute reliably, automatically persist state, retry, and be resistant to errors caused by API, network or even machine/infrastructure failures. Cloudflare Workflows provide a way to build and deploy applications that align with this model.                                                  |
| Event             | The event that triggered the Workflow instance. A WorkflowEvent may contain optional parameters (data) that a Workflow can operate on.                                                                                                                                                                                                                                   |
| instance          | A specific instance (running, paused, errored) of a Workflow. A Workflow can have a potentially infinite number of instances.                                                                                                                                                                                                                                            |
| step              | A step is self-contained, individually retryable component of a Workflow. Steps may emit (optional) state that allows a Workflow to persist and continue from that step, even if a Workflow fails due to a network or infrastructure issue. A Workflow can have one or more steps up to the [step limit](https://developers.cloudflare.com/workflows/reference/limits/). |
| Workflow          | The named Workflow definition, associated with a single Workers script.                                                                                                                                                                                                                                                                                                  |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/reference/glossary/#page","headline":"Glossary · Cloudflare Workflows docs","description":"Definitions of key terms used in the Cloudflare Workflows documentation.","url":"https://developers.cloudflare.com/workflows/reference/glossary/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
