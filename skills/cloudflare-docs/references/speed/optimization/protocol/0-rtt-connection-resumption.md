---
title: 0-RTT Connection Resumption
description: Resume TLS connections faster with zero round-trip time.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/protocol/0-rtt-connection-resumption.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# 0-RTT Connection Resumption

Zero round trip time resumption (0-RTT) improves performance for clients who have previously connected to your website, reducing latency for returning users. This feature is especially beneficial for those who frequently visit your application or connect over mobile networks.

We support 0-RTT for GET, HEAD, and OPTIONS requests, facilitating faster responses for these types of requests. Note that 0-RTT is not supported for POST requests.

In line with 0-RTT standards, we add the `Early-Data: 1` header to 0-RTT requests, which allows origin servers to identify when a request has used 0-RTT resumption. Customers should be able to see the `Early-Data: 1` header for any 0-RTT requests connecting to their origin.

For more information on 0-RTT, including its functionality and potential limitations, refer to our [blog post ↗](https://blog.cloudflare.com/even-faster-connection-establishment-with-quic-0-rtt-resumption/).

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## Enable 0-RTT Connection Resumption

By default, 0-RTT Connection Resumption is not enabled on your Cloudflare application.

* [ Dashboard ](#tab-panel-8984)
* [ API ](#tab-panel-8985)

To enable 0-RTT Connection Resumption in the dashboard:

1. In the Cloudflare dashboard, go to the **Speed** \> **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/speed/optimization)
2. Go to the **Protocol Optimization** tab and under **0-RTT Connection Resumption**, switch the toggle to **On**.

To adjust your 0-RTT Connection Resumption settings with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `0rtt` as the setting name in the URI path, and the `value` parameter set to `"on"` or `"off"`.

Note

The 0-RTT Connection Resumption is only established between the client and Cloudflare. It does not extend to the origin server.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/protocol/","name":"Protocol optimization"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/protocol/0-rtt-connection-resumption/","name":"0-RTT Connection Resumption"}}]}
```
