---
description: Choose between Wrangler and the Cloudflare Vite plugin for local development.
title: Choosing between Wrangler &amp; Vite
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Choosing between Wrangler & Vite

Last updated Jul 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/local-development/wrangler-vs-vite/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Wrangler and the Cloudflare Vite plugin both provide local development environments for Workers. Both support backend Workers, local and remote bindings, and multi-Worker applications.

Choose based on the build tools your project uses. You can also use the Vite plugin for development and builds while using Wrangler for deployment and other Workers commands.

## Compare Wrangler and Vite

| Capability or workflow                                                                                  | Wrangler                                                                                          | Cloudflare Vite plugin                                         |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Standalone JavaScript or TypeScript Workers                                                             | Supported                                                                                         | Supported                                                      |
| Full-stack and backend Workers                                                                          | Supported                                                                                         | Supported                                                      |
| Local binding simulations via [Miniflare](https://developers.cloudflare.com/workers/testing/miniflare/) | Supported                                                                                         | Supported                                                      |
| [Remote bindings](https://developers.cloudflare.com/workers/local-development/)                         | Supported                                                                                         | Supported                                                      |
| Multi-Worker development                                                                                | Supported                                                                                         | Supported                                                      |
| Frontend and server-side rendering frameworks                                                           | Use the framework build output                                                                    | Integrates with Vite-powered frameworks                        |
| Build pipeline                                                                                          | Uses Wrangler's bundler or a custom build                                                         | Uses Vite transformations, Hot Module Replacement, and plugins |
| Deployment and resource management                                                                      | Supported                                                                                         | Use Wrangler after vite build                                  |
| [Rust Workers](https://developers.cloudflare.com/workers/languages/rust/)                               | Supported                                                                                         | Not supported                                                  |
| [Python Workers](https://developers.cloudflare.com/workers/languages/python/)                           | Use [pywrangler](https://developers.cloudflare.com/workers/languages/python/) instead of wrangler | Not supported                                                  |

Use the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) when your project already uses Vite or would benefit from its build pipeline. Vite is valid for standalone backend Workers, not only frontend applications.

Use [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) when your project does not use Vite or you want a direct command-line workflow. Wrangler also provides deployment and resource management commands.

For local development that requires deployed resources, both tools support [remote bindings](https://developers.cloudflare.com/workers/local-development/#remote-bindings). Your Worker runs locally while selected bindings connect to deployed Cloudflare resources.

For configuration differences when moving an existing project, refer to [Migrating from wrangler dev](https://developers.cloudflare.com/workers/vite-plugin/reference/migrating-from-wrangler-dev/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/local-development/wrangler-vs-vite/#page","headline":"Choosing between Wrangler & Vite · Cloudflare Workers docs","description":"Choose between Wrangler and the Cloudflare Vite plugin for local development.","url":"https://developers.cloudflare.com/workers/local-development/wrangler-vs-vite/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
