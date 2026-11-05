---
description: Route DNS record traffic to private origins through tunnels.
title: Private network routing
image: https://developers.cloudflare.com/dns/private-origins/private-network-routing/og.png?v=ac5f8d787e9afea5
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Private network routing

Last updated Nov 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/dns/private-origins/private-network-routing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Private network routing allows you to proxy HTTP/HTTPS traffic from public hostnames to origins in your private network. When you enable this setting on a DNS record, Cloudflare reaches the origin over your private network connectivity instead of the public Internet.

For end-to-end setup, refer to the guide for your connectivity type: [Cloudflare WAN](https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-wan/), [Cloudflare Tunnel](https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-tunnel/), or [Cloudflare Mesh](https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-mesh/).

Closed beta

This feature is in closed beta. Contact your account team to request access.

## Aspects to consider

Before you enable private network routing, consider the following:

- Private Origins needs to be available on your account and you need a working connection to your private network through Cloudflare WAN (IPsec, GRE, or CNI), Cloudflare Tunnel, or Cloudflare Mesh. The route to the origin must be in your default virtual network.
- If you connect over Cloudflare WAN or Cloudflare Mesh, your account must be on [Unified Routing](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#unified-routing). Contact your account team to enable it. This applies to new and existing accounts. Cloudflare Tunnel does not need Unified Routing.
- Private network routing is available for `A` (IPv4) and `AAAA` (IPv6) records only. Records must be [proxied](https://developers.cloudflare.com/dns/proxy-status/).
- If you have multiple `A` or `AAAA` records on the same name, and at least one of them has private network routing enabled, all records on that name will use private network routing. This is consistent with the [proxy status behavior](https://developers.cloudflare.com/dns/proxy-status/#mix-proxied-and-unproxied) in these cases.

## Automatically detected ranges

The following private address ranges are automatically detected:

| Range | Description |
| --- | --- |
| `10.0.0.0/8` | Private ([RFC 1918 ↗︎](https://www.rfc-editor.org/rfc/rfc1918.html)) |
| `172.16.0.0/12` | Private ([RFC 1918 ↗︎](https://www.rfc-editor.org/rfc/rfc1918.html)) |
| `192.168.0.0/16` | Private ([RFC 1918 ↗︎](https://www.rfc-editor.org/rfc/rfc1918.html)) |
| `fc00::/7` | Private ([RFC 4193 ↗︎](https://www.rfc-editor.org/rfc/rfc4193.html)) |
| `100.64.0.0/10` | CGNAT ([RFC 6598 ↗︎](https://www.rfc-editor.org/rfc/rfc6598.html)) |

Caution

`100.64.0.0/10` is detected as private, but the default Cloudflare source range `100.64.0.0/12` sits inside it. If your origins use addresses in `100.64.0.0/12`, [change the Cloudflare source IP range](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/) to a different private `/12` before you enable private network routing.

When you use an IP address from one of these ranges, the **Use private network routing** toggle turns on automatically. You can also turn it on manually for public IP addresses that are only reachable through your tunnel.

## Cloudflare source IP ranges

When Cloudflare reaches an origin over Cloudflare WAN or Cloudflare Mesh, traffic comes from the Cloudflare source IP ranges:

| IP version | Range | Configurable |
| --- | --- | --- |
| IPv4 | `100.64.0.0/12` (default) | Yes, to another private `/12` |
| IPv6 | `2606:4700:cf1:5000::/64` | No |

Add return routes in your private network that send these ranges back to Cloudflare, and allow them in your origin's firewall. Refer to [Configure Cloudflare source IPs](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/).

Behind Cloudflare Tunnel, your origin sees the host running `cloudflared` as the source instead.

## Enable private network routing

Virtual networks

Traffic routes through your default virtual network. Selecting a specific virtual network is not supported.

1. In the Cloudflare dashboard, go to the **DNS Records** page. [Go to **Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Add record** or select **Edit** on an existing `A` or `AAAA` record.
3. Enter the origin IP address.
4. Verify that **Proxy status** is enabled (orange cloud).
5. Turn on **Use private network routing**.

   For [private IP addresses](#automatically-detected-ranges) (for example, `10.0.0.50`), the toggle turns on automatically. For public IP addresses used with private infrastructure, turn on the toggle manually.
6. Select **Save**.

To create a record with private routing enabled, use a [POST request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) and set `private_routing` to `true`:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>DNS Write</code>

</details>

*Create DNS Recordbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"type": "A",
		"name": "app.example.com",
		"content": "10.0.0.50",
		"proxied": true,
		"private_routing": true
	}'
```

To enable private routing on an existing record, use a [PATCH request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/edit/):

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>DNS Write</code>

</details>

*Update DNS Recordbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$DNS_RECORD_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"private_routing": true
	}'
```

### API field behavior

If you use the API to create or edit DNS records with private network routing, consider the following:

| Scenario | `private_routing` value |
| --- | --- |
| Proxied `A`/`AAAA` record with private IP | Auto-set to `true` |
| Proxied `A`/`AAAA` record with public IP | Defaults to `false` |
| Non-`A`/`AAAA` record types | Field not supported |

Also, if you manually set `private_routing: false` on a proxied `A`/`AAAA` record with private IP, the API will return an error.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/private-origins/private-network-routing/#page","headline":"Private network routing","description":"Route DNS record traffic to private origins through tunnels.","url":"https://developers.cloudflare.com/dns/private-origins/private-network-routing/","inLanguage":"en","image":"https://developers.cloudflare.com/dns/private-origins/private-network-routing/og.png?v=ac5f8d787e9afea5","dateModified":"2026-11-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
