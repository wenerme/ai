---
description: Defer JavaScript loading to improve page rendering speed.
title: Rocket Loader
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt
> Use this file to discover all available pages before exploring further.

# Rocket Loader

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Rocket Loader prioritizes your website's content (text, images, fonts, and more) by deferring the loading of all of your JavaScript until after rendering.

This type of loading (known as asynchronous loading) leads to earlier rendering of your page content. Rocket Loader handles both inline and external scripts, while maintaining order of execution. Cloudflare will detect incompatible browsers and disable Rocket Loader.

On pages with JavaScript, this results in a [much faster loading experience ↗](https://www.cloudflare.com/learning/performance/test-the-speed-of-a-website/) for your users and improves the following performance metrics:

* Time to First Paint (TTFP)
* Time to First Contentful Paint (TTFCP)
* Time to First Meaningful Paint (TTFMP)
* Document Load

## How to

* [Enable](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/enable/)
* [Ignore JavaScripts](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/ignore-javascripts/)

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |

## Limitations

Some of Cloudflare's optional features, including Rocket Loader and Email Obfuscation, use non standard tags that fail strict HTML validation via tools like [w3.org ↗](https://validator.w3.org/). These failures do not correlate to issues for your site visitors.

If you observe JavaScript or jQuery issues for your website, [disable Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/enable/) and retest your website.

If you have a Content Security Policy (CSP) in place for your domain, you will need to [update your headers](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/#product-requirements) to support Rocket Loader.


Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/speed/optimization/content/rocket-loader/#page","headline":"Rocket Loader · Cloudflare Speed docs","description":"Defer JavaScript loading to improve page rendering speed.","url":"https://developers.cloudflare.com/speed/optimization/content/rocket-loader/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
