---
description: Learn how the Sandbox SDK 0.x works, including architecture, lifecycle, security, and sessions.
title: Concepts
image: https://developers.cloudflare.com/sandbox/sdk/concepts/og.png?v=84623be765317a51
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Concepts

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/sdk/concepts/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This page documents Sandbox SDK 0.x for existing applications. For new applications, refer to [Sandboxes](https://developers.cloudflare.com/sandbox/). To move an existing application to `@cloudflare/sandbox` 1.0, refer to [Migrate from Sandbox SDK 0.x](https://developers.cloudflare.com/sandbox/sdk/migrate/).

These pages explain how the Sandbox SDK works, why it's designed the way it is, and the concepts you need to understand to use it effectively.

- [Architecture](https://developers.cloudflare.com/sandbox/sdk/concepts/architecture/) - How the SDK is structured and why
- [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/sdk/concepts/sandboxes/) - Understanding sandbox states and behavior
- [Container runtime](https://developers.cloudflare.com/sandbox/sdk/concepts/containers/) - How code executes in isolated containers
- [Session management](https://developers.cloudflare.com/sandbox/sdk/concepts/sessions/) - When and how to use sessions
- [Preview URLs](https://developers.cloudflare.com/sandbox/sdk/concepts/preview-urls/) - How to expose sandboxed services on the public internet.
- [Security model](https://developers.cloudflare.com/sandbox/sdk/concepts/security/) - Isolation, validation, and safety mechanisms
- [Terminal connections](https://developers.cloudflare.com/sandbox/sdk/concepts/terminal/) - How browser terminal connections work
- [Directory backups](https://developers.cloudflare.com/sandbox/sdk/concepts/backup-restore/) - Overlay restore, local extract, and cross-device renames

## Related resources

- [Tutorials](https://developers.cloudflare.com/sandbox/sdk/tutorials/) - Learn by building complete applications
- [How-to guides](https://developers.cloudflare.com/sandbox/sdk/guides/) - Solve specific problems
- [API reference](https://developers.cloudflare.com/sandbox/sdk/api/) - Technical details and method signatures

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/sdk/concepts/#page","headline":"Concepts","description":"Learn how the Sandbox SDK 0.x works, including architecture, lifecycle, security, and sessions.","url":"https://developers.cloudflare.com/sandbox/sdk/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/sdk/concepts/og.png?v=84623be765317a51","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
