---
description: Configure DHCP relay on the Appliance.
title: DHCP relay
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# DHCP relay

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-relay/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

DHCP Relay provides a way for DHCP clients to communicate with DHCP servers that are not available on the same local subnet/broadcast domain. When you enable DHCP Relay, Cloudflare One Appliance (formerly Magic WAN Connector) forwards DHCP discover messages to a predefined DHCP server, and routes the responses back to the original device that sent the discover message.


	flowchart LR
	accTitle: DHCP Relay diagram
	accDescr: The graph shows Cloudflare One Appliance sending DHCP discover messages to a DHCP server offsite.
			a(Cloudflare One Appliance) <--> b(Cloudflare/Cloudflare WAN) <--> c(DHCP server)

			subgraph Site A
			d[LAN 1] <--> a
			e[LAN 2] <--> a
			end

			subgraph Site B
			c
			end
			classDef orange fill:#f48120,color: black
			class a,b,c orange

_The graph shows Cloudflare One Appliance sending DHCP discover messages to a DHCP server offsite._

Caution

DHCP relay will not work if your DHCP server is behind a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/). To enable DHCP relay functionality, use either a Cloudflare WAN IPsec/GRE tunnel or a CNI connection.

To configure DHCP relay:

1. Go to the **Connectors** page.
[Go to **Connectors** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
1. Select your Cloudflare One Appliance > **Edit**.
2. Select **Network Configuration**.
3. In **LAN configuration**, select the LAN where you need to configure DHCP relay.
4. Select **Edit**.
5. Select **This is a DHCP Relay**.
6. In **Upstream DHCP server addresses**, enter the IP address of your DHCP server.
7. (Optional) If you need to add more DHCP server addresses, select **Add upstream DHCP server address** as many times as needed, and enter the new values.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

Create a [PUT request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/sites/subresources/lans/methods/update/) to update the LAN where you want to enable DHCP relay:

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
						"dhcp_relay": {
								"server_addresses": [
										"192.0.2.1"
								]
						}
				}
		}
	}'
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-relay/#page","headline":"DHCP relay · Cloudflare WAN docs","description":"Configure DHCP relay on the Appliance.","url":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-relay/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
