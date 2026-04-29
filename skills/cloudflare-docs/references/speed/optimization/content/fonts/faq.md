---
title: FAQ
description: Read FAQs about Cloudflare Fonts
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# FAQ

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/content/","name":"Content optimizations"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/content/fonts/","name":"Cloudflare Fonts"}},{"@type":"ListItem","position":6,"item":{"@id":"/speed/optimization/content/fonts/faq/","name":"FAQ"}}]}
```
