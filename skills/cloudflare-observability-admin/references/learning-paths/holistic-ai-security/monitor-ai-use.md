---
description: Monitor and secure generative AI usage.
title: Monitor AI usage at your organization
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Monitor AI usage at your organization

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Monitoring AI usage is one of the first steps in assessing holistic risk. Cloudflare provides a number of ways to understand both sanctioned and unsanctioned use of AI and chat applications within your Zero Trust deployment. Reviewing your detected usage should give you a sense of which AI apps are used in your organization as well as what type of policies you need to create based on what should be supported versus restricted.

After you begin to understand your organization's AI usage, you should develop a balanced perspective on what constitutes sanctioned use of a tool. A good practice is to review applications in phases and then apply security policies based on those phases. For example, you can apply different security policies to applications that are considered approved, unapproved, unreviewed, or in review until they pass your corporate security standards and data privacy reviews.

This section will detail options for assessing and understanding that risk by using inline (client) and out-of-band (API CASB) based methods.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/#page","headline":"Monitor AI usage at your organization · Cloudflare Learning Paths","description":"Monitor and secure generative AI usage.","url":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
