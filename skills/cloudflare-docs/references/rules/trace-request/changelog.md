---
title: Cloudflare Trace changelog
description: Track the latest updates and changes to Trace requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/trace-request/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Cloudflare Trace changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/rules/trace-request/changelog/index.xml)

## 2024-04-15

**Cloudflare Trace now supports Workers**

Starting today, customers can use Cloudflare Trace to confirm if a request to a specific URL within their zone is routed through a [Workers script](https://developers.cloudflare.com/workers/).

## 2024-03-18

**Cloudflare Trace now supports BYOIP zones**

Customers can now use Cloudflare Trace to trace HTTP/S requests through their [BYOIP](https://developers.cloudflare.com/byoip/) zones.

## 2024-03-12

**Cloudflare Trace now supports grey-clouded hostnames**

Even if the hostname is [not proxied by Cloudflare](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records), Cloudflare Trace will now return all the configurations that Cloudflare would have applied to the request.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/trace-request/","name":"Trace a request"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/trace-request/changelog/","name":"Cloudflare Trace changelog"}}]}
```
