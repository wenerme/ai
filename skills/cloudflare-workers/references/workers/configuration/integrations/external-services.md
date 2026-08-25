---
description: Connect Cloudflare Workers to external services using libraries, SDKs, and secure authentication.
title: External Services
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# External Services

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/configuration/integrations/external-services/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Many external services provide libraries and SDKs to interact with their APIs. While many Node-compatible libraries work on Workers right out of the box, some, which implement `fs`, `http/net`, or access the browser `window` do not directly translate to the Workers runtime, which is v8-based.

## Authentication

If your service requires authentication, use Wrangler secrets to securely store your credentials. To do this, create a secret in your Cloudflare Workers project using the following [wrangler secret](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) command:

```sh
wrangler secret put SECRET_NAME
```

Then, retrieve the secret value in your code using the following code snippet:

```js
const secretValue = env.SECRET_NAME;
```

Then use the secret value to authenticate with the external service. For example, if the external service requires an API key for authentication, include the secret in your library's configuration.

For services that require mTLS authentication, use [mTLS certificates](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls) to present a client certificate.

Use [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) when communicating with external APIs, which treat your Worker as your core application.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/integrations/external-services/#page","headline":"External Services · Cloudflare Workers docs","description":"Connect Cloudflare Workers to external services using libraries, SDKs, and secure authentication.","url":"https://developers.cloudflare.com/workers/configuration/integrations/external-services/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
