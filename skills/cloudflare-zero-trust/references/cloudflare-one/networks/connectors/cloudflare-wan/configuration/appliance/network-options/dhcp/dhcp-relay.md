---
description: DHCP relay in Zero Trust networking.
title: DHCP relay
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# DHCP relay

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-relay/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Connectors** \> **Appliances** \> **Profiles**.
3. Select your Cloudflare One Appliance > **Edit**.
4. Select **Network Configuration**.
5. In **LAN configuration**, select the LAN where you need to configure DHCP relay.
6. Select **Edit**.
7. Select **This is a DHCP Relay**.
8. In **Upstream DHCP server addresses**, enter the IP address of your DHCP server.
9. (Optional) If you need to add more DHCP server addresses, select **Add upstream DHCP server address** as many times as needed, and enter the new values.

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-relay/#page","headline":"DHCP relay · Cloudflare One docs","description":"DHCP relay in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-relay/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
