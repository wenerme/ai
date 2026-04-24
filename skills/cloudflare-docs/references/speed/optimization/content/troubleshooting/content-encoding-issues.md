---
title: Content encoding issues
description: Fix content encoding mismatches with compression settings.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Debugging ](https://developers.cloudflare.com/search/?tags=Debugging) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/content/troubleshooting/content-encoding-issues.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Content encoding issues

If you are noticing any encoding errors with your HTML pages, we recommend verifying that the impacted pages are explicitly setting the correct charset in the `Content-Type` header from your origin for all text/html pages, for example `Content-Type: text/html; charset=utf-8`. This is particularly important if you are not using [UTF-8 encoding standard ↗](https://en.wikipedia.org/wiki/UTF-8) for characters. Alternatively you can set the correct charset within the HTML.

If you believe these settings are correct, please inform us. You can find more information in [setting the HTTP charset parameter ↗](https://www.w3.org/International/articles/http-charset/index) and in [HTML charset attribute ↗](https://www.w3schools.com/tags/att%5Fmeta%5Fcharset.asp).

Alternatively, you can use a [Configuration Rule](https://developers.cloudflare.com/rules/configuration-rules/) to disable features that rewrite HTML. This will send the content as-is to the browser.

You also have the option to turn off these features site-wide within the dashboard:

* [Email Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/), located in the **Security** \> **Settings** section.
* [Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/), located in **Speed** \> **Settings** \> **Content Optimization** section.
* [Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/), located in the **SSL/TLS** \> **Edge Certificates** section.

Misconfiguring the `Content-Type` or charset within HTML, or leaving them unspecified can lead to unintended consequences. This can disrupt the intended content presentation, resulting in disorganized rendering and potentially unclear characters. Properly configuring these elements ensures consistent and accurate interpretation, correct HTML modifications, and accurate rendering for browsers. This creates a seamless user experience and aligns with best practices in web development.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/content/","name":"Content optimizations"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/content/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":6,"item":{"@id":"/speed/optimization/content/troubleshooting/content-encoding-issues/","name":"Content encoding issues"}}]}
```
