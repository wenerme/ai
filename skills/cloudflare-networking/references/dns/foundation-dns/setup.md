---
description: Set up advanced nameservers for your Foundation DNS zone.
title: Set up advanced nameservers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up advanced nameservers

Last updated Jul 29, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/foundation-dns/setup/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Advanced nameservers included with [Foundation DNS](https://developers.cloudflare.com/dns/foundation-dns/) are an opt-in configuration.

Note

After enabling advanced nameservers, standard nameservers still respond to DNS queries.

## Before you begin

Before opting in for advanced nameservers, consider the following:

* The advantages that come with Foundation DNS [advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/) are currently not available for [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/). Make sure you only use one at a time.

### Differences from standard nameservers

Some behaviors are different from standard Cloudflare nameservers:

* Wildcard records are still supported but, with advanced nameservers, a wildcard record (`*.example.com`) will not apply to a subdomain that is an empty non-terminal. An empty non-terminal is a node in the DNS tree that has no records associated with it but has descendants that do, as exemplified below. This behavior is in compliance with [RFC 4592 ↗](https://www.rfc-editor.org/rfc/rfc4592.html), which defines the role of empty non-terminals in wildcard resolution.

Example

DNS management for **example.com**

| **Type** | **Name** | **Content** |
| -------- | -------- | ----------- |
| A        | \*       | 192.0.2.1   |
| A        | a.b      | 192.0.2.5   |

In this example, `a.b.example.com` is a descendant of `b.example.com`, and `b.example.com` is an empty non-terminal. This means that the wildcard `*.example.com` will not apply to `b.example.com`.

* Subdomain delegation: once a subdomain is delegated via NS records, Cloudflare will not serve any other records (such as A, TXT, or CNAME) on that subdomain from the parent zone, even if those records exist.

Example

DNS management for **example.com**

| **Type** | **Name** | **Content**                        |
| -------- | -------- | ---------------------------------- |
| NS       | www      | ns1.externalhost.com               |
| NS       | www      | ns2.externalhost.com               |
| TXT      | www      | "5bb16e6b5a444eedb48ace40c471bcc9" |
| A        | www      | 192.0.2.1                          |

In this example, the TXT record and the A record for `www.example.com` will not be served.

## Enable on a zone

To enable advanced nameservers on an existing zone:

1. Opt for advanced nameservers on your zone:

  1. In the Cloudflare dashboard, go to the **DNS Records** page.
  [Go to **Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
  2. In the **Cloudflare nameservers** card, enable **Advanced nameservers**.
  3. After you refresh the page, the card will display the values for your advanced nameservers `NS` records.
Use the [Update DNS Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) endpoint to send a PATCH request like the following:
Required API token permissions
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
  * `Zone DNS Settings Write`
  * `DNS Write`
```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_settings" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"nameservers": {
				"type": "cloudflare.advanced"
		}
	}'
```
The response body will contain your assigned nameservers in the `nameservers` object. You will use these nameservers in the next step.
2. Update the authoritative nameservers at your registrar. This step depends on whether you are using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/):

  * If you are using Cloudflare Registrar, [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to have your nameservers updated.
  * If you are using a different registrar or if your zone is delegated, [manually update your nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/#specific-processes).
  Caution
  Make sure the values for your assigned nameservers are copied exactly.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/foundation-dns/setup/#page","headline":"Set up advanced nameservers · Cloudflare DNS docs","description":"Set up advanced nameservers for your Foundation DNS zone.","url":"https://developers.cloudflare.com/dns/foundation-dns/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
