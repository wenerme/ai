---
description: Regardless of whether the visitor-to-Cloudflare connection uses HTTP or HTTPS, Cloudflare always connects to the origin over HTTPS with certificate validation.
title: Strict (SSL-Only Origin Pull)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Strict (SSL-Only Origin Pull)

Last updated Jul 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/ssl-only-origin-pull/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This method is only available for Enterprise zones.

When you set your encryption mode to **Strict (SSL-Only Origin Pull)**, connections to the origin will always be made using SSL/TLS, regardless of the scheme requested by the visitor.

The certificate presented by the origin will be validated the same as with [Full (strict) mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/).

## Use when

You want the most secure configuration available for your origin, you are an Enterprise customer, and you meet the requirements for [**Full (strict)** mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/).

## Required setup

The setup is generally the same as [**Full (strict)** mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/), but you select **Strict (SSL-Only Origin Pull)** for your encryption mode.

Note

In addition to **Strict (SSL-Only Origin Pull)** encryption, you can also set up [Authenticated Origin Pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/) to ensure all requests to your origin are evaluated before receiving a response.

### Process

To change your encryption mode in the dashboard:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.
[Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Choose an encryption mode.

To adjust your encryption mode with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `ssl` as the setting name in the URI path, and the `value` parameter set to your desired setting (`off`, `flexible`, `full`, `strict`, or `origin_pull`).

## Limitations

Depending on your origin configuration, you may have to adjust settings to avoid [Mixed Content errors](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/) or [redirect loops](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/ssl-only-origin-pull/#page","headline":"Strict (SSL-Only Origin Pull) - SSL/TLS encryption modes · Cloudflare SSL/TLS docs","description":"Regardless of whether the visitor-to-Cloudflare connection uses HTTP or HTTPS, Cloudflare always connects to the origin over HTTPS with certificate validation.","url":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/ssl-only-origin-pull/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
