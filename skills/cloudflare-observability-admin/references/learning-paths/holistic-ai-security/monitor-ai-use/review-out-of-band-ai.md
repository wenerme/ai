---
description: Detect AI usage with CASB integrations.
title: Review out-of-band AI use
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Review out-of-band AI use

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/review-out-of-band-ai/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If your organization does not use the Cloudflare device client, or does not proxy HTTP traffic, you can still get valuable data about shadow AI usage if you use the [Google Workspace](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/), [Microsoft 365](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/), or [GitHub](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/github/) integrations for the Cloudflare Cloud Access Security Broker (CASB).

The CASB provides detailed information about your SaaS environment, including changes to sensitive data, content, and application settings. It works even if your users do not have the Cloudflare device client installed. By using CASB integrations with your core Single Sign-On (SSO) provider, you can see if users have authenticated to any third-party applications. This offers a clear, non-invasive way to understand tool usage across your organization without needing to deploy a client.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/review-out-of-band-ai/#page","headline":"Review out-of-band AI use · Cloudflare Learning Paths","description":"Detect AI usage with CASB integrations.","url":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/monitor-ai-use/review-out-of-band-ai/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
