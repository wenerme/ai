---
description: Configure the Appliance DHCP server.
title: DHCP server
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# DHCP server

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-server/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you use a static IP address, Cloudflare One Appliance (formerly Magic WAN Connector) can also act as a DHCP server in your network. To enable this feature:

1. Go to the **Connectors** page.
[Go to **Connectors** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Cloudflare One Appliance you want to configure > **Edit**.
3. Select **Network Configuration** \> **LAN configuration**.
4. In **LAN configuration**, select the LAN where you want to enable DHCP server.
5. Select **Edit**.
6. Under **Static addressing**, select **This is a DHCP Server**. You also have to specify:
  * The DNS server address. You can have more than one IP address. Select **Add DNS Server** for each server you want to add.
  * The DHCP pool start
  * The DHCP pool end

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

Create a [PUT request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/sites/subresources/lans/methods/update/) to update the LAN where you want to enable DHCP server:

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
								"dhcp_pool_end": "<IP_ADDRESS>",
								"dhcp_pool_start": "<IP_ADDRESS>",
								"dns_server": "<IP_ADDRESS>"
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-server/#page","headline":"DHCP server · Cloudflare WAN docs","description":"Configure the Appliance DHCP server.","url":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-server/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
