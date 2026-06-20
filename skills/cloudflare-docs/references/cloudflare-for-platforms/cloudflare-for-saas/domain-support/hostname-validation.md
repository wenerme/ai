---
title: Hostname validation
description: Verify customer ownership of custom hostnames before proxying traffic.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Hostname validation

Before Cloudflare can proxy traffic through a custom hostname, we need to verify your customer's ownership of that hostname.

Note

If a custom hostname is already on Cloudflare, using the [pre-validation methods](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/pre-validation/) will not shift the traffic to the SaaS zone. That will only happen once the [DNS target](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#3-have-customer-create-cname-record) of the custom hostnames changes to point to the SaaS zone.

## Options

If minimizing downtime is more important to you, refer to our [pre-validation methods](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/pre-validation/).

If ease of use for your customers is more important, review our [real-time validation methods](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/).

## Hostname validation and certificate validation

Hostname validation and certificate validation use different tokens and API fields.

* `ownership_verification` and `ownership_verification_http` validate hostname ownership and affect the custom hostname `status`.
* `ssl.validation_records` validates certificate issuance and affects `ssl.status`.

For production traffic, the hostname should have `status: active`, `ssl.status: active`, and DNS that points to your SaaS target.

## Limitations

Custom hostnames using another CDN are not compatible with Cloudflare for SaaS. Since Cloudflare must be able to validate your customer's ownership of the hostname you add, if their usage of another CDN obfuscates their DNS records, hostname validation will fail.

## Migrate a hostname from another SaaS provider

If you are onboarding a hostname that is currently active on another Cloudflare for SaaS provider, follow these steps to minimize downtime:

1. Create the custom hostname on your zone and complete [pre-validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/pre-validation/) so it reaches `status: active` before the DNS change.
2. Issue and validate the certificate (using [TXT](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/) or [Delegated DCV](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/)) so `ssl.status` reaches `active`.
3. Ask your customer to update their DNS CNAME to point to your SaaS target.
4. Confirm traffic has switched to your zone. The previous provider can then delete their custom hostname.

Note

Multiple SaaS providers can hold an active custom hostname for the same domain simultaneously. Cloudflare routes traffic based on where the DNS CNAME points — the target determines which SaaS zone receives the traffic.

## Related resources

* [ Pre-validation ](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/pre-validation/)
* [ Real-time validation ](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/)
* [ Backoff schedule ](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/backoff-schedule/)
* [ Validation status ](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/validation-status/)
* [ Error codes ](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/error-codes/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/#page","headline":"Hostname validation · Cloudflare for Platforms docs","description":"Verify customer ownership of custom hostnames before proxying traffic.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/","name":"Custom hostnames"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/","name":"Hostname validation"}}]}
```
