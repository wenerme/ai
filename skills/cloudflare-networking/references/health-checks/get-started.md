---
description: Create and configure Health Checks to monitor your origin servers.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/health-checks/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/health-checks/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Smart Shield

This functionality is now offered as part of Cloudflare's origin server safeguard, Smart Shield. [Learn more](https://developers.cloudflare.com/smart-shield/).

This guide will get you started with creating and managing configured Health Checks.

## Create a Health Check

1. In the Cloudflare dashboard, go to the **Health Checks** page.
[Go to **Health Checks** ↗](https://dash.cloudflare.com/?to=/:account/:zone/traffic/health-checks)
2. Select **Create** and fill out the form, paying special attention to:

  * The values for **Interval** and **Check regions**, because decreasing the **Interval** and increasing **Check regions** may increase the load on your origin server.
  * **Retries**, which specify the number of retries to attempt in case of a timeout before marking the origin as unhealthy.
  * **Response body**, which specifies a substring that must be present in the first 10 KB of the response body for the check to succeed.
3. Select **Save and Deploy**.

## Manage Health Checks

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Traffic** \> **Health Checks**.
3. Navigate to your health check and select **Edit**.
4. Edit your Health Check.
5. Select **Save**.

Note

You can also enable, disable, or delete configured Health Checks.

Note

Authenticated origin pull is not supported by Standalone Health Checks.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/health-checks/get-started/#page","headline":"Get started · Cloudflare Health Checks docs","description":"Create and configure Health Checks to monitor your origin servers.","url":"https://developers.cloudflare.com/health-checks/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
