---
description: Renew custom hostname certificates before their 90-day expiration.
title: Renew
image: https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/og.png?v=afa05885a7e052f5
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Renew

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Custom hostname certificates have a 90-day validity period and are available for renewal 30 days before their expiration.

The validation method selected when you create a custom hostname applies to initial certificate issuance. During an Automated Certificate Management Environment (ACME) renewal, Cloudflare selects a method based on the hostname's current configuration and eligibility.

You can explicitly change the method through the API. DigiCert uses a separate renewal workflow.

## HTTP validation

Cloudflare can automatically renew a custom hostname certificate through [HTTP validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/) when all these conditions are true:

- The custom hostname is not a wildcard.
- The hostname is active.<sup>[1](#user-content-fn-1)</sup>
- The hostname points to the SaaS provider.
- The hostname traffic is proxied through Cloudflare.
- The hostname does not use [Delegated DCV](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/).

Cloudflare may use HTTP validation even if you selected TXT for initial issuance.

If automatic HTTP validation is unavailable, retrieve the custom hostname's current `ssl.method` and `ssl.validation_records`. Share the required HTTP or TXT records with the domain owner.

## TXT validation

Wildcard hostnames cannot use HTTP validation. They must use [TXT validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/).

Non-wildcard hostnames with properly configured [Delegated DCV](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/) also remain TXT-based. Keep the delegation CNAME record in place for future renewals.

For manual TXT validation, use each certificate order's current `ssl.validation_records`. These records can change between certificate orders.

These tokens can be fetched through the API or the dashboard when the certificates are in a [pending validation](https://developers.cloudflare.com/ssl/reference/certificate-statuses/#new-certificates) state during custom hostname creation or during certificate renewals.

If your hostname is using another validation method, you will need to [update](https://developers.cloudflare.com/api/resources/custom_hostnames/methods/edit/) the `"method"` field in the SSL object to be `"txt"`.

After this step, follow the normal steps for [TXT validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/).

Note

To automate TXT placement for future certificate orders, consider [Delegated DCV](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/).

## Footnotes

1. Meaning Cloudflare could verify your customer's ownership of the hostname and the [hostname status](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/validation-status/) is active. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/#page","headline":"Renew","description":"Renew custom hostname certificates before their 90-day expiration.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/og.png?v=afa05885a7e052f5","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
