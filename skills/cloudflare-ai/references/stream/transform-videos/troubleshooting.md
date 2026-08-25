---
description: Resolve common Cloudflare Media Transformations error codes and failures.
title: Troubleshooting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshooting

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/stream/transform-videos/troubleshooting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Media Transformations is now GA:

Billing for Media Transformations will begin on November 1st, 2025.

If you are using Media Transformations to transform your video and you experience a failure, the response body contains an error message explaining the reason, as well as the `Cf-Resized` header containing `err=code`:

* 9401 — The required options are missing or are invalid. Refer to [Options](https://developers.cloudflare.com/stream/transform-videos/#options) for supported arguments.
* 9402 — The video was too large or the origin server did not respond as expected. Refer to [source video requirements](https://developers.cloudflare.com/stream/transform-videos/#source-video-requirements) for more information.
* 9404 — The video does not exist on the origin server or the URL used to transform the video is wrong. Verify the video exists and check the URL.
* 9406 & 9419 — The video URL is a non-HTTPS URL or the URL has spaces or unescaped Unicode. Check your URL and try again.
* 9407 — A lookup error occurred with the origin server's domain name. Check your DNS settings and try again.
* 9408 — The origin server returned an HTTP 4xx status code and may be denying access to the video. Confirm your video settings and try again.
* 9412 — The origin server returned a non-video, for example, an HTML page. This usually happens when an invalid URL is specified or server-side software has printed an error or presented a login page.
* 9504 — The origin server could not be contacted because the origin server may be down or overloaded. Try again later.
* 9509 — The origin server returned an HTTP 5xx status code. This is most likely a problem with the origin server-side software, not the transformation.
* 9517 & 9523 — Internal errors. Contact support if you encounter these errors.

---

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/transform-videos/troubleshooting/#page","headline":"Troubleshooting · Cloudflare Stream docs","description":"Resolve common Cloudflare Media Transformations error codes and failures.","url":"https://developers.cloudflare.com/stream/transform-videos/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
