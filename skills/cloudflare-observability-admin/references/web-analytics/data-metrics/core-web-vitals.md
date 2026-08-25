---
description: View Core Web Vitals metrics collected by Web Analytics.
title: Core Web Vitals
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Core Web Vitals

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Core Web Vitals ↗](https://www.cloudflare.com/learning/performance/what-are-core-web-vitals/) are high-level metrics designed to measure the perceived performance of websites and web applications.

Three core Web Vitals metrics are measured: Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift. Each of these metrics is automatically assigned a rating of Good, Needs Improvement, or Poor based on the thresholds defined by Google.

## Access Core Web Vitals

Core Web Vitals enables you to easily pinpoint which elements in a web page are affecting the user's experience while browsing your website, in a visual form. To access Core Web Vitals:

1. In the Cloudflare dashboard, go to the **Web Analytics** page.
[Go to **Web analytics** ↗](https://dash.cloudflare.com/?to=/:account/web-analytics)
2. Select your website and select **Core Web Vitals**.

### Core Web Vitals metrics

Core Web Vitals is divided into three main sections, each one with information about a specific feature that affects user experience:

* [Largest Contentful Paint (LCP) ↗](https://web.dev/optimize-lcp/): Measures perceived load speed by the user — how long the main content of the page takes to be loaded.
* [Interaction to Next Paint (INP) ↗](https://web.dev/inp/): Measures user interface responsiveness – how quickly a website responds to user interactions like clicks, taps or key presses.
* [Cumulative Layout Shift (CLS) ↗](https://web.dev/optimize-cls/): Measures visual stability — to what extent there are unexpected shifts in the page layout during and after page load.

Note

Currently, Cumulative Layout Shift is only supported in Chromium browsers, Firefox and Safari have not implemented [support for the Layout Instability API ↗](https://caniuse.com/wf-layout-instability).

Each of these metrics represents an impact to the user experience, which is quantified and graded by Web Analytics.

Cloudflare Web Analytics offers interactive exploration in Core Web Vitals by allowing you to filter data by URL, Browser, Operating System, Country, Element and more.

### Debug view

Below each graph, the 'Debug View' section has the top five elements with a negative impact on each metric. Selecting the elements shown in the data table gives you more details about them.

Each table — LCP, INP, and CLS — also shows you the performance of these elements in the 75th percentile (P75) at a glance. Selecting in each row of the table lets you expand the element and have access to more information, including P50, P90 and P99 metrics.

These numbers refer to how an element performs relatively to others in your page. For example, if an element takes 3,900 ms to load and is in the 75 percentile, this means that it is slower to load than 75% of the elements in your page.

![Debug View page](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1840,height=816,format=webp/_astro/core-web-vitals-debug-view.BXtLIgXn.png)

## Information collected

Web Analytics uses its lightweight JavaScript beacon to collect the information Vitals Explorer uses. It does not use any client-side state, such as cookies or `localStorage`, to collect usage metrics. Vitals Explorer also does not fingerprint individuals via their IP address, User Agent string, or any other data.

### Common data collected for all Core Web Vitals metrics

#### Element

A CSS selector representing the DOM node. With this string, you can use `document.querySelector(<element_name>)` in the dev console of your browser to find out which DOM node has a negative impact on your scores/values.

#### Path

The URL path at the time the Core Web Vitals are captured.

#### Value

[The metric value ↗](https://web.dev/cls/#layout-shift-score) for each Core Web Vitals. This value is in milliseconds for LCP or INP and a score for CLS.

### Additional data collected for Largest Contentful Paint

#### URL

The source URL (such as image, text, web fonts).

#### Size

The source object's size in bytes.

### Additional data collected for Cumulative Layout Shift

Layout information is a JSON value that includes width, height, x axis position, y axis position, left, right, top, and bottom. These values represent the layout shifts that happen on the page.

#### CurrentRect

Captures the layout information of the DOM element with the largest area, after the shift in the page has occurred. This JSON value is shown as **Current** in the **Debug View** section. To access it, scroll to the **Cumulative Layout Shifts (CLS)** graphic > **Debug View**. Select any element from that table to access the **Layout Shifts** section, where **Current** is presented.

#### PreviousRect

Captures the layout information of the DOM element with the largest area, before the shift in the page has occurred. This JSON value is shown as **Previous** in the **Debug View** section. To access it, scroll to the **Cumulative Layout Shifts (CLS)** graphic > **Debug View**. Select any element from that table to access the **Layout Shifts** section, where **Previous** is presented.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/#page","headline":"Core Web Vitals · Cloudflare Web Analytics docs","description":"View Core Web Vitals metrics collected by Web Analytics.","url":"https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
