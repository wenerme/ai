---
description: Proxy public hostnames to private origins through Cloudflare Mesh.
title: Set up a private origin via Cloudflare Mesh
image: https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-mesh/og.png?v=5b0f1a7348ce5b3d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up a private origin via Cloudflare Mesh

Last updated Nov 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-mesh/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide walks you through proxying public hostnames to origins on a private network. The private network is reachable through [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/). The CDN, WAF, Cache, and other proxied features apply to this traffic the same way they apply to traffic destined for public origins.

## Before you begin

Confirm the following before you start:

- **Private Origins available on your account**: contact your account team to enable it.
- **Unified Routing enabled**: your account must be on [Unified Routing](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#unified-routing) to use a private Cloudflare source range. Contact your account team to enable it. This applies to new and existing accounts.
- **A Mesh node in the origin's network**: run a Mesh node on a host that can reach the origin, with a route covering the origin IP in your **default virtual network**. A single Mesh node can serve multiple origins. Refer to [Mesh routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/features/routes/) and [Get started with Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/).
- **Return routes for the Cloudflare source IP ranges**: in the origin's network, add routes that send `100.64.0.0/12` (or your configured private `/12`) and `2606:4700:cf1:5000::/64` back to the Mesh node, and allow both ranges in the origin's firewall.

## 1. Create a DNS record with private network routing

Create an `A` or `AAAA` record that points to the private IP address of your origin, with proxy status enabled and **Use private network routing** turned on. This tells Cloudflare to send traffic for the hostname through your Mesh network instead of over the public Internet.

For the dashboard and API steps, refer to [Private network routing](https://developers.cloudflare.com/dns/private-origins/private-network-routing/).

## 2. Verify end-to-end connectivity

After the DNS record is in place, validate the path from the Cloudflare network through your Mesh network to the origin.

### Check node health

In the Cloudflare dashboard, confirm that the Mesh node in the origin's network is connected and healthy.

### Send a request from an external client

From a machine outside your private network, send an HTTPS request to the proxied hostname:

```bash
curl -v https://<YOUR_DOMAIN>/
```

A successful response confirms that Cloudflare accepted the request, applied your proxied features, and reached the origin through the Mesh network.

### Confirm traffic on the origin

On the origin VM, verify that requests are arriving from the Cloudflare source IP ranges. To watch for incoming traffic on port `443`:

```bash
sudo tcpdump -n -i any 'src net 100.64.0.0/12 and dst port 443'
```

For IPv6:

```bash
sudo tcpdump -n -i any 'src net 2606:4700:cf1:5000::/64 and dst port 443'
```

Replace `100.64.0.0/12` with the source range configured for your account, and adjust the port to match the listener on your origin.

## Common pitfalls

| Symptom | Cause and fix |
| --- | --- |
| Requests time out, nothing comes back | No return route for the Cloudflare source IP ranges. Add routes that send them back to the Mesh node. |
| Traffic never reaches the Mesh node | The route to the origin is in a non-default virtual network. Move it to the default virtual network. |
| Traffic tries to route over the public Internet | The **Use private network routing** toggle is not turned on for the DNS record. Edit the record and turn the toggle on. |

## Next steps

- Review the [Private network routing](https://developers.cloudflare.com/dns/private-origins/private-network-routing/) reference for dashboard and API details.
- If traffic is not reaching your origin, refer to [Troubleshooting](https://developers.cloudflare.com/dns/private-origins/troubleshooting/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-mesh/#page","headline":"Set up a private origin via Cloudflare Mesh","description":"Proxy public hostnames to private origins through Cloudflare Mesh.","url":"https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-mesh/","inLanguage":"en","image":"https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-mesh/og.png?v=5b0f1a7348ce5b3d","dateModified":"2026-11-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
