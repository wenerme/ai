---
description: Secure browser-based access without device clients.
title: Alternative on-ramps
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Alternative on-ramps

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/clientless-access/alternative-onramps/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

As discussed in the previous modules, almost everything you do with the Cloudflare reverse proxy requires [adding a site](https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/add-site/) to Cloudflare. That public DNS record (or its subdomains) becomes the domain on which your users access your private applications. This method is exceptionally secure and transparent; each domain and subdomain has access to the Cloudflare web security portfolio, are inherently DDoS protected, and receive an obfuscated origin IP. For these reasons, using a [public hostname on Cloudflare](https://developers.cloudflare.com/learning-paths/clientless-access/connect-private-applications/) is the recommended method to onboard applications for clientless user access. However, there may be times in which a public DNS record cannot be created, or other situations that prevent administrators from using this method.

## Objectives

By the end of this module, you will be able to:

* Connect to private web applications using their private hostnames.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/alternative-onramps/#page","headline":"Alternative on-ramps · Cloudflare Learning Paths","description":"Secure browser-based access without device clients.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/alternative-onramps/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
