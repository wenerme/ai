---
title: Advanced certificates
description: Order advanced certificates with custom SANs, validity periods, and CAs.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/edge-certificates/advanced-certificate-manager/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Advanced certificates

Use advanced certificates when you want something more customizable than [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) but still want the convenience of SSL certificate issuance and renewal.

  
To order advanced certificates you must purchase the Advanced Certificate Manager add-on, which also includes other features.

## Advanced Certificate Manager

Advanced Certificate Manager allows you to:

* Order advanced certificates that can:  
   * Include the zone apex and up to 50 hosts as covered hostnames.  
   * Cover more than one level of subdomain.  
   * Be issued by the certificate authority (CA) you choose.  
   * Use your preferred validation method.  
   * Have the validity period you choose.
* Use [delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/) to delegate the DCV process of your partial zones ([CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)) to Cloudflare.
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

Enterprise customers can preview this product as a [non-contract service](https://developers.cloudflare.com/billing/understand/preview-services/), which provides full access, free of metered usage fees, limits, and certain other restrictions.

## Limitations

Advanced certificates are not used with [Cloudflare Pages](https://developers.cloudflare.com/pages/) nor [R2](https://developers.cloudflare.com/r2/) due to [certificate prioritization](https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/). Both Pages and R2 custom domains use Cloudflare for SaaS certificates.

Advanced certificates are [Domain Validated (DV)](https://developers.cloudflare.com/ssl/concepts/#validation-level). If your organization needs Organization Validated (OV) or Extended Validation (EV) certificates, refer to [Custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/).   

Advanced certificates do not cover multiple different domains. For multi-domain certificate (MDC), consider the [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) product. You can also find further guidance in [Leveraging Cloudflare for your SaaS applications](https://developers.cloudflare.com/reference-architecture/design-guides/leveraging-cloudflare-for-your-saas-applications/).

## Related resources

* [ Manage advanced certificates ](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/)
* [ API commands ](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/api-commands/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/advanced-certificate-manager/","name":"Advanced certificates"}}]}
```
