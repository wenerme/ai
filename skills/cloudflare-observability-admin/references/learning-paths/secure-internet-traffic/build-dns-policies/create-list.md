---
description: Create DNS allow and block lists.
title: Create an allowlist or blocklist
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Create an allowlist or blocklist

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/create-list/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In the context of DNS filtering, a blocklist is a list of known harmful domains or IP addresses. An allowlist is a list of allowed domains or IP addresses, such as the domains of essential corporate applications.

Gateway supports creating [lists](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) of URLs, hostnames, or other entries to use in your policies.

## Example list policy

The following DNS policy will allow access to all approved corporate domains included in a list called **Corporate Domains**.

| Selector | Operator | Value               | Action |
| -------- | -------- | ------------------- | ------ |
| Domain   | in list  | _Corporate Domains_ | Allow  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-DNS-CorporateDomain-AllowList",
		"description": "Allow access to the corporate domains defined under the Corporate Domains list",
		"precedence": 1,
		"enabled": true,
		"action": "allow",
		"filters": [
				"dns"
		],
		"traffic": "any(dns.domains[*] in $<CORPORATE_DOMAINS_LIST_UUID>)"
	}'
```

To create a new DNS policy using **Terraform** to allow access to all approved corporate domains included in a list called **Corporate Domains**.

```tf
resource "cloudflare_zero_trust_gateway_policy" "allow_corporate_domain_access" {
  account_id  = var.cloudflare_account_id
  name        = "All-DNS-CorporateDomain-AllowList"
  description = "Allow access to the corporate domains defined under the Corporate Domains list"
  precedence  = 1
  enabled     = false
  action      = "allow"
  filters     = ["dns"]
  traffic     = "any(dns.domains[*] in $<Corporate Domains List UUID>)"
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/create-list/#page","headline":"Create an allowlist or blocklist · Cloudflare Learning Paths","description":"Create DNS allow and block lists.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/create-list/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
