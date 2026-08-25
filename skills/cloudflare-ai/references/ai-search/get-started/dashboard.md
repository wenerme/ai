---
description: Create and configure AI Search using the Cloudflare dashboard.
title: Dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Dashboard

Last updated Jul 10, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/get-started/dashboard/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide walks you through creating an AI Search instance using the Cloudflare dashboard.

## Create an AI Search instance

1. Go to **AI Search** in the Cloudflare dashboard.
[Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select **Create Instance**.
3. Name your AI Search instance.
4. Optionally connect a [data source](https://developers.cloudflare.com/ai-search/configuration/data-source/) such as a website you own or an R2 bucket.
5. Review your configurations.
6. Select **Create**.

## Upload content

Once an instance has been created, you can upload files directly from the dashboard.

1. Go to **AI Search** in the Cloudflare dashboard.
[Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your instance.
3. Select the **Items** tab.
4. Upload your files. AI Search indexes them automatically.

## Try it out

Once your content is indexed, you can run your first query.

1. Go to your AI Search instance.
2. Select the **Playground** tab.
3. Select **Chat** or **Search**.
4. Enter a query to test the response.

## Add to your application

There are multiple ways you can connect AI Search to your application:

### [Workers Binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/)

Query AI Search directly from your Workers code.

### [REST API](https://developers.cloudflare.com/ai-search/api/search/rest-api/)

Query AI Search using HTTP requests.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/get-started/dashboard/#page","headline":"Dashboard · Cloudflare AI Search docs","description":"Create and configure AI Search using the Cloudflare dashboard.","url":"https://developers.cloudflare.com/ai-search/get-started/dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
