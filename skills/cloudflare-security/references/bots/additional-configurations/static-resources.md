---
description: Extend bot protection to static resources like images, CSS, and JavaScript files.
title: Static resource protection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Static resource protection

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/bots/additional-configurations/static-resources/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Pro, Business, and Enterprise customers can use Cloudflare's bot solutions to protect their static resources from bots.

Warning

If you enable static resource protection, you may block good bots — like mail clients — that routinely fetch static resources. Make sure you understand your existing infrastructure before enabling this feature.

## Super Bot Fight Mode

To enable this feature as a Pro or Business customer or an Enterprise customer without Bot Management:

1. In the Cloudflare dashboard, go to the **Security Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Super Bot Fight Mode**.
4. Under **Configurations**, select the edit icon for **Static resource protection** and turn it on.

Caution

The **Static Resource Protection** setting will only activate if at least one of the bot categories (definite, likely, or verified) is _not_ set to `Allow`. If all categories are set to `Allow`, this setting will not have any impact since it works alongside these bot settings as part of the managed rules.

## Bot Management for Enterprise

Static resources are protected by default when you create [custom rules](https://developers.cloudflare.com/waf/custom-rules/) using `cf.bot_management.score`.

To exclude static resources, you would need to include `not (cf.bot_management.static_resource)` as part of your custom rule.

## Which files are protected?

Static resources are files with the following extensions:

`ico|jpg|png|jpeg|gif|css|js|tif|tiff|bmp|pict|webp|svg|svgz|class|jar|txt|csv|doc|docx|xls|xlsx|pdf|ps|pls|ppt|pptx|ttf|otf|woff|woff2|eot|eps|ejs|swf|torrent|midi|mid|m3u8|m4a|mp3|ogg|ts`

Additionally, the `/.well-known/` URL path and all elements in it are considered a static resource, regardless of the file extension.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/additional-configurations/static-resources/#page","headline":"Static resource protection · Cloudflare bot solutions docs","description":"Extend bot protection to static resources like images, CSS, and JavaScript files.","url":"https://developers.cloudflare.com/bots/additional-configurations/static-resources/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
