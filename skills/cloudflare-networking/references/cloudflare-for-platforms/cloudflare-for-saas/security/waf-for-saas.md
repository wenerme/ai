---
description: Apply custom rules, rate limiting, and managed rulesets per custom hostname.
title: WAF for SaaS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# WAF for SaaS

Last updated Apr 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/) allows you to create additional security measures through Cloudflare. As a SaaS provider, you can link custom rules, rate limiting rules, and managed rules to your custom hostnames. This provides more control to keep your domains safe from malicious traffic.

As a SaaS provider, you may want to apply different security measures to different custom hostnames. With WAF for SaaS, you can create multiple WAF configuration that you can apply to different sets of custom hostnames. This added flexibility and security leads to optimal protection across the domains of your end customers.

---

## Prerequisites

Before you can use WAF for SaaS, you need to create a custom hostname. Review [Get started with Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) if you have not already done so.

You can also create a custom hostname through the API:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>SSL and Certificates Write</code>

</details>

*Create Custom Hostnamebash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"hostname": "<CUSTOM_HOSTNAME>",
		"ssl": {
				"wildcard": false
		}
	}'
```

## 1. Associate custom metadata to a custom hostname

To apply WAF to your custom hostname, you need to create an association between your customer's domain and the WAF configuration that you would like to attach to it. Cloudflare's product, [custom metadata](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/) allows you to do this via the API.

1. [Locate your zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/), available in the Cloudflare dashboard.
2. Locate your Authentication Key on the [**API Tokens** ↗](https://dash.cloudflare.com/?to=/:account/profile/api-tokens) page, under **Global API Key**.
3. Locate your custom hostname ID by making a `GET` call in the API:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>SSL and Certificates Write</code>
- <code>SSL and Certificates Read</code>

</details>

*List Custom Hostnamesbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

4. Plan your [custom metadata](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/). It is fully customizable. In the example below, we have chosen the tag `"security_level"` to which we expect to assign three values (low, medium, and high).

Note

One instance of low, medium, and high rules could be rate limiting. You can specify three different thresholds: low - 100 requests/minute, medium - 85 requests/minute, high - 50 requests/minute, for example. Another possibility is a WAF custom rule in which low challenges requests and high blocks them.

5. Make an API call in the format below using your Cloudflare email and the IDs gathered above:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>SSL and Certificates Write</code>

</details>

*Edit Custom Hostnamebash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"custom_metadata": {
				"customer_id": "12345",
				"security_level": "low"
		}
	}'
```

This assigns custom metadata to your custom hostname so that it has a security tag associated with its ID.

## 2. Trigger security products based on tags

1. Locate the custom metadata field in the Ruleset Engine where the WAF runs. This can be used to trigger different configurations of products such as [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), and [Transform Rules](https://developers.cloudflare.com/rules/transform/).
2. Build your rules either [through the dashboard](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) or via the API. An example rate limiting rule, corresponding to `"security_level"` low, is shown below as an API call.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Response Compression Write</code>
- <code>Config Settings Write</code>
- <code>Dynamic URL Redirects Write</code>
- <code>Cache Settings Write</code>
- <code>Custom Errors Write</code>
- <code>Origin Write</code>
- <code>Managed headers Write</code>
- <code>Zone Transform Rules Write</code>
- <code>Mass URL Redirects Write</code>
- <code>Magic Firewall Write</code>
- <code>L4 DDoS Managed Ruleset Write</code>
- <code>HTTP DDoS Managed Ruleset Write</code>
- <code>Sanitize Write</code>
- <code>Transform Rules Write</code>
- <code>Select Configuration Write</code>
- <code>Bot Management Write</code>
- <code>Zone WAF Write</code>
- <code>Account WAF Write</code>
- <code>Account Rulesets Write</code>
- <code>Logs Write</code>
- <code>Logs Write</code>

</details>

*Update a zone entry point rulesetbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_ratelimit/entrypoint" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"action": "block",
						"ratelimit": {
								"characteristics": [
										"cf.colo.id",
										"ip.src"
								],
								"period": 10,
								"requests_per_period": 2,
								"mitigation_timeout": 60
						},
						"expression": "lookup_json_string(cf.hostname.metadata, \"security_level\") eq \"low\" and http.request.uri contains \"login\""
				}
		]
	}'
```

To build rules through the dashboard:

1. In the Cloudflare dashboard, go to the **WAF** page. [Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Follow the instructions on the dashboard specific to custom rules, rate limiting rules, or managed rules, depending on your security goal.
3. Once the rule is active, you should see it under the applicable tab (custom rules, rate limiting, or managed rules).

   Caution

   This API call will replace any existing rate limiting rules in the zone.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/#page","headline":"WAF for SaaS · Cloudflare for Platforms docs","description":"Apply custom rules, rate limiting, and managed rulesets per custom hostname.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
