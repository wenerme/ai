---
description: Build reusable IP and domain lists.
title: Create a list of IPs or domains
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a list of IPs or domains

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/create-list/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Gateway supports creating [lists](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) of IPs, hostnames, or other entries to reference in your policies.

It is likely that you will be onboarding to the Cloudflare platform with some predetermined series of security policies. Maybe you have explicit deny lists based on hostnames, IPs, or another measure that tie to individual users. Maybe some networks can access certain apex records while others cannot.

The best way to migrate to Cloudflare in a way that will simplify ongoing maintenance is to build as many reusable objects as possible. Not only because that makes policy building simpler, but because as those applications, networks, and services organically change and grow, updates to the lists automatically update everywhere that the lists are applied.

## Create a list from a CSV file

To test uploading CSV lists, you can download a [sample CSV file](https://developers.cloudflare.com/cloudflare-one/static/list-test.csv) of IP address ranges or copy the following into a file:

```csv
value,description
192.0.2.0/24,This is an IP address range in CIDR format
198.51.100.0/24,This is also an IP address range
203.0.113.0/24,This is the third IP address range
```

When you format a CSV file for upload:

* Each line should be a single entry that includes a value and an optional description.
* A header row must be present for Zero Trust to recognize descriptions.
* Trailing whitespace characters are not allowed.
* CRLF (Windows) and LF (Unix) line endings are valid.

To upload the list to the Cloudflare dashboard:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Lists**.
2. Select **Upload CSV**.
3. Next, specify a **List name**, enter an optional description, and choose a **List type**.
4. Drag and drop a file into the **CSV file** window, or select a file.
5. Select **Create**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):

  * `Zero Trust Write`
2. Decode the contents of the CSV file and store it as a local value:
```tf
locals {
	ip_list = csvdecode(file("${path.module}/list-test.csv"))
}
```
3. Create a list using the [cloudflare\_zero\_trust\_list ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Flist) resource:
```tf
resource "cloudflare_zero_trust_list" "ips_from_csv" {
	account_id  = var.cloudflare_account_id
	name        = "IPs imported from CSV"
	description = "Managed by Terraform"
	type        = "IP"
	items 			= local.ip_list
}
```

You can now use this list in the policy builder by choosing the _in list_ operator.

## Create a list manually

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Lists**.
2. Select **Create manual list**.
3. Next, specify a **List name**, enter an optional description, and choose a **List type**.
4. Enter your list element manually into the **Add entry** field and select **Add**.
5. Select **Save**.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"description": "Private application IPs",
		"items": [
				{
						"value": "10.226.0.177/32"
				},
				{
						"value": "10.226.1.177/32"
				}
		],
		"name": "Corporate IP list",
		"type": "IP"
	}'
```

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):

  * `Zero Trust Write`
2. Create a list using the [cloudflare\_zero\_trust\_list ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Flist) resource.
Example list of IPs:
```tf
resource "cloudflare_zero_trust_list" "wiki_IPs" {
	account_id  = var.cloudflare_account_id
	name        = "Company Wiki IP addresses"
	description = "Managed by Terraform"
	type        = "IP"
	items = [
		{
			description = "Example IP address range"
			value = "192.0.2.0/24",
		},
		{
			value = "198.51.100.0/24"
		}
	]
}
```
Example list of domains:
```tf
resource "cloudflare_zero_trust_list" "wiki_domains" {
	account_id  = var.cloudflare_account_id
	name        = "Company Wiki Domains"
	description = "Managed by Terraform"
	type        = "DOMAIN"
	items = [
		{
			value = "wiki.example.com"
		},
		{
			value = "wiki2.example.com"
		}]
}
```

You can now use this list in the policy builder by choosing the _in list_ operator.

Create lists in advance

Before moving on to create security policies, we recommend you create lists for your known domains, hosts, and IP addresses.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/create-list/#page","headline":"Create a list of IPs or domains · Cloudflare Learning Paths","description":"Build reusable IP and domain lists.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/create-list/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
