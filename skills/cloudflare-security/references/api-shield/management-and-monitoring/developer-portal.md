---
description: Create interactive API documentation portals from saved endpoints or schemas.
title: Build developer portals
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Build developer portals

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/management-and-monitoring/developer-portal/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Once your endpoints are saved, API Shield doubles as an API catalog. API Shield can build an interactive documentation portal with the knowledge it has of your APIs, or you can upload a new OpenAPI schema file to build a documentation portal ad-hoc.

To create a developer portal:

1. In the Cloudflare dashboard, go to the **Security Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **API abuse**.
3. On **Create a developer portal**, select **Create site**.
4. Upload an OpenAPI v3.0 schema file or choose to select an existing schema from API Shield.
Note
If you do not have a schema to upload or to select from a pre-existing schema, export your Endpoint Management schema. For best results, include the learned parameters.
Only API schemas uploaded to Schema validation 2.0 are available when selecting existing schemas.
5. Select **Download project files** to save a local copy of the files that will be uploaded to Cloudflare Pages. Downloading the project files can be helpful if you wish to modify the project in any way and then upload the new version manually to Pages.
6. Select **Create pages project** to begin project creation. A new Pages project will be automatically created and your API schema will be automatically uploaded to the project along with other supporting static content.
7. Select **Deploy site**.

### Custom domains

To create a vanity domain instead of using the pages.dev domain, refer to the [Pages custom domain documentation](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Availability

Building developer portals is available to all API Shield subscribers. This feature uses Cloudflare Pages to host the resulting portal. Refer to [Pages](https://developers.cloudflare.com/pages/) for any limitations of your current subscription plan.

## Limitations

This feature currently uses the open source [Redoc ↗](https://github.com/Redocly/redoc) project from [Redocly ↗](https://redocly.com/). For custom theme and branding options, visit the [Redoc GitHub repository ↗](https://github.com/Redocly/redoc).

To modify the resulting page, download the project files before creating the Pages project. You can create a new Pages project with the modified files you have made to meet your branding guidelines.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/management-and-monitoring/developer-portal/#page","headline":"Build developer portals · Cloudflare API Shield docs","description":"Create interactive API documentation portals from saved endpoints or schemas.","url":"https://developers.cloudflare.com/api-shield/management-and-monitoring/developer-portal/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
