---
description: Deploy recommended DNS filtering policies.
title: Recommended DNS policies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Recommended DNS policies

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/recommended-dns-policies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

We recommend you add the following DNS policies to build an Internet and SaaS app security strategy for your organization.

For additional commonly used DNS policy examples, refer to [Common DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/common-policies/). For more information on building DNS policies, refer to [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/).

## All-DNS-Domain-Allowlist

Allowlist any known domains and hostnames. With this policy, you ensure that your users can access your organization's domains even if the domains fall under a blocked category, such as **Newly Seen Domains** or **Login Screens**.

| Selector | Operator | Value           | Logic | Action |
| -------- | -------- | --------------- | ----- | ------ |
| Domain   | in list  | _Known Domains_ | Or    | Allow  |
| Host     | in list  | _Known Domains_ |       |        |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-DNS-Domain-Allowlist",
		"description": "Allowlist any known domains and hostnames",
		"precedence": 0,
		"enabled": true,
		"action": "allow",
		"filters": [
				"dns"
		],
		"traffic": "any(dns.domains[*] in $<KNOWN_DOMAINS_LIST_UUID>) or dns.fqdn in $<KNOWN_DOMAINS_LIST_UUID>"
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "dns_whitelist_policy" {
  account_id  = var.cloudflare_account_id
  name        = "All-DNS-Domain-Allowlist"
  description = "Allowlist any known domains and hostnames"
  precedence  = 0
  enabled     = true
  action      = "allow"
  filters     = ["dns"]
  traffic     = "any(dns.domains[*] in ${"$"}${cloudflare_zero_trust_list.domain_whitelist.id}) or dns.fqdn in ${"$"}${cloudflare_zero_trust_list.domain_whitelist.id}"
}
```

## Quarantined-Users-DNS-Restricted-Access

Restrict access for users included in an identity provider (IdP) user group for risky users. This policy ensures your security team can restrict traffic for users of whom malicious or suspicious activity was detected.

| Selector         | Operator    | Value                         | Logic | Action |
| ---------------- | ----------- | ----------------------------- | ----- | ------ |
| Domain           | not in list | _Allowed Remediation Domains_ | Or    | Block  |
| Host             | not in list | _Allowed Remediation Domains_ | And   |        |
| User Group Names | in          | _Quarantined Users_           |       |        |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Quarantined-Users-DNS-Restricted-Access",
		"description": "Restrict access for users included in an identity provider (IdP) user group for risky users",
		"precedence": 10,
		"enabled": true,
		"action": "block",
		"filters": [
				"dns"
		],
		"traffic": "not(any(dns.domains[] in $<ALLOWED_REMEDIATION_DOMAINS_LIST_UUID>)) or not(any(dns.domains[] in $<ALLOWED_REMEDIATION_DOMAINS_LIST_UUID>))",
		"identity": "any(identity.groups.name[*] in {\"Quarantined Users\"})"
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "dns_restrict_quarantined_users" {
  account_id  = var.cloudflare_account_id
  name        = "Quarantined-Users-DNS-Restricted-Access"
  description = "Restrict access for users included in an identity provider (IdP) user group for risky users"
  precedence  = 10
  enabled     = true
  action      = "block"
  filters     = ["dns"]
  traffic     = "not(any(dns.domains[*] in ${"$"}${cloudflare_zero_trust_list.allowed_remediation_domains.id})) or not(any(dns.domains[*] in ${"$"}${cloudflare_zero_trust_list.allowed_remediation_domains.id}))"
	identity		=	"any(identity.groups.name[*] in {\"Quarantined Users\"})"
}
```

## All-DNS-SecurityCategories-Blocklist

Block [security categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories), such as **Command and Control & Botnet** and **Malware**, based on Cloudflare's threat intelligence.

| Selector            | Operator | Value                | Action |
| ------------------- | -------- | -------------------- | ------ |
| Security Categories | in       | _All security risks_ | Block  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-DNS-SecurityCategories-Blocklist",
		"description": "Block security categories based on Cloudflare'\''s threat intelligence",
		"precedence": 20,
		"enabled": true,
		"action": "block",
		"filters": [
				"dns"
		],
		"traffic": "any(dns.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})",
		"identity": ""
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "block_security_threats" {
  account_id  = var.cloudflare_account_id
  name        = "All-DNS-SecurityCategories-Blocklist"
  description = "Block security categories based on Cloudflare's threat intelligence"
  precedence  = 20
	enabled     = true
  action      = "block"
  filters     = ["dns"]
  traffic     = "any(dns.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})"
}
```

## All-DNS-ContentCategories-Blocklist

Entries in the [security risk content subcategory](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-risk-subcategories), such as **New Domains**, do not always pose a security threat. We recommend you first create an Allow policy to track policy matching and identify any false positives. You can add false positives to your **Trusted Domains** list used in **All-DNS-Domain-Allowlist**.

After your test is complete, we recommend you change the action to Block to minimize risk to your organization.

| Selector           | Operator | Value                                                     | Action |
| ------------------ | -------- | --------------------------------------------------------- | ------ |
| Content Categories | in       | _Questionable Content_, _Security Risks_, _Miscellaneous_ | Block  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-DNS-ContentCategories-Blocklist",
		"description": "Block common content categories that may pose a risk",
		"precedence": 30,
		"enabled": true,
		"action": "block",
		"filters": [
				"dns"
		],
		"traffic": "any(dns.content_category[*] in {17 85 87 102 157 135 138 180 162 32 169 177 128 15 115 119 124 141 161})",
		"identity": ""
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "block_content_categories" {
  account_id  = var.cloudflare_account_id
  name        = "All-DNS-ContentCategories-Blocklist"
  description = "Block common content categories that may pose a risk"
  enabled     = true
  action      = "block"
  filters     = ["dns"]
  traffic     = "any(dns.content_category[*] in {17 85 87 102 157 135 138 180 162 32 169 177 128 15 115 119 124 141 161})"
  identity    = ""
}
```

## All-DNS-Application-Blocklist

Block unauthorized applications to limit your users' access to certain web-based tools and minimize the risk of [shadow IT](https://www.cloudflare.com/learning/access-management/what-is-shadow-it/). For example, the following policy blocks known AI tools:

| Selector    | Operator | Value                     | Action |
| ----------- | -------- | ------------------------- | ------ |
| Application | in       | _Artificial Intelligence_ | Block  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-DNS-Application-Blocklist",
		"description": "Block access to unauthorized AI applications",
		"precedence": 40,
		"enabled": true,
		"action": "block",
		"filters": [
				"dns"
		],
		"traffic": "any(app.type.ids[*] in {25})",
		"identity": ""
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "block_unauthorized_apps" {
  account_id  = var.cloudflare_account_id
  name        = "All-DNS-Application-Blocklist"
  description = "Block access to unauthorized AI applications"
  enabled     = true
  action      = "block"
  filters     = ["dns"]
  traffic     = "any(app.type.ids[*] in {25})"
  identity    = ""
}
```

## All-DNS-GeoCountryIP-Blocklist

Block websites hosted in countries categorized as high risk. The designation of such countries may result from your organization's users or through the implementation of regulations including [EAR ↗](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries), [OFAC ↗](https://orpa.princeton.edu/export-controls/sanctioned-countries), and [ITAR ↗](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries).

| Selector                        | Operator | Value                                                                                                                                                           | Action |
| ------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Resolved Country IP Geolocation | in       | _Afghanistan_, _Belarus_, _Congo (Kinshasa)_, _Cuba_, _Iran_, _Iraq_, _Korea (North)_, _Myanmar_, _Russian Federation_, _Sudan_, _Syria_, _Ukraine_, _Zimbabwe_ | Block  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-DNS-GeoCountryIP-Blocklist",
		"description": "Block traffic hosted in countries categorized as high security risks",
		"precedence": 50,
		"enabled": true,
		"action": "block",
		"filters": [
				"dns"
		],
		"traffic": "any(dns.dst.geo.country[*] in {\"AF\" \"BY\" \"CD\" \"CU\" \"IR\" \"IQ\" \"KP\" \"MM\" \"RU\" \"SD\" \"SY\" \"UA\" \"ZW\"})"
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "dns_geolocation_block_policy" {
  account_id  = var.cloudflare_account_id
  name        = "All-DNS-GeoCountryIP-Blocklist"
  description = "Block traffic hosted in countries categorized as high security risks"
  precedence  = 50
  enabled     = true
  action      = "block"
  filters     = ["dns"]
  traffic     = "any(dns.dst.geo.country[*] in {\"AF\" \"BY\" \"CD\" \"CU\" \"IR\" \"IQ\" \"KP\" \"MM\" \"RU\" \"SD\" \"SY\" \"UA\" \"ZW\"})"
}
```

## All-DNS-DomainTopLevel-Blocklist

Block frequently misused top-level domains (TLDs) to reduce security risks, especially when there is no discernible advantage to be gained from allowing access. Similarly, restricting access to specific country-level TLDs may be necessary to comply with regulations such as [OFAC ↗](https://orpa.princeton.edu/export-controls/sanctioned-countries) and [ITAR ↗](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries).

| Selector | Operator      | Value                                                                                              | Action |
| -------- | ------------- | -------------------------------------------------------------------------------------------------- | ------ |
| Domain   | matches regex | \[.\](cn\|ru)$ or \[.\](rest|hair|top|live|cfd|boats|beauty|mom|skin|okinawa)$ or \[.\](zip|mobi)$ | Block  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-DNS-DomainTopLevel-Blocklist",
		"description": "Block DNS queries of known risky TLDs",
		"precedence": 60,
		"enabled": true,
		"action": "block",
		"filters": [
				"dns"
		],
		"traffic": "any(dns.domains[*] matches \".$ or .$ or .$\")"
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "dns_blacklist_policy" {
  account_id  = var.cloudflare_account_id
  name        = "All-DNS-DomainTopLevel-Blocklist"
  description = "Block DNS queries of known risky TLDs"
  precedence  = 60
  enabled     = true
  action      = "block"
  filters     = ["dns"]
  traffic     = "any(dns.domains[*] matches \"[.](cn|ru)$ or [.](rest|hair|top|live|cfd|boats|beauty|mom|skin|okinawa)$ or [.](zip|mobi)$\")"
}
```

## All-DNS-DomainPhishing-Blocklist

Block misused domains to protect your users against sophisticated phishing attacks, such as domains that specifically target your organization. For example, the following policy blocks specific keywords associated with an organization or its authentication services (such as `okta`, `2fa`, `cloudflare` and `sso`) while still allowing access to known domains.

| Selector | Operator      | Value                                          | Logic | Action |
| -------- | ------------- | ---------------------------------------------- | ----- | ------ |
| Domain   | not in list   | _Known Domains_                                | And   | Block  |
| Domain   | matches regex | .\*okta.\*\|.\*cloudflare.\*|.\*mfa.\*|.sso.\* |       |        |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-DNS-DomainPhishing-Blocklist",
		"description": "Block misused domains used in phishing campaigns",
		"precedence": 70,
		"enabled": true,
		"action": "block",
		"filters": [
				"dns"
		],
		"traffic": "any(dns.domains[] matches \".okta.|.cloudflare.|.mfa.|.sso.\") and not(any(dns.domains[*] in $<KNOWN_DOMAINS_LIST_UUID>))"
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "dns_phishing_domains_block" {
  account_id  = var.cloudflare_account_id
  name        = "All-DNS-DomainPhishing-Blocklist"
  description = "Block misused domains used in phishing campaigns"
  precedence  = 70
  enabled     = true
  action      = "block"
  filters     = ["dns"]
  traffic     = "any(dns.domains[*] matches \".*okta.*|.*cloudflare.*|.*mfa.*|.sso.*\") and not(any(dns.domains[*] in ${"$"}${cloudflare_zero_trust_list.known_phishing_domains_list.id}))"
}
```

## All-DNS-ResolvedIP-Blocklist

Block specific IP addresses that are malicious or pose a threat to your organization.

You can implement this policy by either creating custom blocklists or by using blocklists provided by threat intelligence partners or regional Computer Emergency and Response Teams (CERTs). Ideally, your CERTs can update the blocklist with an [API automation](https://developers.cloudflare.com/security-center/intel-apis/) to provide real-time threat protection.

| Selector    | Operator | Value          | Action |
| ----------- | -------- | -------------- | ------ |
| Resolved IP | in list  | _IP Blocklist_ | Block  |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-DNS-ResolvedIP-Blocklist",
		"description": "Block specific IP addresses deemed to be a risk to the Organization",
		"precedence": 80,
		"enabled": true,
		"action": "block",
		"filters": [
				"dns"
		],
		"traffic": "any(dns.resolved_ips[*] in $<IP_BLOCKLIST_UUID>)"
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "dns_resolvedip_blocklist_rule" {
  account_id  = var.cloudflare_account_id
  name        = "All-DNS-ResolvedIP-Blocklist"
  description = "Block specific IP addresses deemed to be a risk to the Organization"
  precedence  = 80
  enabled     = true
  action      = "block"
  filters     = ["dns"]
  traffic     = "any(dns.resolved_ips[*] in ${"$"}${cloudflare_zero_trust_list.ip_blocklist.id}"
}
```

## All-DNS-DomainHost-Blocklist

Block specific domains or hosts that are malicious or pose a threat to your organization. Like **All-DNS-ResolvedIP-Blocklist**, this blocklist can be updated manually or via API automation.

| Selector | Operator      | Value              | Logic | Action |
| -------- | ------------- | ------------------ | ----- | ------ |
| Domain   | in list       | _Domain Blocklist_ | Or    | Block  |
| Host     | in list       | _Host Blocklist_   | Or    |        |
| Host     | matches regex | .\*example\\.com   |       |        |

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "All-DNS-DomainHost-Blocklist",
		"description": "Block specific domains or hosts that are malicious or pose a threat to your organization.",
		"precedence": 90,
		"enabled": true,
		"action": "block",
		"filters": [
				"dns"
		],
		"traffic": "any(dns.domains[*] in $<DOMAIN_BLOCKLIST_UUID>) and dns.fqdn in $<HOST_BLOCKLIST_UUID> and dns.fqdn matches \".*example.com\""
	}'
```

```tf
resource "cloudflare_zero_trust_gateway_policy" "block_dns_domain_host" {
  account_id  = var.cloudflare_account_id
  name        = "All-DNS-DomainHost-Blocklist"
  description = "Block specific domains or hosts that are malicious or pose a threat to your organization."
  precedence  = 90
  enabled     = true
  action      = "block"
  filters     = ["dns"]
  traffic     = "any(dns.domains[*] in ${"$"}${cloudflare_zero_trust_list.domain_blocklist.id}) and dns.fqdn in ${"$"}${cloudflare_zero_trust_list.host_blocklist.id} and dns.fqdn matches \".*example\\.com\""
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/recommended-dns-policies/#page","headline":"Recommended DNS policies · Cloudflare Learning Paths","description":"Deploy recommended DNS filtering policies.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/recommended-dns-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
