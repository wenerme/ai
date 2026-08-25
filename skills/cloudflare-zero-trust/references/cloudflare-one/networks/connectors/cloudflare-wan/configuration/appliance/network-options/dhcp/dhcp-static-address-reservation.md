---
description: DHCP static address reservation in Zero Trust networking.
title: DHCP static address reservation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# DHCP static address reservation

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-static-address-reservation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you configure your Cloudflare One Appliance (formerly Magic WAN Connector) to be a DHCP server, you can also assign IP addresses to specific devices on your network. To reserve IP addresses:

1. Configure your Cloudflare One Appliance to be a [DHCP server](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-server/).
2. Select **Add DHCP Reservation**.
3. In **Hardware Address** enter the [MAC address ↗](https://en.wikipedia.org/wiki/MAC%5Faddress) for the device you want a specific IP address for.
4. In **IP Address**, enter the IP address for that device.
5. (Optional) If you need to reserve more IP addresses, select **Add DHCP Reservation** as many times as needed, and enter the new values.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

Create a [PUT request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/sites/subresources/lans/methods/update/) to update the LAN where you want to reserve addresses:

Example:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Magic WAN Write`
* `Magic Transit Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"lan": {
				"static_addressing": {
						"dhcp_server": {
								"reservations": {
										"<HARDWARE_MAC_ADDRESS>": "<IP_ADDRESS>",
										"<HARDWARE_MAC_ADDRESS_2>": "<IP_ADDRESS>"
								}
						}
				}
		}
	}'
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-static-address-reservation/#page","headline":"DHCP static address reservation · Cloudflare One docs","description":"DHCP static address reservation in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-static-address-reservation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
