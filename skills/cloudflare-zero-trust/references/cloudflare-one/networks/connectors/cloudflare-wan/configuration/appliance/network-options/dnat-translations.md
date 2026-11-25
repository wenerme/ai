---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Use destination NAT on a Cloudflare One Appliance LAN to reach remote subnets through a local pre-NAT prefix, including remote networks that overlap your local addresses.
title: DNAT translations
image: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dnat-translations/og.png?v=018925b24f604f6b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# DNAT translations

DNAT (destination network address translation) translations let hosts on a Cloudflare One Appliance (formerly Magic WAN Connector) LAN reach a remote subnet through a different local prefix. A remote subnet is a network your Appliance reaches through Cloudflare WAN (formerly Magic WAN), such as a data center connected over an IPsec tunnel. For each translation, you map:

- A **pre-NAT prefix**: The prefix that hosts on the LAN send traffic to. This is a local alias for the remote subnet.
- A **post-NAT prefix**: The real prefix of the remote subnet, reachable through Cloudflare. It must be the same size as the pre-NAT prefix.

Use DNAT translations when:

- The remote subnet uses the same addresses as your local network. For example, a data center service and your site both use `10.1.1.0/24`. Hosts on the LAN reach the remote service through a pre-NAT prefix that does not conflict.
- You do not want to add routes for the remote subnet to your local network. Hosts reach the remote subnet through a pre-NAT prefix that already routes to the Appliance.

Note

Your Appliance must be running OS version 2026.11.2 or later to apply DNAT translations. This version deploys automatically. Earlier versions accept the configuration but do not apply it.

## How DNAT translations work

The Appliance translates addresses statically and 1:1 between the pre-NAT prefix and the post-NAT prefix, in both directions:

- For traffic from the LAN to an address in the pre-NAT prefix, the Appliance replaces the destination address with the matching address in the post-NAT prefix, and sends the traffic to Cloudflare WAN.
- For traffic from Cloudflare WAN with a source address in the post-NAT prefix, the Appliance replaces the source address with the matching address in the pre-NAT prefix, before it forwards the traffic to the LAN.

Hosts on the LAN only see the remote subnet's addresses in the pre-NAT prefix. The translation is stateless, so it works for connections started from either side.

DNAT translations change destination addresses. To change the source addresses of your LAN, which makes the LAN unique in the Cloudflare WAN overlay, use [static NAT for a subnet](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/nat-subnet/). You can use both on the same LAN. The Appliance applies both translations to the same packet.

## Rules

- Both prefixes must be IPv4 CIDR prefixes with no host bits set. For example, use `10.20.0.0/24`, not `10.20.0.1/24`. In the dashboard, if you enter a single IP address, it becomes a `/32` prefix.
- The pre-NAT prefix and the post-NAT prefix must be the same size.
- Pre-NAT prefixes cannot overlap the LAN's static address, its routed subnets, or other pre-NAT prefixes on the same LAN.
- Post-NAT prefixes cannot overlap other post-NAT prefixes on the same LAN. A post-NAT prefix can overlap your local subnets.
- The LAN must use a static address.
- The post-NAT prefix must be reachable through Cloudflare WAN, for example through a [static route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-routes/) to an IPsec tunnel.
- Hosts on the LAN must send traffic for the pre-NAT prefix to the Appliance. This happens automatically when the Appliance is their default gateway.

## Example

A site and a remote data center both use `10.1.1.0/24`. The data center connects to Cloudflare WAN over an IPsec tunnel. Hosts at the site need to reach a service at `10.1.1.20` in the data center.

Configure the LAN at the site with:

- A **Static NAT prefix** of `10.200.1.0/24` for the LAN's `10.1.1.0/24` subnet. Without it, return traffic to the site's hosts would go to the data center instead, because `10.1.1.0/24` in Cloudflare WAN already routes to the data center.
- A DNAT translation with a **Pre-NAT prefix** of `100.64.1.0/24` and a **Post-NAT prefix** of `10.1.1.0/24`.

```
flowchart LR
  accTitle: DNAT translation with static NAT
  accDescr: A LAN host sends traffic to a pre-NAT address. The Appliance translates the destination to the post-NAT address and the source to the static NAT address, then sends the traffic through Cloudflare to the data center.
  a(Host 10.1.1.50) -->|dst 100.64.1.20| b(Cloudflare One Appliance)
  b -->|src 10.200.1.50 dst 10.1.1.20| c(Cloudflare WAN) --> d(Data center 10.1.1.20)

  classDef orange fill:#f48120,color: black
  class b,c orange
```

In this case:

- A host at `10.1.1.50` connects to `100.64.1.20`. The Appliance changes the destination to `10.1.1.20`, and the static NAT prefix changes the source to `10.200.1.50`.
- The data center replies from `10.1.1.20` to `10.200.1.50`. The Appliance changes the source back to `100.64.1.20`, and the destination back to `10.1.1.50`.

## Configure DNAT translations

1. Go to the **Appliances** page.

[Go to **Appliances** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections/appliances)

2. Go to **Profiles**.
3. Find the Appliance you want to configure > select the three dots next to it > **Edit**.
4. Go to **Network configuration** > **LAN configuration**.
5. Find the LAN you want to edit > select the three dots next to it > **Edit**. You can also select **Create** to create a new LAN.
6. In **DNAT translations**, select **Add DNAT translation**.
7. In **Pre-NAT prefix**, enter the prefix that hosts on the LAN will use to reach the remote subnet. For example, `100.64.1.0/24`.
8. In **Post-NAT prefix**, enter the real prefix of the remote subnet. For example, `10.1.1.0/24`.
9. (Optional) Repeat steps 6-8 to add more translations.
10. Select **Save**.

To remove a translation, select the delete button next to it, then select **Save**.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

Set the `remote_subnets` array when you [create](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/create/) or [update](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/edit/) a LAN. Each item has a `local_alias_prefix` (the pre-NAT prefix) and a `remote_prefix` (the post-NAT prefix).

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Magic WAN Write</code>
- <code>Magic Transit Write</code>

</details>

*Patch Site LANbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"remote_subnets": [
				{
						"local_alias_prefix": "100.64.1.0/24",
						"remote_prefix": "10.1.1.0/24"
				}
		]
	}'
```

The array you send replaces all existing translations on the LAN. If you leave out `remote_subnets` in an update, the existing translations stay. To remove all translations, send an empty array (`"remote_subnets": []`).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dnat-translations/#page","headline":"DNAT translations","description":"Use destination NAT on a Cloudflare One Appliance LAN to reach remote subnets through a local pre-NAT prefix, including remote networks that overlap your local addresses.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dnat-translations/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dnat-translations/og.png?v=018925b24f604f6b","dateModified":"2026-11-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
