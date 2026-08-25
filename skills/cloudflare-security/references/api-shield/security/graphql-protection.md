---
description: Scan GraphQL traffic and block queries that could overload your origin.
title: GraphQL malicious query protection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# GraphQL malicious query protection

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/security/graphql-protection/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

GraphQL is a query language for APIs. In addition to protecting RESTful APIs, Cloudflare can also protect GraphQL APIs.

GraphQL malicious query protection scans your GraphQL traffic for queries that could overload your origin and result in a denial of service. You can build rules that limit the query depth and size of incoming GraphQL queries in order to block suspiciously large or complex queries.

## Availability

GraphQL malicious query protection is available for all API Shield customers. Enterprise customers who have not purchased API Shield can preview [API Shield as a non-contract service ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/api-shield) in the Cloudflare dashboard or by contacting your account team.

## Limitations

The following limitations apply:

* Parsing is limited to GraphQL `POST` bodies smaller than 20 KB. This limit will be raised in a future release.
* Only `POST` requests with content types of `application/json` or `application/graphql` are inspected.
* Queries containing fragments or multiple operations are not supported.
* Parsing and rules are limited to paths ending in `/graphql`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/security/graphql-protection/#page","headline":"GraphQL malicious query protection · Cloudflare API Shield docs","description":"Scan GraphQL traffic and block queries that could overload your origin.","url":"https://developers.cloudflare.com/api-shield/security/graphql-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
