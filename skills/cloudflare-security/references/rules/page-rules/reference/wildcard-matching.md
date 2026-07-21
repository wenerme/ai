---
description: How wildcard and pattern matching works in Page Rules URLs.
title: Wildcard matching in Page Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Wildcard matching in Page Rules

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/page-rules/reference/wildcard-matching/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

You can use the asterisk (`*`) in any URL segment to match certain patterns. For example, `example.com/t*st` would match:

* `example.com/test`
* `example.com/toast`
* `example.com/trust`

`example.com/foo/* `does not match `example.com/foo`, but `example.com/foo*` does match.

Note

Consider alternative [Rules](https://developers.cloudflare.com/rules/) options due to their enhanced configurability. Refer to the [migration guide](https://developers.cloudflare.com/rules/reference/page-rules-migration/) for details.

For more flexibility and customization, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

## Helpful tips

* To match both `http` and `https`, write `example.com`. Writing `*example.com` is unnecessary.
* To match every page on a domain, write `example.com/*`. Writing `example.com` will not work.
* To match every page on a domain and its subdomains, write `*example.com/*`. Writing `example.com` will not work.
* A wildcard (`*`) in a page rule URL will match even if no characters are present and may include any part of the URL, including the query string.

## Reference wildcard matches

You can reference a matched wildcard later using the `$<X>` syntax, where `<X>` indicates the index of a glob pattern. For example, `$1` represents the first wildcard match and `$2` represents the second wildcard match.

The `$<X>` syntax is especially useful with the _Forwarding URL_ setting. For example, you could forward `http://*.example.com/*` to `http://example.com/images/$1/$2.jpg`.

This rule would match `http://cloud.example.com/flare.jpg`, which would be forwarded to `http://example.com/images/cloud/flare.jpg`.

To add a `$` character in the forwarding URL, escape it by adding a backslash `\` in front like `\$`.

Caution

Avoid creating a redirect where the domain points to itself as the destination. A domain that points to itself can cause an [infinite redirect error](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/), which makes your site inaccessible to visitors.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/page-rules/reference/wildcard-matching/#page","headline":"Wildcard matching in Page Rules · Cloudflare Rules docs","description":"How wildcard and pattern matching works in Page Rules URLs.","url":"https://developers.cloudflare.com/rules/page-rules/reference/wildcard-matching/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
