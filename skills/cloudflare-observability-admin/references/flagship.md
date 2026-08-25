---
description: Ship features safely with Flagship, Cloudflare's feature flag service for controlling feature visibility without redeploying code.
title: Cloudflare Flagship
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Flagship

Last updated Jun 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/flagship/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Ship features safely with feature flags.

Flagship is Cloudflare's feature flag service. It lets you control feature visibility in your applications without redeploying code. Define flags with targeting rules and percentage-based rollouts, then evaluate them directly inside your Workers through a [native binding](https://developers.cloudflare.com/flagship/binding/) or from server and browser applications with [OpenFeature SDKs](https://developers.cloudflare.com/flagship/sdk/).

[OpenFeature ↗](https://openfeature.dev/) is the CNCF open standard for feature flag management. Flagship ships official SDKs for TypeScript (Workers, Node.js, and browsers), Python, and Go. You can swap providers without changing evaluation code.

Check out the [Get started guide](https://developers.cloudflare.com/flagship/get-started/) to create your first feature flag.

## Features

[Worker binding](https://developers.cloudflare.com/flagship/binding/)

Evaluate flags with a native Workers binding. Type-safe methods with automatic fallback to defaults.

Binding reference

[OpenFeature SDK](https://developers.cloudflare.com/flagship/sdk/)

Use the official OpenFeature SDKs to evaluate flags from Workers, Node.js, browsers, Python, and Go server applications. Switch from another flag provider by changing one line of configuration.

View SDK docs

[Targeting rules](https://developers.cloudflare.com/flagship/targeting/)

Serve different flag values based on user attributes. Rules support 11 comparison operators, logical AND/OR grouping, and sequential evaluation.

Learn about targeting

[Percentage rollouts](https://developers.cloudflare.com/flagship/targeting/percentage-rollouts/)

Gradually release features to a percentage of users. Consistent hashing ensures the same user always receives the same flag value.

Learn about rollouts

[Multi-type variants](https://developers.cloudflare.com/flagship/concepts/)

Flag variants can be booleans, strings, numbers, or structured JSON values. Use JSON variants to deliver entire configuration blocks as a single flag.

Use Multi-type variants

[Flag management](https://developers.cloudflare.com/flagship/get-started/)

Create, update, and delete flags through the Cloudflare dashboard. Organize flags into apps that map to your projects or services.

Use Flag management

---

## Related products

[Workers](https://developers.cloudflare.com/workers/)

Build serverless applications on Cloudflare's global network. Flagship integrates natively with Workers through a binding.

[KV](https://developers.cloudflare.com/kv/)

Store key-value data across Cloudflare's global network. Flagship uses this infrastructure to deliver flag configurations.

## More resources

### [Developer Discord](https://discord.cloudflare.com)

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

### [@CloudflareDev](https://x.com/cloudflaredev)

Follow @CloudflareDev on Twitter to learn about product announcements and what is new in Cloudflare Workers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/flagship/#page","headline":"Overview · Cloudflare Flagship docs","description":"Ship features safely with Flagship, Cloudflare's feature flag service for controlling feature visibility without redeploying code.","url":"https://developers.cloudflare.com/flagship/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
