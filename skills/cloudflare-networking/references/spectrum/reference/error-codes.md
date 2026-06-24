---
title: Error codes
description: Error codes returned by the Cloudflare Spectrum API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Error codes

This page documents validation error codes returned by the [Spectrum API](https://developers.cloudflare.com/api/resources/spectrum/subresources/apps/) when creating or updating Spectrum applications.

## How errors are returned

Spectrum API errors follow the standard Cloudflare v4 error envelope. The response body includes an `errors` array with `code` and `message` fields:

```
{  "errors": [    {      "code": 11044,      "message": "no matching routes in the specified virtual network"    }  ],  "messages": [],  "success": false,  "result": null}
```

Look up the `code` in the sections below for the cause and resolution.

## Virtual network origin errors

The following codes are returned by `POST /zones/:zone/spectrum/apps` and `PATCH /zones/:zone/spectrum/apps/:id` when validating an application that uses a [virtual network origin](https://developers.cloudflare.com/spectrum/reference/configuration-options/#virtual-network-origin).

### Virtual network requires origin direct (11041)

`virtual_network_id` was set on a request that uses `origin_dns`. Virtual network origins are only supported with IP-based origins.

**Resolution:** Replace `origin_dns` with `origin_direct` and provide the private IP and single port that the virtual network routes to.

### Virtual network requires single origin (11042)

`origin_direct` contained more than one address. Virtual network origins must resolve to a single private IP and port.

**Resolution:** Reduce `origin_direct` to a single entry of the form `tcp://<ip>:<port>` or `udp://<ip>:<port>`.

### Virtual network no port range (11043)

The request included a port range, either in `origin_port` or in the `origin_direct` address. Virtual network origins do not support port ranges.

**Resolution:** Use a single port instead of a range. If you need to expose multiple ports, create a separate Spectrum application per port.

### Virtual network route not found (11044)

The combination of IP and `virtual_network_id` does not match any route in the specified virtual network. This covers two cases: the virtual network does not exist, or the IP is not routable within the virtual network you specified.

**Resolution:**

* Confirm `virtual_network_id` matches a virtual network on your account. You can list virtual networks with the [List virtual networks](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/virtual%5Fnetworks/methods/list/) endpoint.
* Confirm the origin IP is within a route attached to that virtual network. You can list routes with the [List network routes](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/methods/list/) endpoint.
* If no matching route exists, add one by following [Connect an IP/CIDR](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/).

### Virtual network invalid UUID (11045)

`virtual_network_id` is not a valid UUID.

**Resolution:** Provide a UUID. Virtual network IDs are returned by the [List virtual networks](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/virtual%5Fnetworks/methods/list/) endpoint in the `id` field of each entry.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/reference/error-codes/#page","headline":"Error codes · Cloudflare Spectrum docs","description":"Error codes returned by the Cloudflare Spectrum API.","url":"https://developers.cloudflare.com/spectrum/reference/error-codes/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/spectrum/","name":"Spectrum"}},{"@type":"ListItem","position":3,"item":{"@id":"/spectrum/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/spectrum/reference/error-codes/","name":"Error codes"}}]}
```
