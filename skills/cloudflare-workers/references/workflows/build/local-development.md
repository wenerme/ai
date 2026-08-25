---
description: Develop and test Cloudflare Workflows locally using Wrangler's emulated runtime.
title: Local Development
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt
> Use this file to discover all available pages before exploring further.

# Local Development

Last updated Jun 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workflows/build/local-development/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Workflows support local development using [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the command-line interface for Workers. Wrangler runs an emulated version of Workflows compared to the one that Cloudflare runs globally.

## Prerequisites

To develop locally with Workflows, you will need:

* [Wrangler v3.89.0 ↗](https://blog.cloudflare.com/wrangler3/) or later.
* Node.js version of `18.0.0` or later. Consider using a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node versions.
* If you are new to Workflows and/or Cloudflare Workers, refer to the [Workflows Guide](https://developers.cloudflare.com/workflows/get-started/guide/) to install `wrangler` and deploy their first Workflows.

## Start a local development session

Open your terminal and run the following commands to start a local development session:

```sh
# Confirm we are using wrangler v3.89.0+
npx wrangler --version
```

```sh
⛅️ wrangler 3.89.0
```

Start a local dev session

```sh
# Start a local dev session:
npx wrangler dev
```

```sh
------------------
Your worker has access to the following bindings:
- Workflows:
  - MY_WORKFLOW: MyWorkflow
⎔ Starting local server...
[wrangler:inf] Ready on http://127.0.0.1:8787/
```

Local development sessions create a standalone, local-only environment that mirrors the production environment Workflows runs in so you can test your Workflows _before_ you deploy to production.

Refer to the [wrangler dev documentation](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) to learn more about how to configure a local development session.

## Manage Workflows locally

Note

The `--local` flag for `wrangler workflows` commands requires Wrangler version `4.79.0` or greater. Use `npx wrangler@latest` to always use the latest version.

While a `wrangler dev` session is running, you can use all [wrangler workflows commands](https://developers.cloudflare.com/workers/wrangler/commands/workflows/) with the `--local` flag to interact with your local Workflow instances.

For example, to list your local Workflows:

```sh
npx wrangler workflows list --local
```

To trigger a Workflow locally:

```sh
npx wrangler workflows trigger my-workflow --local
```

To inspect a specific instance:

```sh
npx wrangler workflows instances describe my-workflow <INSTANCE_ID> --local
```

All commands accept `--port` to target a specific `wrangler dev` session (defaults to `8787`).

## Local Explorer

[Local Explorer](https://developers.cloudflare.com/workers/local-development/local-explorer/) is a browser-based interface for viewing and managing your local Workflow instances during development. Instead of running CLI commands, you can open Local Explorer in your browser and interact with your Workflows directly.

While a `wrangler dev` session is running, press `e` in your terminal to open Local Explorer, or go to `http://localhost:8787/cdn-cgi/explorer` in your browser.

With Local Explorer you can:

* View all Workflows defined in your project and their instances.
* Inspect the step history and current status of each instance.
* Trigger new Workflow runs and send events to running instances.
* Pause, resume, terminate, and restart instances.
* Delete specific instances or clear all of them at once.

Local Explorer requires Wrangler version `4.82.1` or later, or [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) version `1.32.0` or later.

## Known Issues

Workflows are not supported as [remote bindings](https://developers.cloudflare.com/workers/local-development/#remote-bindings) or when using `npx wrangler dev --remote`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/build/local-development/#page","headline":"Local Development · Cloudflare Workflows docs","description":"Develop and test Cloudflare Workflows locally using Wrangler's emulated runtime.","url":"https://developers.cloudflare.com/workflows/build/local-development/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
