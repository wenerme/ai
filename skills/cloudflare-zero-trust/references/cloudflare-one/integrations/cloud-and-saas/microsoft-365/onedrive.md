---
description: Reference information for OneDrive in Zero Trust integrations.
title: OneDrive
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# OneDrive

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/onedrive/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The OneDrive integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Microsoft 365 account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Microsoft 365 account with an active Microsoft Business Basic, Microsoft Business Standard, Microsoft 365 E3, Microsoft 365 E5, or Microsoft 365 F3 subscription
* [Global admin role ↗](https://docs.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) or equivalent permissions in Microsoft 365

## Integration permissions

Refer to [Microsoft 365 integration permissions](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/#integration-permissions) for information on which API permissions to enable.

## Security findings

The OneDrive integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/microsoft-365/onedrive.mdx.atom).

### File sharing

Get alerted when files in your Microsoft 365 account have their permissions changed to a less secure setting. Additionally, you can automatically remediate certain finding types directly from CASB. For more information, refer to [Remediate findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#remediate-findings).

| Finding type                                           | FindingTypeID                        | Severity |
| ------------------------------------------------------ | ------------------------------------ | -------- |
| Microsoft: File publicly accessible with edit access   | 85241e6b-205f-4de6-a1d1-325656130995 | Critical |
| Microsoft: Folder publicly accessible with edit access | c9662c5c-c3d6-453b-9367-281e024f7e7a | Critical |
| Microsoft: File publicly accessible with view access   | a2b40dc9-b96a-4ace-b8f8-739c2be37dbd | High     |
| Microsoft: Folder publicly accessible with view access | 7c673785-8b70-41bc-b7d4-d0f346487ff6 | High     |
| Microsoft: File shared company-wide with edit access   | a81a79c8-a0bf-4c60-aa46-7547b4d34266 | Medium   |
| Microsoft: File shared company-wide with view access   | 364c9c0e-684b-4a83-bf28-fdbb1430bb59 | Medium   |
| Microsoft: Folder shared company-wide with edit access | 80f73d47-7dcf-4997-8ed3-6564c8388bd1 | Medium   |
| Microsoft: Folder shared company-wide with view access | f3fc8ae6-815e-4d5f-a57e-b00d5413f98c | Medium   |

### Data Loss Prevention (optional)

These findings will only appear if you [added DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) to your CASB integration.

Additionally, you can automatically remediate certain finding types directly from CASB. For more information, refer to [Remediate findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#remediate-findings).

| Finding type                                                                | FindingTypeID                        | Severity |
| --------------------------------------------------------------------------- | ------------------------------------ | -------- |
| Microsoft: File publicly accessible with edit access with DLP Profile match | 7b6ecb52-852f-4184-bf19-175fe59202b7 | Critical |
| Microsoft: File publicly accessible with view access with DLP Profile match | 8150f237-576d-4b48-8839-0c257f612171 | High     |
| Microsoft: File shared company-wide with edit access with DLP Profile match | f838ec6b-7d7a-4c1c-9c61-958ac24c27fa | Medium   |
| Microsoft: File shared company-wide with view access with DLP Profile match | 0b882cf3-7e33-4c58-b425-0202206a2c10 | Medium   |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/onedrive/#page","headline":"OneDrive · Cloudflare One docs","description":"Reference information for OneDrive in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/onedrive/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
```
