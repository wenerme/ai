---
description: Onboard your IP prefixes to Cloudflare with BYOIP.
title: Get started
image: https://developers.cloudflare.com/byoip/get-started/og.png?v=813afd9184592636
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Oct 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/byoip/get-started/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use this guide to onboard your own IP prefixes to Cloudflare. Before you begin, you must contact your account team to confirm that your contract includes BYOIP and that your account has the required service configuration.

Review the [BYOIP Service-Specific Terms ↗︎](https://www.cloudflare.com/service-specific-terms-network-services/#bring-your-own-ip-terms) before you onboard a prefix.

Magic Transit

This guide does not apply to prefixes used with [Cloudflare Magic Transit](https://developers.cloudflare.com/magic-transit/). To onboard a Magic Transit prefix, refer to [Get started with Magic Transit](https://developers.cloudflare.com/magic-transit/get-started/).

## Before you begin

You must meet all of the following requirements. Cloudflare cannot onboard your prefix if any registration, IRR, RPKI, or ownership validation check fails.

- You must register your prefix with one of the following Regional Internet Registries (RIRs):
  - [AFRINIC ↗︎](https://afrinic.net/)
  - [APNIC ↗︎](https://www.apnic.net/)
  - [ARIN ↗︎](https://www.arin.net/)
  - [LACNIC ↗︎](https://lacnic.net/)
  - [RIPE ↗︎](https://www.ripe.net/)
- Your [Internet Routing Registry (IRR)](https://developers.cloudflare.com/byoip/concepts/irr-entries/) records must contain:
  - A `route` or `route6` object that exactly matches each prefix you want to onboard.
  - An `origin` that matches the ASN Cloudflare will use to advertise the prefix.
- Your [Route Origin Authorizations (ROAs)](https://developers.cloudflare.com/byoip/concepts/route-filtering-rpki/) must be accurate. You must verify them with [Cloudflare's RPKI Portal ↗︎](https://rpki.cloudflare.com/?view=validator) and a second source such as [Routinator ↗︎](https://rpki-validator.ripe.net/ui/).
- You must have your Cloudflare account ID and an API token with the permissions required by each operation in this guide. If you are unfamiliar with the Cloudflare API, refer to [Cloudflare API fundamentals](https://developers.cloudflare.com/fundamentals/api/).

Use Cloudflare's ASN

The process described on this page only supports using Cloudflare's ASN (AS13335). If you must announce the prefixes under your own ASN, contact your account team.

## 1. Add and validate your prefix

### Add your prefix

1. Use the [Add Prefix endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/create/) to add the prefix to the Cloudflare account that will own it.

   ```bash
   curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes" --request POST --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" --json '{"cidr":"203.0.113.0/24","asn":13335,"delegate_loa_creation":true}'
   ```

   *Responsejson*



   ```json
   {
     "result": {
       "id": "72823e95d6c64d48a8111fec81179816",
       "created_at": "2025-02-25T00:34:11.423722Z",
       "modified_at": "2025-02-25T00:34:11.423722Z",
       "cidr": "203.0.113.0/24",
       "account_id": "654c5f71c324478cc9f68d60065d4620",
       "description": "",
       "approved": "P",
       "on_demand_enabled": false,
       "on_demand_locked": false,
       "advertised": null,
       "advertised_modified_at": null,
       "loa_document_id": "b9ff4afe312246a8b2e7324d98f40b23",
       "asn": 13335,
       "ownership_validation_token": "<OWNERSHIP_VALIDATION_TOKEN>",
       "delegate_loa_creation": true,
       "irr_validation_state": "pending",
       "rpki_validation_state": "pending",
       "ownership_validation_state": "pending"
     }
   }
   ```


2. Save the prefix `id` and `ownership_validation_token` from the response. You will use them in later steps.

Letter of Agency

This guide uses automated [Letter of Agency (LOA)](https://developers.cloudflare.com/byoip/concepts/loa/) generation. If you set `delegate_loa_creation` to `false`, you must upload the LOA manually, [update the prefix](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/edit/) after it is approved, and contact your account team. Manual LOA processing can increase onboarding time.

### Validate prefix ownership

Prove ownership by adding the validation token to either your IRR record or reverse DNS. You only need to use one of these methods.

1. Copy the `ownership_validation_token` returned when you added the prefix.
2. Add the following value to a `description` or `remarks` field in the matching IRR `route` or `route6` object. Replace `<OWNERSHIP_VALIDATION_TOKEN>` with your token.

   ```text
   cf-validation: <OWNERSHIP_VALIDATION_TOKEN>
   ```

   The process for updating an IRR object depends on the registry. Refer to [IRR best practices](https://developers.cloudflare.com/byoip/concepts/irr-entries/best-practices/) for more information.

1. Determine which reverse DNS zones are required for your prefix. IPv4 reverse DNS delegations commonly align on octet boundaries, and IPv6 delegations align on nibble boundaries. A prefix that does not align with the next boundary must be divided into smaller reverse zones.<details><summary>

   Examples</summary>

Use the following formula to determine the number of zones at the next delegation boundary:

   ```text
   2^(next boundary - current prefix length)
   ```

   The IPv4 prefix <code>192.0.2.0/23</code> requires two <code>/24</code> reverse zones: one for <code>192.0.2.0/24</code> and one for <code>192.0.3.0/24</code>.

   The IPv6 prefix <code>2001:db8::/34</code> requires four <code>/36</code> reverse zones: <code>2001:db8::/36</code>, <code>2001:db8:1000::/36</code>, <code>2001:db8:2000::/36</code>, and <code>2001:db8:3000::/36</code>.</details>

2. Create the required reverse DNS zones. If you use Cloudflare for authoritative DNS, refer to [Set up a reverse DNS zone](https://developers.cloudflare.com/dns/additional-options/reverse-zones/#set-up-a-reverse-zone). Otherwise, follow your DNS provider's instructions.
3. In each reverse zone, create a TXT record named `cf-validation` whose value is the ownership validation token.

   ```text
   cf-validation.<REVERSE_ZONE> IN TXT "<OWNERSHIP_VALIDATION_TOKEN>"
   ```


4. At your RIR, delegate the reverse zones to the authoritative nameservers that host them.

After publishing the validation token, use the [Validate Prefix endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/validate/) to trigger the prefix validation checks:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/validate" --request POST --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Use the [Prefix Details endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/get/) to monitor validation. When the IRR, RPKI, and ownership checks pass, the `approved` field for the prefix returns `"V"`. You can then remove the ownership validation token and proceed to create service bindings.

If validation fails, refer to [Troubleshoot prefix validation](https://developers.cloudflare.com/byoip/troubleshooting/prefix-validation/), correct the reported issues, and trigger validation again.

### Optional: Delegate the prefix

You can allow another Cloudflare account to use all or part of the prefix. Refer to [Prefix delegations](https://developers.cloudflare.com/byoip/concepts/prefix-delegations/) for details.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/delegations" --request POST --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" --json '{"cidr":"<IP_PREFIX_TO_DELEGATE>","delegated_account_id":"<DELEGATED_ACCOUNT_ID>"}'
```

Note

Service bindings for a delegated prefix are created and managed in the parent account that owns the prefix.

## 2. Create service bindings

Service bindings determine which Cloudflare service receives traffic destined for an IP address in your prefix. Configure service bindings while the prefix is withdrawn.

### Create the default service binding

Each prefix requires a default service binding that covers the entire prefix. Cloudflare uses this binding for any IP address that does not have a more-specific binding.

1. Use the [List Services endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/services/methods/list/) to find the `id` of the service that will receive traffic by default.
2. If necessary, use the [List Prefixes endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/list/) to find the prefix `id`.
3. Use the [Create Service Binding endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service_bindings/methods/create/) to bind the entire prefix to the default service.

   ```bash
   curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings" --request POST --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" --json '{"cidr":"203.0.113.0/24","service_id":"<DEFAULT_SERVICE_ID>"}'
   ```



BGP prefix provisioning

Cloudflare automatically creates a corresponding BGP prefix in a withdrawn state. Allow at least five hours for provisioning before you advertise the BGP prefix.

CDN egress

[Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/) (formerly known as Aegis) is only available for Enterprise. If you are interested, reach out to your account team. Also note that a single BYOIP prefix can be used for either CDN ingress or CDN egress, but not both.

### Optional: Create more-specific service bindings

Create more-specific bindings to send selected addresses in the prefix to a different service, such as CDN or Spectrum. Refer to [Service bindings](https://developers.cloudflare.com/byoip/service-bindings/) for service-specific configuration requirements.

Cloudflare recommends grouping contiguous IP addresses into the largest appropriate CIDR instead of creating a separate binding for each address.

<details>

<summary>

Example

</summary>

Suppose <code>203.0.113.0/24</code> uses Spectrum by default, but addresses <code>203.0.113.16</code> through <code>203.0.113.23</code> must use CDN. These eight contiguous addresses form <code>203.0.113.16/29</code>, so you can create one CDN binding for that CIDR.

</details>

Use the [Create Service Binding endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service_bindings/methods/create/) to create the more-specific binding.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings" --request POST --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" --json '{"cidr":"203.0.113.16/29","service_id":"<SERVICE_ID>"}'
```

The initial provisioning state in the response is `provisioning`:

*Responsejson*

```json
{
	"errors": [],
	"messages": [],
	"success": true,
	"result": {
		"cidr": "203.0.113.16/29",
		"id": "<SERVICE_BINDING_ID>",
		"provisioning": {
			"state": "provisioning"
		},
		"service_id": "<SERVICE_ID>",
		"service_name": "<SERVICE_NAME>"
	}
}
```

Creating or deleting a service binding takes four to six hours to propagate across Cloudflare's network. Use the [Get Service Binding endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service_bindings/methods/get/) to monitor its status. Wait until all bindings are active before you advertise the BGP prefix.

Note

Magic Transit can only be the default binding for an entire prefix. For more information, refer to [Service binding scope](https://developers.cloudflare.com/byoip/service-bindings/#scope).

## 3. Advertise the BGP prefix

Cloudflare creates the BGP prefix in a withdrawn state. While it is withdrawn, you can configure service bindings, but you cannot create an address map that uses its IP addresses.

After the default binding and any more-specific bindings are active, advertise the prefix:

1. Use the [List BGP Prefixes endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/list/) to get the BGP prefix `id`.
2. Use the [Update BGP Prefix endpoint](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes/methods/edit/) to advertise the prefix.

   ```bash
   curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes/$BGP_PREFIX_ID" --request PATCH --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" --json '{"on_demand":{"advertised":true}}'
   ```



Confirm that the prefix is advertised before proceeding. Route propagation across the global Internet can take several minutes.

Caution

Before Cloudflare advertises a production prefix, make sure that its service bindings and service-specific configuration are complete. Advertising an incomplete configuration can disrupt traffic to the prefix.

## 4. Configure address maps for CDN

If the prefix will be used for CDN ingress, create an address map after the BGP prefix is advertised. An address map determines which BYOIP addresses Cloudflare returns for proxied DNS records in an account or zone.

1. Confirm that the BGP prefix is advertised and that the CDN service binding is active.
2. Create an [address map](https://developers.cloudflare.com/byoip/address-maps/setup/) containing the BYOIP addresses that Cloudflare should return.
3. Associate the address map with the appropriate account or zones.
4. Verify that DNS queries for proxied hostnames return the expected BYOIP addresses before moving production traffic.

Address maps are not required for prefixes used only with services that do not use Cloudflare's proxied DNS responses. For more information, refer to [About address maps](https://developers.cloudflare.com/byoip/address-maps/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/byoip/get-started/#page","headline":"Get started","description":"Onboard your IP prefixes to Cloudflare with BYOIP.","url":"https://developers.cloudflare.com/byoip/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/byoip/get-started/og.png?v=813afd9184592636","dateModified":"2026-10-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
