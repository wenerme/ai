---
description: Configure Jetpack and Cloudflare to work together.
title: WordPress Jetpack and Cloudflare
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# WordPress Jetpack and Cloudflare

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/third-party-software/content-management-system-cms/wordpress-jetpack-and-cloudflare/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Overview

Cloudflare and Jetpack for WordPress should require no additional configuration to operate together. However we do have some security features designed to protect your Jetpack installation, read on below to learn more.

### Default Jetpack protection from Cloudflare

The Cloudflare WAF managed rule WP0007 protects the `xmlrpc.php` file on all Cloudflare plans to allow only Jetpack to use the `xmlrpc.php?for=jetpack` query string. Cloudflare does this by only allowing the IP range of Jetpack’s automation systems. As such, any attempt to access `xmlrpc.php?for=jetpack` from an IP that is not a genuine Jetpack IP address will be blocked with a `HTTP 403 Forbidden` message from Cloudflare. This in itself is nothing to worry about and improves the security of your website and does not affect the functionality of Jetpack whatsoever.

For more information about why this was originally implemented, take a look at our blog post on the subject:

[https://blog.cloudflare.com/our-waf-is-keeping-wordpress-jetpack-on-track/ ↗](https://blog.cloudflare.com/our-waf-is-keeping-wordpress-jetpack-on-track/)

### Additional WAF managed rules that can impact Jetpack

There is a specific rule in [Web Application Firewall (WAF) ↗](https://www.cloudflare.com/waf/) managed rules that if enabled will block Jetpack’s servers from administering your settings. The WAF managed rule “WP0002 - Block WordPress XML-RPC” rule is disabled by default, but when enabled it completely disables access to the `xmlrpc.php` file. As such, we only recommend enabling this rule as an emergency measure if your `xmlrpc.php` endpoint is being attacked.

For further guidance, please contact our Support team.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/third-party-software/content-management-system-cms/wordpress-jetpack-and-cloudflare/#page","headline":"WordPress Jetpack and Cloudflare · Cloudflare Support docs","description":"Configure Jetpack and Cloudflare to work together.","url":"https://developers.cloudflare.com/support/third-party-software/content-management-system-cms/wordpress-jetpack-and-cloudflare/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
