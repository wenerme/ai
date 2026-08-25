---
description: Create a DNS record for your zone apex.
title: Create zone apex record
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Create zone apex record

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you add a domain to Cloudflare, you may also need to create or review the DNS record on your zone apex. Zone apex refers to the domain (`example.com`) or subdomain (`blog.example.com`) that you are [adding to Cloudflare](https://developers.cloudflare.com/dns/concepts/#zone).

Usually, the zone apex record makes your domain accessible by visitors. In this case, the necessary record type ([A, AAAA, or CNAME](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ip-address-resolution)) and its content will depend on the provider that [hosts](https://developers.cloudflare.com/fundamentals/manage-domains/#host-your-domain) your website or application. If you are using Cloudflare Pages, refer to [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/). If you are using other providers, look for their guidance on how to connect domains managed on external DNS services.

### ANAME or ALIAS

ANAME or ALIAS are DNS records used by specific DNS providers. If your previous provider was using ANAME or ALIAS, you can recreate these records on Cloudflare as CNAME records. Cloudflare's [CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/)[1](#user-content-fn-1) allows you to create CNAME records at your [zone apex](https://developers.cloudflare.com/dns/concepts/#zone-apex), removing the need for those other record types.

## Footnotes

1. A process in which Cloudflare returns an IP address instead of the target hostname that a CNAME record points to. [↩](#user-content-fnref-1)

## Zone apex record

To create a zone apex record, use `@` for the record **Name**, as in the following example.

| Type | Name | IPv4 address | Proxy status |
| ---- | ---- | ------------ | ------------ |
| A    | @    | 192.0.2.1    | Proxied      |

1. In the Cloudflare dashboard, go to the **DNS Records** page.
[Go to **Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Add record**.
3. Select `A`, `AAAA`, or `CNAME` as the record **Type**, according to your needs:

  * To point to an IPv4 address, select `A`, use your zone apex (`@`) for the record **Name**, and insert the IPv4 address in the respective field.
  * To point to an IPv6 address, select `AAAA`, use your zone apex (`@`) for the record **Name**, and insert the IPv6 address in the respective field.
  * To point to a [fully qualified domain name (FQDN) ↗](https://en.wikipedia.org/wiki/Fully%5Fqualified%5Fdomain%5Fname) (such as `your-site.host.example.com`), select `CNAME`, use your zone apex (`@`) for the record **Name**, and insert the fully qualified domain name in the **Target** field.
4. Specify the [**Proxy status**](https://developers.cloudflare.com/dns/proxy-status/) and [**TTL**](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/) according to your needs.
5. Select **Save** to confirm.

Use the [Create DNS Record API endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/).

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

* To point to an IPv4 address, select **A Record**, use your zone apex (`@`) for the field `name`, and use the IPv4 address for the field `content`.
* To point to an IPv6 address, select **AAAA Record**, use your zone apex (`@`) for the field `name`, and use the IPv6 address for the field `content`.
* To point to a [fully qualified domain name (FQDN) ↗](https://en.wikipedia.org/wiki/Fully%5Fqualified%5Fdomain%5Fname) (such as `your-site.host.example.com`), select **CNAME Record**, use your zone apex (`@`) for the field `name`, and use the fully qualified domain name for the field `content`.

## Domain redirects

Once you create a domain, you may want to route that traffic to other places.

For more guidance, refer to [Redirect domain to subdomain](https://developers.cloudflare.com/fundamentals/manage-domains/manage-subdomains/#redirect-the-apex-domain-to-a-subdomain) or [Redirect one domain to another](https://developers.cloudflare.com/fundamentals/manage-domains/redirect-domain/).

## Get free SSL certificates

While DNS is what communicates where your website or application can be reached, SSL/TLS is what enables websites and applications to establish connections in a secure way.

If your domain is not correctly covered by an SSL/TLS certificate, your visitors will find a warning on their browser stating that your website or application is not secure.

Cloudflare offers free, unshared, publicly trusted [Universal SSL certificates](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) to all Cloudflare domains.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/#page","headline":"Create zone apex record · Cloudflare DNS docs","description":"Create a DNS record for your zone apex.","url":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
