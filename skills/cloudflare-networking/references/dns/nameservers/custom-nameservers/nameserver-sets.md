---
description: Create standard or Advanced Custom Nameserver sets and assign them to zones in your account.
title: Nameserver sets
image: https://developers.cloudflare.com/dns/nameservers/custom-nameservers/nameserver-sets/og.png?v=a859fd553ad70352
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Nameserver sets

Last updated Oct 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/nameserver-sets/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A nameserver set is an account-level group of two to five custom nameserver names, together with the IP addresses that Cloudflare assigns to those names. You create a set once and then assign it to zones in the same account. Each set has a name to identify it.

Nameserver sets are a separate configuration from [zone](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/zone-custom-nameservers/), [account](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/account-custom-nameservers/), and [tenant](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/tenant-custom-nameservers/) custom nameservers. A zone uses either a nameserver set or one of those configurations, never both. Existing configurations cannot be converted into nameserver sets.

## Availability

Nameserver sets are in beta and available to Enterprise customers via API or on the dashboard.

To use a nameserver set, a zone must be in the same account as the set.

## How nameserver sets work

- Cloudflare assigns both IPv4 and IPv6 addresses to each nameserver name in a set.
- Each nameserver set is either standard or Advanced.
- Nameserver names can belong to any domain, even a domain that does not exist as a zone in Cloudflare.
- The same nameserver name can be used in more than one set within your account.
- Sets are immutable. You can create and delete a set, but you cannot change one. Only the name can be changed later.
- Cloudflare does not create or update DNS records for a nameserver set. You manage the required `A`, `AAAA`, and `NS` records, plus glue where DNS requires it.
- Currently, nameserver sets cannot yet be used as a [DNS zone default](https://developers.cloudflare.com/dns/additional-options/dns-zone-defaults/) for new zones.

## IP sets

Each nameserver set belongs to an IP set. The `ip_set` number defaults to `1` when omitted. IP sets control which addresses Cloudflare can assign:

- Sets with the same `ip_set` number and `advanced` value may reuse addresses.
- Sets with a different `ip_set` number or `advanced` value use separate address groups.

For example, a standard set with `ip_set: 1` and an Advanced set with `ip_set: 1` use separate IP sets.

A zone cannot use the same nameserver IP addresses as its parent zone, its subdomains, or a zone with the same name in another account. To use the same set type on a zone and its subdomains, create sets with different `ip_set` numbers.

## Limits

The following limits apply to nameserver sets:

| Item | Limit |
| --- | --- |
| Nameserver names per set | 2 to 5 |
| IPv4 and IPv6 addresses per nameserver name | 1 to 3 each (`ip_count`, defaults to 1) |

All nameserver names in an Advanced set must use the same `ip_count` value.

### Set names

The top-level `name` is a label for the set. Choose a name that helps you find or identify the set later.

Set names must be unique within an account.

## Create a nameserver set

In the Cloudflare dashboard, create and manage sets under **Nameserver sets** on the account **DNS Settings** page.

[Go to **DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/configurations/dns-settings)

To create a set via API, use the [Create Custom Nameserver Set](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/nameserver_sets/methods/create/) endpoint.

Include a top-level `name` to identify the set. Each nameserver name in `nameservers` must be unique within the set and lowercase. Internationalized domain names must use Punycode.

### Standard nameserver set

Omit `advanced` or set it to `false` to create a standard nameserver set. Standard sets can use a different `ip_count` for each nameserver name.

*Create Custom Nameserver Setbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/nameserver_sets" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Production",
		"ip_set": 1,
		"nameservers": [
				{
						"name": "ns1.example.com"
				},
				{
						"name": "ns2.example.com",
						"ip_count": 2
				}
		]
	}'
```

The response contains the set ID, set name, and addresses assigned to each nameserver name:

```json
{
	"result": {
		"id": "0e1f2a3b4c5d6e7f8091a2b3c4d5e6f7",
		"name": "Production",
		"advanced": false,
		"ip_set": 1,
		"nameservers": [
			{
				"name": "ns1.example.com",
				"ipv4": ["192.0.2.1"],
				"ipv6": ["2001:db8::1"]
			},
			{
				"name": "ns2.example.com",
				"ipv4": ["192.0.2.2", "192.0.2.3"],
				"ipv6": ["2001:db8::2", "2001:db8::3"]
			}
		],
		"created_on": "2026-01-15T12:00:00Z"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

### Advanced Custom Nameserver set

With a Foundation DNS subscription, set `advanced` to `true` to create an Advanced Custom Nameserver set. Cloudflare distributes its addresses across [Advanced anycast network groups](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/#anycast-network-groups) to improve resiliency.

Every nameserver name in the request must have the same `ip_count`. Cloudflare chooses the anycast groups.

*Create Custom Nameserver Setbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/nameserver_sets" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Production Advanced",
		"advanced": true,
		"ip_set": 1,
		"nameservers": [
				{
						"name": "ns1.example.com",
						"ip_count": 1
				},
				{
						"name": "ns2.example.com",
						"ip_count": 1
				},
				{
						"name": "ns3.example.com",
						"ip_count": 1
				}
		]
	}'
```

Advanced set responses include an anycast group for each address:

```json
{
	"result": {
		"id": "1f2a3b4c5d6e7f8091a2b3c4d5e6f708",
		"name": "Production Advanced",
		"advanced": true,
		"ip_set": 1,
		"nameservers": [
			{
				"name": "ns1.example.com",
				"ipv4": ["192.0.2.1"],
				"ipv4_groups": ["a"],
				"ipv6": ["2001:db8::1"],
				"ipv6_groups": ["a"]
			},
			{
				"name": "ns2.example.com",
				"ipv4": ["192.0.2.2"],
				"ipv4_groups": ["b"],
				"ipv6": ["2001:db8::2"],
				"ipv6_groups": ["b"]
			},
			{
				"name": "ns3.example.com",
				"ipv4": ["192.0.2.3"],
				"ipv4_groups": ["c"],
				"ipv6": ["2001:db8::3"],
				"ipv6_groups": ["c"]
			}
		],
		"created_on": "2026-01-15T12:00:00Z"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

The `ipv4_groups` and `ipv6_groups` arrays map one-to-one to their corresponding address arrays. Each group value identifies the anycast group for the address at the same index.

Groups `a` and `b` are advertised from two separate sets of data centers that do not overlap. Each set is spread across the globe as evenly as possible. Group `c` is advertised from all Cloudflare data centers, so it includes every data center in `a` and `b`. For an example, refer to [Anycast network groups](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/#anycast-network-groups).

An account cannot contain two sets with exactly the same nameserver names and addresses.

To [list the sets in your account](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/nameserver_sets/methods/list/), send a `GET` request to the same endpoint, using the `page` and `per_page` query parameters to page through the results. To [retrieve a single set](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/nameserver_sets/methods/get/), add its ID to the path.

## Rename a nameserver set

To rename a set, send a `PATCH` request to `/accounts/{account_id}/dns_settings/nameserver_sets/{nameserver_set_id}` with only the new `name`:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Account DNS Settings Write</code>

</details>

*Update Custom Nameserver Setbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/nameserver_sets/$NAMESERVER_SET_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Production primary"
	}'
```

Choose a [set name](#set-names) that is unique within your account. Only the top-level `name` field can be updated.

Renaming a set does not affect DNS resolution or require DNS record or delegation changes.

## Prepare nameserver address records

Cloudflare does not create these records for you, even if the nameserver names belong to a domain that uses Cloudflare DNS.

1. At the authoritative DNS provider for each nameserver name, create `A` and `AAAA` records that contain the addresses assigned to that name.
2. If a nameserver name is within the zone that will use the set (in-bailiwick), add its assigned addresses as glue at the parent ([RFC 1912 ↗︎](https://www.rfc-editor.org/rfc/rfc1912.html)). If the zone uses [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to add the glue records.

## Assign a nameserver set to a zone

In the Cloudflare dashboard, assign a set under **Nameserver sets** on the zone **DNS Settings** page.

[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)

To assign a set via API, use the [Update DNS Settings for a Zone](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) endpoint:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zone DNS Settings Write</code>
- <code>DNS Write</code>

</details>

*Update DNS Settingsbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_settings" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"nameservers": {
				"type": "custom",
				"nameserver_set_id": "0e1f2a3b4c5d6e7f8091a2b3c4d5e6f7"
		}
	}'
```

The assignment fails if the addresses in the set are already used by the parent zone, by a subdomain zone, or by a zone with the same name in another account. In that case, use a set with a different `ip_set` number.

Assigning a set replaces the zone's existing Cloudflare-branded standard or [Advanced Nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/), or its existing nameserver set. Both standard and Advanced Custom Nameserver sets use `type: "custom"` in zone DNS settings.

## Update the nameservers

At the registrar of the zone that uses the set — or in the parent zone, if the zone is delegated — set the nameservers to all nameserver names in the set.

## Activation requirements

For a zone to activate and remain active without [multi-provider DNS](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#multi-provider-dns), these sets of values must match exactly:

- Nameserver names in the set and `NS` record set returned from the parent
- For each nameserver name, its assigned IPv4 addresses and live `A` answers
- For each nameserver name, its assigned IPv6 addresses and live `AAAA` answers

Cloudflare validates address answers for each nameserver name separately. An address assigned to one name cannot satisfy the requirement for another name, even if the records across the set contain every assigned address.

With multi-provider DNS, each expected nameserver name must be present amongst the `NS` record set returned from the parent. Each nameserver name must also return every IPv4 and IPv6 address assigned to it. Additional names and addresses are allowed.

Cloudflare does not separately validate parent glue. In-bailiwick nameservers still need usable glue for recursive resolution. Out-of-bailiwick nameservers do not inherently need parent glue.

## Delete a nameserver set

A set cannot be deleted while it is assigned to a zone. To stop using custom nameservers on a zone, set the nameserver type back to `cloudflare.standard` or `cloudflare.advanced`, and update the nameservers at the registrar of the zone:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zone DNS Settings Write</code>
- <code>DNS Write</code>

</details>

*Update DNS Settingsbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_settings" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"nameservers": {
				"type": "cloudflare.standard"
		}
	}'
```

After the delegation or nameserver change has propagated, remove obsolete `A`, `AAAA`, and parent glue records. Wait for these removals to propagate.

Once no zone uses the set and these removals have propagated, [delete the set](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/nameserver_sets/methods/delete/):

*Delete Custom Nameserver Setbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/nameserver_sets/$NAMESERVER_SET_ID" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Cloudflare does not reserve the deleted set's name-to-address assignments. A new set may receive different addresses.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/nameserver-sets/#page","headline":"Nameserver sets","description":"Create standard or Advanced Custom Nameserver sets and assign them to zones in your account.","url":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/nameserver-sets/","inLanguage":"en","image":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/nameserver-sets/og.png?v=a859fd553ad70352","dateModified":"2026-10-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
