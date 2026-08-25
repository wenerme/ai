---
description: Set up PhishNet for user phish reporting.
title: Report phish
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Report phish

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/report-phish/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Before deploying Email security to production, you will have to consider reporting any phishing attacks, evaluating which disposition to assign a specific message, and using different screen criteria to search through your inbox.

PhishNet is an add-in button that helps users to submit phish samples missed by Email security detection.

### PhishNet for Microsoft 365

To set up PhishNet Microsoft 365:

1. Log in to the Microsoft admin panel. Go to **Microsoft 365 admin center** \> **Settings** \> **Integrated Apps**.
2. Select **Upload custom apps**.
3. Choose **Provide link to manifest file** and paste the following URL:

```txt
https://phishnet-o365.area1cloudflare-webapps.workers.dev?clientId=ODcxNDA0MjMyNDM3NTA4NjQwNDk1Mzc3MDIxNzE0OTcxNTg0Njk5NDEyOTE2NDU5ODQyNjU5NzYzNjYyNDQ3NjEwMzIxODEyMDk1NQ
```

1. Verify and complete the wizard.

### PhishNet for Google Workspace

To set up PhishNet for Google Workspace:

1. Log in to the Google Workspace Marketplace using an administrator account.
2. Select **Admin install** to install Cloudflare PhishNet.

Refer to [Set up PhishNet for Google Workspace](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/phishnet-google-workspace/#set-up-phishnet-for-google-workspace) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/report-phish/#page","headline":"Report phish · Cloudflare Learning Paths","description":"Set up PhishNet for user phish reporting.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/report-phish/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
