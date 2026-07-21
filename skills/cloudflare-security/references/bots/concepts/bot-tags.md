---
description: Tags that explain why Cloudflare assigned a specific bot score to a request.
title: Bot tags
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

#  Bot tags

Last updated Apr 15, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/bots/concepts/bot-tags/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Bot tags provide more detail about _why_ Cloudflare assigned a [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) to a request.

Use these tags to learn more about your bot traffic and better inform security settings.

Note

Bot tags are only available to Enterprise customers who have purchased Bot Management.

## Potential values

Once you [enable bot tags](#enable-bot-tags), you can see more information about bot requests, such as whether a request came from a verified bot (like Bing) or a category of verified bot (like SearchEngine).

The following values are **examples** of what may be present in the `BotTags` log field, but not an exhaustive list:

* api
* google
* bing
* googleAds
* googleMedia
* googleImageProxy
* pinterest
* newRelic
* baidu
* apple
* yandex

## Enable bot tags

To enable bot tags, include the `BotTags` log field when using our [Logpush service](https://developers.cloudflare.com/logs/logpush/).

## Limitations

Currently, bot tags are only available in log fields.

Future work will add more values and extend bot tags to other Cloudflare products.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/concepts/bot-tags/#page","headline":"Bot tags · Cloudflare bot solutions docs","description":"Tags that explain why Cloudflare assigned a specific bot score to a request.","url":"https://developers.cloudflare.com/bots/concepts/bot-tags/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
