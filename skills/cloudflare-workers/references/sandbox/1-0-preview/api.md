---
description: API reference for @cloudflare/sandbox@next — processes, terminals, errors, and related preview surfaces.
title: API reference
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# API reference

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/1-0-preview/api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Path to Sandbox SDK 1.0

This section documents APIs on `@cloudflare/sandbox@next`, the preview of Sandbox SDK 1.0\. For today's stable package, refer to [API reference](https://developers.cloudflare.com/sandbox/api/).

Reference for the preview public surface. Start with the mental model pages when you need _why_. Use these pages for signatures and types.

### [Processes](https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/)

`exec`, process handles, logs, waits, and kill.

### [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/)

`createTerminal`, handles, output, connect, interrupt, and terminate.

### [Errors](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/)

Error classes, codes, and recommended fixes.

### [Interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/)

`withInterpreter`, contexts, `runCode`, and results.

## Other API surfaces

Files, mounts, backups, ports, tunnels, and related options remain available. Use the main reference for signatures:

* [Files](https://developers.cloudflare.com/sandbox/api/files/) and [file watching](https://developers.cloudflare.com/sandbox/api/file-watching/)
* [Storage](https://developers.cloudflare.com/sandbox/api/storage/) and [backups](https://developers.cloudflare.com/sandbox/api/backups/)
* [Ports](https://developers.cloudflare.com/sandbox/api/ports/) and [tunnels](https://developers.cloudflare.com/sandbox/api/tunnels/)
* [Lifecycle](https://developers.cloudflare.com/sandbox/api/lifecycle/) and [sandbox options](https://developers.cloudflare.com/sandbox/configuration/sandbox-options/)
* [Outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/)

Where those pages still describe sessions or transport selection, that guidance does not apply on `@next`.

## Related concepts and guides

* [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/)
* [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/)
* [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/)
* [Environment variables](https://developers.cloudflare.com/sandbox/1-0-preview/environment/)
* [Code interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/)
* [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/)
* [Troubleshooting](https://developers.cloudflare.com/sandbox/1-0-preview/troubleshooting/)
* [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/1-0-preview/api/#page","headline":"API reference · Cloudflare Sandbox SDK docs","description":"API reference for @cloudflare/sandbox@next — processes, terminals, errors, and related preview surfaces.","url":"https://developers.cloudflare.com/sandbox/1-0-preview/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
