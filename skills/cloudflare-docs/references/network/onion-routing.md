---
title: Onion Routing and Tor support
description: Serve content directly through the Tor network with Onion Routing.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Onion Routing and Tor support

Improve the Tor user experience by enabling Onion Routing, which enables Cloudflare to serve your website’s content directly through the Tor network and without requiring exit nodes.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## How it works

Onion Routing helps improve Tor browsing as follows:

* Tor users no longer access your site via exit nodes, which can sometimes be compromised, and may snoop on user traffic.
* Human Tor users and bots can be distinguished by our Onion services, such that interactive challenges are only served to malicious bot traffic.

[Tor Browser ↗](https://tb-manual.torproject.org/about/) users receive an [alt-svc header ↗](https://httpwg.org/specs/rfc7838.html#alt-svc) as part of the response to the first request to your website. The browser then creates a Tor Circuit to access this website using the `.onion` TLD service provided by this header.

You should note that the visible domain in the user interface remains unchanged, as the host header and the SNI are preserved. However, the underlying connection changes to be routed through Tor, as the [UI denotes on the left of the address bar ↗](https://tb-manual.torproject.org/managing-identities/#managing-identities) with a Tor Circuit. Cloudflare does not provide a certificate for the `.onion` domain provided as part of alt-svc flow, which therefore cannot be accessed via HTTPS.

## Enable Onion Routing

* [ Dashboard ](#tab-panel-7914)
* [ API ](#tab-panel-7915)

To enable **Onion Routing** in the dashboard:

1. In the Cloudflare dashboard, go to the **Network** page.  
[ Go to **Network** ](https://dash.cloudflare.com/?to=/:account/:zone/network)
2. For **Onion Routing**, switch the toggle to **On**.

To enable **Onion Routing** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `opportunistic_onion` as the setting name in the URI path, and the `value` parameter set to `"on"`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network/","name":"Network"}},{"@type":"ListItem","position":3,"item":{"@id":"/network/onion-routing/","name":"Onion Routing and Tor support"}}]}
```
