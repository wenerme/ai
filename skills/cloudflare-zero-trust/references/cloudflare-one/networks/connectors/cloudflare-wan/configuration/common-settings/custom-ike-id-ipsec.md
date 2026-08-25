---
description: Custom IKE ID for IPsec in Zero Trust networking.
title: Custom IKE ID for IPsec
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom IKE ID for IPsec

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/custom-ike-id-ipsec/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare WAN (formerly Magic WAN) customers can configure a custom IKE ID for their IPsec tunnels. Customers that are using Cloudflare WAN and a VeloCloud SD-WAN device together should utilize this option to create a high availability configuration.

Note

This feature is only available via API. There are no configuration options for a custom IKE ID for an IPsec tunnel in the Cloudflare dashboard.

VeloCloud has a high availability mechanism that allows customers to specify one set of IKE parameters (like IKE ID) and multiple remote IPs. Customers create an IKE ID, and then assign the same custom IKE ID to their primary IPsec tunnel and their backup IPsec tunnel. FQDN is the only supported type for custom IKE IDs.

Cloudflare WAN customers can set a custom IKE ID for an IPsec tunnel using the following API call. Customers will need to fill in the appropriate values for `<account_id>`, `<tunnel_id>`, and the FQDN wildcard before running the API call.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/ipsec_tunnels/TUNNEL_ID" \
	--request PATCH \
	--json '{
		"custom_remote_identities": {
				"fqdn_id": "<your_custom_label>.<account_id>.custom.ipsec.cloudflare.com"
		}
	}'
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/custom-ike-id-ipsec/#page","headline":"Custom IKE ID for IPsec · Cloudflare One docs","description":"Custom IKE ID for IPsec in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/custom-ike-id-ipsec/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["IPsec"]}
```
