---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Configure and manage Cloudflare Pages projects. For new static and full-stack applications, use Cloudflare Workers.
title: Cloudflare Pages
image: https://developers.cloudflare.com/pages/og.png?v=931eaf4bc968e2b1
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Pages

Deploy static and full-stack applications to the Cloudflare global network with Cloudflare Pages.

Available on all plans

For new static sites and full-stack applications, start with [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/get-started/). Workers supports [static assets](https://developers.cloudflare.com/workers/static-assets/), [framework guides](https://developers.cloudflare.com/workers/framework-guides/), [automatic configuration](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/) for existing projects, and [Git-connected builds](https://developers.cloudflare.com/workers/ci-cd/builds/). If you already run a Pages project and want to move to Workers, refer to the [Pages to Workers migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/).

Deploy Pages projects by connecting to [your Git provider](https://developers.cloudflare.com/pages/get-started/git-integration/), uploading prebuilt assets with [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), or using [C3](https://developers.cloudflare.com/pages/get-started/c3/) from the command line.

---

## Features

[Pages Functions](https://developers.cloudflare.com/pages/functions/)

Use Pages Functions to deploy server-side code to enable dynamic functionality without running a dedicated server.

Use Pages Functions

[Rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/)

Rollbacks allow you to instantly revert your project to a previous production deployment.

Use Rollbacks

[Redirects](https://developers.cloudflare.com/pages/configuration/redirects/)

Set up redirects for your Cloudflare Pages project.

Use Redirects

---

## Related products

[Workers](https://developers.cloudflare.com/workers/static-assets/)

Deploy static sites, front-end frameworks, and full-stack serverless applications with Workers Static Assets and Workers Builds.

[R2](https://developers.cloudflare.com/r2/)

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

[D1](https://developers.cloudflare.com/d1/)

D1 is Cloudflare’s native serverless database. Create a database by importing data or defining your tables and writing your queries within a Worker or through the API.

[Zaraz](https://developers.cloudflare.com/zaraz/)

Offload third-party tools and services to the cloud and improve the speed and security of your website.

---

## More resources

### [Limits](https://developers.cloudflare.com/pages/platform/limits/)

Learn about limits that apply to your Pages project (500 deploys per month on the Free plan).

### [Migrate to Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)

Move an existing Pages project to Cloudflare Workers with Static Assets and Workers Builds.

### [Developer Discord](https://discord.cloudflare.com)

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

### [@CloudflareDev](https://x.com/cloudflaredev)

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/pages/#page","headline":"Cloudflare Pages","description":"Configure and manage Cloudflare Pages projects. For new static and full-stack applications, use Cloudflare Workers.","url":"https://developers.cloudflare.com/pages/","inLanguage":"en","image":"https://developers.cloudflare.com/pages/og.png?v=931eaf4bc968e2b1","dateModified":"2026-11-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
