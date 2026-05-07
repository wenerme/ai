---
title: Advanced certificates
description: Order advanced certificates with custom SANs, validity periods, and CAs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Advanced certificates

Use advanced certificates when you want something more customizable than [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) but still want the convenience of SSL certificate issuance and renewal.

  
To order advanced certificates, you must purchase the Advanced Certificate Manager add-on. This add-on also unlocks the features listed below.

## What the add-on includes

Advanced Certificate Manager allows you to:

* Order advanced certificates that can:  
   * Include the zone apex and up to 50 hosts as covered hostnames.  
   * Cover more than one level of subdomain.  
   * Be issued by the certificate authority (CA) you choose.  
   * Use your preferred validation method.  
   * Have the validity period you choose.
* Automate domain control validation (DCV) for zones on a [CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) using [delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/).
* Enable [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) to automatically protect proxied hostnames.
* Select a [custom trust store](https://developers.cloudflare.com/ssl/origin-configuration/custom-origin-trust-store/) for origin authentication.
* Control [cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) and [per-hostname minimum TLS version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/#per-hostname).

Note

Enterprise customers can also purchase a subscription for Advanced Certificate Manager, which allows them to add up to 100 edge certificates per zone.

## Availability

| Free         | Pro         | Business    | Enterprise  |             |
| ------------ | ----------- | ----------- | ----------- | ----------- |
| Availability | Paid add-on | Paid add-on | Paid add-on | Paid add-on |

Note

Eligible enterprise customers can preview this product as a [non-contract service](https://developers.cloudflare.com/billing/understand/preview-services/), which provides full access, free of metered usage fees, limits, and certain other restrictions.

## Limitations

Advanced certificates do not apply to [Cloudflare Pages](https://developers.cloudflare.com/pages/) or [R2](https://developers.cloudflare.com/r2/) custom domains. Due to [certificate prioritization](https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/), these products use Cloudflare for SaaS certificates instead.

Advanced certificates are [Domain Validated (DV)](https://developers.cloudflare.com/ssl/concepts/#validation-level). If your organization needs Organization Validated (OV) or Extended Validation (EV) certificates, refer to [Custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/).   

Advanced certificates cover hostnames within a single domain. If you need a certificate that spans multiple domains (a multi-domain certificate), use [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/). For architecture guidance, refer to [Leveraging Cloudflare for your SaaS applications](https://developers.cloudflare.com/reference-architecture/design-guides/leveraging-cloudflare-for-your-saas-applications/).

Note

Cloudflare does not support HTTP public key pinning (HPKP) for universal, advanced, or custom hostname certificates. For details and recommended alternatives, refer to [Certificate pinning](https://developers.cloudflare.com/ssl/reference/certificate-pinning/).

## Related resources

* [ Manage advanced certificates ](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/)
* [ API commands ](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/api-commands/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/advanced-certificate-manager/","name":"Advanced certificates"}}]}
```
