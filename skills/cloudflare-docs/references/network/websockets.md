---
title: WebSockets
description: Cloudflare supports proxied WebSocket connections without additional configuration.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/network/websockets.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# WebSockets

Cloudflare supports proxied WebSocket connections without additional configuration.

## Background

WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming.

## Enable WebSockets

* [ Dashboard ](#tab-panel-5417)
* [ API ](#tab-panel-5418)

To enable **WebSockets** connections to your origin server in the dashboard:

1. In the Cloudflare dashboard, go to the **Network** page.  
[ Go to **Network** ](https://dash.cloudflare.com/?to=/:account/:zone/network)
2. For **WebSockets**, switch the toggle to **On**.

To enable **WebSockets** connections to your origin server with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `websockets` as the setting name in the URI path, and the `value` parameter set to `"on"`.

## Compatibility notes

| Product                                                                   | Compatible | Notes                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Argo](https://developers.cloudflare.com/argo-smart-routing/)             | No         | Argo is not compatible with WebSockets.                                                                                                                                                                                                                          |
| [SSL](https://developers.cloudflare.com/ssl/)                             | Yes        |                                                                                                                                                                                                                                                                  |
| [WAF](https://developers.cloudflare.com/waf/)                             | Yes\*      | The initial HTTP 101 request is subject to WAF managed rules, custom rules, rate limiting rules, and other WAF features like any other WebSockets connection. However, once a connection has been established, the WAF does not perform any further inspections. |
| [Workers](https://developers.cloudflare.com/workers/examples/websockets/) | Yes        | You can also use [Durable Objects](https://developers.cloudflare.com/durable-objects/) as an endpoint for WebSocket sessions, giving you full control over messages sent to and from clients.                                                                    |

Note

Cloudflare also supports [ASP.NET SignalR ↗](http://signalr.net/), which helps negotiate which transport method to use (long polling or WebSockets).

## Availability

WebSockets are supported on all Cloudflare plans.

## Requests and Bandwidth measurement

Given the nature of WebSocket connections, you may notice they differ from typical HTTP traffic in terms of requests and bandwidth usage. If you are an Enterprise customer, it is important to consider how Cloudflare measures requests and bandwidth to accurately estimate your usage.

Cloudflare measures a single WebSocket connection in the following way:

* **Requests**: Cloudflare recognizes only the initial upgrade request per WebSocket connection as an HTTP request. Even though you can send a bidirectional message stream through the established WebSocket connection, it will be counted as a single long-lived HTTP request.
* **Bandwidth**: Cloudflare measures data transfer sent from Cloudflare to the client. This typically means that messages from the WebSocket server behind Cloudflare to the WebSocket client are counted towards bandwidth usage.

Once a WebSocket connection is closed, you can view your aggregated WebSocket usage through [Traffic Analytics](https://developers.cloudflare.com/analytics/account-and-zone-analytics/zone-analytics/#traffic), the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/), and [HTTP requests logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/).

## Technical note

When Cloudflare releases new code to its global network, we may restart servers, which terminates WebSockets connections.

### Best practices

* Implement a [keepalive ↗](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets%5FAPI/Writing%5FWebSocket%5Fservers#pings%5Fand%5Fpongs%5Fthe%5Fheartbeat%5Fof%5Fwebsockets).
* Review and then remove or extend timeout settings on the origin and/or on the client.

### Troubleshooting

Investigating issues with Websocket can be facilitated with client tools like [wscat ↗](https://github.com/websockets/wscat). Being able to reproduce an issue on a single URL with a minimalistic tool helps narrowing down the issue.

The `EdgeStartTimestamp` and `EdgeStopTimestamp` fields in [HTTP requests logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/) represent the duration of the WebSocket connection (they do not represent the initial HTTP connection).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network/","name":"Network"}},{"@type":"ListItem","position":3,"item":{"@id":"/network/websockets/","name":"WebSockets"}}]}
```
