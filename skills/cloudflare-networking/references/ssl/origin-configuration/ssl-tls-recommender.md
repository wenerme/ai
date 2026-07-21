---
description: Get recommendations for the optimal SSL/TLS encryption mode.
title: SSL/TLS Recommender
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

#  SSL/TLS Recommender

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ssl/origin-configuration/ssl-tls-recommender/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The SSL/TLS Recommender helps you choose which [Encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) is best for your application.

Caution

Cloudflare is deprecating our SSL/TLS Recommender in favor of [Automatic SSL/TLS](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/#automatic-ssltls-default).

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |

## Common tasks

### Enable SSL/TLS recommendations

To make sure you do not inadvertently block the **SSL/TLS Recommender**, review your settings to make sure your domain:

* Is accessible.
* Is not blocking requests from our bot (which uses a user agent of `Cloudflare-SSLDetector`).
* Does not have any active, SSL-specific [Page Rules](https://developers.cloudflare.com/rules/page-rules/) or [Configuration rules](https://developers.cloudflare.com/rules/configuration-rules/).

Then, you can enable the SSL/TLS recommender.

To enable SSL/TLS recommendations in the dashboard:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.
[ Go to **Overview** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. For **SSL/TLS Recommender**, switch the toggle to **On**.

To adjust your SSL/TLS Recommender enrollment with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/ssl/subresources/recommendations/methods/get/) request with the `enabled` parameter set to your desired setting (`true` or `false`).

### Manually trigger a new scan

Once you enable it, the recommender runs future scans periodically — typically every two days — and sends notifications if new recommendations become available.

To manually re-trigger a new scan, disable and then [re-enable SSL/TLS recommendations](#enable-ssltls-recommendations).

## How it works

Once enabled, the SSL/TLS Recommender runs an origin scan using the user agent `Cloudflare-SSLDetector` and ignores your `robots.txt` file (except for rules explicitly targeting the user agent).

Based on this initial scan, the Recommender may decide that you could use a stronger [SSL encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/). It will never recommend a weaker option than what is currently configured.

If so, it will send the application owner an email with the recommended option and add a _Recommended by Cloudflare_ tag to that option on the **SSL/TLS** page. You are not required to use this recommendation.

If you do not receive an email, keep your current **SSL encryption mode**.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-tls-recommender/#page","headline":"SSL/TLS Recommender · Cloudflare SSL/TLS docs","description":"Get recommendations for the optimal SSL/TLS encryption mode.","url":"https://developers.cloudflare.com/ssl/origin-configuration/ssl-tls-recommender/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
