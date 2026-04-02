---
title: Rocket Loader
description: Rocket Loader prioritizes your website's content (text, images, fonts, and more) by deferring the loading of all of your JavaScript until after rendering.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/content/rocket-loader/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Rocket Loader

Rocket Loader prioritizes your website's content (text, images, fonts, and more) by deferring the loading of all of your JavaScript until after rendering.

This type of loading (known as asynchronous loading) leads to earlier rendering of your page content. Rocket Loader handles both inline and external scripts, while maintaining order of execution. Cloudflare will detect incompatible browsers and disable Rocket Loader.

On pages with JavaScript, this results in a [much faster loading experience ↗](https://www.cloudflare.com/learning/performance/test-the-speed-of-a-website/) for your users and improves the following performance metrics:

* Time to First Paint (TTFP)
* Time to First Contentful Paint (TTFCP)
* Time to First Meaningful Paint (TTFMP)
* Document Load

## How to

* [ Enable ](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/enable/)
* [ Ignore JavaScripts ](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/ignore-javascripts/)

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## Limitations

Some of Cloudflare's optional features, including Rocket Loader and Email Obfuscation, use non standard tags that fail strict HTML validation via tools like [w3.org ↗](https://validator.w3.org/). These failures do not correlate to issues for your site visitors.

If you observe JavaScript or jQuery issues for your website, [disable Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/enable/) and retest your website.

If you have a Content Security Policy (CSP) in place for your domain, you will need to [update your headers](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/#product-requirements) to support Rocket Loader.

  

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/content/","name":"Content optimizations"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/content/rocket-loader/","name":"Rocket Loader"}}]}
```
