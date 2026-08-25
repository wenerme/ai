---
description: Troubleshoot Cloudflare 1023 error code.
title: Error 1023
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1023

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1023/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1023: Could not find host

This error indicates that the host could not be found due to a configuration issue or propagation delay.

### Common causes

* If the owner just signed up for Cloudflare it can take a few minutes for the website's information to be distributed to our global network. Something is wrong with the site's configuration.
* Usually, this happens when accounts have been signed up with a partner organization (for example, hosting provider) and the provider's DNS fails.

Note

Error `1023` is returned via a HTTP `503` response code.

### Resolution

Contact [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) with the following details:

* Your domain name.
* A screenshot of the `1023` error including the [**Ray ID**](https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/) mentioned in the error message.
* A [HAR file](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) captured while duplicating the error.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1023/#page","headline":"Error 1023 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1023 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1023/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
