---
title: Enhanced HTTP/2 Prioritization
description: With Enhanced HTTP/2 Prioritization, Cloudflare delivers resources in the optimal order for the fastest experience across all browsers. It also supports control of content delivery when used in conjunction with Workers.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/protocol/enhanced-http2-prioritization.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Enhanced HTTP/2 Prioritization

With Enhanced HTTP/2 Prioritization, Cloudflare delivers resources in the optimal order for the fastest experience across all browsers. It also supports control of content delivery when used in conjunction with [Workers](https://developers.cloudflare.com/workers/).

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | No  | Yes      | Yes        | Yes |

## How it works

The speed of loading web content, from the user’s perspective, is dependent on the order in which the resources load. With HTTP/2, by default, Cloudflare will follow the order requested by the browser. This ordering varies from browser to browser, causing a significant difference in performance.

With Enhanced HTTP/2 Prioritization, Cloudflare overrides the default browser behavior to optimize the order of resource delivery, independent of the browser. The greatest improvements will be experienced by visitors using Safari and Edge browsers.

For more details, refer to [the introductory blog post ↗](https://blog.cloudflare.com/better-http-2-prioritization-for-a-faster-web/).

## Enable Enhanced HTTP/2 Prioritization

* [ Dashboard ](#tab-panel-6505)
* [ API ](#tab-panel-6506)

To enable **Enhanced HTTP/2 Prioritization** in the Cloudflare dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Speed** \> **Settings**.
4. Go to **Protocol Optimization**.
5. For **Enhanced HTTP/2 Prioritization**, switch the toggle to **On**.

To enable **Enhanced HTTP/2 Prioritization** using the Cloudflare API, send a [PATCH request](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) with `h2_prioritization` as the setting name in the URI path, and the `value` parameter set to `"on"`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/protocol/","name":"Protocol optimization"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/protocol/enhanced-http2-prioritization/","name":"Enhanced HTTP/2 Prioritization"}}]}
```
