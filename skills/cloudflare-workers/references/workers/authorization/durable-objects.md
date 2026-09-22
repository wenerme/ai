---
description: Learn how Workers roles control access to Durable Objects observability data and Data Studio.
title: Durable Objects roles and permissions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Durable Objects roles and permissions

Last updated Sep 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/authorization/durable-objects/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Durable Objects do not have separate roles or permissions. Access to a Durable Object is determined by your access to the Worker that implements it.

To give a member, User Group, or API token access to a Durable Object, assign the appropriate Workers role at either the individual Worker scope or the Workers product scope. Refer to [Workers roles and permissions](https://developers.cloudflare.com/workers/authorization/workers/) for available roles and scopes.

## Observability access

`Metadata Read-Only` access to the implementing Worker includes Durable Object metrics, logs, and traces without granting access to data stored in the Durable Object. Granular authorization supports analytics for both SQLite-backed and KV-backed Durable Objects, with one current exception: the **Total KV storage** metric is unavailable for KV-backed Durable Objects.

## Data Studio access

[Durable Objects Data Studio](https://developers.cloudflare.com/durable-objects/observability/data-studio/) can query and modify data stored in SQLite-backed Durable Objects. Accessing Data Studio requires at least `Editor` access to the Worker that implements the Durable Object.

## Related resources

- [Workers roles and permissions](https://developers.cloudflare.com/workers/authorization/workers/)
- [Durable Objects metrics and analytics](https://developers.cloudflare.com/durable-objects/observability/metrics-and-analytics/)
- [Durable Objects Data Studio](https://developers.cloudflare.com/durable-objects/observability/data-studio/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/authorization/durable-objects/#page","headline":"Durable Objects roles and permissions","description":"Learn how Workers roles control access to Durable Objects observability data and Data Studio.","url":"https://developers.cloudflare.com/workers/authorization/durable-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
