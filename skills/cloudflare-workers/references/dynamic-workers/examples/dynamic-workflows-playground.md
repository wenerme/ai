---
description: Write workflow logic in JavaScript and watch every step execute with live console.log streaming.
title: Dynamic Workflows Playground
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Dynamic Workflows Playground

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dynamic-workers/examples/dynamic-workflows-playground/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Try the [dynamic workflows playground ↗](https://github.com/cloudflare/dynamic-workflows/tree/main/examples/basic), write workflow logic in JavaScript, execute it from a Dynamic Worker, and log every step in real time.

This example shows you how to run [Cloudflare Workflows](https://developers.cloudflare.com/workflows/) from a [Dynamic Worker](https://developers.cloudflare.com/dynamic-workers/) to get full durable execution, including step retries, sleep, hibernation, and `waitForEvent`, for any workflow you need to run on demand.

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/dynamic-workflows/tree/main/examples/basic)

## How it works

There are two parts:

* **Worker Loader** — The Worker that runs your platform logic. It receives a request, loads the user's workflow code as a Dynamic Worker, and gives it a Workflow binding so it can create and run workflows.
* **Dynamic Worker** — This is where the workflow is defined. You write the workflow logic here, including which steps need to run, how long it sleeps, and what events it waits for.

The [@cloudflare/dynamic-workflows ↗](https://www.npmjs.com/package/@cloudflare/dynamic-workflows) library connects the two. When the Dynamic Worker creates a workflow, the library tags it with information about which Dynamic Worker created it. That tag is persisted by the Workflows engine, so when a workflow needs to resume after a sleep, a failure, or a server restart, the engine knows which Dynamic Worker to reload to continue execution.

For a full walkthrough of the library and how to set it up, refer to the [Dynamic Workflows guide](https://developers.cloudflare.com/dynamic-workers/usage/dynamic-workflows/).

## What this playground includes

* **Worker Loader and Dynamic Worker setup** — A full working example of a Worker Loader that loads workflow code at runtime and a Dynamic Worker that runs it with durable execution, using [@cloudflare/dynamic-workflows ↗](https://www.npmjs.com/package/@cloudflare/dynamic-workflows).
* **Live log streaming** — Every `console.log()` and `console.warn()` from the Dynamic Worker is captured and streamed to the browser in real time, so you can see what is happening inside each step as it runs.
* **Source persistence** — The workflow code is saved so that if the workflow pauses (for example, during a `step.sleep()`) and the server recycles the process, it can reload the same code and resume where it left off.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/examples/dynamic-workflows-playground/#page","headline":"Dynamic Workflows Playground · Cloudflare Dynamic Workers docs","description":"Write workflow logic in JavaScript and watch every step execute with live console.log streaming.","url":"https://developers.cloudflare.com/dynamic-workers/examples/dynamic-workflows-playground/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript"]}
```
