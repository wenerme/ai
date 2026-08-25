---
description: Troubleshoot Troubleshoot integrations issues in Zero Trust integrations.
title: Troubleshoot integrations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshoot integrations

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/troubleshoot-integrations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare CASB detects when integrations are unhealthy or outdated.

Common integration issues include changes to SaaS app or cloud environment configurations, user access, or permission scope. Integrations may need to be updated to support new features or permissions.

## Identify unhealthy or outdated integrations

To identify unhealthy CASB integrations, go to **Integrations** \> **Cloud & SaaS integrations**. If an integration is unhealthy, CASB will set its status to **Broken**. If an integration is outdated, CASB will set its status to **Upgrade**.

## Repair an unhealthy integration

Repair limitation

If CASB does not support self-service repairs for an integration, you will need to [delete](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/#delete-an-integration) and recreate the integration to continue scanning.

You can repair unhealthy CASB integrations through your list of integrations or findings.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Integrations** \> **Cloud & SaaS integrations**.
2. Choose your unhealthy integration.
3. Select **Reauthorize**.
4. In your SaaS app or cloud environment, reauthorize your account.

## Upgrade an integration

Upgrading an outdated integration will allow the integration to access new features and permissions.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Integrations** \> **Cloud & SaaS integrations**.
2. Choose your outdated integration.
3. Select **Upgrade integration**.
4. In your SaaS app or cloud environment, upgrade your app and reauthorize your account.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/troubleshoot-integrations/#page","headline":"Troubleshoot integrations · Cloudflare One docs","description":"Troubleshoot Troubleshoot integrations issues in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/troubleshoot-integrations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
```
