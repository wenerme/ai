---
description: Control access to custom hostnames using Cloudflare Access identity and device policies.
title: Secure with Cloudflare Access
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Secure with Cloudflare Access

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Access provides visibility and control over who has access to your [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/). You can allow or block users based on identity, device posture, and other [Access rules](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

## Prerequisites

* You must have an active custom hostname. For setup instructions, refer to [Configuring Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/).
* You must have a Cloudflare Zero Trust plan in your SaaS provider account. Learn more about [getting started with Zero Trust](https://developers.cloudflare.com/cloudflare-one/setup/).
* You can only run Access on custom hostnames if they are managed externally to Cloudflare or in a separate Cloudflare account. If the custom hostname zone is in the same account as the SaaS zone, the Access application will not be applied.

## Setup

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), select your SaaS provider account and go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **Self-hosted and private**.
4. Select **Add public hostname**.
5. Select **Switch to custom input**.
6. In **Hostname**, enter your custom hostname (for example, `mycustomhostname.com`).
7. Follow the remaining [self-hosted application creation steps](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) to publish the application.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access/#page","headline":"Secure with Cloudflare Access · Cloudflare for Platforms docs","description":"Control access to custom hostnames using Cloudflare Access identity and device policies.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication"]}
```
