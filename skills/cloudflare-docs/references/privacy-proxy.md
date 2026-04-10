---
title: Privacy Proxy
description: Privacy Proxy is a managed proxy service that runs on Cloudflare's global network. It uses the MASQUE protocol suite to proxy TCP and UDP traffic via HTTP CONNECT and CONNECT-UDP methods over HTTP/2 and HTTP/3.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/privacy-proxy/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Privacy Proxy

A MASQUE-based forward proxy that protects user privacy while preserving geolocation accuracy.

 Enterprise-only 

Privacy Proxy is a managed proxy service that runs on Cloudflare's global network. It uses the [MASQUE ↗](https://datatracker.ietf.org/wg/masque/about/) protocol suite to proxy TCP and UDP traffic via HTTP CONNECT and CONNECT-UDP methods over HTTP/2 and HTTP/3.

Privacy Proxy separates user identity from user activity. Users authenticate to the proxy without revealing which destinations they visit, and destination servers see requests from Cloudflare IP addresses without learning who made them.

Privacy Proxy powers services like [Microsoft Edge Secure Network ↗](https://blog.cloudflare.com/cloudflare-now-powering-microsoft-edge-secure-network/) and serves as a second-hop relay for [iCloud Private Relay ↗](https://blog.cloudflare.com/icloud-private-relay/).

---

## Features

###  Single-hop deployment 

Deploy Privacy Proxy as a standalone proxy where Cloudflare handles authentication, proxying, and egress.

[ Use Single-hop deployment ](https://developers.cloudflare.com/privacy-proxy/concepts/deployment-models/#single-hop) 

###  Double-hop deployment 

Operate your own first-hop proxy to authenticate users, then relay traffic through Cloudflare for additional privacy separation.

[ Use Double-hop deployment ](https://developers.cloudflare.com/privacy-proxy/concepts/deployment-models/#double-hop) 

###  Geolocation preservation 

Maintain accurate geolocation for users without exposing their real IP addresses, ensuring location-relevant content and services work correctly.

[ Use Geolocation preservation ](https://developers.cloudflare.com/privacy-proxy/concepts/geolocation/) 

###  Privacy Pass authentication 

Authenticate users with Privacy Pass tokens for production deployments, ensuring privacy-preserving access control.

[ Use Privacy Pass authentication ](https://developers.cloudflare.com/privacy-proxy/concepts/authentication/) 

---

## Related products

**[Privacy Gateway](https://developers.cloudflare.com/privacy-gateway/)** 

Implements the Oblivious HTTP (OHTTP) standard for request-level privacy, hiding client IP addresses from application backends.

**[WARP Client](https://developers.cloudflare.com/warp-client/)** 

Cloudflare's consumer VPN application that uses similar privacy-preserving proxy technology.

---

## Availability

Privacy Proxy is available as a managed service for Enterprise customers. [Contact us ↗](https://www.cloudflare.com/lp/privacy-edge/) to discuss your use case and get started.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-proxy/","name":"Privacy Proxy"}}]}
```
