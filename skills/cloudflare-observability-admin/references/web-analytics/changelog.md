---
description: Track the latest updates and changes to Web Analytics features.
title: Changelog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web-analytics/changelog/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare occasionally updates the `beacon.min.js` file to improve Web Analytics functionality. The table below includes a log of what changed in the `beacon.min.js` file and when.

[Subscribe to RSS](https://developers.cloudflare.com/web-analytics/changelog/index.xml)

## 2026-09-02

1. Bug fix to prevent rounding of Cumulative Layout Shift (CLS)
2. Polyfills introduced for `Array.prototype.findLast` and `.at` to improve browser compatibility
3. Google's web-vitals library upgraded to version 6.2.1
4. OS/browser/engine versions included in beacon payload
5. Timing durations rounded to 1 millisecond to minimise beacon payload size

## 2026-08-20

Updated Google's web-vitals library to version 6.1.0\. In order to improve the accuracy of tracking soft navigations (i.e. those used by Single Page Applications), we've introduced support for [Google's new Soft Navigations API](https://developer.chrome.com/docs/web-platform/soft-navigations) available in Chromium-based browsers (e.g. Chrome, Edge, Opera) and added an improved fallback for non-Chromium browsers (e.g. Safari and Firefox) using [the Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation%5FAPI). For more information, see [Web Analytics for SPAs](https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/).

## 2026-07-13

The beacon script is now injected with `type="module"` to intentionally exclude long EOL'd (End-of-Life'd) browsers like Internet Explorer from loading the script, given they don't support it anyway. [See FAQ entry for more information](https://developers.cloudflare.com/web-analytics/faq/#why-am-i-seeing-syntax-errors-from-the-beacon-script-in-internet-explorer).

## 2026-06-16

Updated Google's web-vitals library to version 5.3.0 and updated the JavaScript build output target to ES2015.

## 2026-05-15

Updated Google's web-vitals library to version 4.2.4 and captured Interaction to Next Paint (INP) sub-part metrics (Input Delay, Processing Duration, Presentation Delay)

## 2024-06-11

Enhanced to include reporting of Server-Timing headers.

## 2024-05-22

Introducing new metric fields, transferSize and decodedBodySize are included.

## 2024-04-17

Introducing new metric fields, deliveryType (dt) and navigationType (nt) are included.

## 2023-10-18

Manages A/B testing tags.

## 2023-07-25

Fixed ETag format in the response header.

## 2023-07-13

Fixed the issue that was causing an illegal invocation error.

## 2023-04-19

Reports additional LCP diagnostic information using web-vitals library's attribution build.

## 2023-04-06

Updated webpack configuration to output code in ECMAScript 3 (ES3) format.

## 2023-03-23

Updated Google's web-vitals library (version 3.1.1) and removed experimental `server-timing` header.

## 2022-10-17

Updated to report new metrics such as time to first byte (TTFB), interaction to next paint (INP), and first contentful paint (FCP). Additionally, it reports `navigator.webdriver`, `server-timing` header (experimental), and protocol info (`nextHopProtocol`).

## 2021-12-14

Improved site filtering.

## 2021-11-16

When using the automatic installation feature of the JavaScript Beacon (available only to customers proxied through Cloudflare - also known as orange-clouded customers), [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource%5FIntegrity) is now enabled by default. SRI is a security feature that enables browsers to verify that resources they fetch are delivered without unexpected manipulation.

## 2021-09-01

Improved to report debugging information for Core Web Vitals.

## 2021-05-28

`startsWith` function replaced with `indexOf` function, which prevents rendering if multiple beacon scripts are loaded.

## 2021-05-12

Reporting endpoint changed from `/cdn-cgi/beacon/performance` to `/cdn-cgi/rum` (for Browser Insights only).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/web-analytics/changelog/#page","headline":"Changelog for beacon.min.js · Cloudflare Web Analytics docs","description":"Track the latest updates and changes to Web Analytics features.","url":"https://developers.cloudflare.com/web-analytics/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
