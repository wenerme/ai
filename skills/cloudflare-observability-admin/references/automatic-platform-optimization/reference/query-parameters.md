---
description: How APO handles query parameters, UTMs, and cookies in cached responses.
title: Query parameters and cached responses
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/automatic-platform-optimization/llms.txt
> Use this file to discover all available pages before exploring further.

# Query parameters and cached responses

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/automatic-platform-optimization/reference/query-parameters/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Query parameters often signal the presence of dynamic content. As a result, if there are query parameters in the URL, APO bypasses the cache and attempts to get a new version of the page from the origin by default. Because query parameters are also often used for marketing attribution, like UTMs, quick loading times are especially important for users.

To add a query parameter to our allowlist, [create a post in the community ↗](https://community.cloudflare.com/) for consideration.

APO serves cached content as long as the query parameters in the URL are one of the following:

* `ref`
* `utm_source`
* `utm_medium`
* `utm_campaign`
* `utm_term`
* `utm_content`
* `utm_expid`
* `fbclid`
* `fb_action_ids`
* `fb_action_types`
* `fb_source`
* `mc_cid`
* `mc_eid`
* `gclid`
* `dclid`
* `_ga`
* `campaignid`
* `adgroupid`
* `_ke`
* `cn-reloaded`
* `age-verified`
* `ao_noptimize`
* `usqp`
* `mkt_tok`
* `epik`
* `ck_subscriber_id`

## Cookies prefixes that always bypass cache

* `wp-`
* `wordpress`
* `comment_`
* `woocommerce_`
* `xf_`
* `edd_`
* `jetpack`
* `yith_wcwl_session_`
* `yith_wrvp_`
* `wpsc_`
* `ecwid`
* `ec_`
* `bookly_`
* `bookly`

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/automatic-platform-optimization/reference/query-parameters/#page","headline":"Query parameters and cached responses · Cloudflare Automatic Platform Optimization docs","description":"How APO handles query parameters, UTMs, and cookies in cached responses.","url":"https://developers.cloudflare.com/automatic-platform-optimization/reference/query-parameters/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Cookies"]}
```
