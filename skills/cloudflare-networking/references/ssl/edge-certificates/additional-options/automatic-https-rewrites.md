---
description: Fix mixed content by rewriting HTTP URLs to HTTPS in page responses.
title: Automatic HTTPS Rewrites
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Automatic HTTPS Rewrites

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Automatic HTTPS Rewrites prevents end users from seeing "mixed content" errors by rewriting URLs from `http` to `https` for resources or links on your web site that can be served with HTTPS.

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |

## Additional details

If your site contains links or references to HTTP URLs that are also available securely via HTTPS, Automatic HTTPS Rewrites can help. If you connect to your site over HTTPS and the lock icon is not present, or has a yellow warning triangle on it, your site may contain references to HTTP assets (“mixed content”).

Mixed content is often due to factors not under the website owner’s control such as embedded third-party content or complex content management systems. By rewriting URLs from “http” to “https”, Automatic HTTPS Rewrites simplifies the task of making your entire website available over HTTPS, helping to eliminate mixed content errors and ensuring that all data loaded by your website is protected from eavesdropping and tampering.

Note

For security reasons, this feature will run on URLs pointing to `localhost` if the URL is fetching an active resource (script, iframe, link, object, etc.).

## Enable Automatic HTTPS Rewrites

To enable **Automatic HTTPS Rewrites** in the dashboard:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.
[Go to **Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Automatic HTTPS Rewrites**, switch the toggle to **On**.

To enable or disable **Automatic HTTPS Rewrites** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `automatic_https_rewrites` as the setting name in the URI path, and the `value` parameter set to your desired setting (`"on"` or `"off"`).

Note

To use this feature on specific hostnames - instead of across your entire zone - use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

## Limitations

Before a rewrite is applied, Cloudflare checks the HTTP resources to ensure they are accessible via HTTPS. If they are not available over HTTPS, Cloudflare cannot rewrite the URL.

Some resources are loaded by JavaScript or CSS via HTTP when the site is loaded in a browser. You will see mixed content warnings in those situations. To determine which URLs do not have HTTPS support, Cloudflare uses data from [EFF’s HTTPS Everywhere ↗](https://www.eff.org/https-everywhere/faq#how-do-i-add-my-own-site-to-https-everywhere) and [Chrome’s HSTS preload list ↗](https://hstspreload.org). If your zone is not on one of these lists, only active content will be rewritten. Passive content (such as images) will not be rewritten and will still cause mixed content errors.

If a third-party domain supports HTTPS and is not rewritten automatically, you can manually change those links to relative links or HTTPS links. Alternatively, you can ask the third-party domain owner to submit their site for inclusion in the HTTPS Everywhere rulesets, which [accept pull requests on GitHub ↗](https://github.com/EFForg/https-everywhere/). For more information on how to fix mixed content errors, refer to [Troubleshooting mixed content errors](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/#page","headline":"Automatic HTTPS Rewrites · Cloudflare SSL/TLS docs","description":"Fix mixed content by rewriting HTTP URLs to HTTPS in page responses.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
