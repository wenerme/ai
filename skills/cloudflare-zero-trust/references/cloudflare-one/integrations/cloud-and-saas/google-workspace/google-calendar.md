---
description: Reference information for Google Calendar in Zero Trust integrations.
title: Google Calendar
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Google Calendar

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-calendar/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Google Calendar integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Google Workspace account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Google Workspace account with a Business Starter, Business Standard, Business Plus or Enterprise plan
* A Google Workspace user with [Super Admin privileges ↗](https://support.google.com/a/answer/2405986) and [Owner permissions ↗](https://cloud.google.com/iam/docs/understanding-roles) in the Google Cloud Platform (GCP) project used

## Integration permissions

Refer to [Google Workspace integration permissions](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/#integration-permissions) for information on which API permissions to enable.

## Security findings

The Google Calendar integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-calendar.mdx.atom).

### Calendar sharing

| Finding type                                      | FindingTypeID                        | Severity | Description                                                                           |
| ------------------------------------------------- | ------------------------------------ | -------- | ------------------------------------------------------------------------------------- |
| Google Workspace: Calendar is publicly accessible | ec68bf68-b0c0-47b3-ad48-fcb3d7eaf8b6 | Medium   | A user's Google Calendar is publicly accessible on the Internet that anyone can read. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-calendar/#page","headline":"Google Calendar · Cloudflare One docs","description":"Reference information for Google Calendar in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-calendar/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google"]}
```
