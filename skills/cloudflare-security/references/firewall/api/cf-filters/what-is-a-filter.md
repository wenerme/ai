---
description: A filter is a way of setting up if (traffic matches certain criteria), then do something.
title: What is a filter?
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# What is a filter?

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/firewall/api/cf-filters/what-is-a-filter/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A filter is a way of saying:

```txt
if (traffic matches certain criteria) then...
```

A filter contains an expression that would return `true` or `false` when evaluated against traffic passing through Cloudflare.

Filter expressions are human and machine readable, and you can compose complex logic to precisely match the traffic that you are interested in detecting and acting upon.

A filter object typically looks like the following:

```json
{
  "id": "<FILTER_ID>",
  "expression": "(http.request.uri.path ~ \"^.*wp-login.php$\" or http.request.uri.path ~ \"^.*xmlrpc.php$\") and ip.src ne 93.184.216.34",
  "description": "WordPress login paths via the login page or mobile RPC endpoint"
}
```

The expression specified in this example filter is:

```txt
(http.request.uri.path ~ "^.*wp-login.php$" or http.request.uri.path ~ "^.*xmlrpc.php$") and ip.src ne 93.184.216.34
```

This filter expression has a `(this or that) and not this` structure designed to:

* Capture two WordPress paths that may be subject to brute force password attacks, and
* Exclude traffic that comes from the IP address `93.184.216.34`.

Imagine that this is an IP for your office. This expression demonstrates a filter that might be used (in a firewall rule) to block access to the WordPress login when accessed outside the office network.

For more information on rule expressions, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) in the Rules language documentation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/api/cf-filters/what-is-a-filter/#page","headline":"What is a filter? · Cloudflare Firewall Rules (deprecated) docs","description":"A filter is a way of setting up if (traffic matches certain criteria), then do something.","url":"https://developers.cloudflare.com/firewall/api/cf-filters/what-is-a-filter/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
