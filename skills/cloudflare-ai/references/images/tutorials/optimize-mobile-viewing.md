---
description: Lazy loading is an easy way to optimize the images on your webpages for mobile devices, with faster page load times and lower costs.
title: Optimize mobile viewing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Optimize mobile viewing

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/tutorials/optimize-mobile-viewing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can use lazy loading to optimize the images on your webpages for mobile viewing. This helps address common challenges of mobile viewing, like slow network connections or weak processing capabilities.

Lazy loading has two main advantages:

* **Faster page load times** — Images are loaded as the user scrolls down the page, instead of all at once when the page is opened.
* **Lower costs for image delivery** — When using Cloudflare Images, you only pay to load images that the user actually sees. With lazy loading, images that are not scrolled into view do not count toward your billable Images requests.

Lazy loading is natively supported on all major browsers, including Chrome, Safari, Firefox, Opera, and Edge.

Note

If you use older methods, involving custom JavaScript or a JavaScript library, lazy loading may increase the initial load time of the page since the browser needs to download, parse, and execute JavaScript.

## Modify your loading attribute

Without modifying your loading attribute, most browsers will fetch all images on a page, prioritizing the images that are closest to the viewport by default. You can override this by modifying your `loading` attribute.

There are two possible `loading` attributes for your `<img>` tags: `lazy` and `eager`.

### Lazy loading

Lazy loading is recommended for most images. With Lazy loading, resources like images are deferred until they reach a certain distance from the viewport. If an image does not reach the threshold, then it does not get loaded.

Example of modifying the `loading` attribute of your `<img>` tags to be `"lazy"`:

```html
<img src="example.com/cdn-cgi/width=300/image.png" loading="lazy" />
```

### Eager loading

If you have images that are in the viewport, eager loading, instead of lazy loading, is recommended. Eager loading loads the asset at the initial page load, regardless of its location on the page.

Example of modifying the `loading` attribute of your `<img>` tags to be `"eager"`:

```html
<img src="example.com/cdn-cgi/width=300/image.png" loading="eager" />
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/tutorials/optimize-mobile-viewing/#page","headline":"Optimize mobile viewing · Cloudflare Images docs","description":"Lazy loading is an easy way to optimize the images on your webpages for mobile devices, with faster page load times and lower costs.","url":"https://developers.cloudflare.com/images/tutorials/optimize-mobile-viewing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
