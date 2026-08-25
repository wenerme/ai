---
description: Test your exposed credentials check configuration.
title: Test your exposed credentials checks configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Test your exposed credentials checks configuration

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/test-configuration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Deprecation notice

Exposed credentials check has been deprecated.

Switch from exposed credentials check to [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) for improved security. To upgrade your current configuration, refer to the [upgrade guide](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/upgrade-to-leaked-credentials-detection/).

After enabling and configuring exposed credentials checks, you may want to test if the checks are working properly.

Cloudflare provides a special set of case-sensitive credentials for this purpose:

* Login: `CF_EXPOSED_USERNAME` or `CF_EXPOSED_USERNAME@example.com`
* Password: `CF_EXPOSED_PASSWORD`

The WAF always considers these specific credentials as having been previously exposed. Use them to force an "exposed credentials" event, which allows you to check the behavior of your current configuration.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/test-configuration/#page","headline":"Test your exposed credentials checks configuration · Cloudflare Web Application Firewall (WAF) docs","description":"Test your exposed credentials check configuration.","url":"https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/test-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
