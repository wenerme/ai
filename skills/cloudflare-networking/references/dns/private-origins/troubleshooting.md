---
description: Troubleshoot common private network routing and private origin issues.
title: Troubleshooting
image: https://developers.cloudflare.com/dns/private-origins/troubleshooting/og.png?v=21a55a939107386a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshooting

Last updated Nov 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/dns/private-origins/troubleshooting/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Order of checks

Work through these in order:

1. Public side: DNS, TLS, WAF, and other proxied features.
2. Cloudflare to your private network: private network routing is on, and the route to the origin is in your default virtual network.
3. Your connectivity: tunnel or connector health, and routes.
4. Your network: routing, firewall rules, return path, and MSS clamp.

## Error 1002: DNS points to prohibited IP

This error occurs when you proxy a private IP address and your account does not have the Private Origins entitlement. Contact your account team to enable it.

## Setting seems off but traffic routes through tunnel

Check for other records on the same name.

Private network routing applies per name, not per record. If you have multiple `A` or `AAAA` records on the same name and at least one of them has private network routing enabled, all records on that name will use private network routing.

## Traffic not reaching origin

If traffic is not reaching your private origin:

1. Verify your connection is healthy: IPsec, GRE, or CNI tunnel health for Cloudflare WAN, tunnel status for Cloudflare Tunnel, or node status for Cloudflare Mesh.
2. Confirm the route to the origin is in your default virtual network.
3. Confirm the origin IP is routable within your private network.
4. Check that `private_routing` is set to `true` on the DNS record.
5. Verify the record has proxy status enabled.

## Timeouts with no response from the origin

Applies to Cloudflare WAN and Cloudflare Mesh. Check both:

- The Cloudflare source IP range is set to a private `/12`, not a public range.
- Your network has return routes that send the Cloudflare source ranges ( `100.64.0.0/12` or your configured `/12`, and `2606:4700:cf1:5000::/64`) back through your Cloudflare connection.

Refer to [Cloudflare source IP ranges](https://developers.cloudflare.com/dns/private-origins/private-network-routing/#cloudflare-source-ip-ranges).

## Large responses hang or stall

On IPsec tunnels, the MSS clamp is missing or above `1360`. Set the TCP MSS clamp on your tunnels to `1360` or lower.

## Cacheable assets return 403

Known issue with Tiered Cache when the origin is reached over Cloudflare WAN. As a workaround, create a [Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/) that bypasses cache for the affected hostnames. Refer to [Limitations](https://developers.cloudflare.com/dns/private-origins/#limitations).

## 525 or 526 errors

The origin certificate does not match the hostname, or the private CA is not in the Custom Origin Trust Store. Verify the certificate served by the origin and the trust store configuration.

## Origin sees public Cloudflare IPs as the source

The account is on legacy routing. Request Unified Routing through your account team.

## Packets reach the origin but no response returns

An asymmetric return path or a stateful firewall drop. Make sure return traffic goes back through the same connection Cloudflare used to reach the origin.

## Tunnel shows IKE established but health checks fail

ICMP is blocked on the path or the health check is misconfigured. Allow ICMP between the tunnel endpoints and confirm the health check direction is `bidirectional` and type is `reply`.

## Traffic tries to route over the public Internet

The **Use private network routing** toggle is not turned on for the DNS record. Edit the record and turn the toggle on. Refer to [Private network routing](https://developers.cloudflare.com/dns/private-origins/private-network-routing/) for dashboard and API steps.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/private-origins/troubleshooting/#page","headline":"Troubleshooting","description":"Troubleshoot common private network routing and private origin issues.","url":"https://developers.cloudflare.com/dns/private-origins/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/dns/private-origins/troubleshooting/og.png?v=21a55a939107386a","dateModified":"2026-11-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
