---
description: Learn how to use lists in rule expressions.
title: Use lists in expressions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Use lists in expressions

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/tools/lists/use-in-expressions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In the Cloudflare dashboard, there are two options for editing [expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/):

* [Expression Builder](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder): Allows you to create expressions using drop-down lists, emphasizing a visual approach to defining an expression.
* [Expression Editor](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor): A text-only interface that supports advanced features, such as grouping symbols and functions for transforming and validating values.

## Use a list in the Expression Builder

To use a list in the Expression Builder:

1. From the **Operator** drop-down list, select _is in list_ or _is not in list_. Note that not all fields support these operators.
![Selecting an IP list from the Value drop-down list when configuring the expression of a WAF custom rule](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=979,height=739,format=webp/_astro/cf-open-proxies-list.DYcEfIK7.png)
2. Select a list from the **Value** drop-down list. Depending on your plan, you may be able to select a [Managed IP List](https://developers.cloudflare.com/waf/tools/lists/managed-lists/#managed-ip-lists).
3. To commit your changes and enable the rule, select **Deploy**. If you are not ready to enable the rule, select **Save as Draft**.

## Use a list in the Expression Editor

To use a list in the Expression Editor, specify the `in` operator and use `$<list_name>` to specify the name of the list.

Examples:

* Expression matching requests from IP addresses that are in an IP list named `office_network`:
```txt
ip.src in $office_network
```
* Expression matching requests with a source IP address different from IP addresses in the `office_network` IP list:
```txt
not ip.src in $office_network
```
* Expression matching requests from IP addresses in the Cloudflare Open Proxies [Managed IP List](https://developers.cloudflare.com/waf/tools/lists/managed-lists/#managed-ip-lists):
```txt
ip.src in $cf.open_proxies
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/lists/use-in-expressions/#page","headline":"Use lists in expressions · Cloudflare Web Application Firewall (WAF) docs","description":"Learn how to use lists in rule expressions.","url":"https://developers.cloudflare.com/waf/tools/lists/use-in-expressions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
