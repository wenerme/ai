---
description: Configure the IPv4 range Gateway uses to assign initial resolved IPs for hostname-based traffic.
title: Configure initial resolved IPs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure initial resolved IPs

Last updated Aug 18, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/routes/configure-initial-resolved-ips/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Initial resolved IPs (also called token IPs) are ephemeral addresses that Gateway assigns to DNS queries so it can associate hostname-based traffic with the correct policy or tunnel at the network layer, where hostname information is not usually available. Refer to [Gateway initial resolved IPs](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/#gateway-initial-resolved-ips) for a list of features that depend on this range.

By default, initial resolved IPs are assigned from:

* **IPv4**: `172.64.128.0/20`
* **IPv6**: `2606:4700:0cf1:4000::/64`

This is the default range. You can [configure a custom initial resolved IP range](https://developers.cloudflare.com/cloudflare-one/networks/routes/configure-initial-resolved-ips/) for IPv4 if it conflicts with your existing network.

The IPv6 range is not configurable.

Caution

If you configure a custom IPv4 range within Carrier-Grade NAT (CGNAT) address space, this can lead to [Google Chrome's Local Network Access restrictions](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/#google-chrome-restricts-access-to-private-hostnames), which the public default range avoids.

## Prerequisites

* You have the [Cloudflare One Networks Write](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) permission (for API access), or dashboard access to **Networking** \> **IP addresses** \> **Address space** \> **Custom IPs**.
* Your new range does not conflict with existing routes or other reserved [Cloudflare One subnets](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/) in your account.

## Check your current range

1. Go to **Networking** \> **IP addresses** \> **Address space** \> **Custom IPs**.
[Go to **Custom IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space/custom-ips)
2. Find the row where **Assign to** is **Initial Resolved IP** to see your account's current IPv4 range in the **Prefix** column.

Send a `GET` request to the [Get Initial Resolved IP Subnet](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/subnets/subresources/initial%5Fresolved%5Fip/methods/get/) endpoint for the address family you want to check:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/subnets/initial_resolved_ip/$ADDRESS_FAMILY" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Update your range

1. Go to **Networking** \> **IP addresses** \> **Address space** \> **Custom IPs**.
[Go to **Custom IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space/custom-ips)
2. Find the row where **Assign to** is **Initial Resolved IP**, select the three dots menu, and select **Edit**.
3. Enter your new IPv4 range in **IP address**.
4. Select **Save**.

Send a `PUT` request to the [Update Initial Resolved IP Subnet](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/subnets/subresources/initial%5Fresolved%5Fip/methods/update/) endpoint with your desired network range:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/subnets/initial_resolved_ip/$ADDRESS_FAMILY" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"comment": "example comment",
		"name": "IPv4 Gateway initial resolved IPs",
		"network": "172.64.128.0/20"
	}'
```

The new CIDR must not conflict with existing private routes or other reserved subnets in your account. If it does, the request fails and the response describes the conflicting route or subnet.

Note

Only the IPv4 range is configurable. The IPv6 initial resolved IP range (`2606:4700:0cf1:4000::/64`) is fixed and does not need to be changed to resolve Chromium's Local Network Access restrictions, which do not affect IPv6.

The default IPv4 range is [automatically routed through the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#automatically-managed-ranges) and does not require any Split Tunnel configuration. If you configure a custom range, update your [Split Tunnel configuration](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/#split-tunnel-configuration) so that traffic to the new range routes through the Cloudflare One Client, and remove the old range if it is no longer used by any other reserved IP purpose.

Initial resolved IPs have a TTL of approximately 10 minutes. DNS queries resolved before you change your range continue to use the previous range until that TTL expires. After that, new DNS queries receive an initial resolved IP from the new range.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/routes/configure-initial-resolved-ips/#page","headline":"Configure initial resolved IPs · Cloudflare One docs","description":"Configure the IPv4 range Gateway uses to assign initial resolved IPs for hostname-based traffic.","url":"https://developers.cloudflare.com/cloudflare-one/networks/routes/configure-initial-resolved-ips/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
