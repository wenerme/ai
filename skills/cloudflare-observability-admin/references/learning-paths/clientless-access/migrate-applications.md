---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Secure browser-based access without device clients.
title: Migrate applications
image: https://developers.cloudflare.com/learning-paths/clientless-access/migrate-applications/og.png?v=9a5d05cfb2f7ecd6
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate applications

Publish internal applications that users currently access from a traditional corporate network.

Note

The remaining modules (Modules 6-9) discuss special considerations and setup options for enterprise environments. If you are only looking to configure a basic clientless access setup, feel free to skip them.

## Objectives

By the end of this module, you will be able to:

- Manage applications that are directly integrated with an identity provider.
- Pass user information from Cloudflare Access to your application.
- Review best practices for onboarding different types of internal applications.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/migrate-applications/#page","headline":"Migrate applications","description":"Secure browser-based access without device clients.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/migrate-applications/","inLanguage":"en","image":"https://developers.cloudflare.com/learning-paths/clientless-access/migrate-applications/og.png?v=9a5d05cfb2f7ecd6","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
