---
description: Read FAQs about Cloudflare Fonts
title: FAQ
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt
> Use this file to discover all available pages before exploring further.

# FAQ

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/speed/optimization/content/fonts/faq/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In the following sections, you can find frequently asked questions about performance, privacy, security, implementation and integration.

## Performance

### How does Cloudflare Fonts improve website performance?

By serving fonts from your own domain through Cloudflare's optimized infrastructure, Cloudflare Fonts reduces DNS lookups, TLS connection setups and latency. This leads to faster page load times, enhancing the overall performance of your website.

## Privacy and security

### Does Cloudflare Fonts collect or log user data?

No, Cloudflare Fonts does not collect or log user data during the font delivery process. Cloudflare is committed to a [privacy-first ↗](https://www.cloudflare.com/privacypolicy/) approach, ensuring that your users' data remains confidential.

## Implementation and integration

### Do I need to host my font files separately when using Cloudflare Fonts?

No, Cloudflare Fonts simplifies the font delivery process. You do not need to host font files separately. The service works by rewriting the webpage’s HTML. It removes Google Fonts links and replaces them with inline CSS.

### Are there any code changes required to use Cloudflare Fonts?

No, you do not need any code changes to use Cloudflare Fonts.

### Can I see analytics of font files served via Cloudflare Fonts?

Yes, as Cloudflare will be serving these fonts via your zone, analytics will appear within your Cloudflare dashboard. This allows you to analyze requests for font files that you would not have otherwise known about without Cloudflare Fonts.

### Which path are Cloudflare Fonts requests made to?

Font requests will be made to your origin with the `/cf-fonts/` path prefix.

### What other transformations are made?

Cloudflare will strip any preconnect headers for Google Fonts domains from the HTML response body. This will improve performance by removing unnecessary connections.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/speed/optimization/content/fonts/faq/#page","headline":"FAQ · Cloudflare Speed docs","description":"Read FAQs about Cloudflare Fonts","url":"https://developers.cloudflare.com/speed/optimization/content/fonts/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
