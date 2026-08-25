---
description: Learn about external evaluation rules in this guide.
title: External Evaluation rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# External Evaluation rules

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/clientless-access/advanced-workflows/external-evaluation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With Cloudflare Access, you can build infinitely customizable policies using External Evaluation rules. External Evaluation rules allow you to call any API during the evaluation of an Access policy and authenticate users based on custom business logic. Example use cases include:

* Customize policies based on time of day.
* Check IP addresses against external threat feeds.
* Call industry-specific user registries.

The External Evaluation rule requires two values: an API endpoint to call and a key to verify that any request response is coming from a trusted source. After the user authenticates with your identity provider, all information about the user, device and location is passed to your external API. The API returns a pass or fail response to Access which will then either allow or deny access to the user.

## Set up External Evaluation rule

For detailed setup instructions, refer to [External Evaluation rules](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/external-evaluation/).

Example code for the API is available in our [open-source repository ↗](https://github.com/cloudflare/workers-access-external-auth-example).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/advanced-workflows/external-evaluation/#page","headline":"External Evaluation rules · Cloudflare Learning Paths","description":"Learn about external evaluation rules in this guide.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/advanced-workflows/external-evaluation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
