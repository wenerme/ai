---
description: Use Vite+ with the Cloudflare Vite plugin for new Workers and Vite-based apps, or adopt it in an existing project.
title: Vite+ on Workers
image: https://developers.cloudflare.com/workers/vite-plugin/vite-plus/og.png?v=af5312e997b31f2b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Vite+ on Workers

Last updated Nov 6, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/vite-plugin/vite-plus/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Vite+ ↗︎](https://viteplus.dev/) combines Vite with formatting, linting, type checking, and testing. Use Vite+ with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) for new Workers and supported Vite-based apps.

The plugin runs your Worker code in the Workers runtime during development. Vite+ provides the project toolchain through the `vp` command.

## Start a new project

To create a standalone Worker with `cf init`, follow [Deploy your first Worker](https://developers.cloudflare.com/cf/get-started/first-worker/). Use the generated Vite+ scripts for checks, formatting, and tests alongside `cf dev`, `cf build`, and `cf deploy`.

For a framework application, start with the appropriate [framework guide](https://developers.cloudflare.com/workers/framework-guides/). Preserve framework-specific build steps when adopting Vite+.

## Adopt Vite+ in an existing project

Follow the [Vite+ migration guide ↗︎](https://viteplus.dev/guide/migrate) for requirements and migration steps. If your project does not yet use the Cloudflare Vite plugin, follow the [plugin setup guide](https://developers.cloudflare.com/workers/vite-plugin/get-started/).

Keep your framework scripts and Cloudflare deployment command. Adopting Vite+ does not require changing your Cloudflare configuration format. Preserve existing toolchains during unrelated changes.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/vite-plus/#page","headline":"Vite+ on Workers","description":"Use Vite+ with the Cloudflare Vite plugin for new Workers and Vite-based apps, or adopt it in an existing project.","url":"https://developers.cloudflare.com/workers/vite-plugin/vite-plus/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/vite-plugin/vite-plus/og.png?v=af5312e997b31f2b","dateModified":"2026-11-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
