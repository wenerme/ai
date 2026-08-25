---
description: Using secrets with the Vite plugin
title: Secrets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Secrets

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/vite-plugin/reference/secrets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Secrets](https://developers.cloudflare.com/workers/configuration/secrets/) are typically used for storing sensitive information such as API keys and auth tokens. For deployed Workers, they are set via the dashboard or Wrangler CLI.

In local development, secrets can be provided to your Worker by using a [.dev.vars](https://developers.cloudflare.com/workers/configuration/secrets/#local-development-with-secrets) file. If you are using [Cloudflare Environments](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/) then the relevant `.dev.vars` file will be selected. For example, `CLOUDFLARE_ENV=staging vite dev` will load `.dev.vars.staging` if it exists and fall back to `.dev.vars`.

Note

The `vite build` command copies the relevant `.dev.vars` file to the output directory. This is only used when running `vite preview` and is not deployed with your Worker.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/reference/secrets/#page","headline":"Secrets · Cloudflare Workers docs","description":"Using secrets with the Vite plugin","url":"https://developers.cloudflare.com/workers/vite-plugin/reference/secrets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
