---
description: Sandbox SDK API for executing code, managing files, running processes, and exposing services.
title: API reference
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# API reference

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Coming soon: Sandbox SDK 1.0

This is the API hub for today's stable `@cloudflare/sandbox` package.

For **`@cloudflare/sandbox@next`**, use the [1.0 preview API reference](https://developers.cloudflare.com/sandbox/1-0-preview/api/).

The Sandbox SDK provides a comprehensive API for executing code, managing files, running processes, and exposing services in isolated sandboxes.

### [Lifecycle](https://developers.cloudflare.com/sandbox/api/lifecycle/)

Create and manage sandbox containers. Get sandbox instances, configure options, and clean up resources.

### [Commands](https://developers.cloudflare.com/sandbox/api/commands/)

Execute commands and stream output. Run scripts, manage background processes, and capture execution results.

### [Files](https://developers.cloudflare.com/sandbox/api/files/)

Read, write, and manage files in the sandbox filesystem. Includes directory operations and file metadata.

### [File watching](https://developers.cloudflare.com/sandbox/api/file-watching/)

Monitor real-time filesystem changes using native inotify. Build development tools, hot-reload systems, and responsive file processing.

### [Code interpreter](https://developers.cloudflare.com/sandbox/api/interpreter/)

Execute Python and JavaScript code with rich outputs including charts, tables, and formatted data.

### [Ports](https://developers.cloudflare.com/sandbox/api/ports/)

Expose services running in the sandbox via preview URLs. Access web servers and APIs from the internet.

### [Tunnels](https://developers.cloudflare.com/sandbox/api/tunnels/)

Expose services on zero-config `*.trycloudflare.com` URLs via `sandbox.tunnels.get(port)`. Best for quick development and `.workers.dev`deployments.

### [Storage](https://developers.cloudflare.com/sandbox/api/storage/)

Mount S3-compatible buckets (R2, S3, GCS) as local filesystems for persistent data storage across sandbox lifecycles.

### [Backups](https://developers.cloudflare.com/sandbox/api/backups/)

Create point-in-time snapshots of directories and restore them with copy-on-write overlays. Store backups in R2.

### [Sessions](https://developers.cloudflare.com/sandbox/api/sessions/)

Create isolated execution contexts within a sandbox. Each session maintains its own shell state, environment variables, and working directory.

### [Terminal](https://developers.cloudflare.com/sandbox/api/terminal/)

Connect browser-based terminal UIs to sandbox shells via WebSocket, with the xterm.js SandboxAddon for automatic reconnection and resize handling.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/api/#page","headline":"API reference · Cloudflare Sandbox SDK docs","description":"Sandbox SDK API for executing code, managing files, running processes, and exposing services.","url":"https://developers.cloudflare.com/sandbox/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
